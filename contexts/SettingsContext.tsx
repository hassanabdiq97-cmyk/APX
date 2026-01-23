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
  activeReason: ContactReason | null;
  setActiveReason: (reason: ContactReason | null) => void;
}

const de: Translations = {
  nav: {
    services: 'Services',
    industries: 'Branchen',
    expertise: 'Standorte',
    career: 'Karriere',
    contact: 'Kontakt',
    emergency: '24/7 PIKETT',
    status: 'SYSTEM STATUS: NOMINAL',
    location: 'GRENCHEN // BIEL // SOLOTHURN',
  },
  hero: {
    region: 'STÜTZPUNKT: GRENCHEN - BIEL',
    headline: 'STILLSTAND IST',
    subheadline: 'KEINE OPTION.',
    description: 'Im Precision Valley zählt der Output. Wir sind Ihr technischer Partner für industrielle Instandhaltung und Montage. Wenn die Anlage steht, sorgen wir für den Restart – präzise, schnell und nachhaltig.',
    cta_check: 'Diagnose Starten',
    cta_suva: 'Audit & Sicherheit',
  },
  trust: {
    label: 'Erfahrung mit Anlagen von:',
  },
  quickcheck: {
    title: 'System-Diagnose',
    description: 'Initialisierung der Instandhaltungsanfrage. Übermitteln Sie die Anlagendaten für eine sofortige technische Einschätzung.',
    items: [
      { id: '01', title: 'ANLAGEN-ID', desc: 'Typenschild / Inventarnummer.' },
      { id: '02', title: 'STÖRUNG', desc: 'Fehlerbeschreibung oder Code.' },
      { id: '03', title: 'SITUATION', desc: 'Foto der Komponente.' }
    ],
    call_cta: 'Service-Desk',
    digital_cta: 'Ticket eröffnen',
  },
  industries: {
    title: 'Fokus-Branchen',
    subtitle: 'Expertise',
    items: [
      {
        title: 'Produktions-Industrie',
        desc: 'Fertigungslinien und Automation. Wir sichern die Verfügbarkeit Ihrer Produktionsanlagen durch präventive Wartung.',
        features: ['Wartungspläne', 'Fördertechnik-Service', 'Hydraulik & Pneumatik'],
        brands: 'Montagelinien, Roboterzellen, Förderbänder'
      },
      {
        title: 'Medizintechnik',
        desc: 'Validierte Prozesse. Instandhaltung und Montage unter Reinraum-Bedingungen (ISO 7) mit lückenloser Dokumentation.',
        features: ['GMP-konforme Protokolle', 'Kontaminations-Schutz', 'Audit-Support'],
        brands: 'Reinigungsanlagen, Verpackungsmaschinen'
      },
      {
        title: 'Schwerindustrie',
        desc: 'Robuste Technik. Wartung von Giesserei-Anlagen, Pressen und Automation unter härtesten Bedingungen.',
        features: ['Getriebe-Revision', 'Schutzsystem-Prüfung', 'Steuerungs-Retrofit'],
        brands: 'Grossanlagen, Öfen, Pressen'
      },
      {
        title: 'Logistik & Automation',
        desc: 'Bewegte Technik. Service für Hochregallager, FTS und Sortieranlagen.',
        features: ['Antriebstechnik', 'Sensorik-Check', 'Sicherheits-Updates'],
        brands: 'Lagersysteme, Krane, Fördertechnik'
      }
    ]
  },
  services: {
    title: 'Leistungsportfolio',
    subtitle: 'Technische Services',
    items: [
      { id: '1', title: 'Industrielle Instandhaltung', description: 'Ganzheitliche Wartung Ihres Maschinenparks. Präventiv und korrektiv, um Stillstände zu vermeiden.', details: ['Wartungsverträge.', 'Inspektionen.', 'Störungsbehebung.'] },
      { id: '2', title: 'Montage & Demontage', description: 'Fachgerechte Installation neuer Anlagen und Maschinenumzüge. Von der Einbringung bis zur Inbetriebnahme.', details: ['Maschinen-Umzüge.', 'Neuanlagen-Montage.', 'Inbetriebnahme-Support.'] },
      { id: '3', title: 'Retrofit & Upgrade', description: 'Modernisierung statt Neukauf. Integration neuer Komponenten und Steuerungen in bestehende Anlagen.', details: ['Steuerungs-Update.', 'Sicherheits-Nachrüstung.', 'Komponenten-Tausch.'] },
      { id: '4', title: 'Betriebselektrik', description: 'Fehlersuche und Reparatur an elektrischen Steuerungen, Motoren und Schaltschränken.', details: ['Schaltschrank-Service.', 'Motoren-Prüfung.', 'Sensorik/Aktorik.'] },
      { id: '5', title: 'Express Service', description: 'Priorisierter Einsatz bei Stillstand. Garantierte Reaktionszeit < 30 Min im Sektor Grenchen-Biel.', details: ['365 Tage Pikett.', 'Prio-1 Status.', 'Express-Logistik.'] },
      { id: '6', title: 'Mechanischer Service', description: 'Reparatur von Getrieben, Pumpen, Hydraulik und Pneumatik-Systemen vor Ort.', details: ['Getriebe-Service.', 'Hydraulik-Leitungen.', 'Pneumatik-Ventile.'] }
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
      { title: '1. Meldung', desc: 'Erfassung der Störung oder des Montage-Projekts. Technische Ersteinschätzung.' },
      { title: '2. Planung', desc: 'Einsatzplanung, Materialbeschaffung und Terminierung des Teams.' },
      { title: '3. Ausführung', desc: 'Durchführung der Wartung oder Montage. Funktionstest und Abnahme.' }
    ],
    digital_report: 'Digitales Service-Protokoll inklusive',
  },
  calculator: {
    badge: 'Kosten-Analyse',
    title: 'Kosten des Stillstands',
    description: 'Berechnen Sie das wirtschaftliche Risiko eines ungeplanten Anlagenausfalls.',
    inputs: {
      duration: 'Dauer (Std)',
      rate: 'Anlagen-Satz',
      employees: 'Personal',
      rate_hint: 'CHF/h',
    },
    results: {
      risk: 'Geschätzter Ausfall',
      production: 'Produktions-Verlust',
      personnel: 'Personal-Kosten',
      cta: 'Service anfordern',
      roi_title: 'Wartungs-ROI',
      roi_desc: (months: number) => `Ein Wartungsvertrag amortisiert sich in ${months} Monaten im Vergleich zu diesem Ausfall.`,
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
    headline_part1: 'Im Zentrum der',
    headline_part2: 'Industrie-Region',
    description: 'Unser Standort in Lengnau ist strategisch gewählt. Wir erreichen jeden Produktionsbetrieb in Grenchen, Biel und Solothurn innerhalb kürzester Zeit. Maximale Nähe für minimale Ausfallzeiten.',
    metrics: {
        response_title: 'Reaktionszeit',
        response_val: '< 30 Min',
        response_sub: '(Biel/Solothurn)',
        hub_title: 'Hub Standort',
        hub_val: 'Lengnau HQ',
        hub_sub: '(A5 Anschluss)'
    },
    map_legend: {
        express: 'Express (<15m)',
        core: 'Kernzone (<30m)',
        extended: 'Erweitert (<1h)',
        network: 'Netzwerk',
        zone1_label: '< 15 MIN',
        zone2_label: '< 30 MIN',
        zone3_label: '< 1 STD',
    }
  },
  career: {
    badge: 'Karriere',
    title: 'Werde Teil',
    subtitle: 'Des Teams',
    intro_title: 'Wir suchen Macher und Technik-Profis.',
    intro_text: 'Arbeiten bei APEX heisst: Abwechslungsreiche Einsätze in der Industrie, Montage-Projekte und Lösungen für die besten Produzenten der Schweiz.',
    values: [
      { id: 'vacation', title: 'Erholung', desc: '6 Wochen Ferien. Ausgleich ist wichtig für Fokus.' },
      { id: 'education', title: 'Entwicklung', desc: 'Support für Weiterbildungen (Fachmann Instandhaltung).' },
      { id: 'team', title: 'Teamwork', desc: 'Flache Hierarchien und direkte Kommunikation.' },
      { id: 'tolerance', title: 'Mindset', desc: 'Lösungsorientiertes Arbeiten und Handwerksstolz.' }
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
            title: 'Servicetechniker Instandhaltung (m/w/d)', 
            location: 'Lengnau / Mobile', 
            workload: '100%', 
            description: 'Du bist verantwortlich für die Wartung, Reparatur und Störungsbehebung an Produktionsanlagen bei unseren Kunden.', 
            requirements: ['Ausbildung Polymechaniker/Automatiker/Landmaschinenmech.', 'Erfahrung in der Instandhaltung', 'Führerschein Kat. B'],
            benefits: ['Eigenes Service-Fahrzeug', 'Top-Werkzeug & Tablet', 'Attraktives Salär']
        },
        { 
            id: 'job2', 
            title: 'Industriemechaniker Montage (m/w/d)', 
            location: 'Region Mittelland', 
            workload: '100%', 
            description: 'Montage und Inbetriebnahme von Neuanlagen sowie Durchführung von Maschinenumzügen.', 
            requirements: ['Handwerkliches Geschick', 'Reisebereitschaft regional', 'Teamplayer'],
            benefits: ['Abwechslungsreiche Projekte', 'Verpflegungsspesen', 'Modernes Equipment']
        }
    ]
  },
  trust_indicators: {
    title: 'Unsere Standards',
    validated: { title: 'Zertifiziert', desc: 'Fachgerechte Ausführung.' },
    laser: { title: 'Präzision', desc: 'Modernes Messequipment.' },
    discretion: { title: 'Sicherheit', desc: 'Einhaltung aller Normen.' },
  },
  contact: {
    badge: 'Kontakt',
    title: 'Service-Desk',
    address_label: 'Standort',
    hotline_label: '24/7 Hotline',
    digital_label: 'Online',
    status: 'STATUT: EN LIGNE',
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
        desc: 'Für dringende Anlagenstillstände nutzen Sie bitte die direkte Hotline.',
        priority: 'PRIORITÄT',
      }
    }
  },
  footer: {
    brand_desc: 'Spezialisiert auf industrielle Instandhaltung, Montage und Anlagenservice im Mittelland.',
    services_title: 'Angebot',
    region_title: 'Region',
    contact_title: 'Contact',
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
    contact: 'Contact',
    emergency: 'URGENCE 24/7',
    status: 'ÉTAT SYSTÈME: NOMINAL',
    location: 'GRENCHEN // BIENNE // SOLEURE',
  },
  hero: {
    region: 'BASE: GRENCHEN - BIENNE',
    headline: 'L\'ARRÊT N\'EST',
    subheadline: 'PAS UNE OPTION.',
    description: 'Le rendement compte. Nous sommes votre partenaire technique pour la maintenance industrielle et le montage. Si l\'installation s\'arrête, nous assurons le redémarrage.',
    cta_check: 'Diagnostic',
    cta_suva: 'Audit & Sécurité',
  },
  quickcheck: {
    ...de.quickcheck,
    title: 'Diagnostic Système',
    description: 'Initialisation de la demande. Transmettez les données de l\'installation pour une analyse immédiate.',
    items: [
      { id: '01', title: 'ID SYSTÈME', desc: 'Plaque signalétique.' },
      { id: '02', title: 'PANNE', desc: 'Description ou code.' },
      { id: '03', title: 'SITUATION', desc: 'Photo de la situation.' }
    ],
    call_cta: 'Service-Desk',
    digital_cta: 'Ouvrir un ticket',
  },
  calculator: {
    ...de.calculator,
    title: 'Coût de l\'arrêt',
    description: 'Calculez le risque économique d\'un arrêt de production non planifié.',
    inputs: {
        duration: 'Durée (H)',
        rate: 'Tarif Installation',
        employees: 'Personnel',
        rate_hint: 'CHF/h',
    },
    results: {
        ...de.calculator.results,
        risk: 'Perte estimée',
        production: 'Perte Production',
        personnel: 'Coût Personnel',
        cta: 'Demander Service',
        roi_title: 'ROI Maintenance',
        roi_desc: (months: number) => `L'amortissement est inférieur à ${months} mois.`,
    },
    severity: {
        low: 'MODÉRÉ',
        mid: 'CRITIQUE',
        high: 'RISQUE ÉLEVÉ',
    }
  },
  expertise: {
    title: 'Zone d\'intervention',
    subtitle: 'Secteur Plateau',
    headline_part1: 'Au centre de la',
    headline_part2: 'Région Industrielle',
    description: 'Notre emplacement à Lengnau est stratégique. Nous atteignons chaque entreprise à Granges, Bienne et Soleure en un temps record. Proximité maximale pour des temps d\'arrêt minimaux.',
    metrics: {
        response_title: 'Temps de Réponse',
        response_val: '< 30 Min',
        response_sub: '(Bienne/Soleure)',
        hub_title: 'Emplacement Hub',
        hub_val: 'QG Lengnau',
        hub_sub: '(Accès A5)'
    },
    map_legend: {
        express: 'Express (<15m)',
        core: 'Zone Clé (<30m)',
        extended: 'Étendu (<1h)',
        network: 'Réseau',
        zone1_label: '< 15 MIN',
        zone2_label: '< 30 MIN',
        zone3_label: '< 1 H',
    }
  },
  industries: {
    title: 'Industries Clés',
    subtitle: 'Expertise',
    items: [
      {
        title: 'Industrie Production',
        desc: 'Lignes de fabrication et automation. Nous assurons la disponibilité de vos installations par une maintenance préventive.',
        features: ['Plans maintenance', 'Service convoyeurs', 'Hydraulique & Pneumatique'],
        brands: 'Lignes montage, Cellules robot'
      },
      {
        title: 'Technologie Médicale',
        desc: 'Processus validés. Maintenance et montage en salle blanche (ISO 7) avec documentation complète.',
        features: ['Protocoles BPF', 'Protection contamination', 'Support d\'audit'],
        brands: 'Machines lavage, Emballage'
      },
      {
        title: 'Industrie Lourde',
        desc: 'Technique robuste. Maintenance de fonderies, presses et automation dans des conditions extrêmes.',
        features: ['Révision réducteurs', 'Contrôle sécurité', 'Rétrofit commandes'],
        brands: 'Fours, Presses, Grandes installations'
      },
      {
        title: 'Logistique & Automation',
        desc: 'Technique en mouvement. Service pour stockages automatisés et systèmes de tri.',
        features: ['Entraînements', 'Contrôle capteurs', 'Mises à jour sécurité'],
        brands: 'Systèmes stockage, Grues'
      }
    ]
  },
  services: {
    title: 'Portefeuille de Services',
    subtitle: 'Services Techniques',
    items: [
      { id: '1', title: 'Maintenance Industrielle', description: 'Maintenance globale de votre parc machines. Préventif et correctif pour éviter les arrêts.', details: ['Contrats maintenance.', 'Inspections.', 'Dépannage.'] },
      { id: '2', title: 'Montage & Démontage', description: 'Installation professionnelle de nouvelles installations et déménagements machines.', details: ['Déménagement machines.', 'Montage installations.', 'Support mise en service.'] },
      { id: '3', title: 'Rétrofit & Mise à niveau', description: 'Modernisation au lieu du remplacement. Intégration de nouveaux composants et commandes.', details: ['Mise à jour commande.', 'Mise aux normes sécurité.', 'Échange composants.'] },
      { id: '4', title: 'Électricité Industrielle', description: 'Recherche de pannes et réparation sur commandes électriques, moteurs et armoires.', details: ['Service armoires.', 'Contrôle moteurs.', 'Capteurs/Actionneurs.'] },
      { id: '5', title: 'Service Express', description: 'Intervention prioritaire en cas d\'arrêt. Temps de réaction garanti < 30 Min secteur Granges-Bienne.', details: ['Piquet 365 jours.', 'Statut Prio-1.', 'Logistique Express.'] },
      { id: '6', title: 'Service Mécanique', description: 'Réparation de réducteurs, pompes, hydraulique et systèmes pneumatiques sur site.', details: ['Service réducteurs.', 'Conduites hydrauliques.', 'Vannes pneumatiques.'] }
    ],
    more: 'Voir détails',
    modal_title: 'Détails du Service',
    modal_features: 'Prestations',
    modal_cta: 'Demander une offre',
  },
  flow: {
    title: 'Processus Service',
    subtitle: 'Flux de travail',
    steps: [
      { title: '1. Signalement', desc: 'Saisie de la panne ou du projet de montage. Première évaluation technique.' },
      { title: '2. Planification', desc: 'Planification intervention, matériel et équipe.' },
      { title: '3. Exécution', desc: 'Réalisation de la maintenance ou du montage. Test de fonctionnement.' }
    ],
    digital_report: 'Protocole de service numérique inclus',
  },
  trust_indicators: {
    title: 'Nos Standards',
    validated: { title: 'Certifié', desc: 'Exécution professionnelle.' },
    laser: { title: 'Précision', desc: 'Équipement de mesure moderne.' },
    discretion: { title: 'Sécurité', desc: 'Respect des normes.' },
  },
  career: {
    badge: 'Carrière',
    title: 'Rejoignez',
    subtitle: 'L\'équipe',
    intro_title: 'Nous cherchons des professionnels.',
    intro_text: 'Travailler chez APEX signifie : Missions variées dans l\'industrie, projets de montage et solutions pour les producteurs.',
    values: [
      { id: 'vacation', title: 'Détente', desc: '6 semaines de vacances. L\'équilibre est important.' },
      { id: 'education', title: 'Développement', desc: 'Soutien pour la formation continue (Agent maintenance).' },
      { id: 'team', title: 'Esprit d\'équipe', desc: 'Hiérarchies plates et communication directe.' },
      { id: 'tolerance', title: 'État d\'esprit', desc: 'Travail orienté solution et fierté artisanale.' }
    ],
    cta_init: 'Candidature spontanée',
    positions_title: 'Postes ouverts',
    no_position: 'Pas de poste correspondant ?',
    apply_cta: 'Postuler maintenant',
    modal: {
      location: 'Lieu de travail',
      workload: 'Taux d\'occupation',
      requirements: 'Profil requis',
      benefits: 'Avantages',
      apply_now: 'Démarrer candidature',
    },
    jobs: [
        { 
            id: 'job1', 
            title: 'Technicien de Maintenance (h/f/d)', 
            location: 'Lengnau / Mobile', 
            workload: '100%', 
            description: 'Vous êtes responsable de la maintenance, réparation et dépannage des installations de production chez nos clients.', 
            requirements: ['Formation Polymécanicien/Automaticien/Mécanicien agricole', 'Expérience en maintenance', 'Permis de conduire Cat. B'],
            benefits: ['Véhicule de service personnel', 'Outillage Top & Tablette', 'Salaire attractif']
        },
        { 
            id: 'job2', 
            title: 'Mécanicien Industriel Montage (h/f/d)', 
            location: 'Région Plateau', 
            workload: '100%', 
            description: 'Montage et mise en service de nouvelles installations ainsi que déménagements de machines.', 
            requirements: ['Habileté manuelle', 'Disponibilité régionale', 'Esprit d\'équipe'],
            benefits: ['Projets variés', 'Frais de repas', 'Équipement moderne']
        }
    ]
  },
  contact: {
    badge: 'Contact',
    title: 'Service-Desk',
    address_label: 'Site',
    hotline_label: 'Hotline 24/7',
    digital_label: 'En ligne',
    status: 'STATUT: EN LIGNE',
    form: {
      reason_label: 'Objet',
      name: 'Nom / ID',
      company: 'Société',
      phone: 'Numéro de rappel',
      details: 'Description',
      submit: 'Envoyer demande',
      security: 'Cryptage SSL',
      success_title: 'Ticket créé',
      success_desc: 'Nous avons reçu votre demande. Un technicien vous contactera sous peu.',
      emergency: {
        title: 'Service d\'urgence',
        desc: 'Pour les arrêts urgents, veuillez utiliser la hotline directe.',
        priority: 'PRIORITÉ',
      }
    }
  },
  footer: {
    brand_desc: 'Spécialisé dans la maintenance industrielle, le montage et le service technique.',
    services_title: 'Offre',
    region_title: 'Région',
    contact_title: 'Contact',
    callback: 'Service de rappel',
    rights: 'APEX Industrial Solutions. Alle Rechte vorbehalten.',
  }
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('de');
  const [theme, setTheme] = useState<Theme>('dark');
  const [inquiryDraft, setInquiryDraft] = useState('');
  const [activeReason, setActiveReason] = useState<ContactReason | null>(null);

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
    language, setLanguage, theme, toggleTheme, t, inquiryDraft, setInquiryDraft, activeReason, setActiveReason
  }), [language, theme, t, inquiryDraft, activeReason]);

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
