import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/Navbar'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bolão 2026 – Copa do Mundo',
  description: 'Agenda de jogos e bolão com amigos para a Copa do Mundo 2026',
  keywords: ['copa do mundo', '2026', 'bolão', 'futebol'],
  openGraph: {
    title: 'Bolão 2026',
    description: 'Aposte com seus amigos na Copa do Mundo 2026',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Google AdSense — descomente quando tiver o publisher ID */}
        {/* <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
          crossOrigin="anonymous"
        /> */}
      </head>
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 py-6">
          {children}
        </main>
        <Toaster position="top-center" />
      </body>
    </html>
  )
}
