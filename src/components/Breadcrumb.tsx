import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `https://webcompliance.in${item.href}` : undefined
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
        <ol style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', padding: 0 }} className="font-mono">
          <li>
            <Link href="/" style={{ color: 'var(--color-cobalt)', textDecoration: 'none', fontWeight: 700 }}>
              HOME
            </Link>
          </li>
          {items.map((item, idx) => (
            <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ color: 'var(--color-slate)' }}>/</span>
              {item.href ? (
                <Link href={item.href} style={{ color: 'var(--color-cobalt)', textDecoration: 'none', fontWeight: 700 }}>
                  {item.label.toUpperCase()}
                </Link>
              ) : (
                <span style={{ color: 'var(--color-ink)', fontWeight: 800 }}>
                  {item.label.toUpperCase()}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
