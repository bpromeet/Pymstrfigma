import React from "react";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { PymstrLogo } from "../components/PymstrLogo";
import { 
  Gamepad2,
  Zap,
  ShoppingCart,
  Users,
  TrendingUp,
  Shield,
  CheckCircle2,
  Sparkles,
  Coins,
  ChevronRight,
  Menu,
  X,
  ChevronLeft
} from "lucide-react";

/**
 * MarketingGamingPage - Use case page for Gaming & Virtual Economies
 * Google DeepMind-style aesthetic matching main landing page
 */
const MarketingGamingPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = React.useState(true);
  const lastScrollY = React.useRef(0);
  const ticking = React.useRef(false);

  // Hash-based navigation
  const navigate = (path: string) => {
    window.location.hash = path;
  };

  // Scroll direction detection - shows header on ANY upward scroll
  React.useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // At the very top - always show
          if (currentScrollY < 10) {
            setIsHeaderVisible(true);
          }
          // Scrolling down & past threshold - hide header
          else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
            setIsHeaderVisible(false);
          }
          // Scrolling up (even by 1px) - immediately show header
          else if (currentScrollY < lastScrollY.current) {
            setIsHeaderVisible(true);
          }
          
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const painPoints = [
    {
      problem: "7-day payout delays kill cash flow",
      solution: "Instant 10-second settlements. Pay creators and studios immediately.",
      icon: <Zap className="w-6 h-6" />
    },
    {
      problem: "High fees eat into margins (2.9% + 30¢)",
      solution: "1% flat fee. Save thousands on high-volume transactions.",
      icon: <Coins className="w-6 h-6" />
    },
    {
      problem: "Fraud and chargebacks destroy revenue",
      solution: "Zero chargebacks. Blockchain transactions are final and secure.",
      icon: <Shield className="w-6 h-6" />
    },
    {
      problem: "Complex multi-currency conversions",
      solution: "One global currency (stablecoins). No conversion fees or rates.",
      icon: <TrendingUp className="w-6 h-6" />
    }
  ];

  const features = [
    {
      title: "Instant In-Game Currency",
      description: "Convert USDC to game gold in 10 seconds. Players get instant access to purchases.",
      icon: <Sparkles className="w-12 h-12 text-[#4285F4]" />
    },
    {
      title: "Player-to-Player Marketplace",
      description: "Enable secure item trading with instant settlement. Built-in escrow protection.",
      icon: <ShoppingCart className="w-12 h-12 text-[#4285F4]" />
    },
    {
      title: "Gas-Free Transactions",
      description: "Account Abstraction means players never pay gas fees. Seamless UX like Web2.",
      icon: <Zap className="w-12 h-12 text-[#4285F4]" />
    },
    {
      title: "Global Player Base",
      description: "Accept payments from 190+ countries. No regional restrictions or currency barriers.",
      icon: <Users className="w-12 h-12 text-[#4285F4]" />
    }
  ];

  const benefits = [
    "Increase revenue by 15-30% with instant settlements",
    "Reduce fraud costs to zero with blockchain verification",
    "Expand to global markets without currency conversion",
    "Build player-driven economies with trustless marketplaces",
    "Offer premium experiences without payment friction",
    "Automate payouts to content creators and modders"
  ];

  const stats = [
    { value: "9.8s", label: "Average Settlement" },
    { value: "0%", label: "Chargeback Rate" },
    { value: "190+", label: "Global Coverage" },
    { value: "1%", label: "Average Fee" }
  ];

  const codeExample = `// PYMSTR Gaming SDK - Accept in-game payments

import { pymstr } from '@pymstr/sdk';

const payment = await pymstr.createPayment({
  amount: 9.99,
  currency: 'USDC',
  chain: 'Polygon',
  metadata: {
    gameId: 'space-raiders',
    itemId: 'legendary-sword',
    playerId: 'player-12345'
  }
});

// Real-time webhook when payment completes
pymstr.on('payment.completed', (data) => {
  // Credit in-game currency instantly
  game.creditCurrency(data.playerId, data.amount);
});`;

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Google Sans', sans-serif" }}>
      {/* Navigation Header - GOOGLE DEEPMIND STYLE 🌟 */}
      <header 
        className="fixed top-0 left-0 right-0 z-50 bg-white transition-transform duration-300" 
        style={{ 
          borderBottom: '0.25px solid rgba(0, 0, 0, 0.05)',
          transform: isHeaderVisible ? 'translateY(0)' : 'translateY(-100%)'
        }}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-5">
          {/* MOBILE LAYOUT: Grid with 3 columns */}
          <div className="lg:hidden grid grid-cols-3 items-center">
            {/* Left: Hamburger */}
            <div className="flex justify-start">
              <Button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="bg-transparent text-[#202124] hover:bg-[#F8F9FA] rounded-lg p-2 transition-all duration-200"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </div>

            {/* Center: Logo */}
            <div className="flex justify-center">
              <PymstrLogo 
                variant="full" 
                size="sm" 
                transparent={false}
                theme="terminal"
                className="cursor-pointer transition-all duration-500" 
                onClick={() => navigate('#/marketing')} 
              />
            </div>

            {/* Right: Start Button */}
            <div className="flex justify-end">
              <Button
                onClick={() => navigate('#/dashboard')}
                className="bg-[#F8F9FA] text-[#202124] hover:bg-[#E8EAED] rounded-full px-4 py-2 transition-all duration-200 inline-flex items-center gap-1.5 text-sm"
                style={{ fontFamily: "'Google Sans', sans-serif" }}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <ChevronRight className="w-3.5 h-3.5" />
                Start
              </Button>
            </div>
          </div>

          {/* DESKTOP LAYOUT: Flex with Logo + Menu (left side) */}
          <div className="hidden lg:flex items-center justify-between">
            {/* DESKTOP: Logo + Menu (left side) */}
            <div className="hidden lg:flex items-center gap-12">
              <PymstrLogo 
                variant="full" 
                size="md" 
                transparent={false}
                theme="terminal"
                className="cursor-pointer transition-all duration-500" 
                onClick={() => navigate('#/marketing')} 
              />

              {/* Desktop Navigation */}
              <nav className="flex items-center gap-8">
                <button 
                  onClick={() => navigate('#/marketing/gaming')}
                  className="text-[#202124] hover:text-[#5F6368] transition-colors duration-200 border-b-2 border-[#FF5914] pb-1"
                  style={{ fontFamily: "'Google Sans', sans-serif", fontSize: '18px', fontWeight: 420, lineHeight: '100%' }}
                >
                  Gaming
                </button>
                <button 
                  onClick={() => navigate('#/marketing/creators')}
                  className="text-[#5F6368] hover:text-[#202124] transition-colors duration-200"
                  style={{ fontFamily: "'Google Sans', sans-serif", fontSize: '18px', fontWeight: 420, lineHeight: '100%' }}
                >
                  Creators
                </button>
                <button 
                  onClick={() => navigate('#/marketing/b2b')}
                  className="text-[#5F6368] hover:text-[#202124] transition-colors duration-200"
                  style={{ fontFamily: "'Google Sans', sans-serif", fontSize: '18px', fontWeight: 420, lineHeight: '100%' }}
                >
                  B2B
                </button>
                <button 
                  onClick={() => navigate('#/marketing/high-risk')}
                  className="text-[#5F6368] hover:text-[#202124] transition-colors duration-200"
                  style={{ fontFamily: "'Google Sans', sans-serif", fontSize: '18px', fontWeight: 420, lineHeight: '100%' }}
                >
                  High-Risk
                </button>
                <button 
                  onClick={() => navigate('#/docs/api-reference')}
                  className="text-[#5F6368] hover:text-[#202124] transition-colors duration-200"
                  style={{ fontFamily: "'Google Sans', sans-serif", fontSize: '18px', fontWeight: 420, lineHeight: '100%' }}
                >
                  Docs
                </button>
              </nav>
            </div>

            {/* DESKTOP: Start Button (right side) */}
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigate('#/dashboard')}
                className="bg-[#F8F9FA] text-[#202124] hover:bg-[#E8EAED] rounded-full px-5 py-2 transition-all duration-200 inline-flex items-center gap-2"
                style={{ fontFamily: "'Google Sans', sans-serif" }}
              >
                <ChevronLeft className="w-4 h-4" />
                <ChevronRight className="w-4 h-4" />
                Start
              </Button>
            </div>
          </div>

          {/* MOBILE DRAWER - GOOGLE DEEPMIND STYLE */}
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />
              
              {/* Slide-out Drawer */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 left-0 bottom-0 w-[280px] bg-white shadow-2xl z-50 lg:hidden overflow-y-auto"
                style={{ borderRight: '0.25px solid rgba(0, 0, 0, 0.05)' }}
              >
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-6" style={{ borderBottom: '0.25px solid rgba(0, 0, 0, 0.05)' }}>
                  <PymstrLogo 
                    variant="full" 
                    size="sm" 
                    transparent={false}
                    theme="terminal"
                  />
                  <Button
                    onClick={() => setMobileMenuOpen(false)}
                    className="bg-transparent text-[#5F6368] hover:bg-[#F8F9FA] rounded-lg p-2 transition-all duration-200"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col p-4">
                  <div className="mb-2">
                    <p className="text-xs text-[#5F6368] px-4 py-2 font-medium" style={{ fontFamily: "'Google Sans', sans-serif" }}>
                      INDUSTRIES
                    </p>
                  </div>
                  <button 
                    onClick={() => { navigate('#/marketing/gaming'); setMobileMenuOpen(false); }}
                    className="text-[#FF5914] hover:bg-[#FFF4F0] transition-colors duration-200 font-normal text-left px-4 py-3 rounded-lg"
                    style={{ fontFamily: "'Google Sans', sans-serif", fontSize: '16px' }}
                  >
                    Gaming
                  </button>
                  <button 
                    onClick={() => { navigate('#/marketing/creators'); setMobileMenuOpen(false); }}
                    className="text-[#202124] hover:bg-[#F8F9FA] transition-colors duration-200 font-normal text-left px-4 py-3 rounded-lg"
                    style={{ fontFamily: "'Google Sans', sans-serif", fontSize: '16px' }}
                  >
                    Creators
                  </button>
                  <button 
                    onClick={() => { navigate('#/marketing/b2b'); setMobileMenuOpen(false); }}
                    className="text-[#202124] hover:bg-[#F8F9FA] transition-colors duration-200 font-normal text-left px-4 py-3 rounded-lg"
                    style={{ fontFamily: "'Google Sans', sans-serif", fontSize: '16px' }}
                  >
                    B2B
                  </button>
                  <button 
                    onClick={() => { navigate('#/marketing/high-risk'); setMobileMenuOpen(false); }}
                    className="text-[#202124] hover:bg-[#F8F9FA] transition-colors duration-200 font-normal text-left px-4 py-3 rounded-lg"
                    style={{ fontFamily: "'Google Sans', sans-serif", fontSize: '16px' }}
                  >
                    High-Risk
                  </button>

                  <div className="my-4" style={{ borderTop: '0.25px solid rgba(0, 0, 0, 0.05)' }} />

                  <button 
                    onClick={() => { navigate('#/docs/api-reference'); setMobileMenuOpen(false); }}
                    className="text-[#202124] hover:bg-[#F8F9FA] transition-colors duration-200 font-normal text-left px-4 py-3 rounded-lg"
                    style={{ fontFamily: "'Google Sans', sans-serif", fontSize: '16px' }}
                  >
                    Documentation
                  </button>

                  <div className="mt-6 px-4">
                    <Button
                      onClick={() => { navigate('#/dashboard'); setMobileMenuOpen(false); }}
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
            </>
          )}
        </div>
      </header>

      {/* Hero Section - GOOGLE DEEPMIND STYLE 🌟 */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-white">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F8F9FA] via-white to-[#FFF4F0] opacity-60" />
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-[#FF5914]/5 blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-[#4285F4]/5 blur-3xl" />

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            {/* Category Badge */}
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center" style={{ border: '0.25px solid rgba(0, 0, 0, 0.05)', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)' }}>
                <Gamepad2 className="w-7 h-7 text-[#FF5914]" />
              </div>
              <span className="text-[#5F6368]" style={{ fontSize: '18px', fontWeight: 420 }}>Gaming & Virtual Economies</span>
            </div>

            {/* Headline */}
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-normal text-[#202124] mb-8" style={{ fontFamily: "'Google Sans', sans-serif", lineHeight: '1.1' }}>
              Payments Built for Game Studios
            </h1>

            {/* Subtitle */}
            <p className="text-2xl sm:text-3xl text-[#5F6368] mb-10 font-normal" style={{ lineHeight: '1.6' }}>
              Instant settlements. Zero chargebacks. Global reach. Give your players the payment experience they deserve.
            </p>

            {/* CTA Button */}
            <div className="flex justify-center">
              <Button
                className="bg-[#F8F9FA] text-[#202124] hover:bg-[#E8EAED] rounded-full px-8 py-3 text-base font-medium transition-all duration-200"
                style={{ fontFamily: "'Google Sans', sans-serif" }}
              >
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pain Points → Solutions - GOOGLE DEEPMIND STYLE 🌟 */}
      <section className="relative py-40 overflow-hidden bg-white" style={{ fontFamily: "'Google Sans', sans-serif" }}>
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F8F9FA] to-white opacity-60" />

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl sm:text-6xl font-normal text-[#202124] mb-6" style={{ fontFamily: "'Google Sans', sans-serif", lineHeight: '1.2' }}>
              We Solve Real Gaming Problems
            </h2>
            <p className="text-xl sm:text-2xl text-[#5F6368] max-w-3xl mx-auto font-normal" style={{ lineHeight: '1.6' }}>
              Built by developers who understand the pain of traditional payment processors.
            </p>
          </div>

          {/* Pain Points Grid */}
          <div className="space-y-6">
            {painPoints.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="grid md:grid-cols-2 bg-white rounded-3xl overflow-hidden"
                style={{ border: '0.25px solid rgba(0, 0, 0, 0.05)', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)' }}
              >
                {/* Problem Side */}
                <div className="p-8 md:p-10">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#FDECEA] flex items-center justify-center flex-shrink-0">
                      <span className="text-[#EA4335] text-xl">✗</span>
                    </div>
                    <div>
                      <p className="text-xl sm:text-2xl font-normal text-[#202124]" style={{ lineHeight: '1.4' }}>
                        {item.problem}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Solution Side */}
                <div className="p-8 md:p-10 bg-[#E6F4EA]" style={{ borderLeft: '0.25px solid rgba(0, 0, 0, 0.05)' }}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 text-[#34A853]" style={{ border: '0.25px solid rgba(0, 0, 0, 0.05)' }}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xl sm:text-2xl font-normal text-[#202124]" style={{ lineHeight: '1.4' }}>
                        {item.solution}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gaming Features - GOOGLE DEEPMIND STYLE 🌟 */}
      <section className="relative py-40 overflow-hidden" style={{ background: 'linear-gradient(to bottom, white, #F8F9FA)', fontFamily: "'Google Sans', sans-serif" }}>
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl sm:text-6xl font-normal text-[#202124] mb-6" style={{ fontFamily: "'Google Sans', sans-serif", lineHeight: '1.2' }}>
              Gaming-First Features
            </h2>
            <p className="text-xl sm:text-2xl text-[#5F6368] max-w-3xl mx-auto font-normal" style={{ lineHeight: '1.6' }}>
              Everything you need to monetize your game globally.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-3xl p-10 hover:shadow-md transition-all duration-300"
                style={{ border: '0.25px solid rgba(0, 0, 0, 0.05)', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)' }}
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center group-hover:bg-[#F8F9FA] transition-all duration-300" style={{ border: '0.25px solid rgba(0, 0, 0, 0.05)', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)' }}>
                    {feature.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-normal text-[#202124] mb-3" style={{ fontFamily: "'Google Sans', sans-serif", lineHeight: '1.3' }}>
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-lg text-[#5F6368] font-normal" style={{ lineHeight: '1.6' }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits + Stats - GOOGLE DEEPMIND STYLE 🌟 */}
      <section className="relative py-40 overflow-hidden bg-white" style={{ fontFamily: "'Google Sans', sans-serif" }}>
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT - Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl sm:text-6xl font-normal text-[#202124] mb-8" style={{ fontFamily: "'Google Sans', sans-serif", lineHeight: '1.2' }}>
                Why Top Game Studios Choose PYMSTR
              </h2>
              <p className="text-xl sm:text-2xl text-[#5F6368] mb-10 font-normal" style={{ lineHeight: '1.6' }}>
                Join the next generation of gaming payments. Built for scale, designed for players.
              </p>
              <div className="space-y-5">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <CheckCircle2 className="w-7 h-7 text-[#34A853] flex-shrink-0 mt-1" />
                    <span className="text-xl sm:text-2xl text-[#5F6368] font-normal">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT - Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-3xl p-10"
              style={{ border: '0.25px solid rgba(0, 0, 0, 0.05)', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)' }}
            >
              <div className="flex items-center gap-3 mb-8">
                <Gamepad2 className="w-7 h-7 text-[#FF5914]" />
                <h3 className="text-2xl font-normal text-[#202124]" style={{ fontFamily: "'Google Sans', sans-serif" }}>Live Stats</h3>
              </div>
              <div className="space-y-8">
                {stats.map((stat, index) => (
                  <div key={index} className="flex justify-between items-center pb-6" style={{ borderBottom: index < stats.length - 1 ? '0.25px solid rgba(0, 0, 0, 0.05)' : 'none' }}>
                    <span className="text-lg text-[#5F6368]">{stat.label}</span>
                    <span className="text-4xl font-normal text-[#FF5914]" style={{ fontFamily: "'Google Sans', sans-serif" }}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Code Example - GOOGLE DEEPMIND STYLE 🌟 */}
      <section className="relative py-40 overflow-hidden" style={{ background: 'linear-gradient(to bottom, white, #F8F9FA)', fontFamily: "'Google Sans', sans-serif" }}>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl font-normal text-[#202124] mb-6" style={{ fontFamily: "'Google Sans', sans-serif", lineHeight: '1.2' }}>
              5-Minute Integration
            </h2>
            <p className="text-xl sm:text-2xl text-[#5F6368] font-normal" style={{ lineHeight: '1.6' }}>
              Start accepting stablecoins in your game today.
            </p>
          </div>

          {/* Code Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#202124] rounded-3xl overflow-hidden"
            style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
          >
            {/* Terminal Header */}
            <div className="bg-[#2D2D2D] px-6 py-4 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              <span className="ml-4 text-[#8A8A8A] text-sm font-mono">game-payments.ts</span>
            </div>

            {/* Code Content */}
            <div className="p-8">
              <pre className="text-sm overflow-x-auto font-mono">
                <code className="text-[#88C0D0]">{codeExample}</code>
              </pre>
            </div>
          </motion.div>

          {/* CTA Button */}
          <div className="text-center mt-10">
            <Button
              onClick={() => navigate('#/docs/api-reference')}
              className="bg-[#F8F9FA] text-[#202124] hover:bg-[#E8EAED] rounded-full px-8 py-3 transition-all duration-200 inline-flex items-center gap-2"
              style={{ fontFamily: "'Google Sans', sans-serif" }}
            >
              View Full API Documentation
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA - GOOGLE DEEPMIND STYLE 🌟 */}
      <section className="relative py-40 overflow-hidden bg-[#FF5914]">
        {/* Floating shapes */}
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-white/5 blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Icon */}
            <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-8">
              <Gamepad2 className="w-10 h-10 text-white" />
            </div>

            {/* Headline */}
            <h2 className="text-5xl sm:text-6xl font-normal text-white mb-8" style={{ fontFamily: "'Google Sans', sans-serif", lineHeight: '1.2' }}>
              Ready to Level Up Your Payments?
            </h2>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-white/90 mb-12 font-normal" style={{ lineHeight: '1.6' }}>
              Join game studios processing $10M+ monthly. No setup fees. No commitments.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('#/dashboard')}
                className="bg-white text-[#FF5914] hover:bg-[#F8F9FA] rounded-full px-8 py-3 text-base font-medium transition-all duration-200 inline-flex items-center gap-2"
                style={{ fontFamily: "'Google Sans', sans-serif" }}
              >
                Start Free Trial
                <ChevronRight className="w-5 h-5" />
              </Button>
              <Button
                className="bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 rounded-full px-8 py-3 text-base font-medium transition-all duration-200"
                style={{ fontFamily: "'Google Sans', sans-serif" }}
              >
                Talk to Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer - GOOGLE DEEPMIND STYLE 🌟 */}
      <footer className="py-12 bg-white" style={{ borderTop: '0.25px solid rgba(0, 0, 0, 0.05)' }}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <p className="text-[#5F6368]" style={{ fontFamily: "'Google Sans', sans-serif" }}>© 2024 PYMSTR. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MarketingGamingPage;
