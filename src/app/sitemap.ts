import type { MetadataRoute } from 'next';
import { fetchColumns } from '@/lib/api/columns';
import { portfolioProjects } from '@/data/portfolio';

const SITE = 'https://pixelconnect.co.kr';

// 정적 라우트. priority 는 홈 > 서비스/포트폴리오 > 나머지 순.
// lastModified 는 빌드 시각이 아니라 "페이지 내용을 실제로 바꾼 날" — 내용 수정 시 직접 갱신할 것.
// (전부 빌드 시각이면 검색엔진이 신선도 신호로 믿지 않는다)
const staticRoutes: { path: string; lastModified: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', lastModified: '2026-09-28', priority: 1, changeFrequency: 'weekly' },
  { path: '/services', lastModified: '2026-09-28', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/portfolio', lastModified: '2026-09-28', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/column', lastModified: '2026-09-28', priority: 0.8, changeFrequency: 'daily' },
  { path: '/reviews', lastModified: '2026-09-28', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/contact', lastModified: '2026-09-28', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/privacy', lastModified: '2026-09-28', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/terms', lastModified: '2026-09-28', priority: 0.2, changeFrequency: 'yearly' },
];

// 포트폴리오 상세 데이터(src/data/portfolio.ts)를 마지막으로 바꾼 날
const PORTFOLIO_LAST_MODIFIED = '2026-09-15';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${SITE}${r.path}`,
    lastModified: new Date(r.lastModified),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const portfolioPages: MetadataRoute.Sitemap = portfolioProjects.map((p) => ({
    url: `${SITE}/portfolio/${p.slug}`,
    lastModified: new Date(PORTFOLIO_LAST_MODIFIED),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // connectivity API 에서 발행된 칼럼. API 가 죽어도 fetchColumns 가 [] 를 돌려주므로
  // 최소한 정적 라우트만이라도 담긴 sitemap 이 나간다.
  const columns = await fetchColumns();
  const columnPages: MetadataRoute.Sitemap = columns.map((c) => ({
    url: `${SITE}/column/${c.id}`,
    lastModified: c.publishedAt ? new Date(c.publishedAt) : undefined,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...pages, ...portfolioPages, ...columnPages];
}
