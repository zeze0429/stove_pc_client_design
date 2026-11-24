/**
 * 스토어형 게임 상세 (game-detail.html?id=ghostrunner)
 * -------------------------------------------------------------
 * Figma 클라이언트_v3.1 68436:427674 — 게임상세_MD(68412:112281, 콘텐츠 960) · 게임상세_LG(68412:113947, 콘텐츠 1300)
 * (사용자 11-24 "고스트러너 상세페이지 디자인 … MD, LG 구간 두개니까 참고해서 적용해").
 * 로아 같은 런처형 상세(js/game-detail-component.js)와 구조가 달라 따로 둔다 — mountGameDetail이 이 데이터가 있는
 * 게임이면 여기로 넘긴다.
 *
 * 구간: 폭(왼쪽 · 오른쪽 열 · 사이)은 콘텐츠 폭 960 → 1300 사이에서 점점 늘어나고,
 *       글자 크기 · 버튼 높이 · 개수처럼 단계로 바뀌는 값은 콘텐츠 영역 1440(STDS LG)부터 LG 값 (css/store-detail.css).
 * 이름은 Figma 레이어 이름을 따른다: breadcrumb · Cover · AI(상품 브리핑) · 장바구니컴포넌트(title+가격+btn · 하단 정보) …
 *
 *   mountStoreDetail('#game-detail-mount', 'ghostrunner')
 */
var STORE_DETAIL_DIR = 'assets/game-detail/';

var STORE_DETAIL_DATA = {
  ghostrunner: {
    dir: 'ghostrunner/',
    breadcrumb: ['전체', '게임', '액션', '고스트러너 (Ghostrunner) 2'],
    // Cover — 첫 장은 영상(재생 아이콘), 나머지는 스크린샷. 그림은 Figma 원본(3840) → 2배수 1720 jpg
    cover: [
      { src: 'cover-01.jpg', video: true },
      { src: 'cover-02.jpg' },
      { src: 'cover-03.jpg' },
      { src: 'cover-04.jpg' },
      { src: 'cover-05.jpg' },
    ],
    // AI — 상품 브리핑 (Beta)
    ai: {
      lines: [
        '벽 달리기와 공중 대시로 빠르게 공간을 정면 돌파하고, 한 번의 공격이 승패를 가르는 긴장감 높은 싱글 플레이 액션 전투 게임벽 달리기와 공중 대시로 빠르게 공간을 정면 돌파하고, 한 번의 공격이 승패를 가르는 긴장감 높은 싱글 플레이 액션 전투 게임',
        '퍼리 장르에 선입견이 있지만 한번 경험해보고 싶은 유저에게 추천',
      ],
      playtime: { label: '플레이타임', caption: '평균', value: '11시간 30분' },
      cards: [
        { label: '연출', text: '큰 서사는 없어서 입문용이나 시간 떼우기 용으로 가볍게 플레이하기 좋아요' },
        { label: '플레이', text: '서사는 없고 조작이 쉬워서 입문용으로 플레이하기 좋아요' },
        { label: '가격', text: '드래곤팩 DLC 같이 사세요. 게임 초반에 새로운 영토 탐색할때 좋아요' },
      ],
    },
    // 장바구니컴포넌트 — title+가격+btn
    product: {
      title: '고스트러너 2',
      recommend: '88% 추천',
      reviews: '1,958 후기',
      originalPrice: '₩32,000',
      discount: '-50%',
      price: '₩16,000',
      couponDiscount: '₩16,000',
      remain: '05:28:59',
    },
    // 하단 정보 — 기본 정보 (link: 밑줄 · more: 오른쪽 화살표)
    info: [
      { label: '장르', links: ['Hack & Slash', 'MMORPG', 'RPG'] },
      { label: '창작자', links: ['버프 스튜디오'] },
      { label: '배급사', links: ['One More Level'] },
      { label: '출시일', text: '2025.12.24' },
      { label: '이용 등급', text: '15세 이용가', more: true },
      { label: '지원 언어', text: '한국어 외 15개', more: true },
      { label: '지원 기능', text: '싱글 플레이어 외 2개', more: true },
    ],
    shareTooltip: '친구와 함께 플레이하세요!',
    // 상품 설명 — 접힌 높이 720까지, 아래 72는 바탕색으로 흐려짐 · '펼쳐서 보기'
    description: [
      { title: '⚔️ 원궁극의 사이버 닌자로 태어나라', text: '고스트러너 2에서는 새로운 스킬이 도입되어 가장 까다로운 적도 더 창의적으로 접근하여 상대할 수 있도록 폭넓은 기회를 제공합니다. 하지만 고스트러너 2의 적들은 플레이어가 쓰는 스킬에 따라 각기 다른 고유의 방식으로 대응하여 신선한 도전을 선사합니다. 게임 진행 시스템이 완전히 개편되어 원하는대로 게임플레이를 시험하고 커스터마이징 할 수 있습니다.' },
      { image: 'desc-01.jpg' },
      { title: '🌆 원마음을 사로잡는 게임 기능', text: '살아남고 싶다면 사이버보이드를 마스터하세요. 호락호락하지 않은 새로운 적들을 상대로 폭발물, 파괴 가능한 벽, 도움을 주는 중립 캐릭터, 전투를 흥미롭고 신선하게 이끄는 수많은 강화 요소 등 상호작용 가능한 지형지물을 활용해보세요. 이걸로 부족하시다고요? 새로운 대화 시스템을 통해 고스트러너의 세계관과 줄거리 속으로 빠져들어 보세요.' },
      { title: '🎧 사이버보이드의 사운드', text: '적을 물리치며 인류를 구하는 여정 속에 배경으로 흐르는 신스웨이브 스타일의 음악을 즐겨보세요. Daniel Deluxe, We Are Magonia, Gost, Dan Terminus, Arek Reikowski 등의 뮤지션들이 참여한 새로운 음악들이 수록된 매혹적인 사운드 트랙입니다.' },
    ],
    // Chips — brand: 스토브 강조 태그(brand-primary 8%)
    tags: [
      { label: '스토브 오리지널', brand: true }, { label: '스토브 ONLY', brand: true }, { label: '2022스토브인디어워즈수상작', brand: true },
      { label: '조작중심' }, { label: '싱글플레이' }, { label: '3D' }, { label: '스토리 중심' },
      { label: '10개 모두 노출' }, { label: '10개 모두 노출' }, { label: '10개 모두 노출' },
    ],
    // 이벤트 — 배너(황금비 50% 높이 3.236:1) · 오른쪽 아래 2 / 8
    events: { image: 'event-01.jpg', count: 8 },
    // 새소식 — LG 카드 2장(왼쪽만 그림) / MD 한 상자에 목록 2줄
    // DLC 및 추가 상품 — 2열 × 3줄 (행 높이 88)
    dlc: [
      { title: '고스트러너 엔딩 팩', badge: true, discount: '-20%', price: '₩16,000' },
      { title: '고스트러너 엔딩 팩', badge: true, discount: '-20%', price: '₩16,000' },
      { title: '고스트러너 엔딩 팩', badge: true, discount: '-20%', price: '₩16,000' },
      { title: '고스트러너 엔딩 팩', badge: true, discount: '-20%', price: '₩16,000' },
      { title: '고스트러너 엔딩 팩', badge: true, discount: '-20%', price: '₩16,000' },
      { title: '고스트러너 엔딩 팩', badge: true, discount: '-20%', price: '₩16,000' },
    ],
    // 이 상품이 포함된 컬렉션 — 카드(그림 16:9 + 총 N개 상품 · 이름/가격/버튼 + 포함 상품 2줄)
    collections: [
      { count: 22, title: '고스트러너 엔딩 팩', discount: '-20%', price: '₩16,000',
        items: [{ title: '고스트러너 엔딩 팩', state: '보유중' }, { title: '고스트러너 엔딩 팩', limited: '제한됨' }] },
      { count: 22, title: '고스트러너 엔딩 팩', discount: '-20%', price: '₩16,000', tooltip: true,
        items: [{ title: '고스트러너 엔딩 팩', state: '보유중' }, { title: '고스트러너 엔딩 팩', limited: '제한됨' }] },
    ],
    // gameCard 줄 — 창작자/배급사의 다른 상품 · 관련 기획전 (LG 5장 · MD 4장 보임)
    cardRows: [
      { title: '창작자/배급사의 다른 상품', cards: [
        { image: 'card-ifsunsets.jpg', title: '이프선셋', genre: 'genre, tag, tag', discount: '-20%', price: '₩16,000', recommend: '92' },
        { image: 'card-succuheart.jpg', title: '서큐하트', genre: 'genre, tag, tag', discount: '-20%', price: '₩16,000', recommend: '92' },
        { image: 'card-gearheart.jpg', title: '기어하트', free: true, recommend: '92' },
        { image: 'card-corpse-keeper.jpg', title: '%gameTitle_line-clamp-2 gameTitle_line-clamp-2', genre: 'genre, tag, tag', discount: '-20%', price: '₩16,000', recommend: '92' },
        { image: 'card-volcano-princess.jpg', title: '화산의 딸 (Volcano Princess)', genre: 'genre, tag, tag', discount: '-20%', price: '₩16,000', recommend: '92' },
      ] },
      { title: '관련 기획전', cards: [
        { image: 'card-ifsunsets.jpg', title: '이프선셋', genre: 'genre, tag, tag', discount: '-20%', price: '₩16,000', recommend: '92' },
        { image: 'card-succuheart.jpg', title: '서큐하트', genre: 'genre, tag, tag', discount: '-20%', price: '₩16,000', recommend: '92', badge: 'PRE · Order' },
        { image: 'card-gearheart.jpg', title: '기어하트', genre: 'genre, tag, tag', discount: '-20%', price: '₩16,000', recommend: '92' },
        { image: 'card-corpse-keeper.jpg', title: '%gameTitle_line-clamp-2 gameTitle_line-clamp-2', genre: 'genre, tag, tag', discount: '-20%', price: '₩16,000', recommend: '92' },
        { image: 'card-volcano-princess.jpg', title: '화산의 딸 (Volcano Princess)', genre: 'genre, tag, tag', discount: '-20%', price: '₩16,000', recommend: '92' },
      ] },
    ],
    cash: { name: '겟앰캐시', amount: '￦999,999,999' },
    // 도전과제 — 왼쪽 표지(달성률) + 오른쪽 목록(높이 420까지)
    achievement: {
      nickname: '앙뚱코비빅', rate: 75, done: 120, total: 220,
      list: [
        { image: 'ach-01.png', title: 'STRONG SCIENCE', desc: 'DEFEAT THE ARMORED GATEKEEPER', progress: '80% 달성', sub: '(80/100)' },
        { image: 'ach-02.png', title: 'STRONG SCIENCE', desc: 'DEFEAT THE ARMORED GATEKEEPER', before: '달성전' },
        { image: 'ach-03.png', title: 'STRONG SCIENCE', desc: 'DEFEAT THE ARMORED GATEKEEPER', complete: '(2023.12.24)' },
        { locked: true, title: '숨겨진 업적', desc: '도전과제 달성 시 오픈돼요.' },
        { image: 'ach-01.png', title: 'STRONG SCIENCE', desc: 'DEFEAT THE ARMORED GATEKEEPER' },
        { image: 'ach-01.png', title: 'STRONG SCIENCE', desc: 'DEFEAT THE ARMORED GATEKEEPER', complete: '(2023.12.24)' },
      ],
    },
    // 랭킹 — change: up · down(숫자 + 화살표) / new / same(—), mine: 내 순위 줄(파랑 6%)
    ranking: {
      title: '랭킹 타이틀', periods: ['일간', '주간', '월간', '종합'], date: '2026.09.02',
      list: [
        { rank: 1, change: 'up', num: 12, profile: 'profile-01.png', name: '%닉네임%', play: '30시간 50분 플레이', record: '1,522,280' },
        { rank: 2, change: 'new', profile: 'profile-04.png', name: '%닉네임%', play: '30시간 50분 플레이', record: '1,522,280' },
        { rank: 3, change: 'down', num: 12, profile: 'profile-02.png', name: '%닉네임%', play: '30시간 50분 플레이', record: '1,522,280' },
        { rank: 4, change: 'same', profile: 'profile-03.png', name: '%닉네임%', play: '30시간 50분 플레이', record: '1,522,280' },
        { rank: 5, change: 'new', profile: 'profile-05.png', name: '%닉네임%', play: '30시간 50분 플레이', record: '1,522,280' },
        { rank: 6, change: 'same', profile: 'profile-06.png', name: '튼튼우유', play: '30시간 50분 플레이', record: '1,522,280', mine: true },
      ],
    },
    awards: ['award-01.jpg', 'award-02.jpg'],
    links: [
      { icon: 'ic-v2-object-help-center-fill', label: 'STOVE 고객센터' },
      { icon: 'ic-v2-navigation-home-fill', label: '공식 사이트' },
      { icon: 'ic-v2-logo-youtube-fill', label: 'Youtube' },
      { icon: 'ic-v2-logo-discord-fill', label: 'Discord' },
      { icon: 'ic-v2-community-link-line', label: '%기타 링크%' },
    ],
    // 시스템 요구사항 — 최소 · 권장
    requirements: {
      columns: [
        { title: '최소', rows: [
          ['OS', 'Windows® 10 (64-bit)'],
          ['Processor', 'Intel® Core™ i5-4670 (quad-core) / AMD® FX-Series™ FX-8300 (quad-core)'],
          ['Memory', '4GB RAM'],
          ['Graphics', 'NVIDIA® GeForce® GTX 960(4GB) / AMD® Radeon™ RX 570(4GB)'],
          ['DirectX', 'Version 12'],
          ['Storage', '2GB'],
        ] },
        { title: '권장', rows: [
          ['OS', 'Windows® 10 (64-bit)'],
          ['Processor', 'Intel® Core™ i5-4670 (quad-core) / AMD® FX-Series™ FX-8300 (quad-core)'],
          ['Memory', '4GB RAM'],
          ['Graphics', 'NVIDIA® GeForce® GTX 960(4GB) / AMD® Radeon™ RX 570(4GB)'],
          ['DirectX', 'Version 12'],
          ['Storage', '2GB'],
        ] },
      ],
      note: '2026년 6월 29일부터 스토브 PC 클라이언트는 Windows 10 이상 및 64bit만 지원합니다',
    },
    etc: ['판매자 정보', '상품 약관'],
    // 추천 후기&공략 — 새소식과 같은 모양
    tips: [
      { image: 'tip-01.jpg', title: '나를 보는 순간 너희는 죽는다!!! 찐 후기임', text: '고스트러너2 이번 패치의 자세한 내용은 아래와 같습니다. 룬과 스키엘의 무희 복장이 캐릭터 메뉴를 너무 가리는 문제를 수정했습니다 .', author: '닉네임', date: '2023.02.01 15:47 (UTC+9)' },
      { image: 'tip-02.jpg', title: '플래티넘 달성 팁 뿌림', text: '고스트러너2 이번 패치의 자세한 내용은 아래와 같습니다.', author: '닉네임', date: '2023.02.01 15:47 (UTC+9)' },
    ],
    // 상품 후기
    review: {
      rate: '98% 강력 추천', voters: '1,000명 평가 참여',
      byPlaytime: [{ label: '1시간 미만', value: 80 }, { label: '1시간 이상', value: 10 }, { label: '5시간 이상', value: 100 }],
      count: '1,300',
      aiChips: ['생각보다 헬난이도', '시간이 순삭돼요', '캐릭터로 눈호강', '조작법이 어려워요', '훌륭한 갓성비', '훌륭한 갓성비', '훌륭한 갓성비', '훌륭한 갓성비'],
      list: [
        { badge: 'official', label: 'OFFICIAL', name: '크크크', comments: '' },
        { badge: 'gm', label: 'GM', name: '크크크', comments: '1' },
        { badge: 'my', label: 'MY', name: '문토니오', comments: '99' },
      ],
      play: '50분 플레이', date: '2026.12.24 13:30(UTC+9)',
      text: ['던전키퍼랑 비슷한 듯 하면서 다르긴 하죠ㅋㅋㅋ 그래도 이 게임만의 매력도 있다고 생각해요.', '아쉽긴 아쉽지만. . 나름 몹 배치하는 재미가 있다고 해야되나ㅋㅋㅋㅋ 몬가 타이쿤 느낌?'],
    },
    news: [
      { image: 'news-01.jpg', title: '고스트러너2 1.5.5 패치 / Clair Obscur Patch v1.5.5 is now LIVE!', text: '고스트러너2 이번 패치의 자세한 내용은 아래와 같습니다. 룬과 스키엘의 무희 복장이 캐릭터 메뉴를 너무 가리는 문제를 수정했습니다 .', author: '닉네임', date: '2023.02.01 15:47 (UTC+9)' },
      { title: '고스트러너2 1.5.5 패치 / Clair Obscur Patch v1.5.5 is now LIVE!', text: '고스트러너2 이번 패치의 자세한 내용은 아래와 같습니다. 룬과 스키엘의 무희 복장이 캐릭터 메뉴를 너무 가리는 문제를 수정했습니다 .', author: '닉네임', date: '2023.02.01 15:47 (UTC+9)' },
    ],
    // 추천 상품
    recommended: [
      { title: '고스트러너 엔딩 팩', badge: true, discount: '-20%', price: '₩16,000' },
      { title: '고스트러너 엔딩 팩', discount: '-20%', price: '₩16,000' },
      { title: '고스트러너 아트북', discount: '-20%', price: '₩16,000' },
    ],
  },
};

function mountStoreDetail(selector, key) {
  var data = STORE_DETAIL_DATA[key];
  // 카드 줄은 시안 5장을 두 번 이어 붙여 다음 화면까지 넘겨 볼 수 있게 (인디케이터 시안 = 여러 화면)
  data.cardRows.forEach(function (r) { if (!r.doubled) { r.cards = r.cards.concat(r.cards); r.doubled = true; } });

  var app = Vue.createApp({
    data: function () {
      return {
        d: data,
        coverIndex: 0,
        coverStart: 0, // 썸네일 줄 첫 칸 — 보이는 개수(MD 4 · LG 5)를 넘으면 옆으로 민다
        aiCanNext: true,
        infoOpen: true,
        recOpen: true,
        descOpen: false,
        eventIndex: 1, // 시안 '2 / 8'
        rankPeriod: 0,
        cardsNav: [], // 카드 줄마다 { prev, next, page }
        linksCanNext: false,
      };
    },
    mounted: function () {
      var self = this;
      this.aiUpdate();
      this.linksUpdate();
      this.d.cardRows.forEach(function (r, i) { self.cardsUpdate(i); });
      window.addEventListener('resize', function () {
        self.coverKeep(); self.aiUpdate(); self.linksUpdate();
        self.d.cardRows.forEach(function (r, i) { self.cardsUpdate(i); });
      });
    },
    methods: {
      img: function (file) { return STORE_DETAIL_DIR + this.d.dir + file; },

      // ---- Cover — 화살표 · 썸네일로 큰 그림을 바꾼다. 썸네일 줄은 선택한 칸이 보이게 민다 ----
      coverVisible: function () {
        var el = this.$refs.coverThumbs;
        var n = el ? parseInt(getComputedStyle(el).getPropertyValue('--store-detail-cover-n'), 10) : 5;
        return n || 5;
      },
      coverGo: function (i) {
        var last = this.d.cover.length - 1;
        this.coverIndex = Math.max(0, Math.min(last, i));
        this.coverKeep();
      },
      coverKeep: function () {
        var n = this.coverVisible();
        var maxStart = Math.max(0, this.d.cover.length - n);
        if (this.coverIndex < this.coverStart) this.coverStart = this.coverIndex;
        else if (this.coverIndex > this.coverStart + n - 1) this.coverStart = this.coverIndex - n + 1;
        this.coverStart = Math.min(this.coverStart, maxStart);
      },

      // ---- AI — 카드 줄은 옆으로 넘김. 오른쪽 화살표는 더 넘길 게 있을 때만 ----
      aiUpdate: function () {
        var el = this.$refs.aiCards;
        if (!el) return;
        this.aiCanNext = el.scrollLeft + el.clientWidth < el.scrollWidth - 1;
      },
      // gameCard 줄 — 화살표로 한 화면(보이는 카드 수)씩 넘긴다
      cardsEl: function (i) { var r = this.$refs['cards' + i]; return Array.isArray(r) ? r[0] : r; },
      cardsUpdate: function (i) {
        var el = this.cardsEl(i);
        if (!el) return;
        var max = el.scrollWidth - el.clientWidth;
        this.cardsNav[i] = { prev: el.scrollLeft > 1, next: el.scrollLeft < max - 1, page: max > 0 ? Math.round(el.scrollLeft / el.clientWidth) : 0 };
      },
      cardsGo: function (i, dir) {
        var el = this.cardsEl(i);
        if (el) el.scrollBy({ left: dir * (el.clientWidth + 12), behavior: 'smooth' });
      },
      linksUpdate: function () {
        var el = this.$refs.links;
        if (el) this.linksCanNext = el.scrollLeft + el.clientWidth < el.scrollWidth - 1;
      },
      linksNext: function () {
        var el = this.$refs.links;
        if (el) el.scrollBy({ left: 128, behavior: 'smooth' }); // 칸 120 + 간격 8
      },
      aiNext: function () {
        var el = this.$refs.aiCards;
        if (el) el.scrollBy({ left: 252, behavior: 'smooth' }); // 카드 240 + 간격 12
      },
    },
    template:
      '<div class="store-detail">' +
        // breadcrumb — 전체 > 게임 > 액션 > 상품명
        '<nav class="store-detail-breadcrumb stds-text3" aria-label="위치">' +
          '<template v-for="(b, i) in d.breadcrumb">' +
            '<i v-if="i" class="ic-v2-control-arrow-right-line" aria-hidden="true"></i>' +
            '<span>{{ b }}</span>' +
          '</template>' +
        '</nav>' +

        '<div class="store-detail__columns">' +
          '<div class="store-detail__left">' +
            // ---- Cover ----
            '<section class="store-detail-cover" aria-label="미디어">' +
              '<div class="store-detail-cover__main">' +
                '<img :src="img(d.cover[coverIndex].src)" alt="" />' +
                '<img v-if="d.cover[coverIndex].video" class="store-detail-cover__play" :src="img(\'play-56.svg\')" alt="재생" />' +
              '</div>' +
              '<div class="store-detail-cover__list">' +
                '<button class="game-detail-chevron store-detail-chevron" type="button" aria-label="이전" :disabled="coverIndex === 0" @click="coverGo(coverIndex - 1)"><i class="ic-v2-control-arrow-left-line"></i></button>' +
                '<div ref="coverThumbs" class="store-detail-cover__thumbs">' +
                  '<div class="store-detail-cover__track" :style="{ transform: \'translateX(calc(\' + (-coverStart) + \' * (10rem + 1.2rem)))\' }">' +
                    '<button v-for="(c, i) in d.cover" type="button" class="store-detail-cover__thumb" :class="{ \'is-active\': i === coverIndex }" :aria-label="(i + 1) + \'번째 미디어\'" @click="coverGo(i)">' +
                      '<img :src="img(c.src)" alt="" />' +
                      '<img v-if="c.video" class="store-detail-cover__thumb-play" :src="img(\'play-24.svg\')" alt="" />' +
                    '</button>' +
                  '</div>' +
                '</div>' +
                '<button class="game-detail-chevron store-detail-chevron" type="button" aria-label="다음" :disabled="coverIndex === d.cover.length - 1" @click="coverGo(coverIndex + 1)"><i class="ic-v2-control-arrow-right-line"></i></button>' +
              '</div>' +
            '</section>' +

            // ---- AI 상품 브리핑 ----
            '<section class="store-detail-ai">' +
              '<h2 class="store-detail-ai__title">' +
                '<img class="store-detail-ai__icon" :src="img(\'ic-store-ai.svg\')" alt="" />' +
                '<span class="stds-title6 fw-bold">상품 브리핑</span>' +
                '<img class="store-detail-ai__beta" :src="img(\'badge-beta.svg\')" alt="Beta" />' +
                '<i class="ic-v2-state-info-circle-line store-detail-ai__info" aria-hidden="true"></i>' +
              '</h2>' +
              '<ul class="store-detail-ai__lines stds-text3">' +
                '<li v-for="l in d.ai.lines">{{ l }}</li>' +
              '</ul>' +
              '<div class="store-detail-ai__row">' +
                '<div ref="aiCards" class="store-detail-ai__cards" @scroll="aiUpdate">' +
                  '<div class="store-detail-ai__card store-detail-ai__card--playtime">' +
                    '<span class="store-detail-ai__label stds-cap1 fw-medium">{{ d.ai.playtime.label }}</span>' +
                    '<div class="store-detail-ai__playtime">' +
                      '<div><span class="stds-cap1">{{ d.ai.playtime.caption }}</span><strong class="stds-title7 fw-bold">{{ d.ai.playtime.value }}</strong></div>' +
                      // store-ai-illust — 막대 3개 (바탕 48, 채움 36 · 48 · 16)
                      '<span class="store-detail-ai__bars" aria-hidden="true"><i style="--h: 3.6rem"></i><i style="--h: 4.8rem"></i><i style="--h: 1.6rem"></i></span>' +
                    '</div>' +
                  '</div>' +
                  '<div v-for="c in d.ai.cards" class="store-detail-ai__card">' +
                    '<span class="store-detail-ai__label stds-cap1 fw-medium">{{ c.label }}</span>' +
                    '<p class="stds-text4 fw-medium">{{ c.text }}</p>' +
                  '</div>' +
                '</div>' +
                '<button v-if="aiCanNext" class="store-detail-ai__next" type="button" aria-label="다음" @click="aiNext"><i class="ic-v2-control-arrow-right-line"></i></button>' +
              '</div>' +
              '<div class="store-detail-ai__reaction">' +
                '<span class="stds-cap1">AI 요약 정보가 도움이 되었나요?</span>' +
                '<button type="button" aria-label="도움이 됐어요"><i class="ic-v2-community-thumbs-up-line"></i></button>' +
                '<button type="button" aria-label="도움이 안 됐어요"><i class="ic-v2-community-thumbs-down-line"></i></button>' +
              '</div>' +
            '</section>' +

            // ---- 이후 섹션 (상품 설명 ~ 상품후기) ----
            // ---- 상품 설명 ----
            '<section class="store-detail-section">' +
              '<h2 class="store-detail-section__title stds-title5 fw-bold">상품 설명</h2>' +
              '<div class="store-detail-desc">' +
                '<div class="store-detail-desc__more">' +
                  '<div class="store-detail-desc__body" :class="{ \'is-open\': descOpen }">' +
                    '<template v-for="b in d.description">' +
                      '<img v-if="b.image" class="store-detail-desc__img" :src="img(b.image)" alt="" />' +
                      '<p v-else class="stds-text3"><strong class="stds-title7 fw-bold">{{ b.title }}</strong><br />{{ b.text }}</p>' +
                    '</template>' +
                  '</div>' +
                  '<button type="button" class="store-detail-desc__toggle stds-btn2 fw-medium" @click="descOpen = !descOpen">' +
                    '{{ descOpen ? \'접기\' : \'펼쳐서 보기\' }}<i :class="descOpen ? \'ic-v2-control-arrow-up-line\' : \'ic-v2-control-arrow-down-line\'"></i>' +
                  '</button>' +
                '</div>' +
                '<div class="store-detail-chips">' +
                  '<a v-for="t in d.tags" href="#" class="store-detail-chip stds-btn3 fw-medium" :class="{ \'store-detail-chip--brand\': t.brand }" @click.prevent>#{{ t.label }}</a>' +
                '</div>' +
              '</div>' +
            '</section>' +

            // ---- 이벤트 ----
            '<section class="store-detail-section">' +
              '<h2 class="store-detail-section__title stds-title5 fw-bold">이벤트</h2>' +
              '<div class="store-detail-event">' +
                '<img :src="img(d.events.image)" alt="" />' +
                '<span class="store-detail-event__count stds-cap1"><b class="fw-bold">{{ eventIndex + 1 }}</b>/<span>{{ d.events.count }}</span></span>' +
              '</div>' +
              '<div class="store-detail-indicator">' +
                '<button class="game-detail-chevron" type="button" aria-label="이전" @click="eventIndex = (eventIndex + d.events.count - 1) % d.events.count"><i class="ic-v2-control-arrow-left-line"></i></button>' +
                '<span class="game-detail-indicator"><span v-for="n in 5" :class="{ \'is-active\': n - 1 === eventIndex % 5 }"></span></span>' +
                '<button class="game-detail-chevron" type="button" aria-label="다음" @click="eventIndex = (eventIndex + 1) % d.events.count"><i class="ic-v2-control-arrow-right-line"></i></button>' +
              '</div>' +
            '</section>' +

            // ---- 새소식 ----
            '<section class="store-detail-section">' +
              '<div class="store-detail-section__head">' +
                '<h2 class="store-detail-section__title stds-title5 fw-bold">새소식</h2>' +
                '<button type="button" class="store-detail-all stds-btn3 fw-medium">전체보기<i class="ic-v2-control-arrow-right-line"></i></button>' +
              '</div>' +
              '<div class="store-detail-news">' +
                '<a v-for="n in d.news" href="#" class="store-detail-news__item" @click.prevent>' +
                  '<span v-if="n.image" class="store-detail-news__img"><img :src="img(n.image)" alt="" /></span>' +
                  '<span class="store-detail-news__con">' +
                    '<span class="store-detail-news__text">' +
                      '<strong class="store-detail-news__title fw-bold">{{ n.title }}</strong>' +
                      '<span class="store-detail-news__sub">{{ n.text }}</span>' +
                    '</span>' +
                    '<span class="store-detail-news__date stds-text4"><span>{{ n.author }}</span><span>{{ n.date }}</span></span>' +
                  '</span>' +
                '</a>' +
              '</div>' +
            '</section>' +

            // ---- DLC 및 추가 상품 ----
            '<section class="store-detail-section">' +
              '<h2 class="store-detail-section__title stds-title5 fw-bold">DLC 및 추가 상품</h2>' +
              '<ul class="store-detail-dlc">' +
                '<li v-for="g in d.dlc" class="store-detail-row">' +
                  '<span class="store-detail-thumb"><img :src="img(\'rec-thumb-bg.png\')" alt="" /><img :src="img(\'rec-thumb.png\')" alt="" /></span>' +
                  '<div class="store-detail-row__info">' +
                    '<span v-if="g.badge" class="store-detail-type-badge">PRE<i></i>DLC</span>' +
                    '<strong class="store-detail-row__name stds-text2 fw-bold">{{ g.title }}</strong>' +
                    '<span class="store-detail-price stds-text2 fw-bold"><b>{{ g.discount }}</b>{{ g.price }}</span>' +
                  '</div>' +
                  '<div class="store-detail-row__btns">' +
                    '<button type="button" class="store-detail-round" aria-label="찜하기"><i class="ic-v2-community-like-line"></i></button>' +
                    '<button type="button" class="store-detail-round" aria-label="장바구니"><i class="ic-v2-navigation-cart-fill"></i></button>' +
                  '</div>' +
                '</li>' +
              '</ul>' +
            '</section>' +

            // ---- 이 상품이 포함된 컬렉션 ----
            '<section class="store-detail-section">' +
              '<h2 class="store-detail-section__title store-detail-section__title--info stds-title5 fw-bold">이 상품이 포함된 컬렉션<i class="ic-v2-state-info-circle-line" aria-hidden="true"></i></h2>' +
              '<div class="store-detail-collections">' +
                '<div v-for="c in d.collections" class="store-detail-collection">' +
                  '<div class="store-detail-collection__top">' +
                    '<div class="store-detail-collection__img">' +
                      '<img :src="img(\'collection-01.jpg\')" alt="" />' +
                      '<span class="store-detail-collection__count"><i class="ic-v2-object-game-fill"></i>총 {{ c.count }}개 상품<i class="ic-v2-control-arrow-right-line"></i></span>' +
                    '</div>' +
                    '<div class="store-detail-collection__info">' +
                      '<div class="store-detail-collection__text stds-title7 fw-bold">' +
                        '<strong>{{ c.title }}</strong>' +
                        '<span class="store-detail-price"><b>{{ c.discount }}</b>{{ c.price }}</span>' +
                      '</div>' +
                      '<div class="store-detail-collection__btns">' +
                        '<button type="button" class="store-detail-round" aria-label="찜하기"><i class="ic-v2-community-like-line"></i></button>' +
                        '<button type="button" class="store-detail-pill stds-btn3 fw-medium"><i class="ic-v2-navigation-cart-fill"></i>장바구니</button>' +
                        '<span v-if="c.tooltip" class="store-detail-collection__tip stds-cap2 fw-medium"><i class="ic-v2-navigation-coupon-fill"></i>컬렉션으로 구매하면 <b class="fw-bold">20% 더 할인</b>돼요!</span>' +
                      '</div>' +
                    '</div>' +
                  '</div>' +
                  '<ul class="store-detail-collection__list">' +
                    '<li v-for="it in c.items" class="store-detail-collection__item" :class="{ \'is-limited\': it.limited }">' +
                      '<span class="store-detail-thumb store-detail-thumb--sm"><img :src="img(\'rec-thumb-bg.png\')" alt="" /><img :src="img(\'rec-thumb.png\')" alt="" /><img v-if="it.limited" :src="img(\'rec-thumb-limited.png\')" alt="" /></span>' +
                      '<div class="store-detail-row__info">' +
                        '<span class="store-detail-type-badge">PRE<i></i>DLC</span>' +
                        '<strong class="store-detail-row__name stds-text3 fw-bold">{{ it.title }}</strong>' +
                        '<span v-if="it.limited" class="store-detail-collection__limited stds-text4 fw-medium">{{ it.limited }}</span>' +
                      '</div>' +
                      '<span v-if="it.state" class="store-detail-state stds-cap2 fw-medium">{{ it.state }}</span>' +
                    '</li>' +
                  '</ul>' +
                '</div>' +
              '</div>' +
            '</section>' +

            // ---- gameCard 줄 (창작자/배급사의 다른 상품 · 관련 기획전) ----
            '<section v-for="(row, ri) in d.cardRows" class="store-detail-section">' +
              '<h2 class="store-detail-section__title stds-title5 fw-bold">{{ row.title }}</h2>' +
              '<div :ref="\'cards\' + ri" class="store-detail-cards" @scroll="cardsUpdate(ri)">' +
                '<a v-for="c in row.cards" href="#" class="store-detail-card" @click.prevent>' +
                  '<span class="store-detail-card__thumb"><img :src="img(c.image)" alt="" /><span v-if="c.badge" class="store-detail-type-badge store-detail-card__badge">{{ c.badge }}</span></span>' +
                  '<span class="store-detail-card__info">' +
                    '<strong class="store-detail-card__title fw-bold">{{ c.title }}</strong>' +
                    '<span v-if="c.genre" class="store-detail-card__genre stds-text4">{{ c.genre }}</span>' +
                    '<span v-if="c.free" class="store-detail-card__price store-detail-card__price--free fw-bold">무료</span>' +
                    '<span v-else class="store-detail-card__price store-detail-price fw-bold"><b>{{ c.discount }}</b>{{ c.price }}</span>' +
                    // hover interaction — 추천율 + 찜 · 장바구니 (MD 시안 68412:112313)
                    '<span class="store-detail-card__hover">' +
                      '<span class="store-detail-card__rec"><i class="ic-v2-community-thumbs-up-fill"></i>{{ c.recommend }}% 추천</span>' +
                      '<span class="store-detail-card__btns">' +
                        '<button type="button" class="store-detail-round store-detail-round--3" aria-label="찜하기" @click.prevent.stop><i class="ic-v2-community-like-line"></i></button>' +
                        '<button type="button" class="store-detail-pill store-detail-pill--fill stds-btn3 fw-medium" @click.prevent.stop><i class="ic-v2-navigation-cart-fill"></i>장바구니</button>' +
                      '</span>' +
                    '</span>' +
                  '</span>' +
                '</a>' +
              '</div>' +
              '<div class="store-detail-indicator">' +
                '<button class="game-detail-chevron" type="button" aria-label="이전" :disabled="!cardsNav[ri] || !cardsNav[ri].prev" @click="cardsGo(ri, -1)"><i class="ic-v2-control-arrow-left-line"></i></button>' +
                '<span class="game-detail-indicator"><span v-for="n in 5" :class="{ \'is-active\': n - 1 === (cardsNav[ri] ? cardsNav[ri].page : 0) }"></span></span>' +
                '<button class="game-detail-chevron" type="button" aria-label="다음" :disabled="!cardsNav[ri] || !cardsNav[ri].next" @click="cardsGo(ri, 1)"><i class="ic-v2-control-arrow-right-line"></i></button>' +
              '</div>' +
            '</section>' +

            // ---- 캐시 충전 ----
            '<section class="store-detail-section">' +
              '<h2 class="store-detail-section__title stds-title5 fw-bold">캐시 충전</h2>' +
              '<div class="store-detail-cash">' +
                '<img :src="img(\'coin.png\')" alt="" />' +
                '<strong class="stds-title6 fw-bold">{{ d.cash.name }}</strong>' +
                '<strong class="stds-title6 fw-bold">{{ d.cash.amount }}</strong>' +
                '<button type="button" class="store-detail-cash__btn stds-btn3 fw-medium"><i class="ic-v2-object-coin-fill"></i>충전</button>' +
              '</div>' +
            '</section>' +

            // ---- 도전과제 ----
            '<section class="store-detail-section">' +
              '<h2 class="store-detail-section__title store-detail-section__title--icon stds-title5 fw-bold">도전과제<button type="button" aria-label="새로고침"><i class="ic-v2-control-refresh-line"></i></button></h2>' +
              '<div class="store-detail-ach">' +
                '<div class="store-detail-ach__cover">' +
                  '<span class="store-detail-ach__bg" :style="{ backgroundImage: \'url(\' + img(\'ach-cover-bg.jpg\') + \')\' }"></span>' +
                  '<img class="store-detail-ach__art" :src="img(\'ach-cover.jpg\')" alt="" />' +
                  '<div class="store-detail-ach__rate">' +
                    '<div class="store-detail-ach__gauge">' +
                      '<img :src="img(\'ach-gauge-track.svg\')" alt="" /><img class="store-detail-ach__gauge-fill" :src="img(\'ach-gauge.svg\')" alt="" />' +
                      '<strong class="stds-title4 fw-bold">{{ d.achievement.rate }}%</strong>' +
                    '</div>' +
                    '<p class="store-detail-ach__who stds-title7 fw-medium"><span>{{ d.achievement.nickname }}</span>님의 달성률</p>' +
                    '<div class="store-detail-ach__count">' +
                      '<div><strong class="stds-title7 fw-bold">{{ d.achievement.done }}</strong><span class="stds-cap1">달성</span></div>' +
                      '<i></i>' +
                      '<div><strong class="stds-title7 fw-bold">{{ d.achievement.total }}</strong><span class="stds-cap1">전체</span></div>' +
                    '</div>' +
                  '</div>' +
                '</div>' +
                '<ul class="store-detail-ach__list">' +
                  '<li v-for="a in d.achievement.list">' +
                    '<span class="store-detail-ach__thumb" :class="{ \'is-locked\': a.locked }"><i v-if="a.locked" class="ic-v2-object-lock-fill"></i><img v-else :src="img(a.image)" alt="" /></span>' +
                    '<div class="store-detail-ach__text">' +
                      '<strong class="stds-text3 fw-medium">{{ a.title }}</strong>' +
                      '<span class="stds-cap1">{{ a.desc }}</span>' +
                    '</div>' +
                    '<div v-if="a.progress" class="store-detail-ach__state"><b class="stds-text4 fw-medium">{{ a.progress }}</b><span class="stds-cap1">{{ a.sub }}</span></div>' +
                    '<div v-else-if="a.before" class="store-detail-ach__state"><b class="stds-text4 fw-medium is-before">{{ a.before }}</b></div>' +
                    '<div v-else-if="a.complete" class="store-detail-ach__state"><b class="stds-text4 fw-medium is-complete"><i class="ic-v2-object-trophy-fill"></i>달성완료</b><span class="stds-cap1">{{ a.complete }}</span></div>' +
                  '</li>' +
                '</ul>' +
              '</div>' +
            '</section>' +

            // ---- 랭킹 ----
            '<section class="store-detail-section">' +
              '<h2 class="store-detail-section__title store-detail-section__title--icon stds-title5 fw-bold">랭킹<button type="button" aria-label="새로고침"><i class="ic-v2-control-refresh-line"></i></button></h2>' +
              '<div class="store-detail-rank">' +
                '<button type="button" class="store-detail-rank__title stds-title6 fw-bold">{{ d.ranking.title }}<i class="ic-v2-control-arrow-down-line"></i></button>' +
                '<div class="store-detail-rank__filter">' +
                  '<div class="store-detail-rank__periods stds-btn2">' +
                    '<template v-for="(p, i) in d.ranking.periods"><i v-if="i" aria-hidden="true"></i><button type="button" :class="{ \'is-active\': i === rankPeriod }" @click="rankPeriod = i">{{ p }}</button></template>' +
                  '</div>' +
                  '<div class="store-detail-rank__date stds-btn2 fw-medium">' +
                    '<button type="button" aria-label="이전 날짜"><i class="ic-v2-control-arrow-left-line"></i></button>{{ d.ranking.date }}<button type="button" aria-label="다음 날짜" disabled><i class="ic-v2-control-arrow-right-line"></i></button>' +
                  '</div>' +
                '</div>' +
                '<div class="store-detail-rank__table">' +
                  '<div class="store-detail-rank__head stds-text4"><span>순위</span><span>플레이어</span><span>레코드</span></div>' +
                  '<ol class="store-detail-rank__list">' +
                    '<li v-for="r in d.ranking.list" :class="{ \'is-mine\': r.mine }">' +
                      '<div class="store-detail-rank__no">' +
                        '<b>{{ r.rank }}</b>' +
                        '<span class="store-detail-rank__change" :class="\'is-\' + r.change">' +
                          '<template v-if="r.change === \'up\' || r.change === \'down\'">{{ r.num }}<i :class="r.change === \'up\' ? \'ic-v2-control-select-arrow-up-fill\' : \'ic-v2-control-select-arrow-down-fill\'"></i></template>' +
                          '<template v-else-if="r.change === \'new\'">NEW</template>' +
                          '<i v-else class="ic-v2-control-indeterminate-line"></i>' +
                        '</span>' +
                      '</div>' +
                      '<div class="store-detail-rank__player">' +
                        '<img :src="img(r.profile)" alt="" />' +
                        '<div><strong class="stds-text2 fw-medium">{{ r.name }}</strong><span class="stds-cap1">{{ r.play }}</span></div>' +
                      '</div>' +
                      '<strong class="store-detail-rank__record stds-text2 fw-bold">{{ r.record }}</strong>' +
                    '</li>' +
                  '</ol>' +
                '</div>' +
                '<button type="button" class="store-detail-more stds-btn2 fw-medium">더보기<i class="ic-v2-control-arrow-down-line"></i></button>' +
              '</div>' +
            '</section>' +

            // ---- 수상 및 참여 ----
            '<section class="store-detail-section">' +
              '<h2 class="store-detail-section__title stds-title5 fw-bold">수상 및 참여</h2>' +
              '<div class="store-detail-awards"><img v-for="a in d.awards" :src="img(a)" alt="" /></div>' +
              '<div class="store-detail-indicator">' +
                '<button class="game-detail-chevron" type="button" aria-label="이전" disabled><i class="ic-v2-control-arrow-left-line"></i></button>' +
                '<span class="game-detail-indicator"><span v-for="n in 5" :class="{ \'is-active\': n === 1 }"></span></span>' +
                '<button class="game-detail-chevron" type="button" aria-label="다음"><i class="ic-v2-control-arrow-right-line"></i></button>' +
              '</div>' +
            '</section>' +

            // ---- 관련 링크 — 좁으면 옆으로 넘김 + 오른쪽 화살표(MD 시안) ----
            '<section class="store-detail-section">' +
              '<h2 class="store-detail-section__title stds-title5 fw-bold">관련 링크</h2>' +
              '<div class="store-detail-links-wrap">' +
                '<div ref="links" class="store-detail-links" @scroll="linksUpdate">' +
                  '<a v-for="l in d.links" href="#" class="store-detail-link" @click.prevent><span><i :class="l.icon"></i></span><b class="stds-btn2 fw-regular">{{ l.label }}</b></a>' +
                '</div>' +
                '<button v-if="linksCanNext" class="store-detail-ai__next store-detail-links__next" type="button" aria-label="다음" @click="linksNext"><i class="ic-v2-control-arrow-right-line"></i></button>' +
              '</div>' +
            '</section>' +

            // ---- 시스템 요구 사항 ----
            '<section class="store-detail-section">' +
              '<h2 class="store-detail-section__title stds-title5 fw-bold">시스템 요구 사항</h2>' +
              '<div class="store-detail-req">' +
                '<div class="store-detail-req__cols">' +
                  '<div v-for="c in d.requirements.columns" class="store-detail-req__col">' +
                    '<strong class="stds-text1 fw-bold">{{ c.title }}</strong>' +
                    '<dl class="stds-text3"><div v-for="r in c.rows"><dt>{{ r[0] }}</dt><dd>{{ r[1] }}</dd></div></dl>' +
                  '</div>' +
                '</div>' +
                '<p class="store-detail-req__note stds-text4">{{ d.requirements.note }}</p>' +
              '</div>' +
            '</section>' +

            // ---- 기타 (판매자 정보 · 상품 약관) ----
            '<div class="store-detail-etc">' +
              '<a v-for="e in d.etc" href="#" class="stds-title7 fw-bold" @click.prevent>{{ e }}<i class="ic-v2-control-arrow-right-line"></i></a>' +
            '</div>' +

            // ---- 추천 후기&공략 (새소식과 같은 모양) ----
            '<section class="store-detail-section">' +
              '<div class="store-detail-section__head">' +
                '<h2 class="store-detail-section__title stds-title5 fw-bold">추천 후기&amp;공략</h2>' +
                '<button type="button" class="store-detail-all stds-btn3 fw-medium">전체보기<i class="ic-v2-control-arrow-right-line"></i></button>' +
              '</div>' +
              '<div class="store-detail-news">' +
                '<a v-for="n in d.tips" href="#" class="store-detail-news__item" @click.prevent>' +
                  '<span v-if="n.image" class="store-detail-news__img"><img :src="img(n.image)" alt="" /></span>' +
                  '<span class="store-detail-news__con">' +
                    '<span class="store-detail-news__text">' +
                      '<strong class="store-detail-news__title fw-bold">{{ n.title }}</strong>' +
                      '<span class="store-detail-news__sub">{{ n.text }}</span>' +
                    '</span>' +
                    '<span class="store-detail-news__date stds-text4"><span>{{ n.author }}</span><span>{{ n.date }}</span></span>' +
                  '</span>' +
                '</a>' +
              '</div>' +
            '</section>' +

            // ---- 상품 후기 ----
            '<section class="store-detail-section">' +
              '<div class="store-detail-section__head store-detail-section__head--review">' +
                '<h2 class="store-detail-section__title stds-title5 fw-bold">상품 후기</h2>' +
                '<a href="#" class="store-detail-review__rule stds-text4" @click.prevent>상품 후기 제공 기준<i class="ic-v2-control-web-link-line"></i></a>' +
              '</div>' +
              '<div class="store-detail-review">' +
                '<div class="store-detail-review__rating">' +
                  '<div class="store-detail-review__score">' +
                    '<span class="store-detail-review__icon"><i class="ic-v2-community-thumbs-up-fill"></i></span>' +
                    '<div><strong class="stds-title5 fw-bold">{{ d.review.rate }}</strong><span class="stds-text3">{{ d.review.voters }}</span></div>' +
                  '</div>' +
                  '<i class="store-detail-review__line" aria-hidden="true"></i>' +
                  '<div class="store-detail-review__bars">' +
                    '<strong class="stds-text3 fw-medium">플레이 시간별 추천 비율</strong>' +
                    '<div v-for="b in d.review.byPlaytime" class="store-detail-review__bar stds-text4">' +
                      '<span>{{ b.label }}</span><i><i :style="{ width: b.value + \'%\' }"></i></i><b class="fw-bold">{{ b.value }}%</b>' +
                    '</div>' +
                  '</div>' +
                '</div>' +
                '<div class="store-detail-review__head">' +
                  '<strong class="stds-title6 fw-bold">후기 {{ d.review.count }}</strong>' +
                  '<button type="button" class="store-detail-review__sort stds-btn2 fw-medium">최신순<i class="ic-v2-control-arrow-down-line"></i></button>' +
                '</div>' +
                '<div class="store-detail-review__ai">' +
                  '<div class="store-detail-review__ai-title">' +
                    '<img :src="img(\'ic-store-ai.svg\')" alt="" />' +
                    '<strong class="stds-text3 fw-bold">Ai 후기 요약</strong>' +
                    '<img class="store-detail-review__beta" :src="img(\'badge-beta.svg\')" alt="Beta" />' +
                    '<i class="ic-v2-state-info-circle-line" aria-hidden="true"></i>' +
                  '</div>' +
                  '<div class="store-detail-review__chips"><span v-for="c in d.review.aiChips" class="store-detail-chip stds-btn3 fw-medium">{{ c }}</span></div>' +
                  '<div class="store-detail-ai__reaction store-detail-review__reaction">' +
                    '<span class="stds-cap1">AI 요약 정보가 도움이 되었나요?</span>' +
                    '<button type="button" aria-label="도움이 됐어요"><i class="ic-v2-community-thumbs-up-line"></i></button>' +
                    '<button type="button" aria-label="도움이 안 됐어요"><i class="ic-v2-community-thumbs-down-line"></i></button>' +
                  '</div>' +
                '</div>' +
                '<ul class="store-detail-comments">' +
                  '<li v-for="r in d.review.list" class="store-detail-comment">' +
                    '<img class="store-detail-comment__profile" :src="img(\'review-profile.png\')" alt="" />' +
                    '<div class="store-detail-comment__body">' +
                      '<div class="store-detail-comment__user">' +
                        '<div>' +
                          '<div class="store-detail-comment__name stds-text4 fw-medium"><span class="store-detail-comment__badge" :class="\'is-\' + r.badge">{{ r.label }}</span>{{ r.name }}</div>' +
                          '<div class="store-detail-comment__meta stds-text4"><span>{{ d.review.play }}</span><i></i><span>{{ d.review.date }}</span></div>' +
                        '</div>' +
                        '<button type="button" aria-label="더보기 메뉴"><i class="ic-v2-navigation-option-vertical-fill"></i></button>' +
                      '</div>' +
                      '<p class="stds-text3"><template v-for="(t, i) in d.review.text"><br v-if="i" />{{ t }}</template></p>' +
                      '<div class="store-detail-comment__action">' +
                        '<button type="button" class="store-detail-comment__reply stds-btn3 fw-medium"><i class="ic-v2-community-reply-line"></i>{{ r.comments || \'댓글\' }}</button>' +
                        '<span class="store-detail-comment__thumbs stds-text4"><span><i class="ic-v2-community-thumbs-up-line"></i>0</span><span><i class="ic-v2-community-thumbs-down-line"></i>0</span></span>' +
                      '</div>' +
                    '</div>' +
                  '</li>' +
                '</ul>' +
                '<button type="button" class="store-detail-more stds-btn2 fw-medium">더보기<i class="ic-v2-control-arrow-down-line"></i></button>' +
              '</div>' +
            '</section>' +

            // ---- report ----
            '<p class="store-detail-report stds-title8 fw-medium">상품에 문제가 있나요? <a href="#" @click.prevent>신고하기</a></p>' +
          '</div>' +

          // ---- 장바구니컴포넌트 ----
          '<aside class="store-detail__right">' +
            '<div class="store-detail-buy">' +
              '<div class="store-detail-buy__title">' +
                '<h1 class="store-detail-buy__name fw-bold">{{ d.product.title }}</h1>' +
                '<div class="store-detail-buy__meta stds-btn2 fw-medium">' +
                  '<a href="#" @click.prevent><i class="ic-v2-community-thumbs-up-fill"></i><span>{{ d.product.recommend }}</span></a>' +
                  '<span class="store-detail-buy__dot" aria-hidden="true"></span>' +
                  '<a href="#" class="store-detail-buy__reviews" @click.prevent><i class="ic-v2-community-reply-line"></i><span>{{ d.product.reviews }}</span></a>' +
                '</div>' +
              '</div>' +
              '<div class="store-detail-buy__price">' +
                '<s class="store-detail-buy__original fw-medium">{{ d.product.originalPrice }}</s>' +
                '<div class="store-detail-buy__final fw-bold">' +
                  '<span class="store-detail-buy__discount">{{ d.product.discount }}</span>' +
                  '<span>{{ d.product.price }}</span>' +
                  '<i class="ic-v2-state-info-circle-line" aria-hidden="true"></i>' +
                '</div>' +
                '<div class="store-detail-buy__coupon stds-cap1">' +
                  '<img :src="img(\'ic-discount.svg\')" alt="" />' +
                  '<span><b class="fw-bold">{{ d.product.couponDiscount }}</b> <span class="fw-medium">할인</span></span>' +
                  '<b class="fw-bold">{{ d.product.remain }}</b>' +
                  '<span class="fw-medium">남음</span>' +
                '</div>' +
              '</div>' +
              '<div class="store-detail-buy__btns">' +
                '<button type="button" class="store-detail-buy__btn store-detail-buy__btn--primary fw-medium">바로구매</button>' +
                '<div class="store-detail-buy__row">' +
                  '<button type="button" class="store-detail-buy__btn fw-medium"><i class="ic-v2-community-like-line"></i>찜하기</button>' +
                  '<button type="button" class="store-detail-buy__btn fw-medium"><i class="ic-v2-navigation-cart-fill"></i>장바구니</button>' +
                '</div>' +
              '</div>' +
            '</div>' +

            '<div class="store-detail-side">' +
              // 기본 정보
              '<div class="store-detail-side__block">' +
                '<button type="button" class="store-detail-side__head" :aria-expanded="infoOpen" @click="infoOpen = !infoOpen">' +
                  '<span class="stds-title7 fw-bold">기본 정보</span><i :class="infoOpen ? \'ic-v2-control-arrow-up-line\' : \'ic-v2-control-arrow-down-line\'"></i>' +
                '</button>' +
                '<div v-show="infoOpen" class="store-detail-side__body">' +
                  '<dl class="store-detail-info stds-text3">' +
                    '<div v-for="r in d.info">' +
                      '<dt>{{ r.label }}</dt>' +
                      '<dd>' +
                        '<template v-if="r.links"><template v-for="(l, i) in r.links"><a href="#" @click.prevent>{{ l }}</a><span v-if="i < r.links.length - 1">,</span></template></template>' +
                        '<template v-else>{{ r.text }}<i v-if="r.more" class="ic-v2-control-arrow-right-line" aria-hidden="true"></i></template>' +
                      '</dd>' +
                    '</div>' +
                  '</dl>' +
                  '<div class="store-detail-info__btns">' +
                    '<button type="button" class="store-detail-info__btn stds-btn3 fw-medium"><i class="ic-v2-navigation-community-line"></i>커뮤니티</button>' +
                    '<button type="button" class="store-detail-info__btn stds-btn3 fw-medium"><i class="ic-v2-community-share-line"></i>공유하기' +
                      '<span class="store-detail-info__tip">{{ d.shareTooltip }}</span>' +
                    '</button>' +
                  '</div>' +
                '</div>' +
              '</div>' +
              '<hr class="store-detail-side__line" />' +
              // 추천 상품
              '<div class="store-detail-side__block">' +
                '<button type="button" class="store-detail-side__head" :aria-expanded="recOpen" @click="recOpen = !recOpen">' +
                  '<span class="stds-title7 fw-bold">추천 상품</span><i :class="recOpen ? \'ic-v2-control-arrow-up-line\' : \'ic-v2-control-arrow-down-line\'"></i>' +
                '</button>' +
                '<ul v-show="recOpen" class="store-detail-rec">' +
                  '<li v-for="r in d.recommended" class="store-detail-rec__item">' +
                    '<span class="store-detail-rec__thumb"><img :src="img(\'rec-thumb-bg.png\')" alt="" /><img :src="img(\'rec-thumb.png\')" alt="" /></span>' +
                    '<div class="store-detail-rec__info">' +
                      '<span v-if="r.badge" class="store-detail-type-badge">PRE<i></i>DLC</span>' +
                      '<strong class="store-detail-rec__name stds-text2 fw-bold">{{ r.title }}</strong>' +
                      '<span class="store-detail-price stds-text2 fw-bold"><b>{{ r.discount }}</b>{{ r.price }}</span>' +
                    '</div>' +
                    '<div class="store-detail-rec__btns">' +
                      '<button type="button" class="store-detail-round" aria-label="찜하기"><i class="ic-v2-community-like-line"></i></button>' +
                      '<button type="button" class="store-detail-round" aria-label="장바구니"><i class="ic-v2-navigation-cart-fill"></i></button>' +
                    '</div>' +
                  '</li>' +
                '</ul>' +
              '</div>' +
            '</div>' +
          '</aside>' +
        '</div>' +
      '</div>',
  });

  app.mount(selector);
  return app;
}
