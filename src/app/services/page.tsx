import type { Metadata } from 'next';
import PageHero from '@/components/PageHero/PageHero';
import Stats from '@/components/Stats/Stats';
import FinalCTA from '@/components/FinalCTA/FinalCTA';
import ServiceDetail from './_components/ServiceDetail/ServiceDetail';

export const metadata: Metadata = {
  title: '서비스 | 픽셀커넥트',
  description: '브랜드 맞춤형 디자인, 합리적 견적, 납품 후에도 끊기지 않는 유지보수까지. 픽셀커넥트의 웹사이트 제작 서비스를 확인하세요.',
};

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow="SERVICES"
        title="브랜드의 성장을 함께 만드는 서비스"
        sub={<>기획부터 디자인, 개발, 유지보수까지 홈페이지가<br />필요한 순간부터 운영이 안정될 때까지 책임집니다.</>}
        breadcrumb="서비스"
      />

      {/* 서비스 상세 항목 */}
      <ServiceDetail />

      {/* 신뢰 지표 */}
      <Stats />

      {/* 하단 전환 CTA */}
      <FinalCTA />

    </main>
  );
}
