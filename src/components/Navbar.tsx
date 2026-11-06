import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X, Globe, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const { t, language, toggleLanguage, isRTL } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);

      const sections = ['home', 'about', 'services', 'system-architecture', 'principles', 'sectors', 'approach', 'contact'];
      const scrollPos = window.scrollY + 180;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'services', label: t.nav.services },
    { id: 'system-architecture', label: language === 'ar' ? 'كيف يعمل النظام' : 'System Flow' },
    { id: 'principles', label: t.nav.principles },
    { id: 'sectors', label: t.nav.sectors },
    { id: 'approach', label: t.nav.approach },
    { id: 'contact', label: t.nav.contact }
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Topline Banner: Deep Navy Background with Sky Blue Accent */}
      <div
        className={`bg-brand-navy-dark text-brand-sky-pale text-[11px] md:text-xs px-4 border-b border-brand-navy-light/40 tracking-normal font-medium transition-all duration-300 ${
          isScrolled ? 'hidden md:block md:py-1' : 'py-2'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-sky animate-pulse" />
            <span className="truncate text-white">{t.topline}</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-brand-sky-soft text-[11px]">
            <span>{t.brand.tagline}</span>
            <span className="text-white/20">|</span>
            <a
              href="tel:+201278761141"
              className="hover:text-white transition-colors font-mono tracking-normal font-semibold text-brand-sky-soft"
              dir="ltr"
            >
              +20 127 876 1141
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header: Deep Navy */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-brand-navy/95 backdrop-blur-md shadow-lg py-3.5 border-b border-brand-navy-dark'
            : 'bg-brand-navy text-white py-4 md:py-4.5 border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
              className="flex items-center gap-2.5 group focus:outline-none"
            >
              <div className="relative flex flex-col justify-center items-start">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-black font-manrope tracking-tighter text-white">
                    PVC
                  </span>
                  <span className="w-2 h-2 rounded-full bg-brand-sky inline-block mb-1 group-hover:scale-125 transition-transform" />
                </div>
                <div className="flex flex-col -mt-1">
                  <span className="text-[10px] sm:text-[11px] font-extrabold tracking-[0.2em] text-brand-sky uppercase">
                    SMART SERVICES
                  </span>
                  <span className="text-[7.5px] font-semibold tracking-[0.14em] text-brand-sky-pale uppercase hidden sm:block">
                    OPERATIONAL EXCELLENCE · EGYPT
                  </span>
                </div>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`relative text-xs sm:text-sm font-semibold transition-colors py-1 focus:outline-none ${
                      isActive
                        ? 'text-brand-sky font-bold'
                        : 'text-white/85 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-sky rounded-full"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Actions: Language & CTA */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 hover:border-brand-sky text-white hover:text-brand-sky text-xs font-semibold tracking-wider transition-all focus:outline-none bg-brand-navy-dark/60"
                title={language === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
                aria-label="Toggle language"
              >
                <Globe className="w-3.5 h-3.5 text-brand-sky" />
                <span>{language === 'ar' ? 'EN' : 'عربي'}</span>
              </button>

              {/* Proposal CTA Button: Primary Blue Fluid Pill */}
              <button
                onClick={() => handleNavClick('contact')}
                className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 bg-brand-primary hover:bg-brand-primary-dark text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 focus:outline-none active:translate-y-0 rounded-full"
              >
                <span>{t.nav.cta}</span>
              </button>

              {/* Mobile Menu Button: Fluid Rounded */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 text-white hover:text-brand-sky focus:outline-none rounded-full border border-white/20 bg-brand-navy-dark/60 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Dimmed Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 top-[60px] bg-brand-navy-dark/75 backdrop-blur-xs z-30 lg:hidden"
              />
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="relative z-40 lg:hidden border-t border-brand-navy-dark bg-brand-navy-dark px-5 py-6 overflow-hidden shadow-2xl"
              >
                <div className="flex flex-col gap-2.5">
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.id;
                    return (
                      <button
                        key={link.id}
                        onClick={() => handleNavClick(link.id)}
                        className={`flex items-center justify-between text-left py-2.5 px-3.5 rounded text-sm font-semibold transition-colors focus:outline-none ${
                          isActive
                            ? 'bg-brand-navy text-brand-sky font-bold'
                            : 'text-white/85 hover:bg-brand-navy hover:text-white'
                        }`}
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight
                          className={`w-4 h-4 transition-transform ${isRTL ? 'rotate-180' : ''} ${
                            isActive ? 'text-brand-sky opacity-100' : 'opacity-30'
                          }`}
                        />
                      </button>
                    );
                  })}

                  <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-3">
                    <button
                      onClick={() => handleNavClick('contact')}
                      className="w-full flex items-center justify-center gap-2 py-3.5 bg-brand-primary text-white text-xs font-bold tracking-widest uppercase rounded-full shadow-md hover:bg-brand-primary-dark transition-colors"
                    >
                      <span>{t.nav.cta}</span>
                    </button>
                    <p className="text-center text-[11px] text-brand-sky-soft font-mono" dir="ltr">
                      +20 127 876 1141 · info@PVCsmartservice.com
                    </p>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
