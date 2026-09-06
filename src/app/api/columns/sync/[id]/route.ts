import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { columns } from '@/db/schema';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function authorized(req: NextRequest) {
  const secret = process.env.COLUMN_SYNC_SECRET;
  return !!secret && req.headers.get('x-sync-secret') === secret;
}

// connectivity에서 발행 취소 / 삭제 시 호출 → 행 삭제
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!authorized(req)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  await db.delete(columns).where(eq(columns.id, id));

  revalidatePath('/column');
  revalidatePath(`/column/${id}`);
  return NextResponse.json({ ok: true });
}
