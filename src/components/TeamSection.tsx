import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeading } from './ui/SectionHeading';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  MessageCircle,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Award,
  ArrowUpRight,
  X,
  UserCheck,
  Sparkles,
  MapPin,
  Clock
} from 'lucide-react';

export interface TeamMember {
  id: string;
  name: { ar: string; en: string };
  title: { ar: string; en: string };
  roleTag: { ar: string; en: string };
  mobile: string;
  email: string;
  location: { ar: string; en: string };
  experienceYears: string;
  bio: { ar: string; en: string };
  highlights: { ar: string; en: string }[];
  responsibilities: { ar: string; en: string }[];
  supervisedSectors: { ar: string; en: string }[];
}

export const TeamSection: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const teamMembers: TeamMember[] = [
    {
      id: 'alaa-ali',
      name: {
        ar: 'أ. علاء علي',
        en: 'Mr. Alaa Ali'
      },
      title: {
        ar: 'رئيس قطاع التشغيل وإدارة العمليات الميدانية',
        en: 'Head Operation Manager'
      },
      roleTag: {
        ar: 'القيادة التشغيلية الميدانية',
        en: 'Head of Operations'
      },
      mobile: '01278761141',
      email: 'alaa.ali@PVCsmartservice.com',
      location: {
        ar: 'القاهرة والإسكندرية · جمهورية مصر العربية',
        en: 'Cairo & Alexandria · Egypt'
      },
      experienceYears: '12+',
      bio: {
        ar: 'قيادي تشغيلي يتمتع بأكثر من 12 عاماً من الخبرة العملية في إدارة العمليات الميدانية للمواقف الذكية، أساطيل الفاليه الفاخرة، وتنظيم حركة المركبات لكبرى المنشآت الحيوية في مصر. قاد بنجاح عشرات مشاريع التشغيل الفندقي والمولّات والفعاليات الكبرى مع تطبيق أعلى معايير الانضباط والسلامة.',
        en: 'Accomplished operations director with over 12 years of hands-on leadership managing smart parking facilities, luxury valet fleets, and high-volume traffic choreography across premier Egyptian venues, luxury hotels, commercial hubs, and mega-events.'
      },
      highlights: [
        {
          ar: 'إشراف مباشر على أكثر من 150+ مشرف تشغيل وكادر ميداني معتمد في مصر.',
          en: 'Direct operational command over 150+ certified supervisors and field attendants.'
        },
        {
          ar: 'تطبيق بروتوكولات الفاليه الفندقي الفاخر وضمان صفر حوادث بنسبة أمان 100%.',
          en: 'Deployment of luxury hospitality valet protocols with verified 100% safety standards.'
        },
        {
          ar: 'إدارة تشغيلية متقدمة لبوابات LPR الذكية وتوجيه المداخل لمنع التكدس.',
          en: 'Advanced operational management of smart LPR gates and zero-bottleneck ingress.'
        },
        {
          ar: 'تنسيق لوجستي للفعاليات والمؤتمرات الوطنية والدولية الكبرى.',
          en: 'Full logistic coordination for high-profile national and international conventions.'
        }
      ],
      responsibilities: [
        {
          ar: 'تخطيط وتوزيع الورديات الميدانية (24/7) وضمان الجاهزية الكاملة لكل موقع.',
          en: 'Round-the-clock shift allocation ensuring peak operational readiness across all venues.'
        },
        {
          ar: 'مراقبة جودة الخدمة واستلام وتسليم المركبات بنظام رقمي موثق بالكامل.',
          en: 'Quality control oversight for digital check-in and delivery with zero delay.'
        },
        {
          ar: 'التدريب المستمر للأطقم الميدانية على أصول الضيافة والسلامة وإدارة الأزمات.',
          en: 'Continuous staff briefing on luxury guest hospitality, safety, and rapid escalation.'
        },
        {
          ar: 'التنسيق اللحظي مع إدارات المنشآت لضمان مطابقة متطلبات الأمن والسلامة.',
          en: 'Live coordination with venue facility heads matching all regulatory and safety standards.'
        }
      ],
      supervisedSectors: [
        {
          ar: 'الفنادق والمنتجعات الفاخرة (Luxury Hospitality & Resorts)',
          en: 'Luxury Hospitality & Resorts'
        },
        {
          ar: 'المراكز التجارية والمولات الكبرى (Retail & Commercial Malls)',
          en: 'Retail & Commercial Malls'
        },
        {
          ar: 'المجمعات الطبية والمستشفيات (Healthcare Facilities)',
          en: 'Healthcare Facilities'
        },
        {
          ar: 'المجتمعات السكنية المغلقة (Residential Compounds)',
          en: 'Residential Compounds'
        },
        {
          ar: 'المعارض والمؤتمرات الحية (Mega Events & Expos)',
          en: 'Mega Events & Expos'
        }
      ]
    }
  ];

  // Deep-link check for #team-alaa-ali
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#team-alaa-ali' || hash === '#team/alaa-ali') {
        setSelectedMember(teamMembers[0]);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const openMemberModal = (member: TeamMember) => {
    setSelectedMember(member);
    window.history.pushState(null, '', `#team-${member.id}`);
  };

  const closeMemberModal = () => {
    setSelectedMember(null);
    window.history.pushState(null, '', '#team');
  };

  return (
    <section id="team" className="py-20 md:py-28 bg-brand-cool-white text-brand-slate relative overflow-hidden border-b border-brand-light-border">
      {/* Decorative Subtle Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-light/70 rounded-full blur-3xl pointer-events-none" />

      {/* ============================================================== */}
      {/* Detail Page / Modal: Comprehensive Information on Demand       */}
      {/* ============================================================== */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl w-full bg-white rounded-3xl shadow-2xl border border-brand-light-border/80 overflow-hidden flex flex-col max-h-[92vh] text-brand-slate"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between p-4 sm:p-6 bg-brand-navy text-white border-b border-brand-navy-dark">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-sky/20 border border-brand-sky/40 flex items-center justify-center text-brand-sky">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-wider text-brand-sky uppercase font-bold block">
                      OPERATIONAL LEADERSHIP PROFILE
                    </span>
                    <h3 className="font-heading font-extrabold text-base sm:text-xl text-white">
                      {selectedMember.name[language]}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={closeMemberModal}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none"
                  aria-label="Close Profile"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content Body */}
              <div className="p-5 sm:p-8 overflow-y-auto space-y-6">
                
                {/* Hero Profile Overview Card */}
                <div className="p-6 bg-gradient-to-br from-brand-cool-white to-brand-light/40 rounded-2xl border border-brand-light-border/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary text-white text-xs font-bold font-mono">
                      <ShieldCheck className="w-3.5 h-3.5 text-brand-sky" />
                      <span>{selectedMember.roleTag[language]}</span>
                    </div>

                    <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-brand-slate">
                      {selectedMember.name[language]}
                    </h2>

                    <p className="text-sm sm:text-base font-semibold text-brand-primary">
                      {selectedMember.title[language]}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-brand-muted pt-1">
                      <span className="flex items-center gap-1.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-brand-primary" />
                        {selectedMember.location[language]}
                      </span>
                      <span className="flex items-center gap-1.5 font-medium">
                        <Clock className="w-3.5 h-3.5 text-brand-primary" />
                        {language === 'ar' ? `خبرة تشغيلية ${selectedMember.experienceYears} عاماً` : `${selectedMember.experienceYears} Years Operations Experience`}
                      </span>
                      <a
                        href={`mailto:${selectedMember.email}`}
                        className="flex items-center gap-1.5 font-medium text-brand-primary hover:underline"
                        dir="ltr"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>{selectedMember.email}</span>
                      </a>
                    </div>
                  </div>

                  {/* Contact Direct Pill Buttons */}
                  <div className="flex flex-col gap-2.5 w-full sm:w-auto shrink-0">
                    <a
                      href={`tel:${selectedMember.mobile}`}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-brand-primary hover:bg-brand-navy-dark text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:-translate-y-0.5"
                    >
                      <Phone className="w-4 h-4" />
                      <span dir="ltr">01278761141</span>
                    </a>

                    <a
                      href={`https://wa.me/2${selectedMember.mobile}?text=${encodeURIComponent(
                        language === 'ar'
                          ? `مرحبًا أ. علاء علي، أود الاستفسار عن مقترح تشغيلي لمنشأتنا عبر PVC SMART SERVICES.`
                          : `Hello Mr. Alaa Ali, I would like to inquire about an operational scope via PVC SMART SERVICES.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:-translate-y-0.5"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{language === 'ar' ? 'محادثة واتساب مباشرة' : 'Direct WhatsApp Chat'}</span>
                    </a>
                  </div>
                </div>

                {/* Professional Bio */}
                <div className="space-y-2.5">
                  <h4 className="font-heading text-lg font-bold text-brand-slate flex items-center gap-2">
                    <Award className="w-5 h-5 text-brand-primary" />
                    <span>{language === 'ar' ? 'النبذة المهنية والخبرات' : 'Professional Biography'}</span>
                  </h4>
                  <p className="text-sm text-brand-muted leading-relaxed bg-brand-cool-white p-5 rounded-2xl border border-brand-light-border/80">
                    {selectedMember.bio[language]}
                  </p>
                </div>

                {/* 2-Column Grid: Core Highlights & Operational Mandates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Highlights */}
                  <div className="space-y-3 p-5 rounded-2xl bg-brand-cool-white border border-brand-light-border/80">
                    <h4 className="font-heading text-base font-bold text-brand-slate flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-brand-primary" />
                      <span>{language === 'ar' ? 'أبرز الإنجازات الميدانية' : 'Key Field Achievements'}</span>
                    </h4>
                    <div className="space-y-2.5">
                      {selectedMember.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-brand-slate leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                          <span>{item[language]}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Core Responsibilities */}
                  <div className="space-y-3 p-5 rounded-2xl bg-brand-cool-white border border-brand-light-border/80">
                    <h4 className="font-heading text-base font-bold text-brand-slate flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-brand-primary" />
                      <span>{language === 'ar' ? 'المسؤوليات التشغيلية المباشرة' : 'Operational Mandates'}</span>
                    </h4>
                    <div className="space-y-2.5">
                      {selectedMember.responsibilities.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-brand-slate leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                          <span>{item[language]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Supervised Sectors */}
                <div className="space-y-3 p-5 rounded-2xl bg-brand-light/50 border border-brand-light-border/80">
                  <h4 className="font-heading text-base font-bold text-brand-slate flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-brand-primary" />
                    <span>{language === 'ar' ? 'القطاعات الخاضعة للإشراف الميداني في مصر' : 'Supervised Venue Sectors'}</span>
                  </h4>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {selectedMember.supervisedSectors.map((sector, idx) => (
                      <span
                        key={idx}
                        className="px-3.5 py-1.5 rounded-full bg-white border border-brand-light-border text-xs font-semibold text-brand-slate shadow-xs"
                      >
                        {sector[language]}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Modal Footer Bar */}
              <div className="p-4 sm:p-5 border-t border-brand-light-border bg-brand-cool-white flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-brand-muted font-medium text-center sm:text-start">
                  {language === 'ar'
                    ? 'لترتيب اجتماع تشغيلي أو معاينة موقع، تواصل مباشرة مع الإدارة الميدانية.'
                    : 'To arrange a field inspection or operations briefing, connect directly with operations leadership.'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={closeMemberModal}
                    className="px-6 py-2.5 rounded-full bg-white hover:bg-brand-light-border border border-brand-light-border text-xs font-bold text-brand-slate transition-colors"
                  >
                    {language === 'ar' ? 'إغلاق' : 'Close'}
                  </button>
                  <a
                    href="#contact"
                    onClick={closeMemberModal}
                    className="px-6 py-2.5 rounded-full bg-brand-primary hover:bg-brand-navy-dark text-white text-xs font-bold transition-all shadow-md"
                  >
                    {language === 'ar' ? 'طلب مقترح تشغيلي ↗' : 'Request Operational Scope ↗'}
                  </a>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================== */}
      {/* Main Section Content: Simple, Fast to Read, Mobile-Friendly     */}
      {/* ============================================================== */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <SectionHeading
          tag={language === 'ar' ? '05 — فريق القيادة والتشغيل' : '05 — LEADERSHIP TEAM'}
          titlePart1={
            language === 'ar' ? 'القيادة التشغيلية الميدانية' : 'Operational Field Leadership'
          }
          className="mb-8"
        />

        {/* Clean, Simple Leadership Card: Mr. Alaa Ali */}
        <div className="mt-6 flex justify-center">
          {teamMembers.map((member) => (
            <article
              key={member.id}
              className="w-full max-w-2xl bg-white border border-brand-light-border/80 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 text-start"
            >
              {/* Profile Top Row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-brand-light-border">
                <div className="flex items-center gap-4">
                  {/* Monogram/Avatar */}
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-brand-navy to-brand-primary text-white flex items-center justify-center font-heading font-black text-xl sm:text-2xl shadow-md shrink-0">
                    <span>ع.ع</span>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-brand-sky border-2 border-white flex items-center justify-center text-brand-navy shadow-xs">
                      <ShieldCheck className="w-3 h-3" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-brand-light text-brand-primary ${isRTL ? 'font-sans' : 'font-mono tracking-wider uppercase'}`}>
                        {member.roleTag[language]}
                      </span>
                      <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {language === 'ar' ? 'متاح ميدانياً' : 'Active'}
                      </span>
                    </div>

                    <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-brand-slate">
                      {member.name[language]}
                    </h3>

                    <p className="text-xs sm:text-sm font-semibold text-brand-primary">
                      {member.title[language]}
                    </p>
                  </div>
                </div>

                {/* Quick Call & WhatsApp Pills */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <a
                    href={`tel:${member.mobile}`}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-brand-light hover:bg-brand-primary text-brand-slate hover:text-white border border-brand-light-border text-xs font-bold transition-all"
                    title={member.mobile}
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-primary group-hover:text-white" />
                    <span dir="ltr">01278761141</span>
                  </a>

                  <a
                    href={`https://wa.me/2${member.mobile}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 text-xs font-bold transition-all"
                    title="WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600 group-hover:text-white" />
                    <span>{language === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
                  </a>
                </div>
              </div>

              {/* Simple Bottom Row: Detail Button Only */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-brand-muted">
                  {language === 'ar' ? 'خبرة 12+ عاماً في إدارة المواقف والفاليه في مصر' : '12+ Years Operations Leadership in Egypt'}
                </span>

                <button
                  onClick={() => openMemberModal(member)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-brand-primary hover:bg-brand-navy-dark text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md hover:-translate-y-0.5"
                >
                  <span>{language === 'ar' ? 'عرض التفاصيل والمهام ↗' : 'View Full Details ↗'}</span>
                  <ArrowUpRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
