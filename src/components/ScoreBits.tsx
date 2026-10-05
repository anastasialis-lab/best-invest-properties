import type { CSSProperties, ReactNode } from 'react';
import { color } from '@/styles/theme';

// "i" button that opens a short explanation under a label.
export function InfoButton({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-label="More information"
      aria-expanded={open}
      style={{ flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, margin: '-6px 0', padding: 0, border: 0, background: 'transparent', cursor: 'pointer' }}
    >
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 18,
          height: 18,
          borderRadius: '50%',
          border: `1.5px solid ${open ? color.action : 'rgba(23,75,103,.4)'}`,
          color: open ? '#fff' : color.action,
          background: open ? color.action : 'transparent',
          fontSize: 11.5,
          fontWeight: 700,
          fontStyle: 'italic',
          fontFamily: 'Georgia,serif',
          lineHeight: 1,
        }}
      >
        i
      </span>
    </button>
  );
}

export function TipNote({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div role="note" style={{ margin: '4px 0 10px', background: color.panel, border: '1px solid rgba(23,75,103,.14)', borderRadius: 10, padding: '10px 12px', fontSize: 14, lineHeight: 1.55, color: color.body, ...style }}>
      {children}
    </div>
  );
}

// Three circles 0 · 1 · 2 with the points earned highlighted in gold.
export function PointsDots({ got }: { got: number }) {
  return (
    <span role="img" aria-label={`${got} out of 2 points`} style={{ flex: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      {[0, 1, 2].map((n) => (
        <span
          key={n}
          aria-hidden="true"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 26,
            height: 26,
            borderRadius: '50%',
            background: n === got ? color.gold : 'transparent',
            color: n === got ? color.ink : '#6B7F8E',
            fontSize: 14,
            fontWeight: n === got ? 700 : 500,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {n}
        </span>
      ))}
    </span>
  );
}

// "8/10" with a lighter denominator.
export function OutOf({ value, max, size = 15.5 }: { value: ReactNode; max: number; size?: number }) {
  return (
    <>
      {value}
      <span style={{ fontSize: size, fontWeight: 400, color: '#6B7F8E' }}>/{max}</span>
    </>
  );
}
