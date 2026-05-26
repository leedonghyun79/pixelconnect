'use client';
import { useEffect, useRef } from 'react';
import styles from './Maintenance.module.css';

const items = [
  { title: '텍스트·이미지 수정', desc: '빠른 대응으로 원하는 내용으로 즉시 업데이트' },
  { title: '기능 오류 처리', desc: '사이트에 문제가 생기면 즉시 확인하고 처리' },
  { title: '추가 요청 유연 반영', desc: '운영 중 새로운 요청도 유연하게 반영' },
  { title: '정기 점검', desc: '주기적으로 사이트 상태를 점검해 건강하게 유지' },
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
