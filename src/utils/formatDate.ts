// ISO 날짜 문자열을 "26.09.17" 형식으로. 서버 실행 시간대와 무관하게
// 항상 한국 시간(KST) 기준으로 계산한다.
export function formatDate(iso: string): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Seoul',
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date(iso));

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  return `${get('year')}.${get('month')}.${get('day')}`;
}
