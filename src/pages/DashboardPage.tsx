import React from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Activity,
  DollarSign,
  CheckCircle,
  Users,
  Globe,
  Plus,
  ExternalLink,
  Sparkles,
  ArrowRight,
  X,
  Coins,
  Wallet,
  TrendingUp,
  Calendar,
} from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../components/ui/chart";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../components/ui/sheet";
import PageLayout from "../components/PageLayout";
import { ChainIcon } from "../components/ChainIcon";
import { CryptoIcon } from "../components/CryptoIcon";

interface DashboardStats {
  totalVolumeProcessed: number;
  successfulTransactions: number;
  averageTransactionValue: number;
  activePayors: number;
  totalFeesEarned: number;
}

interface Transaction {
  id: string;
  date: string;
  linkId: string;
  price: string;
  baseCurrency: string; // USD, EUR, AED
  crypto: string;
  cryptoAmount: string; // Total crypto amount paid
  chain: string;
  status: string;
  txHash: string;
  fee: string; // Fee in crypto
  received: string; // Amount received in crypto after fee
}

interface ChartDataPoint {
  month: string;
  transactions: number;
  revenue: number;
}

interface DashboardPageProps {
  dashboardStats: {
    totalVolumeProcessed: number;
    successfulTransactions: number;
    averageTransactionValue: number;
    activePayors: number;
    totalFeesEarned: number;
  };
  recentTransactions: Transaction[];
  chartData: { month: string; transactions: number; revenue: number }[];
  onCreatePaymentLink: () => void;
  getExplorerUrl: (chain: string, txHash: string) => string;
}

const DashboardPage: React.FC<DashboardPageProps> = (({
  dashboardStats,
  recentTransactions,
  chartData,
  onCreatePaymentLink,
  getExplorerUrl,
}) => {
  // State for selected bar data (for bottom sheet)
  const [selectedBarData, setSelectedBarData] = React.useState<ChartDataPoint | null>(null);
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  // Calculate summary stats for Transaction Volume
  const totalTransactions = chartData.reduce((sum, item) => sum + item.transactions, 0);
  const peakTransactions = Math.max(...chartData.map(item => item.transactions));
  const avgTransactions = totalTransactions / chartData.length;

  // Handler for bar click
  const handleBarClick = (data: any) => {
    if (data && data.activePayload && data.activePayload[0]) {
      const barData = data.activePayload[0].payload as ChartDataPoint;
      setSelectedBarData(barData);
      setIsSheetOpen(true);
    }
  };

  // Helper function to format fiat currency
  const formatFiatCurrency = (amount: string, currency: string) => {
    const symbol = currency === "EUR" ? "€" : currency === "AED" ? "AED " : "$";
    const position = currency === "EUR" ? "after" : "before";
    
    if (position === "after") {
      return `${amount}${symbol}`;
    }
    return `${symbol}${amount}`;
  };

  return (
    <PageLayout>
      <PageLayout.Header
        icon={<Activity className="w-6 h-6 text-[#FF5914]" />}
        title="Dashboard"
        subtitle="Payment Processing Overview"
      />
      <PageLayout.Content>
        <div className="space-y-6">
          {/* ========================================
          TIER 1 - PRIMARY METRICS (Line 1: 5 boxes in one row)
          Volume, Transactions, Avg Trx, Fees, Customers
          Desktop: 5 columns
          Mobile: 2 columns (2-3 boxes per line)
          ======================================== */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Volume</CardTitle>
                  <p className="text-muted-foreground text-xs mt-1">30d</p>
                </div>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="-mt-4">
                <div>
                  $
                  {dashboardStats.totalVolumeProcessed.toLocaleString()}
                </div>
                <p className="text-muted-foreground text-xs">
                  +12.5%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Transactions</CardTitle>
                  <p className="text-muted-foreground text-xs mt-1">30d</p>
                </div>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="-mt-4">
                <div>
                  {dashboardStats.successfulTransactions.toLocaleString()}
                </div>
                <p className="text-muted-foreground text-xs">
                  +8.2%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Avg Trx</CardTitle>
                  <p className="text-muted-foreground text-xs mt-1">30d</p>
                </div>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="-mt-4">
                <div>
                  $
                  {dashboardStats.averageTransactionValue.toFixed(
                    2,
                  )}
                </div>
                <p className="text-muted-foreground text-xs">
                  +3.1%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Fees</CardTitle>
                  <p className="text-muted-foreground text-xs mt-1">30d</p>
                </div>
                <Coins className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="-mt-4">
                <div>
                  $
                  {dashboardStats.totalFeesEarned.toLocaleString()}
                </div>
                <p className="text-muted-foreground text-xs">
                  +18.7%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Customers</CardTitle>
                  <p className="text-muted-foreground text-xs mt-1">30d</p>
                </div>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="-mt-4">
                <div>
                  {dashboardStats.activePayors.toLocaleString()}
                </div>
                <p className="text-muted-foreground text-xs">
                  +15.3%
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tier 3 - Charts (2 charts side by side) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Transaction Volume</CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <ChartContainer
                  config={{}}
                  className="h-[200px] md:h-[300px] w-full"
                >
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <BarChart
                      data={chartData}
                      margin={{
                        top: 5,
                        right: 5,
                        left: 5,
                        bottom: 5,
                      }}
                      onClick={handleBarClick}
                    >
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                      />
                      <Bar
                        dataKey="transactions"
                        fill="#FF5914"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cumulative Volume</CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <ChartContainer
                  config={{}}
                  className="h-[200px] md:h-[300px] w-full"
                >
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <LineChart
                      data={chartData}
                      margin={{
                        top: 5,
                        right: 5,
                        left: 5,
                        bottom: 5,
                      }}
                    >
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                      />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#10b981"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">
                        Tr-ID
                      </TableHead>
                      <TableHead className="w-[140px]">
                        Date Time
                      </TableHead>
                      <TableHead className="w-[100px]">
                        Paid
                      </TableHead>
                      <TableHead className="w-[80px]">
                        Chain
                      </TableHead>
                      <TableHead className="w-[100px]">
                        Fee
                      </TableHead>
                      <TableHead className="w-[120px]">
                        Received
                      </TableHead>
                      <TableHead className="w-[100px]">
                        Status
                      </TableHead>
                      <TableHead className="w-[80px] text-center">
                        Explorer
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentTransactions.map((tx) => (
                      <TableRow key={tx.id}>
                        <TableCell className="font-mono text-sm">
                          {tx.id}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-sm">
                              {new Date(tx.date).toLocaleDateString(
                                "en-US",
                                {
                                  year: "2-digit",
                                  month: "numeric",
                                  day: "numeric",
                                },
                              )}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(tx.date).toLocaleTimeString(
                                "en-US",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                },
                              )}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm font-medium">
                            {formatFiatCurrency(tx.price, tx.baseCurrency)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <ChainIcon
                            chain={tx.chain}
                            size={20}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <CryptoIcon symbol={tx.crypto} size={16} />
                            <span className="text-sm">{tx.fee}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <CryptoIcon symbol={tx.crypto} size={16} />
                            <span className="text-sm font-semibold">{tx.received}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              tx.status === "Success"
                                ? "default"
                                : tx.status === "Pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {tx.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <a
                            href={getExplorerUrl(
                              tx.chain,
                              tx.txHash,
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full p-2 transition-colors"
                            title={`View on ${tx.chain} explorer`}
                          >
                            <ExternalLink className="w-4 h-4 text-[#07D7FF]" />
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {recentTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="border rounded-2xl p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm">
                        {tx.id}
                      </span>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            tx.status === "Success"
                              ? "default"
                              : tx.status === "Pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {tx.status}
                        </Badge>
                        <a
                          href={getExplorerUrl(
                            tx.chain,
                            tx.txHash,
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full p-2 transition-colors"
                          title={`View on ${tx.chain} explorer`}
                        >
                          <ExternalLink className="w-4 h-4 text-[#07D7FF]" />
                        </a>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Date Time:
                        </span>
                        <div className="flex flex-col items-end">
                          <span className="text-sm">
                            {new Date(tx.date).toLocaleDateString(
                              "en-US",
                              {
                                year: "2-digit",
                                month: "numeric",
                                day: "numeric",
                              },
                            )}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(tx.date).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              },
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Paid:
                        </span>
                        <span className="text-sm font-medium">
                          {formatFiatCurrency(tx.price, tx.baseCurrency)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Chain:
                        </span>
                        <span>
                          <ChainIcon
                            chain={tx.chain}
                            size={20}
                          />
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Fee:
                        </span>
                        <div className="flex items-center gap-1.5">
                          <CryptoIcon symbol={tx.crypto} size={16} />
                          <span className="text-sm">{tx.fee}</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Received:
                        </span>
                        <div className="flex items-center gap-1.5">
                          <CryptoIcon symbol={tx.crypto} size={16} />
                          <span className="text-sm font-semibold">{tx.received}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* ========================================
          MD3 MOBILE FAB (Bottom-Right)
          
          Position: fixed bottom-24 right-6 (96px from bottom, 24px from right)
          Note: bottom-24 positions FAB above 80px bottom nav with 16px spacing
          Size: w-14 h-14 (56px × 56px - MD3 standard)
          Icon: w-6 h-6 (24px)
          Elevation: shadow-lg (Level 3)
          Hidden on desktop: md:hidden
          
          Shows Sparkles icon when onboarding incomplete (navigates to onboarding page)
          Shows Plus icon when onboarding complete (creates payment link)
          ======================================== */}
          <button
            onClick={onCreatePaymentLink}
            aria-label="Create payment link"
            className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-[#1E88E5] text-white shadow-lg hover:bg-[#1565C0] hover:shadow-xl hover:scale-105 active:scale-95 focus:ring-2 focus:ring-[#1E88E5] focus:ring-offset-2 focus:outline-none transition-all duration-200 flex items-center justify-center md:hidden"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>

        {/* ========================================
        TRANSACTION VOLUME DETAIL BOTTOM SHEET
        
        Shows detailed information when a bar is tapped on mobile
        Displays:
        - Month/Period
        - Total Transactions
        - Total Revenue
        - Average Transaction Value
        ======================================== */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent 
            side="bottom" 
            className="h-auto rounded-t-3xl"
          >
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#1E88E5]" />
                Transaction Details
              </SheetTitle>
              <SheetDescription>
                Detailed breakdown for selected period
              </SheetDescription>
            </SheetHeader>
            
            {selectedBarData && (
              <div className="mt-6 space-y-4">
                {/* Period */}
                <div className="flex items-center justify-between p-4 bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-xl">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Period</span>
                  </div>
                  <span className="font-medium">{selectedBarData.month}</span>
                </div>

                {/* Total Transactions */}
                <div className="flex items-center justify-between p-4 bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-xl">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Total Transactions</span>
                  </div>
                  <span className="font-semibold text-[#1E88E5]">
                    {selectedBarData.transactions.toLocaleString()}
                  </span>
                </div>

                {/* Total Revenue */}
                <div className="flex items-center justify-between p-4 bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-xl">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Total Revenue</span>
                  </div>
                  <span className="font-semibold text-[#10b981]">
                    ${selectedBarData.revenue.toLocaleString()}
                  </span>
                </div>

                {/* Average Transaction Value */}
                <div className="flex items-center justify-between p-4 bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-xl">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Avg Transaction</span>
                  </div>
                  <span className="font-medium">
                    ${(selectedBarData.revenue / selectedBarData.transactions).toFixed(2)}
                  </span>
                </div>

                {/* Summary Stats */}
                <div className="mt-6 pt-4 border-t border-[#43586C]">
                  <p className="text-xs text-muted-foreground text-center mb-3">
                    Overall Performance
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Total</p>
                      <p className="font-semibold text-sm">{totalTransactions.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-3 bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Peak</p>
                      <p className="font-semibold text-sm">{peakTransactions.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-3 bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Average</p>
                      <p className="font-semibold text-sm">{Math.round(avgTransactions).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </PageLayout.Content>
    </PageLayout>
  );
});

export default DashboardPage;