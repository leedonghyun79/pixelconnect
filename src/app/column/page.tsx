import type { Metadata } from 'next';
import PageTitleBanner from '@/components/PageTitleBanner/PageTitleBanner';
import { fetchColumns } from '@/lib/api/columns';
import ColumnList, { type ColumnCard } from './_components/ColumnList/ColumnList';
import FinalCTA from '@/components/FinalCTA/FinalCTA';

export const metadata: Metadata = {
  title: '칼럼 | 픽셀커넥트',
  description: '홈페이지 제작, 전환율 최적화, 유지보수 운영 노하우를 담은 픽셀커넥트의 칼럼입니다.',
  alternates: { canonical: 'https://pixelconnect.co.kr/column' },
};

export default async function ColumnPage() {
  const rows = await fetchColumns();
  const articles: ColumnCard[] = rows.map((r) => ({
    id: r.id,
    title: r.title,
    category: r.category,
    thumbnail: r.thumbnail,
    publishedAt: r.publishedAt,
  }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '픽셀커넥트 칼럼',
    itemListElement: rows.map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Article',
        url: `https://pixelconnect.co.kr/column/${r.id}`,
        headline: r.title,
        ...(r.thumbnail ? { image: r.thumbnail } : {}),
        datePublished: r.publishedAt,
        description: r.description,
      },
    })),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageTitleBanner
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
