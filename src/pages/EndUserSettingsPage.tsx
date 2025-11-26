import React from "react";
import PageLayout from "../components/PageLayout";
import { Settings } from "lucide-react";
import UserSettingsSection from "../components/user-sections/UserSettingsSection";

interface EndUserSettingsPageProps {
  userLoginMethod: string;
  onLogout: () => void;
  onBackToMerchant: () => void;
}

/**
 * EndUserSettingsPage - End User Settings
 * 
 * This is the SETTINGS page for end users (separate from merchant settings)
 * Shows account info, preferences, logout
 */
const EndUserSettingsPage: React.FC<EndUserSettingsPageProps> = ({ 
  userLoginMethod, 
  onLogout, 
  onBackToMerchant 
}) => {
  return (
    <PageLayout>
      <PageLayout.Header
        icon={<Settings className="w-6 h-6 text-[#FF5914]" />}
        title="Settings"
        subtitle="Manage your account preferences"
      />
      <PageLayout.Content>
        <UserSettingsSection 
          userLoginMethod={userLoginMethod}
          onLogout={onLogout}
          onBackToMerchant={onBackToMerchant}
        />
      </PageLayout.Content>
    </PageLayout>
  );
};

export default EndUserSettingsPage;