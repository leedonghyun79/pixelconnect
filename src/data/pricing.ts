// 요금제 — 화면(Pricing)과 서비스 페이지 Offer JSON-LD 가 같은 데이터를 쓴다.
// 가격 변경 시 public/llms.txt 도 함께 수정할 것.
export interface PricingPlan {
  label: string;
  tier: string;
  name: string;
  /** 시작가(원). null 이면 문의 후 견적 */
  price: number | null;
  popular: boolean;
  /** 페이지 구성 */
  pages: string;
  /** 이전 플랜의 모든 제공 범위를 포함할 때, 그 플랜 이름 (화면에는 "○○ 포함"으로 한 줄만 보여준다) */
  includes?: string;
  /** 제공 범위 — includes 가 있으면 이 플랜에서 새로 더해지는 항목만 적는다 */
  features: { text: string; highlight: boolean }[];
  duration: string;
  /** 수정 횟수 */
  revisions: string;
  cta: string;
}

export const plans: PricingPlan[] = [
  {
    label: '단일 페이지 최적화',
    tier: 'STANDARD',
    name: 'STANDARD',
    price: 700000,
    popular: false,
    pages: '메인 1p (최대 6섹션)',
    features: [
      { text: '반응형', highlight: false },
      { text: '템플릿 기반 커스텀', highlight: false },
      { text: '기본 SEO 세팅', highlight: false },
      { text: '도메인 연동', highlight: false },
      { text: '파비콘 · OG 이미지 제작', highlight: false },
    ],
    duration: '작업일 10일',
    revisions: '3회',
    cta: '문의하기',
  },
  {
    label: '기업 홈페이지 최적화',
    tier: 'DELUXE',
    name: 'DELUXE',
    price: 1500000,
    popular: true,
    pages: '멀티페이지 (3~5p)',
    includes: 'STANDARD',
    features: [
      { text: '브랜드 맞춤 디자인', highlight: false },
      { text: '관리자 페이지', highlight: false },
      { text: '알림톡/카톡 연동 옵션', highlight: false },
    ],
    duration: '작업일 3~4주',
    revisions: '3회',
    cta: '문의하기',
  },
  {
    label: '종합 웹사이트 최적화',
    tier: 'PREMIUM',
    name: 'PREMIUM',
    price: 2000000,
    popular: false,
    pages: '메인 1p + 서브 10p',
    includes: 'DELUXE',
    features: [
      { text: '브랜드 맞춤 기획 · 디자인', highlight: false },
      { text: '방문자 분석(GA4) 설정', highlight: false },
    ],
    duration: '작업일 4~5주',
    revisions: '무제한',
    cta: '문의하기',
  },
  {
    label: '맞춤형 솔루션 구축',
    tier: 'CUSTOM',
    name: 'CUSTOM',
    price: null,
    popular: false,
    pages: '맞춤 풀스택 개발',
    features: [
      { text: 'DB/API 연동', highlight: false },
      { text: '커스텀 관리자페이지', highlight: false },
      { text: '유지보수 별도 협의', highlight: false },
      { text: '전담 대응', highlight: false },
    ],
    duration: '협의 후 결정',
    revisions: '무제한',
    cta: '문의하기',
  },
];

/** includes 체인을 따라 이전 플랜 항목까지 펼친 전체 제공 범위 (구조화 데이터용) */
export function resolveFeatures(plan: PricingPlan): string[] {
  const inherited = plan.includes
    ? resolveFeatures(plans.find(p => p.name === plan.includes) as PricingPlan)
    : [];
  return [...inherited, ...plan.features.map(f => f.text)];
}

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
      description: [p.pages, ...resolveFeatures(p), `수정 ${p.revisions}`].join(', '),
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
