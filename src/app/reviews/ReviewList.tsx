'use client';
import { useEffect, useRef } from 'react';
import styles from './reviews.module.css';

const reviews = [
  {
    stars: 5,
    tags: ['인테리어'],
    highlight: '납품 후에도 계속 도와주셔서 너무 감사해요',
    body: '다른 곳에서는 납품 후 연락이 안 됐는데, 픽셀커넥트는 작은 수정도 빠르게 처리해주세요. 진짜 파트너라는 느낌이 듭니다. 사이트 오픈 후에도 꾸준히 관리해주셔서 안심이 됩니다.',
    name: '인테리어 대표 김○○님',
    date: '2025.04',
  },
  {
    stars: 5,
    tags: ['마케팅'],
    highlight: '처음 안내받은 견적 그대로 진행됐어요',
    body: '다른 업체에서는 추가 비용이 계속 붙었는데, 여기는 처음 견적이 최종이라는 게 너무 좋았습니다. 중간에 수정 요청도 여러 번 했는데 추가비용 없이 모두 반영해주셨어요.',
    name: '마케팅 대표 이○○님',
    date: '2025.03',
  },
  {
    stars: 5,
    tags: ['병원'],
    highlight: '자료 준비도 같이 도와주셔서 편했어요',
    body: '뭘 준비해야 할지 막막했는데 가이드를 주시고 함께 정리해주셔서 수월하게 진행할 수 있었습니다. 병원 홈페이지에 필요한 콘텐츠 구성까지 조언해주셨어요.',
    name: '병원 원장 박○○님',
    date: '2025.02',
  },
  {
    stars: 5,
    tags: ['교육'],
    highlight: '사이트 구조를 정리한 뒤 문의 흐름이 훨씬 좋아졌어요',
    body: '기존 사이트를 리뉴얼했는데, 홈페이지 구조가 정리되면서 문의가 더 자연스럽게 이어졌습니다. 어떤 정보가 먼저 보여져야 하는지 함께 정리해주셔서 큰 도움이 됐어요.',
    name: '교육 대표 최○○님',
    date: '2025.02',
  },
  {
    stars: 5,
    tags: ['쇼핑몰'],
    highlight: '상품 설명과 구조가 훨씬 깔끔해졌어요',
    body: '상품 페이지 구조를 정리하면서 사용자 흐름이 더 자연스러워졌습니다. 디자인이 감각적이면서도 구매로 이어지기 쉬운 구성이라 만족하고 있습니다.',
    name: '쇼핑몰 운영 한○○님',
    date: '2025.01',
  },
  {
    stars: 5,
    tags: ['스타트업'],
    highlight: '빠른 소통이 정말 인상적이었어요',
    body: '카카오톡으로 문의하면 2시간 이내로 항상 답변이 왔어요. 급한 수정도 바로 반영해주셔서 믿음이 갑니다. 다음 프로젝트도 무조건 여기서 할 거예요.',
    name: '스타트업 대표 정○○님',
    date: '2024.12',
  },
];

export default function ReviewList() {
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
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {reviews.map((review, i) => (
            <div
              key={i}
              ref={el => { itemRefs.current[i] = el; }}
              className={`${styles.card} fade-up`}
              style={{ transitionDelay: `${i * 0.08}s` }}
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
                  <span className={styles.dateMeta}>{review.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
