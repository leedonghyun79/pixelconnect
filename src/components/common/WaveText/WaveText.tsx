'use client';
import { Fragment, useEffect, useRef, type CSSProperties, type ElementType } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 모바일에서는 효과를 쓰지 않는다 (글자는 처음부터 그대로 보임)
export const WAVE_DESKTOP_QUERY = '(min-width: 769px)';

/** 글자마다 시작 높이를 사인파로 달리해 물결 모양을 만든다 */
export const waveOffset = (i: number, amp = 14, base = 22) => base + Math.sin(i * 0.9) * amp;

/**
 * 이미 렌더된 요소 안의 텍스트를 글자 단위 span으로 쪼갠다 (히어로처럼 JSX를 못 바꾸는 곳용).
 * 단어는 nowrap 으로 묶어 줄바꿈이 단어 중간에서 일어나지 않게 한다. restore()로 원복.
 */
export function splitIntoChars(root: HTMLElement) {
  const original = root.innerHTML;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode as Text);

  textNodes.forEach(node => {
    const text = node.textContent ?? '';
    if (!text.trim()) return;
    const frag = document.createDocumentFragment();
    text.split(/(\s+)/).forEach(part => {
      if (!part) return;
      if (/^\s+$/.test(part)) {
        frag.appendChild(document.createTextNode(part));
        return;
      }
      const word = document.createElement('span');
      word.style.cssText = 'display:inline-block;white-space:nowrap';
      Array.from(part).forEach(ch => {
        const c = document.createElement('span');
        c.dataset.waveChar = '';
        c.style.display = 'inline-block';
        c.textContent = ch;
        word.appendChild(c);
      });
      frag.appendChild(word);
    });
    node.replaceWith(frag);
  });

  return {
    chars: Array.from(root.querySelectorAll<HTMLElement>('[data-wave-char]')),
    restore: () => {
      root.innerHTML = original;
    },
  };
}

interface WaveTextProps {
  /** 줄바꿈은 '\n' 으로 */
  children: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** children 안에서 강조할 부분 문자열 + 그 글자들에 줄 클래스 */
  highlight?: string;
  highlightClassName?: string;
}

/**
 * 스크롤에 맞춰 글자가 물결치듯 올라오며 나타나는 텍스트.
 * scrub 방식이라 스크롤을 올리면 원래(숨김) 상태로 되돌아간다. 데스크톱 전용.
 */
export default function WaveText({
  children,
  as: Tag = 'h2',
  className,
  style,
  highlight,
  highlightClassName,
}: WaveTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const mm = gsap.matchMedia();
    mm.add(WAVE_DESKTOP_QUERY, () => {
      const chars = el.querySelectorAll<HTMLElement>('[data-wave-char]');
      const tween = gsap.fromTo(
        chars,
        { y: (i: number) => waveOffset(i), opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'sine.out',
          stagger: { each: 0.07 },
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            end: 'top 30%',
            scrub: 1.4,
          },
        }
      );
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(chars, { clearProps: 'transform,opacity' });
      };
    });

    return () => mm.revert();
  }, [children]);

  const hlStart = highlight ? children.indexOf(highlight) : -1;
  const hlEnd = hlStart >= 0 ? hlStart + (highlight as string).length : -1;

  // 문자 인덱스를 추적해 강조 범위를 판단하면서 줄 → 단어 → 글자로 렌더
  let cursor = 0;
  const lines = children.split('\n').map(line => {
    const words = line.split(' ').map(word => {
      const chars = Array.from(word).map(ch => {
        const idx = cursor++;
        const hl = idx >= hlStart && idx < hlEnd;
        return { ch, hl };
      });
      cursor++; // 공백
      return chars;
    });
    return words;
  });

  return (
    <Tag ref={ref} className={className} style={style} aria-label={children.replace(/\n/g, ' ')}>
      {lines.map((words, li) => (
        <Fragment key={li}>
          {words.map((chars, wi) => (
            <span key={wi} aria-hidden="true">
              <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                {chars.map((c, ci) => (
                  <span
                    key={ci}
                    data-wave-char
                    className={c.hl ? highlightClassName : undefined}
                    style={{ display: 'inline-block' }}
                  >
                    {c.ch}
                  </span>
                ))}
              </span>
              {wi < words.length - 1 ? ' ' : ''}
            </span>
          ))}
          {li < lines.length - 1 && <br />}
        </Fragment>
      ))}
    </Tag>
  );
}
