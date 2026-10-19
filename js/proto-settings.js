/**
 * 프로토타입 보기 옵션 (Figma Make 레퍼런스 quartz-unique-70171087.figma.site 의
 * 시작 버튼 패널과 동일)
 * -------------------------------------------------------------
 * 데스크톱 미리보기(main.html)의 패널에서 바꾸고, iframe 안의 클라이언트
 * 페이지들이 읽어서 적용한다. 클라이언트는 iframe 안에서 페이지를 옮겨
 * 다니므로 값은 localStorage에 두고 storage 이벤트로 실시간 반영한다.
 * 디자인 스펙이 아니라 시안 확인용 장치다.
 *
 * <head>에서 불러야 한다 — 테마를 첫 페인트 전에 정해야 깜빡이지 않는다.
 */
var PROTO_SETTINGS_KEY = 'stove-proto-settings';

// 레퍼런스 패널의 초기 상태 그대로
var PROTO_SETTINGS_DEFAULTS = {
  theme: 'dark',
  grid: false,
  pr: true,
  notice: false,
  noticeUrgent: false,
  updateBtn: true,
  download: false,
  downloadError: false,
  studio: true,
  ad: true,
  favorites: true,
};

function protoSettingsRead() {
  var saved = {};
  try {
    saved = JSON.parse(localStorage.getItem(PROTO_SETTINGS_KEY) || '{}') || {};
  } catch (e) {
    // 저장소를 못 쓰는 환경(시크릿 창 등)이면 기본값으로 동작
  }
  return Object.assign({}, PROTO_SETTINGS_DEFAULTS, saved);
}

function protoSettingsWrite(patch) {
  var next = Object.assign(protoSettingsRead(), patch);
  try {
    localStorage.setItem(PROTO_SETTINGS_KEY, JSON.stringify(next));
  } catch (e) {
    // 저장은 못 해도 지금 문서에는 반영되도록 아래 이벤트는 그대로 보낸다
  }
  // storage 이벤트는 "다른" 문서에만 가므로 같은 문서의 구독자에게는 직접 알린다
  window.dispatchEvent(new CustomEvent('proto-settings', { detail: next }));
  return next;
}

function protoSettingsSubscribe(fn) {
  window.addEventListener('proto-settings', function (e) { fn(e.detail); });
  window.addEventListener('storage', function (e) {
    if (e.key === PROTO_SETTINGS_KEY) fn(protoSettingsRead());
  });
}

// 클라이언트 페이지 전용 — 문서 단위 옵션(테마·그리드)을 <html>에 바로 건다.
// 컴포넌트 단위 옵션(GNB·공지 등)은 각 Vue 컴포넌트가 직접 구독한다.
function protoApplyDocument(s) {
  document.documentElement.setAttribute('data-theme', s.theme);
  document.documentElement.classList.toggle('proto-grid-on', !!s.grid);
  document.documentElement.classList.toggle('proto-pr-on', !!s.pr);
}

// 라이브 웹(iframe)의 테마는 페이지를 새로 열어야 바뀐다.
// 웹은 COLOR_MODE 쿠키가 있으면 시스템 설정(=iframe color-scheme)보다 그걸
// 먼저 따르고, 로드할 때마다 그 쿠키를 다시 써 둔다. 그래서 iframe은
// credentialless로 띄워 실제 쿠키를 못 보게 하는데, 그 임시 쿠키 저장소도
// 최상위 페이지가 살아 있는 동안은 유지된다 — iframe만 다시 불러오면 첫
// 로드 때 써 둔 테마로 다시 고정된다. 테마가 바뀌면 최상위 페이지째 새로
// 연다(main.html 안이면 main.html이 자기 쪽에서 처리한다).
function protoIsTopLevel() {
  try { return window.top === window; } catch (e) { return false; }
}

// 12컬럼 그리드 오버레이(콘텐츠 영역 위 가이드) + 창 하단 PR영역 자리
function protoMountLayout() {
  var app = document.querySelector('.app');
  if (!app || app.querySelector('.proto-grid')) return;
  var grid = document.createElement('div');
  grid.className = 'proto-grid';
  grid.setAttribute('aria-hidden', 'true');
  for (var i = 0; i < 12; i++) grid.appendChild(document.createElement('span'));
  app.appendChild(grid);

  var pr = document.createElement('div');
  pr.className = 'proto-pr stds-text3';
  pr.textContent = 'PR영역';
  app.insertAdjacentElement('afterend', pr);
}

// 클라이언트 페이지가 data-client를 달고 불렀을 때만 스스로 적용한다 —
// 미리보기 틀(main.html)은 패널만 그리고 자기 테마는 바꾸지 않는다.
(function () {
  var me = document.currentScript;
  if (!me || !me.hasAttribute('data-client')) return;
  var theme = protoSettingsRead().theme;
  protoApplyDocument(protoSettingsRead());
  protoSettingsSubscribe(function (s) {
    protoApplyDocument(s);
    if (s.theme !== theme && protoIsTopLevel()) location.reload();
    theme = s.theme;
  });
  document.addEventListener('DOMContentLoaded', protoMountLayout);
})();
