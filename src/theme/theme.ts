import { MD3LightTheme } from 'react-native-paper';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#2563eb', // Blue-600
    primaryContainer: '#dbeafe', // Blue-100
    secondary: '#64748b', // Slate-500
    secondaryContainer: '#f1f5f9', // Slate-100
    tertiary: '#dc2626', // Red-600
    tertiaryContainer: '#fef2f2', // Red-50
    surface: '#ffffff',
    surfaceVariant: '#f8fafc', // Slate-50
    background: '#ffffff',
    error: '#dc2626',
    errorContainer: '#fef2f2',
    onPrimary: '#ffffff',
    onPrimaryContainer: '#1e40af', // Blue-800
    onSecondary: '#ffffff',
    onSecondaryContainer: '#334155', // Slate-700
    onTertiary: '#ffffff',
    onTertiaryContainer: '#991b1b', // Red-800
    onSurface: '#1f2937', // Gray-800
    onSurfaceVariant: '#64748b', // Slate-500
    onBackground: '#1f2937',
    onError: '#ffffff',
    onErrorContainer: '#991b1b',
    outline: '#d1d5db', // Gray-300
    outlineVariant: '#e5e7eb', // Gray-200
    shadow: '#000000',
    scrim: '#000000',
    inverseSurface: '#374151', // Gray-700
    inverseOnSurface: '#f9fafb', // Gray-50
    inversePrimary: '#93c5fd', // Blue-300
    elevation: {
      level0: 'transparent',
      level1: '#ffffff',
      level2: '#ffffff',
      level3: '#ffffff',
      level4: '#ffffff',
      level5: '#ffffff',
    },
    surfaceDisabled: 'rgba(31, 41, 55, 0.12)',
    onSurfaceDisabled: 'rgba(31, 41, 55, 0.38)',
    backdrop: 'rgba(0, 0, 0, 0.5)',
  },
  roundness: 12,
};

