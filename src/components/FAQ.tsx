'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './FAQ.module.css';

const faqs = [
  {
    category: "견적/비용",
    items: [
      { q: "견적은 어떻게 산정되나요?", a: "기획의 깊이, 페이지 수, 구현 기능의 난이도를 종합하여 합리적으로 산정합니다. 무료 상담 후 24시간 이내에 항목별로 상세히 정리된 견적서를 보내드립니다." },
      { q: "결제는 어떻게 하나요?", a: "프로젝트 단계별로(계약금·중도금·잔금) 분할 납부하실 수 있습니다. 장기적인 파트너십을 원하시는 경우 월 구독 형태의 유지보수 통합 모델도 선택 가능합니다." }
    ]
  },
  {
    category: "일정/프로세스",
    items: [
      { q: "제작 기간은 얼마나 걸리나요?", a: "일반적인 기업 웹사이트는 4~8주, 다국어 또는 고도화된 기능이 포함된 사이트는 8~12주 정도 소요됩니다. 퀄리티를 유지하면서도 일정에 차질이 없도록 주간 보고를 통해 진척 상황을 투명하게 공유합니다." },
      { q: "급하게 필요한데 가능한가요?", a: "네, 가능합니다. 일정에 맞춰 우선 순위가 높은 핵심 기능을 먼저 런칭하고, 이후 순차적으로 업데이트하는 MVP 제작 방식을 제안해드립니다. 상담 시 일정을 말씀해주시면 최대한 조율해보겠습니다." }
    ]
  },
  {
    category: "유지보수",
    items: [
      { q: "제작 후에도 관리가 되나요?", a: "네, 당연합니다. 제작 완료 후에도 1개월간 긴급 오류 수정 및 가벼운 텍스트 변경은 무상으로 지원하며, 월 리포트가 포함된 정기 유지보수 계약을 통해 안정적인 운영을 도와드립니다." },
      { q: "직접 수정할 수 있나요?", a: "네, 직접 관리하실 수 있도록 사용하기 쉬운 관리자 페이지(CMS)를 구축해드립니다. 텍스트, 이미지 교체 및 게시물 등록 방법이 담긴 맞춤형 매뉴얼과 영상 가이드를 함께 제공합니다." }
    ]
  }
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const allItems = faqs.flatMap(cat => cat.items);

  return (
    <section id="faq" className={styles.section}>
      <div className={styles.container}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Frequently Asked Questions
        </motion.h2>

        {faqs.map((category, catIndex) => (
          <div key={catIndex} className={styles.category}>
            <span className={styles.categoryTitle}>{category.category}</span>
            <div>
              {category.items.map((item, itemIndex) => {
                const globalIndex = catIndex * 100 + itemIndex;
                const isOpen = openItems.includes(globalIndex);
                return (
                  <motion.div
                    key={itemIndex}
                    className={styles.item}
                    onClick={() => toggleItem(globalIndex)}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    <div className={styles.question}>
                      {item.q}
                      <span style={{ fontSize: '1.5rem', fontWeight: 300 }}>{isOpen ? '−' : '+'}</span>
                    </div>
                    {isOpen && (
                      <motion.div
                        className={styles.answer}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                      >
                        {item.a}
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
