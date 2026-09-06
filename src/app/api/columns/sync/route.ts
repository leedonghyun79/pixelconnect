import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { db } from '@/db';
import { columns } from '@/db/schema';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function authorized(req: NextRequest) {
  const secret = process.env.COLUMN_SYNC_SECRET;
  return !!secret && req.headers.get('x-sync-secret') === secret;
}

interface SyncBody {
  id?: unknown;
  title?: unknown;
  category?: unknown;
  contentHtml?: unknown;
  thumbnail?: unknown;
  publishedAt?: unknown;
}

// connectivity 어드민에서 칼럼 발행/수정 시 호출 → upsert
export async function POST(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  let body: SyncBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 });
  }

  const id = typeof body.id === 'string' ? body.id : '';
  const title = typeof body.title === 'string' ? body.title : '';
  const category = typeof body.category === 'string' ? body.category : '';
  const contentHtml = typeof body.contentHtml === 'string' ? body.contentHtml : '';
  const thumbnail = typeof body.thumbnail === 'string' && body.thumbnail ? body.thumbnail : null;
  const publishedAt = typeof body.publishedAt === 'string' ? new Date(body.publishedAt) : new Date();

  if (!id || !title || !category) {
    return NextResponse.json({ error: 'id, title, category are required' }, { status: 400 });
  }
  if (Number.isNaN(publishedAt.getTime())) {
    return NextResponse.json({ error: 'invalid publishedAt' }, { status: 400 });
  }

  const now = new Date();
  await db
    .insert(columns)
    .values({ id, title, category, contentHtml, thumbnail, publishedAt, createdAt: now, updatedAt: now })
    .onConflictDoUpdate({
      target: columns.id,
      set: { title, category, contentHtml, thumbnail, publishedAt, updatedAt: now },
    });

  revalidatePath('/column');
  revalidatePath(`/column/${id}`);
  return NextResponse.json({ ok: true });
}
