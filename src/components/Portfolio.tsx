'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Portfolio.module.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    cat: '쇼핑몰',
    title: '비자르테 쇼핑몰',
    tags: ['인테리어', '쇼핑몰'],
    result: '제작 후 문의 3배 증가',
  },
  {
    cat: '기업 홈페이지',
    title: 'B2B SaaS 기업 사이트',
    tags: ['기업', 'B2B'],
    result: '브랜드 인지도 향상',
  },
  {
    cat: '병원·클리닉',
    title: '강남 피부과 클리닉',
    tags: ['병원', '클리닉'],
    result: '온라인 예약 200% 증가',
  },
  {
    cat: '교육',
    title: '교육 플랫폼 랜딩',
    tags: ['교육', '랜딩페이지'],
    result: '광고 전환율 3배',
  },
  {
    cat: '쇼핑몰',
    title: '뷰티 브랜드 LUMI',
    tags: ['뷰티', '쇼핑몰'],
    result: '전환율 3.2%→8.1%',
  },
  {
    cat: '기업 홈페이지',
    title: '법률 사무소 웹사이트',
    tags: ['법률', '기업'],
    result: '월 문의 3배 증가',
  },
];

interface PortfolioProps {
  hideHeader?: boolean;
}

export default function Portfolio({ hideHeader = false }: PortfolioProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // hideHeader가 true이면 (보통 포트폴리오 페이지 내부) 가로 스크롤 적용 안 함
    if (hideHeader) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const getScrollAmount = () => {
      const trackWidth = track.scrollWidth;
      // 화면 오른쪽 끝까지 가도록 여백 계산
      return -(trackWidth - window.innerWidth + 48);
    };

    const tween = gsap.to(track, {
      x: getScrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'center center',
        end: () => `+=${track.scrollWidth}`, // 트랙 너비만큼 스크롤
        pin: true,
        scrub: 1, // 부드러운 스크러빙
        invalidateOnRefresh: true, // 창 크기 변경 시 재계산
      }
    });

    return () => {
      tween.kill();
    };
  }, [hideHeader]);

  return (
    <section ref={sectionRef} className={`${styles.section} ${hideHeader ? styles.noPin : ''}`} id="portfolio">
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

      {/* Horizontal Scroll Track (컨테이너 밖으로 빼서 풀 블리드 구현) */}
      <div className={styles.trackWrap}>
        <div ref={trackRef} className={styles.track}>
          {projects.map((p, i) => (
            <div
              key={`${p.title}-${i}`}
              className={styles.card}
            >
              <div className={styles.thumb}>
                <div className={styles.thumbInner}>
                  <span className={styles.thumbPlaceholder}>🖥️</span>
                </div>
                <div className={styles.thumbOverlay}>
                  <a href="#contact" className={styles.thumbCta}>자세히 보기 →</a>
                </div>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.tags}>
                  {p.tags.map((t, ti) => (
                    <span key={ti} className={styles.tag}>{t}</span>
                  ))}
                </div>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                {p.result && (
                  <p className={styles.cardResult}>{p.result}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.viewAll}>
          <a href="/portfolio" className={styles.viewAllLink}>전체 프로젝트 보기 →</a>
        </div>
      </div>
    </section>
  );
}
