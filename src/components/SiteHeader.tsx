import { Link, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { color } from '@/styles/theme';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useAppStore } from '@/state/store';

const NAV = [
  { label: 'HOW IT WORKS', to: '/#howitworks' },
  { label: 'FIND MY INVESTMENT', to: '/browse' },
  { label: 'FOR DEVELOPERS', to: '/developers' },
];

interface SiteHeaderProps {
  onDark?: boolean;
  pad?: string;
}

// The public-site header. On the landing hero it sits on the photo (onDark);
// elsewhere it sits on the light ground.
export function SiteHeader({ onDark = false, pad }: SiteHeaderProps) {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const navOpen = useAppStore((s) => s.navOpen);
  const setNavOpen = useAppStore((s) => s.setNavOpen);

  const linkColor = onDark ? 'rgba(255,255,255,.88)' : color.link;

  const go = (to: string) => {
    setNavOpen(false);
    navigate(to);
  };

  return (
    <>
      <div
        style={{
          position: 'relative',
          padding: pad ?? (isMobile ? '12px 18px' : '13px 26px'),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
        }}
      >
        <Link to="/" onClick={() => setNavOpen(false)} style={{ flex: 'none' }}>
          <Logo onDark={onDark} markHeight={isMobile ? 40 : 60} wordSize={isMobile ? 21 : 29} ruleSize={isMobile ? 9 : 11} />
        </Link>

        {!isMobile && (
          <nav style={{ display: 'flex', gap: '14px 26px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end', fontSize: 13, letterSpacing: '.16em' }}>
            {NAV.map((n) => (
              <Link key={n.label} to={n.to} style={{ color: linkColor }}>
                {n.label}
              </Link>
            ))}
            <Link
              to="/login"
              style={{
                border: `1px solid ${onDark ? 'rgba(255,255,255,.42)' : 'rgba(23,75,103,.28)'}`,
                borderRadius: 40,
                padding: '12px 22px',
                background: 'transparent',
                color: onDark ? '#fff' : color.link,
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '.14em',
                whiteSpace: 'nowrap',
              }}
            >
              LOG IN
            </Link>
          </nav>
        )}

        {isMobile && (
          <button
            onClick={() => setNavOpen(!navOpen)}
            aria-label="Menu"
            aria-expanded={navOpen}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 4,
              width: 44,
              height: 44,
              alignItems: 'flex-end',
              border: 0,
              background: 'transparent',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <span style={{ width: 22, height: 1.5, background: onDark ? '#fff' : color.link, display: 'block' }} />
            <span style={{ width: 22, height: 1.5, background: onDark ? '#fff' : color.link, display: 'block' }} />
            <span style={{ width: 14, height: 1.5, background: color.gold, display: 'block' }} />
          </button>
        )}
      </div>

      {isMobile && navOpen && (
        <nav
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            margin: '0 22px 8px',
            paddingTop: 6,
            borderTop: `1px solid ${onDark ? 'rgba(255,255,255,.2)' : 'rgba(23,75,103,.14)'}`,
            fontSize: 15.5,
            letterSpacing: '.1em',
          }}
        >
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.to}
              onClick={(e) => {
                e.preventDefault();
                go(n.to);
              }}
              style={{
                padding: '13px 2px',
                borderBottom: `1px solid ${onDark ? 'rgba(255,255,255,.12)' : 'rgba(23,75,103,.1)'}`,
                color: onDark ? '#fff' : color.link,
              }}
            >
              {n.label}
            </a>
          ))}
          <a
            href="/login"
            onClick={(e) => {
              e.preventDefault();
              go('/login');
            }}
            style={{ padding: '13px 2px', color: onDark ? '#fff' : color.link }}
          >
            LOG IN
          </a>
        </nav>
      )}
    </>
  );
}
