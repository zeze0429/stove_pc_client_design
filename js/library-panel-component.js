/**
 * 라이브러리 우측패널 — 나의 게임 그룹 (Figma 2026_웹전환 1131:5779 "라이브러리 > 우측패널")
 * -------------------------------------------------------------
 * 구조: 헤더(타이틀 · 버튼 그룹)는 고정, 그 아래(그룹 목록 · 구분선 · 그룹 없는 게임)만 스크롤.
 * 게임 목록 행은 사이드바와 같은 Figma 컴포넌트(component/game_group)라 css/gnb.css의
 * .game-group* 스타일 · 스프링 호버 인디케이터(createSpringBox) · 이름/뱃지 툴팁을 그대로 쓴다.
 *
 * 단계별 구현 — 1단계: 뼈대(헤더 · 버튼 · 빈 상태 · 그룹 없는 게임 · 스크롤 · TOP)
 * 그룹 만들기 · 필터 · 검색 · 우클릭 메뉴 · 게임 추가는 다음 단계에서 붙인다.
 *
 * 데이터: 보유게임은 js/library-component.js의 LIBRARY_OWNED(+ libraryGame)를 같이 쓴다.
 */

// 그룹은 최대 20개 (Figma ③ "최대 20개까지 생성 가능")
var LIBRARY_GROUP_MAX = 20;

var LibraryPanel = {
  data: function () {
    return {
      owned: LIBRARY_OWNED.map(libraryGame),
      groups: [], // { id, title, gameIds: [] } — 2단계(그룹 만들기)부터 채운다
      collapsed: {}, // 그룹 id → 접힘 여부 ('ungrouped' = 그룹 없는 게임)
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
  },
  methods: {
    isCollapsed: function (id) { return !!this.collapsed[id]; },
    toggleGroup: function (id) {
      this.collapsed[id] = !this.collapsed[id];
      this.$nextTick(this.updateThumb);
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
      this.hoveredGameId = null; // 툴팁은 화면 고정 좌표라 스크롤하면 행과 어긋난다
      this.badgeTip = null;
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
    window.addEventListener('resize', this.updateThumb);
    this.updateThumb();
  },
  unmounted: function () {
    document.removeEventListener('mouseup', this._onRelease);
    document.removeEventListener('mousemove', this.onDocMouseMove);
    document.removeEventListener('mouseleave', this.onDocMouseLeave);
    window.removeEventListener('resize', this.updateThumb);
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
      '<div class="library-panel__actions" data-name="btn/create group">' +
        '<button class="library-panel__create stds-btn3 fw-medium" type="button" :disabled="groups.length >= ' + LIBRARY_GROUP_MAX + '">' +
          '<i class="ic-v2-control-add-line" aria-hidden="true"></i>그룹 만들기' +
        '</button>' +
        '<button class="library-panel__icon-btn" type="button" aria-label="필터" data-name="btn/icon"><i class="ic-v2-community-filter-line"></i></button>' +
        '<button class="library-panel__icon-btn" type="button" aria-label="검색" data-name="btn/icon"><i class="ic-v2-navigation-search-line"></i></button>' +
      '</div>' +

      // 스크롤 영역
      '<div class="library-panel__body">' +
        '<div ref="scrollEl" class="library-panel__scroll" @scroll="onScroll">' +
          '<div ref="hoverIndicator" class="gnb-hover-indicator" aria-hidden="true"></div>' +

          // 그룹 없음 — 보유게임이 없어도 그룹은 만들 수 있어 항상 이 안내를 둔다
          '<div v-if="!groups.length" class="library-panel__empty" data-name="component/game_group/그룹없음">' +
            '<div class="library-panel__empty-box">' +
              '<i class="ic-v2-content-folder-add-fill" aria-hidden="true"></i>' +
              '<p class="stds-cap1 fw-medium">그룹으로 나만의 라이브러리를<br />만들어 보세요.</p>' +
            '</div>' +
          '</div>' +

          // 그룹 없는 게임 — 보유게임이 있을 때만, 구분선 아래
          '<template v-if="ungrouped.length">' +
            '<div class="library-panel__divider" data-name="element/div"></div>' +
            '<div class="library-panel__list" data-name="list">' +
              '<section class="game-group" :class="{ \'is-collapsed\': isCollapsed(\'ungrouped\') }" data-name="component/game_group">' +
                '<div class="game-group__title" data-name="component/game_group/title">' +
                  '<button class="game-group__btn-left-arrow" type="button" aria-label="펼치기/접기" @click="toggleGroup(\'ungrouped\')" data-name="component/game_group/title/btn_left_arrow">' +
                    '<i class="ic-v2-control-select-arrow-down-fill"></i>' +
                  '</button>' +
                  '<span class="game-group__title-inner">' +
                    '<span class="game-group__name stds-title8 fw-medium">그룹 없는 게임</span>' +
                    '<span class="badge-menu-title" data-name="component/badge/menu_title">{{ ungrouped.length }}</span>' +
                  '</span>' +
                '</div>' +
                '<ul class="game-group__list-group" data-name="component/game_group/list_group">' +
                  '<li v-for="game in ungrouped" :key="game.id" class="game-group__list" ' +
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
                  '</li>' +
                '</ul>' +
              '</section>' +
            '</div>' +
          '</template>' +
        '</div>' +

        '<div ref="track" class="library-panel__scrollbar" :class="{ \'is-visible\': showScrollbar }" aria-hidden="true">' +
          '<div class="gnb-scrollbar__thumb" :style="thumbStyle"></div>' +
        '</div>' +
        '<button class="library-panel__top" :class="{ \'is-visible\': showTopBtn }" type="button" aria-label="맨 위로" @click="scrollToTop" data-name="component/GNB/bottom">' +
          '<img class="gnb-top-btn__img gnb-top-btn__img--dark" src="assets/top-btn/TOP_dark.png" alt="" />' +
          '<img class="gnb-top-btn__img gnb-top-btn__img--light" src="assets/top-btn/TOP_light.png" alt="" />' +
        '</button>' +
      '</div>' +
    '</div>',
};

function mountLibraryPanel(selector) {
  return Vue.createApp(LibraryPanel).mount(selector);
}
