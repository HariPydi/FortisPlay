export const Colors = {
  white: '#FFFFFF',
  white50: '#FFFFFF80',
  black: '#000000',
  blue: '#2563FF',

  shadowColorBlack: '#2C2F31',

  // Login page colors

  textPrimary: '#353A51',
  textPrimary30: '#353A514D',
  textPrimary60: '#353A5199',
  textDark: '#1F232B',
  textDark15: '#1F232B26',
  textDark40: '#1F232B66',

  grey1: '#4A4E64',

  passwordPlaceholderText: '#ABADAF',

  // App Header colors
  headerBorder: '#E2E8F0',

  // Dashboard colors
  dashBackground: '#F8FAFC',
  dashBorder: '#E0E0E0',





  // existing
  backgroundTop: '#B8E8F7',
  backgroundBottom: '#E8F4F8',
  cardBackground: '#FFFFFF',
  primaryBlue: '#2563FF',
  primaryBlueHover: '#1565C0',
  textGrey: '#888888',
  textLabel: '#333333',
  inputBackground: '#F8F9FA',
  inputBorder: '#E0E0E0',
  logoBlue: '#1E3A5F',

  // dashboard
  headerBackground: '#FFFFFF',
  chipRed: '#EF4444',
  chipGreen: '#10B981',
  chipText: '#FFFFFF',
  tabActive: '#1A1A2E',
  tabInactive: '#FFFFFF',
  tabTextActive: '#FFFFFF',
  tabTextInactive: '#666666',
  tabBorder: '#DDDDDD',
  dotGreen: '#10B981',
  dotRed: '#EF4444',
  createButton: '#2563FF',
  createButtonText: '#FFFFFF',
  cardBorder: '#E0E0E0',
  thText: '#999999',
  venueText: 'rgba(31, 35, 43, 0.8)',
  breadcrumbText: '#888888',
  refreshIcon: '#5685ed',
  avatarBackground: '#E0E0E0',
  dashCell: '#AAAAAA',
} as const;

export const FontFamily = {
  primaryFont: "Manrope",
  secondaryFont: "Inter"
}

export type ColorKeys = keyof typeof Colors;