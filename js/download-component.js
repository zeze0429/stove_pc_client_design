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
 *   progress  — 진행 중. run.phase: prepare(설치 준비 중) → install(설치 중) → verify(무결성 검사) → done,
 *               run.paused = 일시 정지 됨 (더미 진행은 DOWNLOAD_RUN · stepRuns)
 *   waiting   — 대기 중 (다운로드 · 취소 버튼)
 *   dlc       — 본 게임: DLC 설치 중 + "기본 게임 먼저 플레이"
 */

// ---- 진행 행 더미 데이터 (사용자 11-13 "프로그레스 바에도 그래프처럼 더미 데이터") ----
// 케이스 참고: Figma 클라이언트-Library-0.3.1 component/list/download 8:3463
//   설치 준비 중(8:3473) → 설치 중(8:3467) → 무결성검사(2952:17031) → 설치 완료, 일시 정지 됨(8:3470)
// 그래프와 같은 1초 주기로 진행되고, 다운로드 속도는 그래프의 "현재 다운로드 속도"를 그대로 쓴다.
// 설치 완료 뒤 잠깐 있다가 다시 설치 준비 중부터 반복(시연용).
var DOWNLOAD_RUN = {
  total: 599.04,     // MB
  files: 1234,       // 무결성 검사 파일 수
  prepareTicks: 3,   // 설치 준비 중 유지(초)
  installRate: 0.7,  // 설치 속도 = 다운로드 속도 × 0.7 (받은 만큼만 설치)
  doneTicks: 4,      // 설치 완료 표시 후 다시 시작까지(초)
};

function downloadNewRun() {
  return { phase: 'prepare', paused: false, ticks: 0, speed: 0, downloaded: 0, installed: 0, checked: 0, file: 1 };
}

// 999:30:10 형식 (시간은 자릿수 제한 없음)
function downloadClock(sec) {
  sec = Math.max(0, Math.ceil(sec));
  var h = Math.floor(sec / 3600), m = Math.floor(sec / 60) % 60, s = sec % 60;
  return h + ':' + (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
}
function downloadMB(v) { return v.toFixed(2) + 'MB'; }

var DOWNLOAD_QUEUE = [
  {
    id: 'yeogisa', status: 'dlc',
    dlc: [
      { id: 'yeogisa-alice', status: 'done' },
      { id: 'yeogisa-bunny', status: 'progress', run: downloadNewRun() }, // 더미 진행 — 설치 준비 중부터
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
    run: function () { return this.item.run || downloadNewRun(); },
    // 설치까지 95%, 무결성 검사로 나머지 5%
    percent: function () {
      var r = this.run, R = DOWNLOAD_RUN;
      if (r.phase === 'prepare') return 0;
      if (r.phase === 'verify') return Math.min(100, 95 + Math.floor(r.checked / R.files * 5));
      return Math.floor(r.installed / R.total * 95);
    },
    fileName: function () { return 'data' + (this.run.file < 10 ? '0' : '') + this.run.file + '.v'; },
    steps: function () {
      var r = this.run, R = DOWNLOAD_RUN, total = downloadMB(R.total);
      if (r.paused) return [{ label: '일시정지 됨', parts: [downloadMB(r.installed) + ' / ' + total] }];
      var dlDone = r.downloaded >= R.total;
      var line1 = dlDone
        ? { label: '파일 다운로드 완료', parts: [total + ' / ' + total] }
        : { label: '파일 다운로드 중', parts: [downloadMB(r.downloaded) + ' / ' + total, '약 ' + downloadClock((R.total - r.downloaded) / Math.max(r.speed, 1)) + ' 남음'] };
      if (r.phase === 'verify') {
        var mb = R.total * r.checked / R.files;
        return [line1, { label: '게임 파일 확인 및 무결성 검사 중', help: true,
          parts: [r.checked.toLocaleString() + '개 / 총' + R.files.toLocaleString() + '개 (' + downloadMB(mb) + ' /' + total + ')'] }];
      }
      return [line1, { label: '게임 설치 중', parts: [downloadMB(r.installed) + ' / ' + total,
        '약 ' + downloadClock((R.total - r.installed) / Math.max(r.speed * R.installRate, 1)) + ' 남음'] }];
    },
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
      // 진행 중 — 진행 바 420. 단계(run.phase)마다 머리글 · 상세 · 버튼이 바뀐다
      '<div v-else-if="item.status === \'progress\'" class="download-item__status download-item__progress" data-name="status">' +
        '<div class="download-progress" :class="{ \'is-paused\': run.paused, \'is-prepare\': run.phase === \'prepare\' }" data-name="component/progressbar/line">' +
          '<div class="download-progress__head">' +
            '<p v-if="run.phase === \'prepare\'" class="download-progress__step download-progress__prepare"><b>설치 준비 중</b></p>' +
            '<template v-else>' +
              '<span class="download-progress__percent">{{ percent }}%</span>' +
              '<div class="download-progress__steps" data-name="상세">' +
                '<p v-for="s in steps" :key="s.label" class="download-progress__step">' +
                  '<b>{{ s.label }}</b>' +
                  '<span v-for="(t, k) in s.parts" :key="k">{{ t }}</span>' +
                  '<i v-if="s.help" class="ic-v2-state-help-circle-fill download-progress__help" aria-hidden="true"></i>' +
                '</p>' +
              '</div>' +
            '</template>' +
          '</div>' +
          '<div class="download-progress__bar"><span :style="{ width: percent + \'%\' }"></span></div>' +
          '<p class="download-progress__file">{{ run.phase === \'verify\' ? \'확인 파일\' : \'설치 파일\' }} : {{ fileName }}</p>' +
        '</div>' +
        '<div class="download-item__btns" data-name="btn">' +
          '<template v-if="run.paused">' +
            '<button class="download-icon-btn" type="button" aria-label="이어받기" @click="run.paused = false"><i class="ic-v2-object-download-line"></i></button>' +
            '<button class="download-icon-btn" type="button" aria-label="취소"><i class="ic-v2-control-close-line"></i></button>' +
          '</template>' +
          '<template v-else>' +
            '<button class="download-icon-btn" type="button" aria-label="일시정지" @click="run.paused = true"><i class="ic-v2-media-av-pause-fill"></i></button>' +
            '<button v-if="run.phase === \'prepare\'" class="download-icon-btn" type="button" aria-label="취소"><i class="ic-v2-control-close-line"></i></button>' +
          '</template>' +
        '</div>' +
      '</div>' +
      // 본 게임 — DLC 설치 중
      '<div v-else-if="item.status === \'dlc\'" class="download-item__status download-item__dlc" data-name="status">' +
        '<span class="download-item__dlc-state" data-name="DLC 설치 중">' +
          '<svg class="download-item__dots" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><circle cx="2" cy="8" r="2"/><circle cx="8" cy="8" r="2"/><circle cx="14" cy="8" r="2"/></svg>' +
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
      this.stepRuns(20 + l.down * 40); // 수치의 "현재 다운로드 속도"(MB/s)
    },
    // 진행 행 더미 진행 — 1초에 한 번
    stepRuns: function (speed) {
      var R = DOWNLOAD_RUN;
      this.queue.forEach(function (g) {
        [g].concat(g.dlc || []).forEach(function (it) {
          var r = it.run;
          if (!r) return;
          if (it.status === 'done') { // 설치 완료 → 잠깐 뒤 다시 처음부터
            if (++r.ticks >= R.doneTicks) { it.run = downloadNewRun(); it.status = 'progress'; }
            return;
          }
          if (r.paused) return;
          r.speed = speed;
          if (r.phase === 'prepare') {
            if (++r.ticks >= R.prepareTicks) { r.phase = 'install'; r.ticks = 0; }
            return;
          }
          if (r.phase === 'install') {
            r.downloaded = Math.min(R.total, r.downloaded + speed);
            r.installed = Math.min(r.downloaded, r.installed + speed * R.installRate);
            r.file = 1 + Math.floor(r.installed / R.total * 11); // data01 ~ data12
            if (r.installed >= R.total) { r.phase = 'verify'; r.file = 1; }
            return;
          }
          // verify — 1초에 150~250개 확인
          r.checked = Math.min(R.files, r.checked + 150 + Math.floor(Math.random() * 100));
          r.file = 1 + Math.floor(r.checked / R.files * 11);
          if (r.checked >= R.files) { it.status = 'done'; r.ticks = 0; }
        });
      });
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
