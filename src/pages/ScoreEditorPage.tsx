import { useEffect } from 'react';
import { AdminLayout, adminPanel } from '@/layouts/AdminLayout';
import { color, line } from '@/styles/theme';
import { useAppStore } from '@/state/store';

const IMPACT_BASE = [
  { name: 'Paphos 1BR', was: 89 },
  { name: 'Larnaca 1BR', was: 77 },
  { name: 'Alicante 2BR', was: 84 },
];

export function ScoreEditorPage() {
  const { weights, setWeight, resetWeights, rescore, rescorePct, startRescore, tickRescore, setRescore, openModal, showToast } = useAppStore();

  useEffect(() => {
    if (rescore !== 'running') return;
    const t = window.setInterval(() => tickRescore(), 300);
    return () => window.clearInterval(t);
  }, [rescore, tickRescore]);

  const total = weights.reduce((a, w) => a + w.value, 0);
  const ok = total === 100;
  const totalColor = ok ? color.success : color.action;
  const totalNote = ok
    ? 'Weights balance. Saving will re-score 83 published properties.'
    : `Weights must total 100 before saving. Currently ${total > 100 ? 'over' : 'under'} by ${Math.abs(100 - total)}.`;
  const processed = Math.round((rescorePct / 100) * 83);

  return (
    <AdminLayout>
      <h1 style={{ fontWeight: 700, fontSize: 30, textTransform: 'uppercase', letterSpacing: '-.012em', margin: '0 0 6px' }}>Investment Score Model</h1>
      <p style={{ fontSize: 16.5, color: color.muted, margin: '0 0 26px', maxWidth: '66ch' }}>
        Change the weight of each of the five criteria without touching code. Weights must total 100. Saving re-scores every published property.
      </p>

      <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div style={{ flex: '1.4 1 360px', minWidth: 0, ...adminPanel, padding: 22 }}>
          {weights.map((w, i) => (
            <div key={w.key} style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '11px 0', borderBottom: `1px solid ${line(0.05)}`, flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 130px', minWidth: 0, fontSize: 16.5 }}>{w.label}</div>
              <input type="range" min={0} max={40} value={w.value} onChange={(e) => setWeight(i, parseInt(e.target.value, 10))} style={{ flex: '2 1 160px', minWidth: 120 }} />
              <div style={{ fontWeight: 700, width: 56, flex: 'none', textAlign: 'right', fontSize: 22, fontVariantNumeric: 'tabular-nums' }}>{w.value}%</div>
            </div>
          ))}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14, marginTop: 20, flexWrap: 'wrap' }}>
            <div>
              <span style={{ fontSize: 12, letterSpacing: '.18em', color: color.muted }}>TOTAL</span>
              <span style={{ fontWeight: 700, fontSize: 30, marginLeft: 12, fontVariantNumeric: 'tabular-nums', color: totalColor }}>{total}%</span>
            </div>
            <div style={{ display: 'flex', gap: 9 }}>
              <button onClick={resetWeights} style={{ border: `1px solid ${line(0.14)}`, borderRadius: 40, padding: '10px 16px', background: 'transparent', color: color.slate, fontSize: 15.5, cursor: 'pointer' }}>
                Reset
              </button>
              <button
                onClick={() =>
                  openModal({
                    title: 'Re-score every published property?',
                    body: 'All 83 published properties are re-scored with the new weights. Investors holding a changed property in a shortlist are notified.',
                    ok: 'Save and re-score',
                    run: () => startRescore(),
                  })
                }
                style={{ border: 0, borderRadius: 40, padding: '10px 18px', background: color.actionBright, color: '#fff', fontSize: 15.5, fontWeight: 600, cursor: 'pointer' }}
              >
                Save &amp; re-score
              </button>
            </div>
          </div>
          <div style={{ fontSize: 14, color: totalColor, marginTop: 10 }}>{totalNote}</div>

          {rescore === 'running' && (
            <div style={{ marginTop: 18, background: '#FFFFFF', border: '1px solid rgba(221,180,94,.3)', borderRadius: 12, padding: '16px 18px', boxShadow: '0 12px 34px rgba(23,75,103,.07)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline', marginBottom: 9 }}>
                <span style={{ fontSize: 15.5, fontWeight: 600, color: color.action }}>Re-scoring published properties</span>
                <span style={{ fontSize: 14, color: color.dim2, fontVariantNumeric: 'tabular-nums' }}>{processed} of 83</span>
              </div>
              <div style={{ height: 6, borderRadius: 4, background: line(0.1), overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: 4, background: color.gold, width: `${rescorePct}%` }} />
              </div>
              <div style={{ fontSize: 13.5, lineHeight: 1.6, color: color.muted, marginTop: 10 }}>
                Model v4 is already live for new properties. Existing scores update as each property is processed — you can leave this screen, the job continues.
              </div>
              <button onClick={() => setRescore('failed')} style={{ marginTop: 12, border: '1px solid rgba(197,86,79,.4)', borderRadius: 40, padding: '8px 14px', background: 'transparent', color: color.danger, fontSize: 13.5, cursor: 'pointer' }}>
                Preview a failure mid-run
              </button>
            </div>
          )}

          {rescore === 'done' && (
            <div style={{ marginTop: 18, background: 'rgba(32,90,135,.14)', border: '1px solid rgba(127,180,154,.35)', borderRadius: 12, padding: '16px 18px' }}>
              <div style={{ fontSize: 15.5, fontWeight: 600, color: color.success, marginBottom: 6 }}>83 properties re-scored</div>
              <p style={{ fontSize: 15.5, lineHeight: 1.6, color: color.dim2, margin: '0 0 12px' }}>
                Model v4 live since 17 Sep, 14:14. Average score moved +1.4. Eleven properties changed rank in default search results; investors holding those in a shortlist were notified.
              </p>
              <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap' }}>
                <button onClick={() => setRescore('idle')} style={smallGhost}>
                  Close
                </button>
                <button
                  onClick={() => {
                    setRescore('idle');
                    showToast('Rolled back to model v3');
                  }}
                  style={smallGhost}
                >
                  Revert to v3
                </button>
              </div>
            </div>
          )}

          {rescore === 'failed' && (
            <div style={{ marginTop: 18, background: 'rgba(197,86,79,.14)', border: '1px solid rgba(197,86,79,.42)', borderRadius: 12, padding: '16px 18px' }}>
              <div style={{ fontSize: 15.5, fontWeight: 600, color: color.danger, marginBottom: 6 }}>Re-score stopped after {processed} of 83</div>
              <p style={{ fontSize: 15.5, lineHeight: 1.6, color: color.dim2, margin: '0 0 12px' }}>
                The scoring service timed out. The {processed} properties already processed are on model v4; the rest are still on v3, so the catalogue is temporarily mixed. Retry or roll the whole batch back to v3.
              </p>
              <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap' }}>
                <button onClick={startRescore} style={{ border: 0, borderRadius: 40, padding: '9px 15px', background: color.actionBright, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                  Retry the remainder
                </button>
                <button
                  onClick={() => {
                    setRescore('idle');
                    showToast('Rolled back to model v3');
                  }}
                  style={{ border: '1px solid rgba(197,86,79,.45)', borderRadius: 40, padding: '9px 15px', background: 'transparent', color: color.danger, fontSize: 14, cursor: 'pointer' }}
                >
                  Roll back to v3
                </button>
              </div>
              <div style={{ fontSize: 13.5, color: color.muted, marginTop: 10 }}>Reference SCORE-9C04 · logged to the automation monitor</div>
            </div>
          )}
        </div>

        <div style={{ flex: '1 1 280px', minWidth: 0, ...adminPanel, padding: 22 }}>
          <div style={{ fontSize: 12, letterSpacing: '.18em', color: color.muted, marginBottom: 14 }}>IMPACT PREVIEW</div>
          <p style={{ fontSize: 15.5, lineHeight: 1.6, color: color.dim2, margin: '0 0 18px' }}>How the three properties on the front page would re-rank under the current weights.</p>
          {IMPACT_BASE.map((i) => {
            const now = Math.min(99, Math.round((i.was * total) / 100));
            return (
              <div key={i.name} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '12px 0', borderBottom: `1px solid ${line(0.05)}`, alignItems: 'baseline' }}>
                <div>
                  <div style={{ fontSize: 16.5 }}>{i.name}</div>
                  <div style={{ fontSize: 13.5, color: color.muted }}>was {i.was}/100</div>
                </div>
                <div style={{ fontWeight: 700, fontSize: 26, fontVariantNumeric: 'tabular-nums', color: now > i.was ? color.success : color.slate }}>{now}</div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}

const smallGhost = {
  border: `1px solid ${line(0.14)}`,
  borderRadius: 40,
  padding: '9px 15px',
  background: 'transparent',
  color: color.slate,
  fontSize: 14,
  cursor: 'pointer',
} as const;
