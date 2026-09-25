import { LegalPage } from '@/components/LegalPage';
import { TERMS_SECTIONS } from '@/data/listings';

export function TermsOfUsePage() {
  return (
    <LegalPage
      active="terms"
      title="Terms of Use"
      lead="The conditions on which we make the platform, our property analysis and our investment scores available to you."
      meta={[
        { k: 'LAST UPDATED', v: '15 September 2026' },
        { k: 'GOVERNING LAW', v: 'Cyprus' },
        { k: 'SECTIONS', v: 'Ten' },
      ]}
      idPrefix="terms"
      sections={TERMS_SECTIONS}
      footerLeft={
        <>
          Questions about these terms: <a href="mailto:legal@bestinvestproperties.com">legal@bestinvestproperties.com</a>
        </>
      }
      footerLink={{ to: '/privacy', label: 'Privacy Policy →' }}
    />
  );
}
