export const Colors = {
  backgroundTop: '#B8E8F7',
  backgroundBottom: '#E8F4F8',
  cardBackground: '#FFFFFF',
  primaryBlue: '#2979FF',
  primaryBlueHover: '#1565C0',
  textDark: '#1A1A2E',
  textGrey: '#888888',
  textLabel: '#333333',
  inputBackground: '#F8F9FA',
  inputBorder: '#E0E0E0',
  inputPlaceholder: '#BBBBBB',
  logoBlue: '#1E3A5F',
} as const;

export type ColorKeys = keyof typeof Colors;