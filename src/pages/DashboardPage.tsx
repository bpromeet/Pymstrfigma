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
}

export default function DashboardPage({
  dashboardStats,
  recentTransactions,
  chartData,
  onCreatePaymentLink,
  getExplorerUrl,
}: DashboardPageProps) {
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
          DESKTOP ACTION BUTTON (Left-aligned, below subtitle)
          
          Position: Top of content area, left-aligned
          Hidden on mobile (md:hidden) - mobile uses FAB instead
          ======================================== */}
          <Button
            onClick={onCreatePaymentLink}
            size={undefined}
            className="hidden md:inline-flex items-center justify-center px-6 h-10 bg-[#1E88E5] text-white hover:bg-[#1565C0] transition-all duration-200 rounded-full"
          >
            <Plus className="w-[18px] h-[18px] mr-2" />
            Generate Payment Link
          </Button>

          {/* Tier 1 - Primary Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Total Volume</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="-mt-4">
                <div>
                  $
                  {dashboardStats.totalVolumeProcessed.toLocaleString()}
                </div>
                <p className="text-muted-foreground">
                  +12.5% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Successful Transactions</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="-mt-4">
                <div>
                  {dashboardStats.successfulTransactions.toLocaleString()}
                </div>
                <p className="text-muted-foreground">
                  +8.2% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Avg Transaction</CardTitle>
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
                  +3.1% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tier 2 - Secondary Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Active Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="-mt-4">
                <div>
                  {dashboardStats.activePayors.toLocaleString()}
                </div>
                <p className="text-muted-foreground">
                  +15.3% from last month
                </p>
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

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Volume by Currency</CardTitle>
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
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                        Currency
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
                          Currency:
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
          Color: #07D7FF (PYMSTR secondary/cyan)
          Icon: w-6 h-6 (24px)
          Elevation: shadow-lg (Level 3)
          Hidden on desktop: md:hidden
          Navigates to Payment Links section and opens dialog
          ======================================== */}
          <button
            onClick={onCreatePaymentLink}
            aria-label="Create payment link"
            className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-[#1E88E5] text-white shadow-lg hover:bg-[#1565C0] hover:shadow-xl hover:scale-105 active:scale-95 focus:ring-2 focus:ring-[#1E88E5] focus:ring-offset-2 focus:outline-none transition-all duration-200 flex items-center justify-center md:hidden"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </PageLayout.Content>
    </PageLayout>
  );
}