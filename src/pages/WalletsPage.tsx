import { useState } from "react";
import {
  Wallet,
  ArrowLeft,
  ChevronRight,
  Settings,
  Save,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Switch } from "../components/ui/switch";
import { toast } from "sonner@2.0.3";
import QRCode from "qrcode";
import PageLayout from "../components/PageLayout";
import { CryptoIcon } from "../components/CryptoIcon";
import WalletMainActionButton from "../components/WalletMainActionButton";
import { ManageCoin } from "../components/ManageCoin";

// Import network logos
import ethLogo from "./imports/eth.svg";
import polygonLogo from "./imports/polygon.svg";
import arbitrumLogo from "./imports/arbitrum.svg";
import optimismLogo from "./imports/optimism.svg";

interface WalletBalance {
  [crypto: string]: number;
}

interface ChainBalances {
  [crypto: string]: {
    [chain: string]: number;
  };
}

interface WalletData {
  id: string;
  name: string;
  address: string;
  balance: WalletBalance;
  chainBalances?: ChainBalances;
  isDefault: boolean;
  emailNotifications: boolean;
}

interface WalletsPageProps {
  wallets: WalletData[];
  setWallets: React.Dispatch<React.SetStateAction<WalletData[]>>;
  theme: string;
  editingWallet: string | null;
  setEditingWallet: React.Dispatch<React.SetStateAction<string | null>>;
  handleUpdateWallet: (
    walletId: string,
    updates: Partial<WalletData>
  ) => void;
}

export default function WalletsPage({
  wallets,
  setWallets,
  theme,
  editingWallet,
  setEditingWallet,
  handleUpdateWallet,
}: WalletsPageProps) {
  const mainWallet = wallets.find((w) => w.isDefault);
  const [selectedCrypto, setSelectedCrypto] = useState<string>("");
  const [showingCurrency, setShowingCurrency] = useState(false);
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
        description:
          "Both amount and destination address are required",
        style: {
          background: theme === "dark" ? "#2E3C49" : "#ffffff",
          border: `1px solid #FF5914`,
          color: theme === "dark" ? "#F6F7F9" : "#1a1a1a",
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
        description:
          amt <= 0
            ? "Amount must be greater than 0"
            : `Insufficient balance. Available: ${mainWallet.balance[selectedCrypto]?.toFixed(2)} ${selectedCrypto}`,
        style: {
          background: theme === "dark" ? "#2E3C49" : "#ffffff",
          border: `1px solid #FF5914`,
          color: theme === "dark" ? "#F6F7F9" : "#1a1a1a",
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
          background: theme === "dark" ? "#2E3C49" : "#ffffff",
          border: `1px solid #7DD069`,
          color: theme === "dark" ? "#F6F7F9" : "#1a1a1a",
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
          background: theme === "dark" ? "#2E3C49" : "#ffffff",
          border: `1px solid #FF5914`,
          color: theme === "dark" ? "#F6F7F9" : "#1a1a1a",
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
            background: theme === "dark" ? "#2E3C49" : "#ffffff",
            border: `1px solid #7DD069`,
            color: theme === "dark" ? "#F6F7F9" : "#1a1a1a",
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
          background: theme === "dark" ? "#2E3C49" : "#ffffff",
          border: `1px solid #FF5914`,
          color: theme === "dark" ? "#F6F7F9" : "#1a1a1a",
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
              <Button
                variant="outline"
                onClick={backToList}
                className="rounded-full"
              >
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
                          <Badge className="bg-[#D4EDDA] text-[#155724] dark:bg-[#032e15] dark:text-[#05df72] rounded-full border-0">
                            Active
                          </Badge>
                        </div>
                      </div>

                      {/* Mobile View - Cards */}
                      <div className="md:hidden space-y-3">
                        {Object.entries(
                          mainWallet.balance,
                        ).map(([crypto, balance]) => (
                          <div
                            key={crypto}
                            onClick={() =>
                              selectCurrency(crypto)
                            }
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
                        ))}
                      </div>

                      {/* Desktop View - Table */}
                      <div className="hidden md:block shadow-sm rounded-2xl overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="pl-6">
                                Currency
                              </TableHead>
                              <TableHead>Balance</TableHead>
                              <TableHead>USD Value</TableHead>
                              <TableHead className="text-right pr-6">
                                Actions
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {Object.entries(
                              mainWallet.balance,
                            ).map(([crypto, balance]) => (
                              <TableRow
                                key={crypto}
                                onClick={() =>
                                  selectCurrency(crypto)
                                }
                                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-200"
                              >
                                <TableCell className="pl-6">
                                  <div className="flex items-center space-x-3">
                                    <CryptoIcon
                                      symbol={crypto}
                                    />
                                    <div>
                                      <p className="text-gray-900 dark:text-white font-medium">
                                        {crypto}
                                      </p>
                                      <p className="text-sm text-muted-foreground">
                                        {getCryptoName(
                                          crypto,
                                        )}
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
                                    ≈ ${balance.toFixed(2)}{" "}
                                    USD
                                  </p>
                                </TableCell>
                                <TableCell className="text-right pr-6">
                                  <div className="flex items-center justify-end gap-2 text-[#07D7FF]">
                                    <span className="text-sm">
                                      Manage
                                    </span>
                                    <ChevronRight className="w-4 h-4" />
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
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
                                  handleUpdateWallet(
                                    mainWallet.id,
                                    {
                                      emailNotifications:
                                        checked,
                                    },
                                  )
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
                                onClick={() =>
                                  setEditingWallet(null)
                                }
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
            <div className="hidden md:block">
              <ManageCoin
                selectedCrypto={selectedCrypto}
                totalBalance={
                  mainWallet.balance[selectedCrypto] || 0
                }
                chainBalances={
                  mainWallet.chainBalances?.[
                    selectedCrypto
                  ] || {}
                }
                onBack={backToList}
                walletAddress={mainWallet.address}
                variant="desktop"
              />
            </div>
          )}
        </div>
      </PageLayout.Content>

      {/* Mobile: Full Screen View for Manage Crypto */}
      {showingCurrency && (
        <ManageCoin
          selectedCrypto={selectedCrypto}
          totalBalance={
            mainWallet.balance[selectedCrypto] || 0
          }
          chainBalances={
            mainWallet.chainBalances?.[selectedCrypto] || {}
          }
          onBack={backToList}
          walletAddress={mainWallet.address}
          variant="mobile-sheet"
        />
      )}
    </PageLayout>
  );
}
