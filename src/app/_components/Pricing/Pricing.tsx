'use client';
import { useEffect, useRef } from 'react';
import { plans } from '@/data/pricing';
import styles from './Pricing.module.css';
import WaveText from '@/components/common/WaveText/WaveText';

export default function Pricing() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { 
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        } else {
          e.target.classList.remove('visible');
        }
      }),
      { threshold: 0.1 }
    );
    itemRefs.current.forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} id="pricing">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={`section-eyebrow ${styles.eyebrowCenter}`}>PRICING</div>
          <WaveText className={`section-title ${styles.titleCenter}`}>어떤 서비스가 필요하신가요?</WaveText>
          <p className={`${styles.sub} ${styles.subCenter}`}>
            합리적인 비용으로 브랜드에 꼭 맞는 홈페이지를 만듭니다.
          </p>
        </div>

        <div className={styles.grid}>
          {plans.map((plan, i) => (
            <div
              key={i}
              ref={el => { itemRefs.current[i] = el; }}
              className={`${styles.card} ${plan.popular ? styles.cardPop : ''} fade-up`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {plan.popular && plan.popLabel && (
                <div className={styles.popBadge}>{plan.popLabel}</div>
              )}

              {/* Plan name → 한 줄 설명 */}
              <h3 className={styles.planName}>{plan.name}</h3>
              <span className={styles.planLabel}>{plan.label}</span>

              {/* Price */}
              <div className={styles.priceRow}>
                {plan.price === null ? (
                  <span className={styles.price} style={{ fontSize: '1.5rem', lineHeight: '1.5' }}>문의 후 견적</span>
                ) : (
                  <>
                    <span className={styles.pricePrefix}>시작가</span>
                    <span className={styles.price}>{String(plan.price).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
                    <span className={styles.priceUnit}>원 ~</span>
                  </>
                )}
              </div>

              {/* 페이지 구성 · 제작 기간 */}
              <dl className={styles.specs}>
                <div className={styles.specRow}>
                  <dt className={styles.specLabel}>페이지 구성</dt>
                  <dd className={styles.specVal}>{plan.pages}</dd>
                </div>
                <div className={styles.specRow}>
                  <dt className={styles.specLabel}>제작 기간</dt>
                  <dd className={styles.specVal}>{plan.duration}</dd>
                </div>
              </dl>

              {/* 제공 범위 */}
              <span className={styles.scopeLabel}>제공 범위</span>
              <ul className={styles.features}>
                {plan.features.map((f, fi) => (
                  <li key={fi} className={styles.feature}>
                    <span className={`${styles.check} ${plan.popular ? styles.checkPop : ''}`}>✓</span>
                    <span className={f.highlight ? styles.featureHighlight : ''}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="/contact"
                className={`${styles.planCta} ${plan.popular ? styles.planCtaPop : ''}`}
              >
                {plan.cta}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className={styles.note}>
          * 모든 플랜은 무료 상담 후 정확한 견적을 안내드립니다.{' '}
          <span className={styles.noteBreak}>추가 비용 없이 처음 견적이 최종 금액입니다.</span>
        </p>
      </div>
    </section>
  );
}
