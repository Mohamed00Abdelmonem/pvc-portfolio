import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeading } from './ui/SectionHeading';
import { motion } from 'framer-motion';
import { CheckCircle2, Award, Users, ShieldAlert } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { t, language, isRTL } = useLanguage();

  return (
    <section id="about" className="py-24 md:py-32 bg-brand-cool-white text-brand-slate relative overflow-hidden border-b border-brand-light-border">
      {/* Decorative Subtle Blue Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-light/60 rounded-full blur-3xl -z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <SectionHeading
          tag={t.about.tag}
          eyebrow={t.about.eyebrow}
          titlePart1={t.about.titlePart1}
          titlePart2={t.about.titlePart2}
          lead={t.about.lead}
        />

        {/* Asymmetrical Editorial Layout: Copy & Visual Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-lg md:text-xl text-brand-slate font-semibold leading-relaxed"
            >
              {t.about.paragraph1}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base text-brand-muted leading-relaxed"
            >
              {t.about.paragraph2}
            </motion.p>

            {/* Editorial Quote Box with Primary Blue Accent */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className={`relative p-6 sm:p-7 bg-white rounded-2xl shadow-sm ${
                isRTL ? 'border-r-4 border-brand-primary' : 'border-l-4 border-brand-primary'
              }`}
            >
              <p className="text-brand-slate text-base sm:text-lg font-medium leading-relaxed italic">
                “{t.about.quote}”
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span className="w-5 h-px bg-brand-primary" />
                <span className="text-xs uppercase tracking-wider font-bold text-brand-navy">
                  PVC SMART SERVICES · EGYPT
                </span>
              </div>
            </motion.div>

            {/* 3 Operational Focus Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {t.about.focusPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="p-5 bg-white border border-brand-light-border/80 rounded-2xl hover:border-brand-primary transition-all duration-300 shadow-xs hover:-translate-y-0.5"
                >
                  <div className="w-10 h-10 rounded-full bg-brand-navy text-brand-sky flex items-center justify-center mb-3">
                    {index === 0 && <Users className="w-4 h-4" />}
                    {index === 1 && <ShieldAlert className="w-4 h-4" />}
                    {index === 2 && <Award className="w-4 h-4" />}
                  </div>
                  <h4 className="font-heading font-bold text-brand-slate text-sm mb-1.5">{point.title}</h4>
                  <p className="text-xs text-brand-muted leading-relaxed">{point.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Authentic Operations Visual (5 cols) */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              {/* Primary Image Frame: Natural Photography */}
              <div className="relative overflow-hidden rounded-3xl shadow-xl border-4 border-white aspect-[4/5] bg-brand-light">
                <img
                  src="/images/hero/valet-main.jpg"
                  alt={language === 'ar' ? 'فريق العمل الميداني خلال الإشراف والتنظيم' : 'Field team supervision and briefing'}
                  className="w-full h-full object-cover hover:scale-103 transition-transform duration-700"
                  style={{ objectPosition: 'center 40%' }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                  <span className="font-mono text-brand-sky text-[10px] tracking-wider block mb-1">
                    OPERATIONAL PROTOCOL
                  </span>
                  <p className="font-semibold text-white/95 leading-tight">
                    {language === 'ar' ? 'جاهزية وانضباط في كل وردية' : 'Readiness & Discipline in Every Shift'}
                  </p>
                </div>
              </div>

              {/* Overlapping Standard Card: Navy & Sky */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className={`mt-4 sm:mt-0 sm:absolute sm:-bottom-6 ${
                  isRTL ? 'sm:-left-6' : 'sm:-right-6'
                } bg-brand-navy text-white p-4 sm:p-5 rounded-2xl shadow-xl sm:shadow-2xl sm:max-w-xs border border-brand-sky/30`}
              >
                <div className="flex items-center gap-2 mb-1.5 text-brand-sky">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {language === 'ar' ? 'معايير تشغيل معتمدة' : 'Verified Standard'}
                  </span>
                </div>
                <p className="text-xs text-brand-sky-pale leading-relaxed">
                  {language === 'ar'
                    ? 'تدريب وإشراف ميداني مستمر لضمان أعلى مستويات الأمان ورضا الزوار في مصر.'
                    : 'Continuous field supervision ensuring the highest safety and guest satisfaction across Egypt.'}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
