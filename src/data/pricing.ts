// 요금제 — 화면(Pricing)과 서비스 페이지 Offer JSON-LD 가 같은 데이터를 쓴다.
// 가격 변경 시 public/llms.txt 도 함께 수정할 것.
export interface PricingPlan {
  label: string;
  tier: string;
  name: string;
  /** 시작가(원). null 이면 문의 후 견적 */
  price: number | null;
  popular: boolean;
  popLabel?: string;
  /** 페이지 구성 */
  pages: string;
  /** 제공 범위 */
  features: { text: string; highlight: boolean }[];
  duration: string;
  cta: string;
}

export const plans: PricingPlan[] = [
  {
    label: '단일 페이지 최적화',
    tier: 'STARTER',
    name: '스타터',
    price: 1000000,
    popular: false,
    pages: '메인 1p (최대 6섹션)',
    features: [
      { text: '반응형', highlight: false },
      { text: '템플릿 기반 커스텀', highlight: false },
      { text: '기본 SEO 세팅', highlight: false },
    ],
    duration: '작업일 1~2주',
    cta: '문의하기',
  },
  {
    label: '기업 홈페이지 최적화',
    tier: 'STANDARD',
    name: '스탠다드',
    price: 2000000,
    popular: true,
    popLabel: 'RECOMMENDED',
    pages: '멀티페이지 (3~5p)',
    features: [
      { text: '반응형 + 관리자 문의함', highlight: false },
      { text: 'GSAP 애니메이션', highlight: true },
      { text: 'GA4 연동', highlight: false },
      { text: '알림톡/카톡 연동 옵션', highlight: false },
    ],
    duration: '작업일 2~3주',
    cta: '문의하기',
  },
  {
    label: '맞춤형 솔루션 구축',
    tier: 'CUSTOM',
    name: '커스텀',
    price: null,
    popular: false,
    pages: '맞춤 풀스택 개발',
    features: [
      { text: 'DB/API 연동', highlight: false },
      { text: '커스텀 관리자페이지', highlight: false },
      { text: '유지보수 별도 협의', highlight: false },
      { text: '전담 대응', highlight: false },
    ],
    duration: '별도 협의',
    cta: '문의하기',
  },
];

export const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: '홈페이지 제작',
  serviceType: '홈페이지 제작',
  url: 'https://pixelconnect.co.kr/services',
  provider: { '@id': 'https://pixelconnect.co.kr/#organization' },
  areaServed: { '@type': 'Country', name: '대한민국' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: '홈페이지 제작 요금제',
    itemListElement: plans.map(p => ({
      '@type': 'Offer',
      name: `${p.name} — ${p.label}`,
      description: [p.pages, ...p.features.map(f => f.text)].join(', '),
      ...(p.price !== null && {
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: p.price,
          priceCurrency: 'KRW',
        },
      }),
    })),
  },
};
