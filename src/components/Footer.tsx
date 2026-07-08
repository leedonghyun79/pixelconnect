'use client';
import Link from 'next/link';
import styles from './Footer.module.css';

const menuLinks = [
  { href: '/services', label: '서비스' },
  { href: '/portfolio', label: '포트폴리오' },
  { href: '/column', label: '칼럼' },
  { href: '/reviews', label: '고객후기' },
  { href: '/contact', label: '문의' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Top row */}
        <div className={styles.top}>
          {/* Logo + Business Info */}
          <div className={styles.logoCol}>
            <Link href="/" className={styles.logo}>
              <img src="/images/logo.png" alt="" className={styles.logoImage} />
              PIXEL CONNECT
            </Link>
            <div className={styles.bizInfo}>
              <p>대표: 이동현</p>
              <p>사업자등록번호: 000-00-00000</p>
              <p>경기도 부천시</p>
            </div>
          </div>

          {/* Menu Links */}
          <div className={styles.menuCol}>
            <span className={styles.menuTitle}>Menu</span>
            {menuLinks.map(item => (
              <Link key={item.href} href={item.href} className={styles.menuLink}>{item.label}</Link>
            ))}
          </div>

          {/* Contact */}
          <div className={styles.contactCol}>
            <span className={styles.menuTitle}>Contact</span>
            <span className={styles.contactItem}>hello@pixelconnect.co.kr</span>
            <span className={styles.contactItem}>010-0000-0000</span>
            <div className={styles.social}>
              <Link href="#" className={styles.socialLink}>Instagram</Link>
              <Link href="#" className={styles.socialLink}>KakaoTalk</Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className={styles.bottom}>
          <p>Copyright © 2025 Pixel Connect</p>
        </div>
      </div>
    </footer>
  );
}
