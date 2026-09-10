export default function DevNotice() {
  return (
    <div
      role="status"
      aria-label="제작 중인 사이트입니다"
      style={{
        position: 'fixed',
        left: '50%',
        bottom: 16,
        transform: 'translateX(-50%)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 16px',
        borderRadius: 999,
        fontSize: 13,
        fontWeight: 600,
        lineHeight: 1,
        color: '#0d0d3e',
        background: 'rgba(255, 255, 255, 0.92)',
        border: '1px solid #dcdce6',
        boxShadow: '0 4px 20px rgba(13, 13, 62, 0.12)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        maxWidth: 'calc(100vw - 32px)',
      }}
    >
      <span aria-hidden="true">🚧</span>
      현재 제작 중인 사이트입니다 · 내용이 실제와 다를 수 있습니다
    </div>
  );
}
