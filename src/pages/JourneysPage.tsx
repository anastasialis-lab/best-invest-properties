import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { color, line } from '@/styles/theme';

type Kind = 'step' | 'you' | 'money';
type Palette = Record<Kind, [string, string, string]>;

const INVESTOR_PALETTE: Palette = {
  step: ['#fff', line(0.14), color.navy],
  you: [color.goldWash, 'rgba(221,180,94,.4)', color.action],
  money: ['#1D3E56', '#1D3E56', color.gold],
};

const DEV_PALETTE: Palette = {
  step: ['#fff', 'rgba(32,90,135,.16)', color.actionDeep],
  you: [color.goldWash, 'rgba(221,180,94,.4)', color.action],
  money: [color.actionDeep, color.actionDeep, color.sky],
};

type Row = [actor: string, label: string, kind?: Kind];

const INVESTOR_FLOW: Row[] = [
  ['SOURCE', 'Google · LinkedIn · referral'],
  ['INVESTOR', 'Homepage'],
  ['INVESTOR', 'Search'],
  ['INVESTOR', 'Property detail'],
  ['INVESTOR', 'Investment analysis'],
  ['INVESTOR', 'Compare'],
  ['INVESTOR', 'Register'],
  ['INVESTOR', 'Requests information'],
  ['YOU', 'You receive the lead', 'you'],
  ['YOU', 'You qualify the investor', 'you'],
  ['DEVELOPER', 'Developer receives qualified lead'],
  ['DEVELOPER', 'Viewing'],
  ['DEVELOPER', 'Reservation'],
  ['DEVELOPER', 'Purchase'],
  ['MONEY', 'Developer pays commission to you', 'money'],
];

const DEVELOPER_FLOW: Row[] = [
  ['YOU', 'You contact the developer', 'you'],
  ['DEVELOPER', 'Developer registers'],
  ['DEVELOPER', 'Uploads project'],
  ['YOU', 'You review', 'you'],
  ['YOU', 'You analyse', 'you'],
  ['YOU', 'You approve', 'you'],
  ['PLATFORM', 'Property goes live'],
  ['INVESTOR', 'Investor enquiry'],
  ['YOU', 'You receive the lead', 'you'],
  ['DEVELOPER', 'Developer receives the lead'],
  ['MONEY', 'Sale', 'money'],
];

function Flow({ rows, palette, actorColor, rail }: { rows: Row[]; palette: Palette; actorColor: string; rail: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {rows.map(([actor, label, kind], i) => {
        const [bg, border, fg] = palette[kind ?? 'step'];
        return (
          <div key={`${label}-${i}`} style={{ display: 'flex', gap: 12, alignItems: 'stretch' }}>
            <div style={{ width: 76, flex: 'none', fontSize: 11.5, letterSpacing: '.1em', color: actorColor, paddingTop: 13, textAlign: 'right' }}>{actor}</div>
            <div style={{ width: 1, flex: 'none', background: rail }} />
            <div style={{ flex: 1, minWidth: 0, background: bg, border: `1px solid ${border}`, borderRadius: 7, padding: '11px 14px', fontSize: 16.5, color: fg }}>{label}</div>
          </div>
        );
      })}
    </div>
  );
}

export function JourneysPage() {
  return (
    <>
      <SiteHeader />
      <div style={{ padding: '30px 28px 44px' }}>
        <h1 style={{ fontWeight: 700, fontSize: 32, textTransform: 'uppercase', letterSpacing: '-.012em', color: color.link, margin: '0 0 6px' }}>User Journeys</h1>
        <p style={{ fontSize: 16.5, color: color.faint, margin: '0 0 28px', maxWidth: '70ch' }}>
          Two flows for the development team: where a lead comes from, who touches it, and where money changes hands.
        </p>

        <div style={{ display: 'flex', gap: 26, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 300px', minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 12, letterSpacing: '.18em', color: color.action }}>FLOW A</span>
              <span style={{ fontWeight: 600, letterSpacing: '-.006em', fontSize: 22, color: color.link }}>Investor</span>
            </div>
            <Flow rows={INVESTOR_FLOW} palette={INVESTOR_PALETTE} actorColor={color.faint} rail="rgba(23,75,103,.18)" />
          </div>

          <div style={{ flex: '1 1 300px', minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 12, letterSpacing: '.18em', color: color.action }}>FLOW B</span>
              <span style={{ fontWeight: 600, letterSpacing: '-.006em', fontSize: 22, color: color.actionDeep }}>Developer</span>
            </div>
            <Flow rows={DEVELOPER_FLOW} palette={DEV_PALETTE} actorColor={color.muted2} rail="rgba(32,90,135,.2)" />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginTop: 32 }}>
          <div style={{ flex: '1 1 320px', minWidth: 0, background: '#fff', border: `1px solid ${line(0.07)}`, borderRadius: 16, boxShadow: '0 12px 34px rgba(23,75,103,.07)', padding: '20px 22px' }}>
            <div style={{ fontSize: 12, letterSpacing: '.16em', color: color.faint, marginBottom: 10 }}>STILL OPEN</div>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 16.5, lineHeight: 1.7, color: color.body }}>
              <li>Decide where the rental estimate comes from — the calculator needs one credible source before launch.</li>
              <li>Commission tracking, so the transaction step in Flow A has a home in admin.</li>
            </ul>
          </div>
          <div style={{ flex: '1 1 320px', minWidth: 0, background: '#F3F7F3', border: '1px solid rgba(32,90,135,.24)', borderRadius: 16, padding: '20px 22px' }}>
            <div style={{ fontSize: 12, letterSpacing: '.16em', color: color.action, marginBottom: 10 }}>CONFIRMED</div>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 16.5, lineHeight: 1.7, color: '#3E5748' }}>
              <li>
                Developer name and contacts stay hidden on listings; the listing reads «Introduced by Best Invest» and every introduction is approved by admin first.
              </li>
              <li>After publication developers may change price and availability only (Available / Reserved / Sold); each change waits for admin approval.</li>
              <li>
                A declined introduction shows the investor a neutral «not available at the moment» notice with three similar properties, no reason given; the developer sees only a
                filtered-out count.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
