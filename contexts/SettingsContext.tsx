import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Theme, Translations } from '../types';

interface SettingsContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  t: Translations;
}

const translations: Record<Language, Translations> = {
  de: {
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
    }
  },
  fr: {
    nav: {
      services: 'Services',
      industries: 'Secteurs',
      expertise: 'Expertise',
      emergency: 'Urgence 24/7',
      status: 'ÉTAT DU SYSTÈME: EN LIGNE',
      location: 'GRENCHEN // BIENNE // SOLEURE',
    },
    hero: {
      region: 'ESPACE MITTELLAND: GRENCHEN - BIEL/BIENNE',
      headline: 'TEMPS D\'ARRÊT MINIMAL',
      subheadline: 'GRÂCE À LA PROXIMITÉ.',
      description: 'Nous comprenons le rythme de votre production. Horlogerie, Medtech ou usinage de précision : Nous sommes sur place avant que l\'arrêt ne devienne coûteux.',
      cta_check: 'Check-up Rapide',
      cta_suva: 'Conforme SUVA',
    }
  }
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('de');
  const [theme, setTheme] = useState<Theme>('dark');

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

  return (
    <SettingsContext.Provider value={{ language, setLanguage, theme, toggleTheme, t: translations[language] }}>
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