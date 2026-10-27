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

// 빠른 실행 — 보유게임 중 플레이한 정식 게임을 최근 플레이 순으로 최대 20개 (별도 목록 없음)
var LIBRARY_QUICK_COUNT = 20;
var LIBRARY_QUICK_STEP = 4; // 화살표 한 번에 넘기는 카드 수 (레퍼런스: 4장 = 560)

// 빠른 실행 게임 광고 (Figma 2026_웹전환 11856:623971) — 두 번째 자리에 끼워 넣는 카드.
// 게임 개수(최대 20, 타이틀 옆 숫자)에는 포함하지 않는다. 카드 모양은 게임 카드와 같고
// 우측 상단 AD 뱃지 + 플레이 시간 자리에 광고 문구, 버튼은 action(play · install).
var LIBRARY_QUICK_AD_SLOT = 1; // 0부터 — 두 번째 카드
// 스토브게임(사이드바 고정 그룹)은 광고로도 빠른 실행에 넣지 않는다.
// 광고 게임은 일반 카드 목록에서 빠진다(같은 게임이 두 번 나오지 않게).
var LIBRARY_QUICK_AD = { game: 'store-30', message: '지금 바로 플레이해보세요!', action: 'play' };

// 보유게임 — action: play(실행) · update(업데이트) · install(설치)
//   played: 마지막 플레이가 몇 분 전인지 (없으면 플레이 기록 없음), total: 총 플레이 시간
var LIBRARY_OWNED = [
  { id: 'atom-rpg', action: 'play', collection: true, played: 60, total: '총 172시간 35분' },
  { id: 'ghostrunner', action: 'update' },
  { id: 'deluvian-winds', action: 'play', played: 10, total: '총 24시간 30분' },
  { id: 'scarf', action: 'install' },
  { id: 'floppy-knight', action: 'update', played: 50000, total: '총 87시간 21분' },
  { id: 'novena-diabolos', action: 'play', played: 1500, total: '총 117시간 5분' },
  { id: 'bullet-delivery', action: 'install' },
  { id: 'illips', action: 'play', played: 4320, total: '총 128시간 12분' },
  { id: 'undying', action: 'update' },
  { id: 'bus-world', action: 'install' },
  { id: 'yoryeong-village', action: 'play', played: 10080, total: '총 56시간 42분' },
  { id: 'hwayeonwol', action: 'install' },
  { id: 'fog-detective', action: 'update', played: 52000, total: '총 9시간 47분' },
  { id: 'under-blue-horizon', action: 'play', played: 10200, total: '총 128시간 12분' },
  { id: 'suicide-countdown', action: 'install' },
  { id: 'happy-quest', action: 'play', played: 20160, total: '총 146시간 8분' },
  { id: 'four-lights', action: 'install' },
  { id: 'cabbage', action: 'update' },
  { id: 'utawarerumono', action: 'install' },
  { id: 'atom-rpg-supporter', action: 'update' },
  { id: 'baek-wallpaper', action: 'play', played: 20300, total: '총 24시간 30분' },
  { id: '52hz', action: 'install' },
  { id: 'storm-maid', action: 'update' },
  { id: 'eyes-nose-mouth', action: 'install' },
  { id: 'hamster-talk', action: 'update' },
  { id: 'gigabash', action: 'install' },
  { id: 'sisters', action: 'install' },
  { id: 'dice-eater', action: 'play', played: 30240, total: '총 93시간 51분' },
  { id: 'into-the-room', action: 'play', played: 30400, total: '총 56시간 42분' },
  { id: 'knight-overloaded', action: 'install' },
  { id: 'dosul', action: 'install' },
  { id: 'infinite-incantation', action: 'update' },
  { id: 'flower-survivors', action: 'play', played: 43200, total: '총 12시간 4분' },
  { id: 'whos-my-manito', action: 'install' },
  { id: 'everything-is-crab', action: 'install' },
  { id: 'postal2', action: 'install' },
  { id: 'reblade', action: 'play', played: 44000, total: '총 3시간 18분' },
  { id: 'zombie-shooting-star', action: 'install' },
  { id: 'noexistencen', action: 'update' },
  { id: 'primal-slidey', action: 'install' },
  { id: 'critter-cove', action: 'update' },
  // 스토어 신작 59개 — 버튼 상태 · 최근 플레이는 시안용 임의 값
  { id: 'store-01', action: 'install' },
  { id: 'store-02', action: 'update' },
  { id: 'store-03', action: 'install' },
  { id: 'store-04', action: 'play', played: 60000, total: '총 41시간 3분' },
  { id: 'store-05', action: 'install' },
  { id: 'store-06', action: 'install' },
  { id: 'store-07', action: 'update' },
  { id: 'store-08', action: 'play', played: 67000, total: '총 6시간 52분' },
  { id: 'store-09', action: 'install' },
  { id: 'store-10', action: 'update' },
  { id: 'store-11', action: 'install' },
  { id: 'store-12', action: 'play', played: 74000, total: '총 19시간 8분' },
  { id: 'store-13', action: 'install' },
  { id: 'store-14', action: 'install' },
  { id: 'store-15', action: 'update' },
  { id: 'store-16', action: 'play', played: 81000, total: '총 2시간 36분' },
  { id: 'store-17', action: 'install' },
  { id: 'store-18', action: 'update' },
  { id: 'store-19', action: 'install' },
  { id: 'store-20', action: 'play', played: 88000, total: '총 73시간 15분' },
  { id: 'store-21', action: 'install' },
  { id: 'store-22', action: 'install' },
  { id: 'store-23', action: 'update' },
  { id: 'store-24', action: 'play', played: 95000, total: '총 158시간 40분' },
  { id: 'store-25', action: 'install' },
  { id: 'store-26', action: 'update' },
  { id: 'store-27', action: 'install' },
  { id: 'store-28', action: 'play', played: 102000, total: '총 11시간 29분' },
  { id: 'store-29', action: 'install' },
  { id: 'store-30', action: 'play', played: 5, total: '총 198시간 24분' },
  { id: 'store-31', action: 'update' },
  { id: 'store-32', action: 'play', played: 109000, total: '총 27시간 54분' },
  { id: 'store-33', action: 'install' },
  { id: 'store-34', action: 'update' },
  { id: 'store-35', action: 'install' },
  { id: 'store-36', action: 'play', played: 116000, total: '총 4시간 11분' },
  { id: 'store-37', action: 'install' },
  { id: 'store-38', action: 'install' },
  { id: 'store-39', action: 'update' },
  { id: 'store-40', action: 'play', played: 123000, total: '총 33시간 2분' },
  { id: 'store-41', action: 'install' },
  { id: 'store-42', action: 'update' },
  { id: 'store-43', action: 'install' },
  { id: 'store-44', action: 'play', played: 130000, total: '총 1시간 45분' },
  { id: 'store-45', action: 'install' },
  { id: 'store-46', action: 'install' },
  { id: 'store-47', action: 'update' },
  { id: 'store-48', action: 'play', played: 137000, total: '총 64시간 18분' },
  { id: 'store-49', action: 'install' },
  { id: 'store-50', action: 'update' },
  { id: 'store-51', action: 'install' },
  { id: 'store-52', action: 'play', played: 144000, total: '총 81시간 37분' },
  { id: 'store-53', action: 'install' },
  { id: 'store-54', action: 'install' },
  { id: 'store-55', action: 'update' },
  { id: 'store-56', action: 'play', played: 151000, total: '총 8시간 6분' },
  { id: 'store-57', action: 'install' },
  { id: 'store-58', action: 'update' },
  { id: 'store-59', action: 'install' },
];

// 실행 버튼 아이콘
var LIBRARY_ACTION_ICON = {
  play: 'ic-v2-media-av-play-round-fill',
  update: 'ic-v2-control-update-line',
  install: 'ic-v2-object-download-line',
};
var LIBRARY_ACTION_LABEL = { play: '실행', update: '업데이트', install: '설치' };

// 마지막 플레이(분 전) → "10분 전 플레이" · "어제 플레이" · "3일 전 플레이" …
function libraryPlayedLabel(min) {
  if (min == null) return '';
  if (min < 60) return min + '분 전 플레이';
  if (min < 1440) return Math.floor(min / 60) + '시간 전 플레이';
  if (min < 2880) return '어제 플레이';
  if (min < 10080) return Math.floor(min / 1440) + '일 전 플레이';
  if (min < 43200) return Math.floor(min / 10080) + '주 전 플레이';
  return Math.floor(min / 43200) + '달 전 플레이';
}

function libraryGame(entry) {
  return Object.assign({}, gameInfo(entry.id), entry, { lastPlayed: libraryPlayedLabel(entry.played) });
}

var LibraryMain = {
  data: function () {
    return {
      owned: LIBRARY_OWNED.map(libraryGame),
      quickPage: 0,
      quickActive: 0, // 넓게 펼쳐진 카드 — 마우스를 올린 카드, 없으면 지금 페이지 첫 카드
      view: 'grid',
      query: '',
    };
  },
  computed: {
    // 빠른 실행 — 플레이 기록이 있는 정식 게임(DLC · 데모 · 합본팩 · 부가 콘텐츠 제외)을 최근 순으로 최대 20개
    quick: function () {
      return this.owned
        .filter(function (g) { return g.type === 'game' && g.played != null && g.id !== LIBRARY_QUICK_AD.game; })
        .sort(function (a, b) { return a.played - b.played; })
        .slice(0, LIBRARY_QUICK_COUNT);
    },
    // 화면에 놓이는 카드 — 게임 목록 두 번째 자리에 광고 카드를 끼운다
    quickCards: function () {
      var cards = this.quick.map(function (g) { return Object.assign({ key: g.id, action: 'play' }, g); });
      var ad = gameInfo(LIBRARY_QUICK_AD.game);
      if (ad && cards.length) {
        cards.splice(Math.min(LIBRARY_QUICK_AD_SLOT, cards.length), 0, Object.assign({}, ad, {
          key: 'ad-' + ad.id, ad: true, message: LIBRARY_QUICK_AD.message, action: LIBRARY_QUICK_AD.action,
        }));
      }
      return cards;
    },
    quickStep: function () { return LIBRARY_QUICK_STEP; },
    quickPages: function () { return Math.ceil(this.quickCards.length / LIBRARY_QUICK_STEP); },
    // 4장씩 묶은 페이지 — 각 카드에 전체 순번(index)을 붙여 둔다
    quickPageList: function () {
      var pages = [];
      this.quickCards.forEach(function (g, i) {
        var p = Math.floor(i / LIBRARY_QUICK_STEP);
        (pages[p] = pages[p] || []).push(Object.assign({ index: i }, g));
      });
      return pages;
    },
    quickTrackStyle: function () {
      // 페이지 상자(트랙 폭 100%) + 간격 20씩 넘긴다
      var p = this.quickPage;
      return { transform: 'translateX(calc(' + (-p * 100) + '% - ' + (p * 20) + 'px))' };
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
    hoverQuick: function (i) {
      if (Math.floor(i / LIBRARY_QUICK_STEP) === this.quickPage) this.quickActive = i;
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
           // 페이지(4장)마다 680 고정 상자 — 카드들이 동시에 커지고 줄어도 합이 항상 680
           '<div v-for="(page, p) in quickPageList" :key="p" class="library-quick__page" :class="{ \'is-offpage\': p !== quickPage, \'is-full\': page.length === quickStep }">' +
            '<div v-for="g in page" :key="g.key" class="library-quick__card"' +
              ' :class="{ \'is-active\': g.index === quickActive, \'library-quick__card--ad\': g.ad }" @mouseenter="hoverQuick(g.index)">' +
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
                    // 게임: 최근 플레이 · 총 시간 / 광고: 같은 자리에 광고 문구
                    '<span v-if="g.ad" class="library-quick__meta"><span>{{ g.message }}</span></span>' +
                    '<span v-else class="library-quick__meta"><span>{{ g.lastPlayed }}</span><template v-if="g.total"><i aria-hidden="true"></i><span>{{ g.total }}</span></template></span>' +
                    '<button class="library-action" type="button" :aria-label="actionLabel(g.action)"><i :class="actionIcon(g.action)"></i></button>' +
                  '</div>' +
                '</div>' +
              '</div>' +
              '<span class="library-quick__border" aria-hidden="true"></span>' +
              '<span v-if="g.ad" class="library-ad-badge" aria-label="광고">AD</span>' +
            '</div>' +
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
              '<span class="library-card__media"><img :src="g.thumb" alt="" loading="lazy" /></span>' +
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
