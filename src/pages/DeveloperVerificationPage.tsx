import { useNavigate } from 'react-router-dom';
import { AdminLayout, adminPanel } from '@/layouts/AdminLayout';
import { color, line, font } from '@/styles/theme';
import { useAppStore } from '@/state/store';

const QUEUE = [
  {
    company: 'Aegean Living Developments Ltd',
    country: 'Cyprus · HE 412 887',
    when: 'Applied 15 Sep · 2 days',
    docs: '2 of 2 mandatory documents',
    state: 'Ready to verify',
    bg: 'rgba(221,180,94,.22)',
    fg: color.link,
  },
  {
    company: 'Grupo Olivar SL',
    country: 'Spain · B-98 221 440',
    when: 'Applied 12 Sep · 5 days',
    docs: '1 of 2 — licence missing',
    state: 'Waiting on developer',
    bg: 'rgba(23,75,103,.1)',
    fg: color.dim2,
  },
  {
    company: 'Sol Poniente Homes SL',
    country: 'Spain · B-12 884 010',
    when: 'Applied 09 Sep · 8 days',
    docs: '2 of 2 · licence expired',
    state: 'Needs decision',
    bg: 'rgba(197,86,79,.18)',
    fg: color.danger,
  },
];

const DOC_ROWS = [
  { label: 'Company registration certificate', file: 'HE412887_certificate.pdf', check: 'Name and number match the Cyprus register' },
  { label: 'Developer licence', file: 'licence_2024_00318.pdf', check: 'Valid to 12 Mar 2028' },
  { label: 'Two client references', file: 'references_aegean.pdf', check: 'Both contactable' },
  { label: 'Escrow arrangement', file: 'not supplied', check: 'Required only for off-plan sales' },
];

const smallBtn = { borderRadius: 40, padding: '7px 12px', background: 'transparent', fontSize: 13.5, cursor: 'pointer' } as const;

export function DeveloperVerificationPage() {
  const navigate = useNavigate();
  const { openModal, showToast } = useAppStore();

  return (
    <AdminLayout>
      <button onClick={() => navigate('/admin/approvals')} style={{ border: 0, background: 'transparent', fontSize: 15.5, color: color.muted, cursor: 'pointer', padding: '0 0 12px' }}>
        ← Approvals queue
      </button>
      <h1 style={{ fontWeight: 700, fontSize: 28, textTransform: 'uppercase', letterSpacing: '-.012em', margin: '0 0 6px' }}>Developer Verification</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 34, marginTop: 22 }}>
        {QUEUE.map((v) => (
          <div key={v.company} style={{ ...adminPanel, padding: '20px 22px', display: 'flex', gap: 18, flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ minWidth: 0, flex: '1 1 260px' }}>
              <div style={{ fontSize: 15.5 }}>{v.company}</div>
              <div style={{ fontSize: 14, color: color.muted, marginTop: 4 }}>
                {v.country} · {v.when}
              </div>
              <div style={{ fontSize: 14, color: color.dim2, marginTop: 4 }}>{v.docs}</div>
            </div>
            <span style={{ flex: 'none', fontSize: 13, padding: '5px 10px', borderRadius: 4, background: v.bg, color: v.fg, whiteSpace: 'nowrap' }}>{v.state}</span>
          </div>
        ))}
      </div>

      <div style={{ ...adminPanel, padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap', alignItems: 'flex-start', marginBottom: 16 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 12, letterSpacing: '.16em', color: color.muted }}>OPEN APPLICATION · APP-0142</div>
            <div style={{ fontWeight: 600, letterSpacing: '-.006em', fontSize: 23, marginTop: 5 }}>Aegean Living Developments Ltd</div>
            <div style={{ fontSize: 15.5, color: color.muted, marginTop: 5 }}>Cyprus · HE 412 887 · contact M. Christodoulou · maria@aegeanliving.com</div>
          </div>
          <span style={{ flex: 'none', fontSize: 12.5, letterSpacing: '.1em', padding: '5px 10px', borderRadius: 4, background: 'rgba(221,180,94,.16)', color: color.action }}>READY TO VERIFY</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 18 }}>
          {DOC_ROWS.map((d) => (
            <div key={d.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap', alignItems: 'center', border: `1px solid ${line(0.1)}`, borderRadius: 7, padding: '11px 13px' }}>
              <div style={{ minWidth: 0, flex: '1 1 220px' }}>
                <div style={{ fontSize: 15.5 }}>{d.label}</div>
                <div style={{ fontFamily: font.mono, fontSize: 13, color: color.muted, marginTop: 3 }}>{d.file}</div>
                <div style={{ fontSize: 13.5, color: color.dim2, marginTop: 4 }}>{d.check}</div>
              </div>
              <div style={{ display: 'flex', gap: 7, flex: 'none', flexWrap: 'wrap' }}>
                <button onClick={() => showToast('The document viewer is not part of this prototype')} style={{ ...smallBtn, border: `1px solid ${line(0.14)}`, color: color.slate }}>
                  Open
                </button>
                <button onClick={() => showToast('Document accepted')} style={{ ...smallBtn, border: '1px solid rgba(127,180,154,.4)', color: color.success }}>
                  Accept
                </button>
                <button onClick={() => showToast('Query sent to the developer')} style={{ ...smallBtn, border: '1px solid rgba(197,86,79,.4)', color: color.danger }}>
                  Query
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap' }}>
          <button
            onClick={() =>
              openModal({
                title: 'Verify this developer?',
                body: 'Aegean Living Developments gains full portal access and can submit projects. Their first project still needs separate approval before publication.',
                ok: 'Verify developer',
                tone: 'ok',
                run: () => showToast('Aegean Living verified · portal unlocked'),
              })
            }
            style={{ border: 0, borderRadius: 40, padding: '11px 18px', background: color.action, color: '#fff', fontSize: 15.5, fontWeight: 600, cursor: 'pointer' }}
          >
            Verify developer
          </button>
          <button
            onClick={() =>
              openModal({
                title: 'Request more information?',
                body: 'The developer keeps read-only access and is emailed a list of what is missing.',
                ok: 'Send request',
                tone: 'gold',
                needReason: true,
                run: () => showToast('Request sent to developer'),
              })
            }
            style={{ border: `1px solid ${line(0.14)}`, borderRadius: 40, padding: '11px 18px', background: 'transparent', color: color.slate, fontSize: 15.5, cursor: 'pointer' }}
          >
            Request more information
          </button>
          <button
            onClick={() =>
              openModal({
                title: 'Reject this application?',
                body: 'The developer is told their application was unsuccessful and loses portal access. A reason is required and stored in the audit log.',
                ok: 'Reject application',
                tone: 'danger',
                needReason: true,
                run: (reason) => showToast(`Application rejected · ${reason}`),
              })
            }
            style={{ border: '1px solid rgba(197,86,79,.5)', borderRadius: 40, padding: '11px 18px', background: 'transparent', color: color.danger, fontSize: 15.5, cursor: 'pointer' }}
          >
            Reject application
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
