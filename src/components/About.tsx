'use client';
import { useEffect, useRef } from 'react';
import styles from './About.module.css';

const values = [
  { label: 'Strategy', desc: '비즈니스를 먼저 이해합니다' },
  { label: 'Design', desc: '사용자 중심의 경험 설계' },
  { label: 'Technology', desc: '최신 기술로 구현합니다' },
  { label: 'Growth', desc: '데이터 기반 성장 지원' },
];

const stats = [
  { num: '150+', label: '완료 프로젝트' },
  { num: '80+', label: '행복한 클라이언트' },
  { num: '10년+', label: '업력' },
  { num: '12', label: '수상 경력' },
];

export default function About() {
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { 
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        } else {
          e.target.classList.remove('visible');
        }
      }),
      { threshold: 0.1 }
    );
    itemRefs.current.forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>

        <div className={styles.topGrid}>
          <div
            ref={el => { itemRefs.current[0] = el; }}
            className={`${styles.missionBlock} fade-up`}
          >
            <div className="section-label">Our Mission</div>
            <h2 className={`section-title ${styles.missionTitle}`}>
              기술로<br />가치를 증명합니다
            </h2>
          </div>

          <div
            ref={el => { itemRefs.current[1] = el as HTMLDivElement; }}
            className={`${styles.descBlock} fade-up`}
          >
            <p className={styles.desc}>
              좋은 가치를 가진 제품이 온라인에서 제대로 표현되지 못해
              성장의 기회를 놓치는 수많은 파트너들을 보았습니다.
            </p>
            <p className={styles.desc}>
              우리는 단순히 코드를 짜는 개발자가 아닙니다.
              비즈니스의 고민을 함께 나누고, 기술로 그 가치를 증명하는 파트너입니다.
            </p>
            <div className={styles.missionBox}>
              Mission: 기술로 비즈니스 가치 창출
            </div>
          </div>
        </div>

        {/* Values */}
        <div className={styles.valuesGrid}>
          {values.map((v, i) => (
            <div
              key={i}
              ref={el => { itemRefs.current[i + 2] = el; }}
              className={`${styles.valueCard} fade-up`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <span className={styles.valueNum}>0{i + 1}</span>
              <span className={styles.valueName}>{v.label}</span>
              <p className={styles.valueDesc}>{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className={styles.statsGrid}>
          {stats.map((s, i) => (
            <div
              key={i}
              ref={el => { itemRefs.current[i + 6] = el; }}
              className={`${styles.statItem} fade-up`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <span className={styles.statNum}>{s.num}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
