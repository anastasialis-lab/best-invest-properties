import { color, line } from '@/styles/theme';

// Mobile only: the portal / admin side navigation collapses behind one button.
export function PortalNavToggle({ label, open, current, onToggle }: { label: string; open: boolean; current: string; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      style={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        border: `1px solid ${line(0.16)}`,
        borderRadius: 40,
        padding: '10px 16px',
        minHeight: 44,
        background: '#fff',
        color: color.ink,
        fontSize: 15.5,
        cursor: 'pointer',
      }}
    >
      <span style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 'none' }}>
        <span style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ width: 16, height: 2, background: color.ink, borderRadius: 2 }} />
          ))}
        </span>
        <span style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{label}</span>
      </span>
      <span style={{ fontSize: 13.5, color: color.muted2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>{open ? 'Close ✕' : current}</span>
    </button>
  );
}
