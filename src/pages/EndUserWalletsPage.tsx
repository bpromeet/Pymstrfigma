import React from "react";
import PageLayout from "../components/PageLayout";
import { Wallet } from "lucide-react";
import UserWalletsSection from "../components/user-sections/UserWalletsSection";

interface EndUserWalletsPageProps {
  copiedItem: string | null;
  onCopy: (text: string) => void;
}

/**
 * EndUserWalletsPage - End User Wallet Management
 * 
 * This is the WALLETS page for end users (separate from merchant wallets)
 * Shows wallet addresses, balances, send/receive actions
 */
const EndUserWalletsPage: React.FC<EndUserWalletsPageProps> = ({ copiedItem, onCopy }) => {
  return (
    <PageLayout>
      <PageLayout.Header
        icon={<Wallet className="w-6 h-6 text-[#07D7FF]" />}
        title="Wallets"
        subtitle="Manage your crypto wallets"
      />
      <PageLayout.Content>
        <UserWalletsSection copiedItem={copiedItem} onCopy={onCopy} />
      </PageLayout.Content>
    </PageLayout>
  );
};

export default EndUserWalletsPage;
