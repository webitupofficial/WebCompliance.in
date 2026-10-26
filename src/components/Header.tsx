'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-container">
        <Link href="/" className="wordmark" onClick={() => setMobileMenuOpen(false)}>
          WebCompliance.in
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-menu" aria-label="Main Navigation">
          <Link href="/#how-it-works" className="nav-item">How it works</Link>
          <Link href="/#for-ca-firms" className="nav-item">For CA firms</Link>
          <Link href="/#sample-report" className="nav-item">Sample report</Link>
          <Link href="/#about" className="nav-item">About</Link>
          <Link href="/#contact" className="nav-item">Contact</Link>
        </nav>

        {/* Header CTA Button */}
        <div className="header-actions">
          <Link href="/#contact" className="btn btn-primary btn-sm">
            Book a 10-min demo
          </Link>
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="mobile-dropdown">
          <Link
            href="/#how-it-works"
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            How it works
          </Link>
          <Link
            href="/#for-ca-firms"
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            For CA firms
          </Link>
          <Link
            href="/#sample-report"
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Sample report
          </Link>
          <Link
            href="/#about"
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/#contact"
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
