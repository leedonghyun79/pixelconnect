'use client';
import { useEffect, useRef } from 'react';

export default function GridWaveCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId: number;
    let time = 0;
    
    // 마우스 상호작용
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      // 중심을 (0,0)으로 정규화 (-1 ~ 1)
      targetMouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      targetMouseY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };
    
    // 모바일 터치 대응
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        targetMouseX = ((e.touches[0].clientX - rect.left) / rect.width) * 2 - 1;
        targetMouseY = ((e.touches[0].clientY - rect.top) / rect.height) * 2 - 1;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    const draw = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      ctx.clearRect(0, 0, width, height);

      // 부드러운 마우스 이동 (Lerp)
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // [핵심 수정] 인위적이지 않고 숨 쉬듯 아주 천천히, 부드럽게 움직이도록 속도와 진폭을 대폭 축소
      const autoSwayX = Math.sin(time * 0.05) * 0.15; // 매우 느린 속도(0.05), 작은 진폭(0.15)
      const autoSwayY = Math.cos(time * 0.04) * 0.10; // 상하는 더 느리고 미세하게

      const activeX = mouseX + autoSwayX;
      const activeY = mouseY + autoSwayY;

      // 부드러운 와이어프레임 지형을 위해 다시 적절한 밀도로 복원
      const cols = width < 768 ? 25 : 45;
      const rows = width < 768 ? 25 : 45;
      const spacing = width < 768 ? 50 : 70; 
      
      const gridWidth = (cols - 1) * spacing;
      const gridDepth = (rows - 1) * spacing;

      // [핵심 수정] 캔버스는 +Y가 아래쪽입니다.
      // cameraY를 양수(+)로 주어야 바닥(지형)이 카메라 아래에 있게 되어, 
      // 가까운 선들은 화면 맨 아래(바닥)로, 멀리 있는 선들(지평선)은 위쪽으로 자연스럽게 모입니다.
      const fov = 400;
      const cameraY = 150; 
      const cameraZ = 150;   
      const centerX = width / 2;
      const centerY = height / 2 - 50; // 지평선(멀리 있는 선들이 수렴하는 곳)을 화면 약간 위쪽으로 설정

      // 점들을 저장할 배열 (선 연결을 위해)
      const points: ({ x: number, y: number, z: number, px: number, py: number, scale: number } | null)[][] = [];

      // 1. 점 위치 계산 및 투영
      for (let z = 0; z < rows; z++) {
        const rowPoints = [];
        for (let x = 0; x < cols; x++) {
          // 월드 좌표 (그리드 중심이 0,0이 되도록)
          const worldX = x * spacing - gridWidth / 2;
          const worldZ = z * spacing - gridDepth / 2;
          
          // Y축 회전 (카메라의 좌우 흔들림)
          const rotatedX = worldX * Math.cos(activeX * 0.3) - worldZ * Math.sin(activeX * 0.3);
          const rotatedZ = worldX * Math.sin(activeX * 0.3) + worldZ * Math.cos(activeX * 0.3);

          // 중심으로부터의 거리
          const distFromCenter = Math.sqrt(rotatedX * rotatedX + rotatedZ * rotatedZ);
          
          // 파장이 너무 짧아 원경에서 꼬불꼬불하게 겹치는 현상을 방지하기 위해 파장 길이를 대폭 늘림 (0.003)
          const wavePhase = distFromCenter * 0.003 - time * 0.015;
          // 마우스와 자동 스웨이가 파도의 출렁임에도 영향을 줌
          const mouseWaveOffset = Math.sin(worldX * 0.002 + activeX) * Math.cos(worldZ * 0.002 + activeY) * 50;
          const worldY = Math.sin(wavePhase) * 60 + mouseWaveOffset;

          // 원근 투영 (Perspective Projection)
          const zPos = rotatedZ + cameraZ;
          // 카메라 뒤에 있는 점은 null 처리하여 선이 강제로 연결되는 것 방지
          if (zPos < 10) {
            rowPoints.push(null);
            continue; 
          }

          const scale = fov / zPos;
          const projX = centerX + rotatedX * scale;
          const projY = centerY + (worldY + cameraY) * scale;

          rowPoints.push({
            x: worldX, y: worldY, z: rotatedZ,
            px: projX, py: projY, scale: scale
          });
        }
        points.push(rowPoints);
      }

      // 2. 부드러운 선 그리기 (가로줄)
      ctx.lineWidth = 1.0;
      
      for (let z = 0; z < points.length; z++) {
        const row = points[z];
        if (row.length < 2) continue;
        
        ctx.beginPath();
        let hasStart = false;
        let rowAvgScale = 0;
        let validPoints = 0;

        for (let x = 0; x < row.length; x++) {
          const p = row[x];
          if (!p) {
            hasStart = false; // 점이 끊어지면 다시 시작
            continue;
          }
          rowAvgScale += p.scale;
          validPoints++;

          if (!hasStart) {
            ctx.moveTo(p.px, p.py);
            hasStart = true;
          } else {
            ctx.lineTo(p.px, p.py);
          }
        }

        if (validPoints > 0) {
          rowAvgScale /= validPoints;
          // 원경에서 선이 뭉쳐서 회색 띠처럼 보이는 것을 방지하기 위해 최소 투명도를 0으로 완전히 페이드아웃
          const alpha = Math.min(0.35, Math.max(0, rowAvgScale * 0.4 - 0.15));
          if (alpha > 0) {
            ctx.strokeStyle = `rgba(180, 180, 185, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      // 3. 부드러운 선 그리기 (세로줄)
      for (let x = 0; x < cols; x++) {
        ctx.beginPath();
        let hasStart = false;
        let colAvgScale = 0;
        let validPoints = 0;

        for (let z = 0; z < points.length; z++) {
          const p = points[z][x];
          if (!p) {
            hasStart = false;
            continue;
          }
          
          colAvgScale += p.scale;
          validPoints++;
          if (!hasStart) {
            ctx.moveTo(p.px, p.py);
            hasStart = true;
          } else {
            ctx.lineTo(p.px, p.py);
          }
        }
        
        if (validPoints > 0) {
          colAvgScale /= validPoints;
          // 세로줄 역시 원경에서 완전히 사라지도록 투명도 하한을 0으로 설정
          const alpha = Math.min(0.2, Math.max(0, colAvgScale * 0.3 - 0.15));
          if (alpha > 0) {
            ctx.strokeStyle = `rgba(180, 180, 185, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      time += 1;
      rafId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
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
