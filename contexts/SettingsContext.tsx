'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, PropsWithChildren } from 'react';
import { Language, Theme, Translations, ContactReason } from '../types';

interface SettingsContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  t: Translations;
  inquiryDraft: string;
  setInquiryDraft: (text: string) => void;
}

const de: Translations = {
  nav: {
    services: 'Services',
    industries: 'Branchen',
    expertise: 'Standorte',
    career: 'Karriere',
    emergency: '24/7 PIKETT',
    status: 'SYSTEM STATUS: NOMINAL',
    location: 'GRENCHEN // BIEL // SOLOTHURN',
  },
  hero: {
    region: 'STÜTZPUNKT: GRENCHEN - BIEL',
    headline: 'STILLSTAND IST',
    subheadline: 'KEINE OPTION.',
    description: 'Im Precision Valley zählt der Output. Wir sind Ihr technischer Partner für CNC-Instandhaltung. Wenn die Maschine steht, sorgen wir für den Restart – präzise, schnell und nachhaltig.',
    cta_check: 'Diagnose Starten',
    cta_suva: 'Audit & Sicherheit',
  },
  trust: {
    label: 'Qualifiziert für Systeme von:',
  },
  quickcheck: {
    title: 'System-Diagnose',
    description: 'Initialisierung der Wartungsanfrage. Übermitteln Sie die Maschinendaten für eine sofortige technische Analyse.',
    items: [
      { id: '01', title: 'MASCHINEN-ID', desc: 'Hersteller / Seriennummer.' },
      { id: '02', title: 'FEHLERBILD', desc: 'Fehlercode am Display (z.B. SV0411).' },
      { id: '03', title: 'STATUS', desc: 'Foto der Komponente.' }
    ],
    call_cta: 'Service-Desk',
    digital_cta: 'Ticket eröffnen',
  },
  industries: {
    title: 'Fokus-Industrien',
    subtitle: 'Expertise',
    items: [
      {
        title: 'Uhrenindustrie',
        desc: 'Mikromechanik am Limit. Wir sichern die µ-genaue Präzision für Ihre Langdrehautomaten.',
        features: ['Spindel-Rundlauf Optimierung', 'Stangenlader-Kalibrierung', 'Achs-Geometrie Laservermessung'],
        brands: 'Tornos, Bumotec, Willemin'
      },
      {
        title: 'Medizintechnik',
        desc: 'Validierte Prozesse. Instandhaltung unter Reinraum-Bedingungen (ISO 7) mit lückenloser Dokumentation.',
        features: ['GMP-konforme Protokolle', 'Kontaminations-Schutz', 'Audit-Support'],
        brands: 'Chiron, Starrag, Mikron'
      },
      {
        title: 'Automotive / Aero',
        desc: 'High-Performance Zerspanung. Optimierung der Zykluszeiten und Wiederherstellung der Werks-Geometrie.',
        features: ['Automation-Schnittstellen', 'Hydraulik-Systemservice', 'ISO 230 Abnahme'],
        brands: 'Index, Traub, Fanuc, GF'
      },
      {
        title: 'Schwerindustrie',
        desc: 'Robuste Technik. Wartung von Giesserei-Anlagen und Automation unter härtesten Bedingungen.',
        features: ['Roboter-Instandsetzung', 'Schutzsystem-Prüfung', 'Steuerungs-Retrofit'],
        brands: 'Bühler, Frech, Kuka Foundry'
      }
    ]
  },
  services: {
    title: 'Leistungsportfolio',
    subtitle: 'Technische Services',
    items: [
      { id: '1', title: 'Predictive Maintenance', description: 'Datenbasierte Wartung. Wir analysieren Vibrationen und Parameter, bevor ein Lager ausfällt.', details: ['Schwingungs-Analyse.', 'Laser-Interferometrie.', 'Zustands-Monitoring.'] },
      { id: '2', title: 'Mechanische Reparatur', description: 'Austausch und Revision von Kernkomponenten. Spindeln, Kugelrollspindeln und Führungen.', details: ['Spindel-Revision.', 'Lagertausch.', 'Geometrie-Korrektur.'] },
      { id: '3', title: 'Retrofit & Upgrade', description: 'Modernisierung statt Neukauf. Integration neuer Steuerungen und Antriebe in bewährte Mechanik.', details: ['Steuerungs-Update.', 'IoT-Integration.', 'Sicherheits-Nachrüstung.'] },
      { id: '4', title: 'Compliance & Audit', description: 'Technische Dokumentation. Wir validieren Ihre Anlagen nach aktuellen Normen und Standards.', details: ['Messprotokolle.', 'Kalibrier-Zertifikate.', 'Sicherheits-Audits.'] },
      { id: '5', title: 'Express Service', description: 'Priorisierter Einsatz bei Stillstand. Garantierte Reaktionszeit < 30 Min im Sektor Grenchen-Biel.', details: ['365 Tage Pikett.', 'Prio-1 Status.', 'Express-Logistik.'] },
      { id: '6', title: 'Ersatzteil-Management', description: 'Lokales Lager für kritische Komponenten. Verfügbarkeit von Spindeln und Antrieben ab Lengnau.', details: ['Lager Lengnau.', 'Spindel-Pool.', 'Leih-Aggregate.'] }
    ],
    more: 'Details ansehen',
    modal_title: 'Service Details',
    modal_features: 'Leistungsumfang',
    modal_cta: 'Angebot anfordern',
  },
  flow: {
    title: 'Service-Prozess',
    subtitle: 'Workflow',
    steps: [
      { title: '1. Meldung', desc: 'Erfassung der Störung im Service-Desk. Technische Ersteinschätzung.' },
      { title: '2. Analyse', desc: 'Diagnose vor Ort oder Remote. Festlegung der benötigten Teile.' },
      { title: '3. Execution', desc: 'Durchführung der Reparatur. Funktionstest und Abnahme.' }
    ],
    digital_report: 'Digitales Service-Protokoll inklusive',
  },
  calculator: {
    badge: 'Kosten-Analyse',
    title: 'Kosten des Stillstands',
    description: 'Berechnen Sie das wirtschaftliche Risiko eines ungeplanten Maschinenausfalls.',
    inputs: {
      duration: 'Dauer (Std)',
      rate: 'Maschinen-Satz',
      employees: 'Personal',
      rate_hint: 'CHF/h',
    },
    results: {
      risk: 'Geschätzter Ausfall',
      production: 'Produktions-Verlust',
      personnel: 'Personal-Kosten',
      cta: 'Service anfordern',
      roi_title: 'Wartungs-ROI',
      roi_desc: (months: number) => `Ein Service-Vertrag amortisiert sich in ${months} Monaten im Vergleich zu diesem Ausfall.`,
    },
    severity: {
      low: 'MODERAT',
      mid: 'KRITISCH',
      high: 'HOCHRISIKO',
    }
  },
  expertise: {
    title: 'Einsatzgebiet',
    subtitle: 'Sektor Mittelland',
    headline_part1: 'Im Zentrum des',
    headline_part2: 'Precision Valley',
    description: 'Unser Standort in Lengnau ist strategisch gewählt. Wir erreichen jeden Kunden in Grenchen, Biel und Solothurn innerhalb kürzester Zeit. Maximale Nähe für minimale Ausfallzeiten.',
    stat_time: { title: '< 30 MIN', desc: 'Anfahrtszeit Sektor' },
    stat_stock: { title: '2500+', desc: 'Komponenten Lagernd' },
  },
  career: {
    badge: 'Karriere',
    title: 'Werde Teil',
    subtitle: 'Des Teams',
    intro_title: 'Wir suchen Technik-Enthusiasten.',
    intro_text: 'Arbeiten bei APEX heisst: High-End Maschinen, modernstes Equipment und Lösungen für die besten Produzenten der Schweiz.',
    values: [
      { id: 'vacation', title: 'Erholung', desc: '6 Wochen Ferien. Ausgleich ist wichtig für Fokus.' },
      { id: 'education', title: 'Entwicklung', desc: 'Support für Weiterbildungen (Meister/HF).' },
      { id: 'team', title: 'Teamwork', desc: 'Flache Hierarchien und direkte Kommunikation.' },
      { id: 'tolerance', title: 'Mindset', desc: 'Lösungsorientiertes Arbeiten und Präzision.' }
    ],
    cta_init: 'Initiativ bewerben',
    positions_title: 'Offene Stellen',
    no_position: 'Keine passende Stelle?',
    apply_cta: 'Jetzt Bewerben',
    modal: {
      location: 'Arbeitsort',
      workload: 'Pensum',
      requirements: 'Anforderungsprofil',
      benefits: 'Benefits',
      apply_now: 'Bewerbung starten',
    },
    jobs: [
        { 
            id: 'job1', 
            title: 'Servicetechniker CNC (m/w/d)', 
            location: 'Lengnau / Mobile', 
            workload: '100%', 
            description: 'Du bist verantwortlich für Diagnose, Wartung und Reparatur von CNC-Werkzeugmaschinen bei unseren Kunden.', 
            requirements: ['Ausbildung Polymechaniker/Automatiker', 'Erfahrung mit Steuerungen (Fanuc/Siemens)', 'Führerschein Kat. B'],
            benefits: ['Eigenes Service-Fahrzeug', 'Top-Werkzeug & Laptop', 'Attraktives Salär']
        },
        { 
            id: 'job2', 
            title: 'Technischer Sachbearbeiter (m/w/d)', 
            location: 'Lengnau HQ', 
            workload: '80-100%', 
            description: 'Koordination der Service-Einsätze und technische Unterstützung am Telefon.', 
            requirements: ['Technische Grundausbildung', 'Organisationsstark', 'Kommunikativ'],
            benefits: ['Home-Office Möglichkeit', 'Flexible Arbeitszeiten', 'Modernster Arbeitsplatz']
        }
    ]
  },
  trust_indicators: {
    title: 'Unsere Standards',
    validated: { title: 'Zertifiziert', desc: 'Nach Herstellervorgaben.' },
    laser: { title: 'Präzision', desc: 'Kalibriertes Messequipment.' },
    discretion: { title: 'Diskretion', desc: 'Schutz Ihres Know-hows.' },
  },
  contact: {
    badge: 'Kontakt',
    title: 'Service-Desk',
    address_label: 'Standort',
    hotline_label: '24/7 Hotline',
    digital_label: 'Online',
    status: 'STATUS: ONLINE',
    form: {
      reason_label: 'Betreff',
      name: 'Name / ID',
      company: 'Firma',
      phone: 'Rückruf-Nummer',
      details: 'Beschreibung',
      submit: 'Anfrage senden',
      security: 'SSL-Verschlüsselt',
      success_title: 'Ticket erstellt',
      success_desc: 'Wir haben Ihre Anfrage erhalten. Ein Techniker meldet sich in Kürze.',
      emergency: {
        title: 'Notfall-Service',
        desc: 'Für dringende Maschinenstillstände nutzen Sie bitte die direkte Hotline.',
        priority: 'PRIORITÄT',
      }
    }
  },
  footer: {
    brand_desc: 'Spezialisiert auf industrielle Instandhaltung und CNC-Service im Precision Valley.',
    services_title: 'Angebot',
    region_title: 'Region',
    contact_title: 'Kontakt',
    callback: 'Rückrufservice',
    rights: 'APEX Industrial Solutions. Alle Rechte vorbehalten.',
  }
};

const fr: Translations = {
  ...de, // Fallback
  nav: {
    ...de.nav,
    services: 'Services',
    industries: 'Secteurs',
    expertise: 'Sites',
    career: 'Carrière',
    emergency: 'URGENCE 24/7',
    status: 'ÉTAT SYSTÈME: NOMINAL',
    location: 'GRENCHEN // BIENNE // SOLEURE',
  },
  hero: {
    region: 'BASE: GRENCHEN - BIENNE',
    headline: 'L\'ARRÊT N\'EST',
    subheadline: 'PAS UNE OPTION.',
    description: 'Dans la Precision Valley, le rendement compte. Nous sommes votre partenaire technique. Si la machine s\'arrête, nous assurons le redémarrage - précis et rapide.',
    cta_check: 'Diagnostic',
    cta_suva: 'Audit & Sécurité',
  },
  quickcheck: {
    ...de.quickcheck,
    title: 'Diagnostic Système',
    description: 'Initialisation de la demande. Transmettez les données machine pour une analyse immédiate.',
    items: [
      { id: '01', title: 'ID MACHINE', desc: 'No. Série.' },
      { id: '02', title: 'ERREUR', desc: 'Code d\'erreur (ex. SV0411).' },
      { id: '03', title: 'STATUT', desc: 'Photo de la situation.' }
    ],
    call_cta: 'Service-Desk',
    digital_cta: 'Ouvrir un ticket',
  },
  calculator: {
    ...de.calculator,
    title: 'Coût de l\'arrêt',
    description: 'Calculez le risque économique d\'un arrêt machine non planifié.',
    results: {
        ...de.calculator.results,
        risk: 'Perte estimée',
        cta: 'Demander Service',
        roi_desc: (months: number) => `L'amortissement est inférieur à ${months} mois.`,
    }
  }
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('de');
  const [theme, setTheme] = useState<Theme>('dark');
  const [inquiryDraft, setInquiryDraft] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme') as Theme;
        if (savedTheme) setTheme(savedTheme);
        else if (window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('theme', theme);
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const t = language === 'de' ? de : fr;

  const value = useMemo(() => ({
    language, setLanguage, theme, toggleTheme, t, inquiryDraft, setInquiryDraft
  }), [language, theme, t, inquiryDraft]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
