'use client';
import { useState, useRef, useEffect } from 'react';
import type { Editor } from '@tiptap/react';
import {
  RefreshCw, AlignLeft, AlignCenter, AlignRight, Trash2,
  Link as LinkIcon, FileText, AlignJustify, X,
} from 'lucide-react';
import type { ImageAlign } from './image/ResizableImage';
import styles from './ImageToolbar.module.css';

interface Props {
  editor: Editor;
  getPos: () => number | undefined;
  image: HTMLImageElement;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  attrs: { alt: string; href: string; align: ImageAlign };
  onUpdate: (attrs: Record<string, unknown>) => void;
  onDelete: () => void;
}

export default function ImageToolbar({ image, wrapperRef, attrs, onUpdate, onDelete }: Props) {
  const [activeMenu, setActiveMenu] = useState<'align' | 'alt' | 'link' | null>(null);
  const [altText, setAltText] = useState(attrs.alt);
  const [linkUrl, setLinkUrl] = useState(attrs.href);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  // 툴바 위치 계산 (이미지 상단 중앙)
  useEffect(() => {
    if (!image || !wrapperRef.current) return;
    const imgRect = image.getBoundingClientRect();
    const wrapRect = wrapperRef.current.getBoundingClientRect();
    setPos({
      top: imgRect.top - wrapRect.top - 52,
      left: imgRect.left - wrapRect.left + imgRect.width / 2,
    });
  }, [image, wrapperRef, attrs.align]);

  // 교체
  const handleReplace = () => fileInputRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onUpdate({ src: reader.result as string });
    reader.readAsDataURL(file);
  };

  // 정렬
  const handleAlign = (align: ImageAlign) => {
    onUpdate({ align });
    setActiveMenu(null);
  };

  // 대체텍스트
  const handleAltSave = () => {
    onUpdate({ alt: altText });
    setActiveMenu(null);
  };

  // 링크
  const handleLinkSave = () => {
    onUpdate({ href: linkUrl || null });
    setActiveMenu(null);
  };

  const toggle = (menu: 'align' | 'alt' | 'link') =>
    setActiveMenu((prev) => (prev === menu ? null : menu));

  return (
    <div
      ref={toolbarRef}
      className={styles.toolbar}
      style={{ top: pos.top, left: pos.left }}
      onMouseDown={(e) => e.preventDefault()}
    >
      <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleFileChange} />

      {/* 교체 */}
      <button className={styles.btn} onClick={handleReplace} title="이미지 교체">
        <RefreshCw size={14} />
        <span>교체</span>
      </button>

      <div className={styles.sep} />

      {/* 정렬 */}
      <div className={styles.menuWrap}>
        <button
          className={`${styles.btn} ${activeMenu === 'align' ? styles.active : ''}`}
          onClick={() => toggle('align')}
          title="정렬"
        >
          <AlignJustify size={14} />
          <span>정렬</span>
        </button>
        {activeMenu === 'align' && (
          <div className={styles.dropdown}>
            <button className={styles.dropItem} onClick={() => handleAlign('left')}>
              <AlignLeft size={13} /> 왼쪽
            </button>
            <button className={styles.dropItem} onClick={() => handleAlign('center')}>
              <AlignCenter size={13} /> 가운데
            </button>
            <button className={styles.dropItem} onClick={() => handleAlign('right')}>
              <AlignRight size={13} /> 오른쪽
            </button>
          </div>
        )}
      </div>

      <div className={styles.sep} />

      {/* 삭제 */}
      <button className={`${styles.btn} ${styles.danger}`} onClick={() => onDelete()} title="삭제">
        <Trash2 size={14} />
        <span>삭제</span>
      </button>

      <div className={styles.sep} />

      {/* 대체텍스트 */}
      <div className={styles.menuWrap}>
        <button
          className={`${styles.btn} ${activeMenu === 'alt' ? styles.active : ''}`}
          onClick={() => toggle('alt')}
          title="대체 텍스트"
        >
          <FileText size={14} />
          <span>Alt</span>
        </button>
        {activeMenu === 'alt' && (
          <div className={`${styles.dropdown} ${styles.inputDrop}`}>
            <p className={styles.dropLabel}>대체 텍스트 (Alt)</p>
            <input
              className={styles.dropInput}
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="이미지 설명을 입력하세요"
              onKeyDown={(e) => e.key === 'Enter' && handleAltSave()}
              autoFocus
            />
            <div className={styles.dropActions}>
              <button className={styles.cancelBtn} onClick={() => setActiveMenu(null)}>취소</button>
              <button className={styles.saveBtn} onClick={handleAltSave}>저장</button>
            </div>
          </div>
        )}
      </div>

      {/* 링크 */}
      <div className={styles.menuWrap}>
        <button
          className={`${styles.btn} ${activeMenu === 'link' ? styles.active : ''}`}
          onClick={() => toggle('link')}
          title="링크 추가"
        >
          <LinkIcon size={14} />
          <span>링크</span>
        </button>
        {activeMenu === 'link' && (
          <div className={`${styles.dropdown} ${styles.inputDrop}`}>
            <p className={styles.dropLabel}>이미지 링크</p>
            <input
              className={styles.dropInput}
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://..."
              onKeyDown={(e) => e.key === 'Enter' && handleLinkSave()}
              autoFocus
            />
            {linkUrl && (
              <button className={styles.clearBtn} onClick={() => setLinkUrl('')}>링크 제거</button>
            )}
            <div className={styles.dropActions}>
              <button className={styles.cancelBtn} onClick={() => setActiveMenu(null)}>취소</button>
              <button className={styles.saveBtn} onClick={handleLinkSave}>저장</button>
            </div>
          </div>
        )}
      </div>

      <div className={styles.sep} />

      {/* 선택 해제 */}
      <button
        className={styles.btn}
        onClick={() => {
          (document.activeElement as HTMLElement | null)?.blur();
          setActiveMenu(null);
        }}
        title="닫기"
      >
        <X size={14} />
      </button>
    </div>
  );
}
