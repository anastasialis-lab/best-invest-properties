import { useNavigate } from 'react-router-dom';
import { color, font } from '@/styles/theme';
import { useAppStore, matchCount, eurK } from '@/state/store';

interface FilterPanelProps {
  compact?: boolean;
  variant?: 'search' | 'browse';
}

const COUNTRY_KEYS = ['Cyprus', 'Spain'];
const TYPE_KEYS = ['Apartment', 'Villa', 'House'];
const BED_KEYS = ['Studio', '1', '2', '3+'];
const STRATEGY_KEYS = ['Long-term rental', 'Short-term rental', 'Capital appreciation'];
const COMPLETION_KEYS = ['Ready', '<12 months', '12–24 months'];

function Label({ children, compact }: { children: React.ReactNode; compact?: boolean }) {
  return (
    <div style={{ fontSize: 10, letterSpacing: '.14em', color: color.textFaint, margin: compact ? '16px 0 7px' : '18px 0 8px' }}>
      {children}
    </div>
  );
}

export function FilterPanel({ compact = false, variant = 'search' }: FilterPanelProps) {
  const navigate = useNavigate();
  const state = useAppStore();
  const fontSize = compact ? 13 : 13.5;

  const checkboxGroup = (group: 'countries' | 'types' | 'strategy' | 'completion', keys: string[]) => (
    <>
      {keys.map((k) => (
        <label key={k} style={{ display: 'flex', gap: 9, alignItems: 'center', fontSize, padding: compact ? '3px 0' : '4px 0', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={!!state[group][k]}
            onChange={() => state.toggleGroup(group, k)}
            style={{ accentColor: color.gold, width: 15, height: 15 }}
          />
          {k}
        </label>
      ))}
    </>
  );

  return (
    <div>
      {variant === 'search' ? (
        <div style={{ fontFamily: font.display, fontSize: 20, color: color.navy, marginBottom: 18 }}>Filters</div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
          <span style={{ fontFamily: font.display, fontSize: 19, color: color.navy }}>Filters</span>
          <span style={{ fontSize: 11.5, color: color.textFaint, fontVariantNumeric: 'tabular-nums' }}>{matchCount(state)} results</span>
        </div>
      )}

      <Label compact={compact}>COUNTRY</Label>
      {checkboxGroup('countries', COUNTRY_KEYS)}

      {variant === 'search' && (
        <>
          <Label compact={compact}>LOCATION</Label>
          <input
            placeholder="City / region"
            style={{ width: '100%', padding: '10px 11px', border: `1px solid ${color.borderStrong}`, borderRadius: 6, background: color.cardAlt, fontSize: 13.5 }}
          />
        </>
      )}

      <Label compact={compact}>PRICE</Label>
      <input
        type="range"
        min={100000}
        max={500000}
        step={5000}
        value={state.priceMax}
        onChange={(e) => state.setPriceMax(parseInt(e.target.value, 10))}
        style={{ width: '100%' }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: compact ? 12 : 12.5, color: color.textMuted, fontVariantNumeric: 'tabular-nums' }}>
        <span>€100k</span>
        <span>up to {eurK(state.priceMax)}</span>
      </div>

      <Label compact={compact}>PROPERTY TYPE</Label>
      {checkboxGroup('types', TYPE_KEYS)}

      <Label compact={compact}>BEDROOMS</Label>
      <div style={{ display: 'flex', gap: compact ? 6 : 7, flexWrap: 'wrap' }}>
        {BED_KEYS.map((k) => {
          const on = !!state.beds[k];
          return (
            <button
              key={k}
              onClick={() => state.toggleGroup('beds', k)}
              style={{
                border: `1px solid ${color.borderStrong}`,
                borderRadius: 6,
                padding: compact ? '6px 12px' : '7px 14px',
                fontSize: compact ? 12.5 : 13,
                cursor: 'pointer',
                background: on ? color.navy : color.cardAlt,
                color: on ? '#fff' : color.textMuted,
              }}
            >
              {k}
            </button>
          );
        })}
      </div>

      <Label compact={compact}>MINIMUM GROSS YIELD</Label>
      <input
        type="range"
        min={4}
        max={10}
        step={0.1}
        value={state.minGross}
        onChange={(e) => state.setMinGross(parseFloat(e.target.value))}
        style={{ width: '100%' }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: compact ? 12 : 12.5, color: color.textMuted, fontVariantNumeric: 'tabular-nums' }}>
        <span>4%</span>
        <span>{state.minGross.toFixed(1)}%</span>
        <span>10%</span>
      </div>

      <Label compact={compact}>MINIMUM NET YIELD</Label>
      <input
        type="range"
        min={3}
        max={8}
        step={0.1}
        value={state.minNet}
        onChange={(e) => state.setMinNet(parseFloat(e.target.value))}
        style={{ width: '100%' }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: compact ? 12 : 12.5, color: color.textMuted, fontVariantNumeric: 'tabular-nums' }}>
        <span>3%</span>
        <span>{state.minNet.toFixed(1)}%</span>
        <span>8%</span>
      </div>

      <Label compact={compact}>INVESTMENT STRATEGY</Label>
      {checkboxGroup('strategy', STRATEGY_KEYS)}

      <Label compact={compact}>COMPLETION</Label>
      {checkboxGroup('completion', COMPLETION_KEYS)}

      {variant === 'search' ? (
        <button
          onClick={() => navigate('/results')}
          style={{ width: '100%', marginTop: 22, border: 0, borderRadius: 6, padding: 13, background: color.navy, color: '#fff', fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}
        >
          Apply Filters
        </button>
      ) : (
        <div style={{ fontSize: 11.5, lineHeight: 1.55, color: color.textFaint, marginTop: 16 }}>
          Results update as you change a filter. No Apply button.
        </div>
      )}
    </div>
  );
}
