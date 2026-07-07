'use client';
import { useEffect, useRef } from 'react';
import styles from './WhyUs.module.css';

const diffs = [
  {
    num: '01 · Design',
    title: '브랜드 맞춤형 디자인',
    desc: '기획부터 카피라이팅, 디자인까지 브랜드의 가치를 담은 홈페이지를 만듭니다. 양산형 템플릿은 없습니다.',
    highlight: false,
  },
  {
    num: '02 · Price',
    title: '합리적이고 투명한 견적',
    desc: '처음 안내한 견적이 곧 최종 금액입니다. 진행 중 추가 비용은 발생하지 않습니다.',
    highlight: false,
  },
  {
    num: '03 · Care',
    title: '밀착 소통, 빠른 피드백',
    desc: '진행 중 궁금한 점은 언제든 물어보세요. 당일 피드백을 원칙으로, 답답함 없는 진행을 보장합니다.',
    highlight: true,
  },
];

export default function WhyUs() {
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
          <div className="section-eyebrow section-eyebrow-white">WHY US</div>
          <h2 className="section-title" style={{ color: '#fff' }}>저희가 다른 이유</h2>
          <p className={styles.sub}>
            세심한 접근과 책임감으로 기대 이상의 결과를 만듭니다.
          </p>
        </div>

        <div className={styles.cards}>
          {diffs.map((d, i) => (
            <div
              key={i}
              ref={el => { itemRefs.current[i] = el; }}
              className={`${styles.card} ${d.highlight ? styles.cardHighlight : ''} fade-up`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <span className={styles.num}>{d.num}</span>
              <h3 className={styles.cardTitle}>{d.title}</h3>
              <p className={styles.cardDesc}>{d.desc}</p>
              {d.highlight && (
                <span className={styles.star}>⭐</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
