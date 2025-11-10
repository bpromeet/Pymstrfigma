/* ========================================
   MOBILE NAVIGATION COMPONENTS
   
   This file contains TWO mobile menus:
   
   1. FOOTER (Bottom Navigation Bar)
      - Fixed bottom bar with 4 tabs: Dashboard, Wallets, Reports, More
      - Always visible on mobile
      
   2. THREE DOTS MENU (More Menu / More Sheet)
      - Bottom sheet that opens when "More" tab is clicked
      - Contains: Dashboard, Wallets, Payment Settings, Links, API Keys, Webhooks, Documents, Help, Logout
   
   DO NOT CONFUSE WITH:
   - AVATAR MENU: Located in App.tsx, top-right header dropdown (avatar click)
   ======================================== */

import React from 'react';
import { LayoutDashboard, Link as LinkIcon, Key, MoreHorizontal, Wallet, FileText, LogOut, HelpCircle, Scale, BookOpen, Users } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from './ui/sheet';
import { Webhook, Settings, Shield, User } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onNavigate }) => {
  const [showMoreSheet, setShowMoreSheet] = React.useState(false);
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);

  // Map admin tab to dashboard for display
  const normalizedActiveTab = activeTab === 'admin' ? 'dashboard' : activeTab;

  // Minimum swipe distance (in px) to trigger close
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isDownSwipe = distance < -minSwipeDistance;
    
    if (isDownSwipe) {
      setShowMoreSheet(false);
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'wallets', label: 'Wallets', icon: Wallet },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'more', label: 'More', icon: MoreHorizontal },
  ];

  const moreItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'wallets', label: 'Wallets', icon: Wallet },
    { id: 'settings', label: 'Payment Settings', icon: Settings },
    { id: 'links', label: 'Links', icon: LinkIcon },
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'webhooks', label: 'Webhooks', icon: Webhook },
    { id: 'documents', label: 'Documents', icon: BookOpen },
    { id: 'help', label: 'Help', icon: HelpCircle },
    { id: 'logout', label: 'Logout', icon: LogOut },
  ];

  const handleNavClick = (itemId: string) => {
    if (itemId === 'more') {
      setShowMoreSheet(true);
    } else {
      // Map dashboard back to admin for the app
      const targetTab = itemId === 'dashboard' ? 'admin' : itemId;
      onNavigate(targetTab);
    }
  };

  const handleMoreItemClick = (itemId: string) => {
    setShowMoreSheet(false);
    
    // Handle logout separately
    if (itemId === 'logout') {
      // In a real app, this would call logout logic
      console.log('Logout clicked');
      // For now, just close the sheet
      return;
    }
    
    // Map dashboard to admin for the app
    const targetTab = itemId === 'dashboard' ? 'admin' : itemId;
    onNavigate(targetTab);
  };

  return (
    <>
      {/* ========================================
          MOBILE MENU #2: FOOTER (Bottom Navigation Bar)
          
          This is the BOTTOM NAVIGATION BAR itself
          NOT the Three Dots Menu (that's the bottom sheet below)
          NOT the Avatar Menu (that's in App.tsx header)
          
          MD3 Specs:
          - Position: Fixed bottom, full width
          - Height: 80px (MD3 standard)
          - Elevation: Level 2 (shadow-md)
          - Items: 4 tabs (Dashboard, Wallets, Reports, More)
          - Active indicator: Pill background
          - Touch targets: 48px minimum
          - Hidden on desktop: md:hidden
          ======================================== */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-[#0a0a0a] border-t border-[#43586C] md:hidden shadow-md transition-all duration-[900ms] ease-out">
        <div className="flex items-center justify-around h-20 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = normalizedActiveTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex flex-col items-center justify-center min-w-[64px] h-16 px-3 rounded-full transition-all duration-[900ms] ease-out ${
                  isActive
                    ? 'bg-[#FF5914]/12 text-[#FF5914]'
                    : 'text-black dark:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.04]'
                }`}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'mb-1' : 'mb-1'}`} />
                <span className="text-[12px] font-medium leading-none">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* ========================================
          MOBILE MENU #1: THREE DOTS MENU (More Menu)
          
          Location: Opens from bottom when "More" tab (three horizontal dots) is clicked in Footer
          Trigger: Clicking "More" tab in bottom navigation
          Content: Dashboard, Wallets, Payment Settings, Links, API Keys, Webhooks, Documents, Help, Logout
          Purpose: Access to all other app sections not in the main bottom nav
          DO NOT CONFUSE WITH: Avatar Menu (top right) or Footer (bottom navigation bar)
          
          MOBILE FIX:
          - max-h-[85vh]: Constrains height to 85% of viewport (prevents off-screen rendering)
          - overflow-y-auto: Enables scrolling for content
          - pb-safe: Adds safe area padding for devices with notches/home indicators
          ======================================== */}
      <Sheet open={showMoreSheet} onOpenChange={setShowMoreSheet}>
        <SheetContent 
          side="bottom" 
          className="rounded-t-3xl bg-white dark:bg-[#0a0a0a] border-t border-[#43586C] transition-all duration-[900ms] ease-out" 
          aria-describedby={undefined}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Visual drag handle */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1 bg-[#43586C] rounded-full opacity-40"></div>
          </div>
          
          <SheetHeader className="pb-4">
            <SheetTitle className="text-[#1C1B1F] dark:text-[#F6F7F9]">More Options</SheetTitle>
          </SheetHeader>
          <div className="grid grid-cols-1 gap-2 pb-6 px-6">
            {moreItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = normalizedActiveTab === item.id;
              const isLogout = item.id === 'logout';
              const showSeparatorBeforeHelp = item.id === 'help'; // Add separator before Help (groups Help, Logout)
              const showSeparatorBeforeLogout = item.id === 'logout'; // Add separator before Logout
              
              return (
                <React.Fragment key={item.id}>
                  {showSeparatorBeforeHelp && (
                    <div className="h-px bg-[#43586C] my-2" />
                  )}
                  <button
                    onClick={() => handleMoreItemClick(item.id)}
                    className={`flex items-center gap-4 h-14 px-4 rounded-2xl transition-all duration-[900ms] ease-out ${
                      isLogout
                        ? 'text-[#DD6B6B] hover:bg-[#DD6B6B]/12'
                        : isActive
                        ? 'bg-[#FF5914]/12 text-[#FF5914]'
                        : 'text-black dark:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.04]'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </React.Fragment>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
