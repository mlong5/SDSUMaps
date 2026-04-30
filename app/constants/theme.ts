// SDSU Maps design tokens.
// Single source of truth for color, spacing, radius, typography, and a11y
// minimums. Components must import from here instead of inlining hex values
// so that brand updates and a11y audits can be done in one place.
//
// Color note: SDSU's officially published primary red is #A6192E (PMS 200).
// The team plan suggested #CC0033 but that is a non-brand approximation.
// We use #A6192E here. If the team decides to keep the plan's value, edit
// `colors.scarlet` below — every Track C surface inherits from this token.

export const colors = {
  scarlet: '#A6192E',
  scarletDark: '#7A1221',
  scarletInk: '#FFFFFF',

  black: '#000000',
  white: '#FFFFFF',

  neutral100: '#F5F5F5',
  neutral200: '#E5E7EB',
  neutral300: '#D1D5DB',
  neutral500: '#6B7280',
  neutral600: '#4B5563',
  neutral700: '#374151',
  neutral900: '#111827',

  overlay: 'rgba(0, 0, 0, 0.45)',
  link: '#1D4ED8',

  danger: '#DC2626',
  dangerSurface: '#FEE2E2',
  success: '#16A34A',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 6,
  md: 10,
  lg: 16,
  pill: 999,
} as const;

export const typography = {
  h1: { fontSize: 28, fontWeight: '700' as const, lineHeight: 34 },
  h2: { fontSize: 22, fontWeight: '700' as const, lineHeight: 28 },
  h3: { fontSize: 18, fontWeight: '600' as const, lineHeight: 24 },
  body: { fontSize: 16, fontWeight: '400' as const, lineHeight: 22 },
  bodyStrong: { fontSize: 16, fontWeight: '600' as const, lineHeight: 22 },
  caption: { fontSize: 13, fontWeight: '400' as const, lineHeight: 18 },
  button: { fontSize: 16, fontWeight: '600' as const, lineHeight: 20 },
} as const;

// WCAG / iOS HIG minimum hit target.
export const tap = { minSize: 44 } as const;
