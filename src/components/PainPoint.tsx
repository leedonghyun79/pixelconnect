'use client';
import { useEffect, useRef } from 'react';
import styles from './PainPoint.module.css';

const pains = [
  {
    num: '01',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11 13h.01M21 13h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M11 20s1.5-2 5-2 5 2 5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 6l2-2M10 6 8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: '납품 후 연락이 끊겼어요',
    desc: '완성됐다고 했는데 수정 요청하니 답장이 없어요.',
  },
  {
    num: '02',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 9v7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 6 6 4M22 6l4-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M11 20h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: '수정할 때마다 추가 비용이',
    desc: '처음엔 괜찮다더니 조금만 바꿔도 견적이 나와요.',
  },
  {
    num: '03',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="6" width="24" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4 11h24" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 17h4M10 21h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="22" cy="19" r="4" fill="var(--navy-pale)" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M22 17v2l1.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: '자료 준비부터 막막해요',
    desc: '어디서부터 시작해야 할지 모르겠어요.',
  },
  {
    num: '04',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 28V8a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H10L4 28Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M11 13h10M11 18h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: '결과물이 기대와 너무 달랐어요',
    desc: '예쁘다고 했는데 오픈하고 보니 아니었어요.',
  },
];

export default function PainPoint() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bridgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    itemRefs.current.forEach(el => { if (el) observer.observe(el); });
    if (bridgeRef.current) observer.observe(bridgeRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} id="pain">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className="section-eyebrow">PAIN POINT</div>
          <h2 className="section-title">혹시 이런 경험, 있으신가요?</h2>
          <p className={styles.sub}>
            많은 대표님들이 홈페이지 제작 과정에서 같은 어려움을 겪습니다.
          </p>
        </div>

        <div className={styles.grid}>
          {pains.map((p, i) => (
            <div
              key={i}
              ref={el => { itemRefs.current[i] = el; }}
              className={`${styles.card} fade-up`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className={styles.cardNum}>{p.num}</div>
              <div className={styles.cardIcon}>{p.icon}</div>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardDesc}>{p.desc}</p>
            </div>
          ))}
        </div>

        <div
          ref={bridgeRef}
          className={`${styles.bridge} fade-up`}
        >
          <p className={styles.bridgeText}>
            이런 고민이 있으셨다면, 잘 찾아오셨습니다.
          </p>
          <p className={styles.bridgeSub}>
            <span className={styles.bridgeAccent}>픽셀 커넥트</span>는 이 문제들을 하나하나 해결하기 위해 만들어졌습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
