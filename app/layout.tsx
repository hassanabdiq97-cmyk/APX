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
  themeColor: '#D92B00', // Adjusted for better contrast compliance
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'APX Industrial | CNC Instandhaltung & Pikett Schweiz',
  description: 'Ihr Partner für CNC-Reparatur, Spindel-Service und Reinraum-Instandhaltung. 24/7 Pikett für Uhrenindustrie & Medtech in Grenchen, Biel, Solothurn.',
  keywords: ['CNC Instandhaltung', 'Spindel Service', 'Pikett Dienst', 'Industriemechanik', 'Tornos Service', 'Biel', 'Grenchen', 'Solothurn'],
  manifest: '/manifest.json', // Best practice placeholder
  openGraph: {
    title: 'APX Industrial | High-Performance Instandhaltung',
    description: '24/7 Pikett für die Schweizer Uhrenindustrie und Medtech.',
    locale: 'de_CH',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'APX Industrial',
    'image': 'https://apex-industrial.ch/og-image.jpg',
    'telephone': '+41 32 123 45 67',
    'email': 'service@apex-swiss.ch',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Solothurnstrasse 44',
      'addressLocality': 'Lengnau',
      'postalCode': '2543',
      'addressCountry': 'CH'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 47.178,
      'longitude': 7.369
    },
    'url': 'https://apex-industrial.ch',
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
      ],
      'opens': '00:00',
      'closes': '23:59'
    },
    'priceRange': '$$$'
  };

  return (
    <html lang="de-CH" className={`scroll-smooth dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 antialiased selection:bg-safety selection:text-white font-sans min-h-screen overflow-x-hidden">
        <Providers>
          {/* Global Noise Overlay for Industrial Texture */}
          <div className="bg-noise fixed inset-0 z-0 pointer-events-none opacity-[0.03]" aria-hidden="true"></div>
          
          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}