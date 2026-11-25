import type { Metadata } from 'next'
import './globals.css'
import SmoothScroll from '@/components/layout/SmoothScroll'
import { portfolioConfig } from '@/data/portfolioConfig'

export const metadata: Metadata = {
  title: portfolioConfig.meta.siteTitle,
  description: portfolioConfig.meta.siteDescription,
  authors: [{ name: portfolioConfig.personal.fullName }],
  metadataBase: new URL('https://portfolio-05.vercel.app'),
  openGraph: {
    title: portfolioConfig.meta.siteTitle,
    description: portfolioConfig.meta.siteDescription,
    type: 'profile',
    locale: 'en_US',
    siteName: portfolioConfig.personal.fullName,
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
      <body className="min-h-screen bg-black text-white antialiased selection:bg-white selection:text-black">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
