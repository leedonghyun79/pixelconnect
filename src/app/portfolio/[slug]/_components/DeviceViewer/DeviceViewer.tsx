'use client';

import { useState } from 'react';
import styles from './DeviceViewer.module.css';

type Device = 'pc' | 'mobile';

interface DeviceViewerProps {
  title: string;
  /** 항상 노출되는 썸네일 */
  thumbImg: string;
  /** 토글 PC 선택 시 아래에 나오는 화면 */
  pcImg: string;
  /** 토글 Mobile 선택 시 아래에 나오는 화면. 없으면 Mobile 버튼 비활성 */
  mobileImg?: string;
  /** 썸네일 바로 아래에 노출되는 메타 정보 */
  meta?: React.ReactNode;
  /** 메타 아래, 토글 위에 노출되는 안내 영역 */
  notice?: React.ReactNode;
}

function MonitorIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="6" y="2" width="12" height="20" rx="2.5" />
      <path d="M11 18h2" />
    </svg>
  );
}

export default function DeviceViewer({ title, thumbImg, pcImg, mobileImg, meta, notice }: DeviceViewerProps) {
  // 처음부터 PC 화면을 보여주고, 토글로 Mobile 전환
  const [device, setDevice] = useState<Device>('pc');
  // 화면 위에서 마우스 위치 (말풍선 좌표). null이면 말풍선 숨김
  const [hint, setHint] = useState<{ x: number; y: number } | null>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    setHint({ x: e.clientX - r.left, y: e.clientY - r.top });
  }
  const handleLeave = () => setHint(null);

  const bubble = hint && (
    <span
      className={styles.hintBubble}
      style={{ transform: `translate(${hint.x + 14}px, ${hint.y + 14}px)` }}
      aria-hidden="true"
    >
      스크롤
    </span>
  );

  const isMobileView = device === 'mobile' && !!mobileImg;

  return (
    <div className={styles.wrap}>
      <div className={styles.thumbRow}>
        <div className={styles.cover}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={thumbImg} alt={title} className={styles.coverImg} />
        </div>
        {meta && <div className={styles.thumbMeta}>{meta}</div>}
      </div>

      {notice}

      <div className={styles.toolbar}>
        <div className={styles.toggle} role="group" aria-label="화면 크기 선택">
          <button
            type="button"
            className={styles.toggleBtn}
            aria-pressed={device === 'pc'}
            onClick={() => setDevice('pc')}
          >
            <MonitorIcon />
            <span>PC</span>
          </button>
          <button
            type="button"
            className={styles.toggleBtn}
            aria-pressed={device === 'mobile'}
            disabled={!mobileImg}
            title={mobileImg ? undefined : '모바일 화면 준비 중'}
            onClick={() => setDevice('mobile')}
          >
            <PhoneIcon />
            <span>Mobile</span>
          </button>
        </div>
      </div>

      {/* PC와 Mobile 화면을 겹쳐 두고 크로스페이드. 영역 높이·너비도 함께 애니메이션 */}
      <div className={`${styles.stage} ${isMobileView ? styles.stageMobile : styles.stagePc}`}>
        <div
          className={`${styles.view} ${!isMobileView ? styles.viewActive : styles.viewHidden}`}
          aria-hidden={isMobileView}
        >
          <div className={styles.monitor}>
            <div className={styles.monitorBezel}>
              <div className={styles.monitorScreen} onMouseMove={handleMove} onMouseLeave={handleLeave}>
                <div className={styles.pcScreen} data-lenis-prevent>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={pcImg} alt={`${title} PC 화면`} className={styles.coverImg} />
                </div>
                {!isMobileView && bubble}
              </div>
            </div>
            <div className={styles.monitorNeck} aria-hidden="true" />
            <div className={styles.monitorBase} aria-hidden="true" />
          </div>
        </div>

        {mobileImg && (
          <div
            className={`${styles.view} ${isMobileView ? styles.viewActive : styles.viewHidden}`}
            aria-hidden={!isMobileView}
          >
            <div className={styles.phoneStage}>
              <div className={styles.phone} onMouseMove={handleMove} onMouseLeave={handleLeave}>
                <div className={styles.phoneScreen} data-lenis-prevent>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={mobileImg} alt={`${title} 모바일 화면`} className={styles.phoneImg} />
                </div>
                {isMobileView && bubble}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
