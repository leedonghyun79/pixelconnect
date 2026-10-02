'use client';
import { useEffect, useRef } from 'react';
import styles from './PainPoint.module.css';
import WaveText from '@/components/common/WaveText/WaveText';

const pains = [
  {
    title: '납품 후 연락이 끊겼어요',
    desc: '완성됐다고 했는데 수정 요청하니 답장이 없어요.',
  },
  {
    title: '수정할 때마다 추가 비용이',
    desc: '처음엔 괜찮다더니 조금만 바꿔도 견적이 나와요.',
  },
  {
    title: '자료 준비부터 막막해요',
    desc: '어디서부터 시작해야 할지 모르겠어요.',
  },
  {
    title: '결과물이 기대와 너무 달랐어요',
    desc: '예쁘다고 했는데 오픈하고 보니 아니었어요.',
  },
];

export default function PainPoint() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bridgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { 
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        } else {
          e.target.classList.remove('visible');
        }
      }),
      // 화면 하단 15%는 제외하고 감지 → 카드가 충분히 올라온 뒤에 순서대로 등장
      { threshold: 0.1, rootMargin: '0px 0px -15% 0px' }
    );
    itemRefs.current.forEach(el => { if (el) observer.observe(el); });
    if (bridgeRef.current) observer.observe(bridgeRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className={styles.section} id="pain">
      <div className={styles.container}>
        <div className={styles.header}>
          <WaveText className="section-title">혹시, 이런 경험 있으신가요?</WaveText>
          <p className={styles.sub}>
            웹사이트 외주, 한 번쯤은 데어보셨을 겁니다.
          </p>
        </div>

        <div className={styles.grid}>
          {pains.map((p, i) => (
            <div
              key={i}
              ref={el => { itemRefs.current[i] = el; }}
              className={`${styles.cardReveal} fade-up`}
              // 제목 물결 효과 뒤에 이어지도록 기본 딜레이 + 행 → 열 순으로 순차 등장
              style={{ transitionDelay: `${0.2 + Math.floor(i / 2) * 0.2 + (i % 2) * 0.18}s` }}
            >
              <div className={styles.card}>
                <span className={styles.quoteMark} aria-hidden="true">“</span>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.cardDesc}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div
          ref={bridgeRef}
          className={`${styles.bridge} fade-up`}
        >
          <p className={styles.bridgeText}>
            이런 고민, 한 번쯤 해보셨다면 잘 오셨습니다.
          </p>
          <p className={styles.bridgeSub}>
            그래서 <span className={styles.bridgeAccent}>픽셀커넥트</span>는, 만드는 데서 끝내지 않기로 했습니다.
          </p>
          <p className={styles.bridgeSubEm}>
            대표님께 필요한 건, 보기 좋은 사이트가 아니라 문의로 이어지는 사이트일 테니까요.
          </p>
        </div>
      </div>
      </section>
    </>
  );
}
