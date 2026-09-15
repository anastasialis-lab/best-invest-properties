import { Link } from 'react-router-dom';
import { color, font } from '@/styles/theme';
import { INVESTOR_FLOW, DEVELOPER_FLOW, JOURNEYS_NEXT, type FlowStepKind } from '@/data/content';

const INVESTOR_PALETTE: Record<FlowStepKind, [string, string, string]> = {
  step: ['#fff', 'rgba(14,42,74,.14)', '#0E2A4A'],
  you: ['#FBF3E0', 'rgba(184,137,43,.4)', '#8A6A22'],
  money: ['#0A1F38', '#0A1F38', '#E2B558'],
};

const DEV_PALETTE: Record<FlowStepKind, [string, string, string]> = {
  step: ['#fff', 'rgba(31,59,46,.16)', '#1F3B2E'],
  you: ['#FBF3E0', 'rgba(184,137,43,.4)', '#8A6A22'],
  money: ['#1F3B2E', '#1F3B2E', '#E7EFE9'],
};

function FlowColumn({
  label,
  title,
  accent,
  border,
  steps,
  palette,
}: {
  label: string;
  title: string;
  accent: string;
  border: string;
  steps: Array<[string, string, FlowStepKind?]>;
  palette: Record<FlowStepKind, [string, string, string]>;
}) {
  return (
    <div style={{ flex: '1 1 300px', minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 16 }}>
        <span style={{ fontSize: 10, letterSpacing: '.18em', color: accent }}>{label}</span>
        <span style={{ fontFamily: font.display, fontSize: 22, color: color.navy }}>{title}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {steps.map(([actor, text, kind], idx) => {
          const [bg, bd, fg] = palette[kind ?? 'step'];
          return (
            <div key={idx} style={{ display: 'flex', gap: 12, alignItems: 'stretch' }}>
              <div style={{ width: 76, flex: 'none', fontSize: 9.5, letterSpacing: '.1em', color: color.textFaint, paddingTop: 13, textAlign: 'right' }}>{actor}</div>
              <div style={{ width: 1, flex: 'none', background: border }} />
              <div style={{ flex: 1, minWidth: 0, background: bg, border: `1px solid ${bd}`, borderRadius: 7, padding: '11px 14px', fontSize: 13.5, color: fg }}>{text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function JourneysPage() {
  return (
    <div style={{ padding: '30px 28px 44px' }}>
      <Link to="/admin" style={{ display: 'inline-block', fontSize: 12.5, color: color.textFaint, marginBottom: 14 }}>
        ← Admin
      </Link>
      <h1 style={{ fontFamily: font.display, fontWeight: 400, fontSize: 32, color: color.navy, margin: '0 0 6px' }}>User Journeys</h1>
      <p style={{ fontSize: 13.5, color: color.textFaint, margin: '0 0 28px', maxWidth: '70ch' }}>
        Two flows for the development team: where a lead comes from, who touches it, and where money changes hands.
      </p>
      <div style={{ display: 'flex', gap: 26, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <FlowColumn label="FLOW A" title="Investor" accent={color.gold} border="rgba(14,42,74,.18)" steps={INVESTOR_FLOW} palette={INVESTOR_PALETTE} />
        <FlowColumn label="FLOW B" title="Developer" accent={color.approve} border="rgba(31,59,46,.2)" steps={DEVELOPER_FLOW} palette={DEV_PALETTE} />
      </div>
      <div style={{ marginTop: 32, background: '#fff', border: `1px solid ${color.border}`, borderRadius: 9, padding: '20px 22px' }}>
        <div style={{ fontSize: 10, letterSpacing: '.16em', color: color.textFaint, marginBottom: 10 }}>WHAT TO BUILD NEXT</div>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, lineHeight: 1.7, color: color.textMuted }}>
          {JOURNEYS_NEXT.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
