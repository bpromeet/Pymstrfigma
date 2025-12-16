import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from './ui/button';

interface RefreshButtonProps {
  onClick: () => void;
  className?: string;
}

/**
 * RefreshButton Component - MD3 Compliant
 * 
 * Standardized refresh button used across all pages:
 * - Consistent sizing: w-12 h-12 (48px × 48px - MD3 touch target)
 * - Border radius: rounded-full (MD3 pill-shaped button)
 * - Icon size: w-5 h-5 (20px)
 * - Transition: duration-200 (fast interaction feedback)
 * - Icon only (no label)
 * 
 * @param onClick - Callback when refresh button is clicked
 * @param className - Additional CSS classes to override defaults
 */
const RefreshButton: React.FC<RefreshButtonProps> = ({
  onClick,
  className = '',
}) => {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className={`rounded-full w-12 h-12 p-0 transition-all duration-200 flex items-center justify-center ${className}`}
      aria-label="Refresh"
    >
      <RefreshCw className="w-5 h-5" />
    </Button>
  );
};

export default RefreshButton;