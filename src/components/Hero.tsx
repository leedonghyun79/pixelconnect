'use client';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Hero.module.css';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textLeftRef = useRef<HTMLSpanElement>(null);
  const textCenterRef = useRef<HTMLSpanElement>(null);
  const textRightRef = useRef<HTMLSpanElement>(null);
  const subContentRef = useRef<HTMLDivElement>(null);
  const gradientBgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Intro Animation
      const tl = gsap.timeline();

      tl.fromTo(
        [textLeftRef.current, textCenterRef.current, textRightRef.current],
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: "power4.out", stagger: 0.1 }
      )
        .fromTo(
          subContentRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
          "-=1"
        );

      // Merged Scroll Animation for better control
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        defaults: { ease: "none" }
      });

      mainTl.to(textLeftRef.current, { xPercent: -20 }, 0)
        .to(textCenterRef.current, { xPercent: 10 }, 0)
        .to(textRightRef.current, { xPercent: 20 }, 0)
        .to(subContentRef.current, {
          opacity: 0,
          y: -50,
          duration: 0.4
        }, 0);

      // Separate Background transition starting from 50% scroll for '스르륵' smooth fade
      gsap.to(gradientBgRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "center top", // Start when hero's center reaches viewport top
          end: "bottom top",
          scrub: true,
        },
        opacity: 0,
        ease: "none"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={containerRef}>
      <div className={styles.gradientBg} ref={gradientBgRef} />
      <video
        autoPlay
        loop
        muted
        playsInline
        className={styles.videoBackground}
      >
        <source src="https://player.vimeo.com/external/394747443.sd.mp4?s=bc653b64c8f94d9b4b097871e466380ccea20302&profile_id=165&oauth2_token_id=57447761" type="video/mp4" />
      </video>
      <div className={styles.overlay} />
      <div className={styles.container}>
        <div className={styles.revealerText} style={{ flexDirection: 'column', gap: '0' }}>
          <span className={styles.bigText} ref={textLeftRef} style={{ fontSize: 'clamp(3rem, 10vw, 7.5rem)', lineHeight: 0.9 }}>STRATEGIC</span>
          <span className={styles.bigText} ref={textCenterRef} style={{ fontSize: 'clamp(3rem, 10vw, 7.5rem)', lineHeight: 0.9 }}>REFINED</span>
          <span className={`${styles.bigText} ${styles.bigTextGradient}`} ref={textRightRef} style={{ fontSize: 'clamp(3rem, 10vw, 7.5rem)', lineHeight: 0.9 }}>IMPACTFUL</span>
        </div>

        <div ref={subContentRef} style={{ textAlign: 'left' }}>
          <p className={styles.subText} style={{ fontWeight: 500 }}>
            탄탄한 설계와 스토리로 비즈니스의 본질을 담습니다.<br />
            예산에 맞는 최적의 기술 선택을 제안합니다.
          </p>

          <div className={styles.actions} style={{ justifyContent: 'flex-start' }}>
            <Link href="/contact" className={styles.primaryBtn}>
              새 프로젝트 시작하기
            </Link>
            <Link href="/projects" className={styles.secondaryBtn}>
              포트폴리오 보기
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
