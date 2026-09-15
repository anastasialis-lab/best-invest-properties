import { create } from 'zustand';
import { LISTINGS, DEFAULT_WEIGHTS, type Listing, type WeightRow } from '@/data/listings';

export type Financing = 'cash' | 'mortgage';

export interface CalcState {
  purchase: number;
  financing: Financing;
  deposit: number;
  rate: number;
  term: number;
  rent: number;
  occupancy: number;
  mgmt: number;
}

interface AppState {
  countries: Record<string, boolean>;
  types: Record<string, boolean>;
  beds: Record<string, boolean>;
  strategy: Record<string, boolean>;
  completion: Record<string, boolean>;
  priceMax: number;
  minGross: number;
  minNet: number;
  compare: string[];
  calc: CalcState;
  weights: WeightRow[];

  toggleGroup: (group: 'countries' | 'types' | 'beds' | 'strategy' | 'completion', key: string) => void;
  setPriceMax: (v: number) => void;
  setMinGross: (v: number) => void;
  setMinNet: (v: number) => void;
  toggleCompare: (id: string) => void;
  setCalc: (patch: Partial<CalcState>) => void;
  setFinancing: (f: Financing) => void;
  setWeight: (index: number, value: number) => void;
  resetWeights: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  countries: { Cyprus: true, Spain: true },
  types: { Apartment: true, Villa: false, House: false },
  beds: { Studio: false, '1': true, '2': true, '3+': false },
  strategy: { 'Long-term rental': true, 'Short-term rental': false, 'Capital appreciation': false },
  completion: { Ready: true, '<12 months': true, '12–24 months': false },
  priceMax: 350000,
  minGross: 6,
  minNet: 4.5,
  compare: ['larnaca', 'alicante', 'paphos'],
  calc: { purchase: 175000, financing: 'mortgage', deposit: 70000, rate: 3.5, term: 20, rent: 1050, occupancy: 90, mgmt: 10 },
  weights: DEFAULT_WEIGHTS.map((w) => ({ ...w })),

  toggleGroup: (group, key) =>
    set((s) => ({ [group]: { ...s[group], [key]: !s[group][key] } } as Partial<AppState>)),

  setPriceMax: (v) => set({ priceMax: v }),
  setMinGross: (v) => set({ minGross: v }),
  setMinNet: (v) => set({ minNet: v }),

  toggleCompare: (id) =>
    set((s) => ({
      compare: s.compare.includes(id) ? s.compare.filter((x) => x !== id) : s.compare.concat(id).slice(-3),
    })),

  setCalc: (patch) => set((s) => ({ calc: { ...s.calc, ...patch } })),
  setFinancing: (f) => set((s) => ({ calc: { ...s.calc, financing: f } })),

  setWeight: (index, value) =>
    set((s) => {
      const next = s.weights.map((w) => ({ ...w }));
      next[index].value = value;
      return { weights: next };
    }),
  resetWeights: () => set({ weights: DEFAULT_WEIGHTS.map((w) => ({ ...w })) }),
}));

export function filteredListings(state: Pick<AppState, 'countries' | 'minGross' | 'minNet' | 'priceMax'>): Listing[] {
  const { countries, minGross, minNet, priceMax } = state;
  return LISTINGS.filter((p) => {
    const cy = p.location.indexOf('Cyprus') > -1;
    if (cy && !countries.Cyprus) return false;
    if (!cy && !countries.Spain) return false;
    if (parseFloat(p.gross) < minGross) return false;
    if (parseFloat(p.net) < minNet) return false;
    if (parseInt(p.price.replace(/[^0-9]/g, ''), 10) > priceMax) return false;
    return true;
  });
}

export function matchCount(state: Pick<AppState, 'countries' | 'minGross' | 'minNet' | 'priceMax'>): number {
  const n = filteredListings(state).length;
  return n ? n * 8 + 3 : 0;
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

export function calcResults(c: CalcState): CalcResults {
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

export function eur(n: number): string {
  return '€' + Math.round(n).toLocaleString('en-US');
}

export function eurK(n: number): string {
  return n >= 1000 ? '€' + Math.round(n / 1000) + 'k' : '€' + n;
}
