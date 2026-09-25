import { LegalPage } from '@/components/LegalPage';
import { PRIVACY_SECTIONS } from '@/data/listings';

export function PrivacyPolicyPage() {
  return (
    <LegalPage
      active="privacy"
      title="Privacy Policy"
      lead="How we collect, use and protect personal data when you use the Best Invest Properties platform."
      meta={[
        { k: 'LAST UPDATED', v: '15 September 2026' },
        { k: 'APPLIES TO', v: 'Cyprus, Spain, EEA' },
        { k: 'SECTIONS', v: 'Nine' },
      ]}
      idPrefix="priv"
      sections={PRIVACY_SECTIONS}
      footerLeft={
        <>
          Data protection enquiries: <a href="mailto:privacy@bestinvestproperties.com">privacy@bestinvestproperties.com</a>
        </>
      }
      footerLink={{ to: '/terms', label: 'Terms of Use →' }}
    />
  );
}
