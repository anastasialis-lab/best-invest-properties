import { useNavigate } from 'react-router-dom';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { color, font } from '@/styles/theme';
import { useAppStore, calcResults, eur } from '@/state/store';

function numField(v: number, cb: (n: number) => void, int = false) {
  return {
    value: v,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const n = parseFloat(e.target.value);
      cb(isNaN(n) ? 0 : int ? Math.round(n) : n);
    },
  };
}

export function CalculatorPage() {
  const navigate = useNavigate();
  const { calc, setCalc, setFinancing } = useAppStore();
  const r = calcResults(calc);
  const isMortgage = calc.financing === 'mortgage';

  const calcRows = [
    { k: 'Annual gross rent', v: eur(r.gross) },
    { k: 'Management fee', v: '− ' + eur(r.mgmt) },
    { k: 'Other operating costs', v: '− €1,400' },
    { k: 'Mortgage costs', v: '− ' + eur(r.annualDebt) },
    { k: 'Annual cash flow', v: eur(r.cash) },
  ];

  return (
    <div>
    <SiteHeader active="properties" />
    <div style={{ padding: '30px 28px 40px' }}>
      <h1 style={{ fontFamily: font.display, fontWeight: 400, fontSize: 32, color: color.navy, margin: '0 0 5px' }}>Financial Calculator</h1>
      <p style={{ fontSize: 13.5, color: color.textFaint, margin: '0 0 24px' }}>Larnaca, Cyprus · 1 bedroom. Change any assumption; results recalculate.</p>
      <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div style={{ flex: '1 1 340px', minWidth: 0, background: '#fff', border: `1px solid ${color.border}`, borderRadius: 9, padding: 22 }}>
          <div style={{ fontSize: 10, letterSpacing: '.14em', color: color.textFaint, marginBottom: 10 }}>PURCHASE</div>
          <label style={{ display: 'block', marginBottom: 18 }}>
            <span style={{ display: 'block', fontSize: 12.5, color: color.textMuted, marginBottom: 5 }}>Purchase price</span>
            <input type="number" style={inputStyle} {...numField(calc.purchase, (v) => setCalc({ purchase: v }), true)} />
          </label>

          <div style={{ fontSize: 10, letterSpacing: '.14em', color: color.textFaint, marginBottom: 9 }}>FINANCING</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <button
              onClick={() => setFinancing('cash')}
              style={{ flex: 1, border: `1px solid ${color.borderStrong}`, borderRadius: 6, padding: 10, fontSize: 13, cursor: 'pointer', background: !isMortgage ? color.navy : color.cardAlt, color: !isMortgage ? '#fff' : color.textMuted }}
            >
              Cash
            </button>
            <button
              onClick={() => setFinancing('mortgage')}
              style={{ flex: 1, border: `1px solid ${color.borderStrong}`, borderRadius: 6, padding: 10, fontSize: 13, cursor: 'pointer', background: isMortgage ? color.navy : color.cardAlt, color: isMortgage ? '#fff' : color.textMuted }}
            >
              Mortgage
            </button>
          </div>

          {isMortgage && (
            <div style={{ background: color.panelAlt, borderRadius: 7, padding: 16, marginBottom: 18 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12 }}>
                <label style={{ display: 'block' }}>
                  <span style={{ display: 'block', fontSize: 12, color: color.textMuted, marginBottom: 5 }}>Deposit</span>
                  <input type="number" style={{ ...inputStyle, padding: '9px 10px', fontSize: 13.5, background: '#fff' }} {...numField(calc.deposit, (v) => setCalc({ deposit: v }), true)} />
                </label>
                <div>
                  <span style={{ display: 'block', fontSize: 12, color: color.textMuted, marginBottom: 5 }}>Mortgage</span>
                  <div style={{ padding: '9px 10px', border: `1px solid ${color.borderSoft}`, borderRadius: 6, background: color.paper, fontSize: 13.5, fontVariantNumeric: 'tabular-nums' }}>{eur(r.loan)}</div>
                </div>
                <label style={{ display: 'block' }}>
                  <span style={{ display: 'block', fontSize: 12, color: color.textMuted, marginBottom: 5 }}>Interest %</span>
                  <input type="number" step={0.1} style={{ ...inputStyle, padding: '9px 10px', fontSize: 13.5, background: '#fff' }} {...numField(calc.rate, (v) => setCalc({ rate: v }))} />
                </label>
                <label style={{ display: 'block' }}>
                  <span style={{ display: 'block', fontSize: 12, color: color.textMuted, marginBottom: 5 }}>Term (years)</span>
                  <input type="number" style={{ ...inputStyle, padding: '9px 10px', fontSize: 13.5, background: '#fff' }} {...numField(calc.term, (v) => setCalc({ term: v }), true)} />
                </label>
              </div>
            </div>
          )}

          <div style={{ fontSize: 10, letterSpacing: '.14em', color: color.textFaint, marginBottom: 9 }}>RENTAL</div>
          <label style={{ display: 'block', marginBottom: 14 }}>
            <span style={{ display: 'block', fontSize: 12.5, color: color.textMuted, marginBottom: 5 }}>Monthly rent</span>
            <input type="number" style={inputStyle} {...numField(calc.rent, (v) => setCalc({ rent: v }), true)} />
          </label>
          <div style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: color.textMuted, marginBottom: 5 }}>
              <span>Occupancy</span>
              <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{calc.occupancy}%</span>
            </div>
            <input type="range" min={50} max={100} value={calc.occupancy} onChange={(e) => setCalc({ occupancy: parseInt(e.target.value, 10) })} style={{ width: '100%' }} />
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: color.textMuted, marginBottom: 5 }}>
              <span>Management fee</span>
              <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{calc.mgmt}%</span>
            </div>
            <input type="range" min={0} max={25} value={calc.mgmt} onChange={(e) => setCalc({ mgmt: parseInt(e.target.value, 10) })} style={{ width: '100%' }} />
          </div>
        </div>

        <div style={{ flex: '1 1 300px', minWidth: 0, background: color.navyDark, color: '#fff', borderRadius: 9, padding: 24 }}>
          <div style={{ fontSize: 10, letterSpacing: '.18em', color: color.railMuted, marginBottom: 18 }}>RESULTS</div>
          {calcRows.map((row) => (
            <div key={row.k} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '11px 0', borderBottom: '1px solid rgba(255,255,255,.12)', fontSize: 13.5 }}>
              <span style={{ color: '#C3D0DE' }}>{row.k}</span>
              <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{row.v}</span>
            </div>
          ))}
          <div style={{ marginTop: 22, padding: 18, borderRadius: 7, background: 'rgba(226,181,88,.14)' }}>
            <div style={{ fontSize: 10, letterSpacing: '.16em', color: color.goldLight, marginBottom: 6 }}>CASH-ON-CASH RETURN</div>
            <div style={{ fontFamily: font.display, fontSize: 44, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{r.coc.toFixed(1)}%</div>
            <div style={{ fontSize: 12.5, color: '#C3D0DE', marginTop: 8 }}>on {eur(r.invested)} of cash invested</div>
          </div>
          <button
            onClick={() => navigate('/compare')}
            style={{ width: '100%', marginTop: 20, border: 0, borderRadius: 6, padding: 13, background: color.gold, color: '#fff', fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}
          >
            Compare with other properties
          </button>
        </div>
      </div>
    </div>
    <SiteFooter />
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px 11px',
  border: `1px solid ${color.borderStrong}`,
  borderRadius: 6,
  background: color.cardAlt,
  fontSize: 14,
  fontVariantNumeric: 'tabular-nums',
} as const;
