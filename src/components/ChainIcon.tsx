import React from 'react';

interface ChainIconProps {
  chain: string;
  className?: string;
  size?: number;
}

/**
 * ChainIcon - Displays blockchain network logo based on chain name
 * 
 * Pure SVG implementation - no external assets needed
 * Supported chains: Ethereum, Polygon, Arbitrum, Optimism, Base
 * 
 * Usage:
 * ```tsx
 * <ChainIcon chain="ethereum" />
 * <ChainIcon chain="polygon" size={24} />
 * <ChainIcon chain="base" className="shadow-lg" />
 * ```
 */
export const ChainIcon: React.FC<ChainIconProps> = ({
  chain,
  className = "",
  size = 40,
}) => {
  // Handle undefined/null chain
  if (!chain) {
    return (
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 32 32" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className={className}
      >
        <circle cx="16" cy="16" r="16" fill="#6B7280"/>
        <text 
          x="16" 
          y="20" 
          fontSize="12" 
          fill="white" 
          textAnchor="middle" 
          fontWeight="600"
        >
          ?
        </text>
      </svg>
    );
  }

  const chainLowerCase = chain.toLowerCase();
  // Handle base-sepolia (treat as base)
  const normalizedChain = chainLowerCase.includes('base') ? 'base' : chainLowerCase;

  // Ethereum - Purple diamond
  if (normalizedChain === 'ethereum') {
    return (
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 327.5 533.3" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className={className}
      >
        <path fill="#8A92B2" d="M163.7,197.2V0L0,271.6L163.7,197.2z"/>
        <path fill="#62688F" d="M163.7,368.4V197.2L0,271.6L163.7,368.4z M163.7,197.2l163.7,74.4L163.7,0V197.2z"/>
        <path fill="#454A75" d="M163.7,197.2v171.2l163.7-96.8L163.7,197.2z"/>
        <path fill="#8A92B2" d="M163.7,399.4L0,302.7l163.7,230.7V399.4z"/>
        <path fill="#62688F" d="M327.5,302.7l-163.8,96.7v134L327.5,302.7z"/>
      </svg>
    );
  }

  // Polygon - Purple interconnected network
  if (normalizedChain === "polygon") {
    return (
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 178 161" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className={className}
      >
        <path d="M66.8,54.7l-16.7-9.7L0,74.1v58l50.1,29l50.1-29V41.9L128,25.8l27.8,16.1v32.2L128,90.2l-16.7-9.7v25.8l16.7,9.7l50.1-29V29L128,0L77.9,29v90.2l-27.8,16.1l-27.8-16.1V86.9l27.8-16.1l16.7,9.7V54.7z" fill="#6C00F6"/>
      </svg>
    );
  }

  // Arbitrum - Blue geometric logo
  if (normalizedChain === 'arbitrum') {
    return (
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 2500 2500" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className={className}
      >
        <rect width="2500" height="2500" fill="#213147"/>
        <path d="M226,760v980c0,63,33,120,88,152l849,490c54,31,121,31,175,0l849-490c54-31,88-89,88-152V760c0-63-33-120-88-152l-849-490c-54-31-121-31-175,0L314,608c-54,31-87,89-87,152H226z" fill="#213147"/>
        <path d="M1435,1440l-121,332c-3,9-3,19,0,29l208,571l241-139l-289-793C1467,1422,1442,1422,1435,1440z" fill="#12AAFF"/>
        <path d="M1678,882c-7-18-32-18-39,0l-121,332c-3,9-3,19,0,29l341,935l241-139L1678,883V882z" fill="#12AAFF"/>
        <path d="M1250,155c6,0,12,2,17,5l918,530c11,6,17,18,17,30v1060c0,12-7,24-17,30l-918,530c-5,3-11,5-17,5s-12-2-17-5l-918-530c-11-6-17-18-17-30V719c0-12,7-24,17-30l918-530c5-3,11-5,17-5l0,0V155z M1250,0c-33,0-65,8-95,25L237,555c-59,34-95,96-95,164v1060c0,68,36,130,95,164l918,530c29,17,62,25,95,25s65-8,95-25l918-530c59-34,95-96,95-164V719c0-68-36-130-95-164L1344,25c-29-17-62-25-95-25l0,0H1250z" fill="#9DCCED"/>
        <polygon points="642,2179 727,1947 897,2088 738,2234" fill="#213147"/>
        <path d="M1172,644H939c-17,0-33,11-39,27L401,2039l241,139l550-1507c5-14-5-28-19-28L1172,644z" fill="#FFFFFF"/>
        <path d="M1580,644h-233c-17,0-33,11-39,27L738,2233l241,139l620-1701c5-14-5-28-19-28V644z" fill="#FFFFFF"/>
      </svg>
    );
  }

  // Optimism - Red circle with OP logo
  if (normalizedChain === 'optimism') {
    return (
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 500 500" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className={className}
      >
        <circle cx="250" cy="250" r="250" fill="#FF0420"/>
        <path d="M177.1,316.4c-14.9,0-27.1-3.5-36.6-10.5c-9.4-7.1-14.1-17.3-14.1-30.4c0-2.8,0.3-6.1,0.9-10.1c1.6-9,3.9-19.8,6.9-32.5c8.5-34.4,30.5-51.6,65.9-51.6c9.6,0,18.3,1.6,25.9,4.9c7.6,3.1,13.6,7.9,18,14.3c4.4,6.3,6.6,13.8,6.6,22.5c0,2.6-0.3,5.9-0.9,9.9c-1.9,11.1-4.1,22-6.8,32.5c-4.4,17.1-11.9,30-22.7,38.5C209.5,312.3,195.1,316.4,177.1,316.4z M179.8,289.4c7,0,12.9-2.1,17.8-6.2c5-4.1,8.6-10.4,10.7-19c2.9-11.8,5.1-22,6.6-30.8c0.5-2.6,0.8-5.3,0.8-8.1c0-11.4-5.9-17.1-17.8-17.1c-7,0-13,2.1-18,6.2c-4.9,4.1-8.4,10.4-10.5,19c-2.3,8.4-4.5,18.6-6.8,30.8c-0.5,2.5-0.8,5.1-0.8,7.9C161.7,283.7,167.8,289.4,179.8,289.4z" fill="#FFFFFF"/>
        <path d="M259.3,314.6c-1.4,0-2.4-0.4-3.2-1.3c-0.6-1-0.8-2.1-0.6-3.4l25.9-122c0.2-1.4,0.9-2.5,2.1-3.4c1.1-0.9,2.3-1.3,3.6-1.3H337c13.9,0,25,2.9,33.4,8.6c8.5,5.8,12.8,14.1,12.8,25c0,3.1-0.4,6.4-1.1,9.8c-3.1,14.4-9.4,25-19,31.9c-9.4,6.9-22.3,10.3-38.7,10.3h-25.3l-8.6,41.1c-0.3,1.4-0.9,2.5-2.1,3.4c-1.1,0.9-2.3,1.3-3.6,1.3H259.3z M325.7,242.9c5.3,0,9.8-1.4,13.7-4.3c4-2.9,6.6-7,7.9-12.4c0.4-2.1,0.6-4,0.6-5.6c0-3.6-1.1-6.4-3.2-8.3c-2.1-2-5.8-3-10.9-3h-22.5l-7.1,33.6H325.7z" fill="#FFFFFF"/>
      </svg>
    );
  }

  // Base - Blue rounded square (official Base logo)
  if (normalizedChain === 'base') {
    return (
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 249 249" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className={className}
      >
        <path d="M0 19.671C0 12.9332 0 9.56425 1.26956 6.97276C2.48511 4.49151 4.49151 2.48511 6.97276 1.26956C9.56425 0 12.9332 0 19.671 0H229.329C236.067 0 239.436 0 242.027 1.26956C244.508 2.48511 246.515 4.49151 247.73 6.97276C249 9.56425 249 12.9332 249 19.671V229.329C249 236.067 249 239.436 247.73 242.027C246.515 244.508 244.508 246.515 242.027 247.73C239.436 249 236.067 249 229.329 249H19.671C12.9332 249 9.56425 249 6.97276 247.73C4.49151 246.515 2.48511 244.508 1.26956 242.027C0 239.436 0 236.067 0 229.329V19.671Z" fill="#0052FF"/>
      </svg>
    );
  }

  // Fallback for unknown chain
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <circle cx="16" cy="16" r="16" fill="#6B7280"/>
      <text 
        x="16" 
        y="20" 
        fontSize="12" 
        fill="white" 
        textAnchor="middle" 
        fontWeight="600"
      >
        {chain.slice(0, 2).toUpperCase()}
      </text>
    </svg>
  );
};