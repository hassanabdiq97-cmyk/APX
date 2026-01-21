import React from 'react';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { SettingsProvider } from '../contexts/SettingsContext';

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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "APX Industrial Swiss AG",
    "image": "https://apex-industrial.ch/og-image.jpg",
    "telephone": "+41 32 123 45 67",
    "email": "service@apex-swiss.ch",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Solothurnstrasse 44",
      "addressLocality": "Lengnau",
      "postalCode": "2543",
      "addressCountry": "CH"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 47.178, 
      "longitude": 7.368
    },
    "url": "https://apex-industrial.ch",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:00",
        "closes": "18:00"
      }
    ],
    "description": "Spezialisiert auf CNC-Instandhaltung und Spindel-Service."
  };

  return (
    <html lang="de-CH" className={`scroll-smooth dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 antialiased selection:bg-safety selection:text-white font-sans min-h-screen overflow-x-hidden">
        <SettingsProvider>
          <div className="bg-noise fixed inset-0 z-50 pointer-events-none opacity-[0.03]"></div>
          {children}
        </SettingsProvider>
      </body>
    </html>
  );
}