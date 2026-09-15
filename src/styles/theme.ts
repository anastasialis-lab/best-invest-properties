// Design tokens ported from the Claude Design prototype
// (project/Best Invest Properties.dc.html) — navy/gold investor palette,
// green developer palette, dark admin palette.

export const color = {
  // core investor palette
  navyDark: '#0A1F38',
  navy: '#0E2A4A',
  ink: '#12263D',
  gold: '#B8892B',
  goldLight: '#E2B558',
  paper: '#EDEAE3',
  cardAlt: '#FBFAF7',
  panel: '#F2EFE8',
  panelAlt: '#F4F1EA',
  white: '#FFFFFF',
  textMuted: '#48596B',
  textFaint: '#7A8899',
  textPlaceholder: '#93A3B4',
  railMuted: '#7E93AB',
  railFaint: '#6F859F',
  railText: '#E9EEF4',
  border: 'rgba(14,42,74,.12)',
  borderSoft: 'rgba(14,42,74,.08)',
  borderStrong: 'rgba(14,42,74,.18)',
  divider: 'rgba(14,42,74,.1)',

  // developer (green) palette
  devDark: '#1F3B2E',
  devBg: '#F4F5F2',
  devMuted: '#6B8375',
  devLight: '#E7EFE9',
  devBorder: 'rgba(31,59,46,.14)',
  devBorderStrong: 'rgba(31,59,46,.2)',
  devText: '#4F6157',
  devTextStrong: '#41594C',
  devFaded: '#93B1A1',
  devFaded2: '#9DB6A6',
  devPale: '#BDD0C4',

  // admin (dark) palette
  adminBg: '#15181C',
  adminSidebar: '#0F1216',
  adminCard: '#1C2027',
  adminText: '#E4E7EB',
  adminMuted: '#7E93AB',
  adminMuted2: '#B4BCC7',
  adminBorder: 'rgba(255,255,255,.07)',
  adminBorder2: 'rgba(255,255,255,.1)',
  approve: '#2F6B4F',
  approveLight: '#7FB49A',
  reject: '#D9837C',

  // legal draft banner
  draftBg: '#FBF3E0',
  draftBorder: 'rgba(184,137,43,.34)',
  draftText: '#8A6A22',
};

export const font = {
  display: "'Newsreader', Georgia, serif",
  ui: "'Archivo', system-ui, sans-serif",
  mono: "ui-monospace, Menlo, monospace",
};

export const radius = {
  sm: 4,
  md: 6,
  lg: 9,
  xl: 10,
};

export const shadow = {
  card: '0 10px 30px rgba(10,31,56,.07)',
  hero: '0 12px 30px rgba(10,31,56,.12)',
  button: '0 10px 24px rgba(4,14,26,.35)',
};

export const stripedPlaceholder = (light = '#DFE5EC', dark = '#EDF1F5') =>
  `repeating-linear-gradient(135deg, ${light} 0 9px, ${dark} 9px 18px)`;

export const stripedPlaceholderDev = (light = '#DDE4DE', dark = '#EDF1EE') =>
  `repeating-linear-gradient(135deg, ${light} 0 8px, ${dark} 8px 16px)`;
