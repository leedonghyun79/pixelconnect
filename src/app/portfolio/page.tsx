import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Portfolio from '@/components/Portfolio';
import Stats from '@/components/Stats';

export const metadata: Metadata = {
  title: '포트폴리오 | 픽셀커넥트',
  description: '다양한 업종의 브랜드와 함께 만든 홈페이지 포트폴리오. 쇼핑몰, 기업 홈페이지, 병원, 교육 등 실제 결과물을 확인하세요.',
};

export default function PortfolioPage() {
  return (
    <main>
      <PageHero
        eyebrow="OUR WORK"
        title="포트폴리오"
        sub={
          <>
            다양한 업종의 브랜드와 함께 만든 홈페이지입니다.<br />
            픽셀커넥트의 성공적인 프로젝트 결과물을 확인해보세요.
          </>
        }
        breadcrumb="포트폴리오"
      />

      {/* 포트폴리오 그리드 */}
      <Portfolio hideHeader={true} />

      {/* Stats */}
      <Stats />

    </main>
  );
}
