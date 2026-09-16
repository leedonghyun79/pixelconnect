// connectivity 어드민 공개 API와 통신하는 공통 fetch.
// 서버(SSR/ISR)에서는 CONNECTIVITY_API_URL, 브라우저(클라이언트 컴포넌트)에서는
// NEXT_PUBLIC_CONNECTIVITY_API_URL을 쓰므로 실행 컨텍스트에 따라 base URL을 자동으로 고른다.

function resolveBaseUrl(): string {
  const url =
    typeof window === 'undefined'
      ? process.env.CONNECTIVITY_API_URL || 'http://localhost:3001'
      : process.env.NEXT_PUBLIC_CONNECTIVITY_API_URL || 'https://admin.pixelconnect.co.kr';
  return url.replace(/\/$/, '');
}

export async function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const base = resolveBaseUrl();
  return fetch(`${base}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
}
