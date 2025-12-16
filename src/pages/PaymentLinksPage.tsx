import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  ExternalLink,
  Share2,
  Link as LinkIcon,
  Clock,
  Check,
  Search,
} from "lucide-react";
import { formatPrice } from "../utils/currency";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import PaymentLinkForm from "../components/PaymentLinkForm";
import { toast } from "sonner@2.0.3";
import PageLayout from "../components/PageLayout";
import { ChainIcon } from "../components/ChainIcon";
import { CryptoIcon } from "../components/CryptoIcon";
import SearchField from "../components/SearchField";
import RefreshButton from "../components/RefreshButton";

interface PaymentLinksPageProps {
  paymentLinks: any[];
  onDeleteLink: (id: string) => void;
  onCopyLink: (id: string) => void;
  onViewLink: (link: any) => void;
  showPaymentLinkDialog: boolean;
  setShowPaymentLinkDialog: (show: boolean) => void;
  onLinkGenerated: (newLink: any) => void;
}

export default function PaymentLinksPage({
  paymentLinks,
  onDeleteLink,
  onCopyLink,
  onViewLink,
  showPaymentLinkDialog,
  setShowPaymentLinkDialog,
  onLinkGenerated,
}: PaymentLinksPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearchQuery, setActiveSearchQuery] = useState("");
  const [currencyFilter, setCurrencyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentLinksTab, setPaymentLinksTab] = useState("all");
  const [sharedLinkId, setSharedLinkId] = useState<string | null>(null);

  // Check URL parameters on mount to auto-open create dialog
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes('create=true')) {
      setShowPaymentLinkDialog(true);
      // Clean up the URL parameter
      window.history.replaceState(null, '', window.location.pathname + '#/links');
    }
  }, [setShowPaymentLinkDialog]);

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

  // Handle refresh button click
  const handleRefresh = () => {
    // Reset all filters and search to initial state
    setPaymentLinksTab('all');
    setCurrencyFilter('all');
    setStatusFilter('all');
    setSearchQuery('');
    setActiveSearchQuery('');
    console.log('Payment links refreshed - filters and search cleared');
  };

  // Handle share button click
  const handleShare = (linkId: string) => {
    const link = paymentLinks.find(l => l.id === linkId);
    const url = `${window.location.origin}/#/pay/${linkId}`;
    
    // Check if Web Share API is available and we're in a secure context
    if (navigator.share && window.isSecureContext) {
      // Use Web Share API (mobile native share dialog)
      navigator.share({
        title: link?.description || 'Payment Link',
        text: `Pay ${formatPrice(link?.price || 0, link?.baseCurrency)} via PYMSTR`,
        url: url,
      })
      .then(() => {
        // Success - don't show checkmark, native dialog is the feedback
        toast('Payment link shared!');
      })
      .catch((err) => {
        // User cancelled or share failed - fall back to clipboard
        if (err.name !== 'AbortError') {
          // Only copy to clipboard if it wasn't user cancellation
          onCopyLink(linkId);
          // Show green checkmark for clipboard fallback
          setSharedLinkId(linkId);
          setTimeout(() => setSharedLinkId(null), 2000);
        }
      });
    } else {
      // Fallback: Copy to clipboard (desktop or non-secure context)
      onCopyLink(linkId);
      // Show green checkmark for clipboard copy
      setSharedLinkId(linkId);
      setTimeout(() => setSharedLinkId(null), 2000);
    }
  };

  // Filter function
  const getFilteredLinks = (source?: "manual" | "api") => {
    return paymentLinks.filter((link) => {
      const matchesCurrency =
        currencyFilter === "all" || link.currency === currencyFilter;
      const matchesStatus =
        statusFilter === "all" || link.status === statusFilter;
      const matchesSearch =
        link.description?.toLowerCase().includes(activeSearchQuery.toLowerCase()) ||
        link.price?.toString().includes(activeSearchQuery) ||
        link.linkId?.toLowerCase().includes(activeSearchQuery.toLowerCase());
      const matchesSource = !source || link.source === source;

      return matchesCurrency && matchesStatus && matchesSearch && matchesSource;
    });
  };

  // Helper function to get block explorer URL
  const getExplorerUrl = (chain: string, txHash: string) => {
    const explorers: Record<string, string> = {
      ethereum: "https://etherscan.io/tx/",
      polygon: "https://polygonscan.com/tx/",
      arbitrum: "https://arbiscan.io/tx/",
      optimism: "https://optimistic.etherscan.io/tx/",
      base: "https://basescan.org/tx/",
    };
    return explorers[chain] + txHash;
  };

  return (
    <PageLayout>
      <PageLayout.Header
        icon={<LinkIcon className="w-6 h-6 text-[#FF5914]" />}
        title="Payment Links"
        subtitle="Single-Use Payment Links"
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

          <Dialog
            open={showPaymentLinkDialog}
            onOpenChange={setShowPaymentLinkDialog}
          >
            <DialogContent
              className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#303030] shadow-xl p-8"
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <DialogHeader className="mb-6">
                <DialogTitle className="text-2xl">
                  Generate Payment Link
                </DialogTitle>
                <DialogDescription className="text-base mt-2">
                  Secure payment link for your customers
                </DialogDescription>
              </DialogHeader>
              <PaymentLinkForm 
                onLinkGenerated={onLinkGenerated}
                onCancel={() => setShowPaymentLinkDialog(false)}
              />
            </DialogContent>
          </Dialog>

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
              {/* Coin Filter */}
              <Select
                value={currencyFilter}
                onValueChange={setCurrencyFilter}
              >
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Stablecoin">
                    <div className="flex items-center gap-2">
                      {currencyFilter !== "all" && (
                        <CryptoIcon
                          symbol={currencyFilter}
                          size={16}
                        />
                      )}
                      <span>
                        {currencyFilter === "all"
                          ? "Stablecoin"
                          : currencyFilter}
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

              {/* Status Filter */}
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Status">
                    <div className="flex items-center gap-2">
                      {statusFilter !== "all" && (
                        <Badge
                          variant={
                            statusFilter === "active"
                              ? "default"
                              : statusFilter === "completed"
                                ? "default"
                                : "secondary"
                          }
                          className={`rounded-full whitespace-nowrap ${
                            statusFilter === "completed"
                              ? "bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400"
                              : statusFilter === "active"
                                ? "bg-[#D4EDDA] text-[#155724] dark:bg-[#032e15] dark:text-[#05df72]"
                                : "bg-[#43586C]/20 text-[#798A9B]"
                          }`}
                        >
                          {statusFilter}
                        </Badge>
                      )}
                      {statusFilter === "all" && (
                        <span>Status</span>
                      )}
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    <div className="flex items-center gap-2">
                      <span>Status</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="active">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="default"
                        className="rounded-full whitespace-nowrap bg-[#D4EDDA] text-[#155724] dark:bg-[#032e15] dark:text-[#05df72]"
                      >
                        Active
                      </Badge>
                    </div>
                  </SelectItem>
                  <SelectItem value="completed">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="default"
                        className="rounded-full whitespace-nowrap bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400"
                      >
                        Completed
                      </Badge>
                    </div>
                  </SelectItem>
                  <SelectItem value="inactive">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="rounded-full whitespace-nowrap bg-[#43586C]/20 text-[#798A9B]"
                      >
                        Inactive
                      </Badge>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Search + Refresh Row (Mobile: same line, Desktop: integrated) */}
              <div className="flex items-center gap-3 flex-1">
                {/* Search Field */}
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
          CONTENT CARD (Pure Data Display - No Controls)
          ======================================== */}
          <div className="grid grid-cols-1 gap-6">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <Tabs
                  value={paymentLinksTab}
                  onValueChange={setPaymentLinksTab}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-3 mx-4 md:mx-6 mt-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="manual">Manual</TabsTrigger>
                    <TabsTrigger value="api">API</TabsTrigger>
                  </TabsList>

                  {/* All Tab */}
                  <TabsContent value="all" className="space-y-6 mt-4 px-4 pb-4 md:px-6 md:pb-6">
                    {getFilteredLinks().map((link) => (
                      <div
                        key={link.id}
                        className="bg-white dark:bg-[#303030] border border-gray-200 dark:border-[#43586C] rounded-3xl p-4 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors cursor-pointer"
                      >
                        {/* Badges Row - FIRST (TOP) */}
                        <div className="flex items-center gap-2 flex-wrap mb-3">
                          <Badge
                            variant={
                              link.status === "active"
                                ? "default"
                                : link.status === "completed"
                                  ? "default"
                                  : "secondary"
                            }
                            className={`rounded-full whitespace-nowrap ${
                              link.status === "completed"
                                ? "bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400"
                                : link.status === "active"
                                  ? "bg-[#D4EDDA] text-[#155724] dark:bg-[#032e15] dark:text-[#05df72]"
                                  : "bg-[#43586C]/20 text-[#798A9B]"
                            }`}
                          >
                            {link.status}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="rounded-full whitespace-nowrap"
                          >
                            {link.source}
                          </Badge>
                          
                          {/* Chains pills - mobile inline, desktop separate */}
                          {link.availableChains && link.availableChains.length > 0 && (
                            <>
                              {link.availableChains.map((chain: string) => (
                                <div key={chain} className="flex md:hidden items-center gap-1 bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-full px-2 py-1 border border-[#43586C]">
                                  <ChainIcon chain={chain} size={14} />
                                  <span className="text-xs text-gray-900 dark:text-white capitalize">
                                    {chain}
                                  </span>
                                </div>
                              ))}
                            </>
                          )}
                          
                          {/* Currencies pills - mobile inline, desktop separate */}
                          {link.availableCurrencies && link.availableCurrencies.length > 0 && (
                            <>
                              {link.availableCurrencies.map((currency: string) => (
                                <div key={currency} className="flex md:hidden items-center gap-1 bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-full px-2 py-1 border border-[#43586C]">
                                  <CryptoIcon symbol={currency} size={14} />
                                  <span className="text-xs text-gray-900 dark:text-white">
                                    {currency}
                                  </span>
                                </div>
                              ))}
                            </>
                          )}
                          
                          {link.expiryDate && (
                            <Badge className="rounded-full whitespace-nowrap bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800">
                              <Clock className="w-3 h-3 mr-1" />
                              Expires:{" "}
                              {new Date(link.expiryDate).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )}
                            </Badge>
                          )}
                        </div>

                        {/* Title Row with Icon */}
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-950 flex items-center justify-center flex-shrink-0">
                            <LinkIcon className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-gray-900 dark:text-white truncate">
                              {link.description || "Payment Link"}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 font-mono truncate">
                              {link.linkId}
                            </p>
                          </div>
                        </div>

                        {/* Desktop: Grid with Price, Chains, Currencies */}
                        <div className="hidden md:grid grid-cols-3 gap-4 text-sm mb-3">
                          <div>
                            <p className="text-gray-600 dark:text-gray-400 mb-1.5">
                              Price
                            </p>
                            <p className="text-gray-900 dark:text-white">
                              {formatPrice(link.price, link.baseCurrency)}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-gray-400 mb-1.5">
                              Chain
                            </p>
                            <div className="flex flex-wrap items-center gap-1.5">
                              {link.availableChains && link.availableChains.length > 0 ? (
                                link.availableChains.map((chain: string) => (
                                  <div key={chain} className="flex items-center gap-1 bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-full px-2 py-1 border border-[#43586C]">
                                    <ChainIcon chain={chain} size={14} />
                                    <span className="text-xs text-gray-900 dark:text-white capitalize">
                                      {chain}
                                    </span>
                                  </div>
                                ))
                              ) : (
                                <div className="flex items-center gap-1.5">
                                  <ChainIcon chain={link.chain} size={16} />
                                  <p className="text-gray-900 dark:text-white capitalize">
                                    {link.chain || "N/A"}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-gray-400 mb-1.5">
                              Stablecoin
                            </p>
                            <div className="flex flex-wrap items-center gap-1.5">
                              {link.availableCurrencies && link.availableCurrencies.length > 0 ? (
                                link.availableCurrencies.map((currency: string) => (
                                  <div key={currency} className="flex items-center gap-1 bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-full px-2 py-1 border border-[#43586C]">
                                    <CryptoIcon symbol={currency} size={14} />
                                    <span className="text-xs text-gray-900 dark:text-white">
                                      {currency}
                                    </span>
                                  </div>
                                ))
                              ) : (
                                <div className="flex items-center gap-1.5">
                                  <CryptoIcon symbol={link.currency} size={16} />
                                  <p className="text-gray-900 dark:text-white">
                                    {link.currency || "N/A"}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {/* Mobile: Only Price */}
                        <div className="md:hidden mb-3">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Price: <span className="text-gray-900 dark:text-white font-medium">
                              {formatPrice(link.price, link.baseCurrency)}
                            </span>
                          </p>
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
                              <span className="font-mono">
                                txHash: {link.txHash.slice(0, 10)}...
                                {link.txHash.slice(-8)}
                              </span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}

                        <div className="flex items-center justify-end space-x-2 pt-2 border-t border-gray-200 dark:border-gray-800">
                          {link.status === "active" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                onViewLink(link);
                              }}
                              className="text-[#07D7FF] hover:text-[#07D7FF] hover:border-[#07D7FF] rounded-full"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShare(link.id);
                            }}
                            className="rounded-full"
                          >
                            {sharedLinkId === link.id ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <Share2 className="w-4 h-4" />
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteLink(link.id);
                            }}
                            className="text-[#FF5914] hover:text-white hover:bg-[#FF5914] hover:border-[#FF5914] rounded-full transition-all duration-200"
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
                  <TabsContent value="manual" className="space-y-6 mt-4 px-4 pb-4 md:px-6 md:pb-6">
                    {getFilteredLinks("manual").map((link) => (
                      <div
                        key={link.id}
                        className="bg-white dark:bg-[#303030] border border-gray-200 dark:border-[#43586C] rounded-3xl p-4 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors cursor-pointer"
                      >
                        {/* Title Row with Icon */}
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-950 flex items-center justify-center flex-shrink-0">
                            <LinkIcon className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-gray-900 dark:text-white truncate">
                              {link.description || "Payment Link"}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 font-mono truncate">
                              {link.linkId}
                            </p>
                          </div>
                        </div>

                        {/* Badges Row - Full Width */}
                        <div className="flex items-center gap-2 flex-wrap mb-3">
                          <Badge
                            variant={
                              link.status === "active"
                                ? "default"
                                : link.status === "completed"
                                  ? "default"
                                  : "secondary"
                            }
                            className={`rounded-full whitespace-nowrap ${
                              link.status === "completed"
                                ? "bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400"
                                : link.status === "active"
                                  ? "bg-[#D4EDDA] text-[#155724] dark:bg-[#032e15] dark:text-[#05df72]"
                                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400"
                            }`}
                          >
                            {link.status}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="rounded-full whitespace-nowrap"
                          >
                            {link.source}
                          </Badge>
                          {link.expiryDate && (
                            <Badge className="rounded-full whitespace-nowrap bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800">
                              <Clock className="w-3 h-3 mr-1" />
                              Expires:{" "}
                              {new Date(link.expiryDate).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )}
                            </Badge>
                          )}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">
                              Price
                            </p>
                            <p className="text-gray-900 dark:text-white">
                              {formatPrice(link.price, link.baseCurrency)}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">
                              Chain
                            </p>
                            <div className="flex items-center gap-1.5">
                              <ChainIcon chain={link.chain} size={16} />
                              <p className="text-gray-900 dark:text-white capitalize">
                                {link.chain || "N/A"}
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">
                              Currency
                            </p>
                            <div className="flex items-center gap-1.5">
                              <CryptoIcon symbol={link.currency} size={16} />
                              <p className="text-gray-900 dark:text-white">
                                {link.currency || "N/A"}
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">
                              Conversions
                            </p>
                            <p className="text-gray-900 dark:text-white">
                              {link.conversions || 0}
                            </p>
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
                              <span className="font-mono">
                                txHash: {link.txHash.slice(0, 10)}...
                                {link.txHash.slice(-8)}
                              </span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}

                        <div className="flex items-center justify-end space-x-2 pt-2 border-t border-gray-200 dark:border-gray-800">
                          {link.status === "active" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                onViewLink(link);
                              }}
                              className="text-[#07D7FF] hover:text-[#07D7FF] hover:border-[#07D7FF] rounded-full"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShare(link.id);
                            }}
                            className="rounded-full"
                          >
                            {sharedLinkId === link.id ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <Share2 className="w-4 h-4" />
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteLink(link.id);
                            }}
                            className="text-[#FF5914] hover:text-white hover:bg-[#FF5914] hover:border-[#FF5914] rounded-full transition-all duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {getFilteredLinks("manual").length === 0 && (
                      <p className="text-muted-foreground text-center py-8">
                        No manual payment links found
                      </p>
                    )}
                  </TabsContent>

                  {/* API Tab */}
                  <TabsContent value="api" className="space-y-6 mt-4 px-4 pb-4 md:px-6 md:pb-6">
                    {getFilteredLinks("api").map((link) => (
                      <div
                        key={link.id}
                        className="bg-white dark:bg-[#303030] border border-gray-200 dark:border-[#43586C] rounded-3xl p-4 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors cursor-pointer"
                      >
                        {/* Title Row with Icon */}
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-950 flex items-center justify-center flex-shrink-0">
                            <LinkIcon className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-gray-900 dark:text-white truncate">
                              {link.description || "Payment Link"}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 font-mono truncate">
                              {link.linkId}
                            </p>
                          </div>
                        </div>

                        {/* Badges Row - Full Width */}
                        <div className="flex items-center gap-2 flex-wrap mb-3">
                          <Badge
                            variant={
                              link.status === "active"
                                ? "default"
                                : link.status === "completed"
                                  ? "default"
                                  : "secondary"
                            }
                            className={`rounded-full whitespace-nowrap ${
                              link.status === "completed"
                                ? "bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400"
                                : link.status === "active"
                                  ? "bg-[#D4EDDA] text-[#155724] dark:bg-[#032e15] dark:text-[#05df72]"
                                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400"
                            }`}
                          >
                            {link.status}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="rounded-full whitespace-nowrap"
                          >
                            {link.source}
                          </Badge>
                          {link.expiryDate && (
                            <Badge className="rounded-full whitespace-nowrap bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800">
                              <Clock className="w-3 h-3 mr-1" />
                              Expires:{" "}
                              {new Date(link.expiryDate).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )}
                            </Badge>
                          )}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">
                              Price
                            </p>
                            <p className="text-gray-900 dark:text-white">
                              {formatPrice(link.price, link.baseCurrency)}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">
                              Chain
                            </p>
                            <div className="flex items-center gap-1.5">
                              <ChainIcon chain={link.chain} size={16} />
                              <p className="text-gray-900 dark:text-white capitalize">
                                {link.chain || "N/A"}
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">
                              Currency
                            </p>
                            <div className="flex items-center gap-1.5">
                              <CryptoIcon symbol={link.currency} size={16} />
                              <p className="text-gray-900 dark:text-white">
                                {link.currency || "N/A"}
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">
                              Conversions
                            </p>
                            <p className="text-gray-900 dark:text-white">
                              {link.conversions || 0}
                            </p>
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
                              <span className="font-mono">
                                txHash: {link.txHash.slice(0, 10)}...
                                {link.txHash.slice(-8)}
                              </span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}

                        <div className="flex items-center justify-end space-x-2 pt-2 border-t border-gray-200 dark:border-gray-800">
                          {link.status === "active" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                onViewLink(link);
                              }}
                              className="text-[#07D7FF] hover:text-[#07D7FF] hover:border-[#07D7FF] rounded-full"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShare(link.id);
                            }}
                            className="rounded-full"
                          >
                            {sharedLinkId === link.id ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <Share2 className="w-4 h-4" />
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteLink(link.id);
                            }}
                            className="text-[#FF5914] hover:text-white hover:bg-[#FF5914] hover:border-[#FF5914] rounded-full transition-all duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {getFilteredLinks("api").length === 0 && (
                      <p className="text-muted-foreground text-center py-8">
                        No API-generated payment links found
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
          Color: #1E88E5 (PYMSTR primary blue)
          Icon: w-6 h-6 (24px)
          Elevation: shadow-lg (Level 3)
          Hidden on desktop: md:hidden
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
}