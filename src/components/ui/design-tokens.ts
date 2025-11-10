/**
 * PYMSTR MD3 Design Tokens
 * 
 * Centralized design tokens following Material Design 3 specifications.
 * These tokens map to CSS variables defined in globals.css.
 * 
 * Usage:
 * import { MD3_COLORS, MD3_SPACING, MD3_RADIUS } from './components/ui/design-tokens';
 * 
 * <div className={`bg-[${MD3_COLORS.primary}] p-${MD3_SPACING.md} rounded-${MD3_RADIUS.large}`}>
 */

/**
 * MD3 Color System
 * Following Material Design 3 color roles
 */
export const MD3_COLORS = {
  // Primary Color Role
  primary: '#1E88E5',
  onPrimary: '#FFFFFF',
  primaryContainer: '#E3F2FD',
  onPrimaryContainer: '#1E88E5',
  primaryHover: '#1565C0', // Primary + 8% black state layer
  
  // Secondary Color Role
  secondary: '#07D7FF',
  onSecondary: '#FFFFFF',
  secondaryContainer: 'rgba(7, 215, 255, 0.12)',
  
  // Tertiary Color Role
  tertiary: '#F90BD5',
  onTertiary: '#FFFFFF',
  tertiaryContainer: 'rgba(249, 11, 213, 0.12)',
  
  // Surface Colors
  surface: '#FFFFFF',
  surfaceDim: '#FAFAFA',
  surfaceBright: '#FAFAFA',
  onSurface: '#1C1B1F',
  onSurfaceVariant: '#49454F',
  
  // Dark Mode Surface Colors
  surfaceDark: '#0a0a0a',
  surfaceDimDark: '#2E3C49',
  surfaceBrightDark: '#303030',
  onSurfaceDark: '#F6F7F9',
  onSurfaceVariantDark: '#798A9B',
  
  // Error, Success, Warning
  error: '#DD6B6B',
  onError: '#FFFFFF',
  errorContainer: 'rgba(221, 107, 107, 0.12)',
  
  success: '#7DD069',
  onSuccess: '#FFFFFF',
  successContainer: 'rgba(125, 208, 105, 0.12)',
  
  warning: '#D9C370',
  onWarning: '#2E3C49',
  warningContainer: 'rgba(217, 195, 112, 0.12)',
  
  // Neutral Colors
  outline: '#43586C',
  outlineVariant: '#757575',
} as const;

/**
 * MD3 State Layer Opacity Values
 * Applied on top of base colors for interaction states
 */
export const MD3_STATE_LAYERS = {
  hover: 'rgba(0, 0, 0, 0.08)', // 8% black overlay
  focus: 'rgba(0, 0, 0, 0.12)', // 12% black overlay
  pressed: 'rgba(0, 0, 0, 0.12)', // 12% black overlay
  dragged: 'rgba(0, 0, 0, 0.16)', // 16% black overlay
  selected: 'rgba(0, 0, 0, 0.12)', // 12% black overlay
  
  hoverDark: 'rgba(255, 255, 255, 0.08)', // 8% white overlay
  focusDark: 'rgba(255, 255, 255, 0.12)', // 12% white overlay
  pressedDark: 'rgba(255, 255, 255, 0.12)', // 12% white overlay
} as const;

/**
 * MD3 Border Radius Scale
 * Following Material Design 3 specifications
 */
export const MD3_RADIUS = {
  none: '0', // 0px
  extraSmall: '4px', // 4px - Input fields
  small: '8px', // 8px - Chips, small containers
  medium: '12px', // 12px - Dropdowns, nested cards
  large: '16px', // 16px - Main cards, sheets
  extraLarge: '24px', // 24px - Dialogs, modals
  full: '9999px', // Pill shape - Buttons, FABs, badges
} as const;

/**
 * MD3 Border Radius Tailwind Classes
 * Direct mapping to Tailwind utilities
 */
export const MD3_RADIUS_CLASSES = {
  none: 'rounded-none',
  extraSmall: 'rounded', // 4px
  small: 'rounded-lg', // 8px
  medium: 'rounded-xl', // 12px
  large: 'rounded-2xl', // 16px
  extraLarge: 'rounded-3xl', // 24px
  full: 'rounded-full', // Pill shape
} as const;

/**
 * MD3 Elevation (Shadow) System
 * Levels 0-5 for visual hierarchy
 */
export const MD3_ELEVATION = {
  level0: 'shadow-none', // No elevation
  level1: 'shadow-sm', // 1dp - Cards, buttons
  level2: 'shadow-md', // 3dp - Dialogs, dropdowns
  level3: 'shadow-lg', // 6dp - FABs, date pickers
  level4: 'shadow-xl', // 8dp - Navigation drawers, modals
  level5: 'shadow-2xl', // 12dp - Modal overlays
} as const;

/**
 * MD3 Spacing Scale (8dp/4dp Grid)
 * Based on Tailwind's 4px increments
 */
export const MD3_SPACING = {
  xs: '1', // 4px (4dp sub-grid)
  sm: '2', // 8px (8dp grid) ✓
  md: '4', // 16px (8dp grid) ✓
  lg: '6', // 24px (8dp grid) ✓
  xl: '8', // 32px (8dp grid) ✓
  '2xl': '12', // 48px (8dp grid) ✓
  '3xl': '16', // 64px (8dp grid) ✓
} as const;

/**
 * MD3 Icon Sizes (4dp sub-grid)
 */
export const MD3_ICON_SIZES = {
  small: 'w-4 h-4', // 16px
  medium: 'w-[18px] h-[18px]', // 18px (MD3 standard)
  regular: 'w-5 h-5', // 20px
  large: 'w-6 h-6', // 24px
  extraLarge: 'w-8 h-8', // 32px
} as const;

/**
 * MD3 Button Heights (8dp grid, 48dp minimum touch target)
 */
export const MD3_BUTTON_HEIGHTS = {
  small: 'h-8', // 32px (desktop only)
  regular: 'h-10', // 40px
  large: 'h-12', // 48px (MD3 minimum touch target)
  extraLarge: 'h-14', // 56px
} as const;

/**
 * MD3 Touch Targets
 */
export const MD3_TOUCH_TARGET = {
  minimum: 'min-h-12', // 48px × 48px (MD3 requirement)
  fab: 'w-14 h-14', // 56px FAB
  fabSmall: 'w-12 h-12', // 48px small FAB
  fabLarge: 'w-16 h-16', // 64px large FAB
} as const;

/**
 * MD3 Transitions (Easing Curves)
 */
export const MD3_TRANSITIONS = {
  standard: 'transition-all duration-200 ease-out', // Most transitions
  emphasized: 'transition-all duration-500', // Large layout changes
  decelerated: 'transition-all duration-200 ease-out', // Elements entering
  accelerated: 'transition-all duration-150 ease-in', // Elements exiting
} as const;

/**
 * MD3 Container Max Widths
 */
export const MD3_CONTAINERS = {
  narrow: 'max-w-4xl', // 896px - Reading content
  standard: 'max-w-7xl', // 1280px - Default
  wide: 'max-w-screen-2xl', // 1536px - Wide layouts
} as const;

/**
 * MD3 Page Padding (Responsive)
 */
export const MD3_PAGE_PADDING = {
  mobile: 'px-4', // 16px
  tablet: 'px-6', // 24px
  desktop: 'px-8', // 32px
  responsive: 'px-6 lg:px-8', // 24px → 32px
} as const;

/**
 * Utility function to get CSS variable value
 */
export const getMD3Token = (tokenPath: string): string => {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(tokenPath).trim();
};

/**
 * Utility function to check if dark mode is active
 */
export const isDarkMode = (): boolean => {
  if (typeof window === 'undefined') return false;
  return document.documentElement.classList.contains('dark');
};
