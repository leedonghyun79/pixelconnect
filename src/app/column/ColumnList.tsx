'use client';
import { useState } from 'react';
import styles from './column.module.css';

const categories = ['전체', '홈페이지 기획', '전환율 최적화', '유지보수', '디자인 트렌드', '마케팅'];

const articles = [
  {
    cat: '전환율 최적화',
    title: '랜딩페이지 전환율 3배 높이는 5가지 구조',
    excerpt: '광고비는 쓰는데 문의가 없다면, 문제는 광고가 아니라 랜딩페이지 구조입니다. 전환율을 높이는 5가지 핵심 구조를 알려드립니다.',
    date: '2025.04.20',
    readTime: '5분',
  },
  {
    cat: '홈페이지 기획',
    title: '홈페이지 만들기 전 반드시 체크해야 할 7가지',
    excerpt: '홈페이지 제작을 시작하기 전, 이 7가지만 체크하면 제작 과정이 훨씬 수월해집니다. 사이트맵부터 콘텐츠 준비까지.',
    date: '2025.04.15',
    readTime: '4분',
  },
  {
    cat: '유지보수',
    title: '홈페이지 유지보수, 왜 중요한가요?',
    excerpt: '납품 후 방치된 홈페이지는 브랜드 이미지를 훼손합니다. 정기적인 유지보수가 비즈니스에 미치는 영향을 분석합니다.',
    date: '2025.04.10',
    readTime: '6분',
  },
  {
    cat: '전환율 최적화',
    title: '광고비 아끼는 랜딩페이지 구조 완전 분석',
    excerpt: '같은 광고비로 2~3배 더 많은 문의를 받는 비결. 실제 사례와 함께 분석한 고전환 랜딩페이지 구조.',
    date: '2025.04.05',
    readTime: '7분',
  },
  {
    cat: '디자인 트렌드',
    title: '2025년 웹 디자인 트렌드 TOP 7',
    excerpt: '올해 가장 주목받는 웹 디자인 트렌드를 정리했습니다. 미니멀리즘부터 AI 인터페이스까지.',
    date: '2025.03.28',
    readTime: '5분',
  },
  {
    cat: '마케팅',
    title: '소상공인을 위한 온라인 마케팅 기초 가이드',
    excerpt: '홈페이지만 만들면 끝? 검색 최적화, SNS 연동, 블로그 운영까지 기초 마케팅 전략을 알려드립니다.',
    date: '2025.03.20',
    readTime: '8분',
  },
  {
    cat: '홈페이지 기획',
    title: '좋은 홈페이지와 나쁜 홈페이지의 차이',
    excerpt: '방문자가 3초 안에 이탈하는 사이트 vs 문의로 이어지는 사이트. 그 구조적 차이를 분석합니다.',
    date: '2025.03.15',
    readTime: '6분',
  },
  {
    cat: '유지보수',
    title: '아임웹 사이트 셀프 관리 가이드',
    excerpt: '아임웹으로 제작된 홈페이지를 직접 관리하는 방법. 기본 수정부터 콘텐츠 업데이트까지.',
    date: '2025.03.10',
    readTime: '4분',
  },
];

export default function ColumnList() {
  const [active, setActive] = useState('전체');
  const filtered = active === '전체' ? articles : articles.filter(a => a.cat === active);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Filter */}
        <div className={styles.filters}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`${styles.filterBtn} ${active === cat ? styles.filterActive : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles */}
        <div className={styles.grid}>
          {filtered.map((article, i) => (
            <article key={i} className={styles.card}>
              <div className={styles.thumb}>
                <div className={styles.thumbInner} />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{article.title}</h3>
                <div className={styles.cardMeta}>
                  <span className={styles.cat}>{article.cat}</span>
                  <span className={styles.date}>{article.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className={styles.empty}>해당 카테고리의 글이 아직 없습니다.</p>
        )}
      </div>
    </section>
  );
}
