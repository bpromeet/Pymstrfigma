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
import PageLayout from "../components/PageLayout";
import { ChainIcon } from "../components/ChainIcon";
import { CryptoIcon } from "../components/CryptoIcon";

interface DashboardStats {
  totalVolumeProcessed: number;
  successfulTransactions: number;
  averageTransactionValue: number;
  activePayors: number;
  multiChainVolume: {
    ethereum: number;
    polygon: number;
    arbitrum: number;
    optimism: number;
    base: number;
  };
  currencyVolume: {
    USDC: number;
    USDT: number;
    EURC: number;
  };
}

interface Transaction {
  id: string;
  date: string;
  linkId: string;
  price: string;
  crypto: string;
  chain: string;
  status: string;
  txHash: string;
}

interface ChartDataPoint {
  month: string;
  transactions: number;
  revenue: number;
}

interface DashboardPageProps {
  dashboardStats: DashboardStats;
  recentTransactions: Transaction[];
  chartData: ChartDataPoint[];
  onCreatePaymentLink: () => void;
  getExplorerUrl: (chain: string, txHash: string) => string;
  
  // Onboarding props
  showOnboardingBanner?: boolean;
  onboardingProgress?: number;
  onboardingIncomplete?: boolean;
  currentOnboardingStep?: {
    title: string;
    description: string;
    action: { label: string; route: string };
  };
  onDismissBanner?: () => void;
  onNavigateToOnboarding?: () => void;
  showOnboardingReminderButton?: boolean; // NEW: Show small reminder button when banner dismissed
  onReminderButtonClick?: () => void; // NEW: Handler for reminder button
}

const DashboardPage: React.FC<DashboardPageProps> = ({
  dashboardStats,
  recentTransactions,
  chartData,
  onCreatePaymentLink,
  getExplorerUrl,
  showOnboardingBanner = false,
  onboardingProgress = 0,
  onboardingIncomplete = false,
  currentOnboardingStep,
  onDismissBanner,
  onNavigateToOnboarding,
  showOnboardingReminderButton = false,
  onReminderButtonClick,
}) => {
  return (
    <PageLayout>
      <PageLayout.Header
        icon={<Activity className="w-6 h-6 text-[#FF5914]" />}
        title="Dashboard"
        subtitle="Overview of your payment processing and analytics"
      />
      <PageLayout.Content>
        <div className="space-y-6">
          {/* ========================================
          ONBOARDING BANNER
          
          Shows when merchant hasn't completed setup (any of 3 steps incomplete)
          Dynamic CTA button shows current step's action:
          - Step 1 incomplete: "Generate API Keys"
          - Step 2 incomplete: "Test Payment Link"  
          - Step 3 incomplete: "Add Webhook"
          
          Progress bar shows completion percentage (0%, 33%, 67%, 100%)
          Dismissible but reappears on next visit if setup still incomplete
          ======================================== */}
          {showOnboardingBanner && currentOnboardingStep && (
            <Card className="bg-gradient-to-r from-[#1E88E5]/10 to-[#07D7FF]/5 border-[#1E88E5]/30 rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#1E88E5] rounded-full flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-gray-900 dark:text-white font-medium">
                          Complete Your Setup
                        </h3>
                        <span className="text-sm font-medium text-[#1E88E5]">
                          {onboardingProgress}% Complete
                        </span>
                      </div>
                      <p className="text-sm text-[#798A9B] mb-4">
                        {currentOnboardingStep.description}
                      </p>
                      
                      {/* Progress Bar */}
                      <div className="h-2 bg-[#43586C]/20 rounded-full overflow-hidden mb-4">
                        <div 
                          className="h-full bg-gradient-to-r from-[#1E88E5] to-[#07D7FF] rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${onboardingProgress}%` }}
                        />
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center gap-3">
                        <Button
                          onClick={() => {
                            if (onNavigateToOnboarding) {
                              onNavigateToOnboarding();
                            }
                          }}
                          size={undefined}
                          className="px-6 h-10 bg-[#1E88E5] text-white hover:bg-[#1565C0] rounded-full transition-all duration-200 inline-flex items-center gap-2"
                        >
                          {currentOnboardingStep.action.label}
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => {
                            if (onDismissBanner) {
                              onDismissBanner();
                            }
                          }}
                          variant="ghost"
                          size={undefined}
                          className="px-4 h-10 text-[#798A9B] hover:text-[#1E88E5] rounded-full transition-all duration-200"
                        >
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Close Button */}
                  <button
                    onClick={() => {
                      if (onDismissBanner) {
                        onDismissBanner();
                      }
                    }}
                    className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-[#798A9B] hover:text-[#1E88E5] hover:bg-[#1E88E5]/10 rounded-full transition-all duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* ========================================
          TIER 1 - PRIMARY METRICS (Line 1: 4 boxes in one row)
          T.V, S.T, Avg Tr, A.C
          ALWAYS 4 columns on desktop/laptop screens (including 13 inch)
          Mobile: 2 columns (2 boxes per line = 2 rows)
          ======================================== */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Volume</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="-mt-4">
                <div>
                  $
                  {dashboardStats.totalVolumeProcessed.toLocaleString()}
                </div>
                <p className="text-muted-foreground">
                  +12.5%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Transactions</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="-mt-4">
                <div>
                  {dashboardStats.successfulTransactions.toLocaleString()}
                </div>
                <p className="text-muted-foreground">
                  +8.2%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Avg Trx</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="-mt-4">
                <div>
                  $
                  {dashboardStats.averageTransactionValue.toFixed(
                    2,
                  )}
                </div>
                <p className="text-muted-foreground">
                  +3.1%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="-mt-4">
                <div>
                  {dashboardStats.activePayors.toLocaleString()}
                </div>
                <p className="text-muted-foreground">
                  +15.3%
                </p>
              </CardContent>
            </Card>
          </div>

          {/* ========================================
          TIER 2 - VOLUME BREAKDOWN (Line 2: 2 boxes)
          VbC (Volume by Coin), VbC (Volume by Chain)
          ======================================== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Volume by Coin</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="-mt-4">
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <CryptoIcon
                        symbol="USDC"
                        size={20}
                      />
                      <span className="text-muted-foreground">
                        USDC
                      </span>
                    </div>
                    <span>
                      $
                      {dashboardStats.currencyVolume.USDC.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <CryptoIcon
                        symbol="USDT"
                        size={20}
                      />
                      <span className="text-muted-foreground">
                        USDT
                      </span>
                    </div>
                    <span>
                      $
                      {dashboardStats.currencyVolume.USDT.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <CryptoIcon
                        symbol="EURC"
                        size={20}
                      />
                      <span className="text-muted-foreground">
                        EURC
                      </span>
                    </div>
                    <span>
                      $
                      {dashboardStats.currencyVolume.EURC.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Volume by Chain</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="-mt-4">
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <ChainIcon
                        chain="ethereum"
                        size={20}
                      />
                      <span className="text-muted-foreground">
                        Ethereum
                      </span>
                    </div>
                    <span>
                      $
                      {dashboardStats.multiChainVolume.ethereum.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <ChainIcon
                        chain="polygon"
                        size={20}
                      />
                      <span className="text-muted-foreground">
                        Polygon
                      </span>
                    </div>
                    <span>
                      $
                      {dashboardStats.multiChainVolume.polygon.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <ChainIcon
                        chain="arbitrum"
                        size={20}
                      />
                      <span className="text-muted-foreground">
                        Arbitrum
                      </span>
                    </div>
                    <span>
                      $
                      {dashboardStats.multiChainVolume.arbitrum.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <ChainIcon
                        chain="optimism"
                        size={20}
                      />
                      <span className="text-muted-foreground">
                        Optimism
                      </span>
                    </div>
                    <span>
                      $
                      {dashboardStats.multiChainVolume.optimism.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <ChainIcon chain="base" size={20} />
                      <span className="text-muted-foreground">
                        Base
                      </span>
                    </div>
                    <span>
                      $
                      {dashboardStats.multiChainVolume.base.toLocaleString()}
                    </span>
                  </div>
                </div>
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
                    >
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                      />
                      <Bar
                        dataKey="transactions"
                        fill="#3b82f6"
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
              <CardDescription>
                Latest payment activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Desktop Table */}
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">
                        Tr-ID
                      </TableHead>
                      <TableHead className="w-[90px]">
                        Date
                      </TableHead>
                      <TableHead className="w-[70px]">
                        Time
                      </TableHead>
                      <TableHead className="w-[140px]">
                        Link ID
                      </TableHead>
                      <TableHead className="w-[100px]">
                        Amount
                      </TableHead>
                      <TableHead className="w-[90px]">
                        Coin
                      </TableHead>
                      <TableHead className="w-[70px]">
                        Chain
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
                        <TableCell className="font-mono">
                          {tx.id}
                        </TableCell>
                        <TableCell>
                          {new Date(tx.date).toLocaleDateString(
                            "en-US",
                            {
                              year: "2-digit",
                              month: "numeric",
                              day: "numeric",
                            },
                          )}
                        </TableCell>
                        <TableCell>
                          {new Date(tx.date).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            },
                          )}
                        </TableCell>
                        <TableCell>{tx.linkId}</TableCell>
                        <TableCell>${tx.price}</TableCell>
                        <TableCell>{tx.crypto}</TableCell>
                        <TableCell>
                          <ChainIcon
                            chain={tx.chain}
                            size={20}
                          />
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
                          Date:
                        </span>
                        <span>
                          {new Date(tx.date).toLocaleDateString(
                            "en-US",
                            {
                              year: "2-digit",
                              month: "numeric",
                              day: "numeric",
                            },
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Time:
                        </span>
                        <span>
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
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Link ID:
                        </span>
                        <span>{tx.linkId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Amount:
                        </span>
                        <span className="font-semibold">
                          ${tx.price}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Coin:
                        </span>
                        <span>{tx.crypto}</span>
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
            onClick={onboardingIncomplete ? onNavigateToOnboarding : onCreatePaymentLink}
            aria-label={onboardingIncomplete ? "Continue setup" : "Create payment link"}
            className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-[#1E88E5] text-white shadow-lg hover:bg-[#1565C0] hover:shadow-xl hover:scale-105 active:scale-95 focus:ring-2 focus:ring-[#1E88E5] focus:ring-offset-2 focus:outline-none transition-all duration-200 flex items-center justify-center md:hidden"
          >
            {onboardingIncomplete ? (
              <Sparkles className="w-6 h-6" />
            ) : (
              <Plus className="w-6 h-6" />
            )}
          </button>
          
          {/* ========================================
          MD3 MOBILE ONBOARDING REMINDER BUTTON
          
          Position: fixed bottom-10 right-6 (40px from bottom, 24px from right)
          Note: bottom-10 positions button above 80px bottom nav with 40px spacing
          Size: w-14 h-14 (56px × 56px - MD3 standard)
          Icon: w-6 h-6 (24px)
          Elevation: shadow-lg (Level 3)
          Hidden on desktop: md:hidden
          
          Shows Sparkles icon when onboarding incomplete (navigates to onboarding page)
          Shows Plus icon when onboarding complete (creates payment link)
          ======================================== */}
          {showOnboardingReminderButton && (
            <button
              onClick={onboardingIncomplete ? onNavigateToOnboarding : onCreatePaymentLink}
              aria-label={onboardingIncomplete ? "Continue setup" : "Create payment link"}
              className="fixed bottom-10 right-6 z-50 w-14 h-14 rounded-full bg-[#1E88E5] text-white shadow-lg hover:bg-[#1565C0] hover:shadow-xl hover:scale-105 active:scale-95 focus:ring-2 focus:ring-[#1E88E5] focus:ring-offset-2 focus:outline-none transition-all duration-200 flex items-center justify-center md:hidden"
            >
              {onboardingIncomplete ? (
                <Sparkles className="w-6 h-6" />
              ) : (
                <Plus className="w-6 h-6" />
              )}
            </button>
          )}
        </div>
      </PageLayout.Content>
    </PageLayout>
  );
};

export default DashboardPage;