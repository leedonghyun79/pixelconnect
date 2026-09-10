import type { MetadataRoute } from 'next';

const SITE = 'https://pixelconnect.co.kr';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // 검색결과에 노출될 필요 없는 경로만 차단
      disallow: ['/api/'],
    },
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
