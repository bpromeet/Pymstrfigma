import React from 'react';
import { LayoutDashboard, Link as LinkIcon, Key, Users, Webhook, Settings, Shield, FileText, User, Wallet, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

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
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'wallets', label: 'Wallets', icon: Wallet },
    { id: 'settings', label: 'Payment Settings', icon: Settings },
    { id: 'links', label: 'Payment Links', icon: LinkIcon },
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'webhooks', label: 'Webhooks', icon: Webhook },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'documents', label: 'Documents', icon: BookOpen },
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
              <span className="text-xl font-bold text-[#FF5914]">P</span>
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
                      ? 'bg-[#FF5914]/12 text-[#FF5914]'
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
            className="flex items-center justify-center w-full h-12 rounded-full text-[#FF5914] hover:bg-[#FF5914]/12 transition-all duration-200"
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