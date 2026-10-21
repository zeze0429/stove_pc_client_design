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

// 레퍼런스 패널의 초기 상태 기준 — 업데이트 버튼·스튜디오 테스트는 끈 상태로 바꿈
var PROTO_SETTINGS_DEFAULTS = {
  theme: 'dark',
  grid: false,
  pr: true,
  prBasic: false,     // PR영역 — 일반배너(같은 리소스로 1·2·3단) / 전략배너 중 하나만 (기본 전략배너)
  prStrategic: true,
  prColumns: 3,       // 일반배너 단 수 (1 · 2 · 3)
  notice: false,
  noticeUrgent: false,
  updateBtn: false,
  download: false,
  downloadStartedAt: 0, // 다운로드 관리를 켠 시각 — GNB 진행 애니메이션이 여기서부터 이어진다
  downloadError: false,
  studio: false,
  ad: true,
  favorites: true,
  rightPanel: true,  // 클라이언트 레이아웃 — 우측패널 280 (다운로드 관리·스튜디오, 라이브러리는 항상)
  libraryQuick: true, // 라이브러리 설정 — 빠른 실행 영역 노출 (사용자 설정으로 숨길 수 있음)
  menuNew: false,   // 메뉴 강조 — 라운지 NEW 표시
  menuBadge: true,  // 메뉴 강조 — 라운지 "오늘의 1등" 뱃지 (기본 켜짐)
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
  document.documentElement.classList.toggle('proto-right-panel-on', !!s.rightPanel);
  document.documentElement.classList.toggle('proto-library-quick-off', !s.libraryQuick);
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
  pr.className = 'proto-pr';
  app.insertAdjacentElement('afterend', pr);
  protoRenderPr(pr, protoSettingsRead());
  protoSettingsSubscribe(function (s) { protoRenderPr(pr, s); });
}

// ---- PR영역 배너 (Figma NEW 클라이언트 Library · PR 5215:3267) ----------
// 일반배너: 배경(1920 x 80, 가운데 기준) + 가운데 로고(428 x 80) + 양끝 120
//   그라데이션(배너 고유색 → 투명). 칸 폭이 달라도 같은 리소스가 가운데
//   기준으로 잘려 1·2·3단 어디에 놓여도 맞는다.
// 전략배너: 1920 x 80 이미지 한 장을 가운데에 두고, 창이 1920보다 넓으면
//   이미지 양끝 120 그라데이션이 배경색으로 자연스럽게 이어진다.
//   배경색 = 그라데이션 색 (배너마다 하나의 색).
// 리소스는 1.5배수로 받는다 — 배경·전략 이미지 2880 x 120, 로고 642 x 120.
//   표시 크기는 CSS가 1배(1920 x 80 / 428 x 80)로 고정한다.
// 파일명은 디자이너가 정의한 리소스 이름 그대로 쓴다 (assets/pr/).
//   이름 끝 6자리 hex = 배경·그라데이션 공통 색 — 코드가 파일명에서 읽는다.
var PROTO_PR_DIR = 'assets/pr/';
var PROTO_PR_BASIC = [
  { bg: 'Client3.0_PR영역_기본배너_02_로드나인_2E2C29.png', logo: 'Client3.0_PR영역_기본배너_01_로드나인.png' },
  { bg: 'Client3.0_PR영역_기본배너_02_에픽세븐_405866.png', logo: 'Client3.0_PR영역_기본배너_01_에픽세븐.png' },
  { bg: 'Client3.0_PR영역_기본배너_02_고스트러너_502028.png', logo: 'Client3.0_PR영역_기본배너_01_고스트러너.png' },
];
var PROTO_PR_STRATEGIC = 'Client3.0_PR영역_전략배너_이용가이드_KO_371C1C.png'; // 클라이언트_v3.1 67751:158533

function protoPrColor(file) {
  var m = /_([0-9A-Fa-f]{6})\.[a-z]+$/.exec(file);
  return m ? '#' + m[1] : 'transparent';
}

function protoPrEdges(color) {
  return '<span class="proto-pr__edge proto-pr__edge--l" style="--pr-color: ' + color + '"></span>' +
    '<span class="proto-pr__edge proto-pr__edge--r" style="--pr-color: ' + color + '"></span>';
}

function protoRenderPr(el, s) {
  var kind = s.prStrategic ? 'strategic' : s.prBasic ? 'basic-' + (s.prColumns || 3) : '';
  if (el.dataset.kind === kind) return;
  el.dataset.kind = kind;
  if (kind === 'strategic') {
    var color = protoPrColor(PROTO_PR_STRATEGIC);
    el.innerHTML = '<div class="proto-pr__strategic" style="background: ' + color + '">' +
      '<div class="proto-pr__visual"><img src="' + PROTO_PR_DIR + PROTO_PR_STRATEGIC + '" alt="" />' +
      protoPrEdges(color) + '</div></div>';
  } else if (kind) {
    el.innerHTML = PROTO_PR_BASIC.slice(0, s.prColumns || 3).map(function (b) {
      return '<div class="proto-pr__basic">' +
        '<img class="proto-pr__bg" src="' + PROTO_PR_DIR + b.bg + '" alt="" />' +
        protoPrEdges(protoPrColor(b.bg)) +
        '<img class="proto-pr__logo" src="' + PROTO_PR_DIR + b.logo + '" alt="" />' +
      '</div>';
    }).join('');
  } else {
    el.innerHTML = '';
  }
}

// 클라이언트 페이지가 data-client를 달고 불렀을 때만 스스로 적용한다 —
// 미리보기 틀(main.html)은 패널만 그리고 자기 테마는 바꾸지 않는다.
(function () {
  var me = document.currentScript;
  if (!me || !me.hasAttribute('data-client')) return;
  protoApplyDocument(protoSettingsRead());
  protoSettingsSubscribe(protoApplyDocument);
  document.addEventListener('DOMContentLoaded', protoMountLayout);
})();
