import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@/components/Feedback';
import { DEV_REQ } from './ForDevelopersPage';
import { color, line } from '@/styles/theme';
import { useAppStore } from '@/state/store';

interface FieldDef {
  label: string;
  type: string;
  ph: string;
  req?: boolean;
  err?: string;
}

const COMPANY: FieldDef[] = [
  { label: 'Registered company name', type: 'text', ph: 'Aegean Living Developments Ltd', req: true, err: 'Enter the name exactly as registered.' },
  { label: 'Registration number', type: 'text', ph: 'HE 412 887', req: true, err: 'We could not find this number in the Cyprus register.' },
  { label: 'Country of registration', type: 'text', ph: 'Cyprus', req: true, err: 'Choose Cyprus or Spain — other markets are not open yet.' },
  { label: 'Developer licence number', type: 'text', ph: 'LIC-2024-00318', req: true, err: 'Required before verification can start.' },
  { label: 'Company website', type: 'text', ph: 'aegeanliving.com' },
  { label: 'Years active', type: 'text', ph: '8' },
];

const CONTACT: FieldDef[] = [
  { label: 'Contact name', type: 'text', ph: 'Maria Christodoulou', req: true, err: 'Enter the person who will handle enquiries.' },
  { label: 'Work email', type: 'email', ph: 'maria@aegeanliving.com', req: true, err: 'Use a company address — free mail domains are not accepted.' },
  { label: 'Phone', type: 'tel', ph: '+357 99 123 456', req: true, err: 'Include the country code.' },
  { label: 'Password', type: 'password', ph: '••••••••', req: true, err: 'Use at least 8 characters, including one number.' },
  { label: 'Confirm password', type: 'password', ph: '••••••••', req: true, err: 'The two passwords do not match.' },
  { label: 'Role', type: 'text', ph: 'Head of Sales' },
];

const PORTFOLIO: FieldDef[] = [
  { label: 'Projects completed', type: 'text', ph: '11' },
  { label: 'Projects currently selling', type: 'text', ph: '3' },
  { label: 'Typical unit price', type: 'text', ph: '€180k – €320k' },
];

const DOCS = [
  { label: 'Company registration certificate', note: 'PDF · mandatory before verification', chip: 'REQUIRED', cBg: '#E5F6FF', cFg: color.action },
  { label: 'Developer licence', note: 'PDF · mandatory before verification', chip: 'REQUIRED', cBg: '#E5F6FF', cFg: color.action },
  { label: 'Building permit for first project', note: 'PDF · needed before a project is published, not to open the account', chip: 'TO CONFIRM', cBg: '#D3E5F2', cFg: color.action },
  { label: 'Escrow or bank guarantee confirmation', note: 'PDF · off-plan projects only', chip: 'TO CONFIRM', cBg: '#D3E5F2', cFg: color.action },
  { label: 'Two client or bank references', note: 'PDF or letter · optional, strengthens the application', chip: 'OPTIONAL', cBg: '#F0F7FC', cFg: color.faint },
];

const STAGES = [
  { num: '01', title: 'Account created', body: 'You get portal access immediately, in read-only mode.', active: true },
  { num: '02', title: 'Verification', body: 'We check the licence, permit and references. Two to five working days.', active: false },
  { num: '03', title: 'Project submission', body: 'Portal unlocks. Upload units, pricing, schedule and media.', active: false },
  { num: '04', title: 'Scoring and publication', body: 'We model the numbers, share the indicative score, then publish.', active: false },
];

const panel = { background: '#fff', border: '1px solid rgba(32,90,135,.08)', borderRadius: 16, boxShadow: '0 12px 34px rgba(23,75,103,.07)' } as const;

function Section({ title, fields, showErrors, cols = 190 }: { title: string; fields: FieldDef[]; showErrors: boolean; cols?: number }) {
  return (
    <div style={{ ...panel, padding: '24px 24px 26px' }}>
      <div style={{ fontSize: 12, letterSpacing: '.16em', color: color.ink, marginBottom: 16 }}>{title}</div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit,minmax(${cols}px,1fr))`, gap: 14 }}>
        {fields.map((f) => {
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
    </div>
  );
}

export function DeveloperSignupPage() {
  const navigate = useNavigate();
  const { showErrors, toggleErrors, devSubmitting, setDevSubmitting, docProgress, setDocProgress, showToast } = useAppStore();

  useEffect(() => {
    if (docProgress === null || docProgress >= 100) return;
    const t = window.setTimeout(() => setDocProgress(Math.min(100, docProgress + Math.round(8 + Math.random() * 14))), 320);
    return () => window.clearTimeout(t);
  }, [docProgress, setDocProgress]);

  const submit = () => {
    if (devSubmitting) return;
    setDevSubmitting(true);
    window.setTimeout(() => {
      setDevSubmitting(false);
      navigate('/developer-portal');
      showToast('Application submitted · verification started');
    }, 1600);
  };

  return (
    <div style={{ background: color.ground }}>
      <div style={{ background: color.ink, color: color.sky, padding: '26px 28px 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 340px', minWidth: 0 }}>
            <button onClick={() => navigate('/developers')} style={{ border: 0, background: 'transparent', fontSize: 15.5, color: color.edge, cursor: 'pointer', padding: '0 0 12px' }}>
              ← For Developers
            </button>
            <div style={{ fontSize: 12, letterSpacing: '.2em', color: color.gold, marginBottom: 10 }}>DEVELOPER ACCOUNT APPLICATION</div>
            <h1 style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-.012em', fontSize: 34, lineHeight: 1.12, margin: '0 0 10px', textWrap: 'pretty' }}>Apply to list projects</h1>
            <p style={{ fontSize: 16.5, lineHeight: 1.65, color: color.edge, maxWidth: '52ch', margin: 0 }}>
              Company, licence and one contact person. Verification takes two to five working days — you can prepare a project in the portal while it runs.
            </p>
          </div>
          <div style={{ flex: '1 1 300px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {STAGES.map((s) => (
              <div key={s.num} style={{ display: 'flex', gap: 12, alignItems: 'baseline', border: `1px solid ${s.active ? 'rgba(221,180,94,.5)' : line(0.14)}`, borderRadius: 7, padding: '10px 13px' }}>
                <span style={{ fontWeight: 600, fontSize: 15.5, color: s.active ? color.gold : color.edge, flex: 'none' }}>{s.num}</span>
                <span style={{ minWidth: 0 }}>
                  <span style={{ fontSize: 15.5, fontWeight: 600, color: s.active ? color.gold : color.edge }}>{s.title}</span>
                  <br />
                  <span style={{ fontSize: 14, lineHeight: 1.5, color: color.edge }}>{s.body}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '28px 28px 40px', display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'flex-start' }}>
        <div style={{ flex: '1.5 1 420px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 14, flexWrap: 'wrap' }}>
            <p style={{ fontSize: 15.5, lineHeight: 1.6, color: color.body, margin: 0, maxWidth: '60ch' }}>
              Fields marked Required are what verification needs. Everything marked Optional can be added later from the portal.
            </p>
            <button onClick={toggleErrors} style={{ border: '1px solid rgba(32,90,135,.22)', borderRadius: 40, padding: '6px 12px', background: '#fff', color: color.body, fontSize: 13.5, cursor: 'pointer', flex: 'none' }}>
              {showErrors ? 'Hide error state' : 'Show error state'}
            </button>
          </div>

          {showErrors && (
            <div style={{ background: color.dangerWash, border: '1px solid rgba(179,69,61,.35)', borderRadius: 16, padding: '15px 17px' }}>
              <div style={{ fontSize: 16.5, fontWeight: 600, color: color.dangerDeep, marginBottom: 5 }}>Your application was not submitted</div>
              <div style={{ fontSize: 15.5, lineHeight: 1.6, color: color.dangerDeep }}>
                Nine required fields are empty or invalid. Nothing has been lost — fix the fields marked below and submit again.
              </div>
            </div>
          )}

          <Section title="1 — COMPANY" fields={COMPANY} showErrors={showErrors} />
          <Section title="2 — ACCOUNT CONTACT" fields={CONTACT} showErrors={showErrors} />

          <div style={{ ...panel, padding: '24px 24px 26px' }}>
            <div style={{ fontSize: 12, letterSpacing: '.16em', color: color.ink, marginBottom: 16 }}>3 — PORTFOLIO</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(170px,1fr))', gap: 14, marginBottom: 16 }}>
              {PORTFOLIO.map((f) => (
                <label key={f.label} style={{ display: 'block' }}>
                  <span style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 15.5, color: color.body, marginBottom: 5 }}>
                    {f.label}
                    <span style={{ color: color.muted2, fontSize: 13 }}>Optional</span>
                  </span>
                  <input type={f.type} placeholder={f.ph} style={{ width: '100%', padding: '10px 11px', border: `1px solid ${line(0.18)}`, borderRadius: 10, background: '#fff', fontSize: 16.5 }} />
                </label>
              ))}
            </div>
            <label style={{ display: 'block' }}>
              <span style={{ display: 'block', fontSize: 15.5, color: color.body, marginBottom: 5 }}>Markets you build in</span>
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', paddingTop: 2 }}>
                <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 16.5, color: color.body }}>
                  <input type="checkbox" defaultChecked style={{ accentColor: color.ink, width: 15, height: 15 }} />
                  Cyprus
                </label>
                <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 16.5, color: color.body }}>
                  <input type="checkbox" style={{ accentColor: color.ink, width: 15, height: 15 }} />
                  Spain
                </label>
              </div>
            </label>
          </div>

          <div style={{ ...panel, padding: '24px 24px 26px' }}>
            <div style={{ fontSize: 12, letterSpacing: '.16em', color: color.ink, marginBottom: 6 }}>4 — VERIFICATION DOCUMENTS</div>
            <p style={{ fontSize: 15.5, lineHeight: 1.6, color: color.body, margin: '0 0 14px', maxWidth: '56ch' }}>
              Two documents are needed to open the account. The rest depend on the project and can follow.
            </p>
            <div style={{ background: '#D3E5F2', border: '1px solid rgba(221,180,94,.3)', borderRadius: 7, padding: '12px 14px', fontSize: 14, lineHeight: 1.6, color: color.action, marginBottom: 16 }}>
              Open question for the client: which of these are legally mandatory in Cyprus and Spain, and which are our own requirement. The TO CONFIRM rows are a guess.
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {DOCS.map((d) => (
                <div key={d.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14, flexWrap: 'wrap', border: '1px dashed rgba(32,90,135,.26)', borderRadius: 7, padding: '12px 14px', background: '#FFFFFF' }}>
                  <span style={{ minWidth: 0, flex: '1 1 220px' }}>
                    <span style={{ display: 'flex', gap: 9, alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 16.5, color: color.ink }}>{d.label}</span>
                      <span style={{ fontSize: 11, letterSpacing: '.12em', padding: '3px 7px', borderRadius: 3, background: d.cBg, color: d.cFg, flex: 'none' }}>{d.chip}</span>
                    </span>
                    <span style={{ display: 'block', fontSize: 13.5, color: color.muted, marginTop: 3 }}>{d.note}</span>
                  </span>
                  <button onClick={() => setDocProgress(4)} style={{ border: '1px solid rgba(32,90,135,.26)', borderRadius: 40, padding: '7px 14px', background: '#fff', color: color.ink, fontSize: 14, fontWeight: 500, cursor: 'pointer', flex: 'none' }}>
                    Upload
                  </button>
                </div>
              ))}
            </div>

            {docProgress !== null && (
              <div style={{ marginTop: 12, background: '#FFFFFF', border: `1px solid ${line(0.14)}`, borderRadius: 7, padding: '12px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline', marginBottom: 6 }}>
                  <span style={{ fontSize: 15.5, color: color.ink }}>licence_2024_00318.pdf</span>
                  <span style={{ fontSize: 13.5, color: color.muted2, fontVariantNumeric: 'tabular-nums' }}>{docProgress}%</span>
                </div>
                <div style={{ height: 5, borderRadius: 3, background: 'rgba(32,90,135,.1)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: 3, background: color.action, width: `${docProgress}%` }} />
                </div>
                <div style={{ fontSize: 13.5, color: color.muted2, marginTop: 8 }}>pdf up to 20 MB · we scan each document before a reviewer sees it</div>
              </div>
            )}

            {showErrors && (
              <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start', marginTop: 14, background: color.dangerWash, border: '1px solid rgba(179,69,61,.3)', borderRadius: 7, padding: '12px 14px' }}>
                <span style={{ flex: 'none', color: color.dangerDeep, fontSize: 15.5 }}>!</span>
                <span style={{ fontSize: 15.5, lineHeight: 1.6, color: color.dangerDeep }}>
                  Company registration certificate and developer licence are still missing. You can submit the application without them, but verification will not start.
                </span>
              </div>
            )}
          </div>
        </div>

        <div style={{ flex: '1 1 280px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ ...panel, padding: '22px 22px 24px' }}>
            <div style={{ fontSize: 12, letterSpacing: '.16em', color: color.ink, marginBottom: 14 }}>BEFORE YOU SUBMIT</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 18 }}>
              {DEV_REQ.map((r) => (
                <div key={r} style={{ display: 'flex', gap: 10, alignItems: 'baseline', fontSize: 15.5, color: color.body, lineHeight: 1.5 }}>
                  <span style={{ color: color.ink, flex: 'none' }}>✓</span>
                  {r}
                </div>
              ))}
            </div>
            <label style={{ display: 'flex', gap: 9, alignItems: 'flex-start', fontSize: 15.5, color: color.body, lineHeight: 1.5, marginBottom: 8 }}>
              <input type="checkbox" style={{ accentColor: color.ink, width: 15, height: 15, marginTop: 2 }} />
              <span>The information given is accurate and I am authorised to represent this company.</span>
            </label>
            <label style={{ display: 'flex', gap: 9, alignItems: 'flex-start', fontSize: 15.5, color: color.body, lineHeight: 1.5, marginBottom: 18 }}>
              <input type="checkbox" style={{ accentColor: color.ink, width: 15, height: 15, marginTop: 2 }} />
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
              onClick={submit}
              disabled={devSubmitting}
              style={{ width: '100%', border: 0, borderRadius: 40, padding: '14px 20px', background: devSubmitting ? color.action : color.ink, color: '#fff', fontSize: 16.5, fontWeight: 600, cursor: devSubmitting ? 'default' : 'pointer', display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'center', minHeight: 50 }}
            >
              {devSubmitting && <Spinner onDark />}
              {devSubmitting ? 'Submitting…' : 'Submit application'}
            </button>
            <p style={{ fontSize: 13.5, lineHeight: 1.6, color: color.muted, margin: '12px 0 0' }}>
              {devSubmitting ? 'Uploading documents and creating your account. This takes a few seconds — do not close the tab.' : 'You will be taken to the portal in read-only mode while we verify.'}
            </p>
          </div>

          <div style={{ ...panel, padding: '20px 22px 22px' }}>
            <div style={{ fontSize: 12, letterSpacing: '.16em', color: color.ink, marginBottom: 10 }}>FEES</div>
            <p style={{ fontSize: 15.5, lineHeight: 1.65, color: color.body, margin: 0 }}>
              No listing fee. We are paid a success fee by the developer when an introduction leads to a completed sale, disclosed on the property page. Placeholder for the prototype — confirm the commercial model.
            </p>
          </div>

          <div style={{ border: '1px solid rgba(32,90,135,.08)', borderRadius: 16, boxShadow: '0 12px 34px rgba(23,75,103,.07)', padding: '20px 22px 22px' }}>
            <div style={{ fontSize: 12, letterSpacing: '.16em', color: color.ink, marginBottom: 8 }}>ALREADY APPLIED?</div>
            <p style={{ fontSize: 15.5, lineHeight: 1.6, color: color.body, margin: '0 0 12px' }}>Sign in to check the status of your verification.</p>
            <button onClick={() => navigate('/login')} style={{ border: '1px solid rgba(32,90,135,.26)', borderRadius: 40, padding: '10px 18px', background: '#fff', color: color.ink, fontSize: 15.5, fontWeight: 500, cursor: 'pointer' }}>
              Developer login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
