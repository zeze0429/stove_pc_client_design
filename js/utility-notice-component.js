/**
 * 공지사항 바 + 상세 팝업 — 공통 Vue 컴포넌트 (빌드 없이 CDN Vue로 동작)
 * -------------------------------------------------------------
 * Figma: layout/utility_bar/notice (3456:53635, 긴급 3456:53636)
 *        layout/utility_bar/notice/dialog (11364:271914)
 * 유틸리티 바 바로 아래에 붙는 띠. 콘텐츠를 가리는 게 아니라 그만큼
 * 밀어내려야 해서, 뜨고 질 때 자기 높이를 --utility-notice-h로 올려준다.
 *
 * 색상/치수는 css/utility-notice.css의 토큰만 참조한다.
 */

// 실제로는 API 응답. level: 'normal' | 'urgent'
var UTILITY_NOTICE = {
  level: 'normal',
  message: '스토브 PC 클라이언트 블라블라 공지사항 영역입니다.',
  title: '클라이언트 이용 가이드',
  body: [
    { text: '안녕하세요. 스토브 입니다.' },
    { text: '스토브 PC 클라이언트를 더욱 편리하게 이용하실 수 있도록 주요 기능과 설정 방법을 정리한 가이드를 준비했습니다.' },
    { text: '필요한 정보를 확인하시고 클라이언트를 이용해 보세요.' },
    { text: '▶ 클라이언트 이용 가이드 바로가기', link: true },
    { text: '고맙습니다.' },
  ],
};

var UtilityNotice = {
  props: { notice: { type: Object, required: true } },
  emits: ['close', 'open'],
  mounted: function () {
    this.syncHeight();
  },
  beforeUnmount: function () {
    document.documentElement.style.removeProperty('--utility-notice-h');
  },
  methods: {
    // 콘텐츠 영역이 이만큼 내려가야 한다 — 높이를 직접 재서 올려준다.
    syncHeight: function () {
      document.documentElement.style.setProperty('--utility-notice-h', this.$el.offsetHeight + 'px');
    },
  },
  template:
    '<div class="utility-notice" :class="{ \'utility-notice--urgent\': notice.level === \'urgent\' }" ' +
      '@click="$emit(\'open\')" data-name="layout/utility_bar/notice">' +
      '<span class="utility-notice__badge stds-cap2 fw-bold" data-name="component/badge/notice">공지</span>' +
      '<p class="utility-notice__message stds-cap2 fw-medium">{{ notice.message }}</p>' +
      '<button class="utility-notice__close" type="button" @click.stop="$emit(\'close\')" ' +
        'data-name="component/btn/close">' +
        '<span class="utility-notice__close-label">닫기</span>' +
        '<i class="ic-v2-control-close-line"></i>' +
      '</button>' +
    '</div>',
};

var NoticeDialog = {
  components: { LayerDialog: LayerDialog },
  props: { notice: { type: Object, required: true } },
  emits: ['close'],
  template:
    '<layer-dialog title="공지" width="56rem" @close="$emit(\'close\')" ' +
      'data-name="layout/utility_bar/notice/dialog">' +
      '<div class="notice-dialog">' +
        '<p class="notice-dialog__title stds-title7 fw-medium">{{ notice.title }}</p>' +
        '<div class="notice-dialog__box stds-text3 fw-regular" data-name="contents">' +
          '<p v-for="(line, i) in notice.body" :key="i" ' +
            ':class="{ \'notice-dialog__link\': line.link }">{{ line.text }}</p>' +
        '</div>' +
      '</div>' +
      '<template #footer>' +
        '<button class="notice-dialog__close-btn stds-btn2 fw-medium" type="button" ' +
          '@click="$emit(\'close\')">닫기</button>' +
      '</template>' +
    '</layer-dialog>',
};
