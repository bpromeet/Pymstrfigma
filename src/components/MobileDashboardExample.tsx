/**
 * Mobile Dashboard Example - MD3 Compliant
 * 
 * Demonstrates proper FAB positioning and mobile-optimized layouts
 * following Material Design 3 specifications for mobile devices
 */

import React, { useState } from 'react';
import { Plus, Filter, Search, Copy, Trash2, MoreVertical } from 'lucide-react';
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

// ============================================================================
// MD3 Mobile FAB Component
// ============================================================================

interface MD3MobileFABProps {
  icon: React.ReactNode;
  onClick: () => void;
  'aria-label': string;
  className?: string;
}

const MD3MobileFAB: React.FC<MD3MobileFABProps> = ({
  icon,
  onClick,
  'aria-label': ariaLabel,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`
        fixed bottom-6 right-6 z-50
        w-14 h-14 rounded-full
        bg-[#07D7FF] text-white
        shadow-lg hover:shadow-xl
        hover:scale-105 active:scale-95
        focus:ring-2 focus:ring-[#07D7FF] focus:ring-offset-2 focus:outline-none
        transition-all duration-200
        flex items-center justify-center
        md:hidden
        ${className}
      `}
    >
      <span className="w-6 h-6">{icon}</span>
    </button>
  );
};

// ============================================================================
// MD3 Mobile Small FAB (Secondary Actions)
// ============================================================================

interface MD3MobileSmallFABProps {
  icon: React.ReactNode;
  onClick: () => void;
  'aria-label': string;
  className?: string;
}

const MD3MobileSmallFAB: React.FC<MD3MobileSmallFABProps> = ({
  icon,
  onClick,
  'aria-label': ariaLabel,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`
        w-12 h-12 rounded-full
        bg-[#303030] text-[#F6F7F9]
        shadow-lg hover:shadow-xl hover:bg-[#43586C]
        hover:scale-105 active:scale-95
        focus:ring-2 focus:ring-[#303030] focus:ring-offset-2 focus:outline-none
        transition-all duration-200
        flex items-center justify-center
        md:hidden
        ${className}
      `}
    >
      <span className="w-5 h-5">{icon}</span>
    </button>
  );
};

// ============================================================================
// Payment Link Card (Mobile Optimized)
// ============================================================================

interface PaymentLinkCardProps {
  id: string;
  title: string;
  price: number;
  status: 'active' | 'completed' | 'expired';
  clicks: number;
  onCopy: () => void;
  onDelete: () => void;
}

const PaymentLinkCard: React.FC<PaymentLinkCardProps> = ({
  id,
  title,
  price,
  status,
  clicks,
  onCopy,
  onDelete,
}) => {
  const statusColors = {
    active: 'bg-[#7DD069] text-white',
    completed: 'bg-[#D9C370] text-[#2E3C49]',
    expired: 'bg-[#DD6B6B] text-white',
  };

  const statusLabels = {
    active: 'Active',
    completed: 'Completed',
    expired: 'Expired',
  };

  return (
    <div className="bg-white dark:bg-[#303030] rounded-2xl p-4 shadow-sm transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium truncate mb-1">{title}</h3>
          <p className="text-2xl font-semibold text-[#1E88E5]">${price.toFixed(2)}</p>
        </div>
        
        {/* Status Badge */}
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium ${statusColors[status]}`}>
          {statusLabels[status]}
        </span>
      </div>

      {/* Stats */}
      <div className="bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-xl p-3 mb-3">
        <div className="flex items-center justify-between">
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
          <span className="text-sm">Copy</span>
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
// Mobile Dashboard Component
// ============================================================================

export const MobileDashboard: React.FC = () => {
  const [showCreateSheet, setShowCreateSheet] = useState(false);
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample payment links
  const paymentLinks = [
    { id: '1', title: 'Consulting Services', price: 150, status: 'active' as const, clicks: 12 },
    { id: '2', title: 'Product Purchase', price: 49.99, status: 'completed' as const, clicks: 5 },
    { id: '3', title: 'Subscription Fee', price: 29.99, status: 'active' as const, clicks: 8 },
    { id: '4', title: 'Custom Development', price: 500, status: 'expired' as const, clicks: 0 },
  ];

  const handleCopy = (id: string) => {
    console.log('Copy link:', id);
    // Toast notification would go here
  };

  const handleDelete = (id: string) => {
    console.log('Delete link:', id);
    // Delete logic would go here
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] pb-24">
      {/* ========================================
          MOBILE HEADER (Sticky Top)
          MD3: Level 1 Elevation
          ======================================== */}
      <header className="sticky top-0 bg-white dark:bg-[#303030] border-b border-[#43586C] p-4 z-40 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-medium">Payment Links</h1>
          
          {/* Desktop-only button (hidden on mobile) */}
          <Button className="hidden md:inline-flex min-h-12 px-8 py-3 bg-[#1E88E5] text-white hover:bg-[#1565C0] rounded-full">
            <Plus className="w-[18px] h-[18px] mr-2" />
            Create Link
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
            className="pl-12 h-12"
          />
        </div>
      </header>

      {/* ========================================
          MAIN CONTENT
          Payment link cards with proper spacing
          ======================================== */}
      <main className="p-4 space-y-4">
        {paymentLinks.map((link) => (
          <PaymentLinkCard
            key={link.id}
            id={link.id}
            title={link.title}
            price={link.price}
            status={link.status}
            clicks={link.clicks}
            onCopy={() => handleCopy(link.id)}
            onDelete={() => handleDelete(link.id)}
          />
        ))}
      </main>

      {/* ========================================
          MD3 FLOATING ACTION BUTTONS (Mobile Only)
          
          PRIMARY FAB: Bottom-right (Create action)
          - Position: fixed bottom-6 right-6
          - Size: 56px × 56px (MD3 standard)
          - Color: Cyan #07D7FF (secondary)
          - Icon: 24px
          - Z-index: 50 (above content)
          - Hidden on desktop: md:hidden
          
          SECONDARY FAB: Above primary (Filter action)
          - Position: fixed bottom-24 right-6
          - Size: 48px × 48px (MD3 small)
          - Color: Gray #394B5C (surface)
          ======================================== */}
      
      {/* Secondary FAB (Filter) - Positioned above primary */}
      <MD3MobileSmallFAB
        icon={<Filter />}
        onClick={() => setShowFilterSheet(true)}
        aria-label="Filter payment links"
        className="fixed bottom-24 right-6"
      />

      {/* Primary FAB (Create) - Main action */}
      <MD3MobileFAB
        icon={<Plus />}
        onClick={() => setShowCreateSheet(true)}
        aria-label="Create payment link"
      />

      {/* ========================================
          BOTTOM SHEET: Create Payment Link
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
          
          <div className="space-y-4">
            {/* Form would go here */}
            <p className="text-sm text-[#798A9B]">
              Payment link creation form would be displayed here.
            </p>
            
            <Button 
              onClick={() => setShowCreateSheet(false)}
              className="w-full min-h-12 bg-[#1E88E5] text-white hover:bg-[#1565C0] rounded-full"
            >
              <Plus className="w-[18px] h-[18px] mr-2" />
              Create Payment Link
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* ========================================
          BOTTOM SHEET: Filter Options
          ======================================== */}
      <Sheet open={showFilterSheet} onOpenChange={setShowFilterSheet}>
        <SheetContent 
          side="bottom" 
          className="h-[60vh] rounded-t-3xl bg-white dark:bg-[#303030] p-6"
        >
          <SheetHeader className="mb-6">
            <SheetTitle>Filter Payment Links</SheetTitle>
            <SheetDescription>
              Filter by status, currency, or chain
            </SheetDescription>
          </SheetHeader>
          
          <div className="space-y-4">
            <p className="text-sm text-[#798A9B]">
              Filter options would be displayed here.
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

// ============================================================================
// ALTERNATIVE: Bottom Bar Layout (Multiple Equal Actions)
// ============================================================================

export const MobileDashboardWithBottomBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const paymentLinks = [
    { id: '1', title: 'Consulting Services', price: 150, status: 'active' as const, clicks: 12 },
    { id: '2', title: 'Product Purchase', price: 49.99, status: 'completed' as const, clicks: 5 },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] pb-24">
      {/* Header */}
      <header className="sticky top-0 bg-white dark:bg-[#303030] border-b border-[#43586C] p-4 z-40 shadow-sm">
        <h1 className="text-xl font-medium mb-4">Payment Links</h1>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#798A9B]" />
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12"
          />
        </div>
      </header>

      {/* Content */}
      <main className="p-4 space-y-4">
        {paymentLinks.map((link) => (
          <PaymentLinkCard
            key={link.id}
            id={link.id}
            title={link.title}
            price={link.price}
            status={link.status}
            clicks={link.clicks}
            onCopy={() => console.log('Copy')}
            onDelete={() => console.log('Delete')}
          />
        ))}
      </main>

      {/* ========================================
          ALTERNATIVE: STICKY BOTTOM BAR
          Use when you have multiple equal-priority actions
          
          MD3: Fixed bottom bar with elevation
          - Position: fixed bottom-0
          - Border-top for separation
          - Multiple buttons of equal visual weight
          - Hidden on desktop
          ======================================== */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#303030] border-t border-[#43586C] p-4 z-50 md:hidden">
        <div className="flex gap-3">
          <Button className="flex-1 min-h-12 bg-[#1E88E5] text-white hover:bg-[#1565C0] rounded-full">
            <Plus className="w-[18px] h-[18px] mr-2" />
            Create
          </Button>
          <Button className="flex-1 min-h-12 bg-transparent border border-[#1E88E5] text-[#1E88E5] hover:bg-[#E3F2FD] rounded-full">
            <Filter className="w-[18px] h-[18px] mr-2" />
            Filter
          </Button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// ALTERNATIVE: Extended FAB (With Label)
// ============================================================================

interface MD3ExtendedFABProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
}

export const MD3ExtendedFAB: React.FC<MD3ExtendedFABProps> = ({
  icon,
  label,
  onClick,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        fixed bottom-6 right-6 z-50
        px-6 py-3 min-h-14 rounded-full
        bg-[#07D7FF] text-white
        shadow-lg hover:shadow-xl
        hover:scale-105 active:scale-95
        focus:ring-2 focus:ring-[#07D7FF] focus:ring-offset-2 focus:outline-none
        transition-all duration-200
        flex items-center gap-2
        md:hidden
        ${className}
      `}
    >
      <span className="w-6 h-6">{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );
};

export const MobileDashboardWithExtendedFAB: React.FC = () => {
  const [showCreateSheet, setShowCreateSheet] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] pb-24">
      {/* Content */}
      <main className="p-4">
        <h1 className="text-xl font-medium mb-4">Dashboard</h1>
        <p className="text-[#798A9B]">Content goes here...</p>
      </main>

      {/* Extended FAB with label (more prominent) */}
      <MD3ExtendedFAB
        icon={<Plus />}
        label="Create Link"
        onClick={() => setShowCreateSheet(true)}
      />

      <Sheet open={showCreateSheet} onOpenChange={setShowCreateSheet}>
        <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl" aria-describedby={undefined}>
          <p>Create form here</p>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileDashboard;
