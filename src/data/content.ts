// Static copy/content ported from the prototype's script block.

export const PILLARS = [
  { num: '01', title: 'Selected', body: "We don't list everything. We select only investment opportunities." },
  { num: '02', title: 'Analysed', body: 'Every property is evaluated using consistent investment criteria.' },
  { num: '03', title: 'Transparent', body: 'Returns, costs and risks are clearly shown.' },
  { num: '04', title: 'Independent', body: 'Developer information is identified separately from our analysis.' },
];

export const REASONS = [
  { num: '01', title: 'Rental income', metricLabel: 'ESTIMATED ANNUAL RENT', metric: '€12,600', subLabel: 'SOURCE', sub: 'Independent estimate, cross-checked against developer figure', body: 'Comparable one-bedroom units in the same district let for €1,000–€1,150 per month on twelve-month contracts. We model €1,050 at 90% occupancy.' },
  { num: '02', title: 'Location', metricLabel: 'RENTAL DEMAND', metric: 'Strong', subLabel: 'DRIVERS', sub: 'Airport, university, year-round tenancy', body: 'Larnaca holds tenants outside the tourist season, which matters for long-term rental strategy. Vacancy risk is lower here than in purely seasonal coastal markets.' },
  { num: '03', title: 'Entry price', metricLabel: 'THIS PROPERTY', metric: '€175k', subLabel: 'COMPARABLE NEW BUILDS', sub: '€190k – €215k', body: 'Priced below comparable new-build stock. Part of the gap is the pre-completion discount; the rest reflects the developer pricing early phases to fund construction.' },
  { num: '04', title: 'Resale potential', metricLabel: 'OUTLOOK', metric: 'Good', subLabel: 'HORIZON', sub: '5–10 years', body: 'Steady demand from both investors and owner-occupiers on resale. Liquidity is slower than in larger Spanish cities, which is reflected in the score.' },
];

export const SCORE_ROWS = [
  { label: 'Rental yield', got: 25, max: 25, pct: '100%' },
  { label: 'Rental demand', got: 18, max: 20, pct: '90%' },
  { label: 'Location', got: 14, max: 15, pct: '93%' },
  { label: 'Entry price', got: 14, max: 15, pct: '93%' },
  { label: 'Growth potential', got: 8, max: 10, pct: '80%' },
  { label: 'Developer', got: 4, max: 5, pct: '80%' },
  { label: 'Risk', got: 2, max: 5, pct: '40%' },
  { label: 'Liquidity', got: 2, max: 5, pct: '40%' },
];

export const FIN_ROWS = [
  { k: 'Purchase price', v: '€175,000' },
  { k: 'Estimated annual rent', v: '€12,600' },
  { k: 'Gross yield', v: '7.20%' },
  { k: 'Estimated annual expenses', v: '€2,800' },
  { k: 'Net operating income', v: '€9,800' },
  { k: 'Estimated net yield', v: '5.60%' },
];

export const THUMBS = [{ label: 'living room' }, { label: 'kitchen' }, { label: 'floor plan' }, { label: 'location map' }];

export const REG_PROMISE = [
  { num: '01', body: 'We match your budget and target yield against analysed stock in Cyprus and Spain.' },
  { num: '02', body: 'You see the full financial picture before any developer sees your name.' },
  { num: '03', body: 'No listing spam. You are contacted about matches only.' },
];

export const REG_FIELDS = [
  { label: 'Name', type: 'text', ph: 'Full name' },
  { label: 'Email', type: 'email', ph: 'you@example.com' },
  { label: 'Password', type: 'password', ph: 'At least 8 characters' },
  { label: 'Phone', type: 'tel', ph: '+44 …' },
  { label: 'Country of residence', type: 'text', ph: 'United Kingdom' },
];

export const LOGIN_FIELDS = [
  { label: 'Email address', type: 'email', ph: 'you@example.com' },
  { label: 'Password', type: 'password', ph: '••••••••' },
];

export const PROFILE = [
  { k: 'Budget', v: '€150–200k' },
  { k: 'Target yield', v: '6%+' },
  { k: 'Preferred countries', v: 'Cyprus / Spain' },
  { k: 'Strategy', v: 'Long-term rental' },
];

export const SAVED = [
  { name: 'Larnaca 1BR — Phase II', meta: '87/100 · 7.2%' },
  { name: 'Málaga 2BR — Old town', meta: '85/100 · 7.0%' },
  { name: 'Paphos 1BR — Sea gardens', meta: '89/100 · 7.4%' },
];

export const ENQUIRIES = [
  { name: 'Larnaca 1BR', status: 'Developer contacted' },
  { name: 'Alicante 2BR', status: 'Awaiting analysis' },
];

export const DEV_STATS = [
  { k: 'Projects', v: '3' },
  { k: 'Available units', v: '28' },
  { k: 'Investor enquiries', v: '14' },
  { k: 'Active leads', v: '6' },
];

export const DEV_PROJECTS = [
  { name: 'Coral Bay Residences', meta: 'Paphos · 12 units · completion 2027', status: 'Published' },
  { name: 'Marina Court', meta: 'Larnaca · 9 units · completion 2026', status: 'Pending review' },
  { name: 'Casa Alicante', meta: 'Alicante · 7 units · ready', status: 'Published' },
];

export const DEV_LEADS = [
  { who: 'Investor #2841', what: 'Marina Court · 2 days' },
  { who: 'Investor #2836', what: 'Coral Bay · 4 days' },
  { who: 'Investor #2829', what: 'Casa Alicante · 6 days' },
  { who: 'Investor #2814', what: 'Coral Bay · 9 days' },
];

export const PROJ_FIELDS = [
  { label: 'Project name', ph: 'Coral Bay Residences' },
  { label: 'Location', ph: 'Paphos, Cyprus' },
  { label: 'GPS coordinates', ph: '34.7712, 32.4074' },
  { label: 'Completion date', ph: 'Q3 2027' },
  { label: 'Number of units', ph: '12' },
  { label: 'Developer information', ph: 'Company, years active, track record' },
];

export const UPLOADS = [
  { label: 'Photos', hint: 'jpg · min 2000px · up to 30' },
  { label: 'Videos', hint: 'mp4 · up to 2' },
  { label: 'Floor plans', hint: 'pdf / png per unit type' },
  { label: 'Brochure', hint: 'pdf · single file' },
];

export const UNIT_FIELDS = [
  { label: 'Unit number', ph: 'A-201' },
  { label: 'Price', ph: '€175,000' },
  { label: 'Bedrooms', ph: '1' },
  { label: 'Bathrooms', ph: '1' },
  { label: 'Area m²', ph: '55' },
  { label: 'Availability', ph: 'Available' },
  { label: 'Expected rent', ph: '€1,050 / month' },
];

export const FEATURES = [
  { label: 'Terrace' }, { label: 'Garden' }, { label: 'Parking' }, { label: 'Gated area' },
  { label: 'Pool' }, { label: 'Gym' }, { label: 'Tennis / golf' }, { label: 'Sea view' }, { label: 'Air conditioning' },
];

export const ADMIN_NAV = [
  'Dashboard', 'Investors', 'Developers', 'Projects', 'Properties', 'Enquiries', 'Transactions', 'Investment Scores', 'Analytics', 'Documents', 'Settings',
];

export const ADMIN_STATS = [
  { k: 'Registered investors', v: '127', hot: false },
  { k: 'Active developers', v: '14', hot: false },
  { k: 'Published properties', v: '83', hot: false },
  { k: 'New enquiries', v: '9', hot: true },
  { k: 'Hot leads', v: '4', hot: true },
];

export const ENQ_HEAD = ['INVESTOR', 'PROPERTY', 'BUDGET', 'STAGE', 'AGE'];

export const ENQ_ROWS = [
  { investor: 'M. Kruger', property: 'Larnaca 1BR', budget: '€150–200k', stage: 'Hot lead', age: '2h', hot: true },
  { investor: 'A. Lindqvist', property: 'Paphos 1BR', budget: '€150–250k', stage: 'Qualifying', age: '5h', hot: false },
  { investor: 'R. Haddad', property: 'Málaga 2BR', budget: '€200–300k', stage: 'Hot lead', age: '1d', hot: true },
  { investor: 'S. Novak', property: 'Alicante 2BR', budget: '€200–250k', stage: 'New', age: '1d', hot: false },
];

export const DEV_VALUE = [
  { num: '01', title: 'Investor-ready audience', body: 'Our registered users state a budget, a target yield and a strategy before they see a single listing. Enquiries arrive already filtered against your price and completion date.' },
  { num: '02', title: 'Analysis, not advertising', body: 'Your project is presented with an independent investment score. Buyers see the reasoning, which shortens the questions that usually come later in the sales cycle.' },
  { num: '03', title: 'Two markets, one channel', body: 'Cyprus and Spain, with residential stock between €120k and €600k. We do not list every project, so listings carry weight.' },
  { num: '04', title: 'Your material stays yours', body: 'Renders, plans and specifications are published as developer information and labelled as such, separate from our own figures.' },
];

export const DEV_STEPS = [
  { num: '01', title: 'Apply', body: 'Send us company details, licence number and two completed references. We verify before any project goes live.' },
  { num: '02', title: 'Submit a project', body: 'Upload units, pricing, completion schedule, rental expectations and media through the developer portal.' },
  { num: '03', title: 'We analyse', body: 'Our team models rent, costs and risk, then assigns a score against published criteria. You see the result before publication.' },
  { num: '04', title: 'Go live and track', body: 'The listing publishes with your material attached. The portal shows views, saves and qualified enquiries per unit.' },
];

export const DEV_REQ = [
  'Valid developer licence in Cyprus or Spain',
  'Building permit issued for the project',
  'Escrow or bank guarantee for off-plan payments',
  'Unit-level pricing and floor plans',
  'Realistic completion schedule with milestones',
  'A named contact who answers enquiries within 48 hours',
];

export const DEV_COMPANY_FIELDS = [
  { label: 'Registered company name', type: 'text', ph: 'Aegean Living Developments Ltd' },
  { label: 'Registration number', type: 'text', ph: 'HE 412 887' },
  { label: 'Country of registration', type: 'text', ph: 'Cyprus' },
  { label: 'Developer licence number', type: 'text', ph: 'LIC-2024-00318' },
  { label: 'Company website', type: 'text', ph: 'aegeanliving.com' },
  { label: 'Years active', type: 'text', ph: '8' },
];

export const DEV_CONTACT_FIELDS = [
  { label: 'Contact name', type: 'text', ph: 'Maria Christodoulou' },
  { label: 'Role', type: 'text', ph: 'Head of Sales' },
  { label: 'Work email', type: 'email', ph: 'maria@aegeanliving.com' },
  { label: 'Phone', type: 'tel', ph: '+357 99 123 456' },
  { label: 'Password', type: 'password', ph: '••••••••' },
  { label: 'Confirm password', type: 'password', ph: '••••••••' },
];

export const DEV_PORTFOLIO_FIELDS = [
  { label: 'Projects completed', type: 'text', ph: '11' },
  { label: 'Projects currently selling', type: 'text', ph: '3' },
  { label: 'Typical unit price', type: 'text', ph: '€180k – €320k' },
];

export const DEV_DOCS = [
  { label: 'Company registration certificate', note: 'PDF · required' },
  { label: 'Developer licence', note: 'PDF · required' },
  { label: 'Building permit for first project', note: 'PDF · required' },
  { label: 'Escrow or bank guarantee confirmation', note: 'PDF · required for off-plan' },
  { label: 'Two client or bank references', note: 'PDF or letter · required' },
];

export const DEV_STAGES = [
  { num: '01', title: 'Account created', body: 'You get portal access immediately, in read-only mode.', active: true },
  { num: '02', title: 'Verification', body: 'We check the licence, permit and references. Two to five working days.', active: false },
  { num: '03', title: 'Project submission', body: 'Portal unlocks. Upload units, pricing, schedule and media.', active: false },
  { num: '04', title: 'Scoring and publication', body: 'We model the numbers, share the indicative score, then publish.', active: false },
];

export type FlowStepKind = 'step' | 'you' | 'money';

export const INVESTOR_FLOW: Array<[string, string, FlowStepKind?]> = [
  ['SOURCE', 'Google · LinkedIn · referral'],
  ['INVESTOR', 'Homepage'],
  ['INVESTOR', 'Search'],
  ['INVESTOR', 'Property detail'],
  ['INVESTOR', 'Investment analysis'],
  ['INVESTOR', 'Compare'],
  ['INVESTOR', 'Register'],
  ['INVESTOR', 'Requests information'],
  ['YOU', 'You receive the lead', 'you'],
  ['YOU', 'You qualify the investor', 'you'],
  ['DEVELOPER', 'Developer receives qualified lead'],
  ['DEVELOPER', 'Viewing'],
  ['DEVELOPER', 'Reservation'],
  ['DEVELOPER', 'Purchase'],
  ['MONEY', 'Developer pays commission to you', 'money'],
];

export const DEVELOPER_FLOW: Array<[string, string, FlowStepKind?]> = [
  ['YOU', 'You contact the developer', 'you'],
  ['DEVELOPER', 'Developer registers'],
  ['DEVELOPER', 'Uploads project'],
  ['YOU', 'You review', 'you'],
  ['YOU', 'You analyse', 'you'],
  ['YOU', 'You approve', 'you'],
  ['PLATFORM', 'Property goes live'],
  ['INVESTOR', 'Investor enquiry'],
  ['YOU', 'You receive the lead', 'you'],
  ['DEVELOPER', 'Developer receives the lead'],
  ['MONEY', 'Sale', 'money'],
];

export const JOURNEYS_NEXT = [
  'Decide where the rental estimate comes from — the calculator needs one credible source before launch.',
  'Lead qualification screen for you, between investor enquiry and developer handover.',
  'Commission tracking, so the transaction step in Flow A has a home in admin.',
];
