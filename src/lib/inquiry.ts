// 상담 폼 제출을 connectivity 공개 API 로 보낸다. (클라이언트에서 호출 → NEXT_PUBLIC_ 필요)

const API = (
  process.env.NEXT_PUBLIC_CONNECTIVITY_API_URL || 'https://admin.pixelconnect.co.kr'
).replace(/\/$/, '');

export interface InquiryPayload {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  turnstileToken: string;
  company?: string; // 허니팟
}

export async function submitInquiry(
  payload: InquiryPayload,
): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(`${API}/api/public/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
    if (!res.ok || !data.ok) {
      return { ok: false, error: data.error || '문의 전송에 실패했습니다.' };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: '네트워크 오류로 전송하지 못했습니다.' };
  }
}
