'use client';
import { useEffect, useRef } from 'react';
import Script from 'next/script';
import styles from './ServiceDetail.module.css';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lord-icon': any;
    }
  }
}

const services = [
  {
    icon: 'gqzfzudq',
    title: '웹사이트 제작',
    desc: '브랜드 아이덴티티를 반영한 맞춤형 웹사이트를 제작합니다. 반응형 디자인으로 PC·모바일 어디서든 최적의 경험을 제공합니다.',
    features: ['맞춤형 디자인', '반응형 레이아웃', 'SEO 최적화', '빠른 로딩 속도'],
  },
  {
    icon: 'nobciafz',
    title: '맞춤형 개발',
    desc: '정형화된 템플릿으로는 어려운 요구사항을 직접 개발합니다. 예약, 관리자 페이지, 외부 API 연동 등 비즈니스에 필요한 기능을 맞춤 제작합니다.',
    features: ['맞춤 기능 개발', '관리자 페이지', '외부 API 연동', '데이터베이스 설계'],
  },
  {
    icon: 'nocovwne',
    title: '랜딩페이지',
    desc: '광고와 연계된 고전환 랜딩페이지를 제작합니다. 명확한 CTA와 설득 구조로 문의 전환율을 높입니다.',
    features: ['전환 최적화 구조', '광고 연계 설계', 'A/B 테스트 지원', '빠른 제작 (1주)'],
  },
  {
    icon: 'sbiheqdr',
    title: '유지보수·운영',
    desc: '런칭 후에도 사이트 수정, 오류 처리, 콘텐츠 업데이트를 지속적으로 지원합니다. 홈페이지가 살아있는 동안 함께합니다.',
    features: ['텍스트·이미지 수정', '기능 오류 처리', '정기 점검', '운영 컨설팅'],
  },
];

export default function ServiceDetail() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.1 }
    );
    itemRefs.current.forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Script src="https://cdn.lordicon.com/lordicon.js" strategy="lazyOnload" />
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {services.map((s, i) => (
              <div
                key={i}
                ref={el => { itemRefs.current[i] = el; }}
                className={`${styles.card} fade-up`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <lord-icon
                  src={`https://cdn.lordicon.com/${s.icon}.json`}
                  trigger="loop"
                  delay={`${1000 + i * 500}`}
                  colors="primary:#0d0d3e,secondary:#ffc85c"
                  className={styles.icon}
                ></lord-icon>
                <h2 className={styles.title}>{s.title}</h2>
                <p className={styles.desc}>{s.desc}</p>
                <div className={styles.features}>
                  {s.features.map((f, fi) => (
                    <span key={fi} className={styles.feature}>{f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
