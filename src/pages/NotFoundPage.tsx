import { Link } from 'react-router-dom';
import { color, font } from '@/styles/theme';

export function NotFoundPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, background: color.paper }}>
      <div style={{ fontFamily: font.display, fontSize: 40, color: color.navy }}>Page not found</div>
      <Link to="/" style={{ color: color.gold, fontSize: 14 }}>
        Back to the homepage
      </Link>
    </div>
  );
}
