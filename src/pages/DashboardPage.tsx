import { useNavigate } from 'react-router-dom';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { PhotoSlot } from '@/components/PhotoSlot';
import { PreviewBar, StateChips } from '@/components/PreviewStates';
import { color, line } from '@/styles/theme';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useAppStore } from '@/state/store';
import { LISTINGS } from '@/data/listings';

const PROFILE = [
  { k: 'Budget', v: '€150–200k' },
  { k: 'Target yield', v: '6%+' },
  { k: 'Preferred countries', v: 'Cyprus / Spain' },
  { k: 'Strategy', v: 'Long-term rental' },
];

const ENQUIRIES = [
  { name: 'Larnaca 1BR', status: 'Developer contacted', bg: '#E8F0E9', fg: color.action },
  { name: 'Alicante 2BR', status: 'Awaiting analysis', bg: '#D3E5F2', fg: color.action },
  { name: 'Paphos 1BR', status: 'Not available', bg: color.panel, fg: color.faint },
];

const DECLINE_ALTS = [
  { name: 'Larnaca 1BR — Mackenzie', meta: '77/100 · 7.2%' },
  { name: 'Alicante 2BR — Playa San Juan', meta: '84/100 · 6.5%' },
  { name: 'Limassol 1BR — Zakaki', meta: '82/100 · 6.9%' },
];

const panel = { background: '#fff', border: `1px solid ${line(0.07)}`, borderRadius: 16, boxShadow: '0 12px 34px rgba(23,75,103,.07)' } as const;

function YieldTile({ label, value, sub, gold }: { label: string; value: string | number; sub?: string; gold?: boolean }) {
  return (
    <div
      style={{
        flex: 'none',
        width: 96,
        height: 96,
        borderRadius: 14,
        padding: '13px 14px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 7,
        background: gold ? color.goldWash : 'rgba(255,255,255,.78)',
        border: `1px solid ${gold ? 'rgba(221,180,94,.55)' : line(0.1)}`,
      }}
    >
      <div style={{ fontSize: 10.5, letterSpacing: '.1em', color: color.faint, lineHeight: 1.25 }}>{label}</div>
      <div style={{ fontWeight: 700, fontSize: 24, color: color.link, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
        {value}
        {sub && <span style={{ fontSize: 15, color: color.faint }}>{sub}</span>}
      </div>
    </div>
  );
}

export function DashboardPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { dashState, setDashState, savedList, removingSaved, askRemoveSaved, confirmRemoveSaved } = useAppStore();
  const isEmpty = dashState === 'empty';
  const recommended = LISTINGS.slice(0, 3);

  return (
    <div>
      <SiteHeader />
      <div style={{ padding: isMobile ? '22px 18px 36px' : '30px 28px 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 18, flexWrap: 'wrap', alignItems: 'flex-end', marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 15.5, color: color.faint }}>Welcome back</div>
            <h1 style={{ fontWeight: 700, fontSize: 32, textTransform: 'uppercase', letterSpacing: '-.012em', color: color.link, margin: '3px 0 0' }}>Martin Kruger</h1>
          </div>
          <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap', alignItems: 'center' }}>
            <button onClick={() => navigate('/browse')} style={{ border: 0, borderRadius: 40, padding: '11px 20px', background: color.actionBright, color: '#fff', fontSize: 15.5, fontWeight: 600, cursor: 'pointer' }}>
              Refine my criteria
            </button>
            <button onClick={() => navigate('/settings')} style={{ border: `1px solid ${line(0.18)}`, borderRadius: 40, padding: '11px 18px', background: '#fff', color: color.link, fontSize: 15.5, cursor: 'pointer' }}>
              Account settings
            </button>
          </div>
        </div>

        <PreviewBar>
          <StateChips
            label="PREVIEW STATE"
            current={dashState}
            onPick={setDashState}
            choices={[
              { value: 'full' as const, label: 'Active investor' },
              { value: 'empty' as const, label: 'First day — nothing yet' },
            ]}
          />
        </PreviewBar>

        <div style={{ ...panel, padding: 22, marginBottom: 24 }}>
          <div style={{ fontSize: 12, letterSpacing: '.16em', color: color.faint, marginBottom: 16 }}>YOUR INVESTMENT PROFILE</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 18 }}>
            {PROFILE.map((p) => (
              <div key={p.k}>
                <div style={{ fontSize: 14, color: color.faint, marginBottom: 4 }}>{p.k}</div>
                <div style={{ fontWeight: 600, letterSpacing: '-.006em', fontSize: 21, color: color.link }}>{p.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 14, margin: '12px 0 18px' }}>
          <h2 style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-.012em', fontSize: 24, color: color.link, margin: 0 }}>Recommended for you</h2>
          <span style={{ fontSize: 15.5, color: color.faint }}>{isEmpty ? 'none yet' : '3 properties'}</span>
        </div>

        {isEmpty ? (
          <div style={{ background: '#fff', border: `1px dashed ${line(0.22)}`, borderRadius: 16, padding: '32px 24px', marginBottom: 30 }}>
            <div style={{ fontWeight: 600, letterSpacing: '-.006em', fontSize: 21, color: color.link, marginBottom: 7 }}>No matches yet</div>
            <p style={{ fontSize: 16.5, lineHeight: 1.6, color: color.body, margin: '0 0 16px', maxWidth: '62ch' }}>
              Your criteria are saved. Nothing currently published clears a 6% target yield in your budget — we will email you as soon as something does, usually within two weeks.
            </p>
            <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/browse')} style={{ border: 0, borderRadius: 40, padding: '11px 18px', background: color.actionBright, color: '#fff', fontSize: 15.5, fontWeight: 600, cursor: 'pointer' }}>
                Widen my criteria
              </button>
              <button onClick={() => navigate('/browse')} style={{ border: `1px solid ${line(0.18)}`, borderRadius: 40, padding: '11px 18px', background: '#fff', color: color.link, fontSize: 15.5, cursor: 'pointer' }}>
                Browse everything published
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 34 }}>
            {recommended.map((p, i) => (
              <div key={p.id} style={{ position: 'relative', overflow: 'hidden', display: 'flex', gap: 26, alignItems: 'center', flexWrap: 'wrap', ...panel, padding: '28px 26px 24px' }}>
                <div style={{ position: 'absolute', inset: -32, filter: 'blur(20px)', opacity: 0.75 }}>
                  <PhotoSlot hint="" radius={0} aspect="auto" style={{ height: '100%', aspectRatio: 'auto' }} />
                </div>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg,rgba(255,255,255,.94) 0%,rgba(255,255,255,.84) 52%,rgba(240,250,255,.66) 100%)' }} />
                <span style={{ position: 'relative', flex: 'none', width: 36, height: 36, borderRadius: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: color.gold, color: color.ink, fontWeight: 700, fontSize: 18, fontVariantNumeric: 'tabular-nums' }}>
                  {i + 1}
                </span>
                <div style={{ position: 'relative', flex: '0 1 auto', minWidth: 170, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 10.5, letterSpacing: '.14em', fontWeight: 700, padding: '6px 12px', borderRadius: 40, background: color.navyDeep, color: color.gold }}>{p.tag}</span>
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: color.faint }}>{p.location}</div>
                  <div style={{ fontWeight: 700, fontSize: 25, color: color.link, lineHeight: 1.15, fontVariantNumeric: 'tabular-nums' }}>{p.price}</div>
                  <div style={{ fontSize: 15, color: color.body }}>{p.spec}</div>
                </div>
                <div style={{ position: 'relative', flex: 'none', display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                  <YieldTile label="GROSS YIELD" value={p.gross} gold />
                  <YieldTile label="NET YIELD" value={p.net} gold />
                  <YieldTile label="SCORE" value={p.score} sub="/100" />
                </div>
                <button
                  onClick={() => navigate(`/property/${p.id}`)}
                  style={{ position: 'relative', flex: 'none', marginLeft: 'auto', border: 0, borderRadius: 40, padding: '15px 26px', background: color.actionBright, color: '#fff', fontSize: 12.5, fontWeight: 700, letterSpacing: '.14em', cursor: 'pointer', whiteSpace: 'nowrap', boxShadow: '0 10px 24px rgba(23,75,103,.22)' }}
                >
                  VIEW INVESTMENT
                </button>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 280px', minWidth: 0, ...panel, padding: 20 }}>
            <div style={{ fontWeight: 600, letterSpacing: '-.006em', fontSize: 20, color: color.link, marginBottom: 14 }}>Saved Investments</div>
            {isEmpty ? (
              <div style={{ border: `1px dashed ${line(0.2)}`, borderRadius: 7, padding: '20px 18px' }}>
                <div style={{ fontSize: 16.5, fontWeight: 600, color: color.link, marginBottom: 5 }}>Nothing saved yet</div>
                <p style={{ fontSize: 15.5, lineHeight: 1.6, color: color.body, margin: '0 0 13px' }}>Use Save on any property to keep it here and get told when its price or availability changes.</p>
                <button onClick={() => navigate('/browse')} style={{ border: `1px solid ${line(0.18)}`, borderRadius: 40, padding: '9px 15px', background: '#fff', color: color.link, fontSize: 15.5, fontWeight: 500, cursor: 'pointer' }}>
                  Find properties
                </button>
              </div>
            ) : savedList.length === 0 ? (
              <div style={{ fontSize: 15.5, lineHeight: 1.6, color: color.faint, padding: '8px 0' }}>You removed everything from your shortlist. Saved properties reappear here.</div>
            ) : (
              savedList.map((s, i) => (
                <div key={s.name} style={{ borderBottom: `1px solid ${line(0.08)}`, padding: '11px 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', fontSize: 16.5 }}>
                    <span style={{ color: color.link, minWidth: 0 }}>{s.name}</span>
                    <span style={{ display: 'flex', gap: 10, alignItems: 'center', flex: 'none' }}>
                      <span style={{ color: color.faint, fontVariantNumeric: 'tabular-nums' }}>{s.meta}</span>
                      <button onClick={() => askRemoveSaved(i)} title="Remove from saved" style={{ border: `1px solid ${line(0.14)}`, borderRadius: 40, width: 26, height: 26, background: '#fff', color: '#7C93A5', fontSize: 14, lineHeight: 1, cursor: 'pointer' }}>
                        ✕
                      </button>
                    </span>
                  </div>
                  {removingSaved === i && (
                    <div style={{ display: 'flex', gap: 9, alignItems: 'center', flexWrap: 'wrap', background: color.ground, border: `1px solid ${line(0.12)}`, borderRadius: 10, padding: '10px 12px', marginTop: 9 }}>
                      <span style={{ fontSize: 15.5, color: color.body, flex: '1 1 180px', minWidth: 0 }}>Remove this from your saved list? You will stop getting price and availability alerts for it.</span>
                      <button onClick={confirmRemoveSaved} style={{ border: 0, borderRadius: 40, padding: '8px 14px', background: color.dangerDeep, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                        Remove
                      </button>
                      <button onClick={() => askRemoveSaved(null)} style={{ border: `1px solid ${line(0.18)}`, borderRadius: 40, padding: '8px 14px', background: '#fff', color: color.link, fontSize: 14, cursor: 'pointer' }}>
                        Keep it
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          <div style={{ flex: '1 1 280px', minWidth: 0, ...panel, padding: 20 }}>
            <div style={{ fontWeight: 600, letterSpacing: '-.006em', fontSize: 20, color: color.link, marginBottom: 14 }}>My Enquiries</div>
            {isEmpty ? (
              <div style={{ border: `1px dashed ${line(0.2)}`, borderRadius: 7, padding: '20px 18px' }}>
                <div style={{ fontSize: 16.5, fontWeight: 600, color: color.link, marginBottom: 5 }}>No enquiries yet</div>
                <p style={{ fontSize: 15.5, lineHeight: 1.6, color: color.body, margin: 0 }}>
                  When you register interest in a property it appears here with its status. Your details are never passed to a developer until you approve the introduction.
                </p>
              </div>
            ) : (
              <>
                {ENQUIRIES.map((e) => (
                  <div key={e.name} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '11px 0', borderBottom: `1px solid ${line(0.08)}`, fontSize: 16.5, alignItems: 'center' }}>
                    <span style={{ color: color.link }}>{e.name}</span>
                    <span style={{ fontSize: 13.5, padding: '4px 9px', borderRadius: 4, background: e.bg, color: e.fg }}>{e.status}</span>
                  </div>
                ))}
                <div style={{ marginTop: 16, background: color.ground, border: `1px solid ${line(0.1)}`, borderRadius: 7, padding: '15px 16px' }}>
                  <div style={{ fontSize: 16.5, color: color.link, fontWeight: 500, marginBottom: 5 }}>Paphos 1BR — Sea Gardens</div>
                  <p style={{ fontSize: 15.5, lineHeight: 1.6, color: color.body, margin: '0 0 12px' }}>
                    This introduction is not available at the moment. Three properties with a similar profile are open to enquiries.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 12 }}>
                    {DECLINE_ALTS.map((a) => (
                      <div key={a.name} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, fontSize: 15.5, color: color.body, fontVariantNumeric: 'tabular-nums' }}>
                        <span style={{ color: color.link }}>{a.name}</span>
                        <span>{a.meta}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => navigate('/browse')} style={{ border: `1px solid ${line(0.18)}`, borderRadius: 40, padding: '9px 16px', background: '#fff', color: color.link, fontSize: 15.5, fontWeight: 500, cursor: 'pointer' }}>
                    See similar properties
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
