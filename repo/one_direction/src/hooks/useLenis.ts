import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';

export default function useLenis() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Add lenis class to html
    document.documentElement.classList.add('lenis');

    // GSAP integration
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync with GSAP ScrollTrigger
    lenis.on('scroll', () => {
      gsap.ticker.tick();
    });

    return () => {
      lenis.destroy();
      document.documentElement.classList.remove('lenis');
    };
  }, []);
}
