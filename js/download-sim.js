/**
 * 다운로드 관리 더미 진행 — 다운로드 관리 페이지와 사이드바(GNB) 다운로드 표시가 같은 데이터를 본다 (사용자 11-16)
 * -------------------------------------------------------------
 * - 시작 시각(보기 옵션 proto.downloadStartedAt)을 씨앗으로 한 무작위라, 어느 페이지에서 열어도
 *   시작부터 지난 초만큼 다시 돌리면 같은 상태가 된다(페이지를 옮겨도 사이드바가 이어서 진행).
 * - 다운로드 관리에 들어오면(새로고침 포함) 시작 시각을 지금으로 — 처음부터 (download-component.js).
 * - 1초(tick)마다 그래프 값 하나 + 설치 한 걸음. 큐가 다 비면 멈춘다(반복 없음).
 * - 일시정지 · 완료 후 실행 · 전체 제거는 그 페이지 안에서만 반영된다(다른 페이지는 다시 계산하므로 모름).
 *
 * 케이스 참고: Figma 클라이언트-Library-0.3.1 component/list/download 8:3463
 *   설치 준비 중(8:3473) → 설치 중(8:3467) → 무결성검사(2952:17031) → 설치 완료, 일시 정지 됨(8:3470)
 * 순서: 위에서부터 한 항목씩 — 기본 게임 → 그 DLC들(트리) → 다음 게임. 기본 게임 + DLC가 다 끝나면
 *   '플레이 가능'으로 옮긴다(1레벨). (Figma 클라이언트_v3.1 "기본게임, DLC 플레이 정책 개선" 68141:884842)
 */
// 진행 속도는 사이드바 다운로드 표시(예전 그대로 한 단계 2초)에 맞춘다 (사용자 11-16 "사이드바 기준에 다운로드 관리를 맞춰").
// 그래프는 1초마다 흐르고, 설치 진행은 2틱(2초)에 한 걸음 — 사이드바 진행률과 같은 순간에 바뀐다.
var DOWNLOAD_RUN = {
  tick: 1000,        // 그래프 한 칸(ms)
  stepTicks: 2,      // 설치 진행 한 걸음 = 2틱(2초) — 사이드바 단계 간격
  prepareSteps: 1,   // 설치 준비 중 걸음 수(2초)
  speedScale: 2.5,   // 다운로드 속도 = 그래프 속도 × 2.5 — 기본 게임(599MB)이 진행률 4~5단계로 끝나게
  installRate: 0.7,  // 설치 속도 = 다운로드 속도 × 0.7 (받은 만큼만 설치)
  verifyRate: 550,   // 무결성 검사 한 걸음에 약 550개(±100) — 용량에 비례한 파일 수라 큰 게임은 길고 DLC는 짧게
  moveSteps: 1,      // 묶음(기본 게임 + DLC) 마지막 설치 완료 뒤 플레이 가능으로 옮기기까지 걸음 수
};

// 성능 그래프 (사용자 11-13 "그래프 더미 데이터로 움직이게") — 1초마다 새 값이 오른쪽에 붙고 왼쪽으로 흐른다.
// 범위는 자릿수가 바뀌지 않게(수치 폭이 흔들리지 않게).
var DOWNLOAD_GRAPH = {
  width: 960, height: 116, // SVG viewBox (preserveAspectRatio none — 카드 폭에 맞춰 늘어남)
  step: 40,                // 점 간격
  top: 14, bottom: 110,    // 다운로드 선이 오가는 높이
  diskTop: 70,             // 디스크 선은 아래쪽에서 낮게
};

// 씨앗이 같으면 같은 순서로 나오는 무작위 (mulberry32)
function downloadRng(seed) {
  var a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    var t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// 이전 값에서 조금씩 움직이는 무작위 값 (경계에서 튕김)
function downloadWalk(rng, prev, min, max, jump) {
  var v = prev + (rng() - 0.5) * 2 * jump;
  if (v < min) v = min + (min - v);
  if (v > max) v = max - (v - max);
  return Math.min(max, Math.max(min, v));
}

// 용량(MB)마다 진행 — 무결성 검사 파일 수는 용량에 비례(599.04MB = 1,234개, Figma 케이스 값)
function downloadNewRun(size) {
  size = size || 599.04;
  return { phase: 'prepare', paused: false, ticks: 0, speed: 0, downloaded: 0, installed: 0, checked: 0, file: 1,
    total: size, files: Math.max(40, Math.round(size * 1234 / 599.04)) };
}

// 설치까지 95%, 무결성 검사로 나머지 5%
function downloadPercent(r) {
  if (!r || r.phase === 'prepare') return 0;
  if (r.phase === 'verify') return Math.min(100, 95 + Math.floor(r.checked / r.files * 5));
  return Math.floor(r.installed / r.total * 95);
}

// 한 걸음 진행 배율 — 0(멈칫, 2초) 또는 0.5~1.8(덩어리). "쭉 가지 않고 갔다가 툭 끊기게"(사용자 11-13)
function downloadBurst(r, rng) {
  // 한 걸음(2초)만 멈칫, 다음 걸음은 반드시 진행
  if (!r.moveNext && rng() < 0.22) { r.moveNext = true; return 0; }
  r.moveNext = false;
  return 0.5 + rng() * 1.3;
}

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

// 큐를 위에서부터 한 줄로 — [{ it, group }]
function downloadFlat(q) {
  var flat = [];
  q.forEach(function (g) { flat.push({ it: g, group: g }); (g.dlc || []).forEach(function (d) { flat.push({ it: d, group: g }); }); });
  return flat;
}

function DownloadSim(startedAt) {
  var G = DOWNLOAD_GRAPH;
  this.startedAt = startedAt;
  this.rng = downloadRng(startedAt % 2147483647);
  this.listeners = [];
  var rng = this.rng;
  // 그래프 — 흘러가는 동안 양 끝이 비지 않게 한 칸 더. 그리는 쪽이 $refs로 직접 그려서 반응형 아님
  var n = Math.ceil(G.width / G.step) + 2, down = [], disk = [], d = 0.6, k = 0.4;
  for (var i = 0; i < n; i++) {
    d = downloadWalk(rng, d, 0, 1, 0.28); k = downloadWalk(rng, k, 0, 1, 0.15);
    down.push(d); disk.push(k);
  }
  this.graph = { down: down, disk: disk };
  var state = {
    queue: downloadInitialQueue(), // 설치 중 / 대기 — 기본 게임 + DLC 트리
    ready: [],                     // 플레이 가능 — 1레벨 행(기본 게임 다음에 그 DLC들)
    live: { cpu: 14, disk: 0.4, down: 0.6, avg: 0.55, ram: 1.32 }, // 그래프 수치
    tick: 0,
    lastDoneTick: null,            // 항목 하나가 끝난 틱 (사이드바 완료 체크)
    finishTick: null,              // 마지막 항목이 끝난 틱
  };
  this.state = window.Vue ? Vue.reactive(state) : state;
  this.pushStats();
  this.catchUp();
  this.schedule();
}

DownloadSim.prototype = {
  // 시작부터 지난 초만큼 진행
  catchUp: function () {
    var target = Math.floor((Date.now() - this.startedAt) / DOWNLOAD_RUN.tick);
    var changed = false;
    while (this.state.tick < target && !this.isOver()) { this.step(); changed = true; }
    return changed;
  },
  isOver: function () { return !this.state.queue.length; },
  schedule: function () {
    clearTimeout(this.timer);
    if (this.isOver()) return;
    var self = this;
    var next = this.startedAt + (this.state.tick + 1) * DOWNLOAD_RUN.tick;
    this.timer = setTimeout(function () {
      if (self.catchUp()) self.listeners.forEach(function (fn) { fn(self); });
      self.schedule();
    }, Math.max(0, next - Date.now()));
  },
  stop: function () { clearTimeout(this.timer); this.listeners = []; },
  subscribe: function (fn) { this.listeners.push(fn); },
  unsubscribe: function (fn) { this.listeners = this.listeners.filter(function (f) { return f !== fn; }); },
  // 마지막 틱 시각 — 그래프가 그 사이를 부드럽게 흐르게
  lastTickAt: function () { return this.startedAt + this.state.tick * DOWNLOAD_RUN.tick; },

  step: function () {
    var g = this.graph, rng = this.rng;
    g.down.shift(); g.disk.shift();
    g.down.push(downloadWalk(rng, g.down[g.down.length - 1], 0, 1, 0.28));
    g.disk.push(downloadWalk(rng, g.disk[g.disk.length - 1], 0, 1, 0.15));
    this.state.tick += 1;
    this.pushStats();
    if (this.state.tick % DOWNLOAD_RUN.stepTicks === 0) this.stepRuns(20 + this.state.live.down * 40); // 수치의 "현재 다운로드 속도"(MB/s)
  },
  pushStats: function () {
    var g = this.graph, l = this.state.live, rng = this.rng;
    var last = g.down.length - 2; // 오른쪽 끝(화면에 보이는 마지막 점)
    var visible = g.down.slice(1, last + 1);
    l.down = g.down[last];
    l.disk = g.disk[last];
    l.avg = visible.reduce(function (s, v) { return s + v; }, 0) / visible.length;
    l.cpu = downloadWalk(rng, l.cpu, 10, 28, 2.5);
    l.ram = downloadWalk(rng, l.ram, 1.1, 1.6, 0.03);
  },
  // 한 걸음 — 큐 순서대로 한 항목씩(기본 게임 → 그 DLC들 → 다음 게임)
  stepRuns: function (speed) {
    var R = DOWNLOAD_RUN, s = this.state, q = s.queue, rng = this.rng;
    if (!q.length) return;
    // 묶음이 다 설치됐으면 잠깐 보여 준 뒤 플레이 가능으로 — 1레벨로 풀어서(기본 게임, DLC 순)
    var g0 = q[0];
    if (g0.complete) {
      if (++g0.complete > R.moveSteps) {
        q.shift();
        s.ready.push({ id: g0.id, size: g0.size, status: 'ready' });
        (g0.dlc || []).forEach(function (d) { s.ready.push({ id: d.id, size: d.size, status: 'ready', base: g0.id }); });
      }
      return;
    }
    var flat = downloadFlat(q);
    var cur = flat.filter(function (x) { return x.it.status === 'progress'; })[0];
    if (!cur) {
      cur = flat.filter(function (x) { return x.it.status === 'waiting'; })[0];
      if (!cur) return;
      cur.it.status = 'progress';
      // DLC 용량은 매번 무작위(180~720MB) — 작은 고정값이면 시작하자마자 95%로 튀어서 어색함 (사용자 11-13)
      if (cur.it !== cur.group) cur.it.size = Math.round((180 + rng() * 540) * 100) / 100;
      cur.it.run = downloadNewRun(cur.it.size);
    }
    var it = cur.it, g = cur.group, r = it.run;
    if (r.paused) return; // 일시정지 중엔 뒤 항목도 기다린다
    speed *= R.speedScale;                                   // MB/s
    r.speed = r.speed ? r.speed * 0.7 + speed * 0.3 : speed; // 남은 시간(초)은 평균 속도로 — 멈칫해도 안 튀게
    if (r.phase === 'prepare') {
      if (++r.ticks >= R.prepareSteps) { r.phase = 'install'; r.ticks = 0; }
      return;
    }
    var stepSec = R.stepTicks * R.tick / 1000;               // 한 걸음 = 2초 분량
    if (r.phase === 'install') {
      var burst = downloadBurst(r, rng);
      r.downloaded = Math.min(r.total, r.downloaded + speed * stepSec * burst);
      r.installed = Math.min(r.downloaded, r.installed + speed * stepSec * R.installRate * burst);
      r.file = 1 + Math.floor(r.installed / r.total * 11); // data01 ~ data12
      if (r.installed >= r.total) { r.phase = 'verify'; r.file = 1; }
      return;
    }
    // verify — 한 걸음에 450~650개. 멈칫 · 큰 배율은 빼서 2~3걸음 안팎으로 일정하게 (5%만 차는 구간이라 길면 멈춘 것처럼 보임)
    r.checked = Math.min(r.files, r.checked + Math.ceil(R.verifyRate - 100 + rng() * 200));
    r.file = 1 + Math.floor(r.checked / r.files * 11);
    if (r.checked < r.files) return;
    // 설치 완료 — 기본 게임은 남은 DLC가 있으면 'DLC 설치 중'으로, 묶음이 다 끝나면 플레이 가능으로 옮길 준비
    it.status = 'done';
    s.lastDoneTick = s.tick;
    var dlcs = g.dlc || [];
    var allDlcDone = dlcs.every(function (d) { return d.status === 'done'; });
    if (it === g && dlcs.length && !allDlcDone) g.status = 'dlc';
    else if (allDlcDone) { g.status = 'done'; g.complete = 1; }
    if (!flat.some(function (x) { return x.it.status === 'waiting' || x.it.status === 'progress'; })) s.finishTick = s.tick;
  },

  // 사이드바용 지금 상태 — 표시 순서 · 속도는 사이드바가 따로 정한다(다운로드 페이지 속도와 별개, 사용자 11-16)
  info: function () {
    var s = this.state, flat = downloadFlat(s.queue);
    var cur = flat.filter(function (x) { return x.it.status === 'progress'; })[0];
    return {
      remaining: flat.filter(function (x) { return x.it.status === 'waiting' || x.it.status === 'progress'; }).length,
      installing: !!(cur && cur.it.run.phase !== 'prepare'),
      pct: cur ? downloadPercent(cur.it.run) : 0,
      // 끝난 항목 수 — 'dlc'는 자기 설치가 끝난 기본 게임. 사이드바가 체크를 몇 번 보여 줬는지 비교용
      doneCount: flat.filter(function (x) { return x.it.status === 'done' || x.it.status === 'dlc'; }).length + s.ready.length,
      finished: s.finishTick != null,
    };
  },
};

// 한 페이지에서는 같은 시작 시각이면 같은 인스턴스를 같이 쓴다 — 다운로드 페이지에서 일시정지하면 사이드바도 멈춘다
function downloadSimFor(startedAt) {
  if (!startedAt) return null;
  var cur = window.__downloadSim;
  if (cur && cur.startedAt === startedAt) return cur;
  if (cur) cur.stop();
  window.__downloadSim = new DownloadSim(startedAt);
  return window.__downloadSim;
}
