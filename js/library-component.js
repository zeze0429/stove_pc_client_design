/**
 * 라이브러리 콘텐츠 (MD_container) — Vue 3 CDN 컴포넌트
 * -------------------------------------------------------------
 * 레퍼런스: Figma Make quartz-unique-70171087.figma.site 라이브러리 화면 실측.
 * 구성: 빠른 실행(가로 캐러셀) · 보유게임(도구 줄 + 5단 카드). 페이지 타이틀은
 * 클라이언트 레이아웃 공통(.client-page-title, library.html).
 * Figma 2026_웹전환 11769:156966 기준으로 맞춤.
 * 게임 이름 · 장르 · 썸네일은 공통 카탈로그(js/game-catalog.js)에서 가져오고,
 * 여기엔 라이브러리 고유 정보(최근 플레이 · 총 플레이 시간 · 실행 버튼 상태)만 둔다.
 * 색은 레퍼런스가 쓰는 STDS 시멘틱 토큰 그대로 (css/library.css).
 * 우측패널(js/library-panel-component.js)과는 LIBRARY_STORE로 그룹 · 게임 추가 상태를 같이 쓴다.
 */

// 빠른 실행 — 보유게임 중 플레이한 정식 게임을 최근 플레이 순으로 최대 20개 (별도 목록 없음)
var LIBRARY_QUICK_COUNT = 20;
var LIBRARY_QUICK_STEP = 4; // 화살표 한 번에 넘기는 카드 수 (레퍼런스: 4장 = 560)

// 빠른 실행 게임 광고 (Figma 2026_웹전환 11856:623971) — 두 번째 자리에 끼워 넣는 카드.
// 게임 개수(최대 20, 타이틀 옆 숫자)에는 포함하지 않는다. 카드 모양은 게임 카드와 같고
// 우측 상단 AD 뱃지 + 플레이 시간 자리에 광고 문구, 버튼은 action(play · install).
var LIBRARY_QUICK_AD_SLOT = 1; // 0부터 — 두 번째 카드
// 스토브게임(사이드바 고정 그룹)은 광고로도 빠른 실행에 넣지 않는다.
// 광고 게임(수박 만들기 2048)은 오너십 없이 설치 없이 플레이하는 게임이라 보유게임이 아니다 —
// LIBRARY_OWNED에 넣지 않으므로 보유게임 · 빠른 실행 일반 카드 · 우측패널에 나오지 않고 이 광고 자리에만 나온다.
var LIBRARY_QUICK_AD = { game: 'store-30', message: '지금 바로 즐겨보세요!', action: 'play' };

// 보유게임 — action: play(실행) · update(업데이트) · install(설치)
//   played: 마지막 플레이가 몇 분 전인지 (없으면 플레이 기록 없음), total: 총 플레이 시간
//   badges: 우측패널 게임 목록 뱃지 ['link', 'multiplay'] (사이드바와 같은 규칙)
var LIBRARY_OWNED = [
  // 화면 순서 = 이 배열 순서. 뱃지(Collection · DLC · DEMO) 게임은 한쪽에 몰리지 않게 줄 · 칸을 흩어 둠.
  // store-NN은 스토어 신작(store-30 수박 만들기는 광고 전용이라 제외) — 버튼 상태 · 최근 플레이는 시안용 임의 값
  { id: 'atom-rpg', action: 'play', collection: true, played: 60, total: '총 172시간 35분', badges: ['link', 'multiplay'] },
  { id: 'ghostrunner', action: 'update' },
  { id: 'deluvian-winds', action: 'play', played: 10, total: '총 24시간 30분' },
  { id: 'scarf', action: 'install' },
  { id: 'floppy-knight', action: 'update', played: 50000, total: '총 87시간 21분' },
  { id: 'novena-diabolos', action: 'play', played: 1500, total: '총 117시간 5분' },
  { id: 'bullet-delivery', action: 'install' },
  { id: 'atom-rpg-supporter', action: 'update' },
  { id: 'illips', action: 'play', played: 4320, total: '총 128시간 12분' },
  { id: 'undying', action: 'update' },
  { id: 'bus-world', action: 'install' },
  { id: 'yoryeong-village', action: 'play', played: 10080, total: '총 56시간 42분' },
  { id: 'hwayeonwol', action: 'install' },
  { id: 'fog-detective', action: 'update', played: 52000, total: '총 9시간 47분' },
  { id: 'under-blue-horizon', action: 'play', played: 10200, total: '총 128시간 12분' },
  { id: 'suicide-countdown', action: 'install' },
  { id: 'happy-quest', action: 'play', played: 20160, total: '총 146시간 8분' },
  { id: 'four-lights', action: 'install' },
  { id: 'eyes-nose-mouth', action: 'install' },
  { id: 'cabbage', action: 'update' },
  { id: 'utawarerumono', action: 'install' },
  { id: 'hamster-talk', action: 'update' },
  { id: 'gigabash', action: 'install' },
  { id: 'sisters', action: 'install' },
  { id: 'dice-eater', action: 'play', played: 30240, total: '총 93시간 51분' },
  { id: 'into-the-room', action: 'play', played: 30400, total: '총 56시간 42분' },
  { id: 'gigabash-4-titans', action: 'play', played: 20300, total: '총 24시간 30분' },
  { id: 'knight-overloaded', action: 'install' },
  { id: 'infinite-incantation', action: 'update' },
  { id: 'everything-is-crab', action: 'install' },
  { id: 'postal2', action: 'install' },
  { id: 'reblade', action: 'play', played: 44000, total: '총 3시간 18분' },
  { id: 'zombie-shooting-star', action: 'install' },
  { id: 'noexistencen', action: 'update' },
  { id: 'dosul', action: 'install' },
  { id: 'primal-slidey', action: 'install' },
  { id: 'critter-cove', action: 'update' },
  { id: 'store-01', action: 'install' },
  { id: 'store-02', action: 'update' },
  { id: 'store-03', action: 'install' },
  { id: 'store-04', action: 'play', played: 60000, total: '총 41시간 3분' },
  { id: 'store-05', action: 'install' },
  { id: 'store-06', action: 'install' },
  { id: 'store-07', action: 'update' },
  { id: 'store-08', action: 'play', played: 67000, total: '총 6시간 52분' },
  { id: 'flower-survivors-ribo', action: 'install' },
  { id: 'store-09', action: 'install' },
  { id: 'store-10', action: 'update' },
  { id: 'store-11', action: 'install' },
  { id: 'store-12', action: 'play', played: 74000, total: '총 19시간 8분' },
  { id: 'store-13', action: 'install' },
  { id: 'store-14', action: 'install' },
  { id: 'store-15', action: 'update' },
  { id: 'store-16', action: 'play', played: 81000, total: '총 2시간 36분' },
  { id: 'store-17', action: 'install' },
  { id: 'store-18', action: 'update' },
  { id: 'store-19', action: 'install' },
  { id: 'flower-survivors', action: 'play', played: 43200, total: '총 12시간 4분' },
  { id: 'store-20', action: 'play', played: 88000, total: '총 73시간 15분' },
  { id: 'store-21', action: 'install' },
  { id: 'store-22', action: 'install' },
  { id: 'store-23', action: 'update' },
  { id: 'store-24', action: 'play', played: 95000, total: '총 158시간 40분' },
  { id: 'store-25', action: 'install' },
  { id: 'store-26', action: 'update' },
  { id: 'store-27', action: 'install' },
  { id: 'store-28', action: 'play', played: 102000, total: '총 11시간 29분' },
  { id: 'store-29', action: 'install' },
  { id: 'storm-maid', action: 'update' },
  { id: 'store-31', action: 'update' },
  { id: 'store-32', action: 'play', played: 109000, total: '총 27시간 54분' },
  { id: 'store-33', action: 'install' },
  { id: 'store-34', action: 'update' },
  { id: 'store-35', action: 'install' },
  { id: 'store-36', action: 'play', played: 116000, total: '총 4시간 11분' },
  { id: 'store-37', action: 'install' },
  { id: 'store-38', action: 'install' },
  { id: 'store-39', action: 'update' },
  { id: 'store-40', action: 'play', played: 123000, total: '총 33시간 2분' },
  { id: 'store-41', action: 'install' },
  { id: 'store-42', action: 'update' },
  { id: 'whos-my-manito', action: 'install' },
  { id: 'store-43', action: 'install' },
  { id: 'store-44', action: 'play', played: 130000, total: '총 1시간 45분' },
  { id: 'store-45', action: 'install' },
  { id: 'store-46', action: 'install' },
  { id: 'store-47', action: 'update' },
  { id: 'store-48', action: 'play', played: 137000, total: '총 64시간 18분' },
  { id: 'store-49', action: 'install' },
  { id: 'store-50', action: 'update' },
  { id: 'store-51', action: 'install' },
  { id: 'store-52', action: 'play', played: 144000, total: '총 81시간 37분' },
  { id: 'store-53', action: 'install' },
  { id: 'store-54', action: 'install' },
  { id: 'store-55', action: 'update' },
  { id: 'store-56', action: 'play', played: 151000, total: '총 8시간 6분' },
  { id: 'store-57', action: 'install' },
  { id: 'store-58', action: 'update' },
  { id: 'store-59', action: 'install' },
  { id: 'store-60', action: 'update' },
];

// 실행 버튼 아이콘
var LIBRARY_ACTION_ICON = {
  play: 'ic-v2-media-av-play-round-fill',
  update: 'ic-v2-control-update-line',
  install: 'ic-v2-object-download-line',
};
var LIBRARY_ACTION_LABEL = { play: '실행', update: '업데이트', install: '설치' };

// 마지막 플레이(분 전) → "10분 전 플레이" · "어제 플레이" · "3일 전 플레이" …
function libraryPlayedLabel(min) {
  if (min == null) return '';
  if (min < 60) return min + '분 전 플레이';
  if (min < 1440) return Math.floor(min / 60) + '시간 전 플레이';
  if (min < 2880) return '어제 플레이';
  if (min < 10080) return Math.floor(min / 1440) + '일 전 플레이';
  if (min < 43200) return Math.floor(min / 10080) + '주 전 플레이';
  return Math.floor(min / 43200) + '달 전 플레이';
}

// 우측패널과 콘텐츠가 같이 쓰는 상태 — 두 Vue 앱이 같은 reactive 객체를 본다.
//   groups: 나의 게임 그룹 [{ id, title, gameIds }] (새 그룹이 맨 위)
//   addTargetId: 게임 추가 중인 그룹 — 있으면 보유게임 영역이 선택 UI로 바뀐다 (Figma 1131:5779 ⑦ · 3-3)
//   selectMode: 보유게임 "게임 선택" 버튼으로 들어간 선택 UI (대상 그룹 없음, Figma 클라이언트_v3.1 67959:409416)
//   viewGroupId: 그룹 화면으로 연 그룹 — 타이틀에 "보유게임 | 그룹명 · X"가 붙는다 (Figma 1131:5779 ⑧ 1260:25286)
//   viewOwned: 그룹 화면 타이틀에서 "보유게임"을 눌러 전체를 보는 중 — 그룹명은 비활성으로 남고, X를 눌러야 없어진다
// removedToast: 패널 컨텍스트메뉴 '그룹에서 제거' 직후 보유게임 하단 토스트 요청 { count, title, at }
// hiddenIds: 숨긴 게임 (보유게임 · 빠른 실행 · 우측패널에서 빠지고 숨겨진 게임 화면에만), viewHidden: 숨겨진 게임 화면을 보는 중
// 숨긴 게임은 페이지를 옮겨도 유지 — 탭 세션(sessionStorage)에 둔다
var LIBRARY_HIDDEN_KEY = 'stove-proto-library-hidden';
function libraryReadHidden() {
  try { var v = JSON.parse(sessionStorage.getItem(LIBRARY_HIDDEN_KEY) || '[]'); return Array.isArray(v) ? v : []; } catch (e) { return []; }
}
var LIBRARY_STORE = Vue.reactive({ groups: [], addTargetId: null, selectMode: false, viewGroupId: null, viewOwned: false, removedToast: null, floatingAction: null, moreOpen: false,
  hiddenIds: libraryReadHidden(), viewHidden: false,
  // 보유게임 없음 화면 (하단 메뉴패널 > 라이브러리 설정 > 보유게임 없음, Figma 클라이언트_v3.1 48960:383577) — 콘텐츠 · 패널 모두 보유게임 0개로
  noOwned: !!protoSettingsRead().libraryNoOwned,
  // 그룹 없는 게임의 자리 — 바로 아래에 오는 그룹 id, null이면 맨 아래 (설정 팝업 · 우측패널에서 순서 변경 가능, 사용자 11-09)
  ungroupedBefore: null });
protoSettingsSubscribe(function (s) { LIBRARY_STORE.noOwned = !!s.libraryNoOwned; });
// 보유게임 없음 화면의 추천 목록 "지금! 가장 핫한 게임을 해보세요." — 스토어(타팀) 상품 카드, 가격 정보는 시안 그대로
var LIBRARY_HOT_GAMES = [
  { id: 'atom-rpg', badge: 'Collection', sale: '-50%', origin: '₩32,000', price: '₩16,000' },
  { id: 'illips', badge: 'PRE · DLC', price: '₩16,000' },
  { id: 'cabbage', price: '무료', free: true },
  { id: 'four-lights', note: '구매할 수 없는 게임입니다' },
  { id: 'ghostrunner', price: '출시 예정' },
];
// 그룹 + 그룹 없는 게임을 화면 순서대로 — 그룹 없는 게임은 { id: 'ungrouped', ungrouped: true }
function libraryGroupOrder(groups) {
  var list = groups.slice();
  var before = LIBRARY_STORE.ungroupedBefore;
  var i = before ? list.findIndex(function (g) { return g.id === before; }) : -1;
  list.splice(i < 0 ? list.length : i, 0, { id: 'ungrouped', ungrouped: true });
  return list;
}
// 순서 변경 결과(id 배열, 'ungrouped' 포함 가능)를 그룹 배열 · 그룹 없는 게임 자리에 반영
function libraryApplyOrder(ids) {
  var byId = {};
  LIBRARY_STORE.groups.forEach(function (g) { byId[g.id] = g; });
  LIBRARY_STORE.groups = ids.filter(function (id) { return id !== 'ungrouped'; }).map(function (id) { return byId[id]; }).filter(Boolean);
  var k = ids.indexOf('ungrouped');
  if (k >= 0) LIBRARY_STORE.ungroupedBefore = k < ids.length - 1 ? ids[k + 1] : null;
}
// 그룹을 지우기 전에 — 그룹 없는 게임이 그 그룹 바로 위였으면 다음 그룹 위로 옮긴다
function libraryBeforeDeleteGroup(id) {
  if (LIBRARY_STORE.ungroupedBefore !== id) return;
  var g = LIBRARY_STORE.groups;
  var i = g.findIndex(function (x) { return x.id === id; });
  LIBRARY_STORE.ungroupedBefore = i >= 0 && i < g.length - 1 ? g[i + 1].id : null;
}
// 숨기기 · 숨김 해제 — 게임 메뉴(패널)와 콘텐츠가 같이 쓴다. 최근에 숨긴 게임이 앞
function libraryHideGames(ids) {
  var h = LIBRARY_STORE.hiddenIds;
  ids.slice().reverse().forEach(function (id) { if (h.indexOf(id) < 0) h.unshift(id); });
  try { sessionStorage.setItem(LIBRARY_HIDDEN_KEY, JSON.stringify(h)); } catch (e) { /* 이 페이지에서만 유지 */ }
}
// 그룹 개수 표시 — 숨긴 게임은 세지 않는다 (그룹에는 남아 있어 숨김 해제하면 다시 보인다)
function libraryGroupCount(group) {
  var h = LIBRARY_STORE.hiddenIds;
  return h.length ? group.gameIds.filter(function (id) { return h.indexOf(id) < 0; }).length : group.gameIds.length;
}
function libraryUnhideGames(ids) {
  LIBRARY_STORE.hiddenIds = LIBRARY_STORE.hiddenIds.filter(function (id) { return ids.indexOf(id) < 0; });
  try { sessionStorage.setItem(LIBRARY_HIDDEN_KEY, JSON.stringify(LIBRARY_STORE.hiddenIds)); } catch (e) { /* 이 페이지에서만 유지 */ }
}
// moreOpen: 더보기 메뉴가 열려 있는 동안 — 더보기 버튼 selected
// floatingAction: 하단 플로팅 더보기 메뉴(패널이 띄움)에서 고른 동작 { kind: 'add' (groupIds) | 'done', at } — 콘텐츠가 받아 처리
var LIBRARY_TOAST_MS = 3000;

// 썸네일 아래 뱃지 — 합본팩(collection 표시한 것)은 Collection, 카탈로그 type이 dlc · demo면 DLC · DEMO (모양은 같은 Badge/Game type)
var LIBRARY_TYPE_BADGE = { dlc: 'DLC', demo: 'DEMO' };
function libraryGame(entry) {
  var info = gameInfo(entry.id);
  var badge = entry.collection ? 'Collection' : LIBRARY_TYPE_BADGE[info.type] || '';
  return Object.assign({}, info, entry, { lastPlayed: libraryPlayedLabel(entry.played), badge: badge });
}

// 하단 플로팅 아이콘 — 아이콘 폰트는 맥에서 획이 두껍게 보정돼(font dilation) 폴더 선 · + 선 · 점 굵기가 들쭉날쭉해진다.
// Figma SVG 패스 그대로 쓰고 색만 currentColor (ic-v2-control-close-circle-line · content-folder-add-line · navigation-option-horizontal-fill)
function libraryFloatingIcon(paths) {
  return '<svg class="library-floating__icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' + paths + '</svg>';
}
var LIBRARY_FLOATING_ICON = {
  close: libraryFloatingIcon('<path d="M8.29291 15.7071C7.90239 15.3166 7.90238 14.6834 8.29291 14.2929L10.5858 12L8.29291 9.70711C7.90239 9.31658 7.90238 8.68342 8.29291 8.29289C8.68343 7.90237 9.3166 7.90237 9.70712 8.29289L12 10.5858L14.2929 8.29289C14.6834 7.90237 15.3166 7.90237 15.7071 8.29289C16.0976 8.68342 16.0976 9.31658 15.7071 9.70711L13.4142 12L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L12 13.4142L9.70712 15.7071C9.3166 16.0976 8.68343 16.0976 8.29291 15.7071Z"/><path d="M12 1.5C6.20103 1.5 1.50002 6.20101 1.50002 12C1.50002 17.799 6.20103 22.5 12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.20101 17.799 1.5 12 1.5ZM12 3.5C7.3056 3.5 3.50002 7.30558 3.50002 12C3.50002 16.6944 7.3056 20.5 12 20.5C16.6944 20.5 20.5 16.6944 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5Z" fill-rule="evenodd" clip-rule="evenodd"/>'),
  folderAdd: libraryFloatingIcon('<path d="M21.581 7.87C21.21 7.144 20.629 6.565 19.9 6.195C19.079 5.778 18.145 5.778 16.452 5.778H13.091L12.311 4.222C11.979 3.561 11.78 3.163 11.432 2.824C11.127 2.526 10.753 2.296 10.35 2.157C9.892 2 9.47 2 8.705 2H6.031C4.85 2 4.199 2 3.581 2.314C3.033 2.593 2.595 3.029 2.315 3.576C1.999 4.195 1.999 4.844 1.999 6.022V16.466C1.999 18.155 1.999 19.086 2.418 19.907C2.789 20.632 3.369 21.211 4.098 21.582C4.919 21.999 5.852 21.999 7.546 21.999H16.451C18.144 21.999 19.078 21.999 19.9 21.582C20.628 21.212 21.209 20.633 21.58 19.907C21.999 19.086 21.999 18.156 21.999 16.466V11.31C21.999 9.62 21.999 8.689 21.58 7.869L21.581 7.87ZM4.097 4.486C4.183 4.318 4.318 4.183 4.488 4.097C4.68 3.999 5.247 3.999 6.032 3.999H8.706C9.22 3.999 9.559 3.999 9.701 4.048C9.826 4.09 9.941 4.162 10.035 4.254C10.142 4.358 10.294 4.661 10.523 5.118L10.854 5.777H4C4 5.123 4.01 4.655 4.097 4.485V4.486ZM20 16.467C20 17.846 20 18.607 19.8 18.998C19.623 19.345 19.345 19.623 18.996 19.8C18.6 20 17.838 20 16.452 20H7.547C6.162 20 5.399 20 5.005 19.8C4.655 19.622 4.377 19.345 4.2 18.998C4 18.606 4 17.846 4 16.466V7.778H12.454C12.468 7.778 12.482 7.778 12.496 7.778H16.453C17.839 7.778 18.601 7.778 18.996 7.978C19.346 8.155 19.624 8.433 19.801 8.78C20.001 9.172 20.001 9.931 20.001 11.311L20 16.467ZM16.182 13.813C16.182 14.365 15.735 14.813 15.182 14.813H13.002V17.07C13.002 17.622 12.554 18.07 12.002 18.07C11.45 18.07 11.002 17.622 11.002 17.07V14.813H8.818C8.266 14.813 7.818 14.365 7.818 13.813C7.818 13.261 8.266 12.813 8.818 12.813H11.002V10.707C11.002 10.155 11.45 9.707 12.002 9.707C12.554 9.707 13.002 10.155 13.002 10.707V12.813H15.182C15.735 12.813 16.182 13.261 16.182 13.813Z"/>'),
  folderRemove: libraryFloatingIcon('<path d="M15.1816 12.8045C15.7338 12.8045 16.1814 13.2514 16.1816 13.8035C16.1816 14.3558 15.7339 14.8035 15.1816 14.8035H8.81836C8.26607 14.8035 7.81836 14.3558 7.81836 13.8035C7.8186 13.2514 8.26622 12.8045 8.81836 12.8045H15.1816Z"/><path d="M8.70508 1.99976C9.3127 1.99976 9.85471 1.98661 10.3506 2.15699L10.501 2.21363C10.8474 2.35462 11.1642 2.56197 11.4326 2.82398L11.5664 2.96656C11.8661 3.31343 12.0728 3.74837 12.3105 4.22242L13.0908 5.77711H16.4521C17.2315 5.77711 17.8765 5.77644 18.4004 5.8191C18.9359 5.86272 19.4332 5.9573 19.9014 6.19508L20.166 6.34254C20.7676 6.71045 21.2584 7.23873 21.5811 7.86988L21.6641 8.04664C21.8427 8.46205 21.9197 8.90058 21.958 9.36793C22.0008 9.89066 22 10.5345 22 11.3113V16.4666C22 17.2432 22.0008 17.8862 21.958 18.4089C21.9197 18.8766 21.8428 19.3156 21.6641 19.7312L21.5811 19.908C21.2585 20.5391 20.7675 21.0664 20.166 21.4343L19.9014 21.5828C19.4332 21.8206 18.9359 21.9142 18.4004 21.9578C17.8765 22.0004 17.2315 21.9998 16.4521 21.9998H7.54785C6.76849 21.9998 6.12353 22.0004 5.59961 21.9578C5.13084 21.9196 4.6916 21.8428 4.27539 21.6648L4.09863 21.5828C3.46626 21.2615 2.93685 20.7723 2.56738 20.1716L2.41894 19.908C2.17995 19.4403 2.08579 18.9434 2.04199 18.4089C1.99918 17.8862 2 17.2432 2 16.4666V6.02222L2.00293 5.30543C2.00648 5.08485 2.01435 4.88241 2.0293 4.69996C2.06021 4.32297 2.12899 3.94263 2.3164 3.57594L2.42773 3.37672C2.70621 2.92422 3.10575 2.55614 3.58203 2.31422L3.71973 2.24976C4.04338 2.11144 4.37568 2.05597 4.70605 2.02906C5.07192 1.99927 5.51732 1.99976 6.03125 1.99976H8.70508ZM4 16.4666C4 17.2763 4.00058 17.8238 4.03516 18.2459C4.06878 18.6559 4.12956 18.8595 4.20019 18.9978L4.27148 19.1238C4.4481 19.4108 4.70146 19.6454 5.00488 19.7996L5.12402 19.8503C5.25997 19.8989 5.45257 19.9394 5.76172 19.9646C6.18563 19.9991 6.73554 19.9998 7.54785 19.9998H16.4521C17.2645 19.9998 17.8144 19.9991 18.2383 19.9646C18.6503 19.931 18.8554 19.8705 18.9951 19.7996L19.1221 19.7283C19.4106 19.5518 19.6457 19.2993 19.7998 18.9978L19.8506 18.8796C19.899 18.7449 19.9396 18.5535 19.9648 18.2459C19.9994 17.8238 20 17.2763 20 16.4666V11.3113C20 10.5017 19.9994 9.95404 19.9648 9.53199C19.9396 9.2246 19.8989 9.0329 19.8506 8.8982L19.7998 8.78004C19.6456 8.47842 19.4108 8.22506 19.1221 8.04859L18.9951 7.97828C18.8554 7.90731 18.6504 7.84682 18.2383 7.81324C17.8144 7.77871 17.2644 7.77711 16.4521 7.77711H4V16.4666ZM6.03125 3.99976C5.48442 3.99976 5.13404 4.00057 4.86816 4.02222C4.74092 4.03259 4.65528 4.04658 4.59668 4.06031L4.4873 4.09742C4.36094 4.16164 4.25219 4.2542 4.16992 4.36695L4.09668 4.48609C4.07763 4.52337 4.04319 4.61036 4.02246 4.86304C4.00421 5.08573 4.00161 5.36823 4.00098 5.77711H10.8535L10.5234 5.1189C10.2711 4.6158 10.166 4.42434 10.0967 4.32789L10.0352 4.25465C9.96428 4.18546 9.88244 4.12805 9.79297 4.0857L9.70019 4.04859C9.59579 4.01279 9.45645 3.99976 8.70508 3.99976H6.03125Z" fill-rule="evenodd" clip-rule="evenodd"/>'),
  more: libraryFloatingIcon('<path d="M5.25 14.25C6.49264 14.25 7.5 13.2426 7.5 12C7.5 10.7574 6.49264 9.75 5.25 9.75C4.00736 9.75 3 10.7574 3 12C3 13.2426 4.00736 14.25 5.25 14.25Z"/><path d="M14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12Z"/><path d="M21 12C21 13.2426 19.9926 14.25 18.75 14.25C17.5074 14.25 16.5 13.2426 16.5 12C16.5 10.7574 17.5074 9.75 18.75 9.75C19.9926 9.75 21 10.7574 21 12Z"/>'),
};

// 그룹명 최대 길이 · 중복 문구 — 우측패널과 같은 규칙 (가이드의 20자 대신 패널과 통일, 사용자 결정)
var LIBRARY_ADD_GROUP_NAME_MAX = 30;
var LIBRARY_ADD_GROUP_MAX = 20;
var LIBRARY_ADD_GROUP_DUP_MSG = '이 이름은 이미 사용 중이에요. 다른 이름을 입력해 주세요.';

/**
 * 그룹에 추가 팝업 (Figma 클라이언트_v3.1 67967:409417 "그룹추가 팝업") — 게임 선택으로 들어온 선택 UI에서 하단 "그룹에 추가".
 * 공용 레이어 셸(LayerDialog) · 너비 404. 위: 그룹 만들기(버튼 → 누르면 입력칸 + 완료), 아래: 나의 그룹 목록(체크박스, 여러 개).
 * 고른 게임이 전부 이미 들어 있는 그룹은 비활성(체크된 채). 새로 만든 그룹은 목록 맨 위에 체크 안 된 채로 들어온다.
 * 확인 = 체크한 그룹에 게임 추가 (부모가 그룹 데이터에 넣고 선택 UI를 끝낸다)
 */
var LibraryAddToGroupDialog = {
  components: { 'layer-dialog': LayerDialog },
  props: {
    groups: { type: Array, required: true }, // LIBRARY_STORE.groups (새 그룹은 여기에 바로 넣는다)
    gameIds: { type: Array, required: true },
  },
  emits: ['confirm', 'close'],
  data: function () {
    return { checked: [], creating: false, text: '', error: '', focused: false, overflow: false, listOverflow: false };
  },
  computed: {
    canCreate: function () { return this.groups.length < LIBRARY_ADD_GROUP_MAX; },
    canSubmitName: function () { return !this.error && this.text.trim().length > 0; },
    // 확인은 체크한 그룹만 본다 — 이름 입력 에러는 완료 버튼만 막는다 (사용자 정정)
    canConfirm: function () { return this.checked.length > 0; },
  },
  mounted: function () { this.$nextTick(this.checkListOverflow); },
  methods: {
    // 고른 게임이 전부 이미 들어 있는 그룹 — 비활성
    isFull: function (g) {
      return this.gameIds.every(function (id) { return g.gameIds.indexOf(id) >= 0; });
    },
    isChecked: function (g) { return this.checked.indexOf(g.id) >= 0; },
    toggle: function (g) {
      if (this.isFull(g)) return;
      var i = this.checked.indexOf(g.id);
      if (i >= 0) this.checked.splice(i, 1); else this.checked.push(g.id);
    },
    startCreate: function () {
      if (!this.canCreate) return;
      this.creating = true;
      this.$nextTick(function () { this.$refs.input.focus(); });
    },
    // 한글 조합 중에도 값을 받는다 (패널 입력칸과 같은 이유)
    onInput: function (e) { this.text = e.target.value; this.error = ''; this.checkOverflow(); },
    checkOverflow: function () { var el = this.$refs.input; this.overflow = !!el && el.scrollLeft > 0; },
    clear: function () { this.text = ''; this.error = ''; this.overflow = false; this.$refs.input.focus(); },
    submitName: function () {
      if (!this.canSubmitName) return;
      var name = this.text.trim();
      if (this.groups.some(function (g) { return g.title === name; })) { this.error = LIBRARY_ADD_GROUP_DUP_MSG; return; }
      var id = 'g' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      this.groups.unshift({ id: id, title: name, gameIds: [], createdAt: Date.now() }); // 최신 생성 순 — 맨 위 (체크는 사용자가 직접)
      this.text = '';
      this.creating = false;
      this.$nextTick(this.checkListOverflow);
    },
    onKey: function (e) {
      if (e.isComposing) return;
      if (e.key === 'Enter') { e.preventDefault(); this.submitName(); }
    },
    // 목록이 넘치면 아래쪽에 배경색 그라디언트 (가이드 "목록 갯수가 늘어날 경우 gradiant 노출")
    checkListOverflow: function () {
      var el = this.$refs.list;
      this.listOverflow = !!el && el.scrollHeight - el.scrollTop - el.clientHeight > 1;
    },
    confirm: function () {
      if (!this.canConfirm) return;
      var ids = this.checked.slice();
      this.$emit('confirm', ids);
    },
  },
  template:
    '<layer-dialog title="그룹에 추가" width="40.4rem" @close="$emit(\'close\')">' +
      '<div class="add-group-dialog" :class="{ \'has-groups\': groups.length }" data-name="contents">' +
        // 그룹 만들기 — 버튼(tab) / 누르면 입력칸 + 완료
        '<div v-if="!creating" class="add-group-dialog__create">' +
          // 우측패널의 그룹 만들기 버튼 그대로(.library-panel__create) — 폭만 hug
          '<button class="stds-button stds-button-secondary stds-button-sm library-panel__create add-group-dialog__tab" type="button" :disabled="!canCreate" @click="startCreate" data-name="btn/create group">' +
            '<i class="ic-v2-control-add-line" aria-hidden="true"></i>그룹 만들기' +
          '</button>' +
        '</div>' +
        '<div v-else class="add-group-dialog__create add-group-dialog__create--input" data-name="그룹 만들기">' +
          '<p class="add-group-dialog__label">그룹 만들기</p>' +
          '<div class="add-group-dialog__row" data-name="input">' +
            '<label class="add-group-dialog__field" :class="{ \'is-active\': focused || text, \'is-error\': error }" data-name="Input">' +
              '<span v-if="overflow" class="add-group-dialog__fade" aria-hidden="true"></span>' +
              '<input ref="input" class="add-group-dialog__input" type="text" :value="text" :maxlength="' + LIBRARY_ADD_GROUP_NAME_MAX + '" ' +
                'placeholder="그룹 이름을 입력해주세요 (최대 ' + LIBRARY_ADD_GROUP_NAME_MAX + '자)" @input="onInput" @scroll="checkOverflow" @keyup="checkOverflow" @keydown="onKey" @focus="focused = true" @blur="focused = false" />' +
              '<button v-if="text" class="add-group-dialog__clear" type="button" aria-label="지우기" @mousedown.prevent @click="clear"><i class="ic-v2-control-close-circle-fill"></i></button>' +
            '</label>' +
            '<button class="stds-button stds-button-primary stds-button-sm add-group-dialog__done" type="button" :disabled="!canSubmitName" @mousedown.prevent @click="submitName" data-name="Button">완료</button>' +
          '</div>' +
          '<p v-if="error" class="add-group-dialog__error" data-name="유효성문구"><i class="ic-v2-state-warning-circle-fill" aria-hidden="true"></i>{{ error }}</p>' +
        '</div>' +
        '<div class="add-group-dialog__div" aria-hidden="true"></div>' +
        // 나의 그룹 목록
        '<div class="add-group-dialog__groups" data-name="나의 게임 그룹">' +
          '<p class="add-group-dialog__label">나의 그룹 목록</p>' +
          '<div v-if="groups.length" class="add-group-dialog__list-wrap">' +
            '<div ref="list" class="add-group-dialog__list" @scroll="checkListOverflow">' +
              '<button v-for="g in groups" :key="g.id" class="add-group-dialog__item" type="button" ' +
                ':class="{ \'is-checked\': isChecked(g), \'is-full\': isFull(g) }" :disabled="isFull(g)" role="checkbox" :aria-checked="String(isChecked(g) || isFull(g))" ' +
                '@click="toggle(g)" data-name="component/selection UI/dialog/list">' +
                // 공통 체크박스 sm 상자 (css/checkbox.css) — 행 전체가 버튼이라 input 없이 상태 클래스로
                '<span class="stds-checkbox stds-checkbox-sm add-group-dialog__check" aria-hidden="true" data-name="Checkbox">' +
                  '<span class="stds-checkbox-box" :class="{ \'is-checked\': isChecked(g) || isFull(g), \'is-disabled\': isFull(g) }">' +
                    '<i class="ic-v2-control-check-bold-line"></i>' +
                  '</span>' +
                '</span>' +
                '<span class="add-group-dialog__name">{{ g.title }}</span>' +
                '<span class="add-group-dialog__count" data-name="badge">{{ g.gameIds.length }}</span>' +
              '</button>' +
            '</div>' +
            '<span v-if="listOverflow" class="add-group-dialog__list-fade" aria-hidden="true"></span>' +
          '</div>' +
          '<div v-else class="add-group-dialog__empty" data-name="항목 없음">' +
            // 임시 정지 이미지 — 사용자가 APNG 리소스를 주면 교체
            '<img src="assets/library/group_empty_placeholder.png" width="120" height="120" alt="" />' +
            '<p class="stds-text4">그룹을 만들어 게임을 추가해 보세요.</p>' +
          '</div>' +
        '</div>' +
        '<button v-if="groups.length" class="stds-button stds-button-primary stds-button-md add-group-dialog__confirm" type="button" :disabled="!canConfirm" @click="confirm" data-name="Button">확인</button>' +
      '</div>' +
    '</layer-dialog>',
};

var LibraryMain = {
  // 'library-settings-dialog'는 js/library-settings-component.js가 로드되며 여기 붙인다 (그 파일이 이 파일의 상수 · 스토어를 쓴다)
  components: { 'add-to-group-dialog': LibraryAddToGroupDialog, 'stds-search-field': StdsSearchField, 'library-filter-layer': LibraryFilterLayer },
  data: function () {
    return {
      ownedAll: LIBRARY_OWNED.map(libraryGame), // 숨긴 게임 포함 전체 — 화면에는 owned(숨긴 게임 뺀 것)
      quickPage: 0,
      quickActive: 0, // 넓게 펼쳐진 카드 — 마우스를 올린 카드, 없으면 지금 페이지 첫 카드
      view: 'grid',
      query: '', // 검색 필드에 친 글자 — 엔터 · 검색 버튼을 누르면 queries에 올린다(글자는 남김)
      queries: [], // 확인한 검색어 칩 (여러 개면 모두 맞는 게임만)
      filter: libraryFilterDefault(), // 필터 레이어 (js/library-filter-component.js) — 보유게임은 정렬에 게임 줄만
      filterOpen: false,
      quickAd: protoSettingsRead().libraryQuickAd, // 하단 메뉴패널 > 빠른 실행 > 광고
      arrowRest: 0, // 방금 누른 화살표(-1 · 1) — 마우스가 나갈 때까지 hover 배경을 끈다
      store: LIBRARY_STORE,
      selected: [], // 선택 UI에서 고른 게임 id (고른 순서)
      settingsOpen: false, // 라이브러리 설정 팝업 (타이틀 옆 설정 버튼)
      addedToast: null, // 그룹에 추가한 직후 토스트 { count, title } (3초)
      // 결과 메시지 위치 (사용자 11-10): 선택 UI가 유지되면 툴 영역 안내 문구 자리(selectNotice),
      // 선택 UI가 닫히면 일반 화면으로 돌아가면서 하단 토스트(addedToast). 모양 { count, skipped, removed, title }
      selectNotice: null,
      addGroupDialog: false, // 게임 선택 모드의 그룹에 추가 팝업
      headStuck: false, // 선택 UI 고정 헤더가 위에 붙어 있음 — 유틸리티 바 뒤까지 배경을 덮는다
      ownedMinHeight: 0, // 그룹 화면에서 보유게임 영역 최소 높이(px) — 타이틀을 고정 헤더 자리까지 올릴 수 있게
    };
  },
  mounted: function () {
    var vm = this;
    protoSettingsSubscribe(function (s) { vm.quickAd = s.libraryQuickAd; });
    this._onResize = function () { vm.snapFloating(); vm.checkHeadStuck(); vm.updateOwnedMinHeight(); };
    window.addEventListener('resize', this._onResize);
    this._scrollBox = this.$refs.owned && this.$refs.owned.closest('.main');
    this._onScroll = this.checkHeadStuck.bind(this);
    if (this._scrollBox) this._scrollBox.addEventListener('scroll', this._onScroll, { passive: true });
    // 라이브러리 타이틀 옆 설정 버튼(library.html 고정 마크업) — 라이브러리 설정 팝업
    this._settingsBtn = document.querySelector('.client-page-title__setting');
    this._onSettings = function () { vm.settingsOpen = true; };
    if (this._settingsBtn) this._settingsBtn.addEventListener('click', this._onSettings);
    // 필터 레이어 바깥을 누르면 닫는다 (레이어 · 버튼은 click.stop)
    this._onDocClick = function () { vm.filterOpen = false; };
    document.addEventListener('click', this._onDocClick);
  },
  unmounted: function () {
    clearTimeout(this._toastTimer);
    document.removeEventListener('click', this._onDocClick);
    window.removeEventListener('resize', this._onResize);
    if (this._scrollBox) this._scrollBox.removeEventListener('scroll', this._onScroll);
  },
  watch: {
    // 선택 UI 진입 경로 두 가지 — 패널 게임 추가(대상 그룹) · 게임 선택 버튼(대상 없음)
    'store.addTargetId': function (id, prev) { if (id) this.store.viewHidden = false; this.onSelectEnter(id, prev); },
    'store.selectMode': function (on, prev) { this.onSelectEnter(on, prev); },
    // 보유게임 없음으로 바뀌면 고를 게임이 없으니 선택 UI · 숨겨진 게임 화면을 끝낸다
    'store.noOwned': function (on) {
      if (!on) return;
      this.selected = [];
      this.store.addTargetId = null;
      this.store.selectMode = false;
      this.store.viewHidden = false;
    },
    // 그룹 화면을 열고 닫거나 다른 그룹으로 바꾸면 맨 위(라이브러리 타이틀)부터
    'store.viewGroupId': function (id) { if (id) this.store.viewHidden = false; this.onViewChange(); },
    // 숨겨진 게임 화면을 열고 닫으면 맨 위부터 (빠른 실행은 숨긴다)
    'store.viewHidden': function () {
      this.selected = [];
      if (this._scrollBox) this._scrollBox.scrollTo({ top: 0 });
    },
    // 패널에서 그룹에서 제거 — 추가 완료 토스트와 같은 자리 · 모양, 문구만 제거 (사용자 11-09, Figma 11564:174292)
    // 더보기 메뉴 동작 — 그룹에 추가(2뎁스 그룹 · 그룹 만들기)는 그룹에 추가 팝업 확인과 같이
    // (게임 선택 진입이면 선택 UI 유지 + 툴 영역, 패널 게임 추가면 종료 + 하단 토스트 — 사용자 11-10),
    // 즐겨찾기 추가는 선택 UI만 끝낸다
    'store.floatingAction': function (a) {
      if (!a) return;
      if (a.kind === 'add') this.confirmAddGroups(a.groupIds);
      else if (a.kind === 'reset') this.selected = []; // 선택 UI 유지 · 선택만 리셋 (숨기기)
      else this.cancelAdd();
    },
    // 선택 UI 중이면 툴 영역, 아니면 하단 토스트 (사용자 11-10)
    'store.removedToast': function (t) {
      if (t) this.showResult({ count: t.count, title: t.title, removed: true });
    },
    // 선택 UI가 끝나면 툴 영역 결과 문구도 같이 없앤다. 게임을 다시 고르면 선택 안내 문구로
    selecting: function (on) { if (!on) this.selectNotice = null; },
    // 타이틀의 보유게임 ↔ 그룹명 전환은 목록만 바꾸고 스크롤은 그대로 (사용자 11-06)
    'store.viewOwned': function () { this.selected = []; },
    // 게임을 다시 고르면 결과 문구 대신 선택 안내로 — 결과와 함께 선택을 비운 경우(_keepNotice)만 예외
    'selected.length': function () {
      if (this._keepNotice) this._keepNotice = false;
      else this.selectNotice = null;
      this.$nextTick(this.snapFloating);
    },
    // 광고를 켜고 끄면 카드 수가 바뀐다 — 없어진 페이지에 머물지 않게
    quickPages: function (n) {
      if (this.quickPage > n - 1) this.goQuick(n - 1 - this.quickPage);
    },
  },
  computed: {
    owned: function () {
      if (this.store.noOwned) return [];
      var h = this.store.hiddenIds;
      return h.length ? this.ownedAll.filter(function (g) { return h.indexOf(g.id) < 0; }) : this.ownedAll;
    },
    hotGames: function () {
      return LIBRARY_HOT_GAMES.map(function (h) { return Object.assign({}, gameInfo(h.id), h); });
    },
    // 숨겨진 게임 화면 — 최근에 숨긴 게임부터
    hiddenGames: function () {
      if (this.store.noOwned) return [];
      var byId = {};
      this.ownedAll.forEach(function (g) { byId[g.id] = g; });
      return this.store.hiddenIds.map(function (id) { return byId[id]; }).filter(Boolean);
    },
    // 빠른 실행 — 플레이 기록이 있는 정식 게임(DLC · 데모 · 합본팩 · 부가 콘텐츠 제외)을 최근 순으로 최대 20개
    quick: function () {
      return this.owned
        .filter(function (g) { return g.type === 'game' && g.played != null; })
        .sort(function (a, b) { return a.played - b.played; })
        .slice(0, LIBRARY_QUICK_COUNT);
    },
    // 화면에 놓이는 카드 — 게임 목록 두 번째 자리에 광고 카드를 끼운다
    quickCards: function () {
      var cards = this.quick.map(function (g) { return Object.assign({ key: g.id, action: 'play' }, g); });
      var ad = this.quickAd && gameInfo(LIBRARY_QUICK_AD.game);
      if (ad && cards.length) {
        cards.splice(Math.min(LIBRARY_QUICK_AD_SLOT, cards.length), 0, Object.assign({}, ad, {
          key: 'ad-' + ad.id, ad: true, message: LIBRARY_QUICK_AD.message, action: LIBRARY_QUICK_AD.action,
        }));
      }
      return cards;
    },
    quickStep: function () { return LIBRARY_QUICK_STEP; },
    quickPages: function () { return Math.ceil(this.quickCards.length / LIBRARY_QUICK_STEP); },
    // 4장씩 묶은 페이지 — 각 카드에 전체 순번(index)을 붙여 둔다
    quickPageList: function () {
      var pages = [];
      this.quickCards.forEach(function (g, i) {
        var p = Math.floor(i / LIBRARY_QUICK_STEP);
        (pages[p] = pages[p] || []).push(Object.assign({ index: i }, g));
      });
      return pages;
    },
    quickTrackStyle: function () {
      // 페이지 상자(트랙 폭 100%) + 간격 20씩 넘긴다
      var p = this.quickPage;
      return { transform: 'translateX(calc(' + (-p * 100) + '% - ' + (p * 20) + 'px))' };
    },
    // 게임 추가 중인 그룹 (없으면 기본 UI)
    addTarget: function () {
      var id = this.store.addTargetId;
      return id ? this.store.groups.find(function (g) { return g.id === id; }) || null : null;
    },
    selecting: function () { return !!this.addTarget || this.store.selectMode; },
    // 그룹 화면 (⑧) — 패널에서 그룹명을 누르면. 게임 추가(선택 UI) 중에는 보유게임 전체가 필요해서 열리지 않는다
    // "그룹 없는 게임"도 그룹 메뉴에 그룹 화면 보기가 있어 같은 모양으로 연다 (어느 그룹에도 없는 보유게임)
    // 그룹에 하나도 없는 게임 수 (숨긴 게임 제외) — 라이브러리 설정 그룹 목록 맨 아래 "그룹 없는 게임"
    ungroupedCount: function () {
      var inGroup = {};
      this.store.groups.forEach(function (g) { g.gameIds.forEach(function (id) { inGroup[id] = true; }); });
      return this.owned.filter(function (g) { return !inGroup[g.id]; }).length;
    },
    // 내가 만든 그룹 화면을 보는 중 (그룹 없는 게임 · 보유게임 탭 제외)
    inUserGroup: function () { return !!this.viewGroup && this.viewGroup.id !== 'ungrouped' && !this.store.viewOwned; },
    viewGroup: function () {
      var id = this.store.viewGroupId;
      if (!id || this.addTarget) return null;
      if (id === 'ungrouped') {
        var inGroup = {};
        this.store.groups.forEach(function (g) { g.gameIds.forEach(function (gid) { inGroup[gid] = true; }); });
        return {
          id: 'ungrouped', title: '그룹 없는 게임',
          gameIds: this.owned.filter(function (g) { return !inGroup[g.id]; }).map(function (g) { return g.id; }),
        };
      }
      return this.store.groups.find(function (g) { return g.id === id; }) || null;
    },
    // 보유게임 영역의 바탕 목록 — 그룹 화면에서 그룹명이 활성이면 그 그룹 게임(그룹에 넣은 순서), 아니면 보유게임 전체
    baseOwned: function () {
      if (this.store.viewHidden) return this.hiddenGames;
      if (!this.viewGroup || this.store.viewOwned) return this.owned;
      var byId = {};
      this.owned.forEach(function (g) { byId[g.id] = g; });
      return this.viewGroup.gameIds.map(function (id) { return byId[id]; }).filter(Boolean);
    },
    // 이미 그 그룹에 들어 있는 게임 — 선택 UI에서 비활성(회색 체크)으로 보인다
    addedIds: function () {
      var map = {};
      if (this.addTarget) this.addTarget.gameIds.forEach(function (id) { map[id] = true; });
      return map;
    },
    // 선택 UI에서는 검색 칸이 사라지니 검색어 없이 보유게임 전체
    filteredOwned: function () {
      var qs = this.queries.map(function (q) { return q.toLowerCase(); });
      var list = libraryFilterGames(this.baseOwned, this.filter);
      if (!qs.length || this.selecting) return list;
      return list.filter(function (g) {
        var name = g.name.toLowerCase(), genre = g.genre.toLowerCase();
        return qs.every(function (q) { return name.indexOf(q) >= 0 || genre.indexOf(q) >= 0; });
      });
    },
    // 필터 · 검색 결과 줄 (Figma 11564:174213) — 조건이 하나라도 있으면. 선택 UI 동안은 숨긴다
    resultsActive: function () { return !this.selecting && (this.queries.length > 0 || libraryFilterActive(this.filter)); },
    // 칩 순서 — 설치된 게임 · 상품 타입 · 장르 · 검색어 (Figma 0831 메모 + 시안 순서). 누르면 그 조건만 뺀다
    resultChips: function () {
      var f = this.filter, vm = this, chips = [];
      if (f.installedOnly) chips.push({ key: 'installed', label: '설치된 게임', remove: function () { vm.filter = Object.assign({}, f, { installedOnly: false }); } });
      LIBRARY_FILTER_TYPES.forEach(function (t) {
        if (f.types.indexOf(t.key) >= 0) chips.push({ key: 'type:' + t.key, label: t.label, remove: function () { vm.filter = Object.assign({}, f, { types: f.types.filter(function (k) { return k !== t.key; }) }); } });
      });
      f.genres.forEach(function (g) {
        chips.push({ key: 'genre:' + g, label: g, remove: function () { vm.filter = Object.assign({}, f, { genres: f.genres.filter(function (k) { return k !== g; }) }); } });
      });
      this.queries.forEach(function (q) {
        // 칩을 지우면 입력칸에 같은 글자가 남아 있을 때 그것도 비운다
        chips.push({ key: 'query:' + q, label: q, remove: function () {
          vm.queries = vm.queries.filter(function (k) { return k !== q; });
          if (vm.query.trim() === q) vm.query = '';
        } });
      });
      return chips;
    },
  },
  methods: {
    goQuick: function (delta) {
      // 카드가 없을 때(보유게임 없음) 페이지 수 0 → -1로 내려가지 않게 0 아래로는 안 간다
      var next = Math.max(Math.min(this.quickPage + delta, this.quickPages - 1), 0);
      if (next === this.quickPage) return;
      this.quickPage = next;
      this.quickActive = next * LIBRARY_QUICK_STEP;
    },
    // 화살표를 누르면 넘기고, 마우스가 위에 있어도 기본 상태로 돌려 둔다
    pressArrow: function (delta) {
      this.goQuick(delta);
      this.arrowRest = delta;
    },
    hoverQuick: function (i) {
      if (Math.floor(i / LIBRARY_QUICK_STEP) === this.quickPage) this.quickActive = i;
    },
    actionIcon: function (a) { return LIBRARY_ACTION_ICON[a]; },
    actionLabel: function (a) { return LIBRARY_ACTION_LABEL[a]; },

    // 선택 UI를 시작 · 전환 · 종료하면 고른 게임은 비운다.
    // 시작할 때 보유게임 타이틀을 고정 헤더 자리(우측패널 타이틀과 같은 높이)에 앵커로 붙인다 — Figma 레퍼런스 동작
    // 고정 헤더가 sticky 자리(위 여백 + 24)에 닿았는지
    checkHeadStuck: function () {
      var box = this._scrollBox;
      var head = this.selecting && this.$refs.ownedHead;
      if (!box || !head) { this.headStuck = false; return; }
      var stickyTop = box.getBoundingClientRect().top + (parseFloat(getComputedStyle(box).paddingTop) || 0) +
        (parseFloat(getComputedStyle(head).top) || 0);
      this.headStuck = head.getBoundingClientRect().top <= stickyTop + 0.5;
    },
    onSelectEnter: function (on, prev) {
      this.selected = [];
      this.$nextTick(this.checkHeadStuck);
      if (on && !prev) {
        this.addedToast = null;
        this.$nextTick(this.scrollToOwned);
      }
    },
    // 보유게임 타이틀을 고정 헤더 자리(y82 — 사이드바 "스토어" · 우측패널 타이틀과 같은 줄)로 올린다.
    // 선택 UI 시작 · 그룹 화면 열기 · 보유게임 ↔ 그룹 전환 공통. 빠른 실행은 위에 남아 있어 스크롤하면 보인다
    scrollToOwned: function () {
      var el = this.$refs.owned;
      var box = el && el.closest('.main');
      if (!box) return;
      var top = el.getBoundingClientRect().top - box.getBoundingClientRect().top;
      box.scrollTo({ top: box.scrollTop + top - this.ownedAnchorPad(box), behavior: 'smooth' });
    },
    // 스크롤 영역 위 패딩(유틸리티 바) + 고정 헤더 위 여백 3.4rem
    ownedAnchorPad: function (box) {
      var rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 10;
      return (parseFloat(getComputedStyle(box).paddingTop) || 0) + 3.4 * rem;
    },
    // 그룹 화면은 게임이 적어도 타이틀이 그 자리까지 올라가야 한다 — 보유게임 영역을 화면 높이만큼은 잡아 둔다
    updateOwnedMinHeight: function () {
      var box = this._scrollBox;
      if (!box || !this.viewGroup) { this.ownedMinHeight = 0; return; }
      this.ownedMinHeight = box.clientHeight - this.ownedAnchorPad(box) - (parseFloat(getComputedStyle(box).paddingBottom) || 0);
    },
    // ── 선택 UI (게임 추가) — 카드 아무 곳이나 누르면 선택/해제, 이미 그룹에 있는 게임은 못 고른다 ──
    isSelected: function (g) { return this.selected.indexOf(g.id) >= 0; },
    toggleSelect: function (g) {
      if (!this.selecting || this.addedIds[g.id]) return;
      var i = this.selected.indexOf(g.id);
      if (i >= 0) this.selected.splice(i, 1);
      else this.selected.push(g.id);
    },
    // 카드 우클릭 — 우측패널의 게임 메뉴를 그 자리에 연다 (메뉴 · 그룹 동작은 패널이 맡는다). 선택 UI 중에는 열지 않는다.
    // 메뉴는 콘텐츠 영역(.main) 안에만 뜬다 — 그 사각형을 같이 넘긴다
    openCardMenu: function (e, g) {
      if (this.selecting) return;
      var r = this._scrollBox.getBoundingClientRect();
      var bar = document.querySelector('.utility-bar'); // 콘텐츠 위에 떠 있는 유틸리티 바 아래부터
      var top = bar ? Math.max(r.top, bar.getBoundingClientRect().bottom) : r.top;
      var area = { left: r.left, top: top, right: r.right, bottom: r.bottom };
      window.dispatchEvent(new CustomEvent('library-game-menu', { detail: { gameId: g.id, x: e.clientX, y: e.clientY, area: area, hidden: this.store.viewHidden } }));
    },
    // 하단 플로팅 더보기 (Figma 클라이언트_v3.1 48960:386175 "더보기 상세" — 케이스는 게임 메뉴 가이드) —
    // 여러 개 선택 메뉴(3-5-3)를 더보기 위에 연다. 메뉴 · 그룹 동작은 패널이 맡고, 결과는 store.floatingAction으로 받는다
    openMoreMenu: function (e) {
      if (!this.selected.length) return;
      var btn = e.currentTarget.getBoundingClientRect();
      var r = this._scrollBox.getBoundingClientRect();
      var ub = document.querySelector('.utility-bar');
      var top = ub ? Math.max(r.top, ub.getBoundingClientRect().bottom) : r.top;
      window.dispatchEvent(new CustomEvent('library-game-menu', { detail: {
        gameIds: this.selected.slice(), source: 'floating',
        anchor: { right: btn.right, top: btn.top },
        area: { left: r.left, top: top, right: r.right, bottom: r.bottom },
      } }));
    },
    // 이 그룹에서 제거 — 고른 게임을 보고 있는 그룹에서 빼고, 선택 UI를 끝내고 하단 토스트 (그룹에 추가 완료와 같은 흐름)
    removeFromViewGroup: function () {
      var self = this;
      var group = this.store.groups.find(function (g) { return g.id === self.store.viewGroupId; });
      if (!group || !this.selected.length) return;
      var ids = this.selected.slice();
      var removed = ids.filter(function (id) { return group.gameIds.indexOf(id) >= 0; }).length;
      group.gameIds = group.gameIds.filter(function (id) { return ids.indexOf(id) < 0; });
      // 게임 선택 버튼으로 들어온 선택 UI는 계속 유지(사용자 11-10) — 빠진 게임은 목록에서 사라지니 선택에서도 뺀다.
      // 결과는 툴 영역 (선택이 바뀌어도 이번 결과 문구는 지우지 않게 표시)
      if (this.store.selectMode) {
        this._keepNotice = true;
        this.selected = [];
      } else {
        this.store.addTargetId = null;
        if (this._scrollBox) this._scrollBox.scrollTo({ top: 0, behavior: 'smooth' });
      }
      this.showResult({ count: removed, title: group.title, removed: true });
    },
    // 그룹에 추가 팝업 확인 · 더보기 그룹 선택 — 체크한 그룹마다 아직 없는 게임만 넣는다.
    // 플로우 (사용자 11-10): 게임 선택 버튼으로 들어온 선택 UI(selectMode)는 계속 고를 수 있게 유지 → 결과는 툴 영역,
    // 우측패널 게임 추가(대상 그룹)는 일회성 → 끝나면 일반 UI로 돌아가며 하단 토스트
    confirmAddGroups: function (groupIds) {
      var self = this;
      var games = this.selected.slice();
      var picked = this.store.groups.filter(function (g) { return groupIds.indexOf(g.id) >= 0; });
      // 토스트 문구 (2026_웹전환 11564:174282) — 다 들어감 / 이미 포함된 게임 빼고 들어감 / 하나도 안 들어감(실패)
      var added = [], skipped = false;
      picked.forEach(function (g) {
        games.forEach(function (id) {
          if (g.gameIds.indexOf(id) >= 0) { skipped = true; return; }
          g.gameIds.push(id);
          if (added.indexOf(id) < 0) added.push(id);
        });
      });
      this.addGroupDialog = false;
      var title = picked.length > 1 ? picked[0].title + ' 외 ' + (picked.length - 1) + '개 그룹' : (picked[0] && picked[0].title) || '';
      // 하나도 안 들어감(전부 이미 포함)이면 어느 경로든 선택 UI를 그대로 두고 툴 영역에 ✖ 문구. 고른 게임은 그대로 둔다
      if (added.length && this.store.selectMode) {
        // 게임 선택 진입은 선택 UI 유지 + 선택만 리셋 (체크 해제 · 플로팅 비활성, 사용자 11-10). 결과 문구는 남긴다
        this._keepNotice = true;
        this.selected = [];
      } else if (added.length) {
        this.store.addTargetId = null;
        // 취소와 같이 앵커를 풀고 맨 위(라이브러리 타이틀)로 (사용자 11-03)
        if (this._scrollBox) this._scrollBox.scrollTo({ top: 0, behavior: 'smooth' });
      }
      this.showResult({ count: added.length, skipped: skipped, title: title });
    },
    // 하단 플로팅을 정수 픽셀에 맞춘다 — 버튼 폭(글자 폭)이 소수면 아이콘이 반 픽셀에 그려져 굵기가 번지고
    // 더보기 점 세 개 크기가 달라 보인다. 버튼 폭은 짝수 정수로 올리고(아이콘이 가운데 정수 위치),
    // 바 전체는 translate로 남은 소수만큼 당긴다. 펼쳐지는 중인 선택 해제는 끝난 뒤(after-enter) 다시 맞춘다
    snapFloating: function () {
      var bar = this.$el.querySelector('.library-floating__bar');
      if (!bar) return;
      var btns = bar.querySelectorAll('.library-floating__btn:not(.library-floating-clear-enter-active):not(.library-floating-clear-leave-active)');
      Array.prototype.forEach.call(btns, function (b) { b.style.width = ''; });
      Array.prototype.forEach.call(btns, function (b) { b.style.width = Math.ceil(b.getBoundingClientRect().width / 2) * 2 + 'px'; });
      bar.style.translate = '';
      var x = bar.getBoundingClientRect().left;
      var frac = x - Math.round(x);
      if (frac) bar.style.translate = -frac + 'px 0';
    },
    // 게임 선택 버튼 — 대상 그룹 없이 선택 UI로 (패널 게임 추가 중이면 그것을 끝내고)
    // 필터 레이어 오른쪽 끝 = 검색 필드 오른쪽 끝
    searchEl: function () { return this.$refs.search && this.$refs.search.$el; },
    filterBtnEl: function () { return this.$refs.filterBtn; },
    // 라이브러리 설정 > 숨겨진 게임 보기 — 팝업을 닫고 보유게임 자리에 숨겨진 게임 (그룹 화면 · 선택 UI는 끝낸다)
    groupCount: libraryGroupCount,
    openHidden: function () {
      this.settingsOpen = false;
      this.store.addTargetId = null;
      this.store.selectMode = false;
      this.store.viewGroupId = null;
      this.store.viewOwned = false;
      this.store.viewHidden = true;
    },
    startSelect: function () { this.store.addTargetId = null; this.store.selectMode = true; },
    // 그룹 화면 닫기(X) — 그룹명이 타이틀에서 빠지고 보유게임 전체로, 패널은 아무 그룹도 선택되지 않은 상태 (⑧)
    closeGroupView: function () {
      this.store.viewGroupId = null;
      this.store.viewOwned = false;
    },
    // 그룹 화면을 열거나 다른 그룹으로 바꾸면 고른 게임은 비우고 선택 UI처럼 보유게임 타이틀을 위로 올린다.
    // X로 닫으면 맨 위(라이브러리 타이틀)로 (게임 선택 취소와 같음)
    onViewChange: function () {
      this.selected = [];
      this.updateOwnedMinHeight();
      if (this.viewGroup) this.$nextTick(this.scrollToOwned);
      else if (this._scrollBox) this._scrollBox.scrollTo({ top: 0, behavior: 'smooth' });
    },
    // 검색 확인 — 칩으로 올리고 입력칸 글자는 그대로 둔다 (Figma 48960:382994, 사용자 11-05). 같은 검색어는 한 번만
    submitQuery: function (value, e) {
      if (e && e.isComposing) return; // 한글 조합 중 엔터는 무시 — 맥 크롬은 조합 끝 엔터가 한 번 더 온다
      var q = this.query.trim();
      if (!q) return;
      if (this.queries.indexOf(q) < 0) this.queries.push(q);
    },
    // 초기화 칩 — 필터 조건(정렬은 그대로)과 검색어 · 입력칸 글자를 모두 지운다
    resetResults: function () {
      this.filter = Object.assign(libraryFilterDefault(), { groupSort: this.filter.groupSort, gameSort: this.filter.gameSort });
      this.queries = [];
      this.query = '';
    },
    // 결과 메시지 — 선택 UI가 아직 열려 있으면 툴 영역, 닫혔으면 하단 토스트 (사용자 11-10). 3초 뒤 사라진다
    showResult: function (r) {
      var self = this;
      clearTimeout(this._toastTimer);
      if (this.selecting) {
        this.addedToast = null;
        this.selectNotice = r;
        this._toastTimer = setTimeout(function () { self.selectNotice = null; }, LIBRARY_TOAST_MS);
      } else {
        this.selectNotice = null;
        this.addedToast = r;
        this._toastTimer = setTimeout(function () { self.addedToast = null; }, LIBRARY_TOAST_MS);
      }
    },
    // 게임 선택 취소 — 시작할 때 걸었던 앵커를 풀고 맨 위(라이브러리 타이틀)로 되돌린다 (사용자 11-03)
    cancelAdd: function () {
      this.store.addTargetId = null;
      this.store.selectMode = false;
      if (this._scrollBox) this._scrollBox.scrollTo({ top: 0, behavior: 'smooth' });
    },
    // 그룹에 추가 — 패널 그룹에 게임이 들어가고, 선택 UI는 풀리고, 보유게임 영역 하단에 토스트 (⑦)
    addToGroup: function () {
      // 게임 선택으로 들어온 선택 UI — 대상 그룹이 없으니 그룹에 추가 팝업에서 고른다
      if (!this.addTarget && this.store.selectMode) {
        if (this.selected.length) this.addGroupDialog = true;
        return;
      }
      var group = this.addTarget;
      if (!group || !this.selected.length) return;
      var count = this.selected.length;
      Array.prototype.push.apply(group.gameIds, this.selected);
      this.store.addTargetId = null;
      this.showResult({ count: count, title: group.title });
    },
  },
  template:
    '<div class="library" :class="{ \'is-no-owned\': store.noOwned }">' +


      // ---- 빠른 실행 ----
      '<section v-if="!store.viewHidden && !store.noOwned" class="library-section library-quick">' +
        '<div class="library-section__head">' +
          '<h2 class="library-section__title">빠른 실행<span>{{ quick.length }}</span></h2>' +
          '<div class="library-quick__nav">' +
            '<button class="library-quick__arrow" :class="{ \'is-rest\': arrowRest === -1 }" type="button" aria-label="이전" :disabled="quickPage === 0" @click="pressArrow(-1)" @mouseleave="arrowRest = 0"><i class="ic-v2-control-arrow-left-line"></i></button>' +
            '<button class="library-quick__arrow" :class="{ \'is-rest\': arrowRest === 1 }" type="button" aria-label="다음" :disabled="quickPage >= quickPages - 1" @click="pressArrow(1)" @mouseleave="arrowRest = 0"><i class="ic-v2-control-arrow-right-line"></i></button>' +
          '</div>' +
        '</div>' +
        '<div class="library-quick__viewport">' +
          '<div class="library-quick__track" :style="quickTrackStyle">' +
           // 페이지(4장)마다 680 고정 상자 — 카드들이 동시에 커지고 줄어도 합이 항상 680
           '<div v-for="(page, p) in quickPageList" :key="p" class="library-quick__page" :class="{ \'is-offpage\': p !== quickPage, \'is-full\': page.length === quickStep }">' +
            '<div v-for="g in page" :key="g.key" class="library-quick__card"' +
              ' :class="{ \'is-active\': g.index === quickActive, \'library-quick__card--ad\': g.ad }" @mouseenter="hoverQuick(g.index)" @contextmenu.prevent="g.ad || openCardMenu($event, g)">' +
              '<img class="library-quick__thumb" :src="g.thumb" alt="" />' +
              // 펼친 카드 — 같은 이미지를 크게 깔고 흐리게 + 검정 60%
              '<div class="library-quick__expanded">' +
                '<div class="library-quick__backdrop"><img :src="g.thumb" alt="" /></div>' +
                '<div class="library-quick__body">' +
                  '<div class="library-quick__info">' +
                    '<span class="library-quick__icon"><img :src="g.thumb" alt="" /></span>' +
                    '<span class="library-quick__text"><span class="library-quick__genre">{{ g.genre }}</span><span class="library-quick__name">{{ g.name }}</span></span>' +
                  '</div>' +
                  '<div class="library-quick__foot">' +
                    // 게임: 최근 플레이 · 총 시간 / 광고: 같은 자리에 광고 문구
                    '<span v-if="g.ad" class="library-quick__meta"><span>{{ g.message }}</span></span>' +
                    '<span v-else class="library-quick__meta"><span>{{ g.lastPlayed }}</span><template v-if="g.total"><i aria-hidden="true"></i><span>{{ g.total }}</span></template></span>' +
                    '<button class="stds-button stds-button-blue stds-button-sm is-icon-only library-action" type="button" :aria-label="actionLabel(g.action)"><i :class="actionIcon(g.action)"></i></button>' +
                  '</div>' +
                '</div>' +
              '</div>' +
              '<span class="library-quick__border" aria-hidden="true"></span>' +
              '<img v-if="g.ad" class="library-ad-badge" src="assets/library/ad.png?v=3" alt="AD" />' +
            '</div>' +
           '</div>' +
          '</div>' +
        '</div>' +
      '</section>' +

      // ---- 보유게임 ----
      '<section ref="owned" class="library-section library-owned" :class="{ \'is-hidden-view\': store.viewHidden, \'is-selecting\': selecting, \'is-head-stuck\': selecting && headStuck }" ' +
        ':style="ownedMinHeight ? { minHeight: ownedMinHeight + \'px\' } : null">' +
        // 선택 UI에서는 타이틀 · 구분선 · 도구 줄이 위에 고정되고 아래 카드만 스크롤된다 (사용자 요청)
        '<div ref="ownedHead" class="library-owned__head">' +
        // 개수는 전체 보유게임 수 — 필터 · 검색으로 바뀌지 않는다 (사용자 11-04, 적용된 필터는 나중에 칩스로 보여줄 예정)
        // 그룹 화면 (⑧ component/title/group) — 보유게임 | 그룹명 개수 · 닫기(X).
        // 보유게임 · 그룹명은 탭처럼 하나만 활성(activated), 나머지는 비활성(inacitve, 마우스 올리면 link line).
        // 보유게임을 눌러도 그룹명은 남고, X를 눌러야 빠진다 (사용자 11-06)
        '<h2 v-if="viewGroup" class="library-section__title library-section__title--group" data-name="component/title/group">' +
          '<button class="library-crumb" :class="{ \'is-active\': store.viewOwned }" type="button" :aria-pressed="String(store.viewOwned)" ' +
            '@click="store.viewOwned = true" data-name="component/tilte">보유게임<span>{{ owned.length }}</span></button>' +
          '<i class="library-crumb__div" aria-hidden="true"></i>' +
          '<button class="library-crumb" :class="{ \'is-active\': !store.viewOwned }" type="button" :aria-pressed="String(!store.viewOwned)" ' +
            '@click="store.viewOwned = false" data-name="component/tilte">{{ viewGroup.title }}<span>{{ groupCount(viewGroup) }}</span></button>' +
          '<button class="library-crumb__close" type="button" aria-label="그룹 화면 닫기" @click="closeGroupView">' +
            '<i class="ic-v2-control-close-circle-fill"></i>' +
          '</button>' +
        '</h2>' +
        // 숨겨진 게임 화면 (Figma 클라이언트_v3.1 48960:383358 참고) — 제목 + 오른쪽 "보유 게임 목록 >"(돌아가기)
        '<div v-else-if="store.viewHidden" class="library-hidden-title">' +
          '<h2 class="library-section__title">숨겨진 게임<span>{{ hiddenGames.length }}</span></h2>' +
          '<button class="stds-button stds-button-tertiary stds-button-sm has-arrow library-tool-btn" type="button" @click="store.viewHidden = false">보유 게임 목록<i class="ic-v2-control-arrow-right-line" aria-hidden="true"></i></button>' +
        '</div>' +
        '<h2 v-else class="library-section__title">보유게임<span>{{ owned.length }}</span></h2>' +
        '<div v-if="!store.noOwned" class="library-owned__divider"></div>' + // 보유게임 없음이면 구분선도 미노출 (사용자 11-10)
        // 선택 UI — 도구 줄 자리에 게임 추가 취소 + 안내 문구 (Figma ⑦ · 0825 게임 추가 취소)
        '<div v-if="selecting" class="library-toolbar library-toolbar--select" data-name="filter area">' +
          '<button class="stds-button stds-button-tertiary stds-button-sm library-tool-btn" type="button" @click="cancelAdd"><i class="ic-v2-control-long-arrow-left-line"></i>{{ addTarget ? \'게임 추가 취소\' : \'게임 선택 취소\' }}</button>' +
          // 메시지 영역 (Figma 클라이언트_v3.1 67953:409405) — 게임 선택 전 / 선택 후
          // 결과 문구가 길어 취소 버튼을 가릴 수 있어서, 결과가 떠 있는 동안은 툴 줄 전체를 배경색 레이어로 덮고 가운데 (66867:271587)
          '<p class="library-select-msg" :class="{ \'is-result\': selectNotice }" role="status" data-name="안내 문구">' +
            // 결과 (67953:409405 그룹에 추가 · 그룹에서 제거) — 선택 UI가 유지될 때만 여기, ✔ img_done / ✖ img_error + 그룹명 칩
            '<template v-if="selectNotice">' +
              '<img class="library-select-msg__icon" :src="selectNotice.count ? \'assets/library/img_done.png\' : \'assets/library/img_error.png\'" alt="" />' +
              '<span v-if="!selectNotice.count">선택한 게임이 이미 포함되어 있습니다.</span>' +
              '<span v-else><template v-if="selectNotice.skipped">이미 포함된 게임을 제외하고 </template><b class="library-select-msg__count">{{ selectNotice.count }}개 게임</b>{{ selectNotice.removed ? \'을 해당 그룹에서 제거했습니다.\' : \'을 추가했습니다.\' }}</span>' +
              '<span class="library-select-msg__group" data-name="group"><i class="ic-v2-control-long-arrow-right-line" aria-hidden="true"></i>{{ selectNotice.title }}</span>' +
            '</template>' +
            '<template v-else>' +
              '<img class="library-select-msg__icon" src="assets/library/img_info.png" alt="" />' +
              '<span v-if="!selected.length">게임을 먼저 선택해 주세요.</span>' +
              '<span v-else><b class="library-select-msg__count">{{ selected.length }}개 게임</b>이 선택되었습니다.</span>' +
            '</template>' +
          '</p>' +
        '</div>' +
        // 보유게임 없음이면 도구 줄 전체 미노출 (사용자 11-10) — 구분선 아래 바로 빈 상태 박스
        '<div v-else-if="!store.noOwned" class="library-toolbar" data-name="filter area">' +
          '<button v-if="!store.viewHidden" class="stds-button stds-button-tertiary stds-button-sm library-tool-btn" type="button" @click="startSelect"><i class="ic-v2-control-check-circle-line"></i>게임 선택</button>' +
          '<span v-else aria-hidden="true"></span>' +
          '<div class="library-toolbar__right">' +
            '<div class="library-view-toggle" role="tablist" aria-label="보기 방식">' +
              '<button type="button" role="tab" :aria-selected="view === \'grid\'" :class="{ \'is-selected\': view === \'grid\' }" aria-label="카드 보기" @click="view = \'grid\'"><i class="ic-v2-community-view-card-fill"></i></button>' +
              '<button type="button" role="tab" :aria-selected="view === \'list\'" :class="{ \'is-selected\': view === \'list\' }" aria-label="목록 보기" @click="view = \'list\'"><i class="ic-v2-community-view-list-fill"></i></button>' +
            '</div>' +
            // 필터 — 누르면 아래에 레이어(폭 = 필터 버튼 + 여백 + 검색 필드), 열려 있는 동안 버튼은 선택 테두리
            '<button ref="filterBtn" class="stds-button stds-button-tertiary stds-button-sm library-tool-btn" :class="{ \'is-selected\': filterOpen }" type="button" :aria-expanded="String(filterOpen)" @click.stop="filterOpen = !filterOpen"><i class="ic-v2-community-filter-line"></i>필터</button>' +
            '<library-filter-layer v-if="filterOpen" v-model="filter" width="26rem" :anchor="filterBtnEl" :align-right="searchEl" @close="filterOpen = false"></library-filter-layer>' +
            // 공통 서치필드 outline sm (js/search-field-component.js, 사용자 11-03) — 폭만 186
            // 엔터 · 검색 버튼으로 확인하면 검색어 칩이 생기고 입력칸은 비워진다
            '<stds-search-field ref="search" v-model="query" class="library-search" placeholder="게임 또는 검색어 입력" @search="submitQuery"></stds-search-field>' +
          '</div>' +
        '</div>' +
        '</div>' +
        // 필터 · 검색 결과 — 개수 · 초기화 칩 · 조건 칩 (Figma 2026_웹전환 11564:174213, 칩은 우측패널과 같은 컴포넌트)
        '<div v-if="resultsActive" class="library-result" data-name="필터검색결과">' +
          '<p class="library-result__title stds-btn2 fw-bold">검색 결과<span class="library-result__count" :class="{ \'is-zero\': !filteredOwned.length }">{{ filteredOwned.length }}</span><i class="library-result__dot" aria-hidden="true"></i></p>' +
          '<div class="library-result__chips" data-name="선택한 필터">' +
            // 초기화 — 시스템 버튼 tertiary xs 알약형, 높이만 칩과 같은 28 (사용자 11-05)
            '<button class="stds-button stds-button-tertiary stds-button-xs stds-button-full library-result__reset" type="button" @click="resetResults" data-name="Chips"><i class="ic-v2-control-refresh-line" aria-hidden="true"></i>초기화</button>' +
            '<button v-for="c in resultChips" :key="c.key" class="library-chip stds-btn3 fw-medium" type="button" :aria-label="c.label + \' 조건 지우기\'" @click="c.remove()" data-name="Chips">' +
              '<span class="library-chip__label">{{ c.label }}</span><i class="ic-v2-control-close-line" aria-hidden="true"></i>' +
            '</button>' +
          '</div>' +
        '</div>' +
        // 결과 없음 안내 박스 (Figma 클라이언트_v3.1 48960:383019 empty / basic)
        '<div v-if="resultsActive && !filteredOwned.length" class="library-no-result" data-name="empty">' +
          '<img class="library-no-result__img" src="assets/library/empty_basic.svg" alt="" />' +
          '<div class="library-no-result__text">' +
            '<p class="library-no-result__title stds-title7 fw-medium">검색 결과가 없습니다.</p>' +
            '<p class="library-no-result__desc stds-text3">검색어의 단어 수를 줄이거나 필터 조건을 변경하세요.</p>' +
          '</div>' +
        '</div>' +
        // 보유게임 없음 안내 (사용자 시안 11-10 — Figma 48960:383577의 일러스트 · 오른쪽 스토어 홈 칸 대신 아이콘 + 버튼 한 줄 가운데).
        // 박스는 결과 없음 박스와 같은 셸, 버튼은 시스템 primary md + 오른쪽 아이콘
        '<div v-if="store.noOwned && !store.viewHidden && !resultsActive" class="library-no-result library-no-owned" data-name="empty">' +
          '<i class="library-no-owned__icon ic-v2-object-game-fill" aria-hidden="true"></i>' +
          '<div class="library-no-result__text">' +
            '<p class="library-no-owned__title stds-title6 fw-bold">아직 보유한 게임이 없어요.</p>' +
            '<p class="library-no-owned__desc stds-text3">재미있는 게임을 찾아서 라이브러리를 채워보세요.</p>' +
          '</div>' +
          '<a class="stds-button stds-button-primary stds-button-md library-no-owned__btn" href="app-shell.html">스토어 둘러보기<i class="ic-v2-control-arrow-right-circle-fill" aria-hidden="true"></i></a>' +
        '</div>' +
        // 숨긴 게임이 없을 때 (Figma 클라이언트_v3.1 48960:383609) — 결과 없음 박스와 같은 크기 · 글자(사용자 11-09), 일러스트만 다름
        '<div v-if="store.viewHidden && !hiddenGames.length" class="library-no-result" data-name="empty">' +
          '<img class="library-no-result__img" src="assets/library/empty_hidden.svg" alt="" />' +
          '<div class="library-no-result__text">' +
            '<p class="library-no-result__title stds-title7 fw-medium">숨겨진 게임이 없습니다.</p>' +
          '</div>' +
        '</div>' +
        '<ul class="library-grid">' +
          '<li v-for="g in filteredOwned" :key="g.id" class="library-card" ' +
            ':class="{ \'is-selectable\': selecting, \'is-selected\': selecting && isSelected(g), \'is-added\': selecting && addedIds[g.id] }" ' +
            ':aria-checked="selecting ? String(isSelected(g)) : null" :role="selecting ? \'checkbox\' : null" @click="toggleSelect(g)" @contextmenu.prevent="openCardMenu($event, g)">' +
            '<div class="library-card__thumb">' +
              '<span class="library-card__media"><img :src="g.thumb" alt="" loading="lazy" /></span>' +
              '<span class="library-card__border" aria-hidden="true"></span>' +
              // 선택 UI 체크 — STDS 체크박스 상자(css/checkbox.css) 그대로, 모양만 원. 미선택 · 선택 · 이미 그룹에 있음(비활성 선택)
              '<span v-if="selecting" class="stds-checkbox-box library-card__check" :class="{ \'is-checked\': isSelected(g) || addedIds[g.id], \'is-disabled\': addedIds[g.id] }" aria-hidden="true" data-name="Checkbox">' +
                '<i class="ic-v2-control-check-bold-line"></i>' +
              '</span>' +
              '<button v-else class="stds-button stds-button-blue stds-button-sm is-icon-only library-action library-card__action" type="button" :aria-label="actionLabel(g.action)"><i :class="actionIcon(g.action)"></i></button>' +
              '<span v-if="g.badge" class="library-card__badge">{{ g.badge }}</span>' +
            '</div>' +
            '<div class="library-card__text">' +
              '<div class="library-card__main">' +
                '<p class="library-card__genre">{{ g.genre }}</p>' +
                '<p class="library-card__name">{{ g.name }}</p>' +
              '</div>' +
              '<p v-if="g.lastPlayed && !selecting" class="library-card__played">{{ g.lastPlayed }}</p>' +
            '</div>' +
          '</li>' +
        '</ul>' +
      '</section>' +

      // ---- 보유게임 없음 — 추천 목록 (스토어 상품 카드, 썸네일 · 이름은 보유게임 카드와 같은 크기) ----
      '<section v-if="store.noOwned && !store.viewHidden" class="library-section library-hot" data-name="list">' +
        '<div class="library-section__head"><h2 class="library-section__title">지금! 가장 핫한 게임을 해보세요.</h2></div>' +
        '<ul class="library-grid">' +
          '<li v-for="g in hotGames" :key="g.id" class="library-card" data-name="component/list">' +
            '<div class="library-card__thumb">' +
              '<span class="library-card__media"><img :src="g.thumb" alt="" loading="lazy" /></span>' +
              '<span class="library-card__border" aria-hidden="true"></span>' +
              '<span v-if="g.badge" class="library-card__badge">{{ g.badge }}</span>' +
            '</div>' +
            '<div class="library-card__text library-hot__text">' +
              '<p class="library-card__name">{{ g.name }}</p>' +
              '<p v-if="g.note" class="library-hot__note">{{ g.note }}</p>' +
              '<div v-else class="library-hot__price" :class="{ \'is-free\': g.free }" data-name="가격정보">' +
                '<span v-if="g.sale" class="library-hot__sale" data-name="Badge_sale">{{ g.sale }}</span>' +
                '<span class="library-hot__amount">' +
                  '<s v-if="g.origin" class="library-hot__origin">{{ g.origin }}</s>' +
                  '<span class="library-hot__now">{{ g.price }}</span>' +
                '</span>' +
              '</div>' +
            '</div>' +
          '</li>' +
        '</ul>' +
      '</section>' +

      // 하단 플로팅 (component/selection UI/floating) — 선택 UI 동안 항상. 고르기 전엔 비활성(그레이, 그룹에 추가 · 더보기),
      // 하나 이상 고르면 오렌지로 바뀌면서 선택 해제가 앞에 펼쳐진다 (Figma 2115:32819 비활성)
      '<transition name="library-floating" @after-enter="snapFloating">' +
        '<div v-if="selecting" class="library-floating" :class="{ \'is-active\': selected.length }" data-name="하단 플로딩 컴포넌트">' +
          '<div class="library-floating__bar" data-name="component/selection UI/floating">' +
            '<div class="library-floating__group">' +
              '<transition name="library-floating-clear" @after-enter="snapFloating" @after-leave="snapFloating">' +
                '<button v-if="selected.length" class="library-floating__btn library-floating__btn--clear" type="button" @click="selected = []" data-name="component/selection UI/btn">' + LIBRARY_FLOATING_ICON.close + '선택 해제</button>' +
              '</transition>' +
              '<button class="library-floating__btn" type="button" :disabled="!selected.length" @click="addToGroup" data-name="component/selection UI/btn">' + LIBRARY_FLOATING_ICON.folderAdd + '<template v-if="inUserGroup">다른 </template>그룹에 추가</button>' +
              // 내가 만든 그룹 화면(그룹 탭 활성)에서만 — "다른 그룹에 추가" + 이 그룹에서 제거 (사용자 11-09, Figma 클라이언트_v3.1 68059:330432 플로우)
              '<button v-if="inUserGroup" class="library-floating__btn" type="button" :disabled="!selected.length" @click="removeFromViewGroup" data-name="component/selection UI/btn">' + LIBRARY_FLOATING_ICON.folderRemove + '이 그룹에서 제거</button>' +
            '</div>' +
            '<span class="library-floating__div" aria-hidden="true"></span>' +
            '<button class="library-floating__btn" type="button" :disabled="!selected.length" :class="{ \'is-selected\': store.moreOpen && selected.length }" data-floating-more @click="openMoreMenu" data-name="component/selection UI/btn">' + LIBRARY_FLOATING_ICON.more + '더보기</button>' +
          '</div>' +
        '</div>' +
      '</transition>' +

      // 라이브러리 설정 — 숨겨진 게임 보기는 팝업을 닫는다 (숨긴 게임 화면은 가이드 받으면)
      '<library-settings-dialog v-if="settingsOpen" :ungrouped-count="ungroupedCount" @close="settingsOpen = false" @hidden-games="openHidden"></library-settings-dialog>' +
      '<add-to-group-dialog v-if="addGroupDialog" :groups="store.groups" :game-ids="selected" @confirm="confirmAddGroups" @close="addGroupDialog = false"></add-to-group-dialog>' +

      // 게임 추가 · 그룹에서 제거 완료 토스트 — 보유게임 영역 하단 가운데, 3초 뒤 사라진다
      '<transition name="library-toast">' +
        '<div v-if="addedToast" class="library-toast-wrap">' +
          '<div class="library-toast" :class="{ \'is-error\': !addedToast.count }" role="status" data-name="toast popup">' +
            '<img class="library-toast__icon" :src="addedToast.count ? \'assets/library/check_circle_color.svg\' : \'assets/library/close_circle_color.svg\'" alt="" />' +
            '<div class="library-toast__body">' +
              '<p v-if="!addedToast.count" class="library-toast__text stds-title8">선택한 게임이 이미 포함되어 있습니다.</p>' +
              '<p v-else class="library-toast__text stds-title8"><template v-if="addedToast.skipped">이미 포함된 게임을 제외하고 </template><b>{{ addedToast.count }}개 게임</b>{{ addedToast.removed ? \'을 해당 그룹에서 제거했습니다.\' : \'을 추가했습니다.\' }}</p>' +
              '<span class="library-toast__group stds-cap2"><i class="ic-v2-control-long-arrow-right-line" aria-hidden="true"></i>{{ addedToast.title }}</span>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</transition>' +
    '</div>',
};

function mountLibraryMain(selector) {
  return Vue.createApp(LibraryMain).mount(selector);
}
