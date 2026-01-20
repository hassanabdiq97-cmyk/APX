import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { SettingsProvider } from '../contexts/SettingsContext';

export const metadata: Metadata = {
  title: {
    template: '%s | APX Industrial',
    default: 'Industriemontage & Service | Solothurn - Bern - Biel',
  },
  description: 'Ihr Partner für Industriemontage, Maschinen-Wartung und Instandhaltung im Espace Mittelland. Pikett-Service, Retrofit und De/Montage für KMU und Industrie.',
  keywords: [
    'Industriemontage Solothurn',
    'Maschinen Wartung Biel',
    'Instandhaltung Bern',
    'Pikett Service Industrie',
    'Retrofit',
    'Anlagenbau Mittelland'
  ],
  authors: [{ name: 'APX Industrial Swiss' }],
  openGraph: {
    title: 'APX Industrial | Montage & Service Mittelland',
    description: 'Schnell. Präzise. Suva-konform. Ihr technischer Partner in SO/BE/BI.',
    locale: 'de_CH',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de-CH" className="scroll-smooth dark">
      <body className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 antialiased selection:bg-safety selection:text-white font-sans min-h-screen">
        <SettingsProvider>
          {/* Static noise overlay for industrial feel */}
          <div className="bg-noise fixed inset-0 z-50 pointer-events-none opacity-[0.03]"></div>
          {children}
        </SettingsProvider>
      </body>
    </html>
  );
}