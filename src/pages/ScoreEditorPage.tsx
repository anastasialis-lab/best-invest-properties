import { AdminLayout, adminPanel } from '@/layouts/AdminLayout';
import { color, line } from '@/styles/theme';
import { SCORE_MODEL } from '@/data/listings';

// The five-criteria model: each criterion is scored 0, 1 or 2 points, and the
// five scores add up to a total out of 10. There are no weights to edit.
export function ScoreEditorPage() {
  return (
    <AdminLayout>
      <h1 style={{ fontWeight: 700, fontSize: 30, textTransform: 'uppercase', letterSpacing: '-.012em', margin: '0 0 6px' }}>Investment Score Model</h1>
      <p style={{ fontSize: 16.5, lineHeight: 1.6, color: color.muted, margin: '0 0 26px', maxWidth: '66ch' }}>
        Each criterion receives 0, 1 or 2 points. The five scores add up to a total of 10.
      </p>

      <div style={{ maxWidth: 860, ...adminPanel, padding: '8px 22px 4px' }}>
        {SCORE_MODEL.map((c) => (
          <div key={c.num} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '16px 0', borderBottom: `1px solid ${line(0.07)}` }}>
            <span style={{ flex: 'none', width: 28, fontWeight: 700, fontSize: 16, color: color.action, fontVariantNumeric: 'tabular-nums', paddingTop: 1 }}>{c.num}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 17, fontWeight: 600, color: color.slate }}>{c.label}</span>
                <span style={{ flex: 'none', fontSize: 14, fontWeight: 600, color: color.action, background: 'rgba(32,90,135,.08)', padding: '3px 10px', borderRadius: 40, fontVariantNumeric: 'tabular-nums' }}>
                  0–2 points
                </span>
              </div>
              <p style={{ margin: '6px 0 0', fontSize: 15, lineHeight: 1.6, color: color.dim2, maxWidth: '66ch' }}>{c.body}</p>
            </div>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, padding: '16px 0 14px' }}>
          <span style={{ fontSize: 12, letterSpacing: '.18em', color: color.muted }}>TOTAL INVESTMENT SCORE</span>
          <span style={{ fontWeight: 700, fontSize: 24, color: color.slate, fontVariantNumeric: 'tabular-nums' }}>0–10</span>
        </div>
      </div>
    </AdminLayout>
  );
}
