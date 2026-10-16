/**
 * STOVE 유틸리티 바 — 공통 Vue 컴포넌트 (빌드 없이 CDN Vue로 동작)
 * -------------------------------------------------------------
 * Figma: layout/utility_bar (3031:50773)
 * GNB(js/gnb-component.js)와 같은 방식 — 구조를 바꿀 일이 생기면
 * 여기 template 한 곳만 고치면 모든 페이지에 반영된다.
 *
 * 색상/치수는 css/utility-bar.css의 토큰만 참조하고 이 파일에는
 * 직접 넣지 않는다.
 */

/* 뒤로/앞으로 활성 여부 계산.
   브라우저는 "앞으로 갈 곳이 있는지"를 알려주지 않고, 페이지마다 문서가
   따로라 메모리로도 못 들고 있는다. 그래서 방문 순서를 직접 센다:
   각 히스토리 엔트리에 replaceState로 번호(idx)를 박아두고, 세션에는
   지금 번호(cur)와 지금까지 간 제일 끝 번호(max)를 남긴다.
   - 번호가 이미 박혀 있으면 = 뒤로/앞으로/새로고침으로 돌아온 엔트리
   - 번호가 없으면 = 새로 이동한 것 → 앞쪽 기록은 잘리므로 max를 지금으로 재설정
   뒤로는 앞에 뭔가 있을 때(idx > 0), 앞으로는 더 간 적이 있을 때(idx < max) 켜진다. */
function utilityBarNavState() {
  var state = history.state;
  var idx;
  if (state && typeof state.stoveNavIdx === 'number') {
    idx = state.stoveNavIdx;
  } else {
    var prev = parseInt(sessionStorage.getItem('stove-nav-cur'), 10);
    idx = isNaN(prev) ? 0 : prev + 1;
    history.replaceState({ stoveNavIdx: idx }, '');
    sessionStorage.setItem('stove-nav-max', String(idx));
  }
  sessionStorage.setItem('stove-nav-cur', String(idx));
  var max = parseInt(sessionStorage.getItem('stove-nav-max'), 10) || 0;
  return { canGoBack: idx > 0, canGoForward: idx < max };
}

// 아이콘 버튼 + 툴팁 한 벌을 매번 똑같이 쓰므로 템플릿 조각으로 뺐다.
function utilityBarTooltip(label) {
  return (
    '<span class="utility-bar-tooltip stds-cap1 fw-medium" aria-hidden="true">' +
      '<span class="utility-bar-tooltip__tail"></span>' +
      '<span class="utility-bar-tooltip__body">' + label + '</span>' +
    '</span>'
  );
}

var UtilityBarComponent = {
  components: {
    PcbangBenefitsDialog: PcbangBenefitsDialog,
    NotificationPopup: NotificationPopup,
  },
  data: function () {
    return {
      // 창 최대화 여부 — 최대화 상태에서는 "이전 크기로 복원" 버튼으로 바뀐다
      maximized: false,
      // 팝업을 띄우는 버튼들(스토브챗/알림/내 정보/PC방)은 팝업이 열려 있는
      // 동안 selected 상태로 남는다 — Figma 주석 "팝업 노출되는 아이콘 버튼에 사용"
      openPopupId: null,
      // 신규 내용 유무 — 한 번 열어보면 점이 사라진다
      newBadges: { chat: true, alarm: true, pcCafe: true },
      // 콘텐츠가 바 밑으로 지나가기 시작했는지 (배경 70% + 블러로 전환)
      scrolled: false,
      // 오갈 기록이 있는지 (첫 진입에서는 둘 다 꺼진 채로 시작).
      // 새로고침은 첫 화면에서도 쓸 수 있으니 항상 활성이다.
      canGoBack: false,
      canGoForward: false,
    };
  },
  mounted: function () {
    this.syncNav();
    // 뒤로가기로 돌아온 페이지는 bfcache에서 통째로 복원돼 mounted가 다시
    // 돌지 않는다 — 그 사이 달라진 앞으로가기 상태를 여기서 다시 맞춘다.
    this.onPageShow = this.syncNav.bind(this);
    window.addEventListener('pageshow', this.onPageShow);

    // 바는 .main 바깥에 떠 있어서 자기 스크롤이 없다 — 실제 스크롤 컨테이너인
    // .main을 직접 구독해야 상태를 알 수 있다.
    this.scroller = document.querySelector('.app > .main');
    if (!this.scroller) return;
    this.onScroll = function () { this.scrolled = this.scroller.scrollTop > 0; }.bind(this);
    this.scroller.addEventListener('scroll', this.onScroll, { passive: true });
    this.onScroll();
  },
  beforeUnmount: function () {
    window.removeEventListener('pageshow', this.onPageShow);
    if (this.scroller) this.scroller.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    syncNav: function () {
      var nav = utilityBarNavState();
      this.canGoBack = nav.canGoBack;
      this.canGoForward = nav.canGoForward;
    },
    goBack: function () { if (this.canGoBack) history.back(); },
    goForward: function () { if (this.canGoForward) history.forward(); },
    reload: function () { location.reload(); },
    toggleMaximize: function () { this.maximized = !this.maximized; },
    togglePopup: function (id) {
      this.openPopupId = this.openPopupId === id ? null : id;
      if (this.openPopupId && this.newBadges[id]) this.newBadges[id] = false;
    },
  },
  template:
    '<div class="utility-bar" :class="{ \'is-scrolled\': scrolled, \'has-popup\': openPopupId }" ' +
      'data-name="layout/utility_bar">' +

      '<div class="utility-bar__group utility-bar__left" data-name="left_btn">' +
        '<button class="utility-bar-icon-btn" type="button" aria-label="뒤로" @click="goBack" ' +
          ':class="{ \'is-disabled\': !canGoBack }" :aria-disabled="!canGoBack">' +
          '<i class="ic-v2-control-long-arrow-left-line"></i>' + utilityBarTooltip('뒤로') +
        '</button>' +
        '<button class="utility-bar-icon-btn" type="button" aria-label="앞으로" @click="goForward" ' +
          ':class="{ \'is-disabled\': !canGoForward }" :aria-disabled="!canGoForward">' +
          '<i class="ic-v2-control-long-arrow-right-line"></i>' + utilityBarTooltip('앞으로') +
        '</button>' +
        '<button class="utility-bar-icon-btn" type="button" aria-label="새로고침" @click="reload">' +
          '<i class="ic-v2-control-refresh-line"></i>' + utilityBarTooltip('새로고침') +
        '</button>' +
      '</div>' +

      '<div class="utility-bar__group utility-bar__right" data-name="right">' +

        '<button class="utility-bar-pc-cafe" type="button" aria-label="PC방 혜택 안내" ' +
          ':class="{ \'is-selected\': openPopupId === \'pcCafe\' }" @click="togglePopup(\'pcCafe\')" ' +
          'data-name="component/btn/pc_cafe">' +
          '<img class="utility-bar-pc-cafe__badge" src="assets/utility-bar/pc-cafe-on-ko.svg" alt="PC방 ON" />' +
          '<span v-if="newBadges.pcCafe" class="utility-bar-pc-cafe__new"></span>' +
          utilityBarTooltip('PC방 혜택 안내') +
        '</button>' +

        '<span class="utility-bar__divider" aria-hidden="true"></span>' +

        '<div class="utility-bar__group utility-bar__account" data-name="btn">' +
          '<button class="utility-bar-icon-btn utility-bar-icon-btn--lg" type="button" aria-label="스토브챗" ' +
            ':class="{ \'is-selected\': openPopupId === \'chat\' }" @click="togglePopup(\'chat\')">' +
            '<i class="ic-v2-community-comment-fill"></i>' +
            '<span v-if="newBadges.chat" class="utility-bar-icon-btn__new"></span>' +
            utilityBarTooltip('스토브챗') +
          '</button>' +
          // 알림 팝업은 센터가 아니라 이 버튼에 붙어서 뜬다 — 앵커가 버튼만
          // 감싸고 있어서 팝업의 right:0이 곧 버튼 오른쪽 끝 맞춤이 된다.
          '<span class="utility-bar__popup-anchor">' +
            '<button class="utility-bar-icon-btn utility-bar-icon-btn--lg" type="button" aria-label="알림" ' +
              ':class="{ \'is-selected\': openPopupId === \'alarm\' }" @click="togglePopup(\'alarm\')">' +
              '<i class="ic-v2-navigation-alarm-fill"></i>' +
              '<span v-if="newBadges.alarm" class="utility-bar-icon-btn__new"></span>' +
              utilityBarTooltip('알림') +
            '</button>' +
            '<notification-popup v-if="openPopupId === \'alarm\'" @close="openPopupId = null" />' +
          '</span>' +
          '<button class="utility-bar-profile" type="button" aria-label="내 정보" ' +
            ':class="{ \'is-selected\': openPopupId === \'profile\' }" @click="togglePopup(\'profile\')" ' +
            'data-name="component/btn/profile">' +
            '<img class="utility-bar-profile__thumb" src="assets/utility-bar/profile-thumb.png" alt="" />' +
            utilityBarTooltip('내 정보') +
          '</button>' +
        '</div>' +

        '<span class="utility-bar__divider" aria-hidden="true"></span>' +

        '<div class="utility-bar__group utility-bar__window" data-name="btn">' +
          '<button class="utility-bar-icon-btn" type="button" aria-label="최소화">' +
            '<i class="ic-v2-control-minimize-line"></i>' + utilityBarTooltip('최소화') +
          '</button>' +
          '<button class="utility-bar-icon-btn" type="button" @click="toggleMaximize" ' +
            ':aria-label="maximized ? \'이전 크기로 복원\' : \'최대화\'">' +
            '<i :class="maximized ? \'ic-v2-control-recover-line\' : \'ic-v2-control-maximize-line\'"></i>' +
            '<span class="utility-bar-tooltip stds-cap1 fw-medium" aria-hidden="true">' +
              '<span class="utility-bar-tooltip__tail"></span>' +
              '<span class="utility-bar-tooltip__body">{{ maximized ? \'이전 크기로 복원\' : \'최대화\' }}</span>' +
            '</span>' +
          '</button>' +
          '<button class="utility-bar-icon-btn" type="button" aria-label="닫기">' +
            '<i class="ic-v2-control-close-line"></i>' + utilityBarTooltip('닫기') +
          '</button>' +
        '</div>' +

      '</div>' +
    '</div>' +

    // PC방 혜택은 바에 붙는 드롭다운이 아니라 창 전체를 덮는 레이어 팝업이라
    // 바 밖(루트 형제)에 둔다.
    '<pcbang-benefits-dialog v-if="openPopupId === \'pcCafe\'" @close="openPopupId = null" />',
};

function mountUtilityBar(selector) {
  return Vue.createApp(UtilityBarComponent).mount(selector);
}
