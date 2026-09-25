import { useNavigate } from 'react-router-dom';
import panelBg from '@/assets/panel-bg.jpg';
import { Logo } from '@/components/Logo';
import { color, line } from '@/styles/theme';

const FIELDS = [
  { label: 'Email address', type: 'email', ph: 'you@example.com' },
  { label: 'Password', type: 'password', ph: '••••••••' },
];

const glass = { position: 'relative', background: 'rgba(5,56,72,.46)', backdropFilter: 'blur(3px)', borderRadius: 20 } as const;

export function LoginPage() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch', minHeight: '100vh' }}>
      <div style={{ flex: '1 1 300px', minWidth: 0, position: 'relative', overflow: 'hidden', background: '#0C4A60', color: '#fff', padding: '40px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 36 }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${panelBg})`, backgroundSize: 'cover', backgroundPosition: '42% 58%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(150deg,rgba(5,52,68,.9) 0%,rgba(7,72,92,.84) 46%,rgba(10,92,110,.78) 100%)' }} />

        <div style={{ ...glass, padding: '22px 24px 24px' }}>
          <div style={{ marginBottom: 34, display: 'flex' }}>
            <Logo onDark markHeight={50} wordSize={28} ruleSize={10.5} />
          </div>
          <h1 style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-.012em', fontSize: 34, lineHeight: 1.14, margin: '0 0 14px', textWrap: 'pretty' }}>Welcome back</h1>
          <p style={{ fontSize: 16.5, lineHeight: 1.65, color: '#E4F5FD', maxWidth: '40ch', margin: 0 }}>Your saved properties, comparisons and yield alerts are where you left them.</p>
        </div>

        <div style={{ ...glass, padding: '18px 24px 20px' }}>
          <div style={{ fontSize: 11.5, letterSpacing: '.16em', color: color.gold, marginBottom: 7 }}>NEW HERE?</div>
          <p style={{ fontSize: 15.5, lineHeight: 1.6, color: '#E4F5FD', margin: '0 0 14px', maxWidth: '38ch' }}>
            Set your budget and target yield once, and we will only show properties that clear it.
          </p>
          <button onClick={() => navigate('/register')} style={{ border: '1px solid rgba(255,255,255,.34)', borderRadius: 40, padding: '11px 20px', background: 'transparent', color: '#fff', fontSize: 15.5, fontWeight: 500, cursor: 'pointer' }}>
            Create an account
          </button>
        </div>
      </div>

      <div style={{ flex: '1.2 1 360px', minWidth: 0, padding: '40px 34px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ maxWidth: 380, width: '100%' }}>
          <div style={{ fontSize: 12, letterSpacing: '.16em', color: color.action, marginBottom: 18 }}>INVESTOR LOGIN</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 8 }}>
            {FIELDS.map((f) => (
              <label key={f.label} style={{ display: 'block' }}>
                <span style={{ display: 'block', fontSize: 15.5, color: color.body, marginBottom: 5 }}>{f.label}</span>
                <input type={f.type} placeholder={f.ph} style={{ width: '100%', padding: '11px 12px', border: `1px solid ${line(0.18)}`, borderRadius: 10, background: '#fff', fontSize: 16.5 }} />
              </label>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14, flexWrap: 'wrap', margin: '10px 0 22px' }}>
            <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 15.5, color: color.body }}>
              <input type="checkbox" defaultChecked style={{ accentColor: color.action, width: 15, height: 15 }} />
              Keep me signed in
            </label>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/forgot-password'); }} style={{ fontSize: 15.5, color: color.action }}>
              Forgot password?
            </a>
          </div>
          <button onClick={() => navigate('/dashboard')} style={{ width: '100%', border: 0, borderRadius: 40, padding: '14px 28px', background: color.actionBright, color: '#fff', fontSize: 16.5, fontWeight: 600, cursor: 'pointer', boxShadow: '0 10px 24px rgba(23,75,103,.22)' }}>
            Sign in
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0 20px' }}>
            <div style={{ flex: 1, height: 1, background: line(0.12) }} />
            <span style={{ fontSize: 12, letterSpacing: '.14em', color: color.placeholder }}>OR</span>
            <div style={{ flex: 1, height: 1, background: line(0.12) }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button onClick={() => navigate('/developer-portal')} style={{ border: '1px solid rgba(32,90,135,.3)', borderRadius: 40, padding: '12px 18px', background: '#fff', color: color.actionDeep, fontSize: 15.5, fontWeight: 500, cursor: 'pointer' }}>
              Sign in as a developer
            </button>
            <div style={{ fontSize: 15.5, color: color.faint }}>
              No developer account yet?{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/developers/apply'); }} style={{ color: color.actionDeep, fontWeight: 500 }}>
                Apply for one
              </a>
            </div>
          </div>
          <p style={{ fontSize: 13.5, lineHeight: 1.6, color: color.faint, margin: '22px 0 0' }}>
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
