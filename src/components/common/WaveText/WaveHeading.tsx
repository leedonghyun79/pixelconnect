'use client';
import { useEffect, useRef, type CSSProperties, type ElementType } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitIntoChars, waveOffset, WAVE_DESKTOP_QUERY } from './WaveText';

gsap.registerPlugin(ScrollTrigger);

interface WaveHeadingProps {
  children: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

/**
 * 페이지 맨 위에 있는 제목용 (서브페이지 타이틀 등).
 * 로드 시 글자가 물결치며 등장 + 스크롤을 내리면 물결 모양으로 흩어졌다가 올리면 원상태. 데스크톱 전용.
 * SSR HTML 은 평범한 텍스트 그대로라 SEO·모바일에는 영향이 없고, 글자 쪼개기는 마운트 후에만 한다.
 */
export default function WaveHeading({ children, as: Tag = 'h1', className, style }: WaveHeadingProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const mm = gsap.matchMedia();
    mm.add(WAVE_DESKTOP_QUERY, () => {
      const { chars, restore } = splitIntoChars(el);

      const intro = gsap.from(chars, {
        y: (i: number) => waveOffset(i, 18, 22),
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.04,
        delay: 0.1,
      });

      // 등장 애니메이션과 겹치지 않게 yPercent 로만 움직인다
      const scrollOut = gsap.to(chars, {
        yPercent: (i: number) => 45 + Math.sin(i * 0.9) * 30,
        ease: 'sine.inOut',
        stagger: { each: 0.03 },
        scrollTrigger: {
          trigger: el,
          start: 'top 25%',
          end: '+=500',
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
  }, [children]);

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
