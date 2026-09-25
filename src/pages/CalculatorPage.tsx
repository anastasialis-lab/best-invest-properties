import { useNavigate } from 'react-router-dom';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { color, line } from '@/styles/theme';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useAppStore, calcResults, calcErrors, rentBandFor, eur, type RentCase, type CalcStrategy } from '@/state/store';

const CASES: Array<{ key: RentCase; label: string }> = [
  { key: 'base', label: 'BASE CASE' },
  { key: 'avg', label: 'AVERAGE' },
  { key: 'best', label: 'BEST CASE' },
];

const STRATEGIES: Array<{ key: CalcStrategy; label: string }> = [
  { key: 'long', label: 'Long-term' },
  { key: 'short', label: 'Short-term' },
];

const MGMT_OPTIONS = [10, 15, 20, 25, 30];

export function CalculatorPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { calc, setCalc } = useAppStore();

  const band = rentBandFor(calc.purchase, calc.strategy);
  const errors = calcErrors(calc);
  const errCount = Object.keys(errors).length;
  const selected = calc.rentCase;

  const perCase = CASES.map((c) => {
    const x = calcResults({ ...calc, rentCase: c.key });
    return { key: c.key, acq: x.invested, exp: x.opex, inc: x.gross - x.opex, ny: x.invested > 0 ? ((x.gross - x.opex) / x.invested) * 100 : 0 };
  });

  const rows = [
    { k: 'Total acquisition cost', fmt: (x: (typeof perCase)[number]) => eur(x.acq) },
    { k: 'Total annual expenses', fmt: (x: (typeof perCase)[number]) => '− ' + eur(x.exp) },
    { k: 'Annual income after expenses', fmt: (x: (typeof perCase)[number]) => eur(x.inc) },
    { k: 'Net rental yield', fmt: (x: (typeof perCase)[number]) => x.ny.toFixed(1) + '%' },
  ];

  const current = calcResults(calc);
  const selNetYield = (current.invested > 0 ? ((current.gross - current.opex) / current.invested) * 100 : 0).toFixed(1) + '%';
  const selLabel = CASES.find((c) => c.key === selected)?.label ?? 'BASE CASE';
  const gridCols = isMobile ? '1fr' : '1.4fr repeat(3,minmax(0,1fr))';

  return (
    <div style={{ background: 'linear-gradient(180deg,#E5F6FF 0%,#EFF9FF 210px,#F7FCFF 430px)' }}>
      <SiteHeader />
      <div style={{ padding: isMobile ? '22px 18px 36px' : '30px 28px 40px' }}>
        <h1 style={{ fontWeight: 700, fontSize: 32, textTransform: 'uppercase', letterSpacing: '-.012em', color: color.link, margin: '0 0 5px' }}>Financial Calculator</h1>
        <p style={{ fontSize: 16.5, color: color.faint, margin: '0 0 24px' }}>Larnaca, Cyprus · 1 bedroom. Change any assumption; results recalculate.</p>

        <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 340px', minWidth: 0, background: '#fff', border: `1px solid ${line(0.07)}`, borderRadius: 16, boxShadow: '0 12px 34px rgba(23,75,103,.07)', padding: 22 }}>
            <div style={{ fontSize: 12, letterSpacing: '.14em', color: color.faint, marginBottom: 10 }}>PURCHASE</div>
            <label style={{ display: 'block', marginBottom: 18 }}>
              <span style={{ display: 'block', fontSize: 15.5, color: color.body, marginBottom: 5 }}>Purchase price</span>
              <input
                type="number"
                value={calc.purchase}
                onChange={(e) => {
                  const v = parseFloat(e.target.value);
                  setCalc({ purchase: isNaN(v) ? 0 : Math.round(v) });
                }}
                style={{
                  width: '100%',
                  padding: '10px 11px',
                  border: `1px solid ${errors.purchase ? color.danger : line(0.18)}`,
                  borderRadius: 10,
                  background: errors.purchase ? color.dangerWash : color.panel,
                  fontSize: 16.5,
                  fontVariantNumeric: 'tabular-nums',
                }}
              />
              {errors.purchase && <span style={{ display: 'block', fontSize: 13.5, lineHeight: 1.5, color: color.dangerDeep, marginTop: 5 }}>{errors.purchase}</span>}
            </label>

            <div style={{ fontSize: 12, letterSpacing: '.14em', color: color.faint, marginBottom: 9 }}>RENTAL</div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 15.5, color: color.body, marginBottom: 6 }}>Rental strategy</div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                {STRATEGIES.map((s) => {
                  const on = calc.strategy === s.key;
                  return (
                    <button
                      key={s.key}
                      onClick={() => setCalc({ strategy: s.key, rent: rentBandFor(calc.purchase, s.key)[selected] })}
                      style={{ flex: 1, border: `1px solid ${on ? color.navy : line(0.18)}`, borderRadius: 40, padding: 10, minHeight: 44, fontSize: 15.5, fontWeight: on ? 600 : 400, cursor: 'pointer', background: on ? color.navy : color.panel, color: on ? '#fff' : color.dim }}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>

              <div style={{ fontSize: 15.5, color: color.body, marginBottom: 6 }}>Monthly rent</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
                {CASES.map((c) => {
                  const on = selected === c.key;
                  return (
                    <button
                      key={c.key}
                      onClick={() => setCalc({ rentCase: c.key, rent: band[c.key] })}
                      style={{ border: `1px solid ${on ? color.navy : line(0.18)}`, borderRadius: 12, padding: '12px 10px', minHeight: 66, textAlign: 'left', cursor: 'pointer', background: on ? color.navy : color.panel, color: on ? '#fff' : color.navy }}
                    >
                      <span style={{ display: 'block', fontSize: 11.5, letterSpacing: '.12em', opacity: 0.75, marginBottom: 5 }}>{c.label}</span>
                      <span style={{ display: 'block', fontWeight: 700, fontSize: 15.5, fontVariantNumeric: 'tabular-nums' }}>{eur(band[c.key])}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15.5, color: color.body, marginBottom: 5 }}>
                <span>Occupancy</span>
                <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{calc.occupancy}%</span>
              </div>
              <input type="range" min={50} max={100} value={calc.occupancy} onChange={(e) => setCalc({ occupancy: parseInt(e.target.value, 10) })} style={{ width: '100%', accentColor: color.action }} />
            </div>

            <div>
              <div style={{ fontSize: 15.5, color: color.body, marginBottom: 8 }}>Management fee</div>
              <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                {MGMT_OPTIONS.map((v) => {
                  const on = calc.mgmt === v;
                  return (
                    <button
                      key={v}
                      onClick={() => setCalc({ mgmt: v })}
                      style={{ border: `1px solid ${on ? color.navy : line(0.18)}`, borderRadius: 40, padding: '10px 16px', minHeight: 44, fontSize: 15.5, fontWeight: on ? 600 : 400, fontVariantNumeric: 'tabular-nums', cursor: 'pointer', background: on ? color.navy : color.panel, color: on ? '#fff' : color.dim }}
                    >
                      {v}%
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div style={{ flex: '1 1 300px', minWidth: 0, background: 'linear-gradient(142deg,#0C5A70 0%,#10476A 56%,#123F66 100%)', color: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 18px 40px rgba(12,63,102,.22)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, marginBottom: 18 }}>
              <div style={{ fontWeight: 700, fontSize: 22, textTransform: 'uppercase', letterSpacing: '-.008em' }}>Results</div>
              <div style={{ fontSize: 12, letterSpacing: '.16em', color: color.skyBright }}>YOUR ASSUMPTIONS</div>
            </div>

            {errCount > 0 ? (
              <div style={{ background: 'rgba(221,180,94,.14)', border: '1px solid rgba(221,180,94,.4)', borderRadius: 7, padding: 18 }}>
                <div style={{ fontSize: 16.5, fontWeight: 600, color: color.gold, marginBottom: 6 }}>Cannot calculate yet</div>
                <p style={{ fontSize: 15.5, lineHeight: 1.65, color: color.skyBright, margin: 0 }}>
                  {errCount} input needs fixing before we can model this. The fields in question are marked on the left; previous results are cleared rather than shown against invalid inputs.
                </p>
              </div>
            ) : (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: gridCols, gap: 8, alignItems: 'stretch', marginBottom: 8 }}>
                  {!isMobile && <div style={{ fontSize: 11.5, letterSpacing: '.14em', color: color.skyBright, alignSelf: 'end', paddingBottom: 8 }}>RENT SCENARIO</div>}
                  {CASES.map((c) => {
                    const on = selected === c.key;
                    return (
                      <button
                        key={c.key}
                        onClick={() => setCalc({ rentCase: c.key, rent: band[c.key] })}
                        style={{ minWidth: 0, border: `1px solid ${on ? 'rgba(221,180,94,.5)' : 'rgba(255,255,255,.12)'}`, borderRadius: 12, padding: '11px 8px', textAlign: 'left', cursor: 'pointer', background: on ? 'rgba(221,180,94,.16)' : 'rgba(255,255,255,.07)', color: '#fff' }}
                      >
                        <span style={{ display: 'block', fontSize: 11.5, letterSpacing: '.1em', color: on ? color.gold : color.skyBright, marginBottom: 5 }}>{c.label}</span>
                        <span style={{ display: 'block', fontSize: 15.5, fontWeight: 600, fontVariantNumeric: 'tabular-nums', overflowWrap: 'break-word' }}>{eur(band[c.key])}</span>
                      </button>
                    );
                  })}
                </div>

                {rows.map((r) => (
                  <div key={r.k} style={{ display: 'grid', gridTemplateColumns: gridCols, gap: 8, alignItems: 'center', padding: '11px 0', borderTop: '1px solid rgba(255,255,255,.12)' }}>
                    <span style={{ fontSize: 15.5, lineHeight: 1.35, color: color.skyBright }}>{r.k}</span>
                    {perCase.map((x) => (
                      <span key={x.key} style={{ textAlign: 'left', fontSize: 16.5, fontWeight: x.key === selected ? 700 : 400, color: x.key === selected ? '#fff' : color.skyBright, fontVariantNumeric: 'tabular-nums' }}>
                        {r.fmt(x)}
                      </span>
                    ))}
                  </div>
                ))}

                <div style={{ marginTop: 22, padding: 20, borderRadius: 12, background: 'rgba(221,180,94,.16)', border: '1px solid rgba(221,180,94,.34)' }}>
                  <div style={{ fontSize: 12, letterSpacing: '.16em', color: color.gold, marginBottom: 6 }}>NET RENTAL YIELD · {selLabel}</div>
                  <div style={{ fontWeight: 700, fontSize: 52, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{selNetYield}</div>
                  <div style={{ fontSize: 15.5, color: color.skyBright, marginTop: 8 }}>on {eur(current.invested)} of total acquisition cost</div>
                </div>
              </>
            )}

            <button onClick={() => navigate('/compare')} style={{ width: '100%', marginTop: 20, border: 0, borderRadius: 40, padding: 13, background: color.actionBright, color: '#fff', fontSize: 16.5, fontWeight: 600, cursor: 'pointer' }}>
              Compare with other properties
            </button>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
