import React from "react";

export interface NetworkOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  logo: string;
}

interface NetworkSelectorProps {
  networks: NetworkOption[];
  selectedNetwork: string;
  onNetworkChange: (networkId: string) => void;
  className?: string;
}

/**
 * NetworkSelector - Reusable MD3 pill button grid for blockchain network selection
 * 
 * Features:
 * - MD3-compliant pill-shaped buttons (rounded-full)
 * - Grid layout (3 columns on mobile, responsive)
 * - Active state: Blue border + light blue background
 * - Hover state: Subtle grey background
 * - 48px minimum touch targets (MD3 requirement)
 * - Consistent across all network selection instances
 * 
 * Usage:
 * ```tsx
 * <NetworkSelector
 *   networks={supportedChains}
 *   selectedNetwork={selectedChain}
 *   onNetworkChange={setSelectedChain}
 * />
 * ```
 */
export const NetworkSelector: React.FC<NetworkSelectorProps> = ({
  networks,
  selectedNetwork,
  onNetworkChange,
  className = "",
}) => {
  return (
    <div className={`grid grid-cols-3 gap-2 ${className}`}>
      {networks.map((network) => (
        <button
          key={network.id}
          className={`flex items-center justify-center gap-2 px-3 py-2 min-h-12 border rounded-full cursor-pointer transition-all duration-200 ${
            selectedNetwork === network.id
              ? "border-[#757575] bg-[#757575] text-white dark:border-[#757575] dark:bg-[#757575]"
              : "border-[#D1D9E1] bg-transparent hover:bg-black/[0.04] dark:hover:bg-white/[0.04] dark:border-[#43586C]"
          }`}
          onClick={() => onNetworkChange(network.id)}
          aria-label={`Select ${network.name} network`}
          aria-pressed={selectedNetwork === network.id}
        >
          <div className="w-5 h-5 flex items-center justify-center shrink-0">
            {network.icon}
          </div>
          <span className="text-sm truncate">{network.name}</span>
        </button>
      ))}
    </div>
  );
};