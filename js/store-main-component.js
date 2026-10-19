/**
 * 스토어 메인 상단 — 카테고리 네비게이션 바 + 메인 배너 캐러셀 (Vue 3 CDN)
 * -------------------------------------------------------------
 * 실제 store.onstove.com/ko 를 실측해서 옮긴 것(2026-10-19). 그 아래 콘텐츠는
 * 여전히 정적 스크린샷이다(app-shell.html). 스타일은 css/store-main.css.
 *
 * 네비게이션 바: 높이 52 둥근 바, 선택 칩이 탭 사이를 미끄러진다(0.35s).
 *   스크롤을 내리면 숨고 올리면 다시 나타난다(웹과 같은 동작).
 * 배너: 644 x 276 카드, 간격 20, 가운데 정렬, 무한 반복,
 *   4초 자동 재생 · 0.4초 전환(웹 Swiper 설정 그대로), 좌우 화살표,
 *   "n/14 ⏸" 표시를 누르면 재생/일시정지, 끌어서 넘기기.
 * 배너 이미지·문구는 실제 웹에서 받아 온 것(assets/store-hero/).
 */
var STORE_MAIN_TABS = [
  { id: 'recommend', label: '추천' },
  { id: 'today1', label: '오늘의1등', image: true },
  { id: 'online', label: '온라인 게임' },
  { id: 'visual-novel', label: '비주얼 노벨' },
  { id: 'community', label: '공식 커뮤니티' },
  { id: 'indie', label: '스토브 인디' },
  { id: 'taps', label: '스토브 탭스' },
];

// 실제 웹 배너 14장 (store.onstove.com/ko 메인 PR 배너, 2026-10-19 기준 순서)
var STORE_MAIN_BANNERS = [
  { title: '매일 1등 인기글에<br>100만원을 드려요.', desc: '오늘의 1등 인기글 도전!<br>참여만 해도 최대 10만 원 행운!' },
  { title: 'NO 설치? 바로 클릭!<br>용사단 키우기!', desc: '아니 뭐했다고 벌써 50랩?<br>스토브탭스! 설치 없이 시간 순삭!' },
  { title: 'NO 설치? 시간 순삭!<br>수박 만들기 2048', desc: '수박만들기, 쉽지 않으실텐데...<br>스토브탭스! 설치 없이 바로 도전!' },
  { title: '로드나인<br>신규 서버 \'하칸\'', desc: 'RE:MAKE 서버 10/23(금) OPEN!' },
  { title: '다이너마이트 블루<br>스토브 출시!', desc: '오늘도 평범한 하루, <br>출시 기념 5% 결제 할인 쿠폰과 함께!' },
  { title: '럽플레이스 <br>스토브 출시!', desc: '출시 기념 선착순 10% 결제 할인 쿠폰 제공!<br>혜택 받고 나만의 스타일로 데뷔!' },
  { title: '비욘드 디즈 스타즈<br>지금 플레이 가능!', desc: '우주고래 등에 도시를 건설해서!<br>우주 여행을 떠나보자~🐳',
    price: { discount: '-20%', price: '₩23,920', original: '₩29,900' } },
  { title: '히파티아<br>반값 특별 할인!', desc: '취향 저격 메이드 4인방<br>당신의 최애 메이드는 누구?',
    price: { discount: '-50%', price: '₩4,500', original: '₩9,000' } },
  { title: '더 매거스 써클<br>손으로 그리는 주문', desc: '마법진을 그려 시전하는 로그라이크<br>250가지 조합의 다른 재미',
    price: { price: '₩12,500' } },
  { title: '스토브페이로 결제하면<br>5% 포인트 적립!', desc: '놓치면 안되는 5% 적립 기회~ 지금 확인!' },
  { title: '어이쿠! 왕자님<br>지금 만나보세요!', desc: '귀여운 제목만 보고 들어왔다면...<br>어이쿠! 마음의 준비부터.' },
  { title: '신작 수집형 RPG<br>라스트 소녀 전사 출시', desc: '지휘관님, 출시 기념<br>5% 결제 할인 쿠폰 드려요' },
  { title: '게임 리뷰 읽고,<br> 댓글 달면 플레이크 GET!', desc: '지금 바로 클릭해 읽어보세요!' },
  { title: '마작일번가<br>10월 스토어 이벤트', desc: '누적 결제, 첫 결제, 신규/복귀 혜택 총출동!<br>작탁을 접수하라!' },
].map(function (b, i) {
  b.image = 'assets/store-hero/banner-' + (i < 10 ? '0' : '') + i + '.jpg';
  return b;
});

var STORE_HERO_CARD = 644;   // 카드 폭
var STORE_HERO_GAP = 20;     // 카드 간격
var STORE_HERO_SPEED = 400;  // 전환 시간 (ms)
var STORE_HERO_DELAY = 4000; // 자동 재생 간격 (ms)

var StoreMainTop = {
  data: function () {
    var n = STORE_MAIN_BANNERS.length;
    return {
      tabs: STORE_MAIN_TABS,
      selectedTab: 'recommend',
      indicator: { left: 0, width: 0 },
      indicatorReady: false, // 첫 배치는 애니메이션 없이 — 폭 0에서 커지는 게 보이지 않게
      navHidden: false,
      banners: STORE_MAIN_BANNERS,
      // 무한 반복: 배너 목록을 세 벌 이어 붙이고 가운데 벌에서 시작한다
      pos: n,
      animate: true,
      playing: true,
      dragX: 0,
      dragging: false,
      // "n/14" 알약 테두리 진행 표시 — 폭은 숫자 자릿수에 따라 달라 실측한다
      pagerW: 69,
      progressKey: 0, // 바뀔 때마다 테두리 애니메이션을 처음부터 다시

    };
  },
  computed: {
    loopBanners: function () {
      return this.banners.concat(this.banners, this.banners);
    },
    current: function () {
      var n = this.banners.length;
      return ((this.pos % n) + n) % n;
    },
    trackStyle: function () {
      // 트랙 왼쪽 끝이 화면 가운데(css left 50%)라, 카드 절반 + 지나간 카드 수만큼 당기면
      // 지금 카드가 정중앙에 온다
      var x = -(STORE_HERO_CARD / 2) - this.pos * (STORE_HERO_CARD + STORE_HERO_GAP) + this.dragX;
      return {
        transform: 'translateX(' + x + 'px)',
        transition: this.animate && !this.dragging ? 'transform ' + STORE_HERO_SPEED + 'ms ease' : 'none',
      };
    },
    // 알약(높이 26) 테두리를 위·아래 반으로 나눈 경로 — 왼쪽 가운데에서 시작해
    // 오른쪽 가운데까지 동시에 그려진다 (실제 웹 svg-border 그대로)
    pagerPaths: function () {
      var w = this.pagerW;
      var top = 'M0.5,13 A12.5,12.5 0 0 1 13,0.5 H' + (w - 13) + ' A12.5,12.5 0 0 1 ' + (w - 0.5) + ',13';
      var bottom = 'M0.5,13 A12.5,12.5 0 0 0 13,25.5 H' + (w - 13) + ' A12.5,12.5 0 0 0 ' + (w - 0.5) + ',13';
      return { top: top, bottom: bottom, length: Math.PI * 12.5 + (w - 26) };
    },
    indicatorStyle: function () {
      return {
        transform: 'translateX(' + this.indicator.left + 'px)',
        width: this.indicator.width + 'px',
        transition: this.indicatorReady ? '' : 'none',
      };
    },
  },
  watch: {
    current: function () { this.$nextTick(this.measurePager); },
  },
  mounted: function () {
    var self = this;
    // 알약 폭은 숫자 자릿수·글꼴 로드에 따라 바뀐다 — 바뀔 때마다 테두리 경로를 다시 맞춘다
    this.$nextTick(function () {
      self.measurePager();
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(self.measurePager);
      if (window.ResizeObserver && self.$refs.pager) {
        self.pagerObserver = new ResizeObserver(self.measurePager);
        self.pagerObserver.observe(self.$refs.pager);
      }
    });
    this.$nextTick(function () {
      self.moveIndicator();
      requestAnimationFrame(function () { requestAnimationFrame(function () { self.indicatorReady = true; }); });
    });
    this.startAutoplay();

    // 스크롤을 내리면 네비게이션 바가 숨고, 올리면 다시 나타난다
    this.scroller = document.querySelector('.app > .main');
    this.lastScroll = 0;
    this.onScroll = function () {
      var y = self.scroller.scrollTop;
      if (y < 132) self.navHidden = false;
      else if (y > self.lastScroll + 2) self.navHidden = true;
      else if (y < self.lastScroll - 2) self.navHidden = false;
      self.lastScroll = y;
    };
    if (this.scroller) this.scroller.addEventListener('scroll', this.onScroll, { passive: true });
  },
  beforeUnmount: function () {
    this.stopAutoplay();
    if (this.pagerObserver) this.pagerObserver.disconnect();
    if (this.scroller) this.scroller.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    selectTab: function (tab) {
      this.selectedTab = tab.id;
      this.$nextTick(this.moveIndicator);
    },
    moveIndicator: function () {
      var el = this.$el.querySelector('.store-nav__tab.is-selected');
      if (!el) return;
      this.indicator = { left: el.offsetLeft, width: el.offsetWidth };
    },

    // ---- 배너 ----
    go: function (delta) {
      var n = this.banners.length;
      var self = this;
      this.restartAutoplay();
      // 가운데 벌을 벗어나 있으면(전환 끝 보정을 못 받은 경우 — 예: 백그라운드 탭에선
      // 타이머만 돌고 전환은 안 끝난다) 먼저 애니메이션 없이 가운데로 옮기고 넘긴다
      if (this.pos < n || this.pos >= n * 2) {
        this.animate = false;
        this.pos = n + this.current;
        this.$nextTick(function () {
          void self.$el.parentNode.offsetWidth; // 즉시 이동을 확정시킨 뒤
          self.animate = true;
          self.pos += delta;
        });
        return;
      }
      this.animate = true;
      this.pos += delta;
    },
    // 전환이 끝나면 가운데 벌로 몰래 되돌려서 끝없이 이어지게 한다
    onTrackTransitionEnd: function () {
      var n = this.banners.length;
      if (this.pos < n || this.pos >= n * 2) {
        this.animate = false;
        this.pos = n + this.current;
        var self = this;
        requestAnimationFrame(function () { requestAnimationFrame(function () { self.animate = true; }); });
      }
    },
    measurePager: function () {
      var el = this.$refs.pager;
      if (el) this.pagerW = Math.round(el.getBoundingClientRect().width * 10) / 10;
    },
    startAutoplay: function () {
      var self = this;
      this.stopAutoplay();
      this.measurePager();
      this.progressKey += 1;
      if (!this.playing) return;
      this.timer = setInterval(function () { self.go(1); self.progressKey += 1; }, STORE_HERO_DELAY);
    },
    stopAutoplay: function () { clearInterval(this.timer); },
    restartAutoplay: function () { if (this.playing) this.startAutoplay(); },
    togglePlay: function () {
      this.playing = !this.playing;
      if (this.playing) this.startAutoplay(); else this.stopAutoplay();
    },
    // 끌어서 넘기기 — 카드 폭의 1/6 이상 끌면 넘어간다
    onPointerDown: function (e) {
      if (e.button !== 0) return;
      this.dragging = true;
      this.dragStart = e.clientX;
      this.dragX = 0;
      this.stopAutoplay();
      var self = this;
      this.onPointerMove = function (ev) { self.dragX = ev.clientX - self.dragStart; };
      this.onPointerUp = function () {
        document.removeEventListener('pointermove', self.onPointerMove);
        document.removeEventListener('pointerup', self.onPointerUp);
        var dx = self.dragX;
        self.dragging = false;
        self.dragX = 0;
        if (Math.abs(dx) > STORE_HERO_CARD / 6) self.go(dx < 0 ? 1 : -1);
        else self.restartAutoplay();
      };
      document.addEventListener('pointermove', this.onPointerMove);
      document.addEventListener('pointerup', this.onPointerUp);
    },
  },
  template:
    '<div class="store-main-top">' +

      // ---- 카테고리 네비게이션 바 ----
      '<nav class="store-nav" :class="{ \'is-hidden\': navHidden }" aria-label="스토어 카테고리">' +
        '<div class="store-nav__bar">' +
          '<div class="store-nav__tabs-wrap">' +
            '<span class="store-nav__indicator" :style="indicatorStyle" aria-hidden="true"></span>' +
            '<ul class="store-nav__tabs">' +
              '<li v-for="tab in tabs" :key="tab.id">' +
                '<button class="store-nav__tab" :class="{ \'is-selected\': selectedTab === tab.id, \'store-nav__tab--image\': tab.image }" type="button" @click="selectTab(tab)">' +
                  '<template v-if="tab.image">' +
                    '<img class="store-nav__tab-img theme-img--dark" src="assets/store-hero/today1-dark.png" :alt="tab.label" />' +
                    '<img class="store-nav__tab-img theme-img--light" src="assets/store-hero/today1-light.png" :alt="tab.label" />' +
                  '</template>' +
                  '<span v-else class="store-nav__tab-label">{{ tab.label }}</span>' +
                '</button>' +
              '</li>' +
            '</ul>' +
          '</div>' +
          '<div class="store-nav__category">' +
            '<span class="store-nav__divider" aria-hidden="true"></span>' +
            '<button class="store-nav__category-btn" type="button">' +
              '<span>카테고리</span><i class="ic-v2-control-arrow-down-line" aria-hidden="true"></i>' +
            '</button>' +
          '</div>' +
          '<div class="store-nav__icons">' +
            '<button class="store-nav__icon-btn" type="button" aria-label="찜"><i class="ic-v2-community-like-fill"></i></button>' +
            '<button class="store-nav__icon-btn" type="button" aria-label="장바구니"><i class="ic-v2-navigation-cart-fill"></i></button>' +
            '<button class="store-nav__icon-btn" type="button" aria-label="검색"><i class="ic-v2-navigation-search-line"></i></button>' +
          '</div>' +
        '</div>' +
      '</nav>' +

      // ---- 메인 배너 캐러셀 ----
      '<section class="store-hero" aria-roledescription="carousel" aria-label="메인 배너">' +
        '<div class="store-hero__track" :style="trackStyle" @transitionend.self="onTrackTransitionEnd" @pointerdown="onPointerDown">' +
          '<article v-for="(b, i) in loopBanners" :key="i" class="store-hero__card" :aria-hidden="i !== pos">' +
            '<img class="store-hero__img" :src="b.image" alt="" draggable="false" />' +
            '<div class="store-hero__text">' +
              '<h4 class="store-hero__title" v-html="b.title"></h4>' +
              '<p class="store-hero__desc" v-html="b.desc"></p>' +
              '<div v-if="b.price" class="store-hero__price">' +
                '<span class="store-hero__price-main">' +
                  '<span v-if="b.price.discount" class="store-hero__discount">{{ b.price.discount }}</span>' +
                  '<span>{{ b.price.price }}</span>' +
                '</span>' +
                '<span v-if="b.price.original" class="store-hero__original">{{ b.price.original }}</span>' +
              '</div>' +
            '</div>' +
          '</article>' +
        '</div>' +
        '<button class="store-hero__arrow store-hero__arrow--prev" type="button" aria-label="이전 배너" @click="go(-1)"><i class="ic-v2-control-arrow-left-line"></i></button>' +
        '<button class="store-hero__arrow store-hero__arrow--next" type="button" aria-label="다음 배너" @click="go(1)"><i class="ic-v2-control-arrow-right-line"></i></button>' +
        '<button ref="pager" class="store-hero__pager" type="button" :aria-label="playing ? \'자동 재생 멈춤\' : \'자동 재생\'" @click="togglePlay">' +
          // 재생 중이면 다음 배너까지 남은 시간만큼 흰 테두리가 채워진다
          '<svg v-if="playing" :key="progressKey" class="store-hero__pager-border" :viewBox="\'0 0 \' + pagerW + \' 26\'" preserveAspectRatio="none" fill="none" aria-hidden="true" ' +
            ':style="{ \'--border-len\': pagerPaths.length }">' +
            '<path :d="pagerPaths.top" /><path :d="pagerPaths.bottom" />' +
          '</svg>' +
          '<span class="store-hero__count"><b>{{ current + 1 }}</b><span>/</span><span>{{ banners.length }}</span></span>' +
          '<i :class="playing ? \'ic-v2-media-av-pause-fill\' : \'ic-v2-media-av-play-fill\'" aria-hidden="true"></i>' +
        '</button>' +
      '</section>' +

    '</div>',
};

function mountStoreMainTop(selector) {
  return Vue.createApp(StoreMainTop).mount(selector);
}
