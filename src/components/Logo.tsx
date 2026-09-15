import { color, font } from '@/styles/theme';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: number;
  showSubtitle?: boolean;
}

// Simplified in-product wordmark. The full logo mark is reserved for the
// landing-page hero only, per the design decisions in chat.
export function Logo({ variant = 'dark', size = 19, showSubtitle = true }: LogoProps) {
  const textColor = variant === 'light' ? '#fff' : color.navy;
  const accent = variant === 'light' ? color.goldLight : color.gold;
  return (
    <div>
      <div style={{ fontFamily: font.display, fontSize: size, letterSpacing: '.05em', color: textColor, lineHeight: 1 }}>
        BEST <span style={{ color: accent }}>INVEST</span>
      </div>
      {showSubtitle && (
        <div style={{ fontSize: size * 0.4, letterSpacing: '.32em', color: variant === 'light' ? color.railMuted : color.textFaint, marginTop: 4 }}>
          PROPERTIES
        </div>
      )}
    </div>
  );
}
