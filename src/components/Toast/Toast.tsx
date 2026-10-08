'use client';
import { useEffect } from 'react';
import styles from './Toast.module.css';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  duration?: number;
  onClose: () => void;
}

export default function Toast({ message, type = 'success', duration = 5000, onClose }: ToastProps) {
  // message 가 바뀌면 타이머 재시작
  useEffect(() => {
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [message, duration, onClose]);

  return (
    <div
      className={`${styles.toast} ${type === 'error' ? styles.error : styles.success}`}
      role={type === 'error' ? 'alert' : 'status'}
    >
      <span className={styles.icon} aria-hidden="true">{type === 'error' ? '!' : '✓'}</span>
      <span className={styles.message}>{message}</span>
      <button type="button" className={styles.close} onClick={onClose} aria-label="알림 닫기">
        ×
      </button>
    </div>
  );
}
