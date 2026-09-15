import { useNavigate } from 'react-router-dom';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { HeroPhotoSlot } from '@/components/HeroPhotoSlot';
import { PILLARS } from '@/data/content';
import { color, font, shadow } from '@/styles/theme';

const STATS = [
  { value: '€120k – €600k', label: 'PRICE BAND WE COVER' },
  { value: '5.9% – 7.4%', label: 'GROSS YIELD RANGE' },
  { value: '8 criteria', label: 'BEHIND EVERY SCORE' },
];

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div>
      <SiteHeader active="properties" />

      <section style={{ position: 'relative', overflow: 'hidden', background: color.navyDark, color: '#fff' }}>
        <HeroPhotoSlot placeholder="DRAG A PROPERTY PHOTO ONTO THE HERO" />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(100deg, rgba(8,26,47,.92) 0%, rgba(8,26,47,.8) 38%, rgba(8,26,47,.34) 70%, rgba(8,26,47,.12) 100%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 120,
            background: 'linear-gradient(to bottom, rgba(8,26,47,0), rgba(8,26,47,.75))',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', padding: '70px 34px 78px', maxWidth: 700, pointerEvents: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <span style={{ width: 44, height: 1, background: color.goldLight, display: 'block' }} />
            <span style={{ fontSize: 10, letterSpacing: '.2em', color: color.goldLight }}>CYPRUS · SPAIN</span>
          </div>
          <h1
            style={{
              fontFamily: font.display,
              fontWeight: 300,
              fontSize: 56,
              lineHeight: 1.05,
              margin: '0 0 20px',
              textWrap: 'pretty',
              textShadow: '0 2px 24px rgba(4,14,26,.5)',
            }}
          >
            Best European Investment Properties —{' '}
            <em style={{ color: color.goldLight, fontStyle: 'italic' }}>Selected for Return</em>
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.62, color: '#D5DFEA', maxWidth: '48ch', margin: '0 0 30px' }}>
            Discover residential properties analysed for rental income, costs, risks and long-term potential.
          </p>
          <div style={{ display: 'flex', gap: 11, flexWrap: 'wrap', pointerEvents: 'auto' }}>
            <button
              onClick={() => navigate('/results')}
              style={{
                border: 0,
                borderRadius: 6,
                padding: '15px 28px',
                background: color.gold,
                color: '#fff',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: shadow.button,
              }}
            >
              Explore Investments
            </button>
            <button
              onClick={() => navigate('/search')}
              style={{
                border: '1px solid rgba(255,255,255,.4)',
                borderRadius: 6,
                padding: '15px 28px',
                background: 'rgba(255,255,255,.08)',
                color: '#fff',
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              Find My Investment
            </button>
          </div>
        </div>

        <div style={{ position: 'relative', display: 'flex', gap: 1, background: 'rgba(255,255,255,.14)', borderTop: '1px solid rgba(255,255,255,.14)', flexWrap: 'wrap', marginBottom: 34 }}>
          {STATS.map((s) => (
            <div
              key={s.label}
              style={{
                flex: '1 1 180px',
                minWidth: 0,
                background: 'rgba(8,26,47,.72)',
                padding: '18px 26px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                gap: 5,
                minHeight: 96,
              }}
            >
              <div style={{ fontFamily: font.display, fontSize: 24, lineHeight: 1.1, whiteSpace: 'nowrap' }}>{s.value}</div>
              <div style={{ fontSize: 10, letterSpacing: '.16em', color: '#9FB3C8' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          margin: '-26px 26px 0',
          position: 'relative',
          background: '#fff',
          border: `1px solid ${color.border}`,
          borderRadius: 10,
          boxShadow: shadow.hero,
          padding: '24px 26px',
        }}
      >
        <div style={{ fontFamily: font.display, fontSize: 19, color: color.navy, marginBottom: 18 }}>I want to invest in</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 16, alignItems: 'end' }}>
          <label style={{ display: 'block' }}>
            <span style={{ display: 'block', fontSize: 10, letterSpacing: '.14em', color: color.textFaint, marginBottom: 6 }}>COUNTRY</span>
            <select style={selectStyle}>
              <option>Spain</option>
              <option>Cyprus</option>
              <option>Greece</option>
              <option>Portugal</option>
            </select>
          </label>
          <label style={{ display: 'block' }}>
            <span style={{ display: 'block', fontSize: 10, letterSpacing: '.14em', color: color.textFaint, marginBottom: 6 }}>BUDGET</span>
            <select style={selectStyle}>
              <option>€100k – €200k</option>
              <option>€200k – €350k</option>
              <option>€350k – €500k+</option>
            </select>
          </label>
          <label style={{ display: 'block' }}>
            <span style={{ display: 'block', fontSize: 10, letterSpacing: '.14em', color: color.textFaint, marginBottom: 6 }}>MINIMUM GROSS YIELD</span>
            <select style={selectStyle}>
              <option>5%</option>
              <option>6%</option>
              <option>7%</option>
              <option>8%+</option>
            </select>
          </label>
          <label style={{ display: 'block' }}>
            <span style={{ display: 'block', fontSize: 10, letterSpacing: '.14em', color: color.textFaint, marginBottom: 6 }}>STRATEGY</span>
            <select style={selectStyle}>
              <option>Long-term rental</option>
              <option>Short-term rental</option>
              <option>Capital growth</option>
              <option>Mixed</option>
            </select>
          </label>
          <button
            onClick={() => navigate('/results')}
            style={{ border: 0, borderRadius: 6, padding: '12px 20px', background: color.navy, color: '#fff', fontSize: 13.5, fontWeight: 600, cursor: 'pointer', height: 41 }}
          >
            Show Investments
          </button>
        </div>
      </section>

      <section style={{ padding: '52px 26px 56px' }}>
        <h2 style={{ fontFamily: font.display, fontWeight: 400, fontSize: 30, color: color.navy, margin: '0 0 26px' }}>Why invest through us?</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(215px, 1fr))',
            gap: 1,
            background: color.border,
            border: `1px solid ${color.border}`,
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          {PILLARS.map((p) => (
            <div key={p.num} style={{ background: '#fff', padding: '26px 22px 28px' }}>
              <div style={{ fontFamily: font.display, fontSize: 13, letterSpacing: '.14em', color: color.gold, marginBottom: 12 }}>
                {p.num} — {p.title}
              </div>
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: color.textMuted }}>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

const selectStyle = {
  width: '100%',
  padding: '10px 11px',
  border: `1px solid ${color.borderStrong}`,
  borderRadius: 6,
  background: color.cardAlt,
  fontSize: 13.5,
} as const;
