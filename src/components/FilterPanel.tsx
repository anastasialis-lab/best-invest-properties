import { useNavigate } from 'react-router-dom';
import { color, line } from '@/styles/theme';
import { useAppStore, matchCount, eurK } from '@/state/store';

const TYPE_KEYS = ['Apartment', 'Villa', 'House'];
const BED_KEYS = ['Studio', '1', '2', '3+'];
const STRATEGY_KEYS = ['Long-term rental', 'Short-term rental', 'Mixed with private use', 'Capital growth'];
const COMPLETION_KEYS = ['Ready', '<12 months', '12–24 months'];
const SOON = ['Croatia', 'Montenegro', 'Portugal', 'Greece'];

function GroupLabel({ children, first = false }: { children: React.ReactNode; first?: boolean }) {
  return <div style={{ fontSize: 12, letterSpacing: '.14em', color: color.faint, margin: first ? '0 0 8px' : '16px 0 8px' }}>{children}</div>;
}

const checkbox = { accentColor: color.action, width: 15, height: 15 } as const;
const row = { display: 'flex', gap: 9, alignItems: 'center', fontSize: 15.5, padding: '3px 0' } as const;
const rangeLabels = { display: 'flex', justifyContent: 'space-between', fontSize: 14, color: color.body, fontVariantNumeric: 'tabular-nums' } as const;

export function FilterPanel({ onClose }: { onClose?: () => void }) {
  const navigate = useNavigate();
  const state = useAppStore();
  const total = matchCount(state);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <span style={{ fontWeight: 600, letterSpacing: '-.006em', fontSize: 19, color: color.link }}>Filters</span>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontSize: 13.5, color: color.faint, fontVariantNumeric: 'tabular-nums' }}>{total} results</span>
          {onClose && (
            <button onClick={onClose} aria-label="Close filters" style={{ border: `1px solid ${line(0.18)}`, borderRadius: 40, width: 44, height: 44, background: '#fff', fontSize: 16.5, color: color.body, cursor: 'pointer' }}>
              ✕
            </button>
          )}
        </div>
      </div>

      <GroupLabel first>COUNTRY</GroupLabel>
      {['Cyprus', 'Spain'].map((k) => (
        <label key={k} style={{ ...row, cursor: 'pointer', color: color.navy }}>
          <input type="checkbox" checked={!!state.countries[k]} onChange={() => state.toggleGroup('countries', k)} style={checkbox} />
          {k}
        </label>
      ))}
      {SOON.map((k) => (
        <label
          key={k}
          onClick={() => state.showToast(`${k} — coming soon, no inventory yet`)}
          style={{ ...row, cursor: 'not-allowed', color: color.faint }}
        >
          <input type="checkbox" checked={false} disabled readOnly style={checkbox} />
          {k}
          <span style={{ fontSize: 11, letterSpacing: '.12em', fontWeight: 600, padding: '3px 7px', borderRadius: 40, background: line(0.07), color: color.faint, whiteSpace: 'nowrap' }}>
            COMING SOON
          </span>
        </label>
      ))}

      <GroupLabel>PRICE</GroupLabel>
      <input type="range" min={100000} max={600000} step={10000} value={state.priceMax} onChange={(e) => state.setPriceMax(parseInt(e.target.value, 10))} style={{ width: '100%' }} />
      <div style={rangeLabels}>
        <span>€100k</span>
        <span>up to {eurK(state.priceMax)}</span>
      </div>

      <GroupLabel>PROPERTY TYPE</GroupLabel>
      {TYPE_KEYS.map((k) => (
        <label key={k} style={{ ...row, cursor: 'pointer' }}>
          <input type="checkbox" checked={!!state.types[k]} onChange={() => state.toggleGroup('types', k)} style={checkbox} />
          {k}
        </label>
      ))}

      <GroupLabel>BEDROOMS</GroupLabel>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {BED_KEYS.map((k) => {
          const on = !!state.beds[k];
          return (
            <button
              key={k}
              onClick={() => state.toggleGroup('beds', k)}
              style={{ border: `1px solid ${line(0.18)}`, borderRadius: 40, padding: '6px 12px', fontSize: 15.5, cursor: 'pointer', background: on ? color.navy : color.panel, color: on ? '#fff' : color.dim }}
            >
              {k}
            </button>
          );
        })}
      </div>

      <GroupLabel>MINIMUM GROSS YIELD</GroupLabel>
      <input type="range" min={4} max={10} step={0.1} value={state.minGross} onChange={(e) => state.setMinGross(parseFloat(e.target.value))} style={{ width: '100%' }} />
      <div style={rangeLabels}>
        <span>4%</span>
        <span>{state.minGross.toFixed(1)}%</span>
        <span>10%+</span>
      </div>

      <GroupLabel>MINIMUM NET YIELD</GroupLabel>
      <input type="range" min={3} max={8} step={0.1} value={state.minNet} onChange={(e) => state.setMinNet(parseFloat(e.target.value))} style={{ width: '100%' }} />
      <div style={rangeLabels}>
        <span>3%</span>
        <span>{state.minNet.toFixed(1)}%</span>
        <span>8%+</span>
      </div>

      <GroupLabel>INVESTMENT STRATEGY</GroupLabel>
      {STRATEGY_KEYS.map((k) => (
        <label key={k} style={{ ...row, cursor: 'pointer' }}>
          <input type="checkbox" checked={!!state.strategy[k]} onChange={() => state.toggleGroup('strategy', k)} style={checkbox} />
          {k}
        </label>
      ))}

      <GroupLabel>COMPLETION</GroupLabel>
      {COMPLETION_KEYS.map((k) => (
        <label key={k} style={{ ...row, cursor: 'pointer' }}>
          <input type="checkbox" checked={!!state.completion[k]} onChange={() => state.toggleGroup('completion', k)} style={checkbox} />
          {k}
        </label>
      ))}

      <div style={{ borderTop: `1px solid ${line(0.1)}`, marginTop: 16, paddingTop: 16 }}>
        {state.loggedIn ? (
          state.searchSaved ? (
            <div style={{ background: color.sky, border: '1px solid rgba(221,180,94,.35)', borderRadius: 10, padding: '11px 13px' }}>
              <div style={{ fontSize: 15.5, fontWeight: 600, color: color.link, marginBottom: 3 }}>Search saved</div>
              <div style={{ fontSize: 13.5, lineHeight: 1.5, color: color.body }}>New matches emailed weekly. Manage in account settings.</div>
            </div>
          ) : (
            <button
              onClick={() => {
                state.setSearchSaved(true);
                state.showToast('Search saved · new matches emailed weekly');
              }}
              style={{ width: '100%', border: '1px solid rgba(221,180,94,.5)', borderRadius: 40, padding: 11, background: color.goldWash, color: color.link, fontSize: 15.5, fontWeight: 600, cursor: 'pointer', minHeight: 44 }}
            >
              Save this search
            </button>
          )
        ) : (
          <div style={{ background: color.ground, border: `1px dashed ${line(0.22)}`, borderRadius: 10, padding: '12px 13px' }}>
            <div style={{ fontSize: 14, lineHeight: 1.55, color: color.body, marginBottom: 9 }}>Sign in to save this search and get new matches by email.</div>
            <button onClick={() => navigate('/login')} style={{ border: `1px solid ${line(0.18)}`, borderRadius: 40, padding: '8px 14px', background: '#fff', color: color.link, fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
              Sign in
            </button>
          </div>
        )}
      </div>

      {onClose && (
        <button
          onClick={onClose}
          style={{ width: '100%', marginTop: 14, border: 0, borderRadius: 40, padding: 15, background: color.actionBright, color: '#fff', fontSize: 16.5, fontWeight: 600, cursor: 'pointer', boxShadow: '0 10px 24px rgba(23,75,103,.22)', minHeight: 50 }}
        >
          Show {total} results
        </button>
      )}
    </>
  );
}
