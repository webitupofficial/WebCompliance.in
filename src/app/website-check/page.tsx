'use client';

import { useState } from 'react';
import Script from 'next/script';
import Link from 'next/link';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

export default function WebsiteCheckPage() {
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [authorizedConsent, setAuthorizedConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Price configuration from environment
  const rawPrice = process.env.NEXT_PUBLIC_CHECK_PRICE_INR;
  const priceIncludesGst = process.env.NEXT_PUBLIC_PRICE_INCLUDES_GST === 'true';
  const hasPrice = Boolean(rawPrice && !isNaN(Number(rawPrice)) && Number(rawPrice) > 0);
  const priceDisplay = hasPrice
    ? `₹${Number(rawPrice).toLocaleString('en-IN')}${priceIncludesGst ? ' incl. GST' : ''}`
    : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!url.trim()) {
      setErrorMessage('Please enter your website URL.');
      return;
    }

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
      if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
        throw new Error('Only http and https protocols are supported');
      }
    } catch {
      setErrorMessage('Please enter a valid website URL (e.g., https://example.com).');
      return;
    }

    // SSRF / Local address check on client side
    const hostname = parsedUrl.hostname.toLowerCase();
    if (
      hostname === 'localhost' ||
      hostname.endsWith('.localhost') ||
      hostname === '127.0.0.1' ||
      hostname === '0.0.0.0' ||
      hostname === '169.254.169.254' ||
      hostname.startsWith('10.') ||
      hostname.startsWith('192.168.') ||
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(hostname)
    ) {
      setErrorMessage('Private, loopback, and local network addresses cannot be checked.');
      return;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage('Please enter a valid email address to receive your report link.');
      return;
    }

    if (!authorizedConsent) {
      setErrorMessage('Please confirm you are authorised to request a check of this website.');
      return;
    }

    if (!hasPrice) {
      setErrorMessage('Pricing is currently being scheduled. Please contact prem.webcompliance@gmail.com.');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Create order on server
      const res = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: parsedUrl.origin,
          email: email.trim(),
          company: company.trim(),
        }),
      });

      const orderData = await res.json();
      if (!res.ok || !orderData.orderId) {
        throw new Error(orderData.error || 'Failed to initialize payment order.');
      }

      // 2. Open Razorpay Checkout modal
      if (typeof window.Razorpay === 'undefined') {
        throw new Error('Payment gateway is loading. Please try again in a few seconds.');
      }

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'WebCompliance.in',
        description: 'Website Privacy Check',
        order_id: orderData.orderId,
        prefill: {
          email: email.trim(),
        },
        theme: {
          color: '#1e3a8a',
        },
        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          try {
            // 3. Verify payment on server and retrieve access token
            const verifyRes = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                order_id: response.razorpay_order_id,
                payment_id: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();
            if (!verifyRes.ok || !verifyData.token) {
              throw new Error(verifyData.error || 'Payment verification failed. Please contact prem.webcompliance@gmail.com.');
            }

            // 4. Redirect to gated scan page
            window.location.href = `/scan?token=${encodeURIComponent(verifyData.token)}`;
          } catch (verifyErr: unknown) {
            const msg = verifyErr instanceof Error ? verifyErr.message : 'Verification error occurred';
            setErrorMessage(msg);
            setIsLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false);
          },
        },
      };

      const rzpInstance = new window.Razorpay(options);
      rzpInstance.open();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred';
      setErrorMessage(msg);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <main className="section" style={{ paddingTop: '3.5rem', paddingBottom: '4.5rem' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          {/* Header & Explanation */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
              Preliminary Review Product
            </div>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
              Website privacy check
            </h1>
            <p style={{ fontSize: '1.0625rem', color: 'var(--color-text-muted)', lineHeight: '1.6', maxWidth: '720px', margin: '0 auto' }}>
              An automated, structured review of observable privacy and data protection indicators on your public website. Built for Indian businesses preparing for the Digital Personal Data Protection (DPDP) Act 2023, this check highlights public-facing gaps before customers, partners, or regulatory authorities spot them.
            </p>
          </div>

          {/* Preliminary Notice Card */}
          <div
            style={{
              background: '#f8fafc',
              border: '1px solid #cbd5e1',
              borderLeft: '4px solid var(--color-primary)',
              borderRadius: '6px',
              padding: '1rem 1.25rem',
              marginBottom: '2.5rem',
              fontSize: '0.875rem',
              color: '#334155',
              lineHeight: '1.5',
            }}
          >
            <strong>Important notice:</strong> This is a preliminary check of what is publicly visible on your website. It is not a full DPDP audit and does not confirm compliance.
          </div>

          {/* 2-Column: Scope & Order Form */}
          <div className="grid-2" style={{ gap: '2.5rem', alignItems: 'start' }}>
            {/* Scope Information */}
            <div>
              <div style={{ background: '#ffffff', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '1.75rem', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '0.75rem' }}>
                  What the report covers
                </h2>
                <ul style={{ paddingLeft: '1.25rem', margin: 0, fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
                  <li>Privacy notice presence and links (footer, form pages)</li>
                  <li>Personal-data forms and nearby notices</li>
                  <li>Cookies and trackers loaded before consent</li>
                  <li>Consent banner options (accept / reject / settings)</li>
                  <li>Third-party scripts and external domains</li>
                  <li>Children&apos;s data cues (DOB inputs, age gates, school keywords)</li>
                  <li>Basic security headers and HTTPS configuration</li>
                </ul>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '1.75rem' }}>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#991b1b', marginBottom: '0.75rem' }}>
                  What it does not cover
                </h2>
                <ul style={{ paddingLeft: '1.25rem', margin: 0, fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
                  <li>Internal systems, databases, and employee data</li>
                  <li>Vendor contracts and Data Processing Agreements (DPAs)</li>
                  <li>Backend retention and erasure workflows</li>
                  <li>Actual statutory legal compliance or official certification</li>
                </ul>
                <div style={{ marginTop: '1rem', fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                  For comprehensive compliance sign-off, see our{' '}
                  <Link href="/#how-it-works" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>
                    on-site offline DPDP gap audit
                  </Link>.
                </div>
              </div>
            </div>

            {/* Request & Payment Form */}
            <div style={{ background: '#ffffff', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ marginBottom: '1.25rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '0.25rem' }}>
                  Request a website check
                </h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: 0 }}>
                  Enter your details below. Your scan runs immediately after payment.
                </p>
              </div>

              {errorMessage && (
                <div
                  style={{
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    color: '#991b1b',
                    padding: '0.75rem 1rem',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    marginBottom: '1.25rem',
                  }}
                >
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label htmlFor="website-url" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '0.35rem' }}>
                    Website URL <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input
                    id="website-url"
                    type="text"
                    required
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.625rem 0.75rem',
                      fontSize: '0.9375rem',
                      border: '1px solid var(--color-border)',
                      borderRadius: '6px',
                      background: '#ffffff',
                    }}
                  />
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                    Public website only. Must start with http:// or https://.
                  </div>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label htmlFor="user-email" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '0.35rem' }}>
                    Work email <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input
                    id="user-email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.625rem 0.75rem',
                      fontSize: '0.9375rem',
                      border: '1px solid var(--color-border)',
                      borderRadius: '6px',
                      background: '#ffffff',
                    }}
                  />
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                    We send your report link and receipt here.
                  </div>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label htmlFor="company-name" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '0.35rem' }}>
                    Company or firm name <span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}>(optional)</span>
                  </label>
                  <input
                    id="company-name"
                    type="text"
                    placeholder="Acme Technologies Pvt Ltd"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.625rem 0.75rem',
                      fontSize: '0.9375rem',
                      border: '1px solid var(--color-border)',
                      borderRadius: '6px',
                      background: '#ffffff',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontSize: '0.8125rem', color: '#334155', cursor: 'pointer', lineHeight: '1.4' }}>
                    <input
                      type="checkbox"
                      required
                      checked={authorizedConsent}
                      onChange={(e) => setAuthorizedConsent(e.target.checked)}
                      style={{ marginTop: '0.125rem' }}
                    />
                    <span>
                      I am authorised to request a check of this website and agree to the{' '}
                      <Link href="/legal/terms" target="_blank" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>
                        Terms
                      </Link>{' '}
                      and{' '}
                      <Link href="/legal/privacy" target="_blank" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>
                        Privacy Notice
                      </Link>.
                    </span>
                  </label>
                </div>

                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Price per check:</span>
                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
                      {priceDisplay || 'Pricing coming soon'}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={!hasPrice || isLoading}
                    className="btn btn-primary"
                    style={{
                      width: '100%',
                      padding: '0.875rem 1.25rem',
                      fontSize: '1rem',
                      fontWeight: 700,
                      opacity: !hasPrice || isLoading ? 0.6 : 1,
                      cursor: !hasPrice || isLoading ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {isLoading
                      ? 'Processing...'
                      : hasPrice
                      ? `Pay ${priceDisplay}`
                      : 'Pricing coming soon'}
                  </button>

                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textAlign: 'center', marginTop: '0.75rem', lineHeight: '1.4' }}>
                    Single-use digital check • Immediate report generation • Secured via Razorpay
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
