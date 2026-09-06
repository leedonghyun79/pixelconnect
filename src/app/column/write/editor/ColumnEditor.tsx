'use client';
import { useEffect, useState, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { buildExtensions } from './extensions';
import Toolbar from './Toolbar';
import SourceView from './SourceView';
import styles from './ColumnEditor.module.css';

export interface ColumnEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

type Mode = 'wysiwyg' | 'source';

export default function ColumnEditor({ value, onChange, placeholder }: ColumnEditorProps) {
  const [mode, setMode] = useState<Mode>('wysiwyg');
  const [source, setSource] = useState('');

  const editor = useEditor({
    // Next.js SSR에서 하이드레이션 불일치 방지
    immediatelyRender: false,
    extensions: buildExtensions({ placeholder }),
    content: value,
    editorProps: {
      attributes: {
        class: styles.prose,
      },
    },
    onUpdate: ({ editor: e }) => {
      onChange(e.getHTML());
    },
  });

  // 외부에서 value가 리셋되는 경우(예: 폼 초기화)에만 반영.
  // 소스 편집 중에는 건드리지 않는다.
  useEffect(() => {
    if (!editor || mode === 'source') return;
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, editor]);

  const toggleMode = useCallback(() => {
    if (!editor) return;
    if (mode === 'wysiwyg') {
      // 현재 문서를 HTML 문자열로 꺼내 소스 뷰로 전환
      setSource(editor.getHTML());
      setMode('source');
    } else {
      // 소스를 다시 에디터에 주입 (Tiptap 스키마로 정규화됨 —
      // 지원하지 않는 태그/속성은 제거됨). onUpdate가 onChange를 호출.
      editor.commands.setContent(source, { emitUpdate: true });
      setMode('wysiwyg');
    }
  }, [editor, mode, source]);

  const handleSourceChange = useCallback(
    (next: string) => {
      setSource(next);
      onChange(next); // 소스 편집 내용을 부모 폼과 실시간 동기화
    },
    [onChange]
  );

  return (
    <div className={styles.wrapper}>
      {editor && (
        <Toolbar editor={editor} mode={mode} onToggleSource={toggleMode} />
      )}
      {mode === 'source' ? (
        <SourceView value={source} onChange={handleSourceChange} />
      ) : (
        <EditorContent editor={editor} className={styles.editorHost} />
      )}
    </div>
  );
}
