import { Link, useNavigate } from 'react-router-dom';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { PropertyCard } from '@/components/PropertyCard';
import { LISTINGS } from '@/data/listings';
import { color, font } from '@/styles/theme';
import { useAppStore } from '@/state/store';

export function ResultsPage() {
  const navigate = useNavigate();
  const compareCount = useAppStore((s) => s.compare.length);

  return (
    <div>
      <SiteHeader active="properties" />
      <div style={{ padding: '26px 28px 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
          <div>
            <h1 style={{ fontFamily: font.display, fontWeight: 400, fontSize: 30, color: color.navy, margin: '0 0 5px' }}>Search Results</h1>
            <div style={{ fontSize: 13, color: color.textFaint }}>{LISTINGS.length} of {LISTINGS.length} properties · sorted by investment score</div>
          </div>
          <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/search')} style={{ border: `1px solid ${color.borderStrong}`, borderRadius: 6, padding: '9px 15px', background: '#fff', fontSize: 12.5, cursor: 'pointer' }}>
              Edit filters
            </button>
            <Link to="/compare" style={{ border: `1px solid ${color.borderStrong}`, borderRadius: 6, padding: '9px 15px', background: '#fff', fontSize: 12.5 }}>
              Compare ({compareCount})
            </Link>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(278px, 1fr))', gap: 18 }}>
          {LISTINGS.map((p) => (
            <PropertyCard key={p.id} listing={p} />
          ))}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
