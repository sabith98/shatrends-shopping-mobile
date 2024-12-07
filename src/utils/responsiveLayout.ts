import {spacing} from '@theme/spacing';
import {DeviceType} from './responsive';

/**
 * Gets the container padding based on device type
 * @param deviceType - The type of device (mobile, tablet, or desktop)
 * @returns The padding configuration object
 */
export const getContainerPadding = (deviceType: DeviceType) => {
  switch (deviceType) {
    case 'tablet':
      return {paddingHorizontal: spacing.xl};
    case 'desktop':
      return {paddingHorizontal: spacing.xxl};
    default:
      return {paddingHorizontal: spacing.md};
  }
};

/**
 * Gets the form width based on device type and orientation
 * @param deviceType - The type of device (mobile, tablet, or desktop)
 * @param isPortrait - Whether the device is in portrait orientation
 * @returns The form width as a percentage string
 */
export const getFormWidth = (deviceType: DeviceType, isPortrait: boolean) => {
  switch (deviceType) {
    case 'tablet':
      return isPortrait ? '80%' : '60%';
    case 'desktop':
      return '40%';
    default:
      return '100%';
  }
};
