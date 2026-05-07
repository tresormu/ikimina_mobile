export const palette = {
  // Orange (brand)
  orange50:  '#FFF7ED',
  orange100: '#FFEDD5',
  orange200: '#FED7AA',
  orange300: '#FDBA74',
  orange400: '#FB923C',
  orange500: '#F97316',
  orange600: '#EA580C',
  orange700: '#C2410C',
  orange800: '#9A3412',
  orange900: '#7C2D12',

  // Emerald
  emerald50:  '#ECFDF5',
  emerald100: '#D1FAE5',
  emerald500: '#10B981',
  emerald600: '#059669',

  // Rose
  rose50:  '#FFF1F2',
  rose100: '#FFE4E6',
  rose500: '#F43F5E',
  rose600: '#E11D48',

  // Amber
  amber50:  '#FFFBEB',
  amber100: '#FEF3C7',
  amber500: '#F59E0B',
  amber600: '#D97706',

  // Sky
  sky50:  '#F0F9FF',
  sky100: '#E0F2FE',
  sky500: '#0EA5E9',

  // Neutrals
  white:   '#FFFFFF',
  gray50:  '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
  black:   '#000000',
};

export const colors = {
  primary:       palette.orange600,
  primaryLight:  palette.orange50,
  primaryMid:    palette.orange100,
  primaryDark:   palette.orange700,
  primaryDeep:   palette.orange900,

  success:       palette.emerald600,
  successLight:  palette.emerald50,
  successMid:    palette.emerald100,

  danger:        palette.rose600,
  dangerLight:   palette.rose50,
  dangerMid:     palette.rose100,

  warning:       palette.amber500,
  warningLight:  palette.amber50,
  warningMid:    palette.amber100,

  info:          palette.sky500,
  infoLight:     palette.sky50,
  infoMid:       palette.sky100,

  bg:            palette.gray50,
  surface:       palette.white,
  surfaceAlt:    palette.gray100,

  textPrimary:   palette.gray900,
  textSecondary: palette.gray600,
  textMuted:     palette.gray400,
  textInverse:   palette.white,

  border:        palette.gray200,
  borderFocus:   palette.orange500,
  overlay:       'rgba(0,0,0,0.5)',
};

export const spacing = {
  xs:    4,
  sm:    8,
  md:    12,
  lg:    16,
  xl:    20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
};

export const radius = {
  sm:    6,
  md:    10,
  lg:    14,
  xl:    18,
  '2xl': 24,
  '3xl': 32,
  full:  9999,
};

export const fontSize = {
  xs:    11,
  sm:    13,
  base:  15,
  md:    16,
  lg:    18,
  xl:    20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 34,
};

export const fontWeight = {
  regular:   '400' as const,
  medium:    '500' as const,
  semibold:  '600' as const,
  bold:      '700' as const,
  extrabold: '800' as const,
  black:     '900' as const,
};

export const shadow = {
  sm: {
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  lg: {
    shadowColor: palette.orange900,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
  },
};
