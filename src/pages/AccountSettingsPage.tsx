import { useNavigate } from 'react-router-dom';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { Spinner } from '@/components/Feedback';
import { color, line } from '@/styles/theme';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useAppStore } from '@/state/store';

const CONTACT_FIELDS = [
  { label: 'Full name', type: 'text', ph: 'Anna Kovalenko', req: true },
  { label: 'Email', type: 'email', ph: 'anna@example.com', req: true, err: 'That address is already used by another account.' },
  { label: 'Phone', type: 'tel', ph: '+44 7700 900 123' },
  { label: 'Country of residence', type: 'text', ph: 'United Kingdom' },
];

const panel = { background: '#fff', border: `1px solid ${line(0.07)}`, borderRadius: 16, boxShadow: '0 12px 34px rgba(23,75,103,.07)' } as const;
const select = { width: '100%', padding: '13px 14px', border: `1px solid ${line(0.14)}`, borderRadius: 10, background: '#fff', fontSize: 16.5, color: color.link } as const;

export function AccountSettingsPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { showErrors, toggleErrors, setSave, setSetSave, showToast, openModal } = useAppStore();

  const save = () => {
    if (setSave === 'saving') return;
    setSetSave('saving');
    window.setTimeout(() => {
      setSetSave('saved');
      showToast('Contact details saved · confirmation emails sent');
    }, 1500);
  };

  return (
    <div style={{ background: color.ground }}>
      <SiteHeader />
      <div style={{ padding: isMobile ? '20px 18px 40px' : '26px 28px 44px' }}>
        <button onClick={() => navigate('/dashboard')} style={{ border: 0, background: 'transparent', fontSize: 15.5, color: color.faint, cursor: 'pointer', padding: '0 0 12px' }}>
          ← Investor dashboard
        </button>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap', marginBottom: 22 }}>
          <div>
            <h1 style={{ fontWeight: 700, fontSize: 32, textTransform: 'uppercase', letterSpacing: '-.012em', color: color.link, margin: '0 0 5px' }}>Account settings</h1>
            <div style={{ fontSize: 15.5, color: color.faint }}>Anna Kovalenko · investor since March 2026</div>
          </div>
          <button onClick={toggleErrors} style={{ border: `1px solid ${line(0.18)}`, borderRadius: 40, padding: '6px 12px', background: '#fff', color: color.body, fontSize: 13.5, cursor: 'pointer' }}>
            {showErrors ? 'Hide error state' : 'Show error state'}
          </button>
        </div>

        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ flex: '1.5 1 400px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ ...panel, padding: '22px 24px 24px' }}>
              <div style={{ fontSize: 12, letterSpacing: '.16em', color: color.action, marginBottom: 6 }}>CONTACT DETAILS</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 14 }}>
                {CONTACT_FIELDS.map((f) => {
                  const err = showErrors && f.err ? f.err : '';
                  return (
                    <label key={f.label} style={{ display: 'block' }}>
                      <span style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 15.5, color: color.body, marginBottom: 5 }}>
                        {f.label}
                        <span style={{ color: f.req ? color.action : color.muted2, fontSize: 13 }}>{f.req ? 'Required' : 'Optional'}</span>
                      </span>
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

              <div style={{ display: 'flex', gap: 11, alignItems: 'center', flexWrap: 'wrap', marginTop: 18, paddingTop: 16, borderTop: `1px solid ${line(0.1)}` }}>
                <button
                  onClick={save}
                  disabled={setSave === 'saving'}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, border: 0, borderRadius: 40, padding: '11px 18px', background: setSave === 'saving' ? color.action : color.actionBright, color: '#fff', fontSize: 15.5, fontWeight: 600, cursor: setSave === 'saving' ? 'default' : 'pointer' }}
                >
                  {setSave === 'saving' && <Spinner size={13} onDark />}
                  {setSave === 'saving' ? 'Saving…' : setSave === 'saved' ? 'Saved' : 'Save changes'}
                </button>
                <button onClick={() => setSetSave('idle')} style={{ border: 0, background: 'transparent', color: color.faint, fontSize: 15.5, cursor: 'pointer' }}>
                  Discard
                </button>
                {setSave === 'saving' && <span style={{ fontSize: 14, color: color.faint }}>Saving your details — this screen stays open.</span>}
              </div>

              {setSave === 'saved' && (
                <div style={{ marginTop: 14, background: '#F3F7F3', border: '1px solid rgba(32,90,135,.26)', borderRadius: 7, padding: '13px 15px' }}>
                  <div style={{ fontSize: 15.5, fontWeight: 600, color: color.action, marginBottom: 4 }}>Contact details saved</div>
                  <p style={{ fontSize: 15.5, lineHeight: 1.6, color: '#3E5748', margin: 0 }}>
                    Saved 17 Sep, 14:21. Your new email address needs confirming — we sent a link to both the old and the new address, and the change takes effect once you click it.
                  </p>
                </div>
              )}
            </div>

            <div style={{ ...panel, padding: '22px 24px 24px' }}>
              <div style={{ fontSize: 12, letterSpacing: '.16em', color: color.action, marginBottom: 6 }}>INVESTMENT CRITERIA</div>
              <p style={{ fontSize: 15.5, lineHeight: 1.6, color: color.faint, margin: '0 0 16px' }}>Saved from registration. Changing anything here re-ranks your matches immediately.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(170px,1fr))', gap: 14 }}>
                <label style={{ display: 'block' }}>
                  <span style={{ display: 'block', fontSize: 15.5, color: color.body, marginBottom: 5 }}>Country</span>
                  <select style={select} defaultValue="Cyprus">
                    <option>Cyprus</option>
                    <option>Spain</option>
                    <option disabled>Croatia — Coming Soon</option>
                    <option disabled>Montenegro — Coming Soon</option>
                    <option disabled>Portugal — Coming Soon</option>
                    <option disabled>Greece — Coming Soon</option>
                  </select>
                </label>
                <label style={{ display: 'block' }}>
                  <span style={{ display: 'block', fontSize: 15.5, color: color.body, marginBottom: 5 }}>Budget</span>
                  <select style={select} defaultValue="€100k – €200k">
                    <option>€100k – €200k</option>
                    <option>€200k – €300k</option>
                    <option>€300k – €400k</option>
                    <option>€400k – €500k</option>
                    <option>€500k – €600k</option>
                    <option>€600k+</option>
                  </select>
                </label>
                <label style={{ display: 'block' }}>
                  <span style={{ display: 'block', fontSize: 15.5, color: color.body, marginBottom: 5 }}>Minimum gross yield</span>
                  <select style={select} defaultValue="6%">
                    <option>5%</option>
                    <option>6%</option>
                    <option>7%</option>
                    <option>8%+</option>
                  </select>
                </label>
                <label style={{ display: 'block' }}>
                  <span style={{ display: 'block', fontSize: 15.5, color: color.body, marginBottom: 5 }}>Strategy</span>
                  <select style={select} defaultValue="Long-term rental">
                    <option>Long-term rental</option>
                    <option>Short-term rental</option>
                    <option>Mixed with private use</option>
                    <option>Capital growth</option>
                  </select>
                </label>
              </div>
            </div>

            <div style={{ ...panel, padding: '22px 24px 24px' }}>
              <div style={{ fontSize: 12, letterSpacing: '.16em', color: color.action, marginBottom: 16 }}>PASSWORD</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(170px,1fr))', gap: 14 }}>
                <label style={{ display: 'block' }}>
                  <span style={{ display: 'block', fontSize: 15.5, color: color.body, marginBottom: 5 }}>Current password</span>
                  <input type="password" placeholder="••••••••" style={{ ...select, fontVariantNumeric: 'normal' }} />
                </label>
                <label style={{ display: 'block' }}>
                  <span style={{ display: 'block', fontSize: 15.5, color: color.body, marginBottom: 5 }}>New password</span>
                  <input type="password" placeholder="At least 8 characters" style={{ ...select, fontVariantNumeric: 'normal' }} />
                </label>
              </div>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap', marginTop: 16 }}>
                <button onClick={() => showToast('Password updated')} style={{ border: `1px solid ${line(0.18)}`, borderRadius: 40, padding: '11px 18px', background: '#fff', color: color.link, fontSize: 15.5, fontWeight: 500, cursor: 'pointer' }}>
                  Update password
                </button>
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/forgot-password'); }} style={{ fontSize: 15.5, color: color.action }}>
                  Forgot the current one?
                </a>
              </div>
            </div>
          </div>

          <div style={{ flex: '1 1 280px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ ...panel, padding: '22px 22px 24px' }}>
              <div style={{ fontSize: 12, letterSpacing: '.16em', color: color.action, marginBottom: 10 }}>YOUR DATA</div>
              <p style={{ fontSize: 15.5, lineHeight: 1.65, color: color.body, margin: '0 0 14px' }}>Download everything we hold about you, or close the account. Both are rights under GDPR.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                <button onClick={() => showToast('Your data export is being prepared — we will email a link')} style={{ border: `1px solid ${line(0.18)}`, borderRadius: 40, padding: '10px 16px', background: '#fff', color: color.link, fontSize: 15.5, cursor: 'pointer', textAlign: 'left' }}>
                  Download my data
                </button>
                <button
                  onClick={() =>
                    openModal({
                      title: 'Close your account?',
                      body: 'Your saved properties, comparisons and criteria are deleted. Records tied to a completed introduction are kept for seven years as the Privacy Policy sets out.',
                      ok: 'Close account',
                      tone: 'danger',
                      run: () => showToast('Account closure requested — check your email to confirm'),
                    })
                  }
                  style={{ border: '1px solid rgba(179,69,61,.4)', borderRadius: 40, padding: '10px 16px', background: '#fff', color: color.dangerDeep, fontSize: 15.5, cursor: 'pointer', textAlign: 'left' }}
                >
                  Close my account
                </button>
              </div>
              <p style={{ fontSize: 13.5, lineHeight: 1.6, color: color.faint, margin: '12px 0 0' }}>
                Records tied to a completed introduction are kept for seven years, as set out in the{' '}
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/privacy'); }}>
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
