'use client';
import { useRef, useEffect } from 'react';
import styles from './Contact.module.css';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className={`${styles.section} fade-up`}>
      <div className={styles.glow} />

      <div className={styles.container}>
        {/* CTA Block */}
        <div className={styles.ctaBlock}>
          <div className="section-label">Free Consultation</div>
          <h2 className={styles.ctaTitle}>
            <span className={styles.outlined}>READY TO</span>
            <br />
            <span className={styles.solid}>BUILD?</span>
          </h2>
          <a href="mailto:hello@pixelconnect.co.kr" className={styles.ctaBtn}>
            무료 상담 신청하기 →
          </a>
          <a href="mailto:hello@pixelconnect.co.kr" className={styles.ctaEmail}>
            hello@pixelconnect.co.kr
          </a>
          <div className={styles.microCopy}>
            평균 응답 시간 2시간 이내 · 상담은 무료입니다
          </div>
          <div className={styles.steps}>
            {['24시간 이내 회신', '무료 상담 진행', '맞춤 견적 제공'].map((s, i) => (
              <div key={i} className={styles.step}>
                <span className={styles.stepNum}>0{i + 1}.</span>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className={styles.formWrap}>
          <form className={styles.form} onSubmit={e => e.preventDefault()}>
            <div className={styles.row}>
              <input type="text" placeholder="이름" className={styles.input} />
              <input type="email" placeholder="이메일" className={styles.input} />
            </div>
            <div className={styles.row}>
              <select className={styles.select}>
                <option value="">필요한 서비스 선택</option>
                <option value="web">웹사이트 제작</option>
                <option value="ecommerce">쇼핑몰 구축</option>
                <option value="landing">랜딩페이지</option>
                <option value="maintenance">유지보수 & 운영</option>
              </select>
              <select className={styles.select}>
                <option value="">예산 범위 선택</option>
                <option value="300">300만원대 (스타터)</option>
                <option value="500">500만원대 (프로)</option>
                <option value="1000">1,000만원 이상 (프리미엄)</option>
              </select>
            </div>
            <textarea
              placeholder="프로젝트에 대해 자유롭게 설명해주세요"
              className={styles.textarea}
              rows={5}
            />
            <button type="submit" className={styles.submitBtn}>
              무료 상담 신청하기 →
            </button>
          </form>
          <p className={styles.formNote}>
            * 상담 신청 시 웹 제작 전략 가이드 PDF를 무료로 드립니다
          </p>
        </div>
      </div>
    </section>
  );
}
