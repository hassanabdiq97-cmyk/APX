import React from 'react';
import { ClipboardCheck, Ruler, ShieldCheck } from 'lucide-react';

// Component Imports
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DowntimeCalculator } from './components/DowntimeCalculator';
import { Services } from './components/Services';
import { RegionalExpertise } from './components/RegionalExpertise';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200 font-sans selection:bg-safety selection:text-white">
      
      {/* 1. Navigation */}
      <Navbar />

      {/* 2. Hero Section */}
      <Hero />

      {/* 3. Value Proposition / Downtime Calculator */}
      <DowntimeCalculator />

      {/* 4. Core Services */}
      <Services />

      {/* 5. Regional Advantage & Industries */}
      <RegionalExpertise />

      {/* 6. Trust Indicators (Static Section - simple enough to keep here for layout flow) */}
      <section id="sicherheit" className="py-24 bg-slate-900 border-t border-white/5">
         <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-12">VERTRAUEN DURCH EXPERTISE</h2>
            <div className="grid md:grid-cols-3 gap-8">
               <div className="bg-slate-950 p-6 border border-white/5 hover:border-safety/30 transition-colors">
                  <ClipboardCheck className="mx-auto text-safety mb-4" size={32} />
                  <h4 className="font-bold text-white mb-2">Validierte Berichte</h4>
                  <p className="text-xs text-slate-500">Digitale Service-Reports, direkt verwendbar für Ihre QM-Dokumentation.</p>
               </div>
               <div className="bg-slate-950 p-6 border border-white/5 hover:border-safety/30 transition-colors">
                  <Ruler className="mx-auto text-safety mb-4" size={32} />
                  <h4 className="font-bold text-white mb-2">Laser-Vermessung</h4>
                  <p className="text-xs text-slate-500">Einsatz modernster Interferometer zur geometrischen Abnahme Ihrer Maschinen.</p>
               </div>
               <div className="bg-slate-950 p-6 border border-white/5 hover:border-safety/30 transition-colors">
                  <ShieldCheck className="mx-auto text-safety mb-4" size={32} />
                  <h4 className="font-bold text-white mb-2">Diskretion</h4>
                  <p className="text-xs text-slate-500">Wir arbeiten in den sensibelsten Bereichen der Schweizer Industrie. Ihre IP ist sicher.</p>
               </div>
            </div>
         </div>
      </section>

      {/* 7. Contact / Lead Gen */}
      <ContactForm />

      {/* 8. Footer */}
      <Footer />

      {/* Sticky Mobile Emergency Button (Backup for very small screens) */}
      <div className="fixed bottom-0 left-0 w-full z-50 md:hidden pointer-events-none">
        <a href="tel:+41321234567" className="pointer-events-auto flex items-center justify-center gap-3 bg-safety w-full py-4 text-slate-950 font-black uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(255,68,0,0.5)]">
           PIKETT 24/7 RUFEN
        </a>
      </div>

    </div>
  );
}

export default App;