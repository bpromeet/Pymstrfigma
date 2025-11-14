import React, { useState } from "react";
import PageLayout from "../components/PageLayout";
import { Activity, Wallet, Settings, HelpCircle, Scale, Receipt } from "lucide-react";
import UserOverviewSection from "../components/user-sections/UserOverviewSection";
import UserWalletsSection from "../components/user-sections/UserWalletsSection";
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
        return <UserWalletsSection copiedItem={copiedItem} onCopy={onCopy} />;
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
          icon: <Activity className="w-6 h-6 text-[#07D7FF]" />,
          title: "Dashboard",
          subtitle: "Your payment activity overview",
        };
      case "wallets":
        return {
          icon: <Wallet className="w-6 h-6 text-[#07D7FF]" />,
          title: "Wallets",
          subtitle: "Manage your crypto wallets",
        };
      case "transactions":
        return {
          icon: <Receipt className="w-6 h-6 text-[#07D7FF]" />,
          title: "Transactions",
          subtitle: "Your payment history",
        };
      case "settings":
        return {
          icon: <Settings className="w-6 h-6 text-[#07D7FF]" />,
          title: "Settings",
          subtitle: "Manage your account preferences",
        };
      default:
        return {
          icon: <Activity className="w-6 h-6 text-[#07D7FF]" />,
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
