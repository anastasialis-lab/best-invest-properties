import logoMark from '@/assets/logo-mark.png';
import { color } from '@/styles/theme';

const GOLD_GRADIENT = 'linear-gradient(180deg,#F8E4A6 0%,#E3BC63 52%,#C9982F 100%)';

interface LogoProps {
  onDark?: boolean;
  markHeight?: number;
  wordSize?: number;
  ruleSize?: number;
}

const goldText = {
  background: GOLD_GRADIENT,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
} as const;

export function Logo({ onDark = false, markHeight = 60, wordSize = 29, ruleSize = 11 }: LogoProps) {
  return (
    <div role="img" aria-label="Best Invest Properties" style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: markHeight > 40 ? 13 : 9 }}>
      <img src={logoMark} alt="" style={{ height: markHeight, width: 'auto', display: 'block', flex: 'none' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: markHeight > 40 ? 5 : 4 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: markHeight > 40 ? 9 : 6, fontWeight: 700, fontSize: wordSize, lineHeight: 1, letterSpacing: '-.005em' }}>
          <span style={{ color: onDark ? '#fff' : color.actionAlt }}>BEST</span>
          <span style={goldText}>INVEST</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: markHeight > 40 ? 8 : 6 }}>
          <span style={{ height: 2, width: markHeight > 40 ? 14 : 10, background: color.goldAlt, flex: 'none' }} />
          <span
            style={{
              fontWeight: 600,
              fontSize: ruleSize,
              letterSpacing: '.42em',
              color: onDark ? '#fff' : color.actionAlt,
              whiteSpace: 'nowrap',
            }}
          >
            PROPERTIES
          </span>
          <span style={{ height: 2, width: markHeight > 40 ? 14 : 10, background: color.goldAlt, flex: 'none' }} />
        </div>
      </div>
    </div>
  );
}

export { GOLD_GRADIENT, goldText };
