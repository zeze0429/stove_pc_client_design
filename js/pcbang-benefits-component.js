/**
 * PC방 혜택 다이얼로그 — 공통 Vue 컴포넌트 (빌드 없이 CDN Vue로 동작)
 * -------------------------------------------------------------
 * Figma: layout/utility_bar/dialog/pcbang-benefits (3493:54899)
 * 유틸리티 바(js/utility-bar-component.js)의 "PC방 혜택 안내" 버튼이
 * 띄운다. 열고 닫는 상태는 유틸리티 바가 들고 있고, 여기서는 close만
 * 올려보낸다.
 *
 * 색상/치수는 css/pcbang-benefits.css의 토큰만 참조한다.
 */

// 접속한 PC방 — 실제로는 클라이언트가 주입한다.
var PCBANG_STORE_NAME = '레벨업PC방 서현역점';

// 혜택 목록 — 실제로는 API 응답. Figma 케이스를 그대로 옮겨뒀다:
// 1) 혜택 타이틀 + 배경이미지 + 버튼 4개(제공 3 + 커스텀 1)
// 2) 타이틀 없음 + 배경이미지 + 버튼 2개
// 3) 타이틀/배경/썸네일 없음 + 커스텀 버튼 1개
var PCBANG_BENEFITS = [
  {
    id: 'lostark',
    title: '🍔 햄버거 할인 받고 로스트아크 플레이 하기!',
    name: '로스트아크',
    genre: 'MMORPG',
    thumb: gameInfo('lostark').thumb,
    bg: 'assets/pcbang-benefits/Client3.0_PC방혜택팝업_백그라운드_로스트아크.jpg',
    buttons: [
      { label: '프리미엄 혜택', icon: 'ic-v2-object-crown-fill', isNew: true },
      { label: '이벤트', icon: 'ic-v2-navigation-community-event-fill' },
      { label: '쿠폰', icon: 'ic-v2-navigation-coupon-fill' },
      { label: '%커스텀가능%', icon: 'ic-v2-community-star-fill' },
    ],
  },
  {
    id: 'tales',
    name: '테일즈런너',
    genre: 'Racing',
    thumb: gameInfo('tales').thumb,
    bg: 'assets/pcbang-benefits/Client3.0_PC방혜택팝업_백그라운드_테일즈런너.jpg',
    buttons: [
      { label: '프리미엄 혜택', icon: 'ic-v2-object-crown-fill' },
      { label: '이벤트', icon: 'ic-v2-navigation-community-event-fill', isNew: true },
    ],
  },
  {
    id: 'bts',
    name: 'BTS 쿠킹온 스토브 : 타이니탄 레스토랑',
    genre: 'Casual',
    buttons: [
      { label: '햄버거 할인 받고 BTS 쿠킹온 스토브 : 타이니탄 레스토랑 플레이하기!', icon: 'ic-v2-community-star-fill' },
    ],
  },
];

var PcbangBenefitsDialog = {
  components: { LayerDialog: LayerDialog },
  emits: ['close'],
  data: function () {
    return { storeName: PCBANG_STORE_NAME, benefits: PCBANG_BENEFITS };
  },
  mounted: function () {
    this.shrinkWrapLabels();
    // 웹폰트가 늦게 들어오면 줄 폭이 달라진다
    if (document.fonts) document.fonts.ready.then(this.shrinkWrapLabels);
    // 버튼 폭이 바뀌면(창 크기) 다시 잰다 — 라벨 자신이 아니라 버튼을 본다
    this.resizeObserver = new ResizeObserver(this.shrinkWrapLabels);
    this.$refs.list.querySelectorAll('.pcbang-btn').forEach(function (btn) {
      this.resizeObserver.observe(btn);
    }, this);
  },
  beforeUnmount: function () {
    this.resizeObserver.disconnect();
  },
  methods: {
    // 줄바꿈된 라벨을 가장 긴 줄 폭으로 줄인다 (개발 useShrinkWrapText와 같은 방식).
    // CSS는 줄바꿈된 글 상자를 주어진 폭만큼 넓게 두기 때문에, 그대로면 NEW 점이
    // 빈 공간 끝으로 밀리고 아이콘 · 라벨이 가운데에서 벗어난다.
    shrinkWrapLabels: function () {
      if (!this.$refs.list) return;
      this.$refs.list.querySelectorAll('.pcbang-btn__text').forEach(function (el) {
        el.style.width = '';
        var range = document.createRange();
        range.selectNodeContents(el);
        var rects = Array.prototype.filter.call(range.getClientRects(), function (r) { return r.width > 0; });
        // 위치가 줄 높이 절반 넘게 내려가야 새 줄로 센다
        var lines = 0;
        var lastTop = -Infinity;
        rects.slice().sort(function (a, b) { return a.top - b.top; }).forEach(function (r) {
          if (r.top - lastTop > r.height / 2) { lines += 1; lastTop = r.top; }
        });
        if (lines < 2) return;
        var left = Math.min.apply(null, rects.map(function (r) { return r.left; }));
        var right = Math.max.apply(null, rects.map(function (r) { return r.right; }));
        el.style.width = Math.ceil(right - left) + 'px';
      });
    },
  },
  template:
    // 딤·헤더·닫기는 공용 셸(js/layer-dialog-component.js)이 담당하고
    // 여기서는 본문만 정의한다. 환영 문구는 고정, 카드 목록만 스크롤.
    '<layer-dialog title="PC방 혜택" :body-scroll="false" @close="$emit(\'close\')" ' +
      'data-name="layout/utility_bar/dialog/pcbang-benefits">' +
      '<div class="pcbang-dialog">' +

      '<p class="pcbang-welcome stds-title7 fw-medium">' +
        '<span class="pcbang-store fw-bold">{{ storeName }}</span>에 오신 것을 환영합니다' +
      '</p>' +

      '<div class="layer-dialog-scroll">' +
      '<div class="pcbang-list" ref="list" data-name="list">' +
        '<div v-for="item in benefits" :key="item.id" class="pcbang-card" ' +
          'data-name="component/list/pcbang-benefits">' +
          '<img v-if="item.bg" class="pcbang-card__bg" :src="item.bg" alt="" aria-hidden="true" />' +
          '<p v-if="item.title" class="pcbang-card__title stds-title8 fw-medium">{{ item.title }}</p>' +
          '<div class="pcbang-card__game">' +
            '<span v-if="item.thumb" class="pcbang-card__thumb" data-name="component/thumnail/game">' +
              '<img :src="item.thumb" alt="" />' +
            '</span>' +
            '<span v-else class="pcbang-card__thumb pcbang-card__thumb--empty" aria-hidden="true">' +
              '<i class="ic-v2-stove-s-fill"></i>' +
            '</span>' +
            '<div class="pcbang-card__info">' +
              '<p class="pcbang-card__name stds-title7 fw-bold">{{ item.name }}</p>' +
              '<p class="pcbang-card__genre stds-cap2 fw-regular">{{ item.genre }}</p>' +
            '</div>' +
          '</div>' +
          '<div class="pcbang-card__btns" data-name="btn group">' +
            '<button v-for="(btn, i) in item.buttons" :key="i" class="pcbang-btn" type="button" ' +
              'data-name="component/btn/pcbang-benefits">' +
              '<i :class="btn.icon"></i>' +
              '<span class="pcbang-btn__label">' +
                '<span class="pcbang-btn__text stds-btn3 fw-medium">{{ btn.label }}</span>' +
                '<span v-if="btn.isNew" class="pcbang-btn__new"></span>' +
              '</span>' +
            '</button>' +
          '</div>' +
        '</div>' +

        '<div v-if="!benefits.length" class="pcbang-card pcbang-card--empty">' +
          '<i class="ic-v2-state-warning-circle-fill"></i>' +
          '<p class="stds-cap1 fw-medium">PC방 혜택 정보가 없습니다.</p>' +
        '</div>' +
      '</div>' +
      '</div>' +

      '</div>' +
    '</layer-dialog>',
};
