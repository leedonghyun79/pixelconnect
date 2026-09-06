import StarterKit from '@tiptap/starter-kit';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-text-style/color';
import { FontSize } from '@tiptap/extension-text-style/font-size';
import { BackgroundColor } from '@tiptap/extension-text-style/background-color';
import TextAlign from '@tiptap/extension-text-align';
import { Placeholder } from '@tiptap/extensions';
import { ResizableImage } from '../image/ResizableImage';
import { CodeBlock } from './CodeBlock';
// highlight.js 테마 (코드 블록 토큰 색상) — 에디터와 상세페이지 공통
import 'highlight.js/styles/atom-one-dark.css';

// 폰트 크기 프리셋 — 기존 Quill 구성과 동일하게 유지
export const FONT_SIZES = [
  '10px', '12px', '14px', '16px', '18px',
  '20px', '24px', '28px', '32px', '36px', '48px',
];

interface BuildExtensionsOptions {
  placeholder?: string;
}

export function buildExtensions({ placeholder }: BuildExtensionsOptions = {}) {
  return [
    StarterKit.configure({
      // H1은 글 제목과 충돌하므로 제외
      heading: { levels: [2, 3] },
      // 기본 plain 코드블록 대신 lowlight 하이라이팅 버전 사용
      codeBlock: false,
      // 새 탭 이동 대신 편집 우선 — 링크 클릭 시 이동하지 않음
      link: {
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
      },
    }),
    TextStyle,
    Color,
    FontSize,
    BackgroundColor,
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    CodeBlock,
    ResizableImage,
    Placeholder.configure({
      placeholder: placeholder ?? '여기에 칼럼 내용을 작성해주세요...',
    }),
  ];
}
