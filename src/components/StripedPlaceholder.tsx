import type { CSSProperties } from 'react';
import { font, stripedPlaceholder, stripedPlaceholderDev } from '@/styles/theme';

interface StripedPlaceholderProps {
  label?: string;
  height?: number | string;
  radius?: number;
  align?: 'flex-end' | 'center';
  tone?: 'default' | 'dev';
  style?: CSSProperties;
}

// Photography placeholder used throughout the prototype in place of real
// property photos, per the "striped placeholders with labels" decision.
export function StripedPlaceholder({ label, height = 168, radius = 0, align = 'flex-end', tone = 'default', style }: StripedPlaceholderProps) {
  return (
    <div
      style={{
        position: 'relative',
        height,
        borderRadius: radius,
        backgroundImage: tone === 'dev' ? stripedPlaceholderDev() : stripedPlaceholder(),
        display: 'flex',
        alignItems: align,
        justifyContent: 'flex-start',
        padding: 10,
        ...style,
      }}
    >
      {label && (
        <span
          style={{
            fontFamily: font.mono,
            fontSize: 10,
            color: '#5C7085',
            background: 'rgba(251,250,247,.86)',
            padding: '3px 7px',
            borderRadius: 4,
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
