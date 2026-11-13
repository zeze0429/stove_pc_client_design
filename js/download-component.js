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

// 성능 그래프 더미 데이터 (사용자 11-13 "그래프 더미 데이터로 움직이게")
// 1초마다 새 값이 오른쪽에 붙고 그래프가 왼쪽으로 흘러간다. 수치 5개도 같은 값으로 갱신.
// 범위는 자릿수가 바뀌지 않게 잡았다(수치 폭이 흔들리지 않게).
var DOWNLOAD_GRAPH = {
  width: 960, height: 116, // SVG viewBox (preserveAspectRatio none — 카드 폭에 맞춰 늘어남)
  step: 40,                // 점 간격
  tick: 1000,              // 새 값 주기(ms)
  top: 14, bottom: 110,    // 다운로드 선이 오가는 높이
  diskTop: 70,             // 디스크 선은 아래쪽에서 낮게
};

// 이전 값에서 조금씩 움직이는 무작위 값 (경계에서 튕김)
function downloadWalk(prev, min, max, jump) {
  var v = prev + (Math.random() - 0.5) * 2 * jump;
  if (v < min) v = min + (min - v);
  if (v > max) v = max - (v - max);
  return Math.min(max, Math.max(min, v));
}

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
    return {
      queue: DOWNLOAD_QUEUE,
      live: { cpu: 14, disk: 0.4, down: 0.6, avg: 0.55, ram: 1.32 }, // 수치 표시용 최신 값
    };
  },
  computed: {
    // 설치 중 / 대기 개수 — 본 게임 + DLC 전부
    total: function () {
      return this.queue.reduce(function (n, g) { return n + 1 + (g.dlc ? g.dlc.length : 0); }, 0);
    },
    // 다운로드 0~1 → 20~60MB/s, 디스크 0~1 → 120~600MB/s
    stats: function () {
      var l = this.live;
      return [
        { label: 'CPU 점유율', value: Math.round(l.cpu) + '%' },
        { label: '디스크 읽기/쓰기 속도', value: (120 + l.disk * 480).toFixed(1) + 'MB/s' },
        { label: '현재 다운로드 속도', value: (20 + l.down * 40).toFixed(1) + 'MB/s' },
        { label: '평균 다운로드 속도', value: (20 + l.avg * 40).toFixed(1) + 'MB/s' },
        { label: 'RAM 점유량', value: l.ram.toFixed(2) + 'GB' },
      ];
    },
  },
  mounted: function () {
    var G = DOWNLOAD_GRAPH;
    var n = Math.ceil(G.width / G.step) + 2; // 흘러가는 동안 양 끝이 비지 않게 한 칸 더
    var down = [], disk = [], d = 0.6, k = 0.4;
    for (var i = 0; i < n; i++) {
      d = downloadWalk(d, 0, 1, 0.28); k = downloadWalk(k, 0, 1, 0.15);
      down.push(d); disk.push(k);
    }
    this.graph = { down: down, disk: disk, last: 0, raf: 0 };
    this.reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.pushStats();
    this.drawGraph(0);
    this.graph.raf = requestAnimationFrame(this.frame);
  },
  beforeUnmount: function () {
    if (this.graph) cancelAnimationFrame(this.graph.raf);
  },
  methods: {
    // 매 프레임: tick마다 새 값 추가, 그 사이는 한 칸 간격만큼 왼쪽으로 부드럽게 이동
    frame: function (now) {
      var g = this.graph, G = DOWNLOAD_GRAPH;
      if (!g.last) g.last = now;
      var p = (now - g.last) / G.tick;
      if (p > 3) { p = 1; g.last = now - G.tick; } // 탭이 오래 숨겨졌다 돌아오면 한 칸만
      if (p >= 1) {
        g.down.shift(); g.disk.shift();
        g.down.push(downloadWalk(g.down[g.down.length - 1], 0, 1, 0.28));
        g.disk.push(downloadWalk(g.disk[g.disk.length - 1], 0, 1, 0.15));
        g.last += G.tick;
        p -= 1;
        this.pushStats();
      }
      this.drawGraph(this.reduceMotion ? 0 : p);
      g.raf = requestAnimationFrame(this.frame);
    },
    pushStats: function () {
      var g = this.graph, l = this.live;
      var last = g.down.length - 2; // 오른쪽 끝(화면에 보이는 마지막 점)
      var visible = g.down.slice(1, last + 1);
      l.down = g.down[last];
      l.disk = g.disk[last];
      l.avg = visible.reduce(function (s, v) { return s + v; }, 0) / visible.length;
      l.cpu = downloadWalk(l.cpu, 10, 28, 2.5);
      l.ram = downloadWalk(l.ram, 1.1, 1.6, 0.03);
    },
    drawGraph: function (p) {
      var G = DOWNLOAD_GRAPH, g = this.graph;
      var x0 = -(1 + p) * G.step; // 첫 점은 화면 왼쪽 밖
      function pts(arr, top) {
        return arr.map(function (v, i) {
          return (x0 + i * G.step).toFixed(2) + ' ' + (G.bottom - v * (G.bottom - top)).toFixed(2);
        });
      }
      var down = pts(g.down, G.top);
      var line = 'M' + down.join('L');
      var lastX = (x0 + (g.down.length - 1) * G.step).toFixed(2);
      this.$refs.lineDown.setAttribute('d', line);
      this.$refs.area.setAttribute('d', line + 'L' + lastX + ' ' + G.height + 'L' + x0.toFixed(2) + ' ' + G.height + 'Z');
      this.$refs.lineDisk.setAttribute('d', 'M' + pts(g.disk, G.diskTop).join('L'));
    },
  },
  template:
    '<div class="download" data-name="list">' +
      '<section class="download-section" data-name="설치 중">' +
        '<h2 class="client-section-title">설치 중 / 대기<span>{{ total }}</span></h2>' +
        // 성능 그래프 (Figma 그래프 · gragh) — 더미 데이터로 계속 흘러간다(경로는 mounted · drawGraph가 그림), 색은 토큰
        '<div class="download-perf" data-name="그래프">' +
          '<svg class="download-perf__graph" viewBox="0 0 960 116" preserveAspectRatio="none" aria-hidden="true">' +
            '<path ref="area" class="download-perf__area"/>' +
            '<path ref="lineDown" class="download-perf__line download-perf__line--download"/>' +
            '<path ref="lineDisk" class="download-perf__line download-perf__line--disk"/>' +
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
