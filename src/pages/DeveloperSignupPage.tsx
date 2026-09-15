import { Link, useNavigate } from 'react-router-dom';
import { color, font } from '@/styles/theme';
import { DEV_STAGES, DEV_COMPANY_FIELDS, DEV_CONTACT_FIELDS, DEV_PORTFOLIO_FIELDS, DEV_DOCS, DEV_REQ } from '@/data/content';

export function DeveloperSignupPage() {
  const navigate = useNavigate();

  return (
    <div style={{ background: color.devBg }}>
      <div style={{ background: color.devDark, color: color.devLight, padding: '26px 28px 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 340px', minWidth: 0 }}>
            <Link to="/developers" style={{ display: 'inline-block', fontSize: 12.5, color: color.devFaded2, marginBottom: 12 }}>
              ← For Developers
            </Link>
            <div style={{ fontSize: 10, letterSpacing: '.2em', color: color.goldLight, marginBottom: 10 }}>DEVELOPER ACCOUNT APPLICATION</div>
            <h1 style={{ fontFamily: font.display, fontWeight: 300, fontSize: 34, lineHeight: 1.12, margin: '0 0 10px', textWrap: 'pretty' }}>Apply to list projects</h1>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: color.devPale, maxWidth: '52ch', margin: 0 }}>
              Company, licence and one contact person. Verification takes two to five working days — you can prepare a project in the portal while it runs.
            </p>
          </div>
          <div style={{ flex: '1 1 300px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {DEV_STAGES.map((s) => (
              <div key={s.num} style={{ display: 'flex', gap: 12, alignItems: 'baseline', border: `1px solid ${s.active ? 'rgba(226,181,88,.5)' : 'rgba(255,255,255,.16)'}`, borderRadius: 7, padding: '10px 13px' }}>
                <span style={{ fontFamily: font.display, fontSize: 13, color: s.active ? color.goldLight : color.devPale, flexShrink: 0 }}>{s.num}</span>
                <span style={{ minWidth: 0 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: s.active ? color.goldLight : color.devPale }}>{s.title}</span>
                  <br />
                  <span style={{ fontSize: 12, lineHeight: 1.5, color: color.devFaded2 }}>{s.body}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '28px 28px 40px', display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'flex-start' }}>
        <div style={{ flex: '1.5 1 420px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={panelStyle}>
            <div style={panelLabel}>1 — COMPANY</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 14 }}>
              {DEV_COMPANY_FIELDS.map((f) => (
                <label key={f.label} style={{ display: 'block' }}>
                  <span style={fieldLabel}>{f.label}</span>
                  <input type={f.type} placeholder={f.ph} style={fieldStyle} />
                </label>
              ))}
            </div>
          </div>

          <div style={panelStyle}>
            <div style={panelLabel}>2 — ACCOUNT CONTACT</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 14 }}>
              {DEV_CONTACT_FIELDS.map((f) => (
                <label key={f.label} style={{ display: 'block' }}>
                  <span style={fieldLabel}>{f.label}</span>
                  <input type={f.type} placeholder={f.ph} style={fieldStyle} />
                </label>
              ))}
            </div>
            <p style={{ fontSize: 11.5, lineHeight: 1.6, color: color.textFaint, margin: '14px 0 0' }}>
              This person receives investor enquiries and is expected to respond within 48 hours. Additional users can be added from the portal later.
            </p>
          </div>

          <div style={panelStyle}>
            <div style={panelLabel}>3 — PORTFOLIO</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 14, marginBottom: 16 }}>
              {DEV_PORTFOLIO_FIELDS.map((f) => (
                <label key={f.label} style={{ display: 'block' }}>
                  <span style={fieldLabel}>{f.label}</span>
                  <input type={f.type} placeholder={f.ph} style={fieldStyle} />
                </label>
              ))}
            </div>
            <label style={{ display: 'block' }}>
              <span style={fieldLabel}>Markets you build in</span>
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', paddingTop: 2 }}>
                <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13.5, color: color.devText }}>
                  <input type="checkbox" defaultChecked style={{ accentColor: color.devDark, width: 15, height: 15 }} />
                  Cyprus
                </label>
                <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13.5, color: color.devText }}>
                  <input type="checkbox" style={{ accentColor: color.devDark, width: 15, height: 15 }} />
                  Spain
                </label>
              </div>
            </label>
          </div>

          <div style={panelStyle}>
            <div style={{ ...panelLabel, marginBottom: 6 }}>4 — VERIFICATION DOCUMENTS</div>
            <p style={{ fontSize: 12.5, lineHeight: 1.6, color: color.devText, margin: '0 0 16px', maxWidth: '56ch' }}>
              Upload now or within seven days. A project cannot be published until all required documents are verified.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {DEV_DOCS.map((d) => (
                <div key={d.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14, flexWrap: 'wrap', border: '1px dashed rgba(31,59,46,.26)', borderRadius: 7, padding: '12px 14px', background: '#FBFCFB' }}>
                  <span style={{ minWidth: 0 }}>
                    <span style={{ fontSize: 13.5, color: color.devDark }}>{d.label}</span>
                    <br />
                    <span style={{ fontSize: 11.5, color: color.textFaint }}>{d.note}</span>
                  </span>
                  <button style={{ border: '1px solid rgba(31,59,46,.26)', borderRadius: 5, padding: '7px 14px', background: '#fff', color: color.devDark, fontSize: 12, fontWeight: 500, cursor: 'pointer', flexShrink: 0 }}>
                    Upload
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ flex: '1 1 280px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ ...panelStyle, padding: '22px 22px 24px' }}>
            <div style={{ ...panelLabel, marginBottom: 14 }}>BEFORE YOU SUBMIT</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 18 }}>
              {DEV_REQ.map((r) => (
                <div key={r} style={{ display: 'flex', gap: 10, alignItems: 'baseline', fontSize: 13, color: color.devText, lineHeight: 1.5 }}>
                  <span style={{ color: color.devDark, flexShrink: 0 }}>✓</span>
                  {r}
                </div>
              ))}
            </div>
            <label style={{ display: 'flex', gap: 9, alignItems: 'flex-start', fontSize: 12.5, color: color.devText, lineHeight: 1.5, marginBottom: 8 }}>
              <input type="checkbox" style={{ accentColor: color.devDark, width: 15, height: 15, marginTop: 2 }} />
              <span>The information given is accurate and I am authorised to represent this company.</span>
            </label>
            <label style={{ display: 'flex', gap: 9, alignItems: 'flex-start', fontSize: 12.5, color: color.devText, lineHeight: 1.5, marginBottom: 18 }}>
              <input type="checkbox" style={{ accentColor: color.devDark, width: 15, height: 15, marginTop: 2 }} />
              <span>
                I accept the{' '}
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/terms'); }}>
                  Terms of Use
                </a>
                , the developer listing agreement and the{' '}
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/privacy'); }}>
                  Privacy Policy
                </a>
                .
              </span>
            </label>
            <button
              onClick={() => navigate('/developer-portal')}
              style={{ width: '100%', border: 0, borderRadius: 6, padding: '14px 20px', background: color.devDark, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
            >
              Submit application
            </button>
            <p style={{ fontSize: 11.5, lineHeight: 1.6, color: color.textFaint, margin: '12px 0 0' }}>You will be taken to the portal in read-only mode while we verify.</p>
          </div>

          <div style={panelStyle}>
            <div style={{ ...panelLabel, marginBottom: 10 }}>FEES</div>
            <p style={{ fontSize: 13, lineHeight: 1.65, color: color.devText, margin: 0 }}>
              No listing fee. We are paid a success fee by the developer when an introduction leads to a completed sale, disclosed on the property page. Placeholder for the prototype — confirm the commercial model.
            </p>
          </div>

          <div style={{ border: `1px solid ${color.devBorder}`, borderRadius: 9, padding: '20px 22px 22px' }}>
            <div style={{ ...panelLabel, marginBottom: 8 }}>ALREADY APPLIED?</div>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: color.devText, margin: '0 0 12px' }}>Sign in to check the status of your verification.</p>
            <Link to="/login" style={{ display: 'inline-block', border: '1px solid rgba(31,59,46,.26)', borderRadius: 6, padding: '10px 18px', background: '#fff', color: color.devDark, fontSize: 13, fontWeight: 500 }}>
              Developer login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const panelStyle = { background: '#fff', border: `1px solid ${color.devBorder}`, borderRadius: 9, padding: '24px 24px 26px' } as const;
const panelLabel = { fontSize: 10, letterSpacing: '.16em', color: color.devDark, marginBottom: 16 } as const;
const fieldLabel = { display: 'block', fontSize: 12.5, color: color.devText, marginBottom: 5 } as const;
const fieldStyle = { width: '100%', padding: '10px 11px', border: `1px solid ${color.devBorderStrong}`, borderRadius: 6, background: '#FBFCFB', fontSize: 13.5 } as const;
