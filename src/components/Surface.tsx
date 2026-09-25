import type { CSSProperties, ReactNode } from 'react';
import { color, line, shadow } from '@/styles/theme';

export function Card({ children, style, pad = '28px 26px 30px' }: { children: ReactNode; style?: CSSProperties; pad?: string | number }) {
  return (
    <div
      style={{
        background: '#fff',
        border: `1px solid ${line(0.07)}`,
        borderRadius: 16,
        boxShadow: '0 12px 34px rgba(23,75,103,.07)',
        padding: pad,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Eyebrow({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <div style={{ fontSize: 11.5, letterSpacing: '.24em', color: color.action, marginBottom: 12, ...style }}>{children}</div>;
}

export function ScreenHeading({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <h1
      style={{
        fontWeight: 700,
        fontSize: 'clamp(26px,3vw,38px)',
        lineHeight: 1.04,
        letterSpacing: '-.01em',
        textTransform: 'uppercase',
        color: color.link,
        margin: 0,
        ...style,
      }}
    >
      {children}
    </h1>
  );
}

export function PanelTitle({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <div style={{ fontWeight: 600, letterSpacing: '-.006em', fontSize: 21, color: color.link, ...style }}>{children}</div>;
}

export function FieldLabel({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <span style={{ display: 'block', fontSize: 11.5, letterSpacing: '.18em', color: color.faint, marginBottom: 8, ...style }}>{children}</span>;
}

export const fieldStyle: CSSProperties = {
  width: '100%',
  padding: '13px 14px',
  border: `1px solid ${line(0.14)}`,
  borderRadius: 12,
  background: color.ground,
  fontSize: 16.5,
};

export type ChipTone = 'neutral' | 'gold' | 'success' | 'danger' | 'info';

const chipTones: Record<ChipTone, CSSProperties> = {
  neutral: { background: color.panelAlt, color: color.muted2 },
  gold: { background: color.goldWash, color: color.goldDeep },
  success: { background: color.successWash, color: color.success },
  danger: { background: color.dangerWash, color: color.dangerDeep },
  info: { background: color.panelBlue, color: color.action },
};

export function Chip({ children, tone = 'neutral', style }: { children: ReactNode; tone?: ChipTone; style?: CSSProperties }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: '.1em',
        padding: '5px 11px',
        borderRadius: 999,
        whiteSpace: 'nowrap',
        ...chipTones[tone],
        ...style,
      }}
    >
      {children}
    </span>
  );
}

export function StatTile({ label, value, sub, style }: { label: string; value: ReactNode; sub?: ReactNode; style?: CSSProperties }) {
  return (
    <div style={{ background: '#fff', borderRadius: 11, padding: '11px 13px', boxShadow: '0 8px 20px rgba(23,75,103,.18)', minWidth: 0, ...style }}>
      <div style={{ fontSize: 12, letterSpacing: '.12em', color: color.faint }}>{label}</div>
      <div style={{ fontWeight: 700, fontSize: 21, color: color.link, lineHeight: 1.2, fontVariantNumeric: 'tabular-nums' }}>
        {value}
        {sub && <span style={{ fontSize: 15.5, color: color.faint }}>{sub}</span>}
      </div>
    </div>
  );
}

export { shadow };
