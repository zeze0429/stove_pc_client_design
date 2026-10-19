/**
 * 페이지(.main) 오버레이 스크롤바
 * -------------------------------------------------------------
 * 네이티브 스크롤바는 콘텐츠 폭을 24만큼 깎아먹어서, 1040 폭으로 캡처한
 * 스토어·이벤트·라운지 미리보기의 좌우 여백(40/40)이 틀어진다. 그래서
 * 네이티브는 숨기고(css/dashboard.css .main--overlay-scroll) 같은 모양의
 * 썸을 콘텐츠 위에 직접 띄운다 — 사이드바(.gnb-scrollbar)와 같은 방식.
 * 모양은 웹(store.onstove.com) 스크롤바의 보이는 부분 그대로: 폭 0.8rem,
 * 오른쪽·위아래 0.8rem 안쪽. 썸은 끌어서 스크롤할 수 있다.
 *
 *   mountPageScrollbar(document.querySelector('.app > .main'));
 */
function mountPageScrollbar(scroller) {
  if (!scroller) return;
  var host = scroller.parentElement; // .app (position: relative)
  var track = document.createElement('div');
  track.className = 'page-scrollbar';
  track.setAttribute('aria-hidden', 'true');
  var thumb = document.createElement('div');
  thumb.className = 'page-scrollbar__thumb';
  track.appendChild(thumb);
  host.appendChild(track);

  var MIN_THUMB = 48; // 웹과 같은 최소 길이(4.8rem)

  function update() {
    var content = scroller.scrollHeight;
    var visible = scroller.clientHeight;
    var trackHeight = track.clientHeight;
    if (content <= visible + 1 || trackHeight <= 0) {
      thumb.style.display = 'none';
      return;
    }
    thumb.style.display = '';
    var h = Math.max(trackHeight * (visible / content), MIN_THUMB);
    var top = (trackHeight - h) * (scroller.scrollTop / (content - visible));
    thumb.style.height = h + 'px';
    thumb.style.transform = 'translateY(' + top + 'px)';
  }

  scroller.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  // 이미지가 늦게 로드되거나 테마가 바뀌어 다른 이미지로 갈아끼우면 높이가 변한다
  if (window.ResizeObserver) {
    var ro = new ResizeObserver(update);
    ro.observe(scroller);
    Array.prototype.forEach.call(scroller.children, function (el) { ro.observe(el); });
  }
  scroller.addEventListener('load', update, true);

  // 썸 끌기 — 썸이 움직인 만큼 콘텐츠를 비율대로 스크롤
  thumb.addEventListener('mousedown', function (e) {
    e.preventDefault();
    var startY = e.clientY;
    var startTop = scroller.scrollTop;
    var range = scroller.scrollHeight - scroller.clientHeight;
    var travel = track.clientHeight - thumb.offsetHeight;
    thumb.classList.add('is-dragging');
    function onMove(ev) {
      if (travel > 0) scroller.scrollTop = startTop + (ev.clientY - startY) * (range / travel);
    }
    function onUp() {
      thumb.classList.remove('is-dragging');
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    }
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  });

  update();
}
