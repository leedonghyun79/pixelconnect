'use client';
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import styles from './FinalCTA.module.css';

const FlowWave3D = dynamic(() => import('./FlowWave3D'), { ssr: false });

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`${styles.section} fade-up`} id="contact">

      {/* 3D 흐르는 배경 */}
      <div className={styles.canvasWrap} aria-hidden="true">
        <FlowWave3D className={styles.canvas} />
      </div>

      {/* 하단 그라디언트 페이드 */}
      <div className={styles.fade} aria-hidden="true" />

      <div className={styles.container}>
        <div className={`section-eyebrow section-eyebrow-white`} style={{ justifyContent: 'center' }}>
          GET STARTED
        </div>

        <h2 className={styles.title}>
          지금 어떤 고민이 있으신가요?
        </h2>

        <p className={styles.sub}>
          부담 없이 먼저 물어보세요.<br />
          견적만 확인해도 괜찮습니다.
        </p>

        <div className={styles.ctaRow}>
          <a href="/contact" className="btn btn-white">
            무료 상담 신청하기 →
          </a>
          <a href="#" className="btn btn-ghost-white">
            카카오 채널 문의
          </a>
        </div>
      </div>
    </section>
  );
}
