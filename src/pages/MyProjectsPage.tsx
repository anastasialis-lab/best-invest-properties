import { useNavigate } from 'react-router-dom';
import { DevPortalLayout, devPanel } from '@/layouts/DevPortalLayout';
import { color } from '@/styles/theme';

const PROJECTS = [
  { name: 'Coral Bay Residences', loc: 'Paphos, Cyprus', units: '12 units · 4 available', status: 'Published', sBg: '#E4EFE8', sFg: color.action, price: '€165k – €240k', pending: '' },
  { name: 'Marina Heights', loc: 'Limassol, Cyprus', units: '18 units · 11 available', status: 'Published', sBg: '#E4EFE8', sFg: color.action, price: '€210k – €390k', pending: '2 changes awaiting approval' },
  { name: 'Casa Olivar', loc: 'Valencia, Spain', units: '9 units · 9 available', status: 'In review', sBg: '#F8EFDC', sFg: color.action, price: '€148k – €205k', pending: '' },
  { name: 'Sol Poniente', loc: 'Alicante, Spain', units: '24 units', status: 'Draft', sBg: '#F0F7FC', sFg: color.muted2, price: '—', pending: '' },
];

export function MyProjectsPage() {
  const navigate = useNavigate();

  return (
    <DevPortalLayout>
      <div style={{ background: color.ink, color: color.sky, padding: '22px 28px' }}>
        <button onClick={() => navigate('/developer-portal')} style={{ border: 0, background: 'transparent', fontSize: 15.5, color: color.edge, cursor: 'pointer', padding: '0 0 10px' }}>
          ← Developer dashboard
        </button>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontSize: 11.5, letterSpacing: '.2em', color: color.edge }}>MY PROJECTS</div>
            <div style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-.012em', fontSize: 28, marginTop: 5 }}>Select a project to update</div>
            <p style={{ fontSize: 16.5, lineHeight: 1.6, color: color.edge, maxWidth: '56ch', margin: '8px 0 0' }}>
              Price and availability are the only fields you can change after publication. Every change is submitted to Best Invest for approval before it appears to investors.
            </p>
          </div>
          <button onClick={() => navigate('/developer-portal/add-project')} style={{ border: 0, borderRadius: 40, padding: '11px 18px', background: color.sky, color: color.ink, fontSize: 15.5, fontWeight: 600, cursor: 'pointer' }}>
            Add Project
          </button>
        </div>
      </div>

      <div style={{ padding: '24px 28px 40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
        {PROJECTS.map((p) => (
          <div key={p.name} style={{ ...devPanel, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: 82, backgroundImage: 'repeating-linear-gradient(135deg,#CBDFED 0 9px,#E5F6FF 9px 18px)' }} />
            <div style={{ padding: '17px 18px 18px', display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 16.5, fontWeight: 600, color: color.ink }}>{p.name}</div>
                  <div style={{ fontSize: 15.5, color: color.muted2, marginTop: 2 }}>{p.loc}</div>
                </div>
                <span style={{ fontSize: 12.5, letterSpacing: '.06em', padding: '4px 9px', borderRadius: 4, background: p.sBg, color: p.sFg, whiteSpace: 'nowrap', flex: 'none' }}>{p.status}</span>
              </div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 15.5, color: color.body, borderTop: '1px solid rgba(32,90,135,.1)', paddingTop: 10 }}>
                <span>{p.units}</span>
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>{p.price}</span>
              </div>
              {p.pending && <div style={{ fontSize: 13.5, color: color.action, background: color.goldWash, borderRadius: 10, padding: '7px 9px' }}>{p.pending}</div>}
              <button
                onClick={() => navigate('/developer-portal/units')}
                style={{ marginTop: 'auto', border: '1px solid rgba(32,90,135,.26)', borderRadius: 40, padding: '10px 16px', background: '#fff', color: color.ink, fontSize: 15.5, fontWeight: 500, cursor: 'pointer' }}
              >
                Open project &amp; units
              </button>
            </div>
          </div>
        ))}
      </div>
    </DevPortalLayout>
  );
}
