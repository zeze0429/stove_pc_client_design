/**
 * 다운로드 관리 — 진입 화면 (Figma 클라이언트_v3.1 native_download_MD 67359:360700, 전체 플로우 67391:367350)
 * -------------------------------------------------------------
 * 시안은 참고만 (사용자 11-13): 페이지 타이틀은 공통(.client-page-title) 위치 · 크기 그대로,
 * 섹션 제목은 공통 .client-section-title.
 * 구성: 설치 중 / 대기 N → 성능 그래프 카드 → 다운로드 목록(component/list/download).
 * DLC는 본 게임 아래 들여쓰기 + 연결선(트리).
 * 게임 이름 · 썸네일은 js/game-catalog.js (라이브러리 보유게임에도 같은 게임이 있다).
 *
 * 진행 순서 (사용자 11-13 "나머지 DLC 설치 전에 기본 게임 먼저, 쭉 이어붙여"):
 *   큐를 위에서부터 하나씩 — 기본 게임 → 그 DLC들(트리) → 다음 게임 … 한 번에 하나만 진행.
 *   기본 게임과 트리의 DLC가 전부 설치되어야 '플레이 가능' 섹션(상단)으로 옮긴다 — 거기서는 트리 없이 1레벨 행.
 *   (Figma 클라이언트_v3.1 "기본게임, DLC 플레이 정책 개선" 68141:884842)
 *
 * 항목 상태(status):
 *   done      — 설치 완료 (체크 아이콘 + 파란 글자)
 *   progress  — 진행 중. run.phase: prepare(설치 준비 중) → install(설치 중) → verify(무결성 검사) → done,
 *               run.paused = 일시 정지 됨 (더미 진행은 DOWNLOAD_RUN · stepRuns)
 *   waiting   — 대기 중 (다운로드 · 취소 버튼)
 *   dlc       — 본 게임: 자기 설치는 끝, 트리의 DLC 설치 중 + "기본 게임 먼저 플레이"
 *   ready     — 플레이 가능 섹션 행: 용량 + 플레이(본 게임) / 기본 게임에서 플레이(DLC) + 제거
 */

// ---- 진행 행 더미 데이터 (사용자 11-13 "프로그레스 바에도 그래프처럼 더미 데이터") ----
// 케이스 참고: Figma 클라이언트-Library-0.3.1 component/list/download 8:3463
//   설치 준비 중(8:3473) → 설치 중(8:3467) → 무결성검사(2952:17031) → 설치 완료, 일시 정지 됨(8:3470)
// 그래프와 같은 1초 주기로 진행되고, 다운로드 속도는 그래프의 "현재 다운로드 속도"를 그대로 쓴다.
// 설치 완료 뒤 잠깐 있다가 다시 설치 준비 중부터 반복(시연용).
var DOWNLOAD_RUN = {
  prepareTicks: 2,   // 설치 준비 중 유지(초)
  speedScale: 3,     // 진행은 그래프 속도의 3배로 — 시연이 오래 걸리지 않게 러프하게 (사용자 11-13)
  installRate: 0.7,  // 설치 속도 = 다운로드 속도 × 0.7 (받은 만큼만 설치)
  verifyRate: 450,   // 무결성 검사 1초에 약 450개(±100) — 용량에 비례한 파일 수라 큰 게임은 길고 DLC는 짧게
  moveTicks: 2,      // 묶음(기본 게임 + DLC) 마지막 설치 완료를 잠깐 보여 준 뒤 플레이 가능으로 옮기기까지(초)
  resetTicks: 8,     // 큐가 다 비면(빈 상태) 이만큼 보여 주고 처음부터 다시(시연용)
};

// 용량(MB)마다 진행 — 무결성 검사 파일 수는 용량에 비례(599.04MB = 1,234개, Figma 케이스 값)
function downloadNewRun(size) {
  size = size || 599.04;
  return { phase: 'prepare', paused: false, ticks: 0, speed: 0, downloaded: 0, installed: 0, checked: 0, file: 1,
    total: size, files: Math.max(40, Math.round(size * 1234 / 599.04)) };
}

// 한 틱 진행 배율 — 0(멈칫, 1~2초 이어질 수 있음) 또는 0.5~1.8(덩어리). 평균은 1 안팎
function downloadBurst(r) {
  if (r.stall > 0) { r.stall--; if (!r.stall) r.moveNext = true; return 0; }
  // 멈칫이 끝난 다음 틱은 반드시 진행 — 멈칫이 길게 이어지지 않게(최대 2초)
  if (!r.moveNext && Math.random() < 0.22) { r.stall = Math.random() < 0.35 ? 1 : 0; if (!r.stall) r.moveNext = true; return 0; }
  r.moveNext = false;
  return 0.5 + Math.random() * 1.3;
}

// 999:30:10 형식 (시간은 자릿수 제한 없음)
function downloadClock(sec) {
  sec = Math.max(0, Math.ceil(sec));
  var h = Math.floor(sec / 3600), m = Math.floor(sec / 60) % 60, s = sec % 60;
  return h + ':' + (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
}
function downloadMB(v) { return v.toFixed(2) + 'MB'; }

// 처음 상태 — 전부 대기, 맨 위 기본 게임부터 설치 준비 중. 용량(MB)은 더미
function downloadInitialQueue() {
  var q = [
    {
      id: 'yeogisa', size: 599.04,
      dlc: [
        { id: 'yeogisa-alice', size: 120.48 },
        { id: 'yeogisa-bunny', size: 85.32 },
        { id: 'yeogisa-gangsi', size: 64.1 },
        { id: 'yeogisa-voice', size: 210.75 },
      ],
    },
    { id: 'lovein-login', size: 732.16, dlc: [{ id: 'lovein-login-asmr', size: 156.2 }] },
    { id: 'secret-curriculum', size: 488.64 },
  ];
  q.forEach(function (g) { [g].concat(g.dlc || []).forEach(function (it) { it.status = 'waiting'; }); });
  q[0].status = 'progress';
  q[0].run = downloadNewRun(q[0].size);
  return q;
}

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
  props: {
    item: { type: Object, required: true },
    top: { type: Boolean, default: false }, // 1뎁스(기본 게임) 행 — 진행 중이면 "완료 후 실행" 토글이 붙는다
  },
  computed: {
    game: function () { return gameInfo(this.item.id) || { name: this.item.id, thumb: '' }; },
    run: function () { return this.item.run || downloadNewRun(this.item.size); },
    sizeText: function () { var t = downloadMB(this.item.size || 0); return t + ' / ' + t; },
    // 설치까지 95%, 무결성 검사로 나머지 5%
    percent: function () {
      var r = this.run;
      if (r.phase === 'prepare') return 0;
      if (r.phase === 'verify') return Math.min(100, 95 + Math.floor(r.checked / r.files * 5));
      return Math.floor(r.installed / r.total * 95);
    },
    fileName: function () { return 'data' + (this.run.file < 10 ? '0' : '') + this.run.file + '.v'; },
    steps: function () {
      var r = this.run, R = { total: r.total, files: r.files, installRate: DOWNLOAD_RUN.installRate }, total = downloadMB(r.total);
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
      // 1뎁스는 status 640 고정 — 진행 바 420은 왼쪽, 토글 · 버튼은 오른쪽 끝 (Figma 8:3467). DLC(2뎁스)는 토글 없이 바 뒤에 붙임
      '<div v-else-if="item.status === \'progress\'" class="download-item__status download-item__progress" :class="{ \'is-top\': top, \'is-two-btns\': run.paused || run.phase === \'prepare\' }" data-name="status">' +
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
          // 완료 후 실행 — 1뎁스만, 설치 준비 중엔 없음 (Figma toggle 2189:9940 · 공통 stds-switch sm)
          '<label v-if="top && run.phase !== \'prepare\'" class="stds-switch stds-switch-sm download-item__run-after" data-name="toggle">' +
            '<input class="stds-switch-checkbox" type="checkbox" v-model="item.runAfter" />' +
            '<span class="stds-switch-track" aria-hidden="true"></span>' +
            '<span class="stds-switch-label">완료 후 실행</span>' +
          '</label>' +
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
      // 플레이 가능 (Figma native_download_MD 플레이 가능 67359:360702) — 용량 + 플레이 / 기본 게임에서 플레이 + 제거
      '<div v-else-if="item.status === \'ready\'" class="download-item__status download-item__ready" data-name="status">' +
        '<span class="download-item__size">{{ sizeText }}</span>' +
        '<div class="download-item__btns download-item__ready-btns" data-name="BTN">' +
          '<button class="stds-button stds-button-blue stds-button-sm" type="button"><i class="ic-v2-media-av-play-round-fill"></i>{{ item.base ? \'기본 게임에서 플레이\' : \'플레이\' }}</button>' +
          '<button class="download-icon-btn" type="button" aria-label="제거"><i class="ic-v2-control-close-line"></i></button>' +
        '</div>' +
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
      queue: downloadInitialQueue(), // 설치 중 / 대기 — 기본 게임 + DLC 트리
      ready: [],                     // 플레이 가능 — 1레벨 행(기본 게임 다음에 그 DLC들)
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
    // 진행 행 더미 진행 — 1초에 한 번. 큐 순서대로 한 항목씩(기본 게임 → 그 DLC들 → 다음 게임)
    stepRuns: function (speed) {
      var R = DOWNLOAD_RUN, q = this.queue;
      // 큐가 다 비었으면 잠깐 뒤 처음부터 (시연용)
      if (!q.length) {
        this._resetTicks = (this._resetTicks || 0) + 1;
        if (this._resetTicks >= R.resetTicks) { this._resetTicks = 0; this.queue = downloadInitialQueue(); this.ready = []; }
        return;
      }
      // 묶음이 다 설치됐으면 잠깐 보여 준 뒤 플레이 가능으로 — 1레벨로 풀어서(기본 게임, DLC 순)
      var g0 = q[0];
      if (g0.complete) {
        if (++g0.complete > R.moveTicks) {
          q.shift();
          this.ready.push({ id: g0.id, size: g0.size, status: 'ready' });
          (g0.dlc || []).forEach(function (d) { this.ready.push({ id: d.id, size: d.size, status: 'ready', base: g0.id }); }, this);
        }
        return;
      }
      // 지금 진행 중인 항목 — 없으면 다음 대기 항목을 시작
      var flat = [];
      q.forEach(function (g) { flat.push({ it: g, group: g }); (g.dlc || []).forEach(function (d) { flat.push({ it: d, group: g }); }); });
      var cur = flat.filter(function (x) { return x.it.status === 'progress'; })[0];
      if (!cur) {
        cur = flat.filter(function (x) { return x.it.status === 'waiting'; })[0];
        if (!cur) return;
        cur.it.status = 'progress';
        // DLC 용량은 매번 무작위(180~720MB) — 작은 고정값이면 시작하자마자 95%로 튀어서 어색함 (사용자 11-13)
        if (cur.it !== cur.group) cur.it.size = Math.round((180 + Math.random() * 540) * 100) / 100;
        cur.it.run = downloadNewRun(cur.it.size);
      }
      var it = cur.it, g = cur.group, r = it.run;
      if (r.paused) return; // 일시정지 중엔 뒤 항목도 기다린다
      speed *= R.speedScale;
      // 남은 시간은 평균 속도로 — 멈칫하는 순간에도 시간이 튀지 않게
      r.speed = r.speed ? r.speed * 0.7 + speed * 0.3 : speed;
      if (r.phase === 'prepare') {
        if (++r.ticks >= R.prepareTicks) { r.phase = 'install'; r.ticks = 0; }
        return;
      }
      // 쭉 가지 않고 갔다가 툭 끊기게 (사용자 11-13) — 가끔 1~2초 멈칫, 나머지는 덩어리로 확 진행
      var burst = downloadBurst(r);
      if (r.phase === 'install') {
        r.downloaded = Math.min(r.total, r.downloaded + speed * burst);
        r.installed = Math.min(r.downloaded, r.installed + speed * R.installRate * burst);
        r.file = 1 + Math.floor(r.installed / r.total * 11); // data01 ~ data12
        if (r.installed >= r.total) { r.phase = 'verify'; r.file = 1; }
        return;
      }
      // verify — 1초에 350~550개(멈칫 · 덩어리 배율 포함)
      r.checked = Math.min(r.files, r.checked + Math.ceil((R.verifyRate - 100 + Math.random() * 200) * burst));
      r.file = 1 + Math.floor(r.checked / r.files * 11);
      if (r.checked < r.files) return;
      // 설치 완료 — 기본 게임은 남은 DLC가 있으면 'DLC 설치 중'으로, 묶음이 다 끝나면 플레이 가능으로 옮길 준비
      it.status = 'done';
      var dlcs = g.dlc || [];
      var allDlcDone = dlcs.every(function (d) { return d.status === 'done'; });
      if (it === g && dlcs.length && !allDlcDone) g.status = 'dlc';
      else if (allDlcDone) { g.status = 'done'; g.complete = 1; }
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
      // 플레이 가능 (상단) — 기본 게임 + DLC가 다 설치된 묶음만, 트리 없이 1레벨 (사용자 11-13)
      '<section v-if="ready.length" class="download-section download-section--ready" data-name="플레이 가능">' +
        '<div class="download-section__head" data-name="title">' +
          '<h2 class="client-section-title">플레이 가능<span>{{ ready.length }}</span></h2>' +
          '<button class="stds-button stds-button-tertiary stds-button-sm" type="button" @click="ready = []"><i class="ic-v2-control-close-line"></i>전체 제거</button>' +
        '</div>' +
        '<div class="download-list download-list--ready">' +
          '<download-item v-for="d in ready" :key="d.id" :item="d"></download-item>' +
        '</div>' +
      '</section>' +
      '<section class="download-section" data-name="설치 중">' +
        '<h2 class="client-section-title">설치 중 / 대기<span>{{ total }}</span></h2>' +
        // 설치할 항목이 없으면 그래프 대신 빈 상태 (사용자 11-13) — Figma 공통 empty variant=basic 377:4377,
        // 라이브러리 결과 없음 박스와 같은 셸 · 그림(APNG 08_down_none 120)
        '<div v-if="!queue.length" class="download-empty" data-name="empty">' +
          '<img class="download-empty__img theme-img--dark" src="assets/library/08_down_none_dark.png" width="120" height="120" alt="" />' +
          '<img class="download-empty__img theme-img--light" src="assets/library/08_down_none_light.png" width="120" height="120" alt="" loading="lazy" />' +
          '<p class="download-empty__title">설치 대기중 항목이 없습니다.</p>' +
        '</div>' +
        // 성능 그래프 (Figma 그래프 · gragh) — 더미 데이터로 계속 흘러간다(경로는 mounted · drawGraph가 그림), 색은 토큰
        // 빈 상태에서도 v-show로 DOM은 남긴다(그래프 경로를 $refs로 계속 그리므로)
        '<div v-show="queue.length" class="download-perf" data-name="그래프">' +
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
        '<div v-if="queue.length" class="download-list">' +
          '<div v-for="g in queue" :key="g.id" class="download-group">' +
            '<download-item :item="g" top></download-item>' +
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
