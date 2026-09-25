import { useNavigate } from 'react-router-dom';
import { DevPortalLayout, devPanel } from '@/layouts/DevPortalLayout';
import { color } from '@/styles/theme';
import { useAppStore } from '@/state/store';

const UNIT_ROWS = [
  { unit: 'A-101', type: '1 bed · 55 m²', floor: 'Ground', price: '€165,000', avail: 'Available', aBg: '#E4EFE8', aFg: color.action, note: '' },
  { unit: 'A-102', type: '1 bed · 57 m²', floor: 'Ground', price: '€168,000', avail: 'Reserved', aBg: '#F8EFDC', aFg: color.action, note: 'Reserved 12 Sep' },
  { unit: 'A-201', type: '2 bed · 78 m²', floor: 'First', price: '€212,000', avail: 'Available', aBg: '#E4EFE8', aFg: color.action, note: '' },
  { unit: 'A-202', type: '2 bed · 80 m²', floor: 'First', price: '€218,000', avail: 'Sold', aBg: '#F1E7E6', aFg: '#9C4B44', note: 'Completed 30 Aug' },
  { unit: 'B-101', type: '2 bed · 76 m²', floor: 'Ground', price: '€208,000', avail: 'Available', aBg: '#E4EFE8', aFg: color.action, note: '' },
  { unit: 'B-301', type: '3 bed · 104 m²', floor: 'Second', price: '€240,000', avail: 'Available', aBg: '#E4EFE8', aFg: color.action, note: 'Price change pending approval' },
];

const LOCKED_FIELDS = [
  { k: 'Project name', v: 'Coral Bay Residences' },
  { k: 'Location', v: 'Paphos, Cyprus' },
  { k: 'Completion', v: 'Q3 2027' },
  { k: 'Unit mix', v: '12 units · 1–3 bed' },
  { k: 'Specification', v: 'Developer document v2' },
  { k: 'Media', v: '14 images · 3 floor plans' },
];

const CHANGE_LOG = [
  { when: '14 Sep', what: 'B-301 · price €236,000 → €240,000', state: 'Awaiting approval', bg: '#F8EFDC', fg: color.action },
  { when: '14 Sep', what: 'A-102 · Available → Reserved', state: 'Awaiting approval', bg: '#F8EFDC', fg: color.action },
  { when: '30 Aug', what: 'A-202 · Reserved → Sold', state: 'Approved', bg: '#E4EFE8', fg: color.action },
  { when: '22 Aug', what: 'A-101 · price €162,000 → €165,000', state: 'Approved', bg: '#E4EFE8', fg: color.action },
];

const th = { textAlign: 'left', padding: '9px 10px', fontSize: 12, letterSpacing: '.12em', color: color.muted2, fontWeight: 500, borderBottom: '1px solid rgba(32,90,135,.14)' } as const;
const td = { padding: '11px 10px', borderBottom: '1px solid rgba(32,90,135,.08)' } as const;

export function ProjectUnitsPage() {
  const navigate = useNavigate();
  const { showToast, openModal } = useAppStore();

  return (
    <DevPortalLayout>
      <div style={{ background: color.ink, color: color.sky, padding: '22px 28px' }}>
        <button onClick={() => navigate('/developer-portal/projects')} style={{ border: 0, background: 'transparent', fontSize: 15.5, color: color.edge, cursor: 'pointer', padding: '0 0 10px' }}>
          ← My projects
        </button>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontSize: 11.5, letterSpacing: '.2em', color: color.edge }}>PUBLISHED PROJECT</div>
            <div style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-.012em', fontSize: 28, marginTop: 5 }}>Coral Bay Residences</div>
            <div style={{ fontSize: 15.5, color: color.edge, marginTop: 4 }}>Paphos, Cyprus · 12 units · completion Q3 2027</div>
          </div>
          <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap' }}>
            <button
              onClick={() =>
                openModal({
                  title: 'Discard pending changes?',
                  body: 'The two changes waiting for approval are removed and the published values stay as they are.',
                  ok: 'Discard changes',
                  tone: 'danger',
                  run: () => showToast('Pending changes discarded'),
                })
              }
              style={{ border: '1px solid rgba(228,237,244,.35)', borderRadius: 40, padding: '11px 18px', background: 'transparent', color: color.sky, fontSize: 15.5, cursor: 'pointer' }}
            >
              Discard changes
            </button>
            <button onClick={() => showToast('2 changes submitted for approval')} style={{ border: 0, borderRadius: 40, padding: '11px 18px', background: color.gold, color: color.ink, fontSize: 15.5, fontWeight: 600, cursor: 'pointer' }}>
              Submit 2 changes for approval
            </button>
          </div>
        </div>
      </div>

      <div style={{ padding: '22px 28px 40px' }}>
        <div style={{ background: color.goldWash, border: '1px solid rgba(221,180,94,.34)', borderRadius: 7, padding: '13px 16px', fontSize: 15.5, lineHeight: 1.6, color: color.action, marginBottom: 20 }}>
          Editable after publication: unit price and availability. Everything else is locked — send project changes to your Best Invest contact and they will be re-reviewed.
        </div>

        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ flex: '2 1 460px', minWidth: 0, ...devPanel, padding: '20px 20px 22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', marginBottom: 6 }}>
              <div style={{ fontWeight: 600, letterSpacing: '-.006em', fontSize: 20, color: color.ink }}>Units</div>
              <div style={{ fontSize: 14, color: color.muted2 }}>Available 4 · Reserved 1 · Sold 1</div>
            </div>
            <p style={{ fontSize: 15.5, color: color.muted2, margin: '0 0 14px' }}>Change a status or price inline. Changes stay pending until approved.</p>

            <div style={{ overflowX: 'auto' }} className="bip-scroll">
              <table style={{ width: '100%', minWidth: 760, borderCollapse: 'collapse', fontSize: 15.5 }}>
                <thead>
                  <tr>
                    <th style={th}>UNIT</th>
                    <th style={th}>TYPE</th>
                    <th style={th}>PRICE</th>
                    <th style={th}>AVAILABILITY</th>
                  </tr>
                </thead>
                <tbody>
                  {UNIT_ROWS.map((u) => (
                    <tr key={u.unit}>
                      <td style={{ ...td, color: color.ink, fontWeight: 500, whiteSpace: 'nowrap' }}>{u.unit}</td>
                      <td style={{ ...td, color: color.body, whiteSpace: 'nowrap' }}>
                        {u.type}
                        <br />
                        <span style={{ fontSize: 13.5, color: color.faint }}>{u.floor}</span>
                      </td>
                      <td style={td}>
                        <input type="text" defaultValue={u.price} style={{ width: 106, padding: '8px 9px', border: '1px solid rgba(32,90,135,.22)', borderRadius: 10, background: '#FFFFFF', fontSize: 15.5, fontVariantNumeric: 'tabular-nums' }} />
                      </td>
                      <td style={td}>
                        <select defaultValue={u.avail} style={{ padding: '8px 9px', border: '1px solid rgba(32,90,135,.22)', borderRadius: 10, background: '#FFFFFF', fontSize: 15.5, color: color.ink }}>
                          <option>Available</option>
                          <option>Reserved</option>
                          <option>Sold</option>
                        </select>
                        <div style={{ display: 'flex', gap: 7, alignItems: 'center', marginTop: 6, flexWrap: 'wrap' }}>
                          <span style={{ fontSize: 12.5, padding: '3px 8px', borderRadius: 4, background: u.aBg, color: u.aFg }}>{u.avail}</span>
                          {u.note && <span style={{ fontSize: 13, color: color.faint }}>{u.note}</span>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ flex: '1 1 280px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ ...devPanel, padding: 20 }}>
              <div style={{ fontSize: 12, letterSpacing: '.16em', color: color.muted2, marginBottom: 12 }}>LOCKED — ADMIN REVIEW REQUIRED</div>
              {LOCKED_FIELDS.map((f) => (
                <div key={f.k} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '8px 0', borderBottom: '1px solid rgba(32,90,135,.08)', fontSize: 15.5 }}>
                  <span style={{ color: color.faint }}>{f.k}</span>
                  <span style={{ color: color.body, textAlign: 'right', minWidth: 0 }}>{f.v}</span>
                </div>
              ))}
              <div style={{ fontSize: 13.5, lineHeight: 1.6, color: color.faint, marginTop: 12 }}>
                Request an edit and it is queued for Best Invest review alongside the original submission.
              </div>
            </div>

            <div style={{ ...devPanel, padding: 20 }}>
              <div style={{ fontSize: 12, letterSpacing: '.16em', color: color.muted2, marginBottom: 12 }}>CHANGE HISTORY</div>
              {CHANGE_LOG.map((c, i) => (
                <div key={i} style={{ padding: '10px 0', borderBottom: '1px solid rgba(32,90,135,.08)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'baseline' }}>
                    <span style={{ fontSize: 13.5, color: color.faint }}>{c.when}</span>
                    <span style={{ fontSize: 12.5, padding: '3px 8px', borderRadius: 4, background: c.bg, color: c.fg, whiteSpace: 'nowrap' }}>{c.state}</span>
                  </div>
                  <div style={{ fontSize: 15.5, color: color.ink, marginTop: 4 }}>{c.what}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DevPortalLayout>
  );
}
