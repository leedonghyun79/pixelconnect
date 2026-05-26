'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './Portfolio.module.css';

const filters = ['전체', '쇼핑몰', '기업 홈페이지', '병원·클리닉', '교육', '기타'];

const projects = [
  {
    cat: '쇼핑몰',
    title: '비자르테 쇼핑몰',
    tags: ['인테리어', '쇼핑몰'],
    result: '제작 후 문의 3배 증가',
  },
  {
    cat: '기업 홈페이지',
    title: 'B2B SaaS 기업 사이트',
    tags: ['기업', 'B2B'],
    result: '브랜드 인지도 향상',
  },
  {
    cat: '병원·클리닉',
    title: '강남 피부과 클리닉',
    tags: ['병원', '클리닉'],
    result: '온라인 예약 200% 증가',
  },
  {
    cat: '교육',
    title: '교육 플랫폼 랜딩',
    tags: ['교육', '랜딩페이지'],
    result: '광고 전환율 3배',
  },
  {
    cat: '쇼핑몰',
    title: '뷰티 브랜드 LUMI',
    tags: ['뷰티', '쇼핑몰'],
    result: '전환율 3.2%→8.1%',
  },
  {
    cat: '기업 홈페이지',
    title: '법률 사무소 웹사이트',
    tags: ['법률', '기업'],
    result: '월 문의 3배 증가',
  },
];

interface PortfolioProps {
  hideHeader?: boolean;
}

export default function Portfolio({ hideHeader = false }: PortfolioProps) {
  const [active, setActive] = useState('전체');
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filtered = active === '전체'
    ? projects
    : projects.filter(p => p.cat === active);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    itemRefs.current.forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [filtered]);

  return (
    <section className={styles.section} id="portfolio">
      <div className={styles.container}>
        {!hideHeader && (
          <div className={styles.header}>
            <div className="section-eyebrow">OUR WORK</div>
            <h2 className="section-title">결과물로 말합니다</h2>
            <p className={styles.sub}>
              다양한 업종의 브랜드와 함께 만든 홈페이지입니다.
            </p>
          </div>
        )}

        {/* Filter tabs */}
        <div className={styles.filters}>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`${styles.filterBtn} ${active === f ? styles.filterActive : ''}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Project cards */}
        <div className={styles.grid}>
          {filtered.map((p, i) => (
            <div
              key={`${p.title}-${i}`}
              ref={el => { itemRefs.current[i] = el; }}
              className={`${styles.card} fade-up`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              {/* Thumbnail placeholder */}
              <div className={styles.thumb}>
                <div className={styles.thumbInner}>
                  <span className={styles.thumbPlaceholder}>🖥️</span>
                </div>
                <div className={styles.thumbOverlay}>
                  <a href="#contact" className={styles.thumbCta}>자세히 보기 →</a>
                </div>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.tags}>
                  {p.tags.map((t, ti) => (
                    <span key={ti} className={styles.tag}>{t}</span>
                  ))}
                </div>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                {p.result && (
                  <p className={styles.cardResult}>{p.result}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.viewAll}>
          <a href="/portfolio" className={styles.viewAllLink}>전체 프로젝트 보기 →</a>
        </div>
      </div>
    </section>
  );
}
