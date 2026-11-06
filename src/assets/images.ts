export interface MediaAsset {
  url: string;
  alt: {
    ar: string;
    en: string;
  };
  objectPosition?: string;
}

export const IMAGES = {
  hero: {
    slide1: {
      url: '/images/carousel/hero-slide-valet.jpg',
      alt: {
        ar: 'خدمة صف السيارات واستقبال المركبات باحترافية أمام مدخل فندقي ومنشأة راقية',
        en: 'Professional valet reception and vehicle arrival at an upscale hospitality venue'
      },
      objectPosition: 'center 40%'
    },
    slide2: {
      url: '/images/carousel/hero-slide-parking.jpg',
      alt: {
        ar: 'إدارة وتنظيم حركة مواقف السيارات عند مدخل مركز تجاري وطبي حديث',
        en: 'Modern commercial facility parking management with organized vehicular circulation'
      },
      objectPosition: 'center 45%'
    },
    slide3: {
      url: '/images/carousel/hero-slide-integrated.jpg',
      alt: {
        ar: 'عربة باجي كهربائية حديثة لنقل الضيوف داخل مجتمع سكني ومنتجع راقٍ',
        en: 'Electric buggy guest transportation inside a premier residential compound'
      },
      objectPosition: 'center 40%'
    }
  },
  services: {
    valet: {
      hero: {
        url: '/images/hero/valet-main.jpg',
        alt: {
          ar: 'موظف صف السيارات يستقبل سيارة العميل باحترافية أمام بوابة فندق ومنشأة تجارية',
          en: 'Valet attendant receiving client vehicle with courteous hospitality'
        },
        objectPosition: 'center 45%'
      },
      detail: {
        url: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1000&q=85',
        alt: {
          ar: 'استلام مفتاح السيارة بتوثيق دقيق وحفظ مسؤول',
          en: 'Documented, secure vehicle key handover protocol'
        },
        objectPosition: 'center 50%'
      }
    },
    parking: {
      hero: {
        url: '/images/hero/parking-facility.jpg',
        alt: {
          ar: 'منشأة مواقف حديثة منظمة بمسارات واضحة وإرشادات رقمية',
          en: 'Modern parking facility with electronic guidance and clear lane markings'
        },
        objectPosition: 'center 45%'
      },
      workflow: {
        url: '/images/system/parking-workflow-diagram.jpg',
        alt: {
          ar: 'مخطط تدفق دخول وخروج المركبات ونظام LPR',
          en: 'Vehicle entry, guidance, and exit workflow diagram'
        }
      }
    },
    carwash: {
      hero: {
        url: '/images/hero/car-care.jpg',
        alt: {
          ar: 'غسيل وعناية بالسيارات باستخدام رغوة خاصة تحمي الطلاء',
          en: 'Professional vehicle foam washing protecting clear-coat finish'
        },
        objectPosition: 'center 40%'
      },
      interior: {
        url: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1000&q=85',
        alt: {
          ar: 'تنظيف وتفصيل دقيق لمقصورة السيارة والمقاعد الداخلية',
          en: 'Detailed interior cabin detailing and leather care'
        },
        objectPosition: 'center 50%'
      }
    },
    buggy: {
      hero: {
        url: '/images/hero/buggy-shuttle.jpg',
        alt: {
          ar: 'عربة باجي كهربائية تنقل الزوار بهدوء وراحة في أرجاء الموقع',
          en: 'Electric buggy shuttle transporting visitors comfortably across property grounds'
        },
        objectPosition: 'center 40%'
      }
    },
    traffic: {
      hero: {
        url: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1600&q=85',
        alt: {
          ar: 'تنظيم وتوجيه حركة السير والمركبات عند مداخل المنشآت الحيوية',
          en: 'Traffic organization and vehicular movement guidance at access gates'
        },
        objectPosition: 'center 45%'
      }
    }
  },
  sectors: {
    hospitality: {
      url: '/images/sectors/hospitality.jpg',
      alt: {
        ar: 'فنادق ومنتجعات راقية تستقبل النزلاء بخدمات ضيافة وصف سيارات متكاملة',
        en: 'Luxury hotels and resorts receiving guests with integrated valet hospitality'
      }
    },
    retail: {
      url: '/images/sectors/mall.jpg',
      alt: {
        ar: 'مراكز تسوق ومولات تجارية تشهد حركة وتدفق سيارات نشط',
        en: 'Shopping centers and commercial malls with active vehicular circulation'
      }
    },
    medical: {
      url: '/images/sectors/hospital.jpg',
      alt: {
        ar: 'مستشفيات ومراكز طبية تحتاج صف سيارات سريع وتنظيم ممرات الطوارئ',
        en: 'Hospitals and medical facilities requiring swift valet and open emergency routes'
      }
    },
    residential: {
      url: '/images/sectors/compound.jpg',
      alt: {
        ar: 'مجتمعات سكنية وكمبوندات مغلقة بتشغيل مواقف هادئ ومنضبط',
        en: 'Residential compounds with discreet, organized parking management'
      }
    },
    corporate: {
      url: '/images/sectors/corporate.jpg',
      alt: {
        ar: 'أبراج إدارية ومقار شركات كبرى بحلول صف سيارات للموظفين وكبار الشخصيات',
        en: 'Corporate towers and headquarters with reserved executive parking transit'
      }
    },
    events: {
      url: '/images/sectors/events.jpg',
      alt: {
        ar: 'مراكز فعاليات ومعارض ومؤتمرات كبرى بحاجة لإدارة تدفقات استثنائية',
        en: 'Event venues and convention centers managing peak arrival surges'
      }
    }
  }
};
