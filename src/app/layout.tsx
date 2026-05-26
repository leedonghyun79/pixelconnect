import type { Metadata } from 'next'
import { Poppins, Playfair_Display } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
})

export const metadata: Metadata = {
  title: '픽셀커넥트 | 만들고 끝나는 홈페이지는 없습니다',
  description: '제작부터 운영까지, 브랜드의 성장을 함께 책임집니다. 합리적 가격과 제작 후 유지보수·관리까지 책임지는 웹 에이전시.',
  metadataBase: new URL('https://pixelconnect.co.kr'),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: '픽셀커넥트',
    title: '픽셀커넥트 | 만들고 끝나는 홈페이지는 없습니다',
    description: '제작부터 운영까지, 브랜드의 성장을 함께 책임집니다.',
    url: 'https://pixelconnect.co.kr',
    locale: 'ko_KR',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: '픽셀커넥트' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '픽셀커넥트 | 만들고 끝나는 홈페이지는 없습니다',
    description: '제작부터 운영까지, 브랜드의 성장을 함께 책임집니다.',
    images: ['/logo.png'],
  },
  icons: { icon: '/favicon.ico' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebSite', name: '픽셀커넥트', url: 'https://pixelconnect.co.kr' },
    {
      '@type': 'Organization',
      name: '픽셀커넥트',
      url: 'https://pixelconnect.co.kr',
      logo: 'https://pixelconnect.co.kr/logo.png',
      address: {
        '@type': 'PostalAddress',
        addressLocality: '부천',
        addressRegion: '경기도',
        addressCountry: 'KR',
      },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${poppins.variable} ${playfair.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SmoothScroll>
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}
