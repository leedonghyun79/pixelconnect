'use client';
import { useEffect, useState } from 'react';
import styles from './Cursor.module.css';

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = !!(
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'IMG' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('img') ||
        window.getComputedStyle(target).cursor === 'pointer'
      );

      setHovered(isInteractive);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <div
      className={`${styles.cursor} ${hovered ? styles.hovered : ''}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    />
  );
}
