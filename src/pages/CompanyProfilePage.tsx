import { useNavigate } from 'react-router-dom';
import { DevPortalLayout, devPanel } from '@/layouts/DevPortalLayout';
import { color, line } from '@/styles/theme';
import { useAppStore } from '@/state/store';

const COMPANY_FIELDS = [
  { label: 'Registered company name', type: 'text', ph: 'XYZ Developments Ltd', req: true },
  { label: 'Registration number', type: 'text', ph: 'HE 418 220', req: true },
  { label: 'Country of registration', type: 'text', ph: 'Cyprus', req: true },
  { label: 'Developer licence number', type: 'text', ph: 'PDL / 2019-0442', req: true },
  { label: 'Registered address', type: 'text', ph: '12 Georgiou A, Paphos' },
  { label: 'Company website', type: 'text', ph: 'xyzdevelopments.cy' },
];

const CONTACT_FIELDS = [
  { label: 'Primary contact', type: 'text', ph: 'A. Georgiou', req: true },
  { label: 'Work email', type: 'email', ph: 'a.georgiou@xyzdevelopments.cy', req: true },
  { label: 'Phone', type: 'tel', ph: '+357 99 400 118', req: true },
  { label: 'Role', type: 'text', ph: 'Sales Director' },
];

function Field({ label, type, ph, req }: { label: string; type: string; ph: string; req?: boolean }) {
  return (
    <label style={{ display: 'block' }}>
      <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, fontSize: 15.5, color: color.dim, marginBottom: 5 }}>
        <span style={{ minWidth: 0 }}>{label}</span>
        <span style={{ flex: 'none', whiteSpace: 'nowrap', color: req ? color.action : color.muted2, fontSize: 13 }}>{req ? 'Required' : 'Optional'}</span>
      </span>
      <input type={type} placeholder={ph} style={{ width: '100%', padding: '10px 11px', border: `1px solid ${line(0.18)}`, borderRadius: 10, background: '#fff', fontSize: 16.5 }} />
    </label>
  );
}

export function CompanyProfilePage() {
  const navigate = useNavigate();
  const { companySaved, setCompanySaved, showToast } = useAppStore();

  const save = () => {
    setCompanySaved(true);
    showToast('Company profile saved · changes to the licence go back to verification');
  };

  return (
    <DevPortalLayout>
      <div style={{ padding: '28px 32px 40px' }}>
        <button onClick={() => navigate('/developer-portal')} style={{ border: 0, background: 'transparent', fontSize: 15.5, color: color.muted2, cursor: 'pointer', padding: '0 0 12px' }}>
          ← Developer portal
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px 16px', flexWrap: 'wrap', margin: '0 0 6px' }}>
          <h1 style={{ fontWeight: 700, fontSize: 32, textTransform: 'uppercase', letterSpacing: '-.012em', color: color.ink, margin: 0 }}>Company Profile</h1>
          <button
            onClick={() => navigate('/developer-portal/verification')}
            title="Verified 19 Jun 2026 · Licence valid to 12 Mar 2028"
            style={{ flex: 'none', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 8, border: '1px solid rgba(42,92,68,.25)', borderRadius: 40, padding: '6px 14px 6px 10px', background: '#EEF4EF', color: '#2A5C44', fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}
          >
            <span style={{ width: 8, height: 8, borderRadius: 40, background: '#3E8A62' }} />
            Verified · licence to Mar 2028
          </button>
        </div>
        <p style={{ fontSize: 16.5, lineHeight: 1.6, color: color.muted2, margin: '0 0 22px', maxWidth: '66ch' }}>
          This is the company record used on every project, so you do not re-enter it each time. None of it is visible to investors — listings read “Introduced by Best Invest” until an introduction is approved.
        </p>

        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 360px', minWidth: 0, maxWidth: 960, display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ ...devPanel, padding: 22 }}>
              <div style={{ fontSize: 12, letterSpacing: '.16em', color: color.muted2, marginBottom: 16 }}>REGISTERED COMPANY</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 14 }}>
                {COMPANY_FIELDS.map((f) => (
                  <Field key={f.label} {...f} />
                ))}
              </div>
              <div style={{ fontSize: 13.5, lineHeight: 1.6, color: color.action, background: '#D3E5F2', borderRadius: 10, padding: '10px 12px', marginTop: 14 }}>
                Changing the registration number or licence sends the account back through verification. Projects already published stay live while that happens.
              </div>
            </div>

            <div style={{ ...devPanel, padding: 22 }}>
              <div style={{ fontSize: 12, letterSpacing: '.16em', color: color.muted2, marginBottom: 6 }}>ACCOUNT CONTACT</div>
              <p style={{ fontSize: 15.5, lineHeight: 1.6, color: color.muted2, margin: '0 0 16px', maxWidth: '58ch' }}>
                The person we send leads, change decisions and verification results to. Released to an investor only after Best Invest approves an introduction.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 14 }}>
                {CONTACT_FIELDS.map((f) => (
                  <Field key={f.label} {...f} />
                ))}
              </div>
              <div style={{ display: 'flex', gap: 11, flexWrap: 'wrap', alignItems: 'center', marginTop: 18 }}>
                <button onClick={save} style={{ border: 0, borderRadius: 40, padding: '12px 20px', background: color.ink, color: color.sky, fontSize: 15.5, fontWeight: 600, cursor: 'pointer' }}>
                  Save changes
                </button>
                <button onClick={() => navigate('/developer-portal')} style={{ border: '1px solid rgba(32,90,135,.22)', borderRadius: 40, padding: '12px 18px', background: '#fff', color: color.ink, fontSize: 15.5, cursor: 'pointer' }}>
                  Discard
                </button>
                {companySaved && <span style={{ fontSize: 15.5, color: color.action }}>Saved 17 Sep, 14:12</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DevPortalLayout>
  );
}
