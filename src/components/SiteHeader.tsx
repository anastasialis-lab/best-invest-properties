import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { color } from '@/styles/theme';

interface SiteHeaderProps {
  active?: 'properties' | 'developers' | null;
  ctaLabel?: string;
  ctaTo?: string;
  ctaTone?: 'gold' | 'green';
}

export function SiteHeader({ active = null, ctaLabel = 'Find My Investment', ctaTo = '/search', ctaTone = 'gold' }: SiteHeaderProps) {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 18,
        flexWrap: 'wrap',
        padding: '13px 26px',
        borderBottom: `1px solid ${color.divider}`,
        background: '#fff',
      }}
    >
      <Link to="/">
        <Logo />
      </Link>
      <nav style={{ display: 'flex', gap: 22, alignItems: 'center', flexWrap: 'wrap', fontSize: 13, color: color.textMuted }}>
        <Link to="/results" style={active === 'properties' ? { color: color.gold } : undefined}>
          Investment Properties
        </Link>
        <a href="#">How It Works</a>
        <Link to="/developers" style={active === 'developers' ? { color: color.gold } : undefined}>
          For Developers
        </Link>
        <a href="#">About</a>
        <Link to="/login">Login</Link>
        <Link
          to={ctaTo}
          style={{
            border: 0,
            borderRadius: 5,
            padding: '9px 16px',
            background: ctaTone === 'green' ? color.devDark : color.gold,
            color: '#fff',
            fontSize: '12.5px',
            fontWeight: 600,
          }}
        >
          {ctaLabel}
        </Link>
      </nav>
    </header>
  );
}
