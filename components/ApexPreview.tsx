'use client';

import React from 'react';
import { ClipboardCheck, Ruler, ShieldCheck } from 'lucide-react';

// Components
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { TrustBar } from './TrustBar';
import { QuickCheck } from './QuickCheck';
import { Services } from './Services';
import { Industries } from './Industries';
import { ServiceFlow } from './ServiceFlow';
import { DowntimeCalculator } from './DowntimeCalculator';
import { RegionalExpertise } from './RegionalExpertise';
import { CareerSection } from './CareerSection';
import { ContactForm } from './ContactForm';
import { Footer } from './Footer';
import { useSettings } from '../contexts/SettingsContext';

export const ApexPreview: React.FC = () => {
  const { t } = useSettings();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      
      <Navbar />

      <main className="flex-grow">
        
        {/* 1. Hero: Regionale Positionierung */}
        <Hero />

        {/* 2. Trust Bar: Social Proof */}
        <TrustBar />

        {/* 3. Quick Check: Sofort-Hilfe vor dem Anruf */}
        <QuickCheck />

        {/* 4. Services: Detaillierte Leistungen */}
        <Services />

        {/* 5. Industries: Fokus Branchen */}
        <Industries />

        {/* 6. Prozess: Wie wir arbeiten */}
        <ServiceFlow />

        {/* 7. Value: Kosten des Stillstands */}
        <DowntimeCalculator />

        {/* 8. Region: Standortvorteil & Karte */}
        <RegionalExpertise />

        {/* 9. Karriere: Recruiting */}
        <CareerSection />

        {/* 10. Trust Indicators: Sicherheit & Qualität */}
        <section id="sicherheit" className="py-24 bg-slate-200 dark:bg-slate-900 border-t border-slate-300 dark:border-white/5 transition-colors duration-300">
           <div className="container mx-auto px-4 max-w-4xl text-center">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-12">{t.trust_indicators.title}</h2>
              <div className="grid md:grid-cols-3 gap-8">
                 <div className="bg-white dark:bg-slate-950 p-6 border border-slate-300 dark:border-white/5 hover:border-safety/30 transition-all duration-300 group shadow-sm hover:shadow-lg dark:shadow-none rounded-sm">
                    <ClipboardCheck className="mx-auto text-safety mb-4 group-hover:scale-110 transition-transform" size={32} />
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">{t.trust_indicators.validated.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-500">{t.trust_indicators.validated.desc}</p>
                 </div>
                 <div className="bg-white dark:bg-slate-950 p-6 border border-slate-300 dark:border-white/5 hover:border-safety/30 transition-all duration-300 group shadow-sm hover:shadow-lg dark:shadow-none rounded-sm">
                    <Ruler className="mx-auto text-safety mb-4 group-hover:scale-110 transition-transform" size={32} />
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">{t.trust_indicators.laser.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-500">{t.trust_indicators.laser.desc}</p>
                 </div>
                 <div className="bg-white dark:bg-slate-950 p-6 border border-slate-300 dark:border-white/5 hover:border-safety/30 transition-all duration-300 group shadow-sm hover:shadow-lg dark:shadow-none rounded-sm">
                    <ShieldCheck className="mx-auto text-safety mb-4 group-hover:scale-110 transition-transform" size={32} />
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">{t.trust_indicators.discretion.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-500">{t.trust_indicators.discretion.desc}</p>
                 </div>
              </div>
           </div>
        </section>

        {/* 11. Kontakt & Lead Gen */}
        <ContactForm />
      </main>

      <Footer />

      {/* Mobile Sticky CTA */}
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