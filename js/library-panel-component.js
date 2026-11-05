/**
 * 라이브러리 우측패널 — 나의 게임 그룹 (Figma 2026_웹전환 1131:5779 "라이브러리 > 우측패널")
 * -------------------------------------------------------------
 * 구조: 헤더(타이틀 · 버튼 그룹)는 고정, 그 아래(그룹 목록 · 구분선 · 그룹 없는 게임)만 스크롤.
 * 게임 목록 행은 사이드바와 같은 Figma 컴포넌트(component/game_group)라 css/gnb.css의
 * .game-group* 스타일 · 스프링 호버 인디케이터(createSpringBox) · 이름/뱃지 툴팁을 그대로 쓴다.
 *
 * 단계별 구현 — 1단계: 뼈대(헤더 · 버튼 · 빈 상태 · 그룹 없는 게임 · 스크롤 · TOP)
 * 2단계: 그룹 만들기(입력칸) · 그룹 타이틀(호버 버튼 · 툴팁) · 그룹 메뉴 · 이름 변경 · 삭제 · 모두 접기/펼치기
 * 3단계: 게임 추가 — 패널에서 게임 추가를 누르면 그 그룹이 선택 상태(오렌지)가 되고 보유게임 영역이 선택 UI로 바뀐다
 * 그룹 화면 · 필터 · 검색 · 게임 우클릭 메뉴는 다음 단계에서 붙인다.
 *
 * 데이터: 보유게임은 js/library-component.js의 LIBRARY_OWNED(+ libraryGame)를,
 * 그룹 · 게임 추가 대상은 LIBRARY_STORE를 콘텐츠(보유게임)와 같이 쓴다.
 */

// 그룹은 최대 20개 (Figma ③ "최대 20개까지 생성 가능"), 이름은 최대 30자 (2-1 "최대 30자")
var LIBRARY_GROUP_MAX = 20;
var LIBRARY_GROUP_NAME_MAX = 30;

/**
 * 그룹 이름 입력칸 (Figma 2-1 텍스트필드 — 그룹 만들기 · 그룹 이름 변경 공용)
 * 상태: inactive(포커스 아웃 — 1px 라인, 커서 없음) / activated(2px 라인) / error(빨간 라인 + 메시지)
 * 엔터 = 확인, Esc = 취소. 확인할 때 validate(이름)가 메시지를 돌려주면 에러로 보여주고 멈춘다.
 * 에러는 이름을 고치면 풀린다 — 그 전까지 확인 버튼은 비활성.
 */
var LibraryGroupNameInput = {
  props: {
    initial: { type: String, default: '' },
    confirmLabel: { type: String, default: '만들기' },
    validate: { type: Function, default: function () { return ''; } },
  },
  emits: ['submit', 'cancel'],
  data: function () {
    return { text: this.initial, focused: false, error: '', overflow: false };
  },
  computed: {
    canSubmit: function () { return !this.error && this.text.trim().length > 0; },
  },
  methods: {
    // v-model은 한글 조합이 끝나야 값을 넘겨서 첫 글자를 쓰는 중엔 만들기가 꺼져 있다 —
    // input 이벤트마다(조합 중 포함) 직접 받는다
    onInput: function (e) { this.text = e.target.value; this.error = ''; this.checkOverflow(); },
    // 입력칸 폭을 넘으면 앞쪽을 흐리게 가려 "앞에 글자가 더 있다"를 보여준다 (2-1 텍스트필드 상세)
    checkOverflow: function () {
      var el = this.$refs.input;
      this.overflow = !!el && el.scrollLeft > 0;
    },
    clear: function () {
      this.text = '';
      this.error = '';
      this.overflow = false;
      this.$refs.input.focus();
    },
    submit: function () {
      if (!this.canSubmit) return;
      var name = this.text.trim();
      var msg = this.validate(name);
      if (msg) { this.error = msg; return; }
      this.$emit('submit', name);
    },
    onKey: function (e) {
      if (e.isComposing) return; // 한글 조합 중 엔터는 글자 확정용
      if (e.key === 'Enter') { e.preventDefault(); this.submit(); }
      else if (e.key === 'Escape') { e.preventDefault(); this.$emit('cancel'); }
    },
  },
  mounted: function () {
    var el = this.$refs.input;
    el.focus();
    el.setSelectionRange(el.value.length, el.value.length);
    el.scrollLeft = el.scrollWidth;
    this.checkOverflow();
  },
  template:
    '<div class="group-name-input" :class="{ \'is-active\': focused, \'is-error\': error }" data-name="input">' +
      '<div class="group-name-input__field">' +
        '<input ref="input" :value="text" class="group-name-input__control stds-cap1" :class="{ \'is-overflow\': overflow }" type="text" ' +
          ':maxlength="' + LIBRARY_GROUP_NAME_MAX + '" placeholder="최대 ' + LIBRARY_GROUP_NAME_MAX + '자" ' +
          '@input="onInput" @scroll="checkOverflow" @keyup="checkOverflow" @keydown="onKey" @focus="focused = true" @blur="focused = false" />' +
        '<button v-if="text" class="group-name-input__clear" type="button" aria-label="지우기" @mousedown.prevent @click="clear">' +
          '<i class="ic-v2-control-close-circle-fill"></i>' +
        '</button>' +
      '</div>' +
      '<p v-if="error" class="group-name-input__error stds-cap1" data-name="Input/Tag">' +
        '<i class="ic-v2-state-warning-circle-fill" aria-hidden="true"></i>{{ error }}' +
      '</p>' +
      '<div class="group-name-input__btns" data-name="btn">' +
        '<button class="group-name-input__btn stds-btn3 fw-medium" type="button" @mousedown.prevent @click="$emit(\'cancel\')">취소</button>' +
        '<span class="group-name-input__btn-div" aria-hidden="true"></span>' +
        '<button class="group-name-input__btn group-name-input__btn--confirm stds-btn3 fw-medium" type="button" :disabled="!canSubmit" @mousedown.prevent @click="submit">{{ confirmLabel }}</button>' +
      '</div>' +
    '</div>',
};

var LIBRARY_GROUP_DUP_MSG = '이 이름은 이미 사용 중이예요. 다른 이름을 입력해 주세요.';

/**
 * 그룹 만들기 팝업 (Figma 3-6 — 게임 우클릭 > 그룹에 추가 > 그룹 만들기). 센터 레이어 팝업 공용 셸(LayerDialog), 너비 560.
 * 입력칸: 기본 · 입력 중 2px gray400(Figma 글로벌 지정) / 에러 2px system-error + 메시지. 만들기 버튼은 이름이 있고 에러가 없을 때만.
 */
var LibraryCreateGroupDialog = {
  components: { 'layer-dialog': LayerDialog },
  props: { validate: { type: Function, default: function () { return ''; } } },
  emits: ['submit', 'close'],
  data: function () { return { text: '', error: '' }; },
  computed: {
    canSubmit: function () { return !this.error && this.text.trim().length > 0; },
  },
  mounted: function () { this.$refs.input.focus(); },
  methods: {
    // 한글 조합 중에도 값을 받는다 (그룹 이름 입력칸과 같은 이유)
    onInput: function (e) { this.text = e.target.value; this.error = ''; },
    clear: function () { this.text = ''; this.error = ''; this.$refs.input.focus(); },
    submit: function () {
      if (!this.canSubmit) return;
      var name = this.text.trim();
      var msg = this.validate(name);
      if (msg) { this.error = msg; return; }
      this.$emit('submit', name);
    },
    onKey: function (e) {
      if (e.isComposing) return;
      if (e.key === 'Enter') { e.preventDefault(); this.submit(); }
    },
  },
  template:
    '<layer-dialog title="그룹 만들기" width="56rem" @close="$emit(\'close\')">' +
      '<div class="group-dialog" data-name="contents">' +
        '<ul class="group-dialog__hints">' +
          '<li>라이브러리에 있는 게임을 원하는 방식으로 정리할 수 있어요.</li>' +
          '<li>그룹은 최대 ' + LIBRARY_GROUP_MAX + '개까지 만들 수 있어요.</li>' +
        '</ul>' +
        '<div class="group-dialog__row" data-name="input">' +
          '<div class="group-dialog__field-wrap">' +
            '<label class="group-dialog__field" :class="{ \'is-error\': error }" data-name="Input">' +
              '<input ref="input" class="group-dialog__input" type="text" :value="text" :maxlength="' + LIBRARY_GROUP_NAME_MAX + '" ' +
                'placeholder="그룹 이름을 입력해 주세요 (최대 ' + LIBRARY_GROUP_NAME_MAX + '자)" @input="onInput" @keydown="onKey" />' +
              '<button v-if="text" class="group-dialog__clear" type="button" aria-label="지우기" @mousedown.prevent @click="clear"><i class="ic-v2-control-close-circle-fill"></i></button>' +
            '</label>' +
            '<p v-if="error" class="group-dialog__error" data-name="Input/Tag"><i class="ic-v2-state-warning-circle-fill" aria-hidden="true"></i>{{ error }}</p>' +
          '</div>' +
          '<button class="stds-button stds-button-primary stds-button-md group-dialog__submit" type="button" :disabled="!canSubmit" @click="submit" data-name="Button">만들기</button>' +
        '</div>' +
      '</div>' +
    '</layer-dialog>',
};

// 게임 우클릭 메뉴 1뎁스 (Figma 3-5-2) — sub: 2뎁스로 플립, toggle: 토글(메뉴 유지), 나머지는 누르면 닫힌다(동작은 아직 없음)
var LIBRARY_GAME_MENU = [
  { label: '즐겨찾기 추가' },
  { label: '그룹에 추가', sub: 'add' },
  { label: '그룹에서 제거', sub: 'remove' },
  { label: '자동업데이트', toggle: 'autoUpdate' },
  { label: '클라우드 저장 사용', toggle: 'cloud' },
  { label: '실행옵션' },
  { label: '게임 파일 검사 및 복구' },
  { label: '바탕화면 바로가기 만들기' },
  { label: 'DLC' },
  { label: '게임 옵션 설정' },
  { label: '로컬 파일 보기' },
  { label: '게임 삭제' },
];
var LIBRARY_GAME_TOGGLE_DEFAULT = { autoUpdate: false, cloud: true }; // Figma 1뎁스 예시값
// 여러 개 선택 후 우클릭 (Figma 3-5-3)
var LIBRARY_GAME_MENU_MULTI = [
  { label: '선택한 게임 즐겨찾기 추가' },
  { label: '선택한 게임 그룹에 추가', sub: 'add' },
  { label: '선택한 게임 숨기기' },
];

// 2뎁스 내용 (그룹에 추가 · 그룹에서 제거) — 패널은 뒷면(플립)에, 콘텐츠 영역은 옆에 띄운 서브메뉴에 같은 내용을 넣는다
var GAME_MENU_SUB_TPL =
    '<template v-if="gameMenu.back === \'add\'">' +
      // 그룹 있음 — 5개까지 보이고 그 이상은 스크롤. 이미 들어 있는 그룹은 비활성
      '<div v-if="groups.length" class="game-menu__groups" @scroll="hideMenuTip">' +
        '<button v-for="g in groups" :key="g.id" class="game-menu__item stds-btn3 fw-medium" type="button" ' +
          ':disabled="gameInGroup(g)" @click="addMenuGameTo(g)" @mouseenter="showNameTip" @mouseleave="hideMenuTip" data-name="menu">' +
          '<span class="game-menu__label game-menu__name">{{ g.title }}</span>' +
        '</button>' +
      '</div>' +
      // 그룹 없음 (최초 생성)
      '<div v-else class="game-menu__empty">' +
        '<i class="ic-v2-content-folder-add-fill" aria-hidden="true"></i>' +
        '<p class="stds-cap1 fw-medium">그룹으로<br />나만의 라이브러리를<br />만들어 보세요.</p>' +
      '</div>' +
      '<div class="game-menu__create-wrap" :class="{ \'is-empty\': !groups.length }">' +
        '<button class="game-menu__create stds-btn3 fw-medium" type="button" :disabled="!canCreate" @click="openCreateFromMenu" data-name="Button">' +
          '<i class="ic-v2-control-add-line" aria-hidden="true"></i>그룹 만들기' +
        '</button>' +
      '</div>' +
    '</template>' +
    '<div v-else class="game-menu__groups" @scroll="hideMenuTip">' +
      '<div v-for="g in menuGameGroups" :key="g.id" class="game-menu__item game-menu__item--remove stds-btn3 fw-medium" ' +
        '@mouseenter="showNameTip" @mouseleave="hideMenuTip" data-name="menu">' +
        '<span class="game-menu__label game-menu__name">{{ g.title }}</span>' +
        '<button class="game-menu__icon game-menu__remove" type="button" aria-label="이 그룹에서 제거" ' +
          '@click="removeMenuGameFrom(g)" @mouseenter.stop="showRemoveTip" @mouseleave="hideMenuTip" data-name="component/game_group/title/btn_right">' +
          '<i class="ic-v2-control-close-circle-fill"></i>' +
        '</button>' +
      '</div>' +
    '</div>';

// 그룹 타이틀 (component/game_group/title) — 화살표 · 이름 · 개수 · 우측 버튼(호버 시).
// 사용자 그룹은 게임 추가 + 그룹 메뉴, 그룹 없는 게임은 그룹 메뉴만 (Figma ④)
// 게임 추가 중인 그룹은 우측 버튼 대신 게임 추가 취소(X)가 항상 보이고, 접기/펼치기는 비활성 (3-3 · 0825)
function TITLE_TPL(idExpr, nameExpr, countExpr, withAdd) {
  var isTarget = 'addTargetId === ' + idExpr;
  return '<div class="game-group__title library-group__title" ' +
      ':class="{ \'is-hover\': hoveredTitleId === ' + idExpr + ', \'is-menu-open\': menu && menu.groupId === ' + idExpr + ' }" ' +
      '@mouseenter="onTitleEnter($event, ' + idExpr + ')" @mouseleave="onTitleLeave" ' +
      '@click="openGroupPage(' + idExpr + ')" @contextmenu.prevent="' + isTarget + ' || openMenu($event, ' + idExpr + ', false)" data-name="component/game_group/title">' +
    '<button class="game-group__btn-left-arrow" type="button" aria-label="펼치기/접기" :disabled="' + isTarget + '" @click.stop="toggleGroup(' + idExpr + ')" data-name="component/game_group/title/btn_left_arrow">' +
      '<i class="ic-v2-control-select-arrow-down-fill"></i>' +
    '</button>' +
    '<span class="game-group__title-inner">' +
      '<span class="game-group__name stds-title8 fw-medium">{{ ' + nameExpr + ' }}</span>' +
      '<span class="badge-menu-title" data-name="component/badge/menu_title">{{ ' + countExpr + ' }}</span>' +
    '</span>' +
    (withAdd
      ? '<span v-if="' + isTarget + '" class="library-group__btns library-group__btns--target" data-name="btn">' +
          '<button class="library-group__btn library-group__cancel" type="button" aria-label="게임 추가 취소" ' +
            '@click.stop="cancelAdd" @mouseenter="showBtnTip($event, \'게임 추가 취소\')" @mouseleave="hideBtnTip" data-name="component/game_group/title/btn">' +
            '<i class="ic-v2-control-close-line"></i>' +
          '</button>' +
        '</span>'
      : '') +
    '<span' + (withAdd ? ' v-else' : '') + ' class="library-group__btns" data-name="btn">' +
      (withAdd
        ? '<button class="library-group__btn" type="button" aria-label="게임 추가" @click.stop="startAdd(' + idExpr + ')" @mouseenter="showBtnTip($event, \'게임 추가\')" @mouseleave="hideBtnTip" data-name="component/game_group/title/btn">' +
            '<i class="ic-v2-control-add-circle-fill"></i>' +
          '</button>'
        : '') +
      '<button class="library-group__btn" :class="{ \'is-selected\': menu && menu.groupId === ' + idExpr + ' }" type="button" aria-label="그룹 메뉴" data-menu-btn ' +
        '@click.stop="openMenu($event, ' + idExpr + ', true)" @mouseenter="showBtnTip($event, \'그룹 메뉴\')" @mouseleave="hideBtnTip" data-name="component/game_group/title/btn">' +
        '<i class="ic-v2-navigation-option-vertical-fill"></i>' +
      '</button>' +
    '</span>' +
  '</div>';
}

// 게임 한 줄 (component/game_group/list) — 사이드바와 같은 컴포넌트.
// 같은 게임이 여러 그룹에 들어갈 수 있어 행은 "그룹 id:게임 id"(rowKey)로 구분한다 (툴팁 · 우클릭 포커스)
function ROW_TPL(listExpr, groupExpr) {
  var key = '(' + groupExpr + ') + \':\' + game.id';
  return '<template v-for="game in ' + listExpr + '" :key="game.id">' +
    // 아직 불러오지 않은 행 — 스켈레톤 (보기 옵션 "패널 스켈레톤", 10개씩)
    '<li v-if="isSkeletonRow(' + key + ')" class="game-group__list game-group__list--skeleton" aria-hidden="true" data-name="skeleton/game_group/list">' +
      '<span class="game-group__skeleton game-group__skeleton--thumb"></span>' +
      '<span class="game-group__skeleton game-group__skeleton--name" :style="{ width: skeletonNameWidth(game) }"></span>' +
    '</li>' +
    '<li v-else class="game-group__list" ' +
      ':class="{ \'is-menu-focus\': gameMenu && gameMenu.rowKey === ' + key + ', \'is-selected\': selectedRows.indexOf(' + key + ') >= 0 }" ' +
      ':data-row-key="' + key + '" @click="onRowClick($event, ' + key + ')" ' +
      '@mouseenter="onRowEnter($event, game, ' + key + ')" @mouseleave="onRowLeave" ' +
      '@contextmenu.prevent="openGameMenu($event, game, ' + key + ')" ' +
      '@mousedown="$event.button === 0 && !isStaticRow($event.currentTarget) && setPressed(true)" data-name="component/game_group/list">' +
    '<span class="game-group__thumbnail" :style="{ backgroundImage: \'url(\' + game.thumb + \')\' }" data-name="component/thumnail/game"></span>' +
    '<span class="game-group__list-name stds-cap1 fw-medium"><span v-for="(p, i) in nameParts(game.name)" :key="i" :class="{ \'library-panel__hit\': p.hit }">{{ p.text }}</span></span>' +
    '<span v-if="game.badges && game.badges.length" class="game-group__badges">' +
      '<span v-for="b in game.badges" :key="b" class="badge-game-list" data-name="component/badge/game_list" ' +
        '@mouseenter="showBadgeTip($event, ' + key + ', b)" @mouseleave="hideBadgeTip">' +
        '<img :src="badgeIcon[b]" alt="" />' +
      '</span>' +
    '</span>' +
    '<div v-if="hoveredGameId === ' + key + ' && !(badgeTip && badgeTip.gameId === ' + key + ')" ' +
      'class="game-group__list-tooltip stds-cap2" :style="tooltipStyle">{{ game.name }}</div>' +
    '<div v-if="badgeTip && badgeTip.gameId === ' + key + '" class="game-group__badge-tooltip" ' +
      ':class="{ \'is-measuring\': badgeTip.measuring }" ' +
      ':style="{ left: badgeTip.left + \'px\', top: badgeTip.top + \'px\' }" data-name="Tooltip/iconbtn">' +
      '<span class="game-group__badge-tooltip-tail" :style="{ marginLeft: badgeTip.tailLeft + \'px\' }"></span>' +
      '<span class="game-group__badge-tooltip-body stds-cap1 fw-medium">{{ badgeTip.text }}</span>' +
    '</div>' +
  '</li>' +
  '</template>';
}

var LIBRARY_PANEL_LOAD_STEP = 10; // 한 번에 불러오는 행 수 (실서비스 200, 시안은 한 화면에 스켈레톤이 보이게 10 — 사용자 11-03)
var LIBRARY_PANEL_LOAD_MS = 4000; // 다음 묶음까지 걸리는 시간 (데모용 — 스켈레톤을 충분히 보게 길게, 사용자 11-03)

var LibraryPanel = {
  components: { 'group-name-input': LibraryGroupNameInput, 'create-group-dialog': LibraryCreateGroupDialog, 'library-filter-layer': LibraryFilterLayer },
  data: function () {
    return {
      owned: LIBRARY_OWNED.map(libraryGame),
      store: LIBRARY_STORE, // groups · addTargetId — 콘텐츠(보유게임 선택 UI)와 같이 쓴다
      deletedNotice: false, // 그룹 삭제 직후 버튼 그룹 위에 띄우는 "그룹이 삭제되었습니다." (3초)
      addedNotice: null, // 게임을 그룹에 넣은 직후 같은 자리에 띄우는 완료 토스트 { count, title } (3초)
      collapsed: {}, // 그룹 id → 접힘 여부 ('ungrouped' = 그룹 없는 게임)
      creating: false, // 그룹 만들기 입력칸이 열려 있는지
      renamingId: null, // 이름 변경 중인 그룹 id
      hoveredTitleId: null, // 마우스가 올라간 그룹 타이틀 — 우측 버튼 노출
      titleTip: null, // 잘린 그룹명 전체 툴팁 { id, left, top, width }
      btnTip: null, // 타이틀 우측 버튼 툴팁 { text, left, top, tailLeft, measuring }
      menu: null, // 그룹 메뉴 { groupId, left, top, flip }
      gameMenu: null, // 게임 우클릭 메뉴 { gameId, rowKey, left, top, depth(1|2), back('add'|'remove'), measuring }
      gameToggles: {}, // 게임 id → { autoUpdate, cloud } (메뉴 토글)
      menuTip: null, // 2뎁스 툴팁 { text, left, top, kind('name'|'remove') }
      selectedRows: [], // 선택한 게임 행 (rowKey) — Ctrl/⌘ 클릭 추가 · 해제, Shift 클릭 범위 (Figma ⑫ "여러개 선택 가능(키보드 조작)")
      selectAnchor: null, // Shift 범위 선택 기준 행
      createDialog: null, // 그룹 만들기 팝업 { gameIds } — 게임 메뉴에서 열면 만든 그룹에 그 게임을 넣는다
      menuBlur: protoSettingsRead().containerBlur, // 보기 옵션 "컨테이너 블러" — 메뉴 바탕을 반투명 + 배경 블러로 (테스트)
      // 패널 스켈레톤 (보기 옵션) — 화면 순서대로 앞에서부터 이만큼만 불러온 상태, 나머지 행은 스켈레톤
      loadedRows: Infinity,
      filter: libraryFilterDefault(), // 필터 레이어 (js/library-filter-component.js) — 패널은 정렬에 그룹 · 게임 둘 다
      filterOpen: false,
      // 검색 (Figma 10 검색 8228:227633) — 검색 버튼을 누르면 버튼 그룹 아래 입력칸. 확인하면 검색어가 칩으로 (필터 결과와 같은 자리)
      searchOpen: false,
      searchText: '', // 입력 중인 글자
      searchQuery: '', // 확인한 검색어 — 목록에 적용
      hoveredGameId: null, // 말줄임 툴팁을 띄운 행 (rowKey)
      tooltipLeft: 0,
      tooltipTop: 0,
      tooltipWidth: 0,
      badgeTip: null,
      badgeIcon: GNB_BADGE_ICON,
      showScrollbar: false,
      showTopBtn: false,
      thumbHeight: 0,
      thumbTop: 0,
    };
  },
  computed: {
    // { id, title, gameIds: [] } — 새 그룹이 맨 위
    groups: {
      get: function () { return this.store.groups; },
      set: function (v) { this.store.groups = v; },
    },
    addTargetId: function () { return this.store.addTargetId; },
    // 그룹에 들어간 게임을 뺀 나머지 — 보유게임 순서 그대로
    ungrouped: function () {
      var inGroup = {};
      this.groups.forEach(function (g) { g.gameIds.forEach(function (id) { inGroup[id] = true; }); });
      return this.searchGames(libraryFilterGames(this.owned.filter(function (g) { return !inGroup[g.id]; }), this.filter));
    },
    // 필터나 검색어가 하나라도 걸려 있으면 결과 영역(개수 · 칩 · 초기화)을 보이고, 맞는 게임이 없는 그룹은 숨긴다
    resultsActive: function () { return !!this.searchQuery || libraryFilterActive(this.filter); },
    // 결과 칩 — 설치된 게임 · 종류 · 검색어 · 장르 순 (Figma 2-2-2 검색결과 있음_2). 누르면 그 조건만 뺀다
    resultChips: function () {
      var f = this.filter, vm = this, chips = [];
      if (f.installedOnly) chips.push({ key: 'installed', label: '설치된 게임', remove: function () { vm.filter = Object.assign({}, f, { installedOnly: false }); } });
      LIBRARY_FILTER_TYPES.forEach(function (t) {
        if (f.types.indexOf(t.key) >= 0) chips.push({ key: 'type:' + t.key, label: t.label, remove: function () { vm.filter = Object.assign({}, f, { types: f.types.filter(function (k) { return k !== t.key; }) }); } });
      });
      if (this.searchQuery) chips.push({ key: 'query', label: this.searchQuery, remove: function () { vm.searchQuery = ''; vm.searchText = ''; } });
      f.genres.forEach(function (g) {
        chips.push({ key: 'genre:' + g, label: g, remove: function () { vm.filter = Object.assign({}, f, { genres: f.genres.filter(function (k) { return k !== g; }) }); } });
      });
      return chips;
    },
    // 결과 개수 = 화면에 남은 게임 행 수 (여러 그룹에 든 게임은 그 수만큼)
    resultCount: function () {
      return this.shownGroups.reduce(function (n, g) { return n + this.groupGames(g).length; }.bind(this), 0) + this.ungrouped.length;
    },
    // 검색 확인 — 글자가 있고, 이미 검색한 글자와 다를 때만 (Figma "확인은 비활성화상태 (이미 검색을 완료 했으므로)")
    canSubmitSearch: function () {
      var t = this.searchText.trim();
      return !!t && t !== this.searchQuery;
    },
    // 화면에 그리는 순서(그룹들 → 그룹 없는 게임)의 행 번호 — 스켈레톤을 앞에서부터 걷어낸다
    rowOrder: function () {
      var order = {};
      var n = 0;
      this.shownGroups.forEach(function (g) {
        this.groupGames(g).forEach(function (game) { order[g.id + ':' + game.id] = n++; });
      }, this);
      this.ungrouped.forEach(function (game) { order['ungrouped:' + game.id] = n++; });
      return order;
    },
    // 필터 정렬을 적용한 그룹 순서 (설정 순이면 그대로)
    shownGroups: function () {
      var list = librarySortGroups(this.groups, this.filter);
      return this.resultsActive ? list.filter(function (g) { return this.groupGames(g).length > 0; }, this) : list;
    },
    tooltipStyle: function () {
      return { left: this.tooltipLeft + 'px', top: this.tooltipTop + 'px', width: this.tooltipWidth + 'px' };
    },
    thumbStyle: function () {
      return { height: this.thumbHeight + 'px', top: this.thumbTop + 'px' };
    },
    canCreate: function () { return this.groups.length < LIBRARY_GROUP_MAX; },
    menuGame: function () {
      var id = this.gameMenu && this.gameMenu.gameId;
      return id ? this.owned.find(function (g) { return g.id === id; }) : null;
    },
    // 그 게임이 들어 있는 그룹 — 그룹에서 제거 2뎁스 목록
    menuGameGroups: function () {
      var id = this.gameMenu && this.gameMenu.gameId;
      return id ? this.groups.filter(function (g) { return g.gameIds.indexOf(id) >= 0; }) : [];
    },
    // 1뎁스 — 그룹에 하나도 없는 게임은 그룹에서 제거를 뺀다
    gameMenuItems: function () {
      if (this.gameMenu && this.gameMenu.multi) return LIBRARY_GAME_MENU_MULTI;
      var inGroup = this.menuGameGroups.length > 0;
      return LIBRARY_GAME_MENU.filter(function (item) { return item.sub !== 'remove' || inGroup; });
    },
    titleTipText: function () {
      if (!this.titleTip) return '';
      if (this.titleTip.id === 'ungrouped') return '그룹 없는 게임';
      var g = this.groups.find(function (x) { return x.id === this.titleTip.id; }, this);
      return g ? g.title : '';
    },
    // 구분선 · 그룹 목록 — 그룹이나 그룹 없는 게임이 하나라도 있을 때.
    // 그룹 만들기 입력 중에는 구분선부터 아래 목록 전부 숨긴다 (Figma ③ "그룹 목록 미노출")
    showList: function () { return !this.creating && (this.resultsActive ? this.resultCount > 0 : (this.groups.length > 0 || this.ungrouped.length > 0)); },
    // 구분선 — 목록이 있거나, 결과가 0이라 빈 결과 안내를 띄울 때
    // 그룹 없음 안내 박스 — 그룹이 없을 때. 그룹 만들기 입력 중 · 필터/검색 결과를 볼 때는 숨긴다
    showEmptyHint: function () { return !this.groups.length && !this.creating && !this.resultsActive; },
    showDivider: function () { return !this.creating && (this.showList || this.resultsActive); },
    // 그룹 메뉴 항목 (Figma ④ 그룹 메뉴 = 우클릭 메뉴). 그룹 없는 게임은 일부만 (화면 보기 · 접기)
    menuItems: function () {
      if (!this.menu) return [];
      var id = this.menu.groupId;
      var fold = { action: 'toggle', label: this.isCollapsed(id) ? '그룹 펼치기' : '그룹 접기' };
      var head = id === 'ungrouped'
        ? [{ action: 'view', label: '그룹 화면 보기' }, fold]
        : [
            { action: 'view', label: '그룹 화면 보기' },
            { action: 'add', label: '게임 추가' },
            { action: 'rename', label: '그룹 이름 변경' },
            { action: 'delete', label: '그룹 삭제' },
            fold,
          ];
      return head.concat([
        { divider: true },
        { action: 'expandAll', label: '모든 그룹 펼치기' },
        { action: 'collapseAll', label: '모든 그룹 접기' },
      ]);
    },
  },
  watch: {
    // 입력 중엔 목록이 숨었다가 돌아오니 스크롤바 길이를 다시 잰다
    creating: function () { this.$nextTick(this.updateThumb); },
    // 필터로 목록 길이가 바뀌어도 마찬가지
    filter: function () { this.$nextTick(this.updateThumb); },
    searchQuery: function () { this.$nextTick(this.updateThumb); },
  },
  methods: {
    // 게임 추가 중인 그룹은 항상 펼쳐 둔다 (접기/펼치기 비활성)
    isSkeletonRow: function (rowKey) {
      var i = this.rowOrder[rowKey];
      return i != null && i >= this.loadedRows;
    },
    // 이름 막대 길이 — 무작위 40~90% (사용자 11-03). 같은 행은 다시 그려도 길이가 그대로이게 기억해 둔다
    skeletonNameWidth: function (game) {
      var map = this._skeletonWidths || (this._skeletonWidths = {});
      if (!map[game.id]) map[game.id] = Math.round(40 + Math.random() * 50) + '%';
      return map[game.id];
    },
    // 10개씩 나눠 불러오기 — SGVN 로딩 개선(200개 단위) 시안을 우리 100개에 맞춰 작은 단위로 (사용자 11-03)
    startSkeletonLoad: function () {
      clearInterval(this._skeletonTimer);
      this._skeletonWidths = {}; // 다시 재생할 때마다 막대 길이도 새로
      var vm = this;
      var total = Object.keys(this.rowOrder).length;
      this.loadedRows = LIBRARY_PANEL_LOAD_STEP;
      this._skeletonTimer = setInterval(function () {
        vm.loadedRows += LIBRARY_PANEL_LOAD_STEP;
        if (vm.loadedRows >= total) {
          vm.loadedRows = Infinity;
          clearInterval(vm._skeletonTimer);
          // 다 불러오면 보기 옵션 스위치도 끈다 — 끝났다는 걸 알 수 있게, 다시 켜면 처음부터 (사용자 11-03)
          protoSettingsWrite({ libraryPanelSkeleton: false });
        }
      }, LIBRARY_PANEL_LOAD_MS);
    },
    applySkeletonSetting: function (s) {
      if (s.libraryPanelSkeleton && s.libraryPanelSkeletonAt !== this._skeletonAt) {
        this._skeletonAt = s.libraryPanelSkeletonAt;
        this.startSkeletonLoad();
      } else if (!s.libraryPanelSkeleton) {
        this._skeletonAt = null;
        clearInterval(this._skeletonTimer);
        this.loadedRows = Infinity;
      }
    },
    // 필터 레이어 기준 — 버튼 그룹 (폭 240과 같은 왼쪽 끝)
    actionsEl: function () { return this.$refs.actions; },
    isCollapsed: function (id) { return id !== this.addTargetId && !!this.collapsed[id]; },
    groupGames: function (group) {
      var byId = {};
      this.owned.forEach(function (g) { byId[g.id] = g; });
      return this.searchGames(libraryFilterGames(group.gameIds.map(function (id) { return byId[id]; }).filter(Boolean), this.filter));
    },
    // ── 검색 (Figma 10 · 2-3) — 패널 안 게임 이름에서만 찾는다 ──
    searchGames: function (list) {
      var q = this.searchQuery.toLowerCase();
      return q ? list.filter(function (g) { return g.name.toLowerCase().indexOf(q) >= 0; }) : list;
    },
    // 게임 이름을 검색어 앞 · 검색어 · 뒤로 나눈다 — 검색어 부분만 brand-primary
    nameParts: function (name) {
      var q = this.searchQuery;
      var i = q ? name.toLowerCase().indexOf(q.toLowerCase()) : -1;
      if (i < 0) return [{ text: name, hit: false }];
      return [
        { text: name.slice(0, i), hit: false },
        { text: name.slice(i, i + q.length), hit: true },
        { text: name.slice(i + q.length), hit: false },
      ].filter(function (p) { return p.text; });
    },
    // 검색 버튼 — 입력칸을 열고 닫는다. 닫아도 확인한 검색어(칩)는 남는다 — 칩 X · 초기화로 지운다
    toggleSearch: function () {
      if (this.searchOpen) { this.closeSearch(); return; }
      this.searchOpen = true;
      this.searchText = this.searchQuery;
      this.$nextTick(function () { if (this.$refs.searchInput) this.$refs.searchInput.focus(); });
    },
    closeSearch: function () { this.searchOpen = false; },
    onSearchInput: function (e) { this.searchText = e.target.value; },
    onSearchKey: function (e) {
      if (e.isComposing) return;
      if (e.key === 'Enter') { e.preventDefault(); this.submitSearch(); }
      else if (e.key === 'Escape') this.closeSearch();
    },
    submitSearch: function () {
      if (!this.canSubmitSearch) return;
      this.searchQuery = this.searchText.trim();
      if (this.$refs.scrollEl) this.$refs.scrollEl.scrollTop = 0;
    },
    clearSearchText: function () {
      this.searchText = '';
      this.$refs.searchInput.focus();
    },
    // 초기화 — 필터 조건과 검색어를 모두 지우고 원래 목록으로 (정렬은 그대로, 검색 입력칸은 열린 채)
    resetResults: function () {
      this.filter = Object.assign(libraryFilterDefault(), { groupSort: this.filter.groupSort, gameSort: this.filter.gameSort });
      this.searchQuery = '';
      this.searchText = '';
    },
    toggleGroup: function (id) {
      this.collapsed[id] = !this.collapsed[id];
      this.$nextTick(this.updateThumb);
    },
    setAllCollapsed: function (on) {
      var self = this;
      this.groups.forEach(function (g) { self.collapsed[g.id] = on; });
      this.collapsed.ungrouped = on;
      this.$nextTick(this.updateThumb);
    },

    // ── 그룹 만들기 (Figma ③ · 2-1) — 버튼 그룹 자리에 입력칸, 안내 박스는 사라진다 ──
    nameTaken: function (name, exceptId) {
      return this.groups.some(function (g) { return g.id !== exceptId && g.title === name; });
    },
    validateNew: function (name) {
      return this.nameTaken(name) ? LIBRARY_GROUP_DUP_MSG : '';
    },
    startCreate: function () {
      if (!this.canCreate) return;
      this.closeMenu();
      this.renamingId = null;
      this.deletedNotice = false;
      this.creating = true;
    },
    // gameIds — 게임 메뉴 > 그룹 만들기 팝업에서 만들면 그 게임을 바로 넣는다
    createGroup: function (name, gameIds) {
      var id = 'g' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      this.groups.unshift({ id: id, title: name, gameIds: gameIds ? gameIds.slice() : [] });
      this.creating = false;
      this.$refs.scrollEl.scrollTop = 0;
      // 새 그룹은 그룹 목록 맨 위 — 화면 밖이면 보이는 곳까지 스크롤
      this.$nextTick(function () {
        var el = this.$el.querySelector('[data-group-id="' + id + '"]');
        if (el) el.scrollIntoView({ block: 'nearest' });
        this.updateThumb();
      });
    },

    // ── 그룹 이름 변경 (Figma ⑬) — 그 그룹 타이틀이 입력칸으로 바뀌고 게임 목록은 숨는다 ──
    startRename: function (id) {
      this.creating = false;
      this.renamingId = id;
    },
    validateRename: function (name) {
      return this.nameTaken(name, this.renamingId) ? LIBRARY_GROUP_DUP_MSG : '';
    },
    renameGroup: function (name) {
      var g = this.groups.find(function (x) { return x.id === this.renamingId; }, this);
      if (g) g.title = name;
      this.renamingId = null;
    },
    deleteGroup: function (id) {
      var self = this;
      if (id === this.addTargetId) this.cancelAdd();
      this.groups = this.groups.filter(function (g) { return g.id !== id; });
      delete this.collapsed[id];
      this.addedNotice = null;
      this.deletedNotice = true;
      clearTimeout(this._noticeTimer);
      this._noticeTimer = setTimeout(function () { self.deletedNotice = false; }, 3000);
      this.$nextTick(this.updateThumb);
    },

    // ── 그룹 타이틀 호버 — 우측 버튼(게임 추가 · 그룹 메뉴) 노출, 잘린 그룹명은 툴팁 (Figma ④ · 3-1-1) ──
    onTitleEnter: function (e, id) {
      if (this.anyMenuOpen()) return;
      var title = e.currentTarget;
      this.hoveredTitleId = id;
      // 버튼이 나타나면 이름 칸이 줄어드니 다음 틱에 재서 잘렸을 때만 띄운다
      this.$nextTick(function () {
        if (this.hoveredTitleId !== id || this.anyMenuOpen()) return;
        var nameEl = title.querySelector('.game-group__name');
        if (nameEl && nameEl.scrollWidth > nameEl.clientWidth) {
          var r = nameEl.getBoundingClientRect();
          this.titleTip = { id: id, left: r.left, top: r.bottom + 2, width: r.width };
        }
      });
    },
    onTitleLeave: function () {
      this.hoveredTitleId = null;
      this.titleTip = null;
      this.btnTip = null;
    },
    showBtnTip: function (e, text) {
      if (this.anyMenuOpen()) return;
      var btn = e.currentTarget;
      var row = btn.closest('.library-group__title');
      var r = btn.getBoundingClientRect();
      this.titleTip = null; // 버튼 툴팁과 이름 툴팁이 겹치지 않게
      this.btnTip = { text: text, left: 0, top: r.bottom + 2, tailLeft: 0, measuring: true };
      // 버튼 중앙 기준, 타이틀 행 밖으로 나가면 행 끝에 붙인다 — 꼬리는 그래도 버튼 중앙 (뱃지 툴팁과 같은 규칙)
      this.$nextTick(function () {
        var tip = this.$refs.btnTipEl;
        if (!tip || !this.btnTip || this.btnTip.text !== text) return;
        var rr = row.getBoundingClientRect();
        var center = r.left + r.width / 2;
        var w = tip.offsetWidth;
        var left = Math.min(Math.max(center - w / 2, rr.left), rr.right - w);
        this.btnTip.left = left;
        this.btnTip.tailLeft = center - left - 3;
        this.btnTip.measuring = false;
      });
    },
    hideBtnTip: function () { this.btnTip = null; },
    // 그룹 타이틀 클릭 = 그룹 화면으로 이동 (다음 단계)
    openGroupPage: function () {},

    // ── 게임 추가 (Figma ⑦ · 3-3) — 그 그룹이 선택 상태가 되고 보유게임 영역이 선택 UI로 바뀐다.
    // 다른 그룹에서 게임 추가를 누르면 대상만 바뀐다 (고른 게임은 비워진다)
    startAdd: function (id) {
      this.closeMenu();
      this.btnTip = null;
      this.store.selectMode = false; // 게임 선택으로 들어온 선택 UI 중이면 그 그룹 추가로 바꾼다
      this.store.addTargetId = id;
      this.collapsed[id] = false;
    },
    cancelAdd: function () {
      this.btnTip = null;
      this.store.addTargetId = null;
    },

    // ── 그룹 메뉴 — ⋮ 버튼 클릭(버튼 오른쪽 끝에 맞춰 아래로) · 타이틀 우클릭(커서 위치) ──
    openMenu: function (e, groupId, fromButton) {
      var anchor;
      if (fromButton) {
        // 오른쪽 끝은 버튼이 아니라 타이틀 행(= 게임명 행) 끝에 맞춘다 — 버튼 툴팁과 같은 정렬
        var r = e.currentTarget.getBoundingClientRect();
        var row = e.currentTarget.closest('.library-group__title').getBoundingClientRect();
        anchor = { x: row.right, y: r.bottom + 4, alignRight: true, flipY: r.top - 4 };
      } else {
        anchor = { x: e.clientX, y: e.clientY, alignRight: false, flipY: e.clientY };
      }
      if (this.menu && this.menu.groupId === groupId && fromButton && this.menu.fromButton) {
        this.closeMenu();
        return;
      }
      this.btnTip = null;
      this.titleTip = null;
      this.closeGameMenu();
      this.clearHover();
      this.menu = { groupId: groupId, fromButton: !!fromButton, left: anchor.x, top: anchor.y, measuring: true };
      this.$nextTick(function () {
        var el = this.$refs.menuEl;
        if (!el || !this.menu) return;
        var w = el.getBoundingClientRect().width; // 소수점 폭 그대로 — offsetWidth 반올림이면 오른쪽 끝이 0.5 어긋난다
        var h = el.offsetHeight;
        var left = anchor.alignRight ? anchor.x - w : anchor.x;
        var top = anchor.y;
        if (top + h > window.innerHeight - 8) top = anchor.flipY - h; // 아래가 모자라면 위로
        left = this.clampToPanel(left, w);
        this.menu.left = left;
        this.menu.top = Math.max(8, top);
        this.menu.measuring = false;
      });
    },
    closeMenu: function () { this.menu = null; },
    // 메뉴가 뜨면 호버 인디케이터 · 행 툴팁을 바로 치운다 (사이드바 openGameContextMenu와 같다)
    clearHover: function () {
      clearTimeout(this._hoverLeaveTimer);
      this._hoverSpring.hide();
      this._hoverVisible = false;
      this.hoveredGameId = null;
      this.badgeTip = null;
    },
    anyMenuOpen: function () { return !!(this.menu || this.gameMenu); },
    // 컨텍스트메뉴는 패널 밖으로 나가지 않는다 — 패널 안 좌우 16 여백 안에서만 (그룹 메뉴 · 게임 메뉴 공통)
    clampToPanel: function (left, width) {
      var r = this.$el.getBoundingClientRect();
      return Math.max(r.left + 16, Math.min(left, r.right - 16 - width));
    },
    onMenuAction: function (action) {
      var id = this.menu.groupId;
      this.closeMenu();
      if (action === 'toggle') this.toggleGroup(id);
      else if (action === 'rename') this.startRename(id);
      else if (action === 'delete') this.deleteGroup(id);
      else if (action === 'expandAll') this.setAllCollapsed(false);
      else if (action === 'collapseAll') this.setAllCollapsed(true);
      else if (action === 'add') this.startAdd(id);
      // 'view'(그룹 화면)는 다음 단계
    },

    // ── 게임 우클릭 메뉴 (Figma 3-5-2) — 1뎁스에서 그룹에 추가 · 그룹에서 제거를 누르면 카드처럼 뒤집혀 2뎁스로.
    // 1 · 2뎁스 너비는 같다(1뎁스 기준, 0907). 위치는 열 때 한 번만 잡고 플립 중엔 다시 재지 않는다 (플립 가이드)
    openGameMenu: function (e, game, rowKey) {
      if (this.isStaticRow(e.currentTarget)) return;
      this.showGameMenu(game, rowKey, e.clientX, e.clientY, null);
    },
    // 보유게임 · 빠른 실행 카드 우클릭 — 같은 게임 메뉴를 카드 자리에서 연다 (library-component의 library-game-menu 이벤트)
    onCardGameMenu: function (e) {
      var d = e.detail;
      var game = this.owned.find(function (g) { return g.id === d.gameId; });
      if (game) this.showGameMenu(game, null, d.x, d.y, d.area);
    },
    // area = 콘텐츠 영역(.main) 사각형 — 있으면 1 · 2뎁스 모두 그 안쪽 40 여백 안에만 띄운다(패널 · 사이드바로 넘어가지 않음, 사용자 11-04).
    // 없으면 패널 메뉴 — 패널 안 좌우 16 안으로
    showGameMenu: function (game, rowKey, x, y, area) {
      this.closeMenu();
      this.btnTip = null;
      this.titleTip = null;
      this.menuTip = null;
      this.clearHover();
      if (!this.gameToggles[game.id]) this.gameToggles[game.id] = Object.assign({}, LIBRARY_GAME_TOGGLE_DEFAULT);
      // 선택한 행(2개 이상)을 우클릭하면 n개 메뉴, 선택 밖 행을 우클릭하면 선택을 풀고 그 게임 1개 메뉴
      var multi = !!rowKey && this.selectedRows.length > 1 && this.selectedRows.indexOf(rowKey) >= 0;
      if (!multi) { this.selectedRows = []; this.selectAnchor = null; }
      var box = area ? { left: area.left + 40, top: area.top + 40, right: area.right - 40, bottom: area.bottom - 40 } : null;
      this.gameMenu = {
        gameId: game.id, gameIds: multi ? this.selectedGameIds() : [game.id], multi: multi,
        rowKey: multi ? null : rowKey, left: x, top: y, depth: 1, back: 'add', measuring: true,
        cascade: !!box, box: box, subLeft: 0, subTop: 0, subMeasuring: false, // cascade = 2뎁스를 옆에 띄움 (콘텐츠 영역)
      };
      this.$nextTick(function () {
        var el = this.$refs.gameMenuEl;
        if (!el || !this.gameMenu) return;
        var r = el.querySelector('.game-menu__face--front').getBoundingClientRect();
        var minTop = box ? box.top : 8;
        var maxBottom = box ? box.bottom : window.innerHeight - 8;
        var left = box ? Math.max(box.left, Math.min(x, box.right - r.width)) : this.clampToPanel(x, r.width);
        var top = y + r.height > maxBottom ? y - r.height : y; // 아래가 모자라면 위로
        this.gameMenu.left = Math.round(left);
        this.gameMenu.top = Math.round(Math.max(minTop, top));
        this.gameMenu.measuring = false;
      });
    },
    closeGameMenu: function () { clearTimeout(this._subTimer); this.gameMenu = null; this.menuTip = null; },
    onGameMenuItem: function (item, e) {
      if (item.sub && this.gameMenu.cascade) { clearTimeout(this._subTimer); this.openGameSub(e.currentTarget, item.sub); }
      else if (item.sub) { this.gameMenu.back = item.sub; this.gameMenu.depth = 2; this.menuTip = null; }
      else if (item.toggle) { var t = this.gameToggles[this.gameMenu.gameId]; t[item.toggle] = !t[item.toggle]; }
      else this.closeGameMenu(); // 나머지 항목은 아직 동작 없음
    },
    // 콘텐츠 영역(카드)에서 연 메뉴 — 2뎁스는 플립 대신 1뎁스 옆에 4 띄워 뜬다 (사용자 11-04).
    // 항목에 마우스를 올리면 열리고 다른 항목으로 옮기면 닫힌다 — 대각선으로 옮겨 갈 때 깜빡이지 않게 120ms 늦춘다
    onGameItemEnter: function (e, item) {
      if (!this.gameMenu || !this.gameMenu.cascade) return;
      clearTimeout(this._subTimer);
      var el = e.currentTarget;
      this._subTimer = setTimeout(function () {
        if (!this.gameMenu) return;
        if (item.sub) this.openGameSub(el, item.sub);
        else if (this.gameMenu.depth === 2) this.flipBack();
      }.bind(this), 120);
    },
    cancelSubTimer: function () { clearTimeout(this._subTimer); },
    // 위치: 1뎁스 오른쪽 + 4, 위는 그 항목과 맞춘다. 콘텐츠 영역 40 여백을 넘으면 왼쪽 + 4, 아래가 넘으면 그 안까지 올린다
    openGameSub: function (itemEl, sub) {
      if (this.gameMenu.depth === 2 && this.gameMenu.back === sub) return;
      this.gameMenu.back = sub;
      this.gameMenu.depth = 2;
      this.gameMenu.subMeasuring = true;
      this.menuTip = null;
      this.$nextTick(function () {
        var subEl = this.$refs.gameSubEl;
        if (!subEl || !this.gameMenu) return;
        var face = itemEl.closest('.game-menu__face').getBoundingClientRect();
        var ir = itemEl.getBoundingClientRect();
        var w = subEl.offsetWidth;
        var h = subEl.offsetHeight;
        var box = this.gameMenu.box;
        var left = face.right + 4;
        if (left + w > box.right) left = face.left - 4 - w; // 오른쪽 카드 — 1뎁스 왼쪽에 붙는다
        var top = Math.max(box.top, Math.min(ir.top, box.bottom - h));
        this.gameMenu.subLeft = Math.round(left - this.gameMenu.left);
        this.gameMenu.subTop = Math.round(top - this.gameMenu.top);
        this.gameMenu.subMeasuring = false;
      });
    },
    // ── 게임 여러 개 선택 (Figma ⑫ · 3-5-3) — 클릭 = 그 행만, Ctrl/⌘ 클릭 = 추가 · 해제, Shift 클릭 = 같은 그룹 안 범위.
    // 게임 추가 중인 그룹의 행은 고를 수 없다
    onRowClick: function (e, rowKey) {
      var li = e.currentTarget;
      if (this.isStaticRow(li)) return;
      if (e.metaKey || e.ctrlKey) {
        var i = this.selectedRows.indexOf(rowKey);
        if (i >= 0) this.selectedRows.splice(i, 1);
        else this.selectedRows.push(rowKey);
        this.selectAnchor = rowKey;
        return;
      }
      if (e.shiftKey && this.selectAnchor) {
        var section = li.closest('.library-group');
        var keys = Array.prototype.map.call(section.querySelectorAll('[data-row-key]'), function (el) { return el.dataset.rowKey; });
        var a = keys.indexOf(this.selectAnchor);
        var b = keys.indexOf(rowKey);
        if (a >= 0 && b >= 0) {
          this.selectedRows = keys.slice(Math.min(a, b), Math.max(a, b) + 1);
          return;
        }
      }
      this.selectedRows = [rowKey];
      this.selectAnchor = rowKey;
    },
    // 게임 추가 완료 토스트 — 패널 상단(버튼 그룹 위), 3초. 삭제 안내와 자리를 같이 쓰니 하나만 보인다
    showAddedNotice: function (count, title) {
      var self = this;
      this.deletedNotice = false;
      this.addedNotice = { count: count, title: title };
      clearTimeout(this._noticeTimer);
      this._noticeTimer = setTimeout(function () { self.addedNotice = null; }, 3000);
    },
    clearSelection: function () { this.selectedRows = []; this.selectAnchor = null; },
    // 선택한 행의 게임 (같은 게임이 여러 그룹에서 골라져도 한 번만)
    selectedGameIds: function () {
      var seen = {};
      return this.selectedRows.map(function (k) { return k.slice(k.indexOf(':') + 1); })
        .filter(function (id) { return seen[id] ? false : (seen[id] = true); });
    },
    // 2뎁스 상단 메뉴명(← 포함)을 누르면 1뎁스로 다시 뒤집힌다
    flipBack: function () { this.gameMenu.depth = 1; this.menuTip = null; },
    // 고른 게임이 전부 이미 들어 있는 그룹은 비활성
    gameInGroup: function (group) {
      return !!this.gameMenu && this.gameMenu.gameIds.every(function (id) { return group.gameIds.indexOf(id) >= 0; });
    },
    addMenuGameTo: function (group) {
      if (this.gameInGroup(group)) return;
      var added = 0;
      this.gameMenu.gameIds.forEach(function (id) { if (group.gameIds.indexOf(id) < 0) { group.gameIds.push(id); added++; } });
      this.showAddedNotice(added, group.title);
      if (this.gameMenu.multi) this.clearSelection();
      this.closeGameMenu();
      this.$nextTick(this.updateThumb);
    },
    // 그룹에서 제거 — 그 행만 빠지고 메뉴는 그대로. 남은 그룹이 없으면 1뎁스로 돌아간다
    removeMenuGameFrom: function (group) {
      var i = group.gameIds.indexOf(this.gameMenu.gameId);
      if (i >= 0) group.gameIds.splice(i, 1);
      this.menuTip = null;
      if (!this.menuGameGroups.length) this.flipBack();
      this.$nextTick(this.updateThumb);
    },
    openCreateFromMenu: function () {
      if (!this.canCreate) return;
      var ids = this.gameMenu.gameIds.slice();
      if (this.gameMenu.multi) this.clearSelection();
      this.closeGameMenu();
      this.createDialog = { gameIds: ids };
    },
    createFromDialog: function (name) {
      var ids = this.createDialog.gameIds;
      this.createGroup(name, ids);
      this.createDialog = null;
      if (ids.length) this.showAddedNotice(ids.length, name);
    },
    // 2뎁스 툴팁 — 잘린 그룹명(gray700, 이름 라벨 폭 그대로 · 아래 2) / 이 그룹에서 제거(버튼 아래 2, 메뉴 안쪽에 붙임)
    showNameTip: function (e) {
      var nameEl = e.currentTarget.querySelector('.game-menu__name');
      if (!nameEl || nameEl.scrollWidth <= nameEl.clientWidth) return;
      var r = nameEl.getBoundingClientRect();
      this.menuTip = { kind: 'name', text: nameEl.textContent, left: r.left, top: r.bottom + 2, width: r.width };
    },
    showRemoveTip: function (e) {
      var btn = e.currentTarget;
      var face = btn.closest('.game-menu__face');
      var r = btn.getBoundingClientRect();
      this.menuTip = { kind: 'remove', text: '이 그룹에서 제거', left: 0, top: r.bottom + 2, tailLeft: 0, measuring: true };
      this.$nextTick(function () {
        var tip = this.$refs.menuTipEl;
        if (!tip || !this.menuTip || this.menuTip.kind !== 'remove') return;
        var fr = face.getBoundingClientRect();
        var center = r.left + r.width / 2;
        var w = tip.offsetWidth;
        var left = Math.min(Math.max(center - w / 2, fr.left), fr.right - w);
        this.menuTip.left = left;
        this.menuTip.tailLeft = center - left - 3;
        this.menuTip.measuring = false;
      });
    },
    hideMenuTip: function () { this.menuTip = null; },
    onDocMouseDown: function (e) {
      var inGameMenu = this.$refs.gameMenuEl && this.$refs.gameMenuEl.contains(e.target);
      if (this.gameMenu && !inGameMenu) this.closeGameMenu();
      // 게임 행 · 메뉴 · 팝업 밖을 누르면 선택이 풀린다
      if (this.selectedRows.length && !inGameMenu && e.button === 0 && !(e.target.closest && e.target.closest('.game-group__list, .layer-dialog-dim'))) this.clearSelection();
      if (!this.menu) return;
      if (this.$refs.menuEl && this.$refs.menuEl.contains(e.target)) return;
      if (e.target.closest && e.target.closest('[data-menu-btn]')) return; // ⋮ 버튼은 openMenu가 열고/닫는다
      this.closeMenu();
    },
    onDocKeyDown: function (e) {
      if (e.key === 'Escape' && this.menu) this.closeMenu();
      if (e.key === 'Escape' && this.gameMenu) this.closeGameMenu();
      else if (e.key === 'Escape' && this.selectedRows.length && !this.createDialog) this.clearSelection();
    },

    // ── 호버 인디케이터 (사이드바와 같은 스프링, Figma 5765:88811 "공통 원칙") ──
    // 좌표는 스크롤 영역 기준 — 인디케이터가 스크롤과 같이 움직인다.
    moveHoverTo: function (el, mode) {
      var box = this.$refs.scrollEl;
      var c = box.getBoundingClientRect();
      var r = el.getBoundingClientRect();
      this._hoverSpring.setTarget({
        left: r.left - c.left + box.scrollLeft,
        top: r.top - c.top + box.scrollTop,
        width: r.width,
        height: r.height,
      }, mode);
    },
    // 숨어 있다가 나타날 땐 그 자리에 바로, 이미 보이는 중이면 스프링으로 미끄러진다
    // 게임 추가 중인 그룹(선택모드)의 게임 행은 상태값(hover · press) · 툴팁 없이 보여주기만 한다
    isStaticRow: function (el) { return !!el.closest('.is-add-target'); },
    // 컨텍스트메뉴가 떠 있는 동안은 호버 인디케이터 · 툴팁 전부 비활성 (사이드바와 같은 규칙 —
    // 메뉴 쪽으로 마우스를 옮기며 지나치는 행이 반응하면 안 된다)
    onRowEnter: function (e, game, rowKey) {
      if (this.anyMenuOpen()) return;
      var li = e.currentTarget;
      clearTimeout(this._hoverLeaveTimer);
      // 선택모드(게임 추가 중) 그룹의 행은 상태값 · 툴팁 전부 없이 보여주기만
      if (this.isStaticRow(li)) {
        this._hoverSpring.hide();
        this._hoverVisible = false;
        return;
      }
      this.moveHoverTo(li, this._hoverVisible ? undefined : 'instant');
      this._hoverSpring.show();
      this._hoverVisible = true;
      // 이름이 말줄임될 때만 전체 이름 툴팁 (Figma ⑥) — 이름 라벨 폭 그대로, 라벨 바닥 + 2.
      var nameEl = li.querySelector('.game-group__list-name');
      if (nameEl && nameEl.scrollWidth > nameEl.clientWidth) {
        var nr = nameEl.getBoundingClientRect();
        this.hoveredGameId = rowKey;
        this.tooltipLeft = nr.left;
        this.tooltipWidth = nr.width;
        this.tooltipTop = nr.bottom + 2;
      }
    },
    // 행 사이 간격(2px)을 지날 때 깜빡이지 않게 50ms 뒤에 숨긴다
    onRowLeave: function () {
      var self = this;
      this.hoveredGameId = null;
      this.badgeTip = null;
      this.setPressed(false);
      this._hoverLeaveTimer = setTimeout(function () {
        self._hoverSpring.hide();
        self._hoverVisible = false;
      }, 50);
    },
    setPressed: function (on) {
      var el = this.$refs.hoverIndicator;
      if (el) el.classList.toggle('is-pressed', !!on);
    },

    // 뱃지 툴팁 — 뱃지 중앙 기준, 행 밖으로 나가면 행 끝에 붙인다 (사이드바와 같은 규칙)
    showBadgeTip: function (e, rowKey, badge) {
      if (this.anyMenuOpen() || this.isStaticRow(e.currentTarget)) return;
      var badgeEl = e.currentTarget;
      var li = badgeEl.closest('.game-group__list');
      var self = this;
      this.badgeTip = {
        gameId: rowKey,
        text: GNB_BADGE_TOOLTIP[badge],
        left: 0,
        top: li.getBoundingClientRect().bottom - 4,
        tailLeft: 0,
        measuring: true,
      };
      this.$nextTick(function () {
        var tip = li.querySelector('.game-group__badge-tooltip');
        if (!tip || !self.badgeTip || self.badgeTip.gameId !== rowKey) return;
        var lr = li.getBoundingClientRect();
        var br = badgeEl.getBoundingClientRect();
        var center = br.left + br.width / 2 - lr.left;
        var w = tip.offsetWidth;
        var left = Math.min(Math.max(center - w / 2, 0), li.offsetWidth - w);
        self.badgeTip.left = lr.left + left;
        self.badgeTip.tailLeft = center - left - 3;
        self.badgeTip.measuring = false;
      });
    },
    hideBadgeTip: function () { this.badgeTip = null; },

    // ── 스크롤 · 스크롤바 · TOP (Figma ③ 스크롤 영역 정의) ──
    // TOP은 목록이 패널(스크롤 영역) 높이만큼 내려갔을 때 노출, 누르면 그룹 목록 맨 위로
    onScroll: function () {
      var box = this.$refs.scrollEl;
      this.hoveredGameId = null; // 툴팁·메뉴는 화면 고정 좌표라 스크롤하면 행과 어긋난다
      this.badgeTip = null;
      this.titleTip = null;
      this.btnTip = null;
      this.closeMenu();
      this.closeGameMenu();
      this.showTopBtn = box.scrollTop >= box.clientHeight;
      this.updateThumb();
    },
    scrollToTop: function () {
      this.$refs.scrollEl.scrollTo({ top: 0, behavior: 'smooth' });
    },
    updateThumb: function () {
      var box = this.$refs.scrollEl;
      var track = this.$refs.track;
      if (!box || !track) return;
      if (box.scrollHeight <= box.clientHeight) { track.style.display = 'none'; return; }
      track.style.display = 'block';
      var trackH = track.clientHeight;
      var h = Math.max((box.clientHeight / box.scrollHeight) * trackH, 24);
      this.thumbHeight = h;
      this.thumbTop = (trackH - h) * (box.scrollTop / (box.scrollHeight - box.clientHeight));
    },
    // 스크롤바는 패널에 마우스가 있을 때만 (Figma: "평소에는 미노출")
    onDocMouseMove: function (e) {
      var r = this.$el.getBoundingClientRect();
      this.showScrollbar = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    },
    onDocMouseLeave: function () { this.showScrollbar = false; },
  },
  mounted: function () {
    this._hoverSpring = createSpringBox(this.$refs.hoverIndicator);
    this._onRelease = this.setPressed.bind(this, false);
    document.addEventListener('mouseup', this._onRelease);
    document.addEventListener('mousemove', this.onDocMouseMove);
    document.addEventListener('mouseleave', this.onDocMouseLeave);
    document.addEventListener('mousedown', this.onDocMouseDown);
    document.addEventListener('keydown', this.onDocKeyDown);
    window.addEventListener('resize', this.updateThumb);
    window.addEventListener('resize', this.closeMenu);
    window.addEventListener('resize', this.closeGameMenu);
    // 필터 레이어 바깥을 누르면 닫는다 (레이어 · 버튼은 click.stop)
    this._onDocClick = function () { this.filterOpen = false; }.bind(this);
    document.addEventListener('click', this._onDocClick);
    // 보기 옵션 "패널 스켈레톤" — 켜져 있으면 들어올 때마다 처음부터 10개씩 불러온다
    var vm = this;
    var ps = protoSettingsRead();
    if (ps.libraryPanelSkeleton) { this._skeletonAt = ps.libraryPanelSkeletonAt; this.startSkeletonLoad(); }
    protoSettingsSubscribe(function (s) { vm.applySkeletonSetting(s); vm.menuBlur = s.containerBlur; });
    window.addEventListener('library-game-menu', this.onCardGameMenu);
    // 메뉴(그룹 · 게임)가 떠 있는 동안 바닥 화면 잠금 — 공통 룰 (contextMenuLock, gnb-component.js)
    this.$watch(function () { return !!(this.menu || this.gameMenu); }, function (v) { contextMenuLock('library', v); }, { flush: 'sync' });
    this.updateThumb();
  },
  unmounted: function () {
    clearTimeout(this._noticeTimer);
    clearInterval(this._skeletonTimer);
    document.removeEventListener('click', this._onDocClick);
    document.removeEventListener('mouseup', this._onRelease);
    document.removeEventListener('mousemove', this.onDocMouseMove);
    document.removeEventListener('mouseleave', this.onDocMouseLeave);
    document.removeEventListener('mousedown', this.onDocMouseDown);
    document.removeEventListener('keydown', this.onDocKeyDown);
    window.removeEventListener('resize', this.updateThumb);
    window.removeEventListener('resize', this.closeMenu);
    window.removeEventListener('resize', this.closeGameMenu);
    window.removeEventListener('library-game-menu', this.onCardGameMenu);
    contextMenuLock('library', false);
  },
  template:
    '<div class="library-panel" data-name="layout/library/pannel">' +
      // 헤더 — 고정
      '<div class="library-panel__title" data-name="title">' +
        '<i class="ic-v2-content-folder-open-fill" aria-hidden="true"></i>' +
        '<span class="library-panel__title-text stds-title8 fw-bold">' +
          '<span class="library-panel__title-name">나의 게임 그룹</span>' +
          '<span class="library-panel__title-count" :class="{ \'is-active\': groups.length }">{{ groups.length }}</span>' +
        '</span>' +
      '</div>' +
      // 버튼 그룹 — 그룹 만들기를 누르면 같은 자리(같은 높이)에서 입력칸으로 바뀐다 (Figma 2-1)
      '<div v-if="creating" class="library-panel__create-form" data-name="btn/create group">' +
        '<div class="library-panel__create-field">' +
          '<p class="library-panel__create-label stds-text4 fw-medium">그룹 이름을 입력해 주세요.</p>' +
          '<group-name-input confirm-label="만들기" :validate="validateNew" @submit="createGroup($event)" @cancel="creating = false"></group-name-input>' +
        '</div>' +
        '<ul class="library-panel__create-hints stds-cap2">' +
          '<li>라이브러리에 있는 게임을 원하는 방식으로 정리할 수 있어요.</li>' +
          '<li>그룹은 최대 ' + LIBRARY_GROUP_MAX + '개까지 만들 수 있어요.</li>' +
        '</ul>' +
      '</div>' +
      '<div v-else ref="actions" class="library-panel__actions" data-name="btn/create group">' +
        // 그룹 삭제 직후 — 버튼 그룹 위에 띄우는 토스트 (레이아웃은 그대로, 3초 뒤 사라진다)
        '<div v-if="deletedNotice" class="library-panel__notice stds-cap1 fw-medium" role="status" data-name="toast popup">그룹이 삭제되었습니다.</div>' +
        '<div v-if="addedNotice" class="library-panel__added" role="status" data-name="toast popup">' +
          '<p class="library-panel__added-title stds-cap1 fw-medium"><b>{{ addedNotice.count }}개 게임</b>을 다른 그룹에 추가했습니다.</p>' +
          '<span class="library-panel__added-group" data-name="group name"><i class="ic-v2-control-long-arrow-right-line" aria-hidden="true"></i><span>{{ addedNotice.title }}</span></span>' +
        '</div>' +
        '<button class="stds-button stds-button-secondary stds-button-sm library-panel__create" type="button" :disabled="!canCreate" @click="startCreate">' +
          '<i class="ic-v2-control-add-line" aria-hidden="true"></i>그룹 만들기' +
        '</button>' +
        // 필터 — 버튼 그룹 아래에 레이어(폭 240 = 버튼 그룹 폭), 열려 있는 동안 버튼은 선택 테두리
        '<button class="library-panel__icon-btn" :class="{ \'is-selected\': filterOpen }" type="button" aria-label="필터" :aria-expanded="String(filterOpen)" data-name="btn/icon" @click.stop="filterOpen = !filterOpen"><i class="ic-v2-community-filter-line"></i></button>' +
        '<button class="library-panel__icon-btn" :class="{ \'is-selected\': searchOpen }" type="button" aria-label="검색" :aria-expanded="String(searchOpen)" data-name="btn/icon" @click="toggleSearch"><i class="ic-v2-navigation-search-line"></i></button>' +
        '<library-filter-layer v-if="filterOpen" v-model="filter" width="24rem" group-sort :anchor="actionsEl" @close="filterOpen = false"></library-filter-layer>' +
      '</div>' +

      // 검색 입력칸 (Figma 10 검색 — input) — 버튼 그룹 아래 20, 밑줄 2 · 취소 | 확인
      '<div v-if="searchOpen && !creating" class="library-panel__search" data-name="input">' +
        '<label class="library-panel__search-field">' +
          '<input ref="searchInput" class="library-panel__search-input stds-cap1" type="text" placeholder="게임명 입력" ' +
            ':value="searchText" @input="onSearchInput" @keydown="onSearchKey" />' +
          '<button v-if="searchText" class="library-panel__search-clear" type="button" aria-label="지우기" @mousedown.prevent @click="clearSearchText"><i class="ic-v2-control-close-circle-fill"></i></button>' +
        '</label>' +
        '<div class="library-panel__search-btns" data-name="btn">' +
          '<button class="library-panel__text-btn stds-btn3 fw-medium" type="button" @click="closeSearch">취소</button>' +
          '<span class="library-panel__search-div" aria-hidden="true"></span>' +
          '<button class="library-panel__text-btn library-panel__text-btn--primary stds-btn3 fw-medium" type="button" :disabled="!canSubmitSearch" @click="submitSearch">확인</button>' +
        '</div>' +
      '</div>' +
      // 필터 검색 결과 (Figma 2-2-2 · 0922) — 개수 · 초기화 · 조건 칩. 검색 입력칸이 열려 있으면 그 아래 구분선 다음에
      '<template v-if="resultsActive && !creating">' +
        '<div v-if="searchOpen" class="library-panel__divider library-panel__divider--result" data-name="element/div"></div>' +
        '<div class="library-panel__result" :class="{ \'is-after-search\': searchOpen }" data-name="필터 검색 결과">' +
          '<div class="library-panel__result-head">' +
            '<p class="library-panel__result-title stds-cap1 fw-medium">필터 검색 결과<b class="library-panel__result-count" :class="{ \'is-zero\': !resultCount }">{{ resultCount }}</b></p>' +
            '<button class="library-filter__reset" type="button" @click="resetResults" data-name="btn_text"><i class="ic-v2-control-refresh-line" aria-hidden="true"></i>초기화</button>' +
          '</div>' +
          '<div class="library-panel__chips">' +
            '<button v-for="c in resultChips" :key="c.key" class="library-chip stds-btn3 fw-medium" type="button" :aria-label="c.label + \' 조건 지우기\'" @click="c.remove()" data-name="Chips">' +
              '<span class="library-chip__label">{{ c.label }}</span><i class="ic-v2-control-close-line" aria-hidden="true"></i>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</template>' +
      // 그룹 없음 — 고정 (스크롤 영역 밖). 보유게임이 없어도 그룹은 만들 수 있어 항상 이 안내를 둔다.
      // 그룹 만들기 입력 중에는 사라진다 (2-1 "버튼 하단 안내메세지 사라짐")
      // 필터 · 검색 결과를 보고 있을 때도 숨긴다 (사용자 11-05)
      '<div v-if="showEmptyHint" class="library-panel__empty" data-name="component/game_group/그룹없음">' +
        '<div class="library-panel__empty-box">' +
          '<i class="ic-v2-content-folder-add-fill" aria-hidden="true"></i>' +
          '<p class="stds-cap1 fw-medium">그룹으로 나만의 라이브러리를<br />만들어 보세요.</p>' +
        '</div>' +
      '</div>' +
      // 구분선 — 스크롤 영역의 윗변. 그룹이 있으면 버튼 그룹과 20 띄운다 (안내 박스가 없어서).
      // 검색 입력칸 · 결과 영역 아래에서는 16
      '<div v-if="showDivider" class="library-panel__divider-wrap" ' +
        ':class="{ \'has-gap\': groups.length && !creating && !searchOpen && !resultsActive, \'has-gap-sm\': (searchOpen || resultsActive) && !showEmptyHint }">' +
        '<div class="library-panel__divider" data-name="element/div"></div>' +
      '</div>' +

      // 스크롤 영역 — 구분선 아래부터
      '<div class="library-panel__body">' +
        '<div ref="scrollEl" class="library-panel__scroll" @scroll="onScroll">' +
          '<div ref="hoverIndicator" class="gnb-hover-indicator" aria-hidden="true"></div>' +

          // 결과 없음 (Figma 2-2-2 검색결과 없음 · 0907 문구 "결과가 없습니다.")
          '<div v-if="resultsActive && !showList && !creating" class="library-panel__no-result" data-name="component/game_group/list_group">' +
            '<i class="ic-v2-state-warning-circle-fill" aria-hidden="true"></i>' +
            '<div class="stds-text4">' +
              '<p class="library-panel__no-result-title fw-medium">결과가 없습니다.</p>' +
              '<p class="library-panel__no-result-desc">검색어의 단어 수를 줄이거나<br />필터 조건을 변경하세요.</p>' +
            '</div>' +
          '</div>' +
          '<div v-if="showList" class="library-panel__list" data-name="게임그룹">' +
            // 사용자가 만든 그룹
            '<section v-for="group in shownGroups" :key="group.id" class="game-group library-group" :data-group-id="group.id" ' +
              ':class="{ \'is-collapsed\': isCollapsed(group.id), \'is-empty\': !owned.length, \'is-renaming\': renamingId === group.id, \'is-add-target\': addTargetId === group.id }" data-name="component/game_group">' +
              // 이름 변경 중 — 타이틀(화살표 포함)만 입력칸으로 바뀐다. 아래 게임 추가 · 게임 목록은 그대로 (Figma ⑬)
              '<group-name-input v-if="renamingId === group.id" :initial="group.title" confirm-label="확인" ' +
                ':validate="validateRename" @submit="renameGroup" @cancel="renamingId = null"></group-name-input>' +
              '<template v-else>' +
                TITLE_TPL('group.id', 'group.title', 'group.gameIds.length', true) +
              '</template>' +
              // 게임 없는 그룹 — 게임 추가 버튼 (Figma ④ "게임이 추가되지 않은 그룹은 게임 추가 버튼이 바로 노출")
              // 게임 추가 중이면 선택 상태(타이틀만)라 이 버튼은 숨긴다 (3-3 "5월에 할 게임 0")
              '<button v-if="!group.gameIds.length && owned.length && addTargetId !== group.id" class="library-group__add-box stds-btn3 fw-medium" type="button" ' +
                ':disabled="renamingId === group.id" @click="startAdd(group.id)" data-name="component/game_group/btn_게임 추가">' +
                '<i class="ic-v2-control-add-circle-fill" aria-hidden="true"></i>게임 추가' +
              '</button>' +
              '<ul v-else-if="group.gameIds.length" class="game-group__list-group" data-name="component/game_group/list_group">' +
                ROW_TPL('groupGames(group)', 'group.id') +
              '</ul>' +
            '</section>' +

            // 그룹 없는 게임 — 보유게임이 있을 때만. 게임 추가 버튼은 없다 (④)
            '<section v-if="ungrouped.length" class="game-group library-group" :class="{ \'is-collapsed\': isCollapsed(\'ungrouped\') }" data-name="component/game_group">' +
              TITLE_TPL("'ungrouped'", "'그룹 없는 게임'", 'ungrouped.length', false) +
              '<ul class="game-group__list-group" data-name="component/game_group/list_group">' +
                ROW_TPL('ungrouped', "'ungrouped'") +
              '</ul>' +
            '</section>' +
          '</div>' +
        '</div>' +

        '<div ref="track" class="library-panel__scrollbar" :class="{ \'is-visible\': showScrollbar }" @wheel.prevent="$refs.scrollEl.scrollTop += $event.deltaY" aria-hidden="true">' +
          '<div class="gnb-scrollbar__thumb" :style="thumbStyle"></div>' +
        '</div>' +
        '<button class="library-panel__top" :class="{ \'is-visible\': showTopBtn }" type="button" aria-label="맨 위로" @click="scrollToTop" data-name="component/GNB/bottom">' +
          '<img class="gnb-top-btn__img gnb-top-btn__img--dark" src="assets/top-btn/TOP_dark.png" alt="" />' +
          '<img class="gnb-top-btn__img gnb-top-btn__img--light" src="assets/top-btn/TOP_light.png" alt="" />' +
        '</button>' +
      '</div>' +

      // 잘린 그룹명 전체 툴팁 · 타이틀 우측 버튼 툴팁 · 그룹 메뉴 — 화면 고정(스크롤 영역에 잘리지 않게)
      '<div v-if="titleTip" class="game-group__list-tooltip stds-cap2" ' +
        ':style="{ left: titleTip.left + \'px\', top: titleTip.top + \'px\', width: titleTip.width + \'px\' }">{{ titleTipText }}</div>' +
      '<div v-if="btnTip" ref="btnTipEl" class="library-panel__btn-tip" :class="{ \'is-measuring\': btnTip.measuring }" ' +
        ':style="{ left: btnTip.left + \'px\', top: btnTip.top + \'px\' }" data-name="Tooltip/iconbtn">' +
        '<span class="game-group__badge-tooltip-tail" :style="{ marginLeft: btnTip.tailLeft + \'px\' }"></span>' +
        '<span class="game-group__badge-tooltip-body stds-cap1 fw-medium">{{ btnTip.text }}</span>' +
      '</div>' +
      '<div v-if="menu" ref="menuEl" class="library-panel-menu" :class="{ \'is-measuring\': menu.measuring, \'is-blur\': menuBlur }" :data-theme="menuBlur ? \'dark\' : null" ' +
        ':style="{ left: menu.left + \'px\', top: menu.top + \'px\' }" role="menu" data-context-menu data-name="컨텍스트메뉴" @contextmenu.prevent>' +
        '<template v-for="(item, i) in menuItems" :key="i">' +
          '<div v-if="item.divider" class="library-panel-menu__div" aria-hidden="true"></div>' +
          '<button v-else class="library-panel-menu__item stds-btn3 fw-medium" type="button" role="menuitem" @click="onMenuAction(item.action)">{{ item.label }}</button>' +
        '</template>' +
      '</div>' +

      // 게임 우클릭 메뉴 — 패널: 앞면(1뎁스) · 뒷면(2뎁스)을 rotateY로 뒤집는다 (Figma 컨텍스트메뉴 플립 애니메이션 가이드)
      // 콘텐츠 영역(cascade): 뒤집지 않고 2뎁스를 1뎁스 옆에 띄운다
      '<div v-if="gameMenu" ref="gameMenuEl" class="game-menu" :class="{ \'is-measuring\': gameMenu.measuring, \'is-blur\': menuBlur }" :data-theme="menuBlur ? \'dark\' : null" ' +
        ':style="{ left: gameMenu.left + \'px\', top: gameMenu.top + \'px\' }" @contextmenu.prevent data-context-menu data-name="컨텍스트메뉴">' +
        '<div class="game-menu__flip" :class="{ \'is-flipped\': gameMenu.depth === 2 && !gameMenu.cascade }">' +
          // 앞면 — 1뎁스
          '<div class="game-menu__face game-menu__face--front" role="menu" :aria-hidden="gameMenu.depth === 2 && !gameMenu.cascade">' +
            '<button v-for="item in gameMenuItems" :key="item.label" class="game-menu__item stds-btn3 fw-medium" ' +
              ':class="{ \'has-sub\': item.sub, \'has-toggle\': item.toggle, \'is-open\': gameMenu.cascade && gameMenu.depth === 2 && gameMenu.back === item.sub }" ' +
              'type="button" role="menuitem" @click="onGameMenuItem(item, $event)" @mouseenter="onGameItemEnter($event, item)" data-name="menu">' +
              '<span class="game-menu__label">{{ item.label }}</span>' +
              '<span v-if="item.sub" class="game-menu__icon" aria-hidden="true"><i class="ic-v2-control-arrow-right-line"></i></span>' +
              '<span v-if="item.toggle" class="game-menu__toggle" :class="{ \'is-on\': gameToggles[gameMenu.gameId][item.toggle] }" ' +
                'role="switch" :aria-checked="String(gameToggles[gameMenu.gameId][item.toggle])" data-name="Toggle"></span>' +
            '</button>' +
          '</div>' +
          // 뒷면 — 2뎁스 (그룹에 추가 · 그룹에서 제거)
          '<div v-if="!gameMenu.cascade" class="game-menu__face game-menu__face--back" role="menu" :aria-hidden="gameMenu.depth === 1">' +
            '<button class="game-menu__head stds-btn3 fw-medium" type="button" @click="flipBack" data-name="menu">' +
              '<span class="game-menu__icon game-menu__back" aria-hidden="true"><i class="ic-v2-control-arrow-left-line"></i></span>' +
              '<span class="game-menu__label">{{ gameMenu.back === \'add\' ? (gameMenu.multi ? \'선택한 게임 그룹에 추가\' : \'그룹에 추가\') : \'그룹에서 제거\' }}</span>' +
            '</button>' +
            '<div class="game-menu__div" aria-hidden="true"></div>' +
            GAME_MENU_SUB_TPL +
          '</div>' +
        '</div>' +
        // 옆에 띄운 2뎁스 (cascade) — 머리(←)와 구분선 없이 내용만
        '<div v-if="gameMenu.cascade && gameMenu.depth === 2" ref="gameSubEl" class="game-menu__face game-menu__sub" role="menu" ' +
          ':class="{ \'is-measuring\': gameMenu.subMeasuring }" :style="{ left: gameMenu.subLeft + \'px\', top: gameMenu.subTop + \'px\' }" @mouseenter="cancelSubTimer">' +
          GAME_MENU_SUB_TPL +
        '</div>' +
      '</div>' +
      '<div v-if="menuTip && menuTip.kind === \'name\'" class="game-group__list-tooltip game-menu__name-tip stds-cap2" ' +
        ':style="{ left: menuTip.left + \'px\', top: menuTip.top + \'px\', width: menuTip.width + \'px\' }">{{ menuTip.text }}</div>' +
      '<div v-if="menuTip && menuTip.kind === \'remove\'" ref="menuTipEl" class="library-panel__btn-tip game-menu__remove-tip" ' +
        ':class="{ \'is-measuring\': menuTip.measuring }" :style="{ left: menuTip.left + \'px\', top: menuTip.top + \'px\' }" data-name="Tooltip/iconbtn">' +
        '<span class="game-group__badge-tooltip-tail" :style="{ marginLeft: menuTip.tailLeft + \'px\' }"></span>' +
        '<span class="game-group__badge-tooltip-body stds-cap1 fw-medium">{{ menuTip.text }}</span>' +
      '</div>' +
      '<create-group-dialog v-if="createDialog" :validate="validateNew" @submit="createFromDialog" @close="createDialog = null"></create-group-dialog>' +
    '</div>',
};

function mountLibraryPanel(selector) {
  return Vue.createApp(LibraryPanel).mount(selector);
}
