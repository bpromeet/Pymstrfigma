import React, { useState } from 'react';
import { Copy, Check, Wallet } from 'lucide-react';
import { Button } from './ui/button';

interface WalletAddressCopyButtonProps {
  address: string;
  onCopy?: () => void;
  className?: string;
}

/**
 * WalletAddressCopyButton - MD3-compliant button for displaying and copying wallet addresses
 * 
 * Features:
 * - Wallet icon on left
 * - Truncated address in center (0x1234...5678)
 * - Copy icon on right (switches to checkmark on copy)
 * - Blue pill-shaped button (rounded-full)
 * - Fallback clipboard method (no permissions needed)
 * - 200ms transition for instant feedback
 * 
 * Usage:
 * ```tsx
 * <WalletAddressCopyButton
 *   address="0x742d35Cc6634C0532925a3b844Bc9e7595f0bE89"
 *   onCopy={() => console.log('Address copied')}
 * />
 * ```
 */
export const WalletAddressCopyButton: React.FC<WalletAddressCopyButtonProps> = ({
  address,
  onCopy,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // Fallback method that doesn't require Clipboard API permissions
    const textarea = document.createElement('textarea');
    textarea.value = address;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      // Call optional callback
      if (onCopy) {
        onCopy();
      }
    } catch (err) {
      console.error('Failed to copy address:', err);
    } finally {
      document.body.removeChild(textarea);
    }
  };

  // Truncate address for display (0x1234...5678)
  const truncatedAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <Button
      onClick={handleCopy}
      className={`min-h-12 px-6 bg-[#1E88E5] text-white hover:bg-[#1565C0] rounded-full transition-all duration-200 flex items-center gap-2 ${className}`}
    >
      <Wallet className="w-5 h-5" />
      <span className="font-mono">
        {truncatedAddress}
      </span>
      {copied ? (
        <Check className="w-4 h-4 text-green-600" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </Button>
  );
};