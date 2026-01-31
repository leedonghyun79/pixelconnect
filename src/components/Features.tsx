'use client';
import { motion } from 'framer-motion';
import { Code2, MonitorCheck, RefreshCcw, Rocket } from 'lucide-react';
import styles from './Features.module.css';

const features = [
  {
    icon: <Code2 size={40} />,
    title: '데이터 기반 기획',
    desc: '단순한 제작이 아닌, 목표 달성을 위한 전략적 설계로 비즈니스 성장을 이끕니다.'
  },
  {
    icon: <MonitorCheck size={40} />,
    title: '사용자 중심 UX',
    desc: '고객이 쉽고 편리하게 이용할 수 있는 직관적인 경험을 제공합니다.'
  },
  {
    icon: <Rocket size={40} />,
    title: '빠른 커뮤니케이션',
    desc: '프로젝트 진행 중 신속한 피드백과 대응으로 답답함 없는 협업을 약속합니다.'
  },
  {
    icon: <RefreshCcw size={40} />,
    title: '철저한 사후 관리',
    desc: '런칭이 끝이 아닙니다. 지속적인 운영 지원으로 비즈니스의 안정성을 지킵니다.'
  }
];

export default function Features() {
  return (
    <section id="features" style={{ padding: '150px 0', background: '#fff' }}>
      <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px' }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div style={{ marginBottom: '100px' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#999', marginBottom: '20px' }}>Our Strengths</h2>
            <p style={{ color: '#444', fontSize: '1.25rem', fontWeight: 500 }}>지속 가능한 비즈니스를 위한 4가지 약속</p>
          </div>

          <div className={styles.grid}>
            {features.map((f, i) => (
              <motion.div
                key={i}
                className={styles.card}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <h3 className={styles.title}>{f.title}</h3>
                <p className={styles.desc}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
