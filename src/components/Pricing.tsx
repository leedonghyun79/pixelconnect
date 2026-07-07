'use client';
import { useEffect, useRef } from 'react';
import styles from './Pricing.module.css';

const plans = [
  {
    label: '안심 환불 보장 적용',
    tier: 'BASIC',
    name: '스타터 플랜',
    price: '1,000,000',
    popular: false,
    features: [
      { text: '1:1 맞춤 브랜딩 기획 및 디자인 설계', highlight: false },
      { text: '3개월 안심 환불 보장제 전격 적용', highlight: true },
      { text: '카카오톡·전화·문자 바로가기 연동', highlight: false },
      { text: '도메인 + SSL보안 + 클라우드 1년 제공', highlight: false },
    ],
    duration: '영업일 1~2주',
    cta: '자세히보기',
  },
  {
    label: '대기업/입찰 최적화',
    tier: 'STANDARD',
    name: '시그니처 플랜',
    price: '2,000,000',
    popular: true,
    popLabel: 'RECOMMENDED',
    features: [
      { text: '1:1 맞춤 브랜딩 기획 및 디자인 설계', highlight: false },
      { text: '3개월 안심 환불 보장제 전격 적용', highlight: true },
      { text: '카카오톡·전화·문자 바로가기 연동', highlight: false },
      { text: '도메인 + SSL보안 + 클라우드 1년 제공', highlight: false },
      { text: '관리자 전용 페이지 추가 구축', highlight: false },
      { text: '외부 서비스 데이터 연동 추가 (API/폼)', highlight: false },
    ],
    duration: '영업일 2~3주',
    cta: '자세히보기',
  },
  {
    label: '대형 프로젝트/플랫폼',
    tier: 'PREMIUM',
    name: '맞춤 개발 플랜',
    price: '7,000,000',
    popular: false,
    features: [
      { text: '시그니처 플랜 혜택 모두 포함', highlight: false },
      { text: 'Full-Stack 웹 앱 독자 아키텍처 설계', highlight: false },
      { text: '고성능 인터렉티브 동적 웹 모듈 개발', highlight: false },
      { text: '데이터베이스 연동 & API/회원 시스템 구축', highlight: true },
      { text: '관리자 전용 대시보드 & 전환 분석 연동', highlight: false },
      { text: '1:1 전담 개발자 PM 배치 & 상세 유지보수', highlight: false },
    ],
    duration: '영업일 4~8주',
    cta: '자세히보기',
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

              {/* Plan label */}
              <span className={styles.planLabel}>{plan.label}</span>

              {/* Plan name */}
              <h3 className={styles.planName}>{plan.name}</h3>

              {/* Price */}
              <div className={styles.priceRow}>
                <span className={styles.pricePrefix}>시작가</span>
                <span className={styles.price}>{plan.price}</span>
                <span className={styles.priceUnit}>원 ~</span>
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
