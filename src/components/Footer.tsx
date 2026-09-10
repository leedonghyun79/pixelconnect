import Link from 'next/link';
import styles from './Footer.module.css';

const menuLinks = [
  { href: '/services', label: '서비스' },
  { href: '/portfolio', label: '포트폴리오' },
  { href: '/column', label: '칼럼' },
  { href: '/reviews', label: '고객후기' },
  { href: '/contact', label: '문의' },
];

const legalLinks = [
  { href: '/terms', label: '이용약관' },
  { href: '/privacy', label: '개인정보처리방침' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.inner}>
          {/* Left: 사업자 정보 + 저작권 */}
          <div className={styles.left}>
            <div className={styles.bizInfo}>
              <p className={styles.company}>PIXEL CONNECT(픽셀 커넥트)</p>
              <p>사업자등록번호: 516-73-00625</p>
              <p>주소: 경기도 부천시 원미구 상동로 79, 4층 404-39호(상동, 부천상동수석프라자)</p>
              <p>이메일 : ceo@pixelconnect.co.kr</p>
            </div>
            <p className={styles.copyright}>Copyright ⓒ 2025 픽셀커넥트 All rights reserved.</p>
          </div>

          {/* Right: 메뉴(나란히) + 약관 */}
          <div className={styles.right}>
            <nav className={styles.menu}>
              {menuLinks.map(item => (
                <Link key={item.href} href={item.href} className={styles.menuLink}>
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className={styles.legal}>
              {legalLinks.map((item, i) => (
                <span key={item.href} className={styles.legalItem}>
                  {i > 0 && <span className={styles.divider}>|</span>}
                  <Link href={item.href} className={styles.legalLink}>{item.label}</Link>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
