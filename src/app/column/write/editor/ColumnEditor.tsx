'use client';
import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { buildExtensions } from './extensions';
import Toolbar from './Toolbar';
import styles from './ColumnEditor.module.css';

export interface ColumnEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function ColumnEditor({ value, onChange, placeholder }: ColumnEditorProps) {
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

  // 외부에서 value가 리셋되는 경우(예: 폼 초기화)에만 반영
  useEffect(() => {
    if (!editor) return;
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, editor]);

  return (
    <div className={styles.wrapper}>
      {editor && <Toolbar editor={editor} />}
      <EditorContent editor={editor} className={styles.editorHost} />
    </div>
  );
}
