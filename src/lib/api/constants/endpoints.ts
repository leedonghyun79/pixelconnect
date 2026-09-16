// connectivity 공개 API 엔드포인트 경로. URL이 바뀌면 여기만 수정하면 됨.
export const ENDPOINTS = {
  columns: '/api/public/columns',
  column: (id: string) => `/api/public/columns/${encodeURIComponent(id)}`,
  inquiries: '/api/public/inquiries',
} as const;
