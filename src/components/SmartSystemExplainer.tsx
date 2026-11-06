import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeading } from './ui/SectionHeading';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Maximize2,
  X,
  CheckCircle2,
  Eye
} from 'lucide-react';

export const SmartSystemExplainer: React.FC = () => {
  const { isRTL, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string } | null>(null);

  const systemModules = [
    {
      id: 'gates',
      tabNumber: '01',
      tabLabel: language === 'ar' ? 'البوابات والتحكم بالدخول' : 'Gate Control & Ingress',
      title: language === 'ar' ? 'نظام البوابات الذكية ومحطات الدخول والخروج' : 'Smart Gate & Entry/Exit Control Infrastructure',
      subtitle: language === 'ar' ? 'تحكم إلكتروني بالوصول، قراءة لوحات آمنة (LPR)، وانسيابية بدون اختناقات مرورية' : 'Automated access control, license plate recognition, and zero-congestion lanes',
      image: '/images/system/gate-system-isometric.jpg',
      alt: language === 'ar' ? 'رسم ثلاثي الأبعاد لنظام بوابات الدخول والخروج وكاميرات LPR' : 'Isometric 3D diagram of smart entrance/exit gate system with LPR cameras',
      badge: 'LPR & ACCESS CONTROL',
      highlights: [
        {
          title: language === 'ar' ? 'كاميرات التعرف على لوحات السيارات (LPR / ANPR)' : 'License Plate Recognition (LPR / ANPR)',
          desc: language === 'ar' ? 'التقاط وقراءة أرقام اللوحات بدقة عالية لتوثيق وتسهيل الدخول التلقائي للمصرح لهم دون تأخير.' : 'High-precision plate recognition for automated verification and authorized access.'
        },
        {
          title: language === 'ar' ? 'بوابات رفع أوتوماتيكية سريعة (Boom Barrier Gates)' : 'Rapid-Lift Automatic Barrier Gates',
          desc: language === 'ar' ? 'بوابات هيدروليكية سريعة الاستجابة مزودة بحساسات أمان أرضية تمنع إغلاق الذراع على المركبات.' : 'Responsive barriers with safety loop sensors preventing any contact with vehicles.'
        },
        {
          title: language === 'ar' ? 'أكشاك صرف وقراءة التذاكر والباركود (Ticket & QR Kiosks)' : 'Ticket & Barcode/QR Dispensing Kiosks',
          desc: language === 'ar' ? 'محطات رقمية مخصصة للزوار لإصدار التذاكر أو مسح أكواد QR والدفع الذاتي السلس.' : 'Self-service digital kiosks for ticket issuing, QR code scanning, and digital validation.'
        },
        {
          title: language === 'ar' ? 'تنسيق المسارات والكابينة الأمنية (Security Booth Integration)' : 'Multi-Lane Circulation & Security Booth',
          desc: language === 'ar' ? 'تنظيم واضح لمساري الدخول والخروج مع نقطة إشراف ميداني لدعم الحالات الاستثنائية.' : 'Clear lane segregation for ingress/egress paired with active field supervisor support.'
        }
      ]
    },
    {
      id: 'workflow',
      tabNumber: '02',
      tabLabel: language === 'ar' ? 'دورة تدفق المركبة خطوة بخطوة' : 'End-to-End Vehicle Workflow',
      title: language === 'ar' ? 'دورة تدفق المركبة من الوصول حتى المغادرة' : 'Step-by-Step Vehicle Ingress, Bay Stay & Egress Flow',
      subtitle: language === 'ar' ? 'مخطط انسيابي يوضح تسلسل الخطوات بكل شفافية ودقة للمنشأة والزائر' : 'Transparent sequential flow illustrating entry scan, guidance, payment, and exit',
      image: '/images/system/parking-workflow-diagram.jpg',
      alt: language === 'ar' ? 'مخطط خطوات دخول وصف وخروج السيارات من الموقف' : 'Sequential workflow diagram of car arrival, scanning, parking, payment, and exit',
      badge: 'END-TO-END FLOW',
      highlights: [
        {
          title: language === 'ar' ? '1. وصول المركبة للمدخل (Car Arrives Entrance)' : '1. Car Arrives at Facility Entrance',
          desc: language === 'ar' ? 'استشعار اقتراب المركبة وتفعيل كاميرا القراءة وإضاءة لوحة الترحيب التفاعلية.' : 'Approach sensor triggers high-speed ANPR camera and welcome display screen.'
        },
        {
          title: language === 'ar' ? '2. مسح اللوحة ورفع البوابة (Scan Plate & Barrier Open)' : '2. Scan Plate, Issue Ticket & Lift Barrier',
          desc: language === 'ar' ? 'توثيق فوري لرقم اللوحة ووقت الوصول وفتح البوابة خلال أجزاء من الثانية.' : 'Instant timestamping, digital vehicle logging, and millisecond barrier release.'
        },
        {
          title: language === 'ar' ? '3. توجيه للأماكن الشاغرة (Live Availability Display)' : '3. Real-Time Bay Capacity Guidance',
          desc: language === 'ar' ? 'شاشات عرض رقمية توضح عدد المواقف المتوفرة (Available: 0090) ومسارات التوجيه المباشرة.' : 'Dynamic capacity screens direct drivers straight to available zones without cruising.'
        },
        {
          title: language === 'ar' ? '4. الدفع السلس والمغادرة الآمنة (Payment & Verified Exit)' : '4. Digital Payment & Fast-Track Exit',
          desc: language === 'ar' ? 'دفع عبر الأجهزة الذاتية أو الرمز الرقمي، والتحقق الآلي من اللوحة لفتح بوابة الخروج فورًا.' : 'Self-checkout via kiosk/QR code; exit camera recognizes verified plate for instant departure.'
        }
      ]
    },
    {
      id: 'guidance',
      tabNumber: '03',
      tabLabel: language === 'ar' ? 'التوجيه الداخلي وحساسات المواقف' : 'In-Facility Guidance & Sensors',
      title: language === 'ar' ? 'أنظمة التوجيه ومراقبة الأماكن الشاغرة (B1 Guidance)' : 'Smart Space Guidance, Warning Systems & EV Allocation',
      subtitle: language === 'ar' ? 'كاميرات علوية لرصد حالة كل موقف، شاشات إلكترونية، ومسارات مخصصة لشحن المركبات' : 'Overhead bay cameras, guidance screens, blind-spot warning systems, and EV zones',
      image: '/images/system/smart-facility-guidance.jpg',
      alt: language === 'ar' ? 'مخطط ثلاثي الأبعاد لنظام التوجيه وحساسات المواقف وشواحن السيارات الكهربائية' : 'Isometric 3D layout of B1 parking lot with parking space cameras, guidance screens, and EV bays',
      badge: 'GUIDANCE & SENSORS',
      highlights: [
        {
          title: language === 'ar' ? 'كاميرات وحساسات مراقبة الأماكن (Parking Space Camera)' : 'Individual Parking Space Cameras',
          desc: language === 'ar' ? 'مراقبة ذكية لحالة كل موقف (شاغر / مشغول) بمؤشرات ضوئية خضراء وحمراء واضحة.' : 'Dual-function surveillance and vacancy sensor with green/red LED bay indicators.'
        },
        {
          title: language === 'ar' ? 'شاشات التوجيه والتحذير الذكية (Guidance & Warning Screens)' : 'Dynamic Guidance & Directional Displays',
          desc: language === 'ar' ? 'شاشات عند تقاطعات الممرات ترشد السائقين للأماكن الشاغرة وتحذر من حركة السيارات القادمة.' : 'Intersection screens indicating remaining slots per aisle with cross-traffic warning alerts.'
        },
        {
          title: language === 'ar' ? 'إدارة مواقف الشحن الكهربائي (EV Charging Bays)' : 'EV Charging Bay Integration & Monitoring',
          desc: language === 'ar' ? 'تنظيم وإشراف على مواقف السيارات الكهربائية لمنع استخدامها من المركبات التقليدية.' : 'Dedicated monitoring for electric vehicle charging infrastructure to prevent unauthorized occupancy.'
        },
        {
          title: language === 'ar' ? 'بوابات خروج ذكية بنظام LPR (Barrier Gate Fast-Exit)' : 'Fast-Track LPR Barrier Gate Exit',
          desc: language === 'ar' ? 'مغادرة فورية للمركبات المسددة أو المصرحة دون الحاجة لفتح نافذة السيارة.' : 'Frictionless departure for validated vehicles without stopping or rolling down windows.'
        }
      ]
    }
  ];

  const currentModule = systemModules[activeTab];

  return (
    <section id="system-architecture" className="py-24 md:py-36 bg-brand-navy text-white relative overflow-hidden border-b border-brand-navy-dark">
      {/* Decorative Subtle Blue Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-sky/10 rounded-full blur-3xl pointer-events-none" />

      {/* Lightbox Modal for Diagram Zoom */}
      <AnimatePresence>
        {lightboxImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxImage(null)}
              className="fixed inset-0 bg-brand-navy-dark/95 backdrop-blur-md cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              className="relative max-w-5xl w-full bg-white rounded-sm shadow-2xl overflow-hidden border border-brand-light-border z-10 text-brand-slate"
            >
              <div className="flex items-center justify-between px-5 py-4 bg-brand-light border-b border-brand-light-border">
                <span className="font-heading font-bold text-sm sm:text-base text-brand-slate">
                  {lightboxImage.title}
                </span>
                <button
                  onClick={() => setLightboxImage(null)}
                  className="p-1.5 rounded-full hover:bg-brand-light-border text-brand-muted hover:text-brand-slate transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 sm:p-6 bg-brand-light/30 flex items-center justify-center max-h-[80vh] overflow-auto">
                <img
                  src={lightboxImage.url}
                  alt={lightboxImage.title}
                  className="w-full h-auto max-h-[75vh] object-contain rounded-sm shadow-md bg-white p-2"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading: Dark Mode for Deep Navy */}
        <SectionHeading
          tag={language === 'ar' ? '03 — نظام التشغيل والمواقف الذكي' : '03 — SMART SYSTEM ARCHITECTURE'}
          eyebrow={language === 'ar' ? 'HOW THE SYSTEM WORKS' : 'CLEAR OPERATIONAL WALKTHROUGH'}
          titlePart1={
            language === 'ar' ? 'هندسة تشغيل متكاملة:' : 'Integrated Operational System:'
          }
          titlePart2={
            language === 'ar'
              ? 'من البوابة حتى الاصطفاف والمغادرة.'
              : 'From Gate Ingress to Smart Bay & Dispatch.'
          }
          lead={
            language === 'ar'
              ? 'مخططات ورسوم توضيحية تشرح بالتفصيل كيف يعمل نظام PVC في إدارة بوابات الدخول والخروج، قراءة اللوحات (LPR)، التوجيه الداخلي، وتسهيل حركة الزوار بأعلى موثوقية.'
              : 'Detailed visual schematics explaining how PVC operates automated entry/exit gates, license plate recognition (LPR), in-facility bay guidance, and frictionless guest flow.'
          }
          dark={true}
        />

        {/* 3 Interactive Tab Selectors */}
        <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap items-center gap-2 sm:gap-3.5 pb-4 sm:pb-6 border-b border-white/15 mt-8">
          {systemModules.map((item, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-6 py-2.5 sm:py-3.5 rounded-sm text-xs sm:text-sm font-bold tracking-wide transition-all focus:outline-none shrink-0 ${
                  isActive
                    ? 'bg-brand-primary text-white shadow-lg'
                    : 'bg-brand-navy-dark/80 hover:bg-brand-navy-light text-brand-sky-pale border border-white/10 hover:border-brand-sky/40'
                }`}
              >
                <span className={`font-mono text-xs px-1.5 py-0.5 rounded-xs ${
                  isActive ? 'bg-brand-sky text-brand-navy-dark font-extrabold' : 'bg-brand-navy text-brand-sky'
                }`}>
                  {item.tabNumber}
                </span>
                <span>{item.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Active Module Showcase */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Visual Diagram Frame (7 cols) */}
          <div className="lg:col-span-7 relative">
            <motion.div
              key={currentModule.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-sm overflow-hidden bg-brand-navy-dark/90 border border-brand-sky/25 shadow-2xl group p-3 sm:p-5"
            >
              <div className="relative overflow-hidden rounded-xs bg-white p-2">
                <img
                  src={currentModule.image}
                  alt={currentModule.alt}
                  className="w-full h-auto object-contain max-h-[460px] p-2 bg-white hover:scale-101 transition-transform duration-500"
                />

                {/* Click-to-Enlarge Overlay */}
                <button
                  onClick={() =>
                    setLightboxImage({ url: currentModule.image, title: currentModule.title })
                  }
                  className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-3.5 py-2 rounded-sm bg-brand-navy-dark hover:bg-brand-primary text-white text-xs font-bold shadow-lg backdrop-blur-sm transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-brand-sky" />
                  <span>{language === 'ar' ? 'تكبير المخطط للتفاصيل' : 'Enlarge Diagram'}</span>
                </button>

                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-brand-primary text-white text-[10px] font-mono font-bold tracking-wider uppercase shadow-xs">
                  {currentModule.badge}
                </div>
              </div>

              {/* Caption banner below diagram */}
              <div className="mt-3 flex items-center justify-between text-xs text-brand-sky-pale pt-2 border-t border-white/10">
                <span className="flex items-center gap-1.5 font-medium">
                  <Eye className="w-3.5 h-3.5 text-brand-sky" />
                  {language === 'ar' ? 'رسم تخطيطي تفصيلي معتمد ميدانيًا' : 'Field-Verified Engineering Schematic'}
                </span>
                <span className="font-mono text-brand-sky font-bold">PVC SMART SERVICES</span>
              </div>
            </motion.div>
          </div>

          {/* Module Explanations & Specs (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="font-mono text-xs font-bold text-brand-sky tracking-wider uppercase block mb-1">
                SYSTEM SCHEMATIC
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {currentModule.title}
              </h3>
              <p className="text-sm text-brand-sky-pale mt-2 leading-relaxed">
                {currentModule.subtitle}
              </p>
            </div>

            {/* 4 Feature Highlights */}
            <div className="space-y-3.5 pt-3 border-t border-white/15">
              {currentModule.highlights.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="flex items-start gap-3 p-3.5 bg-brand-navy-dark/60 border border-white/10 rounded-sm hover:border-brand-sky/40 transition-colors shadow-2xs text-white"
                >
                  <div className="w-6 h-6 rounded-full bg-brand-primary/20 text-brand-sky flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-sky" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-xs sm:text-sm text-white mb-0.5">
                      {point.title}
                    </h4>
                    <p className="text-xs text-brand-sky-pale leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-sm text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:-translate-y-0.5"
              >
                <span>{language === 'ar' ? 'طلب دراسة تشغيلية لموقعك' : 'Request a Venue Operations Study'}</span>
                <span className={isRTL ? 'rotate-180' : ''}>↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
