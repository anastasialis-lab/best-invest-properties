import { Link, useNavigate } from 'react-router-dom';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { StripedPlaceholder } from '@/components/StripedPlaceholder';
import { LISTINGS } from '@/data/listings';
import { PROFILE, SAVED, ENQUIRIES } from '@/data/content';
import { color, font } from '@/styles/theme';

export function DashboardPage() {
  const navigate = useNavigate();
  const recommended = LISTINGS.slice(0, 3);

  return (
    <div>
      <SiteHeader active="properties" />
      <div style={{ padding: '30px 28px 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 18, flexWrap: 'wrap', alignItems: 'flex-end', marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 13, color: color.textFaint }}>Welcome back</div>
            <h1 style={{ fontFamily: font.display, fontWeight: 400, fontSize: 32, color: color.navy, margin: '3px 0 0' }}>Martin Kruger</h1>
          </div>
          <button
            onClick={() => navigate('/search')}
            style={{ border: 0, borderRadius: 6, padding: '11px 20px', background: color.gold, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
          >
            Refine my criteria
          </button>
        </div>

        <div style={{ background: '#fff', border: `1px solid ${color.border}`, borderRadius: 9, padding: 22, marginBottom: 24 }}>
          <div style={{ fontSize: 10, letterSpacing: '.16em', color: color.textFaint, marginBottom: 16 }}>YOUR INVESTMENT PROFILE</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 18 }}>
            {PROFILE.map((p) => (
              <div key={p.k}>
                <div style={{ fontSize: 12, color: color.textFaint, marginBottom: 4 }}>{p.k}</div>
                <div style={{ fontFamily: font.display, fontSize: 21, color: color.navy }}>{p.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 14, marginBottom: 14 }}>
          <h2 style={{ fontFamily: font.display, fontWeight: 400, fontSize: 24, color: color.navy, margin: 0 }}>Recommended for you</h2>
          <span style={{ fontSize: 12.5, color: color.textFaint }}>{recommended.length} properties</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 16, marginBottom: 30 }}>
          {recommended.map((p) => (
            <div key={p.id} style={{ background: '#fff', border: `1px solid ${color.border}`, borderRadius: 9, overflow: 'hidden' }}>
              <StripedPlaceholder height={120} />
              <div style={{ padding: '15px 16px 17px' }}>
                <div style={{ fontSize: 12, color: color.textFaint }}>{p.location}</div>
                <div style={{ fontFamily: font.display, fontSize: 23, color: color.navy, fontVariantNumeric: 'tabular-nums' }}>{p.price}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 12.5, color: color.textMuted, fontVariantNumeric: 'tabular-nums' }}>
                  <span>{p.gross} gross</span>
                  <span style={{ fontWeight: 600, color: color.gold }}>{p.score}/100</span>
                </div>
                <Link
                  to={`/property/${p.id}`}
                  style={{ display: 'block', textAlign: 'center', width: '100%', marginTop: 13, border: `1px solid ${color.borderStrong}`, borderRadius: 6, padding: 10, background: 'transparent', fontSize: 12.5, fontWeight: 500, color: color.navy }}
                >
                  View Investment
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 280px', minWidth: 0, background: '#fff', border: `1px solid ${color.border}`, borderRadius: 9, padding: 20 }}>
            <div style={{ fontFamily: font.display, fontSize: 20, color: color.navy, marginBottom: 14 }}>Saved Investments</div>
            {SAVED.map((s) => (
              <div key={s.name} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '11px 0', borderBottom: `1px solid ${color.borderSoft}`, fontSize: 13.5 }}>
                <span style={{ color: color.navy }}>{s.name}</span>
                <span style={{ color: color.textFaint, fontVariantNumeric: 'tabular-nums' }}>{s.meta}</span>
              </div>
            ))}
          </div>
          <div style={{ flex: '1 1 280px', minWidth: 0, background: '#fff', border: `1px solid ${color.border}`, borderRadius: 9, padding: 20 }}>
            <div style={{ fontFamily: font.display, fontSize: 20, color: color.navy, marginBottom: 14 }}>My Enquiries</div>
            {ENQUIRIES.map((e) => (
              <div key={e.name} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '11px 0', borderBottom: `1px solid ${color.borderSoft}`, fontSize: 13.5, alignItems: 'center' }}>
                <span style={{ color: color.navy }}>{e.name}</span>
                <span style={{ fontSize: 11.5, padding: '4px 9px', borderRadius: 4, background: color.panelAlt, color: color.draftText }}>{e.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
