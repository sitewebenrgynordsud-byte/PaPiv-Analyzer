import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Providers } from './providers';
import { GoogleAnalytics } from '@next/third-parties/google';
import PromoBanner from '@/components/layout/PromoBanner';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.papiv.com'),
  title: {
    default: 'PaPiv Suite | Free Real-Time Developer & Text Tools',
    template: '%s | PaPiv Suite',
  },
  description:
    'Free, secure, and instant online tools for developers. Convert JSON, format code, analyze text, and generate SEO tags in your browser with 100% privacy.',
  manifest: '/site.webmanifest',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  openGraph: {
    title: 'PaPiv Suite | Free Real-Time Developer & Text Tools',
    description:
      'The ultimate collection of fast, private, and free online tools.',
    url: 'https://www.papiv.com',
    siteName: 'PaPiv Suite',
    images: [
      {
        url: 'https://www.papiv.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PaPiv Suite Hero Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PaPiv Suite | Free Real-Time Developer & Text Tools',
    description:
      'An open-source suite of free, real-time tools for developers and data professionals.',
    images: ['https://www.papiv.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({"@context":"https://schema.org","@type":"WebSite",name:"PaPiv Suite",url:"https://www.papiv.com",description:"Free instant privacy-focused developer tools.",potentialAction:{"@type":"SearchAction",target:{"@type":"EntryPoint",urlTemplate:"https://www.papiv.com/?q={search_term_string}"},"query-input":"required name=search_term_string"}})}} />
      </head>
      <body className="font-body antialiased">
        <Providers>
          <PromoBanner />
          {children}
          <Toaster />
        </Providers>
        <GoogleAnalytics gaId="G-S3M38VLJ9S" />
      </body>
    </html>
  );
}
