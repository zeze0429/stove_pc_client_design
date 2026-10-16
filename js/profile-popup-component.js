/**
 * 내 정보 팝업 — 공통 Vue 컴포넌트 (빌드 없이 CDN Vue로 동작)
 * -------------------------------------------------------------
 * Figma: layout/utility_bar/layer_popup/profile (3376:51880)
 * 유틸리티 바의 프로필 버튼이 띄운다. 알림 팝업과 같이 딤 없이 버튼에
 * 붙어서 뜨기 때문에 센터 레이어 팝업 셸(layer-dialog)을 쓰지 않는다.
 *
 * 색상/치수는 css/profile-popup.css의 토큰만 참조한다.
 */

// 실제로는 API 응답.
var PROFILE_USER = {
  name: '일이삼사오육칠팔구십일이삼사오육칠팔구십',
  avatar: 'assets/profile-popup/avatar.jpg',
};

// 재화 — 캐시에만 충전 버튼이 붙는다. value는 카운트업을 돌려야 해서 숫자.
var PROFILE_MONEY = [
  { id: 'cash', label: '캐시', value: 13000, img: 'assets/profile-popup/ic-cash.svg', charge: true },
  // 포인트 마크는 Figma 쪽 레이어 이름이 flake로 잘못 올라가 있어서
  // ic-point.svg로 바꿔 받았다(파일명/변수명은 point 기준).
  { id: 'point', label: '포인트', value: 345670, img: 'assets/profile-popup/ic-point.svg' },
  { id: 'flake', label: '플레이크', value: 999999999, img: 'assets/profile-popup/ic-flake.svg' },
];

// 재화 숫자 카운트업 (Figma "재화 숫자 카운트업 인터렉션 가이드" 5300:49840)
var PROFILE_COUNTUP_MS = 900;

var PROFILE_MENU = [
  [
    { id: 'me', label: '내 정보', icon: 'ic-v2-navigation-profile-fill' },
    { id: 'game', label: '게임 정보', icon: 'ic-v2-navigation-game-info-fill' },
    { id: 'message', label: '쪽지', icon: 'ic-v2-navigation-message-fill' },
    { id: 'coupon', label: '쿠폰', icon: 'ic-v2-navigation-coupon-fill' },
    { id: 'gift', label: '선물 내역', icon: 'ic-v2-navigation-community-event-fill' },
  ],
  [
    { id: 'security', label: '보안센터', icon: 'ic-v2-navigation-security-fill' },
    { id: 'help', label: '고객센터', icon: 'ic-v2-object-help-center-fill' },
    { id: 'report', label: '신고센터', icon: 'ic-v2-object-report-fill' },
    { id: 'bug', label: '오류보고', icon: 'ic-v2-community-board-fill' },
    { id: 'app', label: '스토브앱', icon: 'ic-v2-object-download-line' },
  ],
];

var ProfilePopup = {
  emits: ['close'],
  data: function () {
    return {
      user: PROFILE_USER,
      money: PROFILE_MONEY,
      menu: PROFILE_MENU,
      // 카운트업 중 화면에 찍히는 값. 0에서 시작해 실제 잔액까지 올라간다.
      shown: { cash: 0, point: 0, flake: 0 },
    };
  },
  mounted: function () {
    this.startCountUp();
    this.onKeydown = function (e) { if (e.key === 'Escape') this.$emit('close'); }.bind(this);
    document.addEventListener('keydown', this.onKeydown);
    // 바깥을 누르면 닫는다. 프로필 버튼도 앵커 안이라 여기서는 무시되고,
    // 버튼 자신의 토글이 닫는 걸 맡는다(두 번 처리되지 않게).
    this.onDocClick = function (e) {
      if (!e.target.closest('.utility-bar__popup-anchor')) this.$emit('close');
    }.bind(this);
    document.addEventListener('click', this.onDocClick);
  },
  beforeUnmount: function () {
    document.removeEventListener('keydown', this.onKeydown);
    document.removeEventListener('click', this.onDocClick);
    if (this.raf) cancelAnimationFrame(this.raf);
  },
  methods: {
    // 팝업이 뜨는 순간 0부터 실제 잔액까지 900ms ease-out cubic으로 올린다.
    // 세 항목 모두 같은 타이머로 동시에 — 닫았다 열면 컴포넌트가 새로
    // 마운트되므로 자동으로 처음부터 다시 재생된다.
    startCountUp: function () {
      var self = this;
      var startTime = null;
      function frame(timestamp) {
        if (startTime === null) startTime = timestamp;
        var progress = Math.min(1, (timestamp - startTime) / PROFILE_COUNTUP_MS);
        var eased = 1 - Math.pow(1 - progress, 3);
        self.money.forEach(function (m) {
          self.shown[m.id] = Math.floor(eased * m.value);
        });
        if (progress < 1) {
          self.raf = requestAnimationFrame(frame);
        } else {
          // 마지막 프레임은 목표값을 그대로 — floor 때문에 1 모자라게
          // 끝나는 걸 막아야 한다(가이드 주의사항).
          self.money.forEach(function (m) { self.shown[m.id] = m.value; });
        }
      }
      this.raf = requestAnimationFrame(frame);
    },
  },
  template:
    '<div class="profile-popup" role="dialog" aria-label="내 정보" ' +
      'data-name="layout/utility_bar/layer_popup/profile">' +

      '<div class="profile-popup__header" data-name="header">' +
        '<div class="profile-popup__user" data-name="profile">' +
          '<img class="profile-popup__avatar" :src="user.avatar" alt="" data-name="User profile" />' +
          '<div class="profile-popup__info" data-name="info">' +
            '<p class="profile-popup__name stds-title6 fw-bold">{{ user.name }}</p>' +
            '<div class="profile-popup__links">' +
              '<button class="profile-popup__link stds-cap1 fw-medium" type="button" data-name="btn_text">' +
                '<i class="ic-v2-navigation-home-line"></i>마이홈' +
              '</button>' +
              '<span class="profile-popup__divider" aria-hidden="true" data-name="component/div"></span>' +
              '<button class="profile-popup__link stds-cap1 fw-medium" type="button" data-name="btn_text">' +
                '<i class="ic-v2-navigation-logout-line"></i>로그아웃' +
              '</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<button class="profile-popup__setting stds-cap1 fw-medium" type="button" data-name="Button">' +
          '<i class="ic-v2-navigation-setting-fill"></i>설정' +
        '</button>' +
      '</div>' +

      '<div class="profile-popup__contents" data-name="contents">' +
        '<div class="profile-popup__row1" data-name="위계1">' +

          '<div class="profile-money" data-name="재화">' +
            '<div v-for="m in money" :key="m.id" class="profile-money__row" ' +
              'data-name="component/list/user_money">' +
              '<div class="profile-money__left">' +
                '<span class="profile-money__title" data-name="title">' +
                  '<img :src="m.img" alt="" aria-hidden="true" />' +
                  '<span class="profile-money__label stds-title8 fw-bold">{{ m.label }}</span>' +
                '</span>' +
                '<button v-if="m.charge" class="profile-money__charge stds-cap1 fw-medium" type="button">충전</button>' +
              '</div>' +
              '<p class="profile-money__value stds-title8 fw-medium">{{ shown[m.id].toLocaleString() }}</p>' +
            '</div>' +
          '</div>' +

          '<div class="profile-security" data-name="component/card/user_security">' +
            '<div class="profile-security__badge" data-name="icon">' +
              '<span class="profile-security__icon" aria-hidden="true">' +
                '<i class="ic-v2-object-satisfied-fill"></i>' +
              '</span>' +
              '<p class="profile-security__grade stds-title8 fw-bold">양호</p>' +
            '</div>' +
            '<span class="profile-security__line" aria-hidden="true" data-name="element/div"></span>' +
            '<div class="profile-security__body">' +
              '<div class="profile-security__texts" data-name="상세내용">' +
                '<p class="profile-security__title stds-text4 fw-bold">보안이 안전해요.</p>' +
                '<p class="profile-security__desc stds-cap1 fw-medium">권장 보안 서비스를 설정하여<br />계정을 보호하고 있어요</p>' +
              '</div>' +
              '<button class="profile-security__more stds-cap1 fw-medium" type="button" data-name="btn_text">' +
                '자세히 보기<i class="ic-v2-control-long-arrow-right-line"></i>' +
              '</button>' +
            '</div>' +
          '</div>' +

        '</div>' +

        '<div class="profile-popup__menu" data-name="위계2">' +
          '<div v-for="(row, r) in menu" :key="r" class="profile-popup__menu-row">' +
            '<button v-for="item in row" :key="item.id" class="profile-menu-item" type="button" ' +
              'data-name="component/list/user_menu">' +
              '<i :class="item.icon"></i>' +
              '<span class="stds-cap1 fw-medium">{{ item.label }}</span>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</div>' +

    '</div>',
};
