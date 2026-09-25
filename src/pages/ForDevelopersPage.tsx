import { Link, useNavigate } from 'react-router-dom';
import { SiteFooter } from '@/components/SiteFooter';
import { Logo } from '@/components/Logo';
import { color, line } from '@/styles/theme';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useAppStore } from '@/state/store';

const DEV_VALUE = [
  { num: '01', title: 'Investor-ready audience', body: 'Our registered users state a budget, a target yield and a strategy before they see a single listing. Enquiries arrive already filtered against your price and completion date.' },
  { num: '02', title: 'Analysis, not advertising', body: 'Your project is presented with an independent investment score. Buyers see the reasoning, which shortens the questions that usually come later in the sales cycle.' },
  { num: '03', title: 'Two markets, one channel', body: 'Cyprus and Spain, with residential stock between €120k and €600k. We do not list every project, so listings carry weight.' },
  { num: '04', title: 'Your material stays yours', body: 'Renders, plans and specifications are published as developer information and labelled as such, separate from our own figures.' },
];

const DEV_STEPS = [
  { num: '01', title: 'Apply', body: 'Send us company details, licence number and two completed references. We verify before any project goes live.' },
  { num: '02', title: 'Submit a project', body: 'Upload units, pricing, completion schedule, rental expectations and media through the developer portal.' },
  { num: '03', title: 'We analyse alongside your figures', body: 'We calculate the total comprehensive cost of ownership and model rent, running costs and risk. Our assessment is published in addition to your own data, not instead of it — investors see both, side by side, and you see the result before publication.' },
  { num: '04', title: 'Go live and publish', body: 'Your name and contact details are not visible to investors at launch. An investor signs up, requests a connection to the project, and we approve and make the introduction. You receive qualified, verified enquiries; the portal shows views, saves and enquiries per unit.' },
];

export const DEV_REQ = [
  'Valid developer licence in Cyprus or Spain',
  'Building permit issued for the project',
  'Escrow or bank guarantee for off-plan payments',
  'Unit-level pricing and floor plans',
  'Realistic completion schedule with milestones',
  'A named contact who answers enquiries within 48 hours',
];

export function ForDevelopersPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { navOpen, setNavOpen } = useAppStore();

  return (
    <div>
      <header style={{ padding: isMobile ? '12px 18px' : '13px 26px', borderBottom: `1px solid ${line(0.1)}`, background: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18 }}>
          <Link to="/">
            <Logo markHeight={48} wordSize={27} ruleSize={10} />
          </Link>
          {!isMobile ? (
            <nav style={{ display: 'flex', gap: 22, alignItems: 'center', flexWrap: 'wrap', fontSize: 15.5, color: color.dim2 }}>
              <Link to="/browse">Investment Properties</Link>
              <Link to="/#howitworks">How It Works</Link>
              <span style={{ color: color.action }}>For Developers</span>
              <Link to="/login">Login</Link>
              <Link to="/developers/apply" style={{ border: 0, borderRadius: 40, padding: '9px 16px', background: color.ink, color: '#fff', fontSize: 15.5, fontWeight: 600 }}>
                List a Project
              </Link>
            </nav>
          ) : (
            <button onClick={() => setNavOpen(!navOpen)} aria-label="Menu" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4, width: 44, height: 44, alignItems: 'flex-end', border: 0, background: 'transparent', cursor: 'pointer', padding: 0 }}>
              <span style={{ width: 22, height: 1.5, background: color.ink, display: 'block' }} />
              <span style={{ width: 22, height: 1.5, background: color.ink, display: 'block' }} />
              <span style={{ width: 14, height: 1.5, background: color.ink, display: 'block' }} />
            </button>
          )}
        </div>
        {isMobile && navOpen && (
          <nav style={{ display: 'flex', flexDirection: 'column', marginTop: 12, paddingTop: 6, borderTop: `1px solid ${line(0.1)}`, fontSize: 15.5 }}>
            <Link to="/browse" onClick={() => setNavOpen(false)} style={{ padding: '13px 2px', borderBottom: `1px solid ${line(0.07)}`, color: color.ink }}>
              Investment Properties
            </Link>
            <Link to="/#howitworks" onClick={() => setNavOpen(false)} style={{ padding: '13px 2px', borderBottom: `1px solid ${line(0.07)}`, color: color.ink }}>
              How It Works
            </Link>
            <span style={{ padding: '13px 2px', borderBottom: `1px solid ${line(0.07)}`, color: color.action }}>For Developers</span>
            <Link to="/login" onClick={() => setNavOpen(false)} style={{ padding: '13px 2px', color: color.ink }}>
              Login
            </Link>
            <button onClick={() => { setNavOpen(false); navigate('/developers/apply'); }} style={{ marginTop: 10, border: 0, borderRadius: 40, padding: 15, background: color.ink, color: '#fff', fontSize: 16.5, fontWeight: 600, cursor: 'pointer' }}>
              List a Project
            </button>
          </nav>
        )}
      </header>

      <section style={{ display: 'flex', flexWrap: 'wrap', gap: 34, padding: isMobile ? '34px 22px 36px' : '46px 34px 44px', background: color.ink, color: color.sky, alignItems: 'center' }}>
        <div style={{ flex: '1 1 380px', minWidth: 0 }}>
          <div style={{ fontSize: 12, letterSpacing: '.2em', color: color.gold, marginBottom: 14 }}>FOR DEVELOPERS &amp; SELLING AGENTS</div>
          <h1 style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-.012em', fontSize: isMobile ? 32 : 44, lineHeight: 1.1, margin: '0 0 18px', textWrap: 'pretty' }}>
            Reach buyers who are already looking for a <em style={{ color: color.gold, fontStyle: 'italic' }}>return</em>
          </h1>
          <p style={{ fontSize: 16.5, lineHeight: 1.6, color: color.edge, maxWidth: '52ch', margin: '0 0 26px' }}>
            Every investor on the platform has told us their budget, target yield and strategy. We match your project against those criteria instead of pushing it to a general audience.
          </p>
          <div style={{ display: 'flex', gap: 11, flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/developers/apply')} style={{ border: 0, borderRadius: 40, padding: '14px 26px', background: color.gold, color: color.ink, fontSize: 16.5, fontWeight: 600, cursor: 'pointer' }}>
              Apply for an Account
            </button>
            <button onClick={() => navigate('/developer-portal')} style={{ border: '1px solid rgba(255,255,255,.3)', borderRadius: 40, padding: '14px 26px', background: 'transparent', color: color.sky, fontSize: 16.5, fontWeight: 500, cursor: 'pointer' }}>
              See the Developer Portal
            </button>
          </div>
        </div>
        <div style={{ flex: '1 1 300px', minWidth: 0, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.14)', borderRadius: 16, padding: '24px 26px' }}>
          <div style={{ fontSize: 11.5, letterSpacing: '.16em', color: color.gold, marginBottom: 16 }}>PLATFORM AT A GLANCE</div>
          <div style={{ display: 'grid', gap: 16 }}>
            {[
              { v: '2 markets', s: 'Cyprus and Spain, residential only' },
              { v: '€120k – €600k', s: 'Price band we list' },
              { v: '48 hours', s: 'Expected response time to enquiries' },
            ].map((x) => (
              <div key={x.v}>
                <div style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-.012em', fontSize: 30, lineHeight: 1 }}>{x.v}</div>
                <div style={{ fontSize: 15.5, color: color.edge }}>{x.s}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.55, color: '#93AB9C', margin: '18px 0 0' }}>Figures are placeholders for the prototype.</p>
        </div>
      </section>

      <section style={{ padding: '48px 26px 12px' }}>
        <h2 style={{ fontWeight: 700, fontSize: 30, textTransform: 'uppercase', letterSpacing: '-.012em', color: color.ink, margin: '0 0 24px' }}>What listing with us gives you</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: 1, background: line(0.12), border: `1px solid ${line(0.07)}`, borderRadius: 12, boxShadow: '0 12px 34px rgba(23,75,103,.07)', overflow: 'hidden' }}>
          {DEV_VALUE.map((v) => (
            <div key={v.num} style={{ background: '#fff', padding: '26px 22px 28px' }}>
              <div style={{ fontWeight: 600, fontSize: 15.5, letterSpacing: '.14em', color: color.ink, marginBottom: 12 }}>
                {v.num} — {v.title}
              </div>
              <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.6, color: color.dim2 }}>{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '40px 26px 12px' }}>
        <h2 style={{ fontWeight: 700, fontSize: 30, textTransform: 'uppercase', letterSpacing: '-.012em', color: color.ink, margin: '0 0 6px' }}>How it works</h2>
        <p style={{ fontSize: 16.5, color: color.muted, margin: '0 0 24px' }}>From application to a live listing, typically three to four weeks.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(215px,1fr))', gap: 18 }}>
          {DEV_STEPS.map((s) => (
            <div key={s.num} style={{ background: color.panelBlue, border: '1px solid rgba(32,90,135,.08)', borderRadius: 12, boxShadow: '0 12px 34px rgba(23,75,103,.07)', padding: '22px 20px' }}>
              <div style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-.012em', fontSize: 26, color: color.ink, lineHeight: 1, marginBottom: 10 }}>{s.num}</div>
              <div style={{ fontSize: 16.5, fontWeight: 600, color: color.ink, marginBottom: 8 }}>{s.title}</div>
              <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: color.body }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '40px 26px 48px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 26, background: '#fff', border: `1px solid ${line(0.07)}`, borderRadius: 16, boxShadow: '0 12px 34px rgba(23,75,103,.07)', padding: '28px 26px' }}>
          <div style={{ flex: '1 1 300px', minWidth: 0 }}>
            <h2 style={{ fontWeight: 700, fontSize: 26, textTransform: 'uppercase', letterSpacing: '-.012em', color: color.ink, margin: '0 0 10px' }}>What we need before a project goes live</h2>
            <p style={{ fontSize: 16.5, lineHeight: 1.6, color: color.dim2, margin: 0, maxWidth: '46ch' }}>
              We verify each item. Projects that cannot meet them are not listed, which is what makes the listings worth something to investors.
            </p>
          </div>
          <div style={{ flex: '1 1 280px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
            {DEV_REQ.map((r) => (
              <div key={r} style={{ display: 'flex', gap: 10, alignItems: 'baseline', fontSize: 16.5, color: color.dim2, lineHeight: 1.5 }}>
                <span style={{ color: color.ink, flex: 'none' }}>✓</span>
                {r}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '34px 26px 44px', background: '#16304A', color: '#fff', display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-.012em', fontSize: 26, marginBottom: 6 }}>Ready to submit a project?</div>
          <p style={{ margin: 0, fontSize: 16.5, color: '#CBDFED', maxWidth: '52ch' }}>
            Send us the company details and one project. We will come back with an indicative score before anything is published.
          </p>
        </div>
        <button onClick={() => navigate('/developers/apply')} style={{ border: 0, borderRadius: 40, padding: '14px 26px', background: color.gold, color: color.ink, fontSize: 16.5, fontWeight: 600, cursor: 'pointer' }}>
          Start an application
        </button>
      </section>

      <SiteFooter />
    </div>
  );
}
