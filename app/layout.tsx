import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const _geistSans = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://mkvcompany.business'),
  title: {
    default: 'MKV Company — D2C E-Commerce & AI Growth Partner',
    template: '%s | MKV Company',
  },
  description:
    'MKV Company builds, scales, and automates direct-to-consumer e-commerce brands with custom development, paid media, retention marketing, and AI-driven operations.',
  keywords: [
    'MKV Company',
    'D2C e-commerce agency',
    'Shopify development',
    'paid media',
    'email marketing',
    'AI automation',
  ],
  generator: 'v0.app',
  openGraph: {
    type: 'website',
    url: 'https://mkvcompany.business',
    siteName: 'MKV Company',
    title: 'MKV Company — D2C E-Commerce & AI Growth Partner',
    description:
      'Full-service e-commerce development, growth marketing, and AI automation for direct-to-consumer brands.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MKV Company — D2C E-Commerce & AI Growth Partner',
    description:
      'Full-service e-commerce development, growth marketing, and AI automation for direct-to-consumer brands.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#fdf6ef',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
