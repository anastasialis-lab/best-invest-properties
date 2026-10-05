export interface Listing {
  id: string;
  location: string;
  price: string;
  spec: string;
  gross: string;
  net: string;
  score: number;
  // Points per criterion, in the order of CATS: Price, Rental Yield,
  // Rental Demand, Capital Growth, Owner Protection & Eviction Efficiency.
  pts: number[];
  verdict: string;
  tag: string;
  photoLabel: string;
}

export const LISTINGS: Listing[] = [
  { id: 'larnaca', location: 'Larnaca, Cyprus', price: '€175,000', spec: '1 bedroom · 55 m²', gross: '7.2%', net: '5.6%', score: 8, pts: [2, 1, 2, 1, 2], verdict: 'Very Good Investment', tag: 'TOP INVESTMENT', photoLabel: 'exterior — 4:3' },
  { id: 'alicante', location: 'Alicante, Spain', price: '€219,000', spec: '2 bedrooms · 72 m²', gross: '6.5%', net: '5.1%', score: 8, pts: [2, 1, 2, 2, 1], verdict: 'Very Good Investment', tag: 'CAPITAL GROWTH', photoLabel: 'terrace view — 4:3' },
  { id: 'paphos', location: 'Paphos, Cyprus', price: '€168,000', spec: '1 bedroom · 51 m²', gross: '7.4%', net: '5.8%', score: 9, pts: [2, 2, 2, 1, 2], verdict: 'Top Investment', tag: 'HIGH YIELD', photoLabel: 'pool area — 4:3' },
  { id: 'valencia', location: 'Valencia, Spain', price: '€245,000', spec: '3 bedrooms · 96 m²', gross: '6.1%', net: '4.7%', score: 7, pts: [2, 0, 2, 2, 1], verdict: 'Good Investment', tag: 'CAPITAL GROWTH', photoLabel: 'living room — 4:3' },
  { id: 'limassol', location: 'Limassol, Cyprus', price: '€310,000', spec: '2 bedrooms · 84 m²', gross: '5.9%', net: '4.5%', score: 7, pts: [1, 0, 2, 2, 2], verdict: 'Good Investment', tag: 'CAPITAL GROWTH', photoLabel: 'sea view — 4:3' },
  { id: 'malaga', location: 'Málaga, Spain', price: '€198,000', spec: '2 bedrooms · 68 m²', gross: '7.0%', net: '5.4%', score: 8, pts: [2, 1, 2, 2, 1], verdict: 'Very Good Investment', tag: 'HIGH YIELD', photoLabel: 'street facade — 4:3' },
  { id: 'nicosia', location: 'Nicosia, Cyprus', price: '€152,000', spec: '1 bedroom · 48 m²', gross: '6.8%', net: '5.2%', score: 9, pts: [2, 1, 2, 2, 2], verdict: 'Top Investment', tag: 'HIGH YIELD', photoLabel: 'entrance — 4:3' },
  { id: 'sevilla', location: 'Sevilla, Spain', price: '€228,000', spec: '2 bedrooms · 76 m²', gross: '6.3%', net: '4.9%', score: 7, pts: [2, 1, 1, 2, 1], verdict: 'Good Investment', tag: 'CAPITAL GROWTH', photoLabel: 'courtyard — 4:3' },
  { id: 'larnacab', location: 'Larnaca, Cyprus', price: '€186,000', spec: '2 bedrooms · 62 m²', gross: '6.9%', net: '5.3%', score: 8, pts: [1, 1, 2, 2, 2], verdict: 'Very Good Investment', tag: 'HIGH YIELD', photoLabel: 'balcony — 4:3' },
  { id: 'paphosb', location: 'Paphos, Cyprus', price: '€204,000', spec: '2 bedrooms · 70 m²', gross: '6.6%', net: '5.0%', score: 7, pts: [1, 1, 2, 1, 2], verdict: 'Good Investment', tag: 'HIGH YIELD', photoLabel: 'poolside — 4:3' },
  { id: 'murcia', location: 'Murcia, Spain', price: '€164,000', spec: '1 bedroom · 52 m²', gross: '7.1%', net: '5.5%', score: 7, pts: [2, 1, 2, 1, 1], verdict: 'Good Investment', tag: 'HIGH YIELD', photoLabel: 'facade — 4:3' },
  { id: 'famagusta', location: 'Famagusta, Cyprus', price: '€212,000', spec: '2 bedrooms · 74 m²', gross: '6.4%', net: '4.9%', score: 7, pts: [2, 1, 1, 1, 2], verdict: 'Good Investment', tag: 'CAPITAL GROWTH', photoLabel: 'terrace — 4:3' },
  { id: 'torrevieja', location: 'Torrevieja, Spain', price: '€149,000', spec: '1 bedroom · 46 m²', gross: '7.3%', net: '5.6%', score: 8, pts: [2, 1, 2, 2, 1], verdict: 'Very Good Investment', tag: 'TOP INVESTMENT', photoLabel: 'entrance — 4:3' },
  { id: 'limassolb', location: 'Limassol, Cyprus', price: '€268,000', spec: '2 bedrooms · 80 m²', gross: '6.2%', net: '4.8%', score: 8, pts: [1, 1, 2, 2, 2], verdict: 'Very Good Investment', tag: 'CAPITAL GROWTH', photoLabel: 'sea view — 4:3' },
  { id: 'malagab', location: 'Málaga, Spain', price: '€289,000', spec: '3 bedrooms · 92 m²', gross: '6.0%', net: '4.6%', score: 6, pts: [1, 0, 2, 2, 1], verdict: 'Average Investment', tag: 'CAPITAL GROWTH', photoLabel: 'courtyard — 4:3' },
  { id: 'nicosiab', location: 'Nicosia, Cyprus', price: '€176,000', spec: '1 bedroom · 54 m²', gross: '6.7%', net: '5.1%', score: 7, pts: [2, 1, 1, 1, 2], verdict: 'Good Investment', tag: 'HIGH YIELD', photoLabel: 'lobby — 4:3' },
  { id: 'valenciab', location: 'Valencia, Spain', price: '€235,000', spec: '2 bedrooms · 78 m²', gross: '6.5%', net: '5.0%', score: 7, pts: [1, 1, 2, 2, 1], verdict: 'Good Investment', tag: 'CAPITAL GROWTH', photoLabel: 'living room — 4:3' },
];

export const COMPLETION_BY_ID: Record<string, string> = {
  larnaca: '2027',
  alicante: 'Ready',
  paphos: '2026',
  valencia: 'Ready',
  limassol: '2027',
  malaga: 'Ready',
  nicosia: 'Ready',
  sevilla: '2026',
  larnacab: '2026',
  paphosb: '2027',
  murcia: 'Ready',
  famagusta: '2026',
  torrevieja: 'Ready',
  limassolb: '2027',
  malagab: 'Ready',
  nicosiab: 'Ready',
  valenciab: '2026',
};

// Five criteria, each scored 0, 1 or 2 points, for a total out of 10.
export const VERDICTS = ['Top Investment', 'Very Good Investment', 'Good Investment', 'Average Investment', 'Below Average Investment'];

export const SCORE_MODEL = [
  { num: '01', label: 'Price', body: 'Compares the asking price with current prices for similar properties in the same area to assess whether it is high, average or low.' },
  { num: '02', label: 'Rental Yield', body: 'Based on total acquisition cost, expected annual rental income and recurring ownership costs.' },
  { num: '03', label: 'Rental Demand', body: 'Based on available official data and expected occupancy for long-term and short-term rentals. The assessment combines short-term rentals in the high season with long-term rentals in the low season.' },
  { num: '04', label: 'Capital Growth', body: 'Estimates future property price development in the area, taking urban plans into account where available.' },
  { num: '05', label: 'Owner Protection & Eviction Efficiency', body: 'Assesses whether current laws give stronger protection to property owners or tenants, including how efficiently eviction procedures work.' },
];

export interface ScoreCategory {
  label: string;
  max: number;
  got: number;
  note: string;
}

export const CATS: ScoreCategory[] = [
  { label: 'Price', max: 2, got: 2, note: 'The asking price is below current prices for comparable new-build properties in the same district, so the price is assessed as low.' },
  { label: 'Rental Yield', max: 2, got: 1, note: 'Estimated net yield of 5.6% on total acquisition cost, based on comparable lettings rather than the developer rent claim.' },
  { label: 'Rental Demand', max: 2, got: 2, note: 'Year-round tenant pool from the airport, the university and the services sector. Long contracts dominate, so seasonal dependence is limited.' },
  { label: 'Capital Growth', max: 2, got: 1, note: 'Steady district price growth expected, with resale demand from investors and owner-occupiers. Liquidity is slower than in larger cities.' },
  { label: 'Owner Protection & Eviction Efficiency', max: 2, got: 2, note: 'Cyprus law protects property owners effectively in disputes with tenants, and eviction procedures work efficiently.' },
];

// The property shown on the detail and analysis screens.
export const DETAIL_ID = 'larnaca';

export interface FactSection {
  h: string;
  ps: string[];
}

export const FACT_SHEETS: Record<string, FactSection[]> = {
  Cyprus:[
    {h: 'OVERVIEW', ps: ['Cyprus is one of the top property investment countries in EU.','English is second official language, along Greek, and currency is Euro.']},
    {h: 'TAXES', ps: ['Unique advantage of Cyprus is no wealth tax, no property tax, no inheritance tax and no rental income tax until 20.000 Euro annual income and above that you will have lots of tax deductions - as an example, for annual rental income of 65-70.000 Euro for luxury villa, you will pay only 2500-3000 Euro tax.']},
    {h: 'RENTAL MARKET', ps: ['Also, rental yields are among the highest due to relatively low property prices, low taxes and high rental demand all year around. Cyprus is attractive for ex-pats, foreigners, retirees, students, remote workers and business owners as long-term residence due to low tax politics and Golden Pass program for non-EU citizens.']},
    {h: 'TOURISM & VISITORS', ps: ['Thanks to warm Mediterranean winters, Cyprus has an all-year tourist season, attractive for golf players.','Investors and visitors come mostly from China, Israel, Middle East, Russia, Poland, northern Europe, UK and Germany.']},
    {h: 'BUYING NEW PROPERTY', ps: ['When buying a new property in Cyprus, you will be charged 19% VAT unless you use property as your primary residence. On the other hand, paying VAT will exempt you from paying transfer fee.']},
    {h: 'OWNER PROTECTION', ps: ['Laws in Cyprus are very effective in protecting the property owners in case of any problems with tenants, which are therefore very unlikely to happen.']}
  ],
  Spain:[
    {h: 'OVERVIEW', ps: ['Spain has a large property market which gives high liquidity and good capital appreciation.']},
    {h: 'PROPERTY TAX', ps: ['Spain has recurring annual property tax (IBI) you will have to pay.']},
    {h: 'THE CANARIES', ps: ['The Canaries are especially interesting because the climate supports tourism throughout much of the year and attracts also mid-term and long-term visitors like remote workers and foreign retirees.']},
    {h: 'SHORT-TERM RENTAL LICENCE', ps: ['To rent your property in Spain to short-term visitors, you need VV (touristic license) which Spain stopped issuing in December 2025. If you buy property with existing VV, the license is not transferrable to the new owner (you). In that case, you can still rent mid- and long-term.']},
    {h: 'RENTAL INCOME TAX', ps: ['For residents of the EU/EEA, the rental income tax rate is 19% and qualifying expenses can be deducted. For other non-residents, the rate is 24% and, generally, expenses cannot be deducted. (Agencia Tributaria)']},
    {h: 'OWNER CAVEAT', ps: ['One caveat for property owners in Spain: be aware of illegal occupants. The law protects them even if they are illegally in your property and not paying.']}
  ]
};

type SrcTag = 'SOURCE' | 'DEVELOPER' | 'ESTIMATE' | 'GAP';

const SRC_BG: Record<SrcTag, string> = {
  SOURCE: 'rgba(32,90,135,.14)',
  DEVELOPER: 'rgba(221,180,94,.22)',
  ESTIMATE: 'rgba(23,75,103,.07)',
  GAP: 'rgba(197,86,79,.15)',
};

const SRC_FG: Record<SrcTag, string> = {
  SOURCE: '#205A87',
  DEVELOPER: '#205A87',
  ESTIMATE: '#354F63',
  GAP: '#B3453D',
};

export const SRC_ROWS = (
  [
    { tag: 'SOURCE', body: 'Comparable long-let asking prices in the same Larnaca district, sampled from public listing portals.' },
    { tag: 'SOURCE', body: 'Published transfer fee, stamp duty and standard legal fee scales for Cyprus.' },
    { tag: 'DEVELOPER', body: 'Purchase price, unit size and completion date supplied by the developer and not independently verified.' },
    { tag: 'ESTIMATE', body: 'Management, insurance and maintenance modelled on district averages. Vacancy held at 10% of gross rent.' },
    { tag: 'GAP', body: 'No service charge schedule supplied for the building — recurring costs may differ from those modelled.' },
    { tag: 'GAP', body: 'No completed rental history: the project is pre-completion.' },
  ] as { tag: SrcTag; body: string }[]
).map((s) => ({ ...s, bg: SRC_BG[s.tag], fg: SRC_FG[s.tag] }));

// Points per criterion for a listing, in the order of CATS.
export function breakdown(p: Listing): number[] {
  return p.pts;
}

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
  { num: '03', title: 'Our analysis and scores', body: 'Investment scores are produced by applying our five published criteria to data we hold. Rental estimates, expenses, yields and calculator outputs are projections based on assumptions stated on each screen. They are not guaranteed, and actual returns may be materially lower. Weightings and methodology may change; historical scores are not restated.' },
  { num: '04', title: 'Developer material', body: 'Descriptions, images, floor plans, specifications and completion dates supplied by developers are identified as developer information and presented separately from our analysis. We carry out the checks described in our methodology but do not independently verify every statement a developer makes.' },
  { num: '05', title: 'Your account', body: 'You are responsible for the accuracy of the information you provide and for keeping your credentials secure. One account per person. Tell us immediately if you believe your account has been accessed without your authorisation.' },
  { num: '06', title: 'Introductions and transactions', body: 'Any purchase contract is concluded directly between you and the seller or developer. We are not a party to it, do not hold client money, and do not act as your agent. We may receive a fee from a developer when an introduction leads to a completed sale; where this applies it is disclosed on the property page. Independent legal and tax advice in the relevant country is your responsibility.' },
  { num: '07', title: 'Acceptable use', body: 'You may use the platform for your own investment research. You may not scrape, bulk-download or resell our data, republish our scores or analysis without written permission, misrepresent your identity, or interfere with the operation of the service.' },
  { num: '08', title: 'Intellectual property', body: 'The platform, our scoring methodology, written analysis, layouts and brand remain our property or that of our licensors. Developer-supplied material remains the property of the developer.' },
  { num: '09', title: 'Limitation of liability', body: 'We provide the platform with reasonable care but do not warrant that content is complete, current or error-free. To the extent permitted by law we are not liable for investment losses, lost profits, or decisions taken in reliance on our analysis. Nothing here excludes liability that cannot lawfully be excluded.' },
  { num: '10', title: 'Governing law and changes', body: 'These terms are governed by Cypriot law, with the courts of Cyprus having exclusive jurisdiction. We may update these terms; changes take effect fourteen days after they are posted, and continued use after that date constitutes acceptance.' },
];
