import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { IMAGES } from '../assets/images';
import { SectionHeading } from './ui/SectionHeading';
import { VideoModal } from './ui/VideoModal';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car,
  KeyRound,
  Sparkles,
  QrCode,
  ShieldCheck,
  Zap,
  Play,
  Tv,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';

export const ServicesShowcase: React.FC = () => {
  const { t, isRTL, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [showInlineVideo, setShowInlineVideo] = useState(false);
  const [parkingViewMode, setParkingViewMode] = useState<'photo' | 'diagram'>('photo');

  const services = t.services.list;
  const valetData = services.find((s) => s.id === 'valet')!;
  const parkingData = services.find((s) => s.id === 'parking')!;
  const carwashData = services.find((s) => s.id === 'carwash')!;
  const buggyData = services.find((s) => s.id === 'buggy')!;
  const trafficData = services.find((s) => s.id === 'traffic')!;

  const valetYoutubeId = 'S99i_MI8wPI';
  const valetVideoEmbedUrl = `https://www.youtube-nocookie.com/embed/${valetYoutubeId}`;

  const serviceTabs = [
    { id: 'valet', index: 0, number: '01', label: valetData.title, shortLabel: language === 'ar' ? 'صف واستقبال' : 'Valet', enLabel: 'Valet Parking' },
    { id: 'parking', index: 1, number: '02', label: parkingData.title, shortLabel: language === 'ar' ? 'إدارة المواقف' : 'Parking', enLabel: 'Parking Management' },
    { id: 'carwash', index: 2, number: '03', label: carwashData.title, shortLabel: language === 'ar' ? 'غسيل وعناية' : 'Car Care', enLabel: 'Vehicle Care' },
    { id: 'buggy', index: 3, number: '04', label: buggyData.title, shortLabel: language === 'ar' ? 'عربات باجي' : 'Buggy', enLabel: 'Buggy Transit' },
    { id: 'traffic', index: 4, number: '05', label: trafficData.title, shortLabel: language === 'ar' ? 'تنظيم المرور' : 'Traffic', enLabel: 'Traffic Flow' }
  ];

  // Sync hash with active tab if linked from footer or external
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      const foundIdx = serviceTabs.findIndex((t) => t.id === hash);
      if (foundIdx !== -1) {
        setActiveTab(foundIdx);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const nextTab = () => {
    setActiveTab((prev) => (prev + 1) % serviceTabs.length);
  };

  const prevTab = () => {
    setActiveTab((prev) => (prev - 1 + serviceTabs.length) % serviceTabs.length);
  };

  return (
    <section id="services" className="py-20 sm:py-24 md:py-32 bg-brand-light text-brand-slate relative overflow-hidden border-b border-brand-light-border">
      {/* Video Lightbox Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={valetVideoEmbedUrl}
        title={
          language === 'ar'
            ? 'فيديو توضيحي: خدمة صف واستقبال السيارات الميدانية (Valet Parking)'
            : 'Operational Showcase: Professional Valet Parking Operations'
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <SectionHeading
          tag={t.services.tag}
          eyebrow={t.services.eyebrow}
          titlePart1={t.services.titlePart1}
          titlePart2={t.services.titlePart2}
          lead={t.services.lead}
        />

        {/* ============================================================== */}
        {/* Modular Segmented Service Selector Tabs — Fluid Pill Style      */}
        {/* ============================================================== */}
        <div className="mt-10 sm:mt-12">
          {/* Scrollable Fluid Pill Tab Bar */}
          <div className="flex overflow-x-auto no-scrollbar items-center gap-2 p-1.5 bg-brand-cool-white border border-brand-light-border/80 rounded-full shadow-2xs">
            {serviceTabs.map((tab) => {
              const isActive = activeTab === tab.index;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.index)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold tracking-wide shrink-0 transition-all focus:outline-none ${
                    isActive
                      ? 'bg-brand-primary text-white shadow-md'
                      : 'text-brand-muted hover:text-brand-slate hover:bg-white'
                  }`}
                >
                  <span
                    className={`font-mono text-xs px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-white text-brand-primary font-black' : 'bg-brand-light text-brand-muted'
                    }`}
                  >
                    {tab.number}
                  </span>
                  <span className="hidden md:inline">{tab.label}</span>
                  <span className="md:hidden">{tab.shortLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Tab Indicators */}
          <div className="flex items-center justify-between text-xs text-brand-muted pt-3 px-2">
            <span className="font-mono text-[11px] font-bold tracking-wider text-brand-primary uppercase">
              {serviceTabs[activeTab].enLabel}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={prevTab}
                className="w-8 h-8 rounded-full bg-white border border-brand-light-border hover:bg-brand-primary hover:text-white flex items-center justify-center text-brand-muted transition-colors shadow-2xs"
                aria-label="Previous service"
              >
                <ChevronLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </button>
              <span className="font-mono text-xs font-bold text-brand-slate">
                0{activeTab + 1} / 0{serviceTabs.length}
              </span>
              <button
                onClick={nextTab}
                className="w-8 h-8 rounded-full bg-white border border-brand-light-border hover:bg-brand-primary hover:text-white flex items-center justify-center text-brand-muted transition-colors shadow-2xs"
                aria-label="Next service"
              >
                <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* Dynamic Service Showcase Card                                   */}
        {/* ============================================================== */}
        <div className="mt-6 sm:mt-8">
          <AnimatePresence mode="wait">
            {/* 01: VALET PARKING */}
            {activeTab === 0 && (
              <motion.article
                key="valet"
                id="valet"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="relative bg-white border border-brand-light-border/70 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Left Column: Text & Capabilities (5 cols) */}
                  <div className="lg:col-span-5 space-y-5">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold tracking-widest text-white px-3 py-1 bg-brand-primary rounded-full">
                        {valetData.number}
                      </span>
                      <span className="text-xs font-bold tracking-wider text-brand-muted uppercase">
                        {valetData.enLabel}
                      </span>
                    </div>

                    <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-slate leading-tight">
                      {valetData.title}
                    </h3>

                    <p className="text-sm sm:text-base text-brand-primary font-semibold">
                      {valetData.subtitle}
                    </p>

                    <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                      {valetData.description}
                    </p>

                    {/* Operational Highlights */}
                    <div className="space-y-2.5 pt-3 border-t border-brand-light-border/70">
                      {valetData.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <KeyRound className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-brand-slate font-medium leading-relaxed">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Video Action Button */}
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => setIsVideoModalOpen(true)}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand-navy hover:bg-brand-primary text-white text-xs font-bold tracking-wider uppercase transition-all shadow-sm group"
                      >
                        <Play className="w-3.5 h-3.5 fill-current text-brand-sky group-hover:text-white transition-colors" />
                        <span>
                          {language === 'ar'
                            ? 'مشاهدة فيديو خدمة الفاليه (YouTube) ↗'
                            : 'Watch Valet Operations Video ↗'}
                        </span>
                      </button>

                      <a
                        href="#contact"
                        className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-white hover:bg-brand-light text-brand-slate border border-brand-light-border text-xs font-bold transition-colors"
                      >
                        <span>{language === 'ar' ? 'طلب عرض تشغيلي' : 'Request Proposal'}</span>
                        <ArrowUpRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Visual Composition (7 cols) */}
                  <div className="lg:col-span-7 relative">
                    {showInlineVideo ? (
                      <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[16/10] bg-black border border-brand-light-border">
                        <iframe
                          src={`${valetVideoEmbedUrl}?autoplay=1&rel=0`}
                          title="Valet Parking Video"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full border-0"
                        />
                        <button
                          onClick={() => setShowInlineVideo(false)}
                          className="absolute top-3 right-3 px-3 py-1 bg-white/95 text-brand-slate text-[11px] font-bold rounded-full shadow-sm"
                        >
                          {language === 'ar' ? 'إغلاق الفيديو' : 'Close Video'}
                        </button>
                      </div>
                    ) : (
                      <div className="relative rounded-2xl overflow-hidden shadow-md aspect-[16/10] group bg-brand-light border border-brand-light-border/80">
                        <img
                          src={IMAGES.services.valet.hero.url}
                          alt={IMAGES.services.valet.hero.alt[language]}
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                          style={{ objectPosition: 'center 45%' }}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark/75 via-transparent to-transparent" />

                        {/* Centered Play Button Overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                          <motion.button
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsVideoModalOpen(true)}
                            className="group/btn relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white text-brand-primary shadow-2xl transition-all"
                            aria-label="Play Valet Video"
                          >
                            <span className="absolute inset-0 rounded-full bg-brand-sky/40 animate-ping" />
                            <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-0.5 text-brand-primary" />
                          </motion.button>
                          <button
                            onClick={() => setShowInlineVideo(true)}
                            className="mt-2.5 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-brand-slate hover:text-brand-primary text-[11px] font-bold tracking-wide shadow-sm"
                          >
                            <Tv className="w-3.5 h-3.5 text-brand-primary" />
                            <span>{language === 'ar' ? 'تشغيل داخل الصفحة' : 'Play Inline'}</span>
                          </button>
                        </div>

                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                          <span className="font-mono text-brand-sky text-[10px] tracking-wider uppercase font-bold">
                            HOSPITALITY PROTOCOL
                          </span>
                          <span className="text-white/90 text-[11px] font-medium">
                            {language === 'ar' ? 'فيديو توضيحي لخدمة صف واستقبال السيارات' : 'Operational Valet Demonstration'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            )}

            {/* 02: PARKING MANAGEMENT */}
            {activeTab === 1 && (
              <motion.article
                key="parking"
                id="parking"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="relative bg-white text-brand-slate rounded-3xl p-6 sm:p-10 lg:p-12 border border-brand-light-border/80 shadow-sm"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Left Column: Text & Specs (5 cols) */}
                  <div className="lg:col-span-5 space-y-5">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold tracking-widest text-white px-3 py-1 bg-brand-primary rounded-full">
                        {parkingData.number}
                      </span>
                      <span className="text-xs font-bold tracking-wider text-brand-muted uppercase">
                        {parkingData.enLabel}
                      </span>
                    </div>

                    <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-slate leading-tight">
                      {parkingData.title}
                    </h3>

                    <p className="text-sm sm:text-base text-brand-primary font-semibold">
                      {parkingData.subtitle}
                    </p>

                    <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                      {parkingData.description}
                    </p>

                    {parkingData.note && (
                      <div className="p-3 bg-brand-light border border-brand-light-border/80 rounded-2xl flex items-start gap-2.5 shadow-2xs">
                        <QrCode className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                        <p className="text-xs text-brand-slate leading-relaxed font-medium">
                          {parkingData.note}
                        </p>
                      </div>
                    )}

                    <div className="space-y-2.5 pt-3 border-t border-brand-light-border">
                      {parkingData.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <Car className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-brand-slate font-medium leading-relaxed">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2">
                      <a
                        href="#system-architecture"
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand-primary hover:bg-brand-navy-dark text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md hover:-translate-y-0.5"
                      >
                        <span>{language === 'ar' ? 'استعراض شرح النظام الذكي بالتفصيل ↗' : 'Explore Full Architecture ↗'}</span>
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Visual Composition with Photo / Diagram Toggle (7 cols) */}
                  <div className="lg:col-span-7 relative">
                    <div className="flex items-center gap-2 mb-3 bg-brand-cool-white p-1 rounded-full border border-brand-light-border/80 w-fit">
                      <button
                        onClick={() => setParkingViewMode('photo')}
                        className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${
                          parkingViewMode === 'photo'
                            ? 'bg-brand-primary text-white shadow-xs'
                            : 'text-brand-slate hover:text-brand-primary'
                        }`}
                      >
                        {language === 'ar' ? 'صورة المنشأة الواقعية' : 'Facility Photo'}
                      </button>
                      <button
                        onClick={() => setParkingViewMode('diagram')}
                        className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${
                          parkingViewMode === 'diagram'
                            ? 'bg-brand-primary text-white shadow-xs'
                            : 'text-brand-slate hover:text-brand-primary'
                        }`}
                      >
                        {language === 'ar' ? 'مخطط تدفق النظام الذكي ⚡' : 'System Flow Diagram ⚡'}
                      </button>
                    </div>

                    {parkingViewMode === 'diagram' ? (
                      <div className="relative rounded-2xl overflow-hidden shadow-md aspect-[16/10] bg-white border border-brand-light-border/80 p-2">
                        <img
                          src="/images/system/parking-workflow-diagram.jpg"
                          alt="Parking workflow diagram"
                          className="w-full h-full object-contain"
                        />
                        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between bg-brand-navy-dark/90 text-white px-3 py-1.5 text-[10px] rounded-full backdrop-blur-sm">
                          <span className="font-bold text-brand-sky">
                            {language === 'ar' ? 'مخطط الدخول والخروج والتحقق الآلي LPR' : 'Automated Ingress/Egress LPR Flow'}
                          </span>
                          <a href="#system-architecture" className="text-brand-sky hover:underline font-bold">
                            {language === 'ar' ? 'تفاصيل المخططات كاملة ↓' : 'Full Architecture ↓'}
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="relative rounded-2xl overflow-hidden shadow-md aspect-[16/10] group border border-brand-light-border/80 bg-white">
                        <img
                          src={IMAGES.services.parking.hero.url}
                          alt={IMAGES.services.parking.hero.alt[language]}
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                          style={{ objectPosition: 'center 45%' }}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark/75 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                          <span className="font-mono text-brand-sky text-[10px] tracking-wider uppercase font-bold">
                            ORGANIZED FACILITY
                          </span>
                          <span className="text-white/90 text-[11px] font-medium">
                            {language === 'ar' ? 'انسيابية مستمرة وتقليل زمن الانتظار' : 'Minimized Dwell & Queue Time'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            )}

            {/* 03: CAR WASHING & CARE */}
            {activeTab === 2 && (
              <motion.article
                key="carwash"
                id="carwash"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="relative bg-white border border-brand-light-border/80 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Left Column: Text & Capabilities (5 cols) */}
                  <div className="lg:col-span-5 space-y-5">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold tracking-widest text-white px-3 py-1 bg-brand-primary rounded-full">
                        {carwashData.number}
                      </span>
                      <span className="text-xs font-bold tracking-wider text-brand-muted uppercase">
                        {carwashData.enLabel}
                      </span>
                    </div>

                    <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-slate leading-tight">
                      {carwashData.title}
                    </h3>

                    <p className="text-sm sm:text-base text-brand-primary font-semibold">
                      {carwashData.subtitle}
                    </p>

                    <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                      {carwashData.description}
                    </p>

                    {/* 4 Detail Checklist Items */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 border-t border-brand-light-border">
                      {carwashData.highlights.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 bg-brand-light/60 border border-brand-light-border/80 rounded-2xl flex items-start gap-2"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-brand-primary shrink-0 mt-0.5" />
                          <span className="text-xs text-brand-slate font-medium leading-snug">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2">
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand-primary hover:bg-brand-navy-dark text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md hover:-translate-y-0.5"
                      >
                        <span>{language === 'ar' ? 'طلب باقة عناية للمنشأة' : 'Inquire Vehicle Care Scope'}</span>
                        <ArrowUpRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Dual Photography (7 cols) */}
                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative rounded-2xl overflow-hidden shadow-md aspect-[4/3] sm:aspect-[3/4] group bg-brand-light border border-brand-light-border/80">
                      <img
                        src={IMAGES.services.carwash.hero.url}
                        alt={IMAGES.services.carwash.hero.alt[language]}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                        style={{ objectPosition: 'center 40%' }}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark/75 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 text-white text-xs">
                        <span className="font-mono text-brand-sky text-[10px] block font-bold">01 / EXTERIOR CARE</span>
                        <span className="font-medium text-[11px]">
                          {language === 'ar' ? 'غسيل وتلميع الهيكل الخارجي' : 'Exterior Washing Process'}
                        </span>
                      </div>
                    </div>

                    <div className="relative rounded-2xl overflow-hidden shadow-md aspect-[4/3] sm:aspect-[3/4] group bg-brand-light border border-brand-light-border/80">
                      <img
                        src={IMAGES.services.carwash.interior.url}
                        alt={IMAGES.services.carwash.interior.alt[language]}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                        style={{ objectPosition: 'center 50%' }}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark/75 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 text-white text-xs">
                        <span className="font-mono text-brand-sky text-[10px] block font-bold">02 / CABIN DETAILING</span>
                        <span className="font-medium text-[11px]">
                          {language === 'ar' ? 'تنظيف المقصورة والمقاعد' : 'Interior Cabin Detailing'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            )}

            {/* 04: BUGGY MOBILITY SERVICES */}
            {activeTab === 3 && (
              <motion.article
                key="buggy"
                id="buggy"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-3xl overflow-hidden bg-brand-navy text-white border border-brand-navy-dark shadow-xl p-6 sm:p-10 lg:p-12"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Left Column: Text & Specs (5 cols) */}
                  <div className="lg:col-span-5 space-y-5">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold tracking-widest text-brand-navy px-3 py-1 bg-brand-sky rounded-full">
                        {buggyData.number}
                      </span>
                      <span className="text-xs font-bold tracking-wider text-brand-sky uppercase">
                        {buggyData.enLabel}
                      </span>
                    </div>

                    <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                      {buggyData.title}
                    </h3>

                    <p className="text-sm sm:text-base text-brand-sky font-semibold">
                      {buggyData.subtitle}
                    </p>

                    <p className="text-xs sm:text-sm text-brand-sky-pale leading-relaxed">
                      {buggyData.description}
                    </p>

                    <div className="space-y-2.5 pt-3 border-t border-white/20">
                      {buggyData.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <Zap className="w-4 h-4 text-brand-sky shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-white font-medium leading-relaxed">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2">
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand-primary hover:bg-brand-sky text-white hover:text-brand-navy-dark text-xs font-bold tracking-wider uppercase transition-all shadow-md hover:-translate-y-0.5"
                      >
                        <span>{language === 'ar' ? 'طلب أسطول باجي للمنشأة' : 'Request Buggy Fleet Proposal'}</span>
                        <ArrowUpRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Visual Composition (7 cols) */}
                  <div className="lg:col-span-7 relative">
                    <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[16/10] group bg-brand-navy-dark border border-white/20">
                      <img
                        src={IMAGES.services.buggy.hero.url}
                        alt={IMAGES.services.buggy.hero.alt[language]}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                        style={{ objectPosition: 'center 40%' }}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark/80 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                        <span className="font-mono text-brand-sky text-[10px] tracking-wider uppercase font-bold">
                          ELECTRIC GUEST TRANSIT
                        </span>
                        <span className="text-white/90 text-[11px] font-medium">
                          {language === 'ar' ? 'عربات باجي كهربائية حديثة' : 'Electric Resort Shuttle'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            )}

            {/* 05: TRAFFIC MANAGEMENT */}
            {activeTab === 4 && (
              <motion.article
                key="traffic"
                id="traffic"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="relative bg-white text-brand-slate border border-brand-light-border/80 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Left Column: Text & Capabilities (5 cols) */}
                  <div className="lg:col-span-5 space-y-5">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold tracking-widest text-white px-3 py-1 bg-brand-primary rounded-full">
                        {trafficData.number}
                      </span>
                      <span className="text-xs font-bold tracking-wider text-brand-muted uppercase">
                        {trafficData.enLabel}
                      </span>
                    </div>

                    <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-slate leading-tight">
                      {trafficData.title}
                    </h3>

                    <p className="text-sm sm:text-base text-brand-primary font-semibold">
                      {trafficData.subtitle}
                    </p>

                    <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                      {trafficData.description}
                    </p>

                    <div className="space-y-2.5 pt-3 border-t border-brand-light-border">
                      {trafficData.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <ShieldCheck className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-brand-slate font-medium leading-relaxed">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2">
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand-primary hover:bg-brand-navy-dark text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md hover:-translate-y-0.5"
                      >
                        <span>{language === 'ar' ? 'طلب خطة تنظيم مروري للمنشأة' : 'Request Traffic Flow Plan'}</span>
                        <ArrowUpRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Visual Composition (7 cols) */}
                  <div className="lg:col-span-7 relative">
                    <div className="relative rounded-2xl overflow-hidden shadow-md aspect-[16/10] group bg-white border border-brand-light-border/80">
                      <img
                        src={IMAGES.services.traffic.hero.url}
                        alt={IMAGES.services.traffic.hero.alt[language]}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                        style={{ objectPosition: 'center 45%' }}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark/75 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                        <span className="font-mono text-brand-sky text-[10px] tracking-wider uppercase font-bold">
                          TRAFFIC COORDINATION
                        </span>
                        <span className="text-white/90 text-[11px] font-medium">
                          {language === 'ar' ? 'توجيه مروري وانسيابية المداخل' : 'Entrance Queue Prevention'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
