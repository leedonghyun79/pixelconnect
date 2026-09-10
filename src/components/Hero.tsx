'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import styles from './Hero.module.css';

const GridWaveCanvas = dynamic(() => import('./GridWaveCanvas'), { ssr: false });

const strengths = [
  { highlight: 'All-in-One', label: '기획부터 개발까지 한 번에' },
  { highlight: '1:1 전담', label: '대표가 직접 디렉팅' },
  { highlight: '맞춤형', label: '플랫폼 무관 최적 제안' },
];

function StatItem({ stat, index }: { stat: typeof strengths[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          entries[0].target.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.statItem} fade-up`}
      style={{ transitionDelay: `${0.9 + index * 0.13}s` }}
    >
      <span className={styles.statNum}>{stat.highlight}</span>
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
              className={styles.headline}
            >
              <span className={styles.line}>내 비즈니스처럼 진심으로 고민하고</span>
              <span className={styles.line}>
                책임질 <strong className={styles.navyText}>진짜 파트너</strong>를 찾으셨나요?
              </span>
            </h1>

            <p
              ref={el => { itemRefs.current[2] = el; }}
              className={`${styles.sub} fade-up`}
              style={{ transitionDelay: '0.42s' }}
            >
              제작으로 끝나는 것이 아닌, 비즈니스의 진짜 성장을 만듭니다.<br />
              최신 기술과 트렌드로 당신의 브랜드에 맞는 홈페이지를,<br />
              대표가 직접 설계하고 개발합니다.
            </p>

            <div
              ref={el => { itemRefs.current[3] = el; }}
              className={`${styles.ctaRow} fade-up`}
              style={{ transitionDelay: '0.62s' }}
            >
              <a href="/contact" className={styles.btnPrimary}>
                프로젝트 문의
              </a>
              <a href="/portfolio" className={styles.btnSecondary}>
                작업물 둘러보기
              </a>
            </div>

            <div className={styles.heroStats}>
              {strengths.map((s, i) => (
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
