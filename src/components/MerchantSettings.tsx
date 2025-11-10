import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { toast } from "sonner@2.0.3";
import { Coins, Shield, CheckCircle, X, CircleDollarSign, Hexagon, Triangle, Pentagon, Square, Layers, Edit, Save, RotateCcw } from "lucide-react";
import PageLayout from "./PageLayout";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

// Type definitions
interface TokenChainPair {
  token: string;
  chains: string[];
}

interface MerchantConfig {
  merchantId: string;
  acceptedPayments: TokenChainPair[];
}

interface MerchantSettingsProps {
  initialConfig?: MerchantConfig;
  onSave?: (config: MerchantConfig) => void;
}

const MerchantSettings: React.FC<MerchantSettingsProps> = ({ 
  initialConfig,
  onSave 
}) => {
  const AVAILABLE_TOKENS = ["USDC", "USDT", "EURC"];
  const AVAILABLE_CHAINS = ["Ethereum", "Polygon", "Arbitrum", "Optimism", "Base"];

  // Token icon mapping (using 18dp icons per MD3 standard)
  const getTokenIcon = (token: string) => {
    const iconProps = { className: "w-[18px] h-[18px]" };
    switch (token) {
      case "USDC":
        return <CircleDollarSign {...iconProps} className="w-[18px] h-[18px] text-[#2775CA]" />;
      case "USDT":
        return <CircleDollarSign {...iconProps} className="w-[18px] h-[18px] text-[#26A17B]" />;
      case "EURC":
        return <CircleDollarSign {...iconProps} className="w-[18px] h-[18px] text-[#8247E5]" />;
      default:
        return <Coins {...iconProps} />;
    }
  };

  // Chain icon mapping (using 18dp icons per MD3 standard)
  const getChainIcon = (chain: string) => {
    const iconProps = { className: "w-[18px] h-[18px]" };
    switch (chain) {
      case "Ethereum":
        return <Hexagon {...iconProps} className="w-[18px] h-[18px] text-[#627EEA]" />;
      case "Polygon":
        return <Pentagon {...iconProps} className="w-[18px] h-[18px] text-[#8247E5]" />;
      case "Arbitrum":
        return <Triangle {...iconProps} className="w-[18px] h-[18px] text-[#28A0F0]" />;
      case "Optimism":
        return <CircleDollarSign {...iconProps} className="w-[18px] h-[18px] text-[#FF0420]" />;
      case "Base":
        return <Square {...iconProps} className="w-[18px] h-[18px] text-[#0052FF]" />;
      default:
        return <Layers {...iconProps} />;
    }
  };

  // Chain name mapping (capitalize first letter for display, lowercase for internal use)
  const normalizeChainName = (chain: string): string => {
    return chain.charAt(0).toUpperCase() + chain.slice(1).toLowerCase();
  };

  // Initialize with provided config or default configuration (all enabled)
  const [config, setConfig] = useState<MerchantConfig>(
    initialConfig || {
      merchantId: "MERCH123",
      acceptedPayments: [
        { token: "USDC", chains: ["Ethereum", "Polygon", "Arbitrum", "Optimism", "Base"] },
        { token: "USDT", chains: ["Ethereum", "Polygon", "Arbitrum", "Optimism", "Base"] },
        { token: "EURC", chains: ["Ethereum", "Polygon", "Arbitrum", "Optimism", "Base"] },
      ],
    }
  );

  const [hasChanges, setHasChanges] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showSecurityDialog, setShowSecurityDialog] = useState(false);

  // Check if a specific token-chain combination is enabled
  const isChainEnabled = (token: string, chain: string): boolean => {
    const tokenConfig = config.acceptedPayments.find((p) => p.token === token);
    return tokenConfig ? tokenConfig.chains.includes(chain) : false;
  };

  // Handle Edit button click - show security dialog
  const handleEditClick = () => {
    setShowSecurityDialog(true);
  };

  // Handle security confirmation - enable edit mode
  const handleSecurityConfirm = () => {
    setIsEditMode(true);
    setShowSecurityDialog(false);
    toast.success("Edit mode enabled");
  };

  // Toggle a specific token-chain combination
  const toggleChain = (token: string, chain: string) => {
    if (!isEditMode) return; // Only allow changes in edit mode
    
    setConfig((prev) => {
      const newAcceptedPayments = prev.acceptedPayments.map((payment) => {
        if (payment.token === token) {
          const chainIndex = payment.chains.indexOf(chain);
          if (chainIndex > -1) {
            // Remove chain
            return {
              ...payment,
              chains: payment.chains.filter((c) => c !== chain),
            };
          } else {
            // Add chain
            return {
              ...payment,
              chains: [...payment.chains, chain],
            };
          }
        }
        return payment;
      });

      return {
        ...prev,
        acceptedPayments: newAcceptedPayments,
      };
    });
    setHasChanges(true);
  };

  // Toggle all chains for a token
  const toggleAllChains = (token: string, enable: boolean) => {
    if (!isEditMode) return; // Only allow changes in edit mode
    
    setConfig((prev) => {
      const newAcceptedPayments = prev.acceptedPayments.map((payment) => {
        if (payment.token === token) {
          return {
            ...payment,
            chains: enable ? [...AVAILABLE_CHAINS] : [],
          };
        }
        return payment;
      });

      return {
        ...prev,
        acceptedPayments: newAcceptedPayments,
      };
    });
    setHasChanges(true);
  };

  // Check if all chains are enabled for a token
  const areAllChainsEnabled = (token: string): boolean => {
    const tokenConfig = config.acceptedPayments.find((p) => p.token === token);
    return tokenConfig ? tokenConfig.chains.length === AVAILABLE_CHAINS.length : false;
  };

  // Save configuration
  const handleSave = () => {
    // Validate that at least one token-chain combination is enabled
    const hasValidConfig = config.acceptedPayments.some(
      (payment) => payment.chains.length > 0
    );

    if (!hasValidConfig) {
      toast.error("Please enable at least one token-chain combination");
      return;
    }

    // Call the onSave callback if provided
    if (onSave) {
      // Convert chain names to lowercase for internal consistency
      const normalizedConfig = {
        ...config,
        acceptedPayments: config.acceptedPayments.map(payment => ({
          ...payment,
          chains: payment.chains.map(chain => chain.toLowerCase())
        }))
      };
      onSave(normalizedConfig);
    }

    // In a real app, this would make an API call
    console.log("Saving merchant configuration:", config);
    toast.success("Payment settings saved successfully");
    setHasChanges(false);
    setIsEditMode(false); // Exit edit mode after save
  };

  // Reset to default (all enabled)
  const handleReset = () => {
    setConfig({
      merchantId: "MERCH123",
      acceptedPayments: [
        { token: "USDC", chains: ["Ethereum", "Polygon", "Arbitrum", "Optimism", "Base"] },
        { token: "USDT", chains: ["Ethereum", "Polygon", "Arbitrum", "Optimism", "Base"] },
        { token: "EURC", chains: ["Ethereum", "Polygon", "Arbitrum", "Optimism", "Base"] },
      ],
    });
    setHasChanges(true);
    toast("Reset to default configuration");
  };

  // Get enabled count for a token
  const getEnabledCount = (token: string): number => {
    const tokenConfig = config.acceptedPayments.find((p) => p.token === token);
    return tokenConfig ? tokenConfig.chains.length : 0;
  };

  return (
    <PageLayout>
      <PageLayout.Header
        icon={<Coins className="w-6 h-6 text-[#07D7FF]" />}
        title="Payment Settings"
        subtitle="Configure which token-chain combinations your business accepts for payments"
      />
      <PageLayout.Content>
        <div className="space-y-6">

      {/* ========================================
          TOP ACTION BUTTONS
          
          Left: Edit/Save button (grey tonal when Edit, black when Save)
          Right: Reset to Default button
          ======================================== */}
      <div className="flex items-center justify-between gap-4">
        {/* Left: Edit/Save Button */}
        {!isEditMode ? (
          <Button
            onClick={handleEditClick}
            size={undefined}
            className="inline-flex items-center justify-center px-6 h-10 bg-[#303030] text-[#F6F7F9] hover:bg-[#2E3C49] transition-all duration-200 rounded-full"
          >
            <Edit className="w-[18px] h-[18px] mr-2" />
            Edit
          </Button>
        ) : (
          <Button
            onClick={handleSave}
            disabled={!hasChanges}
            size={undefined}
            className="inline-flex items-center justify-center px-6 h-10 bg-black text-white hover:bg-[#1a1a1a] disabled:bg-[#43586C] disabled:text-[#798A9B] disabled:opacity-38 transition-all duration-200 rounded-full"
          >
            <Save className="w-[18px] h-[18px] mr-2" />
            Save
          </Button>
        )}

        {/* Right: Reset to Default Button */}
        <Button
          onClick={handleReset}
          disabled={!isEditMode}
          size={undefined}
          variant="outline"
          className="inline-flex items-center justify-center px-6 h-10 rounded-full disabled:opacity-38 disabled:cursor-not-allowed transition-all duration-200"
        >
          <RotateCcw className="w-[18px] h-[18px] mr-2" />
          Reset to Default
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Accepted Token-Chain Pairs</CardTitle>
          <CardDescription>
            Enable or disable specific stablecoin and blockchain combinations for your checkout
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {AVAILABLE_TOKENS.map((token) => (
            <div key={token} className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {getTokenIcon(token)}
                    <span className="text-gray-900 dark:text-white">{token}</span>
                    <Badge
                      className={`${
                        getEnabledCount(token) > 0
                          ? "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
                      } rounded-full`}
                    >
                      {getEnabledCount(token)} / {AVAILABLE_CHAINS.length} chains
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => toggleAllChains(token, true)}
                    disabled={!isEditMode}
                    variant="outline"
                    size="sm"
                    className="rounded-full disabled:opacity-38 disabled:cursor-not-allowed"
                  >
                    Enable All
                  </Button>
                  <Button
                    onClick={() => toggleAllChains(token, false)}
                    disabled={!isEditMode}
                    variant="outline"
                    size="sm"
                    className="rounded-full disabled:opacity-38 disabled:cursor-not-allowed"
                  >
                    Disable All
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pl-4">
                {AVAILABLE_CHAINS.map((chain) => (
                  <div
                    key={`${token}-${chain}`}
                    className={`flex items-center justify-between p-4 rounded-3xl border ${
                      isChainEnabled(token, chain)
                        ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900"
                        : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                    }`}
                  >
                    <Label
                      htmlFor={`${token}-${chain}`}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      {isChainEnabled(token, chain) ? (
                        <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <X className="w-4 h-4 text-gray-400" />
                      )}
                      {getChainIcon(chain)}
                      <span className="text-gray-900 dark:text-white">{chain}</span>
                    </Label>
                    <Switch
                      id={`${token}-${chain}`}
                      checked={isChainEnabled(token, chain)}
                      onCheckedChange={() => toggleChain(token, chain)}
                      disabled={!isEditMode}
                      className="disabled:opacity-38 disabled:cursor-not-allowed"
                    />
                  </div>
                ))}
              </div>

              {token !== AVAILABLE_TOKENS[AVAILABLE_TOKENS.length - 1] && (
                <Separator className="mt-4" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Configuration Summary
          </CardTitle>
          <CardDescription>
            Overview of your current payment acceptance configuration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {config.acceptedPayments.map((payment) => (
            <div
              key={payment.token}
              className="flex items-center justify-between p-4 rounded-3xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-center gap-3">
                {getTokenIcon(payment.token)}
                <span className="text-gray-900 dark:text-white">{payment.token}</span>
                <Badge
                  className={`${
                    payment.chains.length > 0
                      ? "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400"
                      : "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400"
                  } rounded-full`}
                >
                  {payment.chains.length > 0 ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2 justify-end">
                {payment.chains.length > 0 ? (
                  payment.chains.map((chain) => (
                    <Badge
                      key={chain}
                      variant="outline"
                      className="rounded-full bg-white dark:bg-gray-800 flex items-center gap-1.5"
                    >
                      {getChainIcon(chain)}
                      {chain}
                    </Badge>
                  ))
                ) : (
                  <span className="text-muted-foreground">No chains enabled</span>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
        </div>
      </PageLayout.Content>

      {/* ========================================
          SECURITY CONFIRMATION DIALOG
          
          Shown when user clicks "Edit" button
          Confirms user wants to enter edit mode
          ======================================== */}
      <AlertDialog open={showSecurityDialog} onOpenChange={setShowSecurityDialog}>
        <AlertDialogContent className="bg-white dark:bg-[#303030] rounded-3xl p-8 shadow-xl max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#07D7FF]" />
              Security Confirmation
            </AlertDialogTitle>
            <AlertDialogDescription>
              You are about to edit your payment settings. This will allow you to modify which token-chain combinations your business accepts. Please confirm to continue.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex gap-3">
            <AlertDialogCancel className="rounded-full bg-transparent border border-[#43586C] text-[#F6F7F9] hover:bg-white/[0.08] hover:border-[#757575] transition-all duration-200">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleSecurityConfirm}
              className="rounded-full bg-[#1E88E5] text-white hover:bg-[#1565C0] transition-all duration-200"
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageLayout>
  );
};

export default MerchantSettings;
