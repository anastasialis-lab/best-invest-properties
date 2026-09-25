import { color, line } from '@/styles/theme';
import { useAppStore } from '@/state/store';

export function Spinner({ size = 14, onDark = false }: { size?: number; onDark?: boolean }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: `2px solid ${onDark ? 'rgba(255,255,255,.35)' : 'rgba(23,75,103,.25)'}`,
        borderTopColor: onDark ? '#fff' : color.slate,
        display: 'inline-block',
        animation: 'bipspin .8s linear infinite',
      }}
    />
  );
}

export function Toast() {
  const toast = useAppStore((s) => s.toast);
  const hideToast = useAppStore((s) => s.hideToast);
  if (!toast) return null;
  return (
    <div
      onClick={hideToast}
      style={{
        position: 'fixed',
        bottom: 26,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 90,
        background: '#1D3E56',
        color: '#fff',
        borderRadius: 12,
        padding: '13px 18px',
        boxShadow: '0 14px 34px rgba(10,31,56,.32)',
        fontSize: 15.5,
        maxWidth: 'min(460px,86vw)',
        cursor: 'pointer',
        animation: 'biptoast .22s ease-out',
        display: 'flex',
        gap: 12,
        alignItems: 'center',
      }}
    >
      <span style={{ minWidth: 0 }}>{toast}</span>
      <span style={{ flex: 'none', fontSize: 13, color: color.muted }}>Dismiss</span>
    </div>
  );
}

export function Modal() {
  const modal = useAppStore((s) => s.modal);
  const closeModal = useAppStore((s) => s.closeModal);
  const setModalReason = useAppStore((s) => s.setModalReason);
  const runModal = useAppStore((s) => s.runModal);
  if (!modal) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(10,31,56,.55)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div style={{ background: '#fff', borderRadius: 12, maxWidth: 470, width: '100%', boxShadow: '0 26px 60px rgba(10,31,56,.4)', padding: '24px 26px 22px' }}>
        <div style={{ fontWeight: 600, letterSpacing: '-.006em', fontSize: 23, lineHeight: 1.2, color: color.navy, marginBottom: 9 }}>{modal.title}</div>
        <p style={{ fontSize: 16.5, lineHeight: 1.65, color: color.dim, margin: '0 0 14px' }}>{modal.body}</p>

        {modal.note && (
          <div style={{ fontSize: 14, lineHeight: 1.55, color: color.link, background: '#D3E5F2', borderRadius: 10, padding: '10px 12px', marginBottom: 14 }}>{modal.note}</div>
        )}

        {modal.needReason && (
          <label style={{ display: 'block', marginBottom: 14 }}>
            <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, fontSize: 15.5, color: color.dim, marginBottom: 5 }}>
              <span>Reason sent to the developer</span>
              <span style={{ flex: 'none', whiteSpace: 'nowrap', color: color.action, fontSize: 13 }}>Required</span>
            </span>
            <textarea
              rows={3}
              value={modal.reason}
              onChange={(e) => setModalReason(e.target.value)}
              placeholder="Be specific — this is what they see and what the audit log keeps."
              style={{ width: '100%', padding: '13px 14px', border: `1px solid ${line(0.14)}`, borderRadius: 10, background: color.panel, fontSize: 15.5, resize: 'vertical' }}
            />
            {modal.warn && <span style={{ display: 'block', fontSize: 13.5, color: color.dangerDeep, marginTop: 5 }}>A reason is required before this can be sent.</span>}
          </label>
        )}

        <div style={{ display: 'flex', gap: 9, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          <button onClick={closeModal} style={{ border: `1px solid ${line(0.18)}`, borderRadius: 40, padding: '11px 18px', background: '#fff', color: color.navy, fontSize: 15.5, cursor: 'pointer', minHeight: 44 }}>
            Cancel
          </button>
          <button
            onClick={runModal}
            style={{ border: 0, borderRadius: 40, padding: '11px 20px', background: modal.tone === 'danger' ? color.dangerDeep : color.action, color: '#fff', fontSize: 15.5, fontWeight: 600, cursor: 'pointer', minHeight: 44 }}
          >
            {modal.ok}
          </button>
        </div>
      </div>
    </div>
  );
}
