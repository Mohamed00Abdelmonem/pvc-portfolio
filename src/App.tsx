import React, { useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesShowcase } from './components/ServicesShowcase';
import { SmartSystemExplainer } from './components/SmartSystemExplainer';
import { PrinciplesSection } from './components/PrinciplesSection';
import { IndustriesSection } from './components/IndustriesSection';
import { ApproachTimeline } from './components/ApproachTimeline';
import { ProposalCTA } from './components/ProposalCTA';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/ui/FloatingWhatsApp';

export const AppContent: React.FC = () => {
  // Handle initial deep-link hash on page mount
  useEffect(() => {
    if (window.location.hash) {
      const targetId = window.location.hash.replace('#', '');
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-brand-slate flex flex-col selection:bg-brand-primary selection:text-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <AboutSection />
        <ServicesShowcase />
        <SmartSystemExplainer />
        <PrinciplesSection />
        <IndustriesSection />
        <ApproachTimeline />
        <ProposalCTA />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
