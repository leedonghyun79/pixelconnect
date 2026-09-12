'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Process.module.css';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    title: '상담·견적',
    desc: '요구사항과 목표를 파악하고 메뉴·페이지 수에 따라 비용을 확정합니다.',
    detail:
      '간단한 문의만으로 시작할 수 있습니다. 참고 사이트, 필수 기능, 오픈 희망일을 알려주시면 페이지 구성과 예상 비용을 정리해 드립니다. 이 단계까지는 비용이 발생하지 않습니다.',
    highlight: false,
  },
  {
    num: '02',
    title: '계약·기획',
    desc: '계약 후 사이트맵과 자료를 정리합니다. 착수금 50% 결제.',
    detail:
      '확정된 견적으로 계약서를 작성하고 착수금 50%를 결제합니다. 이후 전체 메뉴 구조와 페이지별로 필요한 텍스트·이미지 자료를 함께 정리합니다. 자료 준비가 막막하시면 체크리스트를 드립니다.',
    highlight: false,
  },
  {
    num: '03',
    title: '디자인·시안',
    desc: '전달받은 자료를 바탕으로 1차 시안을 제작합니다. (영업일 기준)',
    detail:
      '메인 페이지 1차 시안을 먼저 보여드립니다. 브랜드 톤과 방향을 맞춘 뒤 나머지 페이지로 확장하기 때문에, 초반에 방향이 어긋나 크게 되돌아가는 일이 없습니다.',
    highlight: false,
  },
  {
    num: '04',
    title: '수정·런칭',
    desc: '피드백을 반영해 무제한 수정 후 최종 확정·오픈합니다. 잔금 결제.',
    detail:
      '시안을 확정할 때까지 수정 횟수에 제한을 두지 않습니다. 최종 확정 후 실제 도메인에 배포하고 잔금 50%를 결제합니다. 반응형(모바일)과 기본 SEO 세팅이 포함됩니다.',
    highlight: false,
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    // 데스크톱: 섹션이 화면에 꽉 차게 고정(pin)된 "다음"부터 01 → 04 채우고 고정 해제.
    // start를 'top top'으로 두면 고정 시작 = 진행률 0 지점이 정확히 일치한다.
    mm.add('(min-width: 981px)', () => {
      const proxy = { p: 0 };
      const tween = gsap.to(proxy, {
        p: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=1000',
          pin: true,
          scrub: 0.4,
          invalidateOnRefresh: true,
          onUpdate: () => setScrollProgress(proxy.p),
          onLeaveBack: () => setScrollProgress(0),
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    // 모바일/좁은 화면: 고정 없이 기존 스크롤 진행률 방식
    mm.add('(max-width: 980px)', () => {
      const handleScroll = () => {
        if (!timelineRef.current) return;
        const rect = timelineRef.current.getBoundingClientRect();
        const scrolled = window.innerHeight * 0.55 - rect.top;
        let p = scrolled / rect.height;
        if (p < 0) p = 0;
        if (p > 1) p = 1;
        setScrollProgress(p);
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener('scroll', handleScroll);
    });

    return () => mm.revert();
  }, []);

  // scrub 지연이 있어도 고정 해제 전에 05까지 확실히 채워지도록,
  // 고정 구간의 앞 82%에서 타임라인이 100% 차게 리매핑 (뒤 18%는 버퍼)
  const fill = Math.min(1, scrollProgress / 0.82);

  // 현재 활성화된 스텝 (타임라인 dot 점등 로직과 동일 기준)
  let activeIndex = 0;
  steps.forEach((_, i) => {
    if (fill >= i / (steps.length - 1) - 0.02) activeIndex = i;
  });
  const activeStep = steps[activeIndex];

  return (
    <section ref={sectionRef} className={styles.section} id="process">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className="section-eyebrow">PROCESS</div>
          <h2 className="section-title">어떻게 진행되나요?</h2>
          <p className={styles.sub}>
            처음부터 끝까지 명확한 과정으로 진행합니다.
          </p>
        </div>

        <div className={styles.body}>
        <div className={styles.timeline} ref={timelineRef}>
          {steps.map((step, i) => {
            const start = i / (steps.length - 1);
            const end = (i + 1) / (steps.length - 1);

            let lineProgress = (fill - start) / (end - start);
            if (lineProgress < 0) lineProgress = 0;
            if (lineProgress > 1) lineProgress = 1;

            const isActive = fill >= start - 0.02;

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

          <aside className={styles.aside}>
            <div className={styles.asideCard}>
              <div className={styles.asideStepHead}>
                <span className={styles.asideStepNum}>STEP {activeStep.num}</span>
                <span className={styles.asideDivider} />
                <span className={styles.asideStepTitle}>{activeStep.title}</span>
              </div>
              <p key={activeIndex} className={styles.asideStepDetail}>
                {activeStep.detail}
              </p>
              <div className={styles.asideProgress} aria-hidden="true">
                {steps.map((_, i) => (
                  <span
                    key={i}
                    className={`${styles.asideTick} ${i === activeIndex ? styles.asideTickOn : ''}`}
                  />
                ))}
              </div>
            </div>

            <div className={styles.asideCta}>
              <p className={styles.asideCtaText}>프로젝트 일정이나 견적이 궁금하세요?</p>
              <a href="#contact" className={styles.asideCtaBtn}>
                상담 문의하기 <span aria-hidden="true">→</span>
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
