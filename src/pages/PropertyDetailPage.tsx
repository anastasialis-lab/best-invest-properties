import { Link, useNavigate, useParams } from 'react-router-dom';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { StripedPlaceholder } from '@/components/StripedPlaceholder';
import { LISTINGS } from '@/data/listings';
import { FIN_ROWS, THUMBS } from '@/data/content';
import { color, font } from '@/styles/theme';

export function PropertyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const listing = LISTINGS.find((p) => p.id === id) ?? LISTINGS[0];

  return (
    <div>
      <SiteHeader active="properties" />
      <div style={{ padding: '22px 28px 0' }}>
        <button onClick={() => navigate(-1)} style={{ border: 0, background: 'transparent', fontSize: 12.5, color: color.textFaint, cursor: 'pointer', padding: '0 0 14px' }}>
          ← Back to results
        </button>
      </div>
      <div style={{ padding: '0 28px 34px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', alignItems: 'flex-end', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 13, letterSpacing: '.06em', color: color.textFaint }}>{listing.location}</div>
            <div style={{ fontFamily: font.display, fontSize: 42, color: color.navy, lineHeight: 1.1, fontVariantNumeric: 'tabular-nums' }}>{listing.price}</div>
            <div style={{ fontSize: 14, color: color.textMuted, marginTop: 4 }}>{listing.spec}</div>
          </div>
          <span style={{ fontSize: 9, letterSpacing: '.16em', fontWeight: 700, padding: '6px 11px', borderRadius: 4, background: color.navyDark, color: color.goldLight }}>
            {listing.tag}
          </span>
        </div>

        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'stretch' }}>
          <div style={{ flex: '2 1 420px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <StripedPlaceholder label="hero shot — exterior, golden hour, 3:2" height={330} radius={9} align="flex-end" />
            <div style={{ display: 'flex', gap: 10 }}>
              {THUMBS.map((t) => (
                <div key={t.label} style={{ flex: 1 }}>
                  <StripedPlaceholder label={t.label} height={76} radius={6} align="center" />
                </div>
              ))}
            </div>
          </div>

          <div style={{ flex: '1 1 280px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ background: color.navyDark, color: '#fff', borderRadius: 9, padding: '26px 22px', textAlign: 'center' }}>
              <div style={{ fontFamily: font.display, fontSize: 56, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
                {listing.score}
                <span style={{ fontSize: 22, color: color.railMuted }}> / 100</span>
              </div>
              <div style={{ fontSize: 9.5, letterSpacing: '.2em', color: color.railMuted, margin: '10px 0 12px' }}>INVESTMENT SCORE</div>
              <div style={{ display: 'inline-block', fontSize: 12.5, fontWeight: 600, color: color.navyDark, background: color.goldLight, padding: '6px 14px', borderRadius: 4 }}>
                {listing.verdict}
              </div>
            </div>
            <div style={{ background: '#fff', border: `1px solid ${color.border}`, borderRadius: 9, padding: 20 }}>
              <div style={{ fontFamily: font.display, fontSize: 19, color: color.navy, marginBottom: 14 }}>Financial Overview</div>
              {FIN_ROWS.map((r) => (
                <div key={r.k} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '9px 0', borderBottom: `1px solid ${color.borderSoft}`, fontSize: 13.5 }}>
                  <span style={{ color: color.textMuted }}>{r.k}</span>
                  <span style={{ fontWeight: 600, color: color.navy, fontVariantNumeric: 'tabular-nums' }}>{r.v}</span>
                </div>
              ))}
              <Link
                to={`/property/${listing.id}/analysis`}
                style={{ display: 'block', textAlign: 'center', width: '100%', marginTop: 18, border: 0, borderRadius: 6, padding: 13, background: color.gold, color: '#fff', fontSize: 13.5, fontWeight: 600 }}
              >
                Request Full Investment Analysis
              </Link>
              <Link
                to="/calculator"
                style={{ display: 'block', textAlign: 'center', width: '100%', marginTop: 8, border: `1px solid ${color.borderStrong}`, borderRadius: 6, padding: 12, background: 'transparent', color: color.navy, fontSize: 13, fontWeight: 500 }}
              >
                Open calculator
              </Link>
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
