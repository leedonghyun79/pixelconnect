'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './Navbar.module.css';

const navLinks = [
  { href: '/services', label: '서비스' },
  { href: '/template', label: '템플릿', disabled: true },
  { href: '/portfolio', label: '포트폴리오' },
  { href: '/column', label: '칼럼' },
  { href: '/reviews', label: '고객후기' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <img src="/images/logo.png" alt="" className={styles.logoImage} />
          PIXEL CONNECT
        </Link>

        <ul className={styles.links}>
          {navLinks.map(link => (
            <li key={link.href}>
              {link.disabled ? (
                <span className={`${styles.link} ${styles.linkDisabled}`}>
                  {link.label}
                  <span className={styles.badge}>준비 중</span>
                </span>
              ) : (
                <Link
                  href={link.href}
                  className={`${styles.link} ${pathname === link.href ? styles.linkActive : ''}`}
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <Link href="/contact" className={styles.cta}>
          문의하기
        </Link>

        <button
          className={`${styles.menuBtn} ${menuOpen ? styles.menuBtnOpen : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        {navLinks.filter(l => !l.disabled).map(link => (
          <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
            {link.label}
          </Link>
        ))}
        <Link href="/contact" className={styles.mobileCta} onClick={() => setMenuOpen(false)}>
          문의하기
        </Link>
      </div>
    </nav>
  );
}
