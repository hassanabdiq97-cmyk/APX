import React from 'react';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'], 
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'APX Industrial | Montage & Instandhaltung Solothurn-Biel',
  description: 'Ihr Partner für Industriemontage, Betriebsinstandhaltung und Maschinenservice im Raum Solothurn, Biel und Bern. 24/7 Pikett.',
  keywords: ['Industriemontage Solothurn', 'Instandhaltung Biel', 'Maschinen Service Bern', 'APX Industrial'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de-CH" className={`scroll-smooth dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 antialiased selection:bg-safety selection:text-white font-sans min-h-screen overflow-x-hidden">
        <Providers>
          <div className="bg-noise fixed inset-0 z-50 pointer-events-none opacity-[0.03]"></div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
