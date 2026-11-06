import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { IMAGES } from '../assets/images';
import { VideoModal } from './ui/VideoModal';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ShieldCheck,
  Play,
  Pause,
  Sparkles,
  Maximize2,
  X,
  Layers,
  CheckCircle2
} from 'lucide-react';

interface SlideData {
  id: string;
  number: string;
  serviceKey: string;
  badge: { ar: string; en: string };
  headline: { ar: string; en: string };
  description: { ar: string; en: string };
  image: string;
  alt: { ar: string; en: string };
  objectPosition: string;
  highlightTag: { ar: string; en: string };
}

export const Hero: React.FC = () => {
  const { t, isRTL, language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [heroDiagramTab, setHeroDiagramTab] = useState(0);
  const [isDiagramModalOpen, setIsDiagramModalOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const valetYoutubeUrl = 'https://www.youtube-nocookie.com/embed/S99i_MI8wPI';

  // 3 Smart system preview modules for the fluid desktop showcase
  const heroSystemPreviews = [
    {
      id: 'gates',
      tabLabel: { ar: 'بوابات LPR', en: 'LPR Gates' },
      badge: 'LPR + BOOM BARRIER',
      title: {
        ar: 'نظام البوابات الذكية وقراءة اللوحات الآلية',
        en: 'Smart Ingress Gates & High-Speed ANPR'
      },
      image: '/images/system/gate-system-isometric.jpg',
      alt: {
        ar: 'رسم ثلاثي الأبعاد لنظام بوابات الدخول والخروج',
        en: 'Isometric 3D diagram of smart entrance/exit gate system'
      },
      note: {
        ar: 'كاميرات لوحات ذكية + بوابات هيدروليكية سريعة + أكشاك دفع وتذاكر',
        en: 'High-speed ANPR cameras, boom barriers, and self-pay ticket kiosks'
      }
    },
    {
      id: 'workflow',
      tabLabel: { ar: 'تدفق الحركة', en: 'Vehicle Flow' },
      badge: 'END-TO-END FLOW',
      title: {
        ar: 'دورة حركة المركبة من الوصول حتى المغادرة',
        en: 'Step-by-Step Vehicle Ingress & Egress'
      },
      image: '/images/system/parking-workflow-diagram.jpg',
      alt: {
        ar: 'مخطط خطوات دخول وصف وخروج السيارات',
        en: 'Sequential workflow diagram of car arrival, parking, and departure'
      },
      note: {
        ar: 'وصول ← قراءة اللوحة ← فتح البوابة ← الإرشاد ← الدفع الرقمي ← خروج سلس',
        en: 'Arrive → Scan plate → Open barrier → Park → Pay → Verified exit'
      }
    },
    {
      id: 'guidance',
      tabLabel: { ar: 'توجيه B1', en: 'B1 Guidance' },
      badge: 'SENSORS & EV',
      title: {
        ar: 'أنظمة التوجيه وحساسات المواقف وشواحن EV',
        en: 'Smart Space Guidance, Sensors & EV Bays'
      },
      image: '/images/system/smart-facility-guidance.jpg',
      alt: {
        ar: 'مخطط التوجيه الداخلي وحساسات المواقف',
        en: 'Isometric layout of smart guidance and EV charging bays'
      },
      note: {
        ar: 'كاميرات رصد الأماكن الشاغرة + شاشات إلكترونية + تنظيم مواقف شحن EV',
        en: 'Overhead bay cameras, guidance screens, and dedicated EV bays'
      }
    }
  ];

  // 3 High-resolution photographic slides
  const slides: SlideData[] = [
    {
      id: 'parking',
      number: '01',
      serviceKey: 'parking',
      badge: {
        ar: 'إدارة وتوجيه المواقف · تدفق ذكي',
        en: 'Facility Traffic & Flow · Smart Parking'
      },
      headline: {
        ar: 'إدارة مواقف أكثر ذكاءً',
        en: 'Smarter Parking Management'
      },
      description: {
        ar: 'حلول تشغيل وتنظيم للمواقف تساعد على تحسين الحركة وتجربة الزوار مع بوابات LPR الذكية.',
        en: 'Operational and organization solutions that streamline vehicular flow and improve visitor experience with smart LPR gates.'
      },
      image: IMAGES.hero.slide2.url,
      alt: IMAGES.hero.slide2.alt,
      objectPosition: 'center 45%',
      highlightTag: {
        ar: 'بوابات ذكية وقراءة فورية للوحات LPR',
        en: 'LPR Barrier Gates & Smart Ingress'
      }
    },
    {
      id: 'valet',
      number: '02',
      serviceKey: 'valet',
      badge: {
        ar: 'خدمات الاستقبال الفاخرة · صف السيارات',
        en: 'Front-of-House Hospitality · Valet Parking'
      },
      headline: {
        ar: 'تشغيل يرتقي بالتجربة',
        en: 'Operations Beyond Expectations'
      },
      description: {
        ar: 'خدمات استقبال وإدارة السيارات باحترافية، تمنح زوار منشأتك تجربة أكثر سهولة وتنظيماً.',
        en: "Professional vehicle reception and management services that give your property's visitors an effortless, organized experience."
      },
      image: IMAGES.hero.slide1.url,
      alt: IMAGES.hero.slide1.alt,
      objectPosition: 'center 40%',
      highlightTag: {
        ar: 'فريق مدرّب واستقبال فندقي راقٍ',
        en: 'Briefed Team & Hospitality Courtesy'
      }
    },
    {
      id: 'integrated',
      number: '03',
      serviceKey: 'integrated',
      badge: {
        ar: 'حلول تشغيلية شاملة · باجي وتنقل',
        en: 'Campus Transit & Traffic Coordination'
      },
      headline: {
        ar: 'خدمات متكاملة لمنشأتك',
        en: 'Integrated Services for Your Property'
      },
      description: {
        ar: 'من خدمات الـ Valet إلى تنظيم الحركة والتنقل الداخلي بعربات الباجي الكهربائية.',
        en: 'From front-of-house valet to campus mobility and synchronized traffic organization.'
      },
      image: IMAGES.hero.slide3.url,
      alt: IMAGES.hero.slide3.alt,
      objectPosition: 'center 40%',
      highlightTag: {
        ar: 'عربات باجي كهربائية وتنظيم مروري',
        en: 'Electric Buggy Mobility & Traffic Flow'
      }
    }
  ];

  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Autoplay with 6s interval
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [isPlaying, nextSlide]);

  // Mobile touch gestures
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
        if (isRTL) prevSlide();
        else nextSlide();
      } else {
        if (isRTL) nextSlide();
        else prevSlide();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const activeSlide = slides[currentSlide];

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-brand-slate text-white select-none"
    >
      {/* Valet YouTube Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={valetYoutubeUrl}
        title={
          language === 'ar'
            ? 'فيديو توضيحي: تجربة الفاليه الاحترافية · PVC SMART SERVICES'
            : 'Valet Parking Operations in Action · PVC SMART SERVICES'
        }
      />

      {/* Smart System 3D Diagram Full-Screen Lightbox */}
      <AnimatePresence>
        {isDiagramModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl w-full bg-slate-900 border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-slate-950/70">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-brand-primary text-white text-xs font-bold font-mono">
                    {heroSystemPreviews[heroDiagramTab].badge}
                  </span>
                  <h3 className="font-heading font-bold text-sm sm:text-base text-white">
                    {heroSystemPreviews[heroDiagramTab].title[language]}
                  </h3>
                </div>
                <button
                  onClick={() => setIsDiagramModalOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Image */}
              <div className="p-3 sm:p-6 overflow-auto flex-1 flex items-center justify-center bg-slate-950">
                <img
                  src={heroSystemPreviews[heroDiagramTab].image}
                  alt={heroSystemPreviews[heroDiagramTab].alt[language]}
                  className="max-h-[62vh] w-auto max-w-full object-contain rounded-2xl"
                />
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-5 border-t border-white/10 bg-slate-900/90 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs sm:text-sm text-brand-sky-pale text-center sm:text-start">
                  {heroSystemPreviews[heroDiagramTab].note[language]}
                </p>
                <button
                  onClick={() => {
                    setIsDiagramModalOpen(false);
                    handleScrollTo('system-architecture');
                  }}
                  className="px-5 py-2.5 rounded-full bg-brand-primary hover:bg-brand-navy-dark text-white text-xs font-bold transition-all shadow-md shrink-0"
                >
                  {language === 'ar' ? 'عرض الشرح التفصيلي الكامل ↓' : 'Explore Full Explainer Section ↓'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================== */}
      {/* Background Full-Width Photographic Slides                       */}
      {/* ============================================================== */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={activeSlide.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-0"
        >
          <img
            src={activeSlide.image}
            alt={activeSlide.alt[language]}
            className="w-full h-full object-cover"
            style={{ objectPosition: activeSlide.objectPosition }}
            loading={currentSlide === 0 ? 'eager' : 'lazy'}
          />

          {/* Gentle, Localized Directional Scrim */}
          <div
            className={`absolute inset-0 pointer-events-none ${
              isRTL
                ? 'bg-gradient-to-l from-slate-950/90 via-slate-950/40 to-transparent'
                : 'bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent'
            }`}
          />
          {/* Subtle bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/80 to-transparent pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* ============================================================== */}
      {/* Main Content Layer: Modern Fluid Architecture                   */}
      {/* ============================================================== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 md:py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Column: Headline & Primary Fluid Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">
            
            {/* Top Partner Eyebrow Pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-navy-dark/70 border border-brand-sky/35 text-brand-sky text-[11px] sm:text-xs font-bold tracking-wider uppercase backdrop-blur-md shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-sky" />
              <span>{language === 'ar' ? 'شريككم الموثوق في التشغيل والخدمات' : 'YOUR PARTNER IN OPERATIONS & SERVICES'}</span>
            </motion.div>

            {/* Dynamic Large Headline in Alexandria Font */}
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={`headline-${activeSlide.id}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="font-heading text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.2] text-white drop-shadow-lg"
                >
                  {activeSlide.headline[language]}
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Slide Description in IBM Plex Sans Arabic */}
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`desc-${activeSlide.id}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, delay: 0.08 }}
                  className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-2xl font-normal drop-shadow-md"
                >
                  {activeSlide.description[language]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Calls to Action: Modern Fluid Pill System */}
            <div className="space-y-4 pt-1">
              {/* Primary & Secondary Pill Pair */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                {/* Primary CTA: Pill Shape (#1769AA) */}
                <button
                  onClick={() => handleScrollTo('contact')}
                  className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 bg-brand-primary hover:bg-brand-navy-dark text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 rounded-full shadow-xl hover:shadow-brand-primary/40 hover:-translate-y-0.5 active:translate-y-0 min-h-[48px]"
                >
                  <span>{t.hero.ctaPrimary}</span>
                  <ArrowUpRight
                    className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                      isRTL ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Secondary CTA: Fluid Subtle Pill */}
                <button
                  onClick={() => handleScrollTo('services')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:py-4 bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md text-white hover:text-brand-sky text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 rounded-full shadow-md hover:-translate-y-0.5 min-h-[48px]"
                >
                  <span>{t.hero.ctaSecondary}</span>
                  <span className="text-brand-sky">↓</span>
                </button>
              </div>

              {/* Mobile Quick Link to 3D Explainer & Video Link */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                {/* Video CTA: Sleek Editorial Link */}
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="group/vid inline-flex items-center gap-2 text-xs sm:text-sm text-brand-sky hover:text-white font-semibold transition-colors focus:outline-none"
                >
                  <span className="w-7 h-7 rounded-full bg-white/15 group-hover/vid:bg-brand-primary border border-brand-sky/40 flex items-center justify-center transition-all shadow-sm">
                    <Play className="w-3 h-3 fill-current text-brand-sky group-hover/vid:text-white ml-0.5 transition-colors" />
                  </span>
                  <span className="underline-offset-4 group-hover/vid:underline">
                    {language === 'ar' ? 'فيديو الفعالية الميداني ↗' : 'Field Operations Video ↗'}
                  </span>
                </button>

                {/* Mobile-Visible Explainer Pill */}
                <button
                  onClick={() => handleScrollTo('system-architecture')}
                  className="lg:hidden inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-sky/20 border border-brand-sky/40 text-brand-sky hover:text-white text-xs font-bold transition-all"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'مخطط النظام الذكي 3D ↓' : '3D System Diagram ↓'}</span>
                </button>
              </div>
            </div>

            {/* Trust Line: Clean Inline Icons */}
            <div className="pt-3 border-t border-white/20 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-brand-sky-pale font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-sky" />
                <span>{language === 'ar' ? 'فريق مصري مدرّب وموثوق ميدانياً' : 'Trained Egyptian Field Team'}</span>
              </div>
              <span className="hidden sm:inline text-white/30">•</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-sky" />
                <span>{activeSlide.highlightTag[language]}</span>
              </div>
            </div>

            {/* Carousel Controls: Circular Buttons + Pagination Pills */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-2 bg-brand-navy-dark/60 p-1.5 sm:p-2 rounded-full border border-white/20 backdrop-blur-md shadow-xl">
                {/* Circular Prev Button */}
                <button
                  onClick={prevSlide}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-brand-primary text-white border border-white/20 flex items-center justify-center transition-all duration-300 focus:outline-none active:scale-95 shadow-sm"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </button>

                {/* Minimalist Pagination Pill Dots */}
                <div className="flex items-center gap-1.5 px-2">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                        currentSlide === idx ? 'w-6 bg-brand-sky' : 'w-2 bg-white/30 hover:bg-white/60'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Circular Next Button */}
                <button
                  onClick={nextSlide}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-brand-primary text-white border border-white/20 flex items-center justify-center transition-all duration-300 focus:outline-none active:scale-95 shadow-sm"
                  aria-label="Next slide"
                >
                  <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </button>

                {/* Pause/Play Toggle */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-7 h-7 rounded-full text-brand-sky-pale hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors focus:outline-none"
                  title={isPlaying ? 'Pause Autoplay' : 'Resume Autoplay'}
                  aria-label="Toggle autoplay"
                >
                  {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                </button>
              </div>

              <span className="font-mono text-xs text-brand-sky font-bold tracking-widest hidden sm:inline">
                {activeSlide.number} / 0{totalSlides}
              </span>
            </div>

          </div>

          {/* Column: Fluid Modern 3D Smart System Showcase (5 cols on Desktop) */}
          <div className="hidden lg:flex lg:col-span-5 flex-col items-end">
            <div className="w-full max-w-md bg-brand-navy-dark/80 backdrop-blur-xl border border-white/20 rounded-3xl p-4 sm:p-5 shadow-2xl text-white relative">
              {/* Header */}
              <div className="flex items-center justify-between mb-3 text-xs">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary/40 border border-brand-sky/30 text-brand-sky font-bold text-[11px]">
                  <Layers className="w-3 h-3 text-brand-sky" />
                  <span>{language === 'ar' ? 'معاينة النظام الذكي ثلاثي الأبعاد' : '3D Smart System Preview'}</span>
                </div>
                <span className="text-[10px] text-brand-sky-pale font-mono tracking-wider">LPR + SENSORS</span>
              </div>

              {/* Interactive Preview Frame */}
              <div
                onClick={() => setIsDiagramModalOpen(true)}
                className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-950/80 border border-white/15 cursor-pointer group shadow-inner"
              >
                <img
                  src={heroSystemPreviews[heroDiagramTab].image}
                  alt={heroSystemPreviews[heroDiagramTab].title[language]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent opacity-85 group-hover:opacity-60 transition-opacity" />
                
                {/* Floating Badges */}
                <div className="absolute top-2.5 right-2.5 left-2.5 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] font-bold text-brand-sky border border-white/15">
                    {heroSystemPreviews[heroDiagramTab].badge}
                  </span>
                  <span className="w-7 h-7 rounded-full bg-white/20 group-hover:bg-brand-primary border border-white/30 flex items-center justify-center transition-colors shadow-sm">
                    <Maximize2 className="w-3.5 h-3.5 text-white" />
                  </span>
                </div>

                <div className="absolute bottom-2.5 right-2.5 left-2.5">
                  <p className="text-xs font-bold text-white drop-shadow-md">
                    {heroSystemPreviews[heroDiagramTab].title[language]}
                  </p>
                  <p className="text-[10px] text-brand-sky-pale line-clamp-1 mt-0.5">
                    {language === 'ar' ? 'انقر لتكبير المخطط والشرح التفصيلي ↗' : 'Click to inspect full architecture ↗'}
                  </p>
                </div>
              </div>

              {/* Fluid Pill Tabs for the 3 Diagrams */}
              <div className="grid grid-cols-3 gap-1.5 mt-3 p-1 rounded-full bg-white/5 border border-white/10">
                {heroSystemPreviews.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setHeroDiagramTab(idx)}
                    className={`py-1.5 px-2 rounded-full text-[10px] font-bold transition-all truncate text-center ${
                      heroDiagramTab === idx
                        ? 'bg-brand-primary text-white shadow-sm'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.tabLabel[language]}
                  </button>
                ))}
              </div>

              {/* Deep Dive Action */}
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
                <button
                  onClick={() => handleScrollTo('system-architecture')}
                  className="inline-flex items-center gap-1.5 text-brand-sky hover:text-white font-semibold transition-colors focus:outline-none"
                >
                  <span>{language === 'ar' ? 'شرح المنظومة بالكامل (3 مخططات) ↓' : 'Explore All 3 System Modules ↓'}</span>
                </button>
                <div className="flex items-center gap-1 text-white/50 text-[10px]">
                  <CheckCircle2 className="w-3 h-3 text-brand-sky" />
                  <span>{language === 'ar' ? 'معتمد' : 'Verified'}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Hero Bottom Bar / Scroll Cue */}
      <div className="absolute bottom-3 left-0 right-0 z-20 px-4 sm:px-6 max-w-7xl mx-auto flex items-center justify-between text-[11px] text-white/80">
        <div className="flex items-center gap-3">
          <span className="font-mono text-brand-sky font-bold">PVC SMART SERVICES</span>
          <span className="w-10 h-px bg-white/20" />
          <span className="hidden sm:inline tracking-wider uppercase text-brand-sky-pale">
            {language === 'ar' ? 'حلول تشغيلية متكاملة للمنشآت المصرية' : 'Premier Egyptian Operations & Valet Services'}
          </span>
        </div>

        <button
          onClick={() => handleScrollTo('about')}
          className="flex items-center gap-1.5 text-brand-sky-pale hover:text-white transition-colors focus:outline-none"
        >
          <span>{t.hero.scrollHint}</span>
          <span className="text-brand-sky">↓</span>
        </button>
      </div>
    </section>
  );
};
