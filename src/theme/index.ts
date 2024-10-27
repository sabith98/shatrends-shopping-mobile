import {MD3LightTheme, configureFonts} from 'react-native-paper';
import type {MD3Theme} from 'react-native-paper';

// E-commerce focused color palette
const colors = {
  primary: '#FF385C', // Vibrant Red (like Airbnb)
  primaryContainer: '#FFE4E8',
  secondary: '#00A699', // Teal accent
  secondaryContainer: '#E6F7F5',
  tertiary: '#484848', // Neutral dark
  tertiaryContainer: '#F7F7F7',
  background: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceVariant: '#F8F8F8',
  error: '#FF4444',
  onPrimary: '#FFFFFF',
  onPrimaryContainer: '#FF385C',
  onSecondary: '#FFFFFF',
  onSecondaryContainer: '#00A699',
  onTertiary: '#FFFFFF',
  onTertiaryContainer: '#484848',
  onBackground: '#222222',
  onSurface: '#222222',
  onSurfaceVariant: '#717171',
  outline: '#E8E8E8',
  outlineVariant: '#DDDDDD',
  shadow: '#000000',
  inverseSurface: '#222222',
  inverseOnSurface: '#FFFFFF',
  inversePrimary: '#FF385C',
  backdrop: '#000000',
  elevation: {
    level0: 'transparent',
    level1: '#FFFFFF',
    level2: '#F8F8F8',
    level3: '#F3F3F3',
    level4: '#EEEEEE',
    level5: '#E8E8E8',
  },
};

const fontConfig = {
  fontFamily: 'System',
  displayLarge: {
    fontFamily: 'System',
    fontSize: 57,
    fontWeight: '700',
    letterSpacing: -0.25,
    lineHeight: 64,
  },
  displayMedium: {
    fontFamily: 'System',
    fontSize: 45,
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 52,
  },
  displaySmall: {
    fontFamily: 'System',
    fontSize: 36,
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 44,
  },
  // Add more font configurations as needed
};

export const theme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...colors,
  },
  fonts: configureFonts({config: fontConfig}),
};
