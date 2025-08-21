import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://pondcleanup.com'),
  title: 'PondCleanup.com - Professional Pond & Lake Cleanup Services',
  description: 'Professional pond cleanup and lake weed removal services using advanced equipment. Serving Utah with reliable aquatic vegetation control.',
  keywords: 'pond cleanup, lake cleanup, aquatic vegetation removal, pond weed removal, lake weed control, aquatic weed removal, Utah pond services',
  authors: [{ name: 'Pond Cleanup Pro' }],
  openGraph: {
    title: 'Professional Pond Cleanup Services | Lake Weed Removal',
          description: 'Expert pond cleanup and lake weed removal services using professional equipment. Serving Utah with reliable aquatic vegetation control.',
    type: 'website',
    url: 'https://pondcleanup.com',
    images: ['/images/image004.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Pond Cleanup Services',
          description: 'Expert pond cleanup and lake weed removal services using professional equipment.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
