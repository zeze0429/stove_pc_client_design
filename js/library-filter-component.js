/**
 * 라이브러리 필터 레이어 — 보유게임 도구 줄 · 우측패널이 같이 쓴다 (빌드 없이 CDN Vue로 동작)
 * -------------------------------------------------------------
 * Figma 2026_웹전환 layer (1727:32579). 폭만 다르다: 보유게임 = 필터 버튼 + 여백 + 검색 필드(align-right),
 * 우측패널 240 = 버튼 그룹 폭 (사용자 11-03).
 * 정렬은 둘 다 있고, 보유게임은 "게임" 줄만 · 우측패널은 "그룹" · "게임" 둘 다 (group-sort).
 * 체크박스는 공통 체크박스 sm(js/checkbox-component.js). 스타일은 css/library-filter.css.
 *
 *   <library-filter-layer v-model="filter" width="26rem" @close="..."></library-filter-layer>
 *
 * 걸러내기 · 정렬은 libraryFilterGames / librarySortGroups로 — 화면마다 같은 규칙.
 */
var LIBRARY_FILTER_TYPES = [
  { key: 'game', label: '정식 게임' }, // 카탈로그 type 없음 · collection(합본팩)
  { key: 'dlc', label: 'DLC' },
  { key: 'demo', label: 'DEMO' },
  { key: 'utility', label: '유틸리티' },
];
// 장르 — 온스토브 스토어 전체 게임 필터의 장르 목록 18개와 같은 이름 (11-03 확인: 어드벤처 · 캐주얼 표기, 소프트웨어 추가).
// 순서는 Figma 순서를 따르고 Figma에 없던 소프트웨어는 기타 앞에
var LIBRARY_FILTER_GENRES = ['액션', 'RPG', '어드벤처', '퍼즐', '시뮬레이션', '스포츠', '슈팅', '공포', '리듬', '디펜스',
  '전략', '레이싱', '캐주얼', '플랫포머', '비주얼 노벨', '기능성 게임', '소프트웨어', '기타'];
// 정렬 옵션 — Figma엔 기본값(설정 순 · 최근 보유 순)만 있어 나머지는 임시. 누를 때마다 다음 옵션으로
var LIBRARY_GROUP_SORTS = ['설정 순', '이름 순'];
var LIBRARY_FILTER_BOTTOM_GAP = 20; // 런처 영역(.app — PR 배너 제외) 아래 고정 여백 (사용자 11-03)
var LIBRARY_GAME_SORTS = ['최근 보유 순', '최근 플레이 순', '이름 순'];

function libraryFilterDefault() {
  return { installedOnly: false, types: [], genres: [], groupSort: 0, gameSort: 0 };
}
function libraryFilterActive(f) {
  return f.installedOnly || f.types.length > 0 || f.genres.length > 0;
}
// 카탈로그 장르 → 필터 장르 (RPG 계열 묶기 · 영문 표기, 목록에 없으면 기타)
function libraryGenreKey(genre) {
  var g = (genre || '').trim();
  if (/RPG/i.test(g)) return 'RPG';
  if (/^racing$/i.test(g)) return '레이싱';
  return LIBRARY_FILTER_GENRES.indexOf(g) >= 0 ? g : '기타';
}
function libraryTypeKey(game) {
  return !game.type || game.type === 'collection' ? 'game' : game.type;
}
function libraryFilterGames(list, f) {
  var out = list.filter(function (g) {
    if (f.installedOnly && g.action === 'install') return false;
    if (f.types.length && f.types.indexOf(libraryTypeKey(g)) < 0) return false;
    if (f.genres.length && f.genres.indexOf(libraryGenreKey(g.genre)) < 0) return false;
    return true;
  });
  var sort = LIBRARY_GAME_SORTS[f.gameSort];
  if (sort === '최근 플레이 순') {
    // played = 마지막 플레이 후 지난 분 — 작을수록 최근, 기록 없으면 뒤로
    out = out.slice().sort(function (a, b) {
      return (a.played == null ? Infinity : a.played) - (b.played == null ? Infinity : b.played);
    });
  } else if (sort === '이름 순') {
    out = out.slice().sort(function (a, b) { return a.name.localeCompare(b.name, 'ko'); });
  }
  return out;
}
function librarySortGroups(groups, f) {
  if (LIBRARY_GROUP_SORTS[f.groupSort] !== '이름 순') return groups;
  return groups.slice().sort(function (a, b) { return a.title.localeCompare(b.title, 'ko'); });
}

var LibraryFilterLayer = {
  components: { 'stds-checkbox': StdsCheckbox },
  props: {
    modelValue: { type: Object, required: true },
    width: { type: String, default: '26rem' },
    groupSort: { type: Boolean, default: false },
    // 오른쪽 끝을 맞출 요소를 돌려주는 함수 — 있으면 폭 = 그 요소 오른쪽 끝 - 레이어 왼쪽 (width 대신)
    // 보유게임: 필터 버튼 + 여백 + 검색 필드 폭 (사용자 11-03)
    alignRight: { type: Function, default: null },
  },
  emits: ['update:modelValue', 'close'],
  data: function () {
    return { types: LIBRARY_FILTER_TYPES, genres: LIBRARY_FILTER_GENRES, maxHeight: null, fitWidth: null };
  },
  computed: {
    groupSortLabel: function () { return LIBRARY_GROUP_SORTS[this.modelValue.groupSort]; },
    gameSortLabel: function () { return LIBRARY_GAME_SORTS[this.modelValue.gameSort]; },
  },
  mounted: function () {
    this.fitHeight();
    this.onResize = this.fitHeight.bind(this);
    window.addEventListener('resize', this.onResize);
    window.addEventListener('scroll', this.onResize, true); // 보유게임 영역이 스크롤되면 레이어 위치가 바뀐다
    this.onKeydown = function (e) { if (e.key === 'Escape') this.$emit('close'); }.bind(this);
    document.addEventListener('keydown', this.onKeydown);
  },
  beforeUnmount: function () {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('scroll', this.onResize, true);
    document.removeEventListener('keydown', this.onKeydown);
  },
  methods: {
    // 런처 영역 아래 20은 항상 비운다 — 아래 PR 배너는 런처 영역이 아니라 그 위가 기준.
    // 창 높이에 따라 레이어 높이가 줄고 안에서 스크롤 (사용자 11-03)
    fitHeight: function () {
      // 버튼 폭이 소수라 레이어가 반 픽셀에 놓이면 테두리가 번지고 오른쪽이 살짝 튀어나온다 — 정수 픽셀로 당긴다
      this.$el.style.translate = '';
      var x = this.$el.getBoundingClientRect().left;
      var frac = x - Math.round(x);
      if (frac) this.$el.style.translate = -frac + 'px 0';
      var edge = this.alignRight && this.alignRight();
      if (edge) this.fitWidth = Math.round(edge.getBoundingClientRect().right) - Math.round(x) + 'px';
      var app = this.$el.closest('.app');
      var bottom = app ? app.getBoundingClientRect().bottom : window.innerHeight;
      var top = this.$el.getBoundingClientRect().top;
      this.maxHeight = Math.max(120, bottom - top - LIBRARY_FILTER_BOTTOM_GAP) + 'px';
    },
    update: function (patch) { this.$emit('update:modelValue', Object.assign({}, this.modelValue, patch)); },
    has: function (field, key) { return this.modelValue[field].indexOf(key) >= 0; },
    toggle: function (field, key, on) {
      var list = this.modelValue[field].filter(function (k) { return k !== key; });
      if (on) list.push(key);
      var patch = {};
      patch[field] = list;
      this.update(patch);
    },
    cycle: function (field, options) { var p = {}; p[field] = (this.modelValue[field] + 1) % options.length; this.update(p); },
    cycleGroup: function () { this.cycle('groupSort', LIBRARY_GROUP_SORTS); },
    cycleGame: function () { this.cycle('gameSort', LIBRARY_GAME_SORTS); },
    reset: function () { this.$emit('update:modelValue', libraryFilterDefault()); },
  },
  template:
    '<div class="library-filter" role="dialog" aria-label="필터" :style="{ width: fitWidth || width, maxHeight: maxHeight }" data-name="layer" @click.stop>' +
      '<div class="library-filter__head" data-name="header">' +
        '<p class="library-filter__title">필터</p>' +
        '<button class="library-filter__reset" type="button" @click="reset"><i class="ic-v2-control-refresh-line" aria-hidden="true"></i>초기화</button>' +
      '</div>' +
      '<div class="library-filter__body" data-name="list">' +
        '<div class="library-filter__section">' +
          '<p class="library-filter__label">정렬</p>' +
          '<div class="library-filter__sorts">' +
            '<div v-if="groupSort" class="library-filter__sort"><span>그룹</span>' +
              '<button type="button" @click="cycleGroup">{{ groupSortLabel }}<i class="ic-v2-control-sort-line" aria-hidden="true"></i></button></div>' +
            '<div class="library-filter__sort"><span>게임</span>' +
              '<button type="button" @click="cycleGame">{{ gameSortLabel }}<i class="ic-v2-control-sort-line" aria-hidden="true"></i></button></div>' +
          '</div>' +
        '</div>' +
        '<hr class="library-filter__div" />' +
        '<stds-checkbox size="sm" :model-value="modelValue.installedOnly" @update:model-value="update({ installedOnly: $event })">설치된 게임만 보기</stds-checkbox>' +
        '<hr class="library-filter__div" />' +
        '<div class="library-filter__section">' +
          '<p class="library-filter__label">상품 타입</p>' +
          '<div class="library-filter__list">' +
            '<stds-checkbox v-for="t in types" :key="t.key" size="sm" :model-value="has(\'types\', t.key)" @update:model-value="toggle(\'types\', t.key, $event)">{{ t.label }}</stds-checkbox>' +
          '</div>' +
        '</div>' +
        '<hr class="library-filter__div" />' +
        '<div class="library-filter__section">' +
          '<p class="library-filter__label">장르</p>' +
          '<div class="library-filter__list">' +
            '<stds-checkbox v-for="g in genres" :key="g" size="sm" :model-value="has(\'genres\', g)" @update:model-value="toggle(\'genres\', g, $event)">{{ g }}</stds-checkbox>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>',
};
