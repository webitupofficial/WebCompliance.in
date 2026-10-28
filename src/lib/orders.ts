import { Redis } from '@upstash/redis';

export interface OrderRecord {
  order_id: string;
  payment_id?: string;
  status: 'pending' | 'captured' | 'failed' | 'refund_due' | 'free';
  url: string;
  email: string;
  company?: string;
  token_hash?: string;
  token_used: boolean;
  created_at: string; // ISO 8601
  report_id?: string;
  amount: number; // in INR
  currency: string;
}

// Retention: 30 days, then Redis deletes the record automatically
const NINETY_DAYS_SECONDS = 30 * 24 * 60 * 60;

const REDIS_URL =
  process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const REDIS_TOKEN =
  process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

let redisClient: Redis | null = null;

function getRedis(): Redis | null {
  if (redisClient) return redisClient;
  if (REDIS_URL && REDIS_TOKEN) {
    redisClient = new Redis({
      url: REDIS_URL,
      token: REDIS_TOKEN,
    });
    return redisClient;
  }
  return null;
}

// In-memory fallback ONLY for local development when Redis credentials are not configured
declare global {
  // eslint-disable-next-line no-var
  var __webcompliance_orders_mem: Map<string, OrderRecord> | undefined;
  // eslint-disable-next-line no-var
  var __webcompliance_tokens_used_mem: Set<string> | undefined;
}

if (!global.__webcompliance_orders_mem) {
  global.__webcompliance_orders_mem = new Map();
}
if (!global.__webcompliance_tokens_used_mem) {
  global.__webcompliance_tokens_used_mem = new Set();
}

/**
 * Saves or updates an order.
 * Stores in Upstash Redis with a 30-day TTL.
 */
export async function saveOrder(order: OrderRecord): Promise<void> {
  const redis = getRedis();

  if (redis) {
    // Save order record with 30-day retention TTL
    await redis.set(`order:${order.order_id}`, JSON.stringify(order), {
      ex: NINETY_DAYS_SECONDS,
    });

    // If order has a token_hash, maintain token -> order_id reverse lookup
    if (order.token_hash) {
      await redis.set(`token:order:${order.token_hash}`, order.order_id, {
        ex: NINETY_DAYS_SECONDS,
      });
    }
    return;
  }

  // Memory fallback for local development
  global.__webcompliance_orders_mem!.set(order.order_id, order);
}

/**
 * Retrieves an order by order_id.
 */
export async function getOrder(orderId: string): Promise<OrderRecord | null> {
  if (!orderId) return null;
  const redis = getRedis();

  if (redis) {
    const raw = await redis.get<OrderRecord | string>(`order:${orderId}`);
    if (!raw) return null;
    if (typeof raw === 'string') {
      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    }
    return raw;
  }

  return global.__webcompliance_orders_mem!.get(orderId) || null;
}

/**
 * Updates partial order fields and persists.
 */
export async function updateOrder(
  orderId: string,
  updates: Partial<OrderRecord>
): Promise<OrderRecord | null> {
  const order = await getOrder(orderId);
  if (!order) return null;

  const updated: OrderRecord = {
    ...order,
    ...updates,
  };

  await saveOrder(updated);
  return updated;
}

/**
 * Checks if a token has already been marked as used.
 */
export async function isTokenUsed(tokenHash: string): Promise<boolean> {
  if (!tokenHash) return true;
  const redis = getRedis();

  if (redis) {
    const exists = await redis.exists(`token:used:${tokenHash}`);
    return exists === 1;
  }

  return global.__webcompliance_tokens_used_mem!.has(tokenHash);
}

/**
 * Finds an order by its SHA-256 token hash.
 */
export async function findOrderByTokenHash(tokenHash: string): Promise<OrderRecord | null> {
  if (!tokenHash) return null;
  const redis = getRedis();

  if (redis) {
    const orderId = await redis.get<string>(`token:order:${tokenHash}`);
    if (!orderId) return null;
    const order = await getOrder(orderId);
    if (order) {
      const used = await isTokenUsed(tokenHash);
      if (used) {
        order.token_used = true;
      }
    }
    return order;
  }

  // Memory fallback
  for (const [, order] of global.__webcompliance_orders_mem!) {
    if (order.token_hash === tokenHash) {
      if (global.__webcompliance_tokens_used_mem!.has(tokenHash)) {
        order.token_used = true;
      }
      return order;
    }
  }
  return null;
}

/**
 * Atomically marks a token as used using Redis SET ... NX.
 * This guarantees mutual exclusion so two parallel requests cannot both claim or scan with the same token.
 * Returns true if successfully claimed (first time).
 * Returns false if already claimed / used.
 */
export async function claimTokenAtomically(tokenHash: string): Promise<boolean> {
  if (!tokenHash) return false;
  const redis = getRedis();

  if (redis) {
    // Atomic SET ... NX operation
    const acquired = await redis.set(`token:used:${tokenHash}`, Date.now().toString(), {
      nx: true,
      ex: NINETY_DAYS_SECONDS,
    });

    if (!acquired) {
      return false; // Token was ALREADY claimed
    }

    // Also update order record status if found
    const orderId = await redis.get<string>(`token:order:${tokenHash}`);
    if (orderId) {
      await updateOrder(orderId, { token_used: true });
    }
    return true;
  }

  // Memory fallback
  if (global.__webcompliance_tokens_used_mem!.has(tokenHash)) {
    return false;
  }
  global.__webcompliance_tokens_used_mem!.add(tokenHash);
  const order = await findOrderByTokenHash(tokenHash);
  if (order) {
    order.token_used = true;
  }
  return true;
}

/**
 * Backward compatibility alias for claimTokenAtomically.
 */
export async function markTokenUsed(tokenHash: string): Promise<boolean> {
  return claimTokenAtomically(tokenHash);
}


declare global {
  // eslint-disable-next-line no-var
  var __webcompliance_free_limits_mem: Map<string, { count: number; resetAt: number }> | undefined;
}

/**
 * Counts a free check against a key (e.g. email or IP) and returns true if still within the limit.
 * Uses Redis INCR with a TTL so the limit is shared across all servers.
 */
export async function consumeFreeCheckQuota(key: string, limit: number, windowSeconds: number): Promise<boolean> {
  const redis = getRedis();
  const redisKey = `free:limit:${key}`;
  if (redis) {
    const count = await redis.incr(redisKey);
    if (count === 1) {
      await redis.expire(redisKey, windowSeconds);
    }
    return count <= limit;
  }
  if (!global.__webcompliance_free_limits_mem) global.__webcompliance_free_limits_mem = new Map();
  const now = Date.now();
  const entry = global.__webcompliance_free_limits_mem.get(redisKey);
  if (!entry || entry.resetAt < now) {
    global.__webcompliance_free_limits_mem.set(redisKey, { count: 1, resetAt: now + windowSeconds * 1000 });
    return true;
  }
  entry.count += 1;
  return entry.count <= limit;
}
