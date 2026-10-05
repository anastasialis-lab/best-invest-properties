import type { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { color, line, navGlass } from '@/styles/theme';
import { useState } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { PortalNavToggle } from '@/components/PortalNavToggle';

const NAV = [
  { label: 'Dashboard', to: '/developer-portal' },
  { label: 'My Projects', to: '/developer-portal/projects' },
  { label: 'Leads', to: '/developer-portal/leads' },
  { label: 'Company Profile', to: '/developer-portal/company' },
];

// Which nav entry lights up for each route in the developer area.
const ACTIVE_FOR: Record<string, string> = {
  '/developer-portal': 'Dashboard',
  '/developer-portal/projects': 'My Projects',
  '/developer-portal/units': 'My Projects',
  '/developer-portal/add-project': 'My Projects',
  '/developer-portal/leads': 'Leads',
  '/developer-portal/company': 'Company Profile',
  '/developer-portal/verification': 'Company Profile',
};

export function DevPortalLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isMobile = useIsMobile();
  const active = ACTIVE_FOR[location.pathname] ?? 'Dashboard';
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch' }}>
        <div
          style={{
            width: isMobile ? '100%' : 210,
            flex: isMobile ? '1 1 100%' : 'none',
            background: navGlass,
            padding: isMobile ? '12px 14px' : '22px 0 30px',
            borderRight: isMobile ? 0 : `1px solid ${line(0.1)}`,
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? 0 : 10,
            overflowX: 'visible',
          }}
          className="bip-scroll"
        >
          {!isMobile && <div style={{ padding: '0 20px 20px', fontSize: 12, letterSpacing: '.24em', color: color.muted2 }}>DEVELOPER</div>}
          {isMobile && <PortalNavToggle label="Developer menu" open={navOpen} current={active} onToggle={() => setNavOpen(!navOpen)} />}
          {(!isMobile || navOpen) && NAV.map((n) => {
            const on = n.label === active;
            return (
              <Link
                key={n.label}
                to={n.to}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  border: 0,
                  borderLeft: isMobile ? 0 : `2px solid ${on ? color.action : 'transparent'}`,
                  padding: isMobile ? '9px 13px' : '10px 20px',
                  borderRadius: isMobile ? 6 : 0,
                  fontSize: 15.5,
                  whiteSpace: 'nowrap',
                  background: on ? '#FFFFFF' : 'transparent',
                  color: on ? color.ink : color.dim2,
                }}
              >
                {n.label}
              </Link>
            );
          })}
        </div>
        <div style={{ flex: '1 1 480px', minWidth: 0 }}>{children}</div>
      </div>
    </div>
  );
}

export function DevPortalHeader({ title }: { title: string }) {
  const navigate = useNavigate();
  return (
    <div style={{ padding: '26px 28px 0' }}>
      <div style={{ background: color.ink, borderRadius: 16, color: color.sky, padding: '22px 26px', display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 11.5, letterSpacing: '.2em', color: '#DCEAF3' }}>DEVELOPER PORTAL</div>
          <div style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-.012em', fontSize: 26, marginTop: 4 }}>{title}</div>
        </div>
        <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/developer-portal/add-project')} style={{ border: 0, borderRadius: 40, padding: '11px 18px', background: '#DDB45E', color: color.ink, fontSize: 15.5, fontWeight: 600, cursor: 'pointer' }}>
            Add Project
          </button>
          {[
            { label: 'Update Availability', to: '/developer-portal/projects' },
            { label: 'View Leads', to: '/developer-portal/leads' },
            { label: 'Company profile', to: '/developer-portal/company' },
          ].map((b) => (
            <button key={b.label} onClick={() => navigate(b.to)} style={{ border: '1px solid rgba(255,255,255,.45)', borderRadius: 40, padding: '11px 18px', background: 'rgba(255,255,255,.08)', color: '#fff', fontSize: 15.5, cursor: 'pointer' }}>
              {b.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export const devPanel = { background: 'rgba(255,255,255,.8)', border: '1px solid rgba(255,255,255,.55)', borderRadius: 16, boxShadow: '0 12px 34px rgba(23,75,103,.07)' } as const;
