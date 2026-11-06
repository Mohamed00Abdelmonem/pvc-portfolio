import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeading } from './ui/SectionHeading';
import { motion } from 'framer-motion';
import { Sparkles, Shield, Cpu } from 'lucide-react';

export const PrinciplesSection: React.FC = () => {
  const { t } = useLanguage();

  const icons = [
    <Sparkles className="w-5 h-5 text-brand-primary group-hover:text-white transition-colors" key="quality" />,
    <Shield className="w-5 h-5 text-brand-primary group-hover:text-white transition-colors" key="safety" />,
    <Cpu className="w-5 h-5 text-brand-primary group-hover:text-white transition-colors" key="smartOps" />
  ];

  return (
    <section id="principles" className="py-24 md:py-32 bg-brand-cool-white text-brand-slate relative overflow-hidden border-b border-brand-light-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          tag={t.principles.tag}
          eyebrow={t.principles.eyebrow}
          titlePart1={t.principles.title}
          lead={t.principles.lead}
        />

        {/* 3 Pillars Grid: Modern Blue & White Corporate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-10">
          {t.principles.items.map((item, index) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="group relative p-6 sm:p-8 bg-white border border-brand-light-border border-t-2 border-t-brand-primary/60 rounded-sm hover:border-brand-primary transition-all duration-300 shadow-xs hover:shadow-lg hover:-translate-y-1"
            >
              {/* Header: Number & Minimal Icon */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-brand-light-border">
                <span className="font-mono text-2xl font-extrabold text-brand-navy">
                  {item.number}
                </span>
                <div className="p-2.5 rounded-full bg-brand-light border border-brand-light-border group-hover:bg-brand-primary transition-colors">
                  {icons[index]}
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-brand-slate mb-2.5 group-hover:text-brand-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-sm font-semibold text-brand-primary mb-3 leading-snug">
                {item.desc}
              </p>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                {item.detail}
              </p>

              {/* Sky Blue Bottom Accent Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-transparent group-hover:bg-brand-sky transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
