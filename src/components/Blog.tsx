'use client';
import { motion } from 'framer-motion';
import styles from './Blog.module.css';

const posts = [
  { title: "2025년, 이런 웹 디자인이 뜹니다! 트렌드 5가지", date: "2025.01.15" },
  { title: "내 쇼핑몰 오픈하기 전, '이것'만은 꼭 체크하세요", date: "2025.01.10" },
  { title: "치밀한 기획의 힘: ○○ 프로젝트 비하인드 스토리", date: "2024.12.28" },
  { title: "검색 노출을 높이는 가장 확실한 SEO 기본 꿀팁", date: "2024.12.20" }
];

export default function Blog() {
  return (
    <section className={styles.section}>
      <div className="container">
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          블로그
        </motion.h2>

        <div className={styles.grid}>
          {posts.map((post, index) => (
            <motion.div
              key={index}
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={styles.thumb}>Post Thumb</div>
              <div className={styles.content}>
                <h3 className={styles.postTitle}>{post.title}</h3>
                <span className={styles.date}>{post.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
