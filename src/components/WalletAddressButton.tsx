import React, { useState } from 'react';
import { Copy, Check, Wallet } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

interface WalletAddressButtonProps {
  address: string;
  variant?: 'primary' | 'outlined' | 'tonal';
  showIcon?: boolean;
  className?: string;
}

/**
 * WalletAddressButton - MD3 Compliant Wallet Display with Copy Function
 * 
 * A pill-shaped button that displays a truncated wallet address with copy functionality.
 * Follows Material Design 3 specifications with proper touch targets and state layers.
 * 
 * @param address - The full wallet address (e.g., "0x1234...5678")
 * @param variant - Button style: 'primary' (filled), 'outlined', or 'tonal' (default: 'outlined')
 * @param showIcon - Whether to show wallet icon before address (default: true)
 * @param className - Additional CSS classes
 */
export const WalletAddressButton: React.FC<WalletAddressButtonProps> = ({
  address,
  variant = 'outlined',
  showIcon = true,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  // Truncate wallet address to show first 6 and last 4 characters
  const truncateAddress = (addr: string): string => {
    if (!addr || addr.length < 10) return addr;
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      toast.success('Wallet address copied to clipboard');
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      toast.error('Failed to copy address');
    }
  };

  // Base classes following MD3 specifications
  const baseClasses = 'px-6 py-2.5 min-h-12 rounded-full transition-all duration-[900ms] flex items-center gap-2';

  // Variant-specific classes following MD3 button specifications
  const variantClasses = {
    primary: 'bg-[#1E88E5] text-white hover:bg-[#1565C0] hover:shadow-sm active:scale-[0.98] focus:ring-2 focus:ring-[#1E88E5] focus:ring-offset-2',
    outlined: 'bg-transparent border border-[#1E88E5] text-[#1E88E5] hover:bg-[#E3F2FD] active:bg-[#E3F2FD]/80 focus:ring-2 focus:ring-[#1E88E5]',
    tonal: 'bg-[#303030] text-[#F6F7F9] hover:bg-[#2E3C49] hover:shadow-sm active:scale-[0.98] focus:ring-2 focus:ring-[#1E88E5] focus:ring-offset-2',
  };

  return (
    <Button
      onClick={handleCopy}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      aria-label={`Copy wallet address ${address}`}
    >
      {/* Wallet Icon (Optional - MD3 18px standard) */}
      {showIcon && (
        <Wallet className="w-[18px] h-[18px] shrink-0" />
      )}

      {/* Truncated Wallet Address */}
      <span className="font-mono">
        {truncateAddress(address)}
      </span>

      {/* Copy Icon with State Change (MD3 18px standard, 8px spacing) */}
      {copied ? (
        <Check className="w-[18px] h-[18px] shrink-0 text-[#7DD069]" />
      ) : (
        <Copy className="w-[18px] h-[18px] shrink-0" />
      )}
    </Button>
  );
};

export default WalletAddressButton;
