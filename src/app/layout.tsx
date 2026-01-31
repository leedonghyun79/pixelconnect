import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'

const font = Outfit({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WEB AGENCY | Where Your Story Meets Technology',
  description: '소상공인과 스타트업을 위한 차별화된 웹 솔루션. 디자인부터 개발, 마케팅까지 원스톱 서비스를 제공합니다.',
  icons: {
    icon: '/favicon.ico',
  },
}

import Cursor from '@/components/Cursor';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={font.className}>
        <div className="bg-noise" />
        <Cursor />
        <SmoothScroll>
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}
