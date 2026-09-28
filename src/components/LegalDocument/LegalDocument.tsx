import styles from './LegalDocument.module.css';

// 이용약관·개인정보처리방침 페이지 본문 래퍼
export default function LegalDocument({ children }: { children: React.ReactNode }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <article className={styles.doc}>{children}</article>
      </div>
    </section>
  );
}
