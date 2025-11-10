/**
 * MD3 Component Library for PYMSTR
 * 
 * Pre-built Material Design 3 compliant components
 * following Guidelines.md specifications
 */

import React from 'react';
import { cn } from '../ui/utils';
import { Button } from '../ui/button';
import { 
  Plus, 
  Trash2, 
  Check, 
  AlertTriangle, 
  Save, 
  Edit, 
  Settings,
  X,
  Search,
  Download,
  Upload,
  Send,
  Copy
} from 'lucide-react';

// ============================================================================
// MD3 BUTTONS
// ============================================================================

/**
 * MD3 Filled Button (Primary)
 * Highest emphasis button for primary actions
 */
export const MD3FilledButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'> & { icon?: React.ReactNode }
>(({ className, icon, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      // MD3 Filled Button - Primary
      "inline-flex items-center justify-center gap-2 px-8 py-3 min-h-12 rounded-full",
      "bg-[#1E88E5] text-white",
      "hover:bg-[#1565C0] hover:shadow-sm",
      "active:scale-[0.98]",
      "focus:ring-2 focus:ring-[#1E88E5] focus:ring-offset-2 focus:outline-none",
      "disabled:bg-[#43586C] disabled:text-[#798A9B] disabled:opacity-38 disabled:cursor-not-allowed",
      "transition-all duration-200",
      className
    )}
    {...props}
  >
    {icon && <span className="w-[18px] h-[18px]">{icon}</span>}
    {children}
  </button>
));
MD3FilledButton.displayName = 'MD3FilledButton';

/**
 * MD3 Outlined Button (Secondary)
 * Medium emphasis button for supporting actions
 */
export const MD3OutlinedButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'> & { icon?: React.ReactNode }
>(({ className, icon, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      // MD3 Outlined Button
      "inline-flex items-center justify-center gap-2 px-6 py-2.5 min-h-10 rounded-full",
      "bg-transparent border border-[#1E88E5] text-[#1E88E5]",
      "hover:bg-[#E3F2FD]",
      "active:bg-[#E3F2FD]/80",
      "focus:ring-2 focus:ring-[#1E88E5] focus:outline-none",
      "disabled:border-[#43586C] disabled:text-[#798A9B] disabled:opacity-38 disabled:cursor-not-allowed",
      "transition-all duration-200",
      className
    )}
    {...props}
  >
    {icon && <span className="w-[18px] h-[18px]">{icon}</span>}
    {children}
  </button>
));
MD3OutlinedButton.displayName = 'MD3OutlinedButton';

/**
 * MD3 Text Button (Tertiary)
 * Low emphasis button for optional actions
 */
export const MD3TextButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'> & { icon?: React.ReactNode }
>(({ className, icon, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      // MD3 Text Button
      "inline-flex items-center justify-center gap-2 px-6 py-2.5 min-h-10 rounded-full",
      "bg-transparent border border-[#43586C] text-[#F6F7F9] dark:text-[#F6F7F9]",
      "hover:bg-white/[0.08] hover:border-[#757575] hover:text-[#757575]",
      "active:bg-white/[0.12]",
      "focus:ring-2 focus:ring-[#43586C] focus:outline-none",
      "disabled:border-[#43586C] disabled:text-[#798A9B] disabled:opacity-38 disabled:cursor-not-allowed",
      "transition-all duration-200",
      className
    )}
    {...props}
  >
    {icon && <span className="w-[18px] h-[18px]">{icon}</span>}
    {children}
  </button>
));
MD3TextButton.displayName = 'MD3TextButton';

/**
 * MD3 Error/Delete Button
 * Outlined button that fills with error color on hover
 */
export const MD3ErrorButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'> & { icon?: React.ReactNode }
>(({ className, icon, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      // MD3 Error Button (Destructive)
      "inline-flex items-center justify-center gap-2 px-6 py-2.5 min-h-12 rounded-full",
      "bg-transparent border border-[#DD6B6B] text-[#DD6B6B]",
      "hover:bg-[#DD6B6B] hover:text-white hover:shadow-sm",
      "active:scale-[0.98]",
      "focus:ring-2 focus:ring-[#DD6B6B] focus:ring-offset-2 focus:outline-none",
      "disabled:border-[#43586C] disabled:text-[#798A9B] disabled:opacity-38 disabled:cursor-not-allowed",
      "transition-all duration-200",
      className
    )}
    {...props}
  >
    {icon && <span className="w-5 h-5">{icon}</span>}
    {children}
  </button>
));
MD3ErrorButton.displayName = 'MD3ErrorButton';

/**
 * MD3 Success Button
 * Outlined button that fills with success color on hover
 */
export const MD3SuccessButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'> & { icon?: React.ReactNode }
>(({ className, icon, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      // MD3 Success Button
      "inline-flex items-center justify-center gap-2 px-8 py-3 min-h-12 rounded-full",
      "bg-transparent border border-[#7DD069] text-[#7DD069]",
      "hover:bg-[#7DD069] hover:text-white hover:shadow-sm",
      "active:scale-[0.98]",
      "focus:ring-2 focus:ring-[#7DD069] focus:ring-offset-2 focus:outline-none",
      "disabled:border-[#43586C] disabled:text-[#798A9B] disabled:opacity-38 disabled:cursor-not-allowed",
      "transition-all duration-200",
      className
    )}
    {...props}
  >
    {icon && <span className="w-5 h-5">{icon}</span>}
    {children}
  </button>
));
MD3SuccessButton.displayName = 'MD3SuccessButton';

/**
 * MD3 Warning Button
 * Outlined button that fills with warning color on hover
 */
export const MD3WarningButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'> & { icon?: React.ReactNode }
>(({ className, icon, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      // MD3 Warning Button
      "inline-flex items-center justify-center gap-2 px-6 py-2.5 min-h-12 rounded-full",
      "bg-transparent border border-[#D9C370] text-[#D9C370]",
      "hover:bg-[#D9C370] hover:text-[#2E3C49] hover:shadow-sm",
      "active:scale-[0.98]",
      "focus:ring-2 focus:ring-[#D9C370] focus:ring-offset-2 focus:outline-none",
      "disabled:border-[#43586C] disabled:text-[#798A9B] disabled:opacity-38 disabled:cursor-not-allowed",
      "transition-all duration-200",
      className
    )}
    {...props}
  >
    {icon && <span className="w-5 h-5">{icon}</span>}
    {children}
  </button>
));
MD3WarningButton.displayName = 'MD3WarningButton';

// ============================================================================
// MD3 FABs (Floating Action Buttons)
// ============================================================================

/**
 * MD3 Primary FAB (Cyan)
 * Standard 56px × 56px floating action button
 */
export const MD3PrimaryFAB = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'> & { icon: React.ReactNode }
>(({ className, icon, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      // MD3 FAB - Primary (Cyan)
      "w-14 h-14 rounded-full flex items-center justify-center",
      "bg-[#07D7FF] text-white",
      "shadow-lg hover:shadow-xl hover:scale-105",
      "active:scale-95",
      "focus:ring-2 focus:ring-[#07D7FF] focus:ring-offset-2 focus:outline-none",
      "transition-all duration-200",
      className
    )}
    {...props}
  >
    <span className="w-6 h-6">{icon}</span>
  </button>
));
MD3PrimaryFAB.displayName = 'MD3PrimaryFAB';

/**
 * MD3 Secondary FAB (Magenta)
 * Standard 56px × 56px floating action button
 */
export const MD3SecondaryFAB = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'> & { icon: React.ReactNode }
>(({ className, icon, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      // MD3 FAB - Secondary (Magenta)
      "w-14 h-14 rounded-full flex items-center justify-center",
      "bg-[#F90BD5] text-white",
      "shadow-lg hover:shadow-xl hover:scale-105",
      "active:scale-95",
      "focus:ring-2 focus:ring-[#F90BD5] focus:ring-offset-2 focus:outline-none",
      "transition-all duration-200",
      className
    )}
    {...props}
  >
    <span className="w-6 h-6">{icon}</span>
  </button>
));
MD3SecondaryFAB.displayName = 'MD3SecondaryFAB';

/**
 * MD3 Small FAB
 * Compact 48px × 48px floating action button
 */
export const MD3SmallFAB = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'> & { icon: React.ReactNode }
>(({ className, icon, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      // MD3 Small FAB
      "w-12 h-12 rounded-full flex items-center justify-center",
      "bg-[#07D7FF] text-white",
      "shadow-lg hover:shadow-xl hover:scale-105",
      "active:scale-95",
      "focus:ring-2 focus:ring-[#07D7FF] focus:ring-offset-2 focus:outline-none",
      "transition-all duration-200",
      className
    )}
    {...props}
  >
    <span className="w-5 h-5">{icon}</span>
  </button>
));
MD3SmallFAB.displayName = 'MD3SmallFAB';

/**
 * MD3 Large FAB
 * Large 64px × 64px floating action button
 */
export const MD3LargeFAB = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'> & { icon: React.ReactNode }
>(({ className, icon, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      // MD3 Large FAB
      "w-16 h-16 rounded-full flex items-center justify-center",
      "bg-[#07D7FF] text-white",
      "shadow-lg hover:shadow-xl hover:scale-105",
      "active:scale-95",
      "focus:ring-2 focus:ring-[#07D7FF] focus:ring-offset-2 focus:outline-none",
      "transition-all duration-200",
      className
    )}
    {...props}
  >
    <span className="w-8 h-8">{icon}</span>
  </button>
));
MD3LargeFAB.displayName = 'MD3LargeFAB';

// ============================================================================
// MD3 INPUTS
// ============================================================================

/**
 * MD3 Outlined Input (Standard)
 * Default MD3 text field with 4px radius
 */
export const MD3OutlinedInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      // MD3 Outlined Input - 4px radius (Extra Small)
      "w-full h-12 px-4 py-3 rounded bg-transparent",
      "border border-[#43586C] text-[#F6F7F9] placeholder:text-[#798A9B]",
      "hover:border-[#757575]",
      "focus:border-2 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5] focus:outline-none",
      "disabled:border-[#43586C]/[0.38] disabled:text-[#798A9B]/[0.38] disabled:cursor-not-allowed",
      "transition-all duration-200",
      className
    )}
    {...props}
  />
));
MD3OutlinedInput.displayName = 'MD3OutlinedInput';

/**
 * MD3 Outlined Input (Large - 56px height)
 * Large MD3 text field for prominent forms
 */
export const MD3OutlinedInputLarge = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      // MD3 Outlined Input Large - 4px radius, 56px height
      "w-full h-14 px-4 py-4 rounded bg-transparent",
      "border border-[#43586C] text-[#F6F7F9] placeholder:text-[#798A9B]",
      "hover:border-[#757575]",
      "focus:border-2 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5] focus:outline-none",
      "disabled:border-[#43586C]/[0.38] disabled:text-[#798A9B]/[0.38] disabled:cursor-not-allowed",
      "transition-all duration-200",
      className
    )}
    {...props}
  />
));
MD3OutlinedInputLarge.displayName = 'MD3OutlinedInputLarge';

/**
 * MD3 Filled Input
 * MD3 filled variant with top rounded corners only
 */
export const MD3FilledInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      // MD3 Filled Input - 4px top radius only
      "w-full h-14 px-4 py-4 rounded-t",
      "bg-[#FAFAFA] dark:bg-[#303030] border-b-2 border-[#43586C]",
      "text-[#1C1B1F] dark:text-[#F6F7F9] placeholder:text-[#49454F] dark:placeholder:text-[#798A9B]",
      "focus:border-b-2 focus:border-[#1E88E5] focus:outline-none",
      "disabled:bg-[#FAFAFA]/[0.12] dark:disabled:bg-[#303030]/[0.12] disabled:text-[#798A9B]/[0.38] disabled:cursor-not-allowed",
      "transition-all duration-200",
      className
    )}
    {...props}
  />
));
MD3FilledInput.displayName = 'MD3FilledInput';

/**
 * MD3 Input with Error State
 * Outlined input showing error state
 */
export const MD3OutlinedInputError = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      // MD3 Outlined Input - Error State
      "w-full h-12 px-4 py-3 rounded bg-transparent",
      "border-2 border-[#DD6B6B] text-[#F6F7F9] placeholder:text-[#798A9B]",
      "focus:ring-2 focus:ring-[#DD6B6B] focus:outline-none",
      "transition-all duration-200",
      className
    )}
    {...props}
  />
));
MD3OutlinedInputError.displayName = 'MD3OutlinedInputError';

// ============================================================================
// MD3 CARDS
// ============================================================================

/**
 * MD3 Elevated Card (Level 1)
 * Default card with shadow elevation
 */
export const MD3ElevatedCard = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // MD3 Elevated Card - Level 1, Large radius (16px)
      "bg-white dark:bg-[#303030] rounded-2xl p-6 shadow-sm",
      "transition-all duration-200",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
MD3ElevatedCard.displayName = 'MD3ElevatedCard';

/**
 * MD3 Filled Card (Level 0)
 * Flat card with border, no elevation
 */
export const MD3FilledCard = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // MD3 Filled Card - Level 0, Large radius (16px)
      "bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-2xl p-6 border border-[#43586C]",
      "transition-all duration-200",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
MD3FilledCard.displayName = 'MD3FilledCard';

/**
 * MD3 Interactive Card
 * Clickable card with hover elevation change
 */
export const MD3InteractiveCard = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, children, onClick, ...props }, ref) => (
  <div
    ref={ref}
    onClick={onClick}
    className={cn(
      // MD3 Interactive Card - Large radius (16px)
      "bg-white dark:bg-[#303030] rounded-2xl p-6 shadow-sm",
      "hover:shadow-md hover:bg-black/[0.04] dark:hover:bg-white/[0.04]",
      "active:shadow-sm",
      "focus:ring-2 focus:ring-[#1E88E5] focus:ring-offset-2 focus:outline-none",
      "transition-all duration-200 cursor-pointer",
      className
    )}
    tabIndex={0}
    {...props}
  >
    {children}
  </div>
));
MD3InteractiveCard.displayName = 'MD3InteractiveCard';

/**
 * MD3 Nested Section
 * Section within a card - Medium radius (12px)
 */
export const MD3NestedSection = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // MD3 Nested Section - Medium radius (12px)
      "bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-xl p-4",
      "transition-all duration-200",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
MD3NestedSection.displayName = 'MD3NestedSection';

/**
 * MD3 Small Container
 * Compact container - Small radius (8px)
 */
export const MD3SmallContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // MD3 Small Container - Small radius (8px)
      "bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-lg p-3 border border-[#43586C]",
      "transition-all duration-200",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
MD3SmallContainer.displayName = 'MD3SmallContainer';

// ============================================================================
// MD3 BADGES
// ============================================================================

/**
 * MD3 Success Badge
 * Pill-shaped status badge for success states
 */
export const MD3SuccessBadge = React.forwardRef<
  HTMLSpanElement,
  React.ComponentProps<'span'>
>(({ className, children, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      // MD3 Badge - Success (Full radius pill)
      "inline-flex items-center px-3 py-1 rounded-full",
      "bg-[#7DD069] text-white text-[11px] font-medium",
      className
    )}
    {...props}
  >
    {children}
  </span>
));
MD3SuccessBadge.displayName = 'MD3SuccessBadge';

/**
 * MD3 Error Badge
 * Pill-shaped status badge for error states
 */
export const MD3ErrorBadge = React.forwardRef<
  HTMLSpanElement,
  React.ComponentProps<'span'>
>(({ className, children, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      // MD3 Badge - Error (Full radius pill)
      "inline-flex items-center px-3 py-1 rounded-full",
      "bg-[#DD6B6B] text-white text-[11px] font-medium",
      className
    )}
    {...props}
  >
    {children}
  </span>
));
MD3ErrorBadge.displayName = 'MD3ErrorBadge';

/**
 * MD3 Warning Badge
 * Pill-shaped status badge for warning states
 */
export const MD3WarningBadge = React.forwardRef<
  HTMLSpanElement,
  React.ComponentProps<'span'>
>(({ className, children, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      // MD3 Badge - Warning (Full radius pill)
      "inline-flex items-center px-3 py-1 rounded-full",
      "bg-[#D9C370] text-[#2E3C49] text-[11px] font-medium",
      className
    )}
    {...props}
  >
    {children}
  </span>
));
MD3WarningBadge.displayName = 'MD3WarningBadge';

/**
 * MD3 Count Badge
 * Circular notification badge for counts
 */
export const MD3CountBadge = React.forwardRef<
  HTMLSpanElement,
  React.ComponentProps<'span'>
>(({ className, children, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      // MD3 Count Badge - Circular
      "inline-flex items-center justify-center w-6 h-6 rounded-full",
      "bg-[#DD6B6B] text-white text-[11px] font-medium",
      className
    )}
    {...props}
  >
    {children}
  </span>
));
MD3CountBadge.displayName = 'MD3CountBadge';

/**
 * MD3 Chip/Tag Badge
 * Interactive chip with removable option
 */
export const MD3ChipBadge = React.forwardRef<
  HTMLSpanElement,
  React.ComponentProps<'span'> & { onRemove?: () => void }
>(({ className, children, onRemove, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      // MD3 Chip Badge - Full radius pill
      "inline-flex items-center px-3 py-1.5 rounded-full",
      "bg-[#303030] text-[#F6F7F9] border border-[#43586C]",
      "text-[11px] font-medium",
      "hover:bg-[#43586C] transition-colors duration-200",
      onRemove && "cursor-pointer",
      className
    )}
    {...props}
  >
    {children}
    {onRemove && (
      <X
        className="w-3 h-3 ml-1.5 cursor-pointer"
        onClick={onRemove}
      />
    )}
  </span>
));
MD3ChipBadge.displayName = 'MD3ChipBadge';

// ============================================================================
// EXAMPLE USAGE COMPONENTS
// ============================================================================

/**
 * Example: Complete Form with MD3 Components
 */
export const MD3FormExample: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [price, setPrice] = React.useState('');

  return (
    <MD3ElevatedCard className="max-w-md">
      <h2 className="text-xl font-medium mb-4">Create Payment Link</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#F6F7F9]">Email</label>
          <MD3OutlinedInput
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#F6F7F9]">Price</label>
          <MD3OutlinedInputLarge
            type="number"
            placeholder="100.00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="flex gap-3">
          <MD3FilledButton icon={<Check />} className="flex-1">
            Create
          </MD3FilledButton>
          <MD3OutlinedButton icon={<X />}>
            Cancel
          </MD3OutlinedButton>
        </div>
      </div>
    </MD3ElevatedCard>
  );
};

/**
 * Example: Action Buttons Showcase
 */
export const MD3ButtonShowcase: React.FC = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-[#798A9B]">Primary Actions</h3>
        <div className="flex flex-wrap gap-3">
          <MD3FilledButton icon={<Plus />}>
            Create Payment
          </MD3FilledButton>
          <MD3OutlinedButton icon={<Save />}>
            Save Changes
          </MD3OutlinedButton>
          <MD3TextButton icon={<Settings />}>
            Settings
          </MD3TextButton>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-[#798A9B]">Semantic Actions</h3>
        <div className="flex flex-wrap gap-3">
          <MD3ErrorButton icon={<Trash2 />}>
            Delete
          </MD3ErrorButton>
          <MD3SuccessButton icon={<Check />}>
            Confirm
          </MD3SuccessButton>
          <MD3WarningButton icon={<AlertTriangle />}>
            Archive
          </MD3WarningButton>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-[#798A9B]">FABs</h3>
        <div className="flex items-center gap-3">
          <MD3LargeFAB icon={<Plus />} />
          <MD3PrimaryFAB icon={<Send />} />
          <MD3SmallFAB icon={<Edit />} />
          <MD3SecondaryFAB icon={<Download />} />
        </div>
      </div>
    </div>
  );
};

/**
 * Example: Card Layouts
 */
export const MD3CardShowcase: React.FC = () => {
  return (
    <div className="space-y-6 p-6">
      <MD3ElevatedCard>
        <h3 className="font-medium mb-2">Elevated Card</h3>
        <p className="text-sm text-[#798A9B]">
          This card has Level 1 elevation with shadow.
        </p>
      </MD3ElevatedCard>

      <MD3FilledCard>
        <h3 className="font-medium mb-2">Filled Card</h3>
        <p className="text-sm text-[#798A9B]">
          This card has no elevation, just a border.
        </p>
      </MD3FilledCard>

      <MD3InteractiveCard>
        <h3 className="font-medium mb-2">Interactive Card</h3>
        <p className="text-sm text-[#798A9B]">
          This card is clickable with hover effects.
        </p>
      </MD3InteractiveCard>

      <MD3ElevatedCard>
        <h3 className="font-medium mb-4">Card with Nested Section</h3>
        <MD3NestedSection>
          <p className="text-sm">This is a nested section with Medium radius.</p>
        </MD3NestedSection>
      </MD3ElevatedCard>
    </div>
  );
};

/**
 * Example: Badges Showcase
 */
export const MD3BadgeShowcase: React.FC = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-[#798A9B]">Status Badges</h3>
        <div className="flex flex-wrap gap-3">
          <MD3SuccessBadge>Active</MD3SuccessBadge>
          <MD3ErrorBadge>Inactive</MD3ErrorBadge>
          <MD3WarningBadge>Pending</MD3WarningBadge>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-[#798A9B]">Count Badges</h3>
        <div className="flex items-center gap-3">
          <div className="relative inline-block">
            <Button size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <MD3CountBadge className="absolute -top-1 -right-1">3</MD3CountBadge>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-[#798A9B]">Chip Badges</h3>
        <div className="flex flex-wrap gap-2">
          <MD3ChipBadge onRemove={() => console.log('Remove USDC')}>
            USDC
          </MD3ChipBadge>
          <MD3ChipBadge onRemove={() => console.log('Remove USDT')}>
            USDT
          </MD3ChipBadge>
          <MD3ChipBadge onRemove={() => console.log('Remove EURC')}>
            EURC
          </MD3ChipBadge>
        </div>
      </div>
    </div>
  );
};
