export interface PortfolioProject {
  slug: string;
  title: string;
  category: string;
  img: string;
  images: string[];
  summary: string;
  overview: string;
  period: string;
  role: string;
  /** 실제 운영 중인 사이트 URL. 없으면 상세페이지에 "홈페이지 보기" 버튼이 표시되지 않음 */
  url?: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: 'novaint',
    title: 'NOVAINT 인테리어',
    category: '인테리어',
    img: '/portfolio_img/NOVAINT.webp',
    images: ['/portfolio_img/NOVAINT.webp'],
    summary: '공간의 완성도를 보여주는 인테리어 시공 브랜드 홈페이지.',
    overview:
      '시공 사례와 브랜드의 전문성을 한눈에 전달하는 데 집중한 인테리어 홈페이지입니다. 큰 이미지 중심 레이아웃으로 시공 퀄리티를 그대로 보여주고, 상담 문의로 자연스럽게 이어지도록 구성했습니다.',
    period: '2025',
    role: '기획 · 디자인 · 개발',
  },
  {
    slug: 'lineo',
    title: 'LINEO 기업 사이트',
    category: '기업 사이트',
    img: '/portfolio_img/기업사이트.webp',
    images: ['/portfolio_img/기업사이트.webp'],
    summary: '신뢰감 있는 첫인상이 필요한 기업을 위한 브랜드 사이트.',
    overview:
      '기업의 사업 영역과 비전을 명확하게 전달하는 것을 목표로 한 기업 홈페이지입니다. 정돈된 레이아웃과 톤으로 첫 방문에서부터 신뢰를 주고, 담당자 문의로 이어지는 흐름을 설계했습니다.',
    period: '2025',
    role: '기획 · 디자인 · 개발',
  },
  {
    slug: 'rieneo',
    title: '리엔오 자산관리',
    category: '금융 · 자산관리',
    img: '/portfolio_img/리엔오.webp',
    images: ['/portfolio_img/리엔오.webp'],
    summary: '전문성과 신뢰가 핵심인 자산관리 서비스 홈페이지.',
    overview:
      '금융·자산관리 서비스 특성상 방문자가 가장 먼저 확인하는 것은 신뢰성입니다. 전문성이 드러나는 톤앤매너와 명확한 정보 구조로, 상담 신청까지의 심리적 장벽을 낮추는 데 집중했습니다.',
    period: '2025',
    role: '기획 · 디자인 · 개발',
  },
  {
    slug: 'dreamdive',
    title: '드림다이브 스쿠버다이빙',
    category: '레저 · 스포츠',
    img: '/portfolio_img/드림다이브.webp',
    images: ['/portfolio_img/드림다이브.webp'],
    summary: '체험의 설렘을 그대로 전달하는 스쿠버다이빙 스쿨 홈페이지.',
    overview:
      '바닷속 체험이 주는 설렘과 전문 강사진의 신뢰도를 함께 전달하는 데 집중한 레저 브랜드 홈페이지입니다. 생생한 이미지와 프로그램 안내로 예약 문의까지 자연스럽게 연결됩니다.',
    period: '2025',
    role: '기획 · 디자인 · 개발',
  },
  {
    slug: 'protex',
    title: 'PROTEX 특수화물 운송',
    category: '물류 · 운송',
    img: '/portfolio_img/화물.webp',
    images: ['/portfolio_img/화물.webp'],
    summary: '전문성과 안전성을 강조한 특수화물 운송 기업 홈페이지.',
    overview:
      '일반 화물과 다른 특수화물 운송의 전문성을 강조해야 하는 프로젝트였습니다. 운송 역량과 안전 관리 체계를 명확히 전달해, 실무 담당자가 바로 견적 문의를 남길 수 있도록 설계했습니다.',
    period: '2025',
    role: '기획 · 디자인 · 개발',
  },
];

export function getPortfolioProject(slug: string) {
  return portfolioProjects.find(p => p.slug === slug);
}
