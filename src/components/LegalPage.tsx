import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { color, font } from '@/styles/theme';
import type { LegalSection } from '@/data/listings';

interface LegalPageProps {
  active: 'privacy' | 'terms';
  eyebrowMeta: string[];
  title: string;
  intro: string;
  draftNote: string;
  sections: LegalSection[];
  footer: React.ReactNode;
}

export function LegalPage({ active, eyebrowMeta, title, intro, draftNote, sections, footer }: LegalPageProps) {
  return (
    <div>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18, flexWrap: 'wrap', padding: '14px 26px', borderBottom: `1px solid ${color.divider}`, background: '#fff' }}>
        <Link to="/">
          <Logo />
        </Link>
        <nav style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap', fontSize: 13, color: color.textMuted }}>
          <Link to="/">Home</Link>
          <Link to="/privacy" style={active === 'privacy' ? { color: color.gold } : undefined}>
            Privacy Policy
          </Link>
          <Link to="/terms" style={active === 'terms' ? { color: color.gold } : undefined}>
            Terms of Use
          </Link>
        </nav>
      </header>

      <div style={{ padding: '42px 34px 52px', maxWidth: 820 }}>
        <div style={{ fontSize: 10, letterSpacing: '.2em', color: color.gold, marginBottom: 10 }}>LEGAL</div>
        <h1 style={{ fontFamily: font.display, fontWeight: 400, fontSize: 40, lineHeight: 1.1, color: color.navy, margin: '0 0 12px' }}>{title}</h1>
        <p style={{ fontSize: 14.5, lineHeight: 1.65, color: color.textMuted, maxWidth: '62ch', margin: '0 0 10px' }}>{intro}</p>
        <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', fontSize: 11.5, letterSpacing: '.06em', color: color.textFaint, marginBottom: 26 }}>
          {eyebrowMeta.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
        <div style={{ background: color.draftBg, border: `1px solid ${color.draftBorder}`, borderRadius: 7, padding: '14px 16px', fontSize: 12.5, lineHeight: 1.6, color: color.draftText, marginBottom: 34 }}>
          {draftNote}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          {sections.map((s) => (
            <section key={s.num} style={{ display: 'flex', gap: 18, alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <div style={{ fontFamily: font.display, fontSize: 15, color: color.gold, width: 28, flexShrink: 0, paddingTop: 3 }}>{s.num}</div>
              <div style={{ flex: '1 1 320px', minWidth: 0 }}>
                <h2 style={{ fontFamily: font.display, fontWeight: 500, fontSize: 20, color: color.navy, margin: '0 0 8px' }}>{s.title}</h2>
                <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.7, color: color.textMuted, maxWidth: '64ch', textWrap: 'pretty' }}>{s.body}</p>
              </div>
            </section>
          ))}
        </div>

        <div style={{ marginTop: 36, paddingTop: 22, borderTop: `1px solid ${color.borderStrong}`, fontSize: 13, lineHeight: 1.7, color: color.textMuted }}>{footer}</div>
      </div>
    </div>
  );
}
