'use client';

import React, { useState, useEffect } from 'react';
import { Terminal, MapPin, Phone, Globe, Lock, ChevronRight, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';
import { ContactReason } from '../types';
import { useSettings } from '../contexts/SettingsContext';

export const ContactForm: React.FC = () => {
  const { t, inquiryDraft, setInquiryDraft } = useSettings();
  const [formData, setFormData] = useState({
    name: '', company: '', email: '', phone: '', reason: ContactReason.MAINTENANCE, message: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);

  // Prefill from calculator
  useEffect(() => {
    if (inquiryDraft) {
      setFormData(prev => ({ ...prev, message: inquiryDraft, reason: ContactReason.MAINTENANCE }));
      // Optional: Clear draft after prefill to avoid persistence issues, or keep it.
    }
  }, [inquiryDraft]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.reason === ContactReason.EMERGENCY) return;
    
    // Simulate API call
    setTimeout(() => {
        setIsSuccess(true);
        setInquiryDraft(''); // Clear global draft
    }, 800);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="kontakt" className="py-32 bg-slate-100 dark:bg-slate-950 relative border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
      {/* Background Consistency Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-10 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto glass-panel rounded-sm overflow-hidden flex flex-col md:flex-row shadow-2xl border border-slate-200 dark:border-white/10">
           
           {/* Left Panel: Info */}
           <div className="md:w-5/12 bg-white dark:bg-slate-900/90 p-12 relative overflow-hidden border-r border-slate-200 dark:border-white/5 flex flex-col justify-between">
               <div className="absolute inset-0 bg-noise opacity-30"></div>
               <div className="absolute top-0 right-0 w-64 h-64 bg-safety/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
               
               <div className="relative z-10">
                   <div className="w-14 h-14 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded flex items-center justify-center mb-10 text-safety shadow-lg">
                       <Terminal size={28} strokeWidth={1.5} />
                   </div>
                   
                   <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-8 uppercase tracking-tight leading-none">
                       {t.contact.badge} <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-safety to-orange-400">{t.contact.title}</span>
                   </h3>
                   
                   <div className="space-y-8 font-mono text-sm text-slate-500 dark:text-slate-400 mb-12">
                       <div className="flex items-start gap-4 group">
                          <MapPin size={18} className="text-slate-400 dark:text-slate-600 group-hover:text-safety transition-colors mt-1 shrink-0" />
                          <div>
                              <strong className="block text-slate-700 dark:text-white uppercase text-xs tracking-widest mb-1">{t.contact.address_label}</strong>
                              <span>Solothurnstrasse 44, 2543 Lengnau</span>
                          </div>
                       </div>
                       <div className="flex items-start gap-4 group">
                          <Phone size={18} className="text-slate-400 dark:text-slate-600 group-hover:text-safety transition-colors mt-1 shrink-0" />
                          <div>
                              <strong className="block text-slate-700 dark:text-white uppercase text-xs tracking-widest mb-1">{t.contact.hotline_label}</strong>
                              <a href="tel:+41321234567" className="text-slate-900 dark:text-white font-bold hover:text-safety transition-colors cursor-pointer">+41 32 123 45 67</a>
                          </div>
                       </div>
                       <div className="flex items-start gap-4 group">
                          <Globe size={18} className="text-slate-400 dark:text-slate-600 group-hover:text-safety transition-colors mt-1 shrink-0" />
                          <div>
                              <strong className="block text-slate-700 dark:text-white uppercase text-xs tracking-widest mb-1">{t.contact.digital_label}</strong>
                              <span>service@apex-swiss.ch</span>
                          </div>
                       </div>
                   </div>
               </div>

               <div className="relative z-10 mt-auto bg-emerald-500/5 border border-emerald-500/10 p-4 rounded backdrop-blur-sm">
                   <div className="flex items-center gap-2 mb-2">
                       <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                       <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-widest">{t.contact.status}</span>
                   </div>
               </div>
           </div>

           {/* Right Panel: Form */}
           <div className="md:w-7/12 p-12 bg-slate-50 dark:bg-slate-950/50 relative">
               
               {isSuccess ? (
                   <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-500">
                       <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                           <CheckCircle2 size={40} className="text-emerald-500" />
                       </div>
                       <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase mb-4">{t.contact.form.success_title}</h4>
                       <p className="text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed mb-8">{t.contact.form.success_desc}</p>
                       <Button onClick={() => setIsSuccess(false)} variant="outline">Neue Anfrage</Button>
                   </div>
               ) : (
                   <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                       
                       {/* Context Selector */}
                       <div className="space-y-2 mb-8">
                           <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t.contact.form.reason_label}</label>
                           <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                              {Object.values(ContactReason).map((r) => (
                                 <button 
                                   type="button"
                                   key={r}
                                   onClick={() => setFormData({...formData, reason: r})}
                                   className={`p-3 text-[10px] uppercase font-bold tracking-wider border transition-all text-center rounded-sm ${
                                     formData.reason === r 
                                       ? r === ContactReason.EMERGENCY 
                                         ? 'bg-safety text-white border-safety shadow-[0_0_15px_rgba(255,51,0,0.3)] animate-pulse' 
                                         : 'bg-white text-slate-900 border-white dark:bg-slate-100'
                                       : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:border-slate-400 dark:hover:border-white/30'
                                   }`}
                                 >
                                   {r === ContactReason.EMERGENCY ? <span className="flex items-center justify-center gap-1"><AlertTriangle size={10}/> {r}</span> : r}
                                 </button>
                              ))}
                           </div>
                       </div>

                       {/* Logic: If EMERGENCY -> Show Number Only */}
                       {formData.reason === ContactReason.EMERGENCY ? (
                          <div className="bg-safety/10 border border-safety p-8 rounded-sm text-center animate-in fade-in zoom-in-95 duration-300">
                              <div className="w-20 h-20 bg-safety rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(255,51,0,0.4)] animate-[pulse_2s_infinite]">
                                  <Phone size={40} className="text-white" />
                              </div>
                              
                              <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase mb-4 tracking-tight">{t.contact.form.emergency.title}</h4>
                              
                              <p className="text-slate-700 dark:text-slate-300 mb-8 text-sm font-light leading-relaxed">
                                  {t.contact.form.emergency.desc}
                              </p>
                              
                              <a href="tel:+41321234567" className="block w-full bg-safety hover:bg-white hover:text-safety text-white font-black py-6 rounded-sm transition-all text-2xl md:text-3xl uppercase tracking-widest shadow-[0_0_30px_rgba(255,51,0,0.3)] hover:shadow-[0_0_50px_rgba(255,51,0,0.6)] border border-transparent hover:border-safety">
                                  032 123 45 67
                              </a>
                              
                              <div className="mt-6 flex justify-center gap-2 text-[10px] font-mono text-safety uppercase tracking-widest">
                                  <span className="w-2 h-2 bg-safety rounded-full animate-ping"></span>
                                  {t.contact.form.emergency.priority}
                              </div>
                          </div>
                       ) : (
                          /* Standard Form Content */
                          <>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2 group">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-focus-within:text-slate-800 dark:group-focus-within:text-white transition-colors">{t.contact.form.name}</label>
                                    <input 
                                        type="text" name="name" required value={formData.name} onChange={handleInputChange} 
                                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-4 text-slate-900 dark:text-white focus:border-safety focus:bg-white dark:focus:bg-slate-800 outline-none transition-all text-sm font-mono rounded-sm placeholder:text-slate-400 dark:placeholder:text-slate-700"
                                        placeholder="Max Muster"
                                    />
                                </div>
                                <div className="space-y-2 group">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-focus-within:text-slate-800 dark:group-focus-within:text-white transition-colors">{t.contact.form.company}</label>
                                    <input 
                                        type="text" name="company" required value={formData.company} onChange={handleInputChange} 
                                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-4 text-slate-900 dark:text-white focus:border-safety focus:bg-white dark:focus:bg-slate-800 outline-none transition-all text-sm font-mono rounded-sm placeholder:text-slate-400 dark:placeholder:text-slate-700"
                                        placeholder="Muster AG"
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-2 group">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-focus-within:text-slate-800 dark:group-focus-within:text-white transition-colors">{t.contact.form.phone}</label>
                                <input 
                                    type="text" name="phone" required value={formData.phone} onChange={handleInputChange} 
                                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-4 text-slate-900 dark:text-white focus:border-safety focus:bg-white dark:focus:bg-slate-800 outline-none transition-all text-sm font-mono rounded-sm placeholder:text-slate-400 dark:placeholder:text-slate-700"
                                    placeholder="+41 79 123 45 67"
                                />
                            </div>

                            <div className="space-y-2 group">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-focus-within:text-slate-800 dark:group-focus-within:text-white transition-colors">{t.contact.form.details}</label>
                                <textarea 
                                    name="message" rows={4} value={formData.message} onChange={handleInputChange} 
                                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-4 text-slate-900 dark:text-white focus:border-safety focus:bg-white dark:focus:bg-slate-800 outline-none transition-all text-sm font-mono resize-none rounded-sm placeholder:text-slate-400 dark:placeholder:text-slate-700"
                                    placeholder="..."
                                ></textarea>
                            </div>

                            <div className="pt-4">
                                <Button type="submit" fullWidth size="lg">
                                    {t.contact.form.submit} <ChevronRight size={16} className="ml-2" />
                                </Button>
                                <div className="text-center text-[10px] text-slate-500 dark:text-slate-600 mt-4 font-mono flex items-center justify-center gap-1">
                                    <Lock size={10} />
                                    <span>{t.contact.form.security}</span>
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