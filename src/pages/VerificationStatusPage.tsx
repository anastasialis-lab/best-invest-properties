import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DevPortalLayout, devPanel } from '@/layouts/DevPortalLayout';
import { PreviewBar, StateChips } from '@/components/PreviewStates';
import { color, font } from '@/styles/theme';
import { useAppStore } from '@/state/store';

export function VerificationStatusPage() {
  const navigate = useNavigate();
  const { devVerifyState, setDevVerifyState, showToast, docProgress, setDocProgress } = useAppStore();

  // Document re-upload runs as a simulated progress bar, as in the prototype.
  useEffect(() => {
    if (docProgress === null || docProgress >= 100) return;
    const t = window.setTimeout(() => setDocProgress(Math.min(100, docProgress + Math.round(8 + Math.random() * 14))), 320);
    return () => window.clearTimeout(t);
  }, [docProgress, setDocProgress]);

  useEffect(() => {
    if (docProgress === 100) {
      const t = window.setTimeout(() => {
        setDocProgress(null);
        setDevVerifyState('pending');
        showToast('Document uploaded · verification resumed');
      }, 700);
      return () => window.clearTimeout(t);
    }
  }, [docProgress, setDocProgress, setDevVerifyState, showToast]);

  const docs = [
    {
      label: 'Company registration certificate',
      file: 'HE412887_certificate.pdf',
      state: devVerifyState === 'rejected' ? 'Rejected' : 'Accepted',
      note: devVerifyState === 'rejected' ? 'The scan is unreadable on pages 2–3. Upload a clearer copy.' : 'Checked against the Cyprus register on 15 Sep.',
    },
    {
      label: 'Developer licence',
      file: 'licence_2024_00318.pdf',
      state: devVerifyState === 'moreinfo' ? 'Expired' : 'Accepted',
      note: devVerifyState === 'moreinfo' ? 'This licence expired in June. Upload the current one.' : 'Valid to 12 Mar 2028.',
    },
    {
      label: 'Building permit — Coral Bay',
      file: 'not uploaded',
      state: 'Needed before publication',
      note: 'Not required to open the account, required before the first project goes live.',
    },
  ];

  return (
    <DevPortalLayout>
      <div style={{ background: color.ink, color: color.sky, padding: '22px 28px' }}>
        <button onClick={() => navigate('/developer-portal')} style={{ border: 0, background: 'transparent', fontSize: 15.5, color: color.edge, cursor: 'pointer', padding: '0 0 10px' }}>
          ← Developer portal
        </button>
        <div style={{ fontSize: 11.5, letterSpacing: '.2em', color: color.edge }}>ACCOUNT VERIFICATION</div>
        <div style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-.012em', fontSize: 27, marginTop: 5 }}>XYZ Developments</div>
        <p style={{ fontSize: 16.5, lineHeight: 1.6, color: color.edge, maxWidth: '64ch', margin: '8px 0 0' }}>
          Application APP-0142 · submitted 15 Sep 2026. Until verification completes the portal is read-only and no project can be submitted.
        </p>
      </div>

      <div style={{ padding: '22px 28px 40px' }}>
        <PreviewBar>
          <StateChips
            label="PREVIEW STATE"
            current={devVerifyState}
            onPick={setDevVerifyState}
            choices={[
              { value: 'pending' as const, label: 'Under review' },
              { value: 'moreinfo' as const, label: 'More information needed' },
              { value: 'rejected' as const, label: 'Rejected' },
            ]}
          />
        </PreviewBar>

        {devVerifyState === 'pending' && (
          <div style={{ background: color.goldWash, border: '1px solid rgba(221,180,94,.42)', borderRadius: 16, padding: '20px 22px', marginBottom: 20 }}>
            <div style={{ fontSize: 16.5, fontWeight: 600, color: color.link, marginBottom: 6 }}>Under review</div>
            <p style={{ fontSize: 15.5, lineHeight: 1.65, color: color.body, margin: 0 }}>
              Both mandatory documents are with our team. Verification normally takes two to five working days — a decision is expected by 22 Sep. We will email the account contact either way; nothing further is needed from you now.
            </p>
          </div>
        )}

        {devVerifyState === 'moreinfo' && (
          <div style={{ background: color.goldWash, border: '1px solid rgba(221,180,94,.42)', borderRadius: 16, padding: '20px 22px', marginBottom: 20 }}>
            <div style={{ fontSize: 16.5, fontWeight: 600, color: color.link, marginBottom: 6 }}>One document needs replacing</div>
            <p style={{ fontSize: 15.5, lineHeight: 1.65, color: color.body, margin: '0 0 14px' }}>
              Your developer licence expired in June 2026. Upload the current licence and verification resumes automatically — your place in the queue is kept.
            </p>
            <button onClick={() => setDocProgress(4)} style={{ border: 0, borderRadius: 40, padding: '11px 18px', background: color.gold, color: color.ink, fontSize: 15.5, fontWeight: 600, cursor: 'pointer' }}>
              Upload the current licence
            </button>
          </div>
        )}

        {devVerifyState === 'rejected' && (
          <div style={{ background: color.dangerWash, border: '1px solid rgba(179,69,61,.34)', borderRadius: 16, padding: '20px 22px', marginBottom: 20 }}>
            <div style={{ fontSize: 16.5, fontWeight: 600, color: color.dangerDeep, marginBottom: 6 }}>Verification unsuccessful</div>
            <p style={{ fontSize: 15.5, lineHeight: 1.65, color: color.dangerDeep, margin: '0 0 14px' }}>
              We could not verify the company registration certificate — pages 2 and 3 of the scan are unreadable. Upload a clearer copy and we will review again, or reply to the email if you think this is wrong.
            </p>
            <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap' }}>
              <button onClick={() => setDocProgress(4)} style={{ border: 0, borderRadius: 40, padding: '11px 18px', background: color.dangerDeep, color: '#fff', fontSize: 15.5, fontWeight: 600, cursor: 'pointer' }}>
                Re-upload documents
              </button>
              <button onClick={() => showToast('Our verification team will reply within one working day')} style={{ border: '1px solid rgba(179,69,61,.4)', borderRadius: 40, padding: '11px 18px', background: '#fff', color: color.dangerDeep, fontSize: 15.5, cursor: 'pointer' }}>
                Contact our team
              </button>
            </div>
          </div>
        )}

        {docProgress !== null && (
          <div style={{ ...devPanel, padding: '14px 16px', marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline', marginBottom: 6 }}>
              <span style={{ fontSize: 15.5, color: color.ink }}>licence_2024_00318.pdf</span>
              <span style={{ fontSize: 13.5, color: color.muted2, fontVariantNumeric: 'tabular-nums' }}>{docProgress}%</span>
            </div>
            <div style={{ height: 5, borderRadius: 3, background: 'rgba(32,90,135,.1)', overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: 3, background: color.action, width: `${docProgress}%` }} />
            </div>
          </div>
        )}

        <div style={{ ...devPanel, padding: 22 }}>
          <div style={{ fontSize: 12, letterSpacing: '.16em', color: color.muted2, marginBottom: 16 }}>YOUR DOCUMENTS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            {docs.map((d) => (
              <div key={d.label} style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', border: '1px solid rgba(32,90,135,.12)', borderRadius: 7, padding: '13px 15px', background: '#FFFFFF' }}>
                <div style={{ minWidth: 0, flex: '1 1 240px' }}>
                  <div style={{ fontSize: 16.5, color: color.ink, fontWeight: 500 }}>{d.label}</div>
                  <div style={{ fontFamily: font.mono, fontSize: 13, color: color.muted2, marginTop: 3 }}>{d.file}</div>
                  <div style={{ fontSize: 14, lineHeight: 1.55, color: color.muted2, marginTop: 5 }}>{d.note}</div>
                </div>
                <span style={{ flex: 'none', fontSize: 13, padding: '5px 10px', borderRadius: 4, background: color.sky, color: '#3E6350', whiteSpace: 'nowrap' }}>{d.state}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 13.5, lineHeight: 1.6, color: color.muted2, marginTop: 14 }}>
            Documents are stored encrypted and seen only by our verification team. Replacing a licence sends the account back through verification.
          </div>
        </div>
      </div>
    </DevPortalLayout>
  );
}
