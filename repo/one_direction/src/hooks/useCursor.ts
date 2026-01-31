import { useEffect } from 'react';
import gsap from 'gsap';

export default function useCursor() {
  useEffect(() => {
    const cursor = document.querySelector('.cursor') as HTMLElement;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let isHovering = false;

    // Create text container inside cursor
    const cursorTextContainer = document.createElement('div');
    cursorTextContainer.className = 'cursor-text-container';
    cursorTextContainer.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 1.2rem;
      font-weight: 500;
      text-align: center;
      pointer-events: none;
      line-height: 1.2;
      display: flex;
      gap: 0.1rem;
      flex-wrap: wrap;
      justify-content: center;
      max-width: 4rem;
    `;
    cursor.appendChild(cursorTextContainer);

    // Lerp (linear interpolation) for smooth following
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const target = e.target as HTMLElement;

      // Check if hovering over elements with data-cursor="scale" attribute
      const isInteractive = target.closest('[data-cursor="scale"]');

      if (isInteractive && !isHovering) {
        isHovering = true;

        // Scale up cursor
        gsap.to(cursor, {
          scale: 2,
          duration: 0.4,
          ease: 'power2.out',
        });
      } else if (!isInteractive && isHovering) {
        isHovering = false;

        // Scale down cursor
        gsap.to(cursor, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    // Animate cursor with smooth interpolation
    const animateCursor = () => {
      // Smooth interpolation factor (0.1 = slower, 0.3 = faster)
      const ease = 0.15;

      cursorX = lerp(cursorX, mouseX, ease);
      cursorY = lerp(cursorY, mouseY, ease);

      gsap.set(cursor, {
        x: cursorX,
        y: cursorY,
      });

      requestAnimationFrame(animateCursor);
    };

    // Show cursor on mouse move
    const showCursor = () => {
      gsap.to(cursor, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    // Hide cursor when leaving window
    const hideCursor = () => {
      gsap.to(cursor, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', showCursor, { once: true });
    window.addEventListener('mouseleave', hideCursor);

    // Start animation loop
    animateCursor();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', hideCursor);
      cursor.removeChild(cursorTextContainer);
    };
  }, []);
}
