'use client';
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Hero.module.css';
import { getPortfolioProject } from '@/data/portfolio';
import { splitIntoChars, waveOffset, WAVE_DESKTOP_QUERY } from '@/components/common/WaveText/WaveText';

gsap.registerPlugin(ScrollTrigger);

const GridWaveCanvas = dynamic(() => import('../GridWaveCanvas/GridWaveCanvas'), { ssr: false });

// 히어로 목업: 앞 → 뒤 순서 (앞에 있는 카드가 가장 크게 보인다)
const MOCKUP_SLUGS = ['novaint', 'dreamdive', 'rieneo'] as const;

// 고해상도로 새로 캡처한 이미지(NOVAINT_hero)는 여백이 없어 크롭이 필요 없다.
// 기존 썸네일은 사방에 흰 여백이 있어서, 사이트 본문이 프레임을 꽉 채우도록 확대·이동한다.
// scale = 1 / (본문 너비 비율), x·y = 본문이 시작하는 왼쪽·위쪽 여백(%)
// 포트폴리오 썸네일 대신 히어로 전용 이미지를 쓰는 작업물
const MOCK_IMG: Record<string, string> = {
  novaint: '/portfolio_img/NOVAINT_hero.webp',
};

const MOCK_CROP: Record<string, { scale: number; x: number; y: number }> = {
  protex: { scale: 1.46, x: 15.7, y: 15.2 },
  lineo: { scale: 1.46, x: 15.7, y: 15.2 },
  rieneo: { scale: 1.41, x: 14.5, y: 15.5 },
  dreamdive: { scale: 1.29, x: 11.3, y: 14.4 },
};
const MOCKUPS = MOCKUP_SLUGS.map(slug => getPortfolioProject(slug)).filter(
  (p): p is NonNullable<typeof p> => !!p
);
const MOCK_CLASSES = ['mockFront', 'mockMid', 'mockBack'] as const;

export default function Hero() {
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);

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

  // 다음 섹션으로 넘어갈 때 히어로가 스크롤에 따라 서서히 블러 + 페이드
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const anim = gsap.fromTo(
      section,
      { filter: 'blur(0px)', opacity: 1 },
      {
        filter: 'blur(9px)',
        opacity: 0.5,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      }
    );

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
      gsap.set(section, { clearProps: 'filter,opacity' });
    };
  }, []);

  // 히어로 헤드라인: 로드 시 글자가 물결치며 등장 + 스크롤 내리면 물결 모양으로 흩어졌다가 올리면 원상태 (데스크톱 전용)
  useEffect(() => {
    const headline = headlineRef.current;
    if (!headline) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const mm = gsap.matchMedia();
    mm.add(WAVE_DESKTOP_QUERY, () => {
      const { chars, restore } = splitIntoChars(headline);

      const intro = gsap.from(chars, {
        y: (i: number) => waveOffset(i, 18, 22),
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.03,
        delay: 0.15,
      });

      // 스크롤 아웃: 등장 애니메이션과 겹치지 않게 yPercent 로만 움직인다
      const scrollOut = gsap.to(chars, {
        yPercent: (i: number) => 45 + Math.sin(i * 0.9) * 30,
        ease: 'sine.inOut',
        stagger: { each: 0.03 },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=900',
          scrub: 1.4,
        },
      });

      return () => {
        intro.kill();
        scrollOut.scrollTrigger?.kill();
        scrollOut.kill();
        restore();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="hero">

      {/* ── 배경 3D 점/선 그리드 캔버스 ─────────────── */}
      <div className={styles.canvasWrap} aria-hidden="true">
        <GridWaveCanvas className={styles.waveCanvas} />
      </div>

      {/* ── 콘텐츠 (좌측 정렬 에이전시 레이아웃) ─────────────────────────────────────── */}
      <div className={styles.container}>
        <div className={styles.inner}>

          <div className={styles.textSide}>
            <h1
              ref={el => { itemRefs.current[1] = el; headlineRef.current = el; }}
              className={styles.headline}
            >
              <span className={`${styles.line} ${styles.kicker}`}>홈페이지 제작 업체 픽셀커넥트</span>
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
              예쁜 홈페이지는 많습니다.<br />
              끝까지 책임지는 곳은 드뭅니다.
            </p>

            <div
              ref={el => { itemRefs.current[3] = el; }}
              className={`${styles.ctaRow} fade-up`}
              style={{ transitionDelay: '0.62s' }}
            >
              <a href="/contact" className={styles.btnPrimary}>
                무료 상담 신청하기
              </a>
              <a href="/portfolio" className={styles.btnSecondary}>
                작업물 둘러보기
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ── 포트폴리오 목업 (오른쪽 화면 끝으로 살짝 흘러나감) ─────────── */}
      <div className={styles.mockups}>
        {MOCKUPS.map((p, i) => (
          <Link
            key={p.slug}
            href={`/portfolio/${p.slug}`}
            className={`${styles.mock} ${styles[MOCK_CLASSES[i]]}`}
            aria-label={`${p.title} 작업물 보기`}
          >
            <span className={styles.mockBar} aria-hidden="true"><i /><i /><i /></span>
            <span className={styles.mockShot}>
              <Image
                src={MOCK_IMG[p.slug] ?? p.img}
                alt={p.title}
                fill
                priority={i === 0}
                sizes="(max-width: 1100px) 1px, 32vw"
                className={styles.mockImg}
                style={(() => {
                  const c = MOCK_CROP[p.slug];
                  return c ? { transformOrigin: '0 0', transform: `scale(${c.scale}) translate(-${c.x}%, -${c.y}%)` } : undefined;
                })()}
              />
            </span>
          </Link>
        ))}
      </div>

      {/* ── 스크롤 다운 인디케이터 ─────────────────────────────────── */}
      <div className={styles.scrollDown} aria-hidden="true">
        <span className={styles.scrollText}>SCROLL</span>
        <span className={styles.scrollLine} />
      </div>

    </section>
  );
}
