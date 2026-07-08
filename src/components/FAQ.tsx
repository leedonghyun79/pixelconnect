'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './FAQ.module.css';

const faqs = [
  {
    q: '제작 기간은 얼마나 걸리나요?',
    a: '플랜에 따라 영업일 기준 1주~4주입니다. 급한 건은 별도 협의도 가능합니다.',
  },
  {
    q: '자료 준비를 어떻게 해야 하나요?',
    a: '사이트맵 작성 후 이미지·텍스트를 전달해주시면 됩니다. 자료 준비 가이드를 별도로 제공해드립니다.',
  },
  {
    q: '수정 횟수에 제한이 있나요?',
    a: '무제한 수정이 가능합니다. 최종 확정 전까지 자유롭게 요청해주세요.',
  },
  {
    q: '제작 외 추가 비용이 있나요?',
    a: '호스팅·도메인 비용은 별도이며, 제작비 외 추가 비용은 발생하지 않습니다.',
  },
  {
    q: '유지보수는 어떻게 받을 수 있나요?',
    a: '플랜별 무상 기간 내 카카오톡·이메일로 요청해주시면 빠르게 처리해드립니다.',
  },
  {
    q: '무상 기간 이후에도 관리가 가능한가요?',
    a: '네, 유지보수 계약을 별도로 협의하실 수 있습니다.',
  },
  {
    q: '제작 후 직접 수정할 수 있나요?',
    a: '운영 가이드북을 제공해드리며, 아임웹 관리자 교육도 포함되어 있습니다.',
  },
];

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
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>FAQ</div>
          <h2 className="section-title" style={{ textAlign: 'center' }}>자주 묻는 질문</h2>
        </div>

        <div className={styles.list}>
          {faqs.map((item, i) => {
            const isOpen = openItems.includes(i);
            return (
              <div
                key={i}
                className={styles.item}
                onClick={() => toggleItem(i)}
              >
                <div className={styles.question}>
                  <span className={styles.questionText}>{item.q}</span>
                  <span className={styles.toggle}>{isOpen ? '−' : '+'}</span>
                </div>
                {isOpen && (
                  <div className={styles.answer}>{item.a}</div>
                )}
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
