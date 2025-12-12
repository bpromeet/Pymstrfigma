import React from 'react';
import { ShieldCheck } from 'lucide-react';

/**
 * PageLayout - Shared layout wrapper component
 * 
 * Enforces consistent design across all pages:
 * - Page background: bg-white (light) / bg-[#0A0A0A] (dark) - MD3 Surface Level 0
 * - Container max-width: max-w-7xl
 * - Consistent padding: px-6 lg:px-8
 * - Consistent spacing: py-4 md:py-6
 * - Theme transitions: 200ms (MD3 standard easing)
 * - Desktop footer: Web3 trust indicator (hidden on mobile)
 * 
 * Usage:
 * <PageLayout>
 *   <PageLayout.Header title="Page Title" />
 *   <PageLayout.Content>
 *     Your content here
 *   </PageLayout.Content>
 * </PageLayout>
 */

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

interface PageContentProps {
  children: React.ReactNode;
  className?: string;
  /** Use narrower max-width for reading-focused content */
  narrow?: boolean;
}

interface PageSectionProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

export const PageLayout: React.FC<PageLayoutProps> & {
  Header: React.FC<PageHeaderProps>;
  Content: React.FC<PageContentProps>;
  Section: React.FC<PageSectionProps>;
} = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen bg-white dark:bg-[#0A0A0A] ${className}`}>
      {children}
      
      {/* Desktop-only Footer - Web3 Trust Indicator */}
      <footer className="hidden md:block bg-white dark:bg-[#0A0A0A] py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 text-sm text-[#798A9B]">
            <span>Web3 Non-Custodial & BulletProof by PYMSTR®</span>
            <ShieldCheck className="w-5 h-5 text-green-600" />
          </div>
        </div>
      </footer>
    </div>
  );
};

/**
 * PageLayout.Header - Consistent page header
 * 
 * MD3 Specifications:
 * - Padding: px-6 lg:px-8 py-6 md:py-8 (24px/32px horizontal, 24px/32px vertical)
 * - Title typography: Uses semantic h1 (auto-styled by globals.css)
 * - Icon size: w-6 h-6 (24px - MD3 standard)
 * - Action button alignment: right side
 * - mx-auto: Centers header content within the available space after nav rail offset
 */
const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  icon,
  action,
  className = '',
}) => {
  return (
    <header className={className}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 md:py-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {icon}
              <h1 className="text-gray-900 dark:text-white">{title}</h1>
            </div>
            {subtitle && (
              <p className="text-[#798A9B] dark:text-[#798A9B] ml-9">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="flex-shrink-0 mt-1">{action}</div>}
        </div>
      </div>
    </header>
  );
};

/**
 * PageLayout.Content - Main content container
 * 
 * MD3 Specifications:
 * - Max-width: max-w-7xl (1280px - standard) or max-w-4xl (narrow)
 * - Padding: px-6 lg:px-8 (24px/32px horizontal)
 * - Spacing: py-4 md:py-6 (16px/24px vertical)
 * - Background: Inherits from PageLayout (transparent)
 * - mx-auto: Centers content within the available space after nav rail offset
 */
const PageContent: React.FC<PageContentProps> = ({
  children,
  className = '',
  narrow = false,
}) => {
  const maxWidth = narrow ? 'max-w-4xl' : 'max-w-7xl';

  return (
    <main className={`${maxWidth} mx-auto px-6 lg:px-8 py-4 md:py-6 ${className}`}>
      {children}
    </main>
  );
};

/**
 * PageLayout.Section - Content section wrapper
 * 
 * MD3 Specifications:
 * - Background: bg-white dark:bg-[#303030] (MD3 Level 1)
 * - Border radius: rounded-2xl (16px - MD3 Large)
 * - Padding: p-6 md:p-8 (24px/32px - 8dp grid)
 * - Shadow: shadow-sm (MD3 Level 1)
 * - Spacing: space-y-6 (24px - consistent section spacing)
 */
const PageSection: React.FC<PageSectionProps> = ({
  children,
  className = '',
  title,
  description,
}) => {
  return (
    <section
      className={`bg-white dark:bg-[#303030] rounded-2xl shadow-sm p-6 md:p-8 ${className}`}
    >
      {(title || description) && (
        <div className="mb-6">
          {title && <h3 className="text-gray-900 dark:text-white">{title}</h3>}
          {description && (
            <p className="text-[#798A9B] dark:text-[#798A9B] mt-2">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
};

PageLayout.Header = PageHeader;
PageLayout.Content = PageContent;
PageLayout.Section = PageSection;

export default PageLayout;