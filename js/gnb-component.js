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
  { id: 'store', label: '스토어', icon: 'ic-v2-navigation-home-fill', pageUrl: 'app-shell.html' },
  { id: 'lounge', label: '라운지', icon: 'ic-v2-community-board-fill', badge: 'new', pageUrl: 'lounge.html' },
  { id: 'event', label: '이벤트', icon: 'ic-v2-navigation-community-event-fill', pageUrl: 'event.html' },
  { id: 'library', label: '라이브러리', icon: 'ic-v2-navigation-library-fill', pageUrl: 'library.html' },
  { id: 'download', label: '다운로드 관리', icon: 'ic-v2-object-download-line', symbol: 'component/GNB/menu/download_manage', pageUrl: 'download.html' },
  { id: 'studio', label: '스튜디오 테스트', icon: 'ic-v2-navigation-studio-test-fill', pageUrl: 'studio.html' },
];

// 현재 페이지 파일명으로 어떤 메뉴가 active 상태여야 하는지 추론 —
// 각 메뉴가 실제로 별도 HTML 문서(멀티 페이지)라서, 페이지가 열릴 때마다
// 사이드바가 자기 자신을 맞게 하이라이트하려면 이렇게 역으로 찾아야 함.
function gnbInferActiveMenuId() {
  var file = (location.pathname.split('/').pop() || 'app-shell.html');
  if (file === 'game-detail.html') return null; // 게임이 선택된 상태라 메뉴 쪽은 선택 없음
  for (var i = 0; i < GNB_MENU_ITEMS.length; i++) {
    if (GNB_MENU_ITEMS[i].pageUrl === file) return GNB_MENU_ITEMS[i].id;
  }
  return 'store';
}

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

// 뱃지에 마우스를 올리면 뜨는 툴팁 문구
var GNB_BADGE_TOOLTIP = {
  link: '링크 플레이 지원',
  multiplay: 'PC방에서 플레이하면 무료!',
};

// id로 게임 하나 찾기 — 스토브게임/즐겨찾기 그룹을 가리지 않고 전체에서 검색
// (게임 상세 페이지가 자기 id로 어떤 게임인지 알아내는 데 씀).
function gnbFindGameById(id) {
  for (var i = 0; i < GNB_GAME_GROUPS.length; i++) {
    var games = GNB_GAME_GROUPS[i].games;
    for (var j = 0; j < games.length; j++) {
      if (games[j].id === id) return games[j];
    }
  }
  return null;
}

// 현재 페이지가 게임 상세 페이지(game-detail.html?id=...)일 때 그 id를 반환.
function gnbCurrentGameIdFromUrl() {
  var file = (location.pathname.split('/').pop() || '');
  if (file !== 'game-detail.html') return null;
  return new URLSearchParams(location.search).get('id');
}

// ── 호버/선택 인디케이터: 스프링 물리 (Figma Make 인터랙션 가이드 재현) ──
// 항목마다 배경을 넣는 대신, 인디케이터 엘리먼트 하나를 실제 항목 위치로
// 스프링 물리(stiffness/damping)로 이동시켜 "물 흐르듯" 슬라이딩하는 느낌을 낸다.
// (React/Framer Motion의 layoutId 공유 레이아웃 애니메이션과 동일한 개념을
// 프레임워크 없이 순수 JS로 재현한 것 — 매 프레임 위치를 스프링 방정식으로
// 적분해서 transform/width/height에 직접 반영)
// 호버 중 탐색할 때는 살짝 탄성 있게 흐르듯 슬라이딩(언더댐핑, 약간의 오버슈트).
var GNB_SPRING_STIFFNESS = 250;
var GNB_SPRING_DAMPING = 28;
// 클릭으로 확정될 때는 "탁 붙는" 느낌이어야 함 — 0ms 즉시 이동(텔레포트)은
// 오히려 "인터랙션이 아예 안 먹은 것" 같은 끊긴 느낌을 줘서 안 됨. 그렇다고
// 호버와 같은 정도로 느리게 흐르면 손맛이 없음. 그래서 뻣뻣할 정도로 빠르고
// 오버슈트가 거의 없는(임계감쇠에 가까운) 별도의 "스냅" 스프링을 씀 —
// 아주 짧지만 분명히 존재하는 모션이라 "부드럽게 탁 붙는" 느낌이 남.
var GNB_SNAP_STIFFNESS = 600;
var GNB_SNAP_DAMPING = 49;

function createSpringBox(el) {
  var x = 0, y = 0, w = 0, h = 0;
  var vx = 0, vy = 0, vw = 0, vh = 0;
  var tx = 0, ty = 0, tw = 0, th = 0;
  var stiffness = GNB_SPRING_STIFFNESS, damping = GNB_SPRING_DAMPING;
  var raf = null;

  function apply() {
    el.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    el.style.width = w + 'px';
    el.style.height = h + 'px';
  }

  function step() {
    var dt = 1 / 60;
    var dx = tx - x, dy = ty - y, dw = tw - w, dh = th - h;
    vx += (stiffness * dx - damping * vx) * dt;
    vy += (stiffness * dy - damping * vy) * dt;
    vw += (stiffness * dw - damping * vw) * dt;
    vh += (stiffness * dh - damping * vh) * dt;
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
    // mode: 'instant'면 스프링 없이 즉시 점프(최초 마운트/리사이즈처럼 애니메이션이
    // 아예 없어야 하는 경우). 'snap'이면 빠르고 뻣뻣한 스냅 스프링(클릭 확정용).
    // 생략하면 기본 호버용 흐르는 스프링.
    setTarget: function (rect, mode) {
      tx = rect.left; ty = rect.top; tw = rect.width; th = rect.height;
      if (mode === 'instant') {
        x = tx; y = ty; w = tw; h = th;
        vx = vy = vw = vh = 0;
        apply();
        if (raf) { cancelAnimationFrame(raf); raf = null; }
        return;
      }
      stiffness = mode === 'snap' ? GNB_SNAP_STIFFNESS : GNB_SPRING_STIFFNESS;
      damping = mode === 'snap' ? GNB_SNAP_DAMPING : GNB_SPRING_DAMPING;
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
      selectedId: gnbInferActiveMenuId(),
      selectedGameId: gnbCurrentGameIdFromUrl(),
      hoveredGameId: null,
      // 뱃지 툴팁: { gameId, text, left, top, tailLeft, measuring }
      badgeTip: null,
      tooltipLeft: 0,
      tooltipTop: 0,
      tooltipWidth: 0,
      collapsedGroups: {},
      showScrollbar: false,
      showTopBtn: false,
      thumbHeight: 0,
      thumbTop: 0,
      badgeIcon: GNB_BADGE_ICON,
      // 우클릭 컨텍스트 메뉴 (Figma Make 레퍼런스: 스토브게임="즐겨찾기 추가", 즐겨찾기="즐겨찾기에서 제거")
      contextMenu: { visible: false, x: 0, y: 0, game: null, isFavorite: false },
      // 즐겨찾기 롱프레스 드래그 순서변경 중인 항목 (진행 중엔 is-dragging 클래스로 시각 피드백)
      dragging: null,
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
    // 스크롤과 함께 자연스럽게 움직인다. mode: 'instant'(스프링 없이 즉시 점프,
    // 최초 마운트/리사이즈용) | 'snap'(빠르고 뻣뻣한 스냅, 클릭 확정용) |
    // 생략(기본 호버용 흐르는 스프링).
    moveIndicatorTo: function (spring, targetEl, mode) {
      var container = this.$refs.scrollEl;
      if (!spring || !container || !targetEl) return;
      var cRect = container.getBoundingClientRect();
      var tRect = targetEl.getBoundingClientRect();
      spring.setTarget({
        left: tRect.left - cRect.left + container.scrollLeft,
        top: tRect.top - cRect.top + container.scrollTop,
        width: tRect.width,
        height: tRect.height,
      }, mode);
    },
    // GNB 전체에서 선택 상태는 항상 하나만 — 메뉴를 고르면 게임 선택은 풀리고, 반대도 마찬가지
    // 클릭은 항상 그 항목을 호버한 상태에서 일어나므로, 액티브 인디케이터를
    // 호버와 같은 느린 스프링으로 이전 위치에서 슬라이딩시키지 않고 빠른
    // "스냅" 스프링으로 확정 — 0ms 즉시 점프는 오히려 "인터랙션이 안 먹은"
    // 느낌이라 안 되고, 그렇다고 호버만큼 느긋하게 흐르면 손맛이 없어서
    // 빠르고 오버슈트 없는 별도 스프링을 씀(GNB_SNAP_STIFFNESS/DAMPING).
    selectMenu: function (item) {
      // 메뉴마다 실제 페이지(HTML 문서)가 따로 있으므로, 다른 메뉴를
      // 고르면 그 문서로 이동. 지금 보고 있는 페이지를 다시 누른
      // 경우에만 이동 없이 선택 상태만 갱신.
      if (item.pageUrl && gnbInferActiveMenuId() !== item.id) {
        location.href = item.pageUrl;
        return;
      }
      this.selectedId = item.id;
      this.selectedGameId = null;
      this.hideHoverIndicator();
      this.moveActiveIndicator('snap');
    },
    selectGame: function (game) {
      if (this._justDragged) { this._justDragged = false; return; }
      // 메뉴 항목처럼 게임도 각자 상세 페이지(game-detail.html?id=...)로
      // 이동 — 지금 보고 있는 바로 그 게임을 다시 누른 경우에만 이동 없이
      // 선택 상태만 갱신(같은 페이지 리로드 방지).
      if (gnbCurrentGameIdFromUrl() !== game.id) {
        location.href = 'game-detail.html?id=' + encodeURIComponent(game.id);
        return;
      }
      this.selectedGameId = game.id;
      this.selectedId = null;
      this.hideHoverIndicator();
      this.moveActiveIndicator('snap');
    },
    // 클릭해서 선택되는 순간 마우스는 아직 그 항목 위에 있는 채라 호버
    // 인디케이터가 남아있는데, 선택 인디케이터가 같은 자리로 오면서 잠깐
    // 겹쳐 보이는 문제 방지 — 선택 시 호버 인디케이터를 바로 치움.
    hideHoverIndicator: function () {
      clearTimeout(this._hoverLeaveTimer);
      this._hoverSpring.hide();
      // 이걸 안 하면: 클릭 직후 마우스가 (이제 선택된) 그 항목을 벗어나 다른
      // 항목으로 갈 때, "호버가 여전히 보이는 중"이라고 착각해서 스프링
      // 슬라이딩을 시도함 — 그런데 실제 위치는 방금 선택된 자리(active
      // 인디케이터와 같은 자리)에 멈춰있던 상태라, 거기서부터 슬라이딩을
      // 시작하는 첫 프레임에 또 겹쳐 보임.
      this._hoverVisible = false;
    },
    // 선택 인디케이터를 현재 선택된 항목(.is-selected) 위치로 이동 — DOM이
    // 갱신된 다음 프레임에 위치를 읽어야 하므로 $nextTick으로 한 틱 미룸.
    moveActiveIndicator: function (mode) {
      var self = this;
      this.$nextTick(function () {
        var container = self.$refs.scrollEl;
        var el = container && container.querySelector('.menu-item.is-selected, .game-group__list.is-selected');
        if (!el) { self._activeSpring && self._activeSpring.hide(); return; }
        self.moveIndicatorTo(self._activeSpring, el, mode);
        self._activeSpring.show();
      });
    },
    // 호버 인디케이터 노출: mouseenter 시 대기 중이던 50ms 소멸 타이머를 취소.
    // ※ 슬라이딩(스프링)은 "이미 보이는 상태에서 다른 항목으로 옮겨갈 때"만
    // 적용하고, "숨겨져 있다가 다시 나타날 때"는 슬라이딩 없이 그 자리에 바로
    // 나타나야 함(Figma 가이드의 "조건부 렌더링, entrance 애니메이션 없음"과
    // 동일한 원리) — 안 그러면 숨어있던 위치(예전 목표 자리, 혹은 선택된 항목
    // 자리)에서 잠깐 보였다가 슬라이딩해오는 것처럼 보여서, 그 자리에 있던
    // 다른 인디케이터(선택 등)와 한 프레임 겹쳐 보이는 버그가 생김.
    // 이미 선택된(active) 항목 위에서는 호버 인디케이터를 아예 띄우지 않음 —
    // 두 인디케이터 배경이 같은 자리에 겹쳐 그려져 색이 진해 보이는 문제 방지.
    handleHoverEnter: function (targetEl) {
      clearTimeout(this._hoverLeaveTimer);
      if (targetEl.classList.contains('is-selected')) {
        this._hoverSpring.hide();
        this._hoverVisible = false;
        return;
      }
      this.moveIndicatorTo(this._hoverSpring, targetEl, this._hoverVisible ? undefined : 'instant');
      this._hoverSpring.show();
      this._hoverVisible = true;
    },
    handleHoverLeave: function () {
      var self = this;
      this._hoverLeaveTimer = setTimeout(function () {
        self._hoverSpring.hide();
        self._hoverVisible = false;
      }, 50);
    },
    handleMenuMouseEnter: function (e) {
      this.handleHoverEnter(e.currentTarget);
    },
    // 이름이 말줄임(ellipsis) 처리된 경우에만 툴팁 노출 (Figma: "해당 리스트 마우스 호버 시 툴팁 노출")
    // 컨텍스트 메뉴가 떠 있는 동안은 호버 인디케이터/툴팁 전부 비활성 — 메뉴 버튼
    // 쪽으로 마우스가 이동하면서 지나치는 다른 행이 반응하면 안 됨.
    handleListMouseEnter: function (e, game) {
      if (this.contextMenu.visible || this.dragging) return;
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
      this.badgeTip = null;
      this.handleHoverLeave();
    },
    // 뱃지 툴팁은 뱃지 중앙에 맞추되 행 밖으로 나가면 행 끝에 붙인다.
    // 폭은 문구 길이(다국어 포함)에 따라 달라서, 일단 숨긴 채 그려 실제 폭을
    // 잰 다음 자리를 정한다.
    showBadgeTip: function (e, game, badge) {
      if (this.contextMenu.visible || this.dragging) return;
      var badgeEl = e.currentTarget;
      var li = badgeEl.closest('.game-group__list');
      var self = this;
      this.badgeTip = {
        gameId: game.id,
        text: GNB_BADGE_TOOLTIP[badge],
        left: 0,
        top: li.offsetHeight - 4, // 꼬리 4px가 행 안쪽, 몸통은 행 바닥부터
        tailLeft: 0,
        measuring: true,
      };
      this.$nextTick(function () {
        var tip = li.querySelector('.game-group__badge-tooltip');
        if (!tip || !self.badgeTip || self.badgeTip.gameId !== game.id) return;
        var liRect = li.getBoundingClientRect();
        var badgeRect = badgeEl.getBoundingClientRect();
        var center = badgeRect.left + badgeRect.width / 2 - liRect.left;
        var w = tip.offsetWidth;
        var left = Math.min(Math.max(center - w / 2, 0), li.offsetWidth - w);
        self.badgeTip.left = left;
        self.badgeTip.tailLeft = center - left - 3; // 꼬리 폭 6의 절반
        self.badgeTip.measuring = false;
      });
    },
    hideBadgeTip: function () {
      this.badgeTip = null;
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
      this.moveActiveIndicator('instant');
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
      // 탑 버튼은 "40px 스크롤되면"이 아니라, 상단 메뉴 6개(.menu-group)가
      // 완전히 가려지는 시점(그 바닥이 스크롤 영역 상단을 지나는 순간) 노출
      var menuGroupEl = scrollEl.querySelector('.menu-group');
      var threshold = menuGroupEl
        ? menuGroupEl.getBoundingClientRect().bottom - scrollEl.getBoundingClientRect().top + scrollEl.scrollTop
        : 40;
      this.showTopBtn = scrollEl.scrollTop >= threshold;
      this.updateThumb();
      // 컨텍스트 메뉴가 떠 있는 동안 스크롤하면 따라가지 않고 그냥 닫힘
      if (this.contextMenu.visible) this.closeContextMenu();
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

    // ── 우클릭 컨텍스트 메뉴 (Figma Make 레퍼런스 재현) ──────────
    openGameContextMenu: function (e, game, group) {
      this.contextMenu = { visible: true, x: e.clientX, y: e.clientY, game: game, isFavorite: group.id === 'favorites' };
      // 우클릭한 행 자신의 호버 인디케이터/툴팁도 치움 — is-context-open 배경과
      // 겹쳐서 진해 보이는 것 방지, 그리고 메뉴가 뜬 동안은 호버 표시 자체를 안 함
      clearTimeout(this._hoverLeaveTimer);
      this._hoverSpring.hide();
      this._hoverVisible = false;
      this.hoveredGameId = null;
      var self = this;
      this.$nextTick(function () {
        var menuEl = self.$refs.contextMenuEl;
        // 사이드바 "컨테이너" = nav 전체(240폭, 패딩 포함) 기준 — 좌우 여백
        // 16은 거기서부터 고정 (리스트 컨텐츠 영역 기준 아님).
        var containerEl = self.$refs.gnbEl;
        if (!menuEl || !containerEl) return;
        var margin = 16;
        var containerRect = containerEl.getBoundingClientRect();
        var menuRect = menuEl.getBoundingClientRect();
        var minX = containerRect.left + margin;
        var maxX = containerRect.right - margin - menuRect.width;
        self.contextMenu.x = Math.max(minX, Math.min(e.clientX, maxX));
      });
    },
    closeContextMenu: function () {
      this.contextMenu.visible = false;
    },
    contextMenuAction: function () {
      if (this.contextMenu.isFavorite) this.removeFromFavorites(this.contextMenu.game);
      else this.addToFavorites(this.contextMenu.game);
      this.closeContextMenu();
    },
    addToFavorites: function (game) {
      var favGroup = this.gameGroups.find(function (g) { return g.id === 'favorites'; });
      if (!favGroup) return;
      var favId = 'fav-' + game.id;
      if (favGroup.games.some(function (g) { return g.id === favId; })) return; // 이미 즐겨찾기에 있음
      favGroup.games.unshift({ id: favId, name: game.name, thumb: game.thumb, badges: game.badges });
      favGroup.count = favGroup.games.length;
    },
    removeFromFavorites: function (game) {
      var favGroup = this.gameGroups.find(function (g) { return g.id === 'favorites'; });
      if (!favGroup) return;
      favGroup.games = favGroup.games.filter(function (g) { return g.id !== game.id; });
      favGroup.count = favGroup.games.length;
    },

    // ── 즐겨찾기 롱프레스 드래그 순서변경 ────────────────────────
    // 일반 드래그(누르자마자 이동)는 순서변경을 발동하지 않음 — 실제
    // Figma Make 레퍼런스도 꾹 누르고 있어야만 드래그가 활성화됨.
    // 짧게 움직이면(클릭/스크롤 의도) 타이머를 취소해 오동작을 막는다.
    onFavoriteMouseDown: function (e, group, index) {
      if (group.id !== 'favorites' || e.button !== 0) return;
      var self = this;
      var startX = e.clientX, startY = e.clientY;
      var rowEl = e.currentTarget;
      clearTimeout(this._longPressTimer);

      function cleanup() {
        clearTimeout(self._longPressTimer);
        document.removeEventListener('mouseup', onEarlyUp);
        document.removeEventListener('mousemove', onEarlyMove);
      }
      function onEarlyUp() { cleanup(); }
      function onEarlyMove(ev) {
        if (Math.abs(ev.clientX - startX) > 6 || Math.abs(ev.clientY - startY) > 6) cleanup();
      }
      document.addEventListener('mouseup', onEarlyUp);
      document.addEventListener('mousemove', onEarlyMove);

      this._longPressTimer = setTimeout(function () {
        document.removeEventListener('mouseup', onEarlyUp);
        document.removeEventListener('mousemove', onEarlyMove);
        self.beginFavoriteDrag(group, index, rowEl, startX, startY);
      }, 450);
    },
    // 드래그 중엔 배열을 바로 바꾸지 않음 — 원래 자리엔 30% 투명도 +
    // 점선 테두리 "고스트"만 남기고(Figma: 기존 위치), 실제 항목은 커서를
    // 따라다니는 별도 플로팅 프리뷰(Figma: 타겟 컴포넌트)로 보여주다가
    // 마우스를 떼는 순간에만 한 번 splice해서 최종 순서를 확정한다.
    beginFavoriteDrag: function (group, index, rowEl, startX, startY) {
      var self = this;
      var rect = rowEl.getBoundingClientRect();
      this.dragging = {
        groupId: group.id,
        gameId: group.games[index].id,
        game: group.games[index],
        fromIndex: index,
        targetIndex: index,
        rawIndex: index,
        grabOffsetX: startX - rect.left,
        grabOffsetY: startY - rect.top,
        width: rect.width,
        height: rect.height,
        x: rect.left,
        y: rect.top,
        lineTop: 0,
        lineVisible: false,
        lastClientX: startX,
        lastClientY: startY,
      };
      // 순서변경 컴포넌트(고스트/프리뷰/라인)가 떠 있는 동안은 기존 항목의
      // 선택/호버/컨텍스트메뉴 상태값이 전부 비쳐 보이면 안 됨
      clearTimeout(this._hoverLeaveTimer);
      this._hoverSpring.hide();
      this._hoverVisible = false;
      this._activeSpring.hide();
      this.closeContextMenu();
      function onMove(ev) {
        self.dragging.lastClientX = ev.clientX;
        self.dragging.lastClientY = ev.clientY;
        self.handleFavoriteDragMove(ev, group);
      }
      function onUp() {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        cancelAnimationFrame(self._autoScrollRaf);
        var d = self.dragging;
        if (d && d.targetIndex !== d.fromIndex) {
          var moved = group.games.splice(d.fromIndex, 1)[0];
          group.games.splice(d.targetIndex, 0, moved);
        }
        self.dragging = null;
        self.moveActiveIndicator('instant');
        // mouseup 뒤에 브라우저가 같은 자리에서 click 이벤트를 한 번 더
        // 쏘는데, 전엔 selectGame이 로컬 선택 상태만 바꿔서 티가 안 났지만
        // 이제 selectGame이 실제 페이지 이동이라 드래그 직후 원치 않는
        // 상세 페이지 이동이 발생함 — 그 트레일링 click 한 번만 무시.
        self._justDragged = true;
      }
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
      // 드래그 중 리스트 스크롤 영역 위/아래 끝 근처에 머무르면 마우스가
      // 멈춰있어도 계속 자동 스크롤 — 커서 움직임 없이도 매 프레임 체크해야
      // 해서 mousemove가 아니라 rAF 루프로 돌림
      (function autoScrollTick() {
        if (!self.dragging) return;
        self.runFavoriteAutoScroll(group);
        self._autoScrollRaf = requestAnimationFrame(autoScrollTick);
      })();
    },
    runFavoriteAutoScroll: function (group) {
      var scrollEl = this.$refs.scrollEl;
      if (!scrollEl || !this.dragging) return;
      var rect = scrollEl.getBoundingClientRect();
      // 너무 빠르면 드롭 표시선이 행 사이를 한 프레임에 여러 칸씩 건너뛰면서
      // 잔상처럼 여러 개로 보이는 문제가 있어 속도를 전체적으로 낮춤
      var edge = 64, maxSpeed = 7;
      // 아래쪽 기준점은 스크롤 영역 바닥이 아니라 탑 버튼 상단 — 탑 버튼의
      // 80px 예약 영역 자체가 edge(64px)보다 넓어서, scrollEl 바닥 기준으로
      // 하면 트리거 구간이 통째로 "프리뷰가 더 못 내려가는" 클램프 구간과
      // 겹쳐버려 프리뷰가 바로 멈춰버리고 표시선만 계속 움직이는 문제가 있었음.
      var navEl = this.$refs.gnbEl;
      var topBtnEl = navEl && navEl.querySelector('.gnb-top-btn');
      var bottomBound = topBtnEl ? topBtnEl.getBoundingClientRect().top : rect.bottom;
      var y = this.dragging.lastClientY;
      var dir = 0, dist = 0;
      if (y < rect.top + edge) { dir = -1; dist = (rect.top + edge) - y; }
      else if (y > bottomBound - edge) { dir = 1; dist = y - (bottomBound - edge); }
      if (dir === 0) return;
      var speed = Math.min(maxSpeed, 1.5 + dist * 0.1);
      var prevTop = scrollEl.scrollTop;
      scrollEl.scrollTop += dir * speed;
      var delta = scrollEl.scrollTop - prevTop;
      if (delta !== 0) {
        this.handleFavoriteDragMove({ clientX: this.dragging.lastClientX, clientY: this.dragging.lastClientY }, group, delta);
      }
    },
    // scrollDelta가 있으면(자동 스크롤 중 호출) 커서 좌표 대신 "스크롤된
    // 만큼만" 프리뷰를 이동시켜 드롭 표시선(실제 행 위치 기준이라 스크롤과
    // 같은 속도로 움직임)과 정확히 같은 속도로 맞춤 — 커서 기준으로 다시
    // 계산하면 커서가 멈춰있는 동안 프리뷰도 멈춰 보여서 둘이 따로 노는
    // 것처럼 보이는 문제가 있었음.
    handleFavoriteDragMove: function (ev, group, scrollDelta) {
      if (!this.dragging) return;
      var groupIndex = this.gameGroups.indexOf(group);
      var listEl = this.$refs.listGroupEl && this.$refs.listGroupEl[groupIndex];
      if (!listEl) return;

      // 플로팅 프리뷰 / 드롭 표시선 공통 기준 — 사이드바 컨테이너(nav) 좌우
      // 최소 여백 16 (Figma: 컨텍스트메뉴와 동일한 규칙)
      var navEl = this.$refs.gnbEl;
      var margin = 16;
      var navRect = navEl ? navEl.getBoundingClientRect() : null;
      var listRect = listEl.getBoundingClientRect();
      var x = ev.clientX - this.dragging.grabOffsetX;
      var y = typeof scrollDelta === 'number'
        ? this.dragging.y + scrollDelta
        : ev.clientY - this.dragging.grabOffsetY;
      if (navRect) {
        var minX = navRect.left + margin;
        var maxX = navRect.right - margin - this.dragging.width;
        x = Math.max(minX, Math.min(x, maxX));
      }
      // 순서변경 컴포넌트가 이 그룹(즐겨찾기)의 리스트 영역 밖(제목 위/다음
      // 섹션 아래)으로 넘어가지 않게, 그리고 탑 버튼(.gnb-top-btn, 하단
      // 고정 오버레이) 영역도 침범하지 않게 세로로 클램프 — z-index로
      // 가리는 대신 애초에 그 자리에 못 들어가게 위치 자체를 막음
      var minY = listRect.top;
      var maxY = listRect.bottom - this.dragging.height;
      var topBtnEl = navEl && navEl.querySelector('.gnb-top-btn');
      if (topBtnEl) {
        var topBtnTop = topBtnEl.getBoundingClientRect().top;
        maxY = Math.min(maxY, topBtnTop - this.dragging.height);
      }
      y = Math.max(minY, Math.min(y, maxY));
      this.dragging.x = x;
      this.dragging.y = y;

      // 드롭 위치 계산 — (화면상 커서 위치가 아니라) 방금 클램프까지 끝낸
      // 프리뷰 자신의 세로 중심을 기준으로 어느 행의 중간선을 지났는지
      // 비교. 커서(ev.clientY) 기준으로 하면 프리뷰가 탑 버튼 클램프에
      // 걸려 멈춘 뒤에도 표시선만 계속 움직여서 둘이 따로 노는 것처럼
      // 보였음 — 프리뷰 기준으로 통일해서 항상 같은 속도로 움직이게 함.
      var refY = y + this.dragging.height / 2;
      var items = listEl.children;
      var rawIndex = items.length;
      for (var i = 0; i < items.length; i++) {
        var rect = items[i].getBoundingClientRect();
        if (refY < rect.top + rect.height / 2) { rawIndex = i; break; }
      }
      var fromIndex = this.dragging.fromIndex;
      this.dragging.rawIndex = rawIndex;
      this.dragging.targetIndex = rawIndex > fromIndex ? rawIndex - 1 : rawIndex;

      // 드롭 표시선(2px 흰 라인, position:fixed라 뷰포트 좌표 그대로 씀) —
      // rawIndex번째 행 바로 위(끝이면 마지막 행 아래). 좌우는 리스트
      // 컨텐츠 폭이 아니라 사이드바 컨테이너 기준 여백 16 (위 플로팅
      // 프리뷰와 동일한 규칙).
      var lineTop;
      if (rawIndex >= items.length) {
        var lastRect = items[items.length - 1].getBoundingClientRect();
        lineTop = lastRect.bottom + 1;
      } else {
        var targetRect = items[rawIndex].getBoundingClientRect();
        lineTop = targetRect.top - 1;
      }
      this.dragging.lineTop = lineTop;
      if (navRect) {
        this.dragging.lineLeft = navRect.left + margin;
        this.dragging.lineWidth = navRect.width - margin * 2;
      } else {
        this.dragging.lineLeft = listRect.left;
        this.dragging.lineWidth = listRect.width;
      }
      this.dragging.lineVisible = true;
    },
  },
  mounted: function () {
    var scrollEl = this.$refs.scrollEl;
    if (scrollEl) scrollEl.addEventListener('scroll', this.handleGnbScroll);
    document.addEventListener('mousemove', this.handleDocumentMouseMove);
    document.addEventListener('mouseleave', this.handleDocumentMouseLeave);
    document.addEventListener('click', this.closeContextMenu);
    window.addEventListener('resize', this.updateThumb);
    this.updateThumb();

    this._hoverSpring = createSpringBox(this.$refs.hoverIndicator);
    this._activeSpring = createSpringBox(this.$refs.activeIndicator);
    // 최초 진입 시엔 "어디선가 날아오는" 느낌 없이 바로 기본 선택 위치(스토어)에
    // 있어야 하므로 immediate=true로 스프링 없이 즉시 배치.
    this.moveActiveIndicator('instant');
    var self = this;
    this._onIndicatorResize = function () { self.moveActiveIndicator('instant'); };
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
    document.removeEventListener('click', this.closeContextMenu);
    window.removeEventListener('resize', this.updateThumb);
    if (this._onIndicatorResize) window.removeEventListener('resize', this._onIndicatorResize);
    clearTimeout(this._hoverLeaveTimer);
    clearTimeout(this._longPressTimer);
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
          '<ul ref="listGroupEl" class="game-group__list-group" data-name="component/game_group/list_group">' +
            '<li v-for="(game, gameIndex) in group.games" :key="game.id" class="game-group__list" ' +
              ':class="{ \'is-selected\': selectedGameId === game.id, \'is-dragging\': dragging && dragging.gameId === game.id, \'is-context-open\': contextMenu.visible && contextMenu.game && contextMenu.game.id === game.id }" ' +
              '@click="selectGame(game)" @mouseenter="handleListMouseEnter($event, game)" @mouseleave="handleListMouseLeave" ' +
              '@contextmenu.prevent="openGameContextMenu($event, game, group)" @mousedown="onFavoriteMouseDown($event, group, gameIndex)" ' +
              'data-name="component/game_group/list">' +
              '<span class="game-group__thumbnail" :style="{ backgroundImage: \'url(\' + game.thumb + \')\' }" data-name="component/thumbnail/game"></span>' +
              '<span class="game-group__list-name stds-cap1 fw-medium">{{ game.name }}</span>' +
              '<span v-if="game.badges && game.badges.length" class="game-group__badges">' +
                '<span v-for="b in game.badges" :key="b" class="badge-game-list" :class="\'badge-game-list--\' + b" data-name="component/badge/game_list" ' +
                  '@mouseenter="showBadgeTip($event, game, b)" @mouseleave="hideBadgeTip">' +
                  '<i :class="badgeIcon[b]"></i>' +
                '</span>' +
              '</span>' +
              // 뱃지 툴팁이 떠 있는 동안에는 게임명 툴팁을 감춘다 — 둘이 겹쳐 뜨면 안 된다
              '<div v-if="hoveredGameId === game.id && !(badgeTip && badgeTip.gameId === game.id)" ' +
                'class="game-group__list-tooltip stds-cap2" :style="tooltipStyle" data-name="menu">{{ game.name }}</div>' +
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

      '<div ref="track" class="gnb-scrollbar" :class="{ \'is-visible\': showScrollbar }" aria-hidden="true">' +
        '<div class="gnb-scrollbar__thumb" :style="thumbStyle"></div>' +
      '</div>' +

      '<button class="gnb-top-btn" :class="{ \'is-visible\': showTopBtn }" type="button" aria-label="맨 위로" @click="scrollToTop" data-name="component/GNB/bottom">' +
        '<img class="gnb-top-btn__img gnb-top-btn__img--dark" src="assets/top-btn/TOP_dark.png" alt="" />' +
        '<img class="gnb-top-btn__img gnb-top-btn__img--light" src="assets/top-btn/TOP_light.png" alt="" />' +
      '</button>' +

      '<div v-if="contextMenu.visible" ref="contextMenuEl" class="gnb-context-menu" :style="{ left: contextMenu.x + \'px\', top: contextMenu.y + \'px\' }" data-name="component/GNB/context_menu">' +
        '<button class="gnb-context-menu__item stds-cap1" type="button" @click="contextMenuAction">' +
          '{{ contextMenu.isFavorite ? \'즐겨찾기에서 제거\' : \'즐겨찾기 추가\' }}' +
        '</button>' +
      '</div>' +

      // 즐겨찾기 순서변경 드래그 중에만 노출 (Figma 4-4 GNB 즐겨찾기 순서 변경 스펙:
      // 드롭 위치 표시선 + 커서를 따라다니는 플로팅 프리뷰. 원래 자리는
      // .game-group__list.is-dragging(점선/30% 투명도)가 그대로 담당.
      '<div v-if="dragging && dragging.lineVisible" class="game-group__drop-line" ' +
        ':style="{ top: dragging.lineTop + \'px\', left: dragging.lineLeft + \'px\', width: dragging.lineWidth + \'px\' }" aria-hidden="true"></div>' +
      '<div v-if="dragging" class="game-group__drag-preview" ' +
        ':style="{ top: dragging.y + \'px\', left: dragging.x + \'px\', width: dragging.width + \'px\' }" aria-hidden="true">' +
        '<i class="ic-v2-navigation-menu-line game-group__drag-handle"></i>' +
        '<span class="game-group__thumbnail" :style="{ backgroundImage: \'url(\' + dragging.game.thumb + \')\' }"></span>' +
        '<span class="game-group__list-name stds-cap1 fw-medium">{{ dragging.game.name }}</span>' +
        '<span v-if="dragging.game.badges && dragging.game.badges.length" class="game-group__badges">' +
          '<span v-for="b in dragging.game.badges" :key="b" class="badge-game-list" :class="\'badge-game-list--\' + b">' +
            '<i :class="badgeIcon[b]"></i>' +
          '</span>' +
        '</span>' +
      '</div>' +
    '</nav>',
};

function mountGnb(selector) {
  return Vue.createApp(GnbComponent).mount(selector);
}
