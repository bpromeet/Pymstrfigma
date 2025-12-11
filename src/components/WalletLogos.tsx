import React from 'react';

// MetaMask Logo (Orange Fox)
export const MetaMaskLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M37.3 3.2L22.5 14.1l2.7-6.4 12.1-4.5z" fill="#E17726" stroke="#E17726" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2.7 3.2l14.6 11 2.6-6.5L7.8 3.2h-5.1zM31.9 28.6l-3.9 5.9 8.3 2.3 2.4-8.1-6.8-.1zM1.4 28.7l2.4 8.1 8.3-2.3-3.9-5.9-6.8.1z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11.7 17.3l-2.4 3.6 8.2.4-.3-8.8-5.5 4.8zM28.3 17.3l-5.6-5-2 9 8.2-.4-2.6-3.6zM12.1 34.5l5-2.4-4.3-3.3-.7 5.7zM22.9 32.1l5 2.4-.7-5.7-4.3 3.3z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M27.9 34.5l-5-2.4.4 3.2-.1 1.7 4.7-2.5zM12.1 34.5l4.7 2.5-.1-1.7.4-3.2-5 2.4z" fill="#D5BFB2" stroke="#D5BFB2" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16.9 26.1l-4.1-1.2 2.9-1.3 1.2 2.5zM23.1 26.1l1.2-2.5 2.9 1.3-4.1 1.2z" fill="#233447" stroke="#233447" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12.1 34.5l.7-5.9-4.6.1 3.9 5.8zM27.2 28.6l.7 5.9 3.9-5.8-4.6-.1zM30.9 20.9l-8.2.4.8 4.3 1.2-2.5 2.9 1.3 3.3-3.5zM12.8 24.9l2.9-1.3 1.2 2.5.8-4.3-8.2-.4 3.3 3.5z" fill="#CC6228" stroke="#CC6228" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.3 20.9l3.6 7-.1-3.5-3.5-3.5zM27.6 24.4l-.1 3.5 3.6-7-3.5 3.5zM17.7 21.3l-.8 4.3.9 4.9.2-6.1-.3-3.1zM22.7 21.3l-.2 3 .2 6.2.9-4.9-.9-4.3z" fill="#E27525" stroke="#E27525" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M23.5 25.6l-.9 4.9.6.4 4.3-3.3.1-3.5-4.1 1.5zM12.8 24.1l.1 3.5 4.3 3.3.6-.4-.9-4.9-4.1-1.5z" fill="#F5841F" stroke="#F5841F" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M23.6 37l.1-1.7-.3-.3h-6.8l-.3.3.1 1.7-4.7-2.5 1.6 1.3 3.3 2.3h6.9l3.3-2.3 1.6-1.3-4.8 2.5z" fill="#C0AC9D" stroke="#C0AC9D" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22.9 32.1l-.6-.4h-4.6l-.6.4-.4 3.2.3-.3h6.8l.3.3-.2-3.2z" fill="#161616" stroke="#161616" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M37.9 14.7l1.3-6.3-1.9-5.6-14.4 10.6 5.5 4.7 7.8 2.3 1.7-2-.8-.5 1.2-1.1-.9-.7 1.2-.9-.8-.6zM.8 8.4l1.3 6.3-.8.6 1.2.9-.9.7 1.2 1.1-.8.5 1.7 2 7.8-2.3 5.5-4.7L2.7 2.8.8 8.4z" fill="#763E1A" stroke="#763E1A" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M36.4 19.8l-7.8-2.3 2.4 3.6-3.6 7 4.7-.1h7l-2.7-8.2zM11.4 17.5l-7.8 2.3-2.7 8.2h7l4.7.1-3.6-7 2.4-3.6zM22.7 21.3l.5-8.7 2.3-6.2h-10.9l2.2 6.2.5 8.7.2 3.1v6.1h4.6v-6.1l.2-3.1h.4z" fill="#F5841F" stroke="#F5841F" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// WalletConnect Logo (Blue Gradient)
export const WalletConnectLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="8" fill="url(#walletconnect-gradient)"/>
    <path d="M11.5 15.3c4.2-4.1 11-4.1 15.2 0l.5.5c.2.2.2.5 0 .7l-1.7 1.7c-.1.1-.3.1-.4 0l-.7-.7c-2.9-2.9-7.7-2.9-10.6 0l-.8.7c-.1.1-.3.1-.4 0l-1.7-1.7c-.2-.2-.2-.5 0-.7l.6-.5zm18.8 3.5l1.5 1.5c.2.2.2.5 0 .7l-6.8 6.7c-.2.2-.5.2-.7 0l-4.8-4.8c-.1-.1-.1-.1-.2 0l-4.8 4.8c-.2.2-.5.2-.7 0L7 21c-.2-.2-.2-.5 0-.7l1.5-1.5c.2-.2.5-.2.7 0l4.8 4.8c.1.1.1.1.2 0l4.8-4.8c.2-.2.5-.2.7 0l4.8 4.8c.1.1.1.1.2 0l4.8-4.8c.2-.2.5-.2.7 0z" fill="white"/>
    <defs>
      <linearGradient id="walletconnect-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#5D9DF6"/>
        <stop offset="1" stopColor="#006FFF"/>
      </linearGradient>
    </defs>
  </svg>
);

// Coinbase Wallet Logo (Blue Circle)
export const CoinbaseLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#0052FF"/>
    <path d="M20 36c8.837 0 16-7.163 16-16S28.837 4 20 4 4 11.163 4 20s7.163 16 16 16z" fill="#0052FF"/>
    <path d="M14 20c0-3.314 2.686-6 6-6s6 2.686 6 6-2.686 6-6 6-6-2.686-6-6zm2.5 0c0 1.933 1.567 3.5 3.5 3.5s3.5-1.567 3.5-3.5-1.567-3.5-3.5-3.5-3.5 1.567-3.5 3.5z" fill="white"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M20 36c8.837 0 16-7.163 16-16S28.837 4 20 4 4 11.163 4 20s7.163 16 16 16zm-6-16c0-3.314 2.686-6 6-6s6 2.686 6 6-2.686 6-6 6-6-2.686-6-6zm2.5 0c0 1.933 1.567 3.5 3.5 3.5s3.5-1.567 3.5-3.5-1.567-3.5-3.5-3.5-3.5 1.567-3.5 3.5z" fill="white"/>
  </svg>
);

// Google Logo
export const GoogleLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M36.3 20.5c0-1.2-.1-2.4-.3-3.5H20v6.6h9.1c-.4 2.1-1.6 3.9-3.3 5.1v4.3h5.4c3.1-2.9 4.9-7.1 4.9-12.1l.2-.4z" fill="#4285F4"/>
    <path d="M20 37c4.4 0 8.2-1.5 10.9-4l-5.4-4.3c-1.5 1-3.4 1.6-5.5 1.6-4.2 0-7.8-2.9-9.1-6.7H5.3v4.4C8 33.4 13.6 37 20 37z" fill="#34A853"/>
    <path d="M10.9 23.6c-.3-1-.5-2-.5-3.1s.2-2.1.5-3.1V13H5.3C3.8 16 3 19.4 3 23s.8 7 2.3 10l5.6-4.4z" fill="#FBBC05"/>
    <path d="M20 9.7c2.4 0 4.5.8 6.2 2.4l4.6-4.6C27.9 4.8 24.3 3 20 3c-6.4 0-12 3.6-14.7 9l5.6 4.4c1.3-3.8 4.9-6.7 9.1-6.7z" fill="#EA4335"/>
  </svg>
);

// Twitter (X) Logo
export const TwitterLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="8" fill="#000000"/>
    <path d="M23.6 12h3.6l-7.9 9 9.3 12.3h-7.3l-5.7-7.5-6.5 7.5H5.5l8.5-9.7L5.5 12h7.5l5.1 6.8L23.6 12zm-1.3 19.5h2l-12.9-17h-2.1l13 17z" fill="white"/>
  </svg>
);

// Github Logo
export const GithubLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="8" fill="#24292e"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M20 7c-7.2 0-13 5.8-13 13 0 5.7 3.7 10.6 8.9 12.3.6.1.9-.3.9-.6v-2.1c-3.6.8-4.4-1.7-4.4-1.7-.6-1.5-1.5-1.9-1.5-1.9-1.2-.8.1-.8.1-.8 1.3.1 2 1.4 2 1.4 1.2 2 3.1 1.4 3.9 1.1.1-.8.5-1.4.9-1.7-2.9-.3-6-1.5-6-6.6 0-1.5.5-2.7 1.4-3.6-.1-.3-.6-1.6.1-3.4 0 0 1.1-.4 3.7 1.4 1.1-.3 2.2-.5 3.3-.5s2.2.2 3.3.5c2.6-1.8 3.7-1.4 3.7-1.4.7 1.8.2 3.1.1 3.4.9.9 1.4 2.1 1.4 3.6 0 5.1-3.1 6.3-6 6.6.5.4.9 1.2.9 2.4v3.6c0 .3.3.7.9.6C29.3 30.6 33 25.7 33 20c0-7.2-5.8-13-13-13z" fill="white"/>
  </svg>
);
