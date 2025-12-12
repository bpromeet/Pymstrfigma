import React from 'react';
import { Calendar } from 'lucide-react';
import { Input } from './ui/input';

interface DateFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

/**
 * DateField Component - MD3 Compliant
 * 
 * Following Material Design 3 Input Field specifications:
 * - Border radius: `rounded` (4px - MD3 Extra Small radius)
 * - Height: h-12 (48px - MD3 touch target)
 * - Calendar icon on the left, date display on the right
 * - Fully clickable including icon
 * - Transition: duration-200 (fast interaction feedback)
 * 
 * @param value - Current date value (YYYY-MM-DD format)
 * @param onChange - Callback when date value changes
 * @param placeholder - Placeholder text (e.g., "From date", "To date")
 * @param className - Additional CSS classes to override defaults
 */
const DateField: React.FC<DateFieldProps> = ({
  value,
  onChange,
  placeholder = 'Select date',
  className = '',
}) => {
  return (
    <div 
      className={`relative flex items-center ${className}`}
    >
      <Calendar className="absolute left-3 w-[18px] h-[18px] text-[#798A9B] pointer-events-none z-10" />
      <Input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded pl-10 pr-3 w-full h-12 bg-transparent border border-[#43586C] text-[#1C1B1F] dark:text-[#F6F7F9] placeholder:text-[#798A9B] hover:border-[#757575] focus:border-2 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5] focus:outline-none transition-all duration-200 cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:z-20"
      />
    </div>
  );
};

export default DateField;