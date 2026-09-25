import { useNavigate } from 'react-router-dom';
import { Logo } from '@/components/Logo';
import { Spinner } from '@/components/Feedback';
import { color, line } from '@/styles/theme';
import { useAppStore } from '@/state/store';

const field = {
  width: '100%',
  padding: '11px 12px',
  border: `1px solid ${line(0.14)}`,
  borderRadius: 10,
  background: '#FFFFFF',
  color: color.slate,
  fontSize: 16.5,
  boxShadow: '0 12px 34px rgba(23,75,103,.07)',
} as const;

export function AdminLoginPage() {
  const navigate = useNavigate();
  const { alBusy, setAlBusy, showToast } = useAppStore();

  const signIn = () => {
    if (alBusy) return;
    setAlBusy(true);
    window.setTimeout(() => {
      setAlBusy(false);
      navigate('/admin');
      showToast('Signed in as Maria Andreou · Reviewer');
    }, 1400);
  };

  return (
    <div style={{ background: color.ground, color: color.slate, minHeight: '100vh', display: 'flex', flexWrap: 'wrap', alignItems: 'stretch' }}>
      <div style={{ flex: '1 1 300px', minWidth: 0, background: '#FFFFFF', padding: '40px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 36, borderRight: `1px solid ${line(0.05)}` }}>
        <div>
          <div style={{ marginBottom: 34, display: 'flex', alignItems: 'center', gap: 12 }}>
            <Logo markHeight={48} wordSize={27} ruleSize={10} />
            <span style={{ fontSize: 11, letterSpacing: '.28em', color: color.muted }}>STAFF</span>
          </div>
          <h1 style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-.012em', fontSize: 32, lineHeight: 1.14, margin: '0 0 14px', textWrap: 'pretty' }}>Platform administration</h1>
          <p style={{ fontSize: 16.5, lineHeight: 1.65, color: color.dim2, maxWidth: '40ch', margin: 0 }}>
            Approvals, developer verification, investor records and the score model. Staff accounts only — there is no self-registration.
          </p>
        </div>
        <div style={{ borderTop: `1px solid ${line(0.1)}`, paddingTop: 18 }}>
          <button onClick={() => navigate('/login')} style={{ border: `1px solid ${line(0.14)}`, borderRadius: 40, padding: '11px 20px', background: 'transparent', color: color.slate, fontSize: 15.5, cursor: 'pointer', whiteSpace: 'nowrap' }}>
            Investor or developer sign-in
          </button>
        </div>
      </div>

      <div style={{ flex: '1.2 1 360px', minWidth: 0, padding: '40px 34px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ maxWidth: 380, width: '100%' }}>
          <div style={{ fontSize: 12, letterSpacing: '.16em', color: color.action, marginBottom: 18 }}>STAFF SIGN-IN</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <label style={{ display: 'block' }}>
              <span style={{ display: 'block', fontSize: 15.5, color: color.dim2, marginBottom: 5 }}>Work email</span>
              <input type="email" placeholder="you@bestinvestproperties.com" style={field} />
            </label>
            <label style={{ display: 'block' }}>
              <span style={{ display: 'block', fontSize: 15.5, color: color.dim2, marginBottom: 5 }}>Password</span>
              <input type="password" placeholder="••••••••" style={field} />
            </label>
          </div>
          <button
            onClick={signIn}
            disabled={alBusy}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, width: '100%', marginTop: 20, border: 0, borderRadius: 40, padding: 14, background: alBusy ? color.goldPale : color.gold, color: color.slate, fontSize: 16.5, fontWeight: 600, cursor: alBusy ? 'default' : 'pointer' }}
          >
            {alBusy && <Spinner />}
            {alBusy ? 'Signing in…' : 'Sign in'}
          </button>
          <p style={{ fontSize: 13.5, lineHeight: 1.6, color: color.muted, margin: '14px 0 0' }}>
            Staff accounts are created by another administrator. Forgotten your password? Write to it@bestinvestproperties.com.
          </p>
        </div>
      </div>
    </div>
  );
}
