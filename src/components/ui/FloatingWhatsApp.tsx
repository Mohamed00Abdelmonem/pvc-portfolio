import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FloatingWhatsApp: React.FC = () => {
  const { isRTL, language } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(false);

  const phoneDisplay = '+20 127 876 1141';
  const whatsappUrl = `https://wa.me/201278761141?text=${encodeURIComponent(
    language === 'ar'
      ? 'مرحبًا PVC SMART SERVICES، أود الاستفسار عن خدمات التشغيل وإدارة المواقف.'
      : 'Hello PVC SMART SERVICES, I would like to inquire about your operational and parking services.'
  )}`;

  return (
    <div
      className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 flex items-center gap-3"
    >
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -10 : 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="hidden sm:flex items-center gap-2.5 bg-white text-brand-slate border border-brand-light-border px-3.5 py-2 rounded-sm shadow-xl text-xs"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-brand-sky animate-pulse" />
            <div>
              <p className="font-bold text-brand-navy text-[11px]">
                {language === 'ar' ? 'فريق العمل متاح مباشرة' : 'Direct Desk Available'}
              </p>
              <p className="text-[10px] text-brand-muted font-mono" dir="ltr">
                {phoneDisplay}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="text-brand-muted hover:text-brand-slate p-0.5 ml-1"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="group relative flex items-center gap-2 p-3 sm:px-4 sm:py-3 bg-brand-navy hover:bg-brand-primary text-white rounded-full shadow-2xl border border-brand-sky/40 hover:border-brand-sky transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Direct WhatsApp Contact"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-sky opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-sky" />
        </span>
        <MessageCircle className="w-5 h-5 text-brand-sky group-hover:text-white group-hover:rotate-12 transition-transform" />
        <span className="text-xs font-bold tracking-wider hidden sm:inline text-white">
          {language === 'ar' ? 'واتساب مباشر' : 'Direct Desk'}
        </span>
      </a>
    </div>
  );
};
