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

var GnbComponent = {
  data: function () {
    return {
      menuItems: GNB_MENU_ITEMS,
      gameGroups: GNB_GAME_GROUPS,
      selectedId: 'store',
      selectedGameId: null,
      hoveredGameId: null,
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
  },
  methods: {
    selectMenu: function (item) {
      this.selectedId = item.id;
    },
    selectGame: function (game) {
      this.selectedGameId = game.id;
    },
    // 이름이 말줄임(ellipsis) 처리된 경우에만 툴팁 노출 (Figma: "해당 리스트 마우스 호버 시 툴팁 노출")
    handleListMouseEnter: function (e, game) {
      var nameEl = e.currentTarget.querySelector('.game-group__list-name');
      if (nameEl && nameEl.scrollWidth > nameEl.clientWidth) {
        this.hoveredGameId = game.id;
      }
    },
    handleListMouseLeave: function () {
      this.hoveredGameId = null;
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

    var self = this;
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
        '<div>' +
          '<ul class="menu-group" data-name="component/GNB/menu_group">' +
            '<li v-for="item in menuItems" :key="item.id" class="menu-item" :class="{ \'is-selected\': selectedId === item.id }" @click="selectMenu(item)" :data-name="menuItemSymbol(item)">' +
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
              '<div v-if="hoveredGameId === game.id" class="game-group__list-tooltip stds-cap2" data-name="menu">{{ game.name }}</div>' +
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
