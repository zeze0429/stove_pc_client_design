/**
 * 데스크톱 미리보기(main.html) — 클라이언트 창 크기 조절 (사용자 11-17)
 * -------------------------------------------------------------
 * - 테두리 4 · 모서리 4를 끌어서 조절. 창은 화면 가운데라 양쪽이 같이 늘고 줄어든다.
 * - 보기 옵션 "사이즈 지정": 라디오 최소 1280 × 800(기본) · 1920 × 1000 · 사용자 지정(고르면 [너비] × [높이] 입력칸).
 *   드래그로 두 크기와 다른 값이 되면 사용자 지정으로 바뀐다.
 * - 최소 1280 × 800 (클라이언트 최소 창). 값은 proto-settings(frameW · frameH)에 저장 — 새로고침해도 유지.
 * - 창이 화면보다 크면 화면에 맞춰 줄여서 보여 준다(클라이언트 안의 실제 크기는 그대로).
 *   드래그하는 동안에는 배율을 고정 — 놓으면 다시 맞춘다.
 */
(function () {
  var MIN_W = 1280, MIN_H = 800;
  var MAX_W = 3840, MAX_H = 2160; // 입력 실수로 너무 커지지 않게 (4K)
  var PRESETS = { min: { w: 1280, h: 800 }, fhd: { w: 1920, h: 1000 } };
  var FIT_GAP = 16;               // 화면에 맞출 때 창 둘레 여백
  var TASKBAR = 48;

  var desktop = document.querySelector('.os-desktop');
  var win = document.querySelector('.os-window');
  if (!desktop || !win) return;
  var sizeTip = win.querySelector('.os-window__size');
  var inputW = document.querySelector('[data-proto-frame="w"]');
  var inputH = document.querySelector('[data-proto-frame="h"]');
  var hint = document.querySelector('[data-proto-frame-hint]');
  var radios = document.querySelectorAll('input[name="protoFrameMode"]');
  var custom = document.querySelector('.proto-frame');

  // 크기에 맞는 라디오 — 프리셋과 같으면 그것, 아니면 사용자 지정
  function modeFor(w, h) {
    for (var k in PRESETS) if (PRESETS[k].w === w && PRESETS[k].h === h) return k;
    return 'custom';
  }

  var cur = { w: MIN_W, h: MIN_H };
  var scale = 1;
  var drag = null;

  function clamp(v, min, max, fallback) {
    v = Math.round(Number(v));
    if (!isFinite(v)) v = fallback;
    return Math.min(max, Math.max(min, v));
  }

  function fitScale(w, h) {
    var availW = window.innerWidth - FIT_GAP * 2;
    var availH = window.innerHeight - TASKBAR - FIT_GAP * 2;
    return Math.min(1, availW / w, availH / h);
  }

  function apply(w, h, keepScale) {
    cur = { w: w, h: h };
    if (!keepScale) scale = fitScale(w, h);
    win.style.setProperty('--os-window-w', w + 'px');
    win.style.setProperty('--os-window-h', h + 'px');
    win.style.setProperty('--os-window-scale', String(scale));
    if (inputW && document.activeElement !== inputW) inputW.value = w;
    if (inputH && document.activeElement !== inputH) inputH.value = h;
    if (hint) {
      hint.hidden = scale >= 1;
      hint.textContent = '화면보다 커서 ' + Math.round(scale * 100) + '%로 줄여서 보여요';
    }
  }

  function fromSettings(s) {
    if (drag) return;
    var w = clamp(s.frameW, MIN_W, MAX_W, MIN_W), h = clamp(s.frameH, MIN_H, MAX_H, MIN_H);
    var mode = s.frameMode === 'custom' || PRESETS[s.frameMode] ? s.frameMode : modeFor(w, h);
    apply(w, h);
    radios.forEach(function (r) { r.checked = r.value === mode; });
    if (custom) custom.hidden = mode !== 'custom';
  }

  // ---- 라디오 — 프리셋이면 그 크기로, 사용자 지정이면 지금 크기 그대로 입력칸만 연다 ----
  radios.forEach(function (r) {
    r.addEventListener('change', function () {
      if (!r.checked) return;
      var p = PRESETS[r.value];
      protoSettingsWrite(p ? { frameMode: r.value, frameW: p.w, frameH: p.h } : { frameMode: 'custom' });
    });
  });

  // ---- 테두리 · 모서리 드래그 ----
  win.querySelectorAll('[data-grip]').forEach(function (grip) {
    grip.addEventListener('pointerdown', function (e) {
      if (e.button !== 0) return;
      e.preventDefault();
      var dir = grip.dataset.grip;
      drag = { dir: dir, x: e.clientX, y: e.clientY, w: cur.w, h: cur.h };
      grip.setPointerCapture(e.pointerId);
      desktop.classList.add('is-resizing');
      desktop.style.setProperty('--os-resize-cursor', getComputedStyle(grip).cursor);
      if (sizeTip) { sizeTip.hidden = false; sizeTip.textContent = cur.w + ' × ' + cur.h; }
    });
    grip.addEventListener('pointermove', function (e) {
      if (!drag) return;
      if (e.buttons === 0) { end(); return; } // 버튼을 이미 놓았는데 놓음 신호를 못 받은 경우
      // 가운데 정렬이라 한쪽을 d만큼 끌면 양쪽이 같이 — 크기는 2d (화면 배율만큼 되돌려서)
      var dx = (e.clientX - drag.x) / scale * 2;
      var dy = (e.clientY - drag.y) / scale * 2;
      var d = drag.dir;
      var w = drag.w + (d.indexOf('e') >= 0 ? dx : d.indexOf('w') >= 0 ? -dx : 0);
      var h = drag.h + (d.indexOf('s') >= 0 ? dy : d.indexOf('n') >= 0 ? -dy : 0);
      apply(clamp(w, MIN_W, MAX_W, drag.w), clamp(h, MIN_H, MAX_H, drag.h), true);
      if (sizeTip) sizeTip.textContent = cur.w + ' × ' + cur.h;
    });
    function end() {
      if (!drag) return;
      drag = null;
      desktop.classList.remove('is-resizing');
      if (sizeTip) sizeTip.hidden = true;
      apply(cur.w, cur.h); // 화면에 다시 맞춤
      // 저장은 놓을 때 한 번 — 움직이는 동안 매번 저장하면 iframe 안 페이지들이 계속 다시 그린다
      protoSettingsWrite({ frameMode: modeFor(cur.w, cur.h), frameW: cur.w, frameH: cur.h });
    }
    grip.addEventListener('pointerup', end);
    grip.addEventListener('pointercancel', end);
    // 창 밖 · 브라우저 밖에서 놓거나 포인터 추적이 끊겨도 반드시 끝낸다 — 안 끝나면 클라이언트(iframe)
    // 클릭을 막아 둔 상태(is-resizing)가 남아 다른 곳이 눌리지 않는다 (사용자 11-17)
    grip.addEventListener('lostpointercapture', end);
    window.addEventListener('pointerup', end);
    window.addEventListener('blur', end);
  });

  // ---- 사이즈 지정 입력 — Enter 또는 칸을 벗어날 때 반영 ----
  [inputW, inputH].forEach(function (el) {
    if (!el) return;
    function commit() {
      var w = clamp(inputW.value, MIN_W, MAX_W, cur.w);
      var h = clamp(inputH.value, MIN_H, MAX_H, cur.h);
      inputW.value = w; inputH.value = h; // 최소보다 작게 넣으면 최소로 고쳐 보여 준다
      if (w !== cur.w || h !== cur.h) protoSettingsWrite({ frameMode: 'custom', frameW: w, frameH: h });
    }
    el.addEventListener('change', commit);
    el.addEventListener('keydown', function (e) { if (e.key === 'Enter') { commit(); el.blur(); } });
  });

  window.addEventListener('resize', function () { if (!drag) apply(cur.w, cur.h); });

  fromSettings(protoSettingsRead());
  protoSettingsSubscribe(fromSettings);
})();
