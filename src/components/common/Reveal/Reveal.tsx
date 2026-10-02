'use client';
import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  /** 등장 지연(초) — 같은 줄의 박스가 차례로 나오도록 열 번호에 맞춰 준다 */
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * 스크롤하면 박스가 아래에서 부드럽게 올라오며 나타나는 래퍼 (홈 섹션 카드와 같은 방식).
 * 호버용 transition 과 겹치지 않게, 등장은 이 바깥 래퍼가 맡고 안쪽 카드는 호버만 맡는다.
 * 화면 하단 15%는 감지에서 제외해 충분히 올라온 뒤에 나오고, 화면에서 벗어나면 다시 숨겨진다.
 */
export default function Reveal({ children, delay = 0, className, style }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
        else e.target.classList.remove('visible');
      }),
      { threshold: 0.1, rootMargin: '0px 0px -15% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`fade-up${className ? ` ${className}` : ''}`}
      style={{ transitionDelay: `${delay}s`, ...style }}
    >
      {children}
    </div>
  );
}
