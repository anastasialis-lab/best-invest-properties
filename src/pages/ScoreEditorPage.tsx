import { Link } from 'react-router-dom';
import { AdminLayout } from '@/layouts/AdminLayout';
import { color, font } from '@/styles/theme';
import { useAppStore } from '@/state/store';

const IMPACT_BASE = [
  { name: 'Paphos 1BR', was: 89 },
  { name: 'Larnaca 1BR', was: 87 },
  { name: 'Alicante 2BR', was: 84 },
];

export function ScoreEditorPage() {
  const { weights, setWeight, resetWeights } = useAppStore();
  const total = weights.reduce((a, w) => a + w.value, 0);
  const ok = total === 100;
  const totalColor = ok ? color.approveLight : color.goldLight;
  const totalNote = ok
    ? 'Weights balance. Saving will re-score 83 published properties.'
    : `Weights must total 100 before saving. Currently ${total > 100 ? 'over' : 'under'} by ${Math.abs(100 - total)}.`;

  return (
    <AdminLayout>
      <div style={{ marginBottom: 12 }}>
        <Link to="/admin" style={{ fontSize: 12.5, color: color.adminMuted }}>
          ← Admin
        </Link>
      </div>
      <h1 style={{ fontFamily: font.display, fontWeight: 400, fontSize: 30, margin: '0 0 6px' }}>Investment Score Model</h1>
      <p style={{ fontSize: 13.5, color: color.adminMuted, margin: '0 0 26px', maxWidth: '66ch' }}>
        Change the weight of each criterion without touching code. Weights must total 100. Saving re-scores every published property.
      </p>

      <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div style={{ flex: '1.4 1 360px', minWidth: 0, background: color.adminCard, border: `1px solid ${color.adminBorder}`, borderRadius: 9, padding: 22 }}>
          {weights.map((w, i) => (
            <div key={w.key} style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '11px 0', borderBottom: '1px solid rgba(255,255,255,.06)', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 130px', minWidth: 0, fontSize: 13.5 }}>{w.label}</div>
              <input
                type="range"
                min={0}
                max={40}
                value={w.value}
                onChange={(e) => setWeight(i, parseInt(e.target.value, 10))}
                style={{ flex: '2 1 160px', minWidth: 120 }}
              />
              <div style={{ fontFamily: font.display, width: 56, flex: 'none', textAlign: 'right', fontSize: 22, fontVariantNumeric: 'tabular-nums' }}>{w.value}%</div>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14, marginTop: 20, flexWrap: 'wrap' }}>
            <div>
              <span style={{ fontSize: 10, letterSpacing: '.18em', color: color.adminMuted }}>TOTAL</span>
              <span style={{ fontFamily: font.display, fontSize: 30, marginLeft: 12, fontVariantNumeric: 'tabular-nums', color: totalColor }}>{total}%</span>
            </div>
            <div style={{ display: 'flex', gap: 9 }}>
              <button onClick={resetWeights} style={{ border: `1px solid ${color.adminBorder2}`, borderRadius: 6, padding: '10px 16px', background: 'transparent', color: color.adminText, fontSize: 12.5, cursor: 'pointer' }}>
                Reset
              </button>
              <button style={{ border: 0, borderRadius: 6, padding: '10px 18px', background: color.gold, color: '#fff', fontSize: 12.5, fontWeight: 600, cursor: 'pointer' }}>Save &amp; re-score</button>
            </div>
          </div>
          <div style={{ fontSize: 12, color: totalColor, marginTop: 10 }}>{totalNote}</div>
        </div>

        <div style={{ flex: '1 1 280px', minWidth: 0, background: color.adminCard, border: `1px solid ${color.adminBorder}`, borderRadius: 9, padding: 22 }}>
          <div style={{ fontSize: 10, letterSpacing: '.18em', color: color.adminMuted, marginBottom: 14 }}>IMPACT PREVIEW</div>
          <p style={{ fontSize: 12.5, lineHeight: 1.6, color: color.adminMuted2, margin: '0 0 18px' }}>
            How the three properties on the front page would re-rank under the current weights.
          </p>
          {IMPACT_BASE.map((i) => {
            const now = Math.min(99, Math.round(i.was * (total / 100)));
            return (
              <div key={i.name} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,.06)', alignItems: 'baseline' }}>
                <div>
                  <div style={{ fontSize: 13.5 }}>{i.name}</div>
                  <div style={{ fontSize: 11.5, color: color.adminMuted }}>was {i.was}/100</div>
                </div>
                <div style={{ fontFamily: font.display, fontSize: 26, fontVariantNumeric: 'tabular-nums', color: color.adminText }}>{now}</div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
