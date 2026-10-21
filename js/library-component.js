/**
 * 라이브러리 콘텐츠 (MD_container) — Vue 3 CDN 컴포넌트
 * -------------------------------------------------------------
 * 레퍼런스: Figma Make quartz-unique-70171087.figma.site 라이브러리 화면 실측.
 * 구성: 빠른 실행(가로 캐러셀) · 보유게임(도구 줄 + 5단 카드). 페이지 타이틀은
 * 클라이언트 레이아웃 공통(.client-page-title, library.html).
 * Figma 2026_웹전환 11769:156966 기준으로 맞춤.
 * 게임 이름 · 장르 · 썸네일은 공통 카탈로그(js/game-catalog.js)에서 가져오고,
 * 여기엔 라이브러리 고유 정보(최근 플레이 · 총 플레이 시간 · 실행 버튼 상태)만 둔다.
 * 색은 레퍼런스가 쓰는 STDS 시멘틱 토큰 그대로 (css/library.css).
 * 우측 패널(내 게임 폴더)은 다음 단계.
 */

// 빠른 실행 — 최근 플레이 순
var LIBRARY_QUICK = [
  { id: 'deluvian-winds', lastPlayed: '10분 전 플레이', total: '총 24시간 30분' },
  { id: 'atom-rpg', lastPlayed: '1시간 전 플레이', total: '총 4,679시간 59분' },
  { id: 'novena-diabolos', lastPlayed: '어제 플레이', total: '총 312시간 5분' },
  { id: 'illips', lastPlayed: '3일 전 플레이', total: '총 128시간 12분' },
  { id: 'yoryeong-village', lastPlayed: '1주 전 플레이', total: '총 56시간 42분' },
  { id: 'under-blue-horizon', lastPlayed: '10분 전 플레이', total: '총 128시간 12분' },
  { id: 'happy-quest', lastPlayed: '1시간 전 플레이', total: '총 1,205시간 8분' },
  { id: 'baek-wallpaper', lastPlayed: '어제 플레이', total: '총 24시간 30분' },
  { id: 'dice-eater', lastPlayed: '3일 전 플레이', total: '총 1,205시간 8분' },
  { id: 'into-the-room', lastPlayed: '1주 전 플레이', total: '총 56시간 42분' },
  { id: 'flower-survivors', lastPlayed: '어제 플레이', total: '총 12시간 4분' },
  { id: 'reblade', lastPlayed: '1시간 전 플레이', total: '총 3시간 18분' },
];
var LIBRARY_QUICK_STEP = 4; // 화살표 한 번에 넘기는 카드 수 (레퍼런스: 4장 = 560)

// 보유게임 — action: play(실행) · update(업데이트) · install(설치)
var LIBRARY_OWNED = [
  { id: 'atom-rpg', action: 'play', lastPlayed: '1시간 전 플레이', collection: true },
  { id: 'ghostrunner', action: 'update' },
  { id: 'deluvian-winds', action: 'play', lastPlayed: '10분 전 플레이' },
  { id: 'scarf', action: 'install' },
  { id: 'floppy-knight', action: 'update', lastPlayed: '1주 전 플레이' },
  { id: 'novena-diabolos', action: 'play', lastPlayed: '어제 플레이' },
  { id: 'bullet-delivery', action: 'install' },
  { id: 'illips', action: 'play', lastPlayed: '3일 전 플레이' },
  { id: 'undying', action: 'update' },
  { id: 'bus-world', action: 'install' },
  { id: 'yoryeong-village', action: 'play', lastPlayed: '1주 전 플레이' },
  { id: 'hwayeonwol', action: 'install' },
  { id: 'fog-detective', action: 'update', lastPlayed: '어제 플레이' },
  { id: 'under-blue-horizon', action: 'play', lastPlayed: '10분 전 플레이' },
  { id: 'suicide-countdown', action: 'install' },
  { id: 'happy-quest', action: 'play', lastPlayed: '1시간 전 플레이' },
  { id: 'four-lights', action: 'install' },
  { id: 'cabbage', action: 'update' },
  { id: 'utawarerumono', action: 'install' },
  { id: 'atom-rpg-supporter', action: 'update' },
  { id: 'baek-wallpaper', action: 'play', lastPlayed: '10분 전 플레이' },
  { id: '52hz', action: 'install' },
  { id: 'storm-maid', action: 'update' },
  { id: 'eyes-nose-mouth', action: 'install' },
  { id: 'hamster-talk', action: 'update' },
  { id: 'gigabash', action: 'install' },
  { id: 'sisters', action: 'install' },
  { id: 'dice-eater', action: 'play', lastPlayed: '어제 플레이' },
  { id: 'into-the-room', action: 'play', lastPlayed: '3일 전 플레이' },
  { id: 'knight-overloaded', action: 'install' },
  { id: 'dosul', action: 'install' },
  { id: 'infinite-incantation', action: 'update' },
  { id: 'flower-survivors', action: 'play', lastPlayed: '어제 플레이' },
  { id: 'whos-my-manito', action: 'install' },
  { id: 'everything-is-crab', action: 'install' },
  { id: 'postal2', action: 'install' },
  { id: 'reblade', action: 'play', lastPlayed: '1시간 전 플레이' },
  { id: 'zombie-shooting-star', action: 'install' },
  { id: 'noexistencen', action: 'update' },
  { id: 'primal-slidey', action: 'install' },
  { id: 'critter-cove', action: 'update' },
];

// 실행 버튼 아이콘
var LIBRARY_ACTION_ICON = {
  play: 'ic-v2-media-av-play-round-fill',
  update: 'ic-v2-control-update-line',
  install: 'ic-v2-object-download-line',
};
var LIBRARY_ACTION_LABEL = { play: '실행', update: '업데이트', install: '설치' };

function libraryGame(entry) {
  return Object.assign({}, gameInfo(entry.id), entry);
}

var LibraryMain = {
  data: function () {
    return {
      quick: LIBRARY_QUICK.map(libraryGame),
      owned: LIBRARY_OWNED.map(libraryGame),
      quickPage: 0,
      quickActive: 0, // 넓게 펼쳐진 카드 — 마우스를 올린 카드, 없으면 지금 페이지 첫 카드
      view: 'grid',
      query: '',
    };
  },
  computed: {
    quickPages: function () { return Math.ceil(this.quick.length / LIBRARY_QUICK_STEP); },
    quickTrackStyle: function () {
      // 레퍼런스: translateX(-페이지 x (80% + 16px)) — 680 트랙 기준 4장(560)씩
      var p = this.quickPage;
      return { transform: 'translateX(calc(' + (-p * 80) + '% - ' + (p * 16) + 'px))' };
    },
    filteredOwned: function () {
      var q = this.query.trim().toLowerCase();
      if (!q) return this.owned;
      return this.owned.filter(function (g) {
        return g.name.toLowerCase().indexOf(q) >= 0 || g.genre.toLowerCase().indexOf(q) >= 0;
      });
    },
  },
  methods: {
    goQuick: function (delta) {
      var next = Math.min(Math.max(this.quickPage + delta, 0), this.quickPages - 1);
      if (next === this.quickPage) return;
      this.quickPage = next;
      this.quickActive = next * LIBRARY_QUICK_STEP;
    },
    // 지금 페이지의 4장만 보인다 — 빠르게 여러 카드를 훑으면 커지는 카드와 줄어드는
    // 카드가 겹쳐 줄 전체 폭이 잠깐 줄어드는데, 그 틈으로 다음 페이지 카드가 비치지 않게
    hoverQuick: function (i) { if (this.onPage(i)) this.quickActive = i; },
    onPage: function (i) {
      var start = this.quickPage * LIBRARY_QUICK_STEP;
      return i >= start && i < start + LIBRARY_QUICK_STEP;
    },
    actionIcon: function (a) { return LIBRARY_ACTION_ICON[a]; },
    actionLabel: function (a) { return LIBRARY_ACTION_LABEL[a]; },
  },
  template:
    '<div class="library">' +


      // ---- 빠른 실행 ----
      '<section class="library-section library-quick">' +
        '<div class="library-section__head">' +
          '<h2 class="library-section__title">빠른 실행<span>{{ quick.length }}</span></h2>' +
          '<div class="library-quick__nav">' +
            '<button class="library-quick__arrow" type="button" aria-label="이전" :disabled="quickPage === 0" @click="goQuick(-1)"><i class="ic-v2-control-arrow-left-line"></i></button>' +
            '<button class="library-quick__arrow" type="button" aria-label="다음" :disabled="quickPage >= quickPages - 1" @click="goQuick(1)"><i class="ic-v2-control-arrow-right-line"></i></button>' +
          '</div>' +
        '</div>' +
        '<div class="library-quick__viewport">' +
          '<div class="library-quick__track" :style="quickTrackStyle">' +
            '<div v-for="(g, i) in quick" :key="g.id" class="library-quick__card"' +
              ' :class="{ \'is-active\': i === quickActive, \'is-offpage\': !onPage(i) }" @mouseenter="hoverQuick(i)">' +
              '<img class="library-quick__thumb" :src="g.thumb" alt="" />' +
              // 펼친 카드 — 같은 이미지를 크게 깔고 흐리게 + 검정 60%
              '<div class="library-quick__expanded">' +
                '<div class="library-quick__backdrop"><img :src="g.thumb" alt="" /></div>' +
                '<div class="library-quick__body">' +
                  '<div class="library-quick__info">' +
                    '<span class="library-quick__icon"><img :src="g.thumb" alt="" /></span>' +
                    '<span class="library-quick__text"><span class="library-quick__genre">{{ g.genre }}</span><span class="library-quick__name">{{ g.name }}</span></span>' +
                  '</div>' +
                  '<div class="library-quick__foot">' +
                    '<span class="library-quick__meta"><span>{{ g.lastPlayed }}</span><i aria-hidden="true"></i><span>{{ g.total }}</span></span>' +
                    '<button class="library-action" type="button" aria-label="실행"><i class="ic-v2-media-av-play-round-fill"></i></button>' +
                  '</div>' +
                '</div>' +
              '</div>' +
              '<span class="library-quick__border" aria-hidden="true"></span>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>' +

      // ---- 보유게임 ----
      '<section class="library-section library-owned">' +
        '<h2 class="library-section__title">보유게임<span>{{ filteredOwned.length }}</span></h2>' +
        '<div class="library-owned__divider"></div>' +
        '<div class="library-toolbar" data-name="filter area">' +
          '<button class="library-btn" type="button"><i class="ic-v2-control-check-circle-line"></i>게임 선택</button>' +
          '<div class="library-toolbar__right">' +
            '<div class="library-view-toggle" role="tablist" aria-label="보기 방식">' +
              '<button type="button" role="tab" :aria-selected="view === \'grid\'" :class="{ \'is-selected\': view === \'grid\' }" aria-label="카드 보기" @click="view = \'grid\'"><i class="ic-v2-community-view-card-fill"></i></button>' +
              '<button type="button" role="tab" :aria-selected="view === \'list\'" :class="{ \'is-selected\': view === \'list\' }" aria-label="목록 보기" @click="view = \'list\'"><i class="ic-v2-community-view-list-fill"></i></button>' +
            '</div>' +
            '<button class="library-btn" type="button"><i class="ic-v2-community-filter-line"></i>필터</button>' +
            '<label class="library-search">' +
              '<input type="text" v-model="query" placeholder="게임 또는 검색어 입력" />' +
              '<i class="ic-v2-navigation-search-line" aria-hidden="true"></i>' +
            '</label>' +
          '</div>' +
        '</div>' +
        '<ul class="library-grid">' +
          '<li v-for="g in filteredOwned" :key="g.id" class="library-card">' +
            '<div class="library-card__thumb">' +
              '<img :src="g.thumb" alt="" loading="lazy" />' +
              '<span class="library-card__border" aria-hidden="true"></span>' +
              '<button class="library-action library-card__action" type="button" :aria-label="actionLabel(g.action)"><i :class="actionIcon(g.action)"></i></button>' +
              '<span v-if="g.collection" class="library-card__badge">Collection</span>' +
            '</div>' +
            '<div class="library-card__text">' +
              '<div class="library-card__main">' +
                '<p class="library-card__genre">{{ g.genre }}</p>' +
                '<p class="library-card__name">{{ g.name }}</p>' +
              '</div>' +
              '<p v-if="g.lastPlayed" class="library-card__played">{{ g.lastPlayed }}</p>' +
            '</div>' +
          '</li>' +
        '</ul>' +
      '</section>' +
    '</div>',
};

function mountLibraryMain(selector) {
  return Vue.createApp(LibraryMain).mount(selector);
}
