'use client';
import { useEffect, useRef } from 'react';

interface Props {
  className?: string;
}

// 컬러 팔레트: center(흰색/하늘) → mid(파랑) → edge(보라/자주)
const PALETTE: [number, number, number][] = [
  [255, 255, 255], // 0 — 중심 흰색
  [210, 235, 255], // 1 — 하늘
  [150, 190, 255], // 2 — 연파랑
  [100, 130, 255], // 3 — 파랑
  [160,  80, 255], // 4 — 보라-파랑
  [200,  60, 255], // 5 — 밝은 바이올렛
  [220,  50, 220], // 6 — 핑크-바이올렛
];

function colorAt(pos: number): [number, number, number] {
  const idx = Math.min(pos, 0.9999) * (PALETTE.length - 1);
  const lo = Math.floor(idx);
  const hi = lo + 1;
  const f = idx - lo;
  return PALETTE[lo].map((v, i) => v + (PALETTE[hi][i] - v) * f) as [number, number, number];
}

export default function RibbonCanvas({ className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let time = 0;

    const LINES = 70;   // 리본 라인 수
    const SEGS  = 400;  // 경로 점 수 (부드러움)

    /* 캔버스 물리 크기 맞추기 */
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      const cy     = H * 0.5;
      const spread = H * 0.22; // 리본 두께 절반 (확장)

      for (let li = 0; li < LINES; li++) {
        const lineT      = li / (LINES - 1);             // 0→1
        const fromCenter = Math.abs(lineT - 0.5) * 2;    // 0=중심, 1=테두리
        const yOffset    = (lineT - 0.5) * spread * 2;

        const alpha   = Math.max(0, (1 - fromCenter * 1.05) * 0.85);
        if (alpha <= 0.01) continue;

        const lineWidth = (1 - fromCenter) * 3.5 + 0.4;

        const [r, g, b] = colorAt(fromCenter);
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${r | 0},${g | 0},${b | 0},${alpha})`;
        ctx.lineWidth   = lineWidth;

        for (let si = 0; si <= SEGS; si++) {
          const x  = (si / SEGS) * W;
          const nx = si / SEGS; // 0→1

          /* 복합 웨이브 — 자연스러운 S-커브 + 잔물결 */
          const wave =
            Math.sin(nx * Math.PI * 2.2 - time * 0.55) * 0.30 +
            Math.sin(nx * Math.PI * 3.8 - time * 0.85 + lineT * 0.5) * 0.06 +
            Math.sin(nx * Math.PI * 1.1 + time * 0.30) * 0.04;

          const y = cy + yOffset + wave * H * 0.40;

          if (si === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }

        ctx.stroke();
      }

      /* 중심 글로우 패스 (추가 발광감) */
      const glowLines = 8;
      for (let gi = 0; gi < glowLines; gi++) {
        const gT = gi / (glowLines - 1);
        const yOff = (gT - 0.5) * spread * 0.35;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(200,220,255,${0.22 - gi * 0.022})`;
        ctx.lineWidth   = 6 - gi * 0.6;

        for (let si = 0; si <= SEGS; si++) {
          const x  = (si / SEGS) * W;
          const nx = si / SEGS;
          const wave =
            Math.sin(nx * Math.PI * 2.2 - time * 0.55) * 0.30 +
            Math.sin(nx * Math.PI * 1.1 + time * 0.30) * 0.04;
          const y = cy + yOff + wave * H * 0.40;
          if (si === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      time += 0.010;
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
      ref={canvasRef}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  );
}
