/**
 * 이벤트 메인 (진행 중 이벤트) — Vue 3 CDN 컴포넌트
 * -------------------------------------------------------------
 * 실제 event.onstove.com/ko 를 실측해서 옮긴 것(2026-10-20). 예전엔 웹 캡처
 * 이미지 한 쌍이었는데, 직접 그리면서 다크/라이트가 토큰으로 바로 바뀐다.
 * 배너·썸네일·서비스 아이콘은 실제 웹에서 받아 온 고정 데이터(assets/event/).
 * 웹 GNB·푸터·중간 광고 배너·오른쪽 아래 플로팅 배너는 뺐다.
 * 스타일은 css/event.css.
 */
var EVENT_HERO_COUNT = 12;
var EVENT_HERO_DELAY = 3000; // 웹 swiper autoplay.delay
var EVENT_HERO_SPEED = 300;  // 웹 swiper speed
var EVENT_DOT_PITCH = 11;    // 점 6 + 간격 5
var EVENT_PAGE_SIZE = 12;    // 처음 12개, 더보기로 나머지

var EVENT_TABS = ['진행 중 이벤트', '종료된 이벤트'];
var EVENT_CHIPS = ['전체', '스토브', '스토어', '로드나인', '에픽세븐'];

// 서비스 아이콘 (assets/event/svc-*.png)
var EVENT_SERVICES = {
  '스토어': 'store',
  '스토브': 'stove',
  '로드나인': 'rodnine',
  '에픽세븐': 'e7',
};

// 카드 — 썸네일은 assets/event/thumb-XX.jpg (목록 순서 그대로)
var EVENT_CARDS = [
  { flake: true, date: '2026.10.18 ~ 10.21', title: '게임 리뷰 읽고,\n댓글 달면 플레이크 GET!', desc: '지금 바로 클릭해 읽어보세요!', service: '스토어' },
  { date: '2026.10.16 ~ 10.30', title: '다이너마이트 블루\n스토브 출시!', desc: '오늘도 평범한 하루,\n출시 기념 5% 결제 할인 쿠폰과 함께!', service: '스토어' },
  { date: '2026.10.16 ~ 10.31', title: "로드나인\n신규 서버 '하칸'", desc: 'RE:MAKE 서버 10/23(금) OPEN!', service: '로드나인' },
  { date: '2026.10.15 ~ 10.31', title: '럽플레이스 스토브 출시!', desc: '출시 기념 선착순 10% 결제 할인 쿠폰 제공!\n혜택 받고 나만의 스타일로 데뷔!', service: '스토어' },
  { flake: true, date: '2026.10.14 ~ 11.15', title: '용사단키우기\n스토브 TAP&PLAY 출시', desc: '출석하고 플레이크 받자!', service: '스토어' },
  { flake: true, date: '2026.10.14 ~ 11.15', title: '수박 만들기\n스토브 TAP&PLAY 출시', desc: '출석하고 플레이크 받자!', service: '스토어' },
  { date: '2026.10.14 ~ 10.27', title: '스토브페이로 결제하면\n5% 포인트 적립!', desc: '놓치면 안되는 5% 적립 기회~ 지금 확인!', service: '스토브' },
  { date: '2026.10.13 ~ 10.26', title: '어이쿠! 왕자님\n지금 만나보세요!', desc: '귀여운 제목만 보고 들어왔다면...\n어이쿠! 마음의 준비부터.', service: '스토어' },
  { date: '2026.10.06 ~ 10.20', title: '신작 수집형 RPG\n라스트 소녀 전사 출시', desc: '지휘관님, 출시 기념 5% 결제 할인 쿠폰 드려요', service: '스토어' },
  { flake: true, date: '2026.10.01 ~ 10.31', title: '마작일번가 10월 출석 상점', desc: '출석만 해도 플레이크와 게임 아이템이 우르르!', service: '스토어' },
  { flake: true, date: '2026.10.01 ~ 10.31', title: '단풍이 물드는 10월, 미션도 알차게!', desc: '참여할수록 플레이크가 쌓여요🧡', service: '스토브' },
  { flake: true, date: '2026.10.01 ~ 10.31', title: '캡슐뽑고 랜덤 선물을 만나보세요 🎉', desc: '닌텐도 스위치2의 주인공이 되어보세요!', service: '스토브' },
  { date: '2026.10.01 ~ 10.31', title: '스토어 온라인 게임 결제 리워드 대축제', desc: '선착순 할인 쿠폰과 첫 결제 혜택!\n그리고 네이버페이 상품권까지!', service: '스토어' },
  { flake: true, date: '2026.10.01 ~ 10.31', title: '스토어 10월 출석 교환 상점', desc: '매일매일 다양한 혜택이 팡팡!', service: '스토어' },
  { date: '2026.10.01 ~ 10.31', title: '마작일번가 10월 스토어 이벤트', desc: '누적 결제, 첫 결제, 신규/복귀 혜택 총출동!\n작탁을 접수하라!', service: '스토어' },
  { date: '2026.10.01 ~ 10.31', title: '2026년 10월 신작 모아보기', desc: '따끈따끈한 10월 신작을 만나 보세요.\n출시 게임부터 출시 할인까지 한눈에👀', service: '스토어' },
  { flake: true, date: '2026.09.29 ~ 10.31', title: '내 일상과 드립이 돈이 되는 순간!', desc: '1등 인기글에 매일 100만원을 드려요.\n인기글을 뽑기만 해도 최대 10만원의 행운이!', service: '스토브' },
  { date: '2026.09.18 ~ 10.28', title: '에픽세븐 X 카오스 제로 나이트메어', desc: '출석만 해도 ★5 월광 영웅 레노아 지급!', service: '에픽세븐' },
  { date: '2026.08.28 ~ 10.28', title: '에픽세븐 8주년!', desc: '계승자님을 위한 축제', service: '에픽세븐' },
  // 상시 이벤트 — 기간 칩이 없다
  { title: 'DEMO 게임 끝내면 생기는 일', desc: '장르별 10% 할인 쿠폰이 팝업으로 뚝딱!', service: '스토어', status: '상시' },
  { flake: true, title: '매주 새로운 게임 이야기!', desc: '라운지에서 나누고\n플레이크 받아요', service: '스토브', status: '상시' },
  { title: '출시 예정 라인업!! 많관부!!!', desc: '매주 출시되는 신작!\n스토브 스토어 출시 예정작 라인업!!', service: '스토어', status: '상시' },
].map(function (c, i) {
  c.thumb = 'assets/event/thumb-' + (i < 10 ? '0' : '') + i + '.jpg';
  c.icon = 'assets/event/svc-' + EVENT_SERVICES[c.service] + '.png';
  c.status = c.status || '진행 중';
  return c;
});

var EventMain = {
  data: function () {
    return {
      heroes: Array.from({ length: EVENT_HERO_COUNT }, function (_, i) {
        return 'assets/event/hero-' + (i < 10 ? '0' : '') + i + '.jpg';
      }),
      // 무한 반복: 배너 목록을 세 벌 이어 붙이고 가운데 벌에서 시작한다
      pos: EVENT_HERO_COUNT,
      animate: true,
      dragX: 0,
      dragging: false,
      tabs: EVENT_TABS,
      selectedTab: 0,
      chips: EVENT_CHIPS,
      selectedChip: '전체',
      expanded: false,
    };
  },
  computed: {
    loopHeroes: function () { return this.heroes.concat(this.heroes, this.heroes); },
    current: function () {
      var n = this.heroes.length;
      return ((this.pos % n) + n) % n;
    },
    trackStyle: function () {
      // 트랙 폭 = 보이는 영역 폭(슬라이드 1장)이라 translate %가 슬라이드 단위가 된다
      return {
        transform: 'translateX(calc(' + (-this.pos * 100) + '% + ' + this.dragX + 'px))',
        transition: this.animate && !this.dragging ? 'transform ' + EVENT_HERO_SPEED + 'ms ease' : 'none',
      };
    },
    // 점 5개만 보이는 창(50) — 현재 점이 가운데(세 번째) 오게 밀고, 양 끝에선 멈춘다
    dotsStyle: function () {
      var maxShift = this.heroes.length - 5;
      var shift = Math.min(Math.max(this.current - 2, 0), maxShift);
      return { transform: 'translateX(' + (-shift * EVENT_DOT_PITCH) + 'px)' };
    },
    filtered: function () {
      var chip = this.selectedChip;
      return chip === '전체' ? EVENT_CARDS : EVENT_CARDS.filter(function (c) { return c.service === chip; });
    },
    visibleCards: function () {
      return this.expanded ? this.filtered : this.filtered.slice(0, EVENT_PAGE_SIZE);
    },
    hasMore: function () { return !this.expanded && this.filtered.length > EVENT_PAGE_SIZE; },
  },
  mounted: function () { this.startAutoplay(); },
  beforeUnmount: function () { this.stopAutoplay(); },
  methods: {
    // 현재에서 1칸 떨어진 점 0.84, 2칸 이상 0.67 (웹 그대로)
    dotScale: function (i) {
      var d = Math.abs(i - this.current);
      return d === 0 ? 1 : d === 1 ? 0.84 : 0.67;
    },
    go: function (delta) {
      var n = this.heroes.length;
      var self = this;
      this.restartAutoplay();
      // 가운데 벌을 벗어나 있으면(백그라운드 탭에서 전환 끝 보정을 못 받은 경우)
      // 먼저 애니메이션 없이 가운데로 옮기고 넘긴다
      if (this.pos < n || this.pos >= n * 2) {
        this.animate = false;
        this.pos = n + this.current;
        this.$nextTick(function () {
          void self.$el.offsetWidth;
          self.animate = true;
          self.pos += delta;
        });
        return;
      }
      this.animate = true;
      this.pos += delta;
    },
    goTo: function (i) { this.go(i - this.current); },
    onTrackTransitionEnd: function () {
      var n = this.heroes.length;
      if (this.pos < n || this.pos >= n * 2) {
        this.animate = false;
        this.pos = n + this.current;
        var self = this;
        requestAnimationFrame(function () { requestAnimationFrame(function () { self.animate = true; }); });
      }
    },
    startAutoplay: function () {
      var self = this;
      this.stopAutoplay();
      this.timer = setInterval(function () { self.go(1); }, EVENT_HERO_DELAY);
    },
    stopAutoplay: function () { clearInterval(this.timer); },
    restartAutoplay: function () { this.startAutoplay(); },
    // 끌어서 넘기기 — 폭의 1/6 이상 끌면 넘어간다
    onPointerDown: function (e) {
      if (e.button !== 0) return;
      this.dragging = true;
      this.dragStart = e.clientX;
      this.dragX = 0;
      this.stopAutoplay();
      var self = this;
      var width = this.$refs.hero.offsetWidth;
      this.onPointerMove = function (ev) { self.dragX = ev.clientX - self.dragStart; };
      this.onPointerUp = function () {
        document.removeEventListener('pointermove', self.onPointerMove);
        document.removeEventListener('pointerup', self.onPointerUp);
        var dx = self.dragX;
        self.dragging = false;
        self.dragX = 0;
        if (Math.abs(dx) > width / 6) self.go(dx < 0 ? 1 : -1);
        else self.restartAutoplay();
      };
      document.addEventListener('pointermove', this.onPointerMove);
      document.addEventListener('pointerup', this.onPointerUp);
    },
    selectChip: function (chip) {
      this.selectedChip = chip;
      this.expanded = false;
    },
  },
  template:
    '<div class="event-hub">' +

      // ---- 메인 배너 ----
      '<section class="event-hero" aria-label="이벤트 배너">' +
        '<div class="event-hero__viewport" ref="hero">' +
          '<div class="event-hero__track" :style="trackStyle" @transitionend.self="onTrackTransitionEnd" @pointerdown="onPointerDown">' +
            '<div v-for="(src, i) in loopHeroes" :key="i" class="event-hero__slide">' +
              '<img :src="src" alt="" draggable="false" />' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="event-hero__indicator">' +
          '<button class="event-hero__arrow" type="button" aria-label="이전 배너" @click="go(-1)"><i class="ic-v2-control-arrow-left-line"></i></button>' +
          '<div class="event-hero__dots-window">' +
            '<div class="event-hero__dots" :style="dotsStyle">' +
              '<button v-for="(src, i) in heroes" :key="i" type="button" class="event-hero__dot"' +
                ' :class="{ \'is-active\': i === current }" :style="{ transform: \'scale(\' + dotScale(i) + \')\' }"' +
                ' :aria-label="(i + 1) + \'번째 배너\'" @click="goTo(i)"></button>' +
            '</div>' +
          '</div>' +
          '<button class="event-hero__arrow" type="button" aria-label="다음 배너" @click="go(1)"><i class="ic-v2-control-arrow-right-line"></i></button>' +
        '</div>' +
      '</section>' +

      // ---- 진행 중 / 종료된 이벤트 ----
      '<div class="event-tabs" role="tablist">' +
        '<button v-for="(tab, i) in tabs" :key="tab" type="button" role="tab" class="event-tabs__tab"' +
          ' :class="{ \'is-selected\': i === selectedTab }" :aria-selected="i === selectedTab" @click="selectedTab = i">{{ tab }}</button>' +
      '</div>' +

      // ---- 서비스 필터 칩 ----
      '<div class="event-chips">' +
        '<button v-for="chip in chips" :key="chip" type="button" class="event-chip"' +
          ' :class="{ \'is-selected\': chip === selectedChip }" @click="selectChip(chip)">{{ chip }}</button>' +
      '</div>' +

      // ---- 총 n개 · 정렬 ----
      '<div class="event-list-head">' +
        '<span class="event-list-head__count">총 {{ filtered.length }}개</span>' +
        '<button class="event-list-head__sort" type="button">' +
          '<span>최근 시작일 순</span><i class="ic-v2-control-select-arrow-down-fill" aria-hidden="true"></i>' +
        '</button>' +
      '</div>' +

      // ---- 카드 목록 (4열) ----
      '<ul class="event-grid">' +
        '<li v-for="card in visibleCards" :key="card.thumb" class="event-card">' +
          '<div class="event-card__thumb">' +
            '<img :src="card.thumb" alt="" loading="lazy" />' +
            '<span v-if="card.flake" class="event-card__flake">' +
              '<img src="assets/event/flake-badge.svg" alt="" />플레이크' +
            '</span>' +
          '</div>' +
          '<div class="event-card__body">' +
            '<span v-if="card.date" class="event-card__date">{{ card.date }}</span>' +
            '<p class="event-card__title">{{ card.title }}</p>' +
            '<p class="event-card__desc">{{ card.desc }}</p>' +
          '</div>' +
          '<div class="event-card__foot">' +
            '<span class="event-card__service">' +
              '<img :src="card.icon" alt="" loading="lazy" />' +
              '<span>{{ card.service }}</span>' +
            '</span>' +
            '<span class="event-card__status">{{ card.status }}</span>' +
          '</div>' +
        '</li>' +
      '</ul>' +

      '<button v-if="hasMore" class="event-more" type="button" @click="expanded = true">더보기</button>' +
    '</div>',
};

function mountEventMain(selector) {
  return Vue.createApp(EventMain).mount(selector);
}
