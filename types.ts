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
  // Add more sections as needed
}