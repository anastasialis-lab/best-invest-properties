import { useNavigate } from 'react-router-dom';
import { DevPortalLayout, DevPortalHeader, devPanel } from '@/layouts/DevPortalLayout';
import { PreviewBar, StateChips } from '@/components/PreviewStates';
import { color, line } from '@/styles/theme';
import { useAppStore } from '@/state/store';

const STATS = [
  { k: 'Projects', v: '3' },
  { k: 'Available units', v: '28' },
  { k: 'Investor enquiries', v: '14' },
  { k: 'Active leads', v: '6' },
];

const PROJECTS = [
  { name: 'Coral Bay Residences', meta: 'Paphos · 12 units · completion 2027', status: 'Published' },
  { name: 'Marina Court', meta: 'Larnaca · 9 units · completion 2026', status: 'Pending review' },
  { name: 'Casa Alicante', meta: 'Alicante · 7 units · ready', status: 'Published' },
];

const LEADS = [
  { who: 'Investor #2841', what: 'Marina Court · 2 days' },
  { who: 'Investor #2836', what: 'Coral Bay · 4 days' },
  { who: 'Investor #2829', what: 'Casa Alicante · 6 days' },
  { who: 'Investor #2814', what: 'Coral Bay · 9 days' },
];

export function DeveloperPortalPage() {
  const navigate = useNavigate();
  const { devPortalState, setDevPortalState } = useAppStore();

  return (
    <DevPortalLayout>
      <DevPortalHeader title="XYZ Developments" />
      <div style={{ padding: '26px 28px 40px' }}>
        <PreviewBar>
          <StateChips
            label="PREVIEW STATE"
            current={devPortalState}
            onPick={setDevPortalState}
            choices={[
              { value: 'verified' as const, label: 'Verified' },
              { value: 'pending' as const, label: 'Verification pending' },
              { value: 'changes' as const, label: 'Changes requested' },
              { value: 'approved' as const, label: 'Change approved' },
            ]}
          />
        </PreviewBar>

        {devPortalState === 'pending' && (
          <Banner
            bg={color.goldWash}
            border="rgba(221,180,94,.42)"
            titleColor={color.link}
            bodyColor={color.body}
            title="Verification in progress — portal is read-only"
            body="We are checking your licence and registration documents. You can look around, but projects cannot be submitted until verification completes. Applied 15 Sep · decision expected by 22 Sep."
            action={{ label: 'See verification status', onClick: () => navigate('/developer-portal/verification'), bg: color.actionBright, fg: '#fff' }}
          />
        )}
        {devPortalState === 'changes' && (
          <Banner
            bg={color.dangerWash}
            border="rgba(179,69,61,.32)"
            titleColor={color.dangerDeep}
            bodyColor={color.dangerDeep}
            title="Changes requested on Casa Olivar"
            body="Best Invest needs the building permit and a rent estimate for units 5–9 before this project can be published. Only the named fields are editable; everything else stays locked."
            action={{ label: 'Open the request', onClick: () => navigate('/developer-portal/projects'), bg: color.dangerDeep, fg: '#fff' }}
          />
        )}
        {devPortalState === 'approved' && (
          <Banner
            bg="#EEF4EF"
            border="rgba(32,90,135,.3)"
            titleColor="#2A5C44"
            bodyColor="#3C6B52"
            title="Two price changes approved"
            body="Coral Bay B-301 and A-102 are live with the new values as of 17 Sep, 09:40. Investors who saved these units have been notified."
            action={{ label: 'See change history', onClick: () => navigate('/developer-portal/units'), bg: '#fff', fg: '#2A5C44', border: 'rgba(32,90,135,.35)' }}
          />
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 14, marginBottom: 26 }}>
          {STATS.map((s) => (
            <div key={s.k} style={{ ...devPanel, padding: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 38, color: color.ink, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{s.v}</div>
              <div style={{ fontSize: 13.5, letterSpacing: '.09em', color: color.muted2, marginTop: 8 }}>{s.k}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ flex: '1.3 1 340px', minWidth: 0, ...devPanel, padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, marginBottom: 14 }}>
              <div style={{ fontWeight: 600, letterSpacing: '-.006em', fontSize: 20, color: color.ink }}>Projects</div>
              <button onClick={() => navigate('/developer-portal/projects')} style={{ border: 0, background: 'transparent', fontSize: 15.5, color: color.action, cursor: 'pointer', padding: 0 }}>
                Manage projects →
              </button>
            </div>
            {PROJECTS.map((p) => (
              <div key={p.name} style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(32,90,135,.09)' }}>
                <div style={{ width: 56, height: 42, flex: 'none', borderRadius: 10, backgroundImage: 'repeating-linear-gradient(135deg,#CBDFED 0 8px,#E5F6FF 8px 16px)' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 16.5, color: color.ink, fontWeight: 500 }}>{p.name}</div>
                  <div style={{ fontSize: 14, color: color.muted2 }}>{p.meta}</div>
                </div>
                <span
                  style={{
                    fontSize: 13,
                    padding: '4px 9px',
                    borderRadius: 4,
                    background: p.status === 'Published' ? 'rgba(10,37,64,.1)' : 'rgba(221,180,94,.2)',
                    color: p.status === 'Published' ? color.ink : color.action,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {p.status}
                </span>
              </div>
            ))}
          </div>

          <div style={{ flex: '1 1 280px', minWidth: 0, ...devPanel, padding: 20 }}>
            <div style={{ fontWeight: 600, letterSpacing: '-.006em', fontSize: 20, color: color.ink, marginBottom: 14 }}>Recent investor enquiries</div>
            {LEADS.map((l) => (
              <div key={l.who} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: '11px 0', borderBottom: '1px solid rgba(32,90,135,.09)', fontSize: 15.5 }}>
                <span style={{ color: color.ink }}>{l.who}</span>
                <span style={{ color: color.muted2 }}>{l.what}</span>
              </div>
            ))}
            <div style={{ fontSize: 13.5, lineHeight: 1.6, color: color.muted2, marginTop: 14 }}>
              Leads are qualified by Best Invest, and investor contact details are released only after Best Invest approves the introduction.{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/developer-portal/leads'); }} style={{ color: color.action }}>
                Open leads
              </a>
            </div>
          </div>
        </div>
      </div>
    </DevPortalLayout>
  );
}

function Banner({
  bg,
  border,
  titleColor,
  bodyColor,
  title,
  body,
  action,
}: {
  bg: string;
  border: string;
  titleColor: string;
  bodyColor: string;
  title: string;
  body: string;
  action: { label: string; onClick: () => void; bg: string; fg: string; border?: string };
}) {
  return (
    <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: 16, padding: '16px 18px', marginBottom: 18 }}>
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ minWidth: 0, flex: '1 1 320px' }}>
          <div style={{ fontSize: 16.5, fontWeight: 600, color: titleColor, marginBottom: 5 }}>{title}</div>
          <p style={{ fontSize: 15.5, lineHeight: 1.6, color: bodyColor, margin: 0 }}>{body}</p>
        </div>
        <button
          onClick={action.onClick}
          style={{ flex: 'none', border: action.border ? `1px solid ${action.border}` : 0, borderRadius: 40, padding: '10px 16px', background: action.bg, color: action.fg, fontSize: 15.5, fontWeight: 600, cursor: 'pointer' }}
        >
          {action.label}
        </button>
      </div>
    </div>
  );
}
