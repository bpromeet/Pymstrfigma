import React, { useState, useEffect } from "react";
import { MarketingLandingPage } from "./pages/MarketingLandingPage";
import { MarketingGamingPage } from "./pages/MarketingGamingPage";
import { MarketingCreatorsPage } from "./pages/MarketingCreatorsPage";
import { MarketingB2BPage } from "./pages/MarketingB2BPage";
import { MarketingHighRiskPage } from "./pages/MarketingHighRiskPage";

/**
 * LandingApp - Marketing Website (pymstr.com)
 * 
 * This is the public-facing marketing website with:
 * - Main landing page
 * - 4 niche-specific landing pages (Gaming, Creators, B2B, High-Risk)
 * 
 * Deployment: pymstr.com
 * CTA buttons redirect to: app.pymstr.com
 */
const LandingApp = () => {
  const [activePage, setActivePage] = useState("main");

  // URL hash routing for marketing pages
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();

      if (hash.includes("#/marketing/gaming") || hash.includes("#/gaming")) {
        setActivePage("gaming");
      } else if (hash.includes("#/marketing/creators") || hash.includes("#/creators")) {
        setActivePage("creators");
      } else if (hash.includes("#/marketing/b2b") || hash.includes("#/b2b")) {
        setActivePage("b2b");
      } else if (hash.includes("#/marketing/high-risk") || hash.includes("#/high-risk")) {
        setActivePage("high-risk");
      } else {
        // Default to main landing page
        setActivePage("main");
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Render the appropriate page
  const renderPage = () => {
    switch (activePage) {
      case "gaming":
        return <MarketingGamingPage />;
      case "creators":
        return <MarketingCreatorsPage />;
      case "b2b":
        return <MarketingB2BPage />;
      case "high-risk":
        return <MarketingHighRiskPage />;
      case "main":
      default:
        return <MarketingLandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A]">
      {renderPage()}
    </div>
  );
};

export default LandingApp;
