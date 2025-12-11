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
 * - Consistent sizing: h-12 (48px - MD3 touch target)
 * - Consistent padding: px-6 py-2.5
 * - Border radius: rounded-full (MD3 pill-shaped button)
 * - Icon size: w-[18px] h-[18px] with mr-2 spacing (MD3 standard)
 * - Transition: duration-200 (fast interaction feedback)
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
      className={`rounded-full px-6 py-2.5 min-h-12 transition-all duration-200 w-full md:w-auto ${className}`}
    >
      <RefreshCw className="w-[18px] h-[18px] mr-2" />
      Refresh
    </Button>
  );
};

export default RefreshButton;
