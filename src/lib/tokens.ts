import crypto from 'crypto';

export interface ScanTokenPayload {
  orderId: string;
  url: string;
  email: string;
  company?: string;
  exp: number; // expiration timestamp in ms
  jti: string; // unique token id
}

function getSecret(): string {
  return process.env.SCAN_TOKEN_SECRET || 'wc-default-token-secret-change-in-env';
}

/**
 * Creates a signed, tamper-proof access token (base64url encoded JSON + HMAC signature).
 */
export function createScanToken(payload: ScanTokenPayload): string {
  const secret = getSecret();
  const header = { alg: 'HS256', typ: 'JWT' };
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', secret)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest('base64url');
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

/**
 * Verifies the token signature and expiration. Returns payload if valid, null otherwise.
 */
export function verifyScanToken(token: string): ScanTokenPayload | null {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  const [encodedHeader, encodedPayload, signature] = parts;
  const secret = getSecret();

  try {
    const expectedSig = crypto
      .createHmac('sha256', secret)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest('base64url');

    const sigBuf = Buffer.from(signature, 'utf8');
    const expBuf = Buffer.from(expectedSig, 'utf8');

    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      return null;
    }

    const payloadStr = Buffer.from(encodedPayload, 'base64url').toString('utf8');
    const payload: ScanTokenPayload = JSON.parse(payloadStr);

    // Verify expiration (24h)
    if (!payload.exp || Date.now() > payload.exp) {
      return null;
    }

    // Verify required payload elements
    if (!payload.orderId || !payload.url || !payload.email) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Computes SHA-256 hash of a token for secure storage.
 */
export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token.trim()).digest('hex');
}
