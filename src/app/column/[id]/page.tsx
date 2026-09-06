import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { columns } from '@/db/schema';
import HighlightCode from './HighlightCode';
import styles from './detail.module.css';

export const revalidate = 60;

function fmtDate(d: Date) {
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

async function getColumn(id: string) {
  const [row] = await db.select().from(columns).where(eq(columns.id, id));
  return row ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const col = await getColumn(id);
  if (!col) return { title: '칼럼을 찾을 수 없습니다 | 픽셀커넥트' };
  return {
    title: `${col.title} | 픽셀커넥트`,
    description: `${col.category} · 픽셀커넥트 칼럼`,
    openGraph: col.thumbnail ? { images: [{ url: col.thumbnail }] } : undefined,
  };
}

export default async function ColumnDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const col = await getColumn(id);
  if (!col) notFound();

  return (
    <main className={styles.main}>
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
            <img src={col.thumbnail} alt={col.title} className={styles.thumbImg} />
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
