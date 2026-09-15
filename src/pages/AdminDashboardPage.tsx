import { useNavigate } from 'react-router-dom';
import { AdminLayout, AdminHeading } from '@/layouts/AdminLayout';
import { color } from '@/styles/theme';
import { ADMIN_STATS, ENQ_HEAD, ENQ_ROWS } from '@/data/content';

export function AdminDashboardPage() {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <AdminHeading
        eyebrow="TODAY"
        title="Platform overview"
        action={
          <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/admin/journeys')}
              style={{ border: `1px solid ${color.adminBorder2}`, borderRadius: 6, padding: '10px 16px', background: 'transparent', color: color.adminText, fontSize: 12.5, cursor: 'pointer' }}
            >
              User journeys
            </button>
            <button
              onClick={() => navigate('/admin/scores')}
              style={{ border: `1px solid ${color.adminBorder2}`, borderRadius: 6, padding: '10px 16px', background: 'transparent', color: color.adminText, fontSize: 12.5, cursor: 'pointer' }}
            >
              Investment score model
            </button>
          </div>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(128px, 1fr))', gap: 12, marginBottom: 26 }}>
        {ADMIN_STATS.map((s) => (
          <div key={s.k} style={{ background: color.adminCard, border: `1px solid ${color.adminBorder}`, borderRadius: 8, padding: 17 }}>
            <div style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: 32, lineHeight: 1, color: s.hot ? color.goldLight : color.adminText, fontVariantNumeric: 'tabular-nums' }}>{s.v}</div>
            <div style={{ fontSize: 11, color: color.adminMuted, marginTop: 8 }}>{s.k}</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 10, letterSpacing: '.18em', color: color.adminMuted, marginBottom: 12 }}>PROPERTY APPROVAL</div>
      <div style={{ background: color.adminCard, border: `1px solid ${color.adminBorder}`, borderRadius: 9, padding: 20, marginBottom: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: 22 }}>New Project — Cyprus</div>
            <div style={{ fontSize: 12.5, color: color.adminMuted, marginTop: 6 }}>Developer · XYZ Developments · 12 units · submitted 2 days ago</div>
          </div>
          <span style={{ fontSize: 10.5, letterSpacing: '.1em', padding: '5px 10px', borderRadius: 4, background: 'rgba(226,181,88,.16)', color: color.goldLight }}>PENDING REVIEW</span>
        </div>
        <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap', marginTop: 18 }}>
          <button style={{ border: 0, borderRadius: 6, padding: '10px 18px', background: color.approve, color: '#fff', fontSize: 12.5, fontWeight: 600, cursor: 'pointer' }}>Approve</button>
          <button style={{ border: `1px solid ${color.adminBorder2}`, borderRadius: 6, padding: '10px 18px', background: 'transparent', color: color.adminText, fontSize: 12.5, cursor: 'pointer' }}>Request Changes</button>
          <button style={{ border: '1px solid rgba(197,86,79,.5)', borderRadius: 6, padding: '10px 18px', background: 'transparent', color: color.reject, fontSize: 12.5, cursor: 'pointer' }}>Reject</button>
        </div>
      </div>

      <div style={{ fontSize: 10, letterSpacing: '.18em', color: color.adminMuted, marginBottom: 12 }}>NEW ENQUIRIES</div>
      <div style={{ overflowX: 'auto' }} className="bip-scroll">
        <table style={{ width: '100%', minWidth: 520, borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {ENQ_HEAD.map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 12px', fontSize: 10, letterSpacing: '.12em', color: color.adminMuted, fontWeight: 500, borderBottom: `1px solid ${color.adminBorder2}` }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ENQ_ROWS.map((r) => (
              <tr key={r.investor + r.property}>
                <td style={{ padding: 12, borderBottom: '1px solid rgba(255,255,255,.06)' }}>{r.investor}</td>
                <td style={{ padding: 12, borderBottom: '1px solid rgba(255,255,255,.06)', color: color.adminMuted2 }}>{r.property}</td>
                <td style={{ padding: 12, borderBottom: '1px solid rgba(255,255,255,.06)', color: color.adminMuted2, fontVariantNumeric: 'tabular-nums' }}>{r.budget}</td>
                <td style={{ padding: 12, borderBottom: '1px solid rgba(255,255,255,.06)' }}>
                  <span style={{ fontSize: 11, padding: '4px 9px', borderRadius: 4, background: r.hot ? 'rgba(226,181,88,.16)' : 'rgba(255,255,255,.08)', color: r.hot ? color.goldLight : color.adminMuted2 }}>
                    {r.stage}
                  </span>
                </td>
                <td style={{ padding: 12, borderBottom: '1px solid rgba(255,255,255,.06)', color: color.adminMuted }}>{r.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
