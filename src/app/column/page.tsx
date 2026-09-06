import type { Metadata } from 'next';
import { desc } from 'drizzle-orm';
import PageHero from '@/components/PageHero';
import { db } from '@/db';
import { columns } from '@/db/schema';
import ColumnList, { type ColumnCard } from './ColumnList';
import FinalCTA from '@/components/FinalCTA';

export const metadata: Metadata = {
  title: '칼럼 | 픽셀커넥트',
  description: '홈페이지 제작, 전환율 최적화, 유지보수 운영 노하우를 담은 픽셀커넥트의 칼럼입니다.',
};

export const revalidate = 60;

export default async function ColumnPage() {
  const rows = await db
    .select({
      id: columns.id,
      title: columns.title,
      category: columns.category,
      thumbnail: columns.thumbnail,
      publishedAt: columns.publishedAt,
    })
    .from(columns)
    .orderBy(desc(columns.publishedAt));

  const articles: ColumnCard[] = rows.map((r) => ({
    id: r.id,
    title: r.title,
    category: r.category,
    thumbnail: r.thumbnail,
    publishedAt: r.publishedAt.toISOString(),
  }));

  return (
    <main>
      <PageHero
        eyebrow="COLUMN"
        title="인사이트 & 전략"
        sub={
          <>
            홈페이지 제작과 운영에 대한 실전 노하우를 공유합니다.<br />
            브랜드 성장에 도움이 되는 글을 만나보세요.
          </>
        }
        breadcrumb="칼럼"
      />

      <ColumnList articles={articles} />

      <FinalCTA />
    </main>
  );
}
