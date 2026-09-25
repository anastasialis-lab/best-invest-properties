import { useNavigate } from 'react-router-dom';
import heroImage from '@/assets/hero.jpg';
import euMark from '@/assets/eu-mark.svg';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { Button } from '@/components/Button';
import { Eyebrow, fieldStyle, FieldLabel } from '@/components/Surface';
import { color, line } from '@/styles/theme';
import { useIsMobile } from '@/hooks/useIsMobile';

const VALUE_PROPS = [
  'Completely free of charge, no commissions',
  'Best income for your budget',
  'Save time: only top profit properties are presented',
  'No need to visit multiple real estate pages',
];

const HIW_STEPS = [
  { num: '01', body: 'You select your budget, expectations and other details.' },
  { num: '02', body: 'We search immediately through the property database, analyse, calculate and select the most profitable properties.' },
  { num: '03', body: 'You see the top 5 opportunities for you, with financial details.' },
  { num: '04', body: 'If you found your investment, you leave your contact details so we can connect you with the developer or owner.' },
  { num: '05', body: 'If you prefer to wait for better opportunities, you can set an alert and receive it as soon as available.' },
];

const PILLARS = [
  { num: '01', title: 'Save your time', lines: ["You don't need to search multiple property pages.", 'We bring properties from other web sources here at one place.'] },
  { num: '02', title: 'Save your money', lines: ["The prices are the same as at the developers' portals.", 'No commission for you.'] },
  { num: '03', title: 'Transparent', lines: ['We show you the profit, but also the expenses and risks.', 'Full information, no hiding, no advertising.'] },
  { num: '04', title: 'Independent', lines: ["We don't have sponsored results.", "We show both developers' data and our own independent calculation, so you will get objective scoring results."] },
];

const GOLD_CIRCLE = 'linear-gradient(180deg,#F8E4A6 0%,#E3BC63 52%,#C9982F 100%)';

export function LandingPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const heroPad = isMobile ? '34px 22px 44px' : '70px 44px 92px';
  const secPad = isMobile ? '46px 22px 56px' : '64px 44px 88px';
  const h2Size = isMobile ? 25 : 'clamp(26px,3vw,38px)';

  return (
    <div>
      <section style={{ position: 'relative', background: '#123A50', color: '#fff', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: '62% 48%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg,rgba(4,58,74,.34) 0%,rgba(12,124,147,.18) 42%,rgba(45,190,208,.1) 74%,rgba(255,255,255,.05) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,rgba(4,48,62,.42) 0%,rgba(4,48,62,.04) 18%,rgba(4,48,62,0) 55%,rgba(4,48,62,.16) 100%)' }} />

        <div style={{ position: 'relative' }}>
          <SiteHeader onDark />
        </div>

        <div style={{ position: 'relative', padding: heroPad, display: 'flex', gap: 26, flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'stretch' }}>
          <div
            style={{
              flex: '1 1 440px',
              minWidth: 0,
              maxWidth: isMobile ? '100%' : 760,
              background: 'rgba(5,56,72,.44)',
              backdropFilter: 'blur(3px)',
              borderRadius: 20,
              padding: '26px 28px 28px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <h1
              style={{
                fontWeight: 700,
                fontSize: isMobile ? 31 : 'clamp(34px,4.4vw,54px)',
                lineHeight: 0.98,
                letterSpacing: '-.018em',
                textTransform: 'uppercase',
                margin: 0,
                textWrap: 'balance',
                textShadow: '0 2px 30px rgba(4,14,26,.4)',
              }}
            >
              <span style={{ color: color.gold }}>Best</span> Investment Properties
              <br />
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.28em' }}>
                in Europe
                <img src={euMark} alt="" style={{ width: '.95em', height: '.95em', display: 'block', flex: 'none' }} />
              </span>
            </h1>
            <div
              style={{
                fontWeight: 500,
                fontSize: isMobile ? 18 : 'clamp(19px,1.8vw,24px)',
                lineHeight: 1.3,
                color: color.gold,
                marginTop: 16,
                textShadow: '0 2px 30px rgba(4,14,26,.4)',
                letterSpacing: '.14em',
                textTransform: 'uppercase',
              }}
            >
              selected for highest return
            </div>
            <p style={{ fontSize: 16.5, lineHeight: 1.6, color: color.ground, margin: '18px 0 0', maxWidth: '48ch' }}>
              Residential properties analysed for rental income, running costs, risk and long-term potential — before it reaches you.
            </p>
          </div>

          <div
            style={{
              flex: isMobile ? '1 1 100%' : '1 1 300px',
              maxWidth: isMobile ? 'none' : 420,
              minWidth: 0,
              alignSelf: 'stretch',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 22,
              background: 'rgba(5,56,72,.38)',
              backdropFilter: 'blur(3px)',
              borderRadius: 16,
              padding: '26px 28px',
            }}
          >
            {VALUE_PROPS.map((label) => (
              <div key={label} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <img src={euMark} alt="" style={{ flex: 'none', width: 34, height: 34, display: 'block' }} />
                <span style={{ fontSize: 21, fontWeight: 500, lineHeight: 1.35, color: color.panel, textShadow: '0 1px 16px rgba(4,14,26,.5)' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            position: 'relative',
            padding: isMobile ? '20px 22px 46px' : '24px 44px 72px',
            display: 'flex',
            gap: 26,
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(5,56,72,.4)',
            backdropFilter: 'blur(3px)',
            borderTop: '1px solid rgba(255,255,255,.18)',
          }}
        >
          <div style={{ display: 'flex', gap: 11, flexWrap: 'wrap' }}>
            <Button tone="onDark" onClick={() => navigate('/browse')} style={{ padding: '16px 30px', fontSize: 13.5 }}>
              EXPLORE INVESTMENTS
            </Button>
            <Button tone="onDarkGhost" onClick={() => navigate('/browse')} style={{ padding: '16px 26px', fontSize: 13.5 }}>
              FIND MY INVESTMENT
            </Button>
          </div>
        </div>
      </section>

      <section
        style={{
          margin: isMobile ? '-20px 16px 0' : '-34px 44px 0',
          position: 'relative',
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 20px 50px rgba(23,75,103,.2)',
          padding: isMobile ? '22px 20px 24px' : '30px 32px 32px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, flexWrap: 'wrap', marginBottom: 22 }}>
          <div style={{ fontWeight: 600, letterSpacing: '-.006em', fontSize: 22, color: color.link }}>I want to invest in</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(178px,1fr))', gap: 18, alignItems: 'end' }}>
          <label style={{ display: 'block' }}>
            <FieldLabel>COUNTRY</FieldLabel>
            <select style={fieldStyle}>
              <option>Cyprus</option>
              <option>Spain</option>
              <option disabled>Croatia — Coming Soon</option>
              <option disabled>Montenegro — Coming Soon</option>
              <option disabled>Portugal — Coming Soon</option>
              <option disabled>Greece — Coming Soon</option>
            </select>
          </label>
          <label style={{ display: 'block' }}>
            <FieldLabel>BUDGET</FieldLabel>
            <select style={fieldStyle}>
              <option>€100k – €200k</option>
              <option>€200k – €300k</option>
              <option>€300k – €400k</option>
              <option>€400k – €500k</option>
              <option>€500k – €600k</option>
              <option>€600k+</option>
            </select>
          </label>
          <label style={{ display: 'block' }}>
            <FieldLabel>MINIMUM GROSS YIELD</FieldLabel>
            <select style={fieldStyle}>
              <option>5%</option>
              <option>6%</option>
              <option>7%</option>
              <option>8%+</option>
            </select>
          </label>
          <label style={{ display: 'block' }}>
            <FieldLabel>STRATEGY</FieldLabel>
            <select style={fieldStyle}>
              <option>Long-term rental</option>
              <option>Short-term rental</option>
              <option>Mixed with private use</option>
              <option>Capital growth</option>
            </select>
          </label>
          <Button onClick={() => navigate('/browse')} style={{ height: 46, padding: '0 26px', fontSize: 13.5 }}>
            SHOW INVESTMENTS
          </Button>
        </div>
      </section>

      <section id="howitworks" style={{ padding: secPad, display: 'flex', flexWrap: 'wrap', gap: '24px 56px', alignItems: 'flex-start' }}>
        <div style={{ flex: '1 1 260px', minWidth: 0, maxWidth: 380 }}>
          <Eyebrow>FIVE STEPS</Eyebrow>
          <h2 style={{ fontWeight: 700, fontSize: h2Size, lineHeight: 1.04, letterSpacing: '-.01em', textTransform: 'uppercase', color: color.link, margin: 0 }}>How it works</h2>
        </div>
        <div style={{ flex: '3 1 480px', minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
          {HIW_STEPS.map((s, i) => (
            <div key={s.num} style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
              <div
                style={{
                  background: '#fff',
                  border: `1px solid ${line(0.07)}`,
                  borderRadius: 16,
                  boxShadow: '0 12px 34px rgba(23,75,103,.07)',
                  padding: '14px 20px',
                  display: 'flex',
                  gap: 18,
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    flex: 'none',
                    width: 42,
                    height: 42,
                    borderRadius: '50%',
                    background: GOLD_CIRCLE,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: 18,
                    color: color.link,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {s.num}
                </span>
                <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.6, color: color.body, textWrap: 'pretty' }}>{s.body}</p>
              </div>
              {i < HIW_STEPS.length - 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 42, marginLeft: 21, padding: '2px 0' }}>
                  <span style={{ width: 2, height: 10, background: color.gold, display: 'block' }} />
                  <span style={{ width: 0, height: 0, borderLeft: '7px solid transparent', borderRight: '7px solid transparent', borderTop: `9px solid ${color.gold}`, display: 'block' }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section id="method" style={{ padding: secPad }}>
        <Eyebrow>OUR METHOD</Eyebrow>
        <h2 style={{ fontWeight: 700, fontSize: h2Size, lineHeight: 1.04, letterSpacing: '-.01em', textTransform: 'uppercase', color: color.link, margin: '0 0 10px' }}>
          Why invest
          <br />
          through us?
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,minmax(0,1fr))', gap: 18 }}>
          {PILLARS.map((p) => (
            <div
              key={p.num}
              style={{
                background: '#fff',
                border: `1px solid ${line(0.07)}`,
                borderRadius: 16,
                boxShadow: '0 12px 34px rgba(23,75,103,.07)',
                padding: '28px 26px 30px',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                height: '100%',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                <span style={{ fontWeight: 700, fontSize: 21, lineHeight: 1.15, color: color.action, fontVariantNumeric: 'tabular-nums' }}>{p.num}</span>
                <span style={{ fontWeight: 600, letterSpacing: '-.006em', fontSize: 21, lineHeight: 1.15, color: color.link }}>{p.title}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {p.lines.map((l) => (
                  <p key={l} style={{ margin: 0, fontSize: 16.5, lineHeight: 1.65, color: color.body }}>
                    {l}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
