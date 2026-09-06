import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { common, createLowlight } from 'lowlight';
import { CodeBlockView } from './CodeBlockView';

const lowlight = createLowlight(common);

/**
 * 개발 블로그 스타일 코드 블록.
 * - lowlight(highlight.js) 문법 하이라이팅
 * - NodeView로 우측 상단 언어 선택 라벨 제공
 * 출력 HTML: <pre><code class="language-xxx">... (highlight.js theme CSS로 렌더)
 */
export const CodeBlock = CodeBlockLowlight.configure({
  lowlight,
  defaultLanguage: 'plaintext',
  HTMLAttributes: { class: 'hljs' },
}).extend({
  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockView);
  },
});
