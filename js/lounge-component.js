/**
 * 라운지 홈 (탐색 · 트렌드) — Vue 3 CDN 컴포넌트
 * -------------------------------------------------------------
 * 실제 lounge.onstove.com/ko 홈을 다시 실측해 옮긴 것 (2026-11-17, 사용자 "지금 기준으로").
 * 예전 "오늘의 1등" 날짜 화면은 지웠다.
 * 글 · 작성자 · 썸네일 · 배너는 실제 웹에서 받아 온 고정 데이터(assets/lounge/v2-*).
 * 구글 광고 자리(피드 중간 · 오른쪽 단)는 뺐다.
 *
 * 반응형은 라운지 웹 그대로 — 기준은 라운지 화면 폭(= 클라이언트 콘텐츠 영역 .main):
 *   1280 미만: 1단 아이콘 레일 72 / 2단 남는 폭(최대 812, 안쪽 여백 32) / 3단 328
 *   1280 이상: 1단 글자 메뉴 200(왼쪽 고정) / 3단 364
 *   1380 이상: 2단 · 3단 사이 48, 가운데 정렬
 * 스타일은 css/lounge.css.
 */

// 1단 — 아이콘 레일(좁을 때) · 글자 메뉴(넓을 때) 공용
var LOUNGE_MENU = [
  { id: 'explore', label: '탐색', icon: 'ic-v2-control-long-arrow-up-circle-fill', rotate: true },
  { id: 'tags', label: '인기 태그', icon: 'ic-v2-control-preview-line',
    subs: [
      { label: '라운지 NPC', icon: 'ic-v2-community-person-line' },
      { label: '내마음속의1등' }, { label: '유머' }, { label: '리뷰' }, { label: '게임추천' },
      { label: '더 보기', icon: 'ic-v2-control-add-line', more: true },
    ] },
  { id: 'following', label: '팔로잉', icon: 'ic-v2-community-officialtag-line', edit: true, fold: true },
  { id: 'game-feed', label: '게임 피드', icon: 'ic-v2-object-game-line', fold: true },
  { id: 'today1', label: '오늘의 1등', icon: 'ic-v2-object-fire-line', chip: '다시보기' },
  { id: 'notice', label: '공지', icon: 'ic-v2-object-notice-line', isNew: true },
];

var LOUNGE_TICKER = '🍀행운의 주인공은 바로 나? 글, 댓글, 좋아요 남기고 보상 받아가세요!';
var LOUNGE_TABS = ['트렌드', '추천', '팔로잉', '최신'];

// 트렌드 피드 — avatar · thumb는 assets/lounge/ 파일 이름
var LOUNGE_FEED = [
  { avatar: 'v2-avatar-01.webp', name: 'Dieselweasels', time: '5분 전', temp: 0, title: 'Beepi는 훈련 쪽이 은근히 걸린다',
    body: '알을 어떻게 돌보느냐로 성격이 정해진다. 그 다음은 훈련이다. 힘, 민첩, 집중을 올리면 던전 선택지가 달라진다.<br>형태가 240개라 수집이 끝이 없다. 브라우저에서 무료고, 데이터 수집 없다.', like: 0, reply: 0 },
  { avatar: 'v2-avatar-01.webp', name: 'Dieselweasels', time: '7분 전', temp: 0, title: 'Cursed Depths 일일 던전 쪽',
    body: '일일 던전이 9개 있는데, 이름부터 이상하다. 유령 아케이드, 심해 가라오케 같은 식이다.<br>본편은 어두운 판타지인데 이쪽은 점점 이상해진다. 그게 맞다.', like: 0, reply: 0 },
  { avatar: 'v2-avatar-02.webp', name: '다나가나왔다', time: '19분 전', temp: 51, title: '초콜릿 와퍼 먹고 후기 공유해주실 분 구합니다 🍔',
    body: '버거킹 성수점 한정으로 초콜릿 와퍼 출시 한다네요<br>초콜릿 퍼지 번에 딸기 젤리에 브라우니 패티~', thumb: 'v2-feed-03.webp', count: 3, like: 3, reply: 12 },
  { avatar: 'v2-avatar-03.png', name: '뉸젱잃', time: '19분 전', temp: 25, title: 'GTA6 이틀 남앗네요',
    body: 'GTA6 새로운 경찰 추적 시스템이라는데 엄청 현실적이네요<br>NPC들이 엄청 발전햇나봐요', thumb: 'v2-feed-04.webp', count: 2, like: 2, reply: 2 },
  { avatar: 'v2-avatar-04.webp', name: '흥난다부기', time: '25분 전', temp: 43, title: '다들 젤 좋아하는 캐롤 모임?',
    body: '쓰고가셈', like: 3, reply: 5 },
  { avatar: 'v2-avatar-05.webp', name: '아니치겟더라고사람을', time: '34분 전', temp: 20, title: '캐롤듣고싶어 근데 듣기싫어',
    body: '근데 연말이라 캐롤분위기 내고싶어<br>근데 들으면 진짜 연말같아서 듣기실어', like: 1, reply: 4 },
  { avatar: 'v2-avatar-06.webp', name: 'STOVE83513440', time: '40분 전', temp: 3, title: '출첵 17일~~!!',
    body: '22', like: 0, reply: 1 },
  { avatar: 'v2-avatar-07.png', name: '축구좀차닝', time: '44분 전', temp: 59, title: '형 왔다',
    body: '형 출금하려면 빨리 돈 모아야 한다<br>그런 의미에서 글 하나 쓰고 간다', thumb: 'v2-feed-09.webp', like: 5, reply: 3 },
  { avatar: 'v2-avatar-08.webp', name: '두치와뿌꾸뿌꾸빵', time: '1시간 전', temp: 51, title: '이런 기괴한 콜라보 같으니라고',
    body: '...<br>...', thumb: 'v2-feed-10.webp', like: 4, reply: 4 },
  { avatar: 'v2-avatar-09.webp', name: '밥술회전먹고싶다', time: '1시간 전', temp: 111, title: '지역별 방어맛집',
    body: '사진만 봐도 힘들다', thumb: 'v2-feed-11.webp', count: 6, like: 9, reply: 8 },
];

// 지난 인기글 다시보기
var LOUNGE_HOT = [
  { title: '롤 이스포츠)에메랄드 티어에서 롤드컵 컨텐더까지, 369의 서사를 알아보자..', temp: '1,095', reply: 26, thumb: 'v2-hot-1.webp', count: 8 },
  { title: '그 시절 닌텐도DS 레전드 게임 기억하시나요?', temp: '1,442', reply: 55, thumb: 'v2-hot-2.webp', count: 6 },
  { title: '1인당 2만원 댓글만 써도 2만원 억시탈이 쏩니다.', temp: '1,471', reply: 124, thumb: 'v2-hot-3.webp' },
];

// 오른쪽 미니 배너 — 4초마다 넘어간다 (웹과 같은 순서: 오늘의 1등 결산 → 라운지 NPC)
var LOUNGE_MINI_BANNERS = [
  { src: 'v2-minibanner-today1.webp', alt: '오늘의1등 43일 간의 이벤트 결산' },
  { src: 'v2-minibanner-npc.webp', alt: '라운지NPC' },
];

var LOUNGE_FOOTER = ['회사 소개', '이용 약관', '개인정보처리방침', '청소년보호정책', '운영정책', '이벤트 규약', '고객센터'];

function loungeAsset(name) { return 'assets/lounge/' + name; }

var LoungeMain = {
  data: function () {
    return {
      menu: LOUNGE_MENU,
      selectedMenu: 'explore',
      ticker: LOUNGE_TICKER,
      tabs: LOUNGE_TABS,
      selectedTab: '트렌드',
      feed: LOUNGE_FEED,
      hot: LOUNGE_HOT,
      banners: LOUNGE_MINI_BANNERS,
      bannerIndex: 0,
      footer: LOUNGE_FOOTER,
    };
  },
  mounted: function () {
    var self = this;
    this._bannerTimer = setInterval(function () { self.bannerIndex = (self.bannerIndex + 1) % self.banners.length; }, 4000);
  },
  beforeUnmount: function () { clearInterval(this._bannerTimer); },
  methods: { asset: loungeAsset },
  template:
    '<div class="lounge">' +

      // ---- 1단 (좁을 때): 아이콘 레일 ----
      '<nav class="lounge-rail" aria-label="라운지 메뉴">' +
        '<button v-for="m in menu" :key="m.id" class="lounge-rail__item" :class="{ \'is-selected\': selectedMenu === m.id }" type="button" @click="selectedMenu = m.id">' +
          '<span class="lounge-rail__icon">' +
            '<i :class="[m.icon, { \'is-rotated\': m.rotate }]" aria-hidden="true"></i>' +
            '<img v-if="m.isNew" class="lounge-new" :src="asset(\'v2-badge-new.svg\')" alt="새 글" />' +
          '</span>' +
          '<span class="lounge-rail__label">{{ m.label }}</span>' +
          '<span v-if="m.chip" class="lounge-chip lounge-chip--replay">{{ m.chip }}</span>' +
        '</button>' +
      '</nav>' +

      // ---- 1단 (넓을 때): 글자 메뉴 200 ----
      '<nav class="lounge-nav" aria-label="라운지 메뉴">' +
        '<template v-for="m in menu" :key="m.id">' +
          '<button class="lounge-nav__item" :class="{ \'is-selected\': selectedMenu === m.id }" type="button" @click="selectedMenu = m.id">' +
            '<i :class="[m.icon, { \'is-rotated\': m.rotate }]" aria-hidden="true"></i>' +
            '<span class="lounge-nav__label">{{ m.label }}</span>' +
            '<i v-if="m.edit" class="ic-v2-community-pencil-line lounge-nav__edit" aria-hidden="true"></i>' +
            '<span v-if="m.chip" class="lounge-chip lounge-chip--replay">{{ m.chip }}</span>' +
            '<img v-if="m.isNew" class="lounge-new lounge-new--inline" :src="asset(\'v2-badge-new.svg\')" alt="새 글" />' +
            '<i v-if="m.fold" class="ic-v2-control-select-arrow-down-fill lounge-nav__fold" aria-hidden="true"></i>' +
          '</button>' +
          '<div v-if="m.subs" class="lounge-nav__subs">' +
            '<a v-for="s in m.subs" :key="s.label" class="lounge-nav__sub" :class="{ \'is-more\': s.more }" href="#" @click.prevent>' +
              '<i v-if="s.icon" :class="s.icon" aria-hidden="true"></i><span v-else class="lounge-nav__hash" aria-hidden="true">#</span>' +
              '<span>{{ s.label }}</span>' +
            '</a>' +
          '</div>' +
        '</template>' +
      '</nav>' +

      // ---- 2단 + 3단 ----
      '<div class="lounge-wrap">' +
        '<div class="lounge-row">' +
          '<section class="lounge-center">' +
            // 이벤트 소식 한 줄 — 좌우 화살표로 넘김
            '<div class="lounge-ticker">' +
              '<a class="lounge-ticker__link" href="#" @click.prevent>' +
                '<span class="lounge-chip lounge-chip--event">이벤트</span>' +
                '<span class="lounge-ticker__text">{{ ticker }}</span>' +
              '</a>' +
              '<span class="lounge-ticker__nav">' +
                '<button class="lounge-ticker__arrow" type="button" aria-label="이전 소식"><i class="ic-v2-control-arrow-left-line"></i></button>' +
                '<i class="lounge-ticker__div" aria-hidden="true"></i>' +
                '<button class="lounge-ticker__arrow" type="button" aria-label="다음 소식"><i class="ic-v2-control-arrow-right-line"></i></button>' +
              '</span>' +
            '</div>' +
            '<a class="lounge-banner" href="#" @click.prevent>' +
              '<img :src="asset(\'v2-banner-lucky-winner.webp\')" alt="행운의 주인공은 바로 나? 글, 댓글, 좋아요 남기고 보상 받아가세요!" />' +
            '</a>' +
            '<div class="lounge-tabs">' +
              '<button v-for="t in tabs" :key="t" class="lounge-tabs__tab" :class="{ \'is-selected\': selectedTab === t }" type="button" @click="selectedTab = t">{{ t }}</button>' +
            '</div>' +
            '<div class="lounge-feed">' +
              '<article v-for="(p, i) in feed" :key="i" class="lounge-post">' +
                '<div class="lounge-post__meta">' +
                  '<span class="lounge-post__author">' +
                    '<img class="lounge-post__avatar" :src="asset(p.avatar)" alt="" />' +
                    '<span class="lounge-post__name">{{ p.name }}</span>' +
                    '<i class="lounge-post__dot" aria-hidden="true"></i>' +
                    '<span class="lounge-post__time">{{ p.time }}</span>' +
                  '</span>' +
                  '<span class="lounge-temp">{{ p.temp }}℃</span>' +
                '</div>' +
                '<div class="lounge-post__content">' +
                  '<div class="lounge-post__text">' +
                    '<strong class="lounge-post__title">{{ p.title }}</strong>' +
                    '<p class="lounge-post__body" v-html="p.body"></p>' +
                    '<div class="lounge-post__actions">' +
                      '<button class="lounge-post__action" type="button"><i class="ic-v2-community-like-line"></i>좋아요 {{ p.like }}</button>' +
                      '<button class="lounge-post__action" type="button"><i class="ic-v2-community-reply-line"></i>댓글 {{ p.reply }}</button>' +
                    '</div>' +
                  '</div>' +
                  '<span v-if="p.thumb" class="lounge-thumb lounge-thumb--feed">' +
                    '<img :src="asset(p.thumb)" alt="" />' +
                    '<span v-if="p.count" class="lounge-thumb__count">{{ p.count }}</span>' +
                  '</span>' +
                '</div>' +
              '</article>' +
            '</div>' +
          '</section>' +

          '<aside class="lounge-aside">' +
            '<div class="lounge-search">' +
              '<span class="lounge-search__placeholder">라운지에서 검색하기</span>' +
              '<i class="ic-v2-navigation-search-line" aria-hidden="true"></i>' +
            '</div>' +
            // 로그인 후 내 프로필 카드
            '<div class="lounge-card lounge-profile">' +
              '<div class="lounge-profile__head">' +
                '<div class="lounge-profile__info">' +
                  '<strong class="lounge-profile__name">휴먼메이드</strong>' +
                  '<div class="lounge-profile__stats"><span>글 11</span><i aria-hidden="true"></i><span>댓글 37</span></div>' +
                '</div>' +
                '<span class="lounge-profile__avatar"><img :src="asset(\'profile-me.png\')" alt="" /></span>' +
              '</div>' +
              '<div class="lounge-profile__btns">' +
                '<button class="lounge-btn lounge-btn--primary" type="button">글쓰기<i class="ic-v2-community-pencil-fill"></i></button>' +
                '<button class="lounge-btn lounge-btn--neutral" type="button">MY홈</button>' +
              '</div>' +
              '<a class="lounge-profile__reward" href="#" @click.prevent>' +
                '<span class="lounge-profile__reward-label">누적 참여 보상</span>' +
                '<span class="lounge-profile__reward-value">0원<i class="ic-v2-control-arrow-right-line" aria-hidden="true"></i></span>' +
              '</a>' +
            '</div>' +
            '<div class="lounge-recs">' +
              '<strong class="lounge-recs__title">지난 인기글 다시보기</strong>' +
              '<div class="lounge-recs__list">' +
                '<a v-for="(r, i) in hot" :key="i" class="lounge-rec" href="#" @click.prevent>' +
                  '<span class="lounge-rec__text">' +
                    '<strong class="lounge-rec__title">{{ r.title }}</strong>' +
                    '<span class="lounge-rec__meta"><span class="lounge-temp lounge-temp--hot">{{ r.temp }}℃</span><span>댓글 {{ r.reply }}</span></span>' +
                  '</span>' +
                  '<span class="lounge-thumb lounge-thumb--rec">' +
                    '<img :src="asset(r.thumb)" alt="" />' +
                    '<span v-if="r.count" class="lounge-thumb__count">{{ r.count }}</span>' +
                  '</span>' +
                '</a>' +
              '</div>' +
            '</div>' +
            '<a class="lounge-mini" href="#" @click.prevent>' +
              '<img v-for="(b, i) in banners" :key="b.src" :class="{ \'is-on\': i === bannerIndex }" :src="asset(b.src)" :alt="b.alt" />' +
              '<span class="lounge-mini__pager">{{ bannerIndex + 1 }} / {{ banners.length }}</span>' +
            '</a>' +
            '<footer class="lounge-footer">' +
              '<nav class="lounge-footer__links"><a v-for="f in footer" :key="f" href="#" :class="{ \'is-strong\': f === \'개인정보처리방침\' }" @click.prevent>{{ f }}</a></nav>' +
              '<small class="lounge-footer__copy">© Smilegate. All Rights Reserved.</small>' +
              '<span class="lounge-footer__logo">Smilegate</span>' +
            '</footer>' +
          '</aside>' +
        '</div>' +
      '</div>' +

    '</div>',
};

function mountLoungeMain(selector) {
  return Vue.createApp(LoungeMain).mount(selector);
}
