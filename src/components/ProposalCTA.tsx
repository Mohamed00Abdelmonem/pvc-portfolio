import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowUpRight, MessageSquareQuote } from 'lucide-react';

export const ProposalCTA: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 md:py-28 bg-brand-navy text-white relative overflow-hidden border-b border-brand-navy-dark">
      {/* Decorative Brand Watermark */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[140px] sm:text-[200px] lg:text-[260px] font-black text-white/5 select-none pointer-events-none font-manrope leading-none">
        {t.ctaBanner.watermark}
        <span className="text-brand-sky/20 text-5xl">✳</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-navy-dark border border-brand-sky/30 text-xs font-bold tracking-wider text-brand-sky uppercase mb-4 shadow-xs"
          >
            <MessageSquareQuote className="w-3.5 h-3.5 text-brand-sky" />
            <span>{t.ctaBanner.eyebrow}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5"
          >
            {t.ctaBanner.titlePart1}{' '}
            <span className="text-brand-sky font-normal">
              {t.ctaBanner.titlePart2}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-brand-sky-pale leading-relaxed mb-8 max-w-2xl font-normal"
          >
            {t.ctaBanner.lead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              onClick={handleScrollToContact}
              className="inline-flex items-center gap-3 px-8 py-4 bg-brand-primary hover:bg-white hover:text-brand-navy text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 rounded-full shadow-xl hover:shadow-brand-primary/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{t.ctaBanner.cta}</span>
              <ArrowUpRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            </button>

            <span className="text-xs text-brand-sky-soft tracking-wide font-medium">
              {t.ctaBanner.directLine}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
