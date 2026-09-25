import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { color, line } from '@/styles/theme';
import { useIsMobile } from '@/hooks/useIsMobile';

const NAV = [
  { label: 'Dashboard', to: '/admin' },
  { label: 'Approvals', to: '/admin/approvals' },
  { label: 'Investors', to: '/admin/users' },
  { label: 'Investment Scores', to: '/admin/scores' },
];

const ACTIVE_FOR: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/approvals': 'Approvals',
  '/admin/review': 'Approvals',
  '/admin/verification': 'Approvals',
  '/admin/users': 'Investors',
  '/admin/scores': 'Investment Scores',
};

// The back office is the most muted of the three tiers but still light —
// review queues get read for hours, so it matches the product.
export function AdminLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isMobile = useIsMobile();
  const active = ACTIVE_FOR[location.pathname] ?? 'Dashboard';

  return (
    <div style={{ background: color.ground, color: color.slate, minHeight: '100vh' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch' }}>
        <div
          style={{
            width: isMobile ? '100%' : 210,
            flex: isMobile ? '1 1 100%' : 'none',
            background: color.panelAlt,
            padding: isMobile ? '10px 12px' : '22px 0 30px',
            borderRight: isMobile ? 0 : `1px solid ${line(0.1)}`,
            display: 'flex',
            flexDirection: isMobile ? 'row' : 'column',
            gap: 10,
            overflowX: isMobile ? 'auto' : 'visible',
          }}
          className="bip-scroll"
        >
          {!isMobile && <div style={{ padding: '0 20px 20px', fontSize: 12, letterSpacing: '.24em', color: color.muted2 }}>ADMIN</div>}
          {NAV.map((n) => {
            const on = n.label === active;
            return (
              <Link
                key={n.label}
                to={n.to}
                style={{
                  display: 'block',
                  width: isMobile ? 'auto' : '100%',
                  textAlign: 'left',
                  borderLeft: isMobile ? 0 : `2px solid ${on ? color.gold : 'transparent'}`,
                  padding: isMobile ? '9px 14px' : '10px 20px',
                  borderRadius: isMobile ? 40 : 0,
                  fontSize: 15.5,
                  whiteSpace: 'nowrap',
                  color: on ? color.slate : color.dim2,
                  background: on ? '#FFFFFF' : 'transparent',
                }}
              >
                {n.label}
              </Link>
            );
          })}
        </div>
        <div style={{ flex: '1 1 480px', minWidth: 0, padding: isMobile ? '22px 18px 40px' : '34px 36px 56px' }}>{children}</div>
      </div>
    </div>
  );
}

export function AdminHeading({ eyebrow, title, action }: { eyebrow: string; title: string; action?: ReactNode }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'baseline', marginBottom: 22 }}>
      <div>
        <div style={{ fontSize: 12, letterSpacing: '.2em', color: color.muted }}>{eyebrow}</div>
        <h1 style={{ fontWeight: 700, fontSize: 28, textTransform: 'uppercase', letterSpacing: '-.012em', margin: '4px 0 0' }}>{title}</h1>
      </div>
      {action}
    </div>
  );
}

export const adminPanel = {
  background: '#FFFFFF',
  border: `1px solid ${line(0.05)}`,
  borderRadius: 16,
  boxShadow: '0 12px 34px rgba(23,75,103,.07)',
} as const;
