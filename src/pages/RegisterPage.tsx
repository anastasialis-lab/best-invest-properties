import { useNavigate } from 'react-router-dom';
import { Logo } from '@/components/Logo';
import { color, font } from '@/styles/theme';
import { REG_PROMISE, REG_FIELDS } from '@/data/content';

export function RegisterPage() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch', minHeight: '100vh' }}>
      <div style={{ flex: '1 1 300px', minWidth: 0, background: color.navyDark, color: '#fff', padding: '40px 32px' }}>
        <div style={{ marginBottom: 34 }}>
          <Logo variant="light" showSubtitle={false} />
        </div>
        <h1 style={{ fontFamily: font.display, fontWeight: 300, fontSize: 36, lineHeight: 1.14, margin: '0 0 16px', textWrap: 'pretty' }}>
          Find Investments That Match Your Goals
        </h1>
        <p style={{ fontSize: 14, lineHeight: 1.65, color: '#C3D0DE', maxWidth: '44ch', margin: '0 0 30px' }}>
          Tell us the return you need. We will only show properties that clear it.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {REG_PROMISE.map((p) => (
            <div key={p.num} style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
              <span style={{ fontFamily: font.display, fontSize: 13, color: color.goldLight }}>{p.num}</span>
              <span style={{ fontSize: 13.5, lineHeight: 1.55, color: '#C3D0DE' }}>{p.body}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: '1.4 1 380px', minWidth: 0, padding: '36px 32px 42px' }}>
        <div style={{ fontSize: 10, letterSpacing: '.16em', color: color.gold, marginBottom: 16 }}>YOUR INVESTMENT CRITERIA</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 22 }}>
          <label style={{ display: 'block' }}>
            <span style={labelStyle}>Your budget</span>
            <select style={selectStyle}>
              <option>€150k – €200k</option>
              <option>€200k – €350k</option>
              <option>€350k+</option>
            </select>
          </label>
          <label style={{ display: 'block' }}>
            <span style={labelStyle}>Target yield</span>
            <select style={selectStyle}>
              <option>6%+</option>
              <option>7%+</option>
              <option>8%+</option>
            </select>
          </label>
          <label style={{ display: 'block' }}>
            <span style={labelStyle}>Time horizon</span>
            <select style={selectStyle}>
              <option>5–10 years</option>
              <option>3–5 years</option>
              <option>10+ years</option>
            </select>
          </label>
        </div>

        <div style={{ display: 'flex', gap: 26, flexWrap: 'wrap', marginBottom: 26 }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: '.14em', color: color.textFaint, marginBottom: 8 }}>COUNTRIES</div>
            <label style={checkboxRow}>
              <input type="checkbox" defaultChecked style={checkboxStyle} />
              Cyprus
            </label>
            <label style={checkboxRow}>
              <input type="checkbox" defaultChecked style={checkboxStyle} />
              Spain
            </label>
          </div>
          <div>
            <div style={{ fontSize: 10, letterSpacing: '.14em', color: color.textFaint, marginBottom: 8 }}>STRATEGY</div>
            <label style={checkboxRow}>
              <input type="checkbox" defaultChecked style={checkboxStyle} />
              Long-term rental
            </label>
            <label style={checkboxRow}>
              <input type="checkbox" style={checkboxStyle} />
              Short-term rental
            </label>
          </div>
        </div>

        <div style={{ height: 1, background: color.border, marginBottom: 24 }} />
        <div style={{ fontSize: 10, letterSpacing: '.16em', color: color.gold, marginBottom: 16 }}>YOUR DETAILS</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 14, marginBottom: 18 }}>
          {REG_FIELDS.map((f) => (
            <label key={f.label} style={{ display: 'block' }}>
              <span style={labelStyle}>{f.label}</span>
              <input type={f.type} placeholder={f.ph} style={fieldStyle} />
            </label>
          ))}
        </div>
        <label style={{ display: 'flex', gap: 9, alignItems: 'flex-start', fontSize: 12.5, color: color.textMuted, lineHeight: 1.5, marginBottom: 20 }}>
          <input type="checkbox" style={{ ...checkboxStyle, marginTop: 2 }} />
          <span>
            I agree to the{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/privacy'); }}>
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/terms'); }}>
              Terms of Use
            </a>
            .
          </span>
        </label>
        <button
          onClick={() => navigate('/dashboard')}
          style={{ border: 0, borderRadius: 6, padding: '14px 28px', background: color.navy, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
        >
          Show My Investments
        </button>
      </div>
    </div>
  );
}

const labelStyle = { display: 'block', fontSize: 12.5, color: color.textMuted, marginBottom: 5 } as const;
const selectStyle = { width: '100%', padding: '10px 11px', border: `1px solid ${color.borderStrong}`, borderRadius: 6, background: '#fff', fontSize: 13.5 } as const;
const fieldStyle = { width: '100%', padding: '10px 11px', border: `1px solid ${color.borderStrong}`, borderRadius: 6, background: '#fff', fontSize: 13.5 } as const;
const checkboxStyle = { accentColor: color.gold, width: 15, height: 15 } as const;
const checkboxRow = { display: 'flex', gap: 9, alignItems: 'center', fontSize: 13.5, padding: '3px 0' } as const;
