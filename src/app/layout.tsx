import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Verse Pursuit - Bible Word Game',
  description: 'Complete Bible verses by placing scrambled word tiles in the correct order. A faith-based word puzzle game.',
  keywords: 'bible, word game, verse, puzzle, christian, faith, game',
  authors: [{ name: 'Verse Pursuit Team' }],
  creator: 'Verse Pursuit',
  publisher: 'Verse Pursuit',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://verse-pursuit.com',
    title: 'Verse Pursuit - Bible Word Game',
    description: 'Complete Bible verses by placing scrambled word tiles in the correct order.',
    siteName: 'Verse Pursuit',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Verse Pursuit - Bible Word Game',
    description: 'Complete Bible verses by placing scrambled word tiles in the correct order.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}