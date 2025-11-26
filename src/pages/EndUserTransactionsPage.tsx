import React from "react";
import PageLayout from "../components/PageLayout";
import { Receipt } from "lucide-react";
import UserTransactionsSection from "../components/user-sections/UserTransactionsSection";

/**
 * EndUserTransactionsPage - End User Transaction History
 * 
 * This is the TRANSACTIONS page for end users
 * Shows payment history, transaction details, blockchain links
 */
const EndUserTransactionsPage: React.FC = () => {
  return (
    <PageLayout>
      <PageLayout.Header
        icon={<Receipt className="w-6 h-6 text-[#FF5914]" />}
        title="Transactions"
        subtitle="Your payment history"
      />
      <PageLayout.Content>
        <UserTransactionsSection />
      </PageLayout.Content>
    </PageLayout>
  );
};

export default EndUserTransactionsPage;