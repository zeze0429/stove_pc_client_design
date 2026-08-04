<script setup lang="ts">
/**
 * STOVE GNB (layout/GNB) — Figma node 5705:58393
 * -------------------------------------------------------------
 * Nuxt 4 + Vue 3 + TS / <script setup> / Scoped CSS
 * 색상·간격·타이포는 전부 STDS CSS Custom Property(시멘틱 토큰) 참조.
 * (전역 tokens.css / foundations.css / typography.css 선행 로드 전제)
 */

// ── 에셋 (Vite import → 빌드시 해시 URL) ─────────────────────
import logoDark from '~/assets/images/gnb/logo/stove_dark.png'
import logoLight from '~/assets/images/gnb/logo/stove_light.png'
import updateEnabled from '~/assets/images/gnb/update-btn/luncher_update_enabled.png'
import updateHoverPressed from '~/assets/images/gnb/update-btn/luncher_update_hover_pressed.png'
import adMystery from '~/assets/images/gnb/ad-mystery.png'
import topBtnDark from '~/assets/images/gnb/top-btn/TOP_dark.png'
import topBtnLight from '~/assets/images/gnb/top-btn/TOP_light.png'
import thumbLostark from '~/assets/images/gnb/game-lostark.png'
import thumbRodnine from '~/assets/images/gnb/game-rodnine.png'
import thumbChaos from '~/assets/images/gnb/game-chaos.png'
import thumbE7 from '~/assets/images/gnb/game-e7.png'
import thumbBts from '~/assets/images/gnb/game-bts.png'
import thumbTales from '~/assets/images/gnb/game-tales.png'
import thumbFloppyKnight from '~/assets/images/gnb/game-floppy-knight.png'
import thumbHwayeonwol from '~/assets/images/gnb/game-hwayeonwol.png'
import thumbDeluvianWinds from '~/assets/images/gnb/game-deluvian-winds.png'
import thumbBusWorld from '~/assets/images/gnb/game-bus-world.png'
import thumbHappyQuest from '~/assets/images/gnb/game-happy-quest.png'
import thumbAtomRpg from '~/assets/images/gnb/game-atom-rpg.png'
import thumbUnderBlueHorizon from '~/assets/images/gnb/game-under-blue-horizon.png'
import thumbIllips from '~/assets/images/gnb/game-illips.png'
import thumbCabbage from '~/assets/images/gnb/game-cabbage.png'
import thumbScarf from '~/assets/images/gnb/game-scarf.png'
import thumbFogDetective from '~/assets/images/gnb/game-fog-detective.png'
import thumbBulletDelivery from '~/assets/images/gnb/game-bullet-delivery.png'
import thumbFourLights from '~/assets/images/gnb/game-four-lights.png'
import thumbGhostrunner from '~/assets/images/gnb/game-ghostrunner.png'
import thumbUndying from '~/assets/images/gnb/game-undying.png'
import thumbSuicideCountdown from '~/assets/images/gnb/game-suicide-countdown.png'
import thumbNovenaDiabolos from '~/assets/images/gnb/game-novena-diabolos.png'
import thumbYoryeongVillage from '~/assets/images/gnb/game-yoryeong-village.png'

import { ref, computed, onMounted, onUnmounted } from 'vue'

// ── 타입 ─────────────────────────────────────────────────────
type MenuBadge = 'new' | null

interface MenuItem {
  id: string
  label: string
  /** stds-font-icon 클래스 (ic-v2-*) */
  icon: string
  badge?: MenuBadge
}

type GameBadge = 'link' | 'multiplay'

interface GameItem {
  id: string
  name: string
  /** 실제 썸네일 이미지 URL (없으면 thumbClass로 대체) */
  thumb?: string
  /** 이미지가 없을 때 쓰는 placeholder 그라데이션 클래스 */
  thumbClass?: string
  badges?: GameBadge[]
}

interface GameGroup {
  id: string
  title: string
  count?: number
  games: GameItem[]
  collapsed?: boolean
}

// ── 데이터 (실제로는 props/스토어/API로 주입) ────────────────
const menuItems = ref<MenuItem[]>([
  { id: 'store', label: '스토어', icon: 'ic-v2-navigation-home-fill' },
  { id: 'lounge', label: '라운지', icon: 'ic-v2-community-board-fill', badge: 'new' },
  { id: 'event', label: '이벤트', icon: 'ic-v2-navigation-community-event-fill' },
  { id: 'library', label: '라이브러리', icon: 'ic-v2-navigation-library-fill' },
  { id: 'download', label: '다운로드 관리', icon: 'ic-v2-object-download-line' },
  { id: 'studio', label: '스튜디오 테스트', icon: 'ic-v2-navigation-studio-test-fill' },
])

const gameGroups = ref<GameGroup[]>([
  {
    id: 'stove-games',
    title: '스토브게임',
    count: 6,
    collapsed: false,
    games: [
      { id: 'lostark', name: 'LOST ARK', thumb: thumbLostark },
      { id: 'rodnine', name: '로드나인', thumb: thumbRodnine, badges: ['link', 'multiplay'] },
      { id: 'chaos', name: '카오스 제로 나이트메어', thumb: thumbChaos },
      { id: 'e7', name: '에픽세븐', thumb: thumbE7 },
      { id: 'bts', name: 'BTS 쿠킹온 스토브 : 타이니탄 레스토랑', thumb: thumbBts },
      { id: 'tales', name: '테일즈런너', thumb: thumbTales },
    ],
  },
  {
    id: 'favorites',
    title: '즐겨찾기',
    count: 23,
    collapsed: false,
    games: [
      { id: 'fav-floppy-knight', name: '플로피 나이트', thumb: thumbFloppyKnight },
      { id: 'fav-hwayeonwol', name: '화연월의', thumb: thumbHwayeonwol },
      { id: 'fav-lostark', name: 'LOST ARK', thumb: thumbLostark },
      { id: 'fav-rodnine', name: '로드나인', thumb: thumbRodnine, badges: ['link', 'multiplay'] },
      { id: 'fav-deluvian-winds', name: '딜루비안 윈즈', thumb: thumbDeluvianWinds },
      { id: 'fav-bus-world', name: '버스 월드', thumb: thumbBusWorld },
      { id: 'fav-happy-quest', name: '해피 퀘스트', thumb: thumbHappyQuest },
      { id: 'fav-atom-rpg', name: '아톰 RPG 트루도그라드 디럭스 컬렉션', thumb: thumbAtomRpg },
      { id: 'fav-under-blue-horizon', name: 'Under the blue horizon - Aquarium', thumb: thumbUnderBlueHorizon },
      { id: 'fav-chaos', name: '카오스 제로 나이트메어', thumb: thumbChaos },
      { id: 'fav-illips', name: '일립스', thumb: thumbIllips },
      { id: 'fav-cabbage', name: '카베지', thumb: thumbCabbage },
      { id: 'fav-scarf', name: '스카프', thumb: thumbScarf },
      { id: 'fav-e7', name: '에픽세븐', thumb: thumbE7 },
      { id: 'fav-bts', name: 'BTS 쿠킹온 스토브 : 타이니탄 레스토랑', thumb: thumbBts },
      { id: 'fav-fog-detective', name: '안개 탐정: 네온 바다의 이야기', thumb: thumbFogDetective },
      { id: 'fav-bullet-delivery', name: '총알배달 우주반점: 프리퀄 단편소설 (STOVE 한정)', thumb: thumbBulletDelivery },
      { id: 'fav-four-lights', name: '네개의 빛 : 제 1세계 [Iruka Route] 시크릿 플러스', thumb: thumbFourLights },
      { id: 'fav-ghostrunner', name: '고스트러너', thumb: thumbGhostrunner },
      { id: 'fav-undying', name: '언다잉', thumb: thumbUndying },
      { id: 'fav-suicide-countdown', name: 'Suicide Countdown: 7 Days', thumb: thumbSuicideCountdown },
      { id: 'fav-novena-diabolos', name: '노베나 디아볼로스', thumb: thumbNovenaDiabolos },
      { id: 'fav-yoryeong-village', name: '요령 마을: 요령사의 길', thumb: thumbYoryeongVillage },
    ],
  },
])

// ── 상태 ─────────────────────────────────────────────────────
const selectedId = ref<string>('store')

const emit = defineEmits<{
  (e: 'select', id: string): void
}>()

function selectMenu(item: MenuItem) {
  selectedId.value = item.id
  emit('select', item.id)
}

function toggleGroup(group: GameGroup) {
  group.collapsed = !group.collapsed
}

const gameBadgeIcon: Record<GameBadge, string> = {
  link: 'ic-v2-navigation-link-fill',
  multiplay: 'ic-v2-navigation-pcbang-fill',
}

// ── 맨 위로(TOP) 버튼 ──────────────────────────────────────
// 실제 스크롤 컨테이너는 .gnb-menu (헤더는 스크롤 영역 밖, Figma 스펙: 헤더영역 고정).
// .gnb-menu를 40px 이상 스크롤하면 노출되고, 맨 위로 돌아가야(≤40px) 사라짐 —
// 버튼이므로 일정 시간 지난다고 자동으로 사라지지 않음.
const scrollRef = ref<HTMLElement | null>(null)
const gnbRef = ref<HTMLElement | null>(null)
const showTopBtn = ref(false)

function handleGnbScroll() {
  const el = scrollRef.value
  if (!el) return
  showTopBtn.value = el.scrollTop > 40
  updateThumb()
}

function scrollToTop() {
  scrollRef.value?.scrollTo({ top: 0, behavior: 'smooth' })
}

// ── 커스텀 스크롤바 ────────────────────────────────────────
// 네이티브 스크롤바는 CSS에서 완전히 숨김 — OS/브라우저 오버레이 스크롤바의
// 자동 숨김·굵기 변화 등 우리가 제어할 수 없는 동작과 충돌하기 때문에
// track/thumb을 직접 그리고 위치·크기·노출 여부를 전부 JS로 계산함.
const trackRef = ref<HTMLElement | null>(null)
const showScrollbar = ref(false)
const thumbHeight = ref(0)
const thumbTop = ref(0)
const thumbStyle = computed(() => ({ height: `${thumbHeight.value}px`, top: `${thumbTop.value}px` }))

function updateThumb() {
  const scrollEl = scrollRef.value
  const track = trackRef.value
  if (!scrollEl || !track) return
  const contentHeight = scrollEl.scrollHeight
  const visibleHeight = scrollEl.clientHeight
  if (contentHeight <= visibleHeight) {
    track.style.display = 'none'
    return
  }
  track.style.display = 'block'
  // track.clientHeight는 반드시 display:block 이후에 읽어야 함 —
  // display:none 상태에서 읽으면 항상 0이라 thumb이 최솟값(24px)으로만 그려짐
  const trackHeight = track.clientHeight
  const h = Math.max((visibleHeight / contentHeight) * trackHeight, 24)
  const maxTop = trackHeight - h
  const ratio = scrollEl.scrollTop / (contentHeight - visibleHeight)
  thumbHeight.value = h
  thumbTop.value = maxTop * ratio
}

// 사이드바(.gnb) 영역에 마우스가 있는 동안 스크롤바 노출.
// mouseenter/mouseleave 페어링은 경계에서 불안정하게 끊길 수 있어,
// mousemove로 커서 좌표를 직접 계산해 영역 안/밖을 판단하는 방식으로 처리
function handleDocumentMouseMove(e: MouseEvent) {
  const el = gnbRef.value
  if (!el) return
  const r = el.getBoundingClientRect()
  showScrollbar.value = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom
}

// 게임 그룹 접기/펼치기 등으로 콘텐츠 높이가 바뀔 때도 재계산
// (class 토글로 game-list가 display:none 되는 걸 감지)
let resizeObserver: MutationObserver | undefined

onMounted(() => {
  scrollRef.value?.addEventListener('scroll', handleGnbScroll)
  document.addEventListener('mousemove', handleDocumentMouseMove)
  window.addEventListener('resize', updateThumb)
  updateThumb()

  if (scrollRef.value) {
    resizeObserver = new MutationObserver(updateThumb)
    resizeObserver.observe(scrollRef.value, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style'],
    })
  }
})
onUnmounted(() => {
  scrollRef.value?.removeEventListener('scroll', handleGnbScroll)
  document.removeEventListener('mousemove', handleDocumentMouseMove)
  window.removeEventListener('resize', updateThumb)
  resizeObserver?.disconnect()
})
</script>

<template>
  <nav ref="gnbRef" class="gnb" aria-label="주요 메뉴">
    <!-- Header -->
    <header class="gnb-header">
      <button class="gnb-logo" type="button" aria-label="스토어 홈" @click="selectMenu(menuItems[0])">
        <img class="logo-dark" :src="logoDark" alt="STOVE" />
        <img class="logo-light" :src="logoLight" alt="STOVE" />
      </button>
      <button class="update-badge" type="button" aria-label="업데이트">
        <img class="update-badge__img update-badge__img--default" :src="updateEnabled" alt="" />
        <img class="update-badge__img update-badge__img--active" :src="updateHoverPressed" alt="" />
      </button>
    </header>

    <div ref="scrollRef" class="gnb-menu">
      <!-- 1뎁스 -->
      <div>
        <ul class="menu-group">
          <li
            v-for="item in menuItems"
            :key="item.id"
            class="menu-item"
            :class="{ 'is-selected': selectedId === item.id }"
            @click="selectMenu(item)"
          >
            <i :class="item.icon" />
            <span class="menu-item__label stds-title8">{{ item.label }}</span>
            <span v-if="item.badge === 'new'" class="badge-new">NEW</span>
          </li>
        </ul>

        <!-- AD 배너 -->
        <a class="gnb-ad" href="#">
          <img :src="adMystery" alt="미스테리 기획전 · 3월 26일 할인 종료!" />
        </a>
      </div>

      <div class="gnb-divider" />

      <!-- 게임 그룹 -->
      <section
        v-for="group in gameGroups"
        :key="group.id"
        class="game-group"
        :class="{ 'is-collapsed': group.collapsed }"
      >
        <button class="game-group__title" type="button" @click="toggleGroup(group)">
          <span class="game-group__arrow">
            <i class="ic-v2-control-select-arrow-down-fill" />
          </span>
          <span class="game-group__name stds-title8 fw-medium">{{ group.title }}</span>
          <span v-if="group.count" class="count-badge">{{ group.count }}</span>
        </button>

        <ul class="game-list">
          <li v-for="game in group.games" :key="game.id" class="game-list__item">
            <span
              class="game-thumb"
              :class="game.thumbClass"
              :style="game.thumb ? { backgroundImage: `url(${game.thumb})` } : undefined"
            />
            <span class="game-list__name stds-cap1 fw-medium">{{ game.name }}</span>
            <span v-if="game.badges?.length" class="game-badges">
              <span
                v-for="b in game.badges"
                :key="b"
                class="g-badge"
                :class="`g-badge--${b}`"
              >
                <i :class="gameBadgeIcon[b]" />
              </span>
            </span>
          </li>
        </ul>
      </section>
    </div>

    <!-- 커스텀 스크롤바 (네이티브 대체)
         .gnb-menu 밖(스크롤 안 되는 .gnb의 자식)에 둬야 스크롤 시 헤더를 침범하지 않음 -->
    <div ref="trackRef" class="gnb-scrollbar" :class="{ 'is-visible': showScrollbar }" aria-hidden="true">
      <div class="gnb-scrollbar__thumb" :style="thumbStyle" />
    </div>

    <!-- 맨 위로(TOP) 버튼: .gnb-menu 밖(스크롤 안 되는 .gnb의 자식)에 둬야
         스크롤 바운스(elastic scroll)에 버튼이 같이 튕기지 않고 완전히 고정됨 -->
    <button
      class="gnb-top-btn"
      :class="{ 'is-visible': showTopBtn }"
      type="button"
      aria-label="맨 위로"
      @click="scrollToTop"
    >
      <img class="gnb-top-btn__img gnb-top-btn__img--dark" :src="topBtnDark" alt="" />
      <img class="gnb-top-btn__img gnb-top-btn__img--light" :src="topBtnLight" alt="" />
    </button>
  </nav>
</template>

<style scoped>
/* 컴포넌트는 STDS 시멘틱 토큰만 참조. 1rem = 10px (전역 html font-size:10px 전제) */
/* .gnb 자체는 스크롤 컨테이너가 아님 — 헤더는 완전히 밖에 있고
   실제 스크롤은 .gnb-menu 안에서만 일어남 (스크롤바가 헤더 영역까지
   침범하지 않도록 헤더/스크롤 영역을 분리) */
.gnb {
  position: relative; /* 커스텀 스크롤바(.gnb-scrollbar)의 위치 기준 */
  width: 24rem;
  height: 100%;
  overflow: hidden;
  background: var(--background-variant-2);
  padding: 0 var(--spacing-20);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.gnb ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

/* ── Header (240 x 76, 고정 영역 · 스크롤 대상 아님) ── */
.gnb-header {
  flex: 0 0 auto;
  height: 7.6rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* 상단 24px / 하단 20px (대칭 아님) — 로고·업데이트뱃지가 이 안에서 정렬됨 */
  padding: 2.4rem 0 2.0rem;
  background: var(--background-variant-2);
}
.gnb-logo {
  width: 3.2rem;
  height: 3.2rem;
  padding: 0;
  border: none;
  border-radius: var(--radius-full);
  overflow: hidden;
  flex: 0 0 auto;
  cursor: pointer;
}
.gnb-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}
/* 로고 다크/라이트 테마 대응 (이미지 2장) — 기본 다크, [data-theme="light"]에서 전환 */
.gnb-logo img.logo-dark {
  display: block;
}
.gnb-logo img.logo-light {
  display: none;
}
:root[data-theme="light"] .gnb-logo img.logo-dark {
  display: none;
}
:root[data-theme="light"] .gnb-logo img.logo-light {
  display: block;
}
/* UPDATE 버튼 — 이미지 2장 대응 (80x24 표시, 소스는 160x48 @2x 고해상도) */
.update-badge {
  position: relative;
  width: 8rem;
  height: 2.4rem;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  flex: 0 0 auto;
}
.update-badge__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  transition: opacity 0.15s;
}
/* 업데이트 알림 강조: 두 이미지(기본/hover)가 서로 교차하며 계속 깜빡이고,
   hover/pressed 시 깜빡임을 멈추고 hover 이미지에 고정 */
@keyframes update-badge-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
.update-badge__img--default {
  animation: update-badge-blink 1.6s ease-in-out infinite;
}
.update-badge__img--active {
  animation: update-badge-blink 1.6s ease-in-out infinite;
  animation-delay: -0.8s; /* 절반 주기 오프셋 → 기본 이미지와 정확히 반대로 깜빡여 서로 교차 */
}
@media (prefers-reduced-motion: reduce) {
  .update-badge__img--default,
  .update-badge__img--active {
    animation: none;
  }
  .update-badge__img--default { opacity: 1; }
  .update-badge__img--active { opacity: 0; }
}

.update-badge:hover .update-badge__img--default,
.update-badge:active .update-badge__img--default {
  animation: none; /* 애니메이션이 opacity를 계속 지배하므로 정지하려면 꺼야 함 */
  opacity: 0;
}
.update-badge:hover .update-badge__img--active,
.update-badge:active .update-badge__img--active {
  animation: none;
  opacity: 1;
}

/* ── Menu (실제 스크롤 컨테이너) ── */
.gnb-menu {
  width: 100%;
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-16);
  /* padding-top 없음 — 메뉴 항목의 선택 상태(is-selected) 배경 상단이
     스크롤 영역 상단(.gnb-scrollbar 시작 위치)과 정확히 일치해야 함.
     여백을 두면 배경이 스크롤 상단보다 아래에서 시작해 어긋나 보임. */
  /* TOP 버튼(.gnb-top-btn)은 이제 .gnb-menu 밖에 고정 오버레이로 떠 있어
     스크롤 흐름에 포함되지 않음 — 버튼 높이(80px)만큼 하단 여백을 둬야
     마지막 목록 항목이 버튼에 항상 가려지지 않고 끝까지 스크롤됨. */
  padding-bottom: 80px;
  /* 네이티브 스크롤바는 완전히 숨김 — OS/브라우저의 오버레이 스크롤바
     자동 숨김·굵기 변화 등 우리가 제어할 수 없는 동작과 충돌하므로,
     아래 .gnb-scrollbar(완전 커스텀 오버레이)로 전부 대체함 */
  scrollbar-width: none;
}
.gnb-menu > * {
  flex-shrink: 0; /* 스크롤 컨테이너 안 자식이 찌그러져 사라지는 것 방지 (구분선 등) */
}
.gnb-menu::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}

/* ── 커스텀 스크롤바 (완전히 우리가 그리고 제어하는 오버레이) ──
   기본적으로 숨겨져 있다가, 사이드바(.gnb) 영역에 마우스가 있는 동안
   계속 노출됨 (JS: document mousemove로 좌표 계산해 showScrollbar 토글).
   위치·두께·색 전부 CSS로 고정되므로 OS 스크롤바 설정에 영향받지 않음.
   ※ .gnb-menu(스크롤되는 요소)의 자식이 아니라 .gnb(스크롤 안 되는 부모)의
   자식으로 둬야 함 — 안 그러면 스크롤할 때 스크롤바 자체가 콘텐츠와 함께
   밀려서 헤더 쪽을 침범하는 버그가 생김. top은 헤더 높이(7.6rem)만큼 내림. */
.gnb-scrollbar {
  position: absolute;
  top: 7.6rem;
  right: 0.8rem; /* GNB 우측벽에서 8px */
  bottom: 2rem; /* GNB 하단에서 20px */
  width: 0.4rem;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s;
  z-index: 6;
}
.gnb-scrollbar.is-visible {
  opacity: 1;
}
.gnb-scrollbar__thumb {
  position: absolute;
  left: 0;
  width: 100%;
  border-radius: var(--radius-full);
  background: var(--inverse-elevation-4);
}
.menu-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  width: 100%;
}
.menu-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  height: 3.2rem;
  padding: var(--spacing-8) var(--spacing-8) var(--spacing-8) 0.6rem;
  border-radius: var(--radius-lg);
  /* 아이콘 색 (기본 = dim). 아이콘은 color 상속, 텍스트는 아래에서 항상 밝게 고정 */
  color: var(--on-surface-elevation-4);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.menu-item > i {
  font-size: 1.8rem;
  flex: 0 0 auto;
}
.menu-item__label {
  /* 텍스트는 선택 여부와 무관하게 항상 밝게, 굵기만 상태에 따라 전환 */
  color: var(--on-surface-elevation-1);
  font-weight: 500; /* 기본 = Medium (Title8-M) */
  /* flex-grow 없음: 텍스트가 짧아도 박스가 늘어나 배지가 멀리 밀리지 않도록 함.
     min-width:0 + flex-shrink으로 긴 이름은 그대로 줄임표 처리됨. */
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.menu-item:hover {
  background: var(--interaction-hover);
}
.menu-item.is-selected {
  background: var(--interaction-selected);
  color: var(--on-surface-elevation-1); /* 선택 시 아이콘도 밝게 */
}
.menu-item.is-selected .menu-item__label {
  font-weight: 700; /* 선택 시 = Bold (Title8-B) */
}
.badge-new {
  /* 텍스트와 4px 간격 — 기본 gap 6px에서 2px만큼 당김 */
  margin-left: -0.2rem;
  font-size: 1rem;
  line-height: 1;
  font-weight: 700;
  color: var(--system-error); /* 배경 없는 빨간 글자 */
  letter-spacing: 0;
}

/* ── AD 배너 ── */
.gnb-ad {
  display: block;
  width: 20rem;
  height: 4rem;
  margin-top: var(--spacing-12);
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
}
.gnb-ad img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

/* ── Divider ── */
.gnb-divider {
  width: 100%;
  height: 1px;
  background: var(--inverse-elevation-3);
}

/* ── Game group ── */
.game-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}
.game-group__title {
  display: flex;
  align-items: center;
  gap: var(--spacing-8);
  height: 2.8rem;
  padding: 0 var(--spacing-4);
  background: none;
  border: none;
  cursor: pointer;
  width: 100%;
}
.game-group__arrow {
  width: 1.8rem;
  height: 1.8rem;
  display: grid;
  place-items: center;
  color: var(--on-surface-elevation-2);
  transition: transform 0.15s;
}
.game-group__arrow i {
  font-size: 1.2rem;
}
.game-group.is-collapsed .game-group__arrow {
  transform: rotate(-90deg);
}
.game-group__name {
  color: var(--on-surface-elevation-1);
  flex: 0 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.count-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.4rem;
  height: 1.4rem;
  padding: 0 0.3rem;
  border-radius: var(--radius-full);
  background: var(--on-surface-elevation-3);
  color: var(--background-variant-2);
  font-size: 1rem;
  font-weight: 700;
}
.game-group.is-collapsed .game-list {
  display: none;
}

/* ── Game list ── */
.game-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  padding-left: 1.4rem;
}
.game-list__item {
  display: flex;
  align-items: center;
  gap: var(--spacing-8);
  height: 2.8rem;
  padding: var(--spacing-8) var(--spacing-4);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: background 0.15s;
}
.game-list__item:hover {
  background: var(--interaction-hover);
}
.game-thumb {
  width: 1.8rem;
  height: 1.8rem;
  border-radius: var(--radius-md);
  overflow: hidden; /* 배경 이미지가 둥근 모서리 밖으로 삐져나오지 않게 확실히 클립 */
  /* Figma "Stroke: inside" → border 대신 inset box-shadow로 표현.
     border는 border-box라도 곡률 경계에서 배경 클립과 미세하게 어긋나 보일 수 있어
     항상 inset box-shadow를 사용 (모서리 곡률과 완벽히 일치, 레이아웃에 영향 없음). */
  box-shadow: inset 0 0 0 1px var(--inverse-variant-3);
  flex: 0 0 auto;
  background-size: cover;
  background-position: center;
}
.game-list__name {
  /* flex-grow 없음: 이름이 짧아도 박스가 늘어나 배지가 멀리 밀리지 않도록 함.
     min-width:0 + flex-shrink으로 긴 이름은 그대로 줄임표 처리됨. */
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--on-surface-elevation-4);
}
.game-badges {
  /* 이름 텍스트와 4px 간격 — 기본 gap 8px에서 4px만큼 당김 */
  margin-left: calc(-1 * var(--spacing-4));
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-4);
  flex: 0 0 auto;
}
.g-badge {
  width: 1.6rem;
  height: 1.6rem;
  border-radius: var(--radius-md);
  display: grid;
  place-items: center;
}
.g-badge i {
  font-size: 1.2rem;
}
.g-badge--link {
  background: rgba(89, 138, 255, 0.2);
  color: var(--stove-blue-400);
}
.g-badge--multiplay {
  background: rgba(68, 224, 143, 0.2);
  color: #44e08f;
}

/* ── 맨 위로(TOP) 버튼 ──
   .gnb-menu(스크롤되는 요소)의 자식이 아니라 .gnb(스크롤 안 되는 부모)의
   자식으로 둠 — sticky로 스크롤 컨테이너 안에 두면 macOS 등의 elastic
   overscroll(스프링 바운스)에 버튼까지 같이 튕겨 보이는 문제가 있어,
   완전히 고정되도록 absolute로 분리함. */
.gnb-top-btn {
  position: absolute;
  bottom: 0;
  left: var(--spacing-20);
  right: var(--spacing-20);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 0.2rem;
  /* 버튼 영역 전체 높이 80px 고정. padding-bottom은 이미지가 프레임 하단에
     너무 붙어 보이지 않도록 +6px 추가. */
  padding: 22px 0 calc(var(--spacing-12) + 6px);
  background: linear-gradient(180deg, transparent, var(--background-variant-2) 35%);
  color: var(--on-surface-elevation-3);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
  z-index: 5;
  border: none;
  cursor: pointer;
}
.gnb-top-btn.is-visible {
  opacity: 1;
  pointer-events: auto;
}
.gnb-top-btn:hover {
  color: var(--on-surface-elevation-1);
}
.gnb-top-btn__img {
  display: block;
  width: 36px;
  height: 36px;
}
.gnb-top-btn__img--light {
  display: none;
}
:root[data-theme="light"] .gnb-top-btn__img--dark {
  display: none;
}
:root[data-theme="light"] .gnb-top-btn__img--light {
  display: block;
}
</style>
