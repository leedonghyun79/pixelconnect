'use client';
import { useEffect, useRef } from 'react';
import styles from './Solution.module.css';

const diffs = [
  {
    num: '01',
    tag: 'Planning',
    title: '전환 중심 기획',
    desc: '고객 행동을 분석해 구매까지 이어지는 흐름을 설계합니다. 예쁜 사이트가 아닌 팔리는 사이트를 만듭니다.',
    keywords: ['행동 분석', '전환 흐름', '매출 구조'],
  },
  {
    num: '02',
    tag: 'Execution',
    title: '빠른 실행력',
    desc: '기획 → 디자인 → 개발 → 배포까지 올인원으로 진행해 속도를 극대화합니다. 평균 30일 내 런칭.',
    keywords: ['올인원', '30일 런칭', '원스탑'],
  },
  {
    num: '03',
    tag: 'Partnership',
    title: '운영까지 책임',
    desc: '제작이 끝이 아닙니다. 런칭 후 데이터를 기반으로 성과 개선까지 함께하는 장기 파트너입니다.',
    keywords: ['런칭 후', '성과 파트너', '데이터 기반'],
  },
];

export default function Solution() {
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
    <section className={styles.section} id="solution">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className="section-label">Why PixelConnect</div>
          <h2 className={`section-title ${styles.title}`}>
            픽셀커넥트는<br />이렇게 다릅니다
          </h2>
        </div>

        <div className={styles.cards}>
          {diffs.map((d, i) => (
            <div
              key={i}
              ref={el => { itemRefs.current[i] = el; }}
              className={`${styles.card} fade-up`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className={styles.cardHead}>
                <span className={styles.num}>{d.num}</span>
                <span className={styles.tag}>{d.tag}</span>
              </div>
              <h3 className={styles.cardTitle}>{d.title}</h3>
              <p className={styles.cardDesc}>{d.desc}</p>
              <div className={styles.keywords}>
                {d.keywords.map((k, ki) => (
                  <span key={ki} className={styles.keyword}>{k}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Comparison banner */}
        <div className={styles.compBanner}>
          <div className={styles.compItem}>
            <span className={styles.compBad}>❌</span>
            <span className={styles.compText}>"우리는 잘 만든다"</span>
            <span className={styles.compSub}>모든 에이전시가 하는 말</span>
          </div>
          <div className={styles.compArrow}>VS</div>
          <div className={styles.compItem}>
            <span className={styles.compGood}>✅</span>
            <span className={styles.compTextAccent}>"우리는 매출을 만든다"</span>
            <span className={styles.compSub}>픽셀커넥트만의 차별화</span>
          </div>
        </div>
      </div>
    </section>
  );
}
