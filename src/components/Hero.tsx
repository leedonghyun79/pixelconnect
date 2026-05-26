'use client';
import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';

const stats = [
  { num: 'N+', label: '누적 프로젝트' },
  { num: 'N%', label: '고객 재의뢰율' },
  { num: 'N시간', label: '평균 응답 속도' },
  { num: 'N%', label: '고객 만족도' },
];

export default function Hero() {
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      }),
      { threshold: 0.1 }
    );
    itemRefs.current.forEach(el => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} id="hero">
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Main Text */}
          <div className={styles.textSide}>
            <div 
              ref={el => { itemRefs.current[0] = el; }} 
              className={`${styles.eyebrow} fade-up fade-delay-1`}
            >
              WEBSITE · MAINTENANCE · GROWTH
            </div>

            <h1 
              ref={el => { itemRefs.current[1] = el; }} 
              className={`${styles.headline} fade-up fade-delay-2`}
            >
              만들고 끝나는 <br />
              홈페이지는 <em>없습니다</em><span className={styles.accent}>.</span>
            </h1>

            <p 
              ref={el => { itemRefs.current[2] = el; }} 
              className={`${styles.sub} fade-up fade-delay-3`}
            >
              제작부터 운영까지, 브랜드의 성장을 함께 책임집니다.<br />
              납품 후에도 끊기지 않는 파트너를 만나보세요.
            </p>

            <div 
              ref={el => { itemRefs.current[3] = el; }} 
              className={`${styles.ctaRow} fade-up fade-delay-4`}
            >
              <a href="/contact" className="btn btn-primary">
                무료 상담 신청 →
              </a>
              <a href="/portfolio" className="btn btn-secondary">
                포트폴리오 보기
              </a>
            </div>
          </div>

          {/* Stats Grid at bottom */}
          <div 
            ref={el => { itemRefs.current[4] = el; }} 
            className={`${styles.cardSide} fade-up fade-delay-5`}
          >
            <div className={styles.statsGrid}>
              {stats.map((stat, i) => (
                <div key={i} className={styles.statCard}>
                  <span className={styles.statNum}>{stat.num}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
