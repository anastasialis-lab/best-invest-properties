import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { FilterPanel } from '@/components/FilterPanel';
import { color, font } from '@/styles/theme';
import { useAppStore, matchCount, eurK } from '@/state/store';

export function SearchPage() {
  const state = useAppStore();
  const activeCountries = Object.keys(state.countries).filter((k) => state.countries[k]);

  return (
    <div>
      <SiteHeader active="properties" />
      <div style={{ padding: '30px 28px 40px' }}>
        <div style={{ marginBottom: 22 }}>
          <h1 style={{ fontFamily: font.display, fontWeight: 400, fontSize: 32, color: color.navy, margin: '0 0 6px' }}>Investment Opportunities</h1>
          <div style={{ fontSize: 13.5, color: color.textFaint }}>{matchCount(state)} properties match your criteria</div>
        </div>
        <div style={{ display: 'flex', gap: 26, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 320px', minWidth: 0, maxWidth: 420, background: '#fff', border: `1px solid ${color.border}`, borderRadius: 9, padding: 22 }}>
            <FilterPanel variant="search" />
          </div>

          <div style={{ flex: '1 1 300px', minWidth: 0, background: color.panel, border: `1px dashed rgba(14,42,74,.22)`, borderRadius: 9, padding: 24 }}>
            <div style={{ fontSize: 10, letterSpacing: '.14em', color: color.textFaint, marginBottom: 10 }}>LIVE PREVIEW</div>
            <div style={{ fontFamily: font.display, fontSize: 44, color: color.navy, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{matchCount(state)}</div>
            <p style={{ fontSize: 13.5, lineHeight: 1.6, color: color.textMuted, margin: '8px 0 18px' }}>
              properties currently match. The count updates as filters change, so nobody applies filters into an empty result set.
            </p>
            <div style={{ fontSize: 12.5, color: color.textMuted, lineHeight: 1.9 }}>
              <div>Countries · {activeCountries.join(' + ') || 'none selected'}</div>
              <div>Budget · up to {eurK(state.priceMax)}</div>
              <div>Gross yield · {state.minGross.toFixed(1)}% or more</div>
              <div>Net yield · {state.minNet.toFixed(1)}% or more</div>
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
