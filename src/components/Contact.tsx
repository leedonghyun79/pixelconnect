'use client';
import { motion } from 'framer-motion';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Contact <br /> Us
          </motion.h2>
          <motion.p
            className={styles.desc}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            함께 더 좋은 가치를 만들고 싶습니다. <br />
            프로젝트에 대해 고민 중이시라면 편하게 이야기해주세요.
          </motion.p>

          <div className={styles.process}>
            <div className={styles.step}>
              <span className={styles.stepNumber}>01. Contact</span>
              <span className={styles.stepText}>24시간 이내 회신</span>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNumber}>02. Consulting</span>
              <span className={styles.stepText}>상세 분석 및 제안</span>
            </div>
          </div>
        </div>

        <motion.div
          className={styles.formWrapper}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <form className={styles.form}>
            <div className={styles.inputGroup}>
              <input type="text" placeholder="이름" className={styles.input} />
              <input type="email" placeholder="이메일" className={styles.input} />
            </div>
            <div className={styles.inputGroup}>
              <select className={styles.select}>
                <option value="">필요한 서비스 선택</option>
                <option value="web">웹사이트 제작</option>
                <option value="ecommerce">쇼핑몰 구축</option>
                <option value="maintenance">안심 유지보수</option>
              </select>
              <select className={styles.select}>
                <option value="">예산 범위 선택</option>
                <option value="300">300만원대~</option>
                <option value="500">500만원대~</option>
                <option value="1000">1000만원대 이상</option>
              </select>
            </div>
            <textarea placeholder="프로젝트에 대해 설명해주세요" className={styles.textarea}></textarea>
            <button type="submit" className={styles.submitBtn}>Submit Request</button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
