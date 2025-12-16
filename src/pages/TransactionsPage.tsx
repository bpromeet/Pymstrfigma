import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { List, ExternalLink, Receipt, Link as LinkIcon } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { ChainIcon } from '../components/ChainIcon';
import { CryptoIcon } from '../components/CryptoIcon';
import { formatPrice } from '../utils/currency';
import { truncateAddress } from '../utils/address';
import SearchField from '../components/SearchField';
import RefreshButton from '../components/RefreshButton';

// Mock transaction data
const MOCK_TRANSACTIONS = [
  {
    id: 'TX32',
    trId: 1,
    linkId: '#41',
    linkDescription: 'Premium Subscription',
    date: 'Dec 8, 2025 11:23',
    chain: 'base-sepolia',
    currency: 'USDT',
    price: 20.00,
    baseCurrency: 'EUR',
    commission: 0.400000,
    commissionFiat: 0.40,
    commissionPercent: 2,
    merchantReceived: 19.600000,
    merchantReceivedFiat: 19.60,
    merchantEmail: 'benjixo1@gmail.com',
    gasFee: 0.001526,
    gasFeeFiat: 0.00,
    paid: 20.001526,
    paidFiat: 20.00,
    customerEmail: 'benjixo1@gmail.com',
    exchangeRate: 1.000000,
    txHash: '0x50a8eb0d1c3e7f2a4b9d6c8e5a3f1b7c9e4d2a6f8b1c5e3d7a9f2b4c6e8a1d3f5b7c9e2a4f6b8d1c3e5a7f9b2d4c6e8a1f3b5d7c9e4a6f8b1d3c5e7a9f2b4c6e8a1d3f5b7c9e2a4f6b8d1c3e5a7f9b2d4c6e8a1f3b5d7c9e4a6f8b1d3c5e7a9f2b4c6e8a1d3f5b7c942068a9',
  },
  {
    id: 'TX31',
    trId: 2,
    linkId: '#40',
    linkDescription: 'Coffee Subscription',
    date: 'Dec 8, 2025 11:16',
    chain: 'base-sepolia',
    currency: 'USDT',
    price: 20.00,
    baseCurrency: 'USD',
    commission: 0.400000,
    commissionFiat: 0.40,
    commissionPercent: 2,
    merchantReceived: 19.600000,
    merchantReceivedFiat: 19.60,
    merchantEmail: 'benjixo1@gmail.com',
    gasFee: 0.001526,
    gasFeeFiat: 0.00,
    paid: 20.001526,
    paidFiat: 20.00,
    customerEmail: 'customer@example.com',
    exchangeRate: 1.000000,
    txHash: '0x742d35Cc1b4b3e7f2a4b9d6c8e5a3f1b7c9e4d2a6f8b1c5e3d7a9f2b4c6e8a1d3f5b7c9e2a4f6b8d1c3e5a7f9b2d4c6e8a1f3b5d7c9e4a6f8b1d3c5e7a9f2b4c6e8a1d3f5b7c95f0bEb5',
  },
  {
    id: 'TX30',
    trId: 3,
    linkId: '#39',
    linkDescription: 'E-commerce Purchase',
    date: 'Dec 8, 2025 10:45',
    chain: 'polygon',
    currency: 'USDC',
    price: 156.78,
    baseCurrency: 'USD',
    commission: 3.13560,
    commissionFiat: 3.14,
    commissionPercent: 2,
    merchantReceived: 153.64440,
    merchantReceivedFiat: 153.64,
    merchantEmail: 'merchant@pymstr.com',
    gasFee: 0.002100,
    gasFeeFiat: 0.00,
    paid: 156.782100,
    paidFiat: 156.78,
    customerEmail: 'buyer@email.com',
    exchangeRate: 1.000000,
    txHash: '0x8a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d123456',
  },
  {
    id: 'TX29',
    trId: 4,
    linkId: '#38',
    linkDescription: 'Digital Product',
    date: 'Dec 8, 2025 09:30',
    chain: 'ethereum',
    currency: 'EURC',
    price: 50.00,
    baseCurrency: 'EUR',
    commission: 1.000000,
    commissionFiat: 1.00,
    commissionPercent: 2,
    merchantReceived: 49.000000,
    merchantReceivedFiat: 49.00,
    merchantEmail: 'merchant@pymstr.com',
    gasFee: 0.003500,
    gasFeeFiat: 0.00,
    paid: 50.003500,
    paidFiat: 50.00,
    customerEmail: 'customer@web3.com',
    exchangeRate: 1.000000,
    txHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d789abc',
  },
  {
    id: 'TX28',
    trId: 5,
    linkId: '#37',
    linkDescription: 'Pro Membership',
    date: 'Dec 7, 2025 18:22',
    chain: 'arbitrum',
    currency: 'USDT',
    price: 99.99,
    baseCurrency: 'USD',
    commission: 1.99980,
    commissionFiat: 2.00,
    commissionPercent: 2,
    merchantReceived: 97.99020,
    merchantReceivedFiat: 97.99,
    merchantEmail: 'merchant@pymstr.com',
    gasFee: 0.000800,
    gasFeeFiat: 0.00,
    paid: 99.990800,
    paidFiat: 99.99,
    customerEmail: 'alice@crypto.io',
    exchangeRate: 1.000000,
    txHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890def123',
  },
];

const SUPPORTED_CHAINS = [
  { id: 'ethereum', name: 'Ethereum' },
  { id: 'polygon', name: 'Polygon' },
  { id: 'arbitrum', name: 'Arbitrum' },
  { id: 'optimism', name: 'Optimism' },
  { id: 'base-sepolia', name: 'Base Sepolia' },
];

const SUPPORTED_CURRENCIES = [
  { id: 'USDC', name: 'USDC' },
  { id: 'USDT', name: 'USDT' },
  { id: 'EURC', name: 'EURC' },
];

export const TransactionsPage: React.FC = () => {
  const [chainFilter, setChainFilter] = useState('all');
  const [currencyFilter, setCurrencyFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearchQuery, setActiveSearchQuery] = useState('');
  const [transactions] = useState(MOCK_TRANSACTIONS);

  // Handle search button click
  const handleSearch = () => {
    setActiveSearchQuery(searchQuery);
  };

  // Handle Enter key in search field
  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const filteredTransactions = transactions.filter((tx) => {
    const matchesChain = chainFilter === 'all' || tx.chain === chainFilter;
    const matchesCurrency = currencyFilter === 'all' || tx.currency === currencyFilter;
    const matchesSearch =
      activeSearchQuery === '' ||
      tx.id.toLowerCase().includes(activeSearchQuery.toLowerCase()) ||
      tx.linkId.toLowerCase().includes(activeSearchQuery.toLowerCase()) ||
      tx.txHash.toLowerCase().includes(activeSearchQuery.toLowerCase()) ||
      tx.customerEmail.toLowerCase().includes(activeSearchQuery.toLowerCase());
    return matchesChain && matchesCurrency && matchesSearch;
  });

  const handleRefresh = () => {
    // Reset all filters and search to initial state
    setChainFilter('all');
    setCurrencyFilter('all');
    setSearchQuery('');
    setActiveSearchQuery('');
    console.log('Transactions refreshed - filters and search cleared');
  };

  const getExplorerUrl = (chain: string, txHash: string) => {
    const explorers: Record<string, string> = {
      ethereum: 'https://etherscan.io/tx/',
      polygon: 'https://polygonscan.com/tx/',
      arbitrum: 'https://arbiscan.io/tx/',
      optimism: 'https://optimistic.etherscan.io/tx/',
      'base-sepolia': 'https://sepolia.basescan.org/tx/',
    };
    return `${explorers[chain] || explorers.ethereum}${txHash}`;
  };

  return (
    <PageLayout>
      <PageLayout.Header
        icon={<List className="w-6 h-6 text-[#FF5914]" />}
        title="Transactions"
        subtitle="Payment History & Activity"
      />
      <PageLayout.Content>
        {/* ========================================
        PATTERN A: STICKY FILTER BAR (Above Content Card)
        
        MD3 Specifications:
        - Position: Outside and above content card
        - Sticky positioning for scroll persistence
        - Consistent spacing (gap-3)
        - All filters in one cohesive bar
        ======================================== */}
        <div className="sticky top-0 bg-white dark:bg-[#0a0a0a] py-4 z-10">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Currency Filter (Stablecoin - now first) */}
            <Select value={currencyFilter} onValueChange={setCurrencyFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Stablecoin">
                  <div className="flex items-center gap-2">
                    {currencyFilter !== "all" && (
                      <CryptoIcon symbol={currencyFilter} size={16} />
                    )}
                    <span>
                      {currencyFilter === "all"
                        ? "Stablecoin"
                        : SUPPORTED_CURRENCIES.find((c) => c.id === currencyFilter)?.name || currencyFilter}
                    </span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  <div className="flex items-center gap-2">
                    <span>Stablecoin</span>
                  </div>
                </SelectItem>
                {SUPPORTED_CURRENCIES.map((currency) => (
                  <SelectItem key={currency.id} value={currency.id}>
                    <div className="flex items-center gap-2">
                      <CryptoIcon symbol={currency.id} size={16} />
                      <span>{currency.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Chain Filter (now second) */}
            <Select value={chainFilter} onValueChange={setChainFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Chain">
                  <div className="flex items-center gap-2">
                    {chainFilter !== "all" && (
                      <ChainIcon chain={chainFilter} size={16} />
                    )}
                    <span>
                      {chainFilter === "all"
                        ? "Chain"
                        : SUPPORTED_CHAINS.find((c) => c.id === chainFilter)?.name || chainFilter}
                    </span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  <div className="flex items-center gap-2">
                    <span>Chain</span>
                  </div>
                </SelectItem>
                {SUPPORTED_CHAINS.map((chain) => (
                  <SelectItem key={chain.id} value={chain.id}>
                    <div className="flex items-center gap-2">
                      <ChainIcon chain={chain.id} size={16} />
                      <span>{chain.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Search + Refresh Row (Mobile: same line, Desktop: integrated) */}
            <div className="flex items-center gap-3 flex-1">
              {/* Search Input */}
              <SearchField
                value={searchQuery}
                onChange={setSearchQuery}
                onKeyPress={handleSearchKeyPress}
                className="flex-1"
              />

              {/* Desktop Search Button - Pill-shaped, no icon */}
              <Button
                onClick={handleSearch}
                variant="outline"
                className="hidden md:inline-flex items-center justify-center px-6 h-12 rounded-full transition-all duration-200"
              >
                Search
              </Button>

              {/* Mobile Search Button - Pill-shaped, no icon */}
              <Button
                onClick={handleSearch}
                variant="outline"
                className="md:hidden flex items-center justify-center px-6 h-12 rounded-full transition-all duration-200"
              >
                Search
              </Button>

              {/* Refresh Button */}
              <RefreshButton onClick={handleRefresh} />
            </div>
          </div>


        </div>

        {/* ========================================
        CONTENT AREA (Pure Data Display - No Controls)
        ======================================== */}
        {/* Transaction List */}
        <div className="space-y-4">
          {filteredTransactions.length === 0 ? (
            <Card className="rounded-2xl p-12">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center">
                  <Receipt className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-medium">No transactions found</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  {searchQuery || chainFilter !== 'all' || currencyFilter !== 'all'
                    ? 'Try adjusting your filters or search query'
                    : 'Your completed payment transactions will appear here'}
                </p>
              </div>
            </Card>
          ) : (
            filteredTransactions.map((tx) => (
              <Card key={tx.id} className="rounded-2xl p-6">
                {/* Transaction Header - Single Row */}
                <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
                  {/* Left: Icon + Title */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#07D7FF]/10 flex items-center justify-center flex-shrink-0">
                      <Receipt className="w-6 h-6 text-[#07D7FF]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <LinkIcon className="w-3.5 h-3.5 text-muted-foreground" />
                        <h3>{tx.linkDescription || 'Payment'} - {tx.linkId}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Tr-ID: {tx.trId}</p>
                    </div>
                  </div>

                  {/* Right: Date, Badges, Explorer Link */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                      <span className="inline-block w-1 h-1 rounded-full bg-muted-foreground"></span>
                      {tx.date}
                    </p>
                    <Badge variant="outline" className="rounded-full flex items-center gap-1.5">
                      <ChainIcon chain={tx.chain} className="w-3.5 h-3.5" />
                      {tx.chain}
                    </Badge>
                    <Badge variant="outline" className="rounded-full flex items-center gap-1.5">
                      <CryptoIcon symbol={tx.currency} className="w-3.5 h-3.5" />
                      {tx.currency}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full w-10 h-10 p-0 transition-all duration-200"
                      onClick={() => window.open(getExplorerUrl(tx.chain, tx.txHash), '_blank')}
                      aria-label="View on explorer"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Transaction Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-2 pt-4 border-t border-border">
                  {/* Price */}
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Price</p>
                    <p className="font-semibold">{formatPrice(tx.price, tx.baseCurrency)}</p>
                    <p className="text-xs text-muted-foreground">{tx.baseCurrency}</p>
                  </div>

                  {/* Paid */}
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Paid</p>
                    <p className="font-semibold flex items-center gap-1.5">
                      {tx.paid.toFixed(6)}
                      <CryptoIcon symbol={tx.currency} size={16} />
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ≈ {formatPrice(tx.paidFiat, tx.baseCurrency)}
                    </p>
                    <p className="text-xs text-muted-foreground break-all flex items-center gap-1">
                      <span className="inline-block w-3 h-3 rounded-full bg-muted flex-shrink-0"></span>
                      {tx.customerEmail}
                    </p>
                  </div>

                  {/* Gas Fee */}
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Gas Fee</p>
                    <p className="font-semibold flex items-center gap-1.5">
                      {tx.gasFee.toFixed(6)}
                      <CryptoIcon symbol={tx.currency} size={16} />
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ≈ {formatPrice(tx.gasFeeFiat, tx.baseCurrency)}
                    </p>
                  </div>

                  {/* Fee */}
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Fee</p>
                    <p className="font-semibold flex items-center gap-1.5">
                      {tx.commission.toFixed(6)}
                      <CryptoIcon symbol={tx.currency} size={16} />
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ≈ {formatPrice(tx.commissionFiat, tx.baseCurrency)} ({tx.commissionPercent}%)
                    </p>
                  </div>

                  {/* Received */}
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Received</p>
                    <p className="font-semibold flex items-center gap-1.5">
                      {tx.merchantReceived.toFixed(6)}
                      <CryptoIcon symbol={tx.currency} size={16} />
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ≈ {formatPrice(tx.merchantReceivedFiat, tx.baseCurrency)}
                    </p>
                    <p className="text-xs text-muted-foreground break-all flex items-center gap-1">
                      <span className="inline-block w-3 h-3 rounded-full bg-muted flex-shrink-0"></span>
                      {tx.merchantEmail}
                    </p>
                  </div>
                </div>

                {/* Transaction Footer */}
                <div className="flex items-center gap-3 pt-4 border-t border-border text-xs text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block w-1 h-1 rounded-full bg-muted-foreground"></span>
                    Exchange Rate: {tx.exchangeRate.toFixed(6)}
                  </span>
                  <span>•</span>
                  <code className="break-all">{truncateAddress(tx.txHash, 10, 8)}</code>
                </div>
              </Card>
            ))
          )}
        </div>
      </PageLayout.Content>
    </PageLayout>
  );
};