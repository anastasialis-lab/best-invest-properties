import { useNavigate } from 'react-router-dom';
import { AdminLayout, adminPanel } from '@/layouts/AdminLayout';
import { StateChips } from '@/components/PreviewStates';
import { color, line, font } from '@/styles/theme';
import { CATS, SRC_ROWS } from '@/data/listings';
import { useAppStore } from '@/state/store';
import { useAdminDecisions } from './useAdminDecisions';

const UNITS = [
  { unit: 'A-101', type: '1 bed · 55 m²', price: '€165,000', rent: '€1,050', gross: '7.6%', flag: '' },
  { unit: 'A-102', type: '1 bed · 57 m²', price: '€168,000', rent: '€1,050', gross: '7.5%', flag: '' },
  { unit: 'A-201', type: '2 bed · 78 m²', price: '€212,000', rent: '€1,400', gross: '7.9%', flag: 'Rent above our comparables — verify' },
  { unit: 'B-301', type: '3 bed · 104 m²', price: '€240,000', rent: '€1,500', gross: '7.5%', flag: '' },
];

const METRICS = [
  { k: 'INVESTMENT SCORE', v: '77 / 100' },
  { k: 'GROSS YIELD', v: '7.2%' },
  { k: 'NET YIELD', v: '5.6%' },
];

const AI_ESTIMATES = [
  { k: 'Expected annual rental income', v: '€13,600', src: 'Proposed · comparable lettings in the district' },
  { k: 'Recurring costs', v: '€1,700', src: 'Proposed · district averages' },
  { k: 'Vacancy allowance', v: '10%', src: 'Assumption · platform default' },
  { k: 'Total acquisition cost', v: '€189,000', src: 'Calculated · price plus transfer, legal and fees' },
  { k: 'Estimated net rental income', v: '€10,540', src: 'Calculated · rent less costs and vacancy' },
];

const INPUTS = [
  { k: 'Developer rent claim', v: '€1,200 / month', src: 'Developer submission' },
  { k: 'Our comparable rent', v: '€1,100 – €1,250', src: 'Larnaca district, 14 lettings' },
  { k: 'Rent used for scoring', v: '€13,600 / year', src: 'Analyst A.M. · 16 Sep' },
  { k: 'Recurring costs and vacancy', v: '€3,060', src: 'District averages · vacancy at 10%' },
  { k: 'Total acquisition cost', v: '€189,000', src: 'Price plus transfer, legal and fees' },
  { k: 'Net yield', v: '5.6%', src: 'Calculated on acquisition cost · not AI' },
  { k: 'Indicative score', v: '77 / 100', src: 'Five-criteria model' },
];

const DOCS = [
  { label: 'Building permit', meta: 'permit_4821.pdf · issued 04 Mar 2026', ok: true },
  { label: 'Escrow confirmation', meta: 'bank_guarantee_coralbay.pdf · Bank of Cyprus', ok: true },
  { label: 'Title deed status', meta: 'not supplied', ok: false },
  { label: 'Price list', meta: 'coral_bay_pricelist_v4.xlsx · matches 12 units', ok: true },
];

const MEDIA = [
  { label: '14 photos', meta: 'cover set · min 2000px ✓' },
  { label: '1 video', meta: '2:41 · 184 MB' },
  { label: '3 floor plans', meta: '1BR, 2BR, site plan' },
  { label: 'Brochure', meta: '8.6 MB · EN' },
];

const panelLabel = { fontSize: 12, letterSpacing: '.16em', color: color.muted, marginBottom: 14 } as const;
const th = { textAlign: 'left', padding: '9px 11px', fontSize: 12, letterSpacing: '.12em', color: color.muted, fontWeight: 500, borderBottom: `1px solid ${line(0.1)}` } as const;
const thR = { ...th, textAlign: 'right' } as const;
const td = { padding: 11, borderBottom: `1px solid ${line(0.05)}` } as const;
const tdR = { ...td, textAlign: 'right', fontVariantNumeric: 'tabular-nums' } as const;
const rowSplit = { display: 'flex', justifyContent: 'space-between', gap: 12, padding: '9px 0', borderBottom: `1px solid ${line(0.05)}` } as const;

export function AdminReviewPage() {
  const navigate = useNavigate();
  const { revState, setRevState, showToast } = useAppStore();
  const { approve, requestChanges, reject } = useAdminDecisions();

  const approved = revState === 'approved';
  const accent = approved ? color.success : color.action;
  const lead = approved
    ? 'Reviewed and approved. The estimates, category assessments and score below are the saved result investors see on the property page.'
    : 'Proposed by the analysis step and not yet published. Review the estimates, the five category assessments and the flagged gaps before approving the project.';

  return (
    <AdminLayout>
      <button onClick={() => navigate('/admin/approvals')} style={{ border: 0, background: 'transparent', fontSize: 15.5, color: color.muted, cursor: 'pointer', padding: '0 0 12px' }}>
        ← Approvals queue
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start', marginBottom: 20 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 12, letterSpacing: '.2em', color: color.muted }}>PROJECT REVIEW · PRJ-0311</div>
          <h1 style={{ fontWeight: 700, fontSize: 28, textTransform: 'uppercase', letterSpacing: '-.012em', margin: '5px 0 0' }}>Coral Bay Residences</h1>
          <div style={{ fontSize: 15.5, color: color.muted, marginTop: 6 }}>XYZ Developments · Paphos, Cyprus · 12 units · completion Q3 2027 · submitted 15 Sep</div>
        </div>
        <span style={{ fontSize: 12.5, letterSpacing: '.1em', padding: '5px 10px', borderRadius: 4, background: 'rgba(221,180,94,.16)', color: color.action, whiteSpace: 'nowrap' }}>PENDING REVIEW</span>
      </div>

      <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap', marginBottom: 24 }}>
        <button onClick={approve} style={{ border: 0, borderRadius: 40, padding: '11px 18px', background: color.action, color: '#fff', fontSize: 15.5, fontWeight: 600, cursor: 'pointer' }}>
          Approve &amp; publish
        </button>
        <button onClick={requestChanges} style={{ border: `1px solid ${line(0.14)}`, borderRadius: 40, padding: '11px 18px', background: 'transparent', color: color.slate, fontSize: 15.5, cursor: 'pointer' }}>
          Request changes
        </button>
        <button onClick={reject} style={{ border: '1px solid rgba(197,86,79,.5)', borderRadius: 40, padding: '11px 18px', background: 'transparent', color: color.danger, fontSize: 15.5, cursor: 'pointer' }}>
          Reject
        </button>
        <button onClick={() => navigate('/admin/scores')} style={{ border: 0, background: 'transparent', color: color.muted, fontSize: 15.5, cursor: 'pointer', padding: '11px 6px' }}>
          Score model
        </button>
      </div>

      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div style={{ flex: '1.6 1 380px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ ...adminPanel, padding: 20 }}>
            <div style={panelLabel}>UNIT PRICING</div>
            <div style={{ overflowX: 'auto' }} className="bip-scroll">
              <table style={{ width: '100%', minWidth: 520, borderCollapse: 'collapse', fontSize: 15.5 }}>
                <thead>
                  <tr>
                    <th style={th}>UNIT</th>
                    <th style={th}>LAYOUT</th>
                    <th style={thR}>PRICE</th>
                    <th style={thR}>CLAIMED RENT</th>
                    <th style={thR}>GROSS</th>
                  </tr>
                </thead>
                <tbody>
                  {UNITS.map((u) => (
                    <tr key={u.unit}>
                      <td style={{ ...td, fontFamily: font.mono, fontSize: 14 }}>{u.unit}</td>
                      <td style={{ ...td, color: color.dim2 }}>
                        {u.type}
                        {u.flag && <span style={{ display: 'block', fontSize: 13, color: color.action, marginTop: 3 }}>{u.flag}</span>}
                      </td>
                      <td style={tdR}>{u.price}</td>
                      <td style={{ ...tdR, color: color.dim2 }}>{u.rent}</td>
                      <td style={{ ...tdR, color: color.action }}>{u.gross}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ ...adminPanel, borderLeft: `3px solid ${accent}`, padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap', alignItems: 'flex-start', marginBottom: 6 }}>
              <div style={{ fontSize: 12, letterSpacing: '.16em', color: color.muted }}>INVESTMENT ANALYSIS</div>
              <span
                style={{
                  flex: 'none',
                  fontSize: 12.5,
                  letterSpacing: '.1em',
                  padding: '5px 10px',
                  borderRadius: 4,
                  background: approved ? 'rgba(47,125,99,.14)' : 'rgba(221,180,94,.16)',
                  color: accent,
                }}
              >
                {approved ? 'REVIEWED & APPROVED' : 'AWAITING REVIEW'}
              </span>
            </div>
            <p style={{ fontSize: 15.5, lineHeight: 1.6, color: color.dim2, margin: '0 0 14px', maxWidth: '70ch' }}>{lead}</p>

            <div style={{ marginBottom: 18 }}>
              <StateChips
                label="PREVIEW STATE"
                current={revState}
                onPick={setRevState}
                choices={[
                  { value: 'pending' as const, label: 'Awaiting review' },
                  { value: 'approved' as const, label: 'Reviewed & approved' },
                ]}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(118px,1fr))', gap: 12, marginBottom: 20 }}>
              {METRICS.map((m) => (
                <div key={m.k} style={{ border: `1px solid ${line(0.1)}`, borderRadius: 12, padding: '13px 14px' }}>
                  <div style={{ fontSize: 11.5, letterSpacing: '.14em', color: color.muted, marginBottom: 5 }}>{m.k}</div>
                  <div style={{ fontWeight: 700, fontSize: 26, lineHeight: 1.05, fontVariantNumeric: 'tabular-nums', color: color.slate }}>{m.v}</div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: 12, letterSpacing: '.14em', color: color.muted, marginBottom: 8 }}>AI-PROPOSED FINANCIAL ESTIMATES</div>
            {AI_ESTIMATES.map((e) => (
              <div key={e.k} style={rowSplit}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 15.5 }}>{e.k}</div>
                  <div style={{ fontSize: 13, color: color.muted, marginTop: 2 }}>{e.src}</div>
                </div>
                <div style={{ fontSize: 15.5, fontWeight: 600, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{e.v}</div>
              </div>
            ))}

            <div style={{ fontSize: 12, letterSpacing: '.14em', color: color.muted, margin: '30px 0 14px' }}>CATEGORY ASSESSMENTS</div>
            {CATS.map((s) => (
              <div key={s.label} style={{ marginBottom: 22 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, fontSize: 15.5, marginBottom: 8 }}>
                  <span style={{ fontWeight: 600 }}>{s.label}</span>
                  <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
                    {s.got}/{s.max}
                  </span>
                </div>
                <div style={{ height: 7, borderRadius: 4, background: 'rgba(23,75,103,.09)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: 4, background: accent, width: `${Math.round((s.got / s.max) * 100)}%` }} />
                </div>
                <div style={{ fontSize: 13.5, lineHeight: 1.55, color: color.dim2, marginTop: 6 }}>{s.note}</div>
              </div>
            ))}

            <div style={{ fontSize: 12, letterSpacing: '.14em', color: color.muted, margin: '20px 0 4px' }}>SOURCES, ASSUMPTIONS &amp; GAPS</div>
            {SRC_ROWS.map((s) => (
              <div key={s.body} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: `1px solid ${line(0.05)}` }}>
                <span style={{ flex: 'none', fontSize: 11, letterSpacing: '.1em', fontWeight: 700, padding: '3px 7px', borderRadius: 4, background: s.bg, color: s.fg, height: 'fit-content' }}>
                  {s.tag}
                </span>
                <span style={{ minWidth: 0, fontSize: 13.5, lineHeight: 1.55, color: color.dim2 }}>{s.body}</span>
              </div>
            ))}

            <div style={{ marginTop: 16, background: color.ground, border: '1px solid rgba(221,180,94,.35)', borderRadius: 10, padding: '11px 13px', fontSize: 13.5, lineHeight: 1.55, color: color.link }}>
              Analysis uses the agreed free/open sources. Information gaps are flagged for review or manual input.
            </div>
            {approved ? (
              <div style={{ fontSize: 13.5, lineHeight: 1.55, color: color.success, marginTop: 12 }}>Published 18 Sep, 10:24 by A. Petrou. Investors see this saved version.</div>
            ) : (
              <div style={{ fontSize: 13.5, lineHeight: 1.55, color: color.muted, marginTop: 12 }}>
                Not yet visible to investors. Approving the project publishes this analysis as the saved, reviewed result.
              </div>
            )}
          </div>

          <div style={{ ...adminPanel, padding: 20 }}>
            <div style={panelLabel}>DOCUMENTS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {DOCS.map((d) => (
                <div key={d.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap', alignItems: 'center', border: `1px solid ${line(0.1)}`, borderRadius: 7, padding: '11px 13px' }}>
                  <div style={{ minWidth: 0, flex: '1 1 220px' }}>
                    <div style={{ fontSize: 15.5 }}>{d.label}</div>
                    <div style={{ fontFamily: font.mono, fontSize: 13, color: color.muted, marginTop: 3 }}>{d.meta}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 9, alignItems: 'center', flex: 'none' }}>
                    {d.ok && <span style={{ fontSize: 13, padding: '4px 9px', borderRadius: 4, background: 'rgba(32,90,135,.18)', color: color.success }}>CHECKED</span>}
                    <button
                      onClick={() => showToast('The document viewer is not part of this prototype')}
                      style={{ border: `1px solid ${line(0.14)}`, borderRadius: 40, padding: '7px 13px', background: 'transparent', color: color.slate, fontSize: 13.5, cursor: 'pointer' }}
                    >
                      Open
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ ...adminPanel, padding: 20 }}>
            <div style={panelLabel}>MEDIA</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 12 }}>
              {MEDIA.map((m) => (
                <div key={m.label} style={{ border: `1px solid ${line(0.1)}`, borderRadius: 7, padding: '13px 14px' }}>
                  <div style={{ fontSize: 15.5 }}>{m.label}</div>
                  <div style={{ fontSize: 13.5, color: color.muted, marginTop: 4 }}>{m.meta}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ flex: '1 1 280px', minWidth: 0 }}>
          <div style={{ ...adminPanel, padding: 20 }}>
            <div style={{ fontSize: 12, letterSpacing: '.16em', color: color.muted, marginBottom: 6 }}>FINANCIAL INPUTS</div>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: color.muted, margin: '0 0 14px' }}>Every figure behind the score, with its source. Nothing here is generated by AI.</p>
            {INPUTS.map((i) => (
              <div key={i.k} style={{ ...rowSplit, padding: '10px 0' }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 15.5 }}>{i.k}</div>
                  <div style={{ fontSize: 13, color: color.muted, marginTop: 2 }}>{i.src}</div>
                </div>
                <div style={{ fontSize: 15.5, fontWeight: 600, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{i.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
