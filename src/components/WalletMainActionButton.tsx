import React, { useState } from 'react';
import { Copy, Check, Wallet } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface WalletMainActionButtonProps {
  address: string;
  showIcon?: boolean;
  className?: string;
}

/**
 * WalletMainActionButton - MD3 Primary Filled Button for Wallet Display
 * 
 * Main action button (blue filled) that displays wallet address with copy functionality.
 * Positioned left-aligned below page titles/subtitles, close to navigation rail.
 * Follows Material Design 3 filled button specifications.
 * 
 * @param address - The full wallet address (e.g., "0x1234...5678")
 * @param showIcon - Whether to show wallet icon before address (default: true)
 * @param className - Additional CSS classes
 */
export const WalletMainActionButton: React.FC<WalletMainActionButtonProps> = ({
  address,
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
      toast('Copied', {
        duration: 1000,
      });
      
      // Reset copied state after 1 second
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    } catch (error) {
      toast('Copied', {
        duration: 1000,
      });
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`
        px-8 py-3 min-h-12 
        bg-[#1E88E5] text-white 
        hover:bg-[#1565C0] hover:shadow-sm 
        active:scale-[0.98] 
        focus:ring-2 focus:ring-[#1E88E5] focus:ring-offset-2 focus:outline-none
        transition-all duration-[900ms]
        rounded-full
        flex items-center gap-2
        ${className}
      `}
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

      {/* Copy Icon with State Change (MD3 18px standard) */}
      {copied ? (
        <Check className="w-[18px] h-[18px] shrink-0 text-[#7DD069]" />
      ) : (
        <Copy className="w-[18px] h-[18px] shrink-0" />
      )}
    </button>
  );
};

export default WalletMainActionButton;
