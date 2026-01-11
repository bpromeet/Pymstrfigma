import React from "react";
import PageLayout from "../components/PageLayout";
import { Wallet } from "lucide-react";
import UserOverviewSection from "../components/user-sections/UserOverviewSection";

interface EndUserDashboardPageProps {
  onNavigateToWallets?: (view?: 'send' | 'receive') => void;
}

/**
 * EndUserDashboardPage - End User Wallet Overview
 * 
 * This is the WALLET page for end users (not merchant dashboard)
 * Shows wallet balance, recent activity, send/receive actions
 */
const EndUserDashboardPage: React.FC<EndUserDashboardPageProps> = ({ onNavigateToWallets }) => {
  return (
    <PageLayout>
      <PageLayout.Header
        icon={<Wallet className="w-6 h-6 text-[#07D7FF]" />}
        title="Wallet"
        subtitle="Your balance and payment activity"
      />
      <PageLayout.Content>
        <UserOverviewSection onNavigateToWallets={onNavigateToWallets} />
      </PageLayout.Content>
    </PageLayout>
  );
};

export default EndUserDashboardPage;