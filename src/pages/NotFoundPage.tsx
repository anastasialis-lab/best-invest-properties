import { Link } from 'react-router-dom';
import { color } from '@/styles/theme';

export function NotFoundPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, background: color.ground, padding: 24, textAlign: 'center' }}>
      <div style={{ fontWeight: 700, fontSize: 34, textTransform: 'uppercase', letterSpacing: '-.012em', color: color.link }}>Page not found</div>
      <p style={{ fontSize: 16.5, lineHeight: 1.6, color: color.body, margin: 0, maxWidth: '48ch' }}>This screen is not part of the prototype. Everything reachable from the homepage is.</p>
      <Link to="/" style={{ marginTop: 6, borderRadius: 40, padding: '11px 20px', background: color.action, color: '#fff', fontSize: 15.5, fontWeight: 600 }}>
        Back to the homepage
      </Link>
    </div>
  );
}
