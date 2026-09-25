import { create } from 'zustand';
import { LISTINGS, DEFAULT_WEIGHTS, type Listing, type WeightRow } from '@/data/listings';

export type Financing = 'cash' | 'mortgage';
export type RentCase = 'base' | 'avg' | 'best';
export type CalcStrategy = 'long' | 'short';

export interface CalcState {
  purchase: number;
  financing: Financing;
  deposit: number;
  rate: number;
  term: number;
  rent: number;
  occupancy: number;
  mgmt: number;
  strategy: CalcStrategy;
  rentCase: RentCase;
}

export interface ModalConfig {
  title: string;
  body: string;
  ok: string;
  tone?: 'danger' | 'gold' | 'ok' | 'default';
  note?: string;
  needReason?: boolean;
  reason: string;
  warn?: boolean;
  run?: (reason: string) => void;
}

export interface DevUnit {
  no: string;
  beds: string;
  area: string;
  price: string;
  rent: string;
  avail: string;
}

export interface PlanFile {
  ext: string;
  name: string;
  meta: string;
  assign: string;
}

export interface Upload {
  name: string;
  pct: number;
  error: string;
}

export interface AdminOutcome {
  title: string;
  body: string;
  chip: string;
  bg: string;
  fg: string;
}

export interface QueueOutcome {
  title: string;
  body: string;
  fg: string;
  chip?: string;
  chipBg?: string;
  chipFg?: string;
  emails: string[];
}

type Group = 'countries' | 'types' | 'beds' | 'strategy' | 'completion';

interface AppState {
  // filters
  countries: Record<string, boolean>;
  types: Record<string, boolean>;
  beds: Record<string, boolean>;
  strategy: Record<string, boolean>;
  completion: Record<string, boolean>;
  priceMax: number;
  minGross: number;
  minNet: number;
  sortBy: 'net' | 'gross' | 'score' | 'price';
  page: number;

  // shortlist / comparison
  compare: string[];
  cmpFull: boolean;
  savedProps: Record<string, boolean>;
  savedList: Array<{ name: string; meta: string }>;
  removingSaved: number | null;
  searchSaved: boolean;

  calc: CalcState;
  weights: WeightRow[];

  // session + chrome
  loggedIn: boolean;
  navOpen: boolean;
  drawerOpen: boolean;
  srcOpen: boolean;
  toast: string;
  modal: ModalConfig | null;

  // demo states from the prototype
  browseState: 'ok' | 'loading' | 'error';
  detailState: 'ok' | 'sent' | 'pending' | 'gone';
  analysisState: 'ok' | 'failed';
  dashState: 'full' | 'empty';
  showErrors: boolean;
  submitting: boolean;

  // developer side
  photoFiles: string[];
  uploads: Upload[];
  devUnits: DevUnit[];
  planFiles: PlanFile[];
  projectKind: 'single' | 'multi';
  singleSaved: boolean;
  unitOpen: boolean;
  editingUnit: number | null;
  declaredUnits: number;
  devPortalState: 'verified' | 'pending' | 'changes' | 'approved';
  devVerifyState: 'pending' | 'moreinfo' | 'rejected';
  companySaved: boolean;
  devSubmitting: boolean;

  // admin side
  adminState: 'pending' | 'empty';
  adminOutcome: AdminOutcome | null;
  revState: 'pending' | 'approved';
  rescore: 'idle' | 'running' | 'done' | 'failed';
  rescorePct: number;
  queueEmpty: boolean;
  queueOut: Record<string, QueueOutcome>;
  qTab: 'all' | 'subs' | 'apps' | 'intros' | 'changes';
  alStep: 'creds' | '2fa';
  alError: boolean;
  alBusy: boolean;
  setSave: 'idle' | 'saving' | 'saved';
  fpStep: 'request' | 'sent' | 'reset' | 'done';
  docProgress: number | null;

  // actions
  toggleGroup: (group: Group, key: string) => void;
  setPriceMax: (v: number) => void;
  setMinGross: (v: number) => void;
  setMinNet: (v: number) => void;
  setSortBy: (v: AppState['sortBy']) => void;
  setPage: (v: number) => void;
  toggleCompare: (id: string, city: string) => void;
  removeCompare: (id: string, name: string) => void;
  toggleSave: (id: string, name: string) => void;
  setSearchSaved: (v: boolean) => void;
  askRemoveSaved: (i: number | null) => void;
  confirmRemoveSaved: () => void;
  setCalc: (patch: Partial<CalcState>) => void;
  setWeight: (index: number, value: number) => void;
  resetWeights: () => void;
  showToast: (msg: string) => void;
  hideToast: () => void;
  openModal: (cfg: Omit<ModalConfig, 'reason'>) => void;
  closeModal: () => void;
  setModalReason: (v: string) => void;
  runModal: () => void;
  setNavOpen: (v: boolean) => void;
  setDrawerOpen: (v: boolean) => void;
  setSrcOpen: (v: boolean) => void;
  setLoggedIn: (v: boolean) => void;
  setBrowseState: (v: AppState['browseState']) => void;
  setDetailState: (v: AppState['detailState']) => void;
  setAnalysisState: (v: AppState['analysisState']) => void;
  setDashState: (v: AppState['dashState']) => void;
  toggleErrors: () => void;
  setSubmitting: (v: boolean) => void;
  addPhoto: (name: string) => void;
  removePhoto: (i: number) => void;
  startUpload: () => void;
  tickUploads: () => void;
  dropUpload: (i: number) => void;
  setProjectKind: (kind: 'single' | 'multi') => void;
  saveSingle: () => void;
  openUnitForm: () => void;
  closeUnitForm: () => void;
  editUnit: (i: number) => void;
  saveUnit: () => void;
  removeUnit: (i: number) => void;
  duplicateUnit: (i: number) => void;
  setDeclaredUnits: (n: number) => void;
  setDevPortalState: (v: AppState['devPortalState']) => void;
  setDevVerifyState: (v: AppState['devVerifyState']) => void;
  setCompanySaved: (v: boolean) => void;
  setDevSubmitting: (v: boolean) => void;
  setAdminState: (v: AppState['adminState']) => void;
  setAdminOutcome: (o: AdminOutcome | null) => void;
  setRevState: (v: AppState['revState']) => void;
  startRescore: () => void;
  tickRescore: () => void;
  setRescore: (v: AppState['rescore']) => void;
  setQueueEmpty: (v: boolean) => void;
  setQueueOutcome: (ref: string, outcome: QueueOutcome) => void;
  clearQueueOutcome: (ref: string) => void;
  setQTab: (v: AppState['qTab']) => void;
  setAlStep: (v: AppState['alStep']) => void;
  setAlError: (v: boolean) => void;
  setAlBusy: (v: boolean) => void;
  setSetSave: (v: AppState['setSave']) => void;
  setFpStep: (v: AppState['fpStep']) => void;
  setDocProgress: (v: number | null) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  countries: { Cyprus: true, Spain: true },
  types: { Apartment: true, Villa: false, House: false },
  beds: { Studio: false, '1': true, '2': true, '3+': false },
  strategy: { 'Long-term rental': true, 'Short-term rental': false, 'Mixed with private use': false, 'Capital growth': false },
  completion: { Ready: true, '<12 months': true, '12–24 months': false },
  priceMax: 400000,
  minGross: 6,
  minNet: 4.5,
  sortBy: 'net',
  page: 1,

  compare: ['larnaca', 'alicante', 'paphos'],
  cmpFull: false,
  savedProps: { larnaca: true },
  savedList: [
    { name: 'Larnaca 1BR — Phase II', meta: '77/100 · 7.2%' },
    { name: 'Málaga 2BR — Old town', meta: '85/100 · 7.0%' },
    { name: 'Paphos 1BR — Sea gardens', meta: '89/100 · 7.4%' },
  ],
  removingSaved: null,
  searchSaved: false,

  calc: { purchase: 175000, financing: 'cash', deposit: 70000, rate: 3.5, term: 20, rent: 1125, occupancy: 90, mgmt: 10, strategy: 'long', rentCase: 'base' },
  weights: DEFAULT_WEIGHTS.map((w) => ({ ...w })),

  loggedIn: true,
  navOpen: false,
  drawerOpen: false,
  srcOpen: false,
  toast: '',
  modal: null,

  browseState: 'ok',
  detailState: 'ok',
  analysisState: 'ok',
  dashState: 'full',
  showErrors: false,
  submitting: false,

  photoFiles: ['aerial_01.jpg', 'facade_dusk.jpg', 'pool_deck.jpg', 'lobby.jpg', 'unit_a201_living.jpg', 'terrace_view.jpg', 'plot_survey.jpg'],
  uploads: [],
  devUnits: [
    { no: 'A-101', beds: '1 bed · 1 bath', area: '55 m²', price: '€175,000', rent: '€1,050', avail: 'Available' },
    { no: 'A-102', beds: '2 bed · 2 bath', area: '78 m²', price: '€242,000', rent: '€1,400', avail: 'Available' },
    { no: 'B-204', beds: '2 bed · 1 bath', area: '71 m²', price: '€228,000', rent: '€1,320', avail: 'Reserved' },
  ],
  planFiles: [
    { ext: 'PDF', name: 'floor_plan_1bed.pdf', meta: '1.2 MB', assign: '' },
    { ext: 'PDF', name: 'floor_plan_2bed.pdf', meta: '1.4 MB', assign: '' },
    { ext: 'PNG', name: 'site_plan.png', meta: '3.1 MB', assign: 'Whole project' },
  ],
  projectKind: 'multi',
  singleSaved: false,
  unitOpen: true,
  editingUnit: null,
  declaredUnits: 12,
  devPortalState: 'verified',
  devVerifyState: 'pending',
  companySaved: false,
  devSubmitting: false,

  adminState: 'pending',
  adminOutcome: null,
  revState: 'pending',
  rescore: 'idle',
  rescorePct: 0,
  queueEmpty: false,
  queueOut: {},
  qTab: 'all',
  alStep: 'creds',
  alError: false,
  alBusy: false,
  setSave: 'idle',
  fpStep: 'request',
  docProgress: null,

  toggleGroup: (group, key) => set((s) => ({ [group]: { ...s[group], [key]: !s[group][key] } }) as Partial<AppState>),
  setPriceMax: (v) => set({ priceMax: v, page: 1 }),
  setMinGross: (v) => set({ minGross: v, page: 1 }),
  setMinNet: (v) => set({ minNet: v, page: 1 }),
  setSortBy: (v) => set({ sortBy: v, page: 1 }),
  setPage: (v) => set({ page: v }),

  toggleCompare: (id, city) => {
    const { compare, showToast } = get();
    if (compare.includes(id)) {
      set({ compare: compare.filter((x) => x !== id), cmpFull: false });
      showToast(`${city} removed from comparison`);
      return;
    }
    if (compare.length >= 5) {
      set({ cmpFull: true });
      showToast('Comparison is full — five properties is the limit');
      return;
    }
    set({ compare: compare.concat(id) });
    showToast(`${city} added to comparison · ${compare.length + 1} of 5`);
  },

  removeCompare: (id, name) => {
    set((s) => ({ compare: s.compare.filter((x) => x !== id), cmpFull: false }));
    get().showToast(`${name} removed from comparison`);
  },

  toggleSave: (id, name) => {
    const { loggedIn, savedProps, showToast } = get();
    if (!loggedIn) {
      showToast('Sign in to save properties to your shortlist');
      return;
    }
    const on = !!savedProps[id];
    set({ savedProps: { ...savedProps, [id]: !on } });
    showToast(on ? `${name} removed from saved` : `${name} saved to your shortlist`);
  },

  setSearchSaved: (v) => set({ searchSaved: v }),
  askRemoveSaved: (i) => set({ removingSaved: i }),
  confirmRemoveSaved: () =>
    set((s) => ({ savedList: s.savedList.filter((_, n) => n !== s.removingSaved), removingSaved: null })),

  setCalc: (patch) => set((s) => ({ calc: { ...s.calc, ...patch } })),
  setWeight: (index, value) =>
    set((s) => {
      const next = s.weights.map((w) => ({ ...w }));
      next[index].value = value;
      return { weights: next };
    }),
  resetWeights: () => set({ weights: DEFAULT_WEIGHTS.map((w) => ({ ...w })) }),

  showToast: (msg) => {
    set({ toast: msg });
    window.setTimeout(() => {
      if (get().toast === msg) set({ toast: '' });
    }, 3800);
  },
  hideToast: () => set({ toast: '' }),

  openModal: (cfg) => set({ modal: { ...cfg, reason: '' } }),
  closeModal: () => set({ modal: null }),
  setModalReason: (v) => set((s) => (s.modal ? { modal: { ...s.modal, reason: v, warn: false } } : {})),
  runModal: () => {
    const m = get().modal;
    if (!m) return;
    if (m.needReason && !m.reason) {
      set({ modal: { ...m, warn: true } });
      return;
    }
    set({ modal: null });
    m.run?.(m.reason);
  },

  setNavOpen: (v) => set({ navOpen: v }),
  setDrawerOpen: (v) => set({ drawerOpen: v }),
  setSrcOpen: (v) => set({ srcOpen: v }),
  setLoggedIn: (v) => set({ loggedIn: v }),
  setBrowseState: (v) => set({ browseState: v }),
  setDetailState: (v) => set({ detailState: v }),
  setAnalysisState: (v) => set({ analysisState: v }),
  setDashState: (v) => set({ dashState: v }),
  toggleErrors: () => set((s) => ({ showErrors: !s.showErrors })),
  setSubmitting: (v) => set({ submitting: v }),

  addPhoto: (name) => set((s) => ({ photoFiles: [...s.photoFiles, name] })),
  removePhoto: (i) => set((s) => ({ photoFiles: s.photoFiles.filter((_, n) => n !== i) })),

  startUpload: () =>
    set({
      uploads: [
        { name: 'render_pool_evening.jpg', pct: 4, error: '' },
        { name: 'render_lobby.jpg', pct: 4, error: '' },
        { name: 'site_aerial_2026.jpg', pct: 4, error: '' },
        { name: 'spec_sheet.tiff', pct: 0, error: 'TIFF is not supported — use jpg or png' },
      ],
    }),

  tickUploads: () =>
    set((s) => {
      if (!s.uploads.length) return {};
      const next = s.uploads.map((u) => (u.error ? u : { ...u, pct: Math.min(100, u.pct + Math.round(9 + Math.random() * 13)) }));
      const finished = next.filter((u) => !u.error && u.pct >= 100).map((u) => u.name);
      const still = next.filter((u) => u.error || u.pct < 100);
      if (finished.length) return { uploads: still, photoFiles: [...s.photoFiles, ...finished] };
      return { uploads: next };
    }),

  dropUpload: (i) => set((s) => ({ uploads: s.uploads.filter((_, n) => n !== i) })),

  setProjectKind: (kind) => set({ projectKind: kind, singleSaved: false }),
  saveSingle: () => set({ singleSaved: true }),
  openUnitForm: () => set({ unitOpen: true, editingUnit: null }),
  closeUnitForm: () => set({ unitOpen: false, editingUnit: null }),
  editUnit: (i) => set({ editingUnit: i, unitOpen: true }),
  saveUnit: () =>
    set((s) =>
      s.editingUnit !== null
        ? { editingUnit: null }
        : {
            devUnits: [
              ...s.devUnits,
              { no: 'C-' + (101 + s.devUnits.length), beds: '1 bed · 1 bath', area: '58 m²', price: '€182,000', rent: '€1,080', avail: 'Available' },
            ],
          }
    ),
  removeUnit: (i) => set((s) => ({ devUnits: s.devUnits.filter((_, n) => n !== i) })),
  duplicateUnit: (i) =>
    set((s) => {
      const u = s.devUnits[i];
      const m = u.no.match(/^([A-Z]-)(\d+)$/);
      const no = m ? m[1] + (parseInt(m[2], 10) + 1) : u.no + ' copy';
      const next = s.devUnits.slice();
      next.splice(i + 1, 0, { ...u, no, avail: 'Available' });
      return { devUnits: next };
    }),
  setDeclaredUnits: (n) => set({ declaredUnits: n }),
  setDevPortalState: (v) => set({ devPortalState: v }),
  setDevVerifyState: (v) => set({ devVerifyState: v }),
  setCompanySaved: (v) => set({ companySaved: v }),
  setDevSubmitting: (v) => set({ devSubmitting: v }),

  setAdminState: (v) => set({ adminState: v }),
  setAdminOutcome: (o) => set({ adminOutcome: o }),
  setRevState: (v) => set({ revState: v }),
  startRescore: () => set({ rescore: 'running', rescorePct: 0 }),
  tickRescore: () =>
    set((s) => {
      const pct = s.rescorePct + Math.round(5 + Math.random() * 9);
      if (pct >= 100) return { rescorePct: 100, rescore: 'done' };
      return { rescorePct: pct };
    }),
  setRescore: (v) => set({ rescore: v, ...(v === 'idle' ? { rescorePct: 0 } : null) }),
  setQueueEmpty: (v) => set({ queueEmpty: v }),
  setQueueOutcome: (ref, outcome) => set((s) => ({ queueOut: { ...s.queueOut, [ref]: outcome } })),
  clearQueueOutcome: (ref) =>
    set((s) => {
      const q = { ...s.queueOut };
      delete q[ref];
      return { queueOut: q };
    }),
  setQTab: (v) => set({ qTab: v }),
  setAlStep: (v) => set({ alStep: v, alError: false, alBusy: false }),
  setAlError: (v) => set({ alError: v }),
  setAlBusy: (v) => set({ alBusy: v }),
  setSetSave: (v) => set({ setSave: v }),
  setFpStep: (v) => set({ fpStep: v }),
  setDocProgress: (v) => set({ docProgress: v }),
}));

// ---- derived helpers, ported from the prototype's logic ----

const num = (v: string) => parseFloat(String(v).replace(/[^0-9.]/g, '')) || 0;

export function sortListings(list: Listing[], sortBy: AppState['sortBy']): Listing[] {
  const copy = list.slice();
  switch (sortBy) {
    case 'gross':
      return copy.sort((a, b) => num(b.gross) - num(a.gross));
    case 'score':
      return copy.sort((a, b) => b.score - a.score);
    case 'price':
      return copy.sort((a, b) => num(a.price) - num(b.price));
    default:
      return copy.sort((a, b) => num(b.net) - num(a.net));
  }
}

export function filteredListings(state: Pick<AppState, 'countries' | 'minGross' | 'minNet' | 'priceMax' | 'sortBy'>): Listing[] {
  const { countries, minGross, minNet, priceMax, sortBy } = state;
  const matched = LISTINGS.filter((p) => {
    const cy = p.location.indexOf('Cyprus') > -1;
    if (cy && !countries.Cyprus) return false;
    if (!cy && !countries.Spain) return false;
    if (parseFloat(p.gross) < minGross) return false;
    if (parseFloat(p.net) < minNet) return false;
    if (parseInt(p.price.replace(/[^0-9]/g, ''), 10) > priceMax) return false;
    return true;
  });
  return sortListings(matched, sortBy);
}

export function matchCount(state: Parameters<typeof filteredListings>[0]): number {
  return filteredListings(state).length;
}

export interface CalcResults {
  loan: number;
  gross: number;
  mgmt: number;
  opex: number;
  annualDebt: number;
  cash: number;
  invested: number;
  coc: number;
}

const roundTo25 = (v: number) => Math.round(v / 25) * 25;

export function bandMonthly(monthlyBase: number, strategy: CalcStrategy) {
  const b = roundTo25((monthlyBase > 0 ? monthlyBase : 0) * (strategy === 'short' ? 1.33 : 1));
  const best = roundTo25(b * 2);
  return { base: b, avg: roundTo25((b + best) / 2), best };
}

export function rentBandFor(purchase: number, strategy: CalcStrategy) {
  return bandMonthly(((purchase > 0 ? purchase : 0) * 1.08 * 0.072) / 12, strategy);
}

export function calcResults(input: CalcState): CalcResults {
  const c = input.rentCase ? { ...input, rent: rentBandFor(input.purchase, input.strategy)[input.rentCase] } : input;
  const loan = c.financing === 'mortgage' ? Math.max(0, c.purchase - c.deposit) : 0;
  const gross = c.rent * 12 * (c.occupancy / 100);
  const mgmt = gross * (c.mgmt / 100);
  const opex = mgmt + 1400;
  let annualDebt = 0;
  if (loan > 0 && c.term > 0) {
    const i = c.rate / 100 / 12;
    const n = c.term * 12;
    annualDebt = i > 0 ? ((loan * i) / (1 - Math.pow(1 + i, -n))) * 12 : (loan / n) * 12;
  }
  const cash = gross - opex - annualDebt;
  const invested = (c.financing === 'mortgage' ? c.deposit : c.purchase) + c.purchase * 0.08;
  return { loan, gross, mgmt, opex, annualDebt, cash, invested, coc: invested > 0 ? (cash / invested) * 100 : 0 };
}

export function calcErrors(c: CalcState): Record<string, string> {
  const e: Record<string, string> = {};
  if (!(c.purchase > 0)) e.purchase = 'Enter a purchase price above zero.';
  if (c.financing === 'mortgage') {
    if (c.deposit < 0) e.deposit = 'Deposit cannot be negative.';
    else if (c.purchase > 0 && c.deposit > c.purchase) e.deposit = 'Deposit cannot exceed the purchase price.';
    if (!(c.term > 0)) e.term = 'Term must be at least 1 year.';
    if (c.rate < 0) e.rate = 'Interest cannot be negative.';
  }
  if (c.rent < 0) e.rent = 'Monthly rent cannot be negative.';
  return e;
}

export function eur(n: number): string {
  const v = Math.round(n);
  return (v < 0 ? '− €' : '€') + Math.abs(v).toLocaleString('en-US');
}

export function eurK(n: number): string {
  return n >= 1000 ? '€' + Math.round(n / 1000) + 'k' : '€' + n;
}

export const toNum = num;

export function acq(p: Listing): number {
  return Math.round((num(p.price) * 1.08) / 1000) * 1000;
}

export function rentAnnual(p: Listing, c: RentCase): number {
  return bandMonthly((acq(p) * parseFloat(p.gross)) / 100 / 12, 'long')[c] * 12;
}

export function rentPair(p: Listing, c: RentCase): string {
  const a = rentAnnual(p, c);
  return `${eur(Math.round(a / 12))} / ${eur(a)}`;
}

export function netCaseNum(p: Listing, c: RentCase): number {
  const a = acq(p);
  const costs = rentAnnual(p, 'base') - (parseFloat(p.net) / 100) * a;
  return ((rentAnnual(p, c) - costs) / a) * 100;
}
