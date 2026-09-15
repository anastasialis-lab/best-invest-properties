import { Link } from 'react-router-dom';
import { SiteFooter } from '@/components/SiteFooter';
import { Logo } from '@/components/Logo';
import { color, font } from '@/styles/theme';
import { DEV_VALUE, DEV_STEPS, DEV_REQ } from '@/data/content';

export function ForDevelopersPage() {
  return (
    <div>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18, flexWrap: 'wrap', padding: '14px 26px', borderBottom: `1px solid ${color.divider}`, background: '#fff' }}>
        <Link to="/">
          <Logo />
        </Link>
        <nav style={{ display: 'flex', gap: 22, alignItems: 'center', flexWrap: 'wrap', fontSize: 13, color: color.textMuted }}>
          <Link to="/results">Investment Properties</Link>
          <a href="#">How It Works</a>
          <span style={{ color: color.gold }}>For Developers</span>
          <Link to="/login">Login</Link>
          <Link to="/developers/apply" style={{ border: 0, borderRadius: 5, padding: '9px 16px', background: color.devDark, color: '#fff', fontSize: 12.5, fontWeight: 600 }}>
            List a Project
          </Link>
        </nav>
      </header>

      <section style={{ display: 'flex', flexWrap: 'wrap', gap: 34, padding: '46px 34px 44px', background: color.devDark, color: color.devLight, alignItems: 'center' }}>
        <div style={{ flex: '1 1 380px', minWidth: 0 }}>
          <div style={{ fontSize: 10, letterSpacing: '.2em', color: color.goldLight, marginBottom: 14 }}>FOR DEVELOPERS &amp; SELLING AGENTS</div>
          <h1 style={{ fontFamily: font.display, fontWeight: 300, fontSize: 44, lineHeight: 1.1, margin: '0 0 18px', textWrap: 'pretty' }}>
            Reach buyers who are already looking for a <em style={{ color: color.goldLight, fontStyle: 'italic' }}>return</em>
          </h1>
          <p style={{ fontSize: 15.5, lineHeight: 1.6, color: color.devPale, maxWidth: '52ch', margin: '0 0 26px' }}>
            Every investor on the platform has told us their budget, target yield and strategy. We match your project against those criteria instead of pushing it to a general audience.
          </p>
          <div style={{ display: 'flex', gap: 11, flexWrap: 'wrap' }}>
            <Link to="/developers/apply" style={{ border: 0, borderRadius: 6, padding: '14px 26px', background: color.goldLight, color: color.devDark, fontSize: 14, fontWeight: 600 }}>
              Apply for an Account
            </Link>
            <Link to="/developer-portal" style={{ border: '1px solid rgba(255,255,255,.3)', borderRadius: 6, padding: '14px 26px', background: 'transparent', color: color.devLight, fontSize: 14, fontWeight: 500 }}>
              See the Developer Portal
            </Link>
          </div>
        </div>
        <div style={{ flex: '1 1 300px', minWidth: 0, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.14)', borderRadius: 9, padding: '24px 26px' }}>
          <div style={{ fontSize: 9.5, letterSpacing: '.16em', color: color.goldLight, marginBottom: 16 }}>PLATFORM AT A GLANCE</div>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <div style={{ fontFamily: font.display, fontSize: 30, lineHeight: 1 }}>2 markets</div>
              <div style={{ fontSize: 12.5, color: color.devPale }}>Cyprus and Spain, residential only</div>
            </div>
            <div>
              <div style={{ fontFamily: font.display, fontSize: 30, lineHeight: 1 }}>€120k – €600k</div>
              <div style={{ fontSize: 12.5, color: color.devPale }}>Price band we list</div>
            </div>
            <div>
              <div style={{ fontFamily: font.display, fontSize: 30, lineHeight: 1 }}>48 hours</div>
              <div style={{ fontSize: 12.5, color: color.devPale }}>Expected response time to enquiries</div>
            </div>
          </div>
          <p style={{ fontSize: 11, lineHeight: 1.55, color: color.devFaded, margin: '18px 0 0' }}>Figures are placeholders for the prototype.</p>
        </div>
      </section>

      <section style={{ padding: '48px 26px 12px' }}>
        <h2 style={{ fontFamily: font.display, fontWeight: 400, fontSize: 30, color: color.navy, margin: '0 0 24px' }}>What listing with us gives you</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 1, background: color.border, border: `1px solid ${color.border}`, borderRadius: 8, overflow: 'hidden' }}>
          {DEV_VALUE.map((v) => (
            <div key={v.num} style={{ background: '#fff', padding: '26px 22px 28px' }}>
              <div style={{ fontFamily: font.display, fontSize: 13, letterSpacing: '.14em', color: color.devDark, marginBottom: 12 }}>
                {v.num} — {v.title}
              </div>
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: color.textMuted }}>{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '40px 26px 12px' }}>
        <h2 style={{ fontFamily: font.display, fontWeight: 400, fontSize: 30, color: color.navy, margin: '0 0 6px' }}>How it works</h2>
        <p style={{ fontSize: 13.5, color: color.textFaint, margin: '0 0 24px' }}>From application to a live listing, typically three to four weeks.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(215px, 1fr))', gap: 18 }}>
          {DEV_STEPS.map((s) => (
            <div key={s.num} style={{ background: color.devBg, border: `1px solid ${color.devBorder}`, borderRadius: 8, padding: '22px 20px' }}>
              <div style={{ fontFamily: font.display, fontSize: 26, color: color.devDark, lineHeight: 1, marginBottom: 10 }}>{s.num}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: color.devDark, marginBottom: 8 }}>{s.title}</div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: color.devText }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '40px 26px 48px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 26, background: '#fff', border: `1px solid ${color.border}`, borderRadius: 9, padding: '28px 26px' }}>
          <div style={{ flex: '1 1 300px', minWidth: 0 }}>
            <h2 style={{ fontFamily: font.display, fontWeight: 400, fontSize: 26, color: color.navy, margin: '0 0 10px' }}>What we need before a project goes live</h2>
            <p style={{ fontSize: 13.5, lineHeight: 1.6, color: color.textMuted, margin: 0, maxWidth: '46ch' }}>
              We verify each item. Projects that cannot meet them are not listed, which is what makes the listings worth something to investors.
            </p>
          </div>
          <div style={{ flex: '1 1 280px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
            {DEV_REQ.map((r) => (
              <div key={r} style={{ display: 'flex', gap: 10, alignItems: 'baseline', fontSize: 13.5, color: color.textMuted, lineHeight: 1.5 }}>
                <span style={{ color: color.devDark, flexShrink: 0 }}>✓</span>
                {r}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '34px 26px 44px', background: color.navyDark, color: '#fff', display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: font.display, fontSize: 26, marginBottom: 6 }}>Ready to submit a project?</div>
          <p style={{ margin: 0, fontSize: 13.5, color: '#C3D0DE', maxWidth: '52ch' }}>
            Send us the company details and one project. We will come back with an indicative score before anything is published.
          </p>
        </div>
        <Link to="/developers/apply" style={{ border: 0, borderRadius: 6, padding: '14px 26px', background: color.gold, color: '#fff', fontSize: 14, fontWeight: 600 }}>
          Start an application
        </Link>
      </section>

      <SiteFooter />
    </div>
  );
}
