import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  details?: string[];
}

export interface StatItem {
  value: string;
  label: string;
  subLabel?: string;
}

export interface Testimony {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export enum ContactReason {
  MAINTENANCE = 'Wartung',
  REPAIR = 'Reparatur',
  RETROFIT = 'Modernisierung',
  EMERGENCY = 'Notfall'
}

// New Types for Settings
export type Language = 'de' | 'fr';
export type Theme = 'light' | 'dark';

export interface Translations {
  nav: {
    services: string;
    industries: string;
    expertise: string;
    career: string;
    emergency: string;
    status: string;
    location: string;
  };
  hero: {
    region: string;
    headline: string;
    subheadline: string;
    description: string;
    cta_check: string;
    cta_suva: string;
  };
  trust: {
    label: string;
  };
  quickcheck: {
    title: string;
    description: string;
    items: { id: string; title: string; desc: string; }[];
    call_cta: string;
    digital_cta: string;
  };
  industries: {
    title: string;
    subtitle: string;
    items: {
      title: string;
      desc: string;
      features: string[];
      brands: string;
    }[];
  };
  services: {
    title: string;
    subtitle: string;
    items: { id: string; title: string; description: string; details: string[]; }[];
    more: string;
    modal_title: string;
    modal_features: string;
    modal_cta: string;
  };
  flow: {
    title: string;
    subtitle: string;
    steps: { title: string; desc: string; }[];
    digital_report: string;
  };
  calculator: {
    badge: string;
    title: string;
    description: string;
    inputs: {
      duration: string;
      rate: string;
      employees: string;
      rate_hint: string;
    };
    results: {
      risk: string;
      production: string;
      personnel: string;
      cta: string;
      roi_title: string;
      roi_desc: (months: number) => string;
    };
    severity: {
      low: string;
      mid: string;
      high: string;
    };
  };
  expertise: {
    title: string;
    subtitle: string;
    headline_part1: string;
    headline_part2: string;
    description: string;
    stat_time: { title: string; desc: string; };
    stat_stock: { title: string; desc: string; };
  };
  career: {
    badge: string;
    title: string;
    subtitle: string;
    intro_title: string;
    intro_text: string;
    values: {
      id: string;
      title: string;
      desc: string;
    }[];
    cta_init: string;
    positions_title: string;
    no_position: string;
    apply_cta: string;
    modal: {
      location: string;
      workload: string;
      requirements: string;
      benefits: string;
      apply_now: string;
    };
    jobs: { id: string; title: string; location: string; workload: string; description: string; requirements: string[]; benefits: string[]; }[];
  };
  trust_indicators: {
    title: string;
    validated: { title: string; desc: string; };
    laser: { title: string; desc: string; };
    discretion: { title: string; desc: string; };
  };
  contact: {
    badge: string;
    title: string;
    address_label: string;
    hotline_label: string;
    digital_label: string;
    status: string;
    form: {
      reason_label: string;
      name: string;
      company: string;
      phone: string;
      details: string;
      submit: string;
      security: string;
      success_title: string;
      success_desc: string;
      emergency: {
        title: string;
        desc: string;
        priority: string;
      }
    }
  };
  footer: {
    brand_desc: string;
    services_title: string;
    region_title: string;
    contact_title: string;
    callback: string;
    rights: string;
  };
}