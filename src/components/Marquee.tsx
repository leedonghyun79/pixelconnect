import styles from './Marquee.module.css';

const items = [
  'Web Design', 'UI/UX Design', 'Motion Design', 'Brand Identity',
  'Frontend Dev', 'E-Commerce', 'SEO', 'Maintenance',
];

export default function Marquee() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.track}>
        {[...items, ...items].map((item, i) => (
          <div key={i} className={styles.item}>
            {item} <span className={styles.star}>★</span>
          </div>
        ))}
      </div>
    </div>
  );
}
