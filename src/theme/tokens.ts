export const colors = {
  background: '#F6F3EC',
  surface: '#FFFDF8',
  ink: '#17150F',
  inkSoft: '#2C281F',
  inkMuted: '#4A453A',
  bodyMuted: '#5C564A',
  meta: '#8A8375',
  metaLight: '#7B756A',
  disabled: '#B2ABA0',
  tabInactive: '#9C9587',
  accent: '#2E5E43',
  accentDark: '#1F3F2D',
  terracotta: '#C4622D',
  onAccent: '#F6F3EC',
  hairline: 'rgba(23,21,15,0.07)',
  hairlineSoft: 'rgba(23,21,15,0.06)',
  hairlineLight: 'rgba(23,21,15,0.05)',
  border: 'rgba(23,21,15,0.16)',
  borderChip: 'rgba(23,21,15,0.12)',
} as const;

export const fonts = {
  serif: 'InstrumentSerif_400Regular',
  mono: 'DMMono_400Regular',
  monoMedium: 'DMMono_500Medium',
} as const;

export const spacing = {
  xxs: 4,
  xs: 5,
  sm: 6,
  smd: 8,
  md: 9,
  mdl: 10,
  lg: 12,
  lgl: 13,
  xl: 14,
  xxl: 16,
  gutter: 18,
  xxxl: 20,
  xxxxl: 22,
  huge: 26,
  header: 64,
} as const;

export const radii = {
  checkbox: 6,
  sm: 12,
  md: 13,
  lg: 16,
  portionCard: 18,
  pill: 999,
} as const;

export const shadow = {
  card: {
    shadowColor: 'rgba(23,21,15,0.18)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
} as const;

export const tints = [
  '#E8C79A',
  '#D9A98C',
  '#C9B98F',
  '#DBC08B',
  '#D08F76',
  '#C4B27E',
  '#E0A97A',
  '#B9AE84',
  '#C79E86',
] as const;
