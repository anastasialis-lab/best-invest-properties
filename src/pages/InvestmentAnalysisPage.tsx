import { useNavigate, useParams } from 'react-router-dom';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { PreviewBar, StateChips } from '@/components/PreviewStates';
import { color, line } from '@/styles/theme';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useAppStore } from '@/state/store';
import { LISTINGS, CATS, DETAIL_ID } from '@/data/listings';
import { PointsDots } from '@/components/ScoreBits';

const REASONS = [
  {
    num: '01',
    title: 'Price',
    points: 2,
    metricLabel: 'THIS PROPERTY',
    metric: '€175k',
    subLabel: 'COMPARABLE NEW BUILDS',
    sub: '€190k – €215k',
    body: 'The asking price is below current prices for comparable new-build properties in the same district. Part of the gap is the pre-completion discount; the rest reflects early-phase pricing.',
  },
  {
    num: '02',
    title: 'Rental Yield',
    points: 1,
    metricLabel: 'EXPECTED ANNUAL RENT',
    metric: '€13,600',
    subLabel: 'SOURCE',
    sub: 'Independent estimate, cross-checked against the developer figure',
    extras: [
      { k: 'GROSS YIELD', v: '7.2%' },
      { k: 'NET YIELD', v: '5.6%' },
    ],
    body: 'Comparable one-bedroom units in the same district let for €1,100–€1,250 per month on twelve-month contracts. We model €1,135 per month at 90% assumed occupancy, and calculate yields on the €189,000 total acquisition cost.',
  },
  {
    num: '03',
    title: 'Rental Demand',
    points: 2,
    metricLabel: 'RENTAL DEMAND',
    metric: 'Strong',
    subLabel: 'DRIVERS',
    sub: 'Airport, university, year-round tenancy',
    body: 'Larnaca holds tenants outside the tourist season. Expected occupancy is high for long-term rentals in the low season and for short-term rentals in the high season.',
  },
  {
    num: '04',
    title: 'Capital Growth',
    points: 1,
    metricLabel: 'OUTLOOK',
    metric: 'Good',
    subLabel: 'HORIZON',
    sub: '5–10 years',
    body: 'Steady price growth is expected in the district, supported by resale demand from investors and owner-occupiers. Liquidity is slower than in larger cities.',
  },
  {
    num: '05',
    title: 'Owner Protection & Eviction Efficiency',
    points: 2,
    metricLabel: 'OWNER PROTECTION',
    metric: 'Strong',
    subLabel: 'EVICTION',
    sub: 'Efficient procedures',
    body: 'Laws in Cyprus are very effective in protecting property owners in case of problems with tenants, and eviction procedures work efficiently.',
  },
];

// Explains, with a concrete pair, why a higher net yield can come with a lower
// Investment Score: Rental Yield is only one of five criteria.
function yieldVsScore(): string | null {
  const me = LISTINGS.find((p) => p.id === DETAIL_ID);
  if (!me) return null;
  const myNet = parseFloat(me.net);
  const other = LISTINGS.filter((p) => parseFloat(p.net) < myNet && p.score > me.score).sort((a, b) => b.score - a.score)[0];
  if (!other) return null;
  const a = me.pts;
  const b = other.pts;
  return `This property has a ${me.net} net yield, higher than ${other.location} (${other.net}), yet scores ${me.score}/10 against ${other.score}/10. Both earn ${a[1]}${a[1] === 1 ? ' point' : ' points'} for Rental Yield. The other four criteria add ${me.score - a[1]} points here against ${other.score - b[1]}.`;
}

const DET_FIGURES = [
  { k: 'Property price', v: '€175,000', src: 'Developer figure · not independently verified' },
  { k: 'Total acquisition cost', v: '€189,000', src: 'Calculated: price + transfer, legal and fees' },
  { k: 'Expected annual rental income', v: '€13,600', src: 'Comparable lettings, Larnaca district' },
  { k: 'Recurring costs and occupancy adjustment', v: '€3,060', src: 'District averages · 90% assumed occupancy' },
  { k: 'Estimated net rental income', v: '€10,540', src: 'Calculated: rent − costs − occupancy adjustment' },
  { k: 'Gross yield', v: '7.2%', src: 'Calculated on total acquisition cost' },
  { k: 'Estimated net yield', v: '5.6%', src: 'Calculated on total acquisition cost' },
];

export function InvestmentAnalysisPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { analysisState, setAnalysisState } = useAppStore();
  const listing = LISTINGS.find((p) => p.id === id) ?? LISTINGS[0];
  const total = CATS.reduce((a, c) => a + c.got, 0);
  const vs = yieldVsScore();

  return (
    <div>
      <SiteHeader />
      <div style={{ padding: isMobile ? '22px 18px 36px' : '30px 28px 40px' }}>
        <div style={{ fontSize: 12, letterSpacing: '.2em', color: color.action, marginBottom: 8 }}>
          {listing.location.toUpperCase()} · {listing.price}
        </div>
        <h1 style={{ fontWeight: 700, fontSize: 34, textTransform: 'uppercase', letterSpacing: '-.012em', color: color.link, margin: '0 0 16px' }}>Why We Selected This Property</h1>

        <PreviewBar>
          <StateChips
            label="PREVIEW STATE"
            current={analysisState}
            onPick={setAnalysisState}
            choices={[
              { value: 'ok' as const, label: 'Full analysis' },
              { value: 'failed' as const, label: 'Narrative unavailable' },
            ]}
          />
        </PreviewBar>

        <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {analysisState === 'failed' ? (
            <div style={{ flex: '1 1 400px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ background: color.goldWash, border: '1px solid rgba(221,180,94,.4)', borderRadius: 16, padding: '18px 20px' }}>
                <div style={{ fontSize: 16.5, fontWeight: 600, color: color.link, marginBottom: 6 }}>Written analysis is not available for this property</div>
                <p style={{ fontSize: 15.5, lineHeight: 1.65, color: color.body, margin: '0 0 12px', maxWidth: '66ch' }}>
                  The narrative could not be generated. Every figure below is calculated from verified source data and is unaffected — only the commentary is missing. Nothing on this page is estimated by the text generator.
                </p>
                <button onClick={() => setAnalysisState('ok')} style={{ border: '1px solid rgba(221,180,94,.5)', borderRadius: 40, padding: '9px 15px', background: '#fff', color: color.link, fontSize: 15.5, fontWeight: 600, cursor: 'pointer' }}>
                  Request it again
                </button>
              </div>
              <div style={{ background: 'rgba(255,255,255,.8)', border: '1px solid rgba(255,255,255,.55)', borderRadius: 16, boxShadow: '0 12px 34px rgba(23,75,103,.07)', padding: 22 }}>
                <div style={{ fontWeight: 600, letterSpacing: '-.006em', fontSize: 21, color: color.link, marginBottom: 4 }}>Calculated figures</div>
                <div style={{ fontSize: 15.5, color: color.faint, marginBottom: 16 }}>Each line shows where the number came from.</div>
                {DET_FIGURES.map((f) => (
                  <div key={f.k} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '11px 0', borderBottom: `1px solid ${line(0.08)}` }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 16.5, color: color.link }}>{f.k}</div>
                      <div style={{ fontSize: 13.5, lineHeight: 1.5, color: color.faint }}>{f.src}</div>
                    </div>
                    <div style={{ fontSize: 15.5, fontWeight: 600, color: color.link, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{f.v}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ flex: '1 1 400px', minWidth: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 16, alignItems: 'start' }}>
              {REASONS.map((r) => (
                <div key={r.num} style={{ background: 'rgba(255,255,255,.8)', border: '1px solid rgba(255,255,255,.55)', borderRadius: 16, boxShadow: '0 12px 34px rgba(23,75,103,.07)', padding: '22px 22px 24px', height: '100%' }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', marginBottom: 10 }}>
                    <span style={{ fontWeight: 700, fontSize: 22, color: color.action, fontVariantNumeric: 'tabular-nums' }}>{r.num}</span>
                    <span style={{ flex: '1 1 auto', minWidth: 0, fontSize: 23, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.02em', color: color.link, lineHeight: 1.15 }}>{r.title}</span>
                    <PointsDots got={r.points} />
                  </div>
                  <div style={{ display: 'flex', gap: '10px 40px', flexWrap: 'wrap', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div style={{ flex: '0 0 auto' }}>
                      <div style={{ fontSize: 12, letterSpacing: '.13em', color: color.faint, marginBottom: 3 }}>{r.metricLabel}</div>
                      <div style={{ fontWeight: 700, fontSize: 24, color: color.link, fontVariantNumeric: 'tabular-nums' }}>{r.metric}</div>
                    </div>
                    <div style={{ flex: '1 1 220px', minWidth: 0 }}>
                      <div style={{ fontSize: 12, letterSpacing: '.13em', color: color.faint, marginBottom: 3 }}>{r.subLabel}</div>
                      <div style={{ fontSize: 16.5, lineHeight: 1.45, color: color.body }}>{r.sub}</div>
                    </div>
                  </div>
                  {r.extras && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(118px,1fr))', gap: 10, marginBottom: 12 }}>
                      {r.extras.map((x) => (
                        <div key={x.k} style={{ background: 'rgba(247,252,255,.62)', border: `1px solid ${line(0.09)}`, borderRadius: 12, padding: '11px 13px' }}>
                          <div style={{ fontSize: 12, letterSpacing: '.12em', color: color.faint, marginBottom: 4 }}>{x.k}</div>
                          <div style={{ fontWeight: 700, fontSize: 19, color: color.link, lineHeight: 1.1, fontVariantNumeric: 'tabular-nums' }}>{x.v}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.65, color: color.body, maxWidth: '62ch' }}>{r.body}</p>
                </div>
              ))}
            </div>
          )}

          <div style={{ flex: '1 1 300px', minWidth: 0, background: 'rgba(255,255,255,.8)', border: '1px solid rgba(255,255,255,.55)', borderRadius: 16, boxShadow: '0 12px 34px rgba(23,75,103,.07)', padding: 22 }}>
            <div style={{ fontWeight: 600, letterSpacing: '-.006em', fontSize: 21, color: color.link, marginBottom: 4 }}>Why this score?</div>
            <div style={{ fontSize: 15.5, color: color.faint, marginBottom: 18 }}>Five criteria, each scored 0, 1 or 2 points.</div>
            {vs && (
              <div style={{ background: color.panel, border: `1px solid ${line(0.1)}`, borderRadius: 12, padding: '14px 16px', marginBottom: 22 }}>
                <div style={{ fontSize: 15.5, fontWeight: 600, color: color.link, marginBottom: 4 }}>Higher yield, lower score?</div>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: color.body }}>{vs}</p>
              </div>
            )}
            {CATS.map((s) => (
              <div key={s.label} style={{ marginBottom: 26 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, fontSize: 15.5, marginBottom: 9 }}>
                  <span style={{ fontWeight: 600, color: color.link }}>{s.label}</span>
                  <PointsDots got={s.got} />
                </div>
                <div style={{ height: 10, borderRadius: 4, background: line(0.09), overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: 4, background: color.goldAlt, width: `${(s.got / s.max) * 100}%` }} />
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.65, color: color.body, marginTop: 10 }}>{s.note}</div>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: `1px solid ${line(0.14)}`, marginTop: 6, paddingTop: 18 }}>
              <span style={{ fontSize: 12, letterSpacing: '.18em', color: color.faint }}>TOTAL</span>
              <span style={{ fontWeight: 700, fontSize: 36, color: color.link, fontVariantNumeric: 'tabular-nums' }}>{total}
                <span style={{ fontSize: 20, fontWeight: 500, color: '#6B7F8E' }}> / 10</span>
              </span>
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.6, color: color.faint, marginTop: 12 }}>
              Preliminary assessment, produced from open sources and developer-supplied figures and reviewed before publication.
            </div>
            <button onClick={() => navigate('/calculator')} style={{ width: '100%', marginTop: 18, border: 0, borderRadius: 40, padding: 13, background: color.actionBright, color: '#fff', fontSize: 16.5, fontWeight: 600, cursor: 'pointer', boxShadow: '0 10px 24px rgba(23,75,103,.22)' }}>
              Model my own numbers
            </button>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
