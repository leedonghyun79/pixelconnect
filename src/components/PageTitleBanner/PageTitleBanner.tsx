import Link from 'next/link';
import styles from './PageTitleBanner.module.css';
import WaveHeading from '@/components/common/WaveText/WaveHeading';

interface PageTitleBannerProps {
  eyebrow: string;
  title: string;
  sub: React.ReactNode;
  breadcrumb: string;
  variant?: 'white' | 'pale' | 'navy';
}

export default function PageTitleBanner({ eyebrow, title, sub, breadcrumb, variant = 'white' }: PageTitleBannerProps) {
  const bgClass = variant === 'pale' ? styles.heroPale : variant === 'navy' ? styles.heroNavy : '';

  return (
    <section className={`${styles.hero} ${bgClass}`}>
      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <Link href="/">홈</Link>
          <span className={styles.breadcrumbSep}>›</span>
          <span>{breadcrumb}</span>
        </div>
        <div className={styles.eyebrow}>{eyebrow}</div>
        <WaveHeading className={styles.title}>{title}</WaveHeading>
        <p className={styles.sub}>{sub}</p>
      </div>
    </section>
  );
}
