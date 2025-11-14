import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { ExternalLink } from "lucide-react";

/**
 * UserTransactionsSection - End User Transaction History
 * 
 * Displays:
 * - Transaction list
 * - Transaction details (merchant, amount, status, chain)
 * - Links to blockchain explorers
 */
const UserTransactionsSection: React.FC = () => {
  // Mock transaction data
  const transactions = [
    {
      id: "1",
      date: "2024-01-15",
      merchant: "Coffee Shop",
      description: "Espresso & Croissant",
      amount: 12.50,
      currency: "USDC",
      chain: "Polygon",
      status: "completed",
      txHash: "0xabc...def",
    },
    {
      id: "2",
      date: "2024-01-14",
      merchant: "Online Store",
      description: "Subscription",
      amount: 29.99,
      currency: "USDT",
      chain: "Ethereum",
      status: "completed",
      txHash: "0x123...456",
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-muted-foreground">
              <p>No transactions yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{tx.merchant}</span>
                      <Badge className="rounded-full">
                        {tx.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {tx.description} • {tx.chain}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {tx.date}
                    </p>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <div>
                      <div className="font-medium">
                        ${tx.amount.toFixed(2)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {tx.currency}
                      </div>
                    </div>
                    <a
                      href={`https://etherscan.io/tx/${tx.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1E88E5] hover:text-[#1565C0]"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserTransactionsSection;
