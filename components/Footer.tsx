'use client';

import React from 'react';
import { MapPin, Phone, Mail, Shield, Award } from 'lucide-react';
import { Button } from './Button';
import { useSettings } from '../contexts/SettingsContext';

export const Footer: React.FC = () => {
  const { t } = useSettings();

  return (
    <footer className="bg-slate-100 dark:bg-[#020617] pt-20 pb-10 border-t border-slate-200 dark:border-white/5 text-sm font-light text-slate-600 dark:text-slate-400 transition-colors duration-300">
       <div className="container mx-auto px-6">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
             
             {/* Brand Column */}
             <div className="col-span-1 md:col-span-1">
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-8 h-8 flex items-center justify-center bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-sm">
                     <span className="font-black text-slate-900 dark:text-white text-lg">A</span>
                   </div>
                   <span className="font-bold text-slate-900 dark:text-white tracking-widest uppercase">APEX Industrial</span>
                </div>
                <p className="text-slate-500 dark:text-slate-500 text-xs leading-relaxed mb-6">
                   {t.footer.brand_desc}
                </p>
                <div className="flex gap-4">
                   <div className="p-2 bg-white dark:bg-white/5 rounded border border-slate-200 dark:border-white/5 text-slate-400 dark:text-slate-300" title="ISO 9001 Compliant Process">
                      <Award size={20} />
                   </div>
                   <div className="p-2 bg-white dark:bg-white/5 rounded border border-slate-200 dark:border-white/5 text-slate-400 dark:text-slate-300" title="SUVA Safety Standards">
                      <Shield size={20} />
                   </div>
                </div>
             </div>

             {/* Services Links */}
             <div>
                <h4 className="text-slate-900 dark:text-white font-bold uppercase tracking-widest text-xs mb-6">{t.footer.services_title}</h4>
                <ul className="space-y-3 text-xs">
                   <li><a href="#quickcheck" className="hover:text-safety transition-colors">{t.nav.emergency}</a></li>
                   <li><a href="#leistungen" className="hover:text-safety transition-colors">{t.services.items[0].title}</a></li>
                   <li><a href="#leistungen" className="hover:text-safety transition-colors">{t.services.items[1].title}</a></li>
                   <li><a href="#leistungen" className="hover:text-safety transition-colors">{t.services.items[2].title}</a></li>
                </ul>
             </div>

             {/* Region Links */}
             <div>
                <h4 className="text-slate-900 dark:text-white font-bold uppercase tracking-widest text-xs mb-6">{t.footer.region_title}</h4>
                <ul className="space-y-3 text-xs">
                   <li><a href="#expertise" className="hover:text-safety transition-colors">Grenchen</a></li>
                   <li><a href="#expertise" className="hover:text-safety transition-colors">Biel/Bienne</a></li>
                   <li><a href="#expertise" className="hover:text-safety transition-colors">Solothurn</a></li>
                   <li><a href="#expertise" className="hover:text-safety transition-colors">Bern</a></li>
                </ul>
             </div>

             {/* Contact Info */}
             <div>
                <h4 className="text-slate-900 dark:text-white font-bold uppercase tracking-widest text-xs mb-6">{t.footer.contact_title}</h4>
                <div className="space-y-4">
                   <div className="flex items-start gap-3">
                      <MapPin size={16} className="text-safety mt-0.5 shrink-0" />
                      <div>
                         <span className="block text-slate-800 dark:text-white font-medium">APEX Industrial Solutions</span>
                         <span className="block text-xs">Solothurnstrasse 44</span>
                         <span className="block text-xs">2543 Lengnau BE, Schweiz</span>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <Phone size={16} className="text-safety shrink-0" />
                      <a href="tel:+41321234567" className="hover:text-slate-900 dark:hover:text-white transition-colors font-medium text-slate-700 dark:text-slate-300">+41 32 123 45 67</a>
                   </div>
                   <div className="flex items-center gap-3">
                      <Mail size={16} className="text-safety shrink-0" />
                      <a href="mailto:service@apex-swiss.ch" className="hover:text-slate-900 dark:hover:text-white transition-colors font-medium text-slate-700 dark:text-slate-300">service@apex-swiss.ch</a>
                   </div>
                   <div className="pt-4">
                      <Button size="sm" variant="outline" fullWidth onClick={() => document.getElementById('kontakt')?.scrollIntoView({behavior: 'smooth'})} className="bg-white dark:bg-transparent hover:bg-slate-50 dark:hover:bg-transparent">
                         {t.footer.callback}
                      </Button>
                   </div>
                </div>
             </div>
          </div>

          <div className="w-full h-[1px] bg-slate-200 dark:bg-white/5 mb-8"></div>

          <div className="flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-500 dark:text-slate-600 font-mono uppercase tracking-wider">
             <div className="mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} {t.footer.rights}
             </div>
             <div className="flex gap-6">
                <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Impressum</a>
                <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Datenschutz</a>
                <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">AGB</a>
             </div>
          </div>
       </div>
    </footer>
  );
};