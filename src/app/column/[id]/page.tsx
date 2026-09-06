import Link from 'next/link';
import styles from './detail.module.css';

// Mock data (In a real app, you'd fetch this based on params.id)
const MOCK_ARTICLE = {
  cat: '전환율 최적화',
  title: '랜딩페이지 전환율 3배 높이는 5가지 구조',
  date: '2025.04.20',
  content: `
    <p>광고비는 계속 나가는데 왜 문의가 없을까요? 많은 대표님들이 트래픽 부족을 원인으로 꼽지만, 진짜 문제는 랜딩페이지의 구조에 있는 경우가 90% 이상입니다.</p>
    <h2>1. 3초 안에 가치를 증명하는 첫 화면 (Hero Section)</h2>
    <p>방문자가 사이트에 접속하고 이탈하기까지 걸리는 시간은 단 3초입니다. 이 짧은 시간 안에 '내가 왜 이 서비스를 이용해야 하는가?'에 대한 답을 주어야 합니다. 직관적인 카피와 시각적 요소로 시선을 사로잡으세요.</p>
    <h2>2. 고객의 페인포인트(Pain Point) 건드리기</h2>
    <p>우리 서비스가 얼마나 좋은지 자랑하기 전에, 고객이 현재 겪고 있는 불편함에 공감해야 합니다. "이런 문제로 힘드셨죠?"라는 공감은 고객이 스크롤을 내리게 만드는 가장 강력한 무기입니다.</p>
    <h2>3. 압도적인 사회적 증거 (Social Proof)</h2>
    <p>고객은 판매자의 말보다 다른 구매자의 말을 10배 더 신뢰합니다. 실제 리뷰, 통계 수치, 언론 보도, 파트너사 로고 등을 적재적소에 배치하여 신뢰도를 높이세요.</p>
    <h2>4. 행동을 유도하는 명확한 CTA</h2>
    <p>결국 랜딩페이지의 목적은 '전환(문의/구매)'입니다. "더 알아보기" 같은 모호한 문구 대신 "무료 견적 받기", "1분 만에 상담 신청하기"와 같이 구체적이고 혜택 중심적인 CTA(Call To Action) 버튼을 배치하세요.</p>
    <h2>결론</h2>
    <p>랜딩페이지는 24시간 일하는 최고의 영업사원입니다. 위 5가지 구조만 제대로 적용해도 동일한 광고비로 2~3배 이상의 문의를 받을 수 있습니다. 지금 당장 자사의 랜딩페이지를 점검해보세요.</p>
  `,
};

export default function ColumnDetailPage({ params }: { params: { id: string } }) {
  return (
    <main className={styles.main}>
      <article className={styles.article}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.meta}>
            <span className={styles.cat}>{MOCK_ARTICLE.cat}</span>
            <span className={styles.date}>{MOCK_ARTICLE.date}</span>
          </div>
          <h1 className={styles.title}>{MOCK_ARTICLE.title}</h1>
        </header>

        {/* Thumbnail Placeholder */}
        <div className={styles.thumb}>
          <div className={styles.thumbInner} />
        </div>

        {/* Content */}
        <div 
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: MOCK_ARTICLE.content }}
        />

        {/* Footer CTA */}
        <div className={styles.footer}>
          <div className={styles.footerInner}>
            <h3>이 글이 도움이 되셨나요?</h3>
            <p>픽셀커넥트와 함께 성공적인 비즈니스를 시작해보세요.</p>
            <div className={styles.actions}>
              <Link href="/contact" className={styles.contactBtn}>프로젝트 문의하기</Link>
              <Link href="/column" className={styles.backBtn}>목록으로 돌아가기</Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
