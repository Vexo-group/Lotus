import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })
const geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LOTUS - Salon de Eventos en La Plata',
  description:
    'Salon de eventos en el centro de La Plata. Cumpleanos infantiles, fiestas teens, eventos corporativos, muestras de arte y mas. Tu evento unico e inolvidable.',
  keywords: [
    'salon de eventos La Plata',
    'cumpleanos infantiles La Plata',
    'fiestas teens',
    'eventos corporativos',
    'alquiler salon La Plata',
    'lotus eventos',
  ],
  openGraph: {
    title: 'LOTUS - Salon de Eventos en La Plata',
    description:
      'Espacio para cumpleanos infantiles, teens, eventos corporativos, ferias y muestras en el centro de La Plata.',
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
    title: 'LOTUS - Salon de Eventos en La Plata',
    description:
      'Espacio para eventos infantiles, teens, corporativos y mas en el centro de La Plata.',
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
