// ==========================================
// Design System - Export Central
// ==========================================

export * from './colors';
export * from './spacing';
export * from './typography';

import { colors } from './colors';
import { spacing, borderRadius } from './spacing';
import { typography, fontSizes, fontWeights } from './typography';

export const theme = {
  colors,
  spacing,
  borderRadius,
  typography,
  fontSizes,
  fontWeights,
};

export type Theme = typeof theme;

