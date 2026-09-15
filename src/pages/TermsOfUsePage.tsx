import { Link } from 'react-router-dom';
import { LegalPage } from '@/components/LegalPage';
import { TERMS_SECTIONS } from '@/data/listings';

export function TermsOfUsePage() {
  return (
    <LegalPage
      active="terms"
      title="Terms of Use"
      intro="The conditions on which we make the platform, our property analysis and our investment scores available to you."
      eyebrowMeta={['LAST UPDATED — 15 SEPTEMBER 2026', 'GOVERNING LAW — CYPRUS']}
      draftNote="Draft text for the prototype. The liability, fee-disclosure and jurisdiction clauses in particular need legal review before publication."
      sections={TERMS_SECTIONS}
      footer={
        <>
          Questions about these terms: <a href="mailto:legal@bestinvestproperties.com">legal@bestinvestproperties.com</a>
          <br />
          See also our <Link to="/privacy">Privacy Policy</Link>.
        </>
      }
    />
  );
}
