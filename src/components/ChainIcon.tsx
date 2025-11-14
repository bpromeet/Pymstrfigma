import React from 'react';
import ethLogo from 'figma:asset/3f415cd75e8a755a032ae16a3406c41dcc2d667a.png';
import polygonLogo from 'figma:asset/2a58e7908e32b2fe463112041ba6e2714512185b.png';
import arbitrumLogo from 'figma:asset/f48bde656d2828d3f1e6a10c15f97b6bf98615d5.png';
import optimismLogo from 'figma:asset/4f26997c993e11669528832115692d8c0b95f2e0.png';
import baseLogo from 'figma:asset/5849f744e6f7cf933d5afd306639724467364170.png';

interface ChainIconProps {
  chain: string;
  size?: string;
}

export const ChainIcon: React.FC<ChainIconProps> = ({
  chain,
  size = 'w-8 h-8',
}) => {
  const chainLowerCase = chain.toLowerCase();

  // Use imported logos
  if (chainLowerCase === 'ethereum') {
    return (
      <div className={`${size} flex items-center justify-center shrink-0`}>
        <img
          src={ethLogo}
          alt="Ethereum"
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  if (chainLowerCase === 'polygon') {
    return (
      <div className={`${size} flex items-center justify-center shrink-0`}>
        <img
          src={polygonLogo}
          alt="Polygon"
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  if (chainLowerCase === 'arbitrum') {
    return (
      <div className={`${size} flex items-center justify-center shrink-0`}>
        <img
          src={arbitrumLogo}
          alt="Arbitrum"
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  if (chainLowerCase === 'optimism') {
    return (
      <div className={`${size} flex items-center justify-center shrink-0`}>
        <img
          src={optimismLogo}
          alt="Optimism"
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  if (chainLowerCase === 'base') {
    return (
      <div className={`${size} flex items-center justify-center shrink-0`}>
        <img
          src={baseLogo}
          alt="Base"
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  return <div className={`${size} bg-gray-300 rounded-full`} />;
};
