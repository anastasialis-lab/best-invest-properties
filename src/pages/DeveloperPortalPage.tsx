import { Link } from 'react-router-dom';
import { color, font } from '@/styles/theme';
import { DEV_STATS, DEV_PROJECTS, DEV_LEADS } from '@/data/content';
import { StripedPlaceholder } from '@/components/StripedPlaceholder';

export function DeveloperPortalPage() {
  return (
    <div style={{ background: color.devBg, minHeight: '100vh' }}>
      <div style={{ background: color.devDark, color: color.devLight, padding: '22px 28px', display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 9.5, letterSpacing: '.2em', color: color.devFaded }}>DEVELOPER PORTAL</div>
          <div style={{ fontFamily: font.display, fontSize: 26, marginTop: 4 }}>XYZ Developments</div>
        </div>
        <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap' }}>
          <Link
            to="/developer-portal/add-project"
            style={{ border: 0, borderRadius: 6, padding: '11px 18px', background: color.devLight, color: color.devDark, fontSize: 13, fontWeight: 600 }}
          >
            Add Project
          </Link>
          <button style={{ border: '1px solid rgba(231,239,233,.35)', borderRadius: 6, padding: '11px 18px', background: 'transparent', color: color.devLight, fontSize: 13, cursor: 'pointer' }}>
            Update Availability
          </button>
          <button style={{ border: '1px solid rgba(231,239,233,.35)', borderRadius: 6, padding: '11px 18px', background: 'transparent', color: color.devLight, fontSize: 13, cursor: 'pointer' }}>
            View Leads
          </button>
        </div>
      </div>

      <div style={{ padding: '26px 28px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 14, marginBottom: 26 }}>
          {DEV_STATS.map((s) => (
            <div key={s.k} style={{ background: '#fff', border: `1px solid ${color.devBorder}`, borderRadius: 9, padding: 20 }}>
              <div style={{ fontFamily: font.display, fontSize: 38, color: color.devDark, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{s.v}</div>
              <div style={{ fontSize: 11.5, letterSpacing: '.09em', color: color.devMuted, marginTop: 8 }}>{s.k}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ flex: '1.3 1 340px', minWidth: 0, background: '#fff', border: `1px solid ${color.devBorder}`, borderRadius: 9, padding: 20 }}>
            <div style={{ fontFamily: font.display, fontSize: 20, color: color.devDark, marginBottom: 14 }}>Projects</div>
            {DEV_PROJECTS.map((p) => (
              <div key={p.name} style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(31,59,46,.09)' }}>
                <StripedPlaceholder tone="dev" height={42} radius={5} style={{ width: 56, flex: 'none' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, color: color.devDark, fontWeight: 500 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: color.devMuted }}>{p.meta}</div>
                </div>
                <span style={{ fontSize: 11, padding: '4px 9px', borderRadius: 4, background: '#EDF1EE', color: '#3E6350', whiteSpace: 'nowrap' }}>{p.status}</span>
              </div>
            ))}
          </div>
          <div style={{ flex: '1 1 280px', minWidth: 0, background: '#fff', border: `1px solid ${color.devBorder}`, borderRadius: 9, padding: 20 }}>
            <div style={{ fontFamily: font.display, fontSize: 20, color: color.devDark, marginBottom: 14 }}>Recent investor enquiries</div>
            {DEV_LEADS.map((l) => (
              <div key={l.who} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: '11px 0', borderBottom: '1px solid rgba(31,59,46,.09)', fontSize: 13 }}>
                <span style={{ color: color.devDark }}>{l.who}</span>
                <span style={{ color: color.devMuted }}>{l.what}</span>
              </div>
            ))}
            <div style={{ fontSize: 11.5, lineHeight: 1.6, color: color.devMuted, marginTop: 14 }}>Leads are qualified by Best Invest before they reach you.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
