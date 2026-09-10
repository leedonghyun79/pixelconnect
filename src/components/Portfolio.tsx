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

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'center center',
          // pin 구간을 실제 이동 거리에 맞춰 헛스크롤 제거
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // next/image 는 비동기로 로드돼서 레이아웃이 나중에 바뀜 → 측정값 갱신
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener('load', refresh);
      const imgs = Array.from(track.querySelectorAll('img'));
      imgs.forEach(img => {
        if (!img.complete) img.addEventListener('load', refresh, { once: true });
      });

      return () => {
        window.removeEventListener('load', refresh);
        imgs.forEach(img => img.removeEventListener('load', refresh));
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
            <h2 className="section-title">결과물로 말합니다</h2>
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
