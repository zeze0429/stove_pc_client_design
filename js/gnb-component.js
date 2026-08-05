/**
 * STOVE GNB — 공통 Vue 컴포넌트 (빌드 없이 CDN Vue로 동작)
 * -------------------------------------------------------------
 * app-shell.html, gnb.html이 이 파일 하나를 공유한다.
 * 구조(마크업)를 바꿀 일이 생기면 여기 template 한 곳만 고치면
 * 두 페이지 모두에 반영된다 — 예전처럼 두 파일에 각각 복제해서
 * 고치던 방식의 문제를 없애기 위한 목적.
 *
 * 색상 등 값은 css/gnb.css의 CSS Custom Property(토큰/지역 변수)만
 * 참조하고, 이 파일 안에는 색상을 직접 넣지 않는다.
 */

// ── 데이터 (실제로는 props/스토어/API로 주입) ────────────────
var GNB_MENU_ITEMS = [
  { id: 'store', label: '스토어', icon: 'ic-v2-navigation-home-fill' },
  { id: 'lounge', label: '라운지', icon: 'ic-v2-community-board-fill', badge: 'new' },
  { id: 'event', label: '이벤트', icon: 'ic-v2-navigation-community-event-fill' },
  { id: 'library', label: '라이브러리', icon: 'ic-v2-navigation-library-fill' },
  { id: 'download', label: '다운로드 관리', icon: 'ic-v2-object-download-line', symbol: 'component/GNB/menu/download_manage' },
  { id: 'studio', label: '스튜디오 테스트', icon: 'ic-v2-navigation-studio-test-fill' },
];

var GNB_GAME_GROUPS = [
  {
    id: 'stove-games',
    title: '스토브게임',
    count: 6,
    collapsed: false,
    games: [
      { id: 'lostark', name: 'LOST ARK', thumb: 'assets/game-lostark.png' },
      { id: 'rodnine', name: '로드나인', thumb: 'assets/game-rodnine.png', badges: ['link', 'multiplay'] },
      { id: 'chaos', name: '카오스 제로 나이트메어', thumb: 'assets/game-chaos.png' },
      { id: 'e7', name: '에픽세븐', thumb: 'assets/game-e7.png' },
      { id: 'bts', name: 'BTS 쿠킹온 스토브 : 타이니탄 레스토랑', thumb: 'assets/game-bts.png' },
      { id: 'tales', name: '테일즈런너', thumb: 'assets/game-tales.png' },
    ],
  },
  {
    id: 'favorites',
    title: '즐겨찾기',
    count: 23,
    collapsed: false,
    games: [
      { id: 'fav-floppy-knight', name: '플로피 나이트', thumb: 'assets/game-floppy-knight.png' },
      { id: 'fav-hwayeonwol', name: '화연월의', thumb: 'assets/game-hwayeonwol.png' },
      { id: 'fav-lostark', name: 'LOST ARK', thumb: 'assets/game-lostark.png' },
      { id: 'fav-rodnine', name: '로드나인', thumb: 'assets/game-rodnine.png', badges: ['link', 'multiplay'] },
      { id: 'fav-deluvian-winds', name: '딜루비안 윈즈', thumb: 'assets/game-deluvian-winds.png' },
      { id: 'fav-bus-world', name: '버스 월드', thumb: 'assets/game-bus-world.png' },
      { id: 'fav-happy-quest', name: '해피 퀘스트', thumb: 'assets/game-happy-quest.png' },
      { id: 'fav-atom-rpg', name: '아톰 RPG 트루도그라드 디럭스 컬렉션', thumb: 'assets/game-atom-rpg.png' },
      { id: 'fav-under-blue-horizon', name: 'Under the blue horizon - Aquarium', thumb: 'assets/game-under-blue-horizon.png' },
      { id: 'fav-chaos', name: '카오스 제로 나이트메어', thumb: 'assets/game-chaos.png' },
      { id: 'fav-illips', name: '일립스', thumb: 'assets/game-illips.png' },
      { id: 'fav-cabbage', name: '카베지', thumb: 'assets/game-cabbage.png' },
      { id: 'fav-scarf', name: '스카프', thumb: 'assets/game-scarf.png' },
      { id: 'fav-e7', name: '에픽세븐', thumb: 'assets/game-e7.png' },
      { id: 'fav-bts', name: 'BTS 쿠킹온 스토브 : 타이니탄 레스토랑', thumb: 'assets/game-bts.png' },
      { id: 'fav-fog-detective', name: '안개 탐정: 네온 바다의 이야기', thumb: 'assets/game-fog-detective.png' },
      { id: 'fav-bullet-delivery', name: '총알배달 우주반점: 프리퀄 단편소설 (STOVE 한정)', thumb: 'assets/game-bullet-delivery.png' },
      { id: 'fav-four-lights', name: '네개의 빛 : 제 1세계 [Iruka Route] 시크릿 플러스', thumb: 'assets/game-four-lights.png' },
      { id: 'fav-ghostrunner', name: '고스트러너', thumb: 'assets/game-ghostrunner.png' },
      { id: 'fav-undying', name: '언다잉', thumb: 'assets/game-undying.png' },
      { id: 'fav-suicide-countdown', name: 'Suicide Countdown: 7 Days', thumb: 'assets/game-suicide-countdown.png' },
      { id: 'fav-novena-diabolos', name: '노베나 디아볼로스', thumb: 'assets/game-novena-diabolos.png' },
      { id: 'fav-yoryeong-village', name: '요령 마을: 요령사의 길', thumb: 'assets/game-yoryeong-village.png' },
    ],
  },
];

var GNB_BADGE_ICON = {
  link: 'ic-v2-navigation-link-fill',
  multiplay: 'ic-v2-navigation-pcbang-fill',
};

// ── 호버/선택 인디케이터: 스프링 물리 (Figma Make 인터랙션 가이드 재현) ──
// 항목마다 배경을 넣는 대신, 인디케이터 엘리먼트 하나를 실제 항목 위치로
// 스프링 물리(stiffness/damping)로 이동시켜 "물 흐르듯" 슬라이딩하는 느낌을 낸다.
// (React/Framer Motion의 layoutId 공유 레이아웃 애니메이션과 동일한 개념을
// 프레임워크 없이 순수 JS로 재현한 것 — 매 프레임 위치를 스프링 방정식으로
// 적분해서 transform/width/height에 직접 반영)
var GNB_SPRING_STIFFNESS = 250;
var GNB_SPRING_DAMPING = 28;

function createSpringBox(el) {
  var x = 0, y = 0, w = 0, h = 0;
  var vx = 0, vy = 0, vw = 0, vh = 0;
  var tx = 0, ty = 0, tw = 0, th = 0;
  var raf = null;

  function apply() {
    el.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    el.style.width = w + 'px';
    el.style.height = h + 'px';
  }

  function step() {
    var dt = 1 / 60;
    var dx = tx - x, dy = ty - y, dw = tw - w, dh = th - h;
    vx += (GNB_SPRING_STIFFNESS * dx - GNB_SPRING_DAMPING * vx) * dt;
    vy += (GNB_SPRING_STIFFNESS * dy - GNB_SPRING_DAMPING * vy) * dt;
    vw += (GNB_SPRING_STIFFNESS * dw - GNB_SPRING_DAMPING * vw) * dt;
    vh += (GNB_SPRING_STIFFNESS * dh - GNB_SPRING_DAMPING * vh) * dt;
    x += vx * dt; y += vy * dt; w += vw * dt; h += vh * dt;
    apply();

    var settled = Math.abs(tx - x) < 0.5 && Math.abs(ty - y) < 0.5 &&
      Math.abs(tw - w) < 0.5 && Math.abs(th - h) < 0.5 &&
      Math.abs(vx) < 0.5 && Math.abs(vy) < 0.5 && Math.abs(vw) < 0.5 && Math.abs(vh) < 0.5;
    if (settled) {
      x = tx; y = ty; w = tw; h = th;
      vx = vy = vw = vh = 0;
      apply();
      raf = null;
    } else {
      raf = requestAnimationFrame(step);
    }
  }

  return {
    // rect: { left, top, width, height } — .gnb-menu 기준 좌표
    // immediate: true면 스프링 없이 즉시 그 위치로 점프 (최초 마운트 시 사용)
    setTarget: function (rect, immediate) {
      tx = rect.left; ty = rect.top; tw = rect.width; th = rect.height;
      if (immediate) {
        x = tx; y = ty; w = tw; h = th;
        vx = vy = vw = vh = 0;
        apply();
        if (raf) { cancelAnimationFrame(raf); raf = null; }
        return;
      }
      if (!raf) raf = requestAnimationFrame(step);
    },
    show: function () { el.style.opacity = '1'; },
    hide: function () { el.style.opacity = '0'; },
  };
}

var GnbComponent = {
  data: function () {
    return {
      menuItems: GNB_MENU_ITEMS,
      gameGroups: GNB_GAME_GROUPS,
      selectedId: 'store',
      selectedGameId: null,
      hoveredGameId: null,
      tooltipLeft: 0,
      tooltipTop: 0,
      tooltipWidth: 0,
      collapsedGroups: {},
      showScrollbar: false,
      showTopBtn: false,
      thumbHeight: 0,
      thumbTop: 0,
      badgeIcon: GNB_BADGE_ICON,
    };
  },
  computed: {
    thumbStyle: function () {
      return { height: this.thumbHeight + 'px', top: this.thumbTop + 'px' };
    },
    tooltipStyle: function () {
      // 좌/너비는 "리스트의 텍스트 길이"(이름 라벨의 실제 렌더링 폭)에 고정 —
      // Figma 스펙: 박스 너비는 항상 라벨 폭과 동일하고, 그 안에서 텍스트는
      // (word-break: break-all로) 한 줄을 최대한 채우고 넘치는 부분만 다음 줄로.
      // 위쪽은 항목(li) 바닥이 아니라 텍스트 라벨 자체의 바닥에서 2px 밑 —
      // 라벨이 li 안에서 세로 중앙 정렬돼 있어 li 바닥과 라벨 바닥이 다르기 때문에
      // top:100%(li 기준) 대신 라벨 기준으로 직접 계산해야 정확함.
      return { left: this.tooltipLeft + 'px', top: this.tooltipTop + 'px', width: this.tooltipWidth + 'px' };
    },
  },
  methods: {
    // 인디케이터(호버/선택 공용)를 targetEl 위치로 옮긴다. 좌표는 .gnb-menu
    // (스크롤 컨테이너) 기준으로 계산 — 그래야 인디케이터가 .gnb-menu의 자식으로
    // 스크롤과 함께 자연스럽게 움직인다. immediate=true면 스프링 없이 즉시 이동
    // (최초 마운트 시 "어디선가 날아오는" 느낌 없이 바로 그 자리에 있어야 하므로).
    moveIndicatorTo: function (spring, targetEl, immediate) {
      var container = this.$refs.scrollEl;
      if (!spring || !container || !targetEl) return;
      var cRect = container.getBoundingClientRect();
      var tRect = targetEl.getBoundingClientRect();
      spring.setTarget({
        left: tRect.left - cRect.left + container.scrollLeft,
        top: tRect.top - cRect.top + container.scrollTop,
        width: tRect.width,
        height: tRect.height,
      }, immediate);
    },
    // GNB 전체에서 선택 상태는 항상 하나만 — 메뉴를 고르면 게임 선택은 풀리고, 반대도 마찬가지
    // 클릭은 항상 그 항목을 호버한 상태에서 일어나므로, 액티브 인디케이터를
    // 스프링으로 이전 위치에서 슬라이딩시키지 않고(immediate=true) 클릭한 자리에
    // 바로 스냅시킴 — 그래야 호버 컬러가 사라지는 자리에 곧바로 선택 컬러가
    // 들어와서 자연스럽고, 스프링이 짧은 거리를 이동할 때 생기는 오버슈트(살짝
    // 튕기며 옆/아래 행에 잠깐 겹쳐 보이는 현상)도 아예 생기지 않는다.
    selectMenu: function (item) {
      this.selectedId = item.id;
      this.selectedGameId = null;
      this.hideHoverIndicator();
      this.moveActiveIndicator(true);
    },
    selectGame: function (game) {
      this.selectedGameId = game.id;
      this.selectedId = null;
      this.hideHoverIndicator();
      this.moveActiveIndicator(true);
    },
    // 클릭해서 선택되는 순간 마우스는 아직 그 항목 위에 있는 채라 호버
    // 인디케이터가 남아있는데, 선택 인디케이터가 같은 자리로 오면서 잠깐
    // 겹쳐 보이는 문제 방지 — 선택 시 호버 인디케이터를 바로 치움.
    hideHoverIndicator: function () {
      clearTimeout(this._hoverLeaveTimer);
      this._hoverSpring.hide();
    },
    // 선택 인디케이터를 현재 선택된 항목(.is-selected) 위치로 이동 — DOM이
    // 갱신된 다음 프레임에 위치를 읽어야 하므로 $nextTick으로 한 틱 미룸.
    moveActiveIndicator: function (immediate) {
      var self = this;
      this.$nextTick(function () {
        var container = self.$refs.scrollEl;
        var el = container && container.querySelector('.menu-item.is-selected, .game-group__list.is-selected');
        if (!el) { self._activeSpring && self._activeSpring.hide(); return; }
        self.moveIndicatorTo(self._activeSpring, el, immediate);
        self._activeSpring.show();
      });
    },
    // 호버 인디케이터 노출: mouseenter 시 대기 중이던 50ms 소멸 타이머를 취소하고
    // 즉시 새 위치로 스프링 이동 — 인접 항목 사이를 옮겨 다닐 때 깜빡이지 않고
    // 계속 슬라이딩하는 느낌을 유지하기 위함 (Figma Make 가이드의 50ms 디바운스).
    // 단, 이미 선택된(active) 항목 위에서는 호버 인디케이터를 띄우지 않음 —
    // 두 인디케이터 배경이 같은 자리에 겹쳐 그려져 색이 진해 보이는 문제 방지.
    handleHoverEnter: function (targetEl) {
      clearTimeout(this._hoverLeaveTimer);
      if (targetEl.classList.contains('is-selected')) {
        this._hoverSpring.hide();
        return;
      }
      this.moveIndicatorTo(this._hoverSpring, targetEl, false);
      this._hoverSpring.show();
    },
    handleHoverLeave: function () {
      var self = this;
      this._hoverLeaveTimer = setTimeout(function () {
        self._hoverSpring.hide();
      }, 50);
    },
    handleMenuMouseEnter: function (e) {
      this.handleHoverEnter(e.currentTarget);
    },
    // 이름이 말줄임(ellipsis) 처리된 경우에만 툴팁 노출 (Figma: "해당 리스트 마우스 호버 시 툴팁 노출")
    handleListMouseEnter: function (e, game) {
      var li = e.currentTarget;
      this.handleHoverEnter(li);
      var nameEl = li.querySelector('.game-group__list-name');
      if (nameEl && nameEl.scrollWidth > nameEl.clientWidth) {
        this.hoveredGameId = game.id;
        this.tooltipLeft = nameEl.offsetLeft;
        this.tooltipWidth = nameEl.offsetWidth;
        this.tooltipTop = nameEl.offsetTop + nameEl.offsetHeight + 2; // 텍스트 라벨 바닥 + 2px
      }
    },
    handleListMouseLeave: function () {
      this.hoveredGameId = null;
      this.handleHoverLeave();
    },
    // 대부분의 1뎁스 메뉴 항목은 "component/GNB/menu/basic" 심볼이지만
    // 다운로드 관리 항목만 Figma에서 별도 심볼("download_manage")을 씀
    menuItemSymbol: function (item) {
      return item.symbol || 'component/GNB/menu/basic';
    },
    // group.collapsed을 직접 mutate하는 대신 id로 관리 —
    // gameGroups가 모듈 스코프의 공유 배열(GNB_GAME_GROUPS)이라
    // 중첩 속성을 직접 바꾸면 프로덕션 빌드에서 리렌더가 누락되는
    // 경우가 있어(dev 빌드에서는 재현 안 됨) 이 방식으로 회피.
    isCollapsed: function (group) {
      return !!this.collapsedGroups[group.id];
    },
    toggleGroup: function (group) {
      this.collapsedGroups[group.id] = !this.collapsedGroups[group.id];
      this.$nextTick(this.updateThumb);
      // 접기/펼치기로 선택된 항목이 사라지거나 위치가 크게 바뀔 수 있어
      // 스프링 없이 즉시 재배치(또는 대상이 없으면 인디케이터 숨김)
      this.moveActiveIndicator(true);
    },
    updateThumb: function () {
      var scrollEl = this.$refs.scrollEl;
      var track = this.$refs.track;
      if (!scrollEl || !track) return;
      var contentHeight = scrollEl.scrollHeight;
      var visibleHeight = scrollEl.clientHeight;
      if (contentHeight <= visibleHeight) {
        track.style.display = 'none';
        return;
      }
      track.style.display = 'block';
      var trackHeight = track.clientHeight;
      var h = Math.max((visibleHeight / contentHeight) * trackHeight, 24);
      var maxTop = trackHeight - h;
      var ratio = scrollEl.scrollTop / (contentHeight - visibleHeight);
      this.thumbHeight = h;
      this.thumbTop = maxTop * ratio;
    },
    handleGnbScroll: function () {
      var scrollEl = this.$refs.scrollEl;
      if (!scrollEl) return;
      this.showTopBtn = scrollEl.scrollTop > 40;
      this.updateThumb();
    },
    scrollToTop: function () {
      var scrollEl = this.$refs.scrollEl;
      if (scrollEl) scrollEl.scrollTo({ top: 0, behavior: 'smooth' });
    },
    handleDocumentMouseMove: function (e) {
      var el = this.$refs.gnbEl;
      if (!el) return;
      var r = el.getBoundingClientRect();
      this.showScrollbar = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    },
    handleDocumentMouseLeave: function () {
      // 이 페이지가 iframe으로 삽입된 경우 커서가 iframe 밖으로 나가면
      // mousemove가 더 안 들어와 스크롤바가 마지막 상태에 멈추는 문제 방지
      this.showScrollbar = false;
    },
  },
  mounted: function () {
    var scrollEl = this.$refs.scrollEl;
    if (scrollEl) scrollEl.addEventListener('scroll', this.handleGnbScroll);
    document.addEventListener('mousemove', this.handleDocumentMouseMove);
    document.addEventListener('mouseleave', this.handleDocumentMouseLeave);
    window.addEventListener('resize', this.updateThumb);
    this.updateThumb();

    this._hoverSpring = createSpringBox(this.$refs.hoverIndicator);
    this._activeSpring = createSpringBox(this.$refs.activeIndicator);
    // 최초 진입 시엔 "어디선가 날아오는" 느낌 없이 바로 기본 선택 위치(스토어)에
    // 있어야 하므로 immediate=true로 스프링 없이 즉시 배치.
    this.moveActiveIndicator(true);
    var self = this;
    this._onIndicatorResize = function () { self.moveActiveIndicator(true); };
    window.addEventListener('resize', this._onIndicatorResize);

    this._resizeObserver = new MutationObserver(function () { self.updateThumb(); });
    if (scrollEl) {
      this._resizeObserver.observe(scrollEl, {
        childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style'],
      });
    }
  },
  unmounted: function () {
    var scrollEl = this.$refs.scrollEl;
    if (scrollEl) scrollEl.removeEventListener('scroll', this.handleGnbScroll);
    document.removeEventListener('mousemove', this.handleDocumentMouseMove);
    document.removeEventListener('mouseleave', this.handleDocumentMouseLeave);
    window.removeEventListener('resize', this.updateThumb);
    if (this._onIndicatorResize) window.removeEventListener('resize', this._onIndicatorResize);
    clearTimeout(this._hoverLeaveTimer);
    if (this._resizeObserver) this._resizeObserver.disconnect();
  },
  template:
    '<nav ref="gnbEl" class="gnb" aria-label="주요 메뉴" data-name="layout/GNB">' +
      '<header class="gnb-header" data-name="component/GNB/header">' +
        '<button class="gnb-logo" type="button" aria-label="스토어 홈" @click="selectMenu(menuItems[0])" data-name="img/logo/stove">' +
          '<img class="logo-dark" src="assets/logo/stove_dark.png" alt="STOVE" />' +
          '<img class="logo-light" src="assets/logo/stove_light.png" alt="STOVE" />' +
        '</button>' +
        '<button class="update-badge" type="button" aria-label="업데이트" data-name="img/badge/luncher_update">' +
          '<img class="update-badge__img update-badge__img--default" src="assets/update-btn/luncher_update_enabled.png" alt="" />' +
          '<img class="update-badge__img update-badge__img--active" src="assets/update-btn/luncher_update_hover_pressed.png" alt="" />' +
        '</button>' +
      '</header>' +

      '<div ref="scrollEl" class="gnb-menu">' +
        '<div ref="hoverIndicator" class="gnb-hover-indicator" aria-hidden="true"></div>' +
        '<div ref="activeIndicator" class="gnb-active-indicator" aria-hidden="true"></div>' +
        '<div>' +
          '<ul class="menu-group" data-name="component/GNB/menu_group">' +
            '<li v-for="item in menuItems" :key="item.id" class="menu-item" :class="{ \'is-selected\': selectedId === item.id }" @click="selectMenu(item)" @mouseenter="handleMenuMouseEnter" @mouseleave="handleHoverLeave" :data-name="menuItemSymbol(item)">' +
              '<i :class="item.icon"></i>' +
              '<span class="menu-item__label stds-title8">{{ item.label }}</span>' +
              '<span v-if="item.badge === \'new\'" class="badge-new" data-name="component/badge/menu_title">NEW</span>' +
            '</li>' +
          '</ul>' +
          '<a class="gnb-ad" style="margin-top: var(--spacing-12);" role="link" data-name="img/GNB/AD">' +
            '<img src="assets/ad-mystery.png" alt="미스테리 기획전 · 3월 26일 할인 종료!" />' +
          '</a>' +
        '</div>' +

        '<div class="gnb-divider" data-name="element/div"></div>' +

        '<section v-for="group in gameGroups" :key="group.id" class="game-group" :class="{ \'is-collapsed\': isCollapsed(group) }">' +
          '<div class="game-group__title" data-name="component/game_group/title">' +
            '<button class="game-group__btn-left-arrow" type="button" aria-label="펼치기/접기" @click="toggleGroup(group)" data-name="component/game_group/title/btn_left_arrow">' +
              '<i class="ic-v2-control-select-arrow-down-fill"></i>' +
            '</button>' +
            '<span class="game-group__title-inner">' +
              '<span class="game-group__name stds-title8 fw-medium">{{ group.title }}</span>' +
              '<span v-if="group.count" class="badge-menu-title" data-name="component/badge/menu_title">{{ group.count }}</span>' +
            '</span>' +
          '</div>' +
          '<ul class="game-group__list-group" data-name="component/game_group/list_group">' +
            '<li v-for="game in group.games" :key="game.id" class="game-group__list" :class="{ \'is-selected\': selectedGameId === game.id }" @click="selectGame(game)" @mouseenter="handleListMouseEnter($event, game)" @mouseleave="handleListMouseLeave" data-name="component/game_group/list">' +
              '<span class="game-group__thumbnail" :style="{ backgroundImage: \'url(\' + game.thumb + \')\' }" data-name="component/thumbnail/game"></span>' +
              '<span class="game-group__list-name stds-cap1 fw-medium">{{ game.name }}</span>' +
              '<span v-if="game.badges && game.badges.length" class="game-group__badges">' +
                '<span v-for="b in game.badges" :key="b" class="badge-game-list" :class="\'badge-game-list--\' + b" data-name="component/badge/game_list">' +
                  '<i :class="badgeIcon[b]"></i>' +
                '</span>' +
              '</span>' +
              '<div v-if="hoveredGameId === game.id" class="game-group__list-tooltip stds-cap2" :style="tooltipStyle" data-name="menu">{{ game.name }}</div>' +
            '</li>' +
          '</ul>' +
        '</section>' +
      '</div>' +

      '<div ref="track" class="gnb-scrollbar" :class="{ \'is-visible\': showScrollbar }" aria-hidden="true">' +
        '<div class="gnb-scrollbar__thumb" :style="thumbStyle"></div>' +
      '</div>' +

      '<button class="gnb-top-btn" :class="{ \'is-visible\': showTopBtn }" type="button" aria-label="맨 위로" @click="scrollToTop" data-name="component/GNB/bottom">' +
        '<img class="gnb-top-btn__img gnb-top-btn__img--dark" src="assets/top-btn/TOP_dark.png" alt="" />' +
        '<img class="gnb-top-btn__img gnb-top-btn__img--light" src="assets/top-btn/TOP_light.png" alt="" />' +
      '</button>' +
    '</nav>',
};

function mountGnb(selector) {
  return Vue.createApp(GnbComponent).mount(selector);
}
