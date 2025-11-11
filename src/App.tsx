import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import { QRCodeCanvas } from "qrcode.react";
import ethLogo from 'figma:asset/3f415cd75e8a755a032ae16a3406c41dcc2d667a.png';
import polygonLogo from 'figma:asset/2a58e7908e32b2fe463112041ba6e2714512185b.png';
import arbitrumLogo from 'figma:asset/f48bde656d2828d3f1e6a10c15f97b6bf98615d5.png';
import optimismLogo from 'figma:asset/4f26997c993e11669528832115692d8c0b95f2e0.png';
import baseLogo from 'figma:asset/5849f744e6f7cf933d5afd306639724467364170.png';
import profileImage from 'figma:asset/e3fc757146327315a7b55582ead18e6a5cc6abac.png';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Switch } from "./components/ui/switch";
import { Separator } from "./components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./components/ui/avatar";
import {
  AlertCircle,
  Copy,
  Share2,
  DollarSign,
  Users,
  Activity,
  TrendingUp,
  Wallet,
  Shield,
  ShieldCheck,
  Link,
  CheckCircle,
  ExternalLink,
  Mail,
  Chrome,
  Github,
  Twitter,
  Trash2,
  Pause,
  Play,
  Search,
  Menu,
  X,
  QrCode,
  CreditCard,
  ArrowLeft,
  Plus,
  Clock,
  Edit,
  Send,
  Download,
  UserPlus,
  Settings,
  Bell,
  Eye,
  UserCheck,
  UserX,
  Moon,
  Sun,
  ChevronRight,
  ChevronDown,
  User,
  HelpCircle,
  LogOut,
  FileText,
  Key,
  RefreshCw,
  Globe,
  Lock,
  BarChart3,
  Code,
  UsersRound,
  BookOpen,
  Save,
  Webhook,
} from "lucide-react";
import { Alert, AlertDescription } from "./components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts@2.15.2";
import { toast } from "sonner@2.0.3";
import { Toaster } from "./components/ui/sonner";
import pymstrLogo from "figma:asset/2e391478b449791c8f126ecd84534c5f6aa0d119.png";
import pymstrLogoLight from "figma:asset/4e163cf0c00ccf30776cc3f1126851cb41023ed0.png";
import usdcLogo from "figma:asset/b8084771bd1f1bf87626c826ff2fac011f016ed9.png";
import usdtLogo from "figma:asset/90dac8c11ffff8e0b345d11a55049c088eff2165.png";
import eurcLogo from "figma:asset/d915232b9755e23483dcfab1a692cf654672354f.png";
import PaymentLinkForm from "./components/PaymentLinkForm";
import APIKeyManagement from "./components/APIKeyManagement";
import { WebhookManagement } from "./components/WebhookManagement";
import QuickStartGuide from "./components/QuickStartGuide";
import APIReference from "./components/APIReference";
import CodeExamples from "./components/CodeExamples";
import MerchantSettings from "./components/MerchantSettings";
import MerchantProfile from "./components/MerchantProfile";
import SecuritySettings from "./components/SecuritySettings";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import QuickStartPage from "./pages/QuickStartPage";
import APIReferencePage from "./pages/APIReferencePage";
import CodeExamplesPage from "./pages/CodeExamplesPage";
import DocumentsPage from "./pages/DocumentsPage";
import { BottomNavigation } from "./components/BottomNavigation";
import { NavigationRail } from "./components/NavigationRail";
import PaymentLinksDashboard from "./components/PaymentLinksDashboard";
import PageLayout from "./components/PageLayout";
import { WalletMainActionButton } from "./components/WalletMainActionButton";
import { NetworkSelector, type NetworkOption } from "./components/NetworkSelector";
import { CryptoSelector, type CryptoOption, type CryptoSelectorOption } from "./components/CryptoSelector";
import {
  INITIAL_PAYMENT_LINKS,
  INITIAL_WALLETS,
  INITIAL_TEAM_MEMBERS,
  INITIAL_API_KEYS,
  DASHBOARD_STATS,
  RECENT_TRANSACTIONS,
  CHART_DATA,
  INITIAL_MERCHANT_CONFIG,
  INITIAL_NEW_MEMBER,
  INITIAL_NEW_API_KEY,
} from "./constants/mockData";
import {
  getExplorerUrl,
  getChainName,
  getOnRamperNetwork,
  getCryptoName,
  copyToClipboard as copyToClipboardUtil,
  getExchangeRate,
  calculateCryptoAmount,
  getWalletBalance,
} from "./utils/helpers";

const App = () => {
  const [activeTab, setActiveTab] = useState("admin");
  const [isStandalonePage, setIsStandalonePage] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showWeb3Auth, setShowWeb3Auth] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState("USDC");
  const [selectedChain, setSelectedChain] = useState("ethereum");
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [showCryptoSelection, setShowCryptoSelection] =
    useState(false);
  const [showFundingOptions, setShowFundingOptions] =
    useState(false);
  const [fundingMethod, setFundingMethod] = useState("");
  const [showFundingSuccess, setShowFundingSuccess] =
    useState(false);
  const [showQRFunding, setShowQRFunding] = useState(false);
  const [qrFundingBalance, setQrFundingBalance] = useState(0);
  const [isCheckingFunds, setIsCheckingFunds] = useState(false);
  const [checkFundsClickCount, setCheckFundsClickCount] = useState(0);
  const [showOnRamper, setShowOnRamper] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userLoginMethod, setUserLoginMethod] = useState("");
  const [paymentLinks, setPaymentLinks] = useState(INITIAL_PAYMENT_LINKS);
  const [paymentLinksTab, setPaymentLinksTab] = useState("all");
  const [chainFilter, setChainFilter] = useState("all");
  const [currencyFilter, setCurrencyFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [reportsSearchQuery, setReportsSearchQuery] = useState("");
  const [currentPayment, setCurrentPayment] = useState(null);
  const [showPaymentLinkDialog, setShowPaymentLinkDialog] = useState(false);
  const [currencyVariant, setCurrencyVariant] = useState<"single" | "multiple">("single"); // For screen #4 simulation
  const paymentLinksRef = useRef(paymentLinks);
  const [isNavRailExpanded, setIsNavRailExpanded] = useState(false);

  // URL hash routing for documentation pages and payment links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const hashLower = hash.toLowerCase();
      
      // Handle payment links first (#/pay/*)
      if (hash.startsWith("#/pay/")) {
        const paymentId = hash.replace("#/pay/", "");
        const payment = paymentLinksRef.current.find((link) => link.id === paymentId);
        
        if (payment && payment.status === "active") {
          setCurrentPayment({
            id: payment.id,
            price: payment.price,
            description: payment.description,
            merchantName: "PYMSTR Merchant",
            availableCurrencies: payment.availableCurrencies || ["USDC", "USDT", "EURC"],
            availableChains: payment.availableChains || ["ethereum", "polygon", "arbitrum", "optimism", "base"],
          });
          setActiveTab("checkout");
          setIsStandalonePage(false);
        } else if (payment && payment.status === "completed") {
          setActiveTab("admin");
          setIsStandalonePage(false);
          toast("This payment link has already been used");
        } else {
          setActiveTab("admin");
          setIsStandalonePage(false);
          toast("Payment link not found or inactive");
        }
        return;
      }
      
      // Handle documentation pages
      if (hashLower.includes('quickstart')) {
        setActiveTab('quickstart');
        setIsStandalonePage(true);
      } else if (hashLower.includes('api-reference') || hashLower.includes('apireference')) {
        setActiveTab('apireference');
        setIsStandalonePage(true);
      } else if (hashLower.includes('code-example')) {
        setActiveTab('codeexamples');
        setIsStandalonePage(true);
      } else if (hash === '#/pay') {
        setActiveTab('checkout');
        setIsStandalonePage(false);
      } else {
        setIsStandalonePage(false);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Wallet states
  const [wallets, setWallets] = useState(INITIAL_WALLETS);
  const [editingWallet, setEditingWallet] = useState(null);
  const [showCreateWallet, setShowCreateWallet] =
    useState(false);
  const [selectedWalletId, setSelectedWalletId] = useState("");
  const [walletAction, setWalletAction] = useState(""); // 'deposit' or 'withdraw'
  const [actionAmount, setActionAmount] = useState("");
  const [actionCrypto, setActionCrypto] = useState("USDC");
  const [actionChain, setActionChain] = useState("ethereum");
  const [sendType, setSendType] = useState(""); // 'internal' or 'external'
  const [externalAddress, setExternalAddress] = useState("");
  const [targetWalletId, setTargetWalletId] = useState("");

  // Team states
  const [teamMembers, setTeamMembers] = useState(INITIAL_TEAM_MEMBERS);
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMember, setNewMember] = useState(INITIAL_NEW_MEMBER);
  const [showDeleteConfirm, setShowDeleteConfirm] =
    useState(false);
  const [memberToDelete, setMemberToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  // API Key states
  const [apiKeys, setApiKeys] = useState(INITIAL_API_KEYS);
  const [showCreateApiKey, setShowCreateApiKey] = useState(false);
  const [selectedApiKey, setSelectedApiKey] = useState<string | null>(null);
  const [newApiKey, setNewApiKey] = useState(INITIAL_NEW_API_KEY);
  const [showApiKeySecret, setShowApiKeySecret] = useState<
    string | null
  >(null);
  const [apiKeyDetailsTab, setApiKeyDetailsTab] =
    useState("info");

  // Copy tooltip state
  const [showCopyTooltip, setShowCopyTooltip] = useState("");

  // Merchant configuration state
  const [merchantConfig, setMerchantConfig] = useState(INITIAL_MERCHANT_CONFIG);

  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("pymstr-dark-mode");
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  // Dark mode toggle function
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);

    // Apply dark class to document root
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Persist preference
    localStorage.setItem(
      "pymstr-dark-mode",
      JSON.stringify(newDarkMode),
    );
  };

  // Logout function
  const handleLogout = () => {
    // Reset all state to initial values
    setActiveTab("admin");
    setShowPaymentForm(false);
    setShowWeb3Auth(false);
    setSelectedCrypto("USDC");
    setSelectedChain("ethereum");
    setPaymentStatus("pending");
    setIsConnecting(false);
    setConnectedWallet("");
    setWalletAddress("");
    setShowCryptoSelection(false);
    setShowFundingOptions(false);
    setFundingMethod("");
    setShowFundingSuccess(false);
    setIsMobileMenuOpen(false);
    setCurrentPayment(null);
    setSearchQuery("");
    setReportsSearchQuery("");
    setPaymentLinksTab("all");

    // Reset wallet states
    setEditingWallet(null);
    setShowCreateWallet(false);
    setSelectedWalletId("");
    setWalletAction("");
    setActionAmount("");
    setActionCrypto("USDC");
    setSendType("");
    setExternalAddress("");
    setTargetWalletId("");

    // Reset team states
    setShowAddMember(false);
    setNewMember({ name: "", email: "", role: "view-only" });
    setShowDeleteConfirm(false);
    setMemberToDelete(null);

    // Reset user login states
    setIsUserLoggedIn(false);
    setUserLoginMethod("");

    // Clear URL hash
    window.location.hash = "";

    toast("Logged out successfully!");
  };

  // Apply dark mode on initial load
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Update ref when paymentLinks changes
  useEffect(() => {
    paymentLinksRef.current = paymentLinks;
  }, [paymentLinks]);



  // Mock data
  const dashboardStats = DASHBOARD_STATS;
  const recentTransactions = RECENT_TRANSACTIONS;
  const chartData = CHART_DATA;

  const CryptoIcon = ({ symbol, size = "w-8 h-8" }: { symbol: string; size?: string }) => {
    const iconProps = { className: size };

    switch (symbol) {
      case "USDC":
        return (
          <img
            {...iconProps}
            src={usdcLogo}
            alt="USDC"
            className={`${size} rounded-full`}
          />
        );
      case "USDT":
        return (
          <img
            {...iconProps}
            src={usdtLogo}
            alt="USDT"
            className={`${size} rounded-full`}
          />
        );
      case "EURC":
        return (
          <img
            {...iconProps}
            src={eurcLogo}
            alt="EURC"
            className={`${size} rounded-full`}
          />
        );
      default:
        return (
          <div
            {...iconProps}
            className={`${size} bg-gray-300 rounded-full`}
          />
        );
    }
  };

  const ChainIcon = ({ chain, size = "w-8 h-8" }: { chain: string; size?: string }) => {
    const chainLowerCase = chain.toLowerCase();

    // Use imported logos
    if (chainLowerCase === 'ethereum') {
      return (
        <div className={`${size} flex items-center justify-center shrink-0`}>
          <img
            src={ethLogo}
            alt="Ethereum"
            className="w-full h-full object-contain"
          />
        </div>
      );
    }

    if (chainLowerCase === 'polygon') {
      return (
        <div className={`${size} flex items-center justify-center shrink-0`}>
          <img
            src={polygonLogo}
            alt="Polygon"
            className="w-full h-full object-contain"
          />
        </div>
      );
    }

    if (chainLowerCase === 'arbitrum') {
      return (
        <div className={`${size} flex items-center justify-center shrink-0`}>
          <img
            src={arbitrumLogo}
            alt="Arbitrum"
            className="w-full h-full object-contain"
          />
        </div>
      );
    }

    if (chainLowerCase === 'optimism') {
      return (
        <div className={`${size} flex items-center justify-center shrink-0`}>
          <img
            src={optimismLogo}
            alt="Optimism"
            className="w-full h-full object-contain"
          />
        </div>
      );
    }

    if (chainLowerCase === 'base') {
      return (
        <div className={`${size} flex items-center justify-center shrink-0`}>
          <img
            src={baseLogo}
            alt="Base"
            className="w-full h-full object-contain"
          />
        </div>
      );
    }

    return (
      <div className={`${size} bg-gray-300 rounded-full`} />
    );
  };

  const supportedCryptos = [
    {
      symbol: "USDC",
      name: "USD Coin",
      logo: <CryptoIcon symbol="USDC" />,
    },
    {
      symbol: "USDT",
      name: "Tether",
      logo: <CryptoIcon symbol="USDT" />,
    },
    {
      symbol: "EURC",
      name: "Euro Coin",
      logo: <CryptoIcon symbol="EURC" />,
    },
  ];

  const supportedChains = [
    {
      id: "ethereum",
      name: "Ethereum",
      icon: <ChainIcon chain="ethereum" size="w-5 h-5" />,
      logo: ethLogo,
    },
    {
      id: "polygon",
      name: "Polygon",
      icon: <ChainIcon chain="polygon" size="w-5 h-5" />,
      logo: polygonLogo,
    },
    {
      id: "arbitrum",
      name: "Arbitrum",
      icon: <ChainIcon chain="arbitrum" size="w-5 h-5" />,
      logo: arbitrumLogo,
    },
    {
      id: "optimism",
      name: "Optimism",
      icon: <ChainIcon chain="optimism" size="w-5 h-5" />,
      logo: optimismLogo,
    },
    {
      id: "base",
      name: "Base",
      icon: <ChainIcon chain="base" size="w-5 h-5" />,
      logo: baseLogo,
    },
  ];

  // Local wrapper for copyToClipboard to pass setShowCopyTooltip
  const copyToClipboard = (text: string, tooltipId?: string) => {
    copyToClipboardUtil(text, tooltipId, setShowCopyTooltip);
  };

  // Check if user has sufficient balance for payment
  const hasSufficientBalance = (crypto: string) => {
    const required = parseFloat(
      calculateCryptoAmount(
        currentPayment?.price || 156.78,
        crypto,
      ),
    );
    const available = getWalletBalance(crypto, selectedChain);
    return available >= required;
  };

  // Merchant config helper functions
  const isTokenChainEnabled = (token: string, chain: string): boolean => {
    const tokenConfig = merchantConfig.acceptedPayments.find((p) => p.token === token);
    return tokenConfig ? tokenConfig.chains.includes(chain.toLowerCase()) : false;
  };

  const getAvailableChainsForToken = (token: string): string[] => {
    const tokenConfig = merchantConfig.acceptedPayments.find((p) => p.token === token);
    return tokenConfig ? tokenConfig.chains : [];
  };

  const getAvailableTokensForChain = (chain: string): string[] => {
    return merchantConfig.acceptedPayments
      .filter((payment) => payment.chains.includes(chain.toLowerCase()))
      .map((payment) => payment.token);
  };

  const handleWalletConnect = (provider: string) => {
    setIsConnecting(true);
    setTimeout(() => {
      setConnectedWallet(provider);
      // Generate a mock wallet address for demo purposes
      const mockAddress = `0x${Math.random().toString(16).slice(2, 10)}${Math.random().toString(16).slice(2, 10)}${Math.random().toString(16).slice(2, 10)}${Math.random().toString(16).slice(2, 10)}`;
      setWalletAddress(mockAddress);
      
      // Set valid defaults based on merchant config
      // Find first enabled token-chain pair
      let validTokenFound = false;
      for (const payment of merchantConfig.acceptedPayments) {
        if (payment.chains.length > 0) {
          setSelectedCrypto(payment.token);
          setSelectedChain(payment.chains[0]);
          validTokenFound = true;
          break;
        }
      }
      
      // If no valid configuration, fall back to defaults
      if (!validTokenFound) {
        setSelectedCrypto("USDC");
        setSelectedChain("ethereum");
      }
      
      setIsConnecting(false);
      setShowWeb3Auth(false);
      setShowCryptoSelection(true);
      toast(`Connected with ${provider}!`);
    }, 2000);
  };

  const handleCheckFunds = () => {
    setIsCheckingFunds(true);
    
    // Increment click counter
    const currentClickCount = checkFundsClickCount;
    setCheckFundsClickCount(currentClickCount + 1);
    
    // Simulate blockchain check (2-3 seconds)
    setTimeout(() => {
      const requiredAmount = parseFloat(calculateCryptoAmount(currentPayment?.price || 156.78, selectedCrypto));
      
      // Alternate scenarios: odd clicks = not arrived, even clicks = arrived
      const fundsArrived = currentClickCount % 2 === 1;
      
      if (fundsArrived || qrFundingBalance >= requiredAmount) {
        // Funds detected - update balance and navigate to next screen
        if (fundsArrived && qrFundingBalance < requiredAmount) {
          setQrFundingBalance(requiredAmount);
        }
        
        setShowQRFunding(false);
        setShowCryptoSelection(false);
        setShowFundingOptions(false);
        setShowPaymentForm(true);
        toast("Wallet funded successfully!");
      } else {
        // Funds not found - show toast
        toast("Funds not arrived, check again in a few seconds");
      }
      
      setIsCheckingFunds(false);
    }, 2500);
  };

  const handlePayment = () => {
    setPaymentStatus("processing");
    setTimeout(() => {
      setPaymentStatus("completed");
      
      // Generate mock txHash
      const mockTxHash = `0x${Math.random().toString(16).slice(2)}${Math.random().toString(16).slice(2)}${Math.random().toString(16).slice(2)}${Math.random().toString(16).slice(2)}`;
      
      // Mark payment link as completed and add txHash
      if (currentPayment?.id) {
        setPaymentLinks((links) =>
          links.map((link) =>
            link.id === currentPayment.id
              ? { ...link, status: "completed", txHash: mockTxHash }
              : link
          )
        );
      }
      
      toast("Payment completed successfully!");
    }, 3000);
  };

  const handleDeleteLink = (linkId: string) => {
    setPaymentLinks((links) =>
      links.filter((link) => link.id !== linkId),
    );
    toast("Payment link deleted successfully!");
  };

  const handleDeactivateLink = (linkId: string) => {
    const link = paymentLinks.find((l) => l.id === linkId);
    const newStatus =
      link?.status === "active" ? "deactivated" : "activated";

    setPaymentLinks((links) =>
      links.map((link) =>
        link.id === linkId
          ? {
              ...link,
              status:
                link.status === "active"
                  ? "inactive"
                  : "active",
            }
          : link,
      ),
    );

    toast(`Payment link ${newStatus} successfully!`);
  };

  const handleLinkGenerated = (newLink: {
    id: string;
    price: number;
    description: string;
    status: "active";
    chain: string;
    currency: string;
  }) => {
    const linkWithSource = { ...newLink, source: "manual" };
    setPaymentLinks((links) => [linkWithSource, ...links]);
    setShowPaymentLinkDialog(false);
  };

  const handlePaymentLinkClick = (link) => {
    // Update URL hash to trigger navigation
    window.location.hash = `#/pay/${link.id}`;
  };

  // Wallet functions
  const handleCreateWallet = (name: string) => {
    const newWallet = {
      id: Date.now().toString(),
      name,
      address: `0x${Math.random().toString(16).substring(2, 42)}`,
      balance: { USDC: 0, USDT: 0, EURC: 0 },
      isDefault: false,
      emailNotifications: true,
    };
    setWallets((prev) => [...prev, newWallet]);
    setShowCreateWallet(false);
    toast(`Wallet "${name}" created successfully!`);
  };

  const handleDeleteWallet = (walletId: string) => {
    const wallet = wallets.find((w) => w.id === walletId);
    if (wallet?.isDefault) {
      toast("Cannot delete default wallet");
      return;
    }
    setWallets((prev) => prev.filter((w) => w.id !== walletId));
    toast("Wallet deleted successfully!");
  };

  const handleUpdateWallet = (
    walletId: string,
    updates: any,
  ) => {
    setWallets((prev) =>
      prev.map((w) =>
        w.id === walletId ? { ...w, ...updates } : w,
      ),
    );
    setEditingWallet(null);
    toast("Wallet updated successfully!");
  };

  const handleWalletAction = () => {
    if (!actionAmount || parseFloat(actionAmount) <= 0) {
      toast("Please enter a valid amount");
      return;
    }

    const mainWallet = wallets.find((w) => w.isDefault);
    if (!mainWallet) return;

    if (walletAction === "send") {
      if (
        mainWallet.balance[actionCrypto] <
        parseFloat(actionAmount)
      ) {
        toast("Insufficient balance");
        return;
      }

      if (!externalAddress) {
        toast("Please enter external wallet address");
        return;
      }
    }

    const amount = parseFloat(actionAmount);

    if (walletAction === "send") {
      // External send
      setWallets((prev) =>
        prev.map((w) =>
          w.isDefault
            ? {
                ...w,
                balance: {
                  ...w.balance,
                  [actionCrypto]:
                    w.balance[actionCrypto] - amount,
                },
              }
            : w,
        ),
      );

      if (mainWallet.emailNotifications) {
        toast(
          `Email notification sent for sending ${actionAmount} ${actionCrypto}`,
        );
      }
      toast(
        `Sent ${actionAmount} ${actionCrypto} to external address successfully!`,
      );
    }

    // Clear form and go back to deposit view - STAY ON CURRENCY
    setWalletAction("deposit");
    setActionAmount("");
    setSendType("");
    setExternalAddress("");
    setTargetWalletId("");
  };

  const formatAddress = (address: string) => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Team functions
  const handleAddTeamMember = () => {
    if (!newMember.name || !newMember.email) {
      toast("Please fill in all fields");
      return;
    }

    const member = {
      id: Date.now().toString(),
      ...newMember,
      status: "active",
      avatar: newMember.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase(),
      lastActive: new Date().toISOString(),
    };

    setTeamMembers((prev) => [...prev, member]);
    setNewMember({ name: "", email: "", role: "view-only" });
    setShowAddMember(false);
    toast(`Team member "${member.name}" added successfully!`);
  };

  const handleRemoveTeamMember = (memberId: string) => {
    setTeamMembers((prev) =>
      prev.filter((m) => m.id !== memberId),
    );
    setShowDeleteConfirm(false);
    setMemberToDelete(null);
    toast("Team member removed successfully!");
  };

  const confirmDeleteMember = (member: {
    id: string;
    name: string;
  }) => {
    setMemberToDelete(member);
    setShowDeleteConfirm(true);
  };

  const handleUpdateMemberRole = (
    memberId: string,
    role: string,
  ) => {
    setTeamMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, role } : m)),
    );
    toast("Member role updated successfully!");
  };

  const handleToggleMemberStatus = (memberId: string) => {
    setTeamMembers((prev) =>
      prev.map((m) =>
        m.id === memberId
          ? {
              ...m,
              status:
                m.status === "active" ? "inactive" : "active",
            }
          : m,
      ),
    );
    toast("Member status updated successfully!");
  };

  // API Key functions
  const handleCreateApiKey = (keyData: any) => {
    const generatedKey = `pk_${keyData.environment}_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;

    const newKey = {
      id: Date.now().toString(),
      name: keyData.name,
      key: generatedKey,
      environment: keyData.environment,
      status: "active" as const,
      createdAt: new Date().toISOString(),
      lastUsed: null,
      totalCalls: 0,
      permissions: keyData.permissions,
      ipWhitelist: keyData.ipWhitelist,
      domainWhitelist: keyData.domainWhitelist,
      rateLimit: keyData.rateLimit,
    };

    setApiKeys((prev) => [newKey, ...prev]);
    return { key: generatedKey };
  };

  const handleUpdateApiKey = (keyId: string, updates: any) => {
    setApiKeys((prev) =>
      prev.map((key) =>
        key.id === keyId ? { ...key, ...updates } : key,
      ),
    );
  };

  const handleDeleteApiKey = (keyId: string) => {
    setApiKeys((prev) =>
      prev.filter((key) => key.id !== keyId),
    );
  };

  const AdminDashboard = () => (
    <PageLayout>
      <PageLayout.Header
        icon={<Activity className="w-6 h-6 text-[#07D7FF]" />}
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
        onClick={() => {
          setActiveTab("links");
          setShowPaymentLinkDialog(true);
        }}
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
                ${dashboardStats.totalVolumeProcessed.toLocaleString()}
              </div>
              <p className="text-muted-foreground">
                +12.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Successful Txns</CardTitle>
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
                ${dashboardStats.averageTransactionValue.toFixed(2)}
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
              <div>{dashboardStats.activePayors.toLocaleString()}</div>
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
                    <ChainIcon chain="ethereum" size="w-5 h-5" />
                    <span className="text-muted-foreground">Ethereum</span>
                  </div>
                  <span>
                    ${dashboardStats.multiChainVolume.ethereum.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <ChainIcon chain="polygon" size="w-5 h-5" />
                    <span className="text-muted-foreground">Polygon</span>
                  </div>
                  <span>
                    ${dashboardStats.multiChainVolume.polygon.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <ChainIcon chain="arbitrum" size="w-5 h-5" />
                    <span className="text-muted-foreground">Arbitrum</span>
                  </div>
                  <span>
                    ${dashboardStats.multiChainVolume.arbitrum.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <ChainIcon chain="optimism" size="w-5 h-5" />
                    <span className="text-muted-foreground">Optimism</span>
                  </div>
                  <span>
                    ${dashboardStats.multiChainVolume.optimism.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <ChainIcon chain="base" size="w-5 h-5" />
                    <span className="text-muted-foreground">Base</span>
                  </div>
                  <span>
                    ${dashboardStats.multiChainVolume.base.toLocaleString()}
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
                    <CryptoIcon symbol="USDC" size="w-5 h-5" />
                    <span className="text-muted-foreground">USDC</span>
                  </div>
                  <span>
                    ${dashboardStats.currencyVolume.USDC.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <CryptoIcon symbol="USDT" size="w-5 h-5" />
                    <span className="text-muted-foreground">USDT</span>
                  </div>
                  <span>
                    ${dashboardStats.currencyVolume.USDT.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <CryptoIcon symbol="EURC" size="w-5 h-5" />
                    <span className="text-muted-foreground">EURC</span>
                  </div>
                  <span>
                    ${dashboardStats.currencyVolume.EURC.toLocaleString()}
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
              <ResponsiveContainer width="100%" height="100%">
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
                  <Bar dataKey="transactions" fill="#3b82f6" />
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
              <ResponsiveContainer width="100%" height="100%">
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
                  <TableHead className="w-[100px]">Tr-ID</TableHead>
                  <TableHead className="w-[90px]">Date</TableHead>
                  <TableHead className="w-[70px]">Time</TableHead>
                  <TableHead className="w-[140px]">Link ID</TableHead>
                  <TableHead className="w-[100px]">Amount</TableHead>
                  <TableHead className="w-[90px]">Currency</TableHead>
                  <TableHead className="w-[70px]">Chain</TableHead>
                  <TableHead className="w-[100px]">Status</TableHead>
                  <TableHead className="w-[80px] text-center">Explorer</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="font-mono">
                      {tx.id}
                    </TableCell>
                    <TableCell>
                      {new Date(tx.date).toLocaleDateString('en-US', { year: '2-digit', month: 'numeric', day: 'numeric' })}
                    </TableCell>
                    <TableCell>
                      {new Date(tx.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                    </TableCell>
                    <TableCell>{tx.linkId}</TableCell>
                    <TableCell>${tx.price}</TableCell>
                    <TableCell>{tx.crypto}</TableCell>
                    <TableCell>
                      <ChainIcon chain={tx.chain} size="w-5 h-5" />
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
                        href={getExplorerUrl(tx.chain, tx.txHash)}
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
                className="border rounded-3xl p-4 space-y-3"
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
                      href={getExplorerUrl(tx.chain, tx.txHash)}
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
                      {new Date(tx.date).toLocaleDateString('en-US', { year: '2-digit', month: 'numeric', day: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Time:
                    </span>
                    <span>
                      {new Date(tx.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
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
                      <ChainIcon chain={tx.chain} size="w-5 h-5" />
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
        onClick={() => {
          setActiveTab("links");
          setShowPaymentLinkDialog(true);
        }}
        aria-label="Create payment link"
        className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-[#1E88E5] text-white shadow-lg hover:bg-[#1565C0] hover:shadow-xl hover:scale-105 active:scale-95 focus:ring-2 focus:ring-[#1E88E5] focus:ring-offset-2 focus:outline-none transition-all duration-200 flex items-center justify-center md:hidden"
      >
        <Plus className="w-6 h-6" />
      </button>
        </div>
      </PageLayout.Content>
    </PageLayout>
  );

  // ============================================================================
  // DEAD CODE REMOVED: Unused inline PaymentLinks component (lines 2029-2652)
  // 
  // This component was never called - the app uses /components/PaymentLinksDashboard.tsx
  // instead (see renderContent() switch statement, case "links" on line 6798).
  // 
  // The inline component was a duplicate with ~620 lines of dead code that caused
  // confusion during development. Removed during code cleanup on 2025-11-06.
  // ============================================================================

  const ReportsAndAnalytics = () => (
    <PageLayout>
      <PageLayout.Header
        icon={<BarChart3 className="w-6 h-6 text-[#07D7FF]" />}
        title="Reports & Analytics"
        subtitle="View detailed analytics and insights about your payment activity"
      />
      <PageLayout.Content>
        <div className="space-y-6">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Payment Volume by Currency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {supportedCryptos.map((crypto) => (
                <div
                  key={crypto.symbol}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    {crypto.logo}
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
                { chain: "Polygon", txCount: 1247, avgValue: "$125" },
                { chain: "Arbitrum", txCount: 892, avgValue: "$342" },
                { chain: "Base", txCount: 654, avgValue: "$89" },
                { chain: "Optimism", txCount: 423, avgValue: "$267" },
                { chain: "Ethereum", txCount: 156, avgValue: "$1,834" },
              ].map((network) => (
                <div
                  key={network.chain}
                  className="flex items-center justify-between"
                >
                  <span>{network.chain}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-[#798A9B]">{network.txCount} txs</span>
                    <span className="text-[#F6F7F9]">{network.avgValue} avg</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
            <div className="flex-shrink-0">
              <CardTitle>Detailed Transaction Report</CardTitle>
              <CardDescription>
                All transactions for the current period
              </CardDescription>
            </div>
            {/* Search Field */}
            <div className="relative w-full md:w-80 md:flex-shrink-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Search transactions..."
                value={reportsSearchQuery}
                onChange={(e) => setReportsSearchQuery(e.target.value)}
                className="rounded-full pl-10 pr-4 w-full"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Desktop Table */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Tr-ID</TableHead>
                  <TableHead className="w-[90px]">Date</TableHead>
                  <TableHead className="w-[70px]">Time</TableHead>
                  <TableHead className="w-[130px]">Link ID</TableHead>
                  <TableHead className="w-[100px]">Amount</TableHead>
                  <TableHead className="w-[90px]">Currency</TableHead>
                  <TableHead className="w-[70px]">Chain</TableHead>
                  <TableHead className="w-[90px]">Status</TableHead>
                  <TableHead className="w-[80px]">Fee</TableHead>
                  <TableHead className="w-[80px] text-center">Explorer</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.filter((tx) =>
                  reportsSearchQuery === "" ||
                  tx.id.toLowerCase().includes(reportsSearchQuery.toLowerCase()) ||
                  tx.linkId.toLowerCase().includes(reportsSearchQuery.toLowerCase()) ||
                  tx.price.toString().includes(reportsSearchQuery) ||
                  tx.crypto.toLowerCase().includes(reportsSearchQuery.toLowerCase()) ||
                  tx.status.toLowerCase().includes(reportsSearchQuery.toLowerCase())
                ).map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="font-mono">
                      {tx.id}
                    </TableCell>
                    <TableCell>
                      {new Date(tx.date).toLocaleDateString('en-US', { year: '2-digit', month: 'numeric', day: 'numeric' })}
                    </TableCell>
                    <TableCell>
                      {new Date(tx.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                    </TableCell>
                    <TableCell>{tx.linkId}</TableCell>
                    <TableCell>${tx.price}</TableCell>
                    <TableCell>{tx.crypto}</TableCell>
                    <TableCell>
                      <ChainIcon chain={tx.chain} size="w-5 h-5" />
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
                    <TableCell>
                      ${(tx.price * 0.029).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-center">
                      <a
                        href={getExplorerUrl(tx.chain, tx.txHash)}
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
            {recentTransactions.filter((tx) =>
              reportsSearchQuery === "" ||
              tx.id.toLowerCase().includes(reportsSearchQuery.toLowerCase()) ||
              tx.linkId.toLowerCase().includes(reportsSearchQuery.toLowerCase()) ||
              tx.price.toString().includes(reportsSearchQuery) ||
              tx.crypto.toLowerCase().includes(reportsSearchQuery.toLowerCase()) ||
              tx.status.toLowerCase().includes(reportsSearchQuery.toLowerCase())
            ).map((tx) => (
              <div
                key={tx.id}
                className="border rounded-3xl p-4 space-y-3"
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
                      href={getExplorerUrl(tx.chain, tx.txHash)}
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
                      {new Date(tx.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Time:
                    </span>
                    <span>
                      {new Date(tx.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
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
                      <ChainIcon chain={tx.chain} size="w-5 h-5" />
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Fee:
                    </span>
                    <span>
                      ${(tx.price * 0.029).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
        </div>
      </PageLayout.Content>
    </PageLayout>
  );

  const WalletManagement = () => {
    const mainWallet = wallets.find((w) => w.isDefault);
    const [selectedCrypto, setSelectedCrypto] =
      useState<string>("");
    const [showingCurrency, setShowingCurrency] =
      useState(false);
    const [manageView, setManageView] = useState("breakdown"); // "breakdown", "deposit", "send"
    const [isDeposit, setIsDeposit] = useState(true);
    const [qrCode, setQrCode] = useState("");
    const [sendAmt, setSendAmt] = useState("");
    const [sendAddr, setSendAddr] = useState("");
    const [selectedNetwork, setSelectedNetwork] = useState("ethereum");
    const [sendNetwork, setSendNetwork] = useState("ethereum");
    const [walletTab, setWalletTab] = useState("overview"); // "overview" or "security"

    const getNetworkIcon = (network: string) => {
      const icons: { [key: string]: string } = {
        ethereum: ethLogo,
        polygon: polygonLogo,
        arbitrum: arbitrumLogo,
        optimism: optimismLogo,
      };
      return icons[network] || ethLogo;
    };

    const getNetworkName = (network: string) => {
      const names: { [key: string]: string } = {
        ethereum: "Ethereum",
        polygon: "Polygon",
        arbitrum: "Arbitrum",
        optimism: "Optimism",
      };
      return names[network] || network;
    };

    if (!mainWallet) {
      return (
        <PageLayout>
          <PageLayout.Header
            icon={<Wallet className="w-6 h-6 text-[#07D7FF]" />}
            title="Wallet Management"
            subtitle="Manage your wallet balances and multi-chain crypto assets"
          />
          <PageLayout.Content>
            <Card className="rounded-2xl shadow-sm bg-white dark:bg-[#303030]">
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <Wallet className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-gray-900 dark:text-white mb-2">
                    No main wallet found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Please contact support
                  </p>
                </div>
              </CardContent>
            </Card>
          </PageLayout.Content>
        </PageLayout>
      );
    }

    const selectCurrency = (crypto: string) => {
      setSelectedCrypto(crypto);
      setShowingCurrency(true);
      setManageView("breakdown");
      setIsDeposit(true);
      setSendAmt("");
      setSendAddr("");
      setSelectedNetwork("ethereum");
      setSendNetwork("ethereum");

      // Generate QR code
      QRCode.toDataURL(mainWallet.address, {
        width: 256,
        margin: 2,
        color: { dark: "#000000", light: "#FFFFFF" },
      })
        .then((url) => setQrCode(url))
        .catch(() => {});
    };

    const backToList = () => {
      setShowingCurrency(false);
      setSelectedCrypto("");
      setQrCode("");
      setManageView("breakdown");
      setIsDeposit(true);
      setSendAmt("");
      setSendAddr("");
      setSelectedNetwork("ethereum");
      setSendNetwork("ethereum");
    };

    const doSend = () => {
      if (!sendAmt || !sendAddr) {
        toast.error("Please fill all fields", {
          description: "Both amount and destination address are required",
          style: {
            background: darkMode ? "#2E3C49" : "#ffffff",
            border: `1px solid #DD6B6B`,
            color: darkMode ? "#F6F7F9" : "#1a1a1a",
          },
        });
        return;
      }
      const amt = parseFloat(sendAmt);
      if (
        amt <= 0 ||
        amt > mainWallet.balance[selectedCrypto]
      ) {
        toast.error("Invalid amount", {
          description: amt <= 0 
            ? "Amount must be greater than 0" 
            : `Insufficient balance. Available: ${mainWallet.balance[selectedCrypto]?.toFixed(2)} ${selectedCrypto}`,
          style: {
            background: darkMode ? "#2E3C49" : "#ffffff",
            border: `1px solid #DD6B6B`,
            color: darkMode ? "#F6F7F9" : "#1a1a1a",
          },
        });
        return;
      }

      // Simulate API call - replace with actual backend call when ready
      // For now, simulate success with occasional random failure for testing
      const simulateSuccess = Math.random() > 0.1; // 90% success rate for demo

      if (simulateSuccess) {
        // Success case
        setWallets((prev) =>
          prev.map((w) =>
            w.isDefault
              ? {
                  ...w,
                  balance: {
                    ...w.balance,
                    [selectedCrypto]:
                      w.balance[selectedCrypto] - amt,
                  },
                }
              : w,
          ),
        );
        toast.success("Transaction sent successfully!", {
          description: `Sent ${sendAmt} ${selectedCrypto} to ${sendAddr.slice(0, 6)}...${sendAddr.slice(-4)}`,
          style: {
            background: darkMode ? "#2E3C49" : "#ffffff",
            border: `1px solid #7DD069`,
            color: darkMode ? "#F6F7F9" : "#1a1a1a",
          },
        });
        setSendAmt("");
        setSendAddr("");
        setIsDeposit(true);
      } else {
        // Failure case - simulating network/blockchain error
        toast.error("Transaction failed", {
          description: "Network error. Please try again.",
          style: {
            background: darkMode ? "#2E3C49" : "#ffffff",
            border: `1px solid #DD6B6B`,
            color: darkMode ? "#F6F7F9" : "#1a1a1a",
          },
        });
      }

      /* When backend is connected, replace the simulation above with:
      
      try {
        const response = await fetch('/api/wallet/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: amt,
            address: sendAddr,
            crypto: selectedCrypto,
            network: sendNetwork,
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          // Update local state
          setWallets((prev) =>
            prev.map((w) =>
              w.isDefault
                ? {
                    ...w,
                    balance: {
                      ...w.balance,
                      [selectedCrypto]: w.balance[selectedCrypto] - amt,
                    },
                  }
                : w,
            ),
          );
          
          toast.success("Transaction sent successfully!", {
            description: `Sent ${sendAmt} ${selectedCrypto} to ${sendAddr.slice(0, 6)}...${sendAddr.slice(-4)}. TxHash: ${data.txHash?.slice(0, 10)}...`,
            style: {
              background: darkMode ? "#2E3C49" : "#ffffff",
              border: `1px solid #7DD069`,
              color: darkMode ? "#F6F7F9" : "#1a1a1a",
            },
          });
          
          setSendAmt("");
          setSendAddr("");
          setIsDeposit(true);
        } else {
          throw new Error(data.message || 'Transaction failed');
        }
      } catch (error) {
        toast.error("Transaction failed", {
          description: error.message || "Network error. Please try again.",
          style: {
            background: darkMode ? "#2E3C49" : "#ffffff",
            border: `1px solid #DD6B6B`,
            color: darkMode ? "#F6F7F9" : "#1a1a1a",
          },
        });
      }
      */
    };

    const getCryptoName = (symbol: string) => {
      const names: { [key: string]: string } = {
        USDC: "USD Coin",
        USDT: "Tether",
        EURC: "Euro Coin",
      };
      return names[symbol] || symbol;
    };

    return (
      <PageLayout>
        {!showingCurrency && (
          <PageLayout.Header
            icon={<Wallet className="w-6 h-6 text-[#07D7FF]" />}
            title="Wallet Management"
            subtitle="Manage your wallet balances and multi-chain crypto assets"
          />
        )}
        <PageLayout.Content>
          <div className="space-y-6">
            {/* Main Action Button - Wallet Address (Below Header) */}
            {!showingCurrency && (
              <WalletMainActionButton 
                address={mainWallet.address}
                showIcon={true}
              />
            )}

            {/* Desktop Back Button */}
            {showingCurrency && (
              <div className="hidden md:flex items-center justify-between">
                <Button variant="outline" onClick={backToList} className="rounded-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </div>
            )}

            {!showingCurrency && (
              <>
              <div className="space-y-6">
            <Card className="bg-white dark:bg-[#303030] shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Wallet Header - MD3 Nested Section (Medium radius 12px) with subtle styling */}
                <div className="bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3>{mainWallet.name}</h3>
                    <Badge className="bg-[#7DD069]/10 text-[#7DD069] dark:bg-[#7DD069]/20 dark:text-[#7DD069] rounded-full border-0">
                      Active
                    </Badge>
                  </div>
                </div>

                {/* Mobile View - Cards */}
                <div className="md:hidden space-y-3">
                  {Object.entries(mainWallet.balance).map(
                    ([crypto, balance]) => (
                      <div
                        key={crypto}
                        onClick={() => selectCurrency(crypto)}
                        className="cursor-pointer shadow-sm hover:shadow-md rounded-2xl p-4 transition-all bg-white dark:bg-[#303030]"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <CryptoIcon symbol={crypto} />
                            <div>
                              <p className="text-gray-900 dark:text-white font-medium">
                                {crypto}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {getCryptoName(crypto)}
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Balance
                            </p>
                            <p className="font-mono text-gray-900 dark:text-white">
                              {balance.toFixed(2)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">
                              USD Value
                            </p>
                            <p className="text-muted-foreground">
                              ≈ ${balance.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>

                {/* Desktop View - Table */}
                <div className="hidden md:block shadow-sm rounded-2xl overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="pl-6">Currency</TableHead>
                        <TableHead>Balance</TableHead>
                        <TableHead>USD Value</TableHead>
                        <TableHead className="text-right pr-6">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(mainWallet.balance).map(
                        ([crypto, balance]) => (
                          <TableRow 
                            key={crypto} 
                            onClick={() => selectCurrency(crypto)}
                            className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-200"
                          >
                            <TableCell className="pl-6">
                              <div className="flex items-center space-x-3">
                                <CryptoIcon symbol={crypto} />
                                <div>
                                  <p className="text-gray-900 dark:text-white font-medium">
                                    {crypto}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {getCryptoName(crypto)}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <p className="font-mono text-gray-900 dark:text-white">
                                {balance.toFixed(2)}
                              </p>
                            </TableCell>
                            <TableCell>
                              <p className="text-muted-foreground">
                                ≈ ${balance.toFixed(2)} USD
                              </p>
                            </TableCell>
                            <TableCell className="text-right pr-6">
                              <div className="flex items-center justify-end gap-2 text-[#07D7FF]">
                                <span className="text-sm">Manage</span>
                                <ChevronRight className="w-4 h-4" />
                              </div>
                            </TableCell>
                          </TableRow>
                        ),
                      )}
                    </TableBody>
                  </Table>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-gray-900 dark:text-white">
                        Wallet Settings
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Configure notifications
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setEditingWallet(mainWallet.id)
                      }
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>

                  {editingWallet === mainWallet.id && (
                    <div className="bg-white dark:bg-[#303030] border border-[#43586C] rounded-3xl p-4 space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label>Wallet Name</Label>
                        <Input
                          defaultValue={mainWallet.name}
                          id={`edit-name-${mainWallet.id}`}
                          className="rounded bg-white dark:bg-[#2E3C49]"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`notifications-${mainWallet.id}`}
                          checked={
                            mainWallet.emailNotifications
                          }
                          onCheckedChange={(checked) =>
                            handleUpdateWallet(mainWallet.id, {
                              emailNotifications: checked,
                            })
                          }
                        />
                        <Label
                          htmlFor={`notifications-${mainWallet.id}`}
                        >
                          Email notifications
                        </Label>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => {
                            const input =
                              document.getElementById(
                                `edit-name-${mainWallet.id}`,
                              ) as HTMLInputElement;
                            if (input?.value)
                              handleUpdateWallet(
                                mainWallet.id,
                                { name: input.value },
                              );
                          }}
                          className="bg-[#1E88E5] text-white hover:bg-[#1565C0] transition-all duration-200 rounded-full"
                        >
                          <Save className="w-[18px] h-[18px] mr-2" />
                          Save
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingWallet(null)}
                          className="rounded-full"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
            </div>
          </>
        )}

        {/* Desktop: Inline Card - Hidden on Mobile */}
        {showingCurrency && (
          <Card className="hidden md:block bg-white dark:bg-[#303030] shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CryptoIcon symbol={selectedCrypto} />
                  <div>
                    <CardTitle>Manage {selectedCrypto}</CardTitle>
                    <CardDescription>
                      {getCryptoName(selectedCrypto)}
                    </CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    Total Balance
                  </p>
                  <p className="font-mono text-gray-900 dark:text-white">
                    {mainWallet.balance[selectedCrypto]?.toFixed(
                      2,
                    ) || "0.00"} {selectedCrypto}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ≈ $
                    {mainWallet.balance[selectedCrypto]?.toFixed(
                      2,
                    ) || "0.00"}{" "}
                    USD
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-3">
                <Button
                  onClick={() => setManageView("breakdown")}
                  style={{
                    backgroundColor: manageView === "breakdown"
                      ? "#757575"
                      : "transparent",
                    ...(manageView === "breakdown" && {
                      borderColor: "#757575",
                    }),
                  }}
                  className={
                    manageView === "breakdown"
                      ? "hover:bg-[#959FA8] text-white rounded-full transition-all duration-200 min-h-10 px-3 text-sm"
                      : "text-gray-900 dark:text-[#F6F7F9] rounded-full transition-all duration-200 hover:border-[#757575] dark:hover:text-[#757575] min-h-10 px-3 text-sm"
                  }
                  onMouseEnter={(e) => {
                    if (manageView !== "breakdown") {
                      e.currentTarget.style.backgroundColor = "rgba(117, 117, 117, 0.1)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (manageView !== "breakdown") {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                  variant={manageView === "breakdown" ? "default" : "outline"}
                >
                  <Activity className="w-4 h-4 mr-1.5" />
                  Chains
                </Button>
                <Button
                  onClick={() => {
                    setManageView("deposit");
                    setIsDeposit(true);
                    setSendAmt("");
                    setSendAddr("");
                  }}
                  style={{
                    backgroundColor: manageView === "deposit"
                      ? "#757575"
                      : "transparent",
                    ...(manageView === "deposit" && {
                      borderColor: "#757575",
                    }),
                  }}
                  className={
                    manageView === "deposit"
                      ? "hover:bg-[#959FA8] text-white rounded-full transition-all duration-200 min-h-10 px-3 text-sm"
                      : "text-gray-900 dark:text-[#F6F7F9] rounded-full transition-all duration-200 hover:border-[#757575] hover:text-[#757575] dark:hover:text-[#757575] min-h-10 px-3 text-sm"
                  }
                  onMouseEnter={(e) => {
                    if (manageView !== "deposit") {
                      e.currentTarget.style.backgroundColor = "rgba(117, 117, 117, 0.08)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (manageView !== "deposit") {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                  variant={manageView === "deposit" ? "default" : "outline"}
                >
                  <Download className="w-4 h-4 mr-1.5" />
                  Deposit
                </Button>
                <Button
                  onClick={() => {
                    setManageView("send");
                    setIsDeposit(false);
                    setSendAmt("");
                    setSendAddr("");
                  }}
                  style={{
                    backgroundColor: manageView === "send"
                      ? "#757575"
                      : "transparent",
                    ...(manageView === "send" && {
                      borderColor: "#757575",
                    }),
                  }}
                  className={
                    manageView === "send"
                      ? "hover:bg-[#959FA8] text-white rounded-full transition-all duration-200 min-h-10 px-3 text-sm"
                      : "text-gray-900 dark:text-[#F6F7F9] rounded-full transition-all duration-200 hover:border-[#757575] hover:text-[#757575] dark:hover:text-[#757575] min-h-10 px-3 text-sm"
                  }
                  onMouseEnter={(e) => {
                    if (manageView !== "send") {
                      e.currentTarget.style.backgroundColor = "rgba(117, 117, 117, 0.08)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (manageView !== "send") {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                  variant={manageView === "send" ? "default" : "outline"}
                >
                  <Send className="w-4 h-4 mr-1.5" />
                  Send
                </Button>
              </div>

              {manageView === "breakdown" && (
                <div>
                  <h4 className="text-gray-900 dark:text-white mb-4">Balance by Chain</h4>
                  
                  {/* Desktop View - Table */}
                  <div className="hidden md:block shadow-sm rounded-2xl overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="pl-6">Chain</TableHead>
                          <TableHead>Balance</TableHead>
                          <TableHead>USD Value</TableHead>
                          <TableHead className="text-right pr-6">Percentage</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mainWallet.chainBalances && mainWallet.chainBalances[selectedCrypto] && 
                          Object.entries(mainWallet.chainBalances[selectedCrypto]).map(
                            ([chain, balance]) => {
                              const totalBalance = mainWallet.balance[selectedCrypto];
                              const percentage = totalBalance > 0 ? ((balance / totalBalance) * 100).toFixed(1) : 0;
                              return (
                                <TableRow key={chain}>
                                  <TableCell className="pl-6">
                                    <div className="flex items-center space-x-3">
                                      <img 
                                        src={getNetworkIcon(chain)} 
                                        alt={chain} 
                                        className="w-8 h-8" 
                                      />
                                      <span className="text-gray-900 dark:text-white font-medium">
                                        {getNetworkName(chain)}
                                      </span>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <p className="font-mono text-gray-900 dark:text-white">
                                      {balance.toFixed(2)} {selectedCrypto}
                                    </p>
                                  </TableCell>
                                  <TableCell>
                                    <p className="text-muted-foreground">
                                      ≈ ${balance.toFixed(2)} USD
                                    </p>
                                  </TableCell>
                                  <TableCell className="text-right pr-6">
                                    <Badge variant="outline" className="rounded-full">
                                      {percentage}%
                                    </Badge>
                                  </TableCell>
                                </TableRow>
                              );
                            }
                          )}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Mobile View - Cards */}
                  <div className="md:hidden space-y-3">
                    {mainWallet.chainBalances && mainWallet.chainBalances[selectedCrypto] && 
                      Object.entries(mainWallet.chainBalances[selectedCrypto]).map(
                        ([chain, balance]) => {
                          const totalBalance = mainWallet.balance[selectedCrypto];
                          const percentage = totalBalance > 0 ? ((balance / totalBalance) * 100).toFixed(1) : 0;
                          return (
                            <div
                              key={chain}
                              className="border border-[#43586C] rounded-3xl p-4 bg-white dark:bg-[#303030]"
                            >
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                  <img 
                                    src={getNetworkIcon(chain)} 
                                    alt={chain} 
                                    className="w-8 h-8" 
                                  />
                                  <span className="text-gray-900 dark:text-white font-medium">
                                    {getNetworkName(chain)}
                                  </span>
                                </div>
                                <Badge variant="outline" className="rounded-full">
                                  {percentage}%
                                </Badge>
                              </div>
                              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#43586C]">
                                <div>
                                  <p className="text-sm text-muted-foreground">Balance</p>
                                  <p className="font-mono text-gray-900 dark:text-white">
                                    {balance.toFixed(2)}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm text-muted-foreground">USD Value</p>
                                  <p className="text-muted-foreground">
                                    ≈ ${balance.toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-4 mt-4">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                          Multi-Chain Distribution
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Your {selectedCrypto} balance is distributed across multiple chains. Use the deposit and send tabs to manage funds on specific chains.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {manageView === "deposit" && (
                <div className="space-y-4">
                  {/* Info Box - Addresses are the same across all EVM chains */}
                  <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-2xl border border-blue-200 dark:border-blue-900">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-1">
                          Multi-Chain Address
                        </p>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          Your wallet address works across all supported chains (Ethereum, Polygon, Arbitrum, Optimism, Base). Send {selectedCrypto} from any of these networks to the address below.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Wallet Address - Using WalletMainActionButton */}
                  <div className="space-y-2">
                    <Label>
                      Wallet Address ({selectedCrypto})
                    </Label>
                    <WalletMainActionButton 
                      address={mainWallet.address}
                      showIcon={true}
                    />
                  </div>

                  {/* QR Code */}
                  <div className="bg-white dark:bg-[#303030] p-6 rounded-2xl border border-[#43586C] text-center space-y-4">
                    <p className="font-medium text-gray-900 dark:text-white">
                      Scan QR Code to Deposit
                    </p>
                    <div className="w-48 h-48 mx-auto bg-white dark:bg-[#0a0a0a] p-4 rounded-2xl border-2 border-[#EEEEEE] dark:border-[#43586C] flex items-center justify-center">
                      {qrCode ? (
                        <img
                          src={qrCode}
                          alt="QR Code"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="flex flex-col items-center space-y-2">
                          <QrCode className="w-12 h-12 text-gray-400 animate-pulse" />
                          <p className="text-gray-500 text-sm">
                            Loading...
                          </p>
                        </div>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Use your wallet app to scan
                    </p>
                  </div>

                  {/* Warning */}
                  <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-2xl border border-orange-200 dark:border-orange-900">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-orange-800 dark:text-orange-400 mb-1">
                          Important
                        </p>
                        <p className="text-sm text-orange-700 dark:text-orange-300">
                          Only send {selectedCrypto} to this address. This EVM-compatible address works across all supported chains (Ethereum, Polygon, Arbitrum, Optimism, Base).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {manageView === "send" && (
                <div className="space-y-6">
                  {/* Network Selection */}
                  <div className="space-y-3">
                    <Label htmlFor="desktop-send-network" className="text-gray-900 dark:text-white font-medium">
                      Select Network
                    </Label>
                    <Select value={sendNetwork} onValueChange={setSendNetwork}>
                      <SelectTrigger id="desktop-send-network" className="w-full h-14 bg-white dark:bg-[#2E3C49] rounded border border-[#43586C] hover:border-[#757575] focus:border-2 focus:border-[#1E88E5] transition-all duration-200">
                        <SelectValue placeholder="Choose network" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-[#262626] rounded-xl shadow-lg">
                        {supportedChains.map((chain) => (
                          <SelectItem key={chain.id} value={chain.id} className="h-12 rounded-lg hover:bg-black/[0.08] dark:hover:bg-white/[0.08]">
                            <div className="flex items-center space-x-3">
                              <img src={chain.logo} alt={chain.name} className="w-6 h-6" />
                              <span className="text-gray-900 dark:text-white">{chain.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Available Balance Info */}
                  {sendNetwork && (
                    <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-2xl border border-blue-200 dark:border-blue-900">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-blue-900 dark:text-blue-200">
                          Available on {getNetworkName(sendNetwork)}
                        </span>
                        <span className="font-mono font-medium text-blue-900 dark:text-blue-200">
                          {mainWallet.chainBalances && mainWallet.chainBalances[selectedCrypto] && mainWallet.chainBalances[selectedCrypto][sendNetwork] 
                            ? mainWallet.chainBalances[selectedCrypto][sendNetwork].toFixed(2) 
                            : "0.00"} {selectedCrypto}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Amount Input */}
                  <div className="space-y-3">
                    <Label htmlFor="desktop-send-amount" className="text-gray-900 dark:text-white font-medium">
                      Amount
                    </Label>
                    <div className="relative">
                      <Input
                        id="desktop-send-amount"
                        type="number"
                        placeholder="0.00"
                        value={sendAmt}
                        onChange={(e) => setSendAmt(e.target.value)}
                        className="w-full h-14 px-4 py-3 pr-24 font-mono text-lg rounded bg-white dark:bg-[#2E3C49] border-2 border-[#43586C] text-gray-900 dark:text-[#F6F7F9] placeholder:text-[#798A9B] hover:border-[#757575] focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5] focus:outline-none transition-all duration-200"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 font-medium text-gray-900 dark:text-[#F6F7F9] pointer-events-none">
                        {selectedCrypto}
                      </div>
                    </div>
                  </div>

                  {/* Destination Address */}
                  <div className="space-y-3">
                    <Label htmlFor="desktop-send-address" className="text-gray-900 dark:text-white font-medium">
                      Destination Address
                    </Label>
                    <Input
                      id="desktop-send-address"
                      placeholder="0x..."
                      value={sendAddr}
                      onChange={(e) => setSendAddr(e.target.value)}
                      className="w-full h-14 px-4 py-3 font-mono rounded bg-white dark:bg-[#2E3C49] border-2 border-[#43586C] text-gray-900 dark:text-[#F6F7F9] placeholder:text-[#798A9B] hover:border-[#757575] focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5] focus:outline-none transition-all duration-200"
                    />
                  </div>

                  {/* Error Message */}
                  {sendAmt && sendNetwork && parseFloat(sendAmt) > (mainWallet.chainBalances?.[selectedCrypto]?.[sendNetwork] || 0) && (
                    <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-2xl border border-red-200 dark:border-red-900">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                        <p className="font-medium text-red-700 dark:text-red-300">
                          Insufficient balance on {getNetworkName(sendNetwork)}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Send Button */}
                  <Button
                    onClick={doSend}
                    disabled={!sendAmt || !sendAddr || !sendNetwork || parseFloat(sendAmt) > (mainWallet.chainBalances?.[selectedCrypto]?.[sendNetwork] || 0)}
                    className="w-full min-h-14 rounded-full bg-[#1E88E5] text-white hover:bg-[#1565C0] active:scale-[0.98] focus:ring-2 focus:ring-[#1E88E5] focus:ring-offset-2 disabled:bg-[#43586C] disabled:text-[#798A9B] disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <Send className="w-[18px] h-[18px] mr-2" />
                    <span className="font-medium">
                      Send {sendAmt || "0"} {selectedCrypto}
                    </span>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
          </div>
        </PageLayout.Content>

        {/* Mobile: Full Screen View for Manage Crypto */}
        {showingCurrency && (
          <div className="md:hidden fixed inset-0 bg-white dark:bg-[#0A0A0A] z-50 overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-[#0A0A0A] p-4 z-10">
              {/* Back Button */}
              <Button
                onClick={backToList}
                variant="ghost"
                className="mb-4 px-3 py-2 min-h-10 rounded-full text-gray-900 dark:text-[#F6F7F9] hover:bg-black/[0.08] dark:hover:bg-white/[0.08] transition-all duration-200"
              >
                <ArrowLeft className="w-[18px] h-[18px] mr-2" />
                Back to Wallets
              </Button>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <CryptoIcon symbol={selectedCrypto} />
                  <div>
                    <h2 className="text-xl font-medium">Manage {selectedCrypto}</h2>
                    <p className="text-sm text-muted-foreground">
                      {getCryptoName(selectedCrypto)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Total Balance</p>
                  <p className="font-mono text-gray-900 dark:text-white">
                    {mainWallet.balance[selectedCrypto]?.toFixed(2) || "0.00"} {selectedCrypto}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ≈ ${mainWallet.balance[selectedCrypto]?.toFixed(2) || "0.00"} USD
                  </p>
                </div>
              </div>

              {/* Tab Buttons */}
              <div className="grid grid-cols-3 gap-3">
                <Button
                  onClick={() => setManageView("breakdown")}
                  style={{
                    backgroundColor: manageView === "breakdown" ? "#757575" : "transparent",
                    ...(manageView === "breakdown" && { borderColor: "#757575" }),
                  }}
                  className={
                    manageView === "breakdown"
                      ? "hover:bg-[#959FA8] text-white rounded-full transition-all duration-200 min-h-10 px-3 text-sm"
                      : "text-gray-900 dark:text-[#F6F7F9] rounded-full transition-all duration-200 hover:border-[#757575] dark:hover:text-[#757575] min-h-10 px-3 text-sm"
                  }
                  variant={manageView === "breakdown" ? "default" : "outline"}
                >
                  <Activity className="w-4 h-4 mr-1.5" />
                  Chains
                </Button>
                <Button
                  onClick={() => {
                    setManageView("deposit");
                    setIsDeposit(true);
                    setSendAmt("");
                    setSendAddr("");
                  }}
                  style={{
                    backgroundColor: manageView === "deposit" ? "#757575" : "transparent",
                    ...(manageView === "deposit" && { borderColor: "#757575" }),
                  }}
                  className={
                    manageView === "deposit"
                      ? "hover:bg-[#959FA8] text-white rounded-full transition-all duration-200 min-h-10 px-3 text-sm"
                      : "text-gray-900 dark:text-[#F6F7F9] rounded-full transition-all duration-200 hover:border-[#1E88E5] hover:text-[#1E88E5] dark:hover:text-[#1E88E5] min-h-10 px-3 text-sm"
                  }
                  variant={manageView === "deposit" ? "default" : "outline"}
                >
                  <Download className="w-4 h-4 mr-1.5" />
                  Deposit
                </Button>
                <Button
                  onClick={() => {
                    setManageView("send");
                    setIsDeposit(false);
                    setSendAmt("");
                    setSendAddr("");
                  }}
                  style={{
                    backgroundColor: manageView === "send" ? "#757575" : "transparent",
                    ...(manageView === "send" && { borderColor: "#757575" }),
                  }}
                  className={
                    manageView === "send"
                      ? "hover:bg-[#959FA8] text-white rounded-full transition-all duration-200 min-h-10 px-3 text-sm"
                      : "text-gray-900 dark:text-[#F6F7F9] rounded-full transition-all duration-200 hover:border-[#1E88E5] hover:text-[#1E88E5] dark:hover:text-[#1E88E5] min-h-10 px-3 text-sm"
                  }
                  variant={manageView === "send" ? "default" : "outline"}
                >
                  <Send className="w-4 h-4 mr-1.5" />
                  Send
                </Button>
              </div>
            </div>

            {/* Sheet Content - Scrollable */}
            <div className="p-6 space-y-6">
              {manageView === "breakdown" && (
                <div>
                  <h4 className="text-gray-900 dark:text-white mb-4">Balance by Chain</h4>
                  
                  {/* Mobile View - Cards Only in Sheet */}
                  <div className="space-y-3">
                    {mainWallet.chainBalances && mainWallet.chainBalances[selectedCrypto] && 
                      Object.entries(mainWallet.chainBalances[selectedCrypto]).map(
                        ([chain, balance]) => {
                          const totalBalance = mainWallet.balance[selectedCrypto];
                          const percentage = totalBalance > 0 ? ((balance / totalBalance) * 100).toFixed(1) : 0;
                          return (
                            <div
                              key={chain}
                              className="shadow-sm hover:shadow-md rounded-2xl p-4 bg-white dark:bg-[#303030] transition-all"
                            >
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                  <img 
                                    src={getNetworkIcon(chain)} 
                                    alt={chain} 
                                    className="w-8 h-8" 
                                  />
                                  <span className="text-gray-900 dark:text-white font-medium">
                                    {getNetworkName(chain)}
                                  </span>
                                </div>
                                <Badge variant="outline" className="rounded-full">
                                  {percentage}%
                                </Badge>
                              </div>
                              <div className="grid grid-cols-2 gap-3 pt-3">
                                <div>
                                  <p className="text-sm text-muted-foreground">Balance</p>
                                  <p className="font-mono text-gray-900 dark:text-white">
                                    {balance.toFixed(2)}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm text-muted-foreground">USD Value</p>
                                  <p className="text-muted-foreground">
                                    ≈ ${balance.toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-4 mt-4">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                          Multi-Chain Distribution
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Your {selectedCrypto} is distributed across multiple blockchain networks for optimal flexibility.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {manageView === "deposit" && (
                <div className="space-y-4">
                  {/* Blue Info Box */}
                  <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-2xl border border-blue-200 dark:border-blue-900">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-1">
                          Supported Networks
                        </p>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          Send {selectedCrypto} on any supported network: Ethereum, Polygon, Arbitrum, Optimism, or Base.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Copy Address Button */}
                  <Button
                    className="w-full min-h-12 bg-[#1E88E5] text-white hover:bg-[#1565C0] rounded-full transition-all duration-200"
                    onClick={() => {
                      copyToClipboard(mainWallet.address);
                    }}
                  >
                    <Copy className="w-[18px] h-[18px] mr-2" />
                    Copy Address
                  </Button>

                  {/* QR Code */}
                  <div className="bg-white dark:bg-[#2E3C49] shadow-sm rounded-2xl p-6 text-center">
                    {qrCode && (
                      <div className="inline-block bg-white p-4 rounded-2xl">
                        <img src={qrCode} alt="Deposit QR" className="w-48 h-48" />
                      </div>
                    )}
                    <p className="text-sm text-muted-foreground mt-4">Scan to deposit {selectedCrypto}</p>
                  </div>
                </div>
              )}

              {manageView === "send" && (
                <div className="space-y-6">
                  {/* Network Selection */}
                  <div className="space-y-3">
                    <Label htmlFor="send-network" className="text-gray-900 dark:text-white font-medium">
                      Select Network
                    </Label>
                    <Select value={sendNetwork} onValueChange={setSendNetwork}>
                      <SelectTrigger id="send-network" className="w-full h-14 bg-white dark:bg-[#2E3C49] rounded border border-[#43586C] hover:border-[#757575] focus:border-2 focus:border-[#1E88E5] transition-all duration-200">
                        <SelectValue placeholder="Choose network" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-[#262626] rounded-xl shadow-lg">
                        {supportedChains.map((chain) => (
                          <SelectItem key={chain.id} value={chain.id} className="h-12 rounded-lg hover:bg-black/[0.08] dark:hover:bg-white/[0.08]">
                            <div className="flex items-center space-x-3">
                              <img src={chain.logo} alt={chain.name} className="w-6 h-6" />
                              <span className="text-gray-900 dark:text-white">{chain.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Available Balance Info */}
                  {sendNetwork && (
                    <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-2xl border border-blue-200 dark:border-blue-900">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-blue-900 dark:text-blue-200">
                          Available on {getNetworkName(sendNetwork)}
                        </span>
                        <span className="font-mono font-medium text-blue-900 dark:text-blue-200">
                          {mainWallet.chainBalances && mainWallet.chainBalances[selectedCrypto] && mainWallet.chainBalances[selectedCrypto][sendNetwork] 
                            ? mainWallet.chainBalances[selectedCrypto][sendNetwork].toFixed(2) 
                            : "0.00"} {selectedCrypto}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Amount Input */}
                  <div className="space-y-3">
                    <Label htmlFor="send-amount" className="text-gray-900 dark:text-white font-medium">
                      Amount
                    </Label>
                    <div className="relative">
                      <Input
                        id="send-amount"
                        type="number"
                        placeholder="0.00"
                        value={sendAmt}
                        onChange={(e) => setSendAmt(e.target.value)}
                        className="w-full h-14 px-4 py-3 pr-24 font-mono text-lg rounded bg-white dark:bg-[#2E3C49] border-2 border-[#43586C] text-gray-900 dark:text-[#F6F7F9] placeholder:text-[#798A9B] hover:border-[#757575] focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5] focus:outline-none transition-all duration-200"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 font-medium text-gray-900 dark:text-[#F6F7F9] pointer-events-none">
                        {selectedCrypto}
                      </div>
                    </div>
                  </div>

                  {/* Destination Address */}
                  <div className="space-y-3">
                    <Label htmlFor="send-address" className="text-gray-900 dark:text-white font-medium">
                      Destination Address
                    </Label>
                    <Input
                      id="send-address"
                      placeholder="0x..."
                      value={sendAddr}
                      onChange={(e) => setSendAddr(e.target.value)}
                      className="w-full h-14 px-4 py-3 font-mono rounded bg-white dark:bg-[#2E3C49] border-2 border-[#43586C] text-gray-900 dark:text-[#F6F7F9] placeholder:text-[#798A9B] hover:border-[#757575] focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5] focus:outline-none transition-all duration-200"
                    />
                  </div>

                  {/* Error Message */}
                  {sendAmt && sendNetwork && parseFloat(sendAmt) > (mainWallet.chainBalances?.[selectedCrypto]?.[sendNetwork] || 0) && (
                    <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-2xl border border-red-200 dark:border-red-900">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                        <p className="font-medium text-red-700 dark:text-red-300">
                          Insufficient balance on {getNetworkName(sendNetwork)}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Send Button */}
                  <Button
                    onClick={doSend}
                    disabled={!sendAmt || !sendAddr || !sendNetwork || parseFloat(sendAmt) > (mainWallet.chainBalances?.[selectedCrypto]?.[sendNetwork] || 0)}
                    className="w-full min-h-14 rounded-full bg-[#1E88E5] text-white hover:bg-[#1565C0] active:scale-[0.98] focus:ring-2 focus:ring-[#1E88E5] focus:ring-offset-2 disabled:bg-[#43586C] disabled:text-[#798A9B] disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <Send className="w-[18px] h-[18px] mr-2" />
                    <span className="font-medium">
                      Send {sendAmt || "0"} {selectedCrypto}
                    </span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </PageLayout>
    );
  };

  const TeamManagement = () => (
    <PageLayout>
      <PageLayout.Header
        icon={<UsersRound className="w-6 h-6 text-[#07D7FF]" />}
        title="Team Management"
        subtitle="Invite and manage team members with role-based permissions"
      />
      <PageLayout.Content>
        <div className="space-y-6">

      {/* ========================================
          DESKTOP ACTION BUTTON (Left-aligned, below subtitle)
          
          Position: Top of content area, left-aligned
          Hidden on mobile (md:hidden) - mobile uses FAB instead
          ======================================== */}
      <Button
        onClick={() => setShowAddMember(true)}
        className="hidden md:inline-flex items-center justify-center px-6 h-10 bg-[#1E88E5] text-white hover:bg-[#1565C0] transition-all duration-200 rounded-full"
      >
        <UserPlus className="w-[18px] h-[18px] mr-2" />
        Add Team Member
      </Button>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && memberToDelete && (
        <Card className="border-2 border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-800">
              <AlertCircle className="w-5 h-5" />
              <span>Confirm Deletion</span>
            </CardTitle>
            <CardDescription className="text-red-700">
              This action cannot be undone. This will
              permanently remove the team member from your
              workspace.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-[#EEEEEE] p-4 rounded-3xl border border-red-200">
              <p className="text-sm">
                Are you sure you want to remove{" "}
                <span className="font-medium">
                  {memberToDelete.name}
                </span>{" "}
                from your team?
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="destructive"
                onClick={() =>
                  handleRemoveTeamMember(memberToDelete.id)
                }
                className="bg-red-600 hover:bg-red-700"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Member
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setMemberToDelete(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add Member Form */}
      {showAddMember && (
        <Card className="border-2 border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle>Add Team Member</CardTitle>
            <CardDescription>
              Invite a new team member to your workspace
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input
                  placeholder="John Doe"
                  value={newMember.name}
                  onChange={(e) =>
                    setNewMember((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input
                  type="email"
                  placeholder="john@company.com"
                  value={newMember.email}
                  onChange={(e) =>
                    setNewMember((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select
                value={newMember.role}
                onValueChange={(value) =>
                  setNewMember((prev) => ({
                    ...prev,
                    role: value,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="view-only">
                    View Only
                  </SelectItem>
                  <SelectItem value="limited">
                    Limited
                  </SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={handleAddTeamMember}
                className="bg-[#1E88E5] text-white hover:bg-[#1565C0] transition-all duration-200 rounded-full"
              >
                Add Member
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAddMember(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Team Members List */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            Manage your team members and their permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Desktop Table */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">
                            {member.avatar}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">
                            {member.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {member.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={member.role}
                        onValueChange={(value) =>
                          handleUpdateMemberRole(
                            member.id,
                            value,
                          )
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="view-only">
                            View Only
                          </SelectItem>
                          <SelectItem value="limited">
                            Limited
                          </SelectItem>
                          <SelectItem value="admin">
                            Admin
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          member.status === "active"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {member.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(
                        member.lastActive,
                      ).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleToggleMemberStatus(member.id)
                          }
                          className={
                            member.status === "active"
                              ? "text-orange-600 hover:text-orange-700"
                              : "text-green-600 hover:text-green-700"
                          }
                        >
                          {member.status === "active" ? (
                            <UserX className="w-4 h-4" />
                          ) : (
                            <UserCheck className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            confirmDeleteMember({
                              id: member.id,
                              name: member.name,
                            })
                          }
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="border rounded-3xl p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="font-medium text-blue-600">
                        {member.avatar}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">
                        {member.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {member.email}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      member.status === "active"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {member.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Role:
                    </span>
                    <Select
                      value={member.role}
                      onValueChange={(value) =>
                        handleUpdateMemberRole(member.id, value)
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="view-only">
                          View Only
                        </SelectItem>
                        <SelectItem value="limited">
                          Limited
                        </SelectItem>
                        <SelectItem value="admin">
                          Admin
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Last Active:
                    </span>
                    <span>
                      {new Date(
                        member.lastActive,
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleToggleMemberStatus(member.id)
                    }
                    className={
                      member.status === "active"
                        ? "text-orange-600 hover:text-orange-700"
                        : "text-green-600 hover:text-green-700"
                    }
                  >
                    {member.status === "active" ? (
                      <UserX className="w-4 h-4" />
                    ) : (
                      <UserCheck className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      confirmDeleteMember({
                        id: member.id,
                        name: member.name,
                      })
                    }
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
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
          Opens Add Team Member form
          ======================================== */}
      <button
        onClick={() => setShowAddMember(true)}
        aria-label="Add team member"
        className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-[#1E88E5] text-white shadow-lg hover:bg-[#1565C0] hover:shadow-xl hover:scale-105 active:scale-95 focus:ring-2 focus:ring-[#1E88E5] focus:ring-offset-2 focus:outline-none transition-all duration-200 flex items-center justify-center md:hidden"
      >
        <UserPlus className="w-6 h-6" />
      </button>
        </div>
      </PageLayout.Content>
    </PageLayout>
  );

  const APIConfiguration = () => (
    <APIKeyManagement
      apiKeys={apiKeys}
      onCreateKey={handleCreateApiKey}
      onUpdateKey={handleUpdateApiKey}
      onDeleteKey={handleDeleteApiKey}
      onNavigateToQuickStart={() => setActiveTab("quickstart")}
      onNavigateToAPIReference={() => setActiveTab("apireference")}
    />
  );

  const OldAPIConfiguration = () => (
    <div className="space-y-6">
      <div>
        <h2 className="flex items-center gap-2">
          <Code className="w-6 h-6 text-[#07D7FF]" />
          API Configuration
        </h2>
        <p className="text-muted-foreground">
          Manage API keys, webhooks, and integration settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>API Keys</CardTitle>
            <CardDescription>
              Manage your API keys for integration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Production API Key</Label>
              <div className="flex space-x-2">
                <Input
                  value="pk_live_••••••••••••••••��•••••���•••••••••"
                  readOnly
                />
                <Button
                  variant="outline"
                  onClick={() =>
                    copyToClipboard("pk_live_1234567890abcdef")
                  }
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Test API Key</Label>
              <div className="flex space-x-2">
                <Input
                  value="pk_test_•••••••••••••••••••��••••••••••••"
                  readOnly
                />
                <Button
                  variant="outline"
                  onClick={() =>
                    copyToClipboard("pk_test_0987654321fedcba")
                  }
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              Generate New API Key
            </Button>

            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Keep your API keys secure. Never share them
                publicly or commit them to version control.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Webhook Configuration</CardTitle>
            <CardDescription>
              Configure webhook endpoints for payment
              notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="webhook-url">Webhook URL</Label>
              <Input
                id="webhook-url"
                placeholder="https://yoursite.com/webhook"
              />
            </div>

            <div className="space-y-2">
              <Label>Events to receive</Label>
              <div className="space-y-2">
                {[
                  "payment.completed",
                  "payment.failed",
                  "payment.pending",
                ].map((event) => (
                  <div
                    key={event}
                    className="flex items-center space-x-2"
                  >
                    <Switch id={event} defaultChecked />
                    <Label htmlFor={event}>{event}</Label>
                  </div>
                ))}
              </div>
            </div>

            <Button className="w-full">
              Save Webhook Configuration
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>API Documentation</CardTitle>
          <CardDescription>
            Integration guides and API reference
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="flex items-center justify-center space-x-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Quick Start Guide</span>
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center space-x-2"
              onClick={() => window.open('/API_REFERENCE.md', '_blank')}
            >
              <ExternalLink className="w-4 h-4" />
              <span>API Reference</span>
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center space-x-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Code Examples</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const CustomerCheckout = () => (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className={`w-full max-w-md relative overflow-hidden flex flex-col rounded-2xl ${
        showCryptoSelection && currencyVariant === "multiple" ? 'min-h-[600px]' : 'min-h-[500px]'
      }`}>
        <CardHeader className={`text-center p-6 flex-shrink-0 ${showCryptoSelection ? 'pb-4' : 'pb-6'}`}>
          {/* Back button in top left - conditional based on screen */}
          <div className="absolute top-6 left-6">
            <Button
              variant="ghost"
              className="min-h-12 px-4 rounded-full transition-all duration-200"
              onClick={() => {
                // Screen #8: Success - no back button shown, handled by "Return to Dashboard" button
                if (paymentStatus === "completed") return;
                
                // Screen #7: Processing - no back button during processing
                if (paymentStatus === "processing") return;
                
                // Screen #6: Funding Success - go back to funding options
                if (showFundingOptions && showFundingSuccess) {
                  setShowFundingSuccess(false);
                  return;
                }
                
                // Screen #5: Insufficient Balance (Funding Options) - go back to crypto selection
                if (showFundingOptions && !showFundingSuccess) {
                  setShowFundingOptions(false);
                  setShowCryptoSelection(true);
                  setFundingMethod("");
                  return;
                }
                
                // Screen #4: Payment Confirmation Form - go back to crypto selection
                if (showPaymentForm) {
                  setShowPaymentForm(false);
                  setShowCryptoSelection(true);
                  return;
                }
                
                // Screen #3: Crypto Selection - go back to login screen
                if (showCryptoSelection) {
                  setShowCryptoSelection(false);
                  setShowWeb3Auth(true);
                  return;
                }
                
                // Screen #2: Login/Register - go back to payment details
                if (showWeb3Auth) {
                  setShowWeb3Auth(false);
                  return;
                }
                
                // Screen #1: Payment Details - go back to admin/close checkout
                setActiveTab("admin");
                setCurrentPayment(null);
                setShowCryptoSelection(false);
                setShowWeb3Auth(false);
                setShowPaymentForm(false);
                setShowFundingOptions(false);
                setFundingMethod("");
                setShowFundingSuccess(false);
                setConnectedWallet("");
                setWalletAddress("");
                setPaymentStatus("pending");
                window.location.hash = "";
              }}
            >
              <ArrowLeft className="w-[18px] h-[18px] mr-2" />
              <span>Back</span>
            </Button>
          </div>
          
          <div className="flex justify-center">
            <img
              src={darkMode ? pymstrLogoLight : pymstrLogo}
              alt="PYMSTR"
              className="h-8"
            />
          </div>
        </CardHeader>
        <CardContent className={`px-6 pb-6 flex-1 flex flex-col ${showCryptoSelection ? 'pt-0' : showFundingOptions ? 'pt-0' : 'pt-4'}`}>
          {showWeb3Auth ? (
            <div className="flex flex-col justify-center h-full space-y-6">
              <div className="text-center space-y-2">
                <h3>Login to Pay</h3>
                <p className="text-muted-foreground">
                  ${currentPayment?.price || 156.78} • {currentPayment?.description || "Payment"}
                </p>
              </div>

              {isConnecting ? (
                <div className="text-center space-y-4 py-8">
                  <div className="w-12 h-12 border-4 border-[#1E88E5] border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-muted-foreground">
                    Connecting...
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Social Login Options - 2 Column Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="flex items-center justify-start gap-2 rounded-full min-h-12 px-4 border-[#D1D9E1] hover:bg-[#E3F2FD] hover:border-[#1E88E5] transition-all duration-200"
                      onClick={() => handleWalletConnect("Google")}
                    >
                      <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span className="flex-1 text-left">Google</span>
                    </Button>

                    <Button
                      variant="outline"
                      className="flex items-center justify-start gap-2 rounded-full min-h-12 px-4 border-[#D1D9E1] hover:bg-[#E3F2FD] hover:border-[#1E88E5] transition-all duration-200"
                      onClick={() => handleWalletConnect("Twitter")}
                    >
                      <Twitter className="w-5 h-5 flex-shrink-0" />
                      <span className="flex-1 text-left">Twitter</span>
                    </Button>

                    <Button
                      variant="outline"
                      className="flex items-center justify-start gap-2 rounded-full min-h-12 px-4 border-[#D1D9E1] hover:bg-[#E3F2FD] hover:border-[#1E88E5] transition-all duration-200"
                      onClick={() => handleWalletConnect("Github")}
                    >
                      <Github className="w-5 h-5 flex-shrink-0" />
                      <span className="flex-1 text-left">Github</span>
                    </Button>

                    <Button
                      variant="outline"
                      className="flex items-center justify-start gap-2 rounded-full min-h-12 px-4 border-[#D1D9E1] hover:bg-[#E3F2FD] hover:border-[#1E88E5] transition-all duration-200"
                      onClick={() => handleWalletConnect("MetaMask")}
                    >
                      <Wallet className="w-5 h-5 flex-shrink-0" />
                      <span className="flex-1 text-left">MetaMask</span>
                    </Button>

                    <Button
                      variant="outline"
                      className="flex items-center justify-start gap-2 rounded-full min-h-12 px-4 border-[#D1D9E1] hover:bg-[#E3F2FD] hover:border-[#1E88E5] transition-all duration-200"
                      onClick={() => handleWalletConnect("WalletConnect")}
                    >
                      <Wallet className="w-5 h-5 flex-shrink-0" />
                      <span className="flex-1 text-left">WalletConnect</span>
                    </Button>

                    <Button
                      variant="outline"
                      className="flex items-center justify-start gap-2 rounded-full min-h-12 px-4 border-[#D1D9E1] hover:bg-[#E3F2FD] hover:border-[#1E88E5] transition-all duration-200"
                      onClick={() => handleWalletConnect("Coinbase Wallet")}
                    >
                      <Wallet className="w-5 h-5 flex-shrink-0" />
                      <span className="flex-1 text-left">Coinbase</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : showCryptoSelection ? (
            <div className="flex flex-col h-full pt-4 pb-6 px-0 space-y-4">
              <div className="text-center space-y-2">
                <h2 className="text-4xl">
                  ${currentPayment?.price || 156.78}
                </h2>
                <p className="text-muted-foreground">
                  {currentPayment
                    ? currentPayment.description
                    : "Payment to CryptoStore"}
                </p>
                <p className="text-[#7DD069]">
                  ✓ {connectedWallet}
                </p>
              </div>

              {/* Chain Selection */}
              <div className="space-y-2">
                <Label>Network</Label>
                <NetworkSelector
                  networks={supportedChains.filter(chain => {
                    // First check merchant config - only show chains enabled for selected token
                    const availableChains = getAvailableChainsForToken(selectedCrypto);
                    const isEnabledByMerchant = availableChains.includes(chain.id);
                    
                    // Then check payment link restrictions (if any)
                    const isAllowedByPaymentLink = !currentPayment?.availableChains || 
                      currentPayment.availableChains.length === 0 || 
                      currentPayment.availableChains.includes(chain.id);
                    
                    return isEnabledByMerchant && isAllowedByPaymentLink;
                  })}
                  selectedNetwork={selectedChain}
                  onNetworkChange={(networkId) => {
                    setSelectedChain(networkId);
                    // Auto-adjust currency if current one is not available on new chain
                    const availableTokens = getAvailableTokensForChain(networkId);
                    if (!availableTokens.includes(selectedCrypto)) {
                      // Select first available token for this chain
                      if (availableTokens.length > 0) {
                        setSelectedCrypto(availableTokens[0]);
                      }
                    }
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label>Currency</Label>
                <CryptoSelector
                  options={supportedCryptos
                    .filter(crypto => {
                      // First check merchant config - only show tokens enabled for selected chain
                      const availableTokens = getAvailableTokensForChain(selectedChain);
                      const isEnabledByMerchant = availableTokens.includes(crypto.symbol);
                      
                      // Then apply simulation variant filter
                      const simulatedCurrencies = currencyVariant === "single" ? ["USDC"] : ["USDC", "USDT", "EURC"];
                      
                      // If currentPayment has availableCurrencies set, use that, otherwise use simulation
                      const allowedCurrencies = currentPayment?.availableCurrencies && currentPayment.availableCurrencies.length > 0
                        ? currentPayment.availableCurrencies
                        : simulatedCurrencies;
                      
                      const isAllowedByPaymentLink = allowedCurrencies.includes(crypto.symbol);
                      
                      return isEnabledByMerchant && isAllowedByPaymentLink;
                    })
                    .map((crypto) => ({
                      crypto: {
                        symbol: crypto.symbol,
                        name: crypto.name,
                        logo: crypto.logo,
                      },
                      amount: calculateCryptoAmount(
                        currentPayment?.price || 156.78,
                        crypto.symbol,
                      ),
                      balance: getWalletBalance(
                        crypto.symbol,
                        selectedChain
                      ).toFixed(2),
                      hasSufficientBalance: hasSufficientBalance(crypto.symbol),
                    }))}
                  selectedCrypto={selectedCrypto}
                  onCryptoChange={(cryptoSymbol) => {
                    setSelectedCrypto(cryptoSymbol);
                    // Auto-adjust chain if current one is not available for new token
                    const availableChains = getAvailableChainsForToken(cryptoSymbol);
                    if (!availableChains.includes(selectedChain)) {
                      // Select first available chain for this token
                      if (availableChains.length > 0) {
                        setSelectedChain(availableChains[0]);
                      }
                    }
                  }}
                />
              </div>

              <Button
                className="w-full rounded-full bg-[#1E88E5] hover:bg-[#1565C0] text-white min-h-12 transition-all duration-200"
                onClick={() => {
                  // Validate token-chain combination with merchant config
                  if (!isTokenChainEnabled(selectedCrypto, selectedChain)) {
                    toast.error(`${selectedCrypto} is not accepted on ${getChainName(selectedChain)}`);
                    return;
                  }
                  
                  if (hasSufficientBalance(selectedCrypto)) {
                    setShowCryptoSelection(false);
                    setShowPaymentForm(true);
                  } else {
                    setShowCryptoSelection(false);
                    setShowFundingOptions(true);
                    setShowFundingSuccess(false);
                  }
                }}
              >
                {hasSufficientBalance(selectedCrypto)
                  ? `Pay ${selectedCrypto} on ${getChainName(selectedChain)}`
                  : `Add ${selectedCrypto} to Pay`}
              </Button>


            </div>
          ) : showFundingOptions ? (
            showFundingSuccess ? (
              <div className="space-y-6">
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 bg-[#7DD069]/20 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-[#7DD069]" />
                  </div>
                  <div className="space-y-2">
                    <h3>Funding Method Ready!</h3>
                    <p className="text-muted-foreground">
                      You can now proceed with adding{" "}
                      {selectedCrypto} funds
                    </p>
                  </div>
                  <div className="bg-[#7DD069]/10 p-6 rounded-2xl border border-[#7DD069]/30">
                    <p className="text-[#7DD069]">
                      Your selected funding method is ready to
                      use. Click continue to proceed with the
                      payment.
                    </p>
                  </div>
                  <Button
                    className="w-full min-h-12 bg-[#1E88E5] text-white hover:bg-[#1565C0] transition-all duration-200 rounded-full"
                    onClick={() => {
                      setShowFundingOptions(false);
                      setShowPaymentForm(true);
                      setShowFundingSuccess(false);
                      setFundingMethod("");
                      toast(
                        `${selectedCrypto} ${getChainName(selectedChain)} funding completed successfully!`,
                      );
                    }}
                  >
                    Continue to Payment
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-4xl">
                    ${currentPayment?.price || 156.78}
                  </h2>
                  <p className="text-muted-foreground">
                    {currentPayment
                      ? currentPayment.description
                      : "Payment to CryptoStore"}
                  </p>
                  <p className="text-[#7DD069]">
                    ✓ Connected with {connectedWallet}
                  </p>
                </div>

                <Separator className="bg-[#D1D9E1]" />

                {/* MD3 Warning Container - Yellow background with proper text contrast */}
                <div className="bg-[#D9C370]/10 p-6 rounded-2xl border border-[#D9C370]/30">
                  <div className="flex items-center gap-3 mb-3">
                    <AlertCircle className="w-5 h-5 text-[#D9C370]" />
                    <span className="text-[#1C1B1F] dark:text-[#F6F7F9] font-medium">
                      Add Funds Required
                    </span>
                  </div>
                  <p className="text-[#1C1B1F] dark:text-[#F6F7F9]">
                    Add{" "}
                    {parseFloat(
                      calculateCryptoAmount(
                        currentPayment?.price || 156.78,
                        selectedCrypto,
                      ),
                    ).toFixed(2)}{" "}
                    {selectedCrypto} on {getChainName(selectedChain)} to continue
                  </p>
                </div>

                <div className="space-y-4">
                  <Label>Choose funding method:</Label>

                  {/* QR Code or Copy Wallet Address Option */}
                  <div
                    className={`p-4 min-h-16 border rounded-2xl cursor-pointer transition-all duration-200 ${
                      fundingMethod === "qr"
                        ? "border-[#1E88E5] bg-[#E3F2FD] dark:border-[#1E88E5] dark:bg-[#1E88E5]/20"
                        : "border-[#D1D9E1] hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
                    }`}
                    onClick={() => {
                      setFundingMethod("qr");
                      setShowQRFunding(true);
                      setQrFundingBalance(0);
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <QrCode className="w-6 h-6 text-[#1E88E5] flex-shrink-0" />
                      <div>
                        <p>
                          Scan QR Code or Copy Wallet Address
                        </p>
                        <p className="text-muted-foreground">
                          Transfer {selectedCrypto} {getChainName(selectedChain)} from another wallet
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Credit Card Option */}
                  <div
                    className={`p-4 min-h-16 border rounded-2xl cursor-pointer transition-all duration-200 border-[#43586C] hover:bg-black/[0.04] dark:hover:bg-white/[0.04]`}
                    onClick={() => {
                      setFundingMethod("card");
                      setShowOnRamper(true);
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <CreditCard className="w-6 h-6 text-[#1E88E5] flex-shrink-0" />
                      <div>
                        <p>
                          Buy with Credit Card
                        </p>
                        <p className="text-muted-foreground">
                          Purchase {selectedCrypto} {getChainName(selectedChain)} instantly
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          ) : !showPaymentForm ? (
            <div className="flex flex-col justify-center h-full space-y-8">
              <div className="text-center space-y-3">
                <h1 className="text-5xl">
                  ${currentPayment?.price || 156.78}
                </h1>
                <p className="text-muted-foreground">
                  {currentPayment
                    ? currentPayment.description
                    : "Payment to CryptoStore"}
                </p>
                <p className="text-muted-foreground">
                  {currentPayment
                    ? `Payment ID: ${currentPayment.id}`
                    : "Demo Payment"}
                </p>
              </div>

              <div className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Login or register to continue with payment
                </p>
                <Button
                  className="w-full rounded-full bg-[#1E88E5] hover:bg-[#1565C0] text-white min-h-12 transition-all duration-200"
                  onClick={() => setShowWeb3Auth(true)}
                >
                  Login / Register
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-4xl">
                  ${currentPayment?.price || 156.78}
                </h2>
                <p className="text-muted-foreground">
                  {currentPayment
                    ? currentPayment.description
                    : "Payment to CryptoStore"}
                </p>
                <p className="text-[#7DD069]">
                  ✓ Connected with {connectedWallet}
                </p>
                <p className="text-[#1E88E5]">
                  Paying with {selectedCrypto}
                </p>
              </div>

              <Separator className="bg-[#D1D9E1]" />

              {paymentStatus === "pending" && (
                <div className="space-y-6">
                  <div className="bg-[#E3F2FD] dark:bg-[#1E88E5]/20 p-6 rounded-2xl border border-[#1E88E5]/30">
                    <div className="flex items-center justify-between mb-3">
                      <span>Amount:</span>
                      <span>
                        {calculateCryptoAmount(
                          currentPayment?.price || 156.78,
                          selectedCrypto,
                        )}{" "}
                        {selectedCrypto}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span>{supportedChains.find(chain => chain.id === selectedChain)?.name || "Network"} Fee:</span>
                      <span>~0.001 {selectedCrypto}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Total:</span>
                      <span>
                        {(
                          parseFloat(
                            calculateCryptoAmount(
                              currentPayment?.price || 156.78,
                              selectedCrypto,
                            ),
                          ) + 0.001
                        ).toFixed(6)}{" "}
                        {selectedCrypto}
                      </span>
                    </div>
                  </div>

                  <Button
                    className="w-full rounded-full bg-[#1E88E5] hover:bg-[#1565C0] text-white min-h-12 transition-all duration-200"
                    onClick={handlePayment}
                  >
                    <Wallet className="w-5 h-5 mr-2" />
                    Confirm Payment
                  </Button>
                </div>
              )}

              {paymentStatus === "processing" && (
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 border-4 border-[#1E88E5] border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <div className="space-y-2">
                    <p>Processing payment...</p>
                    <p className="text-muted-foreground">
                      Please wait while we confirm your
                      transaction
                    </p>
                  </div>
                </div>
              )}

              {paymentStatus === "completed" && (
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 bg-[#7DD069]/20 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-[#7DD069]" />
                  </div>
                  <div className="space-y-2">
                    <h3>Payment Successful!</h3>
                    <p className="text-muted-foreground">
                      Your payment has been processed
                      successfully
                    </p>
                  </div>
                  <Button
                    className="w-full min-h-12 rounded-full bg-[#1E88E5] hover:bg-[#1565C0] text-white transition-all duration-200"
                    onClick={() => {
                      setActiveTab("admin");
                      setCurrentPayment(null);
                      setShowCryptoSelection(false);
                      setShowWeb3Auth(false);
                      setShowPaymentForm(false);
                      setShowFundingOptions(false);
                      setFundingMethod("");
                      setShowFundingSuccess(false);
                      setConnectedWallet("");
                      setWalletAddress("");
                      setPaymentStatus("pending");
                      window.location.hash = "";
                    }}
                  >
                    Return to Dashboard
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>

        {/* Secure Footer */}
        <div className="p-6 border-t border-[#D1D9E1]">
          <div className="flex items-center justify-center gap-3">
            <Shield className="w-5 h-5 text-[#7DD069] fill-[#7DD069]" />
            <span className="whitespace-nowrap">
              Non-custodial & bulletproof by design
            </span>
          </div>
        </div>
      </Card>

      {/* OnRamper Credit Card Purchase Dialog */}
      <Dialog open={showOnRamper} onOpenChange={setShowOnRamper}>
        <DialogContent className="max-w-2xl max-h-[90vh] p-0 overflow-hidden rounded-3xl">
          <DialogHeader className="p-8 pb-6">
            <DialogTitle>Buy {selectedCrypto} with Credit Card</DialogTitle>
            <DialogDescription>
              Complete your purchase through our secure payment partner OnRamper
            </DialogDescription>
          </DialogHeader>
          <div className="px-8 pb-8">
            <div className="bg-[#E3F2FD] dark:bg-[#1E88E5]/20 p-6 rounded-2xl border border-[#1E88E5]/30 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span>You need:</span>
                <span>
                  {calculateCryptoAmount(currentPayment?.price || 156.78, selectedCrypto)} {selectedCrypto}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Network:</span>
                <span>{getChainName(selectedChain)}</span>
              </div>
            </div>
            
            {/* OnRamper iframe */}
            <div className="rounded-2xl overflow-hidden border border-[#D1D9E1]">
              <iframe
                src={`https://widget.onramper.com?apiKey=pk_prod_01JA8K7NMCXHXQZYNT22V3FPJ8&defaultCrypto=${selectedCrypto}&defaultAmount=${calculateCryptoAmount(currentPayment?.price || 156.78, selectedCrypto)}&networks=${getOnRamperNetwork(selectedChain)}&wallets=${selectedCrypto}:${walletAddress}&isAddressEditable=false`}
                title="OnRamper Widget"
                height="600px"
                width="100%"
                allow="accelerometer; autoplay; camera; gyroscope; payment"
                style={{ border: 'none' }}
              />
            </div>

            <div className="mt-6 space-y-4">
              <Button
                className="w-full rounded-full min-h-12 bg-[#1E88E5] text-white hover:bg-[#1565C0] transition-all duration-200"
                onClick={() => {
                  setShowOnRamper(false);
                  setShowFundingSuccess(true);
                  toast(`${selectedCrypto} purchase initiated! Funds will arrive shortly.`);
                }}
              >
                I've Completed the Purchase
              </Button>
              <Button
                variant="ghost"
                className="w-full rounded-full min-h-12 transition-all duration-200"
                onClick={() => setShowOnRamper(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );

  // User Login - Web3Auth login gate for User Dashboard
  const UserLogin = () => {
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleLogin = (method: string) => {
      setIsLoggingIn(true);
      setUserLoginMethod(method);
      
      // Simulate Web3Auth login process
      setTimeout(() => {
        setIsUserLoggedIn(true);
        setIsLoggingIn(false);
        toast(`Logged in with ${method}!`);
      }, 2000);
    };

    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <Card className="w-full max-w-md relative">
          <CardHeader className="text-center space-y-2">
            {/* Back button in top left */}
            <div className="absolute top-4 left-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab("admin")}
                className="text-muted-foreground rounded-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </div>
            
            <div className="flex justify-center mb-2">
              <img
                src={darkMode ? pymstrLogoLight : pymstrLogo}
                alt="PYMSTR"
                className="h-10"
              />
            </div>
            <div className="flex justify-center mb-4">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center bg-[#757575]"
              >
                <Lock className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle>Welcome to Your Dashboard</CardTitle>
            <CardDescription>
              Sign in to view your payment history, wallet balances, and manage your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoggingIn ? (
              <div className="text-center space-y-4 py-8">
                <div className="w-12 h-12 border-4 border-[#FF5914] border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-muted-foreground">
                  Connecting with {userLoginMethod}...
                </p>
              </div>
            ) : (
              <>
                {/* Social Logins */}
                <div className="space-y-3">
                  <Button
                    className="w-full rounded-full h-12 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200"
                    onClick={() => handleLogin("Google")}
                  >
                    <Chrome className="w-5 h-5 mr-2" />
                    Continue with Google
                  </Button>
                  
                  <Button
                    className="w-full rounded-full h-12 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white"
                    onClick={() => handleLogin("Twitter")}
                  >
                    <Twitter className="w-5 h-5 mr-2" />
                    Continue with Twitter
                  </Button>
                  
                  <Button
                    className="w-full rounded-full h-12 bg-[#24292e] hover:bg-[#1b1f23] text-white"
                    onClick={() => handleLogin("GitHub")}
                  >
                    <Github className="w-5 h-5 mr-2" />
                    Continue with GitHub
                  </Button>
                  
                  <Button
                    className="w-full rounded-full h-12 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200"
                    onClick={() => handleLogin("Email")}
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Continue with Email
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or connect wallet
                    </span>
                  </div>
                </div>

                {/* Wallet Connect */}
                <Button
                  className="w-full rounded-full h-12 bg-[#1E88E5] text-white hover:bg-[#1565C0] transition-all duration-200"
                  onClick={() => handleLogin("Wallet")}
                >
                  <Wallet className="w-5 h-5 mr-2" />
                  Connect Wallet
                </Button>

                {/* Security Notice */}
                <div className="flex items-start space-x-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-3xl mt-4">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                  <p className="text-xs text-blue-900 dark:text-blue-300">
                    <strong>Secure & Private:</strong> Your login is powered by Web3Auth. 
                    We never store your credentials or have access to your private keys.
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  // User Dashboard - End user transaction history and account management
  const UserDashboard = () => {
    // Header visibility state for mobile scroll behavior
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    
    // Mock user transaction data
    const [userTransactions] = useState([
      {
        id: "TXN001",
        date: "2025-10-23T14:30:00Z",
        merchant: "CryptoStore",
        description: "Premium Subscription",
        amount: 49.99,
        currency: "USDC",
        chain: "polygon",
        status: "completed",
        txHash: "0x1234567890abcdef1234567890abcdef12345678",
      },
      {
        id: "TXN002",
        date: "2025-10-22T10:15:00Z",
        merchant: "Digital Marketplace",
        description: "E-book Bundle",
        amount: 24.50,
        currency: "USDT",
        chain: "arbitrum",
        status: "completed",
        txHash: "0xabcdef1234567890abcdef1234567890abcdef12",
      },
      {
        id: "TXN003",
        date: "2025-10-21T16:45:00Z",
        merchant: "Tech Services",
        description: "API Access",
        amount: 99.00,
        currency: "EURC",
        chain: "ethereum",
        status: "completed",
        txHash: "0x9876543210fedcba9876543210fedcba98765432",
      },
      {
        id: "TXN004",
        date: "2025-10-20T09:20:00Z",
        merchant: "Online Course Platform",
        description: "Web3 Development Course",
        amount: 149.99,
        currency: "USDC",
        chain: "optimism",
        status: "completed",
        txHash: "0xfedcba9876543210fedcba9876543210fedcba98",
      },
      {
        id: "TXN005",
        date: "2025-10-19T13:55:00Z",
        merchant: "SaaS Provider",
        description: "Monthly Plan",
        amount: 29.99,
        currency: "USDC",
        chain: "base",
        status: "completed",
        txHash: "0x2468135790abcdef2468135790abcdef24681357",
      },
    ]);

    // Mock user wallet - structured like merchant wallet
    const [userWallet] = useState({
      id: "user-wallet-1",
      name: "My Wallet",
      address: "0x8f3e4a5b7c9d1e2f3a4b5c6d7e8f9a0b1c2d3e4f",
      balance: {
        USDC: 1645.37,
        USDT: 620.65,
        EURC: 813.23,
      },
      chainBalances: {
        USDC: {
          ethereum: 234.56,
          polygon: 445.23,
          arbitrum: 150.23,
          optimism: 189.45,
          base: 625.90,
        },
        USDT: {
          ethereum: 0,
          polygon: 120.00,
          arbitrum: 320.15,
          optimism: 0,
          base: 180.50,
        },
        EURC: {
          ethereum: 500.78,
          polygon: 0,
          arbitrum: 0,
          optimism: 312.45,
          base: 0,
        },
      },
      isDefault: true,
      emailNotifications: true,
    });

    // Navigation state for end user sections
    const [userActiveSection, setUserActiveSection] = useState("overview");
    
    // Wallet management states
    const [selectedCrypto, setSelectedCrypto] = useState<string>("");
    const [showingCurrency, setShowingCurrency] = useState(false);
    const [manageView, setManageView] = useState("breakdown");
    const [qrCode, setQrCode] = useState("");
    const [sendAmt, setSendAmt] = useState("");
    const [sendAddr, setSendAddr] = useState("");
    const [selectedNetwork, setSelectedNetwork] = useState("ethereum");
    const [sendNetwork, setSendNetwork] = useState("ethereum");

    const getTotalBalance = () => {
      return userWallet.balance.USDC + userWallet.balance.USDT + userWallet.balance.EURC;
    };

    const getTotalSpent = () => {
      return userTransactions.reduce((sum, tx) => sum + tx.amount, 0);
    };

    const getActiveChainCount = () => {
      const activeChains = new Set<string>();
      Object.entries(userWallet.chainBalances).forEach(([crypto, chains]) => {
        Object.entries(chains).forEach(([chain, balance]) => {
          if (balance > 0) activeChains.add(chain);
        });
      });
      return activeChains.size;
    };

    const handleUserLogout = () => {
      setIsUserLoggedIn(false);
      setUserLoginMethod("");
      toast("Logged out successfully!");
    };

    // Wallet management functions
    const getNetworkIcon = (network: string) => {
      const icons: { [key: string]: string } = {
        ethereum: ethLogo,
        polygon: polygonLogo,
        arbitrum: arbitrumLogo,
        optimism: optimismLogo,
        base: baseLogo,
      };
      return icons[network] || ethLogo;
    };

    const getNetworkName = (network: string) => {
      const names: { [key: string]: string } = {
        ethereum: "Ethereum",
        polygon: "Polygon",
        arbitrum: "Arbitrum",
        optimism: "Optimism",
        base: "Base",
      };
      return names[network] || network;
    };

    const getCryptoName = (symbol: string) => {
      const names: { [key: string]: string } = {
        USDC: "USD Coin",
        USDT: "Tether",
        EURC: "Euro Coin",
      };
      return names[symbol] || symbol;
    };

    const selectCurrency = (crypto: string) => {
      setSelectedCrypto(crypto);
      setShowingCurrency(true);
      setManageView("breakdown");
      setSendAmt("");
      setSendAddr("");
      setSelectedNetwork("ethereum");
      setSendNetwork("ethereum");

      // Generate QR code
      QRCode.toDataURL(userWallet.address, {
        width: 256,
        margin: 2,
        color: { dark: "#000000", light: "#FFFFFF" },
      })
        .then((url) => setQrCode(url))
        .catch(() => {});
    };

    const backToList = () => {
      setShowingCurrency(false);
      setSelectedCrypto("");
      setQrCode("");
      setManageView("breakdown");
      setSendAmt("");
      setSendAddr("");
      setSelectedNetwork("ethereum");
      setSendNetwork("ethereum");
    };

    const doSend = () => {
      if (!sendAmt || !sendAddr) {
        toast("Please fill all fields");
        return;
      }
      const amt = parseFloat(sendAmt);
      if (amt <= 0 || amt > userWallet.balance[selectedCrypto]) {
        toast("Invalid amount");
        return;
      }
      toast(`Sent ${sendAmt} ${selectedCrypto}!`);
      setSendAmt("");
      setSendAddr("");
    };

    return (
      <div className="min-h-screen bg-background">
        {/* User Dashboard Header with Avatar Menu - Auto-hides on scroll down (mobile only) */}
        <header 
          className={`
            fixed md:sticky top-0 left-0 right-0 z-40 
            bg-white dark:bg-[#303030] border-b border-[#43586C] shadow-sm
            transition-transform duration-300 ease-out
            ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}
            md:!translate-y-0
          `}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Left: Logo/Brand + Back to Merchant (Desktop only) */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Wallet className="w-6 h-6 text-[#07D7FF]" />
                  <h1 className="font-medium hidden sm:block">PYMSTR</h1>
                </div>
                <div className="hidden md:block h-6 w-px bg-[#43586C]" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTab("admin")}
                  className="rounded-full hidden md:inline-flex"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Merchant View
                </Button>
              </div>

              {/* Right: User Avatar Menu */}
              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                  <div 
                    className="w-2 h-2 rounded-full bg-green-500"
                    title="Logged in"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {userLoginMethod}
                  </span>
                </div>

                {/* User Avatar Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 p-1 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] rounded-full transition-colors duration-200">
                      <div className="w-10 h-10 rounded-full bg-[#07D7FF] flex items-center justify-center text-white">
                        <User className="w-5 h-5" />
                      </div>
                      <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400 hidden sm:block" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-[#262626] rounded-xl p-2">
                    <div className="px-3 py-2 border-b border-[#43586C] mb-2">
                      <p className="text-sm text-gray-900 dark:text-white">End User</p>
                      <p className="text-xs text-muted-foreground">
                        {userLoginMethod} Login
                      </p>
                    </div>
                    <DropdownMenuItem
                      className="cursor-pointer rounded-lg h-10 px-3 md:hidden"
                      onClick={() => setActiveTab("admin")}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      <span>Back to Merchant</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer rounded-lg h-10 px-3"
                      onClick={() => setUserActiveSection("settings")}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer rounded-lg h-10 px-3 text-[#DD6B6B]"
                      onClick={handleUserLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Navigation Tabs (Desktop) */}
            <div className="hidden md:flex items-center gap-1 -mb-px">
              <button
                onClick={() => setUserActiveSection("overview")}
                className={`px-4 py-3 border-b-2 transition-colors duration-200 ${
                  userActiveSection === "overview"
                    ? "border-[#07D7FF] text-[#07D7FF]"
                    : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Activity className="w-[18px] h-[18px]" />
                  <span>Overview</span>
                </div>
              </button>
              <button
                onClick={() => setUserActiveSection("wallet")}
                className={`px-4 py-3 border-b-2 transition-colors duration-200 ${
                  userActiveSection === "wallet"
                    ? "border-[#07D7FF] text-[#07D7FF]"
                    : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Wallet className="w-[18px] h-[18px]" />
                  <span>Wallet</span>
                </div>
              </button>
              <button
                onClick={() => setUserActiveSection("transactions")}
                className={`px-4 py-3 border-b-2 transition-colors duration-200 ${
                  userActiveSection === "transactions"
                    ? "border-[#07D7FF] text-[#07D7FF]"
                    : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-[18px] h-[18px]" />
                  <span>Transactions</span>
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* User Dashboard Content - Add pt-16 on mobile to compensate for fixed header */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-16 md:pt-6 space-y-6">
          {/* Overview Section */}
          {userActiveSection === "overview" && (
            <div className="space-y-6">
              <div>
                <h2 className="flex items-center gap-2">
                  <Activity className="w-6 h-6 text-[#07D7FF]" />
                  Overview
                </h2>
                <p className="text-muted-foreground">
                  Your account summary and recent activity
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle>Total Balance</CardTitle>
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="-mt-4">
                    <div>${getTotalBalance().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    <p className="text-muted-foreground">
                      Across {getActiveChainCount()} chains
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle>Total Spent</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="-mt-4">
                    <div>${getTotalSpent().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    <p className="text-muted-foreground">
                      {userTransactions.length} payments made
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Transactions */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Payments</CardTitle>
                  <CardDescription>
                    Your latest payment activity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Show only first 3 transactions */}
                  <div className="space-y-3">
                    {userTransactions.slice(0, 3).map((tx) => (
                      <div
                        key={tx.id}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <CryptoIcon symbol={tx.currency} size="w-8 h-8" />
                          <div>
                            <p className="font-medium">{tx.merchant}</p>
                            <p className="text-sm text-muted-foreground">{tx.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{tx.amount.toFixed(2)} {tx.currency}</p>
                          <p className="text-sm text-muted-foreground">{new Date(tx.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4 rounded-full"
                    onClick={() => setUserActiveSection("transactions")}
                  >
                    View All Transactions
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
              </div>
            )}

          {/* Wallet Section */}
          {userActiveSection === "wallet" && (
            <div className="space-y-6">
              <div>
                <h2 className="flex items-center gap-2">
                  <Wallet className="w-6 h-6 text-[#07D7FF]" />
                  My Wallet
                </h2>
                <p className="text-muted-foreground">
                  View and manage your crypto balances across multiple chains
                </p>
              </div>

              {!showingCurrency && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3>{userWallet.name}</h3>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400 rounded-full">
                            Active
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <p className="text-sm text-muted-foreground font-mono">
                            {formatAddress(userWallet.address)}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(userWallet.address)}
                            className="h-6 w-6 p-0"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Mobile View - Cards */}
                      <div className="md:hidden space-y-3">
                        {Object.entries(userWallet.balance).map(([crypto, balance]) => (
                          <div
                            key={crypto}
                            onClick={() => selectCurrency(crypto)}
                            className="cursor-pointer shadow-sm hover:shadow-md rounded-2xl p-4 transition-all bg-white dark:bg-[#303030]"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <CryptoIcon symbol={crypto} />
                                <div>
                                  <p className="text-gray-900 dark:text-white font-medium">
                                    {crypto}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {getCryptoName(crypto)}
                                  </p>
                                </div>
                              </div>
                              <ChevronRight className="w-5 h-5 text-gray-400" />
                            </div>
                            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
                              <div>
                                <p className="text-sm text-muted-foreground">Balance</p>
                                <p className="font-mono text-gray-900 dark:text-white">
                                  {balance.toFixed(2)}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-muted-foreground">USD Value</p>
                                <p className="text-muted-foreground">≈ ${balance.toFixed(2)}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Desktop View - Table */}
                      <div className="hidden md:block shadow-sm rounded-2xl overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="pl-6">Currency</TableHead>
                              <TableHead>Balance</TableHead>
                              <TableHead>USD Value</TableHead>
                              <TableHead className="text-right pr-6">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {Object.entries(userWallet.balance).map(([crypto, balance]) => (
                              <TableRow key={crypto} className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900">
                                <TableCell className="pl-6">
                                  <div className="flex items-center space-x-3">
                                    <CryptoIcon symbol={crypto} />
                                    <div>
                                      <p className="text-gray-900 dark:text-white font-medium">
                                        {crypto}
                                      </p>
                                      <p className="text-sm text-muted-foreground">
                                        {getCryptoName(crypto)}
                                      </p>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <p className="font-mono text-gray-900 dark:text-white">
                                    {balance.toFixed(2)}
                                  </p>
                                </TableCell>
                                <TableCell>
                                  <p className="text-muted-foreground">≈ ${balance.toFixed(2)} USD</p>
                                </TableCell>
                                <TableCell className="text-right pr-6">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => selectCurrency(crypto)}
                                    className="rounded-full"
                                  >
                                    Manage
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {showingCurrency && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Button variant="outline" onClick={backToList} className="rounded-full">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                  </div>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <CryptoIcon symbol={selectedCrypto} />
                          <div>
                            <CardTitle>Manage {selectedCrypto}</CardTitle>
                            <CardDescription>{getCryptoName(selectedCrypto)}</CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Total Balance</p>
                  <p className="font-mono text-gray-900 dark:text-white">
                    {userWallet.balance[selectedCrypto]?.toFixed(2) || "0.00"} {selectedCrypto}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ≈ ${userWallet.balance[selectedCrypto]?.toFixed(2) || "0.00"} USD
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <Button
                  onClick={() => setManageView("breakdown")}
                  style={{
                    backgroundColor: manageView === "breakdown"
                      ? "#757575"
                      : "transparent",
                    ...(manageView === "breakdown" && {
                      borderColor: "#757575",
                    }),
                  }}
                  className={
                    manageView === "breakdown"
                      ? "hover:bg-[#959FA8] text-white rounded-full transition-all duration-200"
                      : "text-gray-900 dark:text-[#F6F7F9] rounded-full transition-all duration-200 hover:border-[#757575] dark:hover:text-[#757575]"
                  }
                  onMouseEnter={(e) => {
                    if (manageView !== "breakdown") {
                      e.currentTarget.style.backgroundColor = "rgba(117, 117, 117, 0.1)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (manageView !== "breakdown") {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                  variant={manageView === "breakdown" ? "default" : "outline"}
                >
                  <Activity className="w-4 h-4 mr-2 md:mr-2 mr-1" />
                  Chains
                </Button>
                <Button
                  onClick={() => {
                    setManageView("deposit");
                    setSendAmt("");
                    setSendAddr("");
                  }}
                  style={{
                    backgroundColor: manageView === "deposit"
                      ? "#1E88E5"
                      : "transparent",
                    ...(manageView === "deposit" && {
                      borderColor: "#1E88E5",
                    }),
                  }}
                  className={
                    manageView === "deposit"
                      ? "hover:bg-[#1565C0] text-white rounded-full transition-all duration-200"
                      : "text-gray-900 dark:text-[#F6F7F9] rounded-full transition-all duration-200 hover:border-[#1E88E5] hover:text-[#1E88E5] dark:hover:text-[#1E88E5]"
                  }
                  onMouseEnter={(e) => {
                    if (manageView !== "deposit") {
                      e.currentTarget.style.backgroundColor = "rgba(30, 136, 229, 0.08)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (manageView !== "deposit") {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                  variant={manageView === "deposit" ? "default" : "outline"}
                >
                  <Download className="w-4 h-4 mr-2 md:mr-2 mr-1" />
                  Deposit
                </Button>
                <Button
                  onClick={() => {
                    setManageView("send");
                    setSendAmt("");
                    setSendAddr("");
                  }}
                  style={{
                    backgroundColor: manageView === "send"
                      ? "#1E88E5"
                      : "transparent",
                    ...(manageView === "send" && {
                      borderColor: "#1E88E5",
                    }),
                  }}
                  className={
                    manageView === "send"
                      ? "hover:bg-[#1565C0] text-white rounded-full transition-all duration-200"
                      : "text-gray-900 dark:text-[#F6F7F9] rounded-full transition-all duration-200 hover:border-[#1E88E5] hover:text-[#1E88E5] dark:hover:text-[#1E88E5]"
                  }
                  onMouseEnter={(e) => {
                    if (manageView !== "send") {
                      e.currentTarget.style.backgroundColor = "rgba(117, 117, 117, 0.1)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (manageView !== "send") {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                  variant={manageView === "send" ? "default" : "outline"}
                >
                  <Send className="w-4 h-4 mr-2 md:mr-2 mr-1" />
                  Send
                </Button>
              </div>

              {manageView === "breakdown" && (
                <div>
                  <h4 className="text-gray-900 dark:text-white mb-4">Balance by Chain</h4>

                  {/* Desktop View - Table */}
                  <div className="hidden md:block shadow-sm rounded-2xl overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="pl-6">Chain</TableHead>
                          <TableHead>Balance</TableHead>
                          <TableHead>USD Value</TableHead>
                          <TableHead className="text-right pr-6">Percentage</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {userWallet.chainBalances && userWallet.chainBalances[selectedCrypto] &&
                          Object.entries(userWallet.chainBalances[selectedCrypto]).map(
                            ([chain, balance]) => {
                              const totalBalance = userWallet.balance[selectedCrypto];
                              const percentage = totalBalance > 0 ? ((balance / totalBalance) * 100).toFixed(1) : 0;
                              if (balance === 0) return null;
                              return (
                                <TableRow key={chain}>
                                  <TableCell className="pl-6">
                                    <div className="flex items-center space-x-3">
                                      <img
                                        src={getNetworkIcon(chain)}
                                        alt={chain}
                                        className="w-8 h-8"
                                      />
                                      <span className="text-gray-900 dark:text-white font-medium">
                                        {getNetworkName(chain)}
                                      </span>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <p className="font-mono text-gray-900 dark:text-white">
                                      {balance.toFixed(2)} {selectedCrypto}
                                    </p>
                                  </TableCell>
                                  <TableCell>
                                    <p className="text-muted-foreground">
                                      ≈ ${balance.toFixed(2)} USD
                                    </p>
                                  </TableCell>
                                  <TableCell className="text-right pr-6">
                                    <Badge variant="outline" className="rounded-full">
                                      {percentage}%
                                    </Badge>
                                  </TableCell>
                                </TableRow>
                              );
                            }
                          )}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Mobile View - Cards */}
                  <div className="md:hidden space-y-3">
                    {userWallet.chainBalances && userWallet.chainBalances[selectedCrypto] &&
                      Object.entries(userWallet.chainBalances[selectedCrypto]).map(
                        ([chain, balance]) => {
                          const totalBalance = userWallet.balance[selectedCrypto];
                          const percentage = totalBalance > 0 ? ((balance / totalBalance) * 100).toFixed(1) : 0;
                          if (balance === 0) return null;
                          return (
                            <div
                              key={chain}
                              className="shadow-sm hover:shadow-md rounded-2xl p-4 bg-white dark:bg-[#303030] transition-all"
                            >
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                  <img
                                    src={getNetworkIcon(chain)}
                                    alt={chain}
                                    className="w-8 h-8"
                                  />
                                  <span className="text-gray-900 dark:text-white font-medium">
                                    {getNetworkName(chain)}
                                  </span>
                                </div>
                                <Badge variant="outline" className="rounded-full">
                                  {percentage}%
                                </Badge>
                              </div>
                              <div className="grid grid-cols-2 gap-3 pt-3">
                                <div>
                                  <p className="text-sm text-muted-foreground">Balance</p>
                                  <p className="font-mono text-gray-900 dark:text-white">
                                    {balance.toFixed(2)}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm text-muted-foreground">USD Value</p>
                                  <p className="text-muted-foreground">≈ ${balance.toFixed(2)}</p>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-4 mt-4">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                          Multi-Chain Distribution
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Your {selectedCrypto} balance is distributed across multiple chains. Use the deposit and send tabs to manage funds on specific chains.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {manageView === "deposit" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Blockchain Network</Label>
                    <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
                      <SelectTrigger>
                        <SelectValue>
                          <div className="flex items-center space-x-2">
                            <img src={getNetworkIcon(selectedNetwork)} alt={selectedNetwork} className="w-5 h-5" />
                            <span>{getNetworkName(selectedNetwork)}</span>
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ethereum">
                          <div className="flex items-center space-x-2">
                            <img src={ethLogo} alt="Ethereum" className="w-5 h-5" />
                            <span>Ethereum</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="polygon">
                          <div className="flex items-center space-x-2">
                            <img src={polygonLogo} alt="Polygon" className="w-5 h-5" />
                            <span>Polygon</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="arbitrum">
                          <div className="flex items-center space-x-2">
                            <img src={arbitrumLogo} alt="Arbitrum" className="w-5 h-5" />
                            <span>Arbitrum</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="optimism">
                          <div className="flex items-center space-x-2">
                            <img src={optimismLogo} alt="Optimism" className="w-5 h-5" />
                            <span>Optimism</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="base">
                          <div className="flex items-center space-x-2">
                            <img src={baseLogo} alt="Base" className="w-5 h-5" />
                            <span>Base</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Wallet Address ({selectedCrypto})</Label>
                    <div className="flex space-x-2">
                      <Input
                        value={userWallet.address}
                        readOnly
                        className="font-mono text-sm bg-gray-50 dark:bg-gray-900"
                      />
                      <Button
                        variant="outline"
                        onClick={() => copyToClipboard(userWallet.address)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          if (navigator.share) {
                            navigator
                              .share({
                                title: `${selectedCrypto} Wallet Address`,
                                text: `Send ${selectedCrypto} to: ${userWallet.address}`,
                              })
                              .catch(() => {});
                          } else {
                            copyToClipboard(userWallet.address);
                          }
                        }}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-950 p-8 rounded-3xl border-2 border-gray-200 dark:border-gray-800 text-center space-y-4">
                    <p className="text-gray-900 dark:text-white">Scan QR Code to Deposit</p>
                    <div className="w-64 h-64 mx-auto bg-white p-4 rounded-2xl border-4 border-gray-100 dark:border-gray-800 flex items-center justify-center">
                      {qrCode ? (
                        <img
                          src={qrCode}
                          alt="QR Code"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="flex flex-col items-center space-y-2">
                          <QrCode className="w-16 h-16 text-gray-400 animate-pulse" />
                          <p className="text-gray-500">Loading...</p>
                        </div>
                      )}
                    </div>
                    <p className="text-muted-foreground">Use your wallet app to scan</p>
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-3xl border border-orange-200 dark:border-orange-900">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-orange-800 dark:text-orange-400 mb-1">
                          Important
                        </p>
                        <p className="text-sm text-orange-700 dark:text-orange-300">
                          Only send {selectedCrypto} on the {selectedNetwork.charAt(0).toUpperCase() + selectedNetwork.slice(1)} network to this address. This EVM-compatible address works across all supported chains.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {manageView === "send" && (
                <div className="border-2 border-orange-200 dark:border-orange-900 bg-orange-50 dark:bg-orange-950/20 rounded-3xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-gray-900 dark:text-white">Send {selectedCrypto}</h4>
                  </div>

                  <div className="space-y-2">
                    <Label>Select Blockchain Network</Label>
                    <Select value={sendNetwork} onValueChange={setSendNetwork}>
                      <SelectTrigger className="bg-white dark:bg-gray-950">
                        <SelectValue>
                          <div className="flex items-center space-x-2">
                            <img src={getNetworkIcon(sendNetwork)} alt={sendNetwork} className="w-5 h-5" />
                            <span>{getNetworkName(sendNetwork)}</span>
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ethereum">
                          <div className="flex items-center space-x-2">
                            <img src={ethLogo} alt="Ethereum" className="w-5 h-5" />
                            <span>Ethereum</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="polygon">
                          <div className="flex items-center space-x-2">
                            <img src={polygonLogo} alt="Polygon" className="w-5 h-5" />
                            <span>Polygon</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="arbitrum">
                          <div className="flex items-center space-x-2">
                            <img src={arbitrumLogo} alt="Arbitrum" className="w-5 h-5" />
                            <span>Arbitrum</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="optimism">
                          <div className="flex items-center space-x-2">
                            <img src={optimismLogo} alt="Optimism" className="w-5 h-5" />
                            <span>Optimism</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="base">
                          <div className="flex items-center space-x-2">
                            <img src={baseLogo} alt="Base" className="w-5 h-5" />
                            <span>Base</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Amount ({selectedCrypto})</Label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={sendAmt}
                      onChange={(e) => setSendAmt(e.target.value)}
                      className="text-lg"
                    />
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-3xl">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">Available</p>
                      <p className="text-sm font-mono text-gray-900 dark:text-white">
                        {userWallet.balance[selectedCrypto]?.toFixed(2) || 0} {selectedCrypto}
                      </p>
                    </div>
                    {sendAmt && parseFloat(sendAmt) > 0 && (
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200 dark:border-gray-800">
                        <p className="text-sm text-muted-foreground">After</p>
                        <p className="text-sm font-mono text-gray-900 dark:text-white">
                          {((userWallet.balance[selectedCrypto] || 0) - parseFloat(sendAmt)).toFixed(2)} {selectedCrypto}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Destination Address</Label>
                    <Input
                      placeholder="0x..."
                      value={sendAddr}
                      onChange={(e) => setSendAddr(e.target.value)}
                      className="font-mono text-sm bg-white dark:bg-gray-950"
                    />
                  </div>

                  {sendAmt && parseFloat(sendAmt) > (userWallet.balance[selectedCrypto] || 0) && (
                    <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-3xl border border-red-200 dark:border-red-900">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                        <p className="text-sm text-red-700 dark:text-red-300">
                          Insufficient balance
                        </p>
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={doSend}
                    disabled={
                      !sendAmt ||
                      !sendAddr ||
                      parseFloat(sendAmt) > (userWallet.balance[selectedCrypto] || 0)
                    }
                    className="bg-[#1E88E5] text-white hover:bg-[#1565C0] transition-all duration-200 disabled:bg-[#43586C] disabled:text-[#798A9B] disabled:opacity-70 w-full rounded-full"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send {sendAmt || "0"} {selectedCrypto}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
                </div>
              )}
            </div>
          )}

          {/* Transactions Section */}
          {userActiveSection === "transactions" && (
            <div className="space-y-6">
              <div>
                <h2 className="flex items-center gap-2">
                  <FileText className="w-6 h-6 text-[#07D7FF]" />
                  Transactions
                </h2>
                <p className="text-muted-foreground">
                  View your complete payment history
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>All Transactions</CardTitle>
                  <CardDescription>
                    Your complete payment history across all merchants
                  </CardDescription>
                </CardHeader>
          <CardContent>
            {/* Desktop Table */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Merchant</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Chain</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userTransactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell>
                        {new Date(tx.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{tx.merchant}</TableCell>
                      <TableCell>{tx.description}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <CryptoIcon symbol={tx.currency} size="w-5 h-5" />
                          <span>
                            {tx.amount.toFixed(2)} {tx.currency}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <ChainIcon chain={tx.chain} size="w-5 h-5" />
                          <span className="capitalize">{tx.chain}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className="rounded-full"
                          variant={
                            tx.status === "completed" ? "default" : "secondary"
                          }
                        >
                          {tx.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-full"
                            onClick={() => {
                              window.open(
                                getExplorerUrl(tx.chain, tx.txHash),
                                "_blank"
                              );
                            }}
                          >
                            <ExternalLink className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-full"
                            onClick={() =>
                              toast("Receipt downloaded!")
                            }
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Receipt
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {userTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="border rounded-3xl p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p>{tx.merchant}</p>
                      <p className="text-sm text-muted-foreground">
                        {tx.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(tx.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge
                      className="rounded-full"
                      variant={
                        tx.status === "completed" ? "default" : "secondary"
                      }
                    >
                      {tx.status}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center space-x-2">
                      <CryptoIcon symbol={tx.currency} size="w-5 h-5" />
                      <span>
                        {tx.amount.toFixed(2)} {tx.currency}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ChainIcon chain={tx.chain} size="w-5 h-5" />
                      <span className="text-sm capitalize">{tx.chain}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 rounded-full"
                      onClick={() => {
                        window.open(
                          getExplorerUrl(tx.chain, tx.txHash),
                          "_blank"
                        );
                      }}
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      View Tx
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 rounded-full"
                      onClick={() => toast("Receipt downloaded!")}
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Receipt
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
            </div>
          )}

          {/* Settings Section */}
          {userActiveSection === "settings" && (
            <div className="space-y-6">
              <div>
                <h2 className="flex items-center gap-2">
                  <Settings className="w-6 h-6 text-[#07D7FF]" />
                  Settings
                </h2>
                <p className="text-muted-foreground">
                  Manage your account preferences and security
                </p>
              </div>

              {/* Account Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Account Details</CardTitle>
                  <CardDescription>Your login information and account status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-[#43586C]">
                      <div>
                        <p className="text-sm text-muted-foreground">Login Method</p>
                        <p className="text-gray-900 dark:text-white">{userLoginMethod}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400 rounded-full">
                        Connected
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-[#43586C]">
                      <div>
                        <p className="text-sm text-muted-foreground">Wallet Address</p>
                        <p className="text-gray-900 dark:text-white font-mono text-sm">{formatAddress(userWallet.address)}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(userWallet.address)}
                        className="rounded-full"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Logout */}
              <Card>
                <CardHeader>
                  <CardTitle>Account Actions</CardTitle>
                  <CardDescription>Manage your session and account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      onClick={handleUserLogout}
                      className="w-full rounded-full border-[#DD6B6B] text-[#DD6B6B] hover:bg-[#DD6B6B] hover:text-white min-h-12"
                    >
                      <LogOut className="w-[18px] h-[18px] mr-2" />
                      Logout
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Transactions Section */}
          {userActiveSection === "transactions" && (
            <div className="space-y-6">
              <div>
                <h2 className="flex items-center gap-2">
                  <FileText className="w-6 h-6 text-[#07D7FF]" />
                  Transactions
                </h2>
                <p className="text-muted-foreground">
                  Your complete payment history
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>All Payments</CardTitle>
                  <CardDescription>
                    Your payment history across all merchants
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Desktop Table */}
                  <div className="hidden md:block">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Merchant</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Chain</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {userTransactions.map((tx) => (
                          <TableRow key={tx.id}>
                            <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
                            <TableCell>{tx.merchant}</TableCell>
                            <TableCell>{tx.description}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <CryptoIcon symbol={tx.currency} size="w-5 h-5" />
                                <span>
                                  {tx.amount.toFixed(2)} {tx.currency}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <ChainIcon chain={tx.chain} size="w-5 h-5" />
                            </TableCell>
                            <TableCell>
                              <Badge className="rounded-full" variant={tx.status === "completed" ? "default" : "secondary"}>
                                {tx.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="rounded-full"
                                  onClick={() => window.open(getExplorerUrl(tx.chain, tx.txHash), "_blank")}
                                >
                                  <ExternalLink className="w-4 h-4 mr-1" />
                                  View
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="md:hidden space-y-4">
                    {userTransactions.map((tx) => (
                      <div key={tx.id} className="border rounded-3xl p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <p>{tx.merchant}</p>
                            <p className="text-sm text-muted-foreground">{tx.description}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(tx.date).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge className="rounded-full" variant={tx.status === "completed" ? "default" : "secondary"}>
                            {tx.status}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t">
                          <div className="flex items-center space-x-2">
                            <CryptoIcon symbol={tx.currency} size="w-5 h-5" />
                            <span>
                              {tx.amount.toFixed(2)} {tx.currency}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <ChainIcon chain={tx.chain} size="w-5 h-5" />
                            <span className="text-sm capitalize">{tx.chain}</span>
                          </div>
                        </div>

                        <div className="flex space-x-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 rounded-full"
                            onClick={() => window.open(getExplorerUrl(tx.chain, tx.txHash), "_blank")}
                          >
                            <ExternalLink className="w-4 h-4 mr-1" />
                            View Tx
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>

        {/* Mobile Bottom Navigation (End User) */}
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-[#303030] border-t border-[#43586C] md:hidden shadow-md">
          <div className="flex items-center justify-around h-20 px-2">
            <button
              onClick={() => setUserActiveSection("overview")}
              className={`flex flex-col items-center justify-center min-w-[64px] h-16 px-3 rounded-full transition-all duration-200 ${
                userActiveSection === "overview"
                  ? "bg-[#07D7FF]/12 text-[#07D7FF]"
                  : "text-[#798A9B] hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
              }`}
            >
              <Activity className="w-6 h-6 mb-1" />
              <span className="text-[12px] font-medium leading-none">Overview</span>
            </button>

            <button
              onClick={() => setUserActiveSection("wallet")}
              className={`flex flex-col items-center justify-center min-w-[64px] h-16 px-3 rounded-full transition-all duration-200 ${
                userActiveSection === "wallet"
                  ? "bg-[#07D7FF]/12 text-[#07D7FF]"
                  : "text-[#798A9B] hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
              }`}
            >
              <Wallet className="w-6 h-6 mb-1" />
              <span className="text-[12px] font-medium leading-none">Wallet</span>
            </button>

            <button
              onClick={() => setUserActiveSection("transactions")}
              className={`flex flex-col items-center justify-center min-w-[64px] h-16 px-3 rounded-full transition-all duration-200 ${
                userActiveSection === "transactions"
                  ? "bg-[#07D7FF]/12 text-[#07D7FF]"
                  : "text-[#798A9B] hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
              }`}
            >
              <FileText className="w-6 h-6 mb-1" />
              <span className="text-[12px] font-medium leading-none">Transactions</span>
            </button>

            <button
              onClick={() => setUserActiveSection("settings")}
              className={`flex flex-col items-center justify-center min-w-[64px] h-16 px-3 rounded-full transition-all duration-200 ${
                userActiveSection === "settings"
                  ? "bg-[#07D7FF]/12 text-[#07D7FF]"
                  : "text-[#798A9B] hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
              }`}
            >
              <Settings className="w-6 h-6 mb-1" />
              <span className="text-[12px] font-medium leading-none">Settings</span>
            </button>
          </div>
        </nav>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "admin":
        return <AdminDashboard />;
      case "links":
        return <PaymentLinksDashboard 
          paymentLinks={paymentLinks}
          onDeleteLink={handleDeleteLink}
          onDeactivateLink={handleDeactivateLink}
          onCopyLink={(linkId) => copyToClipboard(`${window.location.origin}/#/pay/${linkId}`)}
          onViewLink={handlePaymentLinkClick}
          showPaymentLinkDialog={showPaymentLinkDialog}
          setShowPaymentLinkDialog={setShowPaymentLinkDialog}
        />;
      case "wallet":
        return <WalletManagement />;
      case "wallets":
        return <WalletManagement />;
      case "team":
        return <TeamManagement />;
      case "reports":
        return <ReportsAndAnalytics />;
      case "api":
        return <APIConfiguration />;
      case "webhooks":
        return <WebhookManagement />;
      case "quickstart":
        return <QuickStartGuide onBack={() => setActiveTab("documents")} />;
      case "apireference":
        return <APIReference onBack={() => setActiveTab("documents")} />;
      case "codeexamples":
        return <CodeExamples onBack={() => setActiveTab("documents")} />;
      case "documents":
        return <DocumentsPage 
          onNavigateToDoc={(doc) => {
            if (doc === 'quickstart') {
              setActiveTab('quickstart');
            } else if (doc === 'api-reference') {
              setActiveTab('apireference');
            } else if (doc === 'code-examples') {
              setActiveTab('codeexamples');
            }
          }} 
        />;
      case "settings":
        return (
          <MerchantSettings 
            initialConfig={{
              merchantId: merchantConfig.merchantId,
              acceptedPayments: merchantConfig.acceptedPayments.map(payment => ({
                token: payment.token,
                chains: payment.chains.map(chain => chain.charAt(0).toUpperCase() + chain.slice(1).toLowerCase())
              }))
            }}
            onSave={(newConfig) => {
              setMerchantConfig(newConfig);
              toast.success("Payment settings updated successfully");
            }}
          />
        );
      case "profile":
        return (
          <MerchantProfile 
            onSave={(profile) => {
              console.log("Profile saved:", profile);
            }}
          />
        );
      case "security":
        return (
          <SecuritySettings 
            onSave={(settings) => {
              console.log("Security settings saved:", settings);
            }}
          />
        );
      case "checkout":
        return <CustomerCheckout />;
      case "userdashboard":
        return isUserLoggedIn ? <UserDashboard /> : <UserLogin />;
      default:
        return <AdminDashboard />;
    }
  };

  // Render standalone documentation pages without merchant navigation
  if (isStandalonePage) {
    if (activeTab === 'quickstart') {
      return <QuickStartPage />;
    } else if (activeTab === 'apireference') {
      return <APIReferencePage />;
    } else if (activeTab === 'codeexamples') {
      return <CodeExamplesPage />;
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] overflow-x-hidden">
      {/* Navigation Rail (Desktop Only) - Hide for checkout and user dashboard */}
      {activeTab !== "checkout" && activeTab !== "userdashboard" && (
        <NavigationRail 
          activeTab={activeTab === "admin" ? "dashboard" : activeTab}
          onNavigate={setActiveTab}
          isExpanded={isNavRailExpanded}
          onExpandedChange={setIsNavRailExpanded}
        />
      )}

      {/* Content Area - Shifts right on desktop to account for nav rail */}
      <div 
        className={`${
          activeTab !== "checkout" && activeTab !== "userdashboard" 
            ? isNavRailExpanded ? "md:pl-64" : "md:pl-20"
            : ""
        }`}
        style={{transition: 'padding-left 1500ms ease-out'}}
      >
        {activeTab !== "checkout" && activeTab !== "userdashboard" && (
          <div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setActiveTab("admin")}
                  className="cursor-pointer transition-opacity hover:opacity-80 md:hidden"
                  aria-label="Go to Dashboard"
                >
                  <img
                    src={darkMode ? pymstrLogoLight : pymstrLogo}
                    alt="PYMSTR"
                    className="h-8"
                  />
                </button>
              </div>

              {/* ========================================
                  MOBILE MENU #3: AVATAR MENU
                  
                  Location: Top-right header, avatar dropdown
                  Trigger: Clicking the avatar image
                  Content: Quick access to Wallets, Team, Settings, Documents, Account, Security, Legal, Help, End User View, Logout
                  Purpose: User-specific quick actions
                  DO NOT CONFUSE WITH: Three Dots Menu (bottom nav "More") or Footer (bottom navigation bar)
                  ======================================== */}
              <div className="flex md:hidden items-center gap-3 ml-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleDarkMode}
                  className="text-gray-600 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 dark:border-gray-700 rounded-full p-2"
                >
                  {darkMode ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 p-1 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] rounded-full transition-colors duration-200 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E88E5]">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={profileImage} alt="John Doe" />
                        <AvatarFallback className="text-white bg-[#07D7FF]">
                          JD
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-[#262626] rounded-xl p-2">
                    <div className="px-3 py-2 border-b border-[#43586C] mb-2">
                      <p className="text-sm text-gray-900 dark:text-white">John Doe</p>
                      <p className="text-xs text-muted-foreground">
                        john@pymstr.com
                      </p>
                    </div>
                    <DropdownMenuItem
                      className="cursor-pointer rounded-lg h-10 px-3"
                      onClick={() => setActiveTab("profile")}
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer rounded-lg h-10 px-3"
                      onClick={() => setActiveTab("security")}
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      <span>Security</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer rounded-lg h-10 px-3"
                      onClick={() => setActiveTab("wallets")}
                    >
                      <Wallet className="mr-2 h-4 w-4" />
                      <span>Wallets</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer rounded-lg h-10 px-3"
                      onClick={() => setActiveTab("team")}
                    >
                      <Users className="mr-2 h-4 w-4" />
                      <span>Team</span>
                    </DropdownMenuItem>
                    <div className="h-px bg-[#43586C] my-2" />
                    <DropdownMenuItem
                      className="cursor-pointer rounded-lg h-10 px-3"
                      onClick={() => setActiveTab("documents")}
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      <span>Documents</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer rounded-lg h-10 px-3"
                      onClick={() => toast("Legal documents opened")}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      <span>Legal</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer rounded-lg h-10 px-3"
                      onClick={() => toast("Help center opened")}
                    >
                      <HelpCircle className="mr-2 h-4 w-4" />
                      <span>Help</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer rounded-lg h-10 px-3"
                      onClick={() => setActiveTab("userdashboard")}
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>End User View</span>
                    </DropdownMenuItem>
                    <div className="h-px bg-[#43586C] my-2" />
                    <DropdownMenuItem
                      className="cursor-pointer rounded-lg h-10 px-3 text-[#DD6B6B]"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Desktop - Only User Menu (Navigation moved to rail) */}
              <div className="hidden md:flex items-center space-x-8 ml-auto">

                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleDarkMode}
                    className="text-gray-600 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 dark:border-gray-700 rounded-full"
                  >
                    {darkMode ? (
                      <Sun className="w-4 h-4" />
                    ) : (
                      <Moon className="w-4 h-4" />
                    )}
                  </Button>

                  {/* User Avatar Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger className="relative h-10 w-10 rounded-full p-0 hover:bg-gray-100 dark:hover:bg-gray-800 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25d366] transition-all cursor-pointer">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={profileImage} alt="John Doe" />
                        <AvatarFallback
                          className="text-white bg-[#757575]"
                        >
                          JD
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-56 rounded-3xl"
                      align="end"
                    >
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-gray-900 dark:text-white">
                            John Doe
                          </p>
                          <p className="text-muted-foreground">
                            john@pymstr.com
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="cursor-pointer rounded-full mx-1"
                        onClick={() => setActiveTab("profile")}
                      >
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer rounded-full mx-1"
                        onClick={() => setActiveTab("security")}
                      >
                        <Shield className="mr-2 h-4 w-4" />
                        <span>Security</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer rounded-full mx-1"
                        onClick={() => setActiveTab("wallets")}
                      >
                        <Wallet className="mr-2 h-4 w-4" />
                        <span>Wallets</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer rounded-full mx-1"
                        onClick={() => setActiveTab("team")}
                      >
                        <Users className="mr-2 h-4 w-4" />
                        <span>Team</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="cursor-pointer rounded-full mx-1"
                        onClick={() => setActiveTab("documents")}
                      >
                        <BookOpen className="mr-2 h-4 w-4" />
                        <span>Documents</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer rounded-full mx-1"
                        onClick={() =>
                          toast("Legal documents opened")
                        }
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Legal</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer rounded-full mx-1"
                        onClick={() =>
                          toast("Help center opened")
                        }
                      >
                        <HelpCircle className="mr-2 h-4 w-4" />
                        <span>Help</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer rounded-full mx-1"
                        onClick={() => setActiveTab("userdashboard")}
                      >
                        <User className="mr-2 h-4 w-4" />
                        <span>End User View</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="cursor-pointer rounded-full mx-1 text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Mobile Navigation - Hidden (replaced by bottom nav) */}
              <Sheet
                open={isMobileMenuOpen}
                onOpenChange={setIsMobileMenuOpen}
              >
                <SheetTrigger className="hidden">
                  <Menu className="h-5 w-5" />
                </SheetTrigger>
                <SheetContent side="right" className="w-64">
                  <SheetHeader className="sr-only">
                    <SheetTitle>Navigation Menu</SheetTitle>
                    <SheetDescription>
                      Main navigation and user menu
                    </SheetDescription>
                  </SheetHeader>

                  {/* User Profile Section in Mobile Menu */}
                  <div className="px-3 pt-4 pb-3 border-b">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={profileImage} alt="John Doe" />
                        <AvatarFallback
                          className="text-white bg-[#757575]"
                        >
                          JD
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 dark:text-white truncate">
                          John Doe
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          john@pymstr.com
                        </p>
                      </div>
                    </div>
                  </div>

                  <nav className="flex flex-col space-y-1 px-2 pt-2">
                    <button
                      onClick={() => {
                        setActiveTab("admin");
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-left py-2 px-3 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800 rounded-lg"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab("links");
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-left py-2 px-3 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800 rounded-lg"
                    >
                      Links
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab("wallet");
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-left py-2 px-3 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800 rounded-lg"
                    >
                      Wallet
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab("team");
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-left py-2 px-3 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800 rounded-lg"
                    >
                      Team
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab("reports");
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-left py-2 px-3 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800 rounded-lg"
                    >
                      Reports
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab("api");
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-left py-2 px-3 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800 rounded-lg"
                    >
                      API
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab("webhooks");
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-left py-2 px-3 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800 rounded-lg"
                    >
                      Webhooks
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab("checkout");
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-left py-2 px-3 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800 rounded-lg"
                    >
                      Checkout
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab("userdashboard");
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-left py-2 px-3 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800 rounded-lg"
                    >
                      E-User
                    </button>

                    <div className="border-t pt-2 mt-2 space-y-1">
                      <button
                        onClick={() => {
                          setActiveTab("profile");
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-left py-2 px-3 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg w-full flex items-center space-x-2"
                      >
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab("security");
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-left py-2 px-3 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg w-full flex items-center space-x-2"
                      >
                        <Shield className="w-4 h-4" />
                        <span>Security</span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab("wallets");
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-left py-2 px-3 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg w-full flex items-center space-x-2"
                      >
                        <Wallet className="w-4 h-4" />
                        <span>Wallets</span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab("settings");
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-left py-2 px-3 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg w-full flex items-center space-x-2"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Payment Settings</span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab("userdashboard");
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-left py-2 px-3 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg w-full flex items-center space-x-2"
                      >
                        <User className="w-4 h-4" />
                        <span>End User View</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          toast("Legal documents opened");
                        }}
                        className="text-left py-2 px-3 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg w-full flex items-center space-x-2"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Legal</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          toast("Help center opened");
                        }}
                        className="text-left py-2 px-3 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg w-full flex items-center space-x-2"
                      >
                        <HelpCircle className="w-4 h-4" />
                        <span>Help</span>
                      </button>

                      <button
                        onClick={() => {
                          toggleDarkMode();
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-left py-2 px-3 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg w-full flex items-center space-x-2"
                      >
                        {darkMode ? (
                          <Sun className="w-4 h-4" />
                        ) : (
                          <Moon className="w-4 h-4" />
                        )}
                        <span>
                          {darkMode
                            ? "Light Mode"
                            : "Dark Mode"}
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-left py-2 px-3 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg w-full flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
              </div>
            </div>
          </div>
        )}

        <main className={`${activeTab !== "checkout" && activeTab !== "userdashboard" ? "pb-24 md:pb-6" : ""}`}>
          {renderContent()}
        </main>
      </div>

      {/* ========================================
          MOBILE MENU #2: FOOTER (Bottom Navigation Bar)
          
          Location: Fixed bottom of screen
          Content: Dashboard, Wallets, Reports, More (4 tabs)
          Purpose: Main navigation on mobile
          DO NOT CONFUSE WITH: Three Dots Menu (More menu) or Avatar Menu (top right)
          ======================================== */}
      {activeTab !== "checkout" && activeTab !== "userdashboard" && (
        <BottomNavigation 
          activeTab={activeTab === "admin" ? "dashboard" : activeTab}
          onNavigate={setActiveTab}
        />
      )}

      {/* QR Code Funding Dialog - Responsive Design */}
      <Dialog open={showQRFunding} onOpenChange={setShowQRFunding}>
        <DialogContent className="sm:max-w-md p-0 gap-0">
          <div className="p-4 sm:p-6">
            <DialogHeader className="mb-4">
              <DialogTitle>
                {qrFundingBalance >= parseFloat(calculateCryptoAmount(currentPayment?.price || 156.78, selectedCrypto))
                  ? "Funds Received"
                  : "Scan to Add Funds"}
              </DialogTitle>
              <DialogDescription className="text-xs">
                {qrFundingBalance >= parseFloat(calculateCryptoAmount(currentPayment?.price || 156.78, selectedCrypto))
                  ? "Your wallet is funded and ready"
                  : `Send ${selectedCrypto} to complete payment`}
              </DialogDescription>
            </DialogHeader>
            
            {/* Always Show QR Code & Address Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Left Column: QR Code */}
                <div className="flex flex-col items-center justify-center p-4 border rounded-3xl bg-[#EEEEEE] dark:bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="bg-white p-3 rounded-3xl border-2 border-gray-200 mb-3">
                    <QRCodeCanvas 
                      value="0x742d35cc6af4b1e2b6b265c3e2f3b4d123456789"
                      size={140}
                      level="H"
                      includeMargin={false}
                    />
                  </div>
                  <Badge 
                    className="rounded-full text-xs mb-3 bg-[#FF5913] text-white"
                  >
                    {selectedCrypto} · {getChainName(selectedChain)}
                  </Badge>
                  
                  {/* Wallet Address - Compact */}
                  <div className="w-full p-3 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <code className="text-xs truncate flex-1 mr-2">
                        0x742d35cc6af4b1e2b6b265c3e2f3b4d123456789
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="rounded-full h-7 w-7 p-0 shrink-0"
                        onClick={() => {
                          copyToClipboard("0x742d35cc6af4b1e2b6b265c3e2f3b4d123456789");
                          toast("Address copied!");
                        }}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Right Column: Balance & Status */}
                <div className="flex flex-col justify-between space-y-3">
                  {/* Balance Card */}
                  <div className={`p-4 border rounded-3xl transition-colors ${
                    qrFundingBalance >= parseFloat(calculateCryptoAmount(currentPayment?.price || 156.78, selectedCrypto))
                      ? "border-green-500 bg-green-50 dark:border-green-400 dark:bg-green-950/50"
                      : qrFundingBalance > 0
                      ? "border-amber-500 bg-amber-50 dark:border-amber-400 dark:bg-amber-950/50"
                      : "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/50"
                  }`}>
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs text-muted-foreground">Balance</span>
                      {qrFundingBalance >= parseFloat(calculateCryptoAmount(currentPayment?.price || 156.78, selectedCrypto)) ? (
                        <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                      ) : qrFundingBalance > 0 ? (
                        <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      ) : null}
                    </div>
                    <div className="text-2xl mb-1">
                      {qrFundingBalance.toFixed(2)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {selectedCrypto}
                    </div>
                  </div>

                  {/* Progress Section - Always Show */}
                  <div className="p-4 border rounded-3xl bg-[#EEEEEE] dark:bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Required</span>
                      <span className="font-medium">
                        {parseFloat(calculateCryptoAmount(currentPayment?.price || 156.78, selectedCrypto)).toFixed(2)} {selectedCrypto}
                      </span>
                    </div>
                    
                    <div className={`w-full rounded-full h-2 overflow-hidden ${
                      qrFundingBalance >= parseFloat(calculateCryptoAmount(currentPayment?.price || 156.78, selectedCrypto))
                        ? "bg-green-200 dark:bg-green-900/30"
                        : qrFundingBalance > 0 && qrFundingBalance < parseFloat(calculateCryptoAmount(currentPayment?.price || 156.78, selectedCrypto))
                        ? "bg-red-200 dark:bg-red-900/30"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}>
                      <div 
                        className="h-full transition-all duration-200 rounded-full"
                        style={{
                          width: `${Math.min((qrFundingBalance / parseFloat(calculateCryptoAmount(currentPayment?.price || 156.78, selectedCrypto))) * 100, 100)}%`,
                          backgroundColor: qrFundingBalance >= parseFloat(calculateCryptoAmount(currentPayment?.price || 156.78, selectedCrypto))
                            ? "#22c55e"
                            : qrFundingBalance > 0 && qrFundingBalance < parseFloat(calculateCryptoAmount(currentPayment?.price || 156.78, selectedCrypto))
                            ? "#ef4444"
                            : "#FF5914"
                        }}
                      />
                    </div>
                    
                    {/* Show status text based on balance */}
                    {qrFundingBalance > 0 && qrFundingBalance < parseFloat(calculateCryptoAmount(currentPayment?.price || 156.78, selectedCrypto)) ? (
                      <p className="text-xs text-center text-red-600 dark:text-red-400">
                        Need {(parseFloat(calculateCryptoAmount(currentPayment?.price || 156.78, selectedCrypto)) - qrFundingBalance).toFixed(2)} {selectedCrypto} more
                      </p>
                    ) : qrFundingBalance === 0 ? (
                      <p className="text-xs text-center text-muted-foreground">
                        Waiting for deposit...
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>

            {/* Action Buttons */}
            <div className="mt-4 space-y-2">
              <Button
                className="w-full rounded-full min-h-12 bg-[#1E88E5] text-white hover:bg-[#1565C0] transition-all duration-200"
                disabled={isCheckingFunds}
                onClick={handleCheckFunds}
              >
                {isCheckingFunds ? (
                  <span className="flex items-center justify-center gap-2">
                    Check for Funds
                    <span className="inline-flex gap-0.5">
                      <span className="animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1s' }}>.</span>
                      <span className="animate-bounce" style={{ animationDelay: '150ms', animationDuration: '1s' }}>.</span>
                      <span className="animate-bounce" style={{ animationDelay: '300ms', animationDuration: '1s' }}>.</span>
                    </span>
                  </span>
                ) : (
                  "Check for Funds"
                )}
              </Button>

              {/* Test Buttons - Collapsible */}
              <details className="group">
                <summary className="text-xs text-center text-muted-foreground cursor-pointer hover:text-foreground transition-colors list-none flex items-center justify-center gap-1">
                  <span>Test Mode</span>
                  <ChevronDown className="w-3 h-3 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="space-y-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full rounded-full"
                    onClick={() => {
                      const requiredAmount = parseFloat(calculateCryptoAmount(currentPayment?.price || 156.78, selectedCrypto));
                      setQrFundingBalance(requiredAmount);
                    }}
                  >
                    Simulate Funds Received
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full rounded-full"
                    onClick={() => {
                      const requiredAmount = parseFloat(calculateCryptoAmount(currentPayment?.price || 156.78, selectedCrypto));
                      // Set to 60% of required amount
                      setQrFundingBalance(requiredAmount * 0.6);
                    }}
                  >
                    Simulate Not Enough Funds
                  </Button>
                </div>
              </details>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Toaster />
    </div>
  );
};

export default App;