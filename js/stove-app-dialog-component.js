/**
 * 스토브 앱 다운로드 팝업 — 공통 Vue 컴포넌트 (빌드 없이 CDN Vue로 동작)
 * -------------------------------------------------------------
 * Figma: Dialog (3512:50462)
 * 내 정보 팝업(js/profile-popup-component.js)의 "스토브앱" 메뉴가 띄우는
 * 센터 레이어 팝업. 딤·헤더·닫기는 공용 셸(layer-dialog)이 담당하고
 * 여기서는 본문만 정의한다.
 *
 * 색상/치수는 css/stove-app-dialog.css의 토큰만 참조한다.
 */
var StoveAppDialog = {
  components: { LayerDialog: LayerDialog },
  emits: ['close'],
  template:
    '<layer-dialog title="스토브 앱 다운로드" width="40rem" @close="$emit(\'close\')">' +
      '<div class="stove-app">' +

        '<div class="stove-app__main" data-name="comtents">' +
          '<div class="stove-app__qr" data-name="QR">' +
            '<img src="assets/stove-app/qr-live.png" alt="스토브 앱 다운로드 QR 코드" />' +
          '</div>' +

          '<div class="stove-app__text" data-name="text">' +
            '<div>' +
              '<p class="stove-app__lead stds-text2 fw-regular">내 활동을 모아, 내가 좋아할 것을 추천!</p>' +
              '<p class="stove-app__title stds-title6 fw-bold">가장 즐거운 발견, 스토브 앱</p>' +
            '</div>' +
            '<p class="stove-app__desc stds-cap1 fw-regular">' +
              '스토브앱을 통해<br />QR로그인, 인증기, 쿠폰, 플레이크, 커뮤니티와 라운지 등의<br />' +
              '스토브 서비스를 이용할 수 있습니다.' +
            '</p>' +
          '</div>' +
        '</div>' +

        '<div class="stove-app__stores" data-name="app store">' +
          '<span class="stove-app__store">' +
            '<span class="stove-app__store-logo"><img src="assets/stove-app/ic-apple.svg" alt="" /></span>' +
            '<img class="stove-app__store-word" src="assets/stove-app/wordmark-appstore.svg" alt="App Store" />' +
          '</span>' +
          '<span class="stove-app__stores-div" aria-hidden="true"></span>' +
          '<span class="stove-app__store">' +
            '<span class="stove-app__store-logo"><img src="assets/stove-app/ic-google-play.svg" alt="" /></span>' +
            '<img class="stove-app__store-word" src="assets/stove-app/wordmark-googleplay.svg" alt="Google Play" />' +
          '</span>' +
        '</div>' +

      '</div>' +
    '</layer-dialog>',
};
