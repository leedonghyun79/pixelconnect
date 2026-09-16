'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './Stats.module.css';

const stats = [
  { target: 50, suffix: '+', label: '누적 프로젝트', desc: '다양한 업종 경험' },
  { target: 92, suffix: '%', label: '고객 재의뢰율', desc: '한 번의 인연이 계속됩니다' },
  { target: 98, suffix: '%', label: '고객 만족도', desc: '결과물에 대한 자신감' },
];

function useCounter(target: number, duration: number) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(target * eased));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

function StatItem({ stat }: { stat: typeof stats[0] }) {
  const { count, ref } = useCounter(stat.target, 1800);

  return (
    <div ref={ref} className={styles.statItem}>
      <span className={styles.num}>{count}{stat.suffix}</span>
      <span className={styles.label}>{stat.label}</span>
      <span className={styles.desc}>{stat.desc}</span>
    </div>
  );
}

export default function Stats() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
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
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} id="stats">
      <div className={styles.container}>
        <div ref={headerRef} className={`${styles.header} fade-up`}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>숫자로 증명합니다</h2>
        </div>

        <div className={styles.grid}>
          {stats.map((s, i) => (
            <StatItem key={i} stat={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
