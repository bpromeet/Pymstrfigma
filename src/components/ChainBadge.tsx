import React from "react";

interface ChainBadgeProps {
  chain: string;
  size?: "sm" | "md" | "lg";
}

/**
 * ChainBadge - Displays blockchain network badge with icon and name
 * 
 * Shows chain with appropriate color coding:
 * - Ethereum: Blue
 * - Polygon: Purple
 * - Arbitrum: Blue
 * - Optimism: Red
 * - Base: Blue
 */
export const ChainBadge: React.FC<ChainBadgeProps> = ({ chain, size = "md" }) => {
  const getChainColor = (chain: string) => {
    const colors: { [key: string]: { bg: string; text: string } } = {
      ethereum: { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400" },
      polygon: { bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-700 dark:text-purple-400" },
      arbitrum: { bg: "bg-cyan-100 dark:bg-cyan-900/30", text: "text-cyan-700 dark:text-cyan-400" },
      optimism: { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-700 dark:text-red-400" },
      base: { bg: "bg-indigo-100 dark:bg-indigo-900/30", text: "text-indigo-700 dark:text-indigo-400" },
    };
    return colors[chain.toLowerCase()] || { bg: "bg-gray-100 dark:bg-gray-900/30", text: "text-gray-700 dark:text-gray-400" };
  };

  const getChainIcon = (chain: string) => {
    const icons: { [key: string]: string } = {
      ethereum: "⟠", // Ethereum symbol
      polygon: "◆", // Polygon symbol
      arbitrum: "🔷", // Arbitrum symbol
      optimism: "🔴", // Optimism symbol
      base: "🔵", // Base symbol
    };
    return icons[chain.toLowerCase()] || "🔗";
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "px-2 py-0.5 text-xs";
      case "lg":
        return "px-4 py-2 text-sm";
      default: // md
        return "px-3 py-1 text-xs";
    }
  };

  const { bg, text } = getChainColor(chain);
  const capitalizedChain = chain.charAt(0).toUpperCase() + chain.slice(1);

  return (
    <span 
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${bg} ${text} ${getSizeClasses()}`}
    >
      <span>{getChainIcon(chain)}</span>
      <span>{capitalizedChain}</span>
    </span>
  );
};
