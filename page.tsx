import React from 'react';
import { ClipboardCheck, Ruler, ShieldCheck } from 'lucide-react';

// Component Imports
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QuickCheck } from './components/QuickCheck'; 
import { DowntimeCalculator } from './components/DowntimeCalculator';
import { Services } from './components/Services';
import { ServiceFlow } from './components/ServiceFlow'; 
import { RegionalExpertise } from './components/RegionalExpertise';
import { CareerSection } from './components/CareerSection'; 
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      
      {/* 1. Navigation */}
      <Navbar />

      <main className="flex-grow">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. NEW: Quick Check (Emergency Logic) */}
        <QuickCheck />

        {/* 4. Core Services (Proactive Focus) */}
        <Services />

        {/* 5. NEW: Service Flow (How it works) */}
        <ServiceFlow />

        {/* 6. Value Proposition / Downtime Calculator */}
        <DowntimeCalculator />

        {/* 7. Regional Advantage & Compliance */}
        <RegionalExpertise />

        {/* 8. NEW: Career Anchor (Employer Branding) */}
        <CareerSection />

        {/* 9. Trust Indicators */}
        <section id="sicherheit" className="py-24 bg-slate-900 border-t border-white/5">
           <div className="container mx-auto px-4 max-w-4xl text-center">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-12">VERTRAUEN DURCH EXPERTISE</h2>
              <div className="grid md:grid-cols-3 gap-8">
                 <div className="bg-slate-950 p-6 border border-white/5 hover:border-safety/30 transition-colors">
                    <ClipboardCheck className="mx-auto text-safety mb-4" size={32} />
                    <h4 className="font-bold text-white mb-2">GMP/ISO Reports</h4>
                    <p className="text-xs text-slate-500">Lückenlose Dokumentation für Ihre Qualitäts-Audits.</p>
                 </div>
                 <div className="bg-slate-950 p-6 border border-white/5 hover:border-safety/30 transition-colors">
                    <Ruler className="mx-auto text-safety mb-4" size={32} />
                    <h4 className="font-bold text-white mb-2">Laser-Vermessung</h4>
                    <p className="text-xs text-slate-500">Geometrische Abnahme mit Protokoll.</p>
                 </div>
                 <div className="bg-slate-950 p-6 border border-white/5 hover:border-safety/30 transition-colors">
                    <ShieldCheck className="mx-auto text-safety mb-4" size={32} />
                    <h4 className="font-bold text-white mb-2">Datenschutz (nDSG)</h4>
                    <p className="text-xs text-slate-500">Sicherer Umgang mit Ihren Maschinendaten.</p>
                 </div>
              </div>
           </div>
        </section>

        {/* 10. Contact / Lead Gen */}
        <ContactForm />
      </main>

      {/* 11. Footer */}
      <Footer />

      {/* Sticky Mobile Emergency Button */}
      <div className="fixed bottom-0 left-0 w-full z-50 md:hidden pointer-events-none">
        <a href="tel:+41321234567" className="pointer-events-auto flex items-center justify-center gap-3 bg-safety w-full py-4 text-slate-950 font-black uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(255,68,0,0.5)]">
           PIKETT 24/7 RUFEN
        </a>
      </div>

    </div>
  );
}