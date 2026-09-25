import { useNavigate } from 'react-router-dom';
import panelBg from '@/assets/panel-bg.jpg';
import { Logo } from '@/components/Logo';
import { color, line } from '@/styles/theme';
import { useAppStore } from '@/state/store';

const STEPS = [
  { value: 'request' as const, label: 'Request' },
  { value: 'sent' as const, label: 'Link sent' },
  { value: 'reset' as const, label: 'New password' },
  { value: 'done' as const, label: 'Done' },
];

const glass = { position: 'relative', background: 'rgba(5,56,72,.46)', backdropFilter: 'blur(3px)', borderRadius: 20 } as const;

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { fpStep, setFpStep, showErrors, showToast } = useAppStore();

  const next = () => {
    if (fpStep === 'request') setFpStep('sent');
    else if (fpStep === 'sent') setFpStep('reset');
    else if (fpStep === 'reset') setFpStep('done');
  };

  const errorField = showErrors ? { bd: color.danger, bg: color.dangerWash } : { bd: line(0.18), bg: '#fff' };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch', minHeight: '100vh' }}>
      <div style={{ flex: '1 1 300px', minWidth: 0, position: 'relative', overflow: 'hidden', background: '#0C4A60', color: '#fff', padding: '40px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 36 }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${panelBg})`, backgroundSize: 'cover', backgroundPosition: '42% 58%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(150deg,rgba(5,52,68,.9) 0%,rgba(7,72,92,.84) 46%,rgba(10,92,110,.78) 100%)' }} />
        <div style={{ ...glass, padding: '22px 24px 24px' }}>
          <div style={{ marginBottom: 34, display: 'flex' }}>
            <Logo onDark markHeight={50} wordSize={28} ruleSize={10.5} />
          </div>
          <h1 style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-.012em', fontSize: 34, lineHeight: 1.14, margin: '0 0 14px', textWrap: 'pretty' }}>Reset your password</h1>
          <p style={{ fontSize: 16.5, lineHeight: 1.65, color: '#E4F5FD', maxWidth: '40ch', margin: 0 }}>
            We send a single-use link to your registered address. Your saved properties and criteria are untouched.
          </p>
        </div>
        <div style={{ ...glass, padding: '18px 24px 20px' }}>
          <div style={{ fontSize: 11.5, letterSpacing: '.16em', color: color.gold, marginBottom: 7 }}>NO LINK ARRIVED?</div>
          <p style={{ fontSize: 15.5, lineHeight: 1.6, color: '#E4F5FD', margin: '0 0 14px', maxWidth: '38ch' }}>
            Check the spam folder, then write to support@bestinvestproperties.com and we will verify you another way.
          </p>
          <button onClick={() => navigate('/login')} style={{ border: '1px solid rgba(255,255,255,.34)', borderRadius: 40, padding: '11px 20px', background: 'transparent', color: '#fff', fontSize: 15.5, fontWeight: 500, cursor: 'pointer' }}>
            Back to sign in
          </button>
        </div>
      </div>

      <div style={{ flex: '1.2 1 360px', minWidth: 0, padding: '34px 34px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ maxWidth: 400, width: '100%' }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 22 }}>
            {STEPS.map((s) => {
              const on = fpStep === s.value;
              return (
                <button
                  key={s.value}
                  onClick={() => setFpStep(s.value)}
                  style={{ border: `1px solid ${on ? color.navy : line(0.16)}`, borderRadius: 40, padding: '5px 11px', background: on ? color.navy : '#fff', color: on ? '#fff' : color.muted, fontSize: 13, cursor: 'pointer' }}
                >
                  {s.label}
                </button>
              );
            })}
          </div>

          {fpStep === 'request' && (
            <>
              <div style={{ fontSize: 12, letterSpacing: '.16em', color: color.action, marginBottom: 16 }}>FORGOT PASSWORD</div>
              <p style={{ fontSize: 16.5, lineHeight: 1.65, color: color.body, margin: '0 0 18px' }}>Enter the email you registered with. If an account exists, a reset link is on its way.</p>
              <label style={{ display: 'block', marginBottom: 6 }}>
                <span style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 15.5, color: color.body, marginBottom: 5 }}>
                  Email address<span style={{ color: color.action, fontSize: 13 }}>Required</span>
                </span>
                <input type="email" placeholder="you@example.com" style={{ width: '100%', padding: '11px 12px', border: `1px solid ${errorField.bd}`, borderRadius: 10, background: errorField.bg, fontSize: 16.5 }} />
              </label>
              {showErrors && <div style={{ fontSize: 13.5, lineHeight: 1.5, color: color.dangerDeep, marginBottom: 12 }}>Enter a valid email address — this one is missing the domain.</div>}
              <button onClick={next} style={{ width: '100%', marginTop: 14, border: 0, borderRadius: 40, padding: 14, background: color.actionBright, color: '#fff', fontSize: 16.5, fontWeight: 600, cursor: 'pointer', boxShadow: '0 10px 24px rgba(23,75,103,.22)' }}>
                Send reset link
              </button>
              <p style={{ fontSize: 13.5, lineHeight: 1.6, color: color.faint, margin: '14px 0 0' }}>For your security we give the same confirmation whether or not the address is registered.</p>
            </>
          )}

          {fpStep === 'sent' && (
            <>
              <div style={{ fontSize: 12, letterSpacing: '.16em', color: color.action, marginBottom: 16 }}>CHECK YOUR INBOX</div>
              <div style={{ background: color.ground, border: `1px solid ${line(0.07)}`, borderRadius: 16, boxShadow: '0 12px 34px rgba(23,75,103,.07)', padding: '20px 22px' }}>
                <div style={{ fontWeight: 600, letterSpacing: '-.006em', fontSize: 22, color: color.link, marginBottom: 8 }}>Reset link sent</div>
                <p style={{ fontSize: 16.5, lineHeight: 1.7, color: color.body, margin: '0 0 6px' }}>
                  We emailed a link to <span style={{ color: color.link }}>a•••a@example.com</span>. It works once and expires in 30 minutes.
                </p>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 16 }}>
                  <button onClick={next} style={{ border: 0, borderRadius: 40, padding: '11px 18px', background: color.actionBright, color: '#fff', fontSize: 15.5, fontWeight: 600, cursor: 'pointer', boxShadow: '0 10px 24px rgba(23,75,103,.22)' }}>
                    I have the link
                  </button>
                  <button onClick={() => showToast('Reset link resent — check your inbox')} style={{ border: `1px solid ${line(0.18)}`, borderRadius: 40, padding: '11px 18px', background: '#fff', color: color.link, fontSize: 15.5, cursor: 'pointer' }}>
                    Resend in 0:45
                  </button>
                </div>
              </div>
              <button onClick={() => setFpStep('request')} style={{ border: 0, background: 'transparent', color: color.body, fontSize: 15.5, cursor: 'pointer', padding: '14px 0 0' }}>
                Use a different address
              </button>
            </>
          )}

          {fpStep === 'reset' && (
            <>
              <div style={{ fontSize: 12, letterSpacing: '.16em', color: color.action, marginBottom: 16 }}>SET A NEW PASSWORD</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <label style={{ display: 'block' }}>
                  <span style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 15.5, color: color.body, marginBottom: 5 }}>
                    New password<span style={{ color: color.action, fontSize: 13 }}>Required</span>
                  </span>
                  <input type="password" placeholder="At least 8 characters" style={{ width: '100%', padding: '11px 12px', border: `1px solid ${line(0.18)}`, borderRadius: 10, background: '#fff', fontSize: 16.5 }} />
                </label>
                <label style={{ display: 'block' }}>
                  <span style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 15.5, color: color.body, marginBottom: 5 }}>
                    Confirm new password<span style={{ color: color.action, fontSize: 13 }}>Required</span>
                  </span>
                  <input type="password" placeholder="••••••••" style={{ width: '100%', padding: '11px 12px', border: `1px solid ${errorField.bd}`, borderRadius: 10, background: errorField.bg, fontSize: 16.5 }} />
                  {showErrors && <span style={{ display: 'block', fontSize: 13.5, lineHeight: 1.5, color: color.dangerDeep, marginTop: 5 }}>The two passwords do not match.</span>}
                </label>
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.7, color: color.faint, margin: '14px 0 0' }}>At least 8 characters · one number · not a password you have used here before</div>
              <button onClick={next} style={{ width: '100%', marginTop: 16, border: 0, borderRadius: 40, padding: 14, background: color.actionBright, color: '#fff', fontSize: 16.5, fontWeight: 600, cursor: 'pointer', boxShadow: '0 10px 24px rgba(23,75,103,.22)' }}>
                Save new password
              </button>
            </>
          )}

          {fpStep === 'done' && (
            <>
              <div style={{ fontSize: 12, letterSpacing: '.16em', color: color.action, marginBottom: 16 }}>DONE</div>
              <div style={{ background: '#F3F7F3', border: '1px solid rgba(32,90,135,.26)', borderRadius: 16, padding: 22 }}>
                <div style={{ fontWeight: 600, letterSpacing: '-.006em', fontSize: 22, color: color.link, marginBottom: 8 }}>Password changed</div>
                <p style={{ fontSize: 16.5, lineHeight: 1.7, color: '#3E5748', margin: '0 0 16px' }}>You have been signed out of other devices. Your saved properties and criteria are unchanged.</p>
                <button onClick={() => navigate('/login')} style={{ border: 0, borderRadius: 40, padding: '12px 20px', background: color.actionBright, color: '#fff', fontSize: 15.5, fontWeight: 600, cursor: 'pointer', boxShadow: '0 10px 24px rgba(23,75,103,.22)' }}>
                  Sign in
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
