'use client';
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import styles from './Hero.module.css';

const GridWaveCanvas = dynamic(() => import('./GridWaveCanvas'), { ssr: false });

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
            <div
              ref={el => { itemRefs.current[0] = el; }}
              className={`${styles.badge} fade-up fade-delay-1`}
            >
              DIGITAL AGENCY
            </div>

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
              최신 기술과 트렌드로 당신의 브랜드를 다음 단계로 이끄는<br />
              크리에이티브 파트너를 만나보세요.
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
