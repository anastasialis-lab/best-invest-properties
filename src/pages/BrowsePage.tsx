import { useNavigate } from 'react-router-dom';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { FilterPanel } from '@/components/FilterPanel';
import { PhotoSlot } from '@/components/PhotoSlot';
import { PreviewBar, StateChips } from '@/components/PreviewStates';
import { Button } from '@/components/Button';
import { color, line } from '@/styles/theme';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useAppStore, filteredListings, matchCount } from '@/state/store';
import type { Listing } from '@/data/listings';

const PAGE_SIZE = 8;
const BASIS: Record<string, string> = { net: 'BY NET YIELD', gross: 'BY GROSS YIELD', score: 'BY SCORE', price: 'BY PRICE' };
const RANK_NOTE: Record<string, string> = {
  net: 'Highest net yield of your matches',
  gross: 'Highest gross yield of your matches',
  score: 'Highest investment score of your matches',
  price: 'Lowest price of your matches',
};

// One listing still carries a pending model run in the prototype data.
const PENDING_SCORE = 'limassol';

function Skeletons({ cols }: { cols: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 16 }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} style={{ background: '#fff', border: `1px solid ${line(0.07)}`, borderRadius: 16, boxShadow: '0 12px 34px rgba(23,75,103,.07)', overflow: 'hidden' }}>
          <div style={{ height: 152, background: line(0.07) }} />
          <div style={{ padding: '15px 16px 17px', display: 'flex', flexDirection: 'column', gap: 9 }}>
            <div style={{ height: 10, width: '44%', borderRadius: 3, background: line(0.09) }} />
            <div style={{ height: 22, width: '62%', borderRadius: 4, background: line(0.11) }} />
            <div style={{ height: 10, width: '52%', borderRadius: 3, background: line(0.07) }} />
            <div style={{ height: 44, borderRadius: 10, background: line(0.05), marginTop: 4 }} />
            <div style={{ height: 38, borderRadius: 10, background: line(0.08) }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ResultCard({ p, rank, note, isMobile }: { p: Listing; rank?: number; note?: string; isMobile: boolean }) {
  const navigate = useNavigate();
  const { compare, savedProps, loggedIn, toggleCompare, toggleSave } = useAppStore();
  const city = p.location.split(',')[0];
  const inCompare = compare.includes(p.id);
  const saved = !!savedProps[p.id];
  const pending = p.id === PENDING_SCORE;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'minmax(0,260px) minmax(0,1fr)',
        gap: 18,
        background: '#fff',
        border: `1px solid ${line(0.07)}`,
        borderRadius: 16,
        boxShadow: '0 12px 34px rgba(23,75,103,.07)',
        padding: 14,
      }}
    >
      <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <PhotoSlot hint={`Drop a photo of ${p.location}`} radius={12} aspect={isMobile ? '16/10' : '4/3'} />
      </div>
      <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11, letterSpacing: '.14em', fontWeight: 700, padding: '6px 11px', borderRadius: 40, background: color.navyDeep, color: color.gold }}>{p.tag}</span>
          {rank && (
            <span
              style={{
                fontWeight: 700,
                minWidth: 28,
                height: 28,
                padding: '0 8px',
                borderRadius: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16.5,
                fontVariantNumeric: 'tabular-nums',
                background: rank <= 3 ? color.gold : line(0.08),
                color: rank <= 3 ? '#fff' : color.dim,
              }}
            >
              {rank}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.16em', color: color.link, textTransform: 'uppercase' }}>{p.location}</span>
          <span style={{ fontSize: 15.5, color: color.body }}>{p.spec}</span>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'stretch' }}>
          {[
            { label: 'PRICE', value: p.price },
            { label: 'INVESTMENT SCORE', value: pending ? '—' : p.score, suffix: pending ? '' : '/100' },
            { label: 'EST. NET YIELD', value: p.net },
          ].map((tile) => (
            <div key={tile.label} style={{ flex: '1 1 120px', minWidth: 0, background: color.ground, border: `1px solid ${line(0.08)}`, borderRadius: 11, padding: '8px 12px' }}>
              <div style={{ fontSize: 12, letterSpacing: '.12em', color: color.faint }}>{tile.label}</div>
              <div style={{ fontWeight: 700, fontSize: 20, color: color.link, lineHeight: 1.2, fontVariantNumeric: 'tabular-nums' }}>
                {tile.value}
                {tile.suffix && <span style={{ fontSize: 15.5, color: color.faint }}>{tile.suffix}</span>}
              </div>
            </div>
          ))}
        </div>

        {pending && (
          <div style={{ fontSize: 13, lineHeight: 1.5, color: color.body, background: color.sky, borderRadius: 12, padding: '8px 10px' }}>
            Score not yet calculated — figures verified, model run pending
          </div>
        )}
        {note && !pending && (
          <div style={{ fontSize: 13, lineHeight: 1.5, color: color.body, background: color.sky, borderRadius: 12, padding: '8px 10px' }}>{note}</div>
        )}

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 'auto' }}>
          <Button onClick={() => navigate(`/property/${p.id}`)} style={{ flex: '1 1 200px', padding: '13px 18px' }}>
            SEE THE ANALYSIS
          </Button>
          <button
            onClick={() => toggleSave(p.id, city)}
            title="Save to shortlist"
            style={{
              border: `1px solid ${saved && loggedIn ? 'rgba(221,180,94,.45)' : line(0.18)}`,
              borderRadius: 40,
              padding: '11px 16px',
              fontSize: 13.5,
              cursor: 'pointer',
              background: saved && loggedIn ? '#D3E5F2' : 'transparent',
              color: !loggedIn ? color.faint : saved ? color.action : color.dim,
            }}
          >
            {saved && loggedIn ? 'Saved' : 'Save'}
          </button>
          <button
            onClick={() => toggleCompare(p.id, city)}
            title="Add to compare"
            style={{
              border: `1px solid ${line(0.18)}`,
              borderRadius: 40,
              padding: '11px 16px',
              fontSize: 15.5,
              cursor: 'pointer',
              background: inCompare ? color.navy : 'transparent',
              color: inCompare ? '#fff' : color.dim,
            }}
          >
            {inCompare ? '✓' : '+'}
          </button>
        </div>
      </div>
    </div>
  );
}

export function BrowsePage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const state = useAppStore();
  const { browseState, sortBy, page, compare, cmpFull, drawerOpen, loggedIn } = state;

  const all = filteredListings(state);
  const total = matchCount(state);
  const pageTotal = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const shown = all.slice(start, start + PAGE_SIZE);
  const isEmpty = all.length === 0;

  const topFive = all.slice(0, 5);
  const topRank = new Map(topFive.map((p, i) => [p.id, i + 1]));

  const pageInfo = shown.length ? `Showing ${start + 1}–${start + shown.length} of ${total} properties` : 'No properties';

  return (
    <div>
      <SiteHeader />
      <div style={{ padding: isMobile ? '20px 18px 36px' : '26px 28px 40px', position: 'relative' }}>
        <PreviewBar>
          <StateChips
            label="PREVIEW STATE"
            current={browseState}
            onPick={state.setBrowseState}
            choices={[
              { value: 'ok' as const, label: 'Results' },
              { value: 'loading' as const, label: 'Loading' },
              { value: 'error' as const, label: 'Query failed' },
            ]}
          />
          <StateChips
            label="SESSION"
            current={loggedIn}
            onPick={state.setLoggedIn}
            accent={color.ink}
            choices={[
              { value: true, label: 'Signed in' },
              { value: false, label: 'Signed out' },
            ]}
          />
        </PreviewBar>

        {cmpFull && (
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', background: color.goldWash, border: '1px solid rgba(221,180,94,.4)', borderRadius: 12, padding: '12px 15px', marginBottom: 16 }}>
            <div style={{ fontSize: 15.5, lineHeight: 1.55, color: color.link, maxWidth: '62ch' }}>
              <b>Comparison is full.</b> Five properties is the limit — remove one before adding another.
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/compare')} style={{ border: 0, borderRadius: 40, padding: '9px 15px', background: color.actionBright, color: '#fff', fontSize: 15.5, fontWeight: 600, cursor: 'pointer' }}>
                Open comparison
              </button>
              <button onClick={() => useAppStore.setState({ cmpFull: false })} style={{ border: '1px solid rgba(221,180,94,.45)', borderRadius: 40, padding: '9px 13px', background: 'transparent', color: color.link, fontSize: 15.5, cursor: 'pointer' }}>
                Dismiss
              </button>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
          <h1 style={{ fontWeight: 700, fontSize: 30, textTransform: 'uppercase', letterSpacing: '-.012em', color: color.link, margin: '0 0 5px' }}>Investment Opportunities</h1>
          <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap', alignItems: 'center' }}>
            <select
              value={sortBy}
              onChange={(e) => state.setSortBy(e.target.value as typeof sortBy)}
              style={{ padding: '9px 11px', border: `1px solid ${line(0.18)}`, borderRadius: 10, background: '#fff', fontSize: 15.5 }}
            >
              <option value="net">Most profitable — net yield</option>
              <option value="gross">Gross yield</option>
              <option value="score">Investment score</option>
              <option value="price">Price — low to high</option>
            </select>
            <button onClick={() => navigate('/compare')} style={{ border: `1px solid ${line(0.18)}`, borderRadius: 40, padding: '9px 15px', background: '#fff', fontSize: 15.5, cursor: 'pointer' }}>
              Compare ({compare.length})
            </button>
          </div>
        </div>

        {isMobile && (
          <button
            onClick={() => state.setDrawerOpen(true)}
            style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, border: `1px solid ${line(0.18)}`, borderRadius: 40, padding: '14px 16px', background: '#fff', fontSize: 16.5, color: color.link, cursor: 'pointer', marginBottom: 16, minHeight: 48 }}
          >
            <span style={{ fontWeight: 600 }}>Filters</span>
            <span style={{ fontSize: 15.5, color: color.faint, fontVariantNumeric: 'tabular-nums' }}>{total} results</span>
          </button>
        )}

        <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {(!isMobile || drawerOpen) && (
            <div
              style={{
                flex: isMobile ? 'none' : '0 1 268px',
                minWidth: isMobile ? 'auto' : 236,
                position: isMobile ? 'fixed' : 'static',
                left: isMobile ? 12 : undefined,
                right: isMobile ? 12 : undefined,
                bottom: isMobile ? 12 : undefined,
                top: isMobile ? 12 : undefined,
                zIndex: isMobile ? 80 : undefined,
                maxHeight: isMobile ? 'calc(100vh - 24px)' : undefined,
                overflowY: isMobile ? 'auto' : undefined,
                boxShadow: isMobile ? '0 26px 60px rgba(10,31,56,.4)' : 'none',
                background: '#fff',
                border: `1px solid ${line(0.12)}`,
                borderRadius: 16,
                padding: 20,
                alignSelf: 'flex-start',
              }}
              className="bip-scroll"
            >
              <FilterPanel onClose={isMobile ? () => state.setDrawerOpen(false) : undefined} />
            </div>
          )}

          <div style={{ flex: '1 1 420px', minWidth: 0 }}>
            {browseState === 'loading' && <Skeletons cols={isMobile ? '1fr' : 'repeat(auto-fill,minmax(258px,1fr))'} />}

            {browseState === 'error' && (
              <div style={{ background: '#fff', border: '1px solid rgba(179,69,61,.3)', borderRadius: 16, padding: '36px 26px', textAlign: 'center' }}>
                <div style={{ fontWeight: 600, letterSpacing: '-.006em', fontSize: 22, color: color.dangerDeep, marginBottom: 8 }}>We could not load results</div>
                <p style={{ fontSize: 16.5, lineHeight: 1.6, color: color.body, margin: '0 auto 18px', maxWidth: '50ch' }}>
                  The search service did not respond. Your filters are kept — try again, or contact us if this keeps happening.
                </p>
                <div style={{ display: 'flex', gap: 9, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button onClick={() => state.setBrowseState('ok')} style={{ border: 0, borderRadius: 40, padding: '11px 20px', background: color.actionBright, color: '#fff', fontSize: 15.5, fontWeight: 600, cursor: 'pointer', boxShadow: '0 10px 24px rgba(23,75,103,.22)' }}>
                    Try again
                  </button>
                  <button onClick={() => navigate('/')} style={{ border: `1px solid ${line(0.18)}`, borderRadius: 40, padding: '11px 18px', background: 'transparent', color: color.link, fontSize: 15.5, cursor: 'pointer' }}>
                    Back to home
                  </button>
                </div>
              </div>
            )}

            {browseState === 'ok' && (
              <>
                {isEmpty && (
                  <div style={{ background: '#fff', border: `1px dashed ${line(0.24)}`, borderRadius: 16, padding: '40px 26px', textAlign: 'center' }}>
                    <div style={{ fontWeight: 600, letterSpacing: '-.006em', fontSize: 22, color: color.link, marginBottom: 8 }}>No properties match</div>
                    <p style={{ fontSize: 16.5, lineHeight: 1.6, color: color.body, margin: '0 auto', maxWidth: '44ch' }}>
                      Widen your criteria — lower the minimum yield, raise the budget, or add a country.
                    </p>
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {shown.map((p, i) => (
                    <ResultCard
                      key={p.id}
                      p={p}
                      rank={topRank.get(p.id)}
                      note={start + i === 0 ? RANK_NOTE[sortBy] : undefined}
                      isMobile={isMobile}
                    />
                  ))}
                </div>

                {!isEmpty && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginTop: 20, borderTop: `1px solid ${line(0.1)}`, paddingTop: 16 }}>
                    <div style={{ fontSize: 15.5, color: color.faint, fontVariantNumeric: 'tabular-nums' }}>{pageInfo}</div>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                      <button onClick={() => state.setPage(Math.max(1, page - 1))} style={pagerStyle}>
                        ←
                      </button>
                      {Array.from({ length: Math.min(pageTotal, 5) }, (_, i) => i + 1).map((n) => (
                        <button
                          key={n}
                          onClick={() => {
                            state.setPage(n);
                            window.scrollTo(0, 0);
                          }}
                          style={{
                            border: `1px solid ${page === n ? color.navy : line(0.16)}`,
                            borderRadius: 40,
                            minWidth: 40,
                            height: 40,
                            background: page === n ? color.navy : '#fff',
                            color: page === n ? '#fff' : color.dim,
                            fontSize: 15.5,
                            cursor: 'pointer',
                            fontVariantNumeric: 'tabular-nums',
                          }}
                        >
                          {n}
                        </button>
                      ))}
                      <span style={{ fontSize: 15.5, color: color.faint, padding: '0 4px' }}>of {pageTotal}</span>
                      <button
                        onClick={() => {
                          state.setPage(Math.min(pageTotal, page + 1));
                          window.scrollTo(0, 0);
                        }}
                        style={pagerStyle}
                      >
                        →
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {browseState === 'ok' && !isEmpty && (
            <aside
              style={{
                flex: isMobile ? '1 1 100%' : '1 1 250px',
                order: isMobile ? -1 : 0,
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                background: '#fff',
                border: `1px solid ${line(0.07)}`,
                borderRadius: 16,
                boxShadow: '0 12px 34px rgba(23,75,103,.07)',
                padding: 18,
                alignSelf: 'flex-start',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 }}>
                <span style={{ fontSize: 12, letterSpacing: '.16em', color: color.action }}>TOP 5 INVESTMENTS</span>
                <span style={{ fontSize: 12, letterSpacing: '.12em', color: color.faint }}>{BASIS[sortBy]}</span>
              </div>
              {topFive.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => navigate(`/property/${t.id}`)}
                  style={{ display: 'flex', gap: 12, alignItems: 'stretch', textAlign: 'left', width: '100%', border: `1px solid ${line(0.1)}`, borderRadius: 12, background: i === 0 ? color.sky : '#fff', padding: '11px 12px', cursor: 'pointer' }}
                >
                  <span
                    style={{
                      flex: 'none',
                      width: 30,
                      height: 30,
                      borderRadius: 40,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 15.5,
                      fontWeight: 700,
                      fontVariantNumeric: 'tabular-nums',
                      background: i === 0 ? color.gold : line(0.07),
                      color: color.navy,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'baseline' }}>
                      <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: color.link }}>{t.location}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: color.action, fontVariantNumeric: 'tabular-nums' }}>{t.score}</span>
                    </span>
                    <span style={{ fontSize: 16.5, fontWeight: 700, color: color.link, fontVariantNumeric: 'tabular-nums' }}>{t.price}</span>
                    <span style={{ display: 'flex', gap: 10, fontSize: 13.5, color: color.body, fontVariantNumeric: 'tabular-nums' }}>
                      <span>Gross {t.gross}</span>
                      <span>Net {t.net}</span>
                    </span>
                  </span>
                </button>
              ))}
            </aside>
          )}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

const pagerStyle = {
  border: `1px solid ${line(0.16)}`,
  borderRadius: 40,
  minWidth: 44,
  height: 40,
  padding: '0 12px',
  background: '#fff',
  color: color.body,
  fontSize: 15.5,
  cursor: 'pointer',
} as const;
