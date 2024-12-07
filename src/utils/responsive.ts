import {Dimensions, PixelRatio, Platform, StatusBar} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// Base dimensions (based on standard iPhone screen)
const baseWidth = 375;
const baseHeight = 812;

// Scaling factors
export const widthScale = SCREEN_WIDTH / baseWidth;
export const heightScale = SCREEN_HEIGHT / baseHeight;
export const moderateScale = (size: number, factor = 0.5) => {
  return size + (widthScale - 1) * factor * size;
};

// Responsive font sizing
export const responsiveFontSize = (fontSize: number) => {
  const standardLength = SCREEN_WIDTH > SCREEN_HEIGHT ? SCREEN_WIDTH : SCREEN_HEIGHT;
  const offset =
    SCREEN_WIDTH > SCREEN_HEIGHT ? 0 : Platform.OS === 'ios' ? 78 : StatusBar.currentHeight || 0;

  const deviceHeight =
    Platform.OS === 'android' ? standardLength - offset : standardLength;

  const heightPercent = (fontSize * deviceHeight) / 812;
  return Math.round(heightPercent);
};

// Responsive spacing
export const spacing = {
  xs: moderateScale(4),
  sm: moderateScale(8),
  md: moderateScale(16),
  lg: moderateScale(24),
  xl: moderateScale(32),
  xxl: moderateScale(40),
};

// Responsive breakpoints
export const breakpoints = {
  phone: 0,
  tablet: 768,
  desktop: 1024,
};

// Device type detection
export type DeviceType = 'phone' | 'tablet' | 'desktop';

export const getDeviceType = (): DeviceType => {
  if (SCREEN_WIDTH >= breakpoints.desktop) {return 'desktop';}
  if (SCREEN_WIDTH >= breakpoints.tablet) {return 'tablet';}
  return 'phone';
};

// Responsive dimensions hook
import {useState, useEffect} from 'react';

export const useResponsiveDimensions = () => {
  const [dimensions, setDimensions] = useState({
    window: Dimensions.get('window'),
    screen: Dimensions.get('screen'),
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({window, screen}) => {
        setDimensions({window, screen});
      }
    );

    return () => subscription?.remove();
  }, []);

  return {
    ...dimensions.window,
    isPortrait: dimensions.window.height > dimensions.window.width,
    deviceType: getDeviceType(),
  };
};
