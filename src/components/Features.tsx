'use client';
import { useEffect, useRef } from 'react';
import styles from './Features.module.css';

const features = [
  {
    num: '01',
    title: '데이터 기반 기획',
    desc: '단순한 제작이 아닌, 목표 달성을 위한 전략적 설계로 비즈니스 성장을 이끕니다.',
  },
  {
    num: '02',
    title: '사용자 중심 UX',
    desc: '고객이 쉽고 편리하게 이용할 수 있는 직관적인 경험을 제공합니다.',
  },
  {
    num: '03',
    title: '빠른 커뮤니케이션',
    desc: '프로젝트 진행 중 신속한 피드백과 대응으로 답답함 없는 협업을 약속합니다.',
  },
  {
    num: '04',
    title: '철저한 사후 관리',
    desc: '런칭이 끝이 아닙니다. 지속적인 운영 지원으로 비즈니스의 안정성을 지킵니다.',
  },
];

export default function Features() {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className="section-label">Our Strengths</div>
          <h2 className={`section-title ${styles.title}`}>
            지속 가능한 비즈니스를<br />위한 4가지 약속
          </h2>
        </div>

        <div ref={listRef} className={`${styles.list} fade-up`}>
          {features.map((f, i) => (
            <div key={i} className={styles.item}>
              <span className={styles.num}>{f.num}</span>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.desc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
