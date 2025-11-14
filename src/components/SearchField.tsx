import React from 'react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

/**
 * SearchField Component - MD3 Compliant
 * 
 * Following Material Design 3 Input Field specifications:
 * - Border radius: `rounded` (4px - MD3 Extra Small radius)
 * - Height: h-12 (48px - MD3 touch target)
 * - No pill-shaped inputs - Pure MD3 compliance
 * - Transition: duration-200 (fast interaction feedback)
 * 
 * @param value - Current search query value
 * @param onChange - Callback when search value changes
 * @param placeholder - Placeholder text (default: "Search...")
 * @param className - Additional CSS classes to override defaults
 */
const SearchField: React.FC<SearchFieldProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
}) => {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded pl-10 pr-4 w-full h-12 bg-transparent border border-[#43586C] text-[#F6F7F9] placeholder:text-[#798A9B] hover:border-[#757575] focus:border-2 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5] focus:outline-none transition-all duration-200"
      />
    </div>
  );
};

export default SearchField;
