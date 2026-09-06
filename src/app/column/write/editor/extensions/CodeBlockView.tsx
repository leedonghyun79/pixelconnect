'use client';
import { NodeViewWrapper, NodeViewContent, type NodeViewProps } from '@tiptap/react';
import styles from './CodeBlockView.module.css';

// 개발 블로그에서 자주 쓰는 언어 위주
const LANGUAGES = [
  { value: 'plaintext', label: 'Plain' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'xml', label: 'HTML/XML' },
  { value: 'css', label: 'CSS' },
  { value: 'json', label: 'JSON' },
  { value: 'bash', label: 'Bash' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'sql', label: 'SQL' },
  { value: 'php', label: 'PHP' },
  { value: 'markdown', label: 'Markdown' },
];

export function CodeBlockView({ node, updateAttributes, extension }: NodeViewProps) {
  const current: string =
    node.attrs.language || extension.options.defaultLanguage || 'plaintext';

  return (
    <NodeViewWrapper className={styles.wrapper}>
      <select
        className={styles.langSelect}
        contentEditable={false}
        value={current}
        onChange={(e) => updateAttributes({ language: e.target.value })}
      >
        {LANGUAGES.map((l) => (
          <option key={l.value} value={l.value}>{l.label}</option>
        ))}
      </select>
      <pre className={styles.pre}>
        <NodeViewContent<'code'> as="code" className={`hljs language-${current}`} />
      </pre>
    </NodeViewWrapper>
  );
}
