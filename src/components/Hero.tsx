'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import styles from './Hero.module.css';

const GridWaveCanvas = dynamic(() => import('./GridWaveCanvas'), { ssr: false });

const stats = [
  { target: 50, suffix: '+', label: '누적 프로젝트' },
  { target: 92, suffix: '%', label: '고객 재의뢰율' },
  { target: 98, suffix: '%', label: '고객 만족도' },
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
        if (entries[0].isIntersecting) {
          entries[0].target.classList.add('visible');
          if (!started.current) {
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
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

function StatItem({ stat, index }: { stat: typeof stats[0], index: number }) {
  const { count, ref } = useCounter(stat.target, 1800);
  return (
    <div ref={ref} className={`${styles.statItem} fade-up fade-delay-${4 + index}`}>
      <span className={styles.statNum}>{count}{stat.suffix}</span>
      <span className={styles.statLabel}>{stat.label}</span>
    </div>
  );
}

export default function Hero() {
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.1 }
    );
    itemRefs.current.forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} id="hero">

      {/* ── 배경 3D 점/선 그리드 캔버스 ─────────────── */}
      <div className={styles.canvasWrap} aria-hidden="true">
        <GridWaveCanvas className={styles.waveCanvas} />
      </div>

      {/* ── 콘텐츠 (좌측 정렬 에이전시 레이아웃) ─────────────────────────────────────── */}
      <div className={styles.container}>
        <div className={styles.inner}>

          <div className={styles.textSide}>
            <h1
              ref={el => { itemRefs.current[1] = el; }}
              className={`${styles.headline} fade-up fade-delay-2`}
            >
              We Build<br />
              <strong className={styles.navyText}>Digital Products</strong><br />
              That Matter.
            </h1>

            <p
              ref={el => { itemRefs.current[2] = el; }}
              className={`${styles.sub} fade-up fade-delay-3`}
            >
              제작으로 끝나는 것이 아닌, 비즈니스의 진짜 성장을 만듭니다.<br />
              최신 기술과 트렌드로 당신의 브랜드에 맞는 홈페이지를, 대표가<br />
              직접 설계하고 개발합니다.
            </p>

            <div
              ref={el => { itemRefs.current[3] = el; }}
              className={`${styles.ctaRow} fade-up fade-delay-4`}
            >
              <a href="/contact" className={styles.btnPrimary}>
                Start a Project
              </a>
              <a href="/portfolio" className={styles.btnSecondary}>
                View Our Work
              </a>
            </div>

            <div className={styles.heroStats}>
              {stats.map((s, i) => (
                <StatItem key={i} stat={s} index={i} />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── 스크롤 다운 인디케이터 ─────────────────────────────────── */}
      <div className={styles.scrollDown} aria-hidden="true">
        <span className={styles.scrollText}>SCROLL</span>
        <span className={styles.scrollLine} />
      </div>

    </section>
  );
}
