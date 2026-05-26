'use client';
import { useEffect, useRef } from 'react';
import styles from './Projects.module.css';

const projects = [
  {
    cat: 'UI/UX · E-Commerce',
    title: '글로벌 제조기업 공식 홈페이지 리뉴얼',
    result: 'B2B 문의 500% 증가 · 이탈률 40% 감소',
    tags: ['문의 500% 상승', '이탈률 40% 감소'],
    bg: 'linear-gradient(135deg, #0d1117 0%, #0d2240 100%)',
    icon: '◈',
  },
  {
    cat: 'Brand · Motion',
    title: '프리미엄 패션 브랜드 D2C 자사몰',
    result: '월 거래액 3억 달성 · 전환율 2배 개선',
    tags: ['월 거래액 3억', '전환율 2배 개선'],
    bg: 'linear-gradient(135deg, #1a0a20 0%, #2d1040 100%)',
    icon: '◉',
  },
  {
    cat: 'Product · SaaS',
    title: '교육 플랫폼 UI/UX 고도화',
    result: '회원 가입률 150% 증가 · 만족도 98%',
    tags: ['가입률 150% 증가', '만족도 98%'],
    bg: 'linear-gradient(135deg, #081808 0%, #0a2e14 100%)',
    icon: '◇',
  },
];

export default function Projects() {
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
    <section id="portfolio" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className="section-label">Selected Works</div>
          <h2 className={`section-title ${styles.title}`}>최근 프로젝트</h2>
        </div>

        <div className={styles.list}>
          {projects.map((project, i) => (
            <div
              key={i}
              ref={el => { itemRefs.current[i] = el; }}
              className={`${styles.item} fade-up`}
            >
              <div className={styles.itemLeft}>
                <span className={styles.itemNum}>0{i + 1}</span>
                <div>
                  <div className={styles.itemCat}>{project.cat}</div>
                  <h3 className={styles.itemTitle}>{project.title}</h3>
                </div>
              </div>
              <div className={styles.itemRight}>
                <div className={styles.itemResult}>{project.result}</div>
                <div className={styles.itemTags}>
                  {project.tags.map(tag => (
                    <span key={tag} className={styles.itemTag}>{tag}</span>
                  ))}
                </div>
              </div>
              <div className={styles.itemArrow}>↗</div>
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <span>전체 포트폴리오 보기</span>
          <span className={styles.ctaArrow}>→</span>
        </div>
      </div>
    </section>
  );
}
