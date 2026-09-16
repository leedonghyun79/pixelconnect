import styles from './SectionGridBg.module.css';

/**
 * 다크 섹션용 배경 레이어 — 외부 이미지 없이 코드로 생성.
 * 소실점으로 수렴하는 원근 와이어 그리드 + 한 귀퉁이 웜 글로우.
 * 넣는 섹션은 position:relative + overflow:hidden, 콘텐츠 래퍼는 z-index:1 이상.
 */
const W = 1440;
const H = 820;
const VPX = W * 0.5;
const VPY = H * 0.42;
const BOTTOM = H + 40;
const LINE = 'rgba(180, 188, 235, ';

const vLines = Array.from({ length: 17 }, (_, k) => {
  const i = k - 8;
  const xb = VPX + i * 260;
  return (
    <line
      key={`v${i}`}
      x1={xb}
      y1={BOTTOM}
      x2={VPX}
      y2={VPY}
      stroke={`${LINE}0.09)`}
      strokeWidth={1}
    />
  );
});

const hLines = Array.from({ length: 14 }, (_, k) => {
  const i = k + 1;
  const t = i / 15;
  const y = VPY + (BOTTOM - VPY) * (t * t);
  return (
    <line
      key={`h${i}`}
      x1={0}
      y1={y}
      x2={W}
      y2={y}
      stroke={`${LINE}${(0.03 + 0.07 * t).toFixed(3)})`}
      strokeWidth={1}
    />
  );
});

export default function SectionGridBg() {
  return (
    <div className={styles.bg} aria-hidden="true">
      <svg
        className={styles.grid}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <radialGradient id="scgridFade" cx="50%" cy="42%" r="70%">
            <stop offset="0%" stopColor="#fff" stopOpacity={1} />
            <stop offset="100%" stopColor="#fff" stopOpacity={0} />
          </radialGradient>
          <mask id="scgridMask">
            <rect width={W} height={H} fill="url(#scgridFade)" />
          </mask>
        </defs>
        <g mask="url(#scgridMask)">
          {hLines}
          {vLines}
        </g>
      </svg>
      <div className={styles.glow} />
    </div>
  );
}
