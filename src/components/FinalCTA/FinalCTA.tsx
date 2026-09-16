'use client';
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import styles from './FinalCTA.module.css';

const FlowWave3D = dynamic(() => import('../FlowWave3D/FlowWave3D'), { ssr: false });

interface FinalCTAProps {
  hide3D?: boolean;
}

export default function FinalCTA({ hide3D = false }: FinalCTAProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
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

  // 마지막 화면(CTA + 푸터)이 스크롤 끝에서 화면에 딱 맞게 보이도록,
  // 실제 푸터 높이를 측정해 CTA의 남은 높이를 계산 (기기별 푸터 높이가 달라 하드코딩 불가)
  useEffect(() => {
    const section = sectionRef.current;
    const footer = document.getElementById('site-footer');
    if (!section || !footer) return;

    const updateHeight = () => {
      section.style.setProperty('--footer-height', `${footer.offsetHeight}px`);
    };
    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(footer);
    window.addEventListener('resize', updateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="contact">

      {/* 3D 배경 (hide3D가 true면 렌더링 안함) */}
      {!hide3D && (
        <div className={styles.canvasWrap} aria-hidden="true">
          <FlowWave3D className={styles.canvas} />
        </div>
      )}

      {/* 하단 그라디언트 페이드 */}
      <div className={styles.fade} aria-hidden="true" />

      <div ref={containerRef} className={`${styles.container} fade-up`}>
        <div className={`section-eyebrow section-eyebrow-white`} style={{ justifyContent: 'center' }}>
          GET STARTED
        </div>

        <h2 className={styles.title}>
          지금 어떤 고민이 있으신가요?
        </h2>

        <p className={styles.sub}>
          부담 없이 먼저 물어보세요.<br />
          견적만 확인하셔도 괜찮습니다.
        </p>

        <div className={styles.ctaRow}>
          <a href="/contact" className="btn btn-accent">
            무료 상담 신청하기 →
          </a>
          <a href="https://pf.kakao.com/_xoDxkuX/friend" target="_blank" rel="noopener noreferrer" className="btn btn-ghost-white">
            카카오 채널 문의
          </a>
        </div>
      </div>
    </section>
  );
}
