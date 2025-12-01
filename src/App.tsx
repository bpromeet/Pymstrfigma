import React, { useState, useEffect, useRef, startTransition } from "react";
import QRCode from "qrcode";
import { QRCodeCanvas } from "qrcode.react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Button } from "./components/ui/button";
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
  Share2,
  DollarSign,
  Users,
  Activity,
  TrendingUp,
  Wallet,
  Shield,
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
  UserCheck,
  UserX,
  Settings,
  Bell,
  Eye,
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
import PaymentLinkForm from "./components/PaymentLinkForm";
import APIKeyManagement from "./components/APIKeyManagement";
import QuickStartGuide from "./components/QuickStartGuide";
import APIReference from "./components/APIReference";
import CodeExamples from "./components/CodeExamples";
import MerchantProfile from "./components/MerchantProfile";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { Avatar, AvatarImage, AvatarFallback } from "./components/ui/avatar";
import { User } from "lucide-react";

// Avatar images - YOUR provided pictures stored in /public/
const merchantAvatar = "/merchant-avatar.png"; // Your picture: Woman with glasses
const endUserAvatar = "/enduser-avatar.png";   // Your picture: Man with dark hair

import QuickStartPage from "./pages/QuickStartPage";
import APIReferencePage from "./pages/APIReferencePage";
import CodeExamplesPage from "./pages/CodeExamplesPage";
import DocumentsPage from "./pages/DocumentsPage";
import DashboardPage from "./pages/DashboardPage";
import PaymentLinksPage from "./pages/PaymentLinksPage";
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
  const [showWeb3Auth, setShowWeb3Auth] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState("USDC");
  const [selectedChain, setSelectedChain] =
    useState("ethereum");
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userLoginMethod, setUserLoginMethod] = useState("");
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
  const [showTestMode, setShowTestMode] = useState(false);
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
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // Theme toggle function
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Initialize theme on mount (theme already set in state line 266)
  useEffect(() => {
    const isDark = theme === "dark";
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Scroll to top when navigating between pages
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

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
          setCurrentPayment({
            id: payment.id,
            price: payment.price,
            description: payment.description,
            merchantName: "PYMSTR Merchant",
            baseCurrency: payment.baseCurrency,
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

  // Copy tooltip state
  const [showCopyTooltip, setShowCopyTooltip] = useState("");

  // Merchant configuration state
  const [merchantConfig, setMerchantConfig] = useState(
    INITIAL_MERCHANT_CONFIG,
  );

  // Track user context (merchant or end-user) for shared pages like Help and Legal
  const [userContext, setUserContext] = useState<'merchant' | 'enduser'>('merchant');

  // End-user navigation menu items (per Guidelines.md)
  // Use unique IDs to differentiate from merchant pages
  const endUserNavItems: NavigationItem[] = [
    { id: 'user-dashboard', label: 'Dashboard', icon: Activity },
    { id: 'user-wallets', label: 'Wallets', icon: Wallet },
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
    
    setActiveTab(tab);
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

  // Local wrapper for copyToClipboard to pass setShowCopyTooltip
  const copyToClipboard = (
    text: string,
    tooltipId?: string,
  ) => {
    copyToClipboardUtil(text, tooltipId, setShowCopyTooltip);
    // Use startTransition to prevent jarring re-renders in Dialog
    startTransition(() => {
      setCopiedItem(text);
      setTimeout(() => {
        startTransition(() => {
          setCopiedItem(null);
        });
      }, 2000);
    });
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

  const AdminDashboard = () => (
    <DashboardPage
      dashboardStats={dashboardStats}
      recentTransactions={recentTransactions}
      chartData={chartData}
      onCreatePaymentLink={() => {
        setActiveTab("links");
        setShowPaymentLinkDialog(true);
      }}
      getExplorerUrl={getExplorerUrl}
    />
  );

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
              onClick={() =>
                window.open("/API_REFERENCE.md", "_blank")
              }
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
      <Card
        className="w-full max-w-md relative overflow-hidden flex flex-col rounded-2xl"
      >
        <CardHeader
          className={`text-center p-6 flex-shrink-0 ${showCryptoSelection ? "pb-4" : "pb-6"} ${showQRFunding || showOnRamper ? "hidden" : ""}`}
        >
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

          {/* User Avatar in top right - shows from Screen #3 onwards */}
          {(showCryptoSelection || showPaymentForm || showFundingOptions || showFundingSuccess || paymentStatus === "processing" || paymentStatus === "completed") && (
            <div className="absolute top-6 right-6">
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
                <Avatar className="w-10 h-10">
                  <AvatarImage 
                    src={endUserAvatar}
                    alt="Your Account"
                  />
                  <AvatarFallback>
                    <User className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </div>
          )}

          <div className="flex justify-center">
            <span className="text-[#FF5914]">PYMSTR</span>
          </div>
        </CardHeader>
        <CardContent
          className={`px-6 pb-6 flex-1 flex flex-col ${showCryptoSelection ? "pt-0" : showFundingOptions ? "pt-0" : "pt-4"} ${showQRFunding || showOnRamper ? "hidden" : ""}`}
        >
          {showWeb3Auth ? (
            <div className="flex flex-col justify-center h-full space-y-6">
              <div className="text-center space-y-2">
                <h3>Login to Pay</h3>
                <p className="text-muted-foreground">
                  {formatPrice(currentPayment?.price || 156.78, currentPayment?.baseCurrency)} •{" "}
                  {currentPayment?.description || "Payment"}
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
                      onClick={() =>
                        handleWalletConnect("Google")
                      }
                    >
                      <svg
                        className="w-[18px] h-[18px] flex-shrink-0"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      <span className="flex-1 text-left">
                        Google
                      </span>
                    </Button>

                    <Button
                      variant="outline"
                      className="flex items-center justify-start gap-2 rounded-full min-h-12 px-4 border-[#D1D9E1] hover:bg-[#E3F2FD] hover:border-[#1E88E5] transition-all duration-200"
                      onClick={() =>
                        handleWalletConnect("Twitter")
                      }
                    >
                      <Twitter className="w-[18px] h-[18px] flex-shrink-0" />
                      <span className="flex-1 text-left">
                        Twitter
                      </span>
                    </Button>

                    <Button
                      variant="outline"
                      className="flex items-center justify-start gap-2 rounded-full min-h-12 px-4 border-[#D1D9E1] hover:bg-[#E3F2FD] hover:border-[#1E88E5] transition-all duration-200"
                      onClick={() =>
                        handleWalletConnect("Github")
                      }
                    >
                      <Github className="w-[18px] h-[18px] flex-shrink-0" />
                      <span className="flex-1 text-left">
                        Github
                      </span>
                    </Button>

                    <Button
                      variant="outline"
                      className="flex items-center justify-start gap-2 rounded-full min-h-12 px-4 border-[#D1D9E1] hover:bg-[#E3F2FD] hover:border-[#1E88E5] transition-all duration-200"
                      onClick={() =>
                        handleWalletConnect("MetaMask")
                      }
                    >
                      <Wallet className="w-[18px] h-[18px] flex-shrink-0" />
                      <span className="flex-1 text-left">
                        MetaMask
                      </span>
                    </Button>

                    <Button
                      variant="outline"
                      className="flex items-center justify-start gap-2 rounded-full min-h-12 px-4 border-[#D1D9E1] hover:bg-[#E3F2FD] hover:border-[#1E88E5] transition-all duration-200"
                      onClick={() =>
                        handleWalletConnect("WalletConnect")
                      }
                    >
                      <Wallet className="w-[18px] h-[18px] flex-shrink-0" />
                      <span className="flex-1 text-left">
                        WalletConnect
                      </span>
                    </Button>

                    <Button
                      variant="outline"
                      className="flex items-center justify-start gap-2 rounded-full min-h-12 px-4 border-[#D1D9E1] hover:bg-[#E3F2FD] hover:border-[#1E88E5] transition-all duration-200"
                      onClick={() =>
                        handleWalletConnect("Coinbase Wallet")
                      }
                    >
                      <Wallet className="w-[18px] h-[18px] flex-shrink-0" />
                      <span className="flex-1 text-left">
                        Coinbase
                      </span>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : showCryptoSelection ? (
            <div className="flex flex-col pt-4 pb-6 px-0 space-y-4">
              <div className="text-center space-y-2">
                <h2 className="text-4xl">
                  {formatPrice(currentPayment?.price || 156.78, currentPayment?.baseCurrency)}
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
                  networks={supportedChains.filter((chain) => {
                    // First check merchant config - only show chains enabled for selected token
                    const availableChains =
                      getAvailableChainsForToken(
                        selectedCrypto,
                      );
                    const isEnabledByMerchant =
                      availableChains.includes(chain.id);

                    // Then check payment link restrictions (if any)
                    const isAllowedByPaymentLink =
                      !currentPayment?.availableChains ||
                      currentPayment.availableChains.length ===
                        0 ||
                      currentPayment.availableChains.includes(
                        chain.id,
                      );

                    return (
                      isEnabledByMerchant &&
                      isAllowedByPaymentLink
                    );
                  })}
                  selectedNetwork={selectedChain}
                  onNetworkChange={(networkId) => {
                    setSelectedChain(networkId);
                    // Auto-adjust currency if current one is not available on new chain
                    const availableTokens =
                      getAvailableTokensForChain(networkId);
                    if (
                      !availableTokens.includes(selectedCrypto)
                    ) {
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
                    .filter((crypto) => {
                      // First check merchant config - only show tokens enabled for selected chain
                      const availableTokens =
                        getAvailableTokensForChain(
                          selectedChain,
                        );
                      const isEnabledByMerchant =
                        availableTokens.includes(crypto.symbol);

                      // Determine currency variant based on available currencies
                      const currencyVariant = (currentPayment?.availableCurrencies?.length || 3) === 1 ? "single" : "multiple";
                      
                      // Then apply simulation variant filter
                      const simulatedCurrencies =
                        currencyVariant === "single"
                          ? ["USDC"]
                          : ["USDC", "USDT", "EURC"];

                      // If currentPayment has availableCurrencies set, use that, otherwise use simulation
                      const allowedCurrencies =
                        currentPayment?.availableCurrencies &&
                        currentPayment.availableCurrencies
                          .length > 0
                          ? currentPayment.availableCurrencies
                          : simulatedCurrencies;

                      const isAllowedByPaymentLink =
                        allowedCurrencies.includes(
                          crypto.symbol,
                        );

                      return (
                        isEnabledByMerchant &&
                        isAllowedByPaymentLink
                      );
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
                        selectedChain,
                      ).toFixed(2),
                      hasSufficientBalance:
                        hasSufficientBalance(crypto.symbol),
                    }))}
                  selectedCrypto={selectedCrypto}
                  onCryptoChange={(cryptoSymbol) => {
                    setSelectedCrypto(cryptoSymbol);
                    // Auto-adjust chain if current one is not available for new token
                    const availableChains =
                      getAvailableChainsForToken(cryptoSymbol);
                    if (
                      !availableChains.includes(selectedChain)
                    ) {
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
                  if (
                    !isTokenChainEnabled(
                      selectedCrypto,
                      selectedChain,
                    )
                  ) {
                    toast.error(
                      `${selectedCrypto} is not accepted on ${getChainName(selectedChain)}`,
                    );
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
                {/* Balance Comparison Boxes - Side by Side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Current Balance Box */}
                  <div className="bg-[#FF5914]/10 p-4 rounded-2xl border border-[#FF5914]/30">
                    <div className="text-sm text-[#1C1B1F] dark:text-[#F6F7F9] mb-1">
                      You have:
                    </div>
                    <div className="text-2xl font-medium text-[#FF5914]">
                      {getWalletBalance(
                        selectedCrypto,
                        selectedChain,
                      ).toFixed(2)}{" "}
                      {selectedCrypto}
                    </div>
                  </div>

                  {/* Required Amount Box */}
                  <div className="bg-[#1E88E5]/10 p-4 rounded-2xl border border-[#1E88E5]/30">
                    <div className="text-sm text-[#1C1B1F] dark:text-[#F6F7F9] mb-1">
                      Required:
                    </div>
                    <div className="text-2xl font-medium text-[#1E88E5]">
                      {parseFloat(
                        calculateCryptoAmount(
                          currentPayment?.price || 156.78,
                          selectedCrypto,
                        ),
                      ).toFixed(2)}{" "}
                      {selectedCrypto}
                    </div>
                  </div>
                </div>

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
                    {selectedCrypto} on{" "}
                    {getChainName(selectedChain)} to continue
                  </p>
                </div>

                <div className="space-y-4">
                  <Label>Choose funding method:</Label>

                  {/* QR Code or Copy Wallet Address Option */}
                  <div
                    className="p-4 min-h-16 border border-[#43586C] rounded-2xl cursor-pointer transition-all duration-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] hover:border-[#1E88E5]"
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
                          Transfer {selectedCrypto}{" "}
                          {getChainName(selectedChain)} from
                          another wallet
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Credit Card Option */}
                  <div
                    className="p-4 min-h-16 border border-[#43586C] rounded-2xl cursor-pointer transition-all duration-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] hover:border-[#1E88E5]"
                    onClick={() => {
                      setFundingMethod("card");
                      setShowOnRamper(true);
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <CreditCard className="w-6 h-6 text-[#1E88E5] flex-shrink-0" />
                      <div>
                        <p>Buy with Credit Card</p>
                        <p className="text-muted-foreground">
                          Purchase {selectedCrypto}{" "}
                          {getChainName(selectedChain)}{" "}
                          instantly
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
                  {formatPrice(currentPayment?.price || 156.78, currentPayment?.baseCurrency)}
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
                  {formatPrice(currentPayment?.price || 156.78, currentPayment?.baseCurrency)}
                </h2>
                <p className="text-muted-foreground">
                  {currentPayment
                    ? currentPayment.description
                    : "Payment to CryptoStore"}
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
            <div className="rounded-2xl overflow-hidden border border-[#D1D9E1]">
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

      {/* Scan to Add Funds Dialog */}
      {showQRFunding && (
        <Dialog
          open={showQRFunding}
          onOpenChange={(open) => {
            setShowQRFunding(open);
            if (!open) {
              setFundingMethod("");
            }
          }}
        >
        <DialogContent 
          className="w-full max-w-[448px] h-auto max-h-[90vh] p-0 overflow-hidden rounded-3xl"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {/* Header */}
          <DialogHeader className="p-6 pb-3">
            <DialogTitle>Scan to Add Funds</DialogTitle>
            <DialogDescription className="mt-1">
              Send {selectedCrypto} - {getChainName(selectedChain)} to complete payment
            </DialogDescription>
          </DialogHeader>

          {/* Content - Compact Layout */}
          <div className="px-6 pb-6 space-y-4">
            {/* QR Code Section */}
            <div className="bg-white dark:bg-[#2E3C49] p-3 rounded-2xl border border-[#D1D9E1] dark:border-[#43586C] flex items-center justify-center">
              <QRCodeCanvas
                value={walletAddress || "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"}
                size={160}
                level="H"
                includeMargin={true}
              />
            </div>

            {/* Wallet Address with Copy */}
            <div className="bg-[#FAFAFA] dark:bg-[#303030] px-3 py-2.5 rounded-xl border border-[#D1D9E1] dark:border-[#43586C] flex items-center justify-between">
              <span className="font-mono text-sm text-[#1C1B1F] dark:text-[#F6F7F9]">
                {formatAddress(walletAddress || "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb")}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 rounded-lg hover:bg-[#1E88E5]/10 transition-all duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  copyToClipboard(walletAddress || "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb");
                }}
              >
                {copiedItem === (walletAddress || "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb") ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 text-[#1E88E5]" />
                )}
              </Button>
            </div>

            {/* Balance & Required - Compact Cards */}
            <div className="space-y-3">
              {/* Balance Card - Dynamic color based on funding status */}
              <div className={`p-3 rounded-2xl border-2 ${
                qrFundingBalance >= parseFloat(calculateCryptoAmount(currentPayment?.price || 156.78, selectedCrypto))
                  ? "bg-[#7DD069]/10 dark:bg-[#7DD069]/20 border-[#7DD069]"
                  : "bg-[#FF5914]/10 dark:bg-[#FF5914]/20 border-[#FF5914]"
              }`}>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#1C1B1F] dark:text-[#F6F7F9]">Balance</p>
                  <div className="text-right">
                    <p className="text-2xl font-medium text-[#1C1B1F] dark:text-[#F6F7F9]">{qrFundingBalance.toFixed(2)}</p>
                    <p className="text-xs text-[#1C1B1F] dark:text-[#F6F7F9]">{selectedCrypto}</p>
                  </div>
                </div>
              </div>

              {/* Required Amount Card - Fixed visibility */}
              <div className="bg-[#1E88E5]/10 dark:bg-[#1E88E5]/20 p-3 rounded-2xl border-2 border-[#1E88E5]">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#1C1B1F] dark:text-[#F6F7F9]">Required</span>
                    <span className="text-xl font-medium text-[#1E88E5]">
                      {parseFloat(calculateCryptoAmount(
                        currentPayment?.price || 156.78,
                        selectedCrypto,
                      )).toFixed(2)} {selectedCrypto}
                    </span>
                  </div>

                  {/* Compact Status Message */}
                  <p className="text-xs text-[#1C1B1F] dark:text-[#F6F7F9] text-center">
                    {qrFundingBalance >= parseFloat(calculateCryptoAmount(currentPayment?.price || 156.78, selectedCrypto))
                      ? "✓ Funds received!"
                      : `Waiting for deposit... (${(parseFloat(calculateCryptoAmount(currentPayment?.price || 156.78, selectedCrypto)) - qrFundingBalance).toFixed(2)} ${selectedCrypto})`}
                  </p>
                </div>
              </div>
            </div>

            {/* Check for Funds Button */}
            <div className="space-y-2">
              <Button
                className="w-full rounded-full min-h-12 bg-[#1E88E5] text-white hover:bg-[#1565C0] transition-all duration-200"
                onClick={handleCheckFunds}
                disabled={isCheckingFunds}
              >
                {isCheckingFunds ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Checking for funds...
                  </>
                ) : (
                  "Check for Funds"
                )}
              </Button>

              {/* Test Mode - Expandable */}
              <div className="space-y-2">
                <button
                  type="button"
                  className="w-full text-center text-xs text-muted-foreground hover:text-[#1E88E5] transition-colors duration-200 py-1 flex items-center justify-center gap-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    startTransition(() => {
                      setShowTestMode(!showTestMode);
                    });
                  }}
                >
                  Test Mode{" "}
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      showTestMode ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Test Mode Options */}
                {showTestMode && (
                  <div className="space-y-2 animate-in slide-in-from-top-2 duration-200">
                    <Button
                      variant="outline"
                      className="w-full rounded-full min-h-10 border-[#7DD069] text-[#7DD069] hover:bg-[#7DD069] hover:text-white transition-all duration-200"
                      onClick={() => {
                        // Simulate full funds received
                        const requiredAmount = parseFloat(
                          calculateCryptoAmount(
                            currentPayment?.price || 156.78,
                            selectedCrypto,
                          ),
                        );
                        setQrFundingBalance(requiredAmount);
                        toast("Test Mode: Funds received!");
                        setShowTestMode(false);
                      }}
                    >
                      Simulate Funds Received
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full rounded-full min-h-10 border-[#D9C370] text-[#D9C370] hover:bg-[#D9C370] hover:text-[#2E3C49] transition-all duration-200"
                      onClick={() => {
                        // Simulate insufficient funds (50% of required)
                        const requiredAmount = parseFloat(
                          calculateCryptoAmount(
                            currentPayment?.price || 156.78,
                            selectedCrypto,
                          ),
                        );
                        setQrFundingBalance(requiredAmount * 0.5);
                        toast("Test Mode: Partial funds received!");
                        setShowTestMode(false);
                      }}
                    >
                      Simulate Not Enough Funds
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
        </Dialog>
      )}
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
        return <AdminDashboard />;
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
      case "api":
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
        return <WebhooksPage />;
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
        return <AdminDashboard />;
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
        {/* Top Header/App Bar - Hide for standalone pages (checkout, login) */}
        {shouldShowNavigation() && (
            <header className="sticky top-0 z-40 bg-white dark:bg-[#0A0A0A]">
              <div className="flex items-center justify-between px-4 md:px-6 h-16">
                {/* Mobile: Logo */}
                <div className="md:hidden">
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
                </div>

                {/* Desktop: Empty spacer (rail logo is sufficient) */}
                <div className="hidden md:block flex-1"></div>

                {/* Right Side Actions (both mobile and desktop) */}
                <div className="flex items-center gap-3">
                  {/* Theme Toggle */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    className="rounded-full"
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
                          {userContext === 'enduser' ? 'Alex Johnson' : 'John Doe'}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {userContext === 'enduser' ? 'alex@example.com' : 'john@pymstr.com'}
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

        {/* Main Content */}
        <main className="pb-24 md:pb-6">
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