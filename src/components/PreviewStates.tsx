import { color, line } from '@/styles/theme';
import { useIsMobile } from '@/hooks/useIsMobile';

interface Choice<T> {
  value: T;
  label: string;
}

// The prototype ships an in-screen switcher so every empty / loading / error
// state can be seen without a backend. Kept here for the same reason.
export function StateChips<T extends string | boolean>({
  label,
  choices,
  current,
  onPick,
  accent = color.navy,
}: {
  label: string;
  choices: Choice<T>[];
  current: T;
  onPick: (v: T) => void;
  accent?: string;
}) {
  const isMobile = useIsMobile();
  // On mobile the chips collapse into one select, as in the prototype.
  if (isMobile) {
    const idx = Math.max(0, choices.findIndex((c) => c.value === current));
    return (
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', flex: '1 1 150px', minWidth: 0 }}>
        <span style={{ fontSize: 11.5, letterSpacing: '.16em', color: color.faint }}>{label}</span>
        <select
          value={idx}
          onChange={(e) => onPick(choices[Number(e.target.value)].value)}
          style={{ flex: '1 1 150px', minWidth: 0, maxWidth: 260, padding: '6px 10px', border: `1px solid ${line(0.18)}`, borderRadius: 40, background: '#fff', fontSize: 13.5, color: color.link }}
        >
          {choices.map((c, i) => (
            <option key={String(c.value)} value={i}>
              {c.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <span style={{ fontSize: 11.5, letterSpacing: '.16em', color: color.faint }}>{label}</span>
      {choices.map((c) => {
        const on = current === c.value;
        return (
          <button
            key={String(c.value)}
            onClick={() => onPick(c.value)}
            style={{
              border: `1px solid ${on ? accent : line(0.16)}`,
              borderRadius: 40,
              padding: '5px 12px',
              fontSize: 13.5,
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              background: on ? accent : '#fff',
              color: on ? '#fff' : color.muted,
            }}
          >
            {c.label}
          </button>
        );
      })}
    </div>
  );
}

export function PreviewBar({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 18,
        flexWrap: 'wrap',
        alignItems: 'center',
        background: 'rgba(255,255,255,.8)',
        border: '1px solid rgba(255,255,255,.55)',
        borderRadius: 12,
        boxShadow: '0 12px 34px rgba(23,75,103,.07)',
        padding: '9px 13px',
        marginBottom: 18,
      }}
    >
      {children}
    </div>
  );
}
