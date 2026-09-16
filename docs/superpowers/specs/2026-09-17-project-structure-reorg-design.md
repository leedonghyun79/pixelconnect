# 프로젝트 구조 재정리 (private folder 콜로케이션)

## 배경

`src/components`에 45개 파일이 플랫하게 쌓여 있고, 이 중 16개 컴포넌트 + temp 파일 2개는 어디서도 import되지 않는 죽은 코드다. 나머지는 성격이 다른 세 그룹(전역 공통 / 홈 전용 섹션 / 라우트 전용)이 구분 없이 섞여 있어, 어떤 컴포넌트가 어디서 쓰이는지 파악하기 어렵고 스타일(css module)도 같은 위치에 뒤섞여 유지보수가 힘들다.

Next.js App Router의 private folder(`_folder`) 컨벤션을 활용해 라우팅에 영향 없이 파일을 목적별로 콜로케이션한다.

## 목표

- 전역 공통 컴포넌트와 라우트 전용 컴포넌트를 위치로 명확히 구분
- 죽은 코드 제거
- 각 페이지의 스타일 파일을 `page.module.css`로 통일해 어떤 css가 어떤 page.tsx 것인지 즉시 알 수 있게 함

## 범위

URL 구조는 변경하지 않는다 (route group을 쓰지 않기로 결정 — 라우트가 6개뿐이라 추가 그룹핑의 이득이 적음). 순수하게 파일 위치 재배치 + 죽은 파일 삭제만 수행한다.

## 삭제 대상 (미사용 확인됨, `src/app` 어디서도 import 없음)

`src/components`에서 삭제:
About, Blog, Contact, Cursor, Features, Maintenance, Marquee, Projects, Services, Solution, DiagonalBeamsCanvas, FlowWave3D, Geo3DCanvas, GridWaveCanvas, RibbonCanvas, SectionGridBg (각 `.tsx` + 대응 `.module.css` 있으면 함께), `Portfolio_temp.txt`, `WhyUs_temp.txt`.

## 최종 구조

### 1. 전역 공통 컴포넌트 — `src/components/` 유지

`layout.tsx`에서 쓰거나 2개 이상 라우트에서 재사용되는 컴포넌트는 그대로 둔다:
Navbar, Footer, SmoothScroll, DevNotice, TurnstileWidget, PageHero, Stats (각각 대응 `.module.css` 포함).

`src/lib/`, `src/data/`는 변경 없음.

### 2. 홈 전용 섹션 — `app/_components/`

`app/page.tsx`(홈)에서만 쓰이는 섹션 컴포넌트를 이동:
Hero, PainPoint, WhyUs, Portfolio, Process, Testimonials, Pricing, FAQ, FinalCTA (+ 각 `.module.css`).

`app/page.tsx`의 import 경로를 `@/components/Hero` → `@/app/_components/Hero` (또는 상대경로 `./_components/Hero`) 형태로 수정.

### 3. 라우트 전용 컴포넌트 — 각 라우트 하위 `_components/`

- `app/column/_components/ColumnList.tsx`
- `app/column/[id]/_components/HighlightCode.tsx`
- `app/contact/_components/ContactForm.tsx`
- `app/reviews/_components/ReviewList.tsx`
- `app/services/_components/ServiceDetail.tsx` + `ServiceDetail.module.css`

각 라우트의 `page.tsx` import 경로를 `_components/...`로 수정.

### 4. 페이지 스타일 파일명 통일 — `page.module.css`

| 기존 | 변경 |
|---|---|
| `app/column/column.module.css` | `app/column/page.module.css` |
| `app/column/[id]/detail.module.css` | `app/column/[id]/page.module.css` |
| `app/contact/contact.module.css` | `app/contact/page.module.css` |
| `app/reviews/reviews.module.css` | `app/reviews/page.module.css` |
| `app/portfolio/[slug]/detail.module.css` | `app/portfolio/[slug]/page.module.css` |

각 `page.tsx`의 css import 구문 및 클래스명 참조는 파일 내용 변경 없이 import 경로만 수정 (파일명만 바뀌므로 클래스명 자체는 그대로).

`app/portfolio/page.tsx`는 전용 css 파일이 없으므로 변경 없음 (필요 시 `Stats` 등 공통 컴포넌트의 스타일만 사용).

## 영향받지 않는 파일

`layout.tsx`, `globals.css`, `not-found.tsx`, `not-found.module.css`, `robots.ts`, `sitemap.ts`, `feed.xml/route.ts`, `favicon.ico`, `icon.png`는 위치·이름 변경 없음.

## 검증

- `npm run build` (또는 `next build`)로 타입/임포트 에러 없는지 확인
- `npm run dev`로 로컬 구동 후 홈, 칼럼 목록/상세, 포트폴리오 목록/상세, 후기, 서비스, 문의 페이지를 직접 방문해 렌더링·스타일 깨짐 없는지 확인
- git에서 파일 이동은 `git mv`로 수행해 히스토리 보존
