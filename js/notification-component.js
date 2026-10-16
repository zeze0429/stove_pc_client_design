/**
 * 알림 팝업 — 공통 Vue 컴포넌트 (빌드 없이 CDN Vue로 동작)
 * -------------------------------------------------------------
 * Figma: Notification (3502:55539)
 * 유틸리티 바의 알림 버튼이 띄운다. 센터 레이어 팝업(layer-dialog)과 달리
 * 딤이 없고 버튼에 붙어서 뜨기 때문에 공용 셸을 쓰지 않는다.
 *
 * 색상/치수는 css/notification.css의 토큰만 참조한다.
 */

// 실제로는 API 응답.
// bold는 선택 — 사람이 보낸 알림만 앞에 닉네임이 굵게 붙고, 상품 알림은
// 본문만 있다. 상품 알림은 프로필 사진 대신 아이콘 썸네일을 쓴다.
var NOTIFICATION_ITEMS = [
  {
    id: 1, unread: true, time: '1시간 전',
    bold: '봉말이', text: '님이 회원님의 댓글을 좋아합니다."ㅋㅋㅋㅋㅋㅋ 봉말이 며싸리야!"',
  },
  {
    id: 2, unread: false, time: '1시간 전',
    bold: '봉말이', text: '님이 회원님의 댓글에 답글을 등록하였습니다."@휴먼메이드 비밀입니다"',
  },
  {
    id: 3, unread: false, time: '11시간 전', icon: 'ic-v2-object-game-fill',
    text: '구매한 상품이 업데이트 되었습니다. "플라워 서바이버스"',
  },
  {
    id: 4, unread: false, time: '11시간 전', icon: 'ic-v2-object-game-fill',
    text: '보유한 상품의 DLC가 출시되었습니다. "플라워 서바이버스"',
  },
  {
    id: 5, unread: false, time: '16시간 전', icon: 'ic-v2-object-game-fill',
    text: '구매한 상품이 업데이트 되었습니다. "좀비스쿨"',
  },
  {
    id: 6, unread: false, time: '18시간 전', icon: 'ic-v2-object-game-fill',
    text: '구매한 상품이 업데이트 되었습니다. "비둘기의 모험(Pigeon\'s Adventure)"',
  },
];

var NotificationPopup = {
  emits: ['close'],
  data: function () {
    return { items: NOTIFICATION_ITEMS, avatar: 'assets/notification/avatar-sample.jpg' };
  },
  computed: {
    unreadCount: function () {
      return this.items.filter(function (it) { return it.unread; }).length;
    },
    // Figma 목업이 99+ — 두 자리를 넘으면 줄여서 보여준다
    unreadLabel: function () {
      return this.unreadCount > 99 ? '99+' : String(this.unreadCount);
    },
  },
  mounted: function () {
    this.onKeydown = function (e) { if (e.key === 'Escape') this.$emit('close'); }.bind(this);
    document.addEventListener('keydown', this.onKeydown);
    // 바깥을 누르면 닫는다. 알림 버튼도 앵커 안이라 여기서는 무시되고,
    // 버튼 자신의 토글이 닫는 걸 맡는다(두 번 처리되지 않게).
    this.onDocClick = function (e) {
      if (!e.target.closest('.utility-bar__popup-anchor')) this.$emit('close');
    }.bind(this);
    document.addEventListener('click', this.onDocClick);
  },
  beforeUnmount: function () {
    document.removeEventListener('keydown', this.onKeydown);
    document.removeEventListener('click', this.onDocClick);
  },
  methods: {
    markAllRead: function () {
      this.items.forEach(function (it) { it.unread = false; });
    },
  },
  template:
    '<div class="notification-popup" role="dialog" aria-label="알림" data-name="Notification">' +

      '<div class="notification-popup__header" data-name="Layer Title">' +
        '<p class="notification-popup__title">' +
          '<span class="notification-popup__title-label stds-title6 fw-bold">알림</span>' +
          '<span v-if="unreadCount" class="notification-popup__count stds-title7 fw-bold">{{ unreadLabel }}</span>' +
        '</p>' +
        '<div class="notification-popup__actions" data-name="Text Button">' +
          '<button class="notification-popup__action stds-text3 fw-bold" type="button" ' +
            ':disabled="!unreadCount" @click="markAllRead">' +
            '모두 읽음<i class="ic-v2-control-check-circle-line"></i>' +
          '</button>' +
          '<button class="notification-popup__action stds-text3 fw-bold" type="button">' +
            '전체 보기<i class="ic-v2-control-long-arrow-right-line"></i>' +
          '</button>' +
        '</div>' +
      '</div>' +

      '<div v-if="items.length" class="notification-popup__list" data-name="Card">' +
        '<button v-for="item in items" :key="item.id" class="notification-item" type="button" ' +
          ':class="{ \'notification-item--unread\': item.unread }" ' +
          'data-name="Notification List Item">' +
          '<span v-if="item.icon" class="notification-item__avatar notification-item__avatar--icon" aria-hidden="true">' +
            '<i :class="item.icon"></i>' +
          '</span>' +
          '<img v-else class="notification-item__avatar" :src="avatar" alt="" />' +
          '<span class="notification-item__text">' +
            '<span class="notification-item__message stds-text4 fw-regular">' +
              '<b v-if="item.bold">{{ item.bold }}</b>{{ item.text }}' +
            '</span>' +
            '<span class="notification-item__time stds-cap1 fw-regular">{{ item.time }}</span>' +
          '</span>' +
        '</button>' +
      '</div>' +

      '<p v-else class="notification-popup__empty stds-cap1 fw-regular">알림 메시지가 없습니다.</p>' +

    '</div>',
};
