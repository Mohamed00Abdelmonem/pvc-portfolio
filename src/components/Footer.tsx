import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUp, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-brand-navy text-white pt-16 pb-12 border-t border-brand-navy-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/15">
          {/* Brand & Mission (5 Cols) */}
          <div className="lg:col-span-5 space-y-3.5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black font-manrope tracking-tighter text-white">
                PVC
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-brand-sky inline-block mb-1" />
            </div>
            <p className="text-xs font-mono tracking-wider text-brand-sky uppercase font-bold">
              {t.brand.smart} · {t.brand.tagline}
            </p>
            <p className="text-xs sm:text-sm text-brand-sky-pale leading-relaxed max-w-sm pt-1">
              {t.footer.summary}
            </p>
            <div className="pt-2">
              <span className="inline-block text-[10px] font-mono tracking-wider uppercase px-3 py-1 bg-brand-navy-dark rounded-full text-brand-sky border border-brand-sky/30 font-bold">
                OPERATIONAL EXCELLENCE · EGYPT
              </span>
            </div>
          </div>

          {/* Quick Navigation (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold tracking-wider text-brand-sky uppercase mb-3">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs text-brand-sky-pale">
              <li>
                <button
                  onClick={() => handleNavClick('home')}
                  className="hover:text-white transition-colors focus:outline-none"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('about')}
                  className="hover:text-white transition-colors focus:outline-none"
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('services')}
                  className="hover:text-white transition-colors focus:outline-none"
                >
                  {t.nav.services}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('system-architecture')}
                  className="hover:text-white transition-colors focus:outline-none"
                >
                  {language === 'ar' ? 'نظام المواقف الذكي' : 'System Flow'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('principles')}
                  className="hover:text-white transition-colors focus:outline-none"
                >
                  {t.nav.principles}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('sectors')}
                  className="hover:text-white transition-colors focus:outline-none"
                >
                  {t.nav.sectors}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('approach')}
                  className="hover:text-white transition-colors focus:outline-none"
                >
                  {t.nav.approach}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('contact')}
                  className="hover:text-white transition-colors focus:outline-none"
                >
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Services Quick Directory (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold tracking-wider text-brand-sky uppercase mb-3">
              {t.footer.servicesTitle}
            </h4>
            <ul className="space-y-2 text-xs text-brand-sky-pale">
              <li>
                <button
                  onClick={() => handleNavClick('valet')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 focus:outline-none text-left"
                >
                  <span className="font-mono text-brand-sky text-[10px] font-bold">01</span>
                  <span>{language === 'ar' ? 'صف السيارات (Valet)' : 'Valet Parking'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('parking')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 focus:outline-none text-left"
                >
                  <span className="font-mono text-brand-sky text-[10px] font-bold">02</span>
                  <span>{language === 'ar' ? 'إدارة المواقف (Parking)' : 'Parking Management'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('carwash')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 focus:outline-none text-left"
                >
                  <span className="font-mono text-brand-sky text-[10px] font-bold">03</span>
                  <span>{language === 'ar' ? 'غسيل وعناية السيارات' : 'Car Washing & Care'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('buggy')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 focus:outline-none text-left"
                >
                  <span className="font-mono text-brand-sky text-[10px] font-bold">04</span>
                  <span>{language === 'ar' ? 'خدمات الباجي (Buggy)' : 'Buggy Services'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('traffic')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 focus:outline-none text-left"
                >
                  <span className="font-mono text-brand-sky text-[10px] font-bold">05</span>
                  <span>{language === 'ar' ? 'تنظيم حركة المرور' : 'Traffic Management'}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Inquiries (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold tracking-wider text-brand-sky uppercase mb-3">
              {t.footer.directContact}
            </h4>
            <div className="space-y-2 text-xs text-white">
              <a
                href="https://wa.me/201278761141"
                className="hover:text-brand-sky transition-colors flex items-center gap-1 font-mono font-semibold"
                dir="ltr"
              >
                <span>+20 127 876 1141</span>
                <ArrowUpRight className="w-3 h-3 text-brand-sky" />
              </a>
              <a
                href="mailto:info@PVCsmartservice.com"
                className="hover:text-brand-sky transition-colors block font-mono text-[11px] truncate text-brand-sky-pale"
                dir="ltr"
              >
                info@PVCsmartservice.com
              </a>
              <a
                href="https://PVCsmartservice.com"
                className="hover:text-brand-sky transition-colors block font-mono text-[11px] text-brand-sky-pale"
                dir="ltr"
              >
                PVCsmartservice.com
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-sky-pale">
          <p>
            © {currentYear} PVC SMART SERVICES. {t.footer.rights}
          </p>

          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-navy-dark hover:bg-brand-primary text-brand-sky hover:text-white border border-brand-sky/30 text-xs font-semibold tracking-wider transition-colors focus:outline-none shadow-sm"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
