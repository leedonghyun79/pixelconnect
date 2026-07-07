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

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    // 3D 웨이브 높이 함수
    const waveAt = (u: number, v: number, t: number): number =>
      Math.sin(u * Math.PI * 3.2 + t * 0.65 + v * 1.4) * 0.38 +
      Math.sin(u * Math.PI * 1.7 - t * 0.50 + v * 2.3) * 0.22 +
      Math.sin(u * Math.PI * 5.1 + t * 0.90 - v * 0.7) * 0.10 +
      Math.sin(v * Math.PI * 1.8 + t * 0.38)            * 0.14;

    const ROWS = 55;  // 깊이 분할 (앞→뒤)
    const COLS = 120; // 가로 분할

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

        // 원근 스케일 (뒤=작음, 앞=큼)
        const scale0 = 0.25 + v0 * 0.75;
        const scale1 = 0.25 + v1 * 0.75;

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

          // 색상: 음수=짙은 네이비, 양수=파랑/보라 하이라이트
          const r = Math.floor(4  + norm * 28);
          const g = Math.floor(6  + norm * 38);
          const b = Math.floor(28 + norm * 140);
          const a = (0.18 + v1 * 0.55) * (0.5 + norm * 0.5);

          ctx.beginPath();
          ctx.moveTo(x00, y00);
          ctx.lineTo(x10, y10);
          ctx.lineTo(x11, y11);
          ctx.lineTo(x01, y01);
          ctx.closePath();
          ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
          ctx.fill();
        }

        // 각 행에 라인 오버레이 (윤곽선 느낌)
        ctx.beginPath();
        for (let col = 0; col <= COLS; col++) {
          const u = col / COLS;
          const w = waveAt(u, v1, time);
          const x = W * 0.5 + (u - 0.5) * W * scale1 * 1.3;
          const y = baseY1 + w * amplitude * scale1;
          col === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        const lineAlpha = 0.04 + v1 * 0.16;
        ctx.strokeStyle = `rgba(80,140,255,${lineAlpha})`;
        ctx.lineWidth   = 0.4 + v1 * 0.8;
        ctx.stroke();
      }

      time += 0.007;
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    draw();

    return () => {
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
