import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })
const geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LOTUS - Casita de Fiesta y Salon de Eventos en La Plata',
  description:
    'Casita de fiesta y salon de eventos en el centro de La Plata. Cumpleanos infantiles, fiestas teens, eventos corporativos, muestras de arte y mas. Tu evento unico e inolvidable.',
  keywords: [
    'casita de fiesta La Plata',
    'casa de fiestas infantiles La Plata',
    'salon de eventos La Plata',
    'cumpleanos infantiles La Plata',
    'fiestas teens',
    'eventos corporativos',
    'alquiler salon La Plata',
    'lotus eventos',
  ],
  openGraph: {
    title: 'LOTUS - Casita de Fiesta y Salon de Eventos en La Plata',
    description:
      'Tu casita de fiesta en La Plata para cumpleanos infantiles, fiestas teens, eventos corporativos, ferias y muestras.',
    url: '/',
    locale: 'es_AR',
    siteName: 'Lotus Eventos',
    images: [
      {
        url: '/Lotus_Hero2.jpg',
        width: 1200,
        height: 630,
        alt: 'Salon Lotus Eventos en La Plata',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LOTUS - Casita de Fiesta y Salon de Eventos en La Plata',
    description:
      'Casita de fiesta en La Plata para eventos infantiles, teens, corporativos y mas.',
    images: ['/Lotus_Hero2.jpg'],
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/favicon-lotus.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/favicon-lotus.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/favicon-lotus.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/favicon-lotus.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
