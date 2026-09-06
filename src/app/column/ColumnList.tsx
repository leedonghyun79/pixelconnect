'use client';
import { useState } from 'react';
import styles from './column.module.css';

const categories = ['전체', '홈페이지 기획', '전환율 최적화', '유지보수', '디자인 트렌드', '마케팅'];

export interface ColumnCard {
  id: string;
  title: string;
  category: string;
  thumbnail: string | null;
  publishedAt: string; // ISO
}

function fmtDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

export default function ColumnList({ articles }: { articles: ColumnCard[] }) {
  const [active, setActive] = useState('전체');
  const filtered = active === '전체' ? articles : articles.filter((a) => a.category === active);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Filter */}
        <div className={styles.filters}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`${styles.filterBtn} ${active === cat ? styles.filterActive : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filtered.map((article) => (
            <a key={article.id} href={`/column/${article.id}`} style={{ textDecoration: 'none' }}>
              <article className={styles.card}>
                <div className={styles.thumb}>
                  {article.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={article.thumbnail}
                      alt={article.title}
                      className={styles.thumbImg}
                    />
                  ) : (
                    <div className={styles.thumbInner} />
                  )}
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{article.title}</h3>
                  <div className={styles.cardMeta}>
                    <span className={styles.cat}>{article.category}</span>
                    <span className={styles.date}>{fmtDate(article.publishedAt)}</span>
                  </div>
                </div>
              </article>
            </a>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className={styles.empty}>
            {articles.length === 0
              ? '아직 발행된 칼럼이 없습니다.'
              : '해당 카테고리의 글이 아직 없습니다.'}
          </p>
        )}
      </div>
    </section>
  );
}
