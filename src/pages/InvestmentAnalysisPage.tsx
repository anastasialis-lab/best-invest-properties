import { Link, useParams } from 'react-router-dom';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { color, font } from '@/styles/theme';
import { LISTINGS } from '@/data/listings';
import { REASONS, SCORE_ROWS } from '@/data/content';

export function InvestmentAnalysisPage() {
  const { id } = useParams();
  const listing = LISTINGS.find((p) => p.id === id) ?? LISTINGS[0];

  return (
    <div>
    <SiteHeader active="properties" />
    <div style={{ padding: '30px 28px 40px' }}>
      <div style={{ fontSize: 10, letterSpacing: '.2em', color: color.gold, marginBottom: 8 }}>
        {listing.location.toUpperCase()} · {listing.price}
      </div>
      <h1 style={{ fontFamily: font.display, fontWeight: 400, fontSize: 34, color: color.navy, margin: '0 0 26px' }}>Why We Selected This Property</h1>

      <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div style={{ flex: '1 1 400px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 1, background: color.border, border: `1px solid ${color.border}`, borderRadius: 9, overflow: 'hidden' }}>
          {REASONS.map((r) => (
            <div key={r.num} style={{ background: '#fff', padding: '22px 22px 24px' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', marginBottom: 10 }}>
                <span style={{ fontFamily: font.display, fontSize: 15, color: color.gold }}>{r.num}</span>
                <span style={{ fontSize: 16, fontWeight: 600, color: color.navy }}>{r.title}</span>
              </div>
              <div style={{ display: 'flex', gap: 26, flexWrap: 'wrap', marginBottom: 10 }}>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: '.13em', color: color.textFaint, marginBottom: 3 }}>{r.metricLabel}</div>
                  <div style={{ fontFamily: font.display, fontSize: 24, color: color.navy, fontVariantNumeric: 'tabular-nums' }}>{r.metric}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: '.13em', color: color.textFaint, marginBottom: 3 }}>{r.subLabel}</div>
                  <div style={{ fontSize: 13.5, color: color.textMuted, paddingTop: 6 }}>{r.sub}</div>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.65, color: color.textMuted, maxWidth: '62ch' }}>{r.body}</p>
            </div>
          ))}
        </div>

        <div style={{ flex: '1 1 300px', minWidth: 0, background: '#fff', border: `1px solid ${color.border}`, borderRadius: 9, padding: 22 }}>
          <div style={{ fontFamily: font.display, fontSize: 21, color: color.navy, marginBottom: 4 }}>Investment Score</div>
          <div style={{ fontSize: 12.5, color: color.textFaint, marginBottom: 18 }}>Eight criteria, weighted by our model.</div>
          {SCORE_ROWS.map((s) => (
            <div key={s.label} style={{ marginBottom: 13 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, marginBottom: 5 }}>
                <span style={{ color: color.textMuted }}>{s.label}</span>
                <span style={{ fontWeight: 600, color: color.navy, fontVariantNumeric: 'tabular-nums' }}>
                  {s.got}/{s.max}
                </span>
              </div>
              <div style={{ height: 7, borderRadius: 4, background: 'rgba(14,42,74,.09)', overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: 4, background: color.gold, width: s.pct }} />
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: `1px solid ${color.borderStrong}`, marginTop: 18, paddingTop: 14 }}>
            <span style={{ fontSize: 10, letterSpacing: '.18em', color: color.textFaint }}>TOTAL</span>
            <span style={{ fontFamily: font.display, fontSize: 36, color: color.navy, fontVariantNumeric: 'tabular-nums' }}>{listing.score} / 100</span>
          </div>
          <div style={{ fontSize: 12, lineHeight: 1.6, color: color.textFaint, marginTop: 12 }}>
            Risk and liquidity score low: pre-completion purchase in a market with a slower resale cycle. Shown openly rather than averaged away.
          </div>
          <Link
            to="/calculator"
            style={{ display: 'block', textAlign: 'center', width: '100%', marginTop: 18, border: 0, borderRadius: 6, padding: 13, background: color.navy, color: '#fff', fontSize: 13.5, fontWeight: 600 }}
          >
            Model my own numbers
          </Link>
        </div>
      </div>
    </div>
    <SiteFooter />
    </div>
  );
}
