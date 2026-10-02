// connectivity 어드민의 공개 API에서 발행된 칼럼을 가져온다.
// pixelconnect는 DB를 두지 않고 표시만 담당.

import { apiFetch } from './client';
import { ENDPOINTS } from './constants/endpoints';

export interface ColumnListItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string; // SEO meta description. connectivity가 직접입력/본문자동요약 둘 다 처리해서 내려줌
  thumbnail: string | null;
  publishedAt: string; // ISO
}

export interface ColumnDetail extends ColumnListItem {
  contentHtml: string;
}

// 칼럼 캐시 태그. 어드민 저장/발행/삭제 시 /api/revalidate가 이 태그를 무효화한다.
export const COLUMNS_TAG = 'columns';

// 하루 ISR 캐시 + 태그 무효화. 평소엔 캐시로 빠르게 응답하고,
// connectivity가 잠깐 죽어도 캐시된 응답으로 버틴다. (갱신 신호를 놓쳐도 하루 안에는 반영)
const revalidate: RequestInit = { next: { revalidate: 86400, tags: [COLUMNS_TAG] } };

export async function fetchColumns(): Promise<ColumnListItem[]> {
  try {
    const res = await apiFetch(ENDPOINTS.columns, revalidate);
    if (!res.ok) return [];
    return (await res.json()) as ColumnListItem[];
  } catch {
    return [];
  }
}

export async function fetchColumn(id: string): Promise<ColumnDetail | null> {
  try {
    const res = await apiFetch(ENDPOINTS.column(id), revalidate);
    if (!res.ok) return null;
    return (await res.json()) as ColumnDetail;
  } catch {
    return null;
  }
}
