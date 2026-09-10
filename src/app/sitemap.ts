import type { MetadataRoute } from 'next';
import { fetchColumns } from '@/lib/columns';

const SITE = 'https://pixelconnect.co.kr';

// 정적 라우트. priority 는 홈 > 서비스/포트폴리오 > 나머지 순.
const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/portfolio', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/column', priority: 0.8, changeFrequency: 'daily' },
  { path: '/reviews', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/contact', priority: 0.6, changeFrequency: 'monthly' },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${SITE}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // connectivity API 에서 발행된 칼럼. API 가 죽어도 fetchColumns 가 [] 를 돌려주므로
  // 최소한 정적 라우트만이라도 담긴 sitemap 이 나간다.
  const columns = await fetchColumns();
  const columnPages: MetadataRoute.Sitemap = columns.map((c) => ({
    url: `${SITE}/column/${c.id}`,
    lastModified: c.publishedAt ? new Date(c.publishedAt) : now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...pages, ...columnPages];
}
