import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import heroImage from '@/assets/hero.jpg';
import { photoGradient } from '@/styles/theme';
import { useIsMobile } from '@/hooks/useIsMobile';

// Screens that carry their own photo or full-bleed panel and so are not
// wrapped in the frosted sheet.
const OWN_BACKGROUND = ['/', '/developers', '/developers/apply', '/register', '/login', '/forgot-password', '/admin/journeys'];

export function PhotoSheet({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const isMobile = useIsMobile();
  if (OWN_BACKGROUND.includes(pathname)) return <>{children}</>;

  return (
    <div style={{ position: 'relative', background: '#123A50', minHeight: '100vh', overflowX: 'clip' }}>
      <div aria-hidden="true" style={{ position: 'sticky', top: 0, height: '100vh', marginBottom: '-100vh', overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: '62% 48%' }} />
        <div style={{ position: 'absolute', inset: 0, background: photoGradient }} />
      </div>
      <div style={{ position: 'relative', padding: isMobile ? 10 : 22 }}>
        <div style={{ position: 'relative', borderRadius: 18, boxShadow: '0 18px 44px rgba(6,30,48,.22)', maxWidth: 1280, margin: '0 auto' }}>
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 18,
              background: 'rgba(247,252,255,.5)',
              WebkitBackdropFilter: 'blur(6px)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255,255,255,.55)',
              pointerEvents: 'none',
            }}
          />
          <div style={{ position: 'relative', borderRadius: 18, overflow: 'clip' }}>{children}</div>
        </div>
      </div>
    </div>
  );
}
