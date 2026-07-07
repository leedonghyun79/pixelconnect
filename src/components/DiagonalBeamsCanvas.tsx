'use client';
import { useEffect, useRef } from 'react';

export default function DiagonalBeamsCanvas({ className }: { className?: string }) {
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
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    // 빔 데이터 정의
    const beams = [
      { baseWidth: 120, offset: 0.1, speed: 0.002, color: [108, 60, 255] },  // 퍼플
      { baseWidth: 200, offset: 0.35, speed: 0.0015, color: [30, 100, 255] }, // 블루
      { baseWidth: 80,  offset: 0.5, speed: 0.003, color: [60, 180, 255] },  // 사이언
      { baseWidth: 150, offset: 0.7, speed: 0.0025, color: [160, 100, 255] }, // 라이트 퍼플
      { baseWidth: 250, offset: 0.9, speed: 0.001, color: [40, 40, 180] },   // 딥 블루
      { baseWidth: 100, offset: 1.1, speed: 0.002, color: [108, 60, 255] },  // 퍼플
    ];

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      // 전체 배경을 어두운 네이비로
      ctx.fillStyle = '#050510';
      ctx.fillRect(0, 0, W, H);

      const angle = Math.PI / 4; // 45도
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      
      // 대각선 길이에 맞춰 빔이 화면을 덮도록 설정
      const diagonal = Math.sqrt(W * W + H * H);
      
      ctx.save();
      ctx.translate(W / 2, H / 2);
      ctx.rotate(angle);

      // 글로벌 블렌드 모드 (빛이 겹칠 때 밝아지도록)
      ctx.globalCompositeOperation = 'screen';

      beams.forEach((beam, i) => {
        // 시간에 따라 빔이 수직으로 이동
        const moveY = (time * beam.speed * diagonal + beam.offset * diagonal) % (diagonal * 2) - diagonal;
        
        // 투명도 맥동
        const maxAlpha = 0.4 + Math.sin(time * 0.01 + i) * 0.1;
        
        ctx.beginPath();
        
        // x축을 따라 웨이브를 주며 선을 그림
        const segments = 40; // 곡선 해상도
        const step = (diagonal * 2) / segments;
        
        for (let j = 0; j <= segments; j++) {
          const x = -diagonal + j * step;
          // 펄럭이는 파동 계산 (x좌표와 시간에 따른 사인파)
          const wave = Math.sin(x * 0.003 + time * 0.015 + i) * 60; // 진폭 60
          // 폭의 변화 (x 좌표에 따라 두께가 미세하게 다름)
          const widthWave = Math.sin(x * 0.005 - time * 0.02 + i) * 0.3;
          const currentWidth = beam.baseWidth * (1 + widthWave);
          
          const yPos = moveY + wave - currentWidth / 2;
          
          if (j === 0) ctx.moveTo(x, yPos);
          else ctx.lineTo(x, yPos);
        }
        
        // 반대편 곡선 (아래쪽 엣지)
        for (let j = segments; j >= 0; j--) {
          const x = -diagonal + j * step;
          const wave = Math.sin(x * 0.003 + time * 0.015 + i) * 60;
          const widthWave = Math.sin(x * 0.005 - time * 0.02 + i) * 0.3;
          const currentWidth = beam.baseWidth * (1 + widthWave);
          
          const yPos = moveY + wave + currentWidth / 2;
          ctx.lineTo(x, yPos);
        }
        
        ctx.closePath();

        // 그라디언트로 빛이 퍼지는 효과
        const [r, g, b] = beam.color;
        const grad = ctx.createLinearGradient(0, moveY - beam.baseWidth, 0, moveY + beam.baseWidth);
        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
        grad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${maxAlpha})`);
        grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.fillStyle = grad;
        ctx.fill();
      });

      ctx.restore();

      time += 1;
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
