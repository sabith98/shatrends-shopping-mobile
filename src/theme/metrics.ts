import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const metrics = {
  screenWidth: width,
  screenHeight: height,
  baseSpacing: 8,
  basePadding: 16,
  baseRadius: 12,
};

// Breakpoints (in dp)
export const breakpoints = {
  phone: 0,
  tablet: 768,
  desktop: 1024,
} as const;
