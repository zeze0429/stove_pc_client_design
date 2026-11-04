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
// 정렬 옵션 — 정렬 줄을 누르면 드롭다운에서 고른다 (Figma 상세 12016:70742)
// 게임 4개(기본 최근 보유 순) · 그룹 2개(기본 설정 순) — 사용자 지정 (11-03)
var LIBRARY_GAME_SORTS = [
  { key: 'lastPlayed', label: '마지막 플레이 순' },
  { key: 'playTime', label: '총 플레이 시간 순' },
  { key: 'owned', label: '최근 보유 순' },
  { key: 'name', label: '게임 명 오름차순' },
];
var LIBRARY_GROUP_SORTS = [
  { key: 'custom', label: '설정 순' },
  { key: 'name', label: '그룹 명 오름차순' },
];
var LIBRARY_FILTER_GAP = 8; // 버튼과 레이어 사이 (사용자 11-03)
var LIBRARY_FILTER_BOTTOM_GAP = 20; // 런처 영역(.app — PR 배너 제외) 아래 고정 여백 (사용자 11-03)

function libraryFilterDefault() {
  return { installedOnly: false, types: [], genres: [], groupSort: 'custom', gameSort: 'owned' };
}
// "총 172시간 35분" → 분 (기록 없으면 0)
function libraryPlayMinutes(game) {
  var m = /(\d+)\s*시간(?:\s*(\d+)\s*분)?/.exec(game.total || '');
  return m ? Number(m[1]) * 60 + Number(m[2] || 0) : 0;
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
  // 최근 보유 순 = 보유게임 목록 순서 그대로
  if (f.gameSort === 'lastPlayed') {
    // played = 마지막 플레이 후 지난 분 — 작을수록 최근, 기록 없으면 뒤로
    out = out.slice().sort(function (a, b) {
      return (a.played == null ? Infinity : a.played) - (b.played == null ? Infinity : b.played);
    });
  } else if (f.gameSort === 'playTime') {
    out = out.slice().sort(function (a, b) { return libraryPlayMinutes(b) - libraryPlayMinutes(a); });
  } else if (f.gameSort === 'name') {
    out = out.slice().sort(function (a, b) { return a.name.localeCompare(b.name, 'ko'); });
  }
  return out;
}
function librarySortGroups(groups, f) {
  if (f.groupSort !== 'name') return groups;
  return groups.slice().sort(function (a, b) { return a.title.localeCompare(b.title, 'ko'); });
}

var LibraryFilterLayer = {
  components: { 'stds-checkbox': StdsCheckbox },
  props: {
    modelValue: { type: Object, required: true },
    width: { type: String, default: '26rem' },
    groupSort: { type: Boolean, default: false },
    // 레이어를 붙일 요소(버튼 · 버튼 그룹)를 돌려주는 함수 — 그 왼쪽 아래 8에 뜬다
    anchor: { type: Function, required: true },
    // 오른쪽 끝을 맞출 요소를 돌려주는 함수 — 있으면 폭 = 그 요소 오른쪽 끝 - 레이어 왼쪽 (width 대신)
    // 보유게임: 필터 버튼 + 여백 + 검색 필드 폭 (사용자 11-03)
    alignRight: { type: Function, default: null },
  },
  emits: ['update:modelValue', 'close'],
  data: function () {
    return {
      types: LIBRARY_FILTER_TYPES, genres: LIBRARY_FILTER_GENRES, pos: null, sortOpen: null,
      blur: protoSettingsRead().containerBlur, // 보기 옵션 "컨테이너 블러" (테스트) — 열 때마다 읽는다
    };
  },
  computed: {
    layerStyle: function () {
      var p = this.pos;
      return p ? { left: p.left + 'px', top: p.top + 'px', width: p.width || this.width, maxHeight: p.maxHeight + 'px' }
        : { visibility: 'hidden', width: this.width };
    },
    sortRows: function () {
      var rows = [{ field: 'gameSort', title: '게임', options: LIBRARY_GAME_SORTS }];
      if (this.groupSort) rows.unshift({ field: 'groupSort', title: '그룹', options: LIBRARY_GROUP_SORTS });
      return rows;
    },
  },
  mounted: function () {
    // 필터는 한 번에 하나만 — 다른 쪽(보유게임 ↔ 우측패널) 필터가 열리면 이쪽은 닫는다 (사용자 11-03)
    this.onOtherOpen = function (e) { if (e.detail !== this) this.$emit('close'); }.bind(this);
    document.dispatchEvent(new CustomEvent('library-filter-open', { detail: this }));
    document.addEventListener('library-filter-open', this.onOtherOpen);
    this.place();
    this.onResize = this.place.bind(this);
    window.addEventListener('resize', this.onResize);
    window.addEventListener('scroll', this.onResize, true); // 보유게임 영역이 스크롤되면 레이어 위치가 바뀐다
    // Esc — 정렬 드롭다운이 열려 있으면 그것만, 아니면 레이어를 닫는다
    this.onKeydown = function (e) {
      if (e.key !== 'Escape') return;
      if (this.sortOpen) this.sortOpen = null;
      else this.$emit('close');
    }.bind(this);
    document.addEventListener('keydown', this.onKeydown);
    // 열려 있는 동안 바닥 페이지(보유게임 · 우측패널 목록)는 스크롤되지 않는다 — 레이어 안만 스크롤 (사용자 11-03)
    this.onWheel = function (e) {
      var layer = this.$refs.layer;
      if (!layer || !layer.contains(e.target)) e.preventDefault();
    }.bind(this);
    document.addEventListener('wheel', this.onWheel, { passive: false, capture: true });
    document.addEventListener('touchmove', this.onWheel, { passive: false, capture: true });
  },
  beforeUnmount: function () {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('scroll', this.onResize, true);
    document.removeEventListener('keydown', this.onKeydown);
    document.removeEventListener('library-filter-open', this.onOtherOpen);
    document.removeEventListener('wheel', this.onWheel, { capture: true });
    document.removeEventListener('touchmove', this.onWheel, { capture: true });
  },
  methods: {
    // 레이어는 body로 띄워(teleport) 런처 · 패널의 overflow에 그림자(shadow/12)가 잘리지 않게 하고,
    // 기준 요소 왼쪽 아래 8에 정수 픽셀로 놓는다 (버튼 폭이 소수면 테두리가 번지고 끝이 살짝 튀어나온다).
    // 런처 영역(.app) 아래 20은 항상 비운다 — 아래 PR 배너는 런처 영역이 아니라 그 위가 기준.
    // 창 높이에 따라 레이어 높이가 줄고 안에서 스크롤 (사용자 11-03)
    place: function () {
      var a = this.anchor && this.anchor();
      if (!a) return;
      var r = a.getBoundingClientRect();
      var left = Math.round(r.left);
      var top = Math.round(r.bottom) + LIBRARY_FILTER_GAP;
      var edge = this.alignRight && this.alignRight();
      var app = a.closest('.app');
      var bottom = app ? app.getBoundingClientRect().bottom : window.innerHeight;
      this.pos = {
        left: left,
        top: top,
        width: edge ? Math.round(edge.getBoundingClientRect().right) - left + 'px' : null,
        maxHeight: Math.max(120, bottom - top - LIBRARY_FILTER_BOTTOM_GAP),
      };
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
    sortLabel: function (row) {
      var v = this.modelValue[row.field];
      var o = row.options.find(function (x) { return x.key === v; });
      return o ? o.label : '';
    },
    // 레이어 안 다른 곳을 누르면 정렬 드롭다운만 닫는다 (정렬 버튼 · 드롭다운 안은 제외)
    onLayerClick: function (e) {
      if (this.sortOpen && !e.target.closest('.library-filter__sort')) this.sortOpen = null;
    },
    toggleSort: function (field) { this.sortOpen = this.sortOpen === field ? null : field; },
    pickSort: function (field, key) {
      var p = {};
      p[field] = key;
      this.update(p);
      this.sortOpen = null;
    },
    reset: function () { this.$emit('update:modelValue', libraryFilterDefault()); },
  },
  template:
    '<teleport to="body"><div ref="layer" class="library-filter" :class="{ \'is-blur\': blur }" :data-theme="blur ? \'dark\' : null" role="dialog" aria-label="필터" :style="layerStyle" data-name="layer" @click.stop="onLayerClick">' +
      '<div class="library-filter__head" data-name="header">' +
        '<p class="library-filter__title">필터</p>' +
        '<button class="library-filter__reset" type="button" @click="reset"><i class="ic-v2-control-refresh-line" aria-hidden="true"></i>초기화</button>' +
      '</div>' +
      '<div class="library-filter__body" data-name="list">' +
        '<div class="library-filter__section">' +
          '<p class="library-filter__label">정렬</p>' +
          '<div class="library-filter__sorts">' +
            // 정렬 줄 — 누르면 activated(선택값 Bold · elevation-1) + 오른쪽 맞춤 드롭다운 (Figma 12016:70742)
            '<div v-for="row in sortRows" :key="row.field" class="library-filter__sort" :class="{ \'is-open\': sortOpen === row.field }">' +
              '<span>{{ row.title }}</span>' +
              '<button type="button" :aria-expanded="String(sortOpen === row.field)" @click="toggleSort(row.field)">{{ sortLabel(row) }}<i class="ic-v2-control-sort-line" aria-hidden="true"></i></button>' +
              '<ul v-if="sortOpen === row.field" class="library-filter__menu" role="listbox" data-name="컨텍스트메뉴">' +
                '<li v-for="o in row.options" :key="o.key" role="option" :aria-selected="String(modelValue[row.field] === o.key)" ' +
                  ':class="{ \'is-selected\': modelValue[row.field] === o.key }" @click="pickSort(row.field, o.key)">' +
                  '<i class="ic-v2-control-check-bold-line" aria-hidden="true"></i><span>{{ o.label }}</span>' +
                '</li>' +
              '</ul>' +
            '</div>' +
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
    '</div></teleport>',
};
