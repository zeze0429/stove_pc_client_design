/**
 * 다운로드 관리 — 진입 화면 (Figma 클라이언트_v3.1 native_download_MD 67359:360700, 전체 플로우 67391:367350)
 * -------------------------------------------------------------
 * 시안은 참고만 (사용자 11-13): 페이지 타이틀은 공통(.client-page-title) 위치 · 크기 그대로,
 * 섹션 제목은 공통 .client-section-title.
 * 구성: 설치 중 / 대기 N → 성능 그래프 카드 → 다운로드 목록(component/list/download).
 * DLC는 본 게임 아래 들여쓰기 + 연결선(트리).
 * 게임 이름 · 썸네일은 js/game-catalog.js (라이브러리 보유게임에도 같은 게임이 있다).
 *
 * 항목 상태(status):
 *   done      — 설치 완료 (체크 아이콘 + 파란 글자)
 *   progress  — 다운로드 · 설치 진행 중 (퍼센트 · 상세 2줄 · 진행 바 · 설치 파일 + 일시정지)
 *   waiting   — 대기 중 (다운로드 · 취소 버튼)
 *   dlc       — 본 게임: DLC 설치 중 + "기본 게임 먼저 플레이"
 */

var DOWNLOAD_QUEUE = [
  {
    id: 'yeogisa', status: 'dlc',
    dlc: [
      { id: 'yeogisa-alice', status: 'done' },
      {
        id: 'yeogisa-bunny', status: 'progress', percent: 45, file: 'data06.v',
        steps: [
          { label: '파일 다운로드 중', size: '374.64MB / 599.04MB', left: '약 999:30:10 남음' },
          { label: '게임 설치 중', size: '374.64MB / 599.04MB', left: '약 999:30:10 남음' },
        ],
      },
      { id: 'yeogisa-gangsi', status: 'waiting' },
      { id: 'yeogisa-voice', status: 'waiting' },
    ],
  },
  { id: 'lovein-login', status: 'waiting', dlc: [{ id: 'lovein-login-asmr', status: 'waiting' }] },
  { id: 'secret-curriculum', status: 'waiting' },
];

// 성능 수치 (시안 값 그대로)
var DOWNLOAD_STATS = [
  { label: 'CPU 점유율', value: '10%' },
  { label: '디스크 읽기/쓰기 속도', value: '400bytes' },
  { label: '현재 다운로드 속도', value: '40bps' },
  { label: '평균 다운로드 속도', value: '30bps' },
  { label: 'RAM 점유량', value: '30bytes' },
];

var DownloadItem = {
  name: 'DownloadItem',
  props: { item: { type: Object, required: true } },
  computed: {
    game: function () { return gameInfo(this.item.id) || { name: this.item.id, thumb: '' }; },
  },
  template:
    '<div class="download-item" :class="\'is-\' + item.status" data-name="component/list/download">' +
      '<div class="download-item__info" data-name="info">' +
        '<img class="download-item__thumb" :src="game.thumb" alt="" />' +
        '<p class="download-item__name">{{ game.name }}</p>' +
      '</div>' +
      // 설치 완료
      '<div v-if="item.status === \'done\'" class="download-item__status download-item__done" data-name="진행상태">' +
        '<img src="assets/library/check_circle_color.svg" width="16" height="16" alt="" />' +
        '<span>설치 완료</span>' +
      '</div>' +
      // 진행 중 — 진행 바 420 + 일시정지
      '<div v-else-if="item.status === \'progress\'" class="download-item__status download-item__progress" data-name="status">' +
        '<div class="download-progress" data-name="component/progressbar/line">' +
          '<div class="download-progress__head">' +
            '<span class="download-progress__percent">{{ item.percent }}%</span>' +
            '<div class="download-progress__steps" data-name="상세">' +
              '<p v-for="s in item.steps" :key="s.label" class="download-progress__step">' +
                '<b>{{ s.label }}</b><span>{{ s.size }}</span><span>{{ s.left }}</span>' +
              '</p>' +
            '</div>' +
          '</div>' +
          '<div class="download-progress__bar"><span :style="{ width: item.percent + \'%\' }"></span></div>' +
          '<p class="download-progress__file">설치 파일 : {{ item.file }}</p>' +
        '</div>' +
        '<button class="download-icon-btn" type="button" aria-label="일시정지"><i class="ic-v2-media-av-pause-fill"></i></button>' +
      '</div>' +
      // 본 게임 — DLC 설치 중
      '<div v-else-if="item.status === \'dlc\'" class="download-item__status download-item__dlc" data-name="status">' +
        '<span class="download-item__dlc-state" data-name="DLC 설치 중">' +
          '<svg class="download-item__dots" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><circle cx="2" cy="8" r="2" opacity="0.5"/><circle cx="8" cy="8" r="2"/><circle cx="14" cy="8" r="2" opacity="0.3"/></svg>' +
          'DLC 설치 중' +
        '</span>' +
        '<button class="stds-button stds-button-blue stds-button-sm" type="button"><i class="ic-v2-media-av-play-round-fill"></i>기본 게임 먼저 플레이</button>' +
      '</div>' +
      // 대기 중
      '<div v-else class="download-item__status download-item__waiting" data-name="status">' +
        '<span class="download-item__state">대기 중</span>' +
        '<div class="download-item__btns" data-name="btn">' +
          '<button class="download-icon-btn" type="button" aria-label="다운로드" disabled><i class="ic-v2-object-download-line"></i></button>' +
          '<button class="download-icon-btn" type="button" aria-label="취소"><i class="ic-v2-control-close-line"></i></button>' +
        '</div>' +
      '</div>' +
    '</div>',
};

var DownloadMain = {
  name: 'DownloadMain',
  components: { DownloadItem: DownloadItem },
  data: function () {
    return { queue: DOWNLOAD_QUEUE, stats: DOWNLOAD_STATS };
  },
  computed: {
    // 설치 중 / 대기 개수 — 본 게임 + DLC 전부
    total: function () {
      return this.queue.reduce(function (n, g) { return n + 1 + (g.dlc ? g.dlc.length : 0); }, 0);
    },
  },
  template:
    '<div class="download" data-name="list">' +
      '<section class="download-section" data-name="설치 중">' +
        '<h2 class="client-section-title">설치 중 / 대기<span>{{ total }}</span></h2>' +
        // 성능 그래프 (Figma 그래프 · gragh) — 그래프 선은 시안 SVG 경로, 색은 토큰
        '<div class="download-perf" data-name="그래프">' +
          '<svg class="download-perf__graph" viewBox="0 0 960 116" preserveAspectRatio="none" aria-hidden="true">' +
            '<path class="download-perf__area" d="M884.89 14L960 81.9044V116H0V51.1624L24.7933 77.2465L80.3912 87.8358L138.843 77.2465L174.279 68.4897L214.215 51.1624L247.934 68.4897L300.496 75.197L390.744 40.388L478.016 75.197L534.572 92.9105L570.248 75.197L616.364 92.9105L672.469 43.1791L766.944 102.045L835.041 48.7403L884.89 14Z"/>' +
            '<path class="download-perf__line download-perf__line--download" d="M960 81.9044L884.89 14L835.041 48.7403L766.944 102.045L672.469 43.1791L616.364 92.9105L570.248 75.197L534.572 92.9105L478.017 75.197L390.744 40.388L300.496 75.197L247.934 68.4897L214.215 51.1624L174.279 68.4897L138.843 77.2465L80.3912 87.8358L24.7934 77.2465L0 51.1624"/>' +
            '<path class="download-perf__line download-perf__line--disk" d="M0 102L202.274 84.5L398.586 91.5L533.894 84.5L636.636 74.5L822.398 84.5L960 91.5"/>' +
          '</svg>' +
          '<div class="download-perf__info" data-name="info">' +
            '<div class="download-perf__title" data-name="title">' +
              '<p class="download-perf__name">성능</p>' +
              '<ul class="download-perf__legend">' +
                '<li>디스크 읽기/쓰기 속도<span class="is-disk"></span></li>' +
                '<li>현재 다운로드 속도<span class="is-download"></span></li>' +
              '</ul>' +
            '</div>' +
            '<dl class="download-perf__stats" data-name="list">' +
              '<div v-for="s in stats" :key="s.label"><dt>{{ s.label }}</dt><dd>{{ s.value }}</dd></div>' +
            '</dl>' +
          '</div>' +
          '<button class="download-icon-btn download-perf__setting" type="button" aria-label="다운로드 설정"><i class="ic-v2-navigation-setting-fill"></i></button>' +
        '</div>' +
        // 다운로드 목록 — 본 게임 하나 + 그 DLC(들여쓰기 · 연결선)가 한 묶음, 묶음 사이 12
        '<div class="download-list">' +
          '<div v-for="g in queue" :key="g.id" class="download-group">' +
            '<download-item :item="g"></download-item>' +
            '<div v-if="g.dlc && g.dlc.length" class="download-group__dlc">' +
              '<download-item v-for="d in g.dlc" :key="d.id" :item="d"></download-item>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>' +
    '</div>',
};

function mountDownloadMain(selector) {
  return Vue.createApp(DownloadMain).mount(selector);
}
