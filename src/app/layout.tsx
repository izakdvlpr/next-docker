import '@/styles/global.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { MainProvider } from '@/providers/MainProvider'

interface LayoutProps {
  children: React.ReactNode
}

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Website'
}

export default function RootLayout({
  children,
}: LayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainProvider>
          {children}
        </MainProvider>
      </body>
    </html>
  )
}
