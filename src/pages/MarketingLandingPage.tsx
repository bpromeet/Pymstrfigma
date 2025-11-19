import React from "react";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { PymstrLogo } from "../components/PymstrLogo";
import { 
  Zap, 
  Globe, 
  Shield, 
  Code, 
  TrendingUp, 
  Users,
  ArrowRight,
  CheckCircle2,
  Rocket,
  Gauge,
  Lock,
  DollarSign,
  X,
  Menu,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

/**
 * MarketingLandingPage - Main marketing site for PYMSTR
 * 
 * Showcases:
 * - Hero with clear value prop
 * - 10x better features
 * - Developer advantages
 * - Use case highlights with CSS scroll-snap
 * - Social proof
 * - Pricing comparison
 * 
 * GOOGLE DEEPMIND STYLE 🌟
 */
const MarketingLandingPage: React.FC = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [showVerticals, setShowVerticals] = React.useState(false);
  const [activeUseCase, setActiveUseCase] = React.useState('gaming');
  const [currentIndustryIndex, setCurrentIndustryIndex] = React.useState(0);
  const [activeFeature, setActiveFeature] = React.useState('speed');
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [firstHeaderMenuOpen, setFirstHeaderMenuOpen] = React.useState(false);
  const [isSectionSticky, setIsSectionSticky] = React.useState(false);
  const pillsRef = React.useRef<HTMLDivElement>(null);
  const heroSubtitleRef = React.useRef<HTMLParagraphElement>(null);
  const industriesRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  React.useEffect(() => {
    const handleScroll = () => {
      // Check if hero subtitle has reached the header
      if (heroSubtitleRef.current) {
        const subtitleRect = heroSubtitleRef.current.getBoundingClientRect();
        // When subtitle reaches the top (header position at ~80px), hide first header
        setScrolled(subtitleRect.top <= 80);
      }
      
      // Check if pills section has reached the header
      if (pillsRef.current) {
        const pillsRect = pillsRef.current.getBoundingClientRect();
        // When pills reach the top (header position at ~80px), stick them
        setShowVerticals(pillsRect.top <= 80);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync activeUseCase with currentIndustryIndex
  React.useEffect(() => {
    setActiveUseCase(industries[currentIndustryIndex].id);
  }, [currentIndustryIndex]);

  // Intersection Observer to track which industry is in view
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = industriesRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setCurrentIndustryIndex(index);
            }
          }
        });
      },
      {
        root: null,
        threshold: 0.5, // Trigger when 50% of the item is visible
      }
    );

    industriesRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      industriesRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // Carousel navigation handlers with smooth scroll
  const goToNextIndustry = () => {
    const nextIndex = (currentIndustryIndex + 1) % industries.length;
    setCurrentIndustryIndex(nextIndex);
    industriesRefs.current[nextIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  };

  const goToPrevIndustry = () => {
    const prevIndex = (currentIndustryIndex - 1 + industries.length) % industries.length;
    setCurrentIndustryIndex(prevIndex);
    industriesRefs.current[prevIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  };

  const goToIndustry = (index: number) => {
    setCurrentIndustryIndex(index);
    industriesRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  };

  // Hash-based navigation (App.tsx uses hash routing, not React Router)
  const navigate = (path: string) => {
    window.location.hash = path;
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      id: 'speed',
      title: "Lightning Speed",
      subtitle: "10-second settlement",
      description: "Money arrives in 10 seconds, not 7 days. Real-time on-chain settlement across 5 chains. No waiting periods, no delays, no holding funds hostage.",
      image: "https://images.unsplash.com/photo-1762764727312-7cd16e52c06e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGVlZCUyMHBlcmZvcm1hbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjM0MTIyMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      icon: <Zap className="w-12 h-12 text-[#4285F4]"/>,
      stat: "10s settlement",
      benefits: [
        "Real-time blockchain settlement",
        "No 7-day hold periods",
        "Instant liquidity for merchants",
        "5 chains supported"
      ]
    },
    {
      id: 'cost',
      title: "Unbeatable Pricing",
      subtitle: "1% flat fee",
      description: "No hidden costs. No chargebacks. No currency conversion fees. Save thousands compared to traditional processors charging 2.9% + 30¢ per transaction.",
      image: "https://images.unsplash.com/photo-1625212001538-17dd918c6cf1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25leSUyMHNhdmluZ3MlMjBmaW5hbmNlfGVufDF8fHx8MTc2MzQxMjIyM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      icon: <DollarSign className="w-12 h-12 text-[#4285F4]"/>,
      stat: "1% vs 2.9%",
      benefits: [
        "1% flat fee on all transactions",
        "No hidden costs or surprises",
        "Zero chargeback fees",
        "Save 65% vs traditional processors"
      ]
    },
    {
      id: 'global',
      title: "True Global Reach",
      subtitle: "190+ countries",
      description: "Accept stablecoins from anywhere in the world. No cross-border fees, no currency conversion, no geographical restrictions. Stablecoins are borderless money.",
      image: "https://images.unsplash.com/photo-1633421878925-ac220d8f6e4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JsZCUyMGdsb2JlJTIwbmV0d29ya3xlbnwxfHx8fDE3NjMzNTkyNzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      icon: <Globe className="w-12 h-12 text-[#4285F4]"/>,
      stat: "190+ countries",
      benefits: [
        "No cross-border fees",
        "No currency conversion",
        "Global stablecoin acceptance",
        "Reach customers everywhere"
      ]
    },
    {
      id: 'security',
      title: "Zero Fraud Risk",
      subtitle: "Blockchain security",
      description: "Blockchain transactions are final. Eliminate chargeback fraud, payment disputes, and costly reversals. Once confirmed, the payment is yours forever.",
      image: "https://images.unsplash.com/photo-1652739758426-56a564265f9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMHNoaWVsZCUyMHByb3RlY3Rpb258ZW58MXx8fHwxNzYzMzc2MzA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      icon: <Shield className="w-12 h-12 text-[#4285F4]"/>,
      stat: "0% chargebacks",
      benefits: [
        "Zero chargeback risk",
        "Immutable blockchain transactions",
        "No payment disputes",
        "Final settlement guaranteed"
      ]
    },
    {
      id: 'developer',
      title: "Developer Experience",
      subtitle: "5-minute integration",
      description: "Modern REST API, WebSockets for real-time events, comprehensive SDKs. Built by developers, for developers. Start accepting payments in minutes, not weeks.",
      image: "https://images.unsplash.com/photo-1566915896913-549d796d2166?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjBjb2RpbmclMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzYzMzMzMTkxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      icon: <Code className="w-12 h-12 text-[#4285F4]"/>,
      stat: "5min setup",
      benefits: [
        "Modern REST API",
        "Real-time WebSocket events",
        "Comprehensive documentation",
        "Ready-to-use code examples"
      ]
    },
    {
      id: 'scale',
      title: "Built to Scale",
      subtitle: "Account Abstraction",
      description: "Users don't need wallets or gas fees. Account Abstraction delivers a seamless Web2-like experience while leveraging Web3 infrastructure. Best of both worlds.",
      image: "https://images.unsplash.com/photo-1693423362454-7db6c8e07a5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2FsYWJpbGl0eSUyMGdyb3d0aCUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzYzNDEyMjIzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      icon: <Gauge className="w-12 h-12 text-[#4285F4]"/>,
      stat: "0 gas fees",
      benefits: [
        "No wallet setup required",
        "Zero gas fees for users",
        "Web2-like UX with Web3 benefits",
        "Account Abstraction powered"
      ]
    }
  ];

  const industries = [
    {
      id: 'gaming',
      title: "Gaming & Virtual Economies",
      description: "Instant in-game currency settlements. Player-to-player marketplaces. No 7-day wait times.",
      image: "https://images.unsplash.com/photo-1758179762049-615d9aac58ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBlc3BvcnRzJTIwbmVvbnxlbnwxfHx8fDE3NjMzMTUwMTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      link: "#/marketing/gaming",
      icon: <Zap className="w-12 h-12 text-[#4285F4]"/>,
      benefits: [
        "10-second settlement times",
        "No cross-border fees",
        "Zero chargebacks",
        "Player-to-player instant payments"
      ]
    },
    {
      id: 'creators',
      title: "Creator Economy",
      description: "Get paid globally with 1% fees. Token-gated content. Instant payouts to creators worldwide.",
      image: "https://images.unsplash.com/photo-1673767297220-6341467cb687?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW50JTIwY3JlYXRvciUyMHN0dWRpb3xlbnwxfHx8fDE3NjMzNjgzNDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      link: "#/marketing/creators",
      icon: <Users className="w-12 h-12 text-[#4285F4]"/>,
      benefits: [
        "1% flat fee",
        "190+ countries reach",
        "Zero chargebacks",
        "Token-gated content monetization"
      ]
    },
    {
      id: 'b2b',
      title: "Cross-Border B2B",
      description: "Replace SWIFT transfers. 0.5% fees vs banks' 3-7%. Smart contract escrows for security.",
      image: "https://images.unsplash.com/photo-1758630737900-a28682c5aa69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG9mZmljZSUyMG1vZGVybnxlbnwxfHx8fDE3NjMzMjc0MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      link: "#/marketing/b2b",
      icon: <Globe className="w-12 h-12 text-[#4285F4]"/>,
      benefits: [
        "0.5% fees for B2B",
        "190+ countries",
        "Smart contract escrows",
        "Replace SWIFT transfers"
      ]
    },
    {
      id: 'high-risk',
      title: "High-Risk Merchants",
      description: "Censorship-resistant payments. No de-platforming. Privacy-focused for you and your customers.",
      image: "https://images.unsplash.com/photo-1758983308742-f4ba1f8c8cb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcml2YWN5JTIwc2VjdXJpdHklMjBkaWdpdGFsfGVufDF8fHx8MTc2MzQxMTk5OHww&ixlib=rb-4.1.0&q=80&w=1080",
      link: "#/marketing/high-risk",
      icon: <Lock className="w-12 h-12 text-[#4285F4]"/>,
      benefits: [
        "Censorship-resistant",
        "No de-platforming risk",
        "Privacy-focused",
        "1% flat fee"
      ]
    }
  ];

  const stats = [
    { value: "$10M+", label: "Transaction Volume" },
    { value: "5", label: "Supported Chains" },
    { value: "3", label: "Stablecoins" },
    { value: "10s", label: "Settlement Time" }
  ];

  const comparison = [
    { feature: "Transaction Fee", stripe: "2.9% + 30¢", pymstr: "1% flat" },
    { feature: "Settlement Time", stripe: "2-7 days", pymstr: "10 seconds" },
    { feature: "Chargeback Risk", stripe: "Yes (~1%)", pymstr: "Zero" },
    { feature: "Cross-Border Fees", stripe: "1-3% extra", pymstr: "None" },
    { feature: "Global Coverage", stripe: "46 countries", pymstr: "190+ countries" },
    { feature: "Real-Time Webhooks", stripe: "Yes", pymstr: "Yes + WebSockets" }
  ];

  return (
    <div className="min-h-screen">
      {/* DUAL HEADER SYSTEM - GOOGLE DEEPMIND STYLE 🎯 */}
      {/* First Header - Features/Pricing/Docs/About - Slides UP on scroll */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
        } bg-white`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-5">
          <div className="flex items-center justify-between">
            {/* LEFT SIDE - Logo + Menu (DeepMind style) */}
            <div className="flex items-center gap-12">
              <PymstrLogo 
                variant="full" 
                size="md" 
                transparent={false}
                theme="terminal"
                className="cursor-pointer transition-all duration-500" 
                onClick={() => navigate('#/marketing')} 
              />

              {/* Desktop Navigation - LEFT-ALIGNED next to logo - Hidden on tablet and below */}
              <nav className="hidden lg:flex items-center gap-8">
                <button 
                  onClick={() => scrollToSection('industries')}
                  className="text-[#202124] hover:text-[#5F6368] transition-colors duration-200"
                  style={{ fontFamily: "'Google Sans', sans-serif", fontSize: '18px', fontWeight: 420, lineHeight: '100%' }}
                >
                  Industries
                </button>
                <button 
                  onClick={() => scrollToSection('features')}
                  className="text-[#202124] hover:text-[#5F6368] transition-colors duration-200"
                  style={{ fontFamily: "'Google Sans', sans-serif", fontSize: '18px', fontWeight: 420, lineHeight: '100%' }}
                >
                  Why PYMSTR
                </button>
                <button 
                  onClick={() => scrollToSection('pricing')}
                  className="text-[#202124] hover:text-[#5F6368] transition-colors duration-200"
                  style={{ fontFamily: "'Google Sans', sans-serif", fontSize: '18px', fontWeight: 420, lineHeight: '100%' }}
                >
                  Pricing
                </button>
                <button 
                  onClick={() => scrollToSection('developers')}
                  className="text-[#202124] hover:text-[#5F6368] transition-colors duration-200"
                  style={{ fontFamily: "'Google Sans', sans-serif", fontSize: '18px', fontWeight: 420, lineHeight: '100%' }}
                >
                  Docs
                </button>
              </nav>
            </div>

            {/* RIGHT SIDE - Hamburger (tablet/mobile) + CTA (desktop) */}
            <div className="flex items-center gap-4">
              {/* Hamburger Menu Button - Tablet and below */}
              <Button
                onClick={() => setFirstHeaderMenuOpen(!firstHeaderMenuOpen)}
                className="lg:hidden bg-transparent text-[#202124] hover:bg-[#F8F9FA] rounded-full p-2 transition-all duration-200"
              >
                {firstHeaderMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>

              {/* Desktop Start Button */}
              <Button
                onClick={() => navigate('#/dashboard')}
                className="bg-[#F8F9FA] text-[#202124] hover:bg-[#E8EAED] rounded-full px-5 py-2 transition-all duration-200 hidden lg:inline-flex items-center gap-2"
                style={{ fontFamily: "'Google Sans', sans-serif" }}
              >
                <ChevronLeft className="w-4 h-4" />
                <ChevronRight className="w-4 h-4" />
                Start
              </Button>
            </div>
          </div>

          {/* HAMBURGER MENU DROPDOWN - Tablet and Mobile */}
          {firstHeaderMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden mt-4 bg-white rounded-2xl shadow-lg border border-[#E8EAED] p-6"
            >
              <nav className="flex flex-col gap-4">
                <button 
                  onClick={() => {
                    scrollToSection('features');
                    setFirstHeaderMenuOpen(false);
                  }}
                  className="text-[#202124] hover:text-[#4285F4] hover:bg-[#F8F9FA] transition-colors duration-200 font-medium text-lg text-left px-4 py-3 rounded-lg"
                >
                  Features
                </button>
                <button 
                  onClick={() => {
                    scrollToSection('pricing');
                    setFirstHeaderMenuOpen(false);
                  }}
                  className="text-[#202124] hover:text-[#4285F4] hover:bg-[#F8F9FA] transition-colors duration-200 font-medium text-lg text-left px-4 py-3 rounded-lg"
                >
                  Pricing
                </button>
                <button 
                  onClick={() => {
                    scrollToSection('developers');
                    setFirstHeaderMenuOpen(false);
                  }}
                  className="text-[#202124] hover:text-[#4285F4] hover:bg-[#F8F9FA] transition-colors duration-200 font-medium text-lg text-left px-4 py-3 rounded-lg"
                >
                  Docs
                </button>
                <div className="pt-2 border-t border-[#E8EAED]">
                  <Button
                    onClick={() => {
                      navigate('#/dashboard');
                      setFirstHeaderMenuOpen(false);
                    }}
                    className="w-full bg-[#F8F9FA] text-[#202124] hover:bg-[#E8EAED] rounded-full px-6 py-3 transition-all duration-200 flex items-center justify-center gap-2"
                    style={{ fontFamily: "'Google Sans', sans-serif" }}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <ChevronRight className="w-4 h-4" />
                    Start
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      {/* Hero Section - GOOGLE STYLE 🌟 */}
      <section className="relative overflow-hidden bg-white pt-32 pb-24" style={{ fontFamily: "'Google Sans', sans-serif" }}>
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F8F9FA] via-white to-[#E8F0FE] opacity-60" />
        
        {/* Floating geometric shapes (Google style) */}
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-[#4285F4]/10 blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-[#34A853]/10 blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-[#E8F0FE] rounded-full px-5 py-2.5 mb-8"
            >
              <Rocket className="w-4 h-4 text-[#4285F4]" />
              <span className="text-sm font-medium text-[#4285F4]">Powered by Web3 Infrastructure</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-6xl sm:text-7xl lg:text-8xl font-normal text-[#202124] mb-8"
              style={{ fontFamily: "'Google Sans', sans-serif", lineHeight: '1.1' }}
            >
              Payments. But 10x Better.
            </motion.h1>

            <motion.p
              ref={heroSubtitleRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl sm:text-3xl text-[#5F6368] mb-16 max-w-4xl mx-auto font-normal"
              style={{ lineHeight: '1.5' }}
            >
              Accept stablecoins globally with <span className="font-medium text-[#4285F4]">1% fees</span>, 
              <span className="font-medium text-[#4285F4]"> 10-second settlement</span>, and 
              <span className="font-medium text-[#4285F4]"> zero chargebacks</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex justify-center mb-20"
            >
              <Button
                onClick={() => navigate('#/docs/api-reference')}
                className="min-h-14 px-10 bg-[#F8F9FA] text-[#5F6368] border-2 border-[#E8EAED] hover:bg-white hover:border-[#4285F4] hover:text-[#4285F4] rounded-full text-lg font-medium transition-all duration-200"
                style={{ fontFamily: "'Google Sans', sans-serif" }}
              >
                View API Docs
              </Button>
            </motion.div>

            {/* Stats - Google Style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-12 max-w-5xl mx-auto"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-5xl font-normal text-[#4285F4] mb-3" style={{ fontFamily: "'Google Sans', sans-serif" }}>
                    {stat.value}
                  </div>
                  <div className="text-lg text-[#5F6368] font-normal">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Use Cases - GOOGLE DEEPMIND STYLE WITH IN-PAGE PILL NAVIGATION 🌟 */}
      {/* MOVED RIGHT AFTER HERO! */}
      <section id="industries" className="relative bg-white" style={{ fontFamily: "'Google Sans', sans-serif" }}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative">
          {/* Title Section */}
          <div className="text-center pt-40 pb-20">
            <h2 className="text-6xl sm:text-7xl lg:text-8xl font-normal mb-8 text-[#202124]" style={{ fontFamily: "'Google Sans', sans-serif", lineHeight: '1.1' }}>
              We Get Your Business Done
            </h2>
            <p className="text-3xl sm:text-4xl text-[#5F6368] max-w-4xl mx-auto font-normal mb-8" style={{ lineHeight: '1.5' }}>
              Tailored solutions for every industry
            </p>
          </div>

          {/* STICKY PILLS NAVIGATION - MUST STICK AT TOP! */}
          <div 
            ref={pillsRef}
            className="sticky top-0 bg-white z-40 py-5 mb-20"
          >
            {/* Big grey pill container - Scrollable on mobile, centered on desktop */}
            <div className="overflow-x-auto sm:overflow-x-visible sm:flex sm:justify-center scrollbar-hide">
              <div className="inline-flex items-center bg-[#F1F3F4] rounded-full p-1 relative min-w-max">
                {industries.map((industry, index) => (
                  <button
                    key={industry.id}
                    onClick={() => goToIndustry(index)}
                    className={`relative px-6 py-2.5 rounded-full text-base font-medium transition-colors duration-200 z-10 whitespace-nowrap ${
                      currentIndustryIndex === index
                        ? 'text-[#202124]'
                        : 'text-[#5F6368]'
                    }`}
                    style={{ fontFamily: "'Google Sans', sans-serif" }}
                  >
                    <span className="relative z-20">{industry.title.split(' ')[0]}</span>
                    
                    {/* White sliding background pill - only show on active */}
                    {currentIndustryIndex === index && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-white rounded-full shadow-sm"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* HORIZONTAL SCROLL SNAP CAROUSEL - Clean & Smooth */}
          <div 
            className="flex gap-12 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-20 hide-scrollbar"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {industries.map((industry, index) => (
              <div
                key={industry.id}
                ref={(el) => { industriesRefs.current[index] = el; }}
                className="min-w-full snap-start flex items-center"
              >
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  {/* LEFT - Content */}
                  <div className="space-y-8">
                    <div>
                      <Button
                        onClick={() => navigate(industry.link)}
                        className="bg-[#F8F9FA] text-[#202124] hover:bg-[#E8EAED] rounded-full px-5 py-2 transition-all duration-200 inline-flex items-center gap-2"
                        style={{ fontFamily: "'Google Sans', sans-serif" }}
                      >
                        Learn More
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                    <h3 className="text-5xl sm:text-6xl font-normal text-[#202124]" style={{ fontFamily: "'Google Sans', sans-serif", lineHeight: '1.2' }}>
                      {industry.title}
                    </h3>
                    <p className="text-2xl sm:text-3xl text-[#5F6368] font-normal" style={{ lineHeight: '1.6' }}>
                      {industry.description}
                    </p>
                    <div className="space-y-5 pt-4">
                      {industry.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-4">
                          <CheckCircle2 className="w-7 h-7 text-[#34A853] flex-shrink-0 mt-1" />
                          <span className="text-xl sm:text-2xl text-[#5F6368] font-normal">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* RIGHT - Large Image */}
                  <div className="space-y-6">
                    <div className="rounded-3xl overflow-hidden shadow-2xl border border-[#E8EAED]">
                      <img
                        src={industry.image}
                        alt={industry.title}
                        className="w-full h-[600px] object-cover"
                      />
                    </div>
                    
                    {/* Navigation Arrows - BELOW the image - Bottom Right */}
                    <div className="flex justify-end">
                      <div className="inline-flex items-center gap-2 bg-[#E8EAED] rounded-full px-3 py-2">
                        <button
                          onClick={goToPrevIndustry}
                          className="p-1.5 hover:bg-white/50 rounded-full transition-all duration-150"
                          aria-label="Previous industry"
                        >
                          <ChevronLeft className="w-5 h-5 text-[#5F6368]" strokeWidth={2} />
                        </button>
                        <button
                          onClick={goToNextIndustry}
                          className="p-1.5 hover:bg-white/50 rounded-full transition-all duration-150"
                          aria-label="Next industry"
                        >
                          <ChevronRight className="w-5 h-5 text-[#5F6368]" strokeWidth={2} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built Different - GOOGLE DEEPMIND STYLE (WHITE THEME) 🌟 */}
      <section id="features" className="relative py-40 overflow-hidden bg-white" style={{ fontFamily: "'Google Sans', sans-serif" }}>
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F8F9FA] via-white to-[#E8F0FE] opacity-60" />
        
        {/* Floating geometric shapes (Google style) */}
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-[#4285F4]/10 blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-[#34A853]/10 blur-3xl" />
        
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative">
          <div className="text-center mb-20">
            <h2 className="text-6xl sm:text-7xl lg:text-8xl font-normal mb-8 text-[#202124]" style={{ fontFamily: "'Google Sans', sans-serif", lineHeight: '1.1' }}>
              Built Different
            </h2>
            <p className="text-2xl sm:text-3xl text-[#5F6368] max-w-4xl mx-auto font-normal" style={{ lineHeight: '1.5' }}>
              PYMSTR is engineered for speed, cost efficiency, and global scale — with native Web3 infrastructure and zero fraud risk.
            </p>
          </div>

          {/* GRID OF FEATURE CARDS (Like Google DeepMind Model Family) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group"
              >
                {/* Icon Container - Google DeepMind Style */}
                <div className="mb-6">
                  <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center group-hover:bg-[#F8F9FA] transition-all duration-300" style={{ border: '0.25px solid rgba(0, 0, 0, 0.05)', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)' }}>
                    {feature.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-normal text-[#202124] mb-3" style={{ fontFamily: "'Google Sans', sans-serif", lineHeight: '1.3' }}>
                  {feature.subtitle}
                </h3>

                {/* Description */}
                <p className="text-lg text-[#5F6368] mb-6 font-normal" style={{ lineHeight: '1.6' }}>
                  {feature.description}
                </p>

                {/* Learn more link (Google style) */}
                <button className="text-[#4285F4] text-base font-medium hover:underline flex items-center gap-2 transition-all duration-200">
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table - GOOGLE DEEPMIND STYLE (WHITE THEME) 🌟 */}
      <section id="pricing" className="relative py-40 overflow-hidden bg-white" style={{ fontFamily: "'Google Sans', sans-serif" }}>
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F8F9FA] via-white to-[#E8F0FE] opacity-60" />
        
        {/* Floating geometric shapes (Google style) */}
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-[#FBBC04]/10 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-[#EA4335]/10 blur-3xl" />
        
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative">
          <div className="text-center mb-20">
            <h2 className="text-6xl sm:text-7xl lg:text-8xl font-normal mb-8 text-[#202124]" style={{ fontFamily: "'Google Sans', sans-serif", lineHeight: '1.1' }}>
              PYMSTR vs Traditional
            </h2>
            <p className="text-2xl sm:text-3xl text-[#5F6368] max-w-4xl mx-auto font-normal" style={{ lineHeight: '1.5' }}>
              See how we stack up against Stripe, PayPal, and legacy payment systems
            </p>
          </div>

          <div className="bg-white border border-[#E8EAED] rounded-3xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#F8F9FA] border-b border-[#E8EAED]">
                    <th className="text-left p-6 text-lg font-medium text-[#202124]" style={{ fontFamily: "'Google Sans', sans-serif" }}>
                      Feature
                    </th>
                    <th className="text-left p-6 text-lg font-medium text-[#5F6368]" style={{ fontFamily: "'Google Sans', sans-serif" }}>
                      Traditional (Stripe)
                    </th>
                    <th className="text-left p-6 text-lg font-medium text-[#4285F4]" style={{ fontFamily: "'Google Sans', sans-serif" }}>
                      <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5" />
                        PYMSTR
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, index) => (
                    <tr key={index} className="border-b border-[#E8EAED] last:border-0 hover:bg-[#F8F9FA] transition-colors duration-200">
                      <td className="p-6 font-medium text-[#202124] text-base" style={{ fontFamily: "'Google Sans', sans-serif" }}>
                        {row.feature}
                      </td>
                      <td className="p-6 text-[#5F6368] text-base">
                        {row.stripe}
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-[#34A853] flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium text-[#202124] text-base" style={{ fontFamily: "'Google Sans', sans-serif" }}>
                            {row.pymstr}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* VOLUME PRICING - GOOGLE DEEPMIND STYLE 🌟 */}
      <section className="relative py-40 overflow-hidden bg-white" style={{ fontFamily: "'Google Sans', sans-serif" }}>
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E8F0FE] via-white to-[#F8F9FA] opacity-60" />
        
        {/* Floating geometric shapes */}
        <div className="absolute top-40 right-40 w-96 h-96 rounded-full bg-[#4285F4]/5 blur-3xl" />
        <div className="absolute bottom-40 left-40 w-96 h-96 rounded-full bg-[#34A853]/5 blur-3xl" />
        
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative">
          <div className="text-center mb-20">
            <h2 className="text-6xl sm:text-7xl lg:text-8xl font-normal mb-8 text-[#202124]" style={{ fontFamily: "'Google Sans', sans-serif", lineHeight: '1.1' }}>
              Volume Pricing
            </h2>
            <p className="text-2xl sm:text-3xl text-[#5F6368] max-w-4xl mx-auto font-normal" style={{ lineHeight: '1.5' }}>
              The more you process, the less you pay. Scale rewards you.
            </p>
          </div>

          {/* PRICING GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* FREE TIER - 0% */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Gradient accent on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#4285F4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                <div className="text-sm font-medium text-[#5F6368] mb-2">Up to $20K</div>
                <div className="text-7xl font-normal text-[#4285F4] mb-8" style={{ fontFamily: "'Google Sans', sans-serif" }}>
                  0%
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#4285F4] flex-shrink-0 mt-0.5" />
                    <span className="text-base text-[#5F6368]">All core features</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#4285F4] flex-shrink-0 mt-0.5" />
                    <span className="text-base text-[#5F6368]">API access</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#4285F4] flex-shrink-0 mt-0.5" />
                    <span className="text-base text-[#5F6368]">All supported assets</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#4285F4] flex-shrink-0 mt-0.5" />
                    <span className="text-base text-[#5F6368]">All supported chains</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#4285F4] flex-shrink-0 mt-0.5" />
                    <span className="text-base text-[#5F6368]">Instant settlement</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* STARTER TIER - 2% */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Gradient accent on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#EA4335]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                <div className="text-sm font-medium text-[#5F6368] mb-2">Up to $2M</div>
                <div className="text-7xl font-normal text-[#FF5914] mb-8" style={{ fontFamily: "'Google Sans', sans-serif" }}>
                  2%
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#34A853] flex-shrink-0 mt-0.5" />
                    <span className="text-base text-[#5F6368]">All Free features</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#34A853] flex-shrink-0 mt-0.5" />
                    <span className="text-base text-[#5F6368]">API access</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#34A853] flex-shrink-0 mt-0.5" />
                    <span className="text-base text-[#5F6368]">Webhooks</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#34A853] flex-shrink-0 mt-0.5" />
                    <span className="text-base text-[#5F6368]">Email support</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#34A853] flex-shrink-0 mt-0.5" />
                    <span className="text-base text-[#5F6368]">Transaction analytics</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* GROWTH TIER - 1.5% */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Gradient accent on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#4285F4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                <div className="text-sm font-medium text-[#5F6368] mb-2">Up to $10M</div>
                <div className="text-7xl font-normal text-[#4285F4] mb-8" style={{ fontFamily: "'Google Sans', sans-serif" }}>
                  1.5%
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#4285F4] flex-shrink-0 mt-0.5" />
                    <span className="text-base text-[#5F6368]">All Starter features</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#4285F4] flex-shrink-0 mt-0.5" />
                    <span className="text-base text-[#5F6368]">Webhooks</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#4285F4] flex-shrink-0 mt-0.5" />
                    <span className="text-base text-[#5F6368]">Team management</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#4285F4] flex-shrink-0 mt-0.5" />
                    <span className="text-base text-[#5F6368]">Priority support</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#4285F4] flex-shrink-0 mt-0.5" />
                    <span className="text-base text-[#5F6368]">Advanced analytics</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ENTERPRISE TIER - 0.5% */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Premium badge */}
              <div className="absolute top-4 right-4 bg-[#FF5914] text-white text-xs font-medium px-3 py-1 rounded-full">
                Scale
              </div>
              
              {/* Gradient accent on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FBBC04]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                <div className="text-sm font-medium text-[#5F6368] mb-2">From $10M to infinity</div>
                <div className="text-7xl font-normal text-[#FF5914] mb-8" style={{ fontFamily: "'Google Sans', sans-serif" }}>
                  0.5%
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#34A853] flex-shrink-0 mt-0.5" />
                    <span className="text-base text-[#5F6368]">Custom rates available</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#34A853] flex-shrink-0 mt-0.5" />
                    <span className="text-base text-[#5F6368]">Unlimited team members</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#34A853] flex-shrink-0 mt-0.5" />
                    <span className="text-base text-[#5F6368]">Dedicated account manager</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#34A853] flex-shrink-0 mt-0.5" />
                    <span className="text-base text-[#5F6368]">SLA guarantee</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#34A853] flex-shrink-0 mt-0.5" />
                    <span className="text-base text-[#5F6368]">Custom integrations</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* CTA Below Pricing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-20"
          >
            <p className="text-xl text-[#5F6368] mb-8 font-normal">
              Start with 0% fees up to $20K. No credit card required.
            </p>
            <Button
              onClick={() => navigate('#/dashboard')}
              className="bg-[#F8F9FA] text-[#202124] hover:bg-[#E8EAED] rounded-full px-5 py-2 transition-all duration-200 inline-flex items-center gap-2"
              style={{ fontFamily: "'Google Sans', sans-serif" }}
            >
              <ChevronLeft className="w-4 h-4" />
              <ChevronRight className="w-4 h-4" />
              Start
            </Button>
          </motion.div>
        </div>
      </section>

      {/* BUILT FOR DEVELOPERS - GOOGLE DEEPMIND STYLE 🌟 */}
      <section id="developers" className="relative py-40 overflow-hidden bg-white" style={{ fontFamily: "'Google Sans', sans-serif" }}>
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F8F9FA] via-white to-[#E8F0FE] opacity-60" />
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-[#34A853]/10 blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-[#4285F4]/10 blur-3xl" />
        
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* LEFT - Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* CTA Button - Above Title */}
              <div>
                <Button
                  onClick={() => navigate('#/docs/api-reference')}
                  className="bg-[#F8F9FA] text-[#202124] hover:bg-[#E8EAED] rounded-full px-5 py-2 transition-all duration-200 inline-flex items-center gap-2"
                  style={{ fontFamily: "'Google Sans', sans-serif" }}
                >
                  View Documentation
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              {/* Heading */}
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-normal text-[#202124]" style={{ fontFamily: "'Google Sans', sans-serif", lineHeight: '1.1' }}>
                Built for Developers
              </h2>

              {/* Description */}
              <p className="text-xl sm:text-2xl text-[#5F6368] font-normal" style={{ lineHeight: '1.6' }}>
                Simple, well-documented APIs and SDKs that get you up and running in minutes. Build custom payment flows with full control over the experience.
              </p>

              {/* Features list */}
              <div className="space-y-5 pt-4">
                <div className="flex items-start gap-4">
                  <ArrowRight className="w-6 h-6 text-[#EA4335] flex-shrink-0 mt-1" />
                  <span className="text-lg text-[#202124] font-normal">RESTful API with webhooks</span>
                </div>
                <div className="flex items-start gap-4">
                  <ArrowRight className="w-6 h-6 text-[#EA4335] flex-shrink-0 mt-1" />
                  <span className="text-lg text-[#202124] font-normal">JavaScript/TypeScript SDK</span>
                </div>
                <div className="flex items-start gap-4">
                  <ArrowRight className="w-6 h-6 text-[#EA4335] flex-shrink-0 mt-1" />
                  <span className="text-lg text-[#202124] font-normal">React components library</span>
                </div>
                <div className="flex items-start gap-4">
                  <ArrowRight className="w-6 h-6 text-[#EA4335] flex-shrink-0 mt-1" />
                  <span className="text-lg text-[#202124] font-normal">Smart contract integration</span>
                </div>
                <div className="flex items-start gap-4">
                  <ArrowRight className="w-6 h-6 text-[#EA4335] flex-shrink-0 mt-1" />
                  <span className="text-lg text-[#202124] font-normal">Comprehensive documentation</span>
                </div>
              </div>
            </motion.div>

            {/* RIGHT - Code Block */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-[#1E1E1E] rounded-2xl overflow-hidden shadow-2xl border border-[#E8EAED]">
                {/* Terminal header */}
                <div className="bg-[#2D2D2D] px-6 py-3 flex items-center justify-between border-b border-[#3E3E3E]">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                  </div>
                  <span className="text-sm text-[#EA4335] font-mono">index.ts</span>
                  <div className="w-12"></div>
                </div>

                {/* Code content */}
                <div className="p-6 font-mono text-sm leading-relaxed">
                  <div className="space-y-1">
                    <div>
                      <span className="text-[#C586C0]">import</span>
                      <span className="text-white"> {"{ "}</span>
                      <span className="text-[#4EC9B0]">PYMSTR</span>
                      <span className="text-white"> {"} "}</span>
                      <span className="text-[#C586C0]">from</span>
                      <span className="text-[#CE9178]"> '@pymstr/sdk'</span>
                      <span className="text-white">;</span>
                    </div>
                    <div className="h-4"></div>
                    <div>
                      <span className="text-[#569CD6]">const</span>
                      <span className="text-[#9CDCFE]"> pymstr</span>
                      <span className="text-white"> = </span>
                      <span className="text-[#569CD6]">new</span>
                      <span className="text-[#4EC9B0]"> PYMSTR</span>
                      <span className="text-white">({"{"}</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-[#9CDCFE]">merchantWallet</span>
                      <span className="text-white">: </span>
                      <span className="text-[#CE9178]">'0x...'</span>
                      <span className="text-white">,</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-[#9CDCFE]">network</span>
                      <span className="text-white">: </span>
                      <span className="text-[#CE9178]">'polygon'</span>
                    </div>
                    <div>
                      <span className="text-white">{"});"}</span>
                    </div>
                    <div className="h-4"></div>
                    <div>
                      <span className="text-[#6A9955]">// Create payment</span>
                    </div>
                    <div>
                      <span className="text-[#569CD6]">const</span>
                      <span className="text-[#9CDCFE]"> payment</span>
                      <span className="text-white"> = </span>
                      <span className="text-[#C586C0]">await</span>
                      <span className="text-white"> pymstr.</span>
                      <span className="text-[#DCDCAA]">createPayment</span>
                      <span className="text-white">({"{"}</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-[#9CDCFE]">amount</span>
                      <span className="text-white">: </span>
                      <span className="text-[#B5CEA8]">100</span>
                      <span className="text-white">,</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-[#9CDCFE]">currency</span>
                      <span className="text-white">: </span>
                      <span className="text-[#CE9178]">'USDC'</span>
                      <span className="text-white">,</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-[#9CDCFE]">orderId</span>
                      <span className="text-white">: </span>
                      <span className="text-[#CE9178]">'order_123'</span>
                    </div>
                    <div>
                      <span className="text-white">{"});"}</span>
                    </div>
                    <div className="h-4"></div>
                    <div>
                      <span className="text-[#6A9955]">// Monitor payment</span>
                    </div>
                    <div>
                      <span className="text-white">pymstr.</span>
                      <span className="text-[#DCDCAA]">on</span>
                      <span className="text-white">(</span>
                      <span className="text-[#CE9178]">'payment.success'</span>
                      <span className="text-white">, (</span>
                      <span className="text-[#9CDCFE]">data</span>
                      <span className="text-white">) </span>
                      <span className="text-[#569CD6]">{'=>'}</span>
                      <span className="text-white"> {"{"}</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-white">console.</span>
                      <span className="text-[#DCDCAA]">log</span>
                      <span className="text-white">(</span>
                      <span className="text-[#CE9178]">'Payment received!'</span>
                      <span className="text-white">, data);</span>
                    </div>
                    <div>
                      <span className="text-white">{"});"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CORPORATE FOOTER - GOOGLE STYLE 🌟 */}
      <footer className="bg-[#F8F9FA] border-t border-[#E8EAED]" style={{ fontFamily: "'Google Sans', sans-serif" }}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-16">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            {/* Solutions */}
            <div>
              <h3 className="text-base font-medium text-[#202124] mb-6">Solutions</h3>
              <ul className="space-y-4">
                <li>
                  <button 
                    onClick={() => navigate('#/marketing/gaming')}
                    className="text-[#5F6368] hover:text-[#4285F4] transition-colors duration-200 text-sm"
                  >
                    Gaming
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('#/marketing/creators')}
                    className="text-[#5F6368] hover:text-[#4285F4] transition-colors duration-200 text-sm"
                  >
                    Creators
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('#/marketing/b2b')}
                    className="text-[#5F6368] hover:text-[#4285F4] transition-colors duration-200 text-sm"
                  >
                    Cross-Border B2B
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('#/marketing/high-risk')}
                    className="text-[#5F6368] hover:text-[#4285F4] transition-colors duration-200 text-sm"
                  >
                    High-Risk Merchants
                  </button>
                </li>
              </ul>
            </div>

            {/* Developers */}
            <div>
              <h3 className="text-base font-medium text-[#202124] mb-6">Developers</h3>
              <ul className="space-y-4">
                <li>
                  <button 
                    onClick={() => navigate('#/docs/api-reference')}
                    className="text-[#5F6368] hover:text-[#4285F4] transition-colors duration-200 text-sm"
                  >
                    API Reference
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('#/docs/quick-start')}
                    className="text-[#5F6368] hover:text-[#4285F4] transition-colors duration-200 text-sm"
                  >
                    Quick Start
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('#/docs/code-examples')}
                    className="text-[#5F6368] hover:text-[#4285F4] transition-colors duration-200 text-sm"
                  >
                    Code Examples
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('#/login')}
                    className="text-[#5F6368] hover:text-[#4285F4] transition-colors duration-200 text-sm"
                  >
                    Get API Keys
                  </button>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-base font-medium text-[#202124] mb-6">Company</h3>
              <ul className="space-y-4">
                <li>
                  <button 
                    onClick={() => scrollToSection('about')}
                    className="text-[#5F6368] hover:text-[#4285F4] transition-colors duration-200 text-sm"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('#/help')}
                    className="text-[#5F6368] hover:text-[#4285F4] transition-colors duration-200 text-sm"
                  >
                    Support
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('#/help')}
                    className="text-[#5F6368] hover:text-[#4285F4] transition-colors duration-200 text-sm"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-base font-medium text-[#202124] mb-6">Legal</h3>
              <ul className="space-y-4">
                <li>
                  <button 
                    onClick={() => navigate('#/legal')}
                    className="text-[#5F6368] hover:text-[#4285F4] transition-colors duration-200 text-sm"
                  >
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('#/legal')}
                    className="text-[#5F6368] hover:text-[#4285F4] transition-colors duration-200 text-sm"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('#/legal')}
                    className="text-[#5F6368] hover:text-[#4285F4] transition-colors duration-200 text-sm"
                  >
                    Cookie Policy
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-[#E8EAED]">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <PymstrLogo 
                variant="full" 
                size="sm" 
                transparent={false}
                theme="terminal"
                className="cursor-pointer" 
                onClick={() => navigate('#/marketing')} 
              />
            </div>

            {/* Copyright */}
            <div className="text-sm text-[#5F6368]">
              © {new Date().getFullYear()} PYMSTR. All rights reserved.
            </div>

            {/* Social Links - Placeholder for future */}
            <div className="flex items-center gap-6">
              <span className="text-sm text-[#5F6368]">Powered by Web3</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MarketingLandingPage;