'use client';
import { useEffect, useRef } from 'react';
import styles from './Pricing.module.css';

const plans = [
  {
    label: '단일 페이지 최적화',
    tier: 'STARTER',
    name: '스타터',
    price: '1,000,000',
    popular: false,
    features: [
      { text: '랜딩페이지 1p', highlight: false },
      { text: '반응형', highlight: false },
      { text: '템플릿 기반 커스텀', highlight: false },
      { text: '기본 SEO 세팅', highlight: false },
    ],
    duration: '영업일 1~2주',
    cta: '문의하기',
  },
  {
    label: '기업 홈페이지 최적화',
    tier: 'STANDARD',
    name: '스탠다드',
    price: '2,000,000',
    popular: true,
    popLabel: 'RECOMMENDED',
    features: [
      { text: '멀티페이지(3~5p)', highlight: false },
      { text: '반응형 + 관리자 문의함', highlight: false },
      { text: 'GSAP 애니메이션', highlight: true },
      { text: 'GA4 연동', highlight: false },
      { text: '알림톡/카톡 연동 옵션', highlight: false },
    ],
    duration: '영업일 2~3주',
    cta: '문의하기',
  },
  {
    label: '맞춤형 솔루션 구축',
    tier: 'CUSTOM',
    name: '커스텀',
    price: '문의 후 견적',
    popular: false,
    features: [
      { text: '맞춤 풀스택 개발', highlight: true },
      { text: 'DB/API 연동', highlight: false },
      { text: '커스텀 관리자페이지', highlight: false },
      { text: '유지보수 별도 협의', highlight: false },
      { text: '전담 대응', highlight: false },
    ],
    duration: '별도 협의',
    cta: '문의하기',
  },
];

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
          <div className="section-eyebrow section-eyebrow-white" style={{ justifyContent: 'center' }}>PRICING</div>
          <h2 className="section-title" style={{ textAlign: 'center', color: '#ffffff' }}>어떤 서비스가 필요하신가요?</h2>
          <p className={styles.sub} style={{ textAlign: 'center', margin: '8px auto 0', color: 'rgba(255, 255, 255, 0.7)' }}>
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

              {/* Plan label */}
              <span className={styles.planLabel}>{plan.label}</span>

              {/* Plan name */}
              <h3 className={styles.planName}>{plan.name}</h3>

              {/* Price */}
              <div className={styles.priceRow}>
                {plan.price === '문의 후 견적' ? (
                  <span className={styles.price} style={{ fontSize: '1.5rem', lineHeight: '1.5' }}>{plan.price}</span>
                ) : (
                  <>
                    <span className={styles.pricePrefix}>시작가</span>
                    <span className={styles.price}>{plan.price}</span>
                    <span className={styles.priceUnit}>원 ~</span>
                  </>
                )}
              </div>

              <div className={styles.divider} />

              {/* Features */}
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

              {/* Meta */}
              <div className={styles.meta}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>제작 기간</span>
                  <span className={styles.metaVal}>{plan.duration}</span>
                </div>
              </div>

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
          * 모든 플랜은 무료 상담 후 정확한 견적을 안내드립니다. 추가 비용 없이 처음 견적이 최종 금액입니다.
        </p>
      </div>
    </section>
  );
}
