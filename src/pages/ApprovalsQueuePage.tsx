import { useNavigate } from 'react-router-dom';
import { AdminLayout, adminPanel } from '@/layouts/AdminLayout';
import { PreviewBar, StateChips } from '@/components/PreviewStates';
import { color, line } from '@/styles/theme';
import { useAppStore, type QueueOutcome } from '@/state/store';

const SUBMISSIONS = [
  {
    ref: 'PRJ-0044',
    dev: 'XYZ Developments',
    name: 'Coral Bay Residences — Phase II',
    meta: 'Paphos, Cyprus · 12 units · completion Q3 2027 · €168k–€310k',
    when: 'Submitted 16 Sep · 1 day in queue',
  },
  {
    ref: 'PRJ-0045',
    dev: 'Grupo Olivar',
    name: 'Casa Olivar',
    meta: 'Alicante, Spain · 9 units · completion Q1 2028 · €198k–€245k',
    when: 'Submitted 17 Sep · today',
  },
];

const VERIFICATIONS = [
  {
    ref: 'DEV-0031',
    country: 'Spain',
    name: 'Mediterráneo Living S.L.',
    meta: 'Licence and company registration uploaded · 2 of 4 checks done',
    when: 'Applied 15 Sep · 2 days in queue',
  },
];

const INTROS = [
  {
    ref: 'LEAD-0421',
    investor: 'Elena Markou · Cyprus resident',
    property: 'Coral Bay Residences · A-101',
    fit: 'Budget €150k–€180k · target net 5% · buy-to-let',
    dev: 'XYZ Developments',
    when: 'Requested 14 Sep',
  },
  {
    ref: 'LEAD-0422',
    investor: 'Jan Kowalski · Poland',
    property: 'Casa Olivar · unit TBC',
    fit: 'Budget €140k–€170k · target net 6% · off-plan accepted',
    dev: 'Grupo Olivar',
    when: 'Requested 15 Sep',
  },
];

const CHANGES = [
  { ref: 'CHG-0198', dev: 'XYZ Developments', what: 'Coral Bay Residences · B-301', detail: 'Price €236,000 → €240,000', when: '14 Sep · 2 days in queue' },
  { ref: 'CHG-0199', dev: 'XYZ Developments', what: 'Coral Bay Residences · A-102', detail: 'Availability Available → Reserved', when: '14 Sep · 2 days in queue' },
  { ref: 'CHG-0201', dev: 'Aegean Living', what: 'Marina Heights · 4 units', detail: 'Availability Available → Sold (bulk)', when: '15 Sep · today' },
];

const TABS = [
  { value: 'all' as const, label: 'All' },
  { value: 'subs' as const, label: 'Project submissions' },
  { value: 'apps' as const, label: 'Developer applications' },
  { value: 'intros' as const, label: 'Introductions' },
  { value: 'changes' as const, label: 'Listing changes' },
];

const goldBtn = {
  flex: 'none',
  border: 0,
  borderRadius: 40,
  padding: '11px 18px',
  background: color.gold,
  color: color.slate,
  fontSize: 15.5,
  fontWeight: 600,
  cursor: 'pointer',
} as const;

const sectionLabel = { fontSize: 12, letterSpacing: '.18em', color: color.muted, marginBottom: 16 } as const;
const meta12 = { fontSize: 12.5, letterSpacing: '.12em', color: color.muted, fontVariantNumeric: 'tabular-nums' } as const;
const stack = { display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 38 } as const;

function Outcome({ o, onUndo }: { o: QueueOutcome; onUndo: () => void }) {
  return (
    <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px solid ${line(0.05)}` }}>
      <div style={{ fontSize: 15.5, fontWeight: 600, color: o.fg, marginBottom: 5 }}>{o.title}</div>
      <p style={{ fontSize: 15.5, lineHeight: 1.65, color: color.dim2, margin: '0 0 10px', maxWidth: '70ch' }}>{o.body}</p>
      <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap', alignItems: 'center' }}>
        {o.emails.map((e) => (
          <span key={e} style={{ fontSize: 13.5, padding: '5px 10px', borderRadius: 4, background: line(0.05), color: color.dim2, border: `1px solid ${line(0.1)}` }}>
            ✉ {e}
          </span>
        ))}
        <button onClick={onUndo} style={{ border: 0, background: 'transparent', color: color.muted, fontSize: 14, cursor: 'pointer', padding: '0 4px', textDecoration: 'underline' }}>
          Undo
        </button>
      </div>
    </div>
  );
}

export function ApprovalsQueuePage() {
  const navigate = useNavigate();
  const { queueEmpty, setQueueEmpty, queueOut, setQueueOutcome, clearQueueOutcome, qTab, setQTab, openModal, showToast } = useAppStore();

  // Mirrors queueAct() in the prototype: confirm, record an outcome against the
  // reference, then toast. The reason typed in the modal is appended to the body.
  const act = (
    ref: string,
    cfg: {
      title: string;
      body: string;
      ok: string;
      tone?: 'danger' | 'gold' | 'ok';
      note?: string;
      needReason?: boolean;
      chip?: string;
      chipBg?: string;
      chipFg?: string;
      outTitle: string;
      outFg: string;
      outBody: string;
      emails: string[];
      toast: string;
    },
  ) =>
    openModal({
      title: cfg.title,
      body: cfg.body,
      ok: cfg.ok,
      tone: cfg.tone,
      note: cfg.note,
      needReason: cfg.needReason,
      run: (reason) => {
        setQueueOutcome(ref, {
          title: cfg.outTitle,
          fg: cfg.outFg,
          chip: cfg.chip,
          chipBg: cfg.chipBg,
          chipFg: cfg.chipFg,
          body: cfg.outBody + (reason ? ` Note sent: “${reason}”` : ''),
          emails: cfg.emails,
        });
        showToast(cfg.toast);
      },
    });

  const introWaiting = INTROS.filter((i) => !queueOut[i.ref]).length;
  const changeWaiting = CHANGES.filter((c) => !queueOut[c.ref]).length;

  const show = (key: 'subs' | 'apps' | 'intros' | 'changes') => qTab === 'all' || qTab === key;

  return (
    <AdminLayout>
      <div style={{ fontSize: 12, letterSpacing: '.2em', color: color.muted }}>GATEKEEPING</div>
      <h1 style={{ fontWeight: 700, fontSize: 28, textTransform: 'uppercase', letterSpacing: '-.012em', margin: '4px 0 8px' }}>Approvals queue</h1>

      <PreviewBar>
        <StateChips
          label="PREVIEW STATE"
          current={queueEmpty}
          onPick={setQueueEmpty}
          choices={[
            { value: false, label: 'Queue has work' },
            { value: true, label: 'Queue clear' },
          ]}
        />
      </PreviewBar>

      {queueEmpty ? (
        <div style={{ ...adminPanel, border: `1px dashed ${line(0.14)}`, padding: '34px 24px' }}>
          <div style={{ fontWeight: 600, letterSpacing: '-.006em', fontSize: 22, marginBottom: 8 }}>Queue clear</div>
          <p style={{ fontSize: 15.5, lineHeight: 1.65, color: color.dim2, margin: '0 0 4px', maxWidth: '62ch' }}>
            No project submissions, developer applications, introductions or listing changes are waiting. This is the normal state — new items appear here within a minute of a developer
            or investor acting.
          </p>
          <p style={{ fontSize: 15.5, lineHeight: 1.65, color: color.muted, margin: '0 0 18px', maxWidth: '62ch' }}>
            Last cleared 17 Sep, 13:58 · median time to decision this week 3h 20m · nothing has been waiting longer than a day in the past 30 days.
          </p>
          <button
            onClick={() => navigate('/admin/users')}
            style={{ border: `1px solid ${line(0.14)}`, borderRadius: 40, padding: '10px 16px', background: 'transparent', color: color.slate, fontSize: 15.5, cursor: 'pointer' }}
          >
            User management
          </button>
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 24, borderBottom: `1px solid ${line(0.1)}`, paddingBottom: 14 }}>
            {TABS.map((t) => {
              const on = qTab === t.value;
              return (
                <button
                  key={t.value}
                  onClick={() => setQTab(t.value)}
                  style={{
                    border: `1px solid ${on ? color.gold : line(0.14)}`,
                    borderRadius: 40,
                    padding: '7px 14px',
                    fontSize: 14,
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    background: on ? 'rgba(221,180,94,.16)' : 'transparent',
                    color: on ? color.link : color.dim2,
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          {show('subs') && (
            <div>
              <div style={sectionLabel}>NEW PROJECT SUBMISSIONS · 2 WAITING</div>
              <div style={stack}>
                {SUBMISSIONS.map((p) => (
                  <div key={p.ref} style={{ ...adminPanel, padding: '22px 24px', display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ flex: '1 1 260px', minWidth: 0 }}>
                      <div style={meta12}>
                        {p.ref} · {p.dev}
                      </div>
                      <div style={{ fontWeight: 600, letterSpacing: '-.006em', fontSize: 20, marginTop: 4 }}>{p.name}</div>
                      <div style={{ fontSize: 15.5, color: color.dim2, marginTop: 3 }}>{p.meta}</div>
                      <div style={{ fontSize: 14, color: color.muted, marginTop: 3 }}>{p.when}</div>
                    </div>
                    <button onClick={() => navigate('/admin/review')} style={goldBtn}>
                      Open review
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {show('apps') && (
            <div>
              <div style={sectionLabel}>DEVELOPER APPLICATIONS · 1 WAITING</div>
              <div style={stack}>
                {VERIFICATIONS.map((v) => (
                  <div key={v.ref} style={{ ...adminPanel, padding: '22px 24px', display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ flex: '1 1 260px', minWidth: 0 }}>
                      <div style={meta12}>
                        {v.ref} · {v.country}
                      </div>
                      <div style={{ fontWeight: 600, letterSpacing: '-.006em', fontSize: 20, marginTop: 4 }}>{v.name}</div>
                      <div style={{ fontSize: 15.5, color: color.dim2, marginTop: 3 }}>{v.meta}</div>
                      <div style={{ fontSize: 14, color: color.muted, marginTop: 3 }}>{v.when}</div>
                    </div>
                    <button onClick={() => navigate('/admin/verification')} style={goldBtn}>
                      Open verification
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {show('intros') && (
            <div>
              <div style={sectionLabel}>INVESTOR INTRODUCTIONS · {introWaiting} WAITING</div>
              <div style={stack}>
                {INTROS.map((i) => {
                  const o = queueOut[i.ref];
                  const who = i.investor.split(' · ')[0];
                  return (
                    <div key={i.ref} style={{ ...adminPanel, padding: '19px 20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap', alignItems: 'flex-start' }}>
                        <div style={{ minWidth: 0 }}>
                          <div style={meta12}>
                            {i.ref} · {i.when}
                          </div>
                          <div style={{ fontWeight: 600, letterSpacing: '-.006em', fontSize: 21, marginTop: 5 }}>{i.investor}</div>
                          <div style={{ fontSize: 15.5, color: color.dim2, marginTop: 4 }}>{i.property}</div>
                          <div style={{ fontSize: 15.5, color: color.muted, marginTop: 2 }}>{i.fit}</div>
                        </div>
                        <span
                          style={{
                            fontSize: 12.5,
                            letterSpacing: '.1em',
                            padding: '5px 10px',
                            borderRadius: 4,
                            background: o?.chipBg ?? 'rgba(221,180,94,.16)',
                            color: o?.chipFg ?? color.link,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {o?.chip ?? 'AWAITING YOU'}
                        </span>
                      </div>

                      {o ? (
                        <Outcome o={o} onUndo={() => clearQueueOutcome(i.ref)} />
                      ) : (
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: 12,
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            marginTop: 16,
                            paddingTop: 14,
                            borderTop: `1px solid ${line(0.05)}`,
                          }}
                        >
                          <div style={{ fontSize: 15.5, color: color.muted }}>
                            Would be introduced to <span style={{ color: color.slate }}>{i.dev}</span>
                          </div>
                          <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap' }}>
                            <button
                              onClick={() =>
                                act(i.ref, {
                                  title: 'Approve this introduction?',
                                  body: `Approving releases ${who}’s name, email and phone number to ${i.dev}, and emails both sides. Contact details cannot be recalled once sent.`,
                                  ok: 'Approve & connect',
                                  tone: 'ok',
                                  note: 'Logged against your admin account.',
                                  chip: 'CONNECTED',
                                  chipBg: 'rgba(32,90,135,.18)',
                                  chipFg: color.success,
                                  outTitle: 'Introduction made',
                                  outFg: color.success,
                                  outBody: `Connected 17 Sep, 14:21. Contact details released to ${i.dev}. The developer has five working days to make first contact.`,
                                  emails: ['Investor notified', 'Developer notified'],
                                  toast: 'Introduction made · both sides emailed',
                                })
                              }
                              style={{ border: 0, borderRadius: 40, padding: '10px 18px', background: color.action, color: '#fff', fontSize: 15.5, fontWeight: 600, cursor: 'pointer' }}
                            >
                              Approve &amp; connect
                            </button>
                            <button
                              onClick={() =>
                                act(i.ref, {
                                  title: 'Hold this introduction?',
                                  body: 'Nothing is sent to either side. The request stays in the queue with your note attached so whoever picks it up next knows why.',
                                  ok: 'Put on hold',
                                  tone: 'gold',
                                  needReason: true,
                                  chip: 'ON HOLD',
                                  chipBg: 'rgba(221,180,94,.16)',
                                  chipFg: color.link,
                                  outTitle: 'On hold — nobody has been emailed',
                                  outFg: color.gold,
                                  outBody: 'Held 17 Sep, 14:21 by M. Andreou. Neither the investor nor the developer has been contacted.',
                                  emails: [],
                                  toast: 'Introduction held · no emails sent',
                                })
                              }
                              style={{ border: `1px solid ${line(0.14)}`, borderRadius: 40, padding: '10px 18px', background: 'transparent', color: color.slate, fontSize: 15.5, cursor: 'pointer' }}
                            >
                              Hold
                            </button>
                            <button
                              onClick={() =>
                                act(i.ref, {
                                  title: 'Decline this introduction?',
                                  body: `The investor gets a neutral notice with three similar properties — no reason and no developer named. ${i.dev} only sees the filtered-out count. A reason is required for the audit log.`,
                                  ok: 'Decline',
                                  tone: 'danger',
                                  needReason: true,
                                  chip: 'DECLINED',
                                  chipBg: 'rgba(197,86,79,.18)',
                                  chipFg: color.danger,
                                  outTitle: 'Declined',
                                  outFg: color.danger,
                                  outBody: 'Declined 17 Sep, 14:21. No contact details were released.',
                                  emails: ['Investor notified'],
                                  toast: 'Introduction declined · investor emailed',
                                })
                              }
                              style={{ border: '1px solid rgba(197,86,79,.5)', borderRadius: 40, padding: '10px 18px', background: 'transparent', color: color.danger, fontSize: 15.5, cursor: 'pointer' }}
                            >
                              Decline
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {show('changes') && (
            <div>
              <div style={sectionLabel}>LISTING CHANGE REQUESTS · {changeWaiting} WAITING</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {CHANGES.map((c) => {
                  const o = queueOut[c.ref];
                  return (
                    <div key={c.ref} style={{ ...adminPanel, padding: '22px 24px' }}>
                      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center' }}>
                        <div style={{ flex: '1 1 240px', minWidth: 0 }}>
                          <div style={meta12}>
                            {c.ref} · {c.dev}
                          </div>
                          <div style={{ fontSize: 16.5, color: color.slate, marginTop: 4 }}>{c.what}</div>
                          <div style={{ fontSize: 15.5, color: color.action, marginTop: 3, fontVariantNumeric: 'tabular-nums' }}>{c.detail}</div>
                          <div style={{ fontSize: 14, color: color.muted, marginTop: 3 }}>{c.when}</div>
                        </div>
                        {!o && (
                          <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap', flex: 'none' }}>
                            <button
                              onClick={() =>
                                act(c.ref, {
                                  title: 'Approve this change?',
                                  body: `“${c.detail}” goes live on the public listing immediately and the developer is emailed.`,
                                  ok: 'Approve change',
                                  tone: 'ok',
                                  note: 'Logged against your admin account.',
                                  outTitle: 'Change approved and live',
                                  outFg: color.success,
                                  outBody: 'Applied 17 Sep, 14:21 by M. Andreou. The public listing now shows the new value.',
                                  emails: ['Developer notified'],
                                  toast: 'Change published · developer notified',
                                })
                              }
                              style={{ border: 0, borderRadius: 40, padding: '10px 18px', background: color.action, color: '#fff', fontSize: 15.5, fontWeight: 600, cursor: 'pointer' }}
                            >
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                act(c.ref, {
                                  title: 'Query this change?',
                                  body: 'The listing keeps its current value while you ask the developer for evidence. They are emailed your question.',
                                  ok: 'Send query',
                                  tone: 'gold',
                                  needReason: true,
                                  outTitle: 'Queried with the developer',
                                  outFg: color.gold,
                                  outBody: 'Sent 17 Sep, 14:21. The listing is unchanged until they reply.',
                                  emails: ['Developer notified'],
                                  toast: 'Query sent to the developer',
                                })
                              }
                              style={{ border: `1px solid ${line(0.14)}`, borderRadius: 40, padding: '10px 18px', background: 'transparent', color: color.slate, fontSize: 15.5, cursor: 'pointer' }}
                            >
                              Query
                            </button>
                            <button
                              onClick={() =>
                                act(c.ref, {
                                  title: 'Reject this change?',
                                  body: 'The listing keeps its current value and the developer is told why. A reason is required and stored in the audit log.',
                                  ok: 'Reject change',
                                  tone: 'danger',
                                  needReason: true,
                                  outTitle: 'Change rejected',
                                  outFg: color.danger,
                                  outBody: 'Rejected 17 Sep, 14:21. The public listing is unchanged.',
                                  emails: ['Developer notified'],
                                  toast: 'Change rejected · developer notified',
                                })
                              }
                              style={{ border: '1px solid rgba(197,86,79,.5)', borderRadius: 40, padding: '10px 18px', background: 'transparent', color: color.danger, fontSize: 15.5, cursor: 'pointer' }}
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                      {o && <Outcome o={o} onUndo={() => clearQueueOutcome(c.ref)} />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
}
