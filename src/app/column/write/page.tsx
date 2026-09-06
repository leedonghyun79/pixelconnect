'use client';
import { useState, useCallback } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import styles from './write.module.css';

const ColumnEditor = dynamic(() => import('./editor/ColumnEditor'), {
  ssr: false,
  loading: () => <div className={styles.editorLoading}>에디터를 불러오는 중입니다...</div>,
});

export default function ColumnWritePage() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
  });
  const [autoThumbnail, setAutoThumbnail] = useState<string>('');

  // 에디터 content에서 첫 번째 이미지 src 자동 추출
  const extractFirstImage = useCallback((html: string) => {
    const match = html.match(/<img[^>]+src=["']([^"']+)["']/);
    setAutoThumbnail(match ? match[1] : '');
  }, []);

  const handleContentChange = useCallback(
    (html: string) => {
      setFormData((prev) => ({ ...prev, content: html }));
      extractFirstImage(html);
    },
    [extractFirstImage]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('칼럼이 성공적으로 업로드되었습니다! (데모 버전)');
    // In a real app, send formData to API and redirect
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>새 칼럼 작성</h1>
          <p className={styles.sub}>픽셀커넥트의 새로운 인사이트를 공유해주세요.</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Title */}
          <div className={styles.field}>
            <label htmlFor="title" className={styles.label}>제목</label>
            <input
              type="text"
              id="title"
              className={styles.input}
              placeholder="칼럼 제목을 입력하세요"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>

          {/* Category */}
          <div className={styles.field}>
            <label htmlFor="category" className={styles.label}>카테고리</label>
            <select
              id="category"
              className={styles.select}
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
              required
            >
              <option value="" disabled>카테고리를 선택하세요</option>
              <option value="홈페이지 기획">홈페이지 기획</option>
              <option value="전환율 최적화">전환율 최적화</option>
              <option value="유지보수">유지보수</option>
              <option value="디자인 트렌드">디자인 트렌드</option>
              <option value="마케팅">마케팅</option>
            </select>
          </div>

          {/* 자동 썸네일 미리보기 */}
          <div className={styles.field}>
            <label className={styles.label}>썸네일 미리보기</label>
            <div className={styles.thumbnailPreview}>
              {autoThumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={autoThumbnail} alt="썸네일 미리보기" className={styles.thumbnailImg} />
              ) : (
                <div className={styles.thumbnailEmpty}>
                  <span className={styles.thumbnailIcon}>🖼️</span>
                  <p>본문에 이미지를 삽입하면<br />첫 번째 이미지가 자동으로 썸네일이 됩니다</p>
                </div>
              )}
            </div>
          </div>

          {/* Editor */}
          <div className={styles.field}>
            <label className={styles.label}>본문 내용</label>
            <ColumnEditor
              value={formData.content}
              onChange={handleContentChange}
              placeholder="여기에 칼럼 내용을 작성해주세요..."
            />
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <Link href="/column" className={styles.cancelBtn}>취소</Link>
            <button type="submit" className={styles.submitBtn}>출간하기</button>
          </div>
        </form>
      </div>
    </main>
  );
}
