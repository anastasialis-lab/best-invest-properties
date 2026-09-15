import { Link } from 'react-router-dom';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { color, font } from '@/styles/theme';
import { LISTINGS, COMPLETION_BY_ID, type Listing } from '@/data/listings';
import { StripedPlaceholder } from '@/components/StripedPlaceholder';
import { useAppStore } from '@/state/store';

interface CompareRow {
  label: string;
  values: string[];
  bestIndex: number;
}

function buildRow(cmpProps: (Listing | null)[], label: string, pick: (p: Listing) => string, best?: (p: Listing) => number): CompareRow {
  const values = cmpProps.map((p) => (p ? pick(p) : '—'));
  let bestIndex = -1;
  if (best) {
    let bestValue: number | null = null;
    cmpProps.forEach((p, i) => {
      if (!p) return;
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
  const compare = useAppStore((s) => s.compare);
  const cmpIds = compare.slice(0, 3);
  const cmpProps: (Listing | null)[] = cmpIds.map((id) => LISTINGS.find((p) => p.id === id) ?? null);
  while (cmpProps.length < 3) cmpProps.push(null);

  const rows: CompareRow[] = [
    buildRow(cmpProps, 'Price', (p) => p.price),
    buildRow(cmpProps, 'Gross yield', (p) => p.gross, (p) => parseFloat(p.gross)),
    buildRow(cmpProps, 'Net yield', (p) => p.net, (p) => parseFloat(p.net)),
    buildRow(cmpProps, 'Investment score', (p) => String(p.score), (p) => p.score),
    buildRow(cmpProps, 'Size', (p) => p.spec),
    buildRow(cmpProps, 'Completion', (p) => COMPLETION_BY_ID[p.id] ?? '—'),
  ];

  return (
    <div>
    <SiteHeader active="properties" />
    <div style={{ padding: '30px 28px 40px' }}>
      <h1 style={{ fontFamily: font.display, fontWeight: 400, fontSize: 32, color: color.navy, margin: '0 0 5px' }}>Compare Investments</h1>
      <p style={{ fontSize: 13.5, color: color.textFaint, margin: '0 0 24px' }}>Up to three properties side by side. Best value in each row is marked.</p>

      <div style={{ overflowX: 'auto' }} className="bip-scroll">
        <table style={{ width: '100%', minWidth: 560, borderCollapse: 'collapse', background: '#fff', border: `1px solid ${color.border}`, borderRadius: 9 }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '18px 18px 14px', fontSize: 10, letterSpacing: '.16em', color: color.textFaint, fontWeight: 500, borderBottom: `1px solid ${color.border}` }}>
                COMPARE
              </th>
              {cmpProps.map((p, i) => (
                <th key={i} style={{ textAlign: 'left', padding: 18, borderBottom: `1px solid ${color.border}`, borderLeft: `1px solid ${color.borderSoft}` }}>
                  <StripedPlaceholder height={54} radius={5} style={{ marginBottom: 9 }} />
                  <div style={{ fontFamily: font.display, fontSize: 19, color: color.navy }}>{p ? p.location.split(',')[0] : 'Add property'}</div>
                  <div style={{ fontSize: 11.5, color: color.textFaint, fontWeight: 400 }}>{p ? p.location.split(', ')[1] : 'empty slot'}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <td style={{ padding: '14px 18px', fontSize: 13, color: color.textMuted, borderBottom: `1px solid ${color.borderSoft}` }}>{row.label}</td>
                {row.values.map((v, i) => (
                  <td
                    key={i}
                    style={{
                      padding: '14px 18px',
                      fontSize: 14.5,
                      borderBottom: `1px solid ${color.borderSoft}`,
                      borderLeft: `1px solid ${color.borderSoft}`,
                      fontVariantNumeric: 'tabular-nums',
                      color: i === row.bestIndex ? color.gold : color.navy,
                      fontWeight: i === row.bestIndex ? 600 : 400,
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
        <Link to="/register" style={{ border: 0, borderRadius: 6, padding: '13px 24px', background: color.gold, color: '#fff', fontSize: 13.5, fontWeight: 600 }}>
          Request Information
        </Link>
        <Link to="/results" style={{ border: `1px solid ${color.borderStrong}`, borderRadius: 6, padding: '13px 24px', background: 'transparent', color: color.navy, fontSize: 13.5, fontWeight: 500 }}>
          Add another property
        </Link>
      </div>
    </div>
    <SiteFooter />
    </div>
  );
}
