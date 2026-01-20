'use client';

import React from 'react';
import { ClipboardList, Smartphone, Camera, AlertOctagon } from 'lucide-react';
import { Button } from './Button';

export const QuickCheck: React.FC = () => {
  return (
    <section id="quickcheck" className="bg-slate-950 border-y border-white/5 py-16 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-slate-900 border border-safety/20 p-8 md:p-12 relative overflow-hidden">
          {/* Background Warning Stripe */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-safety/5 -rotate-45 transform translate-x-16 -translate-y-16 pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="md:w-1/2">
              <div className="flex items-center gap-3 mb-4">
                <AlertOctagon className="text-safety animate-pulse" size={24} />
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                  Notfall Quick-Check
                </h3>
              </div>
              <p className="text-slate-400 text-sm mb-6 max-w-md">
                Damit unser Pikett-Techniker sofort die richtigen Ersatzteile einpacken kann:
                Bitte halten Sie diese 3 Informationen bereit, <strong>bevor</strong> Sie anrufen.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                   <div className="w-8 h-8 rounded bg-slate-950 border border-white/10 flex items-center justify-center shrink-0 text-white font-mono font-bold">1</div>
                   <div>
                      <strong className="text-white block text-sm">Maschinen-Typ & Seriennummer</strong>
                      <span className="text-xs text-slate-500">Finden Sie auf dem Typenschild (meist Rückseite/Schaltschrank).</span>
                   </div>
                </div>
                <div className="flex items-start gap-4">
                   <div className="w-8 h-8 rounded bg-slate-950 border border-white/10 flex items-center justify-center shrink-0 text-white font-mono font-bold">2</div>
                   <div>
                      <strong className="text-white block text-sm">Fehlercode / Display-Meldung</strong>
                      <span className="text-xs text-slate-500">Notieren Sie den exakten Code (z.B. "Error 402 Axis Z").</span>
                   </div>
                </div>
                <div className="flex items-start gap-4">
                   <div className="w-8 h-8 rounded bg-slate-950 border border-white/10 flex items-center justify-center shrink-0 text-white font-mono font-bold">3</div>
                   <div>
                      <strong className="text-white block text-sm">Foto der Situation</strong>
                      <span className="text-xs text-slate-500">Machen Sie ein kurzes Foto vom Schaden/Display für WhatsApp/Mail.</span>
                   </div>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 flex flex-col items-center justify-center bg-slate-950 border border-white/5 p-8 w-full text-center">
               <Smartphone size={48} className="text-slate-600 mb-4" />
               <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">Pikett-Line 24/7</div>
               <a href="tel:+41321234567" className="text-3xl md:text-4xl font-black text-safety hover:text-white transition-colors mb-6 block">
                 032 123 45 67
               </a>
               <Button onClick={() => document.getElementById('kontakt')?.scrollIntoView({behavior: 'smooth'})}>
                 Digitale Störungsmeldung
               </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};