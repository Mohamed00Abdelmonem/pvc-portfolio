import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeading } from './ui/SectionHeading';
import { motion } from 'framer-motion';
import { Search, Compass, Rocket, TrendingUp } from 'lucide-react';

export const ApproachTimeline: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const stepIcons = [
    <Search className="w-5 h-5 text-brand-primary" key="1" />,
    <Compass className="w-5 h-5 text-brand-primary" key="2" />,
    <Rocket className="w-5 h-5 text-brand-primary" key="3" />,
    <TrendingUp className="w-5 h-5 text-brand-primary" key="4" />
  ];

  return (
    <section id="approach" className="py-24 md:py-36 bg-brand-cool-white text-brand-slate relative overflow-hidden border-b border-brand-light-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          tag={t.approach.tag}
          eyebrow={t.approach.eyebrow}
          titlePart1={t.approach.titlePart1}
          titlePart2={t.approach.titlePart2}
          lead={t.approach.lead}
        />

        {/* Desktop Horizontal Timeline */}
        <div className="hidden lg:block mt-16 relative">
          {/* Connecting Line */}
          <div className="absolute top-10 left-12 right-12 h-0.5 bg-brand-light-border" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className={`absolute top-10 left-12 right-12 h-0.5 bg-brand-primary ${
              isRTL ? 'origin-right' : 'origin-left'
            }`}
          />

          <div className="grid grid-cols-4 gap-8 relative z-10">
            {t.approach.steps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="group"
              >
                {/* Node Indicator: Clean White with Circular Fluid Hover */}
                <div className="w-16 h-16 rounded-full bg-white border-2 border-brand-light-border/80 group-hover:border-brand-primary flex flex-col items-center justify-center transition-all duration-300 shadow-sm mb-7 group-hover:-translate-y-1">
                  <span className="font-mono text-[11px] font-bold text-brand-navy">{step.number}</span>
                  {stepIcons[idx]}
                </div>

                {/* Content */}
                <div className="space-y-2.5">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-brand-muted uppercase block">
                    {step.englishName}
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-brand-slate group-hover:text-brand-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                    {step.desc}
                  </p>
                  <p className="text-xs text-brand-primary font-semibold leading-relaxed border-t border-brand-light-border pt-2.5">
                    {step.subtext}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile & Tablet Vertical Timeline */}
        <div className="lg:hidden mt-12 relative">
          {/* Vertical Track Line */}
          <div
            className={`absolute top-4 bottom-4 ${
              isRTL ? 'right-6 sm:right-7' : 'left-6 sm:left-7'
            } w-0.5 bg-brand-light-border`}
          />

          <div className="space-y-8 relative">
            {t.approach.steps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="flex items-start gap-4 sm:gap-6"
              >
                {/* Vertical Node */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-full bg-white border-2 border-brand-primary flex items-center justify-center shadow-sm relative z-10">
                  <span className="font-mono text-xs font-extrabold text-brand-navy">{step.number}</span>
                </div>

                {/* Step Details: Clean Fluid Card */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-brand-light-border/80 flex-1 shadow-xs">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-heading text-lg font-bold text-brand-slate">{step.title}</h3>
                    <span className="text-[10px] font-mono text-brand-muted tracking-wider uppercase font-semibold">
                      {step.englishName}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-brand-muted leading-relaxed mt-2 mb-2.5">
                    {step.desc}
                  </p>
                  <p className="text-[11px] text-brand-primary font-semibold border-t border-brand-light-border pt-2">
                    {step.subtext}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
