'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  // 메뉴 클릭 등으로 다른 페이지로 이동할 때, Lenis가 이전 페이지의
  // 스크롤 위치를 그대로 유지해 새 페이지가 중간부터 보이는 문제 방지.
  // 단, 첫 마운트(새로고침 포함)에는 적용하지 않아 브라우저의 스크롤
  // 위치 복원(새로고침 시 보던 곳 유지)을 그대로 둔다.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.__lenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    // 다른 컴포넌트(예: 상단 로고 클릭)에서 부드러운 스크롤 제어에 쓰도록 노출
    window.__lenis = lenis;

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(update);
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}
