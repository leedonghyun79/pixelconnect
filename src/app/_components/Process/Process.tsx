'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Process.module.css';
import WaveText from '@/components/common/WaveText/WaveText';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    title: '상담·견적',
    desc: '요구사항과 목표를 파악하고 메뉴·페이지 수에 따라 비용을 확정합니다.',
    detail:
      '간단한 문의만으로 시작할 수 있습니다. 참고 사이트, 필수 기능, 오픈 희망일을 알려주시면 페이지 구성과 예상 비용을 정리해 드립니다. 이 단계까지는 비용이 발생하지 않습니다.',
  },
  {
    num: '02',
    title: '계약·기획',
    desc: '계약 후 사이트맵과 자료를 정리합니다. 착수금 50% 결제.',
    detail:
      '확정된 견적으로 계약서를 작성하고 착수금 50%를 결제합니다. 이후 전체 메뉴 구조와 페이지별로 필요한 텍스트·이미지 자료를 함께 정리합니다. 자료 준비가 막막하시면 체크리스트를 드립니다.',
  },
  {
    num: '03',
    title: '디자인·시안',
    desc: '전달받은 자료를 바탕으로 1차 시안을 제작합니다. (영업일 기준)',
    detail:
      '메인 페이지 1차 시안을 먼저 보여드립니다. 브랜드 톤과 방향을 맞춘 뒤 나머지 페이지로 확장하기 때문에, 초반에 방향이 어긋나 크게 되돌아가는 일이 없습니다.',
  },
  {
    num: '04',
    title: '수정·런칭',
    desc: '플랜별 수정 횟수 안에서 피드백을 반영해 최종 확정·오픈합니다. 잔금 결제.',
    detail:
      '수정 횟수는 STANDARD·DELUXE 3회, PREMIUM·CUSTOM 무제한입니다. 최종 확정 후 실제 도메인에 배포하고 잔금 50%를 결제합니다. 반응형(모바일)과 기본 SEO 세팅이 포함됩니다.',
  },
];

export default function Process() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const fillRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 고정(pin) 없이, 타임라인이 화면을 지나가는 만큼 01 → 04 가 하나씩 채워진다.
  // 스크롤을 올리면 다시 비워진다 (scrub).
  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const last = steps.length - 1;
    const render = (p: number) => {
      // 끝까지 확실히 채워지도록 진행률의 앞 90%에서 100%가 되게 리매핑
      const t = Math.min(1, p / 0.9) * last;
      stepRefs.current.forEach((el, i) => {
        el?.classList.toggle(styles.active, t >= i - 0.02);
      });
      fillRefs.current.forEach((el, i) => {
        if (el) el.style.transform = `scaleY(${Math.min(1, Math.max(0, t - i))})`;
      });
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      render(1);
      return;
    }

    render(0);
    const trigger = ScrollTrigger.create({
      trigger: timeline,
      start: 'top 70%',
      end: 'bottom 70%',
      scrub: true,
      onUpdate: self => render(self.progress),
    });
    return () => trigger.kill();
  }, []);

  return (
    <section className={styles.section} id="process">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className="section-eyebrow">PROCESS</div>
          <WaveText className="section-title">어떻게 진행되나요?</WaveText>
          <p className={styles.sub}>
            처음부터 끝까지 명확한 과정으로 진행합니다.
          </p>
        </div>

        <div className={styles.body}>
          <div className={styles.timeline} ref={timelineRef}>
            {steps.map((step, i) => (
              <div
                key={step.num}
                ref={el => { stepRefs.current[i] = el; }}
                data-idx={i}
                className={styles.step}
              >
                <div className={styles.stepNum}>{step.num}</div>
                <div className={styles.connector}>
                  <div className={styles.dot} />
                  {i < steps.length - 1 && (
                    <div className={styles.line}>
                      <div className={styles.lineFill} ref={el => { fillRefs.current[i] = el; }} />
                    </div>
                  )}
                </div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                  <p className={styles.stepDetail}>{step.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <aside className={styles.aside}>
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
