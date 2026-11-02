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
var LIBRARY_STORE = Vue.reactive({ groups: [], addTargetId: null, selectMode: false });
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
  more: libraryFloatingIcon('<path d="M5.25 14.25C6.49264 14.25 7.5 13.2426 7.5 12C7.5 10.7574 6.49264 9.75 5.25 9.75C4.00736 9.75 3 10.7574 3 12C3 13.2426 4.00736 14.25 5.25 14.25Z"/><path d="M14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12Z"/><path d="M21 12C21 13.2426 19.9926 14.25 18.75 14.25C17.5074 14.25 16.5 13.2426 16.5 12C16.5 10.7574 17.5074 9.75 18.75 9.75C19.9926 9.75 21 10.7574 21 12Z"/>'),
};

// 그룹명 최대 길이 · 중복 문구 — 우측패널과 같은 규칙 (가이드의 20자 대신 패널과 통일, 사용자 결정)
var LIBRARY_ADD_GROUP_NAME_MAX = 30;
var LIBRARY_ADD_GROUP_MAX = 20;
var LIBRARY_ADD_GROUP_DUP_MSG = '이 이름은 이미 사용 중이에요. 다른 이름을 입력해 주세요.';

/**
 * 그룹에 추가 팝업 (Figma 클라이언트_v3.1 67967:409417 "그룹추가 팝업") — 게임 선택으로 들어온 선택 UI에서 하단 "그룹에 추가".
 * 공용 레이어 셸(LayerDialog) · 너비 404. 위: 그룹 만들기(버튼 → 누르면 입력칸 + 완료), 아래: 나의 그룹 목록(체크박스, 여러 개).
 * 고른 게임이 전부 이미 들어 있는 그룹은 비활성(체크된 채). 새로 만든 그룹은 목록 맨 위에 체크된 채로 들어온다.
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
      this.groups.unshift({ id: id, title: name, gameIds: [] }); // 최신 생성 순 — 맨 위
      this.checked.push(id);
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
          '<button class="library-panel__create add-group-dialog__tab stds-btn3 fw-medium" type="button" :disabled="!canCreate" @click="startCreate" data-name="btn/create group">' +
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
            '<button class="add-group-dialog__done" type="button" :disabled="!canSubmitName" @mousedown.prevent @click="submitName" data-name="Button">완료</button>' +
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
                '<span class="add-group-dialog__check" aria-hidden="true" data-name="Checkbox"><i v-if="isChecked(g) || isFull(g)" class="ic-v2-control-check-bold-line"></i></span>' +
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
        '<button v-if="groups.length" class="add-group-dialog__confirm" type="button" :disabled="!canConfirm" @click="confirm" data-name="Button">확인</button>' +
      '</div>' +
    '</layer-dialog>',
};

var LibraryMain = {
  components: { 'add-to-group-dialog': LibraryAddToGroupDialog },
  data: function () {
    return {
      owned: LIBRARY_OWNED.map(libraryGame),
      quickPage: 0,
      quickActive: 0, // 넓게 펼쳐진 카드 — 마우스를 올린 카드, 없으면 지금 페이지 첫 카드
      view: 'grid',
      query: '',
      quickAd: protoSettingsRead().libraryQuickAd, // 하단 메뉴패널 > 빠른 실행 > 광고
      arrowRest: 0, // 방금 누른 화살표(-1 · 1) — 마우스가 나갈 때까지 hover 배경을 끈다
      store: LIBRARY_STORE,
      selected: [], // 선택 UI에서 고른 게임 id (고른 순서)
      addedToast: null, // 그룹에 추가한 직후 토스트 { count, title } (3초)
      addGroupDialog: false, // 게임 선택 모드의 그룹에 추가 팝업
    };
  },
  mounted: function () {
    var vm = this;
    protoSettingsSubscribe(function (s) { vm.quickAd = s.libraryQuickAd; });
    this._onResize = this.snapFloating.bind(this);
    window.addEventListener('resize', this._onResize);
  },
  unmounted: function () {
    clearTimeout(this._toastTimer);
    window.removeEventListener('resize', this._onResize);
  },
  watch: {
    // 선택 UI 진입 경로 두 가지 — 패널 게임 추가(대상 그룹) · 게임 선택 버튼(대상 없음)
    'store.addTargetId': function (id, prev) { this.onSelectEnter(id, prev); },
    'store.selectMode': function (on, prev) { this.onSelectEnter(on, prev); },
    'selected.length': function () { this.$nextTick(this.snapFloating); },
    // 광고를 켜고 끄면 카드 수가 바뀐다 — 없어진 페이지에 머물지 않게
    quickPages: function (n) {
      if (this.quickPage > n - 1) this.goQuick(n - 1 - this.quickPage);
    },
  },
  computed: {
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
    // 이미 그 그룹에 들어 있는 게임 — 선택 UI에서 비활성(회색 체크)으로 보인다
    addedIds: function () {
      var map = {};
      if (this.addTarget) this.addTarget.gameIds.forEach(function (id) { map[id] = true; });
      return map;
    },
    // 선택 UI에서는 검색 칸이 사라지니 검색어 없이 보유게임 전체
    filteredOwned: function () {
      var q = this.query.trim().toLowerCase();
      if (!q || this.selecting) return this.owned;
      return this.owned.filter(function (g) {
        return g.name.toLowerCase().indexOf(q) >= 0 || g.genre.toLowerCase().indexOf(q) >= 0;
      });
    },
  },
  methods: {
    goQuick: function (delta) {
      var next = Math.min(Math.max(this.quickPage + delta, 0), this.quickPages - 1);
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
    // 시작할 때 보유게임이 화면 아래에 있으면 타이틀이 보이게 올려 준다
    onSelectEnter: function (on, prev) {
      this.selected = [];
      if (on && !prev) {
        this.addedToast = null;
        this.$nextTick(function () {
          var el = this.$refs.owned;
          var box = el && el.closest('.main');
          if (!box) return;
          var top = el.getBoundingClientRect().top - box.getBoundingClientRect().top;
          var pad = parseFloat(getComputedStyle(box).paddingTop) || 0;
          if (top > box.clientHeight / 2) box.scrollTo({ top: box.scrollTop + top - pad - 20, behavior: 'smooth' });
        });
      }
    },
    // ── 선택 UI (게임 추가) — 카드 아무 곳이나 누르면 선택/해제, 이미 그룹에 있는 게임은 못 고른다 ──
    isSelected: function (g) { return this.selected.indexOf(g.id) >= 0; },
    toggleSelect: function (g) {
      if (!this.selecting || this.addedIds[g.id]) return;
      var i = this.selected.indexOf(g.id);
      if (i >= 0) this.selected.splice(i, 1);
      else this.selected.push(g.id);
    },
    // 그룹에 추가 팝업 확인 — 체크한 그룹마다 아직 없는 게임만 넣고, 선택 UI를 끝내고 토스트 (사용자 결정: 종료 + 토스트)
    confirmAddGroups: function (groupIds) {
      var self = this;
      var games = this.selected.slice();
      var picked = this.store.groups.filter(function (g) { return groupIds.indexOf(g.id) >= 0; });
      picked.forEach(function (g) {
        games.forEach(function (id) { if (g.gameIds.indexOf(id) < 0) g.gameIds.push(id); });
      });
      this.addGroupDialog = false;
      this.store.selectMode = false;
      var title = picked.length > 1 ? picked[0].title + ' 외 ' + (picked.length - 1) + '개 그룹' : (picked[0] && picked[0].title) || '';
      this.addedToast = { count: games.length, title: title };
      clearTimeout(this._toastTimer);
      this._toastTimer = setTimeout(function () { self.addedToast = null; }, LIBRARY_TOAST_MS);
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
    startSelect: function () { this.store.addTargetId = null; this.store.selectMode = true; },
    cancelAdd: function () { this.store.addTargetId = null; this.store.selectMode = false; },
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
      var self = this;
      this.addedToast = { count: count, title: group.title };
      clearTimeout(this._toastTimer);
      this._toastTimer = setTimeout(function () { self.addedToast = null; }, LIBRARY_TOAST_MS);
    },
  },
  template:
    '<div class="library">' +


      // ---- 빠른 실행 ----
      '<section class="library-section library-quick">' +
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
              ' :class="{ \'is-active\': g.index === quickActive, \'library-quick__card--ad\': g.ad }" @mouseenter="hoverQuick(g.index)">' +
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
                    '<button class="library-action" type="button" :aria-label="actionLabel(g.action)"><i :class="actionIcon(g.action)"></i></button>' +
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
      '<section ref="owned" class="library-section library-owned" :class="{ \'is-selecting\': selecting }">' +
        '<h2 class="library-section__title">보유게임<span>{{ filteredOwned.length }}</span></h2>' +
        '<div class="library-owned__divider"></div>' +
        // 선택 UI — 도구 줄 자리에 게임 추가 취소 + 안내 문구 (Figma ⑦ · 0825 게임 추가 취소)
        '<div v-if="selecting" class="library-toolbar library-toolbar--select" data-name="filter area">' +
          '<button class="library-btn" type="button" @click="cancelAdd"><i class="ic-v2-control-long-arrow-left-line"></i>{{ addTarget ? \'게임 추가 취소\' : \'게임 선택 취소\' }}</button>' +
          // 메시지 영역 (Figma 클라이언트_v3.1 67953:409405) — 게임 선택 전 / 선택 후
          '<p class="library-select-msg" role="status" data-name="안내 문구">' +
            '<img class="library-select-msg__icon" src="assets/library/img_info.png" alt="" />' +
            '<span v-if="!selected.length">게임을 먼저 선택해 주세요.</span>' +
            '<span v-else><b class="library-select-msg__count">{{ selected.length }}개 게임</b>이 선택되었습니다.</span>' +
          '</p>' +
        '</div>' +
        '<div v-else class="library-toolbar" data-name="filter area">' +
          '<button class="library-btn" type="button" @click="startSelect"><i class="ic-v2-control-check-circle-line"></i>게임 선택</button>' +
          '<div class="library-toolbar__right">' +
            '<div class="library-view-toggle" role="tablist" aria-label="보기 방식">' +
              '<button type="button" role="tab" :aria-selected="view === \'grid\'" :class="{ \'is-selected\': view === \'grid\' }" aria-label="카드 보기" @click="view = \'grid\'"><i class="ic-v2-community-view-card-fill"></i></button>' +
              '<button type="button" role="tab" :aria-selected="view === \'list\'" :class="{ \'is-selected\': view === \'list\' }" aria-label="목록 보기" @click="view = \'list\'"><i class="ic-v2-community-view-list-fill"></i></button>' +
            '</div>' +
            '<button class="library-btn" type="button"><i class="ic-v2-community-filter-line"></i>필터</button>' +
            '<label class="library-search">' +
              '<input type="text" v-model="query" placeholder="게임 또는 검색어 입력" />' +
              '<i class="ic-v2-navigation-search-line" aria-hidden="true"></i>' +
            '</label>' +
          '</div>' +
        '</div>' +
        '<ul class="library-grid">' +
          '<li v-for="g in filteredOwned" :key="g.id" class="library-card" ' +
            ':class="{ \'is-selectable\': selecting, \'is-selected\': selecting && isSelected(g), \'is-added\': selecting && addedIds[g.id] }" ' +
            ':aria-checked="selecting ? String(isSelected(g)) : null" :role="selecting ? \'checkbox\' : null" @click="toggleSelect(g)">' +
            '<div class="library-card__thumb">' +
              '<span class="library-card__media"><img :src="g.thumb" alt="" loading="lazy" /></span>' +
              '<span class="library-card__border" aria-hidden="true"></span>' +
              // 선택 UI 체크 — 기본(빈 원) · 선택(brand-primary + 체크) · 이미 그룹에 있음(회색 + 체크)
              '<span v-if="selecting" class="library-card__check" aria-hidden="true" data-name="Checkbox">' +
                '<i v-if="isSelected(g) || addedIds[g.id]" class="ic-v2-control-check-bold-line"></i>' +
              '</span>' +
              '<button v-else class="library-action library-card__action" type="button" :aria-label="actionLabel(g.action)"><i :class="actionIcon(g.action)"></i></button>' +
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

      // 하단 플로팅 (component/selection UI/floating) — 선택 UI 동안 항상. 고르기 전엔 비활성(그레이, 그룹에 추가 · 더보기),
      // 하나 이상 고르면 오렌지로 바뀌면서 선택 해제가 앞에 펼쳐진다 (Figma 2115:32819 비활성)
      '<transition name="library-floating" @after-enter="snapFloating">' +
        '<div v-if="selecting" class="library-floating" :class="{ \'is-active\': selected.length }" data-name="하단 플로딩 컴포넌트">' +
          '<div class="library-floating__bar" data-name="component/selection UI/floating">' +
            '<div class="library-floating__group">' +
              '<transition name="library-floating-clear" @after-enter="snapFloating" @after-leave="snapFloating">' +
                '<button v-if="selected.length" class="library-floating__btn library-floating__btn--clear" type="button" @click="selected = []" data-name="component/selection UI/btn">' + LIBRARY_FLOATING_ICON.close + '선택 해제</button>' +
              '</transition>' +
              '<button class="library-floating__btn" type="button" :disabled="!selected.length" @click="addToGroup" data-name="component/selection UI/btn">' + LIBRARY_FLOATING_ICON.folderAdd + '그룹에 추가</button>' +
            '</div>' +
            '<span class="library-floating__div" aria-hidden="true"></span>' +
            '<button class="library-floating__btn" type="button" :disabled="!selected.length" data-name="component/selection UI/btn">' + LIBRARY_FLOATING_ICON.more + '더보기</button>' +
          '</div>' +
        '</div>' +
      '</transition>' +

      '<add-to-group-dialog v-if="addGroupDialog" :groups="store.groups" :game-ids="selected" @confirm="confirmAddGroups" @close="addGroupDialog = false"></add-to-group-dialog>' +

      // 게임 추가 완료 토스트 — 보유게임 영역 하단 가운데, 3초 뒤 사라진다
      '<transition name="library-toast">' +
        '<div v-if="addedToast" class="library-toast-wrap">' +
          '<div class="library-toast" role="status" data-name="toast popup">' +
            '<img class="library-toast__icon" src="assets/library/check_circle_color.svg" alt="" />' +
            '<div class="library-toast__body">' +
              '<p class="library-toast__text"><b>{{ addedToast.count }}개 게임</b>을 추가했습니다.</p>' +
              '<span class="library-toast__group"><i class="ic-v2-control-long-arrow-right-line" aria-hidden="true"></i>{{ addedToast.title }}</span>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</transition>' +
    '</div>',
};

function mountLibraryMain(selector) {
  return Vue.createApp(LibraryMain).mount(selector);
}
