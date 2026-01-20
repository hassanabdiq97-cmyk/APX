import React from 'react';

// Import existing components
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { QuickCheck } from '../components/QuickCheck'; 
import { DowntimeCalculator } from '../components/DowntimeCalculator';
import { Services } from '../components/Services';
import { ServiceFlow } from '../components/ServiceFlow'; 
import { RegionalExpertise } from '../components/RegionalExpertise';
import { CareerSection } from '../components/CareerSection'; 
import { ContactForm } from '../components/ContactForm';
import { Footer } from '../components/Footer';

// Icons for trust section
import { CheckCircle2, MapPin, BadgeCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      
      <Navbar />

      <main className="flex-grow">
        
        {/* HERO SECTION: Focus on "Espace Mittelland" */}
        <Hero />

        {/* REGIONAL TRUST BAR: Immediate validation for local visitors */}
        <section className="bg-slate-900 border-b border-white/5 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 text-sm font-mono text-slate-400 uppercase tracking-widest">
              
              <div className="flex items-center gap-3">
                <MapPin className="text-safety" size={18} />
                <span>Basis: Lengnau (BE)</span>
              </div>
              
              <div className="hidden md:block w-px h-4 bg-slate-800"></div>
              
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-500" size={18} />
                <span>Einsatzgebiet: SO / BE / BI</span>
              </div>

              <div className="hidden md:block w-px h-4 bg-slate-800"></div>

              <div className="flex items-center gap-3">
                <BadgeCheck className="text-blue-500" size={18} />
                <span>100% Schweizer Fachkräfte</span>
              </div>

            </div>
          </div>
        </section>

        {/* QUICK ACTION: For emergencies */}
        <QuickCheck />

        {/* SERVICES: What we actually do */}
        <Services />

        {/* PROCESS: Transparency */}
        <ServiceFlow />

        {/* VALUE: Cost of Downtime */}
        <DowntimeCalculator />

        {/* REGIONAL FOCUS: Why local is better */}
        <RegionalExpertise />

        {/* CAREER: Recruiting local talent */}
        <CareerSection />

        {/* FINAL CONVERSION */}
        <ContactForm />
      </main>

      <Footer />

      {/* MOBILE STICKY CTA - Critical for Service Technicians */}
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