'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Theme, Translations } from '../types';

interface SettingsContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  t: Translations;
  inquiryDraft: string;
  setInquiryDraft: (text: string) => void;
}

// FULL GERMAN TRANSLATION
const de: Translations = {
  nav: {
    services: 'Leistungen',
    industries: 'Branchen',
    expertise: 'Expertise',
    emergency: 'Notfall-Pikett',
    status: 'SYSTEM STATUS: ONLINE',
    location: 'GRENCHEN // BIEL // SOLOTHURN',
  },
  hero: {
    region: 'ESPACE MITTELLAND: GRENCHEN - BIEL/BIENNE',
    headline: 'MINIMALE AUSFALLZEIT',
    subheadline: 'DURCH REGIONALE NÄHE.',
    description: 'Wir verstehen den Takt Ihrer Produktion. Ob Uhrenindustrie, Medtech oder Präzisionsfertigung: Wir sind vor Ort, bevor der Stillstand teuer wird.',
    cta_check: 'Notfall Quick-Check',
    cta_suva: 'SUVA Konform',
  },
  trust: {
    label: 'Expertise in Systemen von:',
  },
  quickcheck: {
    title: 'Notfall Quick-Check',
    description: 'Damit unser Pikett-Techniker sofort die richtigen Ersatzteile einpacken kann: Bitte halten Sie diese 3 Informationen bereit, bevor Sie anrufen.',
    items: [
      { id: '01', title: 'MASCHINEN-TYP', desc: 'Siehe Typenschild.' },
      { id: '02', title: 'FEHLERCODE', desc: 'Exakte Display-Meldung.' },
      { id: '03', title: 'FOTO', desc: 'Per WhatsApp senden.' }
    ],
    call_cta: 'Pikett-Line 24/7',
    digital_cta: 'Digitale Störungsmeldung',
  },
  industries: {
    title: 'Fokus Sektoren',
    subtitle: 'Spezialisierung',
    items: [
      {
        title: 'Uhrenindustrie',
        desc: 'Höchste Präzision für die kleinsten Teile. Wir beherrschen die Maschinen, die das Herz der Schweizer Wirtschaft antreiben.',
        features: ['Wartung von Langdrehern', 'Spindel-Service < 2µ Runout', 'Stangenlader-Integration'],
        brands: 'Tornos, Bumotec, Willemin-Macodel'
      },
      {
        title: 'Medizintechnik',
        desc: 'Instandhaltung in regulierten Umgebungen. Wir garantieren Compliance und Sauberkeit für Ihre Produktion.',
        features: ['GMP-konforme Dokumentation', 'Reinraum-Protokolle (ISO 7/8)', 'Validierungs-Support'],
        brands: 'Chiron, Starrag, Mikron'
      },
      {
        title: 'Präzisionsfertigung',
        desc: 'High-Performance für Automobil & Aerospace. Inklusive Werkzeug- & Formenbau (HSC). Minimierung der Nebenzeiten.',
        features: ['Automations-Anbindung', 'Kühlmittel-Management', 'Geometrie nach ISO 230'],
        brands: 'Index, Traub, Fanuc, GF Machining'
      },
      {
        title: 'Giessereien',
        desc: 'Wartung unter Extrembedingungen. Wir sorgen dafür, dass Hitze und Staub Ihre Automation nicht stoppen.',
        features: ['Wartung von Entnahme-Robotern', 'Industriekran-Wartung & Reparatur', 'Hydraulik-Instandsetzung'],
        brands: 'Bühler, Frech, FAT, Kuka Foundry'
      }
    ]
  },
  services: {
    title: 'Leistungs-Spektrum',
    subtitle: 'End-to-End Service',
    items: [
      { id: '1', title: 'Wartungsverträge', description: 'Proaktiver Schutz. Verhindern Sie Ausfälle durch geplante Interventionen und garantierte Reaktionszeiten (SLA).', details: ['Individuelle SLA-Level (Bronze, Silber, Gold).', 'Jährliche Laser-Vermessung.', 'Bis zu 20% Rabatt auf Teile.'] },
      { id: '2', title: 'Mikromechanik & CNC', description: 'Tiefes Know-how für Tornos, Bumotec & Willemin. Spindel-Service und Geometrie-Korrektur im µ-Bereich.', details: ['Spezialisiert auf Langdreher.', 'Optimierung von CNC-Parametern.', 'Schulung Bedienpersonal.'] },
      { id: '3', title: 'Retrofit & Modernisierung', description: 'Industrie 4.0 Upgrade für ältere Anlagen. Neue Steuerungen und Antriebe statt teurer Neukauf.', details: ['Austausch veralteter Steuerungen.', 'Integration IoT-Gateways.', 'Sicherheits-Update nach SUVA.'] },
      { id: '4', title: 'Validierung (GMP)', description: 'Lückenloser Paper-Trail für Medtech & Pharma. Wir liefern die Dokumentation für Ihre Audits.', details: ['IQ/OQ/PQ Support.', 'Kalibrier-Zertifikate.', 'Reinraum-taugliches Equipment.'] },
      { id: '5', title: '24/7 Notfall-Pikett', description: 'Wir schlafen nicht. Garantierte Interventionszeit < 2h im Espace Mittelland.', details: ['365 Tage Erreichbarkeit.', 'Keine Callcenter.', 'Ersatzteil-Express Zugriff.'] },
      { id: '6', title: 'Spindel-Logistik', description: 'Lokales Austauschlager für Fischer/Kessler. Kein Export nötig. Plug & Play Austausch.', details: ['Pool für gängige Modelle.', 'Schwingungsanalyse nach Einbau.', 'Leihspindeln verfügbar.'] }
    ],
    more: 'Mehr erfahren',
    modal_title: 'Service Übersicht',
    modal_features: 'Key Features',
    modal_cta: 'Unverbindliche Offerte',
  },
  flow: {
    title: 'Service Ablauf',
    subtitle: 'Simpel & Effizient',
    steps: [
      { title: '1. Meldung', desc: 'Sie melden die Störung (Tel/Online). Unser Dispatcher priorisiert sofort nach Dringlichkeit.' },
      { title: '2. Diagnose', desc: 'Remote-Erstanalyse oder Vor-Ort-Check. Wir identifizieren das Problem und beschaffen Teile.' },
      { title: '3. Solution', desc: 'Fachgerechte Reparatur, Testlauf und digitale Dokumentation für Ihre Unterlagen.' }
    ],
    digital_report: 'Digitale Rapporte sofort verfügbar',
  },
  calculator: {
    badge: 'Business Impact Analyse',
    title: 'Cost of Inaction',
    description: 'Stillstand ist teurer als Instandhaltung. Nutzen Sie diesen Rechner, um das finanzielle Risiko eines ungeplanten Maschinen-Ausfalls zu quantifizieren.',
    inputs: {
      duration: 'Stillstandsdauer',
      rate: 'Maschinen-Stundensatz',
      employees: 'Betroffenes Personal',
      rate_hint: 'Durchschnitt 5-Achs CNC: ~250-400 CHF/h',
    },
    results: {
      risk: 'Total Risk Exposure',
      production: 'Produktionsausfall',
      personnel: 'Personalkosten',
      cta: 'Risiko jetzt minimieren',
      roi_title: 'ROI Perspektive',
      roi_desc: (months) => `Für die Kosten dieses einzigen Vorfalls könnten Sie ca. ${months} Monate lang einen präventiven Wartungsvertrag finanzieren.`
    },
    severity: {
      low: 'MODERAT',
      mid: 'SIGNIFIKANT',
      high: 'KRITISCH'
    }
  },
  expertise: {
    title: 'Operational Radius',
    subtitle: 'Standortvorteil',
    headline_part1: 'Andere stehen im Stau.',
    headline_part2: 'Wir sind schon da.',
    description: 'Unser HQ in Lengnau (Solothurnstrasse 44) ist strategisch platziert. Wir erreichen jeden Kunden im Industrie-Cluster Grenchen-Biel in unter 20 Minuten. Das ist kein Marketing – das ist Geographie.',
    stat_time: { title: 'Minimale Reaktionszeit', desc: 'Garantierte Ankunft ("Boots on the Ground") innerhalb SLA-Zeitfenster.' },
    stat_stock: { title: 'Ersatzteillager Lengnau', desc: 'Kritische Komponenten für Tornos & Fanuc direkt ab Lager verfügbar.' }
  },
  career: {
    badge: 'Für Profis',
    title: 'Kein Job für',
    subtitle: 'Bastler.',
    description: 'Gute Techniker sind Gold wert. Deshalb behandeln wir sie auch so. Bei Apex Industrial arbeitest du mit High-End Equipment an den anspruchsvollsten Maschinen der Schweiz.',
    perks: [
      { title: 'Premium Werkzeug', desc: 'Volle Hilti & Festool Ausstattung. iPad Pro.' },
      { title: 'Service-Fahrzeug', desc: 'VW Transporter zur privaten Nutzung.' },
      { title: 'Academy', desc: 'Bezahlte SPS-Kurse & Hersteller-Schulungen.' }
    ],
    cta_init: 'Initiativ bewerben',
    positions_title: 'Open Positions',
    no_position: 'Keine passende Stelle?',
    apply_cta: 'Sende uns dein Dossier',
    modal: {
      location: 'Standort',
      workload: 'Pensum',
      requirements: 'Das bringst du mit',
      benefits: 'Deine Benefits',
      apply_now: 'Jetzt bewerben'
    },
    jobs: [
      {
        id: 'cnc-tech',
        title: 'Servicetechniker CNC (m/w/d)',
        location: 'Region Biel/Bienne',
        workload: '100%',
        description: 'Du bist die Feuerwehr für unsere Kunden in der Uhrenindustrie. Wenn eine Tornos oder Bumotec steht, sorgst du dafür, dass die Späne wieder fliegen.',
        requirements: ['Ausbildung als Polymechaniker/Automatiker.', 'Erfahrung mit CNC-Maschinen.', 'Fanuc/Siemens Kenntnisse.'],
        benefits: ['Top Fahrzeug (privat nutzbar).', 'Hilti/Festool Werkzeug.', 'Flexible Startzeiten.']
      },
      {
        id: 'retro-auto',
        title: 'Automatiker für Retrofit (m/w/d)',
        location: 'Region Solothurn',
        workload: '80-100%',
        description: 'Du hauchst alten Maschinen neues Leben ein. Du entwickelst neue Steuerungskonzepte und integrierst IoT-Lösungen.',
        requirements: ['Automatiker EFZ.', 'EPLAN Kenntnisse.', 'SPS-Programmierung (TIA).'],
        benefits: ['Moderne Werkstatt.', 'Wenig Reisetätigkeit.', '5 Wochen Ferien.']
      }
    ]
  },
  trust_indicators: {
    title: 'VERTRAUEN DURCH EXPERTISE',
    validated: { title: 'Validierte Berichte', desc: 'Digitale Service-Reports, direkt verwendbar für Ihre QM-Dokumentation.' },
    laser: { title: 'Laser-Vermessung', desc: 'Einsatz modernster Interferometer zur geometrischen Abnahme.' },
    discretion: { title: 'Discrétion', desc: 'Wir arbeiten in den sensibelsten Bereichen. Ihre IP ist sicher.' }
  },
  contact: {
    badge: 'Kontakt',
    title: 'Aufnehmen',
    address_label: 'HQ Adresse',
    hotline_label: '24/7 Hotline',
    digital_label: 'Digital',
    status: 'System Status: Operational',
    form: {
      reason_label: 'Worum geht es?',
      name: 'Name *',
      company: 'Firma *',
      phone: 'Telefon *',
      details: 'Details / Fehlermeldung',
      submit: 'Anfrage Senden',
      security: 'SSL-Verschlüsselt. Diskretion garantiert.',
      success_title: 'Anfrage Übermittelt',
      success_desc: 'Unser Dispatcher prüft Ihre Meldung. Wir melden uns innert 30 Minuten.',
      emergency: {
        title: 'Notfall-Modus',
        desc: 'Bei Maschinenstillstand benötigen Sie sofortige Hilfe. Verlieren Sie keine Zeit mit E-Mails.',
        priority: 'Priorität A+'
      }
    }
  },
  footer: {
    brand_desc: 'Spezialisiert auf die Instandhaltung von CNC-Werkzeugmaschinen und Reinraum-Anlagen in der Uhrenindustrie und Medizintechnik.',
    services_title: 'Services',
    region_title: 'Einsatzgebiet',
    contact_title: 'Kontakt HQ',
    callback: 'Rückruf anfordern',
    rights: 'APEX INDUSTRIAL SWISS AG. ALL SYSTEMS OPERATIONAL.'
  }
};

// FULL FRENCH TRANSLATION
const fr: Translations = {
  nav: {
    services: 'Services',
    industries: 'Secteurs',
    expertise: 'Expertise',
    emergency: 'Urgence 24/7',
    status: 'ÉTAT SYSTÈME: EN LIGNE',
    location: 'GRENCHEN // BIENNE // SOLEURE',
  },
  hero: {
    region: 'ESPACE MITTELLAND: GRENCHEN - BIENNE',
    headline: 'TEMPS D\'ARRÊT MINIMAL',
    subheadline: 'GRÂCE À LA PROXIMITÉ.',
    description: 'Nous comprenons le rythme de votre production. Horlogerie, Medtech ou usinage de précision : Nous sommes sur place avant que l\'arrêt ne devienne coûteux.',
    cta_check: 'Check-up Rapide',
    cta_suva: 'Conforme SUVA',
  },
  trust: {
    label: 'Expertise sur systèmes:',
  },
  quickcheck: {
    title: 'Check-up d\'Urgence',
    description: 'Pour que notre technicien de piquet puisse emporter les bonnes pièces : Préparez ces 3 informations avant d\'appeler.',
    items: [
      { id: '01', title: 'TYPE MACHINE', desc: 'Voir plaque signalétique.' },
      { id: '02', title: 'CODE ERREUR', desc: 'Message exact sur l\'écran.' },
      { id: '03', title: 'PHOTO', desc: 'Envoyer par WhatsApp.' }
    ],
    call_cta: 'Ligne Piquet 24/7',
    digital_cta: 'Signalement Digital',
  },
  industries: {
    title: 'Secteurs Clés',
    subtitle: 'Spécialisation',
    items: [
      {
        title: 'Horlogerie',
        desc: 'Précision maximale pour les plus petites pièces. Nous maîtrisons les machines qui font tourner l\'économie suisse.',
        features: ['Maintenance décolleteuses', 'Service broche < 2µ Runout', 'Intégration ravitailleurs'],
        brands: 'Tornos, Bumotec, Willemin-Macodel'
      },
      {
        title: 'Medtech',
        desc: 'Maintenance en environnement régulé. Nous garantissons la conformité et la propreté de votre production.',
        features: ['Documentation GMP', 'Protocoles salle blanche', 'Support validation'],
        brands: 'Chiron, Starrag, Mikron'
      },
      {
        title: 'Usinage Précision',
        desc: 'Haute performance pour Auto & Aéro. Y compris Moules & Outillages (UGV). Minimisation des temps morts.',
        features: ['Connexion automation', 'Gestion lubrifiants', 'Géométrie selon ISO 230'],
        brands: 'Index, Traub, Fanuc, GF Machining'
      },
      {
        title: 'Fonderies',
        desc: 'Maintenance en conditions extrêmes. Nous veillons à ce que la chaleur et la poussière n\'arrêtent pas votre automatisation.',
        features: ['Robots de prélèvement', 'Entretien ponts roulants', 'Maintenance hydraulique'],
        brands: 'Bühler, Frech, FAT, Kuka Foundry'
      }
    ]
  },
  services: {
    title: 'Gamme de Services',
    subtitle: 'Service de A à Z',
    items: [
      { id: '1', title: 'Contrats de maintenance', description: 'Protection proactive. Évitez les pannes grâce à des interventions planifiées et des temps de réponse garantis (SLA).', details: ['Niveaux SLA individuels.', 'Mesure laser annuelle.', 'Jusqu\'à 20% de rabais sur les pièces.'] },
      { id: '2', title: 'Micromécanique & CNC', description: 'Savoir-faire approfondi pour Tornos, Bumotec & Willemin. Service de broche et correction géométrique en µ.', details: ['Spécialisé en décolletage.', 'Optimisation paramètres CNC.', 'Formation opérateurs.'] },
      { id: '3', title: 'Rétrofit & Modernisation', description: 'Mise à niveau Industrie 4.0. Nouvelles commandes et entraînements au lieu d\'achats coûteux.', details: ['Remplacement commandes obsolètes.', 'Intégration IoT.', 'Mise à jour sécurité SUVA.'] },
      { id: '4', title: 'Validation (GMP)', description: 'Documentation complète pour Medtech & Pharma. Nous fournissons les documents pour vos audits.', details: ['Support IQ/OQ/PQ.', 'Certificats de calibrage.', 'Équipement salle blanche.'] },
      { id: '5', title: 'Piquet d\'Urgence 24/7', description: 'Nous ne dormons pas. Temps d\'intervention garanti < 2h dans l\'Espace Mittelland.', details: ['Disponibilité 365 jours.', 'Pas de centre d\'appel.', 'Accès express aux pièces.'] },
      { id: '6', title: 'Logistique Broches', description: 'Stock local pour Fischer/Kessler. Pas d\'exportation nécessaire. Échange Plug & Play.', details: ['Pool modèles courants.', 'Analyse vibratoire.', 'Broches de prêt disponibles.'] }
    ],
    more: 'En savoir plus',
    modal_title: 'Aperçu du Service',
    modal_features: 'Caractéristiques Clés',
    modal_cta: 'Offre sans engagement',
  },
  flow: {
    title: 'Processus',
    subtitle: 'Simple & Efficace',
    steps: [
      { title: '1. Signalement', desc: 'Vous signalez la panne (Tél/Online). Notre répartiteur priorise immédiatement.' },
      { title: '2. Diagnostic', desc: 'Analyse à distance ou sur site. Nous identifions le problème et trouvons les pièces.' },
      { title: '3. Solution', desc: 'Réparation professionnelle, test et documentation numérique pour vos dossiers.' }
    ],
    digital_report: 'Rapports numériques disponibles immédiatement',
  },
  calculator: {
    badge: 'Analyse Impact Business',
    title: 'Coût de l\'Inaction',
    description: 'L\'arrêt coûte plus cher que la maintenance. Utilisez ce calculateur pour quantifier le risque financier.',
    inputs: {
      duration: 'Durée d\'arrêt',
      rate: 'Taux horaire machine',
      employees: 'Personnel affecté',
      rate_hint: 'Moyenne CNC 5 axes: ~250-400 CHF/h',
    },
    results: {
      risk: 'Exposition au Risque',
      production: 'Perte production',
      personnel: 'Coût personnel',
      cta: 'Minimiser le risque maintenant',
      roi_title: 'Perspective ROI',
      roi_desc: (months) => `Pour le coût de cet incident unique, vous pourriez financer environ ${months} mois de contrat de maintenance.`
    },
    severity: {
      low: 'MODÉRÉ',
      mid: 'SIGNIFICATIF',
      high: 'CRITIQUE'
    }
  },
  expertise: {
    title: 'Rayon Opérationnel',
    subtitle: 'Avantage Local',
    headline_part1: 'Les autres sont dans les bouchons.',
    headline_part2: 'Nous sommes déjà là.',
    description: 'Notre QG à Lengnau est stratégiquement placé. Nous atteignons chaque client du cluster Grenchen-Bienne en moins de 20 minutes. Ce n\'est pas du marketing, c\'est de la géographie.',
    stat_time: { title: 'Temps de réaction minimal', desc: 'Arrivée garantie dans la fenêtre SLA.' },
    stat_stock: { title: 'Stock pièces Lengnau', desc: 'Composants critiques pour Tornos & Fanuc disponibles.' }
  },
  career: {
    badge: 'Pour les Pros',
    title: 'Pas un job pour',
    subtitle: 'Bricoleurs.',
    description: 'Les bons techniciens valent de l\'or. Chez Apex Industrial, vous travaillez avec un équipement haut de gamme sur les machines les plus exigeantes.',
    perks: [
      { title: 'Outillage Premium', desc: 'Équipement Hilti & Festool complet. iPad Pro.' },
      { title: 'Véhicule Service', desc: 'VW Transporter pour usage privé.' },
      { title: 'Academy', desc: 'Cours API & formations constructeurs payés.' }
    ],
    cta_init: 'Candidature spontanée',
    positions_title: 'Postes Ouverts',
    no_position: 'Pas de poste adapté ?',
    apply_cta: 'Envoyez votre dossier',
    modal: {
      location: 'Lieu',
      workload: 'Taux',
      requirements: 'Votre profil',
      benefits: 'Vos avantages',
      apply_now: 'Postuler maintenant'
    },
    jobs: [
      {
        id: 'cnc-tech',
        title: 'Technicien Service CNC (h/f)',
        location: 'Région Bienne',
        workload: '100%',
        description: 'Vous êtes le pompier pour nos clients horlogers. Quand une Tornos s\'arrête, vous faites en sorte que les copeaux volent à nouveau.',
        requirements: ['Polymécanicien/Automaticien.', 'Expérience machines CNC.', 'Connaissances Fanuc/Siemens.'],
        benefits: ['Véhicule top (usage privé).', 'Outillage Hilti/Festool.', 'Horaires flexibles.']
      },
      {
        id: 'retro-auto',
        title: 'Automaticien Rétrofit (h/f)',
        location: 'Région Soleure',
        workload: '80-100%',
        description: 'Vous redonnez vie aux vieilles machines. Vous développez de nouveaux concepts de commande et intégrez des solutions IoT.',
        requirements: ['CFC Automaticien.', 'Connaissances EPLAN.', 'Programmation API (TIA).'],
        benefits: ['Atelier moderne.', 'Peu de déplacements.', '5 semaines de vacances.']
      }
    ]
  },
  trust_indicators: {
    title: 'CONFIANCE PAR L\'EXPERTISE',
    validated: { title: 'Rapports Validés', desc: 'Rapports de service numériques pour votre documentation QM.' },
    laser: { title: 'Mesure Laser', desc: 'Utilisation d\'interféromètres modernes pour la réception géométrique.' },
    discretion: { title: 'Discrétion', desc: 'Nous travaillons dans les secteurs sensibles. Votre IP est en sécurité.' }
  },
  contact: {
    badge: 'Contact',
    title: 'Prendre',
    address_label: 'Adresse QG',
    hotline_label: 'Hotline 24/7',
    digital_label: 'Numérique',
    status: 'État Système: Opérationnel',
    form: {
      reason_label: 'De quoi s\'agit-il ?',
      name: 'Nom *',
      company: 'Société *',
      phone: 'Téléphone *',
      details: 'Détails / Message',
      submit: 'Envoyer la demande',
      security: 'Chiffré SSL. Discrétion garantie.',
      success_title: 'Demande Transmise',
      success_desc: 'Notre répartiteur examine votre message. Nous vous contactons dans les 30 minutes.',
      emergency: {
        title: 'Mode Urgence',
        desc: 'En cas d\'arrêt machine, vous avez besoin d\'aide immédiate. Ne perdez pas de temps avec des emails.',
        priority: 'Priorité A+'
      }
    }
  },
  footer: {
    brand_desc: 'Spécialisé dans la maintenance de machines-outils CNC et d\'installations salle blanche pour l\'horlogerie et la technique médicale.',
    services_title: 'Services',
    region_title: 'Rayon d\'action',
    contact_title: 'Contact QG',
    callback: 'Demander rappel',
    rights: 'APEX INDUSTRIAL SWISS AG. TOUS SYSTÈMES OPÉRATIONNELS.'
  }
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children?: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('de');
  const [theme, setTheme] = useState<Theme>('dark');
  const [inquiryDraft, setInquiryDraft] = useState('');

  // Initial Theme Check
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const translations = language === 'de' ? de : fr;

  return (
    <SettingsContext.Provider value={{ language, setLanguage, theme, toggleTheme, t: translations, inquiryDraft, setInquiryDraft }}>
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