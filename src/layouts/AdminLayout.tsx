import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { color, font } from '@/styles/theme';
import { ADMIN_NAV } from '@/data/content';

const ADMIN_ROUTES: Record<string, string> = {
  Dashboard: '/admin',
  'Investment Scores': '/admin/scores',
};

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();

  return (
    <div style={{ background: color.adminBg, color: color.adminText, minHeight: '100vh' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch' }}>
        <div style={{ width: 190, flex: 'none', background: color.adminSidebar, padding: '22px 0 30px', borderRight: `1px solid ${color.adminBorder}` }}>
          <div style={{ padding: '0 18px 18px', fontSize: 10, letterSpacing: '.24em', color: color.adminMuted }}>ADMIN</div>
          {ADMIN_NAV.map((label) => {
            const to = ADMIN_ROUTES[label];
            const active = to ? location.pathname === to : false;
            const content = (
              <div
                style={{
                  padding: '9px 18px',
                  fontSize: 12.5,
                  color: active ? color.goldLight : color.adminMuted2,
                  background: active ? 'rgba(226,181,88,.1)' : 'transparent',
                  borderLeft: `2px solid ${active ? color.goldLight : 'transparent'}`,
                }}
              >
                {label}
              </div>
            );
            return to ? (
              <Link key={label} to={to} style={{ display: 'block' }}>
                {content}
              </Link>
            ) : (
              <div key={label}>{content}</div>
            );
          })}
        </div>
        <div style={{ flex: 1, minWidth: 0, padding: '24px 26px 40px' }}>{children}</div>
      </div>
    </div>
  );
}

export function AdminHeading({ eyebrow, title, action }: { eyebrow: string; title: string; action?: ReactNode }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'baseline', marginBottom: 22 }}>
      <div>
        <div style={{ fontSize: 10, letterSpacing: '.2em', color: color.adminMuted }}>{eyebrow}</div>
        <h1 style={{ fontFamily: font.display, fontWeight: 400, fontSize: 28, margin: '4px 0 0' }}>{title}</h1>
      </div>
      {action}
    </div>
  );
}
