import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { IMAGES } from '../assets/images';
import { VideoModal } from './ui/VideoModal';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  ShieldCheck,
  Play,
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
}

export const Hero: React.FC = () => {
  const { t, isRTL, language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const valetYoutubeUrl = 'https://www.youtube-nocookie.com/embed/S99i_MI8wPI';

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

  // Autoplay with 10s interval
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 10000);
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
      {/* Main Content Layer: Clean, Minimal & Powerful                   */}
      {/* ============================================================== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 md:py-32 w-full">
        <div className="max-w-3xl space-y-6 sm:space-y-7">
          
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

          {/* Calls to Action: Pure & Simple Fluid Buttons */}
          <div className="space-y-4 pt-1">
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

              {/* Simple Video Link */}
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="group/vid inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm text-brand-sky hover:text-white font-semibold transition-colors focus:outline-none"
              >
                <span className="w-7 h-7 rounded-full bg-white/15 group-hover/vid:bg-brand-primary border border-brand-sky/40 flex items-center justify-center transition-all shadow-sm">
                  <Play className="w-3 h-3 fill-current text-brand-sky group-hover/vid:text-white ml-0.5 transition-colors" />
                </span>
                <span className="underline-offset-4 group-hover/vid:underline">
                  {language === 'ar' ? 'فيديو الفعالية الميداني ↗' : 'Field Operations Video ↗'}
                </span>
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

        </div>
      </div>

      {/* Hero Bottom Bar / Scroll Cue */}
      <div className="absolute bottom-4 left-4 sm:left-8 z-20 flex items-center gap-2 text-[11px] text-white/70">
        <span className="font-mono text-brand-sky font-bold">PVC SMART SERVICES</span>
        <span className="w-6 h-px bg-white/20" />
        <button
          onClick={() => handleScrollTo('about')}
          className="hover:text-white text-brand-sky-pale transition-colors focus:outline-none"
        >
          <span>{t.hero.scrollHint} ↓</span>
        </button>
      </div>
    </section>
  );
};
