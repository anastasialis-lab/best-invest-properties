import { Link } from 'react-router-dom';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { FilterPanel } from '@/components/FilterPanel';
import { PropertyCard } from '@/components/PropertyCard';
import { color, font } from '@/styles/theme';
import { useAppStore, filteredListings, matchCount } from '@/state/store';

export function BrowsePage() {
  const state = useAppStore();
  const listings = filteredListings(state);
  const compareCount = state.compare.length;

  return (
    <div>
      <SiteHeader active="properties" />
      <div style={{ padding: '26px 28px 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
          <div>
            <h1 style={{ fontFamily: font.display, fontWeight: 400, fontSize: 30, color: color.navy, margin: '0 0 5px' }}>Investment Opportunities</h1>
            <div style={{ fontSize: 13, color: color.textFaint }}>{matchCount(state)} properties match · sorted by investment score</div>
          </div>
          <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap', alignItems: 'center' }}>
            <select style={{ padding: '9px 11px', border: `1px solid ${color.borderStrong}`, borderRadius: 6, background: '#fff', fontSize: 12.5 }}>
              <option>Investment score</option>
              <option>Gross yield</option>
              <option>Net yield</option>
              <option>Price — low to high</option>
            </select>
            <Link to="/compare" style={{ border: `1px solid ${color.borderStrong}`, borderRadius: 6, padding: '9px 15px', background: '#fff', fontSize: 12.5 }}>
              Compare ({compareCount})
            </Link>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ flex: '0 1 268px', minWidth: 236, background: '#fff', border: `1px solid ${color.border}`, borderRadius: 9, padding: 20, alignSelf: 'flex-start' }}>
            <FilterPanel compact variant="browse" />
          </div>

          <div style={{ flex: '1 1 420px', minWidth: 0 }}>
            {listings.length === 0 && (
              <div style={{ background: '#fff', border: '1px dashed rgba(14,42,74,.24)', borderRadius: 9, padding: '40px 26px', textAlign: 'center', marginBottom: 16 }}>
                <div style={{ fontFamily: font.display, fontSize: 22, color: color.navy, marginBottom: 8 }}>No properties match</div>
                <p style={{ fontSize: 13.5, lineHeight: 1.6, color: color.textMuted, margin: '0 auto', maxWidth: '44ch' }}>
                  Widen your criteria — lower the minimum yield, raise the budget, or add a country.
                </p>
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(258px, 1fr))', gap: 16 }}>
              {listings.map((p) => (
                <PropertyCard key={p.id} listing={p} compact />
              ))}
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
