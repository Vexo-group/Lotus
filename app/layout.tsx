import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'LOTUS - Salón de Eventos en La Plata',
  description: 'Salón de eventos en el centro de La Plata. Cumpleaños infantiles, fiestas teens, eventos corporativos, muestras de arte y más. Tu evento único e inolvidable.',
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
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
