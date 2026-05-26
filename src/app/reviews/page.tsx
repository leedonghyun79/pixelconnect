import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import ReviewList from './ReviewList';
import Stats from '@/components/Stats';
import FinalCTA from '@/components/FinalCTA';

export const metadata: Metadata = {
  title: '고객후기 | 픽셀커넥트',
  description: '픽셀커넥트와 함께한 대표님들의 생생한 후기. 결과물보다 관계를 먼저 생각합니다.',
};

export default function ReviewsPage() {
  return (
    <main>
      <PageHero
        eyebrow="REVIEWS"
        title="함께한 대표님들의 이야기"
        sub="결과물보다 관계가 먼저입니다. 실제로 함께 작업한 대표님들의 솔직한 후기를 확인해보세요."
        breadcrumb="고객후기"
      />

      {/* 전체 후기 목록 */}
      <ReviewList />

      {/* Stats */}
      <Stats />

      {/* CTA */}
      <FinalCTA />
    </main>
  );
}
