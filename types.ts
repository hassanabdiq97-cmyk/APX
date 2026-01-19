import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
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