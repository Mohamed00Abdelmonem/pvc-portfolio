import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ar' | 'en';

interface TranslationContent {
  meta: {
    title: string;
    description: string;
  };
  topline: string;
  brand: {
    name: string;
    smart: string;
    tagline: string;
    seal: string;
    sealSub: string;
  };
  nav: {
    home: string;
    about: string;
    services: string;
    principles: string;
    sectors: string;
    team: string;
    approach: string;
    contact: string;
    cta: string;
    languageSwitch: string;
  };
  hero: {
    tag: string;
    eyebrow: string;
    headlinePart1: string;
    headlinePart2: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scrollHint: string;
    counter: string;
    ticker: string;
  };
  about: {
    tag: string;
    eyebrow: string;
    titlePart1: string;
    titlePart2: string;
    lead: string;
    paragraph1: string;
    paragraph2: string;
    quote: string;
    focusPoints: {
      title: string;
      desc: string;
    }[];
  };
  servicesOverview: {
    tag: string;
    eyebrow: string;
    titlePart1: string;
    titlePart2: string;
    lead: string;
  };
  services: {
    tag: string;
    eyebrow: string;
    titlePart1: string;
    titlePart2: string;
    lead: string;
    list: {
      id: string;
      number: string;
      enLabel: string;
      title: string;
      subtitle: string;
      description: string;
      note?: string;
      highlights: string[];
    }[];
  };
  principles: {
    tag: string;
    eyebrow: string;
    title: string;
    lead: string;
    items: {
      number: string;
      title: string;
      desc: string;
      detail: string;
    }[];
  };
  sectors: {
    tag: string;
    eyebrow: string;
    titlePart1: string;
    titlePart2: string;
    lead: string;
    items: {
      id: string;
      number: string;
      title: string;
      enTitle: string;
      desc: string;
    }[];
  };
  approach: {
    tag: string;
    eyebrow: string;
    titlePart1: string;
    titlePart2: string;
    lead: string;
    steps: {
      number: string;
      title: string;
      englishName: string;
      desc: string;
      subtext: string;
    }[];
  };
  ctaBanner: {
    watermark: string;
    eyebrow: string;
    titlePart1: string;
    titlePart2: string;
    lead: string;
    cta: string;
    directLine: string;
  };
  contact: {
    tag: string;
    eyebrow: string;
    titlePart1: string;
    titlePart2: string;
    lead: string;
    cards: {
      phone: { label: string; value: string; display: string };
      email: { label: string; value: string };
      website: { label: string; value: string };
      address?: { label: string; value: string };
    };
    form: {
      heading: string;
      serviceInterest: string;
      selectService: string;
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      phoneLabel: string;
      phonePlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      submitBtn: string;
      disclaimer: string;
      errors: {
        name: string;
        email: string;
        message: string;
      };
    };
  };
  footer: {
    summary: string;
    quickLinks: string;
    servicesTitle: string;
    directContact: string;
    address?: string;
    rights: string;
    backToTop: string;
  };
}

const contentData: Record<Language, TranslationContent> = {
  ar: {
    meta: {
      title: 'PVC SMART SERVICES — تشغيل يرتقي بالتجربة | حلول مواقف وضيافة متكاملة',
      description: 'شريكك المتخصص في صف السيارات، إدارة المواقف، خدمات الباجي، تنظيم حركة المرور والعناية بالمركبات بأعلى معايير الاحترافية والسلامة.'
    },
    topline: 'حلول تشغيل ذكية وتجربة أكثر سلاسة لمواقعكم ومنشآتكم',
    brand: {
      name: 'PVC',
      smart: 'SMART SERVICES',
      tagline: 'احترافية · تنظيم · ذكاء',
      seal: 'تشغيل ذكي',
      sealSub: 'بمعايير عالمية'
    },
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      services: 'خدماتنا',
      principles: 'لماذا PVC',
      sectors: 'القطاعات',
      team: 'فريق العمل',
      approach: 'منهجيتنا',
      contact: 'اتصل بنا',
      cta: 'اطلب عرضًا ↗',
      languageSwitch: 'English'
    },
    hero: {
      tag: 'PVC SMART SERVICES',
      eyebrow: 'شريكك في التشغيل والخدمات',
      headlinePart1: 'تشغيل يرتقي',
      headlinePart2: 'بالتجربة.',
      lead: 'حلول متكاملة لصف السيارات وإدارة المواقف والعناية بالمركبات، تُقدّم باحترافية ودقة وعناية تضع راحة ضيوفكم وسلامة منشآتكم في المقام الأول.',
      ctaPrimary: 'اطلب عرض خدمة',
      ctaSecondary: 'استكشف خدماتنا',
      scrollHint: 'اسحب للأسفل للاستكشاف',
      counter: '01 / 05',
      ticker: 'حلول تشغيلية متكاملة للفنادق والكمبوندات والمراكز الكبرى'
    },
    about: {
      tag: '01 — من نحن',
      eyebrow: 'A PARTNER YOU CAN RELY ON',
      titlePart1: 'كل تفصيلة تصنع',
      titlePart2: 'فرقًا حقيقيًا.',
      lead: 'في PVC SMART SERVICES، نقدم حلول تشغيل وخدمات متكاملة تساعد المواقع والمنشآت على العمل بكفاءة، وتمنح الزوار تجربة أكثر راحة وتنظيمًا.',
      paragraph1: 'نؤمن أن الخدمة المميزة تبدأ بفريق مستعد وواعٍ بمسؤوليته. لذلك نهتم بالتدريب والتوجيه المسبق، ووضوح إجراءات التشغيل، والتواصل الفعال، مع الالتزام التام بإرشادات السلامة والتعامل المسؤول مع المركبات والزوار.',
      paragraph2: 'سواء في أوقات الذروة اليومية أو الفعاليات الاستثنائية، نضمن لشركائنا حضورًا تنفيذيًا يمثل علامتهم التجارية بأرقى صورة تشغيلية مشرفة.',
      quote: 'التشغيل المنظم ليس مجرد حركة مركبات، بل هو الانطباع الأول والأخير لزوار موقعك.',
      focusPoints: [
        {
          title: 'جاهزية الفريق والتوجيه المسبق',
          desc: 'تدريب دوري وتنسيق يومي قبل بدء العمل لضمان تطبيق دقيق للإجراءات القياسية.'
        },
        {
          title: 'إجراءات سلامة معتمدة',
          desc: 'معايير واضحة لحركة السير، التعامل الآمن مع المركبات، وتأمين تدفق المشاة.'
        },
        {
          title: 'تجربة ضيوف استثنائية',
          desc: 'لباقة في الاستقبال، دقة في المواعيد، واحترافية متسقة تعكس فخامة الموقع.'
        }
      ]
    },
    servicesOverview: {
      tag: '02 — خدماتنا المتكاملة',
      eyebrow: 'WHAT WE DO WITH EXCELLENCE',
      titlePart1: 'خدمات متكاملة.',
      titlePart2: 'معايير موحدة.',
      lead: 'من استقبال المركبة إلى تنظيم حركة الموقع، نصمم خدماتنا لتتكامل مع الطبيعة التشغيلية لكل منشأة بدقة واحترافية.'
    },
    services: {
      tag: '02 — خدماتنا المتكاملة',
      eyebrow: 'WHAT WE DO WITH EXCELLENCE',
      titlePart1: 'خدمات متكاملة.',
      titlePart2: 'معايير موحدة.',
      lead: 'من استقبال المركبة إلى تنظيم حركة الموقع، نصمم خدماتنا لتتكامل مع الطبيعة التشغيلية لكل منشأة.',
      list: [
        {
          id: 'valet',
          number: '01',
          enLabel: 'VALET PARKING',
          title: 'صف السيارات',
          subtitle: 'ترحيب يليق بضيوفك وتجربة استقبال لا تُنسى.',
          description: 'خدمة صف سيارات منظمة تبدأ باستلام واضح وموثق للمركبة وتنتهي بتسليمها للعميل باحترافية وسرعة. نركز على التدريب المسبق، ومعايير السلامة المرورية، والتعامل المسؤول مع المركبات، وتسهيل كافة إجراءات الاستلام والتسليم لضمان راحة زوارك.',
          highlights: [
            'استقبال وترحيب يعكس هوية وفخامة الموقع ودفء الضيافة',
            'تسليم واستلام منظم وموثق للمركبات بمفاتيح محفوظة بأمان',
            'فريق مدرب على القيادة الآمنة والتعامل الراقي مع أحدث طرازات السيارات'
          ]
        },
        {
          id: 'parking',
          number: '02',
          enLabel: 'PARKING MANAGEMENT',
          title: 'إدارة المواقف',
          subtitle: 'حركة منظمة، كفاءة مكانية، ووقت انتظار أقل.',
          description: 'تنظيم شامل لحركة المركبات داخل المنشأة، وتسهيل إجراءات الدخول والخروج، وتوضيح مسارات الحركة، ودعم التسليم الآمن وتقليل زمن الانتظار والبحث عن موقف. يمكن دعم الدفع بالباركود أو QR عند توفر النظام المخصص وربطه فعليًا.',
          note: 'دعم أنظمة الدفع الرقمية والباركود وQR يكون متاحًا عند توفر النظام الإلكتروني للموقع وربطه تقنيًا.',
          highlights: [
            'إدارة مداخل ومخارج المواقف بانسيابية تمنع الاختناقات المرورية',
            'توجيه السائقين للأماكن الشاغرة لتحسين استغلال الطاقة الاستيعابية',
            'جاهزية تقنية للتكامل مع أنظمة الدفع الرقمية والباركود عند توفرها'
          ]
        },
        {
          id: 'carwash',
          number: '03',
          enLabel: 'CAR WASHING & VEHICLE CARE',
          title: 'غسيل وعناية السيارات',
          subtitle: 'عناية فائقة تبرز جمال ونظافة المركبة أثناء تواجد الضيف.',
          description: 'نقدم خدمات غسيل السيارات الاحترافية باهتمام بالغ بالتفاصيل، مع التركيز على النظافة العميقة والعناية بطلاء السيارة ومقصورتها، والالتزام الصارم بمعايير الجودة والسلامة ومواد التنظيف الصديقة للأسطح.',
          highlights: [
            'غسيل الهيكل الخارجي بمواد متخصصة تحمي الطلاء واللمعان',
            'تنظيف وتطهير المقصورة الداخلية والمقاعد بدقة وعناية',
            'خدمات التنظيف والتلميع الإضافية حسب النطاق المتاح في الموقع',
            'فريق مدرّب ومعدات متطورة تضمن كفاءة الاستهلاك والنظافة التامة'
          ]
        },
        {
          id: 'buggy',
          number: '04',
          enLabel: 'BUGGY SERVICES',
          title: 'خدمات الباجي',
          subtitle: 'تنقل هادئ وفاخر داخل المنشآت والمساحات الشاسعة.',
          description: 'نقل الزوار بعربات الباجي الكهربائية الحديثة داخل المنشآت والفنادق والمنتجعات والمجمعات الكبرى والمواقع المخصصة، مع التركيز التام على راحة الضيوف، التنظيم الزمني، والالتزام الصارم بتعليمات التشغيل والسلامة على الممرات.',
          highlights: [
            'تنقل سلس وهادئ للنزلاء وكبار الشخصيات والضيوف داخل أروقة الموقع',
            'تغطية شاملة ومجدولة لمسارات المنتجع أو المجمع المترامي الأطراف',
            'سائقون مدربون على بروتوكولات الضيافة والقيادة الآمنة بين المشاة'
          ]
        },
        {
          id: 'traffic',
          number: '05',
          enLabel: 'TRAFFIC MANAGEMENT',
          title: 'تنظيم حركة المرور',
          subtitle: 'انسيابية تبدأ من أول مدخل وتستمر حتى المغادرة.',
          description: 'تنظيم تدفق المركبات وتوجيه الحركة عند المداخل والمخارج والتقاطعات الداخلية للموقع بما يدعم الانسيابية، يحد من الازدحام في أوقات الذروة، ويحافظ على أمن المشاة وسلامة الجميع.',
          highlights: [
            'توجيه حركة السير بكفاءة خلال أوقات الذروة والمناسبات الكبرى',
            'منع تكدس السيارات عند بوابات الوصول ونقاط الإنزال والاستلام',
            'تنسيق مروري مستمر يضمن أولوية وسلامة عبور المشاة والزوار'
          ]
        }
      ]
    },
    principles: {
      tag: '03 — ركائزنا',
      eyebrow: 'CORE OPERATING PRINCIPLES',
      title: 'معايير ثنائية: انضباط تشغيلي وأناقة في التنفيذ',
      lead: 'ثلاثة مبادئ أساسية توجه كل قرار وتفصيلة ميدانية في عملياتنا اليومية.',
      items: [
        {
          number: '01',
          title: 'الجودة',
          desc: 'اهتمام بالتفاصيل وثبات في مستوى الخدمة.',
          detail: 'من مظهر الطاقم وأسلوب التحية إلى دقة التسليم، نضمن مستوى خدمة موحد لا يتراجع.'
        },
        {
          number: '02',
          title: 'السلامة',
          desc: 'إجراءات واضحة وتوجيه مناسب للفريق.',
          detail: 'قيادة مسؤولة، فحص دقيق للمركبات، والتزام صارم ببروتوكولات السلامة المرورية والوقاية.'
        },
        {
          number: '03',
          title: 'التشغيل الذكي',
          desc: 'تنظيم عملي يسهّل حركة المركبات والزوار.',
          detail: 'توزيع لوجستي مدروس للكوادر والممرات يمنع التكدس ويقلل فترات الانتظار إلى الحد الأدنى.'
        }
      ]
    },
    sectors: {
      tag: '04 — القطاعات التي نخدمها',
      eyebrow: 'BUILT AROUND YOUR PROPERTY',
      titlePart1: 'حلول تشغيلية تناسب',
      titlePart2: 'طبيعة موقعك.',
      lead: 'نصمم نطاق الخدمة وفق طبيعة المكان وحركة الزوار ومتطلبات التشغيل الفريدة لكل قطاع.',
      items: [
        {
          id: 'hospitality',
          number: '01',
          title: 'الفنادق والضيافة',
          enTitle: 'Hotels & Hospitality',
          desc: 'خدمات صف سيارات ونقل باجي راقية تعكس معايير الترحيب الفندقي الفاخر وتترك انطباعًا أوليًا مبهرًا.'
        },
        {
          id: 'retail',
          number: '02',
          title: 'المراكز التجارية والمولات',
          enTitle: 'Retail & Shopping Malls',
          desc: 'إدارة مواقف وتنظيم حركة ذكي لاستيعاب الكثافات العالية وتسهيل وصول المتسوقين ومغادرتهم بسلاسة.'
        },
        {
          id: 'medical',
          number: '03',
          title: 'المستشفيات والمراكز الطبية',
          enTitle: 'Hospitals & Medical Centers',
          desc: 'خدمة صف سيارات سريعة ومراعية للمرضى وكبار السن، مع الحفاظ على ممرات الطوارئ مفتوحة وميسرة.'
        },
        {
          id: 'residential',
          number: '04',
          title: 'المجتمعات السكنية والكمبوندات',
          enTitle: 'Residential Compounds',
          desc: 'تنظيم مواقف المقيمين والزوار بعناية وهدوء يعززان أمان وخصوصية المجمع السكني على مدار الساعة.'
        },
        {
          id: 'corporate',
          number: '05',
          title: 'المقار والشركات',
          enTitle: 'Corporate Facilities',
          desc: 'تشغيل مواقف مخصص للموظفين وكبار التنفيذيين والضيوف مع انضباط زمني تام وسرعة استجابة.'
        },
        {
          id: 'events',
          number: '06',
          title: 'الفعاليات والمناسبات الكبرى',
          enTitle: 'Events & Venues',
          desc: 'إدارة تدفقات استثنائية وخدمات صف سيارات واسعة النطاق للمؤتمرات والاحتفالات الجماهيرية الكبرى.'
        }
      ]
    },
    approach: {
      tag: '05 — منهجيتنا',
      eyebrow: 'STRUCTURED OPERATIONAL FRAMEWORK',
      titlePart1: 'منهج واضح.',
      titlePart2: 'تنفيذ منظم.',
      lead: 'نبدأ بفهم طبيعة الموقع واحتياجاته، ثم نجهز خطة تشغيل مناسبة ونعمل على متابعة الأداء وتحسين التجربة خطوة بخطوة.',
      steps: [
        {
          number: '01',
          title: 'نفهم',
          englishName: 'UNDERSTAND',
          desc: 'نستمع لاحتياجاتك ونفهم طبيعة الموقع، حجم التدفق المتوقع، والخصائص التشغيلية.',
          subtext: 'دراسة ميدانية دقيقة للمداخل والمسارات وأوقات الذروة.'
        },
        {
          number: '02',
          title: 'نخطط',
          englishName: 'PLAN',
          desc: 'نحدد نطاق الخدمة، آليات التشغيل، جداول المناوبات، ومعايير السلامة المطلوبة.',
          subtext: 'خطة تشغيلية مفصلة تحدد مهام الفريق وتوزيع النقاط الحيوية.'
        },
        {
          number: '03',
          title: 'نشغّل',
          englishName: 'LAUNCH',
          desc: 'نجهز الفريق بالتدريب والتوجيه المسبق، ونبدأ التشغيل بتنسيق وإشراف ميداني مباشر.',
          subtext: 'جاهزية كاملة للمعدات، الزي الموحد، وأجهزة التنسيق والتواصل.'
        },
        {
          number: '04',
          title: 'نتابع',
          englishName: 'REVIEW',
          desc: 'نتابع مؤشرات الأداء، نحرص على ثبات جودة التجربة، ونراجع فرص التطوير باستمرار.',
          subtext: 'تقييم مستمر لملاحظات الزوار وكفاءة التدفق لتحقيق تحسين مستمر.'
        }
      ]
    },
    ctaBanner: {
      watermark: 'PVC',
      eyebrow: 'لنبدأ الحديث',
      titlePart1: 'لديك موقع يحتاج',
      titlePart2: 'تشغيلًا أفضل؟',
      lead: 'شاركنا متطلبات منشأتك، ودعنا نناقش كيف يمكن لخدمات PVC الذكية أن ترتقي بتجربة زوارك وكفاءة عملياتك.',
      cta: 'تواصل مع فريقنا ↗',
      directLine: 'تواصل فوري ومباشر عبر واتساب'
    },
    contact: {
      tag: '06 — اتصل بنا',
      eyebrow: 'GET IN TOUCH',
      titlePart1: 'يسعدنا أن',
      titlePart2: 'نسمع منك.',
      lead: 'سواء كنت تبحث عن خدمة محددة أو شريك تشغيل متكامل، فريق PVC SMART SERVICES جاهز لمناقشة احتياجاتك وتصميم المقترح التشغيلي الأنسب.',
      cards: {
        phone: { label: 'الهاتف / واتساب', value: '+201020485598', display: '+20 102 048 5598' },
        email: { label: 'البريد الإلكتروني', value: 'info@pvcsmartservices.com' },
        website: { label: 'الموقع الإلكتروني', value: 'pvcsmartservices.com' },
        address: { label: 'المقر الرئيسي والعنوان', value: 'مكتب ( 02 ) بالوحدة رقم ( 201 ) بالطابق الثاني – العقار 38 حي الملتقى العربي – شيراتون المطار – النزهة - القاهرة' }
      },
      form: {
        heading: 'طلب مقترح تشغيلي / استفسار مباشر',
        serviceInterest: 'الخدمة المطلوبة',
        selectService: 'اختر الخدمة أو الحل المطلوب',
        nameLabel: 'الاسم الكريم',
        namePlaceholder: 'اكتب اسمك الكامل أو اسم جهتك',
        emailLabel: 'البريد الإلكتروني',
        emailPlaceholder: 'name@company.com',
        phoneLabel: 'رقم الهاتف (اختياري)',
        phonePlaceholder: '+20 ...',
        messageLabel: 'تفاصيل الموقع والاحتياجات',
        messagePlaceholder: 'وضح لنا طبيعة المنشأة، موقعها، والخدمات المرغوبة أو أي تفاصيل تشغيلية خاصة...',
        submitBtn: 'إرسال الطلب عبر واتساب ↗',
        disclaimer: 'سيتم تحويل بيانات رسالتك وفتح محادثة واتساب الرسمية مباشرة مع فريق العمل لمتابعة طلبك فورًا.',
        errors: {
          name: 'يرجى إدخال الاسم',
          email: 'يرجى إدخال بريد إلكتروني صالح',
          message: 'يرجى كتابة تفاصيل رسالتك أو استفسارك'
        }
      }
    },
    footer: {
      summary: 'إدارة ذكية وتشغيل منظم لتجربة أسهل وأكثر رقيًا في منشآتكم ومواقعكم.',
      quickLinks: 'روابط الوصول السريع',
      servicesTitle: 'الخدمات التشغيلية',
      directContact: 'التواصل المباشر',
      address: 'مكتب ( 02 ) بالوحدة رقم ( 201 ) بالطابق الثاني – العقار 38 حي الملتقى العربي – شيراتون المطار – النزهة - القاهرة',
      rights: 'جميع الحقوق محفوظة.',
      backToTop: 'العودة للأعلى ↑'
    }
  },
  en: {
    meta: {
      title: 'PVC SMART SERVICES — Smart Operations & Premier Valet | Integrated Hospitality & Parking',
      description: 'Your trusted partner in valet parking, parking facility management, buggy transit, traffic coordination, and professional vehicle care operations.'
    },
    topline: 'Smart operations. Seamless experiences for premier properties and venues.',
    brand: {
      name: 'PVC',
      smart: 'SMART SERVICES',
      tagline: 'PROFESSIONAL · ORGANIZED · SMART',
      seal: 'SMART OPS',
      sealSub: 'BY DESIGN'
    },
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      principles: 'Why PVC',
      sectors: 'Sectors',
      team: 'Leadership',
      approach: 'Approach',
      contact: 'Contact',
      cta: 'Request a Proposal ↗',
      languageSwitch: 'العربية'
    },
    hero: {
      tag: 'PVC SMART SERVICES',
      eyebrow: 'YOUR PARTNER IN OPERATIONS & SERVICES',
      headlinePart1: 'Operations Beyond',
      headlinePart2: 'Expectations.',
      lead: 'Integrated parking, valet and vehicle-care services delivered with professionalism, precision and care — prioritizing guest ease and operational safety.',
      ctaPrimary: 'Request a Proposal',
      ctaSecondary: 'Explore Services',
      scrollHint: 'Scroll to explore',
      counter: '01 / 05',
      ticker: 'INTEGRATED OPERATIONAL SOLUTIONS FOR PREMIER VENUES'
    },
    about: {
      tag: '01 — WHO WE ARE',
      eyebrow: 'A PARTNER YOU CAN RELY ON',
      titlePart1: 'Every detail makes',
      titlePart2: 'a tangible difference.',
      lead: 'At PVC SMART SERVICES, we deliver integrated operational and service solutions that help properties run efficiently and give every visitor a smoother, more organized experience.',
      paragraph1: 'We believe great service starts with a prepared team. We focus on briefing and training, clear operating procedures, effective communication and responsible vehicle and visitor handling.',
      paragraph2: 'Whether during peak business hours or high-attendance signature events, we provide our partners with an on-site presence that reflects their property at the highest standard.',
      quote: 'Organized operations are not merely vehicle motion; they are the decisive first and lasting impression of your property.',
      focusPoints: [
        {
          title: 'Prepared Teams & Pre-Shift Briefings',
          desc: 'Rigorous daily coordination and procedural alignment prior to every active shift.'
        },
        {
          title: 'Strict Safety Procedures',
          desc: 'Verified road safety standards, conscientious vehicle handling, and pedestrian protection.'
        },
        {
          title: 'Exceptional Guest Experience',
          desc: 'Courteous reception, timely execution, and consistent hospitality-grade etiquette.'
        }
      ]
    },
    servicesOverview: {
      tag: '02 — INTEGRATED SERVICES',
      eyebrow: 'WHAT WE DO WITH EXCELLENCE',
      titlePart1: 'Integrated services.',
      titlePart2: 'One clear standard.',
      lead: 'From welcoming vehicles to coordinating complex site traffic, our services are designed around each property’s operational character.'
    },
    services: {
      tag: '02 — FIVE SPECIALIZED DISCIPLINES',
      eyebrow: 'WHAT WE DO WITH EXCELLENCE',
      titlePart1: 'Integrated services.',
      titlePart2: 'One clear standard.',
      lead: 'From welcoming vehicles to coordinating complex site traffic, our services are designed around each property’s operational character.',
      list: [
        {
          id: 'valet',
          number: '01',
          enLabel: 'VALET PARKING',
          title: 'Valet Parking',
          subtitle: 'A refined welcome that reflects the stature of your venue.',
          description: 'A structured valet experience, from clear vehicle handover to professional return. Our focus is team briefing, road-safety practices, responsible vehicle handling and a smooth, effortless guest journey.',
          highlights: [
            'Polished front-of-house arrival reflecting host property luxury',
            'Structured, documented key management and secure vehicle handover',
            'Briefed personnel trained in courteous conduct and luxury vehicle maneuvering'
          ]
        },
        {
          id: 'parking',
          number: '02',
          enLabel: 'PARKING MANAGEMENT',
          title: 'Parking Management',
          subtitle: 'Coordinated flow, maximized capacity, reduced dwell times.',
          description: 'Coordinating vehicle movement, simplifying entry and exit, clarifying traffic routes and supporting safe handover. Barcode or QR payment can be supported when the relevant system is available and integrated.',
          note: 'Barcode or QR payment capability is supported when the property has the relevant electronic system available and integrated.',
          highlights: [
            'Coordinated ingress and egress protocols to prevent perimeter queueing',
            'Dynamic driver guidance minimizing search delays and optimizing space usage',
            'Technical readiness for seamless barcode and QR digital validation integration'
          ]
        },
        {
          id: 'carwash',
          number: '03',
          enLabel: 'CAR WASHING & VEHICLE CARE',
          title: 'Car Washing & Care',
          subtitle: 'Meticulous detailing while guests conduct their business or leisure.',
          description: 'We provide professional car washing with attention to detail, focusing on cleanliness, vehicle care and consistent quality and safety practices with paint-friendly specialty materials.',
          highlights: [
            'Exterior body washing using pH-neutral, clear-coat safe cleaning compounds',
            'Deep cabin sanitization, upholstery vacuuming, and detailed surface wiping',
            'Supplemental detailing and glass polishing subject to site availability',
            'Conscientious water and resource stewardship with zero mess left on site'
          ]
        },
        {
          id: 'buggy',
          number: '04',
          enLabel: 'BUGGY SERVICES',
          title: 'Buggy Services',
          subtitle: 'Effortless, dignified mobility across expansive campuses.',
          description: 'Visitor transportation by buggy within properties, hotels, resorts and designated areas, with a focus on comfort, organization and operating safety across pedestrian and cart pathways.',
          highlights: [
            'Quiet, electric guest shuttles between villas, lobbies, and amenities',
            'Punctual, routed connectivity across large-scale master planned grounds',
            'Certified buggy chauffeurs trained in spatial safety and guest hospitality'
          ]
        },
        {
          id: 'traffic',
          number: '05',
          enLabel: 'TRAFFIC MANAGEMENT',
          title: 'Traffic Management',
          subtitle: 'Flow starts at the entrance and remains seamless to the exit.',
          description: 'Managing vehicle flow and guiding traffic at entrances and exits to support smoother movement, reduce congestion and improve visitor experience while preserving pedestrian safety.',
          highlights: [
            'Real-time traffic flow control during peak attendance spikes and VIP arrivals',
            'Mitigation of drop-off congestion and bottleneck suppression at main gates',
            'Continuous marshal coordination prioritizing pedestrian crossings and lane safety'
          ]
        }
      ]
    },
    principles: {
      tag: '03 — OUR PILLARS',
      eyebrow: 'CORE OPERATING PRINCIPLES',
      title: 'Dual Standards: Operational Discipline & Polished Delivery',
      lead: 'Three foundational tenets steer every field decision across our daily operations.',
      items: [
        {
          number: '01',
          title: 'Quality',
          desc: 'Attention to detail and consistent service standards.',
          detail: 'From attendant presentation to precise vehicle return, delivering an unwavering standard.'
        },
        {
          number: '02',
          title: 'Safety',
          desc: 'Clear procedures and practical team guidance.',
          detail: 'Responsible maneuvering, documented handovers, and strict adherence to traffic and safety protocols.'
        },
        {
          number: '03',
          title: 'Smart Operations',
          desc: 'Practical organization that keeps people and vehicles moving.',
          detail: 'Strategic staffing and lane allocation designed to eliminate bottlenecks and cut wait times.'
        }
      ]
    },
    sectors: {
      tag: '04 — SECTORS WE SERVE',
      eyebrow: 'BUILT AROUND YOUR PROPERTY',
      titlePart1: 'Solutions shaped around',
      titlePart2: 'your property.',
      lead: 'We shape the service scope around each property’s character, visitor flow and operational requirements.',
      items: [
        {
          id: 'hospitality',
          number: '01',
          title: 'Hotels & Hospitality',
          enTitle: 'Hotels & Hospitality',
          desc: 'Bespoke valet and buggy operations aligned with five-star luxury standards to delight incoming guests.'
        },
        {
          id: 'retail',
          number: '02',
          title: 'Retail & Shopping Malls',
          enTitle: 'Retail & Shopping Malls',
          desc: 'High-volume parking guidance and circulation management optimizing turnover and shopper ease.'
        },
        {
          id: 'medical',
          number: '03',
          title: 'Hospitals & Medical Centers',
          enTitle: 'Hospitals & Medical Centers',
          desc: 'Compassionate, rapid-response valet and dedicated emergency corridor traffic management.'
        },
        {
          id: 'residential',
          number: '04',
          title: 'Residential Compounds',
          enTitle: 'Residential Compounds',
          desc: 'Discreet, secure parking oversight and visitor access coordination preserving tranquility and privacy.'
        },
        {
          id: 'corporate',
          number: '05',
          title: 'Corporate Facilities',
          enTitle: 'Corporate Facilities',
          desc: 'Executive parking management ensuring swift arrival for leadership, staff, and international partners.'
        },
        {
          id: 'events',
          number: '06',
          title: 'Events & Venues',
          enTitle: 'Events & Venues',
          desc: 'Rapid-deployment traffic coordination and large-scale valet operations for galas and major summits.'
        }
      ]
    },
    approach: {
      tag: '05 — OUR METHODOLOGY',
      eyebrow: 'STRUCTURED OPERATIONAL FRAMEWORK',
      titlePart1: 'A clear plan.',
      titlePart2: 'Organized delivery.',
      lead: 'We start by understanding the property and its needs, then prepare a suitable operating plan and follow performance to improve the experience.',
      steps: [
        {
          number: '01',
          title: 'Understand',
          englishName: 'UNDERSTAND',
          desc: 'We listen to your objectives and assess site geometry, vehicle volume, and peak cycles.',
          subtext: 'Comprehensive field assessment of access corridors and bottlenecks.'
        },
        {
          number: '02',
          title: 'Plan',
          englishName: 'PLAN',
          desc: 'We formulate the precise service scope, shift rosters, escalation paths, and safety criteria.',
          subtext: 'Operational blueprint specifying station allocations and supervisor responsibilities.'
        },
        {
          number: '03',
          title: 'Launch',
          englishName: 'LAUNCH',
          desc: 'We brief our personnel, deploy equipment and uniforms, and initiate organized on-ground operations.',
          subtext: 'Active on-site management with real-time field communication gear.'
        },
        {
          number: '04',
          title: 'Review',
          englishName: 'REVIEW',
          desc: 'We review performance metrics, ensure service consistency, and identify opportunities for refinement.',
          subtext: 'Continuous quality audits ensuring sustained excellence week after week.'
        }
      ]
    },
    ctaBanner: {
      watermark: 'PVC',
      eyebrow: "LET'S START A CONVERSATION",
      titlePart1: 'Ready for a',
      titlePart2: 'better operation?',
      lead: "Tell us what your property needs and let's explore how PVC services can elevate your visitor experience and operational efficiency.",
      cta: 'Talk to Our Team ↗',
      directLine: 'Direct WhatsApp communication with our operations desk'
    },
    contact: {
      tag: '06 — GET IN TOUCH',
      eyebrow: 'GET IN TOUCH',
      titlePart1: "We'd love to",
      titlePart2: 'hear from you.',
      lead: 'Whether you require a specific service or a comprehensive operational partner, our team is ready to evaluate your venue and formulate a tailored proposal.',
      cards: {
        phone: { label: 'Phone / WhatsApp', value: '+201020485598', display: '+20 102 048 5598' },
        email: { label: 'Email', value: 'info@pvcsmartservices.com' },
        website: { label: 'Website', value: 'pvcsmartservices.com' },
        address: { label: 'Headquarters Address', value: 'Office 02, Unit 201, 2nd Floor – Property 38, Al-Moltaka Al-Arabi, Sheraton Airport, El Nozha, Cairo' }
      },
      form: {
        heading: 'Request an Operational Proposal',
        serviceInterest: 'Primary Service of Interest',
        selectService: 'Select a service or general operations',
        nameLabel: 'Your Name',
        namePlaceholder: 'Full Name or Property Representative',
        emailLabel: 'Email Address',
        emailPlaceholder: 'name@company.com',
        phoneLabel: 'Phone Number (Optional)',
        phonePlaceholder: '+20 ...',
        messageLabel: 'Property Details & Operational Scope',
        messagePlaceholder: 'Briefly describe your property location, estimated visitor volume, requested services, or operational timeline...',
        submitBtn: 'Send via WhatsApp ↗',
        disclaimer: 'This form opens a direct WhatsApp chat prefilled with your requirements to connect immediately with our team.',
        errors: {
          name: 'Please enter your name',
          email: 'Please provide a valid email address',
          message: 'Please write your message or operational inquiry'
        }
      }
    },
    footer: {
      summary: 'Smart management. Organized operations. Seamless experiences for premier destinations.',
      quickLinks: 'Navigation',
      servicesTitle: 'Operational Services',
      directContact: 'Direct Inquiries',
      address: 'Office 02, Unit 201, 2nd Floor – Property 38, Al-Moltaka Al-Arabi, Sheraton Airport, El Nozha, Cairo',
      rights: 'All rights reserved.',
      backToTop: 'Back to Top ↑'
    }
  }
};

interface LanguageContextType {
  language: Language;
  isRTL: boolean;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: TranslationContent;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');

  const isRTL = language === 'ar';

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'ar' ? 'en' : 'ar'));
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.title = contentData[language].meta.title;
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        isRTL,
        setLanguage,
        toggleLanguage,
        t: contentData[language]
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
