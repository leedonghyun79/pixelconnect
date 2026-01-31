'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          WEB AGENCY
        </Link>
        <div className={styles.links}>
          <Link href="/about" className={styles.link}>회사소개</Link>
          <Link href="/services" className={styles.link}>서비스</Link>
          <Link href="/projects" className={styles.link}>프로젝트</Link>
          <Link href="/faq" className={styles.link}>FAQ</Link>
          <Link href="/blog" className={styles.link}>블로그</Link>
        </div>
        <Link href="/contact" className={styles.btn}>
          문의하기
        </Link>
      </div>
    </nav>
  );
}
