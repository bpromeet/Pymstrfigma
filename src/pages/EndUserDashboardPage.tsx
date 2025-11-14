import React from "react";
import PageLayout from "../components/PageLayout";
import { Activity } from "lucide-react";
import UserOverviewSection from "../components/user-sections/UserOverviewSection";

/**
 * EndUserDashboardPage - End User Dashboard Overview
 * 
 * This is the DASHBOARD page for end users (not merchant dashboard)
 * Shows overview stats, recent activity, balances
 */
const EndUserDashboardPage: React.FC = () => {
  return (
    <PageLayout>
      <PageLayout.Header
        icon={<Activity className="w-6 h-6 text-[#07D7FF]" />}
        title="Dashboard"
        subtitle="Your payment activity overview"
      />
      <PageLayout.Content>
        <UserOverviewSection />
      </PageLayout.Content>
    </PageLayout>
  );
};

export default EndUserDashboardPage;
