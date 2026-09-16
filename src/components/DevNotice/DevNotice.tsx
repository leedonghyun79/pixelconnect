import styles from './DevNotice.module.css';

export default function DevNotice() {
  return (
    <div
      role="status"
      aria-label="제작 중인 사이트입니다"
      className={styles.notice}
    >
      <span aria-hidden="true">🚧</span>
      현재 제작 중인 사이트입니다 · 내용이 실제와 다를 수 있습니다
    </div>
  );
}
