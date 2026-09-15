import { Link } from 'react-router-dom';
import type { Listing } from '@/data/listings';
import { color, font } from '@/styles/theme';
import { StripedPlaceholder } from './StripedPlaceholder';
import { ScoreRing } from './ScoreRing';
import { useAppStore } from '@/state/store';

interface PropertyCardProps {
  listing: Listing;
  compact?: boolean;
}

export function PropertyCard({ listing: p, compact = false }: PropertyCardProps) {
  const compare = useAppStore((s) => s.compare);
  const toggleCompare = useAppStore((s) => s.toggleCompare);
  const inCompare = compare.includes(p.id);

  return (
    <div
      style={{
        background: '#fff',
        border: `1px solid ${color.border}`,
        borderRadius: 9,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ position: 'relative' }}>
        <StripedPlaceholder label={p.photoLabel} height={compact ? 152 : 168} />
        <span
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            fontSize: 9,
            letterSpacing: '.14em',
            fontWeight: 700,
            padding: '5px 9px',
            borderRadius: 4,
            background: color.navyDark,
            color: color.goldLight,
          }}
        >
          {p.tag}
        </span>
      </div>
      <div style={{ padding: compact ? '15px 16px 17px' : '16px 17px 18px', display: 'flex', flexDirection: 'column', gap: 11, flex: 1 }}>
        <div>
          <div style={{ fontSize: 12.5, color: color.textFaint, letterSpacing: '.04em' }}>{p.location}</div>
          <div style={{ fontFamily: font.display, fontSize: compact ? 25 : 27, color: color.navy, lineHeight: 1.2, fontVariantNumeric: 'tabular-nums' }}>{p.price}</div>
          <div style={{ fontSize: 12.5, color: color.textMuted }}>{p.spec}</div>
        </div>

        {compact ? (
          <div style={{ display: 'flex', gap: 10, borderTop: `1px solid ${color.divider}`, borderBottom: `1px solid ${color.divider}`, padding: '10px 0', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: font.display, fontSize: 19, color: color.gold, fontVariantNumeric: 'tabular-nums' }}>{p.gross}</div>
              <div style={{ fontSize: 9.5, letterSpacing: '.1em', color: color.textFaint }}>GROSS YIELD</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: font.display, fontSize: 19, color: color.navy, fontVariantNumeric: 'tabular-nums' }}>{p.net}</div>
              <div style={{ fontSize: 9.5, letterSpacing: '.1em', color: color.textFaint }}>EST. NET YIELD</div>
            </div>
            <ScoreRing score={p.score} size={38} />
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', gap: 10, borderTop: `1px solid ${color.divider}`, borderBottom: `1px solid ${color.divider}`, padding: '11px 0' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: font.display, fontSize: 20, color: color.gold, fontVariantNumeric: 'tabular-nums' }}>{p.gross}</div>
                <div style={{ fontSize: 10, letterSpacing: '.1em', color: color.textFaint }}>GROSS YIELD</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: font.display, fontSize: 20, color: color.navy, fontVariantNumeric: 'tabular-nums' }}>{p.net}</div>
                <div style={{ fontSize: 10, letterSpacing: '.1em', color: color.textFaint }}>EST. NET YIELD</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <ScoreRing score={p.score} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: color.navy }}>{p.verdict}</div>
                <div style={{ fontSize: 11.5, color: color.textFaint }}>{p.score}/100 investment score</div>
              </div>
            </div>
          </>
        )}

        <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
          <Link
            to={`/property/${p.id}`}
            style={{
              flex: 1,
              border: 0,
              borderRadius: 6,
              padding: compact ? 10 : 11,
              background: color.navy,
              color: '#fff',
              fontSize: 12.5,
              fontWeight: 600,
              textAlign: 'center',
            }}
          >
            View Investment
          </Link>
          <button
            onClick={() => toggleCompare(p.id)}
            title="Add to compare"
            style={{
              border: `1px solid ${color.borderStrong}`,
              borderRadius: 6,
              padding: compact ? '10px 12px' : '11px 13px',
              fontSize: 12.5,
              cursor: 'pointer',
              background: inCompare ? color.navy : 'transparent',
              color: inCompare ? '#fff' : color.textMuted,
            }}
          >
            {inCompare ? '✓' : '+'}
          </button>
        </div>
      </div>
    </div>
  );
}
