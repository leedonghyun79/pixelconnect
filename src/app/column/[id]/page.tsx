import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchColumn } from '@/lib/columns';
import HighlightCode from './HighlightCode';
import styles from './detail.module.css';

function fmtDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

// 본문 HTML에서 태그를 걷어내고 요약문(메타 description용)을 뽑는다.
function excerpt(html: string, max = 150): string {
  const text = html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}...`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const col = await fetchColumn(id);
  if (!col) return { title: '칼럼을 찾을 수 없습니다 | 픽셀커넥트' };
  const description = excerpt(col.contentHtml) || `${col.category} · 픽셀커넥트 칼럼`;
  return {
    title: `${col.title} | 픽셀커넥트`,
    description,
    alternates: { canonical: `https://pixelconnect.co.kr/column/${col.id}` },
    openGraph: {
      type: 'article',
      title: col.title,
      description,
      publishedTime: col.publishedAt,
      images: col.thumbnail ? [{ url: col.thumbnail }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: col.title,
      description,
      images: col.thumbnail ? [col.thumbnail] : undefined,
    },
  };
}

export default async function ColumnDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const col = await fetchColumn(id);
  if (!col) notFound();

  const url = `https://pixelconnect.co.kr/column/${col.id}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: col.title,
    description: excerpt(col.contentHtml),
    url,
    datePublished: col.publishedAt,
    dateModified: col.publishedAt,
    ...(col.thumbnail ? { image: col.thumbnail } : {}),
    articleSection: col.category,
    inLanguage: 'ko-KR',
    isPartOf: { '@id': 'https://pixelconnect.co.kr/#website' },
    publisher: { '@id': 'https://pixelconnect.co.kr/#organization' },
    author: { '@id': 'https://pixelconnect.co.kr/#organization' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };

  return (
    <main className={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className={styles.article}>
        <header className={styles.header}>
          <div className={styles.meta}>
            <span className={styles.cat}>{col.category}</span>
            <span className={styles.date}>{fmtDate(col.publishedAt)}</span>
          </div>
          <h1 className={styles.title}>{col.title}</h1>
        </header>

        {col.thumbnail && (
          <div className={styles.thumb}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={col.thumbnail} alt={col.title} width={1200} height={675} className={styles.thumbImg} />
          </div>
        )}

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: col.contentHtml }}
        />
        <HighlightCode />

        <div className={styles.footer}>
          <div className={styles.footerInner}>
            <h3>이 글이 도움이 되셨나요?</h3>
            <p>픽셀커넥트와 함께 성공적인 비즈니스를 시작해보세요.</p>
            <div className={styles.actions}>
              <Link href="/contact" className={styles.contactBtn}>프로젝트 문의하기</Link>
              <Link href="/column" className={styles.backBtn}>목록으로 돌아가기</Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
