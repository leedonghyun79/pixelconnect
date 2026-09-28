'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import styles from './LegalModalLink.module.css';

// 본문은 모달을 열 때만 로드 — 전 페이지 HTML에 약관 전문이 박히지 않도록
const docs = {
  terms: {
    href: '/terms',
    title: '이용약관',
    Content: dynamic(() => import('./TermsContent'), { ssr: false }),
  },
  privacy: {
    href: '/privacy',
    title: '개인정보처리방침',
    Content: dynamic(() => import('./PrivacyContent'), { ssr: false }),
  },
};

interface LegalModalLinkProps {
  doc: keyof typeof docs;
  className?: string;
  children?: React.ReactNode; // 링크 문구 (기본값: 문서 제목)
}

// 크롤러·JS 미실행 환경에선 실제 페이지로 이동하고, 일반 클릭은 모달로 연다
export default function LegalModalLink({ doc, className, children }: LegalModalLinkProps) {
  const { href, title, Content } = docs[doc];
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      dialog.showModal();
      window.__lenis?.stop();
    } else if (dialog.open) {
      dialog.close();
    }
    return () => window.__lenis?.start();
  }, [open]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // 새 탭 열기 등 수정키 클릭은 브라우저 기본 동작 유지
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    setOpen(true);
  };

  return (
    <>
      <a href={href} className={className} onClick={handleClick}>
        {children ?? title}
      </a>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-label={title}
        onClose={() => setOpen(false)}
        // 배경(backdrop) 클릭 시 닫기
        onClick={e => { if (e.target === e.currentTarget) setOpen(false); }}
      >
        <div className={styles.panel}>
          <div className={styles.header}>
            <span className={styles.title}>{title}</span>
            <button type="button" className={styles.close} onClick={() => setOpen(false)} aria-label="닫기">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className={styles.scroll} data-lenis-prevent>
            {open && <Content />}
          </div>
        </div>
      </dialog>
    </>
  );
}
