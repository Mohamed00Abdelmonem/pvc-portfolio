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
  Car,
  Layers,
  Compass,
  Play,
  Pause,
  Sparkles
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
  icon: React.ReactNode;
}

export const Hero: React.FC = () => {
  const { t, isRTL, language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isDiagramModalOpen, setIsDiagramModalOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const valetYoutubeUrl = 'https://www.youtube-nocookie.com/embed/S99i_MI8wPI';

  // 3 High-resolution slides preserving natural photographic realism
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
      image: IMAGES.hero.slide2.url, // Main parking facility photograph
      alt: IMAGES.hero.slide2.alt,
      objectPosition: 'center 45%',
      highlightTag: {
        ar: 'بوابات ذكية وقراءة فورية للوحات LPR',
        en: 'LPR Barrier Gates & Smart Ingress'
      },
      icon: <Layers className="w-4 h-4 text-brand-sky" />
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
      image: IMAGES.hero.slide1.url, // Valet reception photograph
      alt: IMAGES.hero.slide1.alt,
      objectPosition: 'center 40%',
      highlightTag: {
        ar: 'فريق مدرّب واستقبال فندقي راقٍ',
        en: 'Briefed Team & Hospitality Courtesy'
      },
      icon: <Car className="w-4 h-4 text-brand-sky" />
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
      image: IMAGES.hero.slide3.url, // Campus buggy transit photograph
      alt: IMAGES.hero.slide3.alt,
      objectPosition: 'center 40%',
      highlightTag: {
        ar: 'عربات باجي كهربائية وتنظيم مروري',
        en: 'Electric Buggy Mobility & Traffic Flow'
      },
      icon: <Compass className="w-4 h-4 text-brand-sky" />
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

  // Mobile swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 45;

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
      className="relative w-full min-h-[88vh] sm:min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-brand-slate text-white select-none"
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

      {/* Smart System Diagram Lightbox */}
      <AnimatePresence>
        {isDiagramModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDiagramModalOpen(false)}
              className="fixed inset-0 bg-brand-navy-dark/90 backdrop-blur-md cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              className="relative max-w-4xl w-full bg-white rounded-sm shadow-2xl overflow-hidden border border-brand-light-border z-10 text-brand-slate"
            >
              <div className="flex items-center justify-between px-5 py-4 bg-brand-light border-b border-brand-light-border">
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-brand-primary uppercase block">
                    {language === 'ar' ? 'المخطط الهندسي للبوابات والمواقف' : 'SYSTEM ARCHITECTURE SCHEMATIC'}
                  </span>
                  <h3 className="font-heading font-extrabold text-base sm:text-lg text-brand-slate">
                    {language === 'ar' ? 'بوابات الدخول والخروج وقراءة اللوحات LPR' : 'Smart Ingress / Egress Gates & LPR Flow'}
                  </h3>
                </div>
                <button
                  onClick={() => setIsDiagramModalOpen(false)}
                  className="p-2 rounded-full hover:bg-brand-light-border text-brand-muted hover:text-brand-slate transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="p-4 sm:p-6 bg-brand-light/30 flex flex-col items-center">
                <img
                  src="/images/system/gate-system-isometric.jpg"
                  alt="Smart Parking Gate Architecture"
                  className="w-full h-auto max-h-[60vh] object-contain rounded-sm shadow-md bg-white p-2"
                />
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 w-full text-xs text-brand-muted pt-3 border-t border-brand-light-border">
                  <span>{language === 'ar' ? 'بوابات هيدروليكية سريعة + كاميرات ANPR + كابينة إشراف' : 'Rapid hydraulic barriers + ANPR cameras + security supervisory booth'}</span>
                  <button
                    onClick={() => {
                      setIsDiagramModalOpen(false);
                      handleScrollTo('system-architecture');
                    }}
                    className="text-brand-primary font-bold hover:underline"
                  >
                    {language === 'ar' ? 'استعراض شرح النظام الكامل ↗' : 'View Full System Explainer ↗'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================== */}
      {/* Background Full-Width Photographic Slides                       */}
      {/* Natural, Realistic Photography Colors with NO heavy blue wash   */}
      {/* ============================================================== */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={activeSlide.id}
          initial={{ opacity: 0, scale: 1.05 }}
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

          {/* Gentle, Localized Directional Shading ONLY Behind Text — Preserves Natural Photography */}
          <div
            className={`absolute inset-0 pointer-events-none ${
              isRTL
                ? 'bg-gradient-to-l from-slate-950/80 via-slate-950/30 to-transparent'
                : 'bg-gradient-to-r from-slate-950/80 via-slate-950/30 to-transparent'
            }`}
          />
          {/* Subtle bottom fade for footer bar contrast */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/70 to-transparent pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* ============================================================== */}
      {/* Main Content Layer                                              */}
      {/* ============================================================== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          
          {/* Column: Headline & Editorial Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            
            {/* Top Partner Eyebrow Pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-navy-dark/75 border border-brand-sky/40 text-brand-sky text-[11px] sm:text-xs font-bold tracking-wider uppercase backdrop-blur-md shadow-sm"
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
                  className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.2] text-white drop-shadow-lg"
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

            {/* Calls to Action: Primary Blue + White Secondary with Blue Border */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <div className="grid grid-cols-2 gap-2.5 sm:flex sm:items-center sm:gap-4">
                {/* Primary CTA: Primary Blue #1769AA */}
                <button
                  onClick={() => handleScrollTo('contact')}
                  className="group relative inline-flex items-center justify-center gap-2 px-4 sm:px-7 py-3.5 sm:py-4 bg-brand-primary hover:bg-brand-navy-dark text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 rounded-sm shadow-xl hover:shadow-brand-primary/40 hover:-translate-y-0.5 active:translate-y-0 min-h-[46px]"
                >
                  <span>{t.hero.ctaPrimary}</span>
                  <ArrowUpRight
                    className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                      isRTL ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Secondary CTA: White with Primary Blue border */}
                <button
                  onClick={() => handleScrollTo('services')}
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3.5 sm:py-4 bg-white hover:bg-brand-light text-brand-primary border-2 border-brand-primary text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 rounded-sm shadow-md hover:-translate-y-0.5 min-h-[46px]"
                >
                  <span>{t.hero.ctaSecondary}</span>
                  <span className="text-brand-primary">↓</span>
                </button>
              </div>

              {/* Valet Video Lightbox Trigger */}
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="group inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-4 bg-brand-navy-dark/80 hover:bg-brand-primary border border-brand-sky/40 hover:border-brand-sky text-brand-sky hover:text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 rounded-sm backdrop-blur-md shadow-md min-h-[44px]"
                title={language === 'ar' ? 'مشاهدة فيديو تجربة الفاليه' : 'Watch Valet Experience Video'}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-sky opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-sky" />
                </span>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{language === 'ar' ? 'فيديو الفاليه' : 'Valet Video'}</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 border-t border-white/20 flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-brand-sky-pale font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-sky" />
                <span>{language === 'ar' ? 'فريق مصري مدرّب وموجّه مسبقًا' : 'Trained Egyptian Operations Team'}</span>
              </div>
              <span className="hidden sm:inline text-white/30">•</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-sky" />
                <span>{activeSlide.highlightTag[language]}</span>
              </div>
            </div>

          </div>

          {/* Column: Visual Interactive Gateway & Controls (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end gap-3.5 sm:gap-4">
            
            {/* Elegant Operational Context Card — Minimal & Unobtrusive */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full sm:max-w-md bg-brand-navy-dark/80 border border-brand-sky/30 rounded-sm p-4 backdrop-blur-md shadow-xl space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-sky opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-sky" />
                  </span>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-brand-sky uppercase">
                    {language === 'ar' ? 'حلول تشغيل ميدانية معتمدة' : 'VERIFIED OPERATIONS SUITE'}
                  </span>
                </div>
                <button
                  onClick={() => handleScrollTo('system-architecture')}
                  className="inline-flex items-center gap-1 text-[11px] text-brand-sky hover:text-white transition-colors font-bold"
                >
                  <span>{language === 'ar' ? 'شرح النظام ↗' : 'System Flow ↗'}</span>
                </button>
              </div>

              <div className="flex items-center justify-between pt-1 text-xs text-white/90">
                <span className="font-semibold">{activeSlide.badge[language]}</span>
                <span className="font-mono text-brand-sky font-bold">{activeSlide.number}</span>
              </div>
            </motion.div>

            {/* Interactive Slide Thumbnail Tabs */}
            <div className="flex items-center gap-1.5 sm:gap-2 bg-brand-navy-dark/80 p-1.5 sm:p-2 rounded-sm border border-white/20 backdrop-blur-md shadow-xl w-full sm:w-auto">
              {slides.map((s, index) => {
                const isActive = currentSlide === index;
                return (
                  <button
                    key={s.id}
                    onClick={() => setCurrentSlide(index)}
                    className={`flex-1 sm:flex-initial flex items-center gap-1.5 px-3 py-2 rounded-xs text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-brand-primary text-white shadow-md'
                        : 'text-brand-sky-pale hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span className="font-mono text-xs">{s.number}</span>
                    <span className="hidden sm:inline truncate max-w-[85px]">
                      {s.badge[language].split('·')[0]}
                    </span>
                  </button>
                );
              })}

              {/* Pause/Play Toggle */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 text-brand-sky-pale hover:text-white transition-colors focus:outline-none"
                title={isPlaying ? 'Pause Autoplay' : 'Resume Autoplay'}
                aria-label="Toggle autoplay"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Arrow Controls: Touch-Friendly (>= 44px) */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-sm bg-white/15 hover:bg-brand-primary text-white border border-white/25 hover:border-brand-primary flex items-center justify-center transition-all duration-300 shadow-md focus:outline-none active:scale-95"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                </button>

                <button
                  onClick={nextSlide}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-sm bg-white/15 hover:bg-brand-primary text-white border border-white/25 hover:border-brand-primary flex items-center justify-center transition-all duration-300 shadow-md focus:outline-none active:scale-95"
                  aria-label="Next slide"
                >
                  <ChevronRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <div className="font-mono text-xs text-brand-sky font-bold tracking-widest px-2">
                {activeSlide.number} / 0{totalSlides}
              </div>
            </div>

            {/* Animated Progress Line */}
            <div className="w-full max-w-[200px] h-1 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                key={`progress-${currentSlide}-${isPlaying}`}
                initial={{ width: '0%' }}
                animate={{ width: isPlaying ? '100%' : '100%' }}
                transition={{ duration: isPlaying ? 6 : 0, ease: 'linear' }}
                className="h-full bg-brand-sky"
              />
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
