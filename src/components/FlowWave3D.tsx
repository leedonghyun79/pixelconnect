'use client';
import { useEffect, useRef } from 'react';

export default function FlowWave3D({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let time = 0;
    let isVisible = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          draw();
        } else {
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );

    observer.observe(canvas);

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    // 3D 웨이브 높이 함수 (더 극적인 굴곡)
    const waveAt = (u: number, v: number, t: number): number =>
      Math.sin(u * Math.PI * 4.5 + t * 0.8 + v * 2.0) * 0.45 +
      Math.sin(u * Math.PI * 2.5 - t * 0.6 + v * 3.5) * 0.25 +
      Math.sin(u * Math.PI * 6.0 + t * 1.2 - v * 1.5) * 0.15 +
      Math.sin(v * Math.PI * 2.2 + t * 0.5)           * 0.15;

    const ROWS = 35;
    const COLS = 60;

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      // 원근 파라미터
      const horizonY  = H * 0.38;   // 소실점 Y 위치
      const frontY    = H * 0.95;   // 전경 Y 위치
      const amplitude = H * 0.22;   // 최대 웨이브 진폭

      // 뒤→앞 순서로 그려야 painter's algorithm 올바름
      for (let row = 0; row < ROWS; row++) {
        const v0 = row       / ROWS;
        const v1 = (row + 1) / ROWS;

        // 원근 스케일 (뒤=작음, 앞=큼) - 더 강한 원근감
        const scale0 = 0.15 + v0 * 0.85;
        const scale1 = 0.15 + v1 * 0.85;

        // 이 행의 기준 Y
        const baseY0 = horizonY + (frontY - horizonY) * v0;
        const baseY1 = horizonY + (frontY - horizonY) * v1;

        // 삼각 스트립 채우기
        for (let col = 0; col < COLS; col++) {
          const u0 = col       / COLS;
          const u1 = (col + 1) / COLS;

          const w00 = waveAt(u0, v0, time);
          const w10 = waveAt(u1, v0, time);
          const w01 = waveAt(u0, v1, time);
          const w11 = waveAt(u1, v1, time);

          // 화면 좌표 (원근 X: 중앙 기준으로 확장)
          const px = (u: number, scale: number) => W * 0.5 + (u - 0.5) * W * scale * 1.3;

          const x00 = px(u0, scale0); const y00 = baseY0 + w00 * amplitude * scale0;
          const x10 = px(u1, scale0); const y10 = baseY0 + w10 * amplitude * scale0;
          const x01 = px(u0, scale1); const y01 = baseY1 + w01 * amplitude * scale1;
          const x11 = px(u1, scale1); const y11 = baseY1 + w11 * amplitude * scale1;

          const avgW = (w00 + w10 + w01 + w11) * 0.25;
          const norm = (avgW + 1) * 0.5;    // 0~1

          // 색상: 다크 베이스 + 네온 글로우(Cyan/Purple)
          const r = Math.floor(5 + norm * 45);
          const g = Math.floor(5 + norm * 20);
          const b = Math.floor(25 + norm * 90);
          const a = (0.2 + v1 * 0.6) * (0.4 + norm * 0.6);

          ctx.beginPath();
          ctx.moveTo(x00, y00);
          ctx.lineTo(x10, y10);
          ctx.lineTo(x11, y11);
          ctx.lineTo(x01, y01);
          ctx.closePath();
          ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
          ctx.fill();
        }

        // 각 행에 가로 라인 오버레이 (밝은 네온 라인)
        ctx.beginPath();
        for (let col = 0; col <= COLS; col++) {
          const u = col / COLS;
          const w = waveAt(u, v1, time);
          const x = W * 0.5 + (u - 0.5) * W * scale1 * 1.3;
          const y = baseY1 + w * amplitude * scale1;
          col === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        
        // 원근에 따른 선명도 조절
        const lineNorm = (waveAt(0.5, v1, time) + 1) * 0.5; // 밝기 팩터
        const alpha = 0.1 + v1 * 0.5;
        
        // 형광 블루/퍼플 혼합
        const strokeR = Math.floor(64 + lineNorm * 120);
        const strokeG = Math.floor(112 + lineNorm * 80);
        const strokeB = 255;

        ctx.strokeStyle = `rgba(${strokeR}, ${strokeG}, ${strokeB}, ${alpha})`;
        ctx.lineWidth = 0.5 + v1 * 1.5;
        
        // 글로우 효과 (성능을 위해 shadowBlur 대신 strokeOpacity 조절)
        ctx.stroke();
      }

      time += 0.008;
      if (isVisible) {
        raf = requestAnimationFrame(draw);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    // draw() is started by the IntersectionObserver when visible

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  );
}
