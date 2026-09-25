import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { color } from '@/styles/theme';

export function SiteFooter() {
  return (
    <footer
      style={{
        padding: '34px 26px 28px',
        background: color.sky,
        borderTop: '1px solid #D5EAF5',
        display: 'flex',
        justifyContent: 'space-between',
        gap: 26,
        flexWrap: 'wrap',
        alignItems: 'flex-end',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, minWidth: 0 }}>
        <Logo markHeight={36} wordSize={20} ruleSize={8} />
        <span style={{ fontSize: 15, color: '#4E6A7E' }}>Ranking the most profitable properties in Europe</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: '10px 22px', flexWrap: 'wrap', fontSize: 15.5, width: '100%' }}>
          <Link to="/privacy" style={{ color: color.link }}>
            Privacy Policy
          </Link>
          <Link to="/terms" style={{ color: color.link }}>
            Terms of Use
          </Link>
          <Link to="/developers" style={{ color: color.link }}>
            For Developers
          </Link>
        </div>
        <span style={{ fontSize: 13, letterSpacing: '.1em', color: color.muted2 }}>© 2026 BEST INVEST PROPERTIES</span>
      </div>
    </footer>
  );
}
