import { useState } from "react";
import { BarChart3, Search, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { toast } from "sonner@2.0.3";
import PageLayout from "../components/PageLayout";
import SearchField from "../components/SearchField";
import DateField from "../components/DateField";
import ReportsTransactionTable from "../components/ReportsTransactionTable";
import { CryptoIcon } from "../components/CryptoIcon";
import { ChainIcon } from "../components/ChainIcon";

// Import transaction types
interface Transaction {
  id: string;
  date: string;
  type: string;
  status: string;
  price: string;
  currency: string;
  chain: string;
  txHash: string;
  customerEmail?: string;
}

interface ReportsPageProps {
  recentTransactions: Transaction[];
  getExplorerUrl: (chain: string, txHash: string) => string;
}

// Supported cryptocurrencies for charts
const supportedCryptos = [
  { symbol: "USDC" },
  { symbol: "USDT" },
  { symbol: "EURC" },
];

export default function ReportsPage({
  recentTransactions,
  getExplorerUrl,
}: ReportsPageProps) {
  const [reportsSearchQuery, setReportsSearchQuery] = useState("");
  const [reportsDateFrom, setReportsDateFrom] = useState("");
  const [reportsDateTo, setReportsDateTo] = useState("");
  const [chainFilter, setChainFilter] = useState("all");
  const [currencyFilter, setCurrencyFilter] = useState("all");

  return (
    <PageLayout>
      <PageLayout.Header
        icon={<BarChart3 className="w-6 h-6 text-[#FF5914]" />}
        title="Reports & Analytics"
        subtitle="View detailed analytics and insights about your payment activity"
      />
      <PageLayout.Content>
        {/* Search and Date Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search Field */}
          <SearchField
            value={reportsSearchQuery}
            onChange={setReportsSearchQuery}
            placeholder="Search transactions..."
            className="flex-1"
          />
          {/* Date From Field */}
          <DateField
            value={reportsDateFrom}
            onChange={setReportsDateFrom}
            placeholder="From date"
            className="w-full md:w-48"
          />
          {/* Date To Field */}
          <DateField
            value={reportsDateTo}
            onChange={setReportsDateTo}
            placeholder="To date"
            className="w-full md:w-48"
          />
          {/* Filter Button - Outlined when dates not selected, Filled when both dates selected */}
          <Button
            onClick={() => {
              if (reportsDateFrom && reportsDateTo) {
                toast.success(
                  `Filtering transactions${reportsSearchQuery ? ` matching "${reportsSearchQuery}"` : ''}${reportsDateFrom ? ` from ${new Date(reportsDateFrom).toLocaleDateString()}` : ''}${reportsDateTo ? ` to ${new Date(reportsDateTo).toLocaleDateString()}` : ''}`
                );
              }
            }}
            disabled={!reportsDateFrom || !reportsDateTo}
            className={`min-h-12 px-8 py-3 rounded-full transition-all duration-200 w-full md:w-auto ${
              reportsDateFrom && reportsDateTo
                ? 'bg-[#1E88E5] text-white hover:bg-[#1565C0] cursor-pointer'
                : 'bg-transparent border border-[#43586C] text-[#798A9B] cursor-not-allowed opacity-60'
            }`}
          >
            <Search className="w-[18px] h-[18px] mr-2" />
            Filter
          </Button>

          {/* Clear Filters Button - Shows when any filter is active */}
          {(reportsSearchQuery || reportsDateFrom || reportsDateTo || chainFilter !== "all" || currencyFilter !== "all") && (
            <Button
              onClick={() => {
                setReportsSearchQuery('');
                setReportsDateFrom('');
                setReportsDateTo('');
                setChainFilter('all');
                setCurrencyFilter('all');
                toast.success('Filters cleared');
              }}
              className="min-h-12 px-6 py-3 bg-transparent border border-[#FF5914] text-[#FF5914] hover:bg-[#FF5914] hover:text-white rounded-full transition-all duration-200 w-full md:w-auto"
            >
              <X className="w-[18px] h-[18px] mr-2" />
              Clear Filters
            </Button>
          )}
        </div>

        <div className="space-y-6">
          {/* Chart boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  Payment Volume by Currency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supportedCryptos.map((crypto) => (
                    <div
                      key={crypto.symbol}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <CryptoIcon symbol={crypto.symbol} />
                        <span>{crypto.symbol}</span>
                      </div>
                      <span className="font-mono">
                        ${(Math.random() * 10000).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Network Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      chain: "Polygon",
                      txCount: 1247,
                      avgValue: "$125",
                    },
                    {
                      chain: "Arbitrum",
                      txCount: 892,
                      avgValue: "$342",
                    },
                    {
                      chain: "Base",
                      txCount: 654,
                      avgValue: "$89",
                    },
                    {
                      chain: "Optimism",
                      txCount: 423,
                      avgValue: "$267",
                    },
                    {
                      chain: "Ethereum",
                      txCount: 156,
                      avgValue: "$1,834",
                    },
                  ].map((network) => (
                    <div
                      key={network.chain}
                      className="flex items-center justify-between"
                    >
                      <span className="text-gray-900 dark:text-[#F6F7F9]">{network.chain}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-[#798A9B]">
                          {network.txCount} txs
                        </span>
                        <span className="text-gray-900 dark:text-[#F6F7F9]">
                          {network.avgValue} avg
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chain and Currency Filters for Transaction Table */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={chainFilter} onValueChange={setChainFilter}>
              <SelectTrigger className="w-full sm:w-48 rounded-full bg-[#EEEEEE] dark:bg-[#262626] border text-gray-900 dark:text-[#F6F7F9] hover:border-[#757575] transition-all duration-200">
                <SelectValue placeholder="All Chains">
                  <div className="flex items-center gap-2">
                    {chainFilter !== "all" && (
                      <ChainIcon chain={chainFilter} size={16} />
                    )}
                    <span>
                      {chainFilter === "all"
                        ? "All Chains"
                        : chainFilter.charAt(0).toUpperCase() + chainFilter.slice(1)}
                    </span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  <div className="flex items-center gap-2">
                    <span>All Chains</span>
                  </div>
                </SelectItem>
                <SelectItem value="ethereum">
                  <div className="flex items-center gap-2">
                    <ChainIcon chain="ethereum" size={16} />
                    <span>Ethereum</span>
                  </div>
                </SelectItem>
                <SelectItem value="polygon">
                  <div className="flex items-center gap-2">
                    <ChainIcon chain="polygon" size={16} />
                    <span>Polygon</span>
                  </div>
                </SelectItem>
                <SelectItem value="arbitrum">
                  <div className="flex items-center gap-2">
                    <ChainIcon chain="arbitrum" size={16} />
                    <span>Arbitrum</span>
                  </div>
                </SelectItem>
                <SelectItem value="optimism">
                  <div className="flex items-center gap-2">
                    <ChainIcon chain="optimism" size={16} />
                    <span>Optimism</span>
                  </div>
                </SelectItem>
                <SelectItem value="base">
                  <div className="flex items-center gap-2">
                    <ChainIcon chain="base" size={16} />
                    <span>Base</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>

            <Select value={currencyFilter} onValueChange={setCurrencyFilter}>
              <SelectTrigger className="w-full sm:w-48 rounded-full bg-[#EEEEEE] dark:bg-[#262626] border text-gray-900 dark:text-[#F6F7F9] hover:border-[#757575] transition-all duration-200">
                <SelectValue placeholder="All Currencies">
                  <div className="flex items-center gap-2">
                    {currencyFilter !== "all" && (
                      <CryptoIcon symbol={currencyFilter} size={16} />
                    )}
                    <span>
                      {currencyFilter === "all" ? "All Currencies" : currencyFilter}
                    </span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  <div className="flex items-center gap-2">
                    <span>All Currencies</span>
                  </div>
                </SelectItem>
                <SelectItem value="USDC">
                  <div className="flex items-center gap-2">
                    <CryptoIcon symbol="USDC" size={16} />
                    <span>USDC</span>
                  </div>
                </SelectItem>
                <SelectItem value="USDT">
                  <div className="flex items-center gap-2">
                    <CryptoIcon symbol="USDT" size={16} />
                    <span>USDT</span>
                  </div>
                </SelectItem>
                <SelectItem value="EURC">
                  <div className="flex items-center gap-2">
                    <CryptoIcon symbol="EURC" size={16} />
                    <span>EURC</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Transaction table - always show, positioned based on filters */}
          <ReportsTransactionTable
            transactions={recentTransactions}
            searchQuery={reportsSearchQuery}
            dateFrom={reportsDateFrom}
            dateTo={reportsDateTo}
            chainFilter={chainFilter}
            currencyFilter={currencyFilter}
            getExplorerUrl={getExplorerUrl}
            isFiltered={!!(reportsSearchQuery || reportsDateFrom || reportsDateTo || chainFilter !== "all" || currencyFilter !== "all")}
          />
        </div>
      </PageLayout.Content>
    </PageLayout>
  );
}