import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Providers } from './providers';

export const metadata: Metadata = {
  metadataBase: new URL('https://papiv.com'),
  title: {
    default: 'PaPiv Suite | Free Real-Time Developer & Text Tools',
    template: '%s | PaPiv Suite',
  },
  description:
    'An open-source suite of free, real-time tools for developers and data professionals. Convert JSON, analyze text, generate slugs, and more, all within your browser for maximum privacy and speed.',
  openGraph: {
    title: 'PaPiv Suite | Free Real-Time Developer & Text Tools',
    description:
      'The ultimate collection of fast, private, and free online tools.',
    url: 'https://papiv.com',
    siteName: 'PaPiv Suite',
    images: [
      {
        url: 'https://papiv.com/og-image.png', // Assuming an OG image will be at this path
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
    images: ['https://papiv.com/og-image.png'],
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
      </head>
      <body className="font-body antialiased">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
