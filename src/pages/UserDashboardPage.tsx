import React, { useState } from "react";
import PageLayout from "../components/PageLayout";
import { Activity, Wallet, Settings, HelpCircle, Scale, Receipt } from "lucide-react";
import UserOverviewSection from "../components/user-sections/UserOverviewSection";
import UserTransactionsSection from "../components/user-sections/UserTransactionsSection";
import UserSettingsSection from "../components/user-sections/UserSettingsSection";

interface UserDashboardPageProps {
  isUserLoggedIn: boolean;
  userLoginMethod: string;
  onLogout: () => void;
  onBackToMerchant: () => void;
  onNavigateToHelp: () => void;
  onNavigateToLegal: () => void;
  copiedItem: string | null;
  onCopy: (text: string) => void;
}

/**
 * UserDashboardPage - Legacy end-user view with tabs (DEPRECATED)
 * 
 * This is kept for backward compatibility with "userdashboard" route.
 * New end-user navigation uses separate pages:
 * - user-dashboard → EndUserDashboardPage
 * - user-wallets → EndUserWalletsPage
 * - user-transactions → EndUserTransactionsPage
 * - user-settings → EndUserSettingsPage
 */
const UserDashboardPage: React.FC<UserDashboardPageProps> = ({
  isUserLoggedIn,
  userLoginMethod,
  onLogout,
  onBackToMerchant,
  onNavigateToHelp,
  onNavigateToLegal,
  copiedItem,
  onCopy,
}) => {
  // Active section state for end-user navigation
  const [activeSection, setActiveSection] = useState<string>("overview");

  // Render section based on active navigation
  const renderActiveSection = () => {
    switch (activeSection) {
      case "overview":
        return <UserOverviewSection />;
      case "wallets":
        // Wallets section removed - use new EndUserWalletsPage instead
        return (
          <div className="text-center py-12">
            <Wallet className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-gray-900 dark:text-white mb-2">
              Wallets Moved
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Please use the new wallet navigation
            </p>
          </div>
        );
      case "transactions":
        return <UserTransactionsSection />;
      case "settings":
        return <UserSettingsSection userLoginMethod={userLoginMethod} onLogout={onLogout} onBackToMerchant={onBackToMerchant} />;
      case "help":
        onNavigateToHelp();
        return null;
      case "legal":
        onNavigateToLegal();
        return null;
      default:
        return <UserOverviewSection />;
    }
  };

  // Get page header props based on active section
  const getPageHeaderProps = () => {
    switch (activeSection) {
      case "overview":
        return {
          icon: <Activity className="w-6 h-6 text-[#FF5914]" />,
          title: "Dashboard",
          subtitle: "Your payment activity overview",
        };
      case "wallets":
        return {
          icon: <Wallet className="w-6 h-6 text-[#FF5914]" />,
          title: "Wallets",
          subtitle: "Manage your crypto wallets",
        };
      case "transactions":
        return {
          icon: <Receipt className="w-6 h-6 text-[#FF5914]" />,
          title: "Transactions",
          subtitle: "Your payment history",
        };
      case "settings":
        return {
          icon: <Settings className="w-6 h-6 text-[#FF5914]" />,
          title: "Settings",
          subtitle: "Manage your account preferences",
        };
      default:
        return {
          icon: <Activity className="w-6 h-6 text-[#FF5914]" />,
          title: "Dashboard",
          subtitle: "Your payment activity overview",
        };
    }
  };

  const headerProps = getPageHeaderProps();

  return (
    <PageLayout>
      <PageLayout.Header
        icon={headerProps.icon}
        title={headerProps.title}
        subtitle={headerProps.subtitle}
      />
      <PageLayout.Content>
        {renderActiveSection()}
      </PageLayout.Content>
    </PageLayout>
  );
};

export default UserDashboardPage;