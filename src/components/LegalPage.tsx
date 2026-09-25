import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { color, line, font } from '@/styles/theme';
import { useIsMobile } from '@/hooks/useIsMobile';
import type { LegalSection } from '@/data/listings';

interface LegalPageProps {
  active: 'privacy' | 'terms';
  title: string;
  lead: string;
  meta: { k: string; v: string }[];
  idPrefix: string;
  sections: LegalSection[];
  footerLeft: React.ReactNode;
  footerLink: { to: string; label: string };
}

export function LegalPage({ active, title, lead, meta, idPrefix, sections, footerLeft, footerLink }: LegalPageProps) {
  const isMobile = useIsMobile();

  return (
    <div>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: isMobile ? 14 : 26,
          flexWrap: 'wrap',
          padding: isMobile ? '12px 18px' : '14px 26px',
          borderBottom: `1px solid ${line(0.1)}`,
          background: '#fff',
        }}
      >
        <Link to="/">
          <Logo />
        </Link>
        <nav style={{ display: 'flex', gap: isMobile ? 14 : 26, alignItems: 'center', flexWrap: 'wrap', fontSize: isMobile ? 14 : 15.5, color: color.body }}>
          <Link to="/">Home</Link>
          <Link to="/privacy" style={active === 'privacy' ? { color: color.action } : undefined}>
            Privacy Policy
          </Link>
          <Link to="/terms" style={active === 'terms' ? { color: color.action } : undefined}>
            Terms of Use
          </Link>
        </nav>
      </header>

      <div style={{ padding: isMobile ? '24px 18px 18px' : '40px 34px 20px', borderBottom: `1px solid ${line(0.1)}` }}>
        <div style={{ fontSize: 12, letterSpacing: '.2em', color: color.action, marginBottom: 10 }}>LEGAL</div>
        <h1 style={{ fontWeight: 600, fontSize: isMobile ? 30 : 44, lineHeight: 1.05, color: color.link, margin: '0 0 12px', textWrap: 'pretty' }}>{title}</h1>
        <div style={{ display: 'flex', gap: isMobile ? 18 : 34, flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <p style={{ fontSize: isMobile ? 14 : 15, lineHeight: 1.6, color: color.body, maxWidth: '56ch', margin: 0 }}>{lead}</p>
          <div style={{ display: 'flex', gap: 26, flexWrap: 'wrap', fontSize: 13, letterSpacing: '.08em', color: color.faint }}>
            {meta.map((m) => (
              <span key={m.k}>
                {m.k}
                <br />
                <span style={{ color: color.link, fontSize: 15.5, letterSpacing: '.02em' }}>{m.v}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'minmax(0,1fr)' : 'minmax(150px,230px) minmax(0,1fr)', alignItems: 'stretch' }}>
        <div
          style={{
            minWidth: 0,
            borderRight: isMobile ? 0 : `1px solid ${line(0.1)}`,
            borderBottom: isMobile ? `1px solid ${line(0.1)}` : 0,
            background: color.ground,
            padding: isMobile ? '18px 18px 20px' : '30px 20px 40px',
          }}
        >
          <div style={{ position: isMobile ? 'static' : 'sticky', top: 76 }}>
            <div style={{ fontSize: 12, letterSpacing: '.16em', color: color.faint, marginBottom: 12 }}>ON THIS PAGE</div>
            <nav
              style={{
                display: 'flex',
                flexDirection: isMobile ? 'row' : 'column',
                flexWrap: isMobile ? 'nowrap' : 'wrap',
                overflowX: isMobile ? 'auto' : 'visible',
                gap: isMobile ? 7 : 2,
                paddingBottom: isMobile ? 4 : 0,
              }}
              className="bip-scroll"
            >
              {sections.map((s) => (
                <a
                  key={s.num}
                  href={`#${idPrefix}-${s.num}`}
                  style={{
                    display: 'flex',
                    gap: 9,
                    flex: isMobile ? 'none' : '0 1 auto',
                    whiteSpace: isMobile ? 'nowrap' : 'normal',
                    fontSize: 15.5,
                    lineHeight: 1.45,
                    color: color.body,
                    padding: isMobile ? '8px 11px' : '6px 0',
                    border: isMobile ? `1px solid ${line(0.14)}` : 0,
                    borderRadius: 10,
                    background: isMobile ? '#fff' : 'transparent',
                    textDecoration: 'none',
                  }}
                >
                  <span style={{ fontFamily: font.mono, fontSize: 12, color: color.action, flex: 'none', paddingTop: 2 }}>{s.num}</span>
                  {s.title}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div style={{ minWidth: 0, padding: isMobile ? '24px 18px 40px' : '34px 34px 52px', background: '#fff' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
            {sections.map((s) => (
              <section
                key={s.num}
                id={`${idPrefix}-${s.num}`}
                style={{ display: 'grid', gridTemplateColumns: isMobile ? 'minmax(0,1fr)' : '34px minmax(0,1fr)', gap: '4px 16px', paddingBottom: 28, borderBottom: `1px solid ${line(0.08)}` }}
              >
                <div style={{ fontWeight: 600, fontSize: 16.5, color: color.action, paddingTop: 6 }}>{s.num}</div>
                <h2 style={{ fontWeight: 600, letterSpacing: '-.006em', fontSize: 23, color: color.link, margin: 0 }}>{s.title}</h2>
                {!isMobile && <div />}
                <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.75, color: color.body, maxWidth: '74ch', textWrap: 'pretty' }}>{s.body}</p>
              </section>
            ))}
          </div>

          <div style={{ marginTop: 34, display: 'flex', gap: 26, flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', fontSize: 15.5, lineHeight: 1.7, color: color.body }}>
            <span>{footerLeft}</span>
            <Link to={footerLink.to}>{footerLink.label}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
