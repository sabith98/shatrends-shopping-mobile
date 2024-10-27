import {metrics} from './metrics';

export const spacing = {
  xs: metrics.baseSpacing / 2, // 4
  sm: metrics.baseSpacing, // 8
  md: metrics.baseSpacing * 2, // 16
  lg: metrics.baseSpacing * 3, // 24
  xl: metrics.baseSpacing * 4, // 32
  xxl: metrics.baseSpacing * 5, // 40
} as const;
