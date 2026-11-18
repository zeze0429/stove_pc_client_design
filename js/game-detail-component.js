/**
 * 게임 상세 (game-detail.html?id=<게임id>)
 * -------------------------------------------------------------
 * Figma 클라이언트_v3.1_이미지 제작 가이드 · v3.1_게임상세 컴포넌트 운영가이드
 *   "전체 컴포넌트 구성 예시" 1100:13451 (MD 1020 기준, 로스트아크).
 * 하단 다운로드 패널(플레이 바 · 공통 공지 띠)은 별도 영역이라 이 페이지에 넣지 않는다 (사용자 11-18).
 * 상세 데이터가 있는 게임만 그리고, 없는 게임은 "준비 중" 안내만 둔다.
 *
 * 클래스 · 데이터 이름은 운영가이드 "컴포넌트 명칭"(1135:9152) 번호 · 이름을 따른다 (사용자 11-18):
 *   1 백그라운드 background · 2 1단 풀배너 full-banner · 3 1단배너-썸네일형 thumbnail-banner ·
 *   4 1단배너-배너형 banner · 5 커뮤니티-api연동형 community-api · 6 커뮤니티-앨범형 community-album ·
 *   7 커뮤니티-게시판형 community-board · 8 시스템 요구사항 system-requirements · 9 게임요약 summary ·
 *   10 바로가기 shortcut · 11 서브배너 sub-banner · 12 마켓다운로드링크 + QR market-download ·
 *   13 PC방 혜택 배너 / 아이콘 pcbang-banner · link-badge--pcbang · 15-1·2·3 로아상영관 loa-theater ·
 *   16 쿠폰 coupon · 17 공지사항 축소형 notice-compact · 18 링크 지원 게임 마크 link-badge--link ·
 *   20 등급 및 게임물 내용 정보 rating
 *   번호 없는 것: 게임명 title · 게임 공지 notice-banner (component/banner/notice — 가이드 번호와 별도, 사용자 11-18)
 *   아직 없음: 14 이벤트 - 이미지 · 동영상(팝업) 나중에 진행 / 19 공지 설정(가이드 그림상 하단 플레이 바 위 공통 공지 띠 + 공지 팝업) 보류 (사용자 11-18)
 *
 *   mountGameDetail('#game-detail-mount', gameId)
 */
var GAME_DETAIL_DIR = 'assets/game-detail/';

var GAME_DETAIL_DATA = {
  lostark: {
    dir: 'lostark/',
    // 게임명 위 뱃지 (Badge/Left top · Client · Right top) — 시안의 모든 종류
    badges: [
      { label: '점검', kind: 'warning', icon: 'ic-v2-state-warning-circle-fill' },
      { label: 'NEW', kind: 'new' },
      { label: 'UPDATE', kind: 'update' },
      { label: 'CBT', kind: 'test' },
      { label: 'OBT', kind: 'test' },
      { label: '사전예약', kind: 'test' },
      { label: '사전설치', kind: 'test' },
      { label: 'TEST', kind: 'black' },
    ],
    // 아이콘배너 (link badge) — 18 링크 지원 게임 마크 · 13 PC방 혜택 아이콘
    linkBadges: [
      { kind: 'link', label: '링크 지원 게임', icon: 'ic-badge-link.svg' },
      { kind: 'pcbang', label: 'PC방 혜택', icon: 'ic-badge-pcbang.svg' },
    ],
    // 게임 공지 (component/banner/notice) — 가이드 19 공지 설정(보류)과는 별도
    noticeBanner: '게임점검 중입니다. (점검 종료까지 1시간 20분 남음)',
    // 2 1단 풀배너
    fullBanner: { src: 'banner-full-01.jpg', count: 5 },
    // 3 1단배너-썸네일형 (pattern/banner/multi) — 첫 장(영상)이 큰 화면, 아래 썸네일로 바꾼다
    thumbnailBanner: [
      { src: 'video-01.jpg', video: true },
      { src: 'video-02.jpg' },
      { src: 'video-03.jpg' },
      { src: 'video-04.jpg' },
    ],
    // 4 1단배너-배너형 (component/banner/event)
    banner: { src: 'event-01.jpg', video: true, count: 5 },
    // 15 로아상영관 — 로스트아크 한정 (15-1 추천 · 15-2 BEST · 15-3 NEW)
    loaTheaterRec: [
      { src: 'theater-rec-01.png', title: '카제로스 레이드 3막 "칠흑, 폭풍의 밤" Teaser' },
      { src: 'theater-rec-02.png', title: '신상입고! MARCH. 2025 네리아의 드레스룸' },
      { src: 'theater-rec-03.png', title: '심연의 징벌자, 모르둠 (Punisher of the Abyss, Mordoom) / LOST ARK Official Soundtrack' },
      { src: 'theater-rec-04.jpg', title: '싱글모드를 벗어난 모코코를 위한 레이드 기본 꿀팁 🐝' },
      { src: 'theater-rec-05.jpg', title: '로생에 도움되는 꿀팁!' },
    ],
    loaTheater: [
      { src: 'theater-01.png', title: '열리는 나르가의 문 (The Great Gate of Narga) / LOST ARK Official Soundtrack', author: 'LOST ARK', date: '2025.2.05' },
      { src: 'theater-02.png', title: '샤 (Sha) / LOST ARK Official Soundtrack', author: 'LOST ARK', date: '2025.1.22' },
      { src: 'theater-03.png', title: '2025 직업 가이드 서폿 딜 세팅 편 (각인, 아크패시브, 딜 사이클)', author: '삔뿌슈', date: '2025.1.22' },
      { src: 'theater-04.png', title: '신상입고! MARCH. 2025 네리아의 드레스룸', author: 'LOST ARK', date: '2025.3.05' },
      { src: 'theater-05.png', title: "신규 클래스 '환수사' 미리보기 | Lost Ark - New Class, Wild Soul", author: 'LOST ARK', date: '2025.1.03' },
      { src: 'theater-06.png', title: '징벌의 섬광 (Flash of Punishment) / LOST ARK Official Soundtrack', author: 'LOST ARK', date: '2023.07.19' },
      { src: 'theater-07.png', title: '열리는 나르가의 문 (The Great Gate of Narga) / LOST ARK Official Soundtrack', author: '로마러', date: '2025.2.05' },
      { src: 'theater-08.png', title: '영상 하나로 끝내는 뉴비&복귀자 가이드!', author: '숫여우', date: '2024.12.24' },
    ],
    // 5 커뮤니티-api연동형 (component/board/notice) — 공지사항
    communityApi: [
      { cat: '공지', title: '6월 2일 (수) 임시점검 안내' },
      { cat: '이벤트', title: '베른 대도서관 5월의 우수 사서를 찾아서! 이벤트 당첨자 발표합니다' },
      { cat: '업데이트', title: '엘가시아 질서의 신 루페온이 빚어낸 라제니스의 낙원' },
      { cat: '공지', title: '6월 2일 (수) 임시점검 안내' },
      { cat: '이벤트', title: '베른 대도서관 5월의 우수 사서를 찾아서!' },
      { cat: '공지', title: '6월 2일 (수) 임시점검 안내' },
      { cat: '공지', title: '6월 2일 (수) 임시점검 안내' },
      { cat: '업데이트', title: '엘가시아 질서의 신 루페온이 빚어낸 라제니스의 낙원' },
      { cat: '공지', title: '6월 2일 (수) 임시점검 안내' },
      { cat: '업데이트', title: '엘가시아 질서의 신 루페온이 빚어낸 라제니스의 낙원' },
    ],
    communityApiDate: '2022. 05. 11',
    // 6 커뮤니티-앨범형 (component/board/album) — UCC 게시판
    communityAlbum: [
      { src: 'ucc-01.png', video: true, title: '제목이 들어갑니다. 두줄까지 노출 됩니다.제목이 들어갑니다. 두줄까지 노출 됩니다.' },
      { src: 'ucc-02.png', title: '모코코야 생일 축하해' },
      { src: 'ucc-03.jpg', title: '[스크린샷] 예쁘게 찍히는 장소를 소개해드리겠습니다.' },
      { src: 'ucc-04.jpg', title: '신규 어비스 던전 : 카양' },
      { src: 'ucc-05.jpg', title: '모코코야 생일 축하해 오늘은 생일이니까 널 위해 준비했엉!!!!!!!' },
      { src: 'ucc-06.jpg', title: '모코코야 생일 축하해~' },
    ],
    // 9 게임요약
    summary: {
      tagline: '심연의 끝을 마주한 자',
      rows: [
        ['장르', 'MMORPG'], ['이용등급', '청소년이용불가'], ['출시일', '2018.11.07'], ['개발사', 'Smilegate RPG'],
        ['배급사', 'Smilegate RPG'], ['마지막 플레이', '2023.08.09'], ['총 플레이 시간', '3일 2시간 24분'],
      ],
    },
    // 17 공지사항 축소형 — 위 3개는 강조 묶음(별 아이콘)
    noticeCompact: {
      pinned: ['6월 2일 (수) 임시점검 안내', '베른 대도서관 5월의 우수 사서를 찾아서! 이벤트 당첨자 발표합니다', '엘가시아 질서의 신 루페온이 빚어낸 라제니스의 낙원'],
      rows: ['6월 2일 (수) 임시점검 안내', '베른 대도서관 5월의 우수 사서를 찾아서! ', '6월 2일 (수) 임시점검 안내', '6월 2일 (수) 임시점검 안내',
        '엘가시아 질서의 신 루페온이 빚어낸 라제니스의 낙원', '엘가시아 질서의 신 루페온이 빚어낸 라제니스의 낙원', '엘가시아 질서의 신 루페온이 빚어낸 라제니스의 낙원'],
    },
    // 10 바로가기 — dot: 빨간 점(새 소식)
    shortcuts: [
      { icon: 'ic-v2-navigation-home-fill', label: '공식 홈페이지', dot: true },
      { icon: 'ic-v2-navigation-community-fill', label: '커뮤니티' },
      { icon: 'ic-v2-object-help-center-fill', label: '고객센터', dot: true },
      { icon: 'ic-v2-logo-facebook-fill', label: '공식 Facebook', dot: true },
      { svg: 'shortcut-logo-x.svg', label: '공식 X', dot: true }, // 아이콘 폰트에 X 로고가 없어 Figma SVG
      { icon: 'ic-v2-logo-youtube-fill', label: '공식 Youtube' },
      { icon: 'ic-v2-navigation-message-fill', label: '리사의 편지' },
    ],
    // 11 서브배너
    subBanner: { src: 'subbanner-01.jpg', count: 5 },
    // 12 마켓다운로드링크 + QR (component/marketdownload)
    marketDownload: [
      { icon: 'ic-v2-logo-google-playstore-fill', label: 'Google Play', qr: true },
      { icon: 'ic-v2-logo-apple-fill', label: 'App Store', qr: true },
      { icon: 'ic-v2-logo-amazonstore-fill', label: 'Amazon Store', qr: true },
      { icon: 'ic-v2-logo-onestore-fill', label: 'One Store', qr: true },
      { icon: 'ic-v2-logo-huaweiappgallery-fill', label: 'Huawei App Gallery', qr: true },
      { icon: 'ic-v2-logo-galaxystore-fill', label: 'Galaxy Store' },
      { icon: 'ic-v2-control-long-arrow-up-circle-fill', label: '마켓다운로드링크' },
    ],
    // 13 PC방 혜택 배너
    pcbangBanner: 'pcbang-banner.png',
    // 8 시스템 요구사항 — Figma 원문 그대로 (두 번째 제목도 시안대로 "최소 요구 사항")
    systemRequirements: [
      { title: '최소 요구 사항', rows: [
        ['OS', 'Windows 10권장 (Windows 7 sp1 이상 지원, 64bit 운영체제만 지원)'], ['Processor', '2GHz Dual Core Processor'],
        ['Memory', '4GB RAM'], ['Graphics', 'Nvidia & AMD (512MB VRAM)'], ['DirectX', 'DirectX 9.0c 이상 (2010 June)'],
        ['Hard Drive', '31GB HD space'], ['Sound', 'DirectX compatible soundcard'], ['Other', '컨트롤러 필요'],
      ] },
      { title: '최소 요구 사항', rows: [
        ['OS', 'Windows 10권장 (Windows 7 sp1 이상 지원, 64bit 운영체제만 지원)'], ['Processor', 'Intel i5이상 / Ryzen 5이상'],
        ['Memory', '4GB RAM'],
        ['Graphics', '1080P FHD - NVIDIA GeForce GTX 1050 AMD Radeon RX560 2G 이상\n1440P QHD - NVIDIA GeForce RTX 2070 AMD Radeon RX5700XT 이상\nUltra Specs (4K, UHD) - NVIDIA GeForce RTX 2080 AMD Radeon RX 6800 이상'],
        ['DirectX', 'DirectX 9.0c 이상 (2010 June)'], ['Hard Drive', '31GB HD space'], ['Sound', 'DirectX compatible soundcard'],
      ] },
      { title: '지원 언어', text: '한국어  영어   이탈리어어  중국어  일본어  프랑스   포르투갈어  독일어  네덜란드어  러시아어' },
      { title: '이용 등급', rating: true },
    ],
    // 20 등급 및 게임물 내용 정보
    rating: {
      text: '청소년 이용불가\n(본 게임은 모든 연령의 이용자가 구매 및 이용할 수 있습니다.)',
      icons: ['18', 'violence', 'speculation', 'crime', 'drug', 'inapposite', 'fear'],
    },
    // 7 커뮤니티-게시판형 (component/board/list) — 자유 게시판
    communityBoard: [
      { title: '이번에 주는 스익 익스 점핑말인데요이번에 주는 스익 익스 점핑말인데요' },
      { title: '이번에 주는 스익 익스 점핑말인데요' },
      { title: '이번에 주는 스익 익스 점핑말인데요' },
      { title: '이번에 주는 스익 익스 점핑말인데요' },
    ],
  },
};

function mountGameDetail(selector, gameId) {
  var data = GAME_DETAIL_DATA[gameId] || null;
  var game = typeof gameInfo === 'function' ? gameInfo(gameId) : null; // 이름 · 썸네일은 게임 카탈로그 (js/game-catalog.js)

  var app = Vue.createApp({
    data: function () {
      return {
        d: data,
        name: game ? game.name : '게임 상세',
        thumb: game && game.thumb ? game.thumb : '',
        thumbnailIndex: 0,
      };
    },
    methods: {
      img: function (file) { return GAME_DETAIL_DIR + this.d.dir + file; },
    },
    template:
      '<div v-if="!d" class="game-detail-empty stds-title2">' +
        '<strong class="fw-bold">{{ name }}</strong>상세 페이지 준비 중입니다.' +
      '</div>' +
      '<div v-else class="game-detail">' +
        // 1 백그라운드 (bg 480) — 유틸리티 바 뒤까지 깔리고 아래로 페이지 색에 녹아든다
        '<div class="game-detail-background" aria-hidden="true"><img :src="img(\'bg.jpg\')" alt="" /></div>' +

        '<div class="game-detail__contents">' +
          // ---- 게임명 ----
          '<div class="game-detail-title">' +
            '<div class="game-detail-title__info">' +
              '<span class="game-detail-thumb"><img v-if="thumb" :src="thumb" alt="" /></span>' +
              '<div class="game-detail-title__text">' +
                '<div class="game-detail-title__badges">' +
                  '<span v-for="b in d.badges" class="game-detail-badge stds-cap2 fw-bold" :class="\'game-detail-badge--\' + b.kind">' +
                    '<i v-if="b.icon" class="game-detail-badge__icon" :class="b.icon"></i>{{ b.label }}' +
                  '</span>' +
                '</div>' +
                '<h1 class="game-detail-title__name stds-title3 fw-bold">{{ name }}</h1>' +
              '</div>' +
            '</div>' +
            '<div class="game-detail-title__links">' +
              '<button v-for="l in d.linkBadges" class="game-detail-link-badge" :class="\'game-detail-link-badge--\' + l.kind" type="button">' +
                '<img class="game-detail-link-badge__icon" :src="img(l.icon)" alt="" />' +
                '<span class="game-detail-link-badge__label stds-cap2 fw-bold">{{ l.label }}<i class="ic-v2-control-arrow-right-line" aria-hidden="true"></i></span>' +
              '</button>' +
            '</div>' +
          '</div>' +

          // ---- 게임 공지 (component/banner/notice) — 가이드 번호와 별도 ----
          '<div class="game-detail-notice-banner" :style="{ backgroundImage: \'url(\' + img(\'notice-inspection.png\') + \')\' }">' +
            '<i class="ic-v2-object-notice-fill" aria-hidden="true"></i>' +
            '<span class="stds-text2 fw-bold">{{ d.noticeBanner }}</span>' +
          '</div>' +

          // ---- 2 1단 풀배너 (component/banner/full) ----
          '<div class="game-detail-full-banner">' +
            '<div class="game-detail-full-banner__banner">' +
              '<img class="game-detail-full-banner__img" :src="img(d.fullBanner.src)" alt="" />' +
              '<button class="game-detail-chevron game-detail-chevron--lg game-detail-full-banner__prev" type="button" aria-label="이전"><i class="ic-v2-control-arrow-left-line"></i></button>' +
              '<button class="game-detail-chevron game-detail-chevron--lg game-detail-full-banner__next" type="button" aria-label="다음"><i class="ic-v2-control-arrow-right-line"></i></button>' +
            '</div>' +
            '<span class="game-detail-indicator"><span v-for="n in d.fullBanner.count" :class="{ \'is-active\': n === 1 }"></span></span>' +
          '</div>' +

          '<div class="game-detail__columns">' +
            // ================= left =================
            '<div class="game-detail__left">' +
              // 3 1단배너-썸네일형 (pattern/banner/multi)
              '<div class="game-detail-thumbnail-banner">' +
                '<div class="game-detail-thumbnail-banner__main">' +
                  '<img :src="img(d.thumbnailBanner[thumbnailIndex].src)" alt="" />' +
                  '<img v-if="d.thumbnailBanner[thumbnailIndex].video" class="game-detail-play" :src="img(\'play-56.svg\')" alt="재생" />' +
                '</div>' +
                '<div class="game-detail-thumbnail-banner__list">' +
                  '<button class="game-detail-chevron" type="button" aria-label="이전" @click="thumbnailIndex = (thumbnailIndex + d.thumbnailBanner.length - 1) % d.thumbnailBanner.length"><i class="ic-v2-control-arrow-left-line"></i></button>' +
                  '<div class="game-detail-thumbnail-banner__thumbs">' +
                    '<button v-for="(m, i) in d.thumbnailBanner" class="game-detail-thumbnail-banner__thumb" :class="{ \'is-active\': i === thumbnailIndex }" type="button" @click="thumbnailIndex = i">' +
                      '<img :src="img(m.src)" alt="" />' +
                      '<img v-if="m.video" class="game-detail-play game-detail-play--sm" :src="img(\'play-24.svg\')" alt="" />' +
                    '</button>' +
                  '</div>' +
                  '<button class="game-detail-chevron" type="button" aria-label="다음" @click="thumbnailIndex = (thumbnailIndex + 1) % d.thumbnailBanner.length"><i class="ic-v2-control-arrow-right-line"></i></button>' +
                '</div>' +
              '</div>' +

              '<div class="game-detail__components">' +
                // 4 1단배너-배너형 (component/banner/event)
                '<div class="game-detail-banner">' +
                  '<div class="game-detail-banner__img">' +
                    '<img :src="img(d.banner.src)" alt="" />' +
                    '<img v-if="d.banner.video" class="game-detail-play" :src="img(\'play-56.svg\')" alt="재생" />' +
                  '</div>' +
                  '<div class="game-detail-banner__control">' +
                    '<button class="game-detail-chevron" type="button" aria-label="이전"><i class="ic-v2-control-arrow-left-line"></i></button>' +
                    '<span class="game-detail-indicator"><span v-for="n in d.banner.count" :class="{ \'is-active\': n === 1 }"></span></span>' +
                    '<button class="game-detail-chevron" type="button" aria-label="다음"><i class="ic-v2-control-arrow-right-line"></i></button>' +
                  '</div>' +
                '</div>' +

                // 15-1 로아상영관 추천 (포스터 5열)
                '<section class="game-detail-board game-detail-board--rec">' +
                  '<div class="game-detail-board__title">' +
                    '<h2 class="stds-title6 fw-bold">로아 상영관</h2>' +
                    '<span class="game-detail-board-badge game-detail-board-badge--rec stds-cap1 fw-bold"><i class="ic-v2-community-thumbs-up-fill"></i>추천</span>' +
                    '<button class="game-detail-more stds-btn2 fw-regular" type="button">전체보기<i class="ic-v2-control-arrow-right-line"></i></button>' +
                  '</div>' +
                  '<div class="game-detail-loa-theater-rec">' +
                    '<a v-for="t in d.loaTheaterRec" class="game-detail-loa-theater-rec__item" href="#" @click.prevent>' +
                      '<span class="game-detail-loa-theater-rec__img"><img :src="img(t.src)" alt="" /></span>' +
                      '<span class="game-detail-loa-theater-rec__name stds-title7 fw-medium">{{ t.title }}</span>' +
                    '</a>' +
                  '</div>' +
                '</section>' +

                // 15-2 BEST · 15-3 NEW 로아상영관 (4열 2줄)
                '<section v-for="kind in [\'best\', \'new\']" class="game-detail-board" :class="\'game-detail-board--\' + kind">' +
                  '<div class="game-detail-board__title">' +
                    '<h2 class="stds-title6 fw-bold">로아 상영관</h2>' +
                    '<span class="game-detail-board-badge stds-title8 fw-bold" :class="\'game-detail-board-badge--\' + kind">' +
                      '<i :class="kind === \'best\' ? \'ic-v2-object-crown-fill\' : \'ic-v2-community-star-fill\'"></i>{{ kind === \'best\' ? \'BEST\' : \'NEW\' }}' +
                    '</span>' +
                    '<button class="game-detail-more stds-btn2 fw-regular" type="button">전체보기<i class="ic-v2-control-arrow-right-line"></i></button>' +
                  '</div>' +
                  '<div class="game-detail-loa-theater">' +
                    '<a v-for="t in d.loaTheater" class="game-detail-loa-theater__item" href="#" @click.prevent>' +
                      '<span class="game-detail-loa-theater__img"><img :src="img(t.src)" alt="" /></span>' +
                      '<span class="game-detail-loa-theater__name stds-title7 fw-medium">{{ t.title }}</span>' +
                      '<span class="game-detail-loa-theater__author stds-text4 fw-bold">{{ t.author }}</span>' +
                      '<span class="game-detail-loa-theater__date stds-cap1 fw-regular">{{ t.date }}</span>' +
                    '</a>' +
                  '</div>' +
                '</section>' +

                // 5 커뮤니티-api연동형 (component/board/notice) — 공지사항
                '<section class="game-detail-board">' +
                  '<div class="game-detail-board__title">' +
                    '<h2 class="stds-title6 fw-bold">공지사항</h2>' +
                    '<button class="game-detail-more stds-btn2 fw-regular" type="button">전체보기<i class="ic-v2-control-arrow-right-line"></i></button>' +
                  '</div>' +
                  '<ul class="game-detail-community-api">' +
                    '<li v-for="n in d.communityApi"><a class="game-detail-community-api__row" href="#" @click.prevent>' +
                      '<span class="game-detail-community-api__title stds-title7 fw-medium"><span class="game-detail-community-api__cat">{{ n.cat }}</span><span class="game-detail-community-api__text">{{ n.title }}</span></span>' +
                      '<span class="game-detail-community-api__date stds-text4 fw-regular">{{ d.communityApiDate }}</span>' +
                    '</a></li>' +
                  '</ul>' +
                '</section>' +

                // 6 커뮤니티-앨범형 (component/board/album) — UCC 게시판
                '<section class="game-detail-board">' +
                  '<div class="game-detail-board__title">' +
                    '<h2 class="stds-title6 fw-bold">UCC 게시판</h2>' +
                    '<button class="game-detail-more stds-btn2 fw-regular" type="button">전체보기<i class="ic-v2-control-arrow-right-line"></i></button>' +
                  '</div>' +
                  '<div class="game-detail-community-album">' +
                    '<a v-for="u in d.communityAlbum" class="game-detail-community-album__item" href="#" @click.prevent>' +
                      '<span class="game-detail-community-album__img"><img :src="img(u.src)" alt="" /><img v-if="u.video" class="game-detail-play" :src="img(\'play-56.svg\')" alt="재생" /></span>' +
                      '<span class="game-detail-community-album__name stds-title7 fw-medium">{{ u.title }}</span>' +
                      '<span class="game-detail-community-album__user stds-text4 fw-regular">%닉네임%</span>' +
                      '<span class="game-detail-community-album__meta stds-cap1 fw-medium">' +
                        '<span>2023.07.19</span>' +
                        '<span class="game-detail-community-album__counts">' +
                          '<span><i class="ic-v2-community-reply-line"></i>999</span>' +
                          '<span><i class="ic-v2-community-number-of-view-line"></i>999</span>' +
                        '</span>' +
                      '</span>' +
                    '</a>' +
                  '</div>' +
                '</section>' +

                // 7 커뮤니티-게시판형 (component/board/list) — 자유 게시판
                '<section class="game-detail-board">' +
                  '<div class="game-detail-board__title">' +
                    '<h2 class="stds-title6 fw-bold">자유 게시판</h2>' +
                    '<button class="game-detail-more stds-btn2 fw-regular" type="button">전체보기<i class="ic-v2-control-arrow-right-line"></i></button>' +
                  '</div>' +
                  '<ul class="game-detail-community-board">' +
                    '<li v-for="p in d.communityBoard"><a class="game-detail-community-board__row" href="#" @click.prevent>' +
                      '<span class="game-detail-community-board__title stds-title7 fw-medium"><span class="game-detail-community-board__text">{{ p.title }}</span><span class="game-detail-community-board__reply">[999]</span></span>' +
                      '<span class="game-detail-community-board__info">' +
                        '<span class="stds-text4"><span class="game-detail-community-board__gm fw-medium">GM</span> <span class="fw-regular">닉네임</span></span>' +
                        '<span class="game-detail-community-board__date stds-cap1 fw-medium">2023.07.19</span>' +
                        '<span class="game-detail-community-board__date stds-cap1 fw-medium"><i class="ic-v2-community-number-of-view-line"></i>999</span>' +
                      '</span>' +
                    '</a></li>' +
                  '</ul>' +
                '</section>' +

                // 8 시스템 요구사항 (component/additional info)
                '<section class="game-detail-board">' +
                  '<div class="game-detail-board__title"><h2 class="stds-title6 fw-bold">시스템 요구 사항</h2></div>' +
                  '<div class="game-detail-system-requirements">' +
                    '<div v-for="sec in d.systemRequirements" class="game-detail-system-requirements__section">' +
                      '<h3 class="stds-title6 fw-medium">{{ sec.title }}</h3>' +
                      '<dl v-if="sec.rows" class="game-detail-system-requirements__rows stds-text3 fw-regular">' +
                        '<div v-for="r in sec.rows"><dt>{{ r[0] }}</dt><dd>{{ r[1] }}</dd></div>' +
                      '</dl>' +
                      '<p v-if="sec.text" class="game-detail-system-requirements__text stds-text3 fw-regular">{{ sec.text }}</p>' +
                      '<div v-if="sec.rating" class="game-detail-rating">' + // 20 등급 및 게임물 내용 정보
                        '<p class="game-detail-rating__text stds-text3 fw-regular">{{ d.rating.text }}</p>' +
                        '<div class="game-detail-rating__icons">' +
                          '<img v-for="r in d.rating.icons" :src="img(\'sysreq-rating-\' + r + \'.svg\')" alt="" />' +
                          // 선정성 — Figma에서 레이어 6장으로만 나와 겹쳐 그린다
                          '<span class="game-detail-rating-sexual">' +
                            '<img v-for="l in [\'shape\', \'path\', \'shape-2\', \'clip-1\', \'clip-2\', \'clip-3\']" :class="\'is-\' + l" :src="img(\'sysreq-rating-sexual-\' + l + \'.svg\')" alt="" />' +
                          '</span>' +
                        '</div>' +
                      '</div>' +
                    '</div>' +
                  '</div>' +
                '</section>' +
              '</div>' +
            '</div>' +

            // ================= right =================
            '<div class="game-detail__right">' +
              // 9 게임요약 — 이 카드만 바탕 70%
              '<section class="game-detail-board game-detail-board--summary">' +
                '<div class="game-detail-board__head"><h2 class="stds-title6 fw-bold">게임 정보</h2></div>' +
                '<div class="game-detail-summary stds-text3 fw-regular">' +
                  '<p class="game-detail-summary__tagline">{{ d.summary.tagline }}</p>' +
                  '<dl class="game-detail-summary__rows"><div v-for="r in d.summary.rows"><dt>{{ r[0] }}</dt><dd>{{ r[1] }}</dd></div></dl>' +
                '</div>' +
              '</section>' +

              // 16 쿠폰 (MD — 티켓 모양 + 로고 탭 + NEW 리본)
              '<a class="game-detail-coupon" href="#" @click.prevent>' +
                '<span class="game-detail-coupon__ticket" :style="{ maskImage: \'url(\' + img(\'right-md-mask.svg\') + \')\', webkitMaskImage: \'url(\' + img(\'right-md-mask.svg\') + \')\' }"><img :src="img(\'right-md-img.png\')" alt="" /></span>' +
                '<img class="game-detail-coupon__border" :src="img(\'right-md-border.svg\')" alt="" />' +
                '<span class="game-detail-coupon__title stds-title6 fw-bold">쿠폰</span>' +
                '<span class="game-detail-coupon__desc stds-cap1 fw-medium">등록 가능한 쿠폰이 있어요.<br>지금 확인해 보세요!</span>' +
                '<span class="game-detail-coupon__tab"><img :src="img(\'right-md-logo-bg.svg\')" alt="" /><img class="game-detail-coupon__logo" :src="img(\'right-md-logo.png\')" alt="" /></span>' +
                '<span class="game-detail-coupon__new"><img :src="img(\'right-md-badge-bg.svg\')" alt="" /><img :src="img(\'right-md-badge-mask.svg\')" alt="" /><span>NEW</span></span>' +
              '</a>' +

              // 17 공지사항 축소형
              '<section class="game-detail-board">' +
                '<div class="game-detail-board__title">' +
                  '<h2 class="stds-title6 fw-bold">공지사항</h2>' +
                  '<button class="game-detail-more stds-btn2 fw-regular" type="button">전체보기<i class="ic-v2-control-arrow-right-line"></i></button>' +
                '</div>' +
                '<div class="game-detail-notice-compact stds-title7 fw-medium">' +
                  '<div class="game-detail-notice-compact__pinned">' +
                    '<a v-for="t in d.noticeCompact.pinned" href="#" @click.prevent><i class="ic-v2-community-star-fill"></i><span>{{ t }}</span></a>' +
                  '</div>' +
                  '<a v-for="t in d.noticeCompact.rows" href="#" @click.prevent><span>{{ t }}</span></a>' +
                '</div>' +
              '</section>' +

              // 10 바로가기
              '<section class="game-detail-board">' +
                '<div class="game-detail-board__head"><h2 class="stds-title6 fw-bold">바로가기</h2></div>' +
                '<ul class="game-detail-shortcut">' +
                  '<li v-for="s in d.shortcuts"><a href="#" @click.prevent>' +
                    '<img v-if="s.svg" class="game-detail-shortcut__svg" :src="img(s.svg)" alt="" /><i v-else :class="s.icon"></i>' +
                    '<span class="game-detail-shortcut__label stds-text4 fw-regular">{{ s.label }}<img v-if="s.dot" class="game-detail-shortcut__dot" :src="img(\'shortcut-badge-new.svg\')" alt="" /></span>' +
                    '<i class="game-detail-shortcut__arrow ic-v2-control-arrow-right-line"></i>' +
                  '</a></li>' +
                '</ul>' +
              '</section>' +

              // 11 서브배너
              '<div class="game-detail-sub-banner">' +
                '<img :src="img(d.subBanner.src)" alt="" />' +
                '<span class="game-detail-indicator game-detail-indicator--sm"><span v-for="n in d.subBanner.count" :class="{ \'is-active\': n === 1 }"></span></span>' +
              '</div>' +

              // 12 마켓다운로드링크 + QR (component/marketdownload)
              '<section class="game-detail-board">' +
                '<div class="game-detail-board__head"><h2 class="stds-title6 fw-bold">마켓 다운로드</h2></div>' +
                '<ul class="game-detail-market-download">' +
                  '<li v-for="m in d.marketDownload"><a href="#" @click.prevent>' +
                    '<i :class="m.icon"></i><span class="stds-text4 fw-medium">{{ m.label }}</span>' +
                    '<button v-if="m.qr" class="game-detail-market-download__qr stds-btn3 fw-medium" type="button" @click.stop.prevent><i class="ic-v2-hardware-qr-code-fill"></i>QR</button>' +
                  '</a></li>' +
                '</ul>' +
              '</section>' +

              // 13 PC방 혜택 배너 (component/banner/pcbang)
              '<a class="game-detail-pcbang-banner" href="#" @click.prevent><img :src="img(d.pcbangBanner)" alt="" /></a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>',
  });
  return app.mount(selector);
}
