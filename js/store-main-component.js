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
 *   "n/9 ⏸" 표시를 누르면 재생/일시정지, 끌어서 넘기기.
 * 배너 이미지·문구는 실제 웹에서 받아 온 것(assets/store-hero/).
 */
var STORE_MAIN_TABS = [
  { id: 'recommend', label: '추천' },
  { id: 'online', label: '온라인 게임' },
  { id: 'visual-novel', label: '비주얼 노벨' },
  { id: 'community', label: '공식 커뮤니티' },
  { id: 'indie', label: '스토브 인디' },
  { id: 'taps', label: '스토브 탭스' },
];

// 실제 웹 배너 9장 (store.onstove.com/ko 메인 PR 배너, 2026-11-17 기준 순서 — "오늘의 1등" 종료로 교체)
// 이미지는 웹 원본(1380 x 681 PNG)을 JPG 85로 줄여 assets/store-hero/banner-NN.jpg
var STORE_MAIN_BANNERS = [
  { title: '10% 할인 + 10% 쿠폰<br>굿즈 3종 세트까지!', desc: '사이코 슬루스 출시 기념<br>응원 이벤트 진행 중' },
  { title: '방치는 내가!<br>성장은 용사가!', desc: '스트레스 없이 키우는<br>나만의 용사단!' },
  { title: '만만히 봤다간<br>큰코 다칠 수박에...', desc: '시간 살살 녹는<br>수박 만들기 한 판!' },
  { title: '멸망의 세계 속,<br>희망이 피어나는 곳', desc: '소녀들과 함께 만들어가는<br>「라스트 소녀 전사」' },
  { title: '당신의 눈으로 본 것은<br>진실이 아닐수도 있습니다', desc: '리뷰 읽고 플레이크 받아가세요!' },
  { title: '프레이야 가문의 가주<br>블레이즈벨 등장!', desc: '강하고 고고한 그녀를<br>지금 만나보세요!' },
  { title: '11월엔 11% 추가 쿠폰!<br>최대 90% 할인에 더하다', desc: '추운데 나가지 마,<br>게임하기 딱 좋은 계절' },
  { title: '게임 리뷰 읽고,<br>댓글 달면 플레이크 GET!', desc: '지금 바로 클릭해 읽어보세요!' },
  { title: '마작일번가<br>11월 스토어 이벤트', desc: '혜택 4종, 텐파이 완료!<br>마지막 한 장은 지금 바로 접속!' },
].map(function (b, i) {
  b.image = 'assets/store-hero/banner-' + (i < 10 ? '0' : '') + i + '.jpg?v=2'; // v=2 — 11-17 교체(같은 파일 이름이라 예전 그림이 캐시에서 안 나오게)
  return b;
});

var STORE_HERO_CARD = 644;   // 카드 폭
var STORE_HERO_GAP = 20;     // 카드 간격
var STORE_HERO_SPEED = 400;  // 전환 시간 (ms)
var STORE_HERO_DELAY = 4000; // 자동 재생 간격 (ms)

// ---- 카테고리 네비게이션 바 — 스토어 메인(StoreMainTop)과 스토어형 게임 상세(js/store-detail-component.js)가 같이 쓴다 (11-24)
//   selected: 고른 탭 id(메인 = 추천, 상세 = 없음 → 칩 안 보임) · overlay: 유틸리티 바가 콘텐츠 위에 떠 있는 페이지(게임 상세)
var StoreNavBar = {
  props: {
    selected: { type: String, default: 'recommend' },
    overlay: { type: Boolean, default: false },
  },
  data: function () {
    return {
      tabs: STORE_MAIN_TABS,
      selectedTab: this.selected,
      indicator: { left: 0, width: 0 },
      indicatorReady: false, // 첫 배치는 애니메이션 없이 — 폭 0에서 커지는 게 보이지 않게
      navHidden: false,
    };
  },
  computed: {
    indicatorStyle: function () {
      return {
        transform: 'translateX(' + this.indicator.left + 'px)',
        width: this.indicator.width + 'px',
        transition: this.indicatorReady ? '' : 'none',
      };
    },
  },
  mounted: function () {
    var self = this;
    this.$nextTick(function () {
      self.moveIndicator();
      requestAnimationFrame(function () { requestAnimationFrame(function () { self.indicatorReady = true; }); });
    });
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

  },
  template:
      '<nav class="store-nav" :class="{ \'is-hidden\': navHidden, \'store-nav--overlay\': overlay }" aria-label="스토어 카테고리">' +
        '<div class="store-nav__bar">' +
          '<div class="store-nav__tabs-wrap">' +
            '<span class="store-nav__indicator" :style="indicatorStyle" aria-hidden="true"></span>' +
            '<ul class="store-nav__tabs">' +
              '<li v-for="tab in tabs" :key="tab.id">' +
                '<button class="store-nav__tab" :class="{ \'is-selected\': selectedTab === tab.id }" type="button" @click="selectTab(tab)">' +
                  '<span class="store-nav__tab-label">{{ tab.label }}</span>' +
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
            '<button class="store-nav__icon-btn store-nav__icon-btn--stateful" type="button" aria-label="찜"><i class="ic-v2-community-like-fill"></i></button>' +
            '<button class="store-nav__icon-btn store-nav__icon-btn--stateful" type="button" aria-label="장바구니"><i class="ic-v2-navigation-cart-fill"></i></button>' +
            '<button class="store-nav__icon-btn" type="button" aria-label="검색"><i class="ic-v2-navigation-search-line"></i></button>' +
          '</div>' +
        '</div>' +
      '</nav>',
};

var StoreMainTop = {
  components: { 'store-nav-bar': StoreNavBar },
  data: function () {
    var n = STORE_MAIN_BANNERS.length;
    return {
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
    this.startAutoplay();
  },
  beforeUnmount: function () {
    this.stopAutoplay();
    if (this.pagerObserver) this.pagerObserver.disconnect();
  },
  methods: {
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

      // ---- 카테고리 네비게이션 바 (StoreNavBar — 스토어형 게임 상세도 같이 씀) ----
      '<store-nav-bar></store-nav-bar>' +

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
