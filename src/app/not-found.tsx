import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './not-found.module.css';

export const metadata: Metadata = {
  title: '페이지를 찾을 수 없습니다 (404) | 픽셀커넥트',
  robots: { index: false, follow: true },
};

const quickLinks = [
  { href: '/services', label: '서비스' },
  { href: '/portfolio', label: '포트폴리오' },
  { href: '/column', label: '칼럼' },
  { href: '/reviews', label: '고객후기' },
  { href: '/contact', label: '문의' },
];

export default function NotFound() {
  return (
    <main className={styles.wrap}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />
      <span className={styles.ghost} aria-hidden="true">
        LOST
      </span>

      <div className={styles.inner}>
        <p className={styles.kicker}>
          <span className={styles.dot} />
          ERROR 404
        </p>

        <div className={styles.numbers} aria-hidden="true">
          <span>4</span>
          <span className={styles.ring}>
            <svg viewBox="0 0 120 120" className={styles.ringSvg}>
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="14 20"
              />
            </svg>
          </span>
          <span>4</span>
        </div>

        <h1 className={styles.title}>페이지를 찾을 수 없습니다</h1>
        <p className={styles.desc}>
          요청하신 페이지가 삭제되었거나 주소가 바뀌었을 수 있어요.
          <br />
          아래 경로로 다시 찾아가 보세요.
        </p>

        <div className={styles.actions}>
          <Link href="/" className={styles.primary}>
            홈으로 돌아가기
          </Link>
          <Link href="/contact" className={styles.secondary}>
            문의하기 <span aria-hidden="true">→</span>
          </Link>
        </div>

        <nav className={styles.quick}>
          {quickLinks.map(l => (
            <Link key={l.href} href={l.href} className={styles.quickLink}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
