import Link from 'next/link';
import styles from './PageHero.module.css';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  sub: string;
  breadcrumb: string;
  variant?: 'white' | 'pale' | 'navy';
}

export default function PageHero({ eyebrow, title, sub, breadcrumb, variant = 'white' }: PageHeroProps) {
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
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.sub}>{sub}</p>
      </div>
    </section>
  );
}
