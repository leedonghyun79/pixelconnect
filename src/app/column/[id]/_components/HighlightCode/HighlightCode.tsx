'use client';
import { useEffect } from 'react';
import hljs from 'highlight.js';

// 발행된 칼럼 HTML의 코드 블록에 문법 하이라이팅 적용.
// (Tiptap이 내보내는 HTML엔 색상 span이 없으므로 클라이언트에서 재실행)
export default function HighlightCode() {
  useEffect(() => {
    document.querySelectorAll<HTMLElement>('article pre code').forEach((el) => {
      try {
        el.removeAttribute('data-highlighted');
        hljs.highlightElement(el);
      } catch {
        /* noop */
      }
    });
  }, []);
  return null;
}
