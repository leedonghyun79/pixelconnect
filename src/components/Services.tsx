'use client';
import { motion } from 'framer-motion';
import styles from './Services.module.css';

const services = [
  {
    title: 'Web/Mobile',
    desc: 'B2B/B2C 서비스의 성격을 고려한 최적의 테크 스택 제안'
  },
  {
    title: 'E-Commerce',
    desc: '매출 데이터 기반의 UI/UX 설계와 안정적인 결제 솔루션 통합'
  },
  {
    title: 'Maintenance',
    desc: '운영 효율을 높이는 CMS 구축과 24시간 긴급 장애 대응 지원'
  },
  {
    title: 'Branding',
    desc: '디지털 환경에서의 일관된 브랜드 경험을 위한 아이덴티티 설계'
  }
];

export default function Services() {
  return (
    <section id="services" className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.intro}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.title}>What We Do</h2>
          <div className={styles.recommendGroup}>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <span className={styles.badge}>Startups</span>
              <span className={styles.badge}>Enterprise</span>
              <span className={styles.badge}>E-Commerce</span>
            </div>
          </div>
        </motion.div>

        <div className={styles.grid}>
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <div className={styles.serviceDesc}>
                {service.desc}
                <div style={{ marginTop: '10px', fontSize: '0.75rem', opacity: 0.5 }}>
                  * 프로젝트 범위에 따른 맞춤 견적 제안
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
