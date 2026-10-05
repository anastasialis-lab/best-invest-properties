// Design tokens for the v2 "light summer" system, ported from
// project/Best Invest Properties.dc.html.
//
// Three tiers share one palette: the public site is the lightest, signed-in
// investor/developer screens sit a step deeper and cooler, and admin is the
// most muted — still light, never a dark console.

export const color = {
  // ink — headings through to the faintest label
  ink: '#0F3A60',
  navy: '#153A5C',
  navyDeep: '#123F66',
  link: '#174B67',
  slate: '#1B4258',
  body: '#36566B',
  muted: '#566E80',
  muted2: '#526779',
  faint: '#5B7485',
  dim: '#354F63',
  dim2: '#34495C',
  placeholder: '#8FA6B8',

  // actions
  action: '#205A87',
  actionBright: '#087CB8',
  actionDeep: '#174470',
  actionAlt: '#0F3F8F',

  // gold accent — the single warm note
  gold: '#DDB45E',
  goldAlt: '#D9B25B',
  goldWarm: '#E3BC63',
  goldDeep: '#C9982F',
  goldPale: '#F8E4A6',
  goldWash: '#F8EFDC',

  // grounds and surfaces
  ground: '#F7FCFF',
  white: '#FFFFFF',
  sky: '#E5F6FF',
  skyBright: '#8DD8FA',
  panel: '#F0F7FC',
  panelAlt: '#EAF2F8',
  panelBlue: '#DCEEF9',
  edge: '#BFD5E5',

  // semantic
  danger: '#B3453D',
  dangerDeep: '#8E362F',
  dangerWash: '#FCF5F4',
  success: '#2F7D63',
  successWash: '#E4EFE8',
};

// Hairlines and shadows are all tinted with the link/action blues rather than
// neutral grey, which is what keeps the light surfaces from reading as grey.
export const line = (a: number) => `rgba(23,75,103,${a})`;
export const lineAction = (a: number) => `rgba(32,90,135,${a})`;
export const goldLine = (a: number) => `rgba(221,180,94,${a})`;

export const border = {
  hair: line(0.07),
  soft: line(0.1),
  base: line(0.14),
  strong: line(0.18),
  heavy: line(0.22),
};

export const font = {
  ui: "Archivo, system-ui, sans-serif",
  mono: "ui-monospace, Menlo, monospace",
};

// Archivo carries every level; weight, size and gold do the work a second
// typeface used to do.
export const type = {
  hero: { fontWeight: 700, letterSpacing: '-.018em', textTransform: 'uppercase' as const },
  heading: { fontWeight: 700, letterSpacing: '-.012em', textTransform: 'uppercase' as const },
  panelTitle: { fontWeight: 600, letterSpacing: '-.006em' },
  eyebrow: { fontSize: 10, letterSpacing: '.16em', fontWeight: 400 },
  figure: { fontWeight: 700, fontVariantNumeric: 'tabular-nums' as const },
};

export const radius = {
  chip: 999,
  sm: 6,
  md: 10,
  lg: 16,
  xl: 20,
};

export const shadow = {
  card: '0 1px 2px rgba(23,75,103,.05), 0 8px 24px rgba(23,75,103,.06)',
  raised: '0 2px 6px rgba(23,75,103,.07), 0 16px 40px rgba(23,75,103,.09)',
  hero: '0 18px 48px rgba(23,75,103,.16)',
};

export const pill = {
  minHeight: 40,
  borderRadius: radius.chip,
  padding: '0 22px',
  fontSize: 13.5,
  fontWeight: 600,
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
} as const;

// Photo direction: every screen except the landing, auth and developer
// marketing pages sits on the shared coastal photo inside a frosted sheet,
// and its panels are translucent so the photo reads through them.
export const glass = {
  background: 'rgba(255,255,255,.8)',
  border: '1px solid rgba(255,255,255,.55)',
} as const;

// Stronger glass for panels placed straight on the photo.
export const glassStrong = {
  background: 'rgba(255,255,255,.95)',
  WebkitBackdropFilter: 'blur(12px)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,.7)',
  borderRadius: 16,
  boxShadow: '0 14px 36px rgba(6,30,48,.16)',
} as const;

// Dark glass for copy placed straight on the photo.
export const glassDark = {
  background: 'rgba(6,40,62,.6)',
  WebkitBackdropFilter: 'blur(4px)',
  backdropFilter: 'blur(4px)',
  border: '1px solid rgba(255,255,255,.14)',
  borderRadius: 20,
} as const;

// Light glass for a whole section placed on the photo.
export const glassSection = {
  background: 'rgba(247,252,255,.86)',
  WebkitBackdropFilter: 'blur(14px)',
  backdropFilter: 'blur(14px)',
  border: '1px solid rgba(255,255,255,.6)',
  borderRadius: 20,
  boxShadow: '0 18px 44px rgba(6,30,48,.18)',
} as const;

// Inner tinted boxes inside a glass panel.
export const subtle = 'rgba(247,252,255,.62)';
export const navGlass = 'rgba(234,242,248,.66)';
export const photoGradient = 'linear-gradient(180deg,rgba(6,34,54,.42) 0%,rgba(6,40,60,.14) 34%,rgba(6,40,60,.2) 70%,rgba(6,30,48,.46) 100%)';
