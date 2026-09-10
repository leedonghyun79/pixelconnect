import { fetchColumns } from '@/lib/columns';

const SITE = 'https://pixelconnect.co.kr';

// connectivity API 를 60초 캐시로 감싸는 fetchColumns 를 그대로 쓰되,
// 라우트 자체도 15분마다 재생성해 부하를 줄인다.
export const revalidate = 900;

function esc(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const columns = await fetchColumns();
  const updated = columns[0]?.publishedAt
    ? new Date(columns[0].publishedAt)
    : new Date();

  const items = columns
    .map((c) => {
      const url = `${SITE}/column/${c.id}`;
      return `    <item>
      <title>${esc(c.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <category>${esc(c.category)}</category>
      <pubDate>${new Date(c.publishedAt).toUTCString()}</pubDate>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>픽셀커넥트 칼럼</title>
    <link>${SITE}/column</link>
    <description>홈페이지 제작·운영 웹에이전시 픽셀커넥트가 발행하는 칼럼</description>
    <language>ko-KR</language>
    <lastBuildDate>${updated.toUTCString()}</lastBuildDate>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
