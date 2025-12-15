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
 * NetworkSelector - Reusable MD3 horizontal scroll selector for blockchain network selection
 * 
 * Features:
 * - MD3-compliant circular icon buttons with horizontal scroll
 * - Active state: Blue border (#1E88E5) + light blue background
 * - Hover state: Border color change
 * - 64px circular touch targets (exceeds 48px MD3 requirement)
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
    <div className={className}>
      {/* Horizontal scrollable network icons */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {networks.map((network) => (
          <button
            key={network.id}
            className={`flex-shrink-0 w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
              selectedNetwork === network.id
                ? "border-[#1E88E5] bg-[#E3F2FD] dark:bg-[#1565C0]/20"
                : "border-[#D1D9E1] dark:border-[#43586C] bg-white dark:bg-[#2E3C49] hover:border-[#757575]"
            }`}
            onClick={() => onNetworkChange(network.id)}
            aria-label={`Select ${network.name} network`}
            aria-pressed={selectedNetwork === network.id}
          >
            <div className="w-10 h-10 flex items-center justify-center">
              {network.icon}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};