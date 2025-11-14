import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { DollarSign, TrendingUp, Activity } from "lucide-react";

/**
 * UserOverviewSection - End User Dashboard Overview
 * 
 * Displays:
 * - Total Balance (across all chains)
 * - Total Spent (lifetime spending)
 * - Active Chains (number of chains with balance)
 * - Recent activity stats
 */
const UserOverviewSection: React.FC = () => {
  // Mock data - replace with real data from props/context
  const totalBalance = 1234.56;
  const totalSpent = 5678.90;
  const activeChains = 3;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="rounded-2xl">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Total Balance</CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="text-2xl">${totalBalance.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                Across all chains
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Total Spent</CardTitle>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="text-2xl">${totalSpent.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                Lifetime payments
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Active Chains</CardTitle>
              <Activity className="w-4 h-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="text-2xl">{activeChains}</div>
              <p className="text-xs text-muted-foreground">
                Networks in use
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            <p>No recent activity</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserOverviewSection;
