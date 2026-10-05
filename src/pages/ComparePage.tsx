import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InfoButton } from '@/components/ScoreBits';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { color, line } from '@/styles/theme';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useAppStore, acq, eur, rentPair, netCaseNum } from '@/state/store';
import { LISTINGS, COMPLETION_BY_ID, CATS, breakdown, type Listing } from '@/data/listings';

interface Cell {
  main: string;
  den?: string;
  gold?: boolean;
}

interface Row {
  label: string;
  values: string[];
  bestIndex: number;
  head?: boolean;
  bg?: string;
  tip?: string;
  cells?: Cell[];
}

function buildRow(props: Listing[], label: string, pick: (p: Listing) => string, best?: (p: Listing) => number): Row {
  const values = props.map(pick);
  let bestIndex = -1;
  if (best) {
    let bestValue: number | null = null;
    props.forEach((p, i) => {
      const v = best(p);
      if (bestValue === null || v > bestValue) {
        bestValue = v;
        bestIndex = i;
      }
    });
  }
  return { label, values, bestIndex };
}

export function ComparePage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { compare, removeCompare } = useAppStore();

  const props = compare.map((id) => LISTINGS.find((p) => p.id === id)).filter(Boolean) as Listing[];
  const netPct = (p: Listing, c: 'base' | 'avg' | 'best') => netCaseNum(p, c).toFixed(1) + '%';

  const SCENARIOS: Array<['base' | 'avg' | 'best', string, string]> = [
    ['base', 'CONSERVATIVE', '#F4F8FB'],
    ['avg', 'AVERAGE', '#EDF3F8'],
    ['best', 'BEST', '#FBF5E8'],
  ];

  const rows: Row[] = [
    buildRow(props, 'Price / total acquisition cost', (p) => `${p.price} / ${eur(acq(p))}`),
    ...SCENARIOS.flatMap(([k, h, bg]) => [
      { label: h, values: [], bestIndex: -1, head: true, bg },
      { ...buildRow(props, 'Monthly rent / annual rental income', (p) => rentPair(p, k)), bg },
      { ...buildRow(props, 'Net annual yield', (p) => netPct(p, k), (p) => netCaseNum(p, k)), bg },
    ]),
    { ...buildRow(props, 'Gross annual yield', (p) => p.gross, (p) => parseFloat(p.gross)), tip: 'Calculated using the Average scenario.' },
    {
      ...buildRow(props, 'Investment Score', (p) => `${p.score} / 10`, (p) => p.score),
      tip: 'Calculated using the Average scenario.',
      cells: props.map((p) => ({ main: String(p.score), den: ' / 10' })),
    },
    ...CATS.map((c, ci) => ({
      label: c.label,
      values: props.map((p) => `${breakdown(p)[ci]} / 2`),
      bestIndex: -1,
      cells: props.map((p) => ({ main: String(breakdown(p)[ci]), den: ' / 2', gold: breakdown(p)[ci] === 2 })),
    })),
    buildRow(props, 'Size', (p) => p.spec),
    buildRow(props, 'Completion', (p) => COMPLETION_BY_ID[p.id] ?? '—'),
  ];
  const [tipOpen, setTipOpen] = useState<string | null>(null);


  return (
    <div>
      <SiteHeader />
      <div style={{ padding: isMobile ? '22px 18px 36px' : '30px 28px 40px' }}>
        <h1 style={{ fontWeight: 700, fontSize: 32, textTransform: 'uppercase', letterSpacing: '-.012em', color: color.link, margin: '0 0 5px' }}>Compare Investments</h1>
        <p style={{ fontSize: 16.5, color: color.faint, margin: '0 0 24px' }}>
          Up to five properties side by side. Best value in each row is marked. {props.length} of 5 selected.
        </p>

        {props.length < 2 ? (
          <div style={{ background: '#fff', border: `1px dashed ${line(0.24)}`, borderRadius: 16, padding: '40px 26px', textAlign: 'center' }}>
            <div style={{ fontWeight: 600, letterSpacing: '-.006em', fontSize: 22, color: color.link, marginBottom: 8 }}>Add at least two properties</div>
            <p style={{ fontSize: 16.5, lineHeight: 1.6, color: color.body, margin: '0 auto 18px', maxWidth: '48ch' }}>
              A comparison needs at least two properties, and holds up to five. Use the + button on any result card to add one.
            </p>
            <button onClick={() => navigate('/browse')} style={{ border: 0, borderRadius: 40, padding: '12px 22px', background: color.actionBright, color: '#fff', fontSize: 15.5, fontWeight: 600, cursor: 'pointer', boxShadow: '0 10px 24px rgba(23,75,103,.22)' }}>
              Browse investments
            </button>
          </div>
        ) : (
          <>
            <div style={{ overflowX: 'auto' }} className="bip-scroll">
              <table style={{ width: '100%', minWidth: 760, borderCollapse: 'collapse', background: 'rgba(255,255,255,.8)', border: '1px solid rgba(255,255,255,.55)', borderRadius: 16, boxShadow: '0 12px 34px rgba(23,75,103,.07)' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '18px 18px 14px', fontSize: 12, letterSpacing: '.16em', color: color.faint, fontWeight: 500, borderBottom: `1px solid ${line(0.12)}`, position: 'sticky', left: 0, background: '#fff', zIndex: 2 }}>
                      COMPARE
                    </th>
                    {props.map((p) => (
                      <th key={p.id} style={{ textAlign: 'left', padding: 18, borderBottom: `1px solid ${line(0.12)}`, borderLeft: `1px solid ${line(0.08)}` }}>
                        <div style={{ height: 54, borderRadius: 10, marginBottom: 9, background: color.panelBlue, filter: 'blur(1px)' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'flex-start' }}>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontWeight: 600, letterSpacing: '-.006em', fontSize: 19, color: color.link }}>{p.location.split(',')[0]}</div>
                            <div style={{ fontSize: 13.5, color: color.faint, fontWeight: 400 }}>{p.location.split(', ')[1]}</div>
                          </div>
                          <button
                            onClick={() => removeCompare(p.id, p.location.split(',')[0])}
                            title="Remove from comparison"
                            style={{ flex: 'none', border: `1px solid ${line(0.16)}`, borderRadius: 40, width: 30, height: 30, background: '#fff', color: color.faint, fontSize: 15.5, cursor: 'pointer', lineHeight: 1 }}
                          >
                            ✕
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) =>
                    r.head ? (
                      <tr key={r.label}>
                        <td colSpan={props.length + 1} style={{ padding: '16px 18px 8px', background: r.bg, borderTop: `1px solid ${line(0.12)}`, borderBottom: `1px solid ${line(0.07)}` }}>
                          <span style={{ position: 'sticky', left: 18, fontSize: 12, letterSpacing: '.16em', fontWeight: 700, color: color.action }}>{r.label} SCENARIO</span>
                        </td>
                      </tr>
                    ) : (
                      <tr key={r.label + (r.bg ?? '')}>
                        <td style={{ padding: '14px 18px', fontSize: 15.5, color: color.body, borderBottom: `1px solid ${line(0.07)}`, position: 'sticky', left: 0, background: r.bg ?? '#fff', zIndex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            {r.label}
                            {r.tip && <InfoButton open={tipOpen === r.label} onToggle={() => setTipOpen(tipOpen === r.label ? null : r.label)} />}
                          </div>
                          {r.tip && tipOpen === r.label && (
                            <div role="note" style={{ margin: '8px 0 0', maxWidth: 240, background: color.panel, border: '1px solid rgba(23,75,103,.14)', borderRadius: 10, padding: '9px 11px', fontSize: 14, lineHeight: 1.5, color: color.body }}>
                              {r.tip}
                            </div>
                          )}
                        </td>
                        {r.values.map((v, i) => {
                          const cell = r.cells?.[i];
                          const best = i === r.bestIndex || !!cell?.gold;
                          return (
                            <td
                              key={i}
                              style={{
                                padding: '14px 18px',
                                fontSize: 15.5,
                                borderBottom: `1px solid ${line(0.07)}`,
                                borderLeft: `1px solid ${line(0.08)}`,
                                background: r.bg,
                                fontVariantNumeric: 'tabular-nums',
                                color: best ? color.goldDeep : color.link,
                                fontWeight: best ? 700 : 400,
                              }}
                            >
                              {cell ? (
                                <>
                                  <span>{cell.main}</span>
                                  <span style={{ color: '#6B7F8E', fontWeight: 400, fontSize: 14 }}>{cell.den}</span>
                                </>
                              ) : (
                                v
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 20 }}>
              <button onClick={() => navigate('/register')} style={{ border: 0, borderRadius: 40, padding: '13px 24px', background: color.actionBright, color: '#fff', fontSize: 16.5, fontWeight: 600, cursor: 'pointer' }}>
                Request Information
              </button>
              <button onClick={() => navigate('/browse')} style={{ border: `1px solid ${line(0.18)}`, borderRadius: 40, padding: '13px 24px', background: 'transparent', color: color.link, fontSize: 16.5, fontWeight: 500, cursor: 'pointer' }}>
                Add another property
              </button>
            </div>
          </>
        )}
      </div>
      <SiteFooter />
    </div>
  );
}
