import type { ReactNode } from 'react';
import { color, font } from '@/styles/theme';

export function DevStatCard({ v, k }: { v: string; k: string }) {
  return (
    <div style={{ background: '#fff', border: `1px solid ${color.devBorder}`, borderRadius: 9, padding: 20 }}>
      <div style={{ fontFamily: font.display, fontSize: 38, color: color.devDark, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{v}</div>
      <div style={{ fontSize: 11.5, letterSpacing: '.09em', color: color.devMuted, marginTop: 8 }}>{k}</div>
    </div>
  );
}

export function DevPanel({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div style={{ background: '#fff', border: `1px solid ${color.devBorder}`, borderRadius: 9, padding: 20 }}>
      {title && <div style={{ fontFamily: font.display, fontSize: 20, color: color.devDark, marginBottom: 14 }}>{title}</div>}
      {children}
    </div>
  );
}
