'use client';
import { useState, useEffect, useRef } from 'react';
import { faqs } from '@/data/faq';
import styles from './FAQ.module.css';
import WaveText from '@/components/common/WaveText/WaveText';

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { 
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        } else {
          e.target.classList.remove('visible');
        }
      }),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="faq" className={styles.section}>
      <div ref={containerRef} className={`${styles.container} fade-up`}>
        <div className={styles.header}>
          <div className={`section-eyebrow ${styles.eyebrowCenter}`}>FAQ</div>
          <WaveText className={`section-title ${styles.titleCenter}`}>자주 묻는 질문</WaveText>
        </div>

        <div className={styles.list}>
          {faqs.map((item, i) => {
            const isOpen = openItems.includes(i);
            return (
              <div
                key={i}
                className={`${styles.item} ${isOpen ? styles.open : ''}`}
                onClick={() => toggleItem(i)}
              >
                <div className={styles.question}>
                  <span className={styles.questionText}>{item.q}</span>
                  <span className={styles.toggle}>+</span>
                </div>
                <div className={`${styles.answerWrapper} ${isOpen ? styles.open : ''}`}>
                  <div className={styles.answerInner}>
                    <div className={styles.answerContent}>{item.a}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.bottomCta}>
          더 궁금한 점이 있으신가요?
          <a href="#contact" className={styles.bottomCtaLink}>문의하기 →</a>
        </div>
      </div>
    </section>
  );
}
