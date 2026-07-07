'use client';
import { useEffect, useRef } from 'react';

export default function Geo3DCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;

    /* ── 정20면체 (Icosahedron) 정점 ─────────────────── */
    const φ = (1 + Math.sqrt(5)) / 2;
    const rawVerts: [number, number, number][] = [
      [0, 1, φ], [0, -1, φ], [0, 1, -φ], [0, -1, -φ],
      [1, φ, 0], [-1, φ, 0], [1, -φ, 0], [-1, -φ, 0],
      [φ, 0, 1], [-φ, 0, 1], [φ, 0, -1], [-φ, 0, -1],
    ];
    // 단위 구로 정규화
    const icoV: [number, number, number][] = rawVerts.map(([x, y, z]) => {
      const l = Math.sqrt(x * x + y * y + z * z);
      return [x / l, y / l, z / l];
    });
    const icoE: [number, number][] = [
      [0,1],[0,4],[0,5],[0,8],[0,9],
      [1,6],[1,7],[1,8],[1,9],
      [2,3],[2,4],[2,5],[2,10],[2,11],
      [3,6],[3,7],[3,10],[3,11],
      [4,5],[4,8],[4,10],
      [5,9],[5,11],
      [6,7],[6,8],[6,10],
      [7,9],[7,11],
      [8,10],[9,11],
    ];

    /* ── 정8면체 (Octahedron) ─────────────────────────── */
    const octV: [number, number, number][] = [
      [0, 1, 0], [0, -1, 0],
      [1, 0, 0], [-1, 0, 0],
      [0, 0, 1], [0, 0, -1],
    ];
    const octE: [number, number][] = [
      [0,2],[0,3],[0,4],[0,5],
      [1,2],[1,3],[1,4],[1,5],
      [2,4],[2,5],[3,4],[3,5],
    ];

    /* ── 회전 함수 ────────────────────────────────────── */
    const rx = ([x,y,z]: number[], a: number): number[] =>
      [x, y*Math.cos(a)-z*Math.sin(a), y*Math.sin(a)+z*Math.cos(a)];
    const ry = ([x,y,z]: number[], a: number): number[] =>
      [x*Math.cos(a)+z*Math.sin(a), y, -x*Math.sin(a)+z*Math.cos(a)];
    const rz = ([x,y,z]: number[], a: number): number[] =>
      [x*Math.cos(a)-y*Math.sin(a), x*Math.sin(a)+y*Math.cos(a), z];

    /* ── 원근 투영 ────────────────────────────────────── */
    const project = (v: number[], cx: number, cy: number, fov: number, camZ: number) => {
      const [x, y, z] = v;
      const s = fov / (fov + z + camZ);
      return { sx: cx + x * s, sy: cy + y * s, s, z };
    };

    /* ── 도형 정의 ────────────────────────────────────── */
    const shapes = [
      {
        v: icoV, e: icoE, scale: 110,
        cx: 0.78, cy: 0.38,        // 화면 비율 위치
        rx: 0.007, ry: 0.011, rz: 0.005,
        angleX: 0, angleY: 0, angleZ: 0,
        color: [100, 160, 255] as [number,number,number],
      },
      {
        v: icoV, e: icoE, scale: 65,
        cx: 0.12, cy: 0.72,
        rx: -0.009, ry: 0.006, rz: 0.013,
        angleX: 1.2, angleY: 0.8, angleZ: 0.3,
        color: [160, 100, 255] as [number,number,number],
      },
      {
        v: octV, e: octE, scale: 80,
        cx: 0.55, cy: 0.75,
        rx: 0.006, ry: -0.012, rz: 0.004,
        angleX: 0.5, angleY: 1.0, angleZ: 0,
        color: [80, 200, 255] as [number,number,number],
      },
      {
        v: octV, e: octE, scale: 45,
        cx: 0.22, cy: 0.25,
        rx: 0.013, ry: 0.007, rz: -0.008,
        angleX: 0, angleY: 0.5, angleZ: 1.0,
        color: [200, 120, 255] as [number,number,number],
      },
    ];

    /* ── 리사이즈 ─────────────────────────────────────── */
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    /* ── 드로우 루프 ──────────────────────────────────── */
    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      for (const sh of shapes) {
        sh.angleX += sh.rx;
        sh.angleY += sh.ry;
        sh.angleZ += sh.rz;

        const cx = sh.cx * W;
        const cy = sh.cy * H;
        const fov = 350;
        const camZ = 4;

        // 변환된 정점 목록
        const projected = sh.v.map(v => {
          let p: number[] = [...v].map(c => c * sh.scale);
          p = rx(p, sh.angleX);
          p = ry(p, sh.angleY);
          p = rz(p, sh.angleZ);
          return project(p, cx, cy, fov, camZ);
        });

        // 엣지 그리기
        ctx.save();
        ctx.shadowBlur = 12;
        ctx.shadowColor = `rgba(${sh.color[0]},${sh.color[1]},${sh.color[2]},0.6)`;

        for (const [a, b] of sh.e) {
          const pa = projected[a];
          const pb = projected[b];
          const avgZ = (pa.z + pb.z) / 2;
          // z는 world-space (±scale 범위) → 0~1로 정규화
          const depth = Math.max(0, Math.min(1, (avgZ / sh.scale + 1) / 2));
          const alpha = 0.15 + depth * 0.55;

          const grad = ctx.createLinearGradient(pa.sx, pa.sy, pb.sx, pb.sy);
          grad.addColorStop(0, `rgba(${sh.color[0]},${sh.color[1]},${sh.color[2]},${alpha})`);
          grad.addColorStop(1, `rgba(${sh.color[0]},${sh.color[1]},${sh.color[2]},${alpha * 0.5})`);

          ctx.beginPath();
          ctx.moveTo(pa.sx, pa.sy);
          ctx.lineTo(pb.sx, pb.sy);
          ctx.strokeStyle = grad;
          ctx.lineWidth = Math.max(0.3, 0.8 + depth * 0.8);
          ctx.stroke();
        }
        ctx.restore();

        // 정점 점
        for (const { sx, sy, z } of projected) {
          const depth = Math.max(0, Math.min(1, (z / sh.scale + 1) / 2));
          const alpha = 0.2 + depth * 0.6;
          const radius = Math.max(0.3, 1.2 + depth * 1.0); // 음수 방지
          ctx.beginPath();
          ctx.arc(sx, sy, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${sh.color[0]},${sh.color[1]},${sh.color[2]},${alpha})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    draw();

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <canvas ref={ref} className={className}
      style={{ display: 'block', width: '100%', height: '100%' }} />
  );
}
