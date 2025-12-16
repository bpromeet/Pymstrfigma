import React from 'react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  onKeyPress?: (e: React.KeyboardEvent) => void;
}

/**
 * SearchField Component - MD3 Compliant
 * 
 * Following Material Design 3 Input Field specifications:
 * - Border radius: `rounded` (4px - MD3 Extra Small radius)
 * - Height: h-12 (48px - MD3 touch target)
 * - No pill-shaped inputs - Pure MD3 compliance
 * - Transition: duration-200 (fast interaction feedback)
 * - Placeholder: "Search..." with three dots
 * 
 * @param value - Current search query value
 * @param onChange - Callback when search value changes
 * @param placeholder - Placeholder text (default: "Search...")
 * @param className - Additional CSS classes to override defaults
 * @param onKeyPress - Optional callback for key press events
 */
const SearchField: React.FC<SearchFieldProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
  onKeyPress,
}) => {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={onKeyPress}
        className="rounded pl-10 pr-4 w-full h-12"
      />
    </div>
  );
};

export default SearchField;