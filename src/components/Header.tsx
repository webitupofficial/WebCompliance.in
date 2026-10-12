import Link from 'next/link';

export default function Header() {
  return (
    <header className="header-nav">
      <div className="header-top-bar">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>SPECIFICATION: DPDP ACT 2023 & MEITY RULES 2025 ALIGNED METHODOLOGY</span>
          <span className="desktop-only">SARAL NOTICE & SECTION 6 CONSENT ENGINE ACTIVE</span>
        </div>
      </div>
      
      <div className="container header-inner">
        <Link href="/" className="logo">
          <span>WEBCOMPLIANCE</span>
          <span className="logo-tag">.IN</span>
        </Link>

        <nav className="nav-links">
          <Link href="/website-assessment" className="nav-link">Scanner</Link>
          <Link href="/how-it-works" className="nav-link">Methodology</Link>
          <Link href="/in-depth-assessment" className="nav-link">Expert Review</Link>
          <Link href="/resources" className="nav-link">Resources</Link>
          <Link href="/rights" className="nav-link" style={{ color: 'var(--color-cobalt)', fontWeight: 800 }}>Rights Portal</Link>
          <Link href="/pricing" className="nav-link">Pricing</Link>
          <Link href="/about" className="nav-link">About</Link>
        </nav>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Link href="/website-assessment" className="btn btn-lime btn-sm">
            Scan My Website
          </Link>
          <Link href="/in-depth-assessment" className="btn btn-dark btn-sm desktop-only">
            Request Deep Review
          </Link>
        </div>
      </div>
    </header>
  );
}
