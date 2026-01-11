import React from "react";

interface PymstrLogoProps {
  variant?: "full" | "icon" | "wordmark";
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  transparent?: boolean;
  theme?: "default" | "terminal";
  onClick?: () => void;
  userType?: "merchant" | "enduser"; // User type for color variation
}

/**
 * PymstrLogo - PYMSTR brand logo component
 * 
 * Variants:
 * - full: Icon + wordmark (default)
 * - icon: Just the "P" icon
 * - wordmark: Just "PYMSTR" text
 * 
 * UserType:
 * - merchant: Orange color (#FF5914) - default
 * - enduser: Cyan color (#06D7FF)
 */
export const PymstrLogo: React.FC<PymstrLogoProps> = ({ 
  variant = "full", 
  className = "",
  size = "md",
  transparent = false,
  theme = "default",
  onClick,
  userType = "merchant"
}) => {
  // Determine color based on user type
  const brandColor = userType === "enduser" ? "#06D7FF" : "#ff5722";
  
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
        <>
          {/* Light mode icon */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={`${sizeClasses[size]} w-auto dark:hidden`}>
            <rect width="32" height="32" fill="#e8e4dc" fillOpacity="0.5" rx="8" ry="8"/>
            <rect x="6" y="10" width="2" height="12" fill={brandColor}/>
            <rect x="9" y="8" width="2" height="16" fill={brandColor}/>
            <rect x="12" y="10" width="2" height="12" fill={brandColor}/>
            <rect x="15" y="7" width="2" height="18" fill={brandColor}/>
            <rect x="18" y="10" width="2" height="12" fill={brandColor}/>
            <rect x="21" y="8" width="2" height="16" fill={brandColor}/>
            <rect x="24" y="10" width="2" height="12" fill={brandColor}/>
          </svg>
          {/* Dark mode icon */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={`${sizeClasses[size]} w-auto hidden dark:block`}>
            <rect width="32" height="32" fill="#1a1a1a" rx="8" ry="8"/>
            <rect x="6" y="10" width="2" height="12" fill={brandColor}/>
            <rect x="9" y="8" width="2" height="16" fill={brandColor}/>
            <rect x="12" y="10" width="2" height="12" fill={brandColor}/>
            <rect x="15" y="7" width="2" height="18" fill={brandColor}/>
            <rect x="18" y="10" width="2" height="12" fill={brandColor}/>
            <rect x="21" y="8" width="2" height="16" fill={brandColor}/>
            <rect x="24" y="10" width="2" height="12" fill={brandColor}/>
          </svg>
        </>
      </div>
    );
  }

  // Wordmark-only variant
  if (variant === "wordmark") {
    return (
      <div 
        className={`inline-flex items-center ${className}`}
        onClick={onClick}
        style={{ color: brandColor }}
      >
        <span className={`font-bold ${textSizeClasses[size]}`}>
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
        <span className={`font-bold ${iconTextSizeClasses[size]}`} style={{ color: brandColor }}>
          P
        </span>
      ) : (
        <>
          {/* Light mode logo */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={`${sizeClasses[size]} w-auto dark:hidden`}>
            <rect width="32" height="32" fill="#e8e4dc" fillOpacity="0.5" rx="8" ry="8"/>
            <rect x="6" y="10" width="2" height="12" fill={brandColor}/>
            <rect x="9" y="8" width="2" height="16" fill={brandColor}/>
            <rect x="12" y="10" width="2" height="12" fill={brandColor}/>
            <rect x="15" y="7" width="2" height="18" fill={brandColor}/>
            <rect x="18" y="10" width="2" height="12" fill={brandColor}/>
            <rect x="21" y="8" width="2" height="16" fill={brandColor}/>
            <rect x="24" y="10" width="2" height="12" fill={brandColor}/>
          </svg>
          {/* Dark mode logo */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={`${sizeClasses[size]} w-auto hidden dark:block`}>
            <rect width="32" height="32" fill="#1a1a1a" rx="8" ry="8"/>
            <rect x="6" y="10" width="2" height="12" fill={brandColor}/>
            <rect x="9" y="8" width="2" height="16" fill={brandColor}/>
            <rect x="12" y="10" width="2" height="12" fill={brandColor}/>
            <rect x="15" y="7" width="2" height="18" fill={brandColor}/>
            <rect x="18" y="10" width="2" height="12" fill={brandColor}/>
            <rect x="21" y="8" width="2" height="16" fill={brandColor}/>
            <rect x="24" y="10" width="2" height="12" fill={brandColor}/>
          </svg>
        </>
      )}
      <span className={`font-bold ${textSizeClasses[size]}`} style={{ color: brandColor }}>
        PYMSTR
      </span>
    </div>
  );
};

export default PymstrLogo;
