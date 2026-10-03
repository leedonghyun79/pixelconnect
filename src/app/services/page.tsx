import type { Metadata } from 'next';
import PageTitleBanner from '@/components/PageTitleBanner/PageTitleBanner';
import FinalCTA from '@/components/FinalCTA/FinalCTA';
import Pricing from '@/app/_components/Pricing/Pricing';
import { serviceJsonLd } from '@/data/pricing';
import ServiceDetail from './_components/ServiceDetail/ServiceDetail';

export const metadata: Metadata = {
  title: '홈페이지 제작 서비스·비용 안내 | 픽셀커넥트',
  description: '홈페이지 제작 비용과 서비스 범위 안내. 랜딩페이지 70만원~, 기업 홈페이지 150만원~, 맞춤형 개발은 상담 후 견적. 제작 후 유지보수까지 책임지며 전국 비대면으로 진행합니다.',
  alternates: { canonical: 'https://pixelconnect.co.kr/services' },
};

export default function ServicesPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <PageTitleBanner
        eyebrow="SERVICES"
        title="홈페이지 제작 서비스와 비용"
        sub={<>기획부터 디자인, 개발, 유지보수까지 홈페이지가<br />필요한 순간부터 운영이 안정될 때까지 책임집니다.</>}
        breadcrumb="서비스"
      />

      {/* 서비스 상세 항목 */}
      <ServiceDetail />

      {/* 요금제 */}
      <Pricing />

      {/* 하단 전환 CTA */}
      <FinalCTA />

    </main>
  );
}
