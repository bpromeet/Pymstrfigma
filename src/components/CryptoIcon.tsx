import React from "react";
import usdcLogo from "figma:asset/b8084771bd1f1bf87626c826ff2fac011f016ed9.png";
import usdtLogo from "figma:asset/90dac8c11ffff8e0b345d11a55049c088eff2165.png";
import eurcLogo from "figma:asset/d915232b9755e23483dcfab1a692cf654672354f.png";

interface CryptoIconProps {
  symbol: string;
  className?: string;
  size?: number;
}

// Inline SVG fallbacks for crypto logos
const CryptoSVGFallback: React.FC<{ symbol: string; size: number; className: string }> = ({ symbol, size, className }) => {
  const upperSymbol = symbol.toUpperCase();
  
  if (upperSymbol === "USDC") {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <circle cx="16" cy="16" r="16" fill="#2775CA"/>
        <path d="M20.5 18.5C20.5 20.433 18.933 22 17 22H15C13.067 22 11.5 20.433 11.5 18.5V13.5C11.5 11.567 13.067 10 15 10H17C18.933 10 20.5 11.567 20.5 13.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M14 16H18" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    );
  }
  
  if (upperSymbol === "USDT") {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <circle cx="16" cy="16" r="16" fill="#26A17B"/>
        <path d="M16 11V21M13 14H19M11 11H21" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  
  if (upperSymbol === "EURC") {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <circle cx="16" cy="16" r="16" fill="#2775CA"/>
        <path d="M19 12C18 11 17 10.5 15.5 10.5C13 10.5 11 12.5 11 16C11 19.5 13 21.5 15.5 21.5C17 21.5 18 21 19 20M10 14H16M10 18H16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  
  // Generic fallback
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="16" cy="16" r="16" fill="#6B7280"/>
      <text x="16" y="20" fontSize="12" fill="white" textAnchor="middle" fontWeight="600">{symbol.slice(0, 2)}</text>
    </svg>
  );
};

/**
 * CryptoIcon - Displays cryptocurrency logo based on symbol
 * 
 * Supported symbols: USDC, USDT, EURC
 * 
 * Usage:
 * ```tsx
 * <CryptoIcon symbol="USDC" />
 * <CryptoIcon symbol="USDT" size={32} />
 * <CryptoIcon symbol="EURC" className="rounded-full" />
 * ```
 */
export const CryptoIcon: React.FC<CryptoIconProps> = ({ 
  symbol, 
  className = "", 
  size = 40 
}) => {
  const [imageError, setImageError] = React.useState(false);
  
  const getCryptoLogo = (sym: string) => {
    switch (sym.toUpperCase()) {
      case "USDC":
        return usdcLogo;
      case "USDT":
        return usdtLogo;
      case "EURC":
        return eurcLogo;
      default:
        return null;
    }
  };

  const logoSrc = getCryptoLogo(symbol);

  // If image failed to load or no logo source, use SVG fallback
  if (imageError || !logoSrc) {
    return <CryptoSVGFallback symbol={symbol} size={size} className={className} />;
  }

  return (
    <img
      src={logoSrc}
      alt={`${symbol} logo`}
      width={size}
      height={size}
      className={className}
      onError={() => setImageError(true)}
    />
  );
};