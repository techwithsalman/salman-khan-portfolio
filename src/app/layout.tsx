import type { Metadata } from 'next'
import './globals.css'
import { PortfolioProvider } from '@/context/PortfolioContext'
import SmoothScroll from '@/components/layout/SmoothScroll'
import FloatingNav from '@/components/navigation/FloatingNav'
import CommandSearchModal from '@/components/search/CommandSearchModal'
import { portfolioConfig } from '@/data/portfolioConfig'

export const metadata: Metadata = {
  title: portfolioConfig.meta.siteTitle,
  description: portfolioConfig.meta.siteDescription,
  keywords: portfolioConfig.meta.siteKeywords,
  authors: [{ name: portfolioConfig.personal.name }],
  metadataBase: new URL('https://portfolio-05.vercel.app'),
  openGraph: {
    title: portfolioConfig.meta.siteTitle,
    description: portfolioConfig.meta.siteDescription,
    type: 'website',
    locale: 'en_US',
    siteName: `${portfolioConfig.personal.name} Portfolio`,
  },
  twitter: {
    card: 'summary_large_image',
    title: portfolioConfig.meta.siteTitle,
    description: portfolioConfig.meta.siteDescription,
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-cinematic-darkest text-slate-100 antialiased selection:bg-cyan-500 selection:text-black">
        <PortfolioProvider>
          <SmoothScroll>
            <FloatingNav />
            <main id="ma-main">{children}</main>
            <CommandSearchModal />
          </SmoothScroll>
        </PortfolioProvider>
      </body>
    </html>
  )
}
