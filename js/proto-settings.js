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
  prBasic: true,      // PR영역 — 일반배너(같은 리소스로 1·2·3단) / 전략배너 중 하나만
  prStrategic: false,
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
var PROTO_PR_BASIC = [
  { id: 'lordnine', color: '46, 44, 41' },
  { id: 'epic7', color: '64, 88, 102' },
  { id: 'ghostrunner', color: '80, 32, 40' },
];
var PROTO_PR_STRATEGIC = { img: 'assets/pr/strategic-bg.jpg', color: '14, 45, 57' };

function protoPrEdges(rgb) {
  return '<span class="proto-pr__edge proto-pr__edge--l" style="--pr-color: ' + rgb + '"></span>' +
    '<span class="proto-pr__edge proto-pr__edge--r" style="--pr-color: ' + rgb + '"></span>';
}

function protoRenderPr(el, s) {
  var kind = s.prStrategic ? 'strategic' : s.prBasic ? 'basic-' + (s.prColumns || 3) : '';
  if (el.dataset.kind === kind) return;
  el.dataset.kind = kind;
  if (kind === 'strategic') {
    el.innerHTML = '<div class="proto-pr__strategic" style="background: rgb(' + PROTO_PR_STRATEGIC.color + ')">' +
      '<div class="proto-pr__visual"><img src="' + PROTO_PR_STRATEGIC.img + '" alt="" />' +
      protoPrEdges(PROTO_PR_STRATEGIC.color) + '</div></div>';
  } else if (kind) {
    el.innerHTML = PROTO_PR_BASIC.slice(0, s.prColumns || 3).map(function (b) {
      return '<div class="proto-pr__basic">' +
        '<img class="proto-pr__bg" src="assets/pr/' + b.id + '-bg.jpg" alt="" />' +
        protoPrEdges(b.color) +
        '<img class="proto-pr__logo" src="assets/pr/' + b.id + '-logo.png" alt="" />' +
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
