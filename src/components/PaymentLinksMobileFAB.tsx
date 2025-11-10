/**
 * Payment Links Dashboard with Mobile FAB
 * 
 * MD3-compliant mobile FAB implementation for Payment Links section
 * - Bottom-right FAB positioning (fixed bottom-6 right-6)
 * - 56px × 56px size (MD3 standard)
 * - Cyan color (#07D7FF - PYMSTR secondary)
 * - Hidden on desktop (md:hidden)
 * - Opens bottom sheet for payment link creation
 */

import React, { useState } from 'react';
import { Plus, Filter, Copy, Trash2, MoreVertical, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from './ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Badge } from './ui/badge';
import PaymentLinkForm from './PaymentLinkForm';

// ============================================================================
// MD3 Mobile FAB Component (56px × 56px, Cyan, Bottom-Right)
// ============================================================================

interface MobileFABProps {
  onClick: () => void;
  'aria-label': string;
}

const MobileFAB: React.FC<MobileFABProps> = ({ onClick, 'aria-label': ariaLabel }) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#1E88E5] text-white shadow-lg hover:bg-[#1565C0] hover:shadow-xl hover:scale-105 active:scale-95 focus:ring-2 focus:ring-[#1E88E5] focus:ring-offset-2 focus:outline-none transition-all duration-200 flex items-center justify-center md:hidden"
    >
      <Plus className="w-6 h-6" />
    </button>
  );
};

// ============================================================================
// Payment Link Card Component (Mobile Optimized)
// ============================================================================

interface PaymentLinkCardProps {
  id: string;
  linkId: string;
  price: number;
  description: string;
  status: 'active' | 'completed' | 'expired';
  clicks: number;
  currency: string;
  chain: string;
  onCopy: () => void;
  onDelete: () => void;
}

const PaymentLinkCard: React.FC<PaymentLinkCardProps> = ({
  linkId,
  price,
  description,
  status,
  clicks,
  currency,
  chain,
  onCopy,
  onDelete,
}) => {
  const statusConfig = {
    active: { bg: 'bg-[#7DD069]', text: 'text-white', label: 'Active' },
    completed: { bg: 'bg-[#D9C370]', text: 'text-[#2E3C49]', label: 'Completed' },
    expired: { bg: 'bg-[#DD6B6B]', text: 'text-white', label: 'Expired' },
  };

  const config = statusConfig[status];

  return (
    <div className="bg-white dark:bg-[#303030] rounded-2xl p-4 shadow-sm transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-[#798A9B] mb-1">{linkId}</p>
          <h3 className="font-medium truncate mb-1">{description}</h3>
          <p className="text-2xl font-semibold text-[#1E88E5]">${price.toFixed(2)}</p>
        </div>
        
        {/* Status Badge */}
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium ${config.bg} ${config.text}`}>
          {config.label}
        </span>
      </div>

      {/* Stats */}
      <div className="bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-xl p-3 mb-3">
        <div className="flex items-center justify-between text-sm">
          <div>
            <span className="text-[#798A9B]">Currency:</span>
            <span className="ml-2 font-medium">{currency}</span>
          </div>
          <div>
            <span className="text-[#798A9B]">Chain:</span>
            <span className="ml-2 font-medium capitalize">{chain}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-[#798A9B]">Clicks</span>
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#DD6B6B] text-white text-[11px] font-medium">
            {clicks}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          onClick={onCopy}
          className="flex-1 min-h-12 px-4 py-2.5 bg-transparent border border-[#1E88E5] text-[#1E88E5] hover:bg-[#E3F2FD] active:bg-[#E3F2FD]/80 rounded-full transition-all duration-200"
        >
          <Copy className="w-[18px] h-[18px] mr-2" />
          <span className="text-sm">Copy Link</span>
        </Button>
        
        <Button
          onClick={onDelete}
          className="min-h-12 w-12 bg-transparent border border-[#DD6B6B] text-[#DD6B6B] hover:bg-[#DD6B6B] hover:text-white rounded-full transition-all duration-200 flex items-center justify-center"
          aria-label="Delete payment link"
        >
          <Trash2 className="w-[18px] h-[18px]" />
        </Button>
      </div>
    </div>
  );
};

// ============================================================================
// Main Payment Links Dashboard Component with Mobile FAB
// ============================================================================

interface PaymentLinksMobileFABProps {
  paymentLinks?: any[];
  onCreateLink?: (data: any) => void;
  onCopyLink?: (id: string) => void;
  onDeleteLink?: (id: string) => void;
}

export const PaymentLinksMobileFAB: React.FC<PaymentLinksMobileFABProps> = ({
  paymentLinks = [],
  onCreateLink,
  onCopyLink,
  onDeleteLink,
}) => {
  const [showCreateSheet, setShowCreateSheet] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data (if no payment links provided)
  const defaultLinks = [
    {
      id: '1',
      linkId: '#PL001',
      price: 250,
      description: 'Consulting Services',
      status: 'active' as const,
      clicks: 12,
      currency: 'USDC',
      chain: 'ethereum',
    },
    {
      id: '2',
      linkId: '#PL002',
      price: 49.99,
      description: 'Product Purchase',
      status: 'completed' as const,
      clicks: 5,
      currency: 'USDT',
      chain: 'polygon',
    },
    {
      id: '3',
      linkId: '#PL003',
      price: 150,
      description: 'Subscription Fee',
      status: 'active' as const,
      clicks: 8,
      currency: 'USDC',
      chain: 'arbitrum',
    },
  ];

  const links = paymentLinks.length > 0 ? paymentLinks : defaultLinks;

  const handleCopy = (id: string) => {
    if (onCopyLink) {
      onCopyLink(id);
    } else {
      // Default behavior
      navigator.clipboard.writeText(`https://pymstr.com/pay/${id}`);
      console.log('Link copied:', id);
    }
  };

  const handleDelete = (id: string) => {
    if (onDeleteLink) {
      onDeleteLink(id);
    } else {
      console.log('Delete link:', id);
    }
  };

  const handleCreateLink = (data: any) => {
    if (onCreateLink) {
      onCreateLink(data);
    }
    setShowCreateSheet(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] pb-24">
      {/* ========================================
          STICKY HEADER (Mobile & Desktop)
          ======================================== */}
      <div className="sticky top-0 bg-white dark:bg-[#303030] border-b border-[#43586C] p-4 z-40 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-medium">Payment Links</h1>
          
          {/* Desktop: Toolbar button (hidden on mobile) */}
          <Button 
            onClick={() => setShowCreateSheet(true)}
            className="hidden md:inline-flex min-h-12 px-8 py-3 bg-[#1E88E5] text-white hover:bg-[#1565C0] rounded-full"
          >
            <Plus className="w-[18px] h-[18px] mr-2" />
            Create Payment Link
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#798A9B]" />
          <Input
            type="text"
            placeholder="Search payment links..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 rounded bg-transparent border border-[#43586C]"
          />
        </div>
      </div>

      {/* ========================================
          MAIN CONTENT - Payment Link Cards
          ======================================== */}
      <main className="p-4 space-y-4">
        {links
          .filter((link) =>
            link.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            link.linkId.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((link) => (
            <PaymentLinkCard
              key={link.id}
              id={link.id}
              linkId={link.linkId}
              price={link.price}
              description={link.description}
              status={link.status}
              clicks={link.clicks}
              currency={link.currency}
              chain={link.chain}
              onCopy={() => handleCopy(link.id)}
              onDelete={() => handleDelete(link.id)}
            />
          ))}

        {/* Empty State */}
        {links.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#798A9B] mb-4">No payment links yet</p>
            <Button
              onClick={() => setShowCreateSheet(true)}
              className="min-h-12 px-8 py-3 bg-[#1E88E5] text-white hover:bg-[#1565C0] rounded-full"
            >
              <Plus className="w-[18px] h-[18px] mr-2" />
              Create Your First Link
            </Button>
          </div>
        )}
      </main>

      {/* ========================================
          MD3 MOBILE FAB (Bottom-Right)
          
          Specifications:
          - Position: fixed bottom-6 right-6 (24px from edges)
          - Size: w-14 h-14 (56px × 56px - MD3 standard)
          - Color: #07D7FF (PYMSTR secondary/cyan)
          - Icon: w-6 h-6 (24px)
          - Elevation: shadow-lg (Level 3)
          - Z-index: z-50 (above content)
          - Hidden on desktop: md:hidden
          - Opens bottom sheet on click
          ======================================== */}
      <MobileFAB
        onClick={() => setShowCreateSheet(true)}
        aria-label="Create payment link"
      />

      {/* ========================================
          BOTTOM SHEET - Payment Link Creation Form
          MD3: Slides from bottom, 24px top radius
          ======================================== */}
      <Sheet open={showCreateSheet} onOpenChange={setShowCreateSheet}>
        <SheetContent 
          side="bottom" 
          className="h-[90vh] rounded-t-3xl bg-white dark:bg-[#303030] p-6"
        >
          <SheetHeader className="mb-6">
            <SheetTitle>Create Payment Link</SheetTitle>
            <SheetDescription>
              Generate a new payment link for your customer
            </SheetDescription>
          </SheetHeader>
          
          {/* Use the existing PaymentLinkForm component */}
          <PaymentLinkForm 
            onSubmit={handleCreateLink}
            onCancel={() => setShowCreateSheet(false)}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default PaymentLinksMobileFAB;
