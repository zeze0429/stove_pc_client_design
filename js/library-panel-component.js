/**
 * 라이브러리 우측패널 — 나의 게임 그룹 (Figma 2026_웹전환 1131:5779 "라이브러리 > 우측패널")
 * -------------------------------------------------------------
 * 구조: 헤더(타이틀 · 버튼 그룹)는 고정, 그 아래(그룹 목록 · 구분선 · 그룹 없는 게임)만 스크롤.
 * 게임 목록 행은 사이드바와 같은 Figma 컴포넌트(component/game_group)라 css/gnb.css의
 * .game-group* 스타일 · 스프링 호버 인디케이터(createSpringBox) · 이름/뱃지 툴팁을 그대로 쓴다.
 *
 * 단계별 구현 — 1단계: 뼈대(헤더 · 버튼 · 빈 상태 · 그룹 없는 게임 · 스크롤 · TOP)
 * 2단계: 그룹 만들기(입력칸) · 그룹 타이틀(호버 버튼 · 툴팁) · 그룹 메뉴 · 이름 변경 · 삭제 · 모두 접기/펼치기
 * 게임 추가 · 그룹 화면 · 필터 · 검색 · 게임 우클릭 메뉴는 다음 단계에서 붙인다.
 *
 * 데이터: 보유게임은 js/library-component.js의 LIBRARY_OWNED(+ libraryGame)를 같이 쓴다.
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
    onInput: function () { this.error = ''; this.checkOverflow(); },
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
        '<input ref="input" v-model="text" class="group-name-input__control stds-cap1" :class="{ \'is-overflow\': overflow }" type="text" ' +
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

// 그룹 타이틀 (component/game_group/title) — 화살표 · 이름 · 개수 · 우측 버튼(호버 시).
// 사용자 그룹은 게임 추가 + 그룹 메뉴, 그룹 없는 게임은 그룹 메뉴만 (Figma ④)
function TITLE_TPL(idExpr, nameExpr, countExpr, withAdd) {
  return '<div class="game-group__title library-group__title" ' +
      ':class="{ \'is-hover\': hoveredTitleId === ' + idExpr + ', \'is-menu-open\': menu && menu.groupId === ' + idExpr + ' }" ' +
      '@mouseenter="onTitleEnter($event, ' + idExpr + ')" @mouseleave="onTitleLeave" ' +
      '@click="openGroupPage(' + idExpr + ')" @contextmenu.prevent="openMenu($event, ' + idExpr + ', false)" data-name="component/game_group/title">' +
    '<button class="game-group__btn-left-arrow" type="button" aria-label="펼치기/접기" @click.stop="toggleGroup(' + idExpr + ')" data-name="component/game_group/title/btn_left_arrow">' +
      '<i class="ic-v2-control-select-arrow-down-fill"></i>' +
    '</button>' +
    '<span class="game-group__title-inner">' +
      '<span class="game-group__name stds-title8 fw-medium">{{ ' + nameExpr + ' }}</span>' +
      '<span class="badge-menu-title" data-name="component/badge/menu_title">{{ ' + countExpr + ' }}</span>' +
    '</span>' +
    '<span class="library-group__btns" data-name="btn">' +
      (withAdd
        ? '<button class="library-group__btn" type="button" aria-label="게임 추가" @click.stop @mouseenter="showBtnTip($event, \'게임 추가\')" @mouseleave="hideBtnTip" data-name="component/game_group/title/btn">' +
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

// 게임 한 줄 (component/game_group/list) — 사이드바와 같은 컴포넌트
function ROW_TPL(listExpr) {
  return '<li v-for="game in ' + listExpr + '" :key="game.id" class="game-group__list" ' +
      '@mouseenter="onRowEnter($event, game)" @mouseleave="onRowLeave" ' +
      '@mousedown="$event.button === 0 && setPressed(true)" data-name="component/game_group/list">' +
    '<span class="game-group__thumbnail" :style="{ backgroundImage: \'url(\' + game.thumb + \')\' }" data-name="component/thumnail/game"></span>' +
    '<span class="game-group__list-name stds-cap1 fw-medium">{{ game.name }}</span>' +
    '<span v-if="game.badges && game.badges.length" class="game-group__badges">' +
      '<span v-for="b in game.badges" :key="b" class="badge-game-list" data-name="component/badge/game_list" ' +
        '@mouseenter="showBadgeTip($event, game, b)" @mouseleave="hideBadgeTip">' +
        '<img :src="badgeIcon[b]" alt="" />' +
      '</span>' +
    '</span>' +
    '<div v-if="hoveredGameId === game.id && !(badgeTip && badgeTip.gameId === game.id)" ' +
      'class="game-group__list-tooltip stds-cap2" :style="tooltipStyle">{{ game.name }}</div>' +
    '<div v-if="badgeTip && badgeTip.gameId === game.id" class="game-group__badge-tooltip" ' +
      ':class="{ \'is-measuring\': badgeTip.measuring }" ' +
      ':style="{ left: badgeTip.left + \'px\', top: badgeTip.top + \'px\' }" data-name="Tooltip/iconbtn">' +
      '<span class="game-group__badge-tooltip-tail" :style="{ marginLeft: badgeTip.tailLeft + \'px\' }"></span>' +
      '<span class="game-group__badge-tooltip-body stds-cap1 fw-medium">{{ badgeTip.text }}</span>' +
    '</div>' +
  '</li>';
}

var LibraryPanel = {
  components: { 'group-name-input': LibraryGroupNameInput },
  data: function () {
    return {
      owned: LIBRARY_OWNED.map(libraryGame),
      groups: [], // { id, title, gameIds: [] } — 새 그룹이 맨 위
      deletedNotice: false, // 그룹 삭제 직후 버튼 그룹 자리에 "그룹이 삭제되었습니다." (3초)
      collapsed: {}, // 그룹 id → 접힘 여부 ('ungrouped' = 그룹 없는 게임)
      creating: false, // 그룹 만들기 입력칸이 열려 있는지
      renamingId: null, // 이름 변경 중인 그룹 id
      hoveredTitleId: null, // 마우스가 올라간 그룹 타이틀 — 우측 버튼 노출
      titleTip: null, // 잘린 그룹명 전체 툴팁 { id, left, top, width }
      btnTip: null, // 타이틀 우측 버튼 툴팁 { text, left, top, tailLeft, measuring }
      menu: null, // 그룹 메뉴 { groupId, left, top, flip }
      hoveredGameId: null,
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
    // 그룹에 들어간 게임을 뺀 나머지 — 보유게임 순서 그대로
    ungrouped: function () {
      var inGroup = {};
      this.groups.forEach(function (g) { g.gameIds.forEach(function (id) { inGroup[id] = true; }); });
      return this.owned.filter(function (g) { return !inGroup[g.id]; });
    },
    tooltipStyle: function () {
      return { left: this.tooltipLeft + 'px', top: this.tooltipTop + 'px', width: this.tooltipWidth + 'px' };
    },
    thumbStyle: function () {
      return { height: this.thumbHeight + 'px', top: this.thumbTop + 'px' };
    },
    canCreate: function () { return this.groups.length < LIBRARY_GROUP_MAX; },
    titleTipText: function () {
      if (!this.titleTip) return '';
      if (this.titleTip.id === 'ungrouped') return '그룹 없는 게임';
      var g = this.groups.find(function (x) { return x.id === this.titleTip.id; }, this);
      return g ? g.title : '';
    },
    // 구분선 · 그룹 목록 — 그룹이나 그룹 없는 게임이 하나라도 있을 때.
    // 그룹 만들기 입력 중에는 구분선부터 아래 목록 전부 숨긴다 (Figma ③ "그룹 목록 미노출")
    showList: function () { return !this.creating && (this.groups.length > 0 || this.ungrouped.length > 0); },
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
  },
  methods: {
    isCollapsed: function (id) { return !!this.collapsed[id]; },
    groupGames: function (group) {
      var byId = {};
      this.owned.forEach(function (g) { byId[g.id] = g; });
      return group.gameIds.map(function (id) { return byId[id]; }).filter(Boolean);
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
    createGroup: function (name) {
      var id = 'g' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      this.groups.unshift({ id: id, title: name, gameIds: [] });
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
      this.groups = this.groups.filter(function (g) { return g.id !== id; });
      delete this.collapsed[id];
      this.deletedNotice = true;
      clearTimeout(this._noticeTimer);
      this._noticeTimer = setTimeout(function () { self.deletedNotice = false; }, 3000);
      this.$nextTick(this.updateThumb);
    },

    // ── 그룹 타이틀 호버 — 우측 버튼(게임 추가 · 그룹 메뉴) 노출, 잘린 그룹명은 툴팁 (Figma ④ · 3-1-1) ──
    onTitleEnter: function (e, id) {
      var title = e.currentTarget;
      this.hoveredTitleId = id;
      // 버튼이 나타나면 이름 칸이 줄어드니 다음 틱에 재서 잘렸을 때만 띄운다
      this.$nextTick(function () {
        if (this.hoveredTitleId !== id) return;
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
      if (this.menu) return;
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
    // 그룹 타이틀 클릭 = 그룹 화면으로 이동 (3단계)
    openGroupPage: function () {},

    // ── 그룹 메뉴 — ⋮ 버튼 클릭(버튼 오른쪽 끝에 맞춰 아래로) · 타이틀 우클릭(커서 위치) ──
    openMenu: function (e, groupId, fromButton) {
      var anchor;
      if (fromButton) {
        var r = e.currentTarget.getBoundingClientRect();
        anchor = { x: r.right, y: r.bottom + 4, alignRight: true, flipY: r.top - 4 };
      } else {
        anchor = { x: e.clientX, y: e.clientY, alignRight: false, flipY: e.clientY };
      }
      if (this.menu && this.menu.groupId === groupId && fromButton && this.menu.fromButton) {
        this.closeMenu();
        return;
      }
      this.btnTip = null;
      this.titleTip = null;
      this.menu = { groupId: groupId, fromButton: !!fromButton, left: anchor.x, top: anchor.y, measuring: true };
      this.$nextTick(function () {
        var el = this.$refs.menuEl;
        if (!el || !this.menu) return;
        var w = el.offsetWidth;
        var h = el.offsetHeight;
        var left = anchor.alignRight ? anchor.x - w : anchor.x;
        var top = anchor.y;
        if (top + h > window.innerHeight - 8) top = anchor.flipY - h; // 아래가 모자라면 위로
        left = Math.max(8, Math.min(left, window.innerWidth - w - 8));
        this.menu.left = left;
        this.menu.top = Math.max(8, top);
        this.menu.measuring = false;
      });
    },
    closeMenu: function () { this.menu = null; },
    onMenuAction: function (action) {
      var id = this.menu.groupId;
      this.closeMenu();
      if (action === 'toggle') this.toggleGroup(id);
      else if (action === 'rename') this.startRename(id);
      else if (action === 'delete') this.deleteGroup(id);
      else if (action === 'expandAll') this.setAllCollapsed(false);
      else if (action === 'collapseAll') this.setAllCollapsed(true);
      // 'view'(그룹 화면) · 'add'(게임 추가)는 3단계
    },
    onDocMouseDown: function (e) {
      if (!this.menu) return;
      if (this.$refs.menuEl && this.$refs.menuEl.contains(e.target)) return;
      if (e.target.closest && e.target.closest('[data-menu-btn]')) return; // ⋮ 버튼은 openMenu가 열고/닫는다
      this.closeMenu();
    },
    onDocKeyDown: function (e) {
      if (e.key === 'Escape' && this.menu) this.closeMenu();
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
    onRowEnter: function (e, game) {
      var li = e.currentTarget;
      clearTimeout(this._hoverLeaveTimer);
      this.moveHoverTo(li, this._hoverVisible ? undefined : 'instant');
      this._hoverSpring.show();
      this._hoverVisible = true;
      // 이름이 말줄임될 때만 전체 이름 툴팁 (Figma ⑥) — 이름 라벨 폭 그대로, 라벨 바닥 + 2
      var nameEl = li.querySelector('.game-group__list-name');
      if (nameEl && nameEl.scrollWidth > nameEl.clientWidth) {
        var nr = nameEl.getBoundingClientRect();
        this.hoveredGameId = game.id;
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
    showBadgeTip: function (e, game, badge) {
      var badgeEl = e.currentTarget;
      var li = badgeEl.closest('.game-group__list');
      var self = this;
      this.badgeTip = {
        gameId: game.id,
        text: GNB_BADGE_TOOLTIP[badge],
        left: 0,
        top: li.getBoundingClientRect().bottom - 4,
        tailLeft: 0,
        measuring: true,
      };
      this.$nextTick(function () {
        var tip = li.querySelector('.game-group__badge-tooltip');
        if (!tip || !self.badgeTip || self.badgeTip.gameId !== game.id) return;
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
    this.updateThumb();
  },
  unmounted: function () {
    clearTimeout(this._noticeTimer);
    document.removeEventListener('mouseup', this._onRelease);
    document.removeEventListener('mousemove', this.onDocMouseMove);
    document.removeEventListener('mouseleave', this.onDocMouseLeave);
    document.removeEventListener('mousedown', this.onDocMouseDown);
    document.removeEventListener('keydown', this.onDocKeyDown);
    window.removeEventListener('resize', this.updateThumb);
    window.removeEventListener('resize', this.closeMenu);
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
          '<group-name-input confirm-label="만들기" :validate="validateNew" @submit="createGroup" @cancel="creating = false"></group-name-input>' +
        '</div>' +
        '<ul class="library-panel__create-hints stds-cap2">' +
          '<li>라이브러리에 있는 게임을 원하는 방식으로 정리할 수 있어요.</li>' +
          '<li>그룹은 최대 ' + LIBRARY_GROUP_MAX + '개까지 만들 수 있어요.</li>' +
        '</ul>' +
      '</div>' +
      // 그룹 삭제 직후 — 버튼 그룹 자리에 안내 (3초 뒤 버튼으로 돌아온다)
      '<div v-else-if="deletedNotice" class="library-panel__notice stds-text4 fw-medium" role="status">그룹이 삭제되었습니다.</div>' +
      '<div v-else class="library-panel__actions" data-name="btn/create group">' +
        '<button class="library-panel__create stds-btn3 fw-medium" type="button" :disabled="!canCreate" @click="startCreate">' +
          '<i class="ic-v2-control-add-line" aria-hidden="true"></i>그룹 만들기' +
        '</button>' +
        '<button class="library-panel__icon-btn" type="button" aria-label="필터" data-name="btn/icon"><i class="ic-v2-community-filter-line"></i></button>' +
        '<button class="library-panel__icon-btn" type="button" aria-label="검색" data-name="btn/icon"><i class="ic-v2-navigation-search-line"></i></button>' +
      '</div>' +

      // 그룹 없음 — 고정 (스크롤 영역 밖). 보유게임이 없어도 그룹은 만들 수 있어 항상 이 안내를 둔다.
      // 그룹 만들기 입력 중에는 사라진다 (2-1 "버튼 하단 안내메세지 사라짐")
      '<div v-if="!groups.length && !creating" class="library-panel__empty" data-name="component/game_group/그룹없음">' +
        '<div class="library-panel__empty-box">' +
          '<i class="ic-v2-content-folder-add-fill" aria-hidden="true"></i>' +
          '<p class="stds-cap1 fw-medium">그룹으로 나만의 라이브러리를<br />만들어 보세요.</p>' +
        '</div>' +
      '</div>' +
      // 구분선 — 스크롤 영역의 윗변. 그룹이 있으면 버튼 그룹과 20 띄운다 (안내 박스가 없어서)
      '<div v-if="showList" class="library-panel__divider-wrap" ' +
        ':class="{ \'has-gap\': groups.length && !creating && !deletedNotice, \'has-notice-gap\': deletedNotice && groups.length && !creating }">' +
        '<div class="library-panel__divider" data-name="element/div"></div>' +
      '</div>' +

      // 스크롤 영역 — 구분선 아래부터
      '<div class="library-panel__body">' +
        '<div ref="scrollEl" class="library-panel__scroll" @scroll="onScroll">' +
          '<div ref="hoverIndicator" class="gnb-hover-indicator" aria-hidden="true"></div>' +

          '<div v-if="showList" class="library-panel__list" data-name="게임그룹">' +
            // 사용자가 만든 그룹
            '<section v-for="group in groups" :key="group.id" class="game-group library-group" :data-group-id="group.id" ' +
              ':class="{ \'is-collapsed\': isCollapsed(group.id), \'is-empty\': !owned.length }" data-name="component/game_group">' +
              // 이름 변경 중 — 타이틀이 입력칸으로 바뀌고 화살표 · 게임 목록은 숨는다 (Figma ⑬)
              '<group-name-input v-if="renamingId === group.id" :initial="group.title" confirm-label="확인" ' +
                ':validate="validateRename" @submit="renameGroup" @cancel="renamingId = null"></group-name-input>' +
              '<template v-else>' +
                TITLE_TPL('group.id', 'group.title', 'group.gameIds.length', true) +
                // 게임 없는 그룹 — 게임 추가 버튼 (Figma ④ "게임이 추가되지 않은 그룹은 게임 추가 버튼이 바로 노출")
                '<button v-if="!group.gameIds.length && owned.length" class="library-group__add-box stds-btn3 fw-medium" type="button" data-name="component/game_group/btn_게임 추가">' +
                  '<i class="ic-v2-control-add-circle-fill" aria-hidden="true"></i>게임 추가' +
                '</button>' +
                '<ul v-else-if="group.gameIds.length" class="game-group__list-group" data-name="component/game_group/list_group">' +
                  ROW_TPL('groupGames(group)') +
                '</ul>' +
              '</template>' +
            '</section>' +

            // 그룹 없는 게임 — 보유게임이 있을 때만. 게임 추가 버튼은 없다 (④)
            '<section v-if="ungrouped.length" class="game-group library-group" :class="{ \'is-collapsed\': isCollapsed(\'ungrouped\') }" data-name="component/game_group">' +
              TITLE_TPL("'ungrouped'", "'그룹 없는 게임'", 'ungrouped.length', false) +
              '<ul class="game-group__list-group" data-name="component/game_group/list_group">' +
                ROW_TPL('ungrouped') +
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
      '<div v-if="menu" ref="menuEl" class="library-panel-menu" :class="{ \'is-measuring\': menu.measuring }" ' +
        ':style="{ left: menu.left + \'px\', top: menu.top + \'px\' }" role="menu" data-name="컨텍스트메뉴" @contextmenu.prevent>' +
        '<template v-for="(item, i) in menuItems" :key="i">' +
          '<div v-if="item.divider" class="library-panel-menu__div" aria-hidden="true"></div>' +
          '<button v-else class="library-panel-menu__item stds-btn3 fw-medium" type="button" role="menuitem" @click="onMenuAction(item.action)">{{ item.label }}</button>' +
        '</template>' +
      '</div>' +
    '</div>',
};

function mountLibraryPanel(selector) {
  return Vue.createApp(LibraryPanel).mount(selector);
}
