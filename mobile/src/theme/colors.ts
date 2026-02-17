// ==========================================
// Design System - Cores
// ==========================================

export const colors = {
  // Cores primárias
  primary: {
    50: '#e8f4fd',
    100: '#d1e9fb',
    200: '#a3d3f7',
    300: '#75bdf3',
    400: '#47a7ef',
    500: '#1a91eb', // Principal
    600: '#1574bc',
    700: '#10578d',
    800: '#0a3a5e',
    900: '#051d2f',
  },

  // Cores secundárias
  secondary: {
    50: '#fdf4e8',
    100: '#fbe9d1',
    200: '#f7d3a3',
    300: '#f3bd75',
    400: '#efa747',
    500: '#eb9119', // Principal
    600: '#bc7415',
    700: '#8d5710',
    800: '#5e3a0a',
    900: '#2f1d05',
  },

  // Tons de cinza
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },

  // Cores de feedback
  success: {
    light: '#d1fae5',
    main: '#10b981',
    dark: '#059669',
  },

  warning: {
    light: '#fef3c7',
    main: '#f59e0b',
    dark: '#d97706',
  },

  error: {
    light: '#fee2e2',
    main: '#ef4444',
    dark: '#dc2626',
  },

  info: {
    light: '#dbeafe',
    main: '#3b82f6',
    dark: '#2563eb',
  },

  // Cores de background
  background: {
    primary: '#0f0f23',
    secondary: '#1a1a2e',
    tertiary: '#25253a',
    card: '#16213e',
  },

  // Cores de texto
  text: {
    primary: '#ffffff',
    secondary: '#a0a0b2',
    tertiary: '#6b6b80',
    inverse: '#0f0f23',
  },

  // Cores utilitárias
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
};

export type Colors = typeof colors;

