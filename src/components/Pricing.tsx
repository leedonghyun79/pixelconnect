'use client';
import { useEffect, useRef } from 'react';
import styles from './Pricing.module.css';

const plans = [
  {
    tier: 'BASIC',
    name: '랜딩 페이지',
    target: '포트폴리오, 홍보, 광고, 이벤트',
    popular: false,
    features: [
      { text: '메인 1장 · 섹션 7개', highlight: false },
      { text: '수정 무제한', highlight: false },
      { text: '반응형 (모바일 최적화)', highlight: false },
      { text: 'SEO 기본 설정', highlight: false },
      { text: '런칭 후 1개월 무상 관리', highlight: true },
    ],
    duration: '영업일 1주',
    cta: '상담 신청',
  },
  {
    tier: 'STANDARD',
    name: '스탠다드 페이지',
    target: '브랜딩, 중소기업, 기관·협회',
    popular: true,
    popLabel: '81% 고객 선택',
    features: [
      { text: '메인 1장 · 서브 4장', highlight: false },
      { text: '수정 무제한', highlight: false },
      { text: '반응형 (모바일 최적화)', highlight: false },
      { text: 'SEO 최적화', highlight: false },
      { text: '런칭 후 3개월 무상 관리', highlight: true },
      { text: '운영 가이드 제공', highlight: false },
      { text: '마케팅 컨설팅', highlight: false },
    ],
    duration: '영업일 2주',
    cta: '상담 신청',
  },
  {
    tier: 'PREMIUM',
    name: '프리미엄 페이지',
    target: '10장 이상 대규모 웹사이트',
    popular: false,
    features: [
      { text: '메인 1장 · 서브 9장+', highlight: false },
      { text: '수정 무제한', highlight: false },
      { text: '반응형 (모바일 최적화)', highlight: false },
      { text: 'SEO 최적화', highlight: false },
      { text: '런칭 후 6개월 무상 관리', highlight: true },
      { text: '전담 담당자 배정', highlight: false },
    ],
    duration: '영업일 4주',
    cta: '상담 신청',
  },
];

export default function Pricing() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    itemRefs.current.forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} id="pricing">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>PRICING</div>
          <h2 className="section-title" style={{ textAlign: 'center' }}>어떤 서비스가 필요하신가요?</h2>
          <p className={styles.sub} style={{ textAlign: 'center', margin: '8px auto 0' }}>
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

              <span className={styles.tier}>{plan.tier}</span>
              <h3 className={styles.planName}>{plan.name}</h3>
              <p className={styles.target}>{plan.target}</p>

              <ul className={styles.features}>
                {plan.features.map((f, fi) => (
                  <li key={fi} className={styles.feature}>
                    <span className={styles.check}>✓</span>
                    <span className={f.highlight ? styles.maintenanceHighlight : ''}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              <div className={styles.meta}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>제작 기간</span>
                  <span className={styles.metaVal}>{plan.duration}</span>
                </div>
              </div>

              <a
                href="/contact"
                className={`${styles.planCta} ${plan.popular ? styles.planCtaPop : ''}`}
              >
                {plan.cta} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
