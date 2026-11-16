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

// 진행 데이터 · 그래프 값은 js/download-sim.js (사이드바 다운로드 표시와 같은 데이터, 사용자 11-16)

// 999:30:10 형식 (시간은 자릿수 제한 없음)
function downloadClock(sec) {
  sec = Math.max(0, Math.ceil(sec));
  var h = Math.floor(sec / 3600), m = Math.floor(sec / 60) % 60, s = sec % 60;
  return h + ':' + (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
}
function downloadMB(v) { return v.toFixed(2) + 'MB'; }

var DownloadItem = {
  name: 'DownloadItem',
  emits: ['retry'],
  props: {
    item: { type: Object, required: true },
    top: { type: Boolean, default: false }, // 1뎁스(기본 게임) 행 — 진행 중이면 "완료 후 실행" 토글이 붙는다
  },
  computed: {
    game: function () { return gameInfo(this.item.id) || { name: this.item.id, thumb: '' }; },
    run: function () { return this.item.run || downloadNewRun(this.item.size); },
    // 기본 게임 'DLC 설치 중' 표시는 실제로 받을 DLC가 남아 있을 때만 (실패한 DLC만 남으면 버튼만)
    dlcInstalling: function () {
      return (this.item.dlc || []).some(function (d) { return d.status === 'waiting' || d.status === 'progress'; });
    },
    sizeText: function () { var t = downloadMB(this.item.size || 0); return t + ' / ' + t; },
    percent: function () { return downloadPercent(this.run); }, // 설치까지 95%, 무결성 검사로 나머지 5%
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
        '<span v-if="dlcInstalling" class="download-item__dlc-state" data-name="DLC 설치 중">' +
          '<svg class="download-item__dots" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><circle cx="2" cy="8" r="2"/><circle cx="8" cy="8" r="2"/><circle cx="14" cy="8" r="2"/></svg>' +
          'DLC 설치 중' +
        '</span>' +
        // 호버하면 위로 툴팁 (Figma Tooltip/iconbtn diraction=bottom-center 68088:379870 — 버튼 위 4, 가운데)
        '<span class="download-item__play">' +
          '<button class="stds-button stds-button-blue stds-button-sm" type="button"><i class="ic-v2-media-av-play-round-fill"></i>기본 게임 먼저 플레이</button>' +
          '<span class="download-item__play-tip stds-cap1 fw-medium" role="tooltip" data-name="Tooltip/iconbtn">' +
            '<span class="download-item__play-tip-body">DLC가 포함된 상태로 게임 플레이를 하려면<br />DLC 설치를 완료한 후 실행하는 것을 추천해요.</span>' +
            '<span class="download-item__play-tip-tail"></span>' +
          '</span>' +
        '</span>' +
      '</div>' +
      // 에러 (Figma 클라이언트-Library 0.3.1 에러 메세지 노출 8:3476 · 플로우 '실패') — 메시지(빨강) + 실패 시각, 다시 시도 · 취소
      '<div v-else-if="item.status === \'error\'" class="download-item__status download-item__error" data-name="status">' +
        '<div class="download-item__error-text" data-name="text">' +
          '<p v-if="item.errorKind === \'temp\'" class="download-item__error-msg">일시적으로 문제가 발생했습니다.<br />다시 시도해 주세요.</p>' +
          '<p v-else class="download-item__error-msg">기본 게임 설치가 완료되어야 DLC 설치가 가능합니다.</p>' +
          '<p class="download-item__error-date">{{ item.errorAt }}</p>' +
        '</div>' +
        '<div class="download-item__btns" data-name="btn">' +
          '<button class="download-icon-btn" type="button" aria-label="다시 시도" @click="$emit(\'retry\', item)"><i class="ic-v2-control-refresh-line"></i></button>' +
          '<button class="download-icon-btn" type="button" aria-label="취소"><i class="ic-v2-control-close-line"></i></button>' +
        '</div>' +
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
    return { sim: null };
  },
  computed: {
    queue: function () { return this.sim ? this.sim.state.queue : []; }, // 설치 중 / 대기 — 기본 게임 + DLC 트리
    ready: function () { return this.sim ? this.sim.state.ready : []; }, // 플레이 가능 — 1레벨
    // 설치 중 / 대기 개수 — 본 게임 + DLC 전부
    total: function () {
      return this.queue.reduce(function (n, g) { return n + 1 + (g.dlc ? g.dlc.length : 0); }, 0);
    },
    // 다운로드 0~1 → 20~60MB/s, 디스크 0~1 → 120~600MB/s
    stats: function () {
      if (!this.sim) return [];
      var l = this.sim.state.live;
      return [
        { label: 'CPU 점유율', value: Math.round(l.cpu) + '%' },
        { label: '디스크 읽기/쓰기 속도', value: (120 + l.disk * 480).toFixed(1) + 'MB/s' },
        { label: '현재 다운로드 속도', value: (20 + l.down * 40).toFixed(1) + 'MB/s' },
        { label: '평균 다운로드 속도', value: (20 + l.avg * 40).toFixed(1) + 'MB/s' },
        { label: 'RAM 점유량', value: l.ram.toFixed(2) + 'GB' },
      ];
    },
  },
  created: function () {
    // 다운로드 관리에 들어오면(새로고침 포함) 처음부터 — 사이드바 다운로드 표시도 같이 처음부터 (사용자 11-16)
    var s = protoSettingsWrite({ download: true, downloadStartedAt: Date.now() });
    this.sim = Vue.markRaw(downloadSimFor(s.downloadStartedAt, s.downloadError));
    this._started = s.downloadStartedAt; this._error = !!s.downloadError;
    var vm = this;
    // 보기 옵션 "다운로드 관리"를 다시 켜거나 '에러'를 바꾸면 그 설정으로 다시
    protoSettingsSubscribe(function (ps) {
      if (!ps.downloadStartedAt) return;
      if (ps.downloadStartedAt !== vm._started || !!ps.downloadError !== vm._error) {
        vm._started = ps.downloadStartedAt; vm._error = !!ps.downloadError;
        vm.sim = Vue.markRaw(downloadSimFor(ps.downloadStartedAt, ps.downloadError));
      }
    });
  },
  mounted: function () {
    this.reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.raf = requestAnimationFrame(this.frame);
  },
  beforeUnmount: function () {
    cancelAnimationFrame(this.raf);
  },
  methods: {
    // 매 프레임: 마지막 틱 이후 지난 만큼 한 칸 간격 안에서 왼쪽으로 부드럽게 이동 (새 값은 download-sim이 틱마다 붙임)
    frame: function () {
      var p = Math.min(1, Math.max(0, (Date.now() - this.sim.lastTickAt()) / DOWNLOAD_RUN.tick));
      if (this.queue.length) this.drawGraph(this.reduceMotion ? 0 : p);
      this.raf = requestAnimationFrame(this.frame);
    },
    // 테스트 · 확인용 — 한 걸음 바로 진행
    stepRuns: function () { this.sim.step(); },
    clearReady: function () { this.sim.state.ready.splice(0); },
    retry: function (item) { this.sim.retry(item); },
    drawGraph: function (p) {
      var G = DOWNLOAD_GRAPH, g = this.sim.graph;
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
          '<button class="stds-button stds-button-tertiary stds-button-sm library-tool-btn" type="button" @click="clearReady"><i class="ic-v2-control-close-line"></i>전체 제거</button>' +
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
            '<download-item :item="g" top @retry="retry"></download-item>' +
            '<div v-if="g.dlc && g.dlc.length" class="download-group__dlc">' +
              '<download-item v-for="d in g.dlc" :key="d.id" :item="d" @retry="retry"></download-item>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>' +
    '</div>',
};

function mountDownloadMain(selector) {
  return Vue.createApp(DownloadMain).mount(selector);
}
