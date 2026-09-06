# 칼럼 에디터 Quill → Tiptap 마이그레이션 설계

작성일: 2026-09-06

## 목표

`src/app/column/write` 페이지의 본문 에디터를 `react-quill-new` + `quill-image-resize-module-react`
에서 Tiptap(헤드리스)으로 교체한다. 저장/조회는 현재의 데모 상태를 유지하고, 이미지는 base64
data URL, 에디터 출력은 HTML 문자열을 유지한다.

## 범위

- **포함**: write 페이지 에디터 컴포넌트 전면 교체, 툴바 재구현, 이미지 리사이즈 + 커스텀
  이미지 툴바(교체/정렬/삭제/Alt/링크) 재현, 폰트 크기·색상 확장.
- **제외**: DB 저장 연동, 이미지 업로드 백엔드(R2), 테이블/임베드, 코드블록 문법
  하이라이팅, 블록 에디터(슬래시 메뉴/드래그 정렬) 방향. 모두 후속 과제.

## 접근

접근법 A — 순수 헤드리스 + 기존 CSS 재사용. 현재 코드가 이미 커스텀 DOM 조작 방식이라
Tiptap 철학과 잘 맞고, 마이그레이션이 사실상 API 치환 수준이다.

## 파일 구조

```
src/app/column/write/
  page.tsx                     # 폼 유지, 에디터만 <ColumnEditor>로 교체
  write.module.css             # .ql-* / image-resize-module-* 규칙 제거, 폼 스타일 유지

  editor/
    ColumnEditor.tsx           # useEditor + <EditorContent> + <Toolbar> 조립
    ColumnEditor.module.css    # 에디터 본문 타이포/여백 (기존 .ql-editor 스타일 이식)
    Toolbar.tsx                # editor 인스턴스 받아 명령 실행 + active 상태 표시
    Toolbar.module.css
    extensions/
      FontSize.ts              # textStyle 기반 fontSize 속성 확장 (10~48px 11단계)
      index.ts                 # 확장 배열 모아서 export
    image/
      ResizableImage.ts        # @tiptap/extension-image 확장: width/align 속성 + NodeView
      ResizableImageView.tsx   # NodeView: <img> + 드래그 리사이즈 핸들 + 선택 시 ImageToolbar
    ImageToolbar.tsx           # 기존 파일 이동, 내부 로직을 Tiptap 명령으로 교체
    ImageToolbar.module.css    # 기존 그대로 이동
```

### 유닛 경계

- `ColumnEditor` — props: `{ value: string; onChange: (html: string) => void; placeholder?: string }`.
  제어 컴포넌트. Tiptap 내부 구현은 캡슐화. SSR 회피를 위해 `next/dynamic`(`ssr: false`)로 로드.
- `Toolbar` — prop: `editor`. 버튼 → `editor.chain().focus().<command>().run()`. 활성 상태는
  `editor.isActive(...)`.
- `ResizableImageView` — NodeView 하나. 이미지 DOM + 리사이즈 + 선택 상태.
- `ImageToolbar` — props: `editor`, `getPos`, 이미지 DOM 참조. 교체/정렬/삭제/Alt/링크 명령.
- `extensions/` — 순수 설정, UI 없음.

## 확장 구성 & 서식 매핑

| 기능 | Tiptap 확장 | 비고 |
|---|---|---|
| 문단/기본 | `StarterKit` | heading `levels: [2, 3]` (H1 제외 — 글 제목과 충돌) |
| 볼드/이탤릭/취소선/인라인코드/코드블록/인용문/구분선/리스트 | `StarterKit` 포함 | 코드블록은 plain |
| 밑줄 | `@tiptap/extension-underline` | |
| 링크 | `@tiptap/extension-link` | `openOnClick: false`, autolink |
| 정렬 | `@tiptap/extension-text-align` | `types: ['heading', 'paragraph']` |
| 글자색 | `@tiptap/extension-color` + `@tiptap/extension-text-style` | |
| 배경색(형광펜) | `@tiptap/extension-highlight` | `multicolor: true` |
| 폰트 크기 | 커스텀 `FontSize.ts` | textStyle에 fontSize 속성, `10/12/14/16/18/20/24/28/32/36/48px` |
| 이미지 + 리사이즈 | 커스텀 `ResizableImage.ts` | `@tiptap/extension-image` 확장, width/align 속성 + NodeView |
| placeholder | `@tiptap/extension-placeholder` | |

- 출력: `editor.getHTML()` → 현재와 동일한 HTML 문자열. `onUpdate`에서 `onChange(editor.getHTML())`.
- 초기값: `value` prop을 `content`로 주입. 외부에서 `value`가 바뀌면(리셋 등) `editor.commands.setContent`.
- Quill `clean` → `unsetAllMarks()` + `clearNodes()` 버튼.
- 첫 이미지 썸네일 추출: 기존 정규식 로직을 `page.tsx`에 그대로 유지(HTML 출력이므로 호환).

## 이미지 리사이즈 & 커스텀 툴바

- `ResizableImage`는 `@tiptap/extension-image`를 확장하여 `width`(문자열, px 또는 %), `align`
  (`left|center|right`), `alt`, `href`(링크 감싸기용) 속성 추가. `addNodeView`로
  `ReactNodeViewRenderer(ResizableImageView)` 지정.
- `ResizableImageView`:
  - `<NodeViewWrapper>` 안에 `<img>` 렌더. `selected`(NodeView prop)일 때 우측 하단 등
    모서리 드래그 핸들 표시 → 마우스 이동량으로 `updateAttributes({ width })`.
  - 선택 시 이미지 위에 `ImageToolbar`를 절대 위치로 렌더(기존 위치 계산 로직 이식).
  - `align`은 wrapper의 `margin`/`text-align`으로 반영. HTML 직렬화 시 인라인 style로 출력해
    상세 페이지 `dangerouslySetInnerHTML`에서도 동일하게 보이도록 `renderHTML`에서 처리.
- `ImageToolbar` 로직 치환:
  - 교체: 파일 → FileReader → `editor.chain().focus().setNodeSelection(getPos()).run()` 후
    `updateAttributes({ src })` (같은 위치 유지).
  - 정렬: `updateAttributes({ align })`.
  - 삭제: `editor.chain().focus().deleteRange({ from: getPos(), to: getPos() + 1 }).run()`.
  - Alt: `updateAttributes({ alt })`.
  - 링크: `updateAttributes({ href })` — `renderHTML`에서 `href` 있으면 `<a>`로 감싸 출력.

## 의존성 변경

추가:
- `@tiptap/react`, `@tiptap/pm`, `@tiptap/starter-kit`
- `@tiptap/extension-underline`, `@tiptap/extension-link`, `@tiptap/extension-text-align`
- `@tiptap/extension-text-style`, `@tiptap/extension-color`, `@tiptap/extension-highlight`
- `@tiptap/extension-image`, `@tiptap/extension-placeholder`

제거:
- `react-quill-new`, `quill-image-resize-module-react`
- 루트의 `quill-image-resize-module.d.ts`

## 테스트 / 검증

자동화 테스트 인프라가 없으므로 수동 검증 체크리스트로 확인:

1. `npm run dev` — write 페이지 로드, 콘솔 에러 없음.
2. 각 툴바 버튼: 헤딩/볼드/이탤릭/밑줄/취소선/색상/배경색/리스트/정렬/인용문/구분선/코드/링크
   적용·해제, active 상태 표시.
3. 폰트 크기 11단계 적용, HTML 출력에 `style="font-size:..."` 반영.
4. 이미지 삽입(파일) → base64로 들어감. 선택 시 리사이즈 핸들 + 커스텀 툴바 표시.
5. 리사이즈 드래그, 정렬 좌/중/우, 교체, 삭제, Alt 저장, 링크 감싸기/해제.
6. 본문 첫 이미지가 썸네일 미리보기에 자동 반영.
7. `editor.getHTML()` 결과를 상세 페이지 `dangerouslySetInnerHTML` 컨테이너에 넣었을 때
   에디터와 시각적으로 동일(정렬/크기/색상 포함).
8. `npm run build` 통과.

## 위험 요소

- Tiptap 버전(v2 vs v3): 설치 시점 stable 기준으로 고정. React 18 호환 확인.
- 이미지 정렬을 인라인 style로 직렬화해야 상세 페이지에서 재현됨 — `renderHTML` 구현 주의.
- Cloudflare(opennext) 빌드에서 `next/dynamic ssr:false` 정상 동작 확인 필요(현재 Quill도
  같은 방식이라 위험 낮음).
