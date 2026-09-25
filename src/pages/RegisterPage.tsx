import { useNavigate } from 'react-router-dom';
import panelBg from '@/assets/panel-bg.jpg';
import { Logo } from '@/components/Logo';
import { Spinner } from '@/components/Feedback';
import { color, line } from '@/styles/theme';
import { useAppStore } from '@/state/store';

const PROMISE = [
  { num: '01', body: 'We match your budget and target yield against analyzed best options.' },
  { num: '02', body: 'You see the full financial picture before any developer sees your name.' },
  { num: '03', body: 'No listing spam. You are informed about the matches only.' },
];

const FIELDS = [
  { label: 'Full name', type: 'text', ph: 'As it appears on your ID', req: true, err: 'Enter your full name.' },
  { label: 'Email', type: 'email', ph: 'you@example.com', req: true, err: 'This address is already registered. Sign in instead?' },
  { label: 'Password', type: 'password', ph: 'At least 8 characters', req: true, err: 'Use at least 8 characters, including one number.' },
  { label: 'Phone', type: 'tel', ph: '+44 …' },
  { label: 'Country of residence', type: 'text', ph: 'United Kingdom' },
];

const SOON = ['Croatia', 'Montenegro', 'Portugal', 'Greece'];
const STRATEGIES = ['Long-term rental', 'Short-term rental', 'Mixed with private use', 'Capital growth'];

const selectStyle = { width: '100%', padding: '13px 14px', border: `1px solid ${line(0.14)}`, borderRadius: 10, background: '#fff', fontSize: 16.5 } as const;
const checkbox = { accentColor: color.action, width: 15, height: 15 } as const;

function MarkedLabel({ label, required }: { label: string; required?: boolean }) {
  return (
    <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, fontSize: 15.5, color: color.body, marginBottom: 5 }}>
      <span style={{ minWidth: 0, overflowWrap: 'break-word' }}>{label}</span>
      <span style={{ flex: 'none', whiteSpace: 'nowrap', color: required ? color.action : color.muted2, fontSize: 13 }}>{required ? 'Required' : 'Optional'}</span>
    </span>
  );
}

export function RegisterPage() {
  const navigate = useNavigate();
  const { showErrors, toggleErrors, submitting, setSubmitting } = useAppStore();

  const submit = () => {
    if (submitting) return;
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      navigate('/dashboard');
    }, 1400);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch', minHeight: '100vh' }}>
      <div style={{ flex: '1 1 300px', minWidth: 0, position: 'relative', overflow: 'hidden', background: '#0C4A60', color: '#fff', padding: '40px 32px' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${panelBg})`, backgroundSize: 'cover', backgroundPosition: '42% 58%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(150deg,rgba(5,52,68,.9) 0%,rgba(7,72,92,.84) 46%,rgba(10,92,110,.78) 100%)' }} />
        <div style={{ position: 'relative', background: 'rgba(5,56,72,.46)', backdropFilter: 'blur(3px)', borderRadius: 20, padding: '22px 24px 24px' }}>
          <div style={{ marginBottom: 34, display: 'flex' }}>
            <Logo onDark markHeight={50} wordSize={28} ruleSize={10.5} />
          </div>
          <h1 style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-.012em', fontSize: 36, lineHeight: 1.14, margin: '0 0 16px', textWrap: 'pretty' }}>
            Find properties that best match your investment goals
          </h1>
          <p style={{ fontSize: 16.5, lineHeight: 1.65, color: '#E4F5FD', maxWidth: '44ch', margin: '0 0 30px' }}>Tell us the return you wish. We will only show properties that fulfill it.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {PROMISE.map((p) => (
              <div key={p.num} style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
                <span style={{ fontWeight: 600, fontSize: 15.5, color: color.gold }}>{p.num}</span>
                <span style={{ fontSize: 16.5, lineHeight: 1.55, color: '#E4F5FD' }}>{p.body}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ flex: '1.4 1 380px', minWidth: 0, padding: '36px 32px 42px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 14, flexWrap: 'wrap', marginBottom: 16 }}>
          <div style={{ fontSize: 12, letterSpacing: '.16em', color: color.action }}>YOUR INVESTMENT CRITERIA</div>
          <button onClick={toggleErrors} style={{ border: `1px solid ${line(0.18)}`, borderRadius: 40, padding: '6px 12px', background: '#fff', color: color.body, fontSize: 13.5, cursor: 'pointer' }}>
            {showErrors ? 'Hide error state' : 'Show error state'}
          </button>
        </div>

        {showErrors && (
          <div style={{ background: color.dangerWash, border: '1px solid rgba(179,69,61,.35)', borderRadius: 7, padding: '13px 15px', marginBottom: 18 }}>
            <div style={{ fontSize: 15.5, fontWeight: 600, color: color.dangerDeep, marginBottom: 4 }}>Three fields need attention</div>
            <div style={{ fontSize: 15.5, lineHeight: 1.6, color: color.dangerDeep }}>
              Nothing has been saved yet. Required fields are marked; the rest you can add later from your account settings.
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 14, marginBottom: 22 }}>
          <label style={{ display: 'block' }}>
            <MarkedLabel label="Your budget" required />
            <select style={selectStyle}>
              <option>€100k – €200k</option>
              <option>€200k – €300k</option>
              <option>€300k – €400k</option>
              <option>€400k – €500k</option>
              <option>€500k – €600k</option>
              <option>€600k+</option>
            </select>
          </label>
          <label style={{ display: 'block' }}>
            <MarkedLabel label="Target yield" required />
            <select style={selectStyle}>
              <option>5%</option>
              <option>6%</option>
              <option>7%</option>
              <option>8%+</option>
            </select>
          </label>
          <label style={{ display: 'block' }}>
            <MarkedLabel label="Time horizon" />
            <select style={selectStyle}>
              <option>3–5 years</option>
              <option>5–10 years</option>
              <option>10+ years</option>
            </select>
          </label>
        </div>

        <div style={{ display: 'flex', gap: 26, flexWrap: 'wrap', marginBottom: 26 }}>
          <div>
            <div style={{ fontSize: 12, letterSpacing: '.14em', color: color.faint, marginBottom: 8 }}>COUNTRIES</div>
            {['Cyprus', 'Spain'].map((c) => (
              <label key={c} style={{ display: 'flex', gap: 9, alignItems: 'center', fontSize: 16.5, padding: '3px 0' }}>
                <input type="checkbox" defaultChecked style={checkbox} />
                {c}
              </label>
            ))}
            {SOON.map((c) => (
              <label key={c} style={{ display: 'flex', gap: 9, alignItems: 'center', fontSize: 16.5, padding: '3px 0', color: color.placeholder }}>
                <input type="checkbox" disabled style={checkbox} />
                {c} <span style={{ fontSize: 12.5, letterSpacing: '.1em' }}>SOON</span>
              </label>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 12, letterSpacing: '.14em', color: color.faint, marginBottom: 8 }}>STRATEGY</div>
            {STRATEGIES.map((s, i) => (
              <label key={s} style={{ display: 'flex', gap: 9, alignItems: 'center', fontSize: 16.5, padding: '3px 0' }}>
                <input type="checkbox" defaultChecked={i === 0} style={checkbox} />
                {s}
              </label>
            ))}
          </div>
        </div>

        <div style={{ height: 1, background: line(0.12), marginBottom: 24 }} />
        <div style={{ fontSize: 12, letterSpacing: '.16em', color: color.action, marginBottom: 16 }}>YOUR DETAILS</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 14, marginBottom: 18 }}>
          {FIELDS.map((f) => {
            const err = showErrors && f.err ? f.err : '';
            return (
              <label key={f.label} style={{ display: 'block' }}>
                <MarkedLabel label={f.label} required={f.req} />
                <input
                  type={f.type}
                  placeholder={f.ph}
                  style={{ width: '100%', padding: '10px 11px', border: `1px solid ${err ? color.danger : line(0.18)}`, borderRadius: 10, background: err ? color.dangerWash : '#fff', fontSize: 16.5 }}
                />
                {err && <span style={{ display: 'block', fontSize: 13.5, lineHeight: 1.5, color: color.dangerDeep, marginTop: 5 }}>{err}</span>}
              </label>
            );
          })}
        </div>

        <label style={{ display: 'flex', gap: 9, alignItems: 'flex-start', fontSize: 15.5, color: color.body, lineHeight: 1.5, marginBottom: 6 }}>
          <input type="checkbox" style={{ ...checkbox, marginTop: 2 }} />
          <span>
            I agree to the{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/privacy'); }}>
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/terms'); }}>
              Terms of Use
            </a>
            . <span style={{ color: color.action }}>Required</span>
          </span>
        </label>
        <p style={{ fontSize: 13.5, lineHeight: 1.6, color: color.faint, margin: '0 0 20px', maxWidth: '56ch' }}>
          Only name, email, password, budget and target yield are needed to open an account. Phone and country help us introduce you to a developer and can be added later.
        </p>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={submit}
            disabled={submitting}
            style={{ border: 0, borderRadius: 40, padding: '14px 28px', background: submitting ? color.action : color.actionBright, color: '#fff', fontSize: 16.5, fontWeight: 600, cursor: submitting ? 'default' : 'pointer', display: 'flex', gap: 10, alignItems: 'center', minHeight: 48 }}
          >
            {submitting && <Spinner onDark />}
            {submitting ? 'Creating your account…' : 'Show My Investments'}
          </button>
          {submitting && <span style={{ fontSize: 14, color: color.faint }}>Checking the email address and saving your criteria. Do not close this tab.</span>}
        </div>
      </div>
    </div>
  );
}
