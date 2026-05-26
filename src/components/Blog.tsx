'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './Blog.module.css';

const posts = [
  {
    cat: '전환율 최적화',
    title: '랜딩페이지 전환율 3배 높이는 5가지 구조',
    date: '2025.04.20',
    readTime: '5분',
  },
  {
    cat: '랜딩페이지',
    title: '광고비 아끼는 랜딩페이지 구조 완전 분석',
    date: '2025.04.10',
    readTime: '7분',
  },
  {
    cat: '쇼핑몰',
    title: '쇼핑몰 이탈률 줄이는 상품 상세 페이지 전략',
    date: '2025.03.28',
    readTime: '6분',
  },
  {
    cat: '웹사이트 기획',
    title: '홈페이지 만들기 전 반드시 체크해야 할 것',
    date: '2025.03.15',
    readTime: '4분',
  },
];

export default function Blog() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    itemRefs.current.forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} id="blog">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className="section-label">Blog</div>
          <h2 className={`section-title ${styles.title}`}>인사이트 &amp; 전략</h2>
        </div>

        <div className={styles.grid}>
          {posts.map((post, i) => (
            <div
              key={i}
              ref={el => { itemRefs.current[i] = el; }}
              className={`${styles.card} fade-up`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className={styles.cardTop}>
                <span className={styles.cat}>{post.cat}</span>
                <span className={styles.readTime}>{post.readTime} 읽기</span>
              </div>
              <h3 className={styles.postTitle}>{post.title}</h3>
              <div className={styles.cardBottom}>
                <span className={styles.date}>{post.date}</span>
                <span className={styles.arrow}>↗</span>
              </div>
              <div className={styles.inlineCta}>
                이런 사이트가 필요하신가요?{' '}
                <a href="#contact" className={styles.inlineCtaLink}>무료 상담 →</a>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.viewAll}>
          <Link href="/blog" className={styles.viewAllLink}>
            전체 글 보기 →
          </Link>
        </div>
      </div>
    </section>
  );
}
