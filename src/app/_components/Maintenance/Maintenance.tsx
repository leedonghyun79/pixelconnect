'use client';
import { useEffect, useRef } from 'react';
import styles from './Maintenance.module.css';

const items = [
  { title: '맞춤형 운영 매뉴얼 제공', desc: '직접 텍스트나 이미지를 쉽게 수정하실 수 있도록 전용 가이드를 제공합니다.' },
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
      entries => entries.forEach(e => { 
        if (e.isIntersecting) {
          // 전역 fade-up 클래스용
          if (e.target.id === 'maintenance') e.target.classList.add('visible');
          // 개별 아이템용 커스텀 애니메이션 클래스 추가
          else e.target.classList.add(styles.visible);
        } else {
          // 뷰포트에서 벗어나면 클래스 제거하여 재진입 시 다시 애니메이션 트리거
          if (e.target.id === 'maintenance') e.target.classList.remove('visible');
          else e.target.classList.remove(styles.visible);
        }
      }),
      { threshold: 0.1 }
    );
    observer.observe(el);

    // 개별 아이템들도 관찰하여 순차적 애니메이션 되도록 처리
    const animItems = el.querySelectorAll(`.${styles.item}`);
    animItems.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`${styles.section}`} id="maintenance">
      {/* 동적 배경 효과 */}
      <div className={styles.bgBlob} />
      <div className={styles.bgBlob2} />

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
          </div>

          {/* Right: Service Items */}
          <div className={styles.right}>
            {items.map((item, i) => (
              <div
                key={i}
                className={styles.item}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className={styles.checkIcon}>
                  <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
                    <path d="M6 10l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
