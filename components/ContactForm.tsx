'use client';

import React, { useState } from 'react';
import { Terminal, MapPin, Phone, Globe, Lock } from 'lucide-react';
import { Button } from './Button';
import { ContactReason } from '../types';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '', company: '', email: '', phone: '', reason: ContactReason.MAINTENANCE, message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('PIKETT-ZENTRALE: Ihre Anfrage wurde priorisiert übermittelt.');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="kontakt" className="py-24 bg-slate-950 relative border-t border-white/5 pb-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto shadow-2xl">
           
           <div className="flex flex-col md:flex-row bg-slate-900 border border-white/10">
              {/* Info Panel */}
              <div className="p-10 md:w-2/5 border-b md:border-b-0 md:border-r border-white/10 bg-slate-900 relative overflow-hidden">
                 <div className="absolute inset-0 bg-noise opacity-50"></div>
                 <div className="relative z-10">
                    <div className="w-12 h-12 bg-safety text-black flex items-center justify-center font-bold text-xl mb-8">
                       <Terminal size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-6 uppercase">Notfall <br/>Kontakt</h3>
                    
                    <div className="space-y-6 font-mono text-sm text-slate-400">
                       <div className="flex items-center gap-3">
                          <MapPin size={16} className="text-safety" />
                          <span>Industriestrasse 4, Lengnau</span>
                       </div>
                       <div className="flex items-center gap-3">
                          <Phone size={16} className="text-safety" />
                          <span className="text-white font-bold">+41 32 123 45 67</span>
                       </div>
                       <div className="flex items-center gap-3">
                          <Globe size={16} className="text-safety" />
                          <span>office@apex-swiss.ch</span>
                       </div>
                    </div>

                    <div className="mt-12 p-4 bg-slate-950 border border-white/10 rounded">
                       <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                          <span className="text-[10px] font-bold text-emerald-500 uppercase">Pikett-Zentrale Online</span>
                       </div>
                       <p className="text-xs text-slate-500">
                          Techniker im Raum Grenchen/Biel verfügbar.
                       </p>
                    </div>
                 </div>
              </div>

              {/* Interactive Form */}
              <div className="p-10 md:w-3/5 bg-slate-950/50">
                 <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                             Name <Lock size={8} />
                          </label>
                          <input 
                             type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="Max Muster"
                             className="w-full bg-slate-900 border border-slate-700 p-3 text-white focus:border-safety outline-none transition-colors text-sm font-mono placeholder:text-slate-700"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Firma</label>
                          <input 
                             type="text" name="company" required value={formData.company} onChange={handleInputChange} placeholder="Firma AG"
                             className="w-full bg-slate-900 border border-slate-700 p-3 text-white focus:border-safety outline-none transition-colors text-sm font-mono placeholder:text-slate-700"
                          />
                       </div>
                    </div>
                    
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Rückruf-Nummer</label>
                       <input 
                          type="text" name="email" required value={formData.email} onChange={handleInputChange} placeholder="+41 79 ..."
                          className="w-full bg-slate-900 border border-slate-700 p-3 text-white focus:border-safety outline-none transition-colors text-sm font-mono placeholder:text-slate-700"
                       />
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Betreff</label>
                       <div className="grid grid-cols-2 gap-2">
                          {Object.values(ContactReason).map((r) => (
                             <button 
                               type="button"
                               key={r}
                               onClick={() => setFormData({...formData, reason: r})}
                               className={`p-2 text-xs font-mono border text-left transition-all ${formData.reason === r ? 'border-safety text-safety bg-safety/10' : 'border-slate-800 text-slate-500 hover:border-slate-600'}`}
                             >
                               {r}
                             </button>
                          ))}
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Nachricht</label>
                       <textarea 
                         name="message" rows={3} value={formData.message} onChange={handleInputChange} 
                         className="w-full bg-slate-900 border border-slate-700 p-3 text-white focus:border-safety outline-none transition-colors text-sm font-mono resize-none"
                         placeholder="Bitte um Offerte für..."
                       ></textarea>
                    </div>

                    <Button type="submit" fullWidth>Offerte / Pikett Anfordern</Button>
                 </form>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};