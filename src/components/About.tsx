'use client';
import { motion } from 'framer-motion';
import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.header}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Better <br /> Experience
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <p className={styles.description}>
            좋은 가치를 가진 제품이 온라인에서 제대로 표현되지 못해 성장의 기회를 놓치는 수많은 파트너들을 보았습니다.
            우리는 단순히 코드를 짜는 개발자가 아닙니다. 비즈니스의 고민을 함께 나누고, 기술로 그 가치를 증명하는 파트너입니다.
          </p>
          <div className={styles.missionBox}>
            Mission: 기술로 비즈니스 가치 창출
          </div>
        </motion.div>
      </div>

      <div className={styles.valuesGrid}>
        {['Strategy', 'Design', 'Technology', 'Growth'].map((value, index) => (
          <motion.div
            key={index}
            className={styles.valueCard}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            {value}
            <span style={{ fontSize: '1rem', opacity: 0.3 }}>0{index + 1}</span>
          </motion.div>
        ))}
      </div>

      <div className={styles.teamGrid}>
        {[
          { name: 'KIM MINSOO', role: 'CEO / CREATIVE DIRECTOR', desc: '10년차 이상의 웹 비즈니스 경험을 바탕으로 전략적 방향을 제시합니다.' },
          { name: 'LEE JIYOUNG', role: 'LEAD DEVELOPER', desc: '견고한 아키텍처와 최신 기술 스택으로 비즈니스 로직을 구현합니다.' },
          { name: 'PARK JUNHO', role: 'UIUX DESIGNER', desc: '사용자 중심의 경험 설계로 브랜드의 호감도를 높입니다.' }
        ].map((member, index) => (
          <motion.div
            key={index}
            className={styles.teamCard}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <span className={styles.teamRole}>{member.role}</span>
            <span className={styles.teamName}>{member.name}</span>
            <p className={styles.teamDesc}>{member.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className={styles.statsGrid}>
        {[
          { label: 'Completed Projects', value: '150+' },
          { label: 'Happy Clients', value: '80+' },
          { label: 'Years Experience', value: '10+' },
          { label: 'Design Awards', value: '12' }
        ].map((stat, index) => (
          <div key={index} className={styles.statItem}>
            <span className={styles.statNumber}>{stat.value}</span>
            <span className={styles.statLabel}>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
