import React from 'react';
import type { Metadata } from 'next';
import './app/globals.css';

export const metadata: Metadata = {
  title: 'Apex Industrial | Future Maintenance Switzerland',
  description: 'Ihr strategischer Partner für Instandhaltung, Retrofit und Notfall-Support in der Uhren- und Medizintechnik. Lokal verankert in Grenchen-Biel-Solothurn.',
  openGraph: {
    title: 'Apex Industrial | Future Maintenance Switzerland',
    description: 'CNC-Reparatur, Reinraum-Instandhaltung und Pikett-Service. 24/7 Support im Precision Cluster.',
    type: 'website',
    locale: 'de_CH',
    images: [{ url: '/og-image.jpg' }], // Ensure you add an image to public/
  },
};

export default function RootLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="scroll-smooth dark">
      <div className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 antialiased selection:bg-safety selection:text-white overflow-x-hidden transition-colors duration-300 font-sans min-h-screen">
        <div className="bg-noise"></div>
        {children}
      </div>
    </div>
  );
}