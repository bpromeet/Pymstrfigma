import React from "react";
import usdcLogo from "figma:asset/b8084771bd1f1bf87626c826ff2fac011f016ed9.png";
import usdtLogo from "figma:asset/90dac8c11ffff8e0b345d11a55049c088eff2165.png";
import eurcLogo from "figma:asset/d915232b9755e23483dcfab1a692cf654672354f.png";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CryptoIconProps {
  symbol: string;
  className?: string;
  size?: number;
}

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
  const getCryptoLogo = (sym: string) => {
    switch (sym.toUpperCase()) {
      case "USDC":
        return usdcLogo;
      case "USDT":
        return usdtLogo;
      case "EURC":
        return eurcLogo;
      default:
        return usdcLogo; // fallback
    }
  };

  return (
    <ImageWithFallback
      src={getCryptoLogo(symbol)}
      alt={`${symbol} logo`}
      width={size}
      height={size}
      className={`rounded-full ${className}`}
    />
  );
};
