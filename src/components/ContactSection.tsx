import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeading } from './ui/SectionHeading';
import {
  Phone,
  Mail,
  Globe,
  ArrowUpRight,
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { t, isRTL, language } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'all',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = t.contact.form.errors.name;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = t.contact.form.errors.email;
    }
    if (!formData.message.trim() || formData.message.trim().length < 5) {
      errs.message = t.contact.form.errors.message;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const serviceLabels: Record<string, { ar: string; en: string }> = {
      all: { ar: 'شريك تشغيل متكامل / كافة الخدمات', en: 'Full Operations / Integrated Suite' },
      valet: { ar: 'صف السيارات (Valet Parking)', en: 'Valet Parking' },
      parking: { ar: 'إدارة المواقف (Parking Management)', en: 'Parking Management' },
      carwash: { ar: 'غسيل وعناية السيارات (Car Washing & Care)', en: 'Car Washing & Vehicle Care' },
      buggy: { ar: 'خدمات الباجي (Buggy Services)', en: 'Buggy Services' },
      traffic: { ar: 'تنظيم حركة المرور (Traffic Management)', en: 'Traffic Management' }
    };

    const selectedServiceLabel =
      serviceLabels[formData.service]?.[language] || formData.service;

    const whatsappMessage =
      language === 'ar'
        ? `مرحبًا فريق PVC SMART SERVICES،\n\nأود طلب مقترح تشغيلي وتفاصيل الخدمة لمنشأتنا:\n• الاسم: ${formData.name.trim()}\n• البريد الإلكتروني: ${formData.email.trim()}\n• الهاتف: ${formData.phone.trim() || 'غير محدد'}\n• الخدمة المطلوبة: ${selectedServiceLabel}\n\n• تفاصيل الموقع والاحتياجات:\n${formData.message.trim()}\n\n— مُرسل عبر الموقع الإلكتروني PVCsmartservice.com`
        : `Hello PVC SMART SERVICES Team,\n\nI would like to request an operational proposal for our property:\n• Name: ${formData.name.trim()}\n• Email: ${formData.email.trim()}\n• Phone: ${formData.phone.trim() || 'Not specified'}\n• Service of Interest: ${selectedServiceLabel}\n\n• Property Scope & Operational Details:\n${formData.message.trim()}\n\n— Sent via PVCsmartservice.com`;

    const whatsappUrl = `https://wa.me/201278761141?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    setIsSubmitted(true);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-24 md:py-36 bg-brand-light text-brand-slate relative overflow-hidden border-b border-brand-light-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          tag={t.contact.tag}
          eyebrow={t.contact.eyebrow}
          titlePart1={t.contact.titlePart1}
          titlePart2={t.contact.titlePart2}
          lead={t.contact.lead}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mt-10">
          {/* Direct Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              {/* Phone / WhatsApp */}
              <a
                href="https://wa.me/201278761141"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 sm:p-6 bg-white border border-brand-light-border rounded-sm hover:border-brand-primary transition-all duration-300 flex items-center justify-between shadow-xs hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-brand-light flex items-center justify-center text-brand-primary group-hover:scale-105 transition-transform shadow-2xs">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-wider text-brand-muted uppercase block font-semibold">
                      {t.contact.cards.phone.label}
                    </span>
                    <span className="text-base sm:text-lg font-mono font-bold text-brand-slate group-hover:text-brand-primary transition-colors" dir="ltr">
                      {t.contact.cards.phone.display}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className={`w-5 h-5 text-brand-muted group-hover:text-brand-primary transition-colors ${isRTL ? 'rotate-180' : ''}`} />
              </a>

              {/* Email */}
              <a
                href="mailto:info@PVCsmartservice.com"
                className="group p-5 sm:p-6 bg-white border border-brand-light-border rounded-sm hover:border-brand-primary transition-all duration-300 flex items-center justify-between shadow-xs hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-brand-light flex items-center justify-center text-brand-primary group-hover:scale-105 transition-transform shadow-2xs">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-wider text-brand-muted uppercase block font-semibold">
                      {t.contact.cards.email.label}
                    </span>
                    <span className="text-sm sm:text-base font-mono font-bold text-brand-slate group-hover:text-brand-primary transition-colors" dir="ltr">
                      {t.contact.cards.email.value}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className={`w-5 h-5 text-brand-muted group-hover:text-brand-primary transition-colors ${isRTL ? 'rotate-180' : ''}`} />
              </a>

              {/* Website */}
              <a
                href="https://PVCsmartservice.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 sm:p-6 bg-white border border-brand-light-border rounded-sm hover:border-brand-primary transition-all duration-300 flex items-center justify-between shadow-xs hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-brand-light flex items-center justify-center text-brand-primary group-hover:scale-105 transition-transform shadow-2xs">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-wider text-brand-muted uppercase block font-semibold">
                      {t.contact.cards.website.label}
                    </span>
                    <span className="text-sm sm:text-base font-mono font-bold text-brand-slate group-hover:text-brand-primary transition-colors" dir="ltr">
                      {t.contact.cards.website.value}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className={`w-5 h-5 text-brand-muted group-hover:text-brand-primary transition-colors ${isRTL ? 'rotate-180' : ''}`} />
              </a>
            </div>

            {/* Operational Commitment Note */}
            <div className="p-5 sm:p-6 bg-white border border-brand-light-border rounded-sm shadow-xs">
              <span className="text-[10px] font-mono tracking-wider text-brand-primary font-bold uppercase block mb-1">
                OPERATIONAL ENGAGEMENT
              </span>
              <p className="text-xs text-brand-muted leading-relaxed">
                {language === 'ar'
                  ? 'يقوم فريق التشغيل لدينا بدراسة كل موقع بدقة وتصميم حل مخصص يراعي الطاقة الاستيعابية وأوقات الذروة واحتياجات الزوار.'
                  : 'Our operational directors inspect each venue thoroughly to craft tailored scopes considering visitor surges, traffic geometry, and VIP requirements.'}
              </p>
            </div>
          </div>

          {/* Proposal Request / Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-7 sm:p-10 rounded-sm border border-brand-light-border shadow-md">
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-brand-slate mb-2">
              {t.contact.form.heading}
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted mb-7">
              {t.contact.form.disclaimer}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
              {/* Service Selection */}
              <div>
                <label className="block text-xs font-bold tracking-wider text-brand-slate uppercase mb-1.5">
                  {t.contact.form.serviceInterest}
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-brand-cool-white border border-brand-light-border focus:border-brand-primary px-4 py-3 rounded-sm text-brand-slate text-sm focus:outline-none transition-colors"
                >
                  <option value="all">
                    {language === 'ar' ? 'شريك تشغيلي متكامل (كافة الخدمات)' : 'Comprehensive Operational Partner (All Services)'}
                  </option>
                  <option value="valet">
                    {language === 'ar' ? '01 / صف السيارات (Valet Parking)' : '01 / Valet Parking'}
                  </option>
                  <option value="parking">
                    {language === 'ar' ? '02 / إدارة المواقف (Parking Management)' : '02 / Parking Management'}
                  </option>
                  <option value="carwash">
                    {language === 'ar' ? '03 / غسيل وعناية السيارات (Car Washing & Care)' : '03 / Car Washing & Vehicle Care'}
                  </option>
                  <option value="buggy">
                    {language === 'ar' ? '04 / خدمات الباجي (Buggy Services)' : '04 / Buggy Services'}
                  </option>
                  <option value="traffic">
                    {language === 'ar' ? '05 / تنظيم حركة المرور (Traffic Management)' : '05 / Traffic Management'}
                  </option>
                </select>
              </div>

              {/* Name & Email Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-xs font-bold tracking-wider text-brand-slate uppercase mb-1.5">
                    {t.contact.form.nameLabel} *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    placeholder={t.contact.form.namePlaceholder}
                    className={`w-full bg-brand-cool-white border ${
                      errors.name ? 'border-red-400' : 'border-brand-light-border'
                    } focus:border-brand-primary px-4 py-3 rounded-sm text-brand-slate text-sm focus:outline-none transition-colors`}
                  />
                  {errors.name && (
                    <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.name}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold tracking-wider text-brand-slate uppercase mb-1.5">
                    {t.contact.form.emailLabel} *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    placeholder={t.contact.form.emailPlaceholder}
                    className={`w-full bg-brand-cool-white border ${
                      errors.email ? 'border-red-400' : 'border-brand-light-border'
                    } focus:border-brand-primary px-4 py-3 rounded-sm text-brand-slate text-sm focus:outline-none transition-colors`}
                  />
                  {errors.email && (
                    <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-xs font-bold tracking-wider text-brand-slate uppercase mb-1.5">
                  {t.contact.form.phoneLabel}
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder={t.contact.form.phonePlaceholder}
                  className="w-full bg-brand-cool-white border border-brand-light-border focus:border-brand-primary px-4 py-3 rounded-sm text-brand-slate text-sm focus:outline-none transition-colors"
                  dir="ltr"
                />
              </div>

              {/* Message / Details Field */}
              <div>
                <label className="block text-xs font-bold tracking-wider text-brand-slate uppercase mb-1.5">
                  {t.contact.form.messageLabel} *
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: '' });
                  }}
                  placeholder={t.contact.form.messagePlaceholder}
                  className={`w-full bg-brand-cool-white border ${
                    errors.message ? 'border-red-400' : 'border-brand-light-border'
                  } focus:border-brand-primary px-4 py-3 rounded-sm text-brand-slate text-sm focus:outline-none transition-colors resize-y`}
                />
                {errors.message && (
                  <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.message}</span>
                  </div>
                )}
              </div>

              {/* Submit CTA: Primary Blue */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 py-4 bg-brand-primary hover:bg-brand-navy text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 rounded-sm shadow-md hover:shadow-lg active:scale-[0.99]"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.contact.form.submitBtn}</span>
                </button>
              </div>

              {isSubmitted && (
                <div className="p-3 bg-brand-light border border-brand-primary text-brand-primary text-xs rounded-sm flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-primary shrink-0" />
                  <span>
                    {language === 'ar'
                      ? 'تم تحضير الرسالة وفتح تطبيق واتساب لمتابعة طلبكم مباشرة مع إدارة التشغيل.'
                      : 'Message drafted and WhatsApp launched to connect directly with operations.'}
                  </span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
