import type { CSSProperties, ReactNode } from 'react';
import { color } from '@/styles/theme';

export function SectionLabel({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div style={{ fontSize: 10, letterSpacing: '.2em', color: color.gold, ...style }}>{children}</div>
  );
}
