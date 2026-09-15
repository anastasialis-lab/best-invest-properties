import { color, font } from '@/styles/theme';

interface ScoreRingProps {
  score: number;
  size?: number;
}

export function ScoreRing({ score, size = 42 }: ScoreRingProps) {
  return (
    <div
      style={{
        fontFamily: font.display,
        width: size,
        height: size,
        flex: 'none',
        borderRadius: '50%',
        border: `2px solid ${color.gold}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.38,
        color: color.navy,
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {score}
    </div>
  );
}
