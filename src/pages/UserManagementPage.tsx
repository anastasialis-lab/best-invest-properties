import { AdminLayout, adminPanel } from '@/layouts/AdminLayout';
import { color, line } from '@/styles/theme';
import { useAppStore } from '@/state/store';

const USERS = [
  { name: 'Martin Kruger', email: 'm.kruger@example.com', role: 'Investor', since: '12 Aug 2026', state: 'Active', bg: 'rgba(32,90,135,.18)', fg: color.success },
  { name: 'Elena Markou', email: 'e.markou@example.com', role: 'Investor', since: '02 Sep 2026', state: 'Active', bg: 'rgba(32,90,135,.18)', fg: color.success },
  { name: 'A. Georgiou', email: 'a.georgiou@xyzdevelopments.cy', role: 'Developer · XYZ Developments', since: '19 Jun 2026', state: 'Active', bg: 'rgba(32,90,135,.18)', fg: color.success },
  { name: 'M. Christodoulou', email: 'maria@aegeanliving.com', role: 'Developer · Aegean Living', since: '15 Sep 2026', state: 'Pending verification', bg: 'rgba(221,180,94,.22)', fg: color.link },
  { name: 'S. Novak', email: 's.novak@example.com', role: 'Investor', since: '28 Aug 2026', state: 'Suspended', bg: 'rgba(197,86,79,.18)', fg: color.danger },
];

const th = { textAlign: 'left', padding: '9px 11px', fontSize: 12, letterSpacing: '.12em', color: color.muted, fontWeight: 500, borderBottom: `1px solid ${line(0.1)}` } as const;
const td = { padding: 11, borderBottom: `1px solid ${line(0.05)}` } as const;

export function UserManagementPage() {
  const { openModal, showToast } = useAppStore();

  const impersonate = () =>
    openModal({
      title: 'View the platform as this user?',
      body: 'You see exactly what they see, read-only. The session is capped at 15 minutes, every action is written to the audit log against your name, and the user is told by email that support accessed their account.',
      ok: 'Start support session',
      tone: 'gold',
      run: () => showToast('Support session started · 15 minutes, read-only'),
    });

  const suspend = () =>
    openModal({
      title: 'Suspend this account?',
      body: 'The user is signed out of every device and cannot sign in again until you reinstate them. Their saved properties, enquiries and audit history are kept.',
      ok: 'Suspend account',
      tone: 'danger',
      needReason: true,
      run: () => showToast('Account suspended'),
    });

  return (
    <AdminLayout>
      <h1 style={{ fontWeight: 700, fontSize: 28, textTransform: 'uppercase', letterSpacing: '-.012em', margin: '0 0 6px' }}>User Management</h1>
      <p style={{ fontSize: 15.5, lineHeight: 1.6, color: color.muted, margin: '0 0 22px', maxWidth: '66ch' }}>
        Investors and developer contacts in one list. One account holds one role in this release; the roles below are what an admin account can be given.
      </p>

      <div style={{ ...adminPanel, padding: 20, marginBottom: 20 }}>
        <div style={{ overflowX: 'auto' }} className="bip-scroll">
          <table style={{ width: '100%', minWidth: 620, borderCollapse: 'collapse', fontSize: 15.5 }}>
            <thead>
              <tr>
                <th style={th}>NAME</th>
                <th style={th}>ROLE</th>
                <th style={th}>REGISTERED</th>
                <th style={th}>STATE</th>
                <th style={{ ...th, textAlign: 'right' }} />
              </tr>
            </thead>
            <tbody>
              {USERS.map((u) => (
                <tr key={u.email}>
                  <td style={td}>
                    <div>{u.name}</div>
                    <div style={{ fontSize: 13.5, color: color.muted, marginTop: 2 }}>{u.email}</div>
                  </td>
                  <td style={{ ...td, color: color.dim2 }}>{u.role}</td>
                  <td style={{ ...td, color: color.muted, whiteSpace: 'nowrap' }}>{u.since}</td>
                  <td style={td}>
                    <span style={{ fontSize: 13, padding: '4px 9px', borderRadius: 4, background: u.bg, color: u.fg, whiteSpace: 'nowrap' }}>{u.state}</span>
                  </td>
                  <td style={{ ...td, textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <button
                      onClick={impersonate}
                      style={{ border: `1px solid ${line(0.14)}`, borderRadius: 40, padding: '7px 12px', background: 'transparent', color: color.slate, fontSize: 13.5, cursor: 'pointer', marginRight: 6 }}
                    >
                      View as
                    </button>
                    <button onClick={suspend} style={{ border: '1px solid rgba(197,86,79,.4)', borderRadius: 40, padding: '7px 12px', background: 'transparent', color: color.danger, fontSize: 13.5, cursor: 'pointer' }}>
                      Suspend
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
