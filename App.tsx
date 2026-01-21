'use client';

import React from 'react';
import { ClipboardCheck, Ruler, ShieldCheck } from 'lucide-react';

// Component Imports
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DowntimeCalculator } from './components/DowntimeCalculator';
import { Services } from './components/Services';
import { Industries } from './components/Industries';
import { RegionalExpertise } from './components/RegionalExpertise';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { QuickCheck } from './components/QuickCheck';
import { ServiceFlow } from './components/ServiceFlow';
import { CareerSection } from './components/CareerSection';
import { SettingsProvider, useSettings } from './contexts/SettingsContext';

const AppContent = () => {
  const { t } = useSettings();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-safety selection:text-white transition-colors duration-300">
      <div className="bg-noise"></div>
      
      {/* 1. Navigation */}
      <Navbar />

      <main className="flex-grow">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Quick Check */}
        <QuickCheck />

        {/* 4. Core Services */}
        <Services />

        {/* 5. Industries (NEW) */}
        <Industries />

        {/* 6. Service Flow */}
        <ServiceFlow />

        {/* 7. Value Proposition / Downtime Calculator */}
        <DowntimeCalculator />

        {/* 8. Regional Advantage & Industries */}
        <RegionalExpertise />

        {/* 9. Career */}
        <CareerSection />

        {/* 10. Trust Indicators - Theme & Translation Aware */}
        <section id="sicherheit" className="py-24 bg-slate-200 dark:bg-slate-900 border-t border-slate-300 dark:border-white/5 transition-colors duration-300">
           <div className="container mx-auto px-4 max-w-4xl text-center">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-12">{t.trust_indicators.title}</h2>
              <div className="grid md:grid-cols-3 gap-8">
                 <div className="bg-white dark:bg-slate-900 p-6 border border-slate-300 dark:border-white/5 hover:border-safety/30 transition-all duration-300 group shadow-sm hover:shadow-lg dark:shadow-none rounded-sm">
                    <ClipboardCheck className="mx-auto text-safety mb-4 group-hover:scale-110 transition-transform" size={32} />
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">{t.trust_indicators.validated.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-500">{t.trust_indicators.validated.desc}</p>
                 </div>
                 <div className="bg-white dark:bg-slate-900 p-6 border border-slate-300 dark:border-white/5 hover:border-safety/30 transition-all duration-300 group shadow-sm hover:shadow-lg dark:shadow-none rounded-sm">
                    <Ruler className="mx-auto text-safety mb-4 group-hover:scale-110 transition-transform" size={32} />
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">{t.trust_indicators.laser.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-500">{t.trust_indicators.laser.desc}</p>
                 </div>
                 <div className="bg-white dark:bg-slate-900 p-6 border border-slate-300 dark:border-white/5 hover:border-safety/30 transition-all duration-300 group shadow-sm hover:shadow-lg dark:shadow-none rounded-sm">
                    <ShieldCheck className="mx-auto text-safety mb-4 group-hover:scale-110 transition-transform" size={32} />
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">{t.trust_indicators.discretion.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-500">{t.trust_indicators.discretion.desc}</p>
                 </div>
              </div>
           </div>
        </section>

        {/* 11. Contact / Lead Gen */}
        <ContactForm />
      </main>

      {/* 12. Footer */}
      <Footer />

      {/* Sticky Mobile Emergency Button */}
      <div className="fixed bottom-0 left-0 w-full z-50 md:hidden pointer-events-none">
        <div className="bg-gradient-to-t from-slate-50/90 dark:from-slate-950/90 to-transparent pb-safe pt-8">
           <a href="tel:+41321234567" className="pointer-events-auto flex items-center justify-center gap-3 bg-safety w-full py-4 text-white font-black uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(255,68,0,0.5)]">
              <span className="animate-pulse">●</span> PIKETT 24/7 RUFEN
           </a>
        </div>
      </div>

    </div>
  );
};

function App() {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  );
}

export default App;