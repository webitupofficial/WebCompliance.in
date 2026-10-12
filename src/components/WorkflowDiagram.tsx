export default function WorkflowDiagram() {
  const steps = [
    {
      num: '01',
      title: 'SCAN',
      badge: 'SAFE DISCOVERY',
      desc: 'Safe, non-intrusive discovery of public pages, forms, scripts, cookies, notices, and technical headers.'
    },
    {
      num: '02',
      title: 'OBSERVE',
      badge: 'DETERMINISTIC CHECKS',
      desc: 'Record concrete facts: What was seen, Where it was found, When it occurred, and System confidence.'
    },
    {
      num: '03',
      title: 'EXPLAIN',
      badge: 'DPDP REFERENCE',
      desc: 'Contextualise why each indicator matters under DPDP Act 2023 & MeitY Rules 2025 without legal inflation.'
    },
    {
      num: '04',
      title: 'SUGGEST A FIX',
      badge: 'PRACTICAL ACTION',
      desc: 'Deliver exactly one actionable, engineering-ready next step per finding to remediate visible exposure.'
    },
    {
      num: '05',
      title: 'DEEPER REVIEW',
      badge: 'HUMAN EXPERT',
      desc: 'Transition smoothly to expert-led human review for contracts, retention, backend systems, and RoPA.'
    }
  ];

  return (
    <div style={{ marginTop: '2.5rem', marginBottom: '3rem' }}>
      <div style={{ border: 'var(--border-thick)', background: 'var(--color-ink)', color: 'var(--color-paper)', padding: '1rem 1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
        <span className="font-mono uppercase tracking-wider" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-acid)' }}>
          ASSESSMENT PROTOCOL PIPELINE
        </span>
        <span className="font-mono" style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>
          SCAN → OBSERVE → EXPLAIN → SUGGEST A FIX → REQUEST DEEPER REVIEW
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', border: 'var(--border-thick)', borderTop: 'none', background: '#FFFFFF' }}>
        {steps.map((step, idx) => (
          <div 
            key={step.num}
            style={{ 
              padding: '1.5rem 1.25rem', 
              borderRight: idx < steps.length - 1 ? '1px solid #D1CFC7' : 'none',
              borderBottom: '1px solid #D1CFC7',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span className="font-mono" style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--color-cobalt)' }}>
                  {step.num}
                </span>
                <span className="badge badge-info font-mono" style={{ fontSize: '0.65rem' }}>
                  {step.badge}
                </span>
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>
                {step.title}
              </h3>
              <p style={{ fontSize: '0.8125rem', color: '#4B5563', lineHeight: '1.5' }}>
                {step.desc}
              </p>
            </div>
            
            <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-slate)', marginTop: '1rem', paddingTop: '0.5rem', borderTop: '1px dashed #E5E7EB' }}>
              STEP {step.num} OF 05
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
