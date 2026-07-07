'use client';
import { useEffect, useRef } from 'react';
import styles from './Maintenance.module.css';

const items = [
  { title: '월간 리포트 제공', desc: '매월 사이트 방문자·성과 데이터를 정리해 리포트로 공유합니다.' },
  { title: '1시간 이내 응답 보장', desc: '문의 접수 후 평균 1시간 이내 답변, 긴급 오류는 즉시 처리합니다.' },
  { title: '추가 요청 유연 반영', desc: '운영 중 발생하는 새로운 요구사항도 별도 비용 없이 유연하게 대응합니다.' },
  { title: '정기 보안·성능 점검', desc: '주기적으로 사이트 속도·보안·링크 상태를 점검해 건강하게 유지합니다.' },
];

export default function Maintenance() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`${styles.section} fade-up`} id="maintenance">
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left: Text */}
          <div className={styles.left}>
            <div className={`section-eyebrow section-eyebrow-white`}>MAINTENANCE</div>
            <h2 className={styles.title}>
              제작은 시작,<br />관리가 본질입니다
            </h2>
            <p className={styles.sub}>
              대부분의 업체는 납품과 함께 관계가 끝납니다.<br />
              저희는 그때부터 진짜 파트너십이 시작된다고 생각합니다.
            </p>
            <blockquote className={styles.quote}>
              &ldquo;납품 후 연락이 끊기는 업체,<br />경험해보셨나요?&rdquo;
            </blockquote>
          </div>

          {/* Right: Service Items */}
          <div className={styles.right}>
            {items.map((item, i) => (
              <div key={i} className={styles.item}>
                <div className={styles.checkIcon}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="10" fill="rgba(255,255,255,0.1)" />
                    <path d="M6 10l3 3 5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h4 className={styles.itemTitle}>{item.title}</h4>
                  <p className={styles.itemDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
