import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { IMAGES } from '../assets/images';
import { SectionHeading } from './ui/SectionHeading';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Hotel,
  ShoppingBag,
  Stethoscope,
  Home,
  Building2,
  Calendar,
  Sparkles
} from 'lucide-react';

interface SectorVisualMeta {
  url: string;
  alt: { ar: string; en: string };
  objectPosition: string;
  tag: { ar: string; en: string };
  icon: React.ReactNode;
}

export const IndustriesSection: React.FC = () => {
  const { t, isRTL, language } = useLanguage();
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const sectors = t.sectors.items;
  const hospitality = sectors.find((s) => s.id === 'hospitality')!;
  const retail = sectors.find((s) => s.id === 'retail')!;
  const medical = sectors.find((s) => s.id === 'medical')!;
  const residential = sectors.find((s) => s.id === 'residential')!;
  const corporate = sectors.find((s) => s.id === 'corporate')!;
  const events = sectors.find((s) => s.id === 'events')!;

  // Verified, high-resolution authentic photography metadata for all 6 sectors
  const sectorMetaMap: Record<string, SectorVisualMeta> = {
    hospitality: {
      url: IMAGES.sectors.hospitality.url,
      alt: IMAGES.sectors.hospitality.alt,
      objectPosition: 'center 40%',
      tag: { ar: 'استقبال فندقي فاخر وصف سيارات', en: 'Luxury Hospitality & Front-of-House' },
      icon: <Hotel className="w-4 h-4 text-brand-primary" />
    },
    retail: {
      url: IMAGES.sectors.retail.url,
      alt: IMAGES.sectors.retail.alt,
      objectPosition: 'center 45%',
      tag: { ar: 'انسيابية تدفق المتسوقين والمواقف', en: 'Retail Circulation & Ingress' },
      icon: <ShoppingBag className="w-4 h-4 text-brand-primary" />
    },
    medical: {
      url: IMAGES.sectors.medical.url,
      alt: IMAGES.sectors.medical.alt,
      objectPosition: 'center 45%',
      tag: { ar: 'أولوية إسعاف ومسارات طوارئ مفتوحة', en: 'Emergency Priority & Swift Drop-Off' },
      icon: <Stethoscope className="w-4 h-4 text-brand-primary" />
    },
    residential: {
      url: IMAGES.sectors.residential.url,
      alt: IMAGES.sectors.residential.alt,
      objectPosition: 'center 40%',
      tag: { ar: 'هدوء وأمان وخصوصية للمقيمين', en: 'Resident Privacy & Controlled Bay Access' },
      icon: <Home className="w-4 h-4 text-brand-primary" />
    },
    corporate: {
      url: IMAGES.sectors.corporate.url,
      alt: IMAGES.sectors.corporate.alt,
      objectPosition: 'center 35%',
      tag: { ar: 'مواقف مخصصة وانضباط زمني للتنفيذيين', en: 'Executive Bay Management & Punctuality' },
      icon: <Building2 className="w-4 h-4 text-brand-primary" />
    },
    events: {
      url: IMAGES.sectors.events.url,
      alt: IMAGES.sectors.events.alt,
      objectPosition: 'center 40%',
      tag: { ar: 'إدارة كثافات استثنائية واستقبال كبار الضيوف', en: 'Surge Flow & VIP Arrival Protocols' },
      icon: <Calendar className="w-4 h-4 text-brand-primary" />
    }
  };

  const sectorList = [hospitality, retail, medical, residential, corporate, events];

  // Touch swipe handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 40;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swiped left
        if (isRTL) prevMobile();
        else nextMobile();
      } else {
        // Swiped right
        if (isRTL) nextMobile();
        else prevMobile();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const nextMobile = () => {
    setActiveMobileIndex((prev) => (prev + 1) % sectorList.length);
  };

  const prevMobile = () => {
    setActiveMobileIndex((prev) => (prev - 1 + sectorList.length) % sectorList.length);
  };

  const activeMobileSector = sectorList[activeMobileIndex];
  const activeMobileMeta = sectorMetaMap[activeMobileSector.id];

  return (
    <section
      id="sectors"
      className="py-20 sm:py-24 md:py-32 bg-white text-brand-slate relative overflow-hidden border-b border-brand-light-border"
    >
      {/* Decorative Subtle Blue Glow in Corner */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-light/60 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <SectionHeading
          tag={t.sectors.tag}
          eyebrow={t.sectors.eyebrow}
          titlePart1={t.sectors.titlePart1}
          titlePart2={t.sectors.titlePart2}
          lead={t.sectors.lead}
        />

        {/* ============================================================== */}
        {/* DESKTOP LAYOUT (>= 1024px): Premium Editorial Catalogue        */}
        {/* ============================================================== */}
        <div className="hidden lg:block space-y-8 mt-12">
          {/* Top Asymmetric Tier (7 cols Anchor + 5 cols Stack) */}
          <div className="grid grid-cols-12 gap-8 items-start">
            
            {/* 01: Hotels & Hospitality — Large Featured Monograph Anchor (7 cols) */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="col-span-7 group bg-brand-cool-white/40 border border-brand-light-border rounded-sm p-6 lg:p-7 hover:border-brand-primary/60 transition-all duration-300 shadow-xs hover:shadow-md"
            >
              {/* Photo Frame */}
              <div className="relative rounded-sm overflow-hidden aspect-[16/10] bg-brand-light border border-brand-light-border/80">
                <img
                  src={sectorMetaMap.hospitality.url}
                  alt={sectorMetaMap.hospitality.alt[language]}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                  style={{ objectPosition: sectorMetaMap.hospitality.objectPosition }}
                  loading="lazy"
                />
                {/* Minimalist Floating Sector Number Badge */}
                <div className="absolute top-3.5 left-3.5 px-3 py-1 bg-white/95 backdrop-blur-md rounded-xs border border-brand-light-border shadow-xs flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-brand-navy">
                    {hospitality.number}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-brand-primary" />
                  <span className="text-[10px] font-mono tracking-wider text-brand-muted uppercase font-semibold">
                    FEATURED SECTOR
                  </span>
                </div>
              </div>

              {/* Text Narrative Beneath Image — Clean & Spacious */}
              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold tracking-widest text-brand-primary uppercase">
                    {hospitality.enTitle}
                  </span>
                  <div className="p-1.5 rounded-full bg-white border border-brand-light-border">
                    {sectorMetaMap.hospitality.icon}
                  </div>
                </div>

                <h3 className="font-heading text-2xl lg:text-3xl font-extrabold text-brand-slate group-hover:text-brand-primary transition-colors">
                  {hospitality.title}
                </h3>

                <p className="text-sm text-brand-muted leading-relaxed max-w-2xl">
                  {hospitality.desc}
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-brand-light-border/70 text-xs">
                  <span className="text-brand-slate font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
                    {sectorMetaMap.hospitality.tag[language]}
                  </span>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1 font-bold text-brand-primary hover:text-brand-navy transition-colors"
                  >
                    <span>{language === 'ar' ? 'طلب دراسة تشغيلية' : 'Request Study'}</span>
                    <ArrowUpRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                  </a>
                </div>
              </div>
            </motion.article>

            {/* Right Stack: 02 Retail & 03 Medical (5 cols) */}
            <div className="col-span-5 flex flex-col gap-6">
              
              {/* 02: Retail & Shopping Malls */}
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="group bg-brand-cool-white/40 border border-brand-light-border rounded-sm p-5 hover:border-brand-primary/60 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between"
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-5 relative rounded-sm overflow-hidden aspect-[4/3] bg-brand-light border border-brand-light-border/80">
                    <img
                      src={sectorMetaMap.retail.url}
                      alt={sectorMetaMap.retail.alt[language]}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                      style={{ objectPosition: sectorMetaMap.retail.objectPosition }}
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-white/95 backdrop-blur-md rounded-xs border border-brand-light-border shadow-xs">
                      <span className="font-mono text-[11px] font-bold text-brand-navy">
                        {retail.number}
                      </span>
                    </div>
                  </div>

                  <div className="col-span-7 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-brand-primary uppercase">
                        {retail.enTitle}
                      </span>
                      {sectorMetaMap.retail.icon}
                    </div>
                    <h3 className="font-heading text-lg font-bold text-brand-slate group-hover:text-brand-primary transition-colors">
                      {retail.title}
                    </h3>
                    <p className="text-xs text-brand-muted leading-relaxed line-clamp-3">
                      {retail.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-2.5 mt-3 border-t border-brand-light-border/70 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-brand-slate font-medium truncate max-w-[200px]">
                    {sectorMetaMap.retail.tag[language]}
                  </span>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1 font-bold text-brand-primary hover:text-brand-navy text-[11px] transition-colors shrink-0"
                  >
                    <span>{language === 'ar' ? 'استفسار' : 'Inquire'}</span>
                    <ArrowUpRight className={`w-3 h-3 ${isRTL ? 'rotate-180' : ''}`} />
                  </a>
                </div>
              </motion.article>

              {/* 03: Hospitals & Medical Centers */}
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group bg-brand-cool-white/40 border border-brand-light-border rounded-sm p-5 hover:border-brand-primary/60 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between"
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-5 relative rounded-sm overflow-hidden aspect-[4/3] bg-brand-light border border-brand-light-border/80">
                    <img
                      src={sectorMetaMap.medical.url}
                      alt={sectorMetaMap.medical.alt[language]}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                      style={{ objectPosition: sectorMetaMap.medical.objectPosition }}
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-white/95 backdrop-blur-md rounded-xs border border-brand-light-border shadow-xs">
                      <span className="font-mono text-[11px] font-bold text-brand-navy">
                        {medical.number}
                      </span>
                    </div>
                  </div>

                  <div className="col-span-7 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-brand-primary uppercase">
                        {medical.enTitle}
                      </span>
                      {sectorMetaMap.medical.icon}
                    </div>
                    <h3 className="font-heading text-lg font-bold text-brand-slate group-hover:text-brand-primary transition-colors">
                      {medical.title}
                    </h3>
                    <p className="text-xs text-brand-muted leading-relaxed line-clamp-3">
                      {medical.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-2.5 mt-3 border-t border-brand-light-border/70 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-brand-slate font-medium truncate max-w-[200px]">
                    {sectorMetaMap.medical.tag[language]}
                  </span>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1 font-bold text-brand-primary hover:text-brand-navy text-[11px] transition-colors shrink-0"
                  >
                    <span>{language === 'ar' ? 'استفسار' : 'Inquire'}</span>
                    <ArrowUpRight className={`w-3 h-3 ${isRTL ? 'rotate-180' : ''}`} />
                  </a>
                </div>
              </motion.article>

            </div>

          </div>

          {/* Bottom Row: Three Balanced Editorial Triptych Entries (4 + 4 + 4 cols) */}
          <div className="grid grid-cols-12 gap-8">
            
            {/* 04: Residential Compounds */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="col-span-4 group bg-brand-cool-white/40 border border-brand-light-border rounded-sm p-5 hover:border-brand-primary/60 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="relative rounded-sm overflow-hidden aspect-[16/10] bg-brand-light border border-brand-light-border/80">
                  <img
                    src={sectorMetaMap.residential.url}
                    alt={sectorMetaMap.residential.alt[language]}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                    style={{ objectPosition: sectorMetaMap.residential.objectPosition }}
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-white/95 backdrop-blur-md rounded-xs border border-brand-light-border shadow-xs">
                    <span className="font-mono text-xs font-bold text-brand-navy">
                      {residential.number}
                    </span>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-brand-primary uppercase">
                      {residential.enTitle}
                    </span>
                    {sectorMetaMap.residential.icon}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-brand-slate group-hover:text-brand-primary transition-colors">
                    {residential.title}
                  </h3>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    {residential.desc}
                  </p>
                </div>
              </div>

              <div className="pt-3 mt-4 border-t border-brand-light-border/70 flex items-center justify-between text-xs">
                <span className="text-[11px] text-brand-slate font-medium truncate max-w-[180px]">
                  {sectorMetaMap.residential.tag[language]}
                </span>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1 font-bold text-brand-primary hover:text-brand-navy text-xs transition-colors shrink-0"
                >
                  <ArrowUpRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                </a>
              </div>
            </motion.article>

            {/* 05: Corporate Facilities */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="col-span-4 group bg-brand-cool-white/40 border border-brand-light-border rounded-sm p-5 hover:border-brand-primary/60 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="relative rounded-sm overflow-hidden aspect-[16/10] bg-brand-light border border-brand-light-border/80">
                  <img
                    src={sectorMetaMap.corporate.url}
                    alt={sectorMetaMap.corporate.alt[language]}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                    style={{ objectPosition: sectorMetaMap.corporate.objectPosition }}
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-white/95 backdrop-blur-md rounded-xs border border-brand-light-border shadow-xs">
                    <span className="font-mono text-xs font-bold text-brand-navy">
                      {corporate.number}
                    </span>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-brand-primary uppercase">
                      {corporate.enTitle}
                    </span>
                    {sectorMetaMap.corporate.icon}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-brand-slate group-hover:text-brand-primary transition-colors">
                    {corporate.title}
                  </h3>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    {corporate.desc}
                  </p>
                </div>
              </div>

              <div className="pt-3 mt-4 border-t border-brand-light-border/70 flex items-center justify-between text-xs">
                <span className="text-[11px] text-brand-slate font-medium truncate max-w-[180px]">
                  {sectorMetaMap.corporate.tag[language]}
                </span>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1 font-bold text-brand-primary hover:text-brand-navy text-xs transition-colors shrink-0"
                >
                  <ArrowUpRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                </a>
              </div>
            </motion.article>

            {/* 06: Events & Venues */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="col-span-4 group bg-brand-cool-white/40 border border-brand-light-border rounded-sm p-5 hover:border-brand-primary/60 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="relative rounded-sm overflow-hidden aspect-[16/10] bg-brand-light border border-brand-light-border/80">
                  <img
                    src={sectorMetaMap.events.url}
                    alt={sectorMetaMap.events.alt[language]}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                    style={{ objectPosition: sectorMetaMap.events.objectPosition }}
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-white/95 backdrop-blur-md rounded-xs border border-brand-light-border shadow-xs">
                    <span className="font-mono text-xs font-bold text-brand-navy">
                      {events.number}
                    </span>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-brand-primary uppercase">
                      {events.enTitle}
                    </span>
                    {sectorMetaMap.events.icon}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-brand-slate group-hover:text-brand-primary transition-colors">
                    {events.title}
                  </h3>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    {events.desc}
                  </p>
                </div>
              </div>

              <div className="pt-3 mt-4 border-t border-brand-light-border/70 flex items-center justify-between text-xs">
                <span className="text-[11px] text-brand-slate font-medium truncate max-w-[180px]">
                  {sectorMetaMap.events.tag[language]}
                </span>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1 font-bold text-brand-primary hover:text-brand-navy text-xs transition-colors shrink-0"
                >
                  <ArrowUpRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                </a>
              </div>
            </motion.article>

          </div>
        </div>

        {/* ============================================================== */}
        {/* DEDICATED MOBILE & TABLET LAYOUT (< 1024px): Curated Catalogue  */}
        {/* ============================================================== */}
        <div className="lg:hidden mt-8 space-y-6">
          
          {/* Touch-Friendly Horizontal Sector Selector Tabs */}
          <div className="flex overflow-x-auto no-scrollbar items-center gap-2 p-1.5 bg-brand-cool-white border border-brand-light-border rounded-sm">
            {sectorList.map((sec, idx) => {
              const isActive = activeMobileIndex === idx;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveMobileIndex(idx)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xs text-xs font-bold tracking-wide shrink-0 transition-all ${
                    isActive
                      ? 'bg-brand-navy text-white shadow-xs'
                      : 'text-brand-muted hover:text-brand-slate hover:bg-white'
                  }`}
                >
                  <span
                    className={`font-mono text-[11px] px-1 rounded-2xs ${
                      isActive ? 'bg-brand-sky text-brand-navy font-black' : 'bg-brand-light-border/50 text-brand-muted'
                    }`}
                  >
                    {sec.number}
                  </span>
                  <span>{sec.title.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Swipeable Feature Showcase Card */}
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="select-none"
          >
            <AnimatePresence mode="wait">
              <motion.article
                key={activeMobileSector.id}
                initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                transition={{ duration: 0.35 }}
                className="bg-brand-cool-white/50 border border-brand-light-border rounded-sm overflow-hidden p-4 sm:p-5 shadow-xs space-y-4"
              >
                {/* Large Responsive Photographic Hero Area */}
                <div className="relative rounded-xs overflow-hidden aspect-[16/10] bg-brand-light border border-brand-light-border/80">
                  <img
                    src={activeMobileMeta.url}
                    alt={activeMobileMeta.alt[language]}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: activeMobileMeta.objectPosition }}
                    loading="eager"
                  />
                  {/* Sector Number & Category Pill */}
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-xs border border-brand-light-border shadow-xs flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold text-brand-navy">
                      {activeMobileSector.number}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-brand-primary" />
                    <span className="text-[10px] font-mono tracking-wider text-brand-primary uppercase font-bold">
                      {activeMobileSector.enTitle}
                    </span>
                  </div>
                </div>

                {/* Narrative Details Cleanly Positioned Outside the Image */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-brand-slate">
                      {activeMobileSector.title}
                    </h3>
                    <div className="p-1.5 rounded-full bg-white border border-brand-light-border text-brand-primary">
                      {activeMobileMeta.icon}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                    {activeMobileSector.desc}
                  </p>

                  <div className="p-2.5 bg-white border border-brand-light-border rounded-xs text-xs text-brand-slate font-medium flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                    <span>{activeMobileMeta.tag[language]}</span>
                  </div>
                </div>

                {/* Footer Controls & Next/Prev Navigation */}
                <div className="pt-3 border-t border-brand-light-border flex items-center justify-between">
                  {/* Prev/Next Buttons (>= 44px touch target) */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={prevMobile}
                      className="w-10 h-10 rounded-xs bg-white border border-brand-light-border hover:bg-brand-primary hover:text-white flex items-center justify-center transition-colors text-brand-slate shadow-2xs"
                      aria-label="Previous sector"
                    >
                      <ChevronLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                    </button>
                    <button
                      onClick={nextMobile}
                      className="w-10 h-10 rounded-xs bg-white border border-brand-light-border hover:bg-brand-primary hover:text-white flex items-center justify-center transition-colors text-brand-slate shadow-2xs"
                      aria-label="Next sector"
                    >
                      <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                    </button>
                    <span className="font-mono text-xs font-bold text-brand-navy px-1.5">
                      0{activeMobileIndex + 1} / 0{sectorList.length}
                    </span>
                  </div>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-brand-primary hover:bg-brand-navy text-white text-xs font-bold rounded-xs tracking-wider uppercase transition-colors shadow-2xs"
                  >
                    <span>{language === 'ar' ? 'طلب عرض' : 'Request'}</span>
                    <ArrowUpRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                  </a>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          {/* Swipe Cue */}
          <div className="flex items-center justify-center gap-1 text-[11px] text-brand-muted font-medium pt-1">
            <span>{language === 'ar' ? 'اسحب للتنقل بين القطاعات' : 'Swipe left/right to browse sectors'}</span>
          </div>

        </div>

      </div>
    </section>
  );
};
