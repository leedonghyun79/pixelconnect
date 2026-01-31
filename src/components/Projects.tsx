'use client';
import { motion } from 'framer-motion';
import styles from './Projects.module.css';

const projects = [
  {
    title: '글로벌 제조기업 공식 홈페이지 리뉴얼',
    desc: 'B2B 문의 건수 월 3건 → 15건 (500% 증가), 모바일 최적화로 이탈률 40% 감소',
    tags: ['문의 500% 상승', '이탈률 40% 감소'],
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    title: '프리미엄 패션 브랜드 D2C 자사몰',
    desc: '월 거래액 3억 달성, 구매 전환율 2.4% → 4.8%로 개선 (단순 리뉴얼이 아닌 매출 데이터 기반 설계)',
    tags: ['월 거래액 3억', '전환율 2배 개선'],
    color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)'
  },
  {
    title: '교육 플랫폼 UI/UX 고도화',
    desc: '회원 가입률 150% 증가, 직관적인 대시보드로 사용자 만족도 98% 기록',
    tags: ['가입률 150% 증가', '만족도 98%'],
    color: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)'
  }
];

export default function Projects() {
  return (
    <section id="portfolio" className={styles.section}>
      <div className={styles.header}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          Selected Works
        </motion.h2>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          데이터와 직관을 결합한 디지털 솔루션
        </motion.p>
      </div>

      <div className={styles.grid}>
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className={styles.card}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className={styles.imageContent}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <p className={styles.projectDesc}>{project.desc}</p>
                <div className={styles.tags}>
                  {project.tags.map(tag => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
