'use client'; // Marking as client component to use useSettings directly in the page body parts if needed, though mostly children do the work.

import React from 'react';
import { ClipboardCheck, Ruler, ShieldCheck } from 'lucide-react';

// Components
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { TrustBar } from '../components/TrustBar';
import { QuickCheck } from '../components/QuickCheck';
import { Services } from '../components/Services';
import { Industries } from '../components/Industries';
import { ServiceFlow } from '../components/ServiceFlow';
import { DowntimeCalculator } from '../components/DowntimeCalculator';
import { RegionalExpertise } from '../components/RegionalExpertise';
import { CareerSection } from '../components/CareerSection';
import { ContactForm } from '../components/ContactForm';
import { Footer } from '../components/Footer';
import { useSettings } from '../contexts/SettingsContext';

export default function Home() {
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

        {/* 5. Industries: Fokus Branchen (NEW) */}
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
        <section id="sicherheit" className="py-24 bg-slate-900 border-t border-white/5">
           <div className="container mx-auto px-4 max-w-4xl text-center">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-12">{t.trust_indicators.title}</h2>
              <div className="grid md:grid-cols-3 gap-8">
                 <div className="bg-slate-950 p-6 border border-white/5 hover:border-safety/30 transition-colors group">
                    <ClipboardCheck className="mx-auto text-safety mb-4 group-hover:scale-110 transition-transform" size={32} />
                    <h4 className="font-bold text-white mb-2">{t.trust_indicators.validated.title}</h4>
                    <p className="text-xs text-slate-500">{t.trust_indicators.validated.desc}</p>
                 </div>
                 <div className="bg-slate-950 p-6 border border-white/5 hover:border-safety/30 transition-colors group">
                    <Ruler className="mx-auto text-safety mb-4 group-hover:scale-110 transition-transform" size={32} />
                    <h4 className="font-bold text-white mb-2">{t.trust_indicators.laser.title}</h4>
                    <p className="text-xs text-slate-500">{t.trust_indicators.laser.desc}</p>
                 </div>
                 <div className="bg-slate-950 p-6 border border-white/5 hover:border-safety/30 transition-colors group">
                    <ShieldCheck className="mx-auto text-safety mb-4 group-hover:scale-110 transition-transform" size={32} />
                    <h4 className="font-bold text-white mb-2">{t.trust_indicators.discretion.title}</h4>
                    <p className="text-xs text-slate-500">{t.trust_indicators.discretion.desc}</p>
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
        <div className="bg-gradient-to-t from-slate-950 to-transparent pb-safe">
          <a href="tel:+41321234567" className="pointer-events-auto flex items-center justify-center gap-3 bg-safety hover:bg-white hover:text-safety transition-colors w-full py-4 text-white font-black uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(255,68,0,0.5)]">
             <span className="animate-pulse">●</span> PIKETT RUFEN
          </a>
        </div>
      </div>

    </div>
  );
}