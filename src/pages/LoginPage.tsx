import { useNavigate } from 'react-router-dom';
import { Logo } from '@/components/Logo';
import { color, font } from '@/styles/theme';
import { LOGIN_FIELDS } from '@/data/content';

export function LoginPage() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch', minHeight: '100vh' }}>
      <div style={{ flex: '1 1 300px', minWidth: 0, background: color.navyDark, color: '#fff', padding: '40px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 36 }}>
        <div>
          <div style={{ marginBottom: 34 }}>
            <Logo variant="light" showSubtitle={false} />
          </div>
          <h1 style={{ fontFamily: font.display, fontWeight: 300, fontSize: 34, lineHeight: 1.14, margin: '0 0 14px', textWrap: 'pretty' }}>Welcome back</h1>
          <p style={{ fontSize: 14, lineHeight: 1.65, color: '#C3D0DE', maxWidth: '40ch', margin: 0 }}>
            Your saved properties, comparisons and yield alerts are where you left them.
          </p>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,.12)', paddingTop: 18 }}>
          <div style={{ fontSize: 9.5, letterSpacing: '.16em', color: color.goldLight, marginBottom: 7 }}>NEW HERE?</div>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: '#C3D0DE', margin: '0 0 14px', maxWidth: '38ch' }}>
            Set your budget and target yield once, and we will only show properties that clear it.
          </p>
          <button
            onClick={() => navigate('/register')}
            style={{ border: '1px solid rgba(255,255,255,.34)', borderRadius: 6, padding: '11px 20px', background: 'transparent', color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
          >
            Create an account
          </button>
        </div>
      </div>

      <div style={{ flex: '1.2 1 360px', minWidth: 0, padding: '40px 34px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ maxWidth: 380, width: '100%' }}>
          <div style={{ fontSize: 10, letterSpacing: '.16em', color: color.gold, marginBottom: 18 }}>INVESTOR LOGIN</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 8 }}>
            {LOGIN_FIELDS.map((f) => (
              <label key={f.label} style={{ display: 'block' }}>
                <span style={{ display: 'block', fontSize: 12.5, color: color.textMuted, marginBottom: 5 }}>{f.label}</span>
                <input type={f.type} placeholder={f.ph} style={{ width: '100%', padding: '11px 12px', border: `1px solid ${color.borderStrong}`, borderRadius: 6, background: '#fff', fontSize: 13.5 }} />
              </label>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14, flexWrap: 'wrap', margin: '10px 0 22px' }}>
            <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12.5, color: color.textMuted }}>
              <input type="checkbox" defaultChecked style={{ accentColor: color.gold, width: 15, height: 15 }} />
              Keep me signed in
            </label>
            <a href="#" style={{ fontSize: 12.5, color: color.gold }}>
              Forgot password?
            </a>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            style={{ width: '100%', border: 0, borderRadius: 6, padding: '14px 28px', background: color.navy, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
          >
            Sign in
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0 20px' }}>
            <div style={{ flex: 1, height: 1, background: color.border }} />
            <span style={{ fontSize: 10, letterSpacing: '.14em', color: color.textPlaceholder }}>OR</span>
            <div style={{ flex: 1, height: 1, background: color.border }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button
              onClick={() => navigate('/developer-portal')}
              style={{ border: `1px solid ${color.devBorderStrong}`, borderRadius: 6, padding: '12px 18px', background: '#fff', color: color.devDark, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
            >
              Sign in as a developer
            </button>
            <div style={{ fontSize: 12.5, color: color.textFaint }}>
              No developer account yet?{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/developers/apply'); }} style={{ color: color.devDark, fontWeight: 500 }}>
                Apply for one
              </a>
            </div>
          </div>
          <p style={{ fontSize: 11.5, lineHeight: 1.6, color: color.textFaint, margin: '22px 0 0' }}>
            By signing in you accept our{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/terms'); }}>
              Terms of Use
            </a>{' '}
            and{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/privacy'); }}>
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
