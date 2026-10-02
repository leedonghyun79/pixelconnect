'use client';
import { useEffect, useRef } from 'react';
import styles from './WhyUs.module.css';
import mStyles from '../Maintenance/Maintenance.module.css';
import Script from 'next/script';
import WaveText from '@/components/common/WaveText/WaveText';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lord-icon': any;
    }
  }
}

const diffs = [
  {
    pain: '납품 후 연락이 끊겼어요',
    icon: 'zpxybbhl',
    title: '밀착 소통, 빠른 피드백',
    desc: '진행 중에도, 오픈 후에도 궁금한 점은 언제든 물어보세요. 1시간 이내 피드백을 원칙으로 합니다.',
  },
  {
    pain: '수정할 때마다 추가 비용이 나와요',
    icon: 'qhviklyi',
    title: '합리적이고 투명한 견적',
    desc: '처음 안내한 견적이 곧 최종 금액입니다. 진행 중 추가 비용은 발생하지 않습니다.',
  },
  {
    pain: '결과물이 기대와 너무 달랐어요',
    icon: 'fikcyfpp',
    title: '브랜드 맞춤형 디자인',
    desc: '기획부터 카피라이팅, 디자인까지 브랜드의 가치를 담습니다. 템플릿을 그대로 쓰지 않고, 브랜드에 맞춰 설계합니다.',
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
  const maintRef = useRef<HTMLElement>(null);

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
      { threshold: 0.1, rootMargin: '0px 0px -15% 0px' }
    );
    itemRefs.current.forEach(el => { if (el) observer.observe(el); });

    if (maintRef.current) {
       const mItems = maintRef.current.querySelectorAll(`.${mStyles.item}`);
       mItems.forEach(item => observer.observe(item));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Script src="https://cdn.lordicon.com/lordicon.js" strategy="lazyOnload" />
      <section className={styles.section} id="services">
      <div className={styles.container}>
        <div className={styles.header}>
          <WaveText className="section-title">픽셀커넥트가 다른 이유</WaveText>
          <p className={styles.sub}>
            앞서 말씀하신 고민, 픽셀커넥트는 이렇게 해결합니다.
          </p>
        </div>

        <div className={styles.cards}>
          {diffs.map((d, i) => (
            <div
              key={i}
              ref={el => { itemRefs.current[i] = el; }}
              className={`${styles.cardReveal} fade-up`}
              style={{ transitionDelay: `${0.2 + i * 0.2}s` }}
            >
              <div className={styles.card}>
                <lord-icon
                  aria-hidden="true"
                  src={`https://cdn.lordicon.com/${d.icon}.json`}
                  trigger="loop"
                  delay={1500 + i * 500}
                  colors="primary:#0d0d3e,secondary:#ffc85c"
                  className={styles.icon}
                ></lord-icon>
                <p className={styles.pain}>“{d.pain}”</p>
                <h3 className={styles.cardTitle}>{d.title}</h3>
                <p className={styles.cardDesc}>{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </section>

      {/* Maintenance — 별도 섹션 */}
      <section ref={maintRef} className={styles.maintSection} id="maintenance">
      <div className={mStyles.maintenanceBlock}>
        <div className={mStyles.container}>
          <div className={mStyles.grid}>
            {/* Left: Text */}
            <div className={mStyles.left}>
              <div className={`section-eyebrow`}>MAINTENANCE</div>
              <WaveText as="h2" className={mStyles.title} highlight="관리" highlightClassName={mStyles.accentText}>{'제작은 시작,\n관리가 본질입니다'}</WaveText>
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
                  style={{ animationDelay: `${0.2 + i * 0.2}s` }}
                >
                  <div className={mStyles.checkIcon}>
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h3 className={mStyles.itemTitle}>{item.title}</h3>
                    <p className={mStyles.itemDesc}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </section>
    </>
  );
}
