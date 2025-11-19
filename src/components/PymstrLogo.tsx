import React from "react";

interface PymstrLogoProps {
  variant?: "full" | "icon" | "wordmark";
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  transparent?: boolean; // New prop for transparent icon background
  theme?: "default" | "terminal"; // Terminal theme for marketing site
  onClick?: () => void; // Click handler
}

/**
 * PymstrLogo - PYMSTR brand logo component
 * 
 * Variants:
 * - full: Icon + wordmark (default)
 * - icon: Just the "P" icon
 * - wordmark: Just "PYMSTR" text
 * 
 * Sizes:
 * - sm: Small (mobile nav, etc)
 * - md: Medium (default)
 * - lg: Large (hero sections)
 * - xl: Extra large (marketing pages)
 * 
 * Transparent:
 * - true: No background box on icon (just the P)
 * - false: Gradient background box (default)
 * 
 * Theme:
 * - default: Orange PYMSTR branding (#FF5914)
 * - terminal: Green monogram with black P (for marketing site)
 */
export const PymstrLogo: React.FC<PymstrLogoProps> = ({ 
  variant = "full", 
  className = "",
  size = "md",
  transparent = false,
  theme = "default",
  onClick
}) => {
  // Color scheme based on theme
  const colors = theme === "terminal" 
    ? {
        iconBg: "from-[#FF5914] to-[#FF5914]", // Orange background
        iconText: "text-white", // White P on orange background
        wordmark: "text-[#FF5914]" // PYMSTR orange text
      }
    : {
        iconBg: "from-white to-white", // White background for default too
        iconText: "text-[#FF5914]", // PYMSTR orange P on white background
        wordmark: "text-[#FF5914]" // PYMSTR orange text for default theme
      };

  const sizeClasses = {
    sm: "h-6",
    md: "h-8",
    lg: "h-12",
    xl: "h-16"
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl",
    xl: "text-5xl"
  };

  const iconTextSizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
    xl: "text-6xl"
  };

  // Icon-only variant
  if (variant === "icon") {
    return (
      <div 
        className={`inline-flex items-center justify-center ${className}`}
        onClick={onClick}
      >
        <span className={`font-bold ${colors.iconText} ${textSizeClasses[size]}`}>
          P
        </span>
      </div>
    );
  }

  // Wordmark-only variant
  if (variant === "wordmark") {
    return (
      <div 
        className={`inline-flex items-center ${className}`}
        onClick={onClick}
      >
        <span className={`font-bold ${colors.wordmark} ${textSizeClasses[size]}`}>
          PYMSTR
        </span>
      </div>
    );
  }

  // Full logo (icon + wordmark)
  return (
    <div 
      className={`inline-flex items-center gap-3 ${className}`}
      onClick={onClick}
    >
      {transparent ? (
        // Transparent variant - just the P with no background
        <span className={`font-bold ${colors.wordmark} ${iconTextSizeClasses[size]}`}>
          P
        </span>
      ) : (
        // Variant with gradient background box
        <div className={`flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${colors.iconBg} ${sizeClasses[size]}`}>
          <span className={`${colors.iconText} font-bold text-xl`}>P</span>
        </div>
      )}
      <span className={`font-bold ${colors.wordmark} ${textSizeClasses[size]}`}>
        PYMSTR
      </span>
    </div>
  );
};

export default PymstrLogo;