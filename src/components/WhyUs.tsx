'use client';
import { useEffect, useRef } from 'react';
import styles from './WhyUs.module.css';
import mStyles from './Maintenance.module.css';

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
    highlight: false,
  },
];

const maintenanceItems = [
  { title: '맞춤형 운영 매뉴얼 제공', desc: '직접 텍스트나 이미지를 쉽게 수정하실 수 있도록 전용 가이드를 제공합니다.' },
  { title: '1시간 이내 응답 보장', desc: '문의 접수 후 평균 1시간 이내 답변, 긴급 오류는 즉시 처리합니다.' },
  { title: '추가 요청 유연 반영', desc: '운영 중 발생하는 새로운 요구사항도 별도 비용 없이 유연하게 대응합니다.' },
  { title: '정기 보안·성능 점검', desc: '주기적으로 사이트 속도·보안·링크 상태를 점검해 건강하게 유지합니다.' },
];

export default function WhyUs() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { 
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          if (e.target.classList.contains(mStyles.item)) {
             e.target.classList.add(mStyles.visible);
          }
        } else {
          e.target.classList.remove('visible');
          if (e.target.classList.contains(mStyles.item)) {
             e.target.classList.remove(mStyles.visible);
          }
        }
      }),
      { threshold: 0.1 }
    );
    itemRefs.current.forEach(el => { if (el) observer.observe(el); });

    if (sectionRef.current) {
       const mItems = sectionRef.current.querySelectorAll(`.${mStyles.item}`);
       mItems.forEach(item => observer.observe(item));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="services">
      {/* Maintenance Blobs */}
      <div className={mStyles.bgBlob} />
      <div className={mStyles.bgBlob2} />

      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className="section-title" style={{ color: '#fff' }}>픽셀커넥트가 다른 이유</h2>
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

      {/* Maintenance Block appended directly */}
      <div className={mStyles.maintenanceBlock}>
        <div className={mStyles.container}>
          <div className={mStyles.grid}>
            {/* Left: Text */}
            <div className={mStyles.left}>
              <div className={`section-eyebrow section-eyebrow-white`}>MAINTENANCE</div>
              <h2 className={mStyles.title}>
                제작은 시작,<br />관리가 본질입니다
              </h2>
              <p className={mStyles.sub}>
                대부분의 업체는 납품과 함께 관계가 끝납니다.<br />
                저희는 그때부터 진짜 파트너십이 시작된다고 생각합니다.
              </p>
            </div>

            {/* Right: Service Items */}
            <div className={mStyles.right}>
              {maintenanceItems.map((item, i) => (
                <div
                  key={i}
                  className={mStyles.item}
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  <div className={mStyles.checkIcon}>
                    <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
                      <path d="M6 10l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h4 className={mStyles.itemTitle}>{item.title}</h4>
                    <p className={mStyles.itemDesc}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
