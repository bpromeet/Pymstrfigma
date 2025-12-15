import React from 'react';
import { Activity, Link as LinkIcon, Key, Webhook, BarChart3, Wallet, BookOpen, HelpCircle, List, Menu, Sun, Moon } from 'lucide-react';

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
  theme?: 'light' | 'dark';
  onThemeToggle?: () => void;
}

export const NavigationRail: React.FC<NavigationRailProps> = ({ activeTab, onNavigate, isExpanded, onExpandedChange, menuItems, theme, onThemeToggle }) => {

  // Map admin tab to dashboard for display
  const normalizedActiveTab = activeTab === 'admin' ? 'dashboard' : activeTab;

  // Default merchant menu items
  const defaultNavItems: NavigationItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'wallets', label: 'Wallets', icon: Wallet },
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'links', label: 'Payment Links', icon: LinkIcon },
    { id: 'webhooks', label: 'Webhooks', icon: Webhook },
    { id: 'transactions', label: 'Transactions', icon: List },
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
        {/* Hamburger Menu Button */}
        <div className="flex items-center justify-center h-14 w-full flex-shrink-0">
          <button
            onClick={() => onExpandedChange(!isExpanded)}
            className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-all duration-200"
            aria-label={isExpanded ? 'Collapse navigation' : 'Expand navigation'}
          >
            <Menu className="w-6 h-6 text-black dark:text-white" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-2 overflow-y-auto overflow-x-hidden">
          <div className="space-y-0.5 px-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = normalizedActiveTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`group relative flex items-center w-full h-12 rounded-full transition-colors duration-200 ${ 
                    isActive
                      ? 'bg-[#e8e4dc]/20 dark:bg-[#FF5914]/12 text-[#FF5914]'
                      : 'text-black dark:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.04]'
                  }`}
                  aria-label={item.label}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {/* Icon - Perfectly centered in collapsed width */}
                  <div className="w-16 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  {/* Label - Fades in/out, appears to the right of icon */}
                  <span 
                    className="font-medium truncate whitespace-nowrap"
                    style={{
                      opacity: isExpanded ? 1 : 0,
                      maxWidth: isExpanded ? '160px' : '0',
                      transition: 'opacity 1500ms ease-out, max-width 1500ms ease-out'
                    }}
                  >
                    {item.label}
                  </span>
                  
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

        {/* Theme Toggle Button */}
        {onThemeToggle && (
          <div className="p-2">
            <button
              onClick={onThemeToggle}
              className="flex items-center justify-center w-12 h-12 rounded-full text-black dark:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-all duration-200"
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? (
                <Moon className="w-6 h-6" />
              ) : (
                <Sun className="w-6 h-6" />
              )}
            </button>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from going under nav rail */}
      <div className={`hidden md:block transition-all duration-[1500ms] ${isExpanded ? 'w-64' : 'w-20'}`} />
    </>
  );
};