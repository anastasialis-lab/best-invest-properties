import { useNavigate } from 'react-router-dom';
import { DevPortalLayout, devPanel } from '@/layouts/DevPortalLayout';
import { color } from '@/styles/theme';

const LEADS = [
  { ref: 'LEAD-0412', project: 'Coral Bay · A-201', budget: '€200k – €240k', stage: 'Introduced', who: 'Elena Markou · +357 99 123 456', locked: false, sBg: '#E4EFE8', sFg: color.action, when: 'Introduced 12 Sep' },
  { ref: 'LEAD-0417', project: 'Marina Heights · B-101', budget: '€180k – €220k', stage: 'Introduced', who: 'Tomas Rehak · tomas.r@example.com', locked: false, sBg: '#E4EFE8', sFg: color.action, when: 'Introduced 13 Sep' },
  { ref: 'LEAD-0421', project: 'Coral Bay · A-101', budget: '€150k – €180k', stage: 'Awaiting admin approval', who: 'Contact details released after Best Invest approves', locked: true, sBg: '#F8EFDC', sFg: color.action, when: 'Requested 14 Sep' },
  { ref: 'LEAD-0422', project: 'Casa Olivar · unit TBC', budget: '€140k – €170k', stage: 'Awaiting admin approval', who: 'Contact details released after Best Invest approves', locked: true, sBg: '#F8EFDC', sFg: color.action, when: 'Requested 15 Sep' },
];

const FILTERS = [
  { label: 'All leads · 4', active: true },
  { label: 'Introduced · 2', active: false },
  { label: 'Awaiting approval · 2', active: false },
];

export function LeadsPage() {
  const navigate = useNavigate();

  return (
    <DevPortalLayout>
      <div style={{ background: color.ink, color: color.sky, padding: '22px 28px' }}>
        <button onClick={() => navigate('/developer-portal')} style={{ border: 0, background: 'transparent', fontSize: 15.5, color: color.edge, cursor: 'pointer', padding: '0 0 10px' }}>
          ← Developer dashboard
        </button>
        <div style={{ fontSize: 11.5, letterSpacing: '.2em', color: color.edge }}>LEADS</div>
        <div style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-.012em', fontSize: 28, marginTop: 5 }}>Qualified investor leads</div>
        <p style={{ fontSize: 16.5, lineHeight: 1.6, color: color.edge, maxWidth: '62ch', margin: '8px 0 0' }}>
          Best Invest approves every introduction. Until then a lead shows the property, the budget and the fit — never the investor's contact details.
        </p>
      </div>

      <div style={{ padding: '22px 28px 40px' }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 18 }}>
          {FILTERS.map((f) => (
            <span
              key={f.label}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                flex: 'none',
                whiteSpace: 'nowrap',
                fontSize: 15.5,
                padding: '8px 14px',
                borderRadius: 999,
                background: f.active ? color.ink : '#fff',
                border: f.active ? 0 : '1px solid rgba(32,90,135,.18)',
                color: f.active ? '#fff' : color.body,
              }}
            >
              {f.label}
            </span>
          ))}
          <span style={{ display: 'inline-flex', alignItems: 'center', flex: 'none', whiteSpace: 'nowrap', fontSize: 15.5, padding: '8px 14px', borderRadius: 999, background: 'transparent', border: '1px dashed rgba(32,90,135,.28)', color: color.faint }}>
            Filtered out by Best Invest · 3
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {LEADS.map((l) => (
            <div key={l.ref} style={{ ...devPanel, padding: '18px 20px', display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ flex: '1 1 220px', minWidth: 0 }}>
                <div style={{ fontSize: 12.5, letterSpacing: '.12em', color: color.faint, fontVariantNumeric: 'tabular-nums' }}>{l.ref}</div>
                <div style={{ fontSize: 16.5, fontWeight: 600, color: color.ink, marginTop: 4 }}>{l.project}</div>
                <div style={{ fontSize: 15.5, color: color.muted2, marginTop: 2 }}>{l.when}</div>
              </div>
              <div style={{ flex: '1 1 180px', minWidth: 0 }}>
                <div style={{ fontSize: 12.5, letterSpacing: '.12em', color: color.faint }}>BUDGET</div>
                <div style={{ fontSize: 16.5, color: color.body, marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>{l.budget}</div>
              </div>
              <div style={{ flex: '1.4 1 240px', minWidth: 0 }}>
                <div style={{ fontSize: 12.5, letterSpacing: '.12em', color: color.faint }}>INVESTOR</div>
                {l.locked ? (
                  <div style={{ fontSize: 15.5, color: color.faint, marginTop: 4, display: 'flex', gap: 8, alignItems: 'baseline' }}>
                    <span style={{ fontSize: 16.5, lineHeight: 1, color: color.action }}>·</span>
                    <span>{l.who}</span>
                  </div>
                ) : (
                  <div style={{ fontSize: 16.5, color: color.ink, marginTop: 4 }}>{l.who}</div>
                )}
              </div>
              <div style={{ flex: 'none' }}>
                <span style={{ fontSize: 12.5, letterSpacing: '.06em', padding: '5px 10px', borderRadius: 4, background: l.sBg, color: l.sFg, whiteSpace: 'nowrap' }}>{l.stage}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DevPortalLayout>
  );
}
