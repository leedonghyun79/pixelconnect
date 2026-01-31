'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './Pricing.module.css';

const plans = [
  {
    name: '기업 웹사이트 제작',
    price: '300만원대~',
    duration: '4~8주 소요',
    features: ['브랜드 본질을 담은 정보 구조화', '모바일 최적화 반응형 디자인', '직접 수정 가능한 관리자 페이지', '네이버/구글 검색 최적화(SEO)', '런칭 후 1개월 긴급 대응 무상 지원'],
    popular: true,
  },
  {
    name: '고도화 쇼핑몰 구축',
    price: '500만원대~',
    duration: '6~10주 소요',
    features: ['매출 데이터를 고려한 UI/UX 설계', '결제/배송 시스템 안정적 통합', '회원 유지를 위한 마케팅 도구', '오픈마켓(스마트스토어 등) 연동', '운영 효율을 높이는 관리자 기능'],
    popular: false,
  },
  {
    name: '안심 유지보수',
    price: '월 10만원대~',
    duration: '정기 점검',
    features: ['이미지/게시글 정기 업데이트', '오류 수정 및 최신 보안 패치', '호스팅/도메인 실시간 관리', '월간 방문자 및 운영 리포트', '작업 이력 기반 투명한 비용 청구'],
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className={styles.section}>
      <h2 className={styles.title}>Service Packages</h2>
      <div className={styles.grid}>
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            {plan.popular && <span className={styles.badge}>Most Popular</span>}
            <h3 className={styles.planName}>{plan.name}</h3>
            <div className={styles.info}>
              <div className={styles.price}>{plan.price}</div>
              <div className={styles.duration}>{plan.duration}</div>
              <ul className={styles.features}>
                {plan.features.map((feature) => (
                  <li key={feature} className={styles.feature}>
                    {feature}
                  </li>
                ))}
              </ul>
              <div>
                <Link href="/contact" className={styles.btn}>
                  Enquire Now
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
