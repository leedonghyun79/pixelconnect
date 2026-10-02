import type { Metadata } from 'next'
import { Poppins, Playfair_Display } from 'next/font/google'
import './globals.css'
import 'highlight.js/styles/atom-one-dark.css' // 칼럼 코드 블록 문법 색상
import SmoothScroll from '@/components/common/SmoothScroll/SmoothScroll'
import Navbar from '@/components/common/Navbar/Navbar'
import Footer from '@/components/common/Footer/Footer'
// import DevNotice from '@/components/common/DevNotice/DevNotice'

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
  title: '홈페이지 제작 업체 | 기획부터 유지보수까지 픽셀커넥트',
  description: '홈페이지 제작 업체 픽셀커넥트. 기획부터 개발, 오픈 후 유지보수까지 대표가 직접 책임집니다. 전국 비대면 진행, 랜딩페이지 70만원~, 기업 홈페이지 150만원~.',
  metadataBase: new URL('https://pixelconnect.co.kr'),
  alternates: {
    types: {
      'application/rss+xml': [{ url: '/feed.xml', title: '픽셀커넥트 칼럼' }],
    },
  },
  openGraph: {
    type: 'website',
    siteName: '픽셀커넥트',
    title: '홈페이지 제작 업체 | 기획부터 유지보수까지 픽셀커넥트',
    description: '홈페이지 제작 업체 픽셀커넥트. 기획부터 개발, 오픈 후 유지보수까지 대표가 직접 책임집니다. 전국 비대면 진행.',
    url: 'https://pixelconnect.co.kr',
    locale: 'ko_KR',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '픽셀커넥트 — 만들고 끝나는 홈페이지는 없습니다',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '홈페이지 제작 업체 | 기획부터 유지보수까지 픽셀커넥트',
    description: '홈페이지 제작 업체 픽셀커넥트. 기획부터 개발, 오픈 후 유지보수까지 대표가 직접 책임집니다. 전국 비대면 진행.',
    images: ['/og-image.png'],
  },
  verification: {
    google: 'Qi4ne8zRwrfEGpqSIu0MuiMxRi7id2R3zuj-B5_LaPc',
    other: {
      'naver-site-verification': '4aec36a49a14f996100ec68ee68c4a61d70e7168',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/images/icon_196.png', type: 'image/png', sizes: '196x196' },
      { url: '/images/icon_152.png', type: 'image/png', sizes: '152x152' },
    ],
    shortcut: '/favicon.ico',
    apple: '/images/icon_152.png',
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/images/icon_152.png',
        sizes: '152x152',
      },
    ],
  },
}

const siteDescription =
  '홈페이지 제작 업체 픽셀커넥트. 기획부터 개발, 오픈 후 유지보수까지 대표가 직접 책임집니다. 전국 비대면 진행, 랜딩페이지 70만원~, 기업 홈페이지 150만원~.'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://pixelconnect.co.kr/#website',
      name: '픽셀커넥트',
      url: 'https://pixelconnect.co.kr',
      description: siteDescription,
      inLanguage: 'ko-KR',
      publisher: { '@id': 'https://pixelconnect.co.kr/#organization' },
    },
    {
      // ProfessionalService = LocalBusiness 하위 타입. 실제 사업장 주소는 신뢰 신호, 서비스 지역은 전국.
      // 주소·전화는 푸터 표기와 반드시 일치시킬 것 (NAP 일관성)
      '@type': 'ProfessionalService',
      '@id': 'https://pixelconnect.co.kr/#organization',
      name: '픽셀커넥트',
      alternateName: 'PIXEL CONNECT',
      url: 'https://pixelconnect.co.kr',
      description: siteDescription,
      logo: 'https://pixelconnect.co.kr/images/logo.png',
      image: 'https://pixelconnect.co.kr/og-image.png',
      telephone: '+82-10-7920-8157',
      email: 'ceo@pixelconnect.co.kr',
      vatID: '516-73-00625',
      priceRange: '₩700,000~',
      areaServed: { '@type': 'Country', name: '대한민국' },
      knowsAbout: ['홈페이지 제작', '반응형 웹사이트', '랜딩페이지 제작', '맞춤형 웹 개발', '홈페이지 유지보수'],
      sameAs: ['https://pf.kakao.com/_xoDxkuX/friend'],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+82-10-7920-8157',
        email: 'ceo@pixelconnect.co.kr',
        contactType: 'customer service',
        areaServed: 'KR',
        availableLanguage: ['Korean'],
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: '상동로 79, 4층 404-39호 (상동, 부천상동수석프라자)',
        addressLocality: '부천시 원미구',
        addressRegion: '경기도',
        postalCode: '14544',
        addressCountry: 'KR',
      },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${poppins.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      {/* 브라우저 확장(ColorZilla 등)이 <body>에 주입하는 속성으로 인한
          하이드레이션 경고 억제 — 이 요소 자신의 속성/텍스트에만 적용되며
          자식 요소의 실제 불일치는 그대로 보고됨 */}
      <body suppressHydrationWarning>
        <SmoothScroll>
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
        {/* <DevNotice /> */}
      </body>
    </html>
  )
}
