export const Colors = {
  // existing
  backgroundTop: '#B8E8F7',
  backgroundBottom: '#E8F4F8',
  cardBackground: '#FFFFFF',
  primaryBlue: '#2563FF',
  primaryBlueHover: '#1565C0',
  textDark: '#1F232B',
  textGrey: '#888888',
  textLabel: '#333333',
  inputBackground: '#F8F9FA',
  inputBorder: '#E0E0E0',
  inputPlaceholder: 'rgba(53, 58, 81, 0.6)',
  passwordPlaceholder: '#ABADAF',
  logoBlue: '#1E3A5F',

  // dashboard
  dashBackground: '#F8FAFC',
  headerBackground: '#FFFFFF',
  headerBorder: '#E0E0E0',
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
  secondaryFont: "Intel"
}

export type ColorKeys = keyof typeof Colors;