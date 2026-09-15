import { Link } from 'react-router-dom';
import { LegalPage } from '@/components/LegalPage';
import { PRIVACY_SECTIONS } from '@/data/listings';

export function PrivacyPolicyPage() {
  return (
    <LegalPage
      active="privacy"
      title="Privacy Policy"
      intro="How we collect, use and protect personal data when you use the Best Invest Properties platform."
      eyebrowMeta={['LAST UPDATED — 15 SEPTEMBER 2026', 'APPLIES TO — CYPRUS, SPAIN, EEA']}
      draftNote="Draft text for the prototype. It follows a standard GDPR structure but must be reviewed by a qualified lawyer before publication."
      sections={PRIVACY_SECTIONS}
      footer={
        <>
          Data protection enquiries: <a href="mailto:privacy@bestinvestproperties.com">privacy@bestinvestproperties.com</a>
          <br />
          See also our <Link to="/terms">Terms of Use</Link>.
        </>
      }
    />
  );
}
