/**
 * 라운지 메인 (오늘의 1등) — Vue 3 CDN 컴포넌트
 * -------------------------------------------------------------
 * 실제 lounge.onstove.com/ko 를 실측해서 옮긴 것(2026-10-20). 예전엔 웹 캡처
 * 이미지 3장이었는데, 직접 그리면서 다크/라이트가 토큰으로 바로 바뀐다.
 * 글·작성자·썸네일은 실제 웹에서 받아 온 고정 데이터(assets/lounge/).
 * 스타일은 css/lounge.css. 3단 간격은 실제 클라이언트 기준
 * (좌 레일 64 / 52 / 가운데 520 / 56 / 오른쪽 280 / 64).
 */
var LOUNGE_RAIL = [
  { id: 'today1', label: '오늘의 1등', icon: 'ic-v2-object-fire-fill', badge: 'EVENT' },
  { id: 'recommend', label: '추천', icon: 'ic-v2-control-long-arrow-up-circle-line', rotate: true },
  { id: 'tags', label: '인기 태그', icon: 'ic-v2-control-preview-line' },
  { id: 'game-feed', label: '게임 피드', icon: 'ic-v2-object-game-line' },
  { id: 'notice', label: '공지', icon: 'ic-v2-object-notice-line' },
];

var LOUNGE_TOP3 = [
  { title: 'ㅊㅊ', temp: 20 },
  { title: '타이거 마스크를 아시나요?', temp: 23 },
  { title: '마지막..', temp: 21 },
];

var LOUNGE_TABS = ['전체', '급상승', '반응좀해줘', '뜰것같아'];

function loungeAvatar(name) { return 'assets/lounge/avatar-' + name + '.png'; }

var LOUNGE_FEED = [
  { avatar: 'profile09', name: 'l마켓l', time: '4분 전', temp: 0, title: '성위12에 만족을 .?',
    body: '13을 가야 하나 말아야 하나 .<br>정수를 더모아서 해야하나 .;;;', thumb: '01', boost: 0, reply: 0 },
  { avatar: 'default02', name: '스트라이커하려고로아시작함', time: '5분 전', temp: 0, title: '오래보자',
    body: '오래보자 얘드라', thumb: '02', boost: 0, reply: 0 },
  { avatar: 'lifeisegg', name: 'Lifeisegg0', time: '32분 전', temp: 20, title: '모닝 레이드 가시는분들 !! 운수 드세요 ~ (실리안서버)',
    body: '영지 이름 : 계란탕', thumb: '03', boost: 2, reply: 0 },
  { avatar: 'profile09', name: 'ssang5108', time: '57분 전', temp: 0, title: '날씨가 꾸리꾸리 춥..',
    body: '적절한 쉼과 시원한 생맥 한 잔이 필요한 시기ㅎㅎ 다들 화이팅하세요!', thumb: '04', boost: 0, reply: 0 },
  { avatar: 'hanjan', name: '한잔V', time: '1시간 전', temp: 11, title: '10월20일 출첵',
    body: '오늘도 로드나인 출첵합니다!!!', boost: 1, reply: 1 },
  { avatar: 'default01', name: '노블짱', time: '1시간 전', temp: 21, title: '마지막..',
    body: '마지막 나르둠 도전갑니다...L9300', boost: 2, reply: 1 },
  { avatar: 'tastiera', name: '타스티에라', time: '4시간 전', temp: 16, title: '입에 대한 앙케트 이건 막상 볼 땐 별로 무섭단 생각 안 들었는데요.',
    body: '그냥 사운드 좀 소름끼친단 감상 정도?<br>근데 시간 한참 지나고 나서 문득 떠오를 때 있는데,', thumb: '07', boost: 1, reply: 6 },
  { avatar: 'sobar', name: '소바르', time: '46분 전', temp: 48, title: '로아 dlss5 맛보기3',
    body: 'gpt<br>gpt', thumb: '08', thumbCount: 20, boost: 4, reply: 8 },
  { avatar: 'tastiera', name: '타스티에라', time: '5시간 전', temp: 6, title: '킬 빌 다 봤더니 뽕 차서 갓독님 데뷔작인 저수지의 개들 달리려했는데요.',
    body: '죄다 판권 만료네요...<br>흑흑...슬퍼요😭😭😭', thumb: '09', boost: 0, reply: 6 },
  { avatar: 'ba2', name: '규규규맘', time: '5시간 전', temp: 7, title: '출근해야하는데 잠이 안온다..',
    body: '요즘들어 통 잠이 잘안오네요 ㅠ 핸폰 계속 보고있어서 그런감.. 혹시 잠 잘오는 방법 있을까요??', boost: 0, reply: 7 },
  { avatar: 'sobar', name: '소바르', time: '5시간 전', temp: 35, title: '로아 아르케 처음봤을때 생각났던것들, 언리얼엔진5 영상',
    body: '잘만들었다지만 누가봐도 언리얼3를 극복하지못했다. 이걸 자체엔진으로 뛰어넘었다고 한다면 언리얼5를 안본것.<br>볼수록 누굴 닮은기억이 나서 올라가보니', thumb: '11', thumbCount: 9, boost: 3, reply: 5 },
  { avatar: 'tastiera', name: '타스티에라', time: '6시간 전', temp: 31, title: '디지몬 어드벤처: 운명적 만남은 브금이 넘 치트네요ㄷㄷ',
    body: '워낙 명곡이다 보니 최근 8번 출구부터 심심하면 등장하는게 볼레로입니다만...<br>이렇게 풀타임으로 원없이 들은 건 처음 아닐까 싶은...', thumb: '12', boost: 3, reply: 1 },
  { avatar: 'ba2', name: '베이지파라솔', time: '6시간 전', temp: 52, title: '플레이크 이벤트만 해도',
    body: '부스트랑 글쓰고 부스트 한 글에 댓글만 적어도 3000플레이크 달달하구만요', boost: 5, reply: 2 },
];

var LOUNGE_RECOMMEND = [
  { title: '로아 dlss5 맛보기3', temp: 48, boost: 4, thumb: 'assets/lounge/rec-08.jpg', count: 20 },
  { title: '《야간 알바의 0.1초 계산법》 #8', temp: 0, boost: 0 },
  { title: '플레이크 이벤트만 해도', temp: 52, boost: 5 },
];

// 100만원 배너 양옆 불꽃 — 실측 위치(그룹 80 x 40 기준)·크기·깜빡임 타이밍 그대로
var LOUNGE_BANNER_FIRES = {
  left: [
    { x: 0, y: 8, size: 10, dim: true, delay: -120, dur: 1550 },
    { x: 32, y: 24, size: 16, delay: -620, dur: 1320 },
    { x: 52, y: 1, size: 28, delay: -980, dur: 1680 },
  ],
  right: [
    { x: 0, y: 5, size: 10, dim: true, delay: -420, dur: 1500 },
    { x: 3, y: 10, size: 34, delay: -820, dur: 1380 },
    { x: 43, y: 7, size: 16, delay: -260, dur: 1760 },
  ],
};

var LoungeMain = {
  data: function () {
    return {
      rail: LOUNGE_RAIL,
      selectedRail: 'today1',
      top3: LOUNGE_TOP3,
      tabs: LOUNGE_TABS,
      selectedTab: '전체',
      feed: LOUNGE_FEED,
      recommend: LOUNGE_RECOMMEND,
      fires: LOUNGE_BANNER_FIRES,
      now: Date.now(),
    };
  },
  computed: {
    // "집계 종료까지 HH:MM:SS" — 오늘 자정까지 남은 시간
    countdown: function () {
      var d = new Date(this.now);
      var end = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
      var s = Math.max(0, Math.floor((end - d) / 1000));
      var pad = function (n) { return (n < 10 ? '0' : '') + n; };
      return pad(Math.floor(s / 3600)) + ':' + pad(Math.floor(s / 60) % 60) + ':' + pad(s % 60);
    },
    today: function () {
      var d = new Date(this.now);
      return d.getFullYear() + '년 ' + (d.getMonth() + 1) + '월 ' + d.getDate() + '일';
    },
  },
  mounted: function () {
    var self = this;
    this.tick = setInterval(function () { self.now = Date.now(); }, 1000);
  },
  beforeUnmount: function () { clearInterval(this.tick); },
  methods: {
    avatar: loungeAvatar,
    fireStyle: function (f) {
      return {
        left: f.x + 'px', top: f.y + 'px', fontSize: f.size + 'px',
        animationDelay: f.delay + 'ms', animationDuration: f.dur + 'ms',
      };
    },
  },
  template:
    '<div class="lounge">' +

      // ---- 1단: 메뉴 레일 ----
      '<nav class="lounge-rail" aria-label="라운지 메뉴">' +
        '<button v-for="r in rail" :key="r.id" class="lounge-rail__item" :class="{ \'is-selected\': selectedRail === r.id }" type="button" @click="selectedRail = r.id">' +
          '<i :class="[r.icon, { \'is-rotated\': r.rotate }]" aria-hidden="true"></i>' +
          // 글자와 EVENT 뱃지는 간격 없이 한 묶음 (웹 구조 그대로)
          '<span class="lounge-rail__text">' +
            '<span class="lounge-rail__label">{{ r.label }}</span>' +
            '<span v-if="r.badge" class="lounge-shine-badge">{{ r.badge }}</span>' +
          '</span>' +
        '</button>' +
      '</nav>' +

      // ---- 2단: 오늘의 1등 ----
      '<section class="lounge-center">' +
        '<div class="lounge-head">' +
          '<span class="lounge-head__timer">집계 종료까지 {{ countdown }}</span>' +
          '<div class="lounge-head__date">' +
            '<button class="lounge-round-btn" type="button" aria-label="이전 날"><i class="ic-v2-control-arrow-left-line"></i></button>' +
            '<span class="lounge-head__date-text">{{ today }}</span>' +
            '<button class="lounge-round-btn" type="button" aria-label="다음 날" disabled><i class="ic-v2-control-arrow-right-line"></i></button>' +
          '</div>' +
        '</div>' +

        // 100만원 배너 — 검정 바탕 + 분홍 빛 번짐 + 양옆에서 깜빡이는 불꽃
        '<a class="lounge-promo" href="#" @click.prevent>' +
          '<span class="lounge-promo__glow" aria-hidden="true"></span>' +
          '<span class="lounge-promo__fires" aria-hidden="true">' +
            '<i v-for="(f, i) in fires.left" :key="\'l\' + i" class="ic-v2-object-fire-fill lounge-fire lounge-flicker" :class="{ \'is-dim\': f.dim }" :style="fireStyle(f)"></i>' +
          '</span>' +
          '<span class="lounge-promo__text">가장 뜨거운 인기글에 매일 <b>₩1,000,000</b>을 드려요!</span>' +
          '<span class="lounge-promo__fires" aria-hidden="true">' +
            '<i v-for="(f, i) in fires.right" :key="\'r\' + i" class="ic-v2-object-fire-fill lounge-fire lounge-flicker" :class="{ \'is-dim\': f.dim }" :style="fireStyle(f)"></i>' +
          '</span>' +
        '</a>' +

        '<div class="lounge-top3">' +
          '<div class="lounge-top3__head">' +
            '<span class="lounge-top3__title"><i class="ic-v2-object-fire-fill lounge-fire"></i>실시간 1등 후보</span>' +
            '<span class="lounge-top3__time">08:25 기준<i class="ic-v2-object-clock-line"></i></span>' +
          '</div>' +
          '<ul class="lounge-top3__list">' +
            '<li v-for="(t, i) in top3" :key="i" class="lounge-top3__item">' +
              '<a class="lounge-top3__item-title" href="#" @click.prevent>{{ t.title }}</a>' +
              '<span class="lounge-shine-badge lounge-shine-badge--lg">{{ t.temp }}℃</span>' +
            '</li>' +
          '</ul>' +
        '</div>' +

        // 어제의 1등 배너 — 웹 배너 이미지(캐릭터가 바 위로 14 튀어나옴). 바 높이 74
        '<a class="lounge-yesterday" href="#" @click.prevent aria-label="어제의 1등은 누구? 100만원의 주인공 보기! 1등 된 글은 좀 궁금하잖아">' +
          '<img class="theme-img--dark" src="assets/lounge/yesterday-banner-dark.jpg" alt="" />' +
          '<img class="theme-img--light" src="assets/lounge/yesterday-banner-light.jpg" alt="" />' +
        '</a>' +

        '<div class="lounge-feed">' +
          '<div class="lounge-tabs">' +
            '<div class="lounge-tabs__row">' +
              '<button v-for="t in tabs" :key="t" class="lounge-tabs__tab" :class="{ \'is-selected\': selectedTab === t }" type="button" @click="selectedTab = t">{{ t }}</button>' +
            '</div>' +
            '<p class="lounge-tabs__desc">오늘의 이벤트에 참여한 글이 모두 보여요.</p>' +
          '</div>' +
          '<article v-for="(p, i) in feed" :key="i" class="lounge-post">' +
            '<div class="lounge-post__meta">' +
              '<span class="lounge-post__author">' +
                '<img class="lounge-post__avatar" :src="avatar(p.avatar)" alt="" />' +
                '<span class="lounge-post__name">{{ p.name }}</span>' +
                '<i class="lounge-post__dot" aria-hidden="true"></i>' +
                '<span class="lounge-post__time">{{ p.time }}</span>' +
              '</span>' +
              '<span class="lounge-temp">{{ p.temp }}℃</span>' +
            '</div>' +
            '<div class="lounge-post__content">' +
              '<div class="lounge-post__text">' +
                '<div class="lounge-post__copy">' +
                  '<strong class="lounge-post__title">{{ p.title }}</strong>' +
                  '<p class="lounge-post__body" v-html="p.body"></p>' +
                '</div>' +
                '<div class="lounge-post__actions">' +
                  '<button class="lounge-post__action" type="button"><i class="ic-v2-object-fire-line"></i>부스트 {{ p.boost }}</button>' +
                  '<button class="lounge-post__action" type="button"><i class="ic-v2-community-reply-line"></i>댓글 {{ p.reply }}</button>' +
                '</div>' +
              '</div>' +
              '<span v-if="p.thumb" class="lounge-thumb lounge-thumb--feed">' +
                '<img :src="\'assets/lounge/feed-\' + p.thumb + \'.jpg\'" alt="" />' +
                '<span v-if="p.thumbCount" class="lounge-thumb__count">{{ p.thumbCount }}</span>' +
              '</span>' +
            '</div>' +
          '</article>' +
        '</div>' +
      '</section>' +

      // ---- 3단: 검색 · 부스트 안내 · 이런 글 어때요? ----
      '<aside class="lounge-aside">' +
        '<div class="lounge-search">' +
          '<span class="lounge-search__placeholder">라운지에서 검색하기</span>' +
          '<i class="ic-v2-navigation-search-line" aria-hidden="true"></i>' +
        '</div>' +
        // 로그인 후 내 프로필 카드 — 실제 로그인 화면 실측(2026-10-20)
        '<div class="lounge-boost-card lounge-profile">' +
          '<div class="lounge-boost-card__body">' +
            '<div class="lounge-profile__head">' +
              '<div class="lounge-profile__info">' +
                '<strong class="lounge-profile__name">휴먼메이드</strong>' +
                '<div class="lounge-profile__stats"><span>글 11</span><i aria-hidden="true"></i><span>댓글 34</span></div>' +
              '</div>' +
              '<span class="lounge-profile__avatar"><img src="assets/lounge/profile-me.png" alt="" /></span>' +
            '</div>' +
            '<div class="lounge-boost-card__btns">' +
              '<button class="lounge-btn lounge-btn--primary" type="button">글쓰기<i class="ic-v2-community-pencil-fill"></i></button>' +
              '<button class="lounge-btn lounge-btn--neutral" type="button">MY홈</button>' +
            '</div>' +
          '</div>' +
          '<div class="lounge-boost-card__foot lounge-profile__foot">' +
            '<span class="lounge-profile__boost">부스트<i class="ic-v2-state-info-circle-line" aria-hidden="true"></i></span>' +
            '<span class="lounge-profile__fires">' +
              '<i v-for="n in 5" :key="n" class="ic-v2-object-fire-fill lounge-fire"></i>' +
            '</span>' +
          '</div>' +
        '</div>' +
        '<div class="lounge-recs">' +
          '<strong class="lounge-recs__title">이런 글 어때요?</strong>' +
          '<div class="lounge-recs__list">' +
            '<a v-for="(r, i) in recommend" :key="i" class="lounge-rec" href="#" @click.prevent>' +
              '<span class="lounge-rec__text">' +
                '<strong class="lounge-rec__title">{{ r.title }}</strong>' +
                '<span class="lounge-rec__meta"><span class="lounge-temp">{{ r.temp }}℃</span><span>부스트 {{ r.boost }}</span></span>' +
              '</span>' +
              '<span v-if="r.thumb" class="lounge-thumb lounge-thumb--rec">' +
                '<img :src="r.thumb" alt="" />' +
                '<span v-if="r.count" class="lounge-thumb__count">{{ r.count }}</span>' +
              '</span>' +
            '</a>' +
          '</div>' +
        '</div>' +
      '</aside>' +

    '</div>',
};

function mountLoungeMain(selector) {
  return Vue.createApp(LoungeMain).mount(selector);
}
