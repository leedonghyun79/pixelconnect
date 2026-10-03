import Link from 'next/link';
import Image from 'next/image';
import styles from './Portfolio.module.css';
import { portfolioProjects as projects } from '@/data/portfolio';
import WaveText from '@/components/common/WaveText/WaveText';
import Reveal from '@/components/common/Reveal/Reveal';

interface PortfolioProps {
  hideHeader?: boolean;
}

// 홈에서는 2열 × 2줄만 보여주고 나머지는 "전체 프로젝트 보기"로 넘긴다
const HOME_LIMIT = 4;

export default function Portfolio({ hideHeader = false }: PortfolioProps) {
  const list = hideHeader ? projects : projects.slice(0, HOME_LIMIT);

  return (
    <section id="portfolio" className={`${styles.section} ${hideHeader ? styles.noPin : ''}`}>
      <div className={styles.container}>
        {!hideHeader && (
          <div className={styles.header}>
            <div className="section-eyebrow">OUR WORK</div>
            <WaveText className="section-title">함께 만든 브랜드들</WaveText>
            <p className={styles.sub}>
              다양한 업종의 브랜드와 함께 만든 홈페이지입니다.
            </p>
          </div>
        )}

        <div className={styles.grid}>
          {list.map((p, i) => (
            <Reveal key={`${p.title}-${i}`} delay={(i % 2) * 0.18}>
              <Link href={`/portfolio/${p.slug}`} className={styles.card}>
                <div className={styles.thumb}>
                  <div className={styles.thumbInner}>
                    <Image
                      src={p.img}
                      alt={p.title}
                      fill
                      sizes="(max-width: 600px) 100vw, 640px"
                      className={styles.thumbImg}
                    />
                  </div>
                  <div className={styles.thumbOverlay}>
                    <span className={styles.thumbCta} aria-hidden="true">+</span>
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{p.title}</h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {!hideHeader && (
          <div className={styles.viewAll}>
            <Link href="/portfolio" className={styles.viewAllLink}>전체 프로젝트 보기 →</Link>
          </div>
        )}
      </div>
    </section>
  );
}
