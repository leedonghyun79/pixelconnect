import { timingSafeEqual } from 'node:crypto';
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import { COLUMNS_TAG } from '@/lib/api/columns';

// connectivity 어드민이 칼럼을 저장/발행/삭제할 때 호출하는 캐시 무효화 엔드포인트.
// 비밀키(REVALIDATE_SECRET)가 맞을 때만 동작한다.
function isValidSecret(received: string | null): boolean {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected || !received) return false;
  const a = Buffer.from(received);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(req: Request) {
  if (!isValidSecret(req.headers.get('x-revalidate-secret'))) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  // expire: 0 → 다음 요청이 옛날 캐시 없이 바로 새 데이터를 가져온다
  revalidateTag(COLUMNS_TAG, { expire: 0 });
  return NextResponse.json({ revalidated: true });
}
