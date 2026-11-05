'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './KeywordMorph.module.css';

// 키워드별 모양을 점(파티클)으로 만들어 서로 모핑한다. 외부 이미지 없이 캔버스로 직접 그림.
const KEYWORDS = ['개발', '기획', '디자인', '설계'] as const;
// 기준 크기(320×150)로 모양을 그리고, 캔버스는 SC배로 키워서 선명하게 표시
const BW = 320;
const BH = 150;
const SC = 1.6;
const W = BW * SC;
const H = BH * SC;
const DOTS = 1100;
const HOLD_MS = 2400;
const MORPH_MS = 1200;
const ACCENT = '#FF653F';

// 키워드 모양을 검은색으로 그려둔 오프스크린 캔버스에서 픽셀을 샘플링해 점 좌표를 만든다
function drawKeyword(ctx: CanvasRenderingContext2D, key: string) {
  ctx.save();
  ctx.scale(SC, SC);
  drawShape(ctx, key);
  ctx.restore();
}

function drawShape(ctx: CanvasRenderingContext2D, key: string) {
  // 기준 좌표계(320×150) 기준으로 그린다
  const W = BW;
  const H = BH;
  ctx.fillStyle = '#000';
  ctx.strokeStyle = '#000';
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  switch (key) {
    case '개발': {
      // 코드 에디터 창: 테두리 + 상단 바 + 가운데 </>
      ctx.lineWidth = 5;
      ctx.strokeRect(20, 14, 280, 122);
      ctx.beginPath();
      ctx.moveTo(20, 40); ctx.lineTo(300, 40);
      ctx.stroke();
      ctx.font = '900 62px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('</>', W / 2, 98);
      break;
    }
    case '기획': {
      // 와이어프레임: 헤더 박스 + 막대그래프 + 오른쪽 카드 2개 + 연결선
      ctx.lineWidth = 4;
      // 헤더 박스와 제목 줄
      ctx.strokeRect(18, 10, 284, 26);
      ctx.fillRect(30, 19, 90, 8);
      // 막대그래프 (바닥선 위에 막대 3개)
      ctx.beginPath();
      ctx.moveTo(18, 136); ctx.lineTo(132, 136);
      ctx.stroke();
      ctx.strokeRect(30, 92, 22, 44);
      ctx.strokeRect(62, 74, 22, 62);
      ctx.strokeRect(94, 58, 22, 78);
      // 오른쪽 카드 2개: 각각 불릿 점과 줄
      ctx.strokeRect(190, 48, 112, 46);
      ctx.strokeRect(190, 104, 112, 36);
      ctx.beginPath();
      ctx.arc(204, 64, 3, 0, Math.PI * 2); ctx.fill();
      ctx.arc(204, 80, 3, 0, Math.PI * 2); ctx.fill();
      ctx.arc(204, 120, 3, 0, Math.PI * 2); ctx.fill();
      ctx.fillRect(216, 61, 62, 6);
      ctx.fillRect(216, 77, 48, 6);
      ctx.fillRect(216, 117, 56, 6);
      // 연결선: 막대 → 카드
      ctx.beginPath();
      ctx.moveTo(134, 74); ctx.lineTo(160, 62); ctx.lineTo(190, 62);
      ctx.moveTo(134, 112); ctx.lineTo(160, 122); ctx.lineTo(190, 122);
      ctx.stroke();
      break;
    }
    case '디자인': {
      // 페인트 팔레트: 타원 판 + 색 구멍 4개 + 엄지 구멍
      ctx.beginPath();
      ctx.ellipse(160, 75, 124, 66, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = 'destination-out';
      [[96, 58], [150, 38], [212, 50], [238, 98]].forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, 14, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.beginPath();
      ctx.arc(118, 106, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
      break;
    }
    case '설계': {
      // 집 도면: 지붕 + 외벽 + 문 + 창문 2개
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(56, 74); ctx.lineTo(160, 18); ctx.lineTo(264, 74);
      ctx.stroke();
      ctx.strokeRect(84, 74, 152, 62);
      ctx.fillRect(146, 96, 28, 40);
      ctx.strokeRect(100, 88, 30, 26);
      ctx.strokeRect(190, 88, 30, 26);
      break;
    }
  }
}

function sampleTargets(key: string): Float32Array {
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const ctx = c.getContext('2d');
  if (!ctx) return new Float32Array(DOTS * 2);
  drawKeyword(ctx, key);
  const { data } = ctx.getImageData(0, 0, W, H);
  const pts: number[] = [];
  const step = 3;
  for (let y = 0; y < H; y += step) {
    for (let x = 0; x < W; x += step) {
      if (data[(y * W + x) * 4 + 3] > 128) pts.push(x, y);
    }
  }
  const count = pts.length / 2;
  const out = new Float32Array(DOTS * 2);
  for (let i = 0; i < DOTS; i++) {
    // 점이 모자라면 앞에서부터 반복, 넘치면 고르게 건너뛰며 뽑음
    const src = count === 0 ? 0 : Math.floor((i * count) / DOTS);
    out[i * 2] = pts[src * 2] ?? W / 2;
    out[i * 2 + 1] = pts[src * 2 + 1] ?? H / 2;
  }
  return out;
}

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function KeywordMorph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const targets = KEYWORDS.map(k => sampleTargets(k));
    const cur = new Float32Array(targets[0]); // 현재 점 위치
    const from = new Float32Array(DOTS * 2);
    // 점마다 출발 지연을 줘서 한꺼번에 움직이지 않고 흩어지듯 이동
    const delay = new Float32Array(DOTS);
    for (let i = 0; i < DOTS; i++) delay[i] = Math.random() * 0.35;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = ACCENT;
      for (let i = 0; i < DOTS; i++) {
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        ctx.arc(cur[i * 2], cur[i * 2 + 1], 1.9, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    if (reduce) {
      draw();
      return;
    }

    let k = 0; // 현재 키워드 인덱스
    let phaseStart = performance.now();
    let morphing = false;
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - phaseStart;
      if (!morphing) {
        // 머무는 시간이 끝나면 다음 키워드로 모핑 시작
        if (elapsed >= HOLD_MS) {
          morphing = true;
          phaseStart = now;
          from.set(cur);
          k = (k + 1) % KEYWORDS.length;
          setIndex(k);
        }
      } else {
        const to = targets[k];
        let done = true;
        for (let i = 0; i < DOTS; i++) {
          const local = (now - phaseStart) / MORPH_MS - delay[i];
          const t = Math.min(1, Math.max(0, local / (1 - 0.35)));
          const e = easeInOutCubic(t);
          cur[i * 2] = from[i * 2] + (to[i * 2] - from[i * 2]) * e;
          cur[i * 2 + 1] = from[i * 2 + 1] + (to[i * 2 + 1] - from[i * 2 + 1]) * e;
          if (t < 1) done = false;
        }
        if (done) {
          cur.set(to);
          morphing = false;
          phaseStart = now;
        }
      }
      draw();
      raf = requestAnimationFrame(tick);
    };

    draw();
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={styles.wrap} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
      <span className={styles.label}>{KEYWORDS[index]}</span>
    </div>
  );
}
