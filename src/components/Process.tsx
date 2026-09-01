'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './Process.module.css';

const steps = [
  {
    num: '01',
    title: '상담·견적',
    desc: '요구사항과 목표를 파악하고 메뉴·페이지 수에 따라 비용을 확정합니다.',
    highlight: false,
  },
  {
    num: '02',
    title: '계약·기획',
    desc: '계약 후 사이트맵과 자료를 정리합니다. 착수금 50% 결제.',
    highlight: false,
  },
  {
    num: '03',
    title: '디자인·시안',
    desc: '전달받은 자료를 바탕으로 1차 시안을 제작합니다. (영업일 기준)',
    highlight: false,
  },
  {
    num: '04',
    title: '수정·런칭',
    desc: '피드백을 반영해 무제한 수정 후 최종 확정·오픈합니다. 잔금 결제.',
    highlight: false,
  },
  {
    num: '05',
    title: '유지보수',
    desc: '런칭 후에도 수정·오류·업데이트를 지속적으로 지원합니다.',
    highlight: false,
  },
];

export default function Process() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      
      const triggerPoint = window.innerHeight * 0.55; // 55% from top
      const startPos = rect.top;
      const totalHeight = rect.height;
      const scrolled = triggerPoint - startPos;
      
      let p = scrolled / totalHeight;
      if (p < 0) p = 0;
      if (p > 1) p = 1;
      
      setScrollProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={styles.section} id="process">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className="section-eyebrow">PROCESS</div>
          <h2 className="section-title">어떻게 진행되나요?</h2>
          <p className={styles.sub}>
            처음부터 끝까지 명확한 과정으로 진행합니다.
          </p>
        </div>

        <div className={styles.timeline} ref={timelineRef}>
          {steps.map((step, i) => {
            const start = i / (steps.length - 1);
            const end = (i + 1) / (steps.length - 1);
            
            let lineProgress = (scrollProgress - start) / (end - start);
            if (lineProgress < 0) lineProgress = 0;
            if (lineProgress > 1) lineProgress = 1;
            
            const isActive = scrollProgress >= start - 0.02;

            return (
              <div
                key={i}
                className={`${styles.step} ${isActive ? styles.active : ''} ${step.highlight ? styles.stepHighlight : ''}`}
              >
                <div className={styles.stepNum}>{step.num}</div>
                <div className={styles.connector}>
                  <div className={styles.dot} />
                  {i < steps.length - 1 && (
                    <div className={styles.line}>
                      <div className={styles.lineFill} style={{ transform: `scaleY(${lineProgress})` }} />
                    </div>
                  )}
                </div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>
                    {step.title}
                    {step.highlight && <span className={styles.highlightBadge}>⭐ 차별점</span>}
                  </h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
