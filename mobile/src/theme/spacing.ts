// ==========================================
// Design System - Espaçamentos
// ==========================================

export const spacing = {
  // Espaçamentos base (múltiplos de 4)
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,

  // Espaçamentos específicos
  screenPadding: 20,
  cardPadding: 16,
  inputPadding: 12,
  buttonPadding: 14,
};

export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
};

export type Spacing = typeof spacing;
export type BorderRadius = typeof borderRadius;

