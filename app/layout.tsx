import React from 'react';
import type { Metadata, Viewport } from 'next';
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

export const viewport: Viewport = {
  themeColor: '#FF3300',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'APX Industrial | Instandhaltung Grenchen-Biel-Solothurn',
  description: 'Spezialisiert auf CNC-Reparatur, Reinraum-Instandhaltung und 24/7 Pikett-Service für die Uhrenindustrie und Medtech. Standort: Lengnau.',
  keywords: ['Industriemontage Solothurn', 'Instandhaltung Biel', 'CNC Service Grenchen', 'APX Industrial'],
  icons: {
    icon: '/favicon.ico',
  },
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
          {/* Global Noise Texture for Industrial Feel */}
          <div className="bg-noise fixed inset-0 z-0 pointer-events-none opacity-[0.03]"></div>
          <div className="relative z-10">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}