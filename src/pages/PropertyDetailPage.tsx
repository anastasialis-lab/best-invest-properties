import { useNavigate, useParams } from 'react-router-dom';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { PhotoSlot } from '@/components/PhotoSlot';
import { PreviewBar, StateChips } from '@/components/PreviewStates';
import { color, line, font } from '@/styles/theme';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useAppStore } from '@/state/store';
import { LISTINGS } from '@/data/listings';

const THUMBS = ['living room', 'kitchen', 'floor plan', 'location map'];

const FIN_ROWS = [
  { k: 'Property price', v: '€175,000', src: 'DEVELOPER FIGURE', dev: true },
  { k: 'Purchase costs — transfer, legal, fees', v: '€14,000', src: 'INDEPENDENT ESTIMATE' },
  { k: 'Total acquisition cost', v: '€189,000', src: 'CALCULATED', strong: true },
  { k: 'Expected annual rental income', v: '€13,600', src: 'INDEPENDENT ESTIMATE' },
  { k: 'Recurring costs — management, insurance, maintenance', v: '− €1,700', src: 'INDEPENDENT ESTIMATE' },
  { k: 'Vacancy allowance — 10% of rent', v: '− €1,360', src: 'ASSUMPTION' },
  { k: 'Estimated net rental income', v: '€10,540', src: 'CALCULATED', strong: true },
  { k: 'Gross yield on acquisition cost', v: '7.2%', src: 'CALCULATED' },
  { k: 'Net yield on acquisition cost', v: '5.6%', src: 'CALCULATED', strong: true },
];

const SRC_TAG_TONE: Record<string, { bg: string; fg: string }> = {
  SOURCE: { bg: 'rgba(32,90,135,.14)', fg: color.action },
  DEVELOPER: { bg: 'rgba(221,180,94,.22)', fg: color.goldDeep },
  ESTIMATE: { bg: 'rgba(23,75,103,.07)', fg: color.muted },
  GAP: { bg: 'rgba(197,86,79,.15)', fg: color.dangerDeep },
};

const SRC_ROWS = [
  { tag: 'SOURCE', body: 'Comparable long-let asking prices in the same Larnaca district, sampled from public listing portals.' },
  { tag: 'SOURCE', body: 'Published transfer fee, stamp duty and standard legal fee scales for Cyprus.' },
  { tag: 'DEVELOPER', body: 'Purchase price, unit size and completion date supplied by the developer and not independently verified.' },
  { tag: 'ESTIMATE', body: 'Management, insurance and maintenance modelled on district averages. Vacancy held at 10% of gross rent.' },
  { tag: 'GAP', body: 'No service charge schedule supplied for the building — recurring costs may be higher than modelled.' },
  { tag: 'GAP', body: 'No completed rental history: the project is pre-completion.' },
];

const FACT_SHEETS: Record<string, Array<{ k: string; v: string }>> = {
  Cyprus: [
    { k: 'Ownership by non-EU buyers', v: 'Permitted · Council of Ministers permit' },
    { k: 'Property transfer fees', v: '3–8% · waived where VAT applies' },
    { k: 'VAT on new build', v: '19% · 5% reduced rate on first home' },
    { k: 'Annual property tax', v: 'None · municipal rates only' },
    { k: 'Rental income tax', v: 'Progressive PIT + 3% defence levy' },
    { k: 'Title deed at completion', v: 'Yes · developer to deliver' },
  ],
  Spain: [
    { k: 'Ownership by non-EU buyers', v: 'Permitted · NIE number required' },
    { k: 'Transfer tax (resale)', v: '6–10% · set by region' },
    { k: 'VAT on new build', v: '10% + 1–1.5% stamp duty' },
    { k: 'Annual property tax', v: 'IBI · 0.4–1.1% of cadastral value' },
    { k: 'Rental income tax', v: '19% non-resident EU · 24% non-EU' },
    { k: 'Title registration', v: 'Notary deed + Land Registry' },
  ],
};

export function PropertyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { detailState, setDetailState, srcOpen, setSrcOpen, showToast } = useAppStore();

  const listing = LISTINGS.find((p) => p.id === id) ?? LISTINGS[0];
  const country = listing.location.split(', ')[1] ?? 'Cyprus';
  const factRows = FACT_SHEETS[country] ?? FACT_SHEETS.Cyprus;

  return (
    <div style={{ background: 'linear-gradient(180deg,#E5F6FF 0%,#EFF9FF 210px,#F7FCFF 430px)' }}>
      <SiteHeader />
      <div style={{ padding: isMobile ? '18px 18px 0' : '22px 28px 0' }}>
        <button onClick={() => navigate('/browse')} style={{ border: 0, background: 'transparent', fontSize: 15.5, color: color.faint, cursor: 'pointer', padding: '0 0 14px' }}>
          ← Back to results
        </button>
        <PreviewBar>
          <StateChips
            label="PREVIEW STATE"
            current={detailState}
            onPick={setDetailState}
            choices={[
              { value: 'ok' as const, label: 'Published' },
              { value: 'sent' as const, label: 'Enquiry sent' },
              { value: 'pending' as const, label: 'Analysis not ready' },
              { value: 'gone' as const, label: 'Withdrawn / 404' },
            ]}
          />
        </PreviewBar>
      </div>

      {detailState === 'gone' ? (
        <div style={{ padding: isMobile ? '10px 18px 46px' : '10px 28px 46px' }}>
          <div style={{ background: '#fff', border: `1px solid ${line(0.07)}`, borderRadius: 16, boxShadow: '0 12px 34px rgba(23,75,103,.07)', padding: '40px 30px', textAlign: 'center' }}>
            <div style={{ fontSize: 12, letterSpacing: '.18em', color: color.faint, marginBottom: 10 }}>LISTING NO LONGER AVAILABLE</div>
            <div style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-.012em', fontSize: 27, color: color.link, marginBottom: 10 }}>This property has been withdrawn</div>
            <p style={{ fontSize: 16.5, lineHeight: 1.65, color: color.body, margin: '0 auto 20px', maxWidth: '54ch' }}>
              The developer has taken it off the market or every unit is now sold. Properties with a similar yield and budget are still open to enquiries.
            </p>
            <div style={{ display: 'flex', gap: 9, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/browse')} style={{ border: 0, borderRadius: 40, padding: '12px 22px', background: color.actionBright, color: '#fff', fontSize: 15.5, fontWeight: 600, cursor: 'pointer', boxShadow: '0 10px 24px rgba(23,75,103,.22)' }}>
                See similar properties
              </button>
              <button onClick={() => navigate('/dashboard')} style={{ border: `1px solid ${line(0.18)}`, borderRadius: 40, padding: '12px 20px', background: 'transparent', color: color.link, fontSize: 15.5, cursor: 'pointer' }}>
                Go to my dashboard
              </button>
            </div>
            <div style={{ fontSize: 13.5, color: color.faint, marginTop: 16 }}>If you saved this property it stays in your shortlist, marked as withdrawn.</div>
          </div>
        </div>
      ) : (
        <div style={{ padding: isMobile ? '0 18px 34px' : '0 28px 34px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', alignItems: 'flex-end', marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 15.5, letterSpacing: '.06em', color: color.faint }}>{listing.location}</div>
              <div style={{ fontWeight: 700, fontSize: 42, color: color.link, lineHeight: 1.1, fontVariantNumeric: 'tabular-nums' }}>{listing.price}</div>
              <div style={{ fontSize: 16.5, color: color.body, marginTop: 4 }}>{listing.spec}</div>
            </div>
            <span style={{ fontSize: 11, letterSpacing: '.16em', fontWeight: 700, padding: '6px 11px', borderRadius: 4, background: color.navyDeep, color: color.gold }}>{listing.tag}</span>
          </div>

          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'stretch' }}>
            <div style={{ order: 2, flex: '1 1 360px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <PhotoSlot hint="Hero shot — exterior, golden hour" radius={16} aspect="auto" style={{ height: isMobile ? 240 : 360, aspectRatio: 'auto' }} />
              <div style={{ display: 'flex', gap: 10, overflowX: isMobile ? 'auto' : 'visible' }} className="bip-scroll">
                {THUMBS.map((t) => (
                  <div
                    key={t}
                    style={{
                      flex: '1 0 auto',
                      minWidth: isMobile ? 120 : 0,
                      height: 76,
                      borderRadius: 10,
                      backgroundImage: 'repeating-linear-gradient(135deg,#DCEEF9 0 8px,#E5F6FF 8px 16px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span style={{ fontFamily: font.mono, fontSize: 11, color: color.muted2, textAlign: 'center' }}>{t}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 4, background: '#fff', border: `1px solid ${line(0.07)}`, borderRadius: 16, boxShadow: '0 12px 34px rgba(23,75,103,.07)', padding: 20 }}>
                <div style={{ fontSize: 11.5, letterSpacing: '.2em', color: color.action, marginBottom: 6 }}>FACT SHEET</div>
                <div style={{ fontWeight: 600, letterSpacing: '-.006em', fontSize: 19, color: color.link, marginBottom: 3 }}>Fact Sheet — {country}</div>
                <div style={{ fontSize: 14, lineHeight: 1.55, color: color.faint, marginBottom: 14 }}>Law and investment basics for the country this property sits in.</div>
                {factRows.map((f) => (
                  <div key={f.k} style={{ display: 'flex', justifyContent: 'space-between', gap: 14, padding: '9px 0', borderBottom: `1px solid ${line(0.08)}`, fontSize: 16.5 }}>
                    <span style={{ minWidth: 0, color: color.body }}>{f.k}</span>
                    <span style={{ flex: 'none', maxWidth: '52%', textAlign: 'right', fontWeight: 600, color: color.link }}>{f.v}</span>
                  </div>
                ))}
                <div style={{ marginTop: 12, fontSize: 13.5, lineHeight: 1.55, color: color.faint }}>
                  Indicative figures for orientation only — to be confirmed with local legal and tax counsel before purchase.
                </div>
              </div>
            </div>

            <div style={{ order: 1, flex: '1 1 360px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ background: 'linear-gradient(142deg,#0C5A70 0%,#10476A 56%,#123F66 100%)', color: '#fff', borderRadius: 16, padding: '24px 22px', boxShadow: '0 18px 40px rgba(12,63,102,.22)' }}>
                <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'flex-end' }}>
                  <div style={{ flex: '1 1 140px', minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 58, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
                      {listing.score}
                      <span style={{ fontSize: 22, color: color.skyBright }}> / 100</span>
                    </div>
                    <div style={{ fontSize: 11.5, letterSpacing: '.2em', color: color.skyBright, margin: '10px 0 12px' }}>INVESTMENT SCORE</div>
                    <div style={{ display: 'inline-block', fontSize: 15.5, fontWeight: 600, color: color.navyDeep, background: color.gold, padding: '6px 14px', borderRadius: 4 }}>{listing.verdict}</div>
                  </div>
                  <div style={{ flex: '1 1 130px', minWidth: 0, display: 'grid', gap: 10 }}>
                    {[
                      { label: 'EST. GROSS YIELD', value: listing.gross },
                      { label: 'EST. NET YIELD', value: listing.net },
                    ].map((y) => (
                      <div key={y.label} style={{ background: 'rgba(255,255,255,.09)', borderRadius: 12, padding: '12px 14px' }}>
                        <div style={{ fontSize: 11.5, letterSpacing: '.16em', color: color.skyBright, marginBottom: 4 }}>{y.label}</div>
                        <div style={{ fontWeight: 700, fontSize: 26, lineHeight: 1.1, fontVariantNumeric: 'tabular-nums' }}>{y.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ fontSize: 13.5, lineHeight: 1.55, color: color.skyBright, marginTop: 14 }}>
                  Both yields are calculated on total acquisition cost, not on the purchase price alone.
                </div>
              </div>

              <div style={{ background: '#fff', border: `1px solid ${line(0.07)}`, borderRadius: 16, boxShadow: '0 12px 34px rgba(23,75,103,.07)', padding: 20 }}>
                <div style={{ fontWeight: 600, letterSpacing: '-.006em', fontSize: 19, color: color.link, marginBottom: 3 }}>Financial Overview</div>
                <div style={{ fontSize: 14, lineHeight: 1.55, color: color.faint, marginBottom: 14 }}>Gross and net yield are calculated on total acquisition cost.</div>
                {FIN_ROWS.map((r) => (
                  <div key={r.k} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '9px 0', borderBottom: `1px solid ${line(0.08)}`, fontSize: 16.5 }}>
                    <span style={{ minWidth: 0, color: color.body, fontWeight: r.strong ? 600 : 400 }}>
                      {r.k}
                      <span style={{ display: 'block', fontSize: 11.5, letterSpacing: '.12em', fontWeight: 400, color: r.dev ? color.action : color.faint, marginTop: 3 }}>{r.src}</span>
                    </span>
                    <span style={{ fontWeight: 600, color: color.link, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{r.v}</span>
                  </div>
                ))}

                <button
                  onClick={() => setSrcOpen(!srcOpen)}
                  style={{ width: '100%', marginTop: 14, border: `1px solid ${line(0.16)}`, borderRadius: 10, padding: '11px 12px', background: color.ground, color: color.body, fontSize: 15.5, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center' }}
                >
                  <span>Sources &amp; assumptions</span>
                  <span style={{ color: color.faint, fontSize: 16.5 }}>{srcOpen ? '▴' : '▾'}</span>
                </button>
                {srcOpen && (
                  <div style={{ border: `1px solid ${line(0.14)}`, borderTop: 0, borderRadius: '0 0 10px 10px', padding: '6px 13px 10px' }}>
                    {SRC_ROWS.map((s, i) => (
                      <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: `1px solid ${line(0.06)}` }}>
                        <span style={{ flex: 'none', fontSize: 11, letterSpacing: '.1em', fontWeight: 700, padding: '3px 7px', borderRadius: 4, background: SRC_TAG_TONE[s.tag].bg, color: SRC_TAG_TONE[s.tag].fg, height: 'fit-content' }}>
                          {s.tag}
                        </span>
                        <span style={{ minWidth: 0, fontSize: 13.5, lineHeight: 1.55, color: color.body }}>{s.body}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ marginTop: 12, background: color.sky, border: '1px solid rgba(221,180,94,.3)', borderRadius: 10, padding: '10px 12px', fontSize: 13.5, lineHeight: 1.55, color: color.body }}>
                  Preliminary assessment. Rental and cost figures are estimates drawn from open sources and comparable listings, not from verified accounts.
                </div>

                {detailState === 'sent' ? (
                  <div style={{ marginTop: 18, background: '#EEF4EF', border: '1px solid rgba(32,90,135,.3)', borderRadius: 7, padding: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'baseline', marginBottom: 7 }}>
                      <span style={{ fontSize: 16.5, fontWeight: 600, color: '#2A5C44' }}>Enquiry sent</span>
                      <span style={{ fontFamily: font.mono, fontSize: 13, color: '#4F7A63' }}>ENQ-0438</span>
                    </div>
                    <p style={{ fontSize: 15.5, lineHeight: 1.6, color: '#3C6B52', margin: '0 0 12px' }}>
                      We review the fit before contacting the developer. Your name and contact details stay with us until you approve the introduction. Expect an update within two working days.
                    </p>
                    <button onClick={() => navigate('/dashboard')} style={{ width: '100%', border: '1px solid rgba(32,90,135,.35)', borderRadius: 40, padding: 11, background: '#fff', color: '#2A5C44', fontSize: 15.5, fontWeight: 600, cursor: 'pointer' }}>
                      View in my enquiries
                    </button>
                  </div>
                ) : (
                  <>
                    {detailState === 'pending' ? (
                      <div style={{ marginTop: 18, background: color.sky, border: '1px solid rgba(221,180,94,.35)', borderRadius: 10, padding: '13px 14px' }}>
                        <div style={{ fontSize: 15.5, fontWeight: 600, color: color.link, marginBottom: 4 }}>Full analysis is being prepared</div>
                        <div style={{ fontSize: 14, lineHeight: 1.55, color: color.body }}>
                          The figures above are final. The written analysis is usually ready within one working day — we will email you when it is.
                        </div>
                      </div>
                    ) : (
                      <button onClick={() => navigate(`/property/${listing.id}/analysis`)} style={{ width: '100%', marginTop: 18, border: 0, borderRadius: 40, padding: 13, background: color.actionBright, color: '#fff', fontSize: 16.5, fontWeight: 600, cursor: 'pointer' }}>
                        Request Full Investment Analysis
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setDetailState('sent');
                        showToast('Enquiry sent · reference ENQ-0438');
                      }}
                      style={{ width: '100%', marginTop: 8, border: 0, borderRadius: 40, padding: 13, background: color.actionBright, color: '#fff', fontSize: 16.5, fontWeight: 600, cursor: 'pointer', boxShadow: '0 10px 24px rgba(23,75,103,.22)' }}
                    >
                      Register your interest
                    </button>
                  </>
                )}

                <button onClick={() => navigate('/calculator')} style={{ width: '100%', marginTop: 8, border: `1px solid ${line(0.18)}`, borderRadius: 40, padding: 12, background: 'transparent', color: color.link, fontSize: 15.5, fontWeight: 500, cursor: 'pointer' }}>
                  Open calculator
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isMobile && detailState !== 'gone' && (
        <div style={{ position: 'sticky', bottom: 0, left: 0, right: 0, background: '#fff', borderTop: `1px solid ${line(0.14)}`, boxShadow: '0 -10px 26px rgba(10,31,56,.1)', padding: '12px 16px', display: 'flex', gap: 10, alignItems: 'center', zIndex: 30 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 20, color: color.link, lineHeight: 1.1, fontVariantNumeric: 'tabular-nums' }}>{listing.price}</div>
            <div style={{ fontSize: 13.5, color: color.faint }}>
              {listing.net} net · {listing.score}/100
            </div>
          </div>
          <button
            onClick={() => {
              setDetailState('sent');
              showToast('Enquiry sent · reference ENQ-0438');
            }}
            style={{ flex: 'none', border: 0, borderRadius: 40, padding: '0 20px', height: 48, background: color.actionBright, color: '#fff', fontSize: 16.5, fontWeight: 600, cursor: 'pointer' }}
          >
            Register interest
          </button>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
