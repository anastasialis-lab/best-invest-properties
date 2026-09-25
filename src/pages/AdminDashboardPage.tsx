import { useNavigate } from 'react-router-dom';
import { AdminLayout, AdminHeading, adminPanel } from '@/layouts/AdminLayout';
import { PreviewBar, StateChips } from '@/components/PreviewStates';
import { color, line } from '@/styles/theme';
import { useAppStore } from '@/state/store';
import { useAdminDecisions } from './useAdminDecisions';

const STATS = [
  { k: 'Registered investors', v: '127', hot: false },
  { k: 'Active developers', v: '14', hot: false },
  { k: 'Published properties', v: '83', hot: false },
  { k: 'New enquiries', v: '9', hot: true },
  { k: 'Hot leads', v: '4', hot: true },
];

const ENQ_HEAD = ['INVESTOR', 'PROPERTY', 'BUDGET', 'STAGE', 'AGE'];

const ENQ_ROWS = [
  { investor: 'M. Kruger', property: 'Larnaca 1BR', budget: '€150–200k', stage: 'Hot lead', age: '2h', hot: true },
  { investor: 'A. Lindqvist', property: 'Paphos 1BR', budget: '€150–250k', stage: 'Qualifying', age: '5h', hot: false },
  { investor: 'R. Haddad', property: 'Málaga 2BR', budget: '€200–300k', stage: 'Hot lead', age: '1d', hot: true },
  { investor: 'S. Novak', property: 'Alicante 2BR', budget: '€200–250k', stage: 'New', age: '1d', hot: false },
];

const cell = { padding: 12, borderBottom: `1px solid ${line(0.05)}` } as const;

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const { adminState, setAdminState, adminOutcome, setAdminOutcome } = useAppStore();
  const { approve, requestChanges, reject } = useAdminDecisions();

  return (
    <AdminLayout>
      <AdminHeading eyebrow="TODAY" title="Platform overview" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(128px,1fr))', gap: 16, marginBottom: 34 }}>
        {STATS.map((s) => (
          <div key={s.k} style={{ ...adminPanel, borderRadius: 12, padding: 22 }}>
            <div style={{ fontWeight: 700, fontSize: 32, lineHeight: 1, color: s.hot ? color.action : color.slate, fontVariantNumeric: 'tabular-nums' }}>{s.v}</div>
            <div style={{ fontSize: 13, color: color.muted, marginTop: 8 }}>{s.k}</div>
          </div>
        ))}
      </div>

      <PreviewBar>
        <StateChips
          label="PREVIEW STATE"
          current={adminState}
          onPick={setAdminState}
          choices={[
            { value: 'pending' as const, label: 'Queue has work' },
            { value: 'empty' as const, label: 'Nothing to review' },
          ]}
        />
      </PreviewBar>

      <div style={{ fontSize: 12, letterSpacing: '.18em', color: color.muted, marginBottom: 14 }}>PROPERTY APPROVAL</div>

      {adminState === 'empty' ? (
        <div style={{ ...adminPanel, border: `1px dashed ${line(0.14)}`, padding: '32px 22px', marginBottom: 22 }}>
          <div style={{ fontWeight: 600, letterSpacing: '-.006em', fontSize: 21, marginBottom: 7 }}>Nothing waiting for review</div>
          <p style={{ fontSize: 15.5, lineHeight: 1.6, color: color.dim2, margin: '0 0 16px', maxWidth: '62ch' }}>
            No project submissions, change requests or introductions are open. Last decision: Coral Bay Residences published 16 Sep, 11:20 by A. Petrou.
          </p>
          <button onClick={() => navigate('/admin/users')} style={{ border: `1px solid ${line(0.14)}`, borderRadius: 40, padding: '10px 16px', background: 'transparent', color: color.slate, fontSize: 15.5, cursor: 'pointer' }}>
            Open user management
          </button>
        </div>
      ) : (
        <div style={{ ...adminPanel, padding: 26, marginBottom: 28 }}>
          {adminOutcome ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 600, letterSpacing: '-.006em', fontSize: 22 }}>{adminOutcome.title}</div>
                  <div style={{ fontSize: 15.5, lineHeight: 1.6, color: color.dim2, marginTop: 6, maxWidth: '62ch' }}>{adminOutcome.body}</div>
                </div>
                <span style={{ fontSize: 12.5, letterSpacing: '.1em', padding: '5px 10px', borderRadius: 4, background: adminOutcome.bg, color: adminOutcome.fg, whiteSpace: 'nowrap' }}>
                  {adminOutcome.chip}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap', marginTop: 18 }}>
                <button onClick={() => navigate('/admin/approvals')} style={{ border: `1px solid ${line(0.14)}`, borderRadius: 40, padding: '10px 18px', background: 'transparent', color: color.slate, fontSize: 15.5, cursor: 'pointer' }}>
                  Next item in queue
                </button>
                <button onClick={() => setAdminOutcome(null)} style={{ border: 0, background: 'transparent', color: color.muted, fontSize: 15.5, cursor: 'pointer', padding: '10px 6px' }}>
                  Reset this demo card
                </button>
              </div>
            </>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontWeight: 600, letterSpacing: '-.006em', fontSize: 22 }}>New Project — Cyprus</div>
                  <div style={{ fontSize: 15.5, color: color.muted, marginTop: 6 }}>Developer · XYZ Developments · 12 units · submitted 2 days ago</div>
                </div>
                <span style={{ fontSize: 12.5, letterSpacing: '.1em', padding: '5px 10px', borderRadius: 4, background: 'rgba(221,180,94,.16)', color: color.action }}>PENDING REVIEW</span>
              </div>
              <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap', marginTop: 18 }}>
                <button onClick={() => navigate('/admin/review')} style={{ border: 0, borderRadius: 40, padding: '10px 18px', background: color.actionBright, color: color.slate, fontSize: 15.5, fontWeight: 600, cursor: 'pointer' }}>
                  Open full review
                </button>
                <button onClick={approve} style={{ border: 0, borderRadius: 40, padding: '10px 18px', background: color.action, color: '#fff', fontSize: 15.5, fontWeight: 600, cursor: 'pointer' }}>
                  Approve
                </button>
                <button
                  onClick={requestChanges}
                  style={{ border: `1px solid ${line(0.14)}`, borderRadius: 40, padding: '10px 18px', background: 'transparent', color: color.slate, fontSize: 15.5, cursor: 'pointer' }}
                >
                  Request Changes
                </button>
                <button onClick={reject} style={{ border: '1px solid rgba(197,86,79,.5)', borderRadius: 40, padding: '10px 18px', background: 'transparent', color: color.danger, fontSize: 15.5, cursor: 'pointer' }}>
                  Reject
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <div style={{ fontSize: 12, letterSpacing: '.18em', color: color.muted, marginBottom: 12 }}>NEW ENQUIRIES</div>
      <div style={{ overflowX: 'auto' }} className="bip-scroll">
        <table style={{ width: '100%', minWidth: 520, borderCollapse: 'collapse', fontSize: 15.5 }}>
          <thead>
            <tr>
              {ENQ_HEAD.map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 12px', fontSize: 12, letterSpacing: '.12em', color: color.muted, fontWeight: 500, borderBottom: `1px solid ${line(0.1)}` }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ENQ_ROWS.map((r) => (
              <tr key={r.investor}>
                <td style={cell}>{r.investor}</td>
                <td style={{ ...cell, color: color.dim2 }}>{r.property}</td>
                <td style={{ ...cell, color: color.dim2, fontVariantNumeric: 'tabular-nums' }}>{r.budget}</td>
                <td style={cell}>
                  <span style={{ fontSize: 13, padding: '4px 9px', borderRadius: 4, background: r.hot ? 'rgba(221,180,94,.22)' : line(0.1), color: r.hot ? color.link : color.dim2 }}>{r.stage}</span>
                </td>
                <td style={{ ...cell, color: color.muted }}>{r.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
