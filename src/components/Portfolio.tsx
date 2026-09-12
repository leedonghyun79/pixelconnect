'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Portfolio.module.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: 'NOVAINT 인테리어', img: '/portfolio_img/NOVAINT.png' },
  { title: 'LINEO 기업 사이트', img: '/portfolio_img/기업사이트.png' },
  { title: '리엔오 자산관리', img: '/portfolio_img/리엔오.png' },
  { title: '드림다이브 스쿠버다이빙', img: '/portfolio_img/드림다이브.png' },
  { title: 'PROTEX 특수화물 운송', img: '/portfolio_img/화물.png' },
];

interface PortfolioProps {
  hideHeader?: boolean;
}

export default function Portfolio({ hideHeader = false }: PortfolioProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filtered = projects;

  useEffect(() => {
    if (hideHeader) {
      const observer = new IntersectionObserver(
        entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
        { threshold: 0.1 }
      );
      // Trim refs array to current filtered length and observe valid elements
      itemRefs.current = itemRefs.current.slice(0, filtered.length);
      itemRefs.current.forEach(el => { if (el) observer.observe(el); });
      return () => observer.disconnect();
    } else {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      // 트랙이 실제로 가로로 이동해야 하는 거리(양수). 0이면 pin 안 함.
      const getDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth + 48);

      // 카드 폭·비율이 CSS로 고정돼 트랙 너비는 결정적이다 → 이미지 로드 후 refresh 불필요.
      // (스크롤 중 refresh 가 걸리면 pin 이 풀렸다 다시 잡히며 튐)
      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'center center',
          // pin 구간을 실제 이동 거리에 맞춰 헛스크롤 제거
          end: () => `+=${getDistance()}`,
          pin: true,
          // scrub에 지연(smoothing)을 주면 빠르게 스크롤할 때 트랙 이동 애니메이션이
          // 못 따라잡은 채로 pin이 풀려 다음 섹션으로 넘어가는 순간 카드가 덜 밀린
          // 상태로 "튀는" 현상이 생긴다. Lenis가 이미 스크롤 자체를 부드럽게 하고
          // 있으므로 scrub은 스크롤 위치와 항상 정확히 일치시킨다.
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }
  }, [hideHeader, filtered]);

  return (
    <section ref={sectionRef} className={`${styles.section} ${!hideHeader ? styles.overlap : ''} ${hideHeader ? styles.noPin : ''}`} id="portfolio">
      <div className={styles.container}>
        {!hideHeader && (
          <div className={styles.header}>
            <div className="section-eyebrow">OUR WORK</div>
            <h2 className="section-title">함께 만든 브랜드들</h2>
            <p className={styles.sub}>
              다양한 업종의 브랜드와 함께 만든 홈페이지입니다.
            </p>
          </div>
        )}

      </div>

      {hideHeader ? (
        <div className={styles.container}>
          <div className={styles.grid}>
            {filtered.map((p, i) => (
              <div 
                key={`${p.title}-${i}`} 
                ref={el => { itemRefs.current[i] = el; }}
                className={`${styles.card} fade-up`}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className={styles.thumb}>
                  <div className={styles.thumbInner}>
                    <Image
                      src={p.img}
                      alt={p.title}
                      fill
                      sizes="400px"
                      className={styles.thumbImg}
                    />
                  </div>
                  <div className={styles.thumbOverlay}>
                    <a href="#contact" className={styles.thumbCta}>자세히 보기 →</a>
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{p.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.trackWrap}>
          <div ref={trackRef} className={styles.track}>
            {projects.map((p, i) => (
              <div key={`${p.title}-${i}`} className={styles.card}>
                <div className={styles.thumb}>
                  <div className={styles.thumbInner}>
                    <Image
                      src={p.img}
                      alt={p.title}
                      fill
                      sizes="400px"
                      className={styles.thumbImg}
                    />
                  </div>
                  <div className={styles.thumbOverlay}>
                    <a href="#contact" className={styles.thumbCta}>자세히 보기 →</a>
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{p.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!hideHeader && (
        <div className={styles.container}>
          <div className={styles.viewAll}>
            <a href="/portfolio" className={styles.viewAllLink}>전체 프로젝트 보기 →</a>
          </div>
        </div>
      )}
    </section>
  );
}
