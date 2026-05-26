'use client';
import { useEffect, useRef } from 'react';
import styles from './Services.module.css';

const services = [
  {
    num: '01',
    icon: '🌐',
    title: '웹사이트 제작',
    result: '매출 구조 중심 설계',
    desc: '보기 좋은 사이트가 아닌 팔리는 사이트를 만듭니다. 고객 행동 흐름을 분석해 전환을 극대화합니다.',
    targets: ['스몰브랜드', '스타트업', 'B2B'],
  },
  {
    num: '02',
    icon: '🛒',
    title: '쇼핑몰 구축',
    result: '구매 전환 최적화',
    desc: '방문자가 구매 버튼을 누르도록 설계합니다. 상품 상세, 장바구니, 결제까지 이탈 없는 구조.',
    targets: ['이커머스', '셀러', 'D2C'],
  },
  {
    num: '03',
    icon: '🎯',
    title: '랜딩페이지',
    result: '광고 효율 극대화',
    desc: '광고비 낭비 없이 문의율을 높이는 구조를 설계합니다. CTA 최적화로 전환율을 3배 끌어올립니다.',
    targets: ['광고 집행자', '소상공인'],
  },
  {
    num: '04',
    icon: '⚙️',
    title: '유지보수 & 운영',
    result: '지속적 성과 개선',
    desc: '런칭 후에도 데이터 기반으로 함께 개선합니다. 작은 수정부터 구조 개편까지 장기 파트너로 함께합니다.',
    targets: ['장기 파트너', '기업 운영자'],
  },
];

export default function Services() {
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
    <section className={styles.section} id="services">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className="section-label">Services</div>
          <h2 className={`section-title ${styles.title}`}>
            단순 제작이 아닌,<br />비즈니스 성장 파트너
          </h2>
        </div>

        <div className={styles.grid}>
          {services.map((s, i) => (
            <div
              key={i}
              ref={el => { itemRefs.current[i] = el; }}
              className={`${styles.card} fade-up`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className={styles.cardTop}>
                <span className={styles.num}>{s.num}</span>
                <span className={styles.icon}>{s.icon}</span>
              </div>
              <div className={styles.resultBadge}>{s.result}</div>
              <h3 className={styles.cardTitle}>{s.title}</h3>
              <p className={styles.cardDesc}>{s.desc}</p>
              <div className={styles.targets}>
                {s.targets.map((t, ti) => (
                  <span key={ti} className={styles.targetTag}>{t}</span>
                ))}
              </div>
              <div className={styles.cardCta}>
                <a href="#contact" className={styles.ctaLink}>상담하기 →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
