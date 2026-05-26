'use client';
import { useEffect, useRef } from 'react';
import styles from './Testimonials.module.css';

const reviews = [
  {
    stars: 5,
    tags: ['인테리어'],
    highlight: '납품 후에도 계속 도와주셔서 너무 감사해요',
    body: '다른 곳에서는 납품 후 연락이 안 됐는데, 픽셀커넥트는 작은 수정도 빠르게 처리해주세요. 진짜 파트너라는 느낌이 듭니다.',
    name: '인테리어 대표 김○○님',
    date: '2025.04',
  },
  {
    stars: 5,
    tags: ['마케팅'],
    highlight: '처음 안내받은 견적 그대로 진행됐어요',
    body: '다른 업체에서는 추가 비용이 계속 붙었는데, 여기는 처음 견적이 최종이라는 게 너무 좋았습니다.',
    name: '마케팅 대표 이○○님',
    date: '2025.03',
  },
  {
    stars: 5,
    tags: ['병원'],
    highlight: '자료 준비도 같이 도와주셔서 편했어요',
    body: '뭘 준비해야 할지 막막했는데 가이드를 주시고 함께 정리해주셔서 수월하게 진행할 수 있었습니다.',
    name: '병원 원장 박○○님',
    date: '2025.02',
  },
];

export default function Testimonials() {
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
    <section className={styles.section} id="testimonials">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className="section-eyebrow">REVIEWS</div>
          <h2 className="section-title">함께한 대표님들의 이야기</h2>
          <p className={styles.sub}>결과물보다 관계가 먼저입니다.</p>
        </div>

        <div className={styles.grid}>
          {reviews.map((review, i) => (
            <div
              key={i}
              ref={el => { itemRefs.current[i] = el; }}
              className={`${styles.card} fade-up`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className={styles.stars}>
                {'★'.repeat(review.stars)}
              </div>
              <div className={styles.tags}>
                {review.tags.map((t, ti) => (
                  <span key={ti} className={styles.tag}>{t}</span>
                ))}
              </div>
              <p className={styles.highlight}>&ldquo;{review.highlight}&rdquo;</p>
              <p className={styles.body}>{review.body}</p>
              <div className={styles.author}>
                <div>
                  <span className={styles.name}>{review.name}</span>
                  <span className={styles.meta}>{review.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.viewAll}>
          <a href="/reviews" className={styles.viewAllLink}>전체 후기 보기 →</a>
        </div>
      </div>
    </section>
  );
}
