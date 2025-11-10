import React, { useState } from 'react';
import { Plus, Search, Copy, Trash2, ExternalLink, Share2, Link as LinkIcon, Hexagon, Triangle, Zap, CircleDot, Layers, DollarSign, Euro, Coins, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import PaymentLinkForm from './PaymentLinkForm';
import { toast } from 'sonner@2.0.3';
import PageLayout from './PageLayout';

interface PaymentLinksDashboardProps {
  paymentLinks: any[];
  onDeleteLink: (id: string) => void;
  onDeactivateLink: (id: string) => void;
  onCopyLink: (id: string) => void;
  onViewLink: (link: any) => void;
  showPaymentLinkDialog: boolean;
  setShowPaymentLinkDialog: (show: boolean) => void;
}

const PaymentLinksDashboard: React.FC<PaymentLinksDashboardProps> = ({
  paymentLinks,
  onDeleteLink,
  onDeactivateLink,
  onCopyLink,
  onViewLink,
  showPaymentLinkDialog,
  setShowPaymentLinkDialog,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [chainFilter, setChainFilter] = useState('all');
  const [currencyFilter, setCurrencyFilter] = useState('all');
  const [paymentLinksTab, setPaymentLinksTab] = useState('all');

  const handleLinkGenerated = (newLink: any) => {
    toast('Payment link created successfully!');
    setShowPaymentLinkDialog(false);
  };

  // Filter function
  const getFilteredLinks = (source?: 'manual' | 'api') => {
    return paymentLinks.filter((link) => {
      const matchesChain = chainFilter === 'all' || link.chain === chainFilter;
      const matchesCurrency = currencyFilter === 'all' || link.currency === currencyFilter;
      const matchesSearch = link.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           link.price?.toString().includes(searchQuery) ||
                           link.linkId?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSource = !source || link.source === source;
      
      return matchesChain && matchesCurrency && matchesSearch && matchesSource;
    });
  };

  // Helper function to get block explorer URL
  const getExplorerUrl = (chain: string, txHash: string) => {
    const explorers: Record<string, string> = {
      ethereum: 'https://etherscan.io/tx/',
      polygon: 'https://polygonscan.com/tx/',
      arbitrum: 'https://arbiscan.io/tx/',
      optimism: 'https://optimistic.etherscan.io/tx/',
      base: 'https://basescan.org/tx/',
    };
    return explorers[chain] + txHash;
  };

  // Helper function to get chain icon
  const getChainIcon = (chain: string) => {
    const icons: Record<string, React.ReactNode> = {
      ethereum: <Hexagon className="w-4 h-4 text-[#FF5914]" />,
      polygon: <Triangle className="w-4 h-4 text-[#FF5914]" />,
      arbitrum: <Zap className="w-4 h-4 text-[#FF5914]" />,
      optimism: <CircleDot className="w-4 h-4 text-[#FF5914]" />,
      base: <Layers className="w-4 h-4 text-[#FF5914]" />,
    };
    return icons[chain] || <Hexagon className="w-4 h-4 text-[#FF5914]" />;
  };

  // Helper function to get currency icon
  const getCurrencyIcon = (currency: string) => {
    const icons: Record<string, React.ReactNode> = {
      USDC: <Coins className="w-4 h-4 text-[#FF5914]" />,
      USDT: <DollarSign className="w-4 h-4 text-[#FF5914]" />,
      EURC: <Euro className="w-4 h-4 text-[#FF5914]" />,
    };
    return icons[currency] || <DollarSign className="w-4 h-4 text-[#FF5914]" />;
  };

  return (
    <PageLayout>
      <PageLayout.Header
        icon={<LinkIcon className="w-6 h-6 text-[#07D7FF]" />}
        title="Payment Links"
        subtitle="Create and manage single-use payment links for transactions"
      />
      <PageLayout.Content>
        <div className="space-y-6">

      {/* ========================================
          DESKTOP ACTION BUTTON (Left-aligned, below subtitle)
          
          Position: Top of content area, left-aligned
          Hidden on mobile (md:hidden) - mobile uses FAB instead
          ======================================== */}
      <Button
        onClick={() => {
          setShowPaymentLinkDialog(true);
        }}
        size={undefined}
        className="hidden md:inline-flex items-center justify-center px-6 h-10 bg-[#1E88E5] text-white hover:bg-[#1565C0] transition-all duration-200 rounded-full"
      >
        <Plus className="w-[18px] h-[18px] mr-2" />
        Generate Payment Link
      </Button>

      <Dialog open={showPaymentLinkDialog} onOpenChange={setShowPaymentLinkDialog}>
        <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#303030] shadow-xl p-8">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl">Generate Payment Link</DialogTitle>
            <DialogDescription className="text-base mt-2">
              Secure payment link for your customers
            </DialogDescription>
          </DialogHeader>
          <PaymentLinkForm onLinkGenerated={handleLinkGenerated} />
        </DialogContent>
      </Dialog>

      {/* Main Card */}
      <div className="grid grid-cols-1 gap-6">
        <Card className="overflow-hidden">
          <CardHeader className="overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 w-full">
              {/* Left side - Filters */}
              <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
                <Select value={chainFilter} onValueChange={setChainFilter}>
                  <SelectTrigger className="w-full sm:w-40 rounded-full bg-[#EEEEEE] dark:bg-[#262626] border text-gray-900 dark:text-[#F6F7F9] hover:border-[#757575] transition-all duration-[900ms]">
                    <SelectValue placeholder="All Chains">
                      <div className="flex items-center gap-2">
                        {chainFilter !== 'all' && getChainIcon(chainFilter)}
                        <span>{chainFilter === 'all' ? 'All Chains' : chainFilter.charAt(0).toUpperCase() + chainFilter.slice(1)}</span>
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
                        {getChainIcon('ethereum')}
                        <span>Ethereum</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="polygon">
                      <div className="flex items-center gap-2">
                        {getChainIcon('polygon')}
                        <span>Polygon</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="arbitrum">
                      <div className="flex items-center gap-2">
                        {getChainIcon('arbitrum')}
                        <span>Arbitrum</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="optimism">
                      <div className="flex items-center gap-2">
                        {getChainIcon('optimism')}
                        <span>Optimism</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="base">
                      <div className="flex items-center gap-2">
                        {getChainIcon('base')}
                        <span>Base</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Select value={currencyFilter} onValueChange={setCurrencyFilter}>
                  <SelectTrigger className="w-full sm:w-40 rounded-full bg-[#EEEEEE] dark:bg-[#262626] border text-gray-900 dark:text-[#F6F7F9] hover:border-[#757575] transition-all duration-[900ms]">
                    <SelectValue placeholder="All Currencies">
                      <div className="flex items-center gap-2">
                        {currencyFilter !== 'all' && getCurrencyIcon(currencyFilter)}
                        <span>{currencyFilter === 'all' ? 'All Currencies' : currencyFilter}</span>
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
                        {getCurrencyIcon('USDC')}
                        <span>USDC</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="USDT">
                      <div className="flex items-center gap-2">
                        {getCurrencyIcon('USDT')}
                        <span>USDT</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="EURC">
                      <div className="flex items-center gap-2">
                        {getCurrencyIcon('EURC')}
                        <span>EURC</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Right side - Search */}
              <div className="relative w-full md:w-64 lg:w-72 md:flex-shrink-0 min-w-0">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-[#798A9B] w-4 h-4 pointer-events-none" />
                <Input
                  placeholder="Search payment links..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 w-full rounded-full bg-[#EEEEEE] dark:bg-[#262626] border text-gray-900 dark:text-[#F6F7F9] placeholder:text-gray-500 dark:placeholder:text-[#798A9B] focus:border-[#07D7FF] focus:ring-[#07D7FF]/20 transition-all duration-[900ms]"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={paymentLinksTab} onValueChange={setPaymentLinksTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="manual">Manual</TabsTrigger>
                <TabsTrigger value="api">API</TabsTrigger>
              </TabsList>

              {/* All Tab */}
              <TabsContent value="all" className="space-y-4 mt-4">
                {getFilteredLinks().map((link) => (
                  <div key={link.id} className="bg-white dark:bg-[#303030] border border-gray-200 dark:border-[#43586C] rounded-3xl p-4 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-950 flex items-center justify-center flex-shrink-0">
                            <LinkIcon className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-gray-900 dark:text-white truncate">{link.description || 'Payment Link'}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 font-mono truncate">{link.linkId}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap justify-end flex-shrink-0">
                        <Badge
                          variant={link.status === 'active' ? 'default' : link.status === 'completed' ? 'default' : 'secondary'}
                          className={`rounded-full whitespace-nowrap ${
                            link.status === 'completed' 
                              ? 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400' 
                              : link.status === 'active'
                              ? 'bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
                          }`}
                        >
                          {link.status}
                        </Badge>
                        <Badge variant="outline" className="rounded-full whitespace-nowrap">
                          {link.source}
                        </Badge>
                        {link.expiryDate && (
                          <Badge className="rounded-full whitespace-nowrap bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800">
                            <Clock className="w-3 h-3 mr-1" />
                            Expires: {new Date(link.expiryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Price</p>
                        <p className="text-gray-900 dark:text-white">${link.price}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Chain</p>
                        <div className="flex items-center gap-1.5">
                          {getChainIcon(link.chain)}
                          <p className="text-gray-900 dark:text-white capitalize">{link.chain || 'N/A'}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Currency</p>
                        <div className="flex items-center gap-1.5">
                          {getCurrencyIcon(link.currency)}
                          <p className="text-gray-900 dark:text-white">{link.currency || 'N/A'}</p>
                        </div>
                      </div>
                    </div>

                    {link.txHash && (
                      <div className="mb-3">
                        <a
                          href={getExplorerUrl(link.chain, link.txHash)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[#07D7FF] hover:text-[#07D7FF] hover:underline flex items-center gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span className="font-mono">txHash: {link.txHash.slice(0, 10)}...{link.txHash.slice(-8)}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}

                    <div className="flex items-center justify-end space-x-2 pt-2 border-t border-gray-200 dark:border-gray-800">
                      {link.status === 'active' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => { e.stopPropagation(); onViewLink(link); }}
                          className="text-[#07D7FF] hover:text-[#07D7FF] hover:border-[#07D7FF] rounded-full"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => { e.stopPropagation(); onCopyLink(link.id); }}
                        className="rounded-full"
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => { e.stopPropagation(); onDeleteLink(link.id); }}
                        className="text-[#DD6B6B] hover:text-white hover:bg-[#DD6B6B] hover:border-[#DD6B6B] rounded-full transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {getFilteredLinks().length === 0 && (
                  <p className="text-muted-foreground text-center py-8">
                    No payment links found
                  </p>
                )}
              </TabsContent>

              {/* Manual Tab */}
              <TabsContent value="manual" className="space-y-4 mt-4">
                {getFilteredLinks('manual').map((link) => (
                  <div key={link.id} className="bg-white dark:bg-[#303030] border border-gray-200 dark:border-[#43586C] rounded-3xl p-4 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-950 flex items-center justify-center flex-shrink-0">
                            <LinkIcon className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-gray-900 dark:text-white truncate">{link.description || 'Payment Link'}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 font-mono truncate">{link.linkId}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap justify-end flex-shrink-0">
                        <Badge
                          variant={link.status === 'active' ? 'default' : link.status === 'completed' ? 'default' : 'secondary'}
                          className={`rounded-full whitespace-nowrap ${
                            link.status === 'completed' 
                              ? 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400' 
                              : link.status === 'active'
                              ? 'bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
                          }`}
                        >
                          {link.status}
                        </Badge>
                        <Badge variant="outline" className="rounded-full whitespace-nowrap">
                          {link.source}
                        </Badge>
                        {link.expiryDate && (
                          <Badge className="rounded-full whitespace-nowrap bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800">
                            <Clock className="w-3 h-3 mr-1" />
                            Expires: {new Date(link.expiryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Price</p>
                        <p className="text-gray-900 dark:text-white">${link.price}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Chain</p>
                        <div className="flex items-center gap-1.5">
                          {getChainIcon(link.chain)}
                          <p className="text-gray-900 dark:text-white capitalize">{link.chain || 'N/A'}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Currency</p>
                        <div className="flex items-center gap-1.5">
                          {getCurrencyIcon(link.currency)}
                          <p className="text-gray-900 dark:text-white">{link.currency || 'N/A'}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Clicks</p>
                        <p className="text-gray-900 dark:text-white">{link.clicks}</p>
                      </div>
                    </div>

                    {link.txHash && (
                      <div className="mb-3">
                        <a
                          href={getExplorerUrl(link.chain, link.txHash)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[#07D7FF] hover:text-[#07D7FF] hover:underline flex items-center gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span className="font-mono">txHash: {link.txHash.slice(0, 10)}...{link.txHash.slice(-8)}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}

                    <div className="flex items-center justify-end space-x-2 pt-2 border-t border-gray-200 dark:border-gray-800">
                      {link.status === 'active' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => { e.stopPropagation(); onViewLink(link); }}
                          className="text-[#07D7FF] hover:text-[#07D7FF] hover:border-[#07D7FF] rounded-full"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => { e.stopPropagation(); onCopyLink(link.id); }}
                        className="rounded-full"
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => { e.stopPropagation(); onDeleteLink(link.id); }}
                        className="text-[#DD6B6B] hover:text-white hover:bg-[#DD6B6B] hover:border-[#DD6B6B] rounded-full transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {getFilteredLinks('manual').length === 0 && (
                  <p className="text-muted-foreground text-center py-8">
                    No manual payment links found
                  </p>
                )}
              </TabsContent>

              {/* API Tab */}
              <TabsContent value="api" className="space-y-4 mt-4">
                {getFilteredLinks('api').map((link) => (
                  <div key={link.id} className="bg-white dark:bg-[#303030] border border-gray-200 dark:border-[#43586C] rounded-3xl p-4 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-950 flex items-center justify-center flex-shrink-0">
                            <LinkIcon className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-gray-900 dark:text-white truncate">{link.description || 'Payment Link'}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 font-mono truncate">{link.linkId}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap justify-end flex-shrink-0">
                        <Badge
                          variant={link.status === 'active' ? 'default' : link.status === 'completed' ? 'default' : 'secondary'}
                          className={`rounded-full whitespace-nowrap ${
                            link.status === 'completed' 
                              ? 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400' 
                              : link.status === 'active'
                              ? 'bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
                          }`}
                        >
                          {link.status}
                        </Badge>
                        <Badge variant="outline" className="rounded-full whitespace-nowrap">
                          {link.source}
                        </Badge>
                        {link.expiryDate && (
                          <Badge className="rounded-full whitespace-nowrap bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800">
                            <Clock className="w-3 h-3 mr-1" />
                            Expires: {new Date(link.expiryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Price</p>
                        <p className="text-gray-900 dark:text-white">${link.price}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Chain</p>
                        <div className="flex items-center gap-1.5">
                          {getChainIcon(link.chain)}
                          <p className="text-gray-900 dark:text-white capitalize">{link.chain || 'N/A'}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Currency</p>
                        <div className="flex items-center gap-1.5">
                          {getCurrencyIcon(link.currency)}
                          <p className="text-gray-900 dark:text-white">{link.currency || 'N/A'}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Clicks</p>
                        <p className="text-gray-900 dark:text-white">{link.clicks}</p>
                      </div>
                    </div>

                    {link.txHash && (
                      <div className="mb-3">
                        <a
                          href={getExplorerUrl(link.chain, link.txHash)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[#07D7FF] hover:text-[#07D7FF] hover:underline flex items-center gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span className="font-mono">txHash: {link.txHash.slice(0, 10)}...{link.txHash.slice(-8)}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}

                    <div className="flex items-center justify-end space-x-2 pt-2 border-t border-gray-200 dark:border-gray-800">
                      {link.status === 'active' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => { e.stopPropagation(); onViewLink(link); }}
                          className="text-[#07D7FF] hover:text-[#07D7FF] hover:border-[#07D7FF] rounded-full"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => { e.stopPropagation(); onCopyLink(link.id); }}
                        className="rounded-full"
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => { e.stopPropagation(); onDeleteLink(link.id); }}
                        className="text-[#DD6B6B] hover:text-white hover:bg-[#DD6B6B] hover:border-[#DD6B6B] rounded-full transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {getFilteredLinks('api').length === 0 && (
                  <p className="text-muted-foreground text-center py-8">
                    No API payment links found
                  </p>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* ========================================
          MD3 MOBILE FAB (Bottom-Right)
          
          Position: fixed bottom-24 right-6 (96px from bottom, 24px from right)
          Note: bottom-24 positions FAB above 80px bottom nav with 16px spacing
          Size: w-14 h-14 (56px × 56px - MD3 standard)
          Color: #07D7FF (PYMSTR secondary/cyan)
          Icon: w-6 h-6 (24px)
          Elevation: shadow-lg (Level 3)
          Hidden on desktop: md:hidden
          Opens Generate Payment Link dialog
          ======================================== */}
      <button
        onClick={() => setShowPaymentLinkDialog(true)}
        aria-label="Create payment link"
        className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-[#1E88E5] text-white shadow-lg hover:bg-[#1565C0] hover:shadow-xl hover:scale-105 active:scale-95 focus:ring-2 focus:ring-[#1E88E5] focus:ring-offset-2 focus:outline-none transition-all duration-200 flex items-center justify-center md:hidden"
      >
        <Plus className="w-6 h-6" />
      </button>
        </div>
      </PageLayout.Content>
    </PageLayout>
  );
};

export default PaymentLinksDashboard;
