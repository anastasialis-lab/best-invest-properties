import { useAppStore } from '@/state/store';

// Approve / request changes / reject are the same three decisions on the admin
// dashboard card and inside the full project review, and both read the outcome
// back from the same place — so the prototype's handlers live here once.
export function useAdminDecisions() {
  const { openModal, showToast, setAdminOutcome } = useAppStore();

  return {
    approve: () =>
      openModal({
        title: 'Approve and publish this project?',
        body: 'Approving makes all 12 units, the media and our analysis publicly visible immediately, and the developer is emailed. Investors can enquire from that moment.',
        ok: 'Approve & publish',
        tone: 'ok',
        note: 'Publishing is logged against your admin account.',
        run: () => {
          setAdminOutcome({
            title: 'Approved and published',
            body: 'Live since 17 Sep 2026, 14:12. Score 87/100 from model v3. Developer notified by email.',
            chip: 'PUBLISHED',
            bg: 'rgba(32,90,135,.18)',
            fg: '#2F7D63',
          });
          showToast('Project published · developer notified');
        },
      }),

    requestChanges: () =>
      openModal({
        title: 'Request changes from the developer?',
        body: 'The project stays unpublished and the developer is emailed your notes. They can only edit the fields you name.',
        ok: 'Send request',
        tone: 'gold',
        needReason: true,
        run: (reason) => {
          setAdminOutcome({
            title: 'Changes requested',
            body: `Sent to XYZ Developments 17 Sep, 14:12. Reason: ${reason}`,
            chip: 'CHANGES REQUESTED',
            bg: 'rgba(221,180,94,.22)',
            fg: '#174B67',
          });
          showToast('Change request sent');
        },
      }),

    reject: () =>
      openModal({
        title: 'Reject this project?',
        body: 'The developer is told the project will not be listed. A reason is required and is stored in the audit log.',
        ok: 'Reject project',
        tone: 'danger',
        needReason: true,
        run: (reason) => {
          setAdminOutcome({
            title: 'Rejected',
            body: `Rejected 17 Sep, 14:12. Reason: ${reason}`,
            chip: 'REJECTED',
            bg: 'rgba(197,86,79,.18)',
            fg: '#B3453D',
          });
          showToast('Project rejected · developer notified');
        },
      }),
  };
}
