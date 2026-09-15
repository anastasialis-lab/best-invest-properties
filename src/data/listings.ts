export interface Listing {
  id: string;
  location: string;
  price: string;
  spec: string;
  gross: string;
  net: string;
  score: number;
  verdict: string;
  tag: string;
  photoLabel: string;
}

export const LISTINGS: Listing[] = [
  {
    id: 'larnaca',
    location: 'Larnaca, Cyprus',
    price: '€175,000',
    spec: '1 bedroom · 55 m²',
    gross: '7.2%',
    net: '5.6%',
    score: 87,
    verdict: 'Strong Investment',
    tag: 'TOP INVESTMENT',
    photoLabel: 'exterior — 4:3',
  },
  {
    id: 'alicante',
    location: 'Alicante, Spain',
    price: '€219,000',
    spec: '2 bedrooms · 72 m²',
    gross: '6.5%',
    net: '5.1%',
    score: 84,
    verdict: 'Strong Investment',
    tag: 'CAPITAL GROWTH',
    photoLabel: 'terrace view — 4:3',
  },
  {
    id: 'paphos',
    location: 'Paphos, Cyprus',
    price: '€168,000',
    spec: '1 bedroom · 51 m²',
    gross: '7.4%',
    net: '5.8%',
    score: 89,
    verdict: 'Strong Investment',
    tag: 'HIGH YIELD',
    photoLabel: 'pool area — 4:3',
  },
  {
    id: 'valencia',
    location: 'Valencia, Spain',
    price: '€245,000',
    spec: '3 bedrooms · 96 m²',
    gross: '6.1%',
    net: '4.7%',
    score: 79,
    verdict: 'Solid Investment',
    tag: 'CAPITAL GROWTH',
    photoLabel: 'living room — 4:3',
  },
  {
    id: 'limassol',
    location: 'Limassol, Cyprus',
    price: '€310,000',
    spec: '2 bedrooms · 84 m²',
    gross: '5.9%',
    net: '4.5%',
    score: 76,
    verdict: 'Solid Investment',
    tag: 'CAPITAL GROWTH',
    photoLabel: 'sea view — 4:3',
  },
  {
    id: 'malaga',
    location: 'Málaga, Spain',
    price: '€198,000',
    spec: '2 bedrooms · 68 m²',
    gross: '7.0%',
    net: '5.4%',
    score: 85,
    verdict: 'Strong Investment',
    tag: 'HIGH YIELD',
    photoLabel: 'street facade — 4:3',
  },
];

export const COMPLETION_BY_ID: Record<string, string> = {
  larnaca: '2027',
  alicante: 'Ready',
  paphos: '2026',
  valencia: 'Ready',
  limassol: '2027',
  malaga: 'Ready',
};

export interface WeightRow {
  key: string;
  label: string;
  value: number;
}

export const DEFAULT_WEIGHTS: WeightRow[] = [
  { key: 'yield', label: 'Rental yield', value: 25 },
  { key: 'demand', label: 'Rental demand', value: 20 },
  { key: 'location', label: 'Location', value: 15 },
  { key: 'price', label: 'Entry price', value: 15 },
  { key: 'growth', label: 'Growth potential', value: 10 },
  { key: 'developer', label: 'Developer', value: 5 },
  { key: 'risk', label: 'Risk', value: 5 },
  { key: 'liquidity', label: 'Liquidity', value: 5 },
];

export interface LegalSection {
  num: string;
  title: string;
  body: string;
}

export const PRIVACY_SECTIONS: LegalSection[] = [
  { num: '01', title: 'Who we are', body: 'Best Invest Properties operates this platform and is the controller of the personal data described here. Questions about this policy or your data can be sent to privacy@bestinvestproperties.com.' },
  { num: '02', title: 'What we collect', body: 'Account details you give us: name, email address, phone number and country of residence. Your investment criteria: budget, target yield, preferred countries, strategy and time horizon. Records of properties you view, save or compare, and messages you exchange with us. Technical data such as device type, browser and approximate location derived from your IP address.' },
  { num: '03', title: 'Why we use it', body: 'To match properties to your criteria and send you shortlists. To operate your account and respond to requests. To introduce you to a developer or agent when you ask us to. To improve our analysis and the platform itself, using aggregated data. To meet legal and accounting obligations.' },
  { num: '04', title: 'Who we share it with', body: 'Developers and selling agents receive your contact details only when you request an introduction to a specific project. Service providers — hosting, email delivery, analytics and customer support — process data on our instructions under contract. Authorities receive data only where we are legally required to provide it. We do not sell personal data.' },
  { num: '05', title: 'Where data is held', body: 'Data is stored within the European Economic Area. Where a provider processes data outside the EEA, we rely on adequacy decisions or standard contractual clauses approved by the European Commission.' },
  { num: '06', title: 'How long we keep it', body: 'Account data is kept while your account is active and for two years after your last activity. Records connected to an introduction or transaction are kept for seven years to meet accounting and anti-money-laundering requirements. Marketing consent records are kept until you withdraw consent.' },
  { num: '07', title: 'Your rights', body: 'You may request access to your data, correction of inaccurate data, deletion, restriction of processing, or a portable copy. You may object to processing based on our legitimate interests and withdraw marketing consent at any time. We respond within one month. You may also complain to your national data protection authority.' },
  { num: '08', title: 'Cookies', body: 'Essential cookies keep you signed in and remember your filter settings. Analytics cookies, which measure how the platform is used, are set only with your consent and can be withdrawn from the cookie settings link in the footer.' },
  { num: '09', title: 'Changes to this policy', body: 'We will post any material change on this page and notify registered users by email at least fourteen days before it takes effect.' },
];

export const TERMS_SECTIONS: LegalSection[] = [
  { num: '01', title: 'Acceptance', body: 'By using this platform you agree to these terms. If you do not accept them, do not use the platform. You must be at least eighteen years old and legally able to enter into contracts.' },
  { num: '02', title: 'What the platform provides', body: 'We publish residential property listings together with our own analysis of rental income, costs, risks and long-term potential. The platform is an information service. Nothing on it is investment, tax or legal advice, and no content is a personal recommendation or an offer to sell property or securities.' },
  { num: '03', title: 'Our analysis and scores', body: 'Investment scores are produced by applying our published criteria and weightings to data we hold. Rental estimates, expenses, yields and calculator outputs are projections based on assumptions stated on each screen. They are not guaranteed, and actual returns may be materially lower. Weightings and methodology may change; historical scores are not restated.' },
  { num: '04', title: 'Developer material', body: 'Descriptions, images, floor plans, specifications and completion dates supplied by developers are identified as developer information and presented separately from our analysis. We carry out the checks described in our methodology but do not independently verify every statement a developer makes.' },
  { num: '05', title: 'Your account', body: 'You are responsible for the accuracy of the information you provide and for keeping your credentials secure. One account per person. Tell us immediately if you believe your account has been accessed without your authorisation.' },
  { num: '06', title: 'Introductions and transactions', body: 'Any purchase contract is concluded directly between you and the seller or developer. We are not a party to it, do not hold client money, and do not act as your agent. We may receive a fee from a developer when an introduction leads to a completed sale; where this applies it is disclosed on the property page. Independent legal and tax advice in the relevant country is your responsibility.' },
  { num: '07', title: 'Acceptable use', body: 'You may use the platform for your own investment research. You may not scrape, bulk-download or resell our data, republish our scores or analysis without written permission, misrepresent your identity, or interfere with the operation of the service.' },
  { num: '08', title: 'Intellectual property', body: 'The platform, our scoring methodology, written analysis, layouts and brand remain our property or that of our licensors. Developer-supplied material remains the property of the developer.' },
  { num: '09', title: 'Limitation of liability', body: 'We provide the platform with reasonable care but do not warrant that content is complete, current or error-free. To the extent permitted by law we are not liable for investment losses, lost profits, or decisions taken in reliance on our analysis. Nothing here excludes liability that cannot lawfully be excluded.' },
  { num: '10', title: 'Governing law and changes', body: 'These terms are governed by Cypriot law, with the courts of Cyprus having exclusive jurisdiction. We may update these terms; changes take effect fourteen days after they are posted, and continued use after that date constitutes acceptance.' },
];
