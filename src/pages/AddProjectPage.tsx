import { useNavigate } from 'react-router-dom';
import { color, font } from '@/styles/theme';
import { PROJ_FIELDS, UPLOADS, UNIT_FIELDS, FEATURES } from '@/data/content';

export function AddProjectPage() {
  const navigate = useNavigate();

  return (
    <div style={{ background: color.devBg, padding: '28px 28px 40px', minHeight: '100vh' }}>
      <button onClick={() => navigate('/developer-portal')} style={{ border: 0, background: 'transparent', fontSize: 12.5, color: color.devMuted, cursor: 'pointer', padding: '0 0 12px' }}>
        ← Developer dashboard
      </button>
      <h1 style={{ fontFamily: font.display, fontWeight: 400, fontSize: 32, color: color.devDark, margin: '0 0 22px' }}>Add Project</h1>

      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div style={{ flex: '1.4 1 360px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={panelStyle}>
            <div style={panelLabel}>PROJECT INFORMATION</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 14 }}>
              {PROJ_FIELDS.map((f) => (
                <label key={f.label} style={{ display: 'block' }}>
                  <span style={fieldLabel}>{f.label}</span>
                  <input placeholder={f.ph} style={fieldStyle} />
                </label>
              ))}
            </div>
            <label style={{ display: 'block', marginTop: 14 }}>
              <span style={fieldLabel}>Description</span>
              <textarea rows={3} placeholder="What makes this project attractive to investors?" style={{ ...fieldStyle, resize: 'vertical' }} />
            </label>
          </div>

          <div style={panelStyle}>
            <div style={panelLabel}>MEDIA</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
              {UPLOADS.map((u) => (
                <div key={u.label} style={{ border: '1px dashed rgba(31,59,46,.3)', borderRadius: 7, padding: '22px 12px', textAlign: 'center', background: '#FBFBF9' }}>
                  <div style={{ fontSize: 13, color: color.devDark, fontWeight: 500 }}>{u.label}</div>
                  <div style={{ fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 10, color: color.devMuted, marginTop: 6 }}>{u.hint}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={panelStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, marginBottom: 16 }}>
              <div style={panelLabel}>UNITS</div>
              <button style={{ border: '1px solid rgba(31,59,46,.2)', borderRadius: 6, padding: '7px 13px', background: 'transparent', fontSize: 12, color: color.devDark, cursor: 'pointer' }}>
                Add unit
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12, marginBottom: 16 }}>
              {UNIT_FIELDS.map((f) => (
                <label key={f.label} style={{ display: 'block' }}>
                  <span style={{ display: 'block', fontSize: 12, color: color.devTextStrong, marginBottom: 5 }}>{f.label}</span>
                  <input placeholder={f.ph} style={{ ...fieldStyle, padding: '9px 10px', fontSize: 13 }} />
                </label>
              ))}
            </div>
            <div style={{ fontSize: 12, letterSpacing: '.14em', color: color.devMuted, marginBottom: 10 }}>FEATURES</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {FEATURES.map((f) => (
                <label
                  key={f.label}
                  style={{ display: 'flex', gap: 7, alignItems: 'center', fontSize: 12.5, border: '1px solid rgba(31,59,46,.18)', borderRadius: 20, padding: '6px 12px', background: '#FBFBF9', cursor: 'pointer' }}
                >
                  <input type="checkbox" style={{ accentColor: color.devDark, width: 14, height: 14 }} />
                  {f.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div style={{ flex: '1 1 250px', minWidth: 0, background: color.devDark, color: color.devLight, borderRadius: 9, padding: 24, position: 'sticky', top: 80 }}>
          <div style={{ fontSize: 10, letterSpacing: '.18em', color: color.devFaded, marginBottom: 12 }}>BEFORE PUBLICATION</div>
          <p style={{ fontSize: 13.5, lineHeight: 1.65, color: color.devPale, margin: '0 0 18px' }}>
            Your project will be reviewed before publication. We verify pricing, availability and rental assumptions, then produce an independent investment score.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9, fontSize: 12.5, color: color.devPale }}>
            <div>1 · Submitted</div>
            <div>2 · Best Invest review</div>
            <div>3 · Investment analysis</div>
            <div>4 · Published</div>
          </div>
          <button style={{ width: '100%', marginTop: 22, border: 0, borderRadius: 6, padding: 13, background: color.devLight, color: color.devDark, fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}>
            Submit for Review
          </button>
          <button style={{ width: '100%', marginTop: 8, border: '1px solid rgba(231,239,233,.3)', borderRadius: 6, padding: 12, background: 'transparent', color: color.devLight, fontSize: 13, cursor: 'pointer' }}>
            Save draft
          </button>
        </div>
      </div>
    </div>
  );
}

const panelStyle = { background: '#fff', border: `1px solid ${color.devBorder}`, borderRadius: 9, padding: 22 } as const;
const panelLabel = { fontSize: 10, letterSpacing: '.16em', color: color.devMuted, marginBottom: 16 } as const;
const fieldLabel = { display: 'block', fontSize: 12.5, color: color.devTextStrong, marginBottom: 5 } as const;
const fieldStyle = { width: '100%', padding: '10px 11px', border: `1px solid ${color.devBorderStrong}`, borderRadius: 6, background: '#FBFBF9', fontSize: 13.5 } as const;
