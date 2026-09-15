import { Link } from 'react-router-dom';
import { color } from '@/styles/theme';

export function SiteFooter() {
  return (
    <footer
      style={{
        padding: '24px 26px',
        background: color.navyDark,
        color: color.railMuted,
        fontSize: 12,
        display: 'flex',
        justifyContent: 'space-between',
        gap: 16,
        flexWrap: 'wrap',
      }}
    >
      <span>Best Invest Properties — ranking the most profitable properties in Europe</span>
      <span style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <Link to="/privacy" style={{ color: color.railMuted }}>
          Privacy Policy
        </Link>
        <Link to="/terms" style={{ color: color.railMuted }}>
          Terms of Use
        </Link>
        <Link to="/developers" style={{ color: color.railMuted }}>
          For Developers
        </Link>
      </span>
    </footer>
  );
}
