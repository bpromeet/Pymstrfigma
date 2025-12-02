import React from 'react';
import { Activity, Link as LinkIcon, Key, Webhook, BarChart3, Wallet, ChevronLeft, ChevronRight, BookOpen, HelpCircle } from 'lucide-react';

export interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavigationRailProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  isExpanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
  menuItems?: NavigationItem[];
}

export const NavigationRail: React.FC<NavigationRailProps> = ({ activeTab, onNavigate, isExpanded, onExpandedChange, menuItems }) => {

  // Map admin tab to dashboard for display
  const normalizedActiveTab = activeTab === 'admin' ? 'dashboard' : activeTab;

  // Default merchant menu items
  const defaultNavItems: NavigationItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'wallets', label: 'Wallets', icon: Wallet },
    { id: 'links', label: 'Payment Links', icon: LinkIcon },
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'webhooks', label: 'Webhooks', icon: Webhook },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'documents', label: 'Documents', icon: BookOpen },
    { id: 'help', label: 'Help', icon: HelpCircle },
  ];

  const navItems = menuItems || defaultNavItems;

  const handleNavClick = (itemId: string) => {
    // Map dashboard back to admin for the app
    const targetTab = itemId === 'dashboard' ? 'admin' : itemId;
    onNavigate(targetTab);
  };

  return (
    <>
      {/* Click-outside backdrop for desktop rail (only when expanded) */}
      <div 
        className={`hidden md:block fixed inset-0 z-30 bg-transparent ${
          isExpanded ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{transition: 'opacity 1500ms ease-out'}}
        onClick={() => onExpandedChange(false)}
        aria-hidden="true"
      />

      {/* ========================================
          MD3 NAVIGATION RAIL (Desktop Only)
          
          Specs:
          - Position: Fixed left side
          - Width: 80px collapsed, 256px expanded
          - Elevation: Level 0 (surface)
          - Items: Icon + label
          - Active indicator: Pill background
          - Touch targets: 48px minimum
          - Hidden on mobile: hidden md:flex
          - Animation: 1500ms (PYMSTR standard)
          ======================================== */}
      <nav
        className={`hidden md:flex fixed left-0 top-0 bottom-0 z-40 flex-col bg-white dark:bg-[#0a0a0a] overflow-x-hidden ${
          isExpanded ? 'w-64' : 'w-20'
        }`}
        style={{transition: 'width 1500ms ease-out, padding 1500ms ease-out'}}
      >
        {/* Logo / Brand Area */}
        <div className="flex items-center justify-center h-16">
          <div className={`${isExpanded ? 'px-6' : 'px-0'}`} style={{transition: 'padding 1500ms ease-out'}}>
            {isExpanded ? (
              <span className="text-xl font-bold text-[#FF5914]">PYMSTR</span>
            ) : (
              <>
                {/* Light mode logo */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-10 w-10 dark:hidden">
                  <rect width="32" height="32" fill="#e8e4dc" fillOpacity="0.5" rx="8" ry="8"/>
                  <rect x="6" y="10" width="2" height="12" fill="#ff5722"/>
                  <rect x="9" y="8" width="2" height="16" fill="#ff5722"/>
                  <rect x="12" y="10" width="2" height="12" fill="#ff5722"/>
                  <rect x="15" y="7" width="2" height="18" fill="#ff5722"/>
                  <rect x="18" y="10" width="2" height="12" fill="#ff5722"/>
                  <rect x="21" y="8" width="2" height="16" fill="#ff5722"/>
                  <rect x="24" y="10" width="2" height="12" fill="#ff5722"/>
                </svg>
                {/* Dark mode logo */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-10 w-10 hidden dark:block">
                  <rect width="32" height="32" fill="#1a1a1a" rx="8" ry="8"/>
                  <rect x="6" y="10" width="2" height="12" fill="#ff5722"/>
                  <rect x="9" y="8" width="2" height="16" fill="#ff5722"/>
                  <rect x="12" y="10" width="2" height="12" fill="#ff5722"/>
                  <rect x="15" y="7" width="2" height="18" fill="#ff5722"/>
                  <rect x="18" y="10" width="2" height="12" fill="#ff5722"/>
                  <rect x="21" y="8" width="2" height="16" fill="#ff5722"/>
                  <rect x="24" y="10" width="2" height="12" fill="#ff5722"/>
                </svg>
              </>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-4 overflow-y-auto overflow-x-hidden">
          <div className="space-y-1 px-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = normalizedActiveTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`group relative flex items-center w-full h-14 rounded-full ${
                    isExpanded ? 'px-6 gap-4' : 'px-0 justify-center'
                  } ${
                    isActive
                      ? 'bg-[#e8e4dc]/20 dark:bg-[#FF5914]/12 text-[#FF5914]'
                      : 'text-black dark:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.04]'
                  }`}
                  style={{transition: 'padding 1500ms ease-out, gap 1500ms ease-out, justify-content 1500ms ease-out'}}
                  aria-label={item.label}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="w-6 h-6 flex-shrink-0" />
                  {isExpanded && (
                    <span className="font-medium truncate">{item.label}</span>
                  )}
                  
                  {/* Custom Tooltip - Only show when collapsed */}
                  {!isExpanded && (
                    <div className="absolute left-full ml-4 px-5 py-3 bg-[#FFE5D9] dark:bg-[#FF5914]/20 backdrop-blur-sm rounded-full shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible pointer-events-none whitespace-nowrap z-50 flex items-center gap-3" style={{transition: 'opacity 1500ms ease-out, visibility 1500ms ease-out'}}>
                      <Icon className="w-5 h-5 text-[#FF5914]" />
                      <span className="font-medium text-[#FF5914]">{item.label}</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Toggle Button */}
        <div className="p-2">
          <button
            onClick={() => onExpandedChange(!isExpanded)}
            className="flex items-center justify-center w-full h-12 rounded-full bg-[#e8e4dc]/20 dark:bg-[#FF5914]/12 text-[#FF5914] hover:bg-[#e8e4dc]/30 dark:hover:bg-[#FF5914]/20 transition-all duration-200"
            aria-label={isExpanded ? 'Collapse navigation' : 'Expand navigation'}
          >
            {isExpanded ? (
              <ChevronLeft className="w-6 h-6" />
            ) : (
              <ChevronRight className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Spacer to prevent content from going under nav rail */}
      <div className={`hidden md:block transition-all duration-[1500ms] ${isExpanded ? 'w-64' : 'w-20'}`} />
    </>
  );
};