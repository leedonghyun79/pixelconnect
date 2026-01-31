'use client';
import { motion } from 'framer-motion';
import styles from './Testimonials.module.css';

const reviews = [
  {
    quote: "전문적인 컨설팅과 빠른 작업으로 만족스러운 결과를 얻었습니다. 특히 모바일에서의 경험이 크게 개선되어 고객 불만이 줄었습니다.",
    name: "박지훈 대표",
    role: "테크 스타트업 CEO",
    initial: "P"
  },
  {
    quote: "기존 홈페이지가 너무 낡아 보였는데, 리뉴얼 후 브랜드 이미지가 확 달라졌다는 피드백을 많이 받고 있습니다.",
    name: "김민영 팀장",
    role: "마케팅 총괄",
    initial: "K"
  },
  {
    quote: "유지보수 서비스가 정말 좋습니다. 작은 수정 요청도 빠르게 반영해주시고 늘 친절하게 대응해주셔서 안심이 됩니다.",
    name: "이준호 대표",
    role: "이커머스 운영",
    initial: "L"
  }
];

export default function Testimonials() {
  return (
    <section className={styles.section}>
      <div className="container">
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          클라이언트 후기
        </motion.h2>

        <div className={styles.grid}>
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <p className={styles.quote}>"{review.quote}"</p>
              <div className={styles.author}>
                <div className={styles.avatar}>{review.initial}</div>
                <div className={styles.info}>
                  <span className={styles.name}>{review.name}</span>
                  <span className={styles.role}>{review.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
