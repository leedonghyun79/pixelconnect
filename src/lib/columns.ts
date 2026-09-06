// connectivity 어드민의 공개 API에서 발행된 칼럼을 가져온다.
// pixelconnect는 DB를 두지 않고 표시만 담당.

const BASE = (
  process.env.CONNECTIVITY_API_URL || 'http://localhost:3001'
).replace(/\/$/, '');

export interface ColumnListItem {
  id: string;
  title: string;
  category: string;
  thumbnail: string | null;
  publishedAt: string; // ISO
}

export interface ColumnDetail extends ColumnListItem {
  contentHtml: string;
}

// 60초 ISR 캐시. connectivity가 잠깐 죽어도 캐시된 응답으로 버틴다.
const revalidate = { next: { revalidate: 60 } } as const;

export async function fetchColumns(): Promise<ColumnListItem[]> {
  try {
    const res = await fetch(`${BASE}/api/public/columns`, revalidate);
    if (!res.ok) return [];
    return (await res.json()) as ColumnListItem[];
  } catch {
    return [];
  }
}

export async function fetchColumn(id: string): Promise<ColumnDetail | null> {
  try {
    const res = await fetch(
      `${BASE}/api/public/columns/${encodeURIComponent(id)}`,
      revalidate
    );
    if (!res.ok) return null;
    return (await res.json()) as ColumnDetail;
  } catch {
    return null;
  }
}
