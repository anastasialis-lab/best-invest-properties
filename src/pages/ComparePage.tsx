import { useNavigate } from 'react-router-dom';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { color, line } from '@/styles/theme';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useAppStore, acq, eur, rentPair, netCaseNum } from '@/state/store';
import { LISTINGS, COMPLETION_BY_ID, CATS, breakdown, type Listing } from '@/data/listings';

interface Row {
  label: string;
  values: string[];
  bestIndex: number;
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

  const rows: Row[] = [
    buildRow(props, 'Price / total acquisition cost', (p) => `${p.price} / ${eur(acq(p))}`),
    buildRow(props, 'Monthly / annual rent — base case', (p) => rentPair(p, 'base')),
    buildRow(props, 'Net yield — base case', (p) => netPct(p, 'base'), (p) => netCaseNum(p, 'base')),
    buildRow(props, 'Monthly / annual rent — average case', (p) => rentPair(p, 'avg')),
    buildRow(props, 'Net yield — average case', (p) => netPct(p, 'avg'), (p) => netCaseNum(p, 'avg')),
    buildRow(props, 'Monthly / annual rent — best case', (p) => rentPair(p, 'best')),
    buildRow(props, 'Net yield — best case', (p) => netPct(p, 'best'), (p) => netCaseNum(p, 'best')),
    buildRow(props, 'Gross yield', (p) => p.gross, (p) => parseFloat(p.gross)),
    buildRow(props, 'Investment score', (p) => `${p.score} / 100`, (p) => p.score),
    ...CATS.map((c, ci) =>
      buildRow(
        props,
        `${c.label} · ${c.max}`,
        (p) => `${breakdown(p.score, parseFloat(p.net))[ci]}/${c.max}`,
        (p) => breakdown(p.score, parseFloat(p.net))[ci] / c.max
      )
    ),
    buildRow(props, 'Size', (p) => p.spec),
    buildRow(props, 'Completion', (p) => COMPLETION_BY_ID[p.id] ?? '—'),
  ];

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
              <table style={{ width: '100%', minWidth: 760, borderCollapse: 'collapse', background: '#fff', border: `1px solid ${line(0.07)}`, borderRadius: 16, boxShadow: '0 12px 34px rgba(23,75,103,.07)' }}>
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
                  {rows.map((r) => (
                    <tr key={r.label}>
                      <td style={{ padding: '14px 18px', fontSize: 15.5, color: color.body, borderBottom: `1px solid ${line(0.07)}`, position: 'sticky', left: 0, background: '#fff', zIndex: 1 }}>{r.label}</td>
                      {r.values.map((v, i) => (
                        <td
                          key={i}
                          style={{
                            padding: '14px 18px',
                            fontSize: 15.5,
                            borderBottom: `1px solid ${line(0.07)}`,
                            borderLeft: `1px solid ${line(0.08)}`,
                            fontVariantNumeric: 'tabular-nums',
                            color: i === r.bestIndex ? color.goldDeep : color.link,
                            fontWeight: i === r.bestIndex ? 700 : 400,
                          }}
                        >
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
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
