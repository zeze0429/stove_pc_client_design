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
    thumb: 'assets/game-lostark.png',
    bg: 'assets/pcbang-benefits/card-bg-lostark.jpg',
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
    thumb: 'assets/game-tales.png',
    bg: 'assets/pcbang-benefits/card-bg-tales.jpg',
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
  emits: ['close'],
  data: function () {
    return { storeName: PCBANG_STORE_NAME, benefits: PCBANG_BENEFITS };
  },
  mounted: function () {
    this.onKeydown = function (e) { if (e.key === 'Escape') this.$emit('close'); }.bind(this);
    document.addEventListener('keydown', this.onKeydown);
  },
  beforeUnmount: function () {
    document.removeEventListener('keydown', this.onKeydown);
  },
  template:
    // 딤을 직접 누른 경우(.self)에만 닫는다 — 다이얼로그 안쪽 클릭은 통과
    '<div class="pcbang-dim" @click.self="$emit(\'close\')">' +
      '<div class="pcbang-dialog" role="dialog" aria-modal="true" aria-label="PC방 혜택" ' +
        'data-name="layout/utility_bar/dialog/pcbang-benefits">' +

        '<div class="pcbang-dialog__header" data-name="Dialog/Header">' +
          '<p class="pcbang-dialog__title stds-title7 fw-bold">PC방 혜택</p>' +
          '<button class="pcbang-dialog__close" type="button" aria-label="닫기" @click="$emit(\'close\')">' +
            '<i class="ic-v2-control-close-line"></i>' +
          '</button>' +
        '</div>' +

        '<div class="pcbang-dialog__body">' +
          '<p class="pcbang-dialog__welcome stds-title7 fw-medium">' +
            '<span class="pcbang-dialog__store fw-bold">{{ storeName }}</span>에 오신 것을 환영합니다' +
          '</p>' +

          '<div class="pcbang-dialog__list" data-name="list">' +
            '<div v-for="item in benefits" :key="item.id" class="pcbang-card" ' +
              'data-name="component/list/pcbang-benefits">' +
              '<img v-if="item.bg" class="pcbang-card__bg" :src="item.bg" alt="" aria-hidden="true" />' +
              '<p v-if="item.title" class="pcbang-card__title stds-title8 fw-medium">{{ item.title }}</p>' +
              '<div class="pcbang-card__game">' +
                '<img v-if="item.thumb" class="pcbang-card__thumb" :src="item.thumb" alt="" ' +
                  'data-name="component/thumnail/game" />' +
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
                  '<span class="pcbang-btn__label stds-cap1 fw-medium">' +
                    '<i :class="btn.icon"></i>{{ btn.label }}' +
                  '</span>' +
                  '<span v-if="btn.isNew" class="pcbang-btn__new"></span>' +
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
    '</div>',
};
