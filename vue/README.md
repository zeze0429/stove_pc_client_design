# STOVE GNB — Nuxt/Vue 레퍼런스

Figma `layout/GNB` (node `5705:58393`)를 개발자 스택(**Nuxt 4 + Vue 3 + TS / `<script setup>` / Scoped CSS / CSS Custom Properties**)에 맞춰 구현한 참고 코드입니다. Tailwind 미사용.

## 파일 구성

```
vue/
├─ components/
│  └─ GnbSidebar.vue          # GNB 컴포넌트 (script setup + TS + scoped CSS)
└─ assets/
   ├─ css/
   │  ├─ tokens.css            # 색상 토큰 (글로벌 + 시멘틱 다크/라이트)
   │  ├─ foundations.css       # 간격 · radius · shadow
   │  ├─ typography.css        # html 10px + 타입 스케일 + @font-face
   │  └─ stds-font-icon.embedded.css  # 아이콘 폰트 (자체 포함)
   ├─ fonts/                   # Spoqa Han Sans Neo woff2 (400/500/700)
   └─ images/gnb/              # 로고 · AD 배너 · 게임 썸네일
```

## 통합 방법

### 1. 전역 CSS 등록 — `nuxt.config.ts`

컴포넌트는 시멘틱 토큰(`var(--...)`)만 참조하므로, 토큰/파운데이션/타이포/아이콘 CSS를 **전역**으로 먼저 로드해야 합니다. **로드 순서 중요**: tokens → foundations → typography → 아이콘.

```ts
export default defineNuxtConfig({
  ssr: false,            // CSR
  css: [
    '~/assets/css/tokens.css',
    '~/assets/css/foundations.css',
    '~/assets/css/typography.css',
    '~/assets/css/stds-font-icon.embedded.css',
  ],
  router: { options: { hashMode: true } },  // Hash Router
})
```

> `typography.css`가 `html { font-size: 10px }`를 설정합니다 (**1rem = 10px** 전제). 컴포넌트의 모든 `rem` 값이 여기에 의존합니다.

### 2. 테마 전환 (다크 = 기본 / 라이트)

컴포넌트는 수정하지 않고 루트 속성만 토글합니다.

```ts
// 라이트로
document.documentElement.setAttribute('data-theme', 'light')
// 다크로 (기본)
document.documentElement.setAttribute('data-theme', 'dark')
```

### 3. 사용 예

```vue
<script setup lang="ts">
function onSelect(id: string) {
  // 라우팅 등 처리
  // router.push(...)
}
</script>

<template>
  <GnbSidebar @select="onSelect" />
</template>
```

## 컴포넌트 API

| 이름 | 종류 | 설명 |
|---|---|---|
| `select` | emit `(id: string)` | 1뎁스 메뉴 클릭 시 해당 항목 id 방출 |

현재 메뉴/게임 목록은 컴포넌트 내부 `ref` 더미 데이터입니다. 실제 연동 시 **props 또는 스토어(Pinia)/API로 주입**하도록 바꾸면 됩니다. 타입은 파일 상단 `MenuItem` / `GameItem` / `GameGroup` 참고. `GameItem.thumb`(이미지 URL) 또는 `GameItem.thumbClass`(placeholder 그라데이션 클래스) 중 하나만 채우면 됩니다.

## 인터랙션 · 상태값 (실제 STOVE 클라이언트 확인 반영)

같은 GNB를 구현한 실제 STOVE 클라이언트(Figma Make 프로토타입)를 참고해 아래 동작을 반영했습니다.

- **헤더 고정 + 스크롤 분리** — Figma 스펙(240×76, "헤더영역 : 고정")대로 로고/UPDATE 헤더는 스크롤 컨테이너 밖에 있어 항상 고정됩니다. 실제 스크롤은 `.gnb-menu`(1뎁스 메뉴 이하)에서만 일어나므로, **스크롤바가 헤더 영역까지 침범하지 않습니다**.
- **맨 위로(TOP) 버튼** — `.gnb-menu`를 40px 이상 아래로 스크롤하면 좌하단에 노출되고, 스크롤이 멈춘 뒤 **1.5초 idle이면 자동으로 사라짐**. `showTopBtn` ref + `handleGnbScroll`/`scrollToTop` 함수 참고 (`scrollRef`가 `.gnb-menu`를 가리킴).
- **즐겨찾기 그룹** — 빈 배열이 아니라 **스토브게임과 동일한 구조의 실제 게임 목록**입니다 (count 배지 포함, link 배지 등도 동일하게 붙을 수 있음).
- **1뎁스 메뉴 선택 상태** — 클릭 시 `selectedId`가 이동하며 배경 하이라이트가 전환됩니다.
- **게임 그룹 접기/펼치기** — `group.collapsed` 토글, 화살표 아이콘 회전(`transform: rotate(-90deg)`).

## 매핑 노트 (Figma → 코드)

- **색상**: 전부 STDS 시멘틱 토큰. 예) 배경 `--background-variant-2`, 선택 `--interaction-selected`, 텍스트 `--on-surface-elevation-1`, 구분선 `--inverse-elevation-3`, 썸네일 테두리 `--inverse-variant-3`.
- **타이포**: `.stds-title8`(메뉴/그룹명), `.stds-cap1`(게임명) + `.fw-bold/.fw-medium`.
- **아이콘**: `stds-font-icon` 클래스(`ic-v2-*`). 크기 = `font-size`, 색 = `color`(상속).
  - 참고: Figma의 `navigation-pc-room-fill`은 실제 폰트에 `navigation-pcbang-fill`로 존재해 그걸로 매핑.
- **하드코딩 잔여값** (STDS 토큰에 없어 원본값 유지):
  - 게임 배지 배경 `rgba(89,138,255,.2)` / `rgba(68,224,143,.2)`
  - 멀티플레이 배지 아이콘 색 `#44e08f`
  - UPDATE 배지 배경/테두리 brand-primary 10%/20%
- **이미지**: `~/assets/images/gnb/`의 실제 Figma 에셋(로고 SVG, AD PNG, 게임 썸네일 6종). Vite `import`로 참조.

## 주의

- 폰트 woff2는 한글 전체 글리프라 각 ~8MB입니다. 프로덕션은 **서브셋** 권장.
- 이미지·폰트는 로컬 에셋이므로 리포지토리에 함께 커밋해야 합니다.
