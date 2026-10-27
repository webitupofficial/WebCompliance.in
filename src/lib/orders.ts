import fs from 'fs';
import path from 'path';

export interface OrderRecord {
  order_id: string;
  payment_id?: string;
  status: 'pending' | 'captured' | 'failed' | 'refund_due';
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

const ORDERS_FILE = path.join(process.cwd(), '.data', 'orders.json');

declare global {
  // eslint-disable-next-line no-var
  var __webcompliance_orders: Map<string, OrderRecord> | undefined;
}

function ensureDataDir(): void {
  try {
    const dir = path.dirname(ORDERS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  } catch {
    // Ignore in read-only environments
  }
}

function loadOrdersFromDisk(): Map<string, OrderRecord> {
  const map = new Map<string, OrderRecord>();
  try {
    if (fs.existsSync(ORDERS_FILE)) {
      const data = fs.readFileSync(ORDERS_FILE, 'utf-8');
      const list: OrderRecord[] = JSON.parse(data);
      list.forEach((ord) => map.set(ord.order_id, ord));
    }
  } catch (err) {
    console.warn('Failed reading orders from disk:', err);
  }
  return map;
}

function persistOrdersToDisk(): void {
  try {
    ensureDataDir();
    const list = Array.from(global.__webcompliance_orders?.values() || []);
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(list, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Failed persisting orders to disk:', err);
  }
}

if (!global.__webcompliance_orders) {
  global.__webcompliance_orders = loadOrdersFromDisk();
}

/**
 * 90-day retention cleanup: redacts personal data (email, company, url)
 * from order records older than 90 days.
 */
export function cleanupExpiredOrders(): number {
  const cutoff = Date.now() - 90 * 24 * 60 * 60 * 1000;
  let count = 0;
  if (!global.__webcompliance_orders) return 0;

  for (const [, order] of global.__webcompliance_orders) {
    const createdAt = new Date(order.created_at).getTime();
    if (createdAt < cutoff && order.email !== '[REDACTED_90_DAYS]') {
      order.email = '[REDACTED_90_DAYS]';
      if (order.company) order.company = '[REDACTED_90_DAYS]';
      order.url = '[REDACTED_90_DAYS]';
      count++;
    }
  }

  if (count > 0) {
    persistOrdersToDisk();
  }
  return count;
}

export function saveOrder(order: OrderRecord): void {
  if (!global.__webcompliance_orders) {
    global.__webcompliance_orders = new Map();
  }
  global.__webcompliance_orders.set(order.order_id, order);
  persistOrdersToDisk();
}

export function getOrder(orderId: string): OrderRecord | null {
  if (!orderId) return null;
  if (!global.__webcompliance_orders) {
    global.__webcompliance_orders = loadOrdersFromDisk();
  }
  let order = global.__webcompliance_orders.get(orderId);
  if (!order) {
    global.__webcompliance_orders = loadOrdersFromDisk();
    order = global.__webcompliance_orders.get(orderId);
  }
  return order || null;
}

export function updateOrder(orderId: string, updates: Partial<OrderRecord>): OrderRecord | null {
  const order = getOrder(orderId);
  if (!order) return null;
  const updated: OrderRecord = {
    ...order,
    ...updates,
  };
  saveOrder(updated);
  return updated;
}

export function findOrderByTokenHash(tokenHash: string): OrderRecord | null {
  if (!tokenHash) return null;
  if (!global.__webcompliance_orders) {
    global.__webcompliance_orders = loadOrdersFromDisk();
  }
  for (const [, order] of global.__webcompliance_orders) {
    if (order.token_hash === tokenHash) {
      return order;
    }
  }
  // Refresh from disk in case written by an external worker or recent request
  global.__webcompliance_orders = loadOrdersFromDisk();
  for (const [, order] of global.__webcompliance_orders) {
    if (order.token_hash === tokenHash) {
      return order;
    }
  }
  return null;
}

export function markTokenUsed(tokenHash: string): boolean {
  const order = findOrderByTokenHash(tokenHash);
  if (!order) return false;
  order.token_used = true;
  saveOrder(order);
  return true;
}
