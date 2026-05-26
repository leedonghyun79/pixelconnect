'use client';
import { useEffect, useRef } from 'react';
import styles from './PainPoint.module.css';

const pains = [
  {
    num: '01',
    iconUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Ghost.png',
    title: '납품 후 연락이 끊겼어요',
    desc: '완성됐다고 했는데 수정 요청하니 답장이 없어요.',
  },
  {
    num: '02',
    iconUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Money%20with%20Wings.png',
    title: '수정할 때마다 추가 비용이',
    desc: '처음엔 괜찮다더니 조금만 바꿔도 견적이 나와요.',
  },
  {
    num: '03',
    iconUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Anxious%20Face%20with%20Sweat.png',
    title: '자료 준비부터 막막해요',
    desc: '어디서부터 시작해야 할지 모르겠어요.',
  },
  {
    num: '04',
    iconUrl: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Person%20Shrugging.png',
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
              <img src={p.iconUrl} alt="아이콘" className={styles.cardIcon} />
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
