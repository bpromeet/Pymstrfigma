import React, { useState, useEffect, useRef, useCallback } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { truncateAddress } from "./utils/address";
import { copyToClipboard } from "./utils/clipboard";
import { PaymentSuccessScreen } from "./components/checkout/PaymentSuccessScreen";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
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
} from "./components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import {
  AlertCircle,
  Copy,
  Check,
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
  Search,
  X,
  QrCode,
  CreditCard,
  ArrowLeft,
  Plus,
  Clock,
  Edit,
  Send,
  Download,
  ArrowDownToLine,
  Coins,
  Settings,
  Bell,
  Moon,
  Sun,
  ChevronDown,
  User,
  HelpCircle,
  LogOut,
  FileText,
  Key,
  RefreshCw,
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
import { formatPrice } from "./utils/currency";
import SearchField from "./components/SearchField";
import DateField from "./components/DateField";
import ReportsTransactionTable from "./components/ReportsTransactionTable";
import { ChainIcon } from "./components/ChainIcon";
import { CryptoIcon } from "./components/CryptoIcon";
import { MetaMaskLogo, WalletConnectLogo, CoinbaseLogo, GoogleLogo, TwitterLogo, GithubLogo } from "./components/WalletLogos";
import PymstrLogo from "./components/PymstrLogo";
import PaymentLinkForm from "./components/PaymentLinkForm";
import APIKeyManagement from "./components/APIKeyManagement";
import QuickStartGuide from "./components/QuickStartGuide";
import APIReference from "./components/APIReference";
import CodeExamples from "./components/CodeExamples";
import MerchantProfile from "./components/MerchantProfile";
import EndUserBuyPage from "./components/EndUserBuyPage";
import EndUserSendPage from "./components/EndUserSendPage";
import EndUserReceivePage from "./components/EndUserReceivePage";
import { CheckoutFlow } from "./components/checkout/CheckoutFlow";

// Avatar images - YOUR provided pictures stored in /public/
const merchantAvatar = "/merchant-avatar.png"; // Your picture: Woman with glasses
const endUserAvatar = "/enduser-avatar.png";   // Your picture: Man with dark hair

import QuickStartPage from "./pages/QuickStartPage";
import APIReferencePage from "./pages/APIReferencePage";
import CodeExamplesPage from "./pages/CodeExamplesPage";
import DocumentsPage from "./pages/DocumentsPage";
import DashboardPage from "./pages/DashboardPage";
import PaymentLinksPage from "./pages/PaymentLinksPage";
import { TransactionsPage } from "./pages/TransactionsPage";
import ReportsPage from "./pages/ReportsPage";
import WalletsPage from "./pages/WalletsPage";
import TeamManagementPage from "./pages/TeamManagementPage";
import APIKeysPage from "./pages/APIKeysPage";
import { NavigationRail, type NavigationItem } from "./components/NavigationRail";
import WebhooksPage from "./components/WebhookManagement";
import PageLayout from "./components/PageLayout";
import { WalletMainActionButton } from "./components/WalletMainActionButton";
import {
  NetworkSelector,
  type NetworkOption,
} from "./components/NetworkSelector";
import {
  CryptoSelector,
  type CryptoOption,
  type CryptoSelectorOption,
} from "./components/CryptoSelector";
import { ManageCoin } from "./components/ManageCoin";
import { BottomNavigation, type BottomNavItem } from "./components/BottomNavigation";
import { Scale, Receipt, MoreHorizontal, Building2 } from "lucide-react";
import UserDashboardPage from "./pages/UserDashboardPage";
import EndUserDashboardPage from "./pages/EndUserDashboardPage";
import EndUserWalletsPage from "./pages/EndUserWalletsPage";
import EndUserTransactionsPage from "./pages/EndUserTransactionsPage";
import EndUserSettingsPage from "./pages/EndUserSettingsPage";
import HelpPage from "./pages/HelpPage";
import LegalPage from "./pages/LegalPage";
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
  // Initialize activeTab based on hash (for dev mode)
  const getInitialTab = () => {
    const hash = window.location.hash.toLowerCase();
    if (hash === "#/dev" || hash === "#/dashboard") return "admin";
    return "admin";
  };
  
  const [activeTab, setActiveTab] = useState(getInitialTab());
  const [isStandalonePage, setIsStandalonePage] =
    useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  
  // Scroll-hide header state (MD3 modern UX pattern)
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollYRef = useRef(0);
  const [showWeb3Auth, setShowWeb3Auth] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState("USDC");
  const [selectedChain, setSelectedChain] =
    useState("ethereum");
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(() => {
    const saved = localStorage.getItem('isUserLoggedIn');
    return saved === 'true';
  });
  const [userLoginMethod, setUserLoginMethod] = useState(() => {
    return localStorage.getItem('userLoginMethod') || '';
  });
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
  const [checkFundsClickCount, setCheckFundsClickCount] =
    useState(0);
  const [autoCheckTriggered, setAutoCheckTriggered] = useState(false);
  const [fundsReceived, setFundsReceived] = useState(false);
  const [showOnRamper, setShowOnRamper] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  
  const [paymentLinks, setPaymentLinks] = useState(
    INITIAL_PAYMENT_LINKS,
  );
  const [paymentLinksTab, setPaymentLinksTab] = useState("all");
  const [chainFilter, setChainFilter] = useState("all");
  const [currencyFilter, setCurrencyFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPayment, setCurrentPayment] = useState(null);
  const [showPaymentLinkDialog, setShowPaymentLinkDialog] =
    useState(false);
  const paymentLinksRef = useRef(paymentLinks);
  
  // Sync ref with state
  useEffect(() => {
    paymentLinksRef.current = paymentLinks;
  }, [paymentLinks]);
  
  const [isNavRailExpanded, setIsNavRailExpanded] =
    useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem("pymstr-theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }
    // Fallback to system preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    // Final fallback to light
    return "light";
  });

  // Theme toggle function
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("pymstr-theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Initialize theme on mount
  useEffect(() => {
    const isDark = theme === "dark";
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Initialize selectedChain and selectedCrypto from currentPayment
  useEffect(() => {
    if (currentPayment) {
      // Type assertion to access chain and currency properties
      const payment = currentPayment as any;
      
      // Set currency from payment link, or use USDC as default
      if (payment.currency) {
        setSelectedCrypto(payment.currency);
      } else {
        setSelectedCrypto("USDC");
      }
      
      // Set chain from payment link, or pick first available chain as default
      if (payment.chain) {
        setSelectedChain(payment.chain);
      } else if (payment.availableChains && payment.availableChains.length > 0) {
        setSelectedChain(payment.availableChains[0]);
      } else {
        // Fallback to ethereum if no chains specified
        setSelectedChain("ethereum");
      }
    }
  }, [currentPayment]);

  // Scroll to top when navigating between pages
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // Scroll-hide header (MD3 modern UX pattern)
  // Hides header when scrolling down, shows when scrolling up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show header when:
      // - Scrolling up (currentScrollY < lastScrollYRef.current)
      // - Near top of page (< 10px)
      if (currentScrollY < lastScrollYRef.current || currentScrollY < 10) {
        setShowHeader(true);
      } 
      // Hide header when:
      // - Scrolling down (currentScrollY > lastScrollYRef.current)
      // - Past scroll threshold (> 100px)
      else if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
        setShowHeader(false);
      }
      
      lastScrollYRef.current = currentScrollY;
    };

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto fund detection: Check for funds automatically after 20 seconds of inactivity
  useEffect(() => {
    let autoCheckTimer: NodeJS.Timeout | null = null;

    if (showQRFunding && !autoCheckTriggered && !fundsReceived) {
      // Start 10-second auto-advance timer
      autoCheckTimer = setTimeout(() => {
        // Automatically advance to payment screen after 10 seconds
        const requiredAmount = parseFloat(
          calculateCryptoAmount(
            currentPayment?.price || 156.78,
            selectedCrypto,
          ),
        );

        // Simulate blockchain check (always finds funds for demo)
        setQrFundingBalance(requiredAmount);
        
        // ✅ AUTO-ADVANCE: Skip "Funds received" state, go directly to payment form
        setShowQRFunding(false);
        setShowCryptoSelection(false);
        setShowFundingOptions(false);
        setShowPaymentForm(true);
        setAutoCheckTriggered(true);
        toast("Wallet funded successfully!");
      }, 10000); // 10 seconds auto-advance
    }

    // Cleanup timer on unmount or when dependencies change
    return () => {
      if (autoCheckTimer) {
        clearTimeout(autoCheckTimer);
      }
    };
  }, [showQRFunding, autoCheckTriggered, fundsReceived, selectedCrypto, currentPayment]);

  // Auto-redirect removed - onboarding system removed

  // URL hash routing for documentation pages and payment links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const hashLower = hash.toLowerCase();

      // DEV MODE: Direct dashboard access bypass
      if (hashLower === "#/dev") {
        setActiveTab("admin");
        setIsStandalonePage(false);
        return;
      }

      // Handle payment links first (#/pay/*)
      if (hash.startsWith("#/pay/")) {
        const paymentId = hash.replace("#/pay/", "");
        const payment = paymentLinksRef.current.find(
          (link) => link.id === paymentId,
        );

        if (payment && payment.status === "active") {
          // ✅ CRITICAL FIX: Reset ALL screen flags FIRST before loading payment
          // This ensures checkout always starts at Screen #1 (Login) with clean state
          
          // Clear all checkout screen flags FIRST
          setShowWeb3Auth(true);  // ← Start at Login screen (new Screen #1)
          setShowCryptoSelection(false);
          setShowPaymentForm(false);
          setShowFundingOptions(false);
          setShowFundingSuccess(false);
          setShowQRFunding(false);
          setPaymentStatus("pending");
          setFundingMethod("");
          setIsCheckingFunds(false);
          setAutoCheckTriggered(false);
          setFundsReceived(false);
          setShowOnRamper(false);
          
          // Clear all user/wallet state
          setIsUserLoggedIn(false);
          setUserLoginMethod('');
          setConnectedWallet('');
          setWalletAddress('');
          
          // Clear localStorage
          localStorage.removeItem('isUserLoggedIn');
          localStorage.removeItem('userLoginMethod');
          
          // NOW set the payment details
          setCurrentPayment({
            id: payment.id,
            price: payment.price,
            description: payment.description,
            merchantName: "PYMSTR Merchant",
            baseCurrency: payment.baseCurrency,
            chain: payment.chain,
            currency: payment.currency,
            availableCurrencies:
              payment.availableCurrencies || [
                "USDC",
                "USDT",
                "EURC",
              ],
            availableChains: payment.availableChains || [
              "ethereum",
              "polygon",
              "arbitrum",
              "optimism",
              "base",
            ],
          });
          
          // Finally, activate checkout tab
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
      if (hashLower.includes("quickstart")) {
        setActiveTab("quickstart");
        setIsStandalonePage(true);
      } else if (
        hashLower.includes("api-reference") ||
        hashLower.includes("apireference")
      ) {
        setActiveTab("apireference");
        setIsStandalonePage(true);
      } else if (hashLower.includes("code-example")) {
        setActiveTab("codeexamples");
        setIsStandalonePage(true);
      } else if (hashLower.includes("documents")) {
        setActiveTab("documents");
        setIsStandalonePage(false);
      } else if (hash === "#/pay") {
        setActiveTab("checkout");
        setIsStandalonePage(false);
      } else if (hashLower === "#/dashboard") {
        setActiveTab("admin");
        setIsStandalonePage(false);
      } else if (hashLower === "#/user-dashboard") {
        setActiveTab("user-dashboard");
        setIsStandalonePage(false);
      }
      // Handle all merchant navigation pages
      else if (hashLower.startsWith("#/links") || hashLower.startsWith("#/payment-links")) {
        setActiveTab("links");
        setIsStandalonePage(false);
      } else if (hashLower === "#/wallets") {
        setActiveTab("wallets");
        setIsStandalonePage(false);
      } else if (hashLower === "#/reports") {
        setActiveTab("reports");
        setIsStandalonePage(false);
      } else if (hashLower === "#/transactions") {
        setActiveTab("transactions");
        setIsStandalonePage(false);
      } else if (hashLower.startsWith("#/api-keys") || hashLower === "#/api") {
        setActiveTab("api");
        setIsStandalonePage(false);
      } else if (hashLower === "#/webhooks") {
        setActiveTab("webhooks");
        setIsStandalonePage(false);
      } else if (hashLower === "#/team") {
        setActiveTab("team");
        setIsStandalonePage(false);
      } else if (hashLower === "#/profile") {
        setActiveTab("profile");
        setIsStandalonePage(false);
      } else if (hashLower === "#/settings") {
        setActiveTab("settings");
        setIsStandalonePage(false);
      } else if (hashLower === "#/help") {
        setActiveTab("help");
        setIsStandalonePage(false);
      } else if (hashLower === "#/legal") {
        setActiveTab("legal");
        setIsStandalonePage(false);
      }
      // Handle end user pages
      else if (hashLower === "#/user-wallets") {
        setActiveTab("user-wallets");
        setIsStandalonePage(false);
      } else if (hashLower === "#/user-send") {
        setActiveTab("user-send");
        setIsStandalonePage(false);
      } else if (hashLower === "#/user-receive") {
        setActiveTab("user-receive");
        setIsStandalonePage(false);
      } else if (hashLower === "#/user-buy") {
        setActiveTab("user-buy");
        setIsStandalonePage(false);
      } else if (hashLower === "#/user-transactions") {
        setActiveTab("user-transactions");
        setIsStandalonePage(false);
      } else if (hashLower === "#/user-settings") {
        setActiveTab("user-settings");
        setIsStandalonePage(false);
      } else if (hash === "#/" || hash === "") {
        // Default to dashboard for app.pymstr.com
        setActiveTab("admin");
        setIsStandalonePage(false);
      } else {
        // Unknown route - default to dashboard
        setActiveTab("admin");
        setIsStandalonePage(false);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () =>
      window.removeEventListener(
        "hashchange",
        handleHashChange,
      );
  }, []);

  // Wallet states
  const [wallets, setWallets] = useState(INITIAL_WALLETS);
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
  const [teamMembers, setTeamMembers] = useState(
    INITIAL_TEAM_MEMBERS,
  );
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMember, setNewMember] = useState(
    INITIAL_NEW_MEMBER,
  );
  const [showDeleteConfirm, setShowDeleteConfirm] =
    useState(false);
  const [memberToDelete, setMemberToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  // API Key states
  const [apiKeys, setApiKeys] = useState(INITIAL_API_KEYS);
  const [showCreateApiKey, setShowCreateApiKey] =
    useState(false);
  const [selectedApiKey, setSelectedApiKey] = useState<
    string | null
  >(null);
  const [newApiKey, setNewApiKey] = useState(
    INITIAL_NEW_API_KEY,
  );
  const [showApiKeySecret, setShowApiKeySecret] = useState<
    string | null
  >(null);
  const [apiKeyDetailsTab, setApiKeyDetailsTab] =
    useState("info");

  // Merchant configuration state
  const [merchantConfig, setMerchantConfig] = useState(
    INITIAL_MERCHANT_CONFIG,
  );

  // Track user context (merchant or end-user) for shared pages like Help and Legal
  // Persist to localStorage so it survives page refresh
  const [userContext, setUserContext] = useState<'merchant' | 'enduser'>(() => {
    const savedContext = localStorage.getItem('pymstr-user-context');
    return (savedContext === 'enduser' || savedContext === 'merchant') ? savedContext : 'merchant';
  });

  // End-user navigation menu items (per Guidelines.md)
  // Use unique IDs to differentiate from merchant pages
  const endUserNavItems: NavigationItem[] = [
    { id: 'user-dashboard', label: 'Dashboard', icon: Activity },
    { id: 'user-wallets', label: 'Wallets', icon: Wallet },
    { id: 'user-send', label: 'Send', icon: Send },
    { id: 'user-receive', label: 'Receive', icon: ArrowDownToLine },
    { id: 'user-buy', label: 'Buy', icon: Coins },
    { id: 'user-transactions', label: 'Transactions', icon: Receipt },
    { id: 'user-settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help', icon: HelpCircle },
    { id: 'legal', label: 'Legal', icon: Scale },
  ];

  const endUserBottomNavItems: BottomNavItem[] = [
    { id: 'user-dashboard', label: 'Dashboard', icon: Activity },
    { id: 'user-wallets', label: 'Wallets', icon: Wallet },
    { id: 'user-transactions', label: 'Transactions', icon: Receipt },
    { id: 'more', label: 'More', icon: MoreHorizontal },
  ];

  const endUserMoreItems: BottomNavItem[] = [
    { id: 'user-settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help', icon: HelpCircle },
    { id: 'legal', label: 'Legal', icon: Scale },
    { id: 'logout', label: 'Logout', icon: LogOut },
  ];

  // Persist userContext to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('pymstr-user-context', userContext);
  }, [userContext]);

  // Persist login state to localStorage
  useEffect(() => {
    localStorage.setItem('isUserLoggedIn', isUserLoggedIn.toString());
  }, [isUserLoggedIn]);

  // Persist login method to localStorage
  useEffect(() => {
    localStorage.setItem('userLoginMethod', userLoginMethod);
  }, [userLoginMethod]);

  // Custom navigation handler that tracks user context
  const handleNavigate = (tab: string) => {
    // Determine if this is an end-user navigation
    const isEndUserNav = tab.startsWith('user-') || tab === 'userdashboard';
    
    // Update user context based on the navigation
    if (isEndUserNav) {
      setUserContext('enduser');
    } else if (tab !== 'help' && tab !== 'legal' && tab !== 'checkout') {
      // If navigating to merchant pages (not shared pages), set to merchant context
      setUserContext('merchant');
    }
    // For 'help' and 'legal', keep existing context
    
    // Update URL hash instead of directly setting activeTab
    // This ensures proper navigation history and allows going back
    const hashMap: { [key: string]: string } = {
      'admin': '#/dashboard',
      'dashboard': '#/dashboard',
      'userdashboard': '#/user-dashboard',
      'quickstart': '#/quickstart',
      'apireference': '#/api-reference',
      'codeexamples': '#/code-examples',
      'documents': '#/documents',
      'checkout': '#/pay',
      'api': '#/api-keys',
      'apikeys': '#/api-keys',
    };
    
    // Use hash if mapped, otherwise use tab name directly
    const hash = hashMap[tab] || `#/${tab}`;
    window.location.hash = hash;
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

    setCurrentPayment(null);
    setSearchQuery("");
    setPaymentLinksTab("all");

    // Reset wallet states
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

    // Reset user context to merchant
    setUserContext('merchant');
    setIsUserLoggedIn(false);
    setUserLoginMethod('');

    // Clear URL hash
    window.location.hash = "";

    toast("Logged out successfully!");
  };

  // Update ref when paymentLinks changes
  useEffect(() => {
    paymentLinksRef.current = paymentLinks;
  }, [paymentLinks]);

  // Mock data
  const dashboardStats = DASHBOARD_STATS;
  const recentTransactions = RECENT_TRANSACTIONS;
  const chartData = CHART_DATA;

  const supportedCryptos = [
    {
      symbol: "USDC",
      name: "USD Coin",
      logo: <CryptoIcon symbol="USDC" size={20} />,
    },
    {
      symbol: "USDT",
      name: "Tether",
      logo: <CryptoIcon symbol="USDT" size={20} />,
    },
    {
      symbol: "EURC",
      name: "Euro Coin",
      logo: <CryptoIcon symbol="EURC" size={20} />,
    },
  ];

  const supportedChains = [
    {
      id: "ethereum",
      name: "Ethereum",
      icon: <ChainIcon chain="ethereum" size={18} />,
    },
    {
      id: "polygon",
      name: "Polygon",
      icon: <ChainIcon chain="polygon" size={18} />,
    },
    {
      id: "arbitrum",
      name: "Arbitrum",
      icon: <ChainIcon chain="arbitrum" size={18} />,
    },
    {
      id: "optimism",
      name: "Optimism",
      icon: <ChainIcon chain="optimism" size={18} />,
    },
    {
      id: "base",
      name: "Base",
      icon: <ChainIcon chain="base" size={18} />,
    },
  ];

  // Local wrapper for copyToClipboard with visual feedback
  const copyToClipboard = (
    text: string,
    tooltipId?: string,
  ) => {
    const success = copyToClipboardUtil(text);
    if (success) {
      setCopiedItem(text);
      setTimeout(() => {
        setCopiedItem(null);
      }, 2000);
    }
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

  // Handle Continue from Crypto Selection (Screen #3)
  const handleContinue = () => {
    // Check if user has sufficient balance
    if (hasSufficientBalance(selectedCrypto)) {
      // Sufficient balance - proceed directly to payment form (Screen #6)
      setShowCryptoSelection(false);
      setShowPaymentForm(true);
    } else {
      // Insufficient balance
      // For social login users (Google/Twitter/GitHub/Email): Skip funding options, go directly to QR funding
      // Only Wallet users see the funding options (with card)
      if (userLoginMethod !== 'Wallet') {
        setShowCryptoSelection(false);
        setShowQRFunding(true);
      } else {
        // For Wallet users: Show funding options (Screen #4)
        setShowCryptoSelection(false);
        setShowFundingOptions(true);
      }
    }
  };

  // Merchant config helper functions
  const isTokenChainEnabled = (
    token: string,
    chain: string,
  ): boolean => {
    const tokenConfig = merchantConfig.acceptedPayments.find(
      (p) => p.token === token,
    );
    return tokenConfig
      ? tokenConfig.chains.includes(chain.toLowerCase())
      : false;
  };

  const getAvailableChainsForToken = (
    token: string,
  ): string[] => {
    const tokenConfig = merchantConfig.acceptedPayments.find(
      (p) => p.token === token,
    );
    return tokenConfig ? tokenConfig.chains : [];
  };

  const getAvailableTokensForChain = (
    chain: string,
  ): string[] => {
    return merchantConfig.acceptedPayments
      .filter((payment) =>
        payment.chains.includes(chain.toLowerCase()),
      )
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
    
    // Cancel auto-check if user manually clicks
    setAutoCheckTriggered(true);

    // Increment click counter
    const currentClickCount = checkFundsClickCount;
    setCheckFundsClickCount(currentClickCount + 1);

    // Simulate blockchain check (2-3 seconds)
    setTimeout(() => {
      const requiredAmount = parseFloat(
        calculateCryptoAmount(
          currentPayment?.price || 156.78,
          selectedCrypto,
        ),
      );

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
        toast(
          "Funds not arrived, check again in a few seconds",
        );
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
              ? {
                  ...link,
                  status: "completed",
                  txHash: mockTxHash,
                }
              : link,
          ),
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
    linkId: string;
    price: number;
    description: string;
    status: "active";
    chain: string;
    currency: string;
    availableCurrencies: string[];
    availableChains: string[];
    expiryDate?: string;
  }) => {
    const linkWithSource = { ...newLink, source: "manual" };
    setPaymentLinks((links) => [linkWithSource, ...links]);
    setShowPaymentLinkDialog(false);
    
    toast("Payment link created successfully!");
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

    setTeamMembers((prev) => [member, ...prev]);
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

  const handleDeleteMember = (memberId: string) => {
    const member = teamMembers.find((m) => m.id === memberId);
    if (member) {
      confirmDeleteMember(member);
    }
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

  // Stable function reference to prevent chart re-renders on scroll
  const handleCreatePaymentLink = useCallback(() => {
    setActiveTab("links");
    setShowPaymentLinkDialog(true);
  }, []);

  // Checkout flow handlers
  const handleCheckoutBack = () => {
    if (paymentStatus === "completed") return; // No back button on success screen
    
    if (showFundingOptions && showQRFunding) {
      setShowQRFunding(false);
      return;
    }
    
    if (showFundingOptions && !showQRFunding) {
      setShowFundingOptions(false);
      setShowPaymentForm(true);
      return;
    }
    
    if (showPaymentForm) {
      setShowPaymentForm(false);
      setShowCryptoSelection(true);
      return;
    }
    
    if (showCryptoSelection) {
      setShowCryptoSelection(false);
      setShowWeb3Auth(true);
      return;
    }
    
    if (showWeb3Auth) {
      setShowWeb3Auth(false);
      return;
    }
    
    // Screen #1: Go back to admin/close checkout
    setActiveTab("admin");
    setCurrentPayment(null);
    setShowCryptoSelection(false);
    setShowWeb3Auth(false);
    setShowPaymentForm(false);
    setShowFundingOptions(false);
    setShowFundingSuccess(false);
    setShowQRFunding(false);
    setPaymentStatus("pending");
    setFundingMethod("");
    setWalletAddress("");
  };

  const handleSelectFundingMethod = (method: string) => {
    setFundingMethod(method);
    
    if (method === 'transfer') {
      setShowQRFunding(true);
      toast('Scan QR code to add funds');
    } else if (method === 'card' || method === 'exchange') {
      setTimeout(() => {
        setShowFundingSuccess(true);
        toast(`${method === 'card' ? 'Card' : 'Exchange'} funding ready`);
      }, 1500);
    }
  };

  const handleContinueFromFunding = () => {
    setShowFundingOptions(false);
    setShowPaymentForm(true);
    setShowFundingSuccess(false);
    setFundingMethod("");
    toast('Ready to proceed with payment');
  };

  const handleReturnToDashboard = () => {
    setActiveTab("admin");
    setCurrentPayment(null);
    setShowCryptoSelection(false);
    setShowWeb3Auth(false);
    setShowPaymentForm(false);
    setShowFundingOptions(false);
    setShowFundingSuccess(false);
    setShowQRFunding(false);
    setPaymentStatus("pending");
    setFundingMethod("");
    setWalletAddress("");
    window.location.hash = "";
  };

  const Wallets = () => {
    const mainWallet = wallets.find((w) => w.isDefault);
    if (!mainWallet) return null;

    return (
      <PageLayout>
        <PageLayout.Header>
          <h1>Wallets</h1>
        </PageLayout.Header>
        <PageLayout.Content>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Main Wallet</CardTitle>
                <CardDescription>
                  {mainWallet.address}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Wallet content will be displayed here
                </p>
              </CardContent>
            </Card>
          </div>
        </PageLayout.Content>
      </PageLayout>
    );
  };

  const CustomerCheckout = () => {
    // Helper function to determine current checkout screen number
    // Note: Processing is a transition state (not a screen), so we skip it
    const getCurrentScreenNumber = (): number => {
      // Check if user went through funding flow to determine final screen number
      const wentThroughFunding = showFundingOptions || showQRFunding || showFundingSuccess;
      
      if (paymentStatus === "completed") {
        return wentThroughFunding ? 6 : 4; // Success: Screen 6 (funding path) or 4 (direct path)
      }
      // Processing state removed - it's just a transition, not a screen
      if (showPaymentForm) {
        return wentThroughFunding ? 5 : 3; // Confirmation: Screen 5 (funding path) or 3 (direct path)
      }
      if (showFundingOptions && showFundingSuccess) return 4; // Screen #4: Funding Success
      if (showQRFunding || (showFundingOptions && !showFundingSuccess)) return 3; // Screen #3: Add Funds (QR OR Options)
      if (showCryptoSelection) return 2; // Screen #2: Crypto Selection
      return 1; // Screen #1: Login/Register (Web3Auth)
    };

    const currentScreen = getCurrentScreenNumber();

    return (
    <div 
      className="min-h-screen bg-white dark:bg-[#0A0A0A] flex items-center justify-center md:p-4"
      style={{ backgroundColor: theme === 'dark' ? '#0A0A0A' : '#FFFFFF' }}
    >
      <Card
        className="relative overflow-hidden flex flex-col w-full h-full md:w-[450px] md:h-[620px] md:rounded-2xl !bg-white dark:!bg-[#303030] md:border md:border-[#43586C]"
        style={{ backdropFilter: 'none' }}
      >
        <CardHeader
          className={`absolute top-0 left-0 right-0 z-10 text-center p-6 pb-0 pointer-events-none ${showOnRamper ? "hidden" : ""}`}
        >
          {/* Back button in top left - conditional based on screen */}
          {/* Hide back button on Screen #7 (Success) and Screen #6 (Processing) */}
          {paymentStatus !== "completed" && paymentStatus !== "processing" && (
            <div className="absolute top-6 left-6 pointer-events-auto">
              <Button
                variant="ghost"
                className="min-h-12 px-4 rounded-full transition-all duration-200"
                onClick={() => {
                  // Screen #5: Payment Confirmation Form - go back to crypto selection
                  if (showPaymentForm) {
                    setShowPaymentForm(false);
                    setShowCryptoSelection(true);
                    return;
                  }

                  // Screen #4: Funding Confirmation - go back to funding options
                  if (showFundingOptions && showFundingSuccess) {
                    setShowFundingSuccess(false);
                    return;
                  }

                  // Screen #3: Add Funds (QR Funding) - go back to previous screen
                  if (showQRFunding) {
                    setShowQRFunding(false);
                    // Social login users skip funding options, go back to crypto selection
                    if (userLoginMethod !== 'Wallet') {
                      setShowCryptoSelection(true);
                    } else {
                      // Wallet users go back to funding options
                      setShowFundingOptions(true);
                    }
                    setFundingMethod("");
                    return;
                  }

                  // Screen #3: Add Funds (Funding Options) - go back to crypto selection
                  if (showFundingOptions && !showFundingSuccess) {
                    setShowFundingOptions(false);
                    setShowCryptoSelection(true);
                    setFundingMethod("");
                    return;
                  }

                  // Screen #2: Crypto Selection - go back to login
                  if (showCryptoSelection) {
                    setShowCryptoSelection(false);
                    setShowWeb3Auth(true);
                    return;
                  }

                  // Screen #1: Login/Register - go back to admin/close checkout
                  if (showWeb3Auth) {
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
                    return;
                  }
                }}
              >
                <ArrowLeft className="w-[18px] h-[18px] mr-2" />
                <span>Back</span>
              </Button>
            </div>
          )}

          {/* User Avatar in top right - shows from Screen #2 onwards (after login) */}
          {(showCryptoSelection || showPaymentForm || showFundingOptions || showFundingSuccess || showQRFunding || paymentStatus === "processing" || paymentStatus === "completed") && (
            <div className="absolute top-6 right-6 pointer-events-auto">
              <Button
                variant="ghost"
                className="w-12 h-12 rounded-full p-0 transition-all duration-200 hover:bg-[#E3F2FD]"
                onClick={() => {
                  // Auto-login user and navigate to dashboard
                  if (!isUserLoggedIn) {
                    setIsUserLoggedIn(true);
                    setUserLoginMethod('Google');
                  }
                  handleNavigate('user-dashboard');
                }}
                aria-label="Open your account"
              >
                <div className="relative">
                  {/* Green connected ring */}
                  <div className="absolute inset-0 rounded-full ring-2 ring-[#7DD069] ring-offset-2 ring-offset-white dark:ring-offset-[#0a0a0a]"></div>
                  
                  {/* Avatar */}
                  <Avatar className="w-10 h-10">
                    <AvatarImage 
                      src={endUserAvatar}
                      alt="Your Account"
                    />
                    <AvatarFallback>
                      <User className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Wallet provider badge (bottom-right corner) */}
                  <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-white dark:bg-[#0a0a0a] rounded-full flex items-center justify-center ring-2 ring-white dark:ring-[#0a0a0a]">
                    {connectedWallet === "MetaMask" && <MetaMaskLogo className="w-3.5 h-3.5" />}
                    {connectedWallet === "WalletConnect" && <WalletConnectLogo className="w-3.5 h-3.5" />}
                    {connectedWallet === "Coinbase Wallet" && <CoinbaseLogo className="w-3.5 h-3.5" />}
                    {connectedWallet === "Google" && <GoogleLogo className="w-3.5 h-3.5" />}
                    {connectedWallet === "Twitter" && <TwitterLogo className="w-3.5 h-3.5" />}
                    {connectedWallet === "Github" && <GithubLogo className="w-3.5 h-3.5" />}
                  </div>
                </div>
              </Button>
            </div>
          )}

          <div className="flex justify-center">
            <PymstrLogo variant="icon" size="sm" />
          </div>
        </CardHeader>
        <CardContent
          className={`px-6 pb-0 pt-20 flex-1 flex flex-col ${showOnRamper ? "hidden" : ""}`}
        >
          {showCryptoSelection ? (
            // 🔥 SCREEN #2: Crypto Selection (Network + Token)
            <div className="flex flex-col pt-0 pb-0 px-0 space-y-4">
              <div className="text-center space-y-4">
                {/* Merchant Logo */}
                <div className="flex justify-center">
                  <div className="w-[54px] h-[54px] rounded-xl border-2 border-dashed border-[#43586C] flex items-center justify-center bg-[#FAFAFA] dark:bg-[#262626] overflow-hidden">
                    <div className="text-center">
                      <Building2 className="w-10 h-10 mx-auto text-muted-foreground" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    {formatPrice(currentPayment?.price || 156.78, currentPayment?.baseCurrency)} •{" "}
                    {currentPayment?.description || "Payment to CryptoStore"}
                  </p>
                  <h3 className="text-center text-muted-foreground not-italic">Select to Pay</h3>
                </div>
              </div>

              {/* Side-by-side Dropdowns: Coin and Chain */}
              <div className="grid grid-cols-2 gap-3">
                {/* Coin Selection Dropdown */}
                <div className="space-y-1.5">
                  <Label className="text-sm">Stablecoin</Label>
                  <Select
                    value={selectedCrypto}
                    onValueChange={(cryptoSymbol) => {
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
                  >
                    <SelectTrigger className="h-12 rounded-xl bg-transparent border-2 border-[#1E88E5] hover:border-[#1565C0] hover:bg-[#E3F2FD] dark:hover:bg-[#1E88E5]/20 focus:bg-[#E3F2FD] dark:focus:bg-[#1E88E5]/20 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5] transition-all duration-200">
                      <SelectValue>
                        <div className="flex items-center gap-2">
                          {supportedCryptos.find(c => c.symbol === selectedCrypto)?.logo}
                          <span>{selectedCrypto}</span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-[#262626] rounded-xl">
                      {supportedCryptos
                        .filter((crypto) => {
                          // First check merchant config - only show tokens enabled for selected chain
                          const availableTokens = getAvailableTokensForChain(selectedChain);
                          return availableTokens.includes(crypto.symbol);
                        })
                        .map((crypto) => (
                          <SelectItem
                            key={crypto.symbol}
                            value={crypto.symbol}
                            className="cursor-pointer hover:bg-[#E3F2FD] dark:hover:bg-[#1E88E5]/20 rounded-lg my-1"
                          >
                            <div className="flex items-center gap-2">
                              {crypto.logo}
                              <span>{crypto.symbol}</span>
                            </div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Chain Selection Dropdown */}
                <div className="space-y-1.5">
                  <Label className="text-sm">Chain</Label>
                  <Select
                    value={selectedChain}
                    onValueChange={(chain) => {
                      setSelectedChain(chain);
                      // Auto-adjust token if current one is not available on new chain
                      const availableTokens = getAvailableTokensForChain(chain);
                      if (!availableTokens.includes(selectedCrypto)) {
                        // Select first available token on this chain
                        if (availableTokens.length > 0) {
                          const firstToken = supportedCryptos.find(c => availableTokens.includes(c.symbol));
                          if (firstToken) {
                            setSelectedCrypto(firstToken.symbol);
                          }
                        }
                      }
                    }}
                  >
                    <SelectTrigger className="h-12 rounded-xl bg-transparent border-2 border-[#1E88E5] hover:border-[#1565C0] hover:bg-[#E3F2FD] dark:hover:bg-[#1E88E5]/20 focus:bg-[#E3F2FD] dark:focus:bg-[#1E88E5]/20 focus:border-[#1E88E5] focus:ring-2 focus:ring-[#1E88E5] transition-all duration-200">
                      <SelectValue>
                        <div className="flex items-center gap-2">
                          {supportedChains.find(c => c.id === selectedChain)?.icon}
                          <span>{supportedChains.find(c => c.id === selectedChain)?.name}</span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-[#262626] rounded-xl">
                      {getAvailableChainsForToken(selectedCrypto).map((chainId) => {
                        const chain = supportedChains.find(c => c.id === chainId);
                        if (!chain) return null;
                        return (
                          <SelectItem
                            key={chain.id}
                            value={chain.id}
                            className="cursor-pointer hover:bg-[#E3F2FD] dark:hover:bg-[#1E88E5]/20 rounded-lg my-1"
                          >
                            <div className="flex items-center gap-2">
                              {chain.icon}
                              <span>{chain.name}</span>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Result Box - Shows selected coin, amount, and balance */}
              <div className="bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-xl p-4 border border-[#43586C]">
                <div className="flex items-start gap-3">
                  {/* Coin Icon */}
                  <div className="flex-shrink-0">
                    {supportedCryptos.find(c => c.symbol === selectedCrypto)?.logo}
                  </div>
                  
                  {/* Coin Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-[#1C1B1F] dark:text-[#F6F7F9]">
                        {supportedCryptos.find(c => c.symbol === selectedCrypto)?.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        on {supportedChains.find(c => c.id === selectedChain)?.name}
                      </span>
                    </div>
                    
                    {/* Amount to Pay */}
                    <div className="text-2xl font-medium text-[#1C1B1F] dark:text-[#F6F7F9] mb-2">
                      {calculateCryptoAmount(currentPayment?.price || 156.78, selectedCrypto)} {selectedCrypto}
                    </div>
                    
                    {/* Balance Display Logic:
                        - Show MetaMask ONLY if MetaMask has SUFFICIENT balance (≥ full payment)
                        - Otherwise, show Wallet balance (or nothing if wallet = 0)
                        - Ignore MetaMask if insufficient
                    */}
                    {(() => {
                      const walletBalance = getWalletBalance(selectedCrypto, selectedChain);
                      const requiredAmount = parseFloat(calculateCryptoAmount(currentPayment?.price || 156.78, selectedCrypto));
                      const isMetaMask = connectedWallet === "MetaMask";
                      
                      // Check if MetaMask has SUFFICIENT balance for FULL payment
                      const metaMaskSufficient = isMetaMask && walletBalance >= requiredAmount;
                      
                      // Show balance if:
                      // 1. MetaMask is sufficient (show MetaMask balance)
                      // 2. Wallet has balance > 0 (show wallet balance, ignore MetaMask if insufficient)
                      const shouldShowBalance = metaMaskSufficient || walletBalance > 0;
                      
                      if (!shouldShowBalance) return null;
                      
                      // Determine which balance to show
                      const displayAsMetaMask = metaMaskSufficient;
                      const hasSufficient = walletBalance >= requiredAmount;
                      
                      return (
                        <div className="flex items-center gap-1.5 text-sm">
                          {/* Show MetaMask logo ONLY if MetaMask is sufficient, otherwise Wallet icon */}
                          {displayAsMetaMask ? (
                            <MetaMaskLogo className="w-4 h-4 flex-shrink-0" />
                          ) : (
                            <Wallet className="w-4 h-4 text-muted-foreground" />
                          )}
                          <span className="text-muted-foreground">
                            {displayAsMetaMask ? "MetaMask:" : "Balance:"}
                          </span>
                          <span className={hasSufficient ? "text-[#7DD069]" : "text-[#FF5914]"}>
                            {walletBalance.toFixed(2)} {selectedCrypto}
                          </span>
                        </div>
                      );
                    })()}
                  </div>
                  
                  {/* Info Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-5 h-5 rounded-full border border-[#43586C] flex items-center justify-center">
                      <HelpCircle className="w-3 h-3 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button - Dynamic text based on balance */}
              <div className="pt-2">
                <button
                  onClick={handleContinue}
                  className="w-full h-12 px-8 py-3 rounded-full bg-[#1E88E5] hover:bg-[#1565C0] text-white transition-all duration-200 flex items-center justify-center font-medium"
                >
                  {(() => {
                    const walletBalance = getWalletBalance(selectedCrypto, selectedChain);
                    const requiredAmount = parseFloat(calculateCryptoAmount(currentPayment?.price || 156.78, selectedCrypto));
                    const hasSufficient = walletBalance >= requiredAmount;
                    const chainName = supportedChains.find(c => c.id === selectedChain)?.name;
                    
                    // Scenario 1: Wallet = 0 (both wallet and MetaMask = 0, or MetaMask insufficient)
                    if (walletBalance === 0) {
                      return `Add ${selectedCrypto} + ${chainName}`;
                    }
                    
                    // Scenario 2 & 4: Has sufficient balance (wallet partial or MetaMask sufficient)
                    if (hasSufficient) {
                      return `Pay ${selectedCrypto} on ${chainName}`;
                    }
                    
                    // Scenario 3: Partial balance (need to add more)
                    return `Add ${selectedCrypto} to Pay`;
                  })()}
                </button>
              </div>
            </div>
          ) : showWeb3Auth ? (
            // 🔥 SCREEN #1: Login/Register (Web3Auth) - First Screen
            <div className="flex flex-col justify-center h-full space-y-6">
              <div className="text-center space-y-4">
                {/* Merchant Logo */}
                <div className="flex justify-center">
                  <div className="w-[54px] h-[54px] rounded-xl border-2 border-dashed border-[#43586C] flex items-center justify-center bg-[#FAFAFA] dark:bg-[#262626] overflow-hidden">
                    <div className="text-center">
                      <Building2 className="w-10 h-10 mx-auto text-muted-foreground" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    {formatPrice(currentPayment?.price || 156.78, currentPayment?.baseCurrency)} •{" "}
                    {currentPayment?.description || "Payment"}
                  </p>
                  <h3 className="text-muted-foreground not-italic">Select Login</h3>
                </div>
              </div>

              {isConnecting ? (
                <div className="text-center space-y-4 py-8">
                  <div className="w-16 h-16 border-4 border-[#1E88E5] border-t-transparent rounded-full animate-spin mx-auto"></div>
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
                      className="flex items-center justify-start gap-2 rounded-full min-h-12 px-4 border-[#43586C] hover:bg-[#E3F2FD] hover:border-[#1E88E5] transition-all duration-200"
                      onClick={() =>
                        handleWalletConnect("Google")
                      }
                    >
                      <GoogleLogo className="w-[18px] h-[18px] flex-shrink-0" />
                      <span className="flex-1 text-left">
                        Google
                      </span>
                    </Button>

                    <Button
                      variant="outline"
                      className="flex items-center justify-start gap-2 rounded-full min-h-12 px-4 border-[#43586C] hover:bg-[#E3F2FD] hover:border-[#1E88E5] transition-all duration-200"
                      onClick={() =>
                        handleWalletConnect("Twitter")
                      }
                    >
                      <TwitterLogo className="w-[18px] h-[18px] flex-shrink-0" />
                      <span className="flex-1 text-left">
                        Twitter
                      </span>
                    </Button>

                    <Button
                      variant="outline"
                      className="flex items-center justify-start gap-2 rounded-full min-h-12 px-4 border-[#43586C] hover:bg-[#E3F2FD] hover:border-[#1E88E5] transition-all duration-200"
                      onClick={() =>
                        handleWalletConnect("Github")
                      }
                    >
                      <GithubLogo className="w-[18px] h-[18px] flex-shrink-0" />
                      <span className="flex-1 text-left">
                        Github
                      </span>
                    </Button>

                    <Button
                      variant="outline"
                      className="flex items-center justify-start gap-2 rounded-full min-h-12 px-4 border-[#43586C] hover:bg-[#E3F2FD] hover:border-[#1E88E5] transition-all duration-200"
                      onClick={() =>
                        handleWalletConnect("MetaMask")
                      }
                    >
                      <MetaMaskLogo className="w-[18px] h-[18px] flex-shrink-0" />
                      <span className="flex-1 text-left">
                        MetaMask
                      </span>
                    </Button>

                    <Button
                      variant="outline"
                      className="flex items-center justify-start gap-2 rounded-full min-h-12 px-4 border-[#43586C] hover:bg-[#E3F2FD] hover:border-[#1E88E5] transition-all duration-200"
                      onClick={() =>
                        handleWalletConnect("WalletConnect")
                      }
                    >
                      <WalletConnectLogo className="w-[18px] h-[18px] flex-shrink-0" />
                      <span className="flex-1 text-left">
                        WalletConnect
                      </span>
                    </Button>

                    <Button
                      variant="outline"
                      className="flex items-center justify-start gap-2 rounded-full min-h-12 px-4 border-[#43586C] hover:bg-[#E3F2FD] hover:border-[#1E88E5] transition-all duration-200"
                      onClick={() =>
                        handleWalletConnect("Coinbase Wallet")
                      }
                    >
                      <CoinbaseLogo className="w-[18px] h-[18px] flex-shrink-0" />
                      <span className="flex-1 text-left">
                        Coinbase
                      </span>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : showQRFunding ? (
            // 🔥 SCREEN #3: Add Funds (QR Funding - Scan to Pay)
            <div className="flex flex-col justify-center flex-1 space-y-6">
              {/* Merchant Logo + Price + Description */}
              <div className="text-center space-y-4">
                {/* Merchant Logo */}
                <div className="flex justify-center">
                  <div className="w-[54px] h-[54px] rounded-xl border-2 border-dashed border-[#43586C] flex items-center justify-center bg-[#FAFAFA] dark:bg-[#262626] overflow-hidden">
                    <div className="text-center">
                      <Building2 className="w-10 h-10 mx-auto text-muted-foreground" />
                    </div>
                  </div>
                </div>
                
                {/* Price + Description (one line) */}
                <p className="text-muted-foreground">
                  {formatPrice(currentPayment?.price || 156.78, currentPayment?.baseCurrency)} • {currentPayment?.description || "Monthly Subscription"}
                </p>
                
                {/* Title */}
                <h3 className="text-muted-foreground">Scan/Copy to Pay</h3>
              </div>

              {/* QR Code + Wallet Address (Horizontal Layout) */}
              <div className="flex gap-3 items-center justify-center">
                {/* QR Code - Left Side */}
                <a 
                  href={`https://opensea.io/assets/matic/${walletAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block flex-shrink-0"
                  aria-label="Open wallet in OpenSea"
                >
                  <div className="bg-white dark:bg-[#303030] hover:bg-[#E3F2FD] dark:hover:bg-[#1E88E5]/20 p-3 rounded-2xl border-2 border-[#43586C] hover:border-[#1E88E5] transition-all duration-200 cursor-pointer h-[88px] flex items-center justify-center">
                    <QRCodeCanvas
                      value={`https://opensea.io/assets/matic/${walletAddress}`}
                      size={64}
                      level="H"
                      includeMargin={false}
                    />
                  </div>
                </a>

                {/* Wallet Address Card - Right Side */}
                <div className="flex-1 min-w-0">
                  <div className="bg-white dark:bg-[#303030] hover:bg-[#E3F2FD] dark:hover:bg-[#1E88E5]/20 border-2 border-[#43586C] hover:border-[#1E88E5] rounded-2xl p-3 transition-all duration-200 cursor-pointer h-[88px] flex flex-col justify-center">
                    <div className="space-y-2">
                      <code className="text-xs text-[#1C1B1F] dark:text-[#F6F7F9] block text-center break-all">
                        {truncateAddress(walletAddress)}
                      </code>
                      <Button
                        onClick={() => {
                          copyToClipboard(walletAddress);
                          setCopiedItem(walletAddress);
                          toast("Address copied to clipboard!");
                          setTimeout(() => setCopiedItem(null), 2000);
                        }}
                        className="w-full min-h-9 bg-transparent border-none text-[#1E88E5] hover:bg-[#1E88E5]/10 transition-all duration-200 rounded-lg flex items-center justify-center gap-2"
                      >
                        {copiedItem === walletAddress ? (
                          <>
                            <Check className="w-4 h-4 text-green-600" />
                            <span className="text-xs text-green-600">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span className="text-xs">Copy</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Required Amount Box */}
              <div className={`rounded-xl p-4 border transition-all duration-200 ${
                fundsReceived 
                  ? 'bg-[#7DD069]/10 border-[#7DD069]' 
                  : 'bg-[#FAFAFA] dark:bg-[#2E3C49] border-[#43586C]'
              }`}>
                <div className="flex items-start gap-3">
                  {/* Coin Icon */}
                  <div className="flex-shrink-0">
                    {supportedCryptos.find(c => c.symbol === selectedCrypto)?.logo}
                  </div>
                  
                  {/* Coin Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-[#1C1B1F] dark:text-[#F6F7F9]">
                        {supportedCryptos.find(c => c.symbol === selectedCrypto)?.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        on {supportedChains.find(c => c.id === selectedChain)?.name}
                      </span>
                    </div>
                    
                    {/* Amount to Fund (Missing Amount Only) */}
                    <div className="text-2xl font-medium text-[#1C1B1F] dark:text-[#F6F7F9]">
                      {(() => {
                        const requiredAmount = parseFloat(calculateCryptoAmount(currentPayment?.price || 156.78, selectedCrypto));
                        const currentBalance = getWalletBalance(selectedCrypto, selectedChain);
                        const missingAmount = Math.max(0, requiredAmount - currentBalance);
                        return `${missingAmount.toFixed(2)} ${selectedCrypto}`;
                      })()}
                    </div>
                    
                    {/* "Required" label - small font like Balance */}
                    {!fundsReceived && (
                      <div className="text-sm text-muted-foreground mt-1">
                        Required
                      </div>
                    )}
                    
                    {/* Funds Received Subtitle - Only show when funded */}
                    {fundsReceived && (
                      <div className="flex items-center gap-1.5 mt-1">
                        <Check className="w-3.5 h-3.5 text-[#7DD069]" />
                        <span className="text-xs text-[#7DD069] font-medium">
                          Funds received
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Info Icon - Only show when not funded */}
                  {!fundsReceived && (
                    <div className="flex-shrink-0">
                      <div className="w-5 h-5 rounded-full border border-[#43586C] flex items-center justify-center">
                        <HelpCircle className="w-3 h-3 text-muted-foreground" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Waiting for Payment Button - Always disabled with loader */}
              <Button
                className="w-full min-h-12 px-8 py-3 bg-[#1E88E5] text-white transition-all duration-200 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={true}
              >
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                Waiting for Payment
              </Button>
            </div>
          ) : showFundingOptions ? (
            showFundingSuccess ? (
              // 🔥 SCREEN #4: Funding Confirmation (Method Ready)
              <div className="space-y-6">
                <div className="text-center space-y-4">
                  {/* Merchant Logo */}
                  <div className="flex justify-center">
                    <div className="w-[54px] h-[54px] rounded-xl border-2 border-dashed border-[#43586C] flex items-center justify-center bg-[#FAFAFA] dark:bg-[#262626] overflow-hidden">
                      <div className="text-center">
                        <Building2 className="w-10 h-10 mx-auto text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-0">
                    <p className="text-muted-foreground">
                      {formatPrice(currentPayment?.price || 156.78, currentPayment?.baseCurrency)} •{" "}
                      {currentPayment?.description || "Payment to CryptoStore"}
                    </p>
                  </div>
                </div>

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
                    className="w-full min-h-12 px-8 py-3 bg-[#1E88E5] text-white hover:bg-[#1565C0] transition-all duration-200 rounded-full"
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
              // 🔥 SCREEN #3: Add Funds (Choose Funding Method)
              <div className="flex flex-col justify-center flex-1 space-y-6">
                {/* Merchant Logo + Price + Description */}
                <div className="text-center space-y-4">
                  {/* Merchant Logo */}
                  <div className="flex justify-center">
                    <div className="w-[54px] h-[54px] rounded-xl border-2 border-dashed border-[#43586C] flex items-center justify-center bg-[#FAFAFA] dark:bg-[#262626] overflow-hidden">
                      <div className="text-center">
                        <Building2 className="w-10 h-10 mx-auto text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-muted-foreground">
                      {formatPrice(currentPayment?.price || 156.78, currentPayment?.baseCurrency)} •{" "}
                      {currentPayment?.description || "Payment to CryptoStore"}
                    </p>
                    <h3 className="text-center text-muted-foreground not-italic">Choose Funding Method</h3>
                  </div>
                </div>

                {/* Funding Options */}
                <div className="space-y-3">
                  <div className={`grid gap-3 ${connectedWallet === "MetaMask" || connectedWallet === "WalletConnect" || connectedWallet === "Coinbase Wallet" ? "grid-cols-3" : "grid-cols-2"}`}>
                    <button
                      type="button"
                      onClick={() => {
                        setFundingMethod("qr");
                        setShowQRFunding(true);
                      }}
                      className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                        fundingMethod === "qr"
                          ? "border-[#1E88E5] bg-[#E3F2FD] dark:bg-[#1E88E5]/20"
                          : "border-[#43586C] hover:border-[#1E88E5] hover:bg-[#E3F2FD] dark:hover:bg-[#1E88E5]/20 bg-white dark:bg-[#303030]"
                      }`}
                    >
                      <QrCode className="w-6 h-6 mx-auto mb-2 text-[#1E88E5]" />
                      <div className="text-sm font-medium text-[#1C1B1F] dark:text-[#F6F7F9]">
                        QR
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setFundingMethod("card");
                        setShowFundingSuccess(true);
                      }}
                      className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                        fundingMethod === "card"
                          ? "border-[#1E88E5] bg-[#E3F2FD] dark:bg-[#1E88E5]/20"
                          : "border-[#43586C] hover:border-[#1E88E5] hover:bg-[#E3F2FD] dark:hover:bg-[#1E88E5]/20 bg-white dark:bg-[#303030]"
                      }`}
                    >
                      <CreditCard className="w-6 h-6 mx-auto mb-2 text-[#1E88E5]" />
                      <div className="text-sm font-medium text-[#1C1B1F] dark:text-[#F6F7F9]">
                        Card
                      </div>
                    </button>

                    {(connectedWallet === "MetaMask" || connectedWallet === "WalletConnect" || connectedWallet === "Coinbase Wallet") && (
                      <button
                        type="button"
                        onClick={() => {
                          setFundingMethod("wallet");
                          setShowFundingSuccess(true);
                        }}
                        className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                          fundingMethod === "wallet"
                            ? "border-[#1E88E5] bg-[#E3F2FD] dark:bg-[#1E88E5]/20"
                            : "border-[#43586C] hover:border-[#1E88E5] hover:bg-[#E3F2FD] dark:hover:bg-[#1E88E5]/20 bg-white dark:bg-[#303030]"
                        }`}
                      >
                        {connectedWallet === "MetaMask" && <MetaMaskLogo className="w-6 h-6 mx-auto mb-2" />}
                        {connectedWallet === "WalletConnect" && <WalletConnectLogo className="w-6 h-6 mx-auto mb-2" />}
                        {connectedWallet === "Coinbase Wallet" && <CoinbaseLogo className="w-6 h-6 mx-auto mb-2" />}
                        <div className="text-sm font-medium text-[#1C1B1F] dark:text-[#F6F7F9]">
                          {connectedWallet === "Coinbase Wallet" ? "Coinbase" : connectedWallet}
                        </div>
                      </button>
                    )}
                  </div>
                </div>

                {/* Required Balance Box */}
                <div className="bg-[#FAFAFA] dark:bg-[#2E3C49] rounded-xl p-4 border border-[#43586C]">
                  <div className="flex items-start gap-3">
                    {/* Coin Icon */}
                    <div className="flex-shrink-0">
                      {supportedCryptos.find(c => c.symbol === selectedCrypto)?.logo}
                    </div>
                    
                    {/* Balance Details */}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-[#1C1B1F] dark:text-[#F6F7F9] mb-1">
                        Required
                      </div>
                      <div className="text-2xl font-medium text-[#1C1B1F] dark:text-[#F6F7F9]">
                        {calculateCryptoAmount(currentPayment?.price || 156.78, selectedCrypto)} {selectedCrypto}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          ) : showPaymentForm ? (
            // 🔥 SCREEN #5: Payment Confirmation Form
            <div className="space-y-6">
              <div className="text-center space-y-4">
                {/* Merchant Logo */}
                <div className="flex justify-center">
                  <div className="w-[54px] h-[54px] rounded-xl border-2 border-dashed border-[#43586C] flex items-center justify-center bg-[#FAFAFA] dark:bg-[#262626] overflow-hidden">
                    <div className="text-center">
                      <Building2 className="w-10 h-10 mx-auto text-muted-foreground" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-0">
                  <p className="text-muted-foreground">
                    {formatPrice(currentPayment?.price || 156.78, currentPayment?.baseCurrency)} •{" "}
                    {currentPayment?.description || "Payment to CryptoStore"}
                  </p>
                </div>
              </div>

              {paymentStatus === "pending" && (
                <div className="space-y-6">
                  <div className="bg-[#FAFAFA] dark:bg-[#2E3C49] p-4 rounded-xl border border-[#43586C]">
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
                      <span>
                        {supportedChains.find(
                          (chain) => chain.id === selectedChain,
                        )?.name || "Network"}{" "}
                        Fee:
                      </span>
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
                    className="w-full min-h-12 px-8 py-3 rounded-full bg-[#1E88E5] hover:bg-[#1565C0] text-white transition-all duration-200"
                    onClick={handlePayment}
                  >
                    <Wallet className="w-5 h-5 mr-2" />
                    Confirm Payment
                  </Button>
                </div>
              )}

              {/* SCREEN #6: Processing Payment */}
              {paymentStatus === "processing" && (
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 border-4 border-[#1E88E5] border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <div className="space-y-2">
                    <h3 className="text-muted-foreground">Processing payment...</h3>
                    <p className="text-muted-foreground">
                      Please wait while we confirm your
                      transaction
                    </p>
                  </div>
                </div>
              )}

              {/* SCREEN #7: Payment Successful */}
              {paymentStatus === "completed" && (
                <PaymentSuccessScreen
                  onReturnToMerchant={() => {
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
                />
              )}
            </div>
          ) : null}
        </CardContent>

        {/* Secure Footer - Always visible at bottom */}
        <div className="p-6 border-t border-[#43586C] flex-shrink-0">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap text-sm">
                No Custody & Bulletproof by PYMSTR®
              </span>
              <ShieldCheck className="w-5 h-5 text-green-600" />
            </div>
            {/* Development: Screen Number Indicator */}
            <span className="px-2 py-0.5 rounded-full bg-[#1E88E5] text-white text-xs font-medium">
              {currentScreen}
            </span>
          </div>
        </div>
      </Card>

      {/* OnRamper Credit Card Purchase Dialog */}
      <Dialog
        open={showOnRamper}
        onOpenChange={setShowOnRamper}
      >
        <DialogContent 
          className="max-w-md max-h-[85vh] p-0 overflow-hidden rounded-3xl"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader className="p-6 pb-4">
            <DialogTitle>
              Buy {selectedCrypto} with Credit Card
            </DialogTitle>
            <DialogDescription>
              Complete your purchase through our secure payment
              partner OnRamper
            </DialogDescription>
          </DialogHeader>
          <div className="px-6 pb-6">
            <div className="bg-[#E3F2FD] dark:bg-[#1E88E5]/20 p-4 rounded-2xl border border-[#1E88E5]/30 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span>You need:</span>
                <span>
                  {calculateCryptoAmount(
                    currentPayment?.price || 156.78,
                    selectedCrypto,
                  )}{" "}
                  {selectedCrypto}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Network:</span>
                <span>{getChainName(selectedChain)}</span>
              </div>
            </div>

            {/* OnRamper iframe */}
            <div className="rounded-2xl overflow-hidden border border-[#43586C]">
              <iframe
                src={`https://widget.onramper.com?apiKey=pk_prod_01JA8K7NMCXHXQZYNT22V3FPJ8&defaultCrypto=${selectedCrypto}&defaultAmount=${calculateCryptoAmount(currentPayment?.price || 156.78, selectedCrypto)}&networks=${getOnRamperNetwork(selectedChain)}&wallets=${selectedCrypto}:${walletAddress}&isAddressEditable=false`}
                title="OnRamper Widget"
                height="500px"
                width="100%"
                allow="accelerometer; autoplay; camera; gyroscope; payment"
                style={{ border: "none" }}
              />
            </div>

            <div className="mt-4">
              <Button
                className="w-full rounded-full min-h-12 bg-[#1E88E5] text-white hover:bg-[#1565C0] transition-all duration-200"
                onClick={() => {
                  setShowOnRamper(false);
                  setShowFundingSuccess(true);
                  toast(
                    `${selectedCrypto} purchase initiated! Funds will arrive shortly.`,
                  );
                }}
              >
                I've Completed the Purchase
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Scan to Add Funds - REMOVED Dialog, now rendered inline */}


    </div>
    );
  };

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
        setUserContext('enduser'); // Set user context to enduser on login
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
              <span className="text-2xl font-bold text-[#FF5914]">PYMSTR</span>
            </div>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[#757575]">
                <Lock className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle>Welcome to Your Dashboard</CardTitle>
            <CardDescription>
              Sign in to view your payment history, wallet
              balances, and manage your account
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
                    <strong>Secure & Private:</strong> Your
                    login is powered by Web3Auth. We never store
                    your credentials or have access to your
                    private keys.
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  // User Dashboard component moved to /pages/UserDashboardPage.tsx

  const renderContent = () => {
    switch (activeTab) {
      case "admin":
        return (
          <DashboardPage
            dashboardStats={dashboardStats}
            recentTransactions={recentTransactions}
            chartData={chartData}
            onCreatePaymentLink={handleCreatePaymentLink}
            getExplorerUrl={getExplorerUrl}
          />
        );
      case "links":
        return (
          <PaymentLinksPage
            paymentLinks={paymentLinks}
            onDeleteLink={handleDeleteLink}
            onDeactivateLink={handleDeactivateLink}
            onCopyLink={(linkId) => {
              const url = `${window.location.origin}/#/pay/${linkId}`;
              copyToClipboard(url);
            }}
            onViewLink={handlePaymentLinkClick}
            showPaymentLinkDialog={showPaymentLinkDialog}
            setShowPaymentLinkDialog={setShowPaymentLinkDialog}
            onLinkGenerated={handleLinkGenerated}
          />
        );
      case "wallet":
        return (
          <WalletsPage
            wallets={wallets}
            setWallets={setWallets}
            theme={theme}
          />
        );
      case "wallets":
        return (
          <WalletsPage
            wallets={wallets}
            setWallets={setWallets}
            theme={theme}
          />
        );
      case "team":
        return (
          <TeamManagementPage
            teamMembers={teamMembers}
            setTeamMembers={setTeamMembers}
            showAddMember={showAddMember}
            setShowAddMember={setShowAddMember}
            newMember={newMember}
            setNewMember={setNewMember}
            handleAddTeamMember={handleAddTeamMember}
            handleDeleteMember={handleRemoveTeamMember}
          />
        );
      case "reports":
        return (
          <ReportsPage
            recentTransactions={recentTransactions}
            getExplorerUrl={getExplorerUrl}
          />
        );
      case "transactions":
        return <TransactionsPage />;
      case "api":
      case "apikeys":
        return (
          <APIKeysPage
            apiKeys={apiKeys}
            onCreateKey={handleCreateApiKey}
            onUpdateKey={handleUpdateApiKey}
            onDeleteKey={handleDeleteApiKey}
            onNavigateToQuickStart={() => setActiveTab("quickstart")}
            onNavigateToAPIReference={() => setActiveTab("apireference")}
          />
        );
      case "webhooks":
        return <WebhooksPage onWebhookCreated={() => {
          // Onboarding tracking removed
        }} />;
      case "quickstart":
        return (
          <QuickStartGuide
            onBack={() => setActiveTab("documents")}
          />
        );
      case "apireference":
        return (
          <APIReference
            onBack={() => setActiveTab("documents")}
          />
        );
      case "codeexamples":
        return (
          <CodeExamples
            onBack={() => setActiveTab("documents")}
          />
        );
      case "documents":
        return (
          <DocumentsPage
            onNavigateToDoc={(doc) => {
              if (doc === "quickstart") {
                window.location.hash = "#/quickstart";
              } else if (doc === "api-reference") {
                window.location.hash = "#/api-reference";
              } else if (doc === "code-examples") {
                window.location.hash = "#/code-examples";
              }
            }}
          />
        );
      case "profile":
        return (
          <MerchantProfile
            onSave={(profile) => {
              toast.success('Profile updated successfully');
            }}
          />
        );
      case "checkout":
        return <CustomerCheckout />;
      case "userdashboard":
        return isUserLoggedIn ? (
          <UserDashboardPage
            isUserLoggedIn={isUserLoggedIn}
            userLoginMethod={userLoginMethod}
            onLogout={handleLogout}
            onBackToMerchant={() => setActiveTab("admin")}
            onNavigateToHelp={() => setActiveTab("help")}
            onNavigateToLegal={() => setActiveTab("legal")}
            copiedItem={copiedItem}
            onCopy={copyToClipboard}
          />
        ) : (
          <UserLogin />
        );
      case "user-dashboard":
        return isUserLoggedIn ? <EndUserDashboardPage /> : <UserLogin />;
      case "user-wallets":
        return isUserLoggedIn ? (
          <EndUserWalletsPage wallets={wallets} setWallets={setWallets} theme={theme} />
        ) : (
          <UserLogin />
        );
      case "user-transactions":
        return isUserLoggedIn ? <EndUserTransactionsPage /> : <UserLogin />;
      case "user-buy":
        return isUserLoggedIn ? (
          <EndUserBuyPage walletAddress={walletAddress} />
        ) : (
          <UserLogin />
        );
      case "user-send":
        return isUserLoggedIn ? (
          <EndUserSendPage wallets={wallets} />
        ) : (
          <UserLogin />
        );
      case "user-receive":
        return isUserLoggedIn ? (
          <EndUserReceivePage wallets={wallets} />
        ) : (
          <UserLogin />
        );
      case "user-settings":
        return isUserLoggedIn ? (
          <EndUserSettingsPage
            userLoginMethod={userLoginMethod}
            onLogout={handleLogout}
            onBackToMerchant={() => setActiveTab("admin")}
          />
        ) : (
          <UserLogin />
        );
      case "help":
        return <HelpPage />;
      case "legal":
        return <LegalPage />;
      default:
        return (
          <DashboardPage
            dashboardStats={dashboardStats}
            recentTransactions={recentTransactions}
            chartData={chartData}
            onCreatePaymentLink={handleCreatePaymentLink}
            getExplorerUrl={getExplorerUrl}
          />
        );
    }
  };

  // Render standalone documentation pages without merchant navigation
  if (isStandalonePage) {
    if (activeTab === "quickstart") {
      return <QuickStartPage />;
    } else if (activeTab === "apireference") {
      return <APIReferencePage />;
    } else if (activeTab === "codeexamples") {
      return <CodeExamplesPage />;
    }
  }

  // Helper: Determine if we should show navigation chrome (rail, header, bottom nav)
  const shouldShowNavigation = () => {
    // Hide for checkout (standalone)
    if (activeTab === "checkout") return false;
    
    // Hide for end-user pages when not logged in (login screen is standalone)
    const isEndUserPage = activeTab.startsWith("user-") || activeTab === "userdashboard";
    if (isEndUserPage && !isUserLoggedIn) return false;
    
    // Show for all other cases
    return true;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] overflow-x-hidden">
      {/* Navigation Rail (Desktop Only) - Show for authenticated views only */}
      {shouldShowNavigation() && (
        <NavigationRail
          activeTab={
            activeTab === "admin" ? "dashboard" : activeTab
          }
          onNavigate={handleNavigate}
          isExpanded={isNavRailExpanded}
          onExpandedChange={setIsNavRailExpanded}
          menuItems={userContext === 'enduser' ? endUserNavItems : undefined}
          theme={theme}
          onThemeToggle={toggleTheme}
        />
      )}

      {/* Content Area - Shifts right on desktop to account for nav rail */}
      <div
        className={`${
          activeTab !== "checkout"
            ? isNavRailExpanded
              ? "md:ml-[240px]"
              : "md:ml-20"
            : ""
        } transition-all duration-[1500ms]`}
      >
        {/* Top Header/App Bar - Scroll-hide pattern (MD3 modern UX)
            - Mobile: Full width with scroll-hide behavior
            - Desktop: Positioned after navigation rail (left-20 or left-64)
            - Slides up when scrolling down, slides down when scrolling up
        */}
        {shouldShowNavigation() && (
            <header 
              className={`fixed top-0 left-0 right-0 z-40 bg-white dark:bg-[#0A0A0A] ${
                showHeader ? 'translate-y-0' : '-translate-y-full'
              } ${
                isNavRailExpanded ? 'md:left-64' : 'md:left-20'
              }`}
              style={{
                transition: 'transform 300ms ease-out, left 1500ms ease-out'
              }}
            >
              <div className="flex items-center justify-between px-4 md:px-6 h-16">
                {/* Mobile: Logo */}
                <button onClick={() => setActiveTab("admin")} className="md:hidden">
                  {/* Light mode logo */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-8 w-8 dark:hidden">
                    <rect width="32" height="32" fill="#e8e4dc" fillOpacity="0.5" rx="8" ry="8"/>
                    <rect x="6" y="10" width="2" height="12" fill="#ff5722"/>
                    <rect x="9" y="8" width="2" height="16" fill="#ff5722"/>
                    <rect x="12" y="10" width="2" height="12" fill="#ff5722"/>
                    <rect x="15" y="7" width="2" height="18" fill="#ff5722"/>
                    <rect x="18" y="10" width="2" height="12" fill="#ff5722"/>
                    <rect x="21" y="8" width="2" height="16" fill="#ff5722"/>
                    <rect x="24" y="10" width="2" height="12" fill="#ff5722"/>
                  </svg>
                  {/* Dark mode logo */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-8 w-8 hidden dark:block">
                    <rect width="32" height="32" fill="#1a1a1a" rx="8" ry="8"/>
                    <rect x="6" y="10" width="2" height="12" fill="#ff5722"/>
                    <rect x="9" y="8" width="2" height="16" fill="#ff5722"/>
                    <rect x="12" y="10" width="2" height="12" fill="#ff5722"/>
                    <rect x="15" y="7" width="2" height="18" fill="#ff5722"/>
                    <rect x="18" y="10" width="2" height="12" fill="#ff5722"/>
                    <rect x="21" y="8" width="2" height="16" fill="#ff5722"/>
                    <rect x="24" y="10" width="2" height="12" fill="#ff5722"/>
                  </svg>
                </button>

                {/* Desktop: Logo with PYMSTR text (moves with rail) */}
                <button onClick={() => setActiveTab("admin")} className="hidden md:flex items-center gap-3">
                  {/* Light mode logo */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-8 w-8 dark:hidden flex-shrink-0">
                    <rect width="32" height="32" fill="#e8e4dc" fillOpacity="0.5" rx="8" ry="8"/>
                    <rect x="6" y="10" width="2" height="12" fill="#ff5722"/>
                    <rect x="9" y="8" width="2" height="16" fill="#ff5722"/>
                    <rect x="12" y="10" width="2" height="12" fill="#ff5722"/>
                    <rect x="15" y="7" width="2" height="18" fill="#ff5722"/>
                    <rect x="18" y="10" width="2" height="12" fill="#ff5722"/>
                    <rect x="21" y="8" width="2" height="16" fill="#ff5722"/>
                    <rect x="24" y="10" width="2" height="12" fill="#ff5722"/>
                  </svg>
                  {/* Dark mode logo */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-8 w-8 hidden dark:block flex-shrink-0">
                    <rect width="32" height="32" fill="#1a1a1a" rx="8" ry="8"/>
                    <rect x="6" y="10" width="2" height="12" fill="#ff5722"/>
                    <rect x="9" y="8" width="2" height="16" fill="#ff5722"/>
                    <rect x="12" y="10" width="2" height="12" fill="#ff5722"/>
                    <rect x="15" y="7" width="2" height="18" fill="#ff5722"/>
                    <rect x="18" y="10" width="2" height="12" fill="#ff5722"/>
                    <rect x="21" y="8" width="2" height="16" fill="#ff5722"/>
                    <rect x="24" y="10" width="2" height="12" fill="#ff5722"/>
                  </svg>
                  <span className="text-xl font-bold text-[#FF5914]">PYMSTR</span>
                </button>

                {/* Desktop: Spacer */}
                <div className="hidden md:block flex-1"></div>

                {/* Right Side Actions (both mobile and desktop) */}
                <div className="flex items-center gap-3">
                  {/* Theme Toggle - Mobile only (desktop has it in rail) */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    className="rounded-full md:hidden"
                  >
                    {theme === "dark" ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                  </Button>

                  {/* Avatar Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full p-0"
                      >
                        <Avatar className="w-10 h-10">
                          <AvatarImage 
                            src={userContext === 'enduser' ? endUserAvatar : merchantAvatar}
                            alt={userContext === 'enduser' ? "Your Account" : "Merchant Profile"}
                          />
                          <AvatarFallback>
                            <User className="w-5 h-5" />
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64 bg-white dark:bg-[#262626] rounded-xl p-0">
                      {/* User Info Header */}
                      <div className="px-4 py-3 border-b border-[#43586C]">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {walletAddress ? truncateAddress(walletAddress) : 'Connected User'}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {userContext === 'enduser' ? 'End User Account' : 'Merchant Account'}
                        </p>
                      </div>
                      
                      {/* Menu Items */}
                      <div className="p-2">
                        {userContext === 'enduser' ? (
                          <>
                            {/* End User Menu Items */}
                            <DropdownMenuItem
                              onClick={() => setActiveTab("user-dashboard")}
                              className="cursor-pointer rounded-lg h-10 px-3"
                            >
                              <Activity className="mr-2 h-[18px] w-[18px]" />
                              Dashboard
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setActiveTab("user-wallets")}
                              className="cursor-pointer rounded-lg h-10 px-3"
                            >
                              <Wallet className="mr-2 h-[18px] w-[18px]" />
                              Wallets
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setActiveTab("user-transactions")}
                              className="cursor-pointer rounded-lg h-10 px-3"
                            >
                              <Receipt className="mr-2 h-[18px] w-[18px]" />
                              Transactions
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setActiveTab("user-settings")}
                              className="cursor-pointer rounded-lg h-10 px-3"
                            >
                              <Settings className="mr-2 h-[18px] w-[18px]" />
                              Settings
                            </DropdownMenuItem>
                          </>
                        ) : (
                          <>
                            {/* Merchant Menu Items */}
                            <DropdownMenuItem
                              onClick={() => setActiveTab("profile")}
                              className="cursor-pointer rounded-lg h-10 px-3"
                            >
                              <User className="mr-2 h-[18px] w-[18px]" />
                              Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setActiveTab("wallets")}
                              className="cursor-pointer rounded-lg h-10 px-3"
                            >
                              <Wallet className="mr-2 h-[18px] w-[18px]" />
                              Wallets
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setActiveTab("team")}
                              className="cursor-pointer rounded-lg h-10 px-3"
                            >
                              <Users className="mr-2 h-[18px] w-[18px]" />
                              Team
                            </DropdownMenuItem>
                          </>
                        )}
                      </div>

                      <DropdownMenuSeparator />

                      {/* Lower Section */}
                      <div className="p-2">
                        {userContext === 'merchant' && (
                          <DropdownMenuItem
                            onClick={() => setActiveTab("documents")}
                            className="cursor-pointer rounded-lg h-10 px-3"
                          >
                            <BookOpen className="mr-2 h-[18px] w-[18px]" />
                            Documents
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => setActiveTab("legal")}
                          className="cursor-pointer rounded-lg h-10 px-3"
                        >
                          <FileText className="mr-2 h-[18px] w-[18px]" />
                          Legal
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setActiveTab("help")}
                          className="cursor-pointer rounded-lg h-10 px-3"
                        >
                          <HelpCircle className="mr-2 h-[18px] w-[18px]" />
                          Help
                        </DropdownMenuItem>
                        {userContext === 'merchant' && (
                          <DropdownMenuItem
                            onClick={() => setActiveTab("user-dashboard")}
                            className="cursor-pointer rounded-lg h-10 px-3"
                          >
                            <User className="mr-2 h-[18px] w-[18px]" />
                            End User View
                          </DropdownMenuItem>
                        )}
                        {userContext === 'enduser' && (
                          <DropdownMenuItem
                            onClick={() => setActiveTab("admin")}
                            className="cursor-pointer rounded-lg h-10 px-3"
                          >
                            <Building2 className="mr-2 h-[18px] w-[18px]" />
                            Merchant View
                          </DropdownMenuItem>
                        )}
                      </div>

                      <DropdownMenuSeparator />

                      {/* Logout */}
                      <div className="p-2">
                        <DropdownMenuItem 
                          onClick={handleLogout}
                          className="cursor-pointer rounded-lg h-10 px-3 text-[#FF5914] focus:text-[#FF5914] focus:bg-[#FF5914]/10"
                        >
                          <LogOut className="mr-2 h-[18px] w-[18px]" />
                          Logout
                        </DropdownMenuItem>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </header>
          )}

        {/* Main Content 
            - pt-16 (64px): Accounts for fixed header height
            - pb-24 (96px): Spacing for mobile bottom navigation
            - md:pb-6: Reduced bottom padding on desktop (no bottom nav)
        */}
        <main className="pt-16 pb-24 md:pb-6">
          {renderContent()}
        </main>

        {/* Mobile Bottom Navigation - Show for authenticated views only */}
        {shouldShowNavigation() && (
            <BottomNavigation
              activeTab={activeTab}
              onNavigate={handleNavigate}
              navItems={userContext === 'enduser' ? endUserBottomNavItems : undefined}
              moreItems={userContext === 'enduser' ? endUserMoreItems : undefined}
            />
          )}
      </div>
    </div>
  );
};

export default App;