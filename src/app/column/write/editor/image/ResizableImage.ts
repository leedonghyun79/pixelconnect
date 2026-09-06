import Image from '@tiptap/extension-image';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { mergeAttributes } from '@tiptap/core';
import { ResizableImageView } from './ResizableImageView';

export type ImageAlign = 'left' | 'center' | 'right';

/**
 * 기본 Image 노드를 확장한다.
 * - width  : px 또는 % 문자열. 드래그 리사이즈로 갱신.
 * - align  : left | center | right. 커스텀 툴바에서 갱신.
 * - href   : 값이 있으면 <a>로 감싸 출력.
 *
 * 정렬/크기는 인라인 style로 직렬화하여 상세 페이지의
 * dangerouslySetInnerHTML 렌더에서도 동일하게 보이도록 한다.
 */
export const ResizableImage = Image.extend({
  // base64 data URL 허용 (업로드 백엔드 없이 FileReader 사용)
  addOptions() {
    return {
      ...this.parent?.(),
      inline: false,
      allowBase64: true,
      HTMLAttributes: {},
      resize: false as const,
    };
  },

  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: (element) =>
          element.style.width || element.getAttribute('width') || null,
        renderHTML: () => ({}),
      },
      align: {
        default: 'left',
        parseHTML: (element) => {
          const wrapper = element.closest('[data-align]');
          if (wrapper) return wrapper.getAttribute('data-align');
          const ml = element.style.marginLeft;
          const mr = element.style.marginRight;
          if (ml === 'auto' && mr === 'auto') return 'center';
          if (ml === 'auto') return 'right';
          return 'left';
        },
        renderHTML: () => ({}),
      },
      href: {
        default: null,
        parseHTML: (element) => {
          const parent = element.parentElement;
          return parent?.tagName === 'A'
            ? parent.getAttribute('href')
            : null;
        },
        renderHTML: () => ({}),
      },
    };
  },

  parseHTML() {
    return [{ tag: 'img[src]' }];
  },

  renderHTML({ HTMLAttributes, node }) {
    // width/align/href는 attribute-level renderHTML을 비워두었으므로
    // HTMLAttributes에 실리지 않는다. node.attrs에서 직접 읽는다.
    const width = node.attrs.width as string | null;
    const href = node.attrs.href as string | null;
    const align_ = (node.attrs.align as ImageAlign) || 'left';
    const rest = HTMLAttributes;

    const imgStyle: string[] = ['display:block', 'max-width:100%', 'height:auto'];
    if (width) imgStyle.push(`width:${width}`);
    if (align_ === 'center') imgStyle.push('margin-left:auto', 'margin-right:auto');
    else if (align_ === 'right') imgStyle.push('margin-left:auto', 'margin-right:0');
    else imgStyle.push('margin-left:0', 'margin-right:auto');

    const imgAttrs = mergeAttributes(this.options.HTMLAttributes, rest, {
      style: imgStyle.join(';'),
      'data-align': align_,
    });

    if (href) {
      return [
        'a',
        { href, target: '_blank', rel: 'noopener noreferrer' },
        ['img', imgAttrs],
      ];
    }
    return ['img', imgAttrs];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageView);
  },
});
