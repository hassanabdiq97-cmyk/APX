'use client';

import React, { useState, useEffect } from 'react';
import { Terminal, MapPin, Phone, Globe, Lock, ChevronRight, AlertTriangle, CheckCircle2, Send, Cpu } from 'lucide-react';
import { Button } from './Button';
import { ContactReason } from '../types';
import { useSettings } from '../contexts/SettingsContext';

export const ContactForm: React.FC = () => {
  const { t, inquiryDraft, setInquiryDraft, activeReason, setActiveReason } = useSettings();
  const [formData, setFormData] = useState({
    name: '', company: '', email: '', phone: '', reason: ContactReason.MAINTENANCE, message: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prefill from calculator
  useEffect(() => {
    if (inquiryDraft) {
      setFormData(prev => ({ ...prev, message: inquiryDraft, reason: ContactReason.MAINTENANCE }));
    }
  }, [inquiryDraft]);

  // Listen for global reason change (e.g. from Navbar Emergency button)
  useEffect(() => {
    if (activeReason) {
        setFormData(prev => ({ ...prev, reason: activeReason }));
        // We don't clear activeReason immediately to keep the state persistent during this view
    }
  }, [activeReason]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.reason === ContactReason.EMERGENCY) return;
    
    setIsSubmitting(true);
    // Simulate API call with "processing" delay
    setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setInquiryDraft(''); 
        if (activeReason) setActiveReason(null);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReasonChange = (r: ContactReason) => {
      setFormData({...formData, reason: r});
      // If user manually changes tabs, we might want to clear global activeReason to avoid sticky behavior if they navigate away and back
      if (activeReason) setActiveReason(null);
  };

  return (
    <section id="kontakt" className="py-32 bg-slate-100 dark:bg-slate-950 relative border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
      {/* Background Consistency Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-10 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto glass-panel-tech rounded-sm overflow-hidden flex flex-col md:flex-row shadow-2xl">
           
           {/* Left Panel: Info */}
           <div className="md:w-5/12 bg-slate-200 dark:bg-[#13151b] p-12 relative overflow-hidden border-r border-slate-200 dark:border-white/5 flex flex-col justify-between">
               <div className="absolute inset-0 bg-noise opacity-30"></div>
               {/* Decorative Gradient Blob */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-safety/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
               
               <div className="relative z-10">
                   <div className="inline-flex items-center gap-3 mb-10 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/10 rounded-sm shadow-sm">
                       <Terminal size={18} className="text-safety" />
                       <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300">System Link</span>
                   </div>
                   
                   <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-8 uppercase tracking-tight leading-none">
                       {t.contact.badge} <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-safety to-orange-400">{t.contact.title}</span>
                   </h3>
                   
                   <div className="space-y-8 font-mono text-sm text-slate-500 dark:text-slate-400 mb-12">
                       <div className="flex items-start gap-4 group">
                          <div className="p-2 bg-slate-300 dark:bg-slate-800 rounded-sm group-hover:bg-safety group-hover:text-white transition-colors">
                             <MapPin size={16} />
                          </div>
                          <div>
                              <strong className="block text-slate-700 dark:text-white uppercase text-xs tracking-widest mb-1">{t.contact.address_label}</strong>
                              <span>Solothurnstrasse 44<br/>2543 Lengnau</span>
                          </div>
                       </div>
                       <div className="flex items-start gap-4 group">
                          <div className="p-2 bg-slate-300 dark:bg-slate-800 rounded-sm group-hover:bg-safety group-hover:text-white transition-colors">
                             <Phone size={16} />
                          </div>
                          <div>
                              <strong className="block text-slate-700 dark:text-white uppercase text-xs tracking-widest mb-1">{t.contact.hotline_label}</strong>
                              <a href="tel:+41321234567" className="text-slate-900 dark:text-white font-bold hover:text-safety transition-colors cursor-pointer block mt-1">+41 32 123 45 67</a>
                          </div>
                       </div>
                       <div className="flex items-start gap-4 group">
                          <div className="p-2 bg-slate-300 dark:bg-slate-800 rounded-sm group-hover:bg-safety group-hover:text-white transition-colors">
                             <Globe size={16} />
                          </div>
                          <div>
                              <strong className="block text-slate-700 dark:text-white uppercase text-xs tracking-widest mb-1">{t.contact.digital_label}</strong>
                              <span>service@apex-swiss.ch</span>
                          </div>
                       </div>
                   </div>
               </div>

               <div className="relative z-10 mt-auto bg-emerald-500/10 border border-emerald-500/20 p-4 rounded backdrop-blur-sm">
                   <div className="flex items-center gap-3 mb-2">
                       <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]"></div>
                       <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">{t.contact.status}</span>
                   </div>
                   <div className="h-0.5 w-full bg-emerald-500/20 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[98%] animate-pulse"></div>
                   </div>
               </div>
           </div>

           {/* Right Panel: Form */}
           <div className="md:w-7/12 p-12 bg-white dark:bg-[#0b0c10] relative">
               
               {isSuccess ? (
                   <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-500">
                       <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                           <CheckCircle2 size={48} className="text-emerald-500" />
                       </div>
                       <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase mb-4">{t.contact.form.success_title}</h4>
                       <div className="font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 px-4 py-2 rounded mb-8 border border-emerald-500/20">
                           TICKET #84920 CREATED
                       </div>
                       <p className="text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed mb-8">{t.contact.form.success_desc}</p>
                       <Button onClick={() => setIsSuccess(false)} variant="outline">Neue Anfrage</Button>
                   </div>
               ) : (
                   <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                       
                       {/* Context Selector */}
                       <div className="space-y-3 mb-8">
                           <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                             <Cpu size={12} /> {t.contact.form.reason_label}
                           </label>
                           <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              {Object.values(ContactReason).map((r) => (
                                 <button 
                                   type="button"
                                   key={r}
                                   onClick={() => handleReasonChange(r)}
                                   className={`p-3 text-[10px] uppercase font-bold tracking-wider border transition-all text-center rounded-sm relative overflow-hidden ${
                                     formData.reason === r 
                                       ? r === ContactReason.EMERGENCY 
                                         ? 'bg-safety text-white border-safety shadow-[0_0_15px_rgba(255,51,0,0.3)] animate-pulse' 
                                         : 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900'
                                       : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:border-slate-400 dark:hover:border-white/30'
                                   }`}
                                 >
                                   {formData.reason === r && r !== ContactReason.EMERGENCY && (
                                      <span className="absolute top-0 right-0 w-2 h-2 bg-emerald-500 rounded-bl-sm"></span>
                                   )}
                                   {r === ContactReason.EMERGENCY ? <span className="flex items-center justify-center gap-1"><AlertTriangle size={12}/> {r}</span> : r}
                                 </button>
                              ))}
                           </div>
                       </div>

                       {/* Logic: If EMERGENCY -> Show Number Only */}
                       {formData.reason === ContactReason.EMERGENCY ? (
                          <div className="bg-safety/5 border border-safety/50 p-10 rounded-sm text-center animate-in fade-in zoom-in-95 duration-300 relative overflow-hidden">
                              <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(217,43,0,0.05)_10px,rgba(217,43,0,0.05)_20px)] pointer-events-none"></div>
                              
                              <div className="w-24 h-24 bg-safety rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(255,51,0,0.4)] animate-[pulse_2s_infinite] relative z-10">
                                  <Phone size={40} className="text-white" />
                              </div>
                              
                              <h4 className="text-3xl font-black text-slate-900 dark:text-white uppercase mb-4 tracking-tight relative z-10">{t.contact.form.emergency.title}</h4>
                              
                              <p className="text-slate-700 dark:text-slate-300 mb-8 text-sm font-medium leading-relaxed relative z-10 max-w-md mx-auto">
                                  {t.contact.form.emergency.desc}
                              </p>
                              
                              <a href="tel:+41321234567" className="relative z-10 block w-full bg-safety hover:bg-white hover:text-safety text-white font-black py-6 rounded-sm transition-all text-2xl md:text-4xl uppercase tracking-widest shadow-[0_0_30px_rgba(255,51,0,0.3)] hover:shadow-[0_0_50px_rgba(255,51,0,0.6)] border border-transparent hover:border-safety">
                                  032 123 45 67
                              </a>
                              
                              <div className="mt-8 flex justify-center gap-3 text-[11px] font-mono text-safety uppercase tracking-widest relative z-10 bg-safety/10 py-2 rounded mx-auto max-w-xs">
                                  <span className="w-2 h-2 bg-safety rounded-full animate-ping mt-1"></span>
                                  {t.contact.form.emergency.priority} ACTIVE
                              </div>
                          </div>
                       ) : (
                          /* Standard Form Content - UX UPGRADE: "Line Input" style */
                          <>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2 group">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-focus-within:text-safety transition-colors flex justify-between">
                                       <span>{t.contact.form.name}</span>
                                       <span className="opacity-0 group-focus-within:opacity-100 transition-opacity text-[9px] font-mono">>_ INPUT_ACTIVE</span>
                                    </label>
                                    <input 
                                        type="text" name="name" required value={formData.name} onChange={handleInputChange} 
                                        className="w-full bg-transparent border-b-2 border-slate-200 dark:border-white/10 py-3 text-slate-900 dark:text-white focus:border-safety outline-none transition-all text-sm font-mono placeholder:text-slate-300 dark:placeholder:text-slate-700 focus:bg-slate-50 dark:focus:bg-white/5 px-2"
                                        placeholder="Max Muster"
                                    />
                                </div>
                                <div className="space-y-2 group">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-focus-within:text-safety transition-colors">{t.contact.form.company}</label>
                                    <input 
                                        type="text" name="company" required value={formData.company} onChange={handleInputChange} 
                                        className="w-full bg-transparent border-b-2 border-slate-200 dark:border-white/10 py-3 text-slate-900 dark:text-white focus:border-safety outline-none transition-all text-sm font-mono placeholder:text-slate-300 dark:placeholder:text-slate-700 focus:bg-slate-50 dark:focus:bg-white/5 px-2"
                                        placeholder="Muster AG"
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-2 group">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-focus-within:text-safety transition-colors">{t.contact.form.phone}</label>
                                <input 
                                    type="text" name="phone" required value={formData.phone} onChange={handleInputChange} 
                                    className="w-full bg-transparent border-b-2 border-slate-200 dark:border-white/10 py-3 text-slate-900 dark:text-white focus:border-safety outline-none transition-all text-sm font-mono placeholder:text-slate-300 dark:placeholder:text-slate-700 focus:bg-slate-50 dark:focus:bg-white/5 px-2"
                                    placeholder="+41 79 123 45 67"
                                />
                            </div>

                            <div className="space-y-2 group">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-focus-within:text-safety transition-colors">{t.contact.form.details}</label>
                                <textarea 
                                    name="message" rows={4} value={formData.message} onChange={handleInputChange} 
                                    className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 p-4 text-slate-900 dark:text-white focus:border-safety outline-none transition-all text-sm font-mono resize-none rounded-sm placeholder:text-slate-400 dark:placeholder:text-slate-700 focus:shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]"
                                    placeholder="Maschinen-Typ, Fehlercode, Dringlichkeit..."
                                ></textarea>
                            </div>

                            <div className="pt-6">
                                <Button type="submit" fullWidth size="lg" disabled={isSubmitting} className={isSubmitting ? 'opacity-80' : ''}>
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                            PROCESSING...
                                        </span>
                                    ) : (
                                        <span className="flex items-center">
                                            {t.contact.form.submit} <Send size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    )}
                                </Button>
                                <div className="text-center text-[10px] text-slate-400 dark:text-slate-600 mt-6 font-mono flex items-center justify-center gap-2 opacity-70">
                                    <Lock size={10} />
                                    <span>{t.contact.form.security} // 256-BIT ENCRYPTION</span>
                                </div>
                            </div>
                          </>
                       )}
                   </form>
               )}
           </div>
        </div>
      </div>
    </section>
  );
};