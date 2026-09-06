'use client';
import { useState, useMemo, useRef, useCallback } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import styles from './write.module.css';
import ImageToolbar from './ImageToolbar';

const FONT_SIZES = ['10px', '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px', '48px'];

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill-new');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { default: ImageResize } = await import('quill-image-resize-module-react') as any;
    // font-size를 인라인 style로 직접 적용하는 어트리뷰터
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SizeStyle = RQ.Quill.import('attributors/style/size') as any;
    SizeStyle.whitelist = FONT_SIZES;
    RQ.Quill.register(SizeStyle, true);
    RQ.Quill.register('modules/imageResize', ImageResize);
    return RQ;
  },
  {
    ssr: false,
    loading: () => <div className={styles.quillLoading}>에디터를 불러오는 중입니다...</div>
  }
  // next/dynamic이 반환하는 타입에는 ref가 빠져 있어 forwardRef 대상이 아닌 걸로 추론됨
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) as any;

export default function ColumnWritePage() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: ''
  });
  const quillRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const editorWrapperRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<HTMLImageElement | null>(null);
  const [autoThumbnail, setAutoThumbnail] = useState<string>('');
  const quillInstance = quillRef.current?.getEditor();

  // 에디터 content에서 첫 번째 이미지 src 자동 추출
  const extractFirstImage = useCallback((html: string) => {
    const match = html.match(/<img[^>]+src=["']([^"']+)["']/);
    setAutoThumbnail(match ? match[1] : '');
  }, []);

  const handleSelectionChange = useCallback((range: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    if (!range || !quillRef.current) { setSelectedImage(null); return; }
    const quill = quillRef.current.getEditor();
    const [blot] = quill.getLeaf(range.index);
    if (blot?.domNode?.tagName === 'IMG') {
      setSelectedImage(blot.domNode as HTMLImageElement);
    } else {
      setSelectedImage(null);
    }
  }, []);

  const modules = useMemo(() => ({
    toolbar: [
      [{ size: FONT_SIZES }],
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['link', 'image'],
      ['clean'],
    ],
    imageResize: {
      modules: ['Resize', 'DisplaySize'], // Toolbar는 커스텀으로 대체
    },
  }), []);

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
            <div className={styles.editorWrapper} ref={editorWrapperRef} style={{ position: 'relative' }}>
              {selectedImage && quillInstance && (
                <ImageToolbar
                  image={selectedImage}
                  quillInstance={quillInstance}
                  onClose={() => setSelectedImage(null)}
                  wrapperRef={editorWrapperRef}
                />
              )}
              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={formData.content}
                onChange={(value: string) => {
                  setFormData({...formData, content: value});
                  extractFirstImage(value);
                }}
                onChangeSelection={handleSelectionChange}
                modules={modules}
                placeholder="여기에 칼럼 내용을 작성해주세요..."
              />
            </div>
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
