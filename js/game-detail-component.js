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
 *   13 PC방 혜택 — 두 종류로 관리 (사용자 11-19): 아이콘형 link-badge--pcbang(게임명 줄 오른쪽) · 배너형 pcbang-banner(오른쪽 열 아래) ·
 *   15-1·2·3 로아상영관 loa-theater ·
 *   16 쿠폰 coupon · 17 공지사항 축소형 notice-compact · 18 링크 지원 게임 마크 link-badge--link ·
 *   20 등급 및 게임물 내용 정보 rating
 *   로스트아크 한정: 15-1·2·3 로아상영관 · 16 쿠폰 · 17 공지사항 축소형 — 데이터(loaTheaterRec · loaTheater · coupon ·
 *     noticeCompact)가 있는 게임에서만 그린다 (사용자 11-18)
 *   번호 없는 것: 게임명 title · 게임 공지 notice-banner (component/banner/notice — 가이드 번호와 별도, 사용자 11-18)
 *   아직 없음: 14 이벤트 - 이미지 · 동영상(팝업) 나중에 진행 / 19 공지 설정(가이드 그림상 하단 플레이 바 위 공통 공지 띠 + 공지 팝업) 보류 (사용자 11-18)
 *
 *   mountGameDetail('#game-detail-mount', gameId)
 */
var GAME_DETAIL_DIR = 'assets/game-detail/';

var GAME_DETAIL_DATA = {
  lostark: {
    dir: 'lostark/',
    // 1 백그라운드를 콘텐츠 영역 높이만큼 채우고 고정 — 스크롤하면 콘텐츠만 올라감 (사용자 11-24, 로스트아크 이벤트 페이지 fixed_bg처럼)
    background: 'Client3.0_PC게임상세_01_백그라운드_로스트아크.jpg?v=5', // v=5 = 11-26 Figma 68494:503320 bg 2790×720(png → jpg 92)
    backgroundFixed: true,
    backgroundGradient: '#36414D', // 11-26 테마 색 #36414D (사용자) — 직전 #2D333A(새 배경 Figma 68494:503320과 함께), 그 전 #2C2D42.  고정 배경 아래 그라데이션 · 카드 덧댐 색 — 게임별 커스텀(사용자 11-24, 로스트아크 #503DAF → #30171B → #2F303A → #21222F → 11-25 #2C2D42(덧댐 · 그라데이션 둘 다, 원복 #21222F), #191919로 바꿔 봤다가 "원래대로"). 없으면 페이지 바탕(background-variant-1)
    // 게임명 위 뱃지 (Badge/Left top · Client · Right top) — 시안의 모든 종류
    badges: [
      { label: '점검', kind: 'warning', icon: 'ic-v2-state-warning-circle-fill', inspection: true }, // 점검중일 때만 — 아래 게임 공지(점검) 띠와 한 묶음
      // hidden: true = 데이터 · 스타일은 두고 화면에서만 숨김 — 지금은 UPDATE만 보이게 (사용자 11-23 "지우지는 말고")
      { label: 'NEW', kind: 'new', hidden: true },
      { label: 'UPDATE', kind: 'update' },
      { label: 'CBT', kind: 'test', hidden: true },
      { label: 'OBT', kind: 'test', hidden: true },
      { label: '사전예약', kind: 'test', hidden: true },
      { label: '사전설치', kind: 'test', hidden: true },
      { label: 'TEST', kind: 'black', hidden: true },
    ],
    // 아이콘배너 (link badge) — 13 PC방 혜택 아이콘형. 18 링크 지원 게임 마크는 여기 두지 않고
    // 사이드바 게임 뱃지('link')가 있는 게임에서만 앞에 붙인다 (gameDetailLinkBadges, 사용자 11-19)
    linkBadges: [
      { kind: 'pcbang', label: 'PC방 혜택', icon: 'ic-badge-pcbang.svg?v=2' },
    ],
    // 게임 공지 (component/banner/notice) — 가이드 19 공지 설정(보류)과는 별도
    noticeBanner: '게임점검 중입니다. (점검 종료까지 1시간 20분 남음)',
    // 2 1단 풀배너 — 이미지 2600×920 (1.5배수), 파일명 Client3.0_PC게임상세_07_1단풀배너_게임명_NN
    //   로스트아크 10장 = 스마일게이트 뉴스룸 로스트아크 갤러리에서 크롭 (사용자 11-19)
    //   첫 장 = 사용자가 준 업데이트 배너(종언의 잔영, 2000×766 → 위는 그대로, 아래 UPDATE · 진행 기간 줄과 좌우 121씩 잘라냄, 사용자 11-20)
    fullBanner: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(function (n) {
      return 'Client3.0_PC게임상세_07_1단풀배너_로스트아크_' + (n < 10 ? '0' : '') + n + '.jpg?v=5';
    }),
    // 3 1단배너-썸네일형 (pattern/banner/multi) — 첫 장(영상)이 큰 화면, 아래 썸네일로 바꾼다
    thumbnailBanner: [
      // 첫 장 = 풀배너 03(번개 용) (사용자 11-24 "이게 첫 장으로")
      { src: 'Client3.0_PC게임상세_07_1단풀배너_로스트아크_03.jpg?v=5' },
      // 이미지 = 스마일게이트 뉴스룸 로스트아크 갤러리 중 2 대표배너에 안 쓴 캐릭터 그림 16:9 (사용자 11-20), 1290×726
      { src: 'video-01.jpg?v=2', video: true },
      { src: 'video-02.jpg?v=2' },
      { src: 'video-03.jpg?v=2' },
      { src: 'video-04.jpg?v=2' },
    ].concat([1, 2, 4, 5, 6, 7, 8, 9, 10, 11].map(function (n) { // 03은 첫 장으로 올려서 뺌
      // + 1단 풀배너 이미지 11장도 썸네일형에 (사용자 11-24) — 2600×920이라 16:9 칸엔 가운데 기준으로 양옆이 잘려 보임(cover, 비율 유지)
      return { src: 'Client3.0_PC게임상세_07_1단풀배너_로스트아크_' + (n < 10 ? '0' : '') + n + '.jpg?v=5' };
    })),
    // 4 1단배너-배너형 (component/banner/event)
    banner: { src: 'event-01.jpg', video: true, count: 5 },
    // ---- 로스트아크 한정 (15 · 16 · 17) — 다른 게임은 이 키를 넣지 않는다 ----
    // 15 로아상영관 (15-1 추천 · 15-2 BEST · 15-3 NEW)
    loaTheaterRec: [
      { src: 'theater-rec-01.png', title: '카제로스 레이드 3막 "칠흑, 폭풍의 밤" Teaser' },
      { src: 'theater-rec-02.png', title: '신상입고! MARCH. 2025 네리아의 드레스룸' },
      { src: 'theater-rec-03.png', title: '심연의 징벌자, 모르둠 (Punisher of the Abyss, Mordoom) / LOST ARK Official Soundtrack' },
      // 스트리머 카드 — 통째 그림(theater-rec-04/05.jpg) 대신 Figma 68449:481543 구조대로 (아바타 · STREAMER · 이름 · 영상 썸네일, 사용자 11-24)
      { streamer: { avatar: 'theater-streamer-avatar-01.png', name: '기백', thumb: 'theater-streamer-thumb-01.png' }, title: '싱글모드를 벗어난 모코코를 위한 레이드 기본 꿀팁 🐝' },
      { streamer: { avatar: 'theater-streamer-avatar-02.png', name: '게임하는인기', thumb: 'theater-streamer-thumb-02.png' }, title: '로생에 도움되는 꿀팁!' },
    ],
    // 15-2 BEST · 15-3 NEW — lostark.game.onstove.com/Video 의 BEST 영상 · NEW 영상 앞 8개 (11-25 사용자 "여기에 있는걸로 교체").
    // 썸네일 = 그 페이지가 쓰는 유튜브 mqdefault 320×180 그대로, 파일명 theater-{영상 ID}.jpg (두 목록이 같이 씀).
    // 그 전(theater-01~08.png 한 목록을 BEST · NEW에 같이)은 git 기록에 있음
    loaTheaterBest: [
      { src: 'theater-R1OhkK6MMUg.jpg', title: '최고 효율의 캐릭터 맞춤 지옥 시뮬레이터 출시!', author: '리연 & LOALAB', date: '2026.9.16' },
      { src: 'theater-ZqGAeuwnF5o.jpg', title: '태양 아래 군림하는 자, 신화의 사막 패키지', author: 'LOST ARK', date: '2026.9.09' },
      { src: 'theater-SrRhOio7X4M.jpg', title: '8주년 기념, 변화의 시작 아바타, 탈 것, 펫 출시!', author: 'LOST ARK', date: '2026.11.09' },
      { src: 'theater-G5Yd4BfblEI.jpg', title: '로스트아크 On Air l 2026.11.6 19:00', author: 'LOST ARK', date: '2026.11.06' },
      { src: 'theater-MqRIGDaBeQI.jpg', title: '낙원 시즌4 이것만 챙기세요', author: '겜빡이존', date: '2026.9.16' },
      { src: 'theater-_eH-NBn1LNU.jpg', title: '로스트아크 On Air l 2026.10.29 19:00', author: 'LOST ARK', date: '2026.10.29' },
      { src: 'theater-CdVTqC0LHdc.jpg', title: '로스트아크《군단장 스토리 총정리》', author: '김토르', date: '2026.9.02' },
      { src: 'theater-xgjuGnoQl0o.jpg', title: '로스트아크 On Air l 2026.11.20 19:00', author: 'LOST ARK', date: '2026.11.20' },
    ],
    loaTheaterNew: [
      { src: 'theater-xgjuGnoQl0o.jpg', title: '로스트아크 On Air l 2026.11.20 19:00', author: 'LOST ARK', date: '2026.11.20' },
      { src: 'theater-SrRhOio7X4M.jpg', title: '8주년 기념, 변화의 시작 아바타, 탈 것, 펫 출시!', author: 'LOST ARK', date: '2026.11.09' },
      { src: 'theater-G5Yd4BfblEI.jpg', title: '로스트아크 On Air l 2026.11.6 19:00', author: 'LOST ARK', date: '2026.11.06' },
      { src: 'theater-_eH-NBn1LNU.jpg', title: '로스트아크 On Air l 2026.10.29 19:00', author: 'LOST ARK', date: '2026.10.29' },
      { src: 'theater-wZ0rwJWBLec.jpg', title: '로스트아크 On Air l 2026.10.16 19:00', author: 'LOST ARK', date: '2026.10.16' },
      { src: 'theater-MqRIGDaBeQI.jpg', title: '낙원 시즌4 이것만 챙기세요', author: '겜빡이존', date: '2026.9.16' },
      { src: 'theater-R1OhkK6MMUg.jpg', title: '최고 효율의 캐릭터 맞춤 지옥 시뮬레이터 출시!', author: '리연 & LOALAB', date: '2026.9.16' },
      { src: 'theater-ZqGAeuwnF5o.jpg', title: '태양 아래 군림하는 자, 신화의 사막 패키지', author: 'LOST ARK', date: '2026.9.09' },
    ],
    // 5 커뮤니티-api연동형 (component/board/notice) — 공지사항
    // 공지사항 = lostark.game.onstove.com/News/Notice/List 일반 목록 앞 7개(상단 고정 3개 제외) + 이벤트 분류(?noticetype=event) 최근 3개 (11-25 사용자 "로아에서 텍스트 받아서" → "이벤트 업데이트도 몇개").
    // 업데이트 게시판(/News/Update/List)은 11-25 기준 글 없음 → 업데이트 분류는 없음. 날짜순.
    // 11-25 처음엔 공지 목록 앞 10개 — 빠진 3개: 공지 11월 19일(목) 임시 점검 완료 안내 11.19 · 점검 11월 19일(목) 임시 점검 안내 11.18 · 공지 11월 20일(금) 라이브 방송 사전 안내 11.18
    // 날짜는 글마다("42분 전" · "18시간 전"은 11-25 10:43 기준 날짜로). 그 전 = 예시 글 + 날짜 하나(communityApiDate '2022. 05. 11')
    communityApi: [
      { cat: '공지', title: '로스트아크 2부 업데이트에 따른 주요 개편 사항 사전 안내', date: '2026. 11. 25' },
      { cat: '공지', title: '로스트아크 샵 내 일부 상품 판매 중단 및 종료 안내', date: '2026. 11. 25' },
      { cat: '공지', title: '11월 25일(수) 로스트아크 정기 점검 완료 안내', date: '2026. 11. 25' },
      { cat: '공지', title: '알려진 이슈를 안내해 드립니다. (11/25 수정)', date: '2026. 11. 25' },
      { cat: '점검', title: '11월 25일(수) 정기 점검 안내', date: '2026. 11. 24' },
      { cat: '공지', title: '11월 20일(금) 로스트아크 임시 점검 완료 안내', date: '2026. 11. 20' },
      { cat: '점검', title: '11월 20일(금) 로스트아크 임시 점검 안내', date: '2026. 11. 19' },
      { cat: '이벤트', title: '8주년 기념 핫타임 이벤트 안내', date: '2026. 11. 05' },
      { cat: '이벤트', title: '해저 보물 인양 대작전 이벤트 안내', date: '2026. 10. 21' },
      { cat: '이벤트', title: '개천절 & 한글날 핫타임 이벤트 안내', date: '2026. 09. 30' },
    ],
    // 6 커뮤니티-앨범형 (component/board/album) — UCC 게시판
    // UCC 게시판 = lostark.game.onstove.com/Video 의 '모험가 UCC' 영상 6개 (11-25 사용자 "UCC 게시판도 최신화" — 그 칸은 들어올 때마다 순서가 섞여 11-25 받은 순서).
    // 썸네일 = 유튜브 mqdefault 320×180(ucc-{영상 ID}.jpg). 숫자는 로아 상영관처럼 재생수(play) · 좋아요수(like) — 사용자 11-25 "로아에서는 변경, 다른 게임은 댓글 · 조회수 유지"
    // (play가 없는 게임은 reply · view, 값 없으면 예시 999). 그 전 = ucc-01~06 예시 글(제목만, 닉네임 · 날짜 · 숫자는 템플릿 예시값)
    communityAlbumWide: true, // 칸 비율 16:9(320:180, 로아 상영관과 같음) — 유튜브 썸네일이 안 잘리게 (11-25 사용자 "비율 바꿔줘"). 다른 게임은 기본 177:136
    communityAlbum: [
      { src: 'ucc-3v60i5sowgc.jpg', video: true, title: '조력사무소 로아팀 미친실력 랜선 라이브연주회', user: 'VG 신선한망치', date: '2022.7.06', play: '1,297', like: '13' },
      { src: 'ucc-cIZjfQvN-5g.jpg', video: true, title: '움직이는 폭풍 속의 베히모스 만들기/【로스트 아크】 Behemoth Figure', user: '체셔 교수 Prof.Cheshire', date: '2024.7.17', play: '941', like: '6' },
      { src: 'ucc-zoIIiS-ujNA.jpg', video: true, title: '청각장애 유저분을 위해 고인물들이 뭉쳤습니다', user: '로마러', date: '2024.6.05', play: '5,826', like: '44' },
      { src: 'ucc-nAvNXdeG120.jpg', video: true, title: '별빛 등대의 섬 국악 편곡버젼 cover. 뉴띵', user: '트위치 뉴띵', date: '2022.7.20', play: '3,480', like: '35' },
      { src: 'ucc-0hd0tGfUPDw.jpg', video: true, title: '로스트아크 X 무신사 팝업스토어 가이드', user: '김홀앵유튜브', date: '2026.7.25', play: '553', like: '1' },
      { src: 'ucc-LSVaPWeuuVk.jpg', video: true, title: 'Sweet dream, my dear | 금강선 디렉터님께 보내는 답가', user: '보리 BORI', date: '2022.5.18', play: '3,604', like: '25' },
    ],
    // 9 게임요약
    summary: {
      tagline: '심연의 끝을 마주한 자',
      rows: [
        // 11-25 Figma 68479:481606 — 5줄, 출시일 하이픈 · 개발사/배급사 표기 변경.
        // 그 전 = 2018.11.07 · Smilegate RPG · Smilegate RPG + ['마지막 플레이', '2023.08.09'], ['총 플레이 시간', '3일 2시간 24분']
        ['장르', 'MMORPG'], ['이용등급', '청소년이용불가'], ['출시일', '2018-11-07'], ['개발사', '주식회사 스마일게이트'],
        ['배급사', '주식회사 스마일게이트'],
      ],
    },
    // 16 쿠폰 (로스트아크 한정)
    coupon: { title: '쿠폰', desc: '등록 가능한 쿠폰이 있어요.\n지금 확인해 보세요!' },
    // 17 공지사항 축소형 (로스트아크 한정) — 위 3개는 강조 묶음(별 아이콘)
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
      { icon: 'ic-v2-logo-facebook-fill', label: '공식 Facebook', dot: true, hidden: true }, // hidden = 11-25 Figma 68479:481650에서 숨김(지우지 않음)
      { icon: 'ic-v2-logo-twitter-X-fill', label: '공식 X', dot: true }, // 11-25 아이콘 폰트 X 로고(이름에 대문자 X — 전에 못 찾아 Figma SVG shortcut-logo-x.svg를 썼음, 원복 = svg: 'shortcut-logo-x.svg')
      { icon: 'ic-v2-logo-youtube-fill', label: '공식 Youtube' },
      { icon: 'ic-v2-navigation-message-fill', label: '리사의 편지', hidden: true },
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
    // 13 PC방 혜택 배너형 — 이미지 600×200(2배수 → 300×100), 파일명 Client3.0_PC게임상세_06_PC방혜택배너_게임명 (사용자 11-19)
    pcbangBanner: 'Client3.0_PC게임상세_06_PC방혜택배너_로스트아크.png',
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
    // = lostark.game.onstove.com/Community/Free/List 최근 글 4개 (11-25 사용자 "자유게시판도 최신화" — 거친 표현 · 닉네임 글은 건너뜀).
    // 작성자 = 대표 캐릭터 이름, reply = 댓글 수(0이면 안 보임), gm = GM 글이면 true, 날짜는 "N분/시간 전"을 11-25 기준 날짜로.
    // 그 전 = 예시 글 '이번에 주는 스익 익스 점핑말인데요' × 4 (닉네임 · 날짜 · 숫자는 템플릿 예시값)
    communityBoard: [
      { title: '갓운영자님(2부패치 저는 엄청좋음) 그림자레이드등등 싱글이나1인레이드도 돌게 해주세요 어느정도 되야 팟플을하던 자기기량 발휘를....', user: '축대리퍼박', date: '2026.11.25', view: '11' },
      { title: '2부 언제 업뎃?', user: '알토짱', date: '2026.11.25', view: '50' },
      { title: '100층..', reply: '1', user: '축대리퍼박', date: '2026.11.24', view: '34' },
      { title: '[로랜디] 1.1.0 업데이트 — 우편함 · 스피드런 1시즌 마감 · 저장 보호', user: '만다린덕', date: '2026.11.24', view: '34' },
    ],
  },
};

// 로드나인 (11-26 사용자 "로스트아크 컴포넌트 똑같이, 로아용(15 로아상영관 · 16 쿠폰 · 17 공지사항 축소형)은 빼고, 이미지는 변경").
// 그림 = Figma 클라이언트_v3.1 68494:503323 (WIC_pc game_MD) — 배경 · 1단배너-배너형(크리에이터 모집) · 서브배너(게임 소개) · UCC 6장.
// 글(공지 · 게시판 · 게임 정보 · 시스템 요구 사항 등)은 로스트아크 것 그대로 — 사용자 "콘텐츠 최신화는 내가 진행하면서 알려줄게".
// Figma에 로드나인 그림이 없는 칸: 2 1단 풀배너 · 3 썸네일형은 위 그림을 임시로 돌려 씀, 13 PC방 혜택 배너형은 그림이 없어 뺌(pcbangBanner 없음).
GAME_DETAIL_DATA.rodnine = Object.assign({}, GAME_DETAIL_DATA.lostark, {
  dir: 'rodnine/',
  background: 'Client3.0_PC게임상세_01_백그라운드_로드나인.jpg', // Figma bg 'image 878' 2790×720 (png → jpg 90)
  backgroundGradient: '#3A3231', // 11-26 테마 색 (사용자) — 직전 #4C4841, 그 전 #191919(Figma bg 'gradation' 끝 색)
  badges: GAME_DETAIL_DATA.lostark.badges.map(function (b) { // Figma: NEW만 보임
    if (b.label === 'NEW') return Object.assign({}, b, { hidden: false });
    if (b.label === 'UPDATE') return Object.assign({}, b, { hidden: true });
    return b;
  }),
  fullBanner: ['event-01.jpg', 'subbanner-01.jpg'], // 임시 — 로드나인 풀배너 그림 받으면 교체
  thumbnailBannerHidden: true, // 11-26 사용자 "로드나인은 썸네일형 배너 숨겨줘" — 줄만 지우면 다시 보임
  thumbnailBanner: [{ src: 'event-01.jpg' }, { src: 'subbanner-01.jpg' }, { src: 'Client3.0_PC게임상세_01_백그라운드_로드나인.jpg' }], // 임시
  banner: { src: 'event-01.jpg', count: 5 }, // Figma 1_이벤트배너 1290×540 (재생 아이콘 없음)
  subBanner: { src: 'subbanner-01.jpg', count: 5 }, // Figma 3_서브배너 630×279
  // UCC = Figma 3_앨범형 게시판 그림 · 제목 그대로, 숫자는 다른 게임 기본(댓글 · 조회수 999)
  communityAlbumWide: false,
  communityAlbum: [
    { src: 'ucc-01.jpg', video: true, title: '제목이 들어갑니다. 두줄까지 노출 됩니다.제목이 들어갑니다. 두줄까지 노출 됩니다.' },
    { src: 'ucc-02.jpg', title: '모코코야 생일 축하해' },
    { src: 'ucc-03.jpg', title: '[스크린샷] 예쁘게 찍히는 장소를 소개해드리겠습니다.' },
    { src: 'ucc-04.jpg', title: '신규 어비스 던전 : 카양' },
    { src: 'ucc-05.jpg', title: '모코코야 생일 축하해 오늘은 생일이니까 널 위해 준비했엉!!!!!!!' },
    { src: 'ucc-06.jpg', title: '모코코야 생일 축하해~' },
  ],
  pcbangBanner: null,
  // 로아용 빼기
  loaTheaterRec: null, loaTheaterBest: null, loaTheaterNew: null, coupon: null, noticeCompact: null,
});

// 사이드바 항목 id(즐겨찾기는 'fav-lostark' 같은 별도 id) → 게임 카탈로그 id
function gameDetailKey(id) {
  var entry = typeof gnbFindGameById === 'function' ? gnbFindGameById(id) : null;
  return entry && entry.game ? entry.game : id;
}

// 스토브게임(사이드바 '스토브게임' 그룹)인지 — 상세 데이터가 없으면 공용 컴포넌트 자리를 음영으로 잡는다
function gameDetailIsStove(key) {
  if (typeof GNB_GAME_GROUPS === 'undefined') return false;
  for (var i = 0; i < GNB_GAME_GROUPS.length; i++) {
    if (GNB_GAME_GROUPS[i].id !== 'stove-games') continue;
    return GNB_GAME_GROUPS[i].games.some(function (g) { return g.game === key; });
  }
  return false;
}

// 18 링크 지원 게임 마크 — 링크 플레이를 지원하는 게임 페이지에서만. 지원 여부는 사이드바 · 우측패널
// 게임 목록 뱃지와 같은 데이터(게임 카탈로그 badges: ['link', …])로 판단한다 (사용자 11-19)
var GAME_DETAIL_LINK_BADGE = { kind: 'link', label: '링크 지원 게임', src: GAME_DETAIL_DIR + 'common/ic-badge-link.svg' };

function gameDetailHasListBadge(key, badge) {
  var info = typeof gameInfo === 'function' ? gameInfo(key) : null;
  return !!info && info.badges.indexOf(badge) !== -1;
}

// 게임명 줄 오른쪽 아이콘배너 — [18 링크 지원(뱃지 있을 때)] + 게임 데이터의 아이콘배너(13 PC방 혜택 등)
function gameDetailLinkBadges(key, data) {
  var list = gameDetailHasListBadge(key, 'link') ? [GAME_DETAIL_LINK_BADGE] : [];
  (data && data.linkBadges || []).forEach(function (l) {
    list.push({ kind: l.kind, label: l.label, src: GAME_DETAIL_DIR + 'common/' + l.icon }); // 아이콘은 게임 공용(common/, 11-26 — 그 전 data.dir)
  });
  return list;
}

function mountGameDetail(selector, gameId) {
  var key = gameDetailKey(gameId);
  // 스토어형 상세(고스트러너 등)는 구조가 달라 js/store-detail-component.js가 그린다 (사용자 11-24)
  if (typeof STORE_DETAIL_DATA !== 'undefined' && STORE_DETAIL_DATA[key]) return mountStoreDetail(selector, key);
  var data = GAME_DETAIL_DATA[key] || null;
  var game = typeof gameInfo === 'function' ? gameInfo(key) : null; // 이름 · 썸네일은 게임 카탈로그 (js/game-catalog.js)
  var skeleton = !data && gameDetailIsStove(key);
  // 스토브게임 상세는 다크 테마만 (테스트, 사용자 11-24) — 콘텐츠 영역(.main)에만 data-theme="dark"를 걸어 그 안만 다크 값.
  // 사이드바(GNB) · 유틸리티 바 · 팝업은 설정 테마 그대로. 스토어형(고스트러너)은 위에서 이미 넘겨 해당 없음. 원복 = 이 if 블록 삭제
  if (data || gameDetailIsStove(key)) {
    var themeMain = document.querySelector(selector);
    themeMain = themeMain && themeMain.closest('.main');
    if (themeMain) themeMain.setAttribute('data-theme', 'dark');
  }

  var app = Vue.createApp({
    data: function () {
      return {
        d: data,
        linkBadges: gameDetailLinkBadges(key, data),
        skeleton: skeleton,
        name: game ? game.name : '게임 상세',
        thumb: game && game.thumb ? game.thumb : '',
        // 2 대표배너 슬라이드 — 트랙 [마지막 복제, 1…N, 첫 장 복제], 위치 1 = 첫 장. 무한 루프 (스토어 메인 캐러셀)
        fullBannerPos: 1,
        fullBannerAnim: false,
        thumbnailIndex: 0,
        thumbFill: 0,
        // 점검중 — '점검' 뱃지 + 게임 공지(점검) 띠를 한 묶음으로 (하단 설정 패널 '게임 상세 설정 > 점검중', 사용자 11-19)
        inspection: typeof protoSettingsRead === 'function' ? !!protoSettingsRead().gameDetailInspection : true,
        fullBannerOn: typeof protoSettingsRead === 'function' ? !!protoSettingsRead().gameDetailFullBanner : true,
      };
    },
    watch: {
      // 썸네일형 — 보이는 개수(MD 4 · LG 6)씩 한 쪽(페이지)으로 통째로 넘김 (11-24 "6 → 7번째로 갈 때 6장씩 통째로")
      thumbnailIndex: function () { this.$nextTick(this.thumbPage); },
    },
    computed: {
      fullBannerIndex: function () {
        var n = this.d && this.d.fullBanner ? this.d.fullBanner.length : 1;
        return (this.fullBannerPos - 1 + n) % n;
      },
      // 16 쿠폰 티켓 — 왼쪽 홈(반원 · 모서리) 40은 Figma 마스크 그대로, 나머지는 사각형으로 늘어난다 (열 300 · 420 대응)
      couponMask: function () {
        var m = 'url(' + this.img('right-md-mask.svg') + '), linear-gradient(#000, #000)';
        return { maskImage: m, webkitMaskImage: m };
      },
      fullBannerTrack: function () {
        var list = this.d && this.d.fullBanner || [];
        return list.length ? [list[list.length - 1]].concat(list, [list[0]]) : [];
      },
      // 점검중이면 '점검' 뱃지만, 아니면 '점검'을 뺀 나머지 뱃지 (사용자 11-19). hidden 뱃지는 빼고 (사용자 11-23)
      titleBadges: function () {
        var on = this.inspection;
        return (this.d && this.d.badges || []).filter(function (b) { return !b.hidden && (on ? b.inspection : !b.inspection); });
      },
    },
    mounted: function () {
      var thumbs = this.$refs.thumbs, thumbPage = this.thumbPage;
      if (thumbs) {
        thumbPage();
        if (typeof ResizeObserver === 'function') new ResizeObserver(function () { thumbPage(); }).observe(thumbs.parentElement); // 줄(왼쪽 열 폭)이 바뀌면 개수 · 쪽 다시
      }
      var self = this;
      // 고정 배경 높이는 CSS(css/game-detail.css .game-detail-background--fixed)가 100vh - PR영역으로 계산 (11-25 — 전엔 여기서 .main 높이를 재서 넣었는데 PR영역 끄면 갱신이 안 됐음)
      if (typeof protoSettingsSubscribe === 'function') protoSettingsSubscribe(function (s) { self.inspection = !!s.gameDetailInspection; self.fullBannerOn = !!s.gameDetailFullBanner; });
    },
    methods: {
      // 고른 썸네일이 있는 쪽으로 줄을 넘김. 한 쪽 = 보이는 개수(--thumb-count, 줄 폭에 맞춰 JS가 정함, 최대 6).
      // 마지막 쪽이 덜 차도 같은 칸 단위로 넘기도록 줄 끝에 빈칸(thumbFill개, 흰 4% 상자)을 둔다.
      thumbPage: function () {
        var box = this.$refs.thumbs;
        if (!box || !box.children.length) return;
        // 보이는 개수 = 줄 폭에 들어가는 만큼(최대 6) — 콘텐츠 폭에 따라 4 · 5 · 6 (11-24 "5칸도 나올 수 있어, 사이즈에 따라")
        var list = box.parentElement, ls = getComputedStyle(list), cs = getComputedStyle(box);
        var thumbW = box.children[0].offsetWidth, gap = parseFloat(cs.columnGap) || 0;
        var arrows = 0;
        for (var a = 0; a < list.children.length; a++) if (list.children[a] !== box) arrows += list.children[a].offsetWidth;
        var avail = list.clientWidth - arrows - (parseFloat(ls.columnGap) || 0) * (list.children.length - 1);
        var count = Math.max(1, Math.min(6, Math.floor((avail + gap) / (thumbW + gap))));
        if (String(count) !== box.style.getPropertyValue('--thumb-count')) box.style.setProperty('--thumb-count', String(count));
        var total = this.d.thumbnailBanner.length;
        var fill = (count - total % count) % count; // 마지막 쪽 빈칸 수 — 빈칸은 흰 4% 상자로 채움(템플릿)
        if (fill !== this.thumbFill) { this.thumbFill = fill; this.$nextTick(this.thumbPage); return; } // 빈칸이 그려진 뒤 다시 넘김
        var first = box.children[0], second = box.children[1];
        var step = second ? second.offsetLeft - first.offsetLeft : first.offsetWidth; // 썸네일 폭 + 간격
        box.scrollLeft = Math.floor(this.thumbnailIndex / count) * count * step;
      },
      img: function (file) { return GAME_DETAIL_DIR + this.d.dir + file; },
      // 게임마다 같은 UI 그림(재생 · 새 소식 점 · 이용 등급 아이콘 · 아이콘배너 아이콘)은 common/ 한 곳 (11-26 로드나인 추가하며 lostark/에서 옮김)
      ui: function (file) { return GAME_DETAIL_DIR + 'common/' + file; },
      // 2 대표배너 넘김 — 옆으로 밀기 0.4s ease (온스토브 스토어 메인 캐러셀 swiper speed 400, 사용자 11-19).
      // 움직이는 동안 들어온 클릭은 무시, 복제 장에 닿으면 애니메이션 없이 진짜 장으로 바꿔 끝없이 돈다
      fullBannerGo: function (pos) {
        if (this.fullBannerAnim || pos === this.fullBannerPos) return;
        this.fullBannerAnim = true;
        this.fullBannerPos = pos;
      },
      fullBannerEnd: function (e) {
        if (e.target !== e.currentTarget) return;
        var n = this.d.fullBanner.length;
        this.fullBannerAnim = false;
        if (this.fullBannerPos === 0) this.fullBannerPos = n;
        else if (this.fullBannerPos === n + 1) this.fullBannerPos = 1;
      },
      // 음영 막대 길이 — seed마다 고정된 무작위 값 (min ~ max, unit '%' 또는 'rem')
      rw: function (seed, min, max, unit) {
        var x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
        x -= Math.floor(x);
        return { width: (min + x * (max - min)).toFixed(1) + (unit || '%') };
      },
    },
    template:
      // 다른 스토브게임 — 로스트아크 한정(15 · 16 · 17)을 뺀 공용 컴포넌트 자리만 음영으로 (사용자 11-18).
      // 크기는 로스트아크 구현과 같은 자리 · 비율, 배경(1)은 게임마다 그림이라 비워 둔다.
      '<div v-if="skeleton" class="game-detail game-detail--skeleton" aria-busy="true" :aria-label="name + \' 상세\'">' +
        '<div class="game-detail__contents">' +
          // 게임 아이콘 · 게임명도 블록 (사용자 11-18), 뱃지 · 오른쪽 아이콘배너(18 · 13)는 넣지 않는다
          '<div class="game-detail-title">' +
            '<div class="game-detail-title__info">' +
              '<span class="game-detail-skeleton game-detail-skeleton--thumb"></span>' +
              '<span class="game-detail-skeleton game-detail-skeleton-bar game-detail-skeleton-bar--title3" style="width: 16rem"></span>' +
            '</div>' +
          '</div>' +
          // 게임 공지 · 2 1단 풀배너는 음영 화면에 넣지 않는다 (사용자 11-18)
          '<div class="game-detail__columns">' +
            '<div class="game-detail__left">' +
              '<div class="game-detail-thumbnail-banner">' + // 3 1단배너-썸네일형
                '<span class="game-detail-skeleton game-detail-skeleton--thumbnail-banner"></span>' +
                '<div class="game-detail-thumbnail-banner__list">' +
                  '<span class="game-detail-skeleton game-detail-skeleton--chevron"></span>' + // 화살표 자리 (사용자 11-18)
                  '<div class="game-detail-thumbnail-banner__thumbs"><span v-for="n in 4" class="game-detail-skeleton game-detail-skeleton--thumbnail"></span></div>' +
                  '<span class="game-detail-skeleton game-detail-skeleton--chevron"></span>' +
                '</div>' +
              '</div>' +
              '<div class="game-detail__components">' +
                '<div class="game-detail-banner">' + // 4 1단배너-배너형
                  '<span class="game-detail-skeleton game-detail-skeleton--banner"></span>' +
                  '<div class="game-detail-banner__control">' + '<span class="game-detail-skeleton game-detail-skeleton--chevron"></span>' + '<span class="game-detail-skeleton game-detail-skeleton--indicator"></span>' + '<span class="game-detail-skeleton game-detail-skeleton--chevron"></span>' + '</div>' +
                '</div>' +
                // 카드형은 실제 카드 틀 + 안쪽 큰 타이틀 · 전체보기 · 내용 줄 자리만 음영 막대 (사용자 11-18)
                // 5 커뮤니티-api연동형
                '<section class="game-detail-board">' +
                '<div class="game-detail-board__title">' +
                '<span class="game-detail-skeleton game-detail-skeleton-bar game-detail-skeleton-bar--title8" style="width: 6.4rem"></span>' +
                '<span class="game-detail-skeleton game-detail-skeleton-bar game-detail-skeleton-bar--btn2" style="width: 6.4rem"></span>' +
                '</div>' +
                '<ul class="game-detail-community-api"><li v-for="i in 10"><div class="game-detail-community-api__row">' +
                '<span class="game-detail-skeleton-fill"><span class="game-detail-skeleton game-detail-skeleton-bar game-detail-skeleton-bar--text4" :style="rw(i + 10, 40, 95)"></span></span>' + // 분류 + 제목을 막대 하나로 (사용자 11-18) · 11-25 글자 크기 따라 title7→text4, 날짜 text4→cap1
                '<span class="game-detail-skeleton game-detail-skeleton-bar game-detail-skeleton-bar--cap1" style="width: 6.4rem"></span>' +
                '</div></li></ul>' +
                '</section>' +
                // 6 커뮤니티-앨범형
                '<section class="game-detail-board">' +
                '<div class="game-detail-board__title">' +
                '<span class="game-detail-skeleton game-detail-skeleton-bar game-detail-skeleton-bar--title8" style="width: 8.8rem"></span>' +
                '<span class="game-detail-skeleton game-detail-skeleton-bar game-detail-skeleton-bar--btn2" style="width: 6.4rem"></span>' +
                '</div>' +
                '<div class="game-detail-community-album"><div v-for="n in 6" class="game-detail-community-album__item">' +
                '<span class="game-detail-skeleton game-detail-community-album__img"></span>' +
                '<span class="game-detail-community-album__name">' +
                '<span class="game-detail-skeleton game-detail-skeleton-bar game-detail-skeleton-bar--text4" style="width: 100%"></span>' +
                '<span class="game-detail-skeleton game-detail-skeleton-bar game-detail-skeleton-bar--text4" :style="rw(n + 20, 25, 85)"></span>' +
                '</span>' +
                '<span class="game-detail-skeleton game-detail-skeleton-bar game-detail-skeleton-bar--text4" :style="rw(n + 30, 25, 60)"></span>' +
                '<span class="game-detail-community-album__meta">' +
                '<span class="game-detail-skeleton game-detail-skeleton-bar game-detail-skeleton-bar--cap1" style="width: 30%"></span>' +
                '<span class="game-detail-skeleton game-detail-skeleton-bar game-detail-skeleton-bar--cap1" style="width: 35%"></span>' +
                '</span>' +
                '</div></div>' +
                '</section>' +
                // 7 커뮤니티-게시판형
                '<section class="game-detail-board">' +
                '<div class="game-detail-board__title">' +
                '<span class="game-detail-skeleton game-detail-skeleton-bar game-detail-skeleton-bar--title8" style="width: 7.6rem"></span>' +
                '<span class="game-detail-skeleton game-detail-skeleton-bar game-detail-skeleton-bar--btn2" style="width: 6.4rem"></span>' +
                '</div>' +
                '<ul class="game-detail-community-board"><li v-for="i in 4"><div class="game-detail-community-board__row">' +
                '<span class="game-detail-skeleton game-detail-skeleton-bar game-detail-skeleton-bar--text4" :style="rw(i + 40, 40, 95)"></span>' +
                '<span class="game-detail-skeleton game-detail-skeleton-bar game-detail-skeleton-bar--text4" :style="rw(i + 50, 25, 55)"></span>' +
                '</div></li></ul>' +
                '</section>' +
                // 8 시스템 요구사항
                '<section class="game-detail-board">' +
                '<div class="game-detail-board__title">' +
                '<span class="game-detail-skeleton game-detail-skeleton-bar game-detail-skeleton-bar--title8" style="width: 10.4rem"></span>' +
                '</div>' +
                '<div class="game-detail-system-requirements">' +
                // 섹션: [표 줄 수, 그래픽 줄 덧붙임, 글 줄 수, 등급 아이콘 수] — 최소 · 권장 · 지원 언어 · 이용 등급
                '<div v-for="(sec, si) in [[8, 0, 0, 0], [7, 2, 0, 0], [0, 0, 1, 0], [0, 0, 2, 8]]" class="game-detail-system-requirements__section">' +
                '<span class="game-detail-skeleton game-detail-skeleton-bar game-detail-skeleton-bar--title6" :style="rw(si + 130, 6.4, 11, \'rem\')"></span>' +
                // 항목 + 값을 줄마다 막대 하나로 (사용자 11-18). 그래픽처럼 여러 줄인 값은 줄 수만큼
                '<div v-if="sec[0]" class="game-detail-system-requirements__rows">' +
                '<template v-for="n in sec[0]">' +
                '<span class="game-detail-skeleton game-detail-skeleton-bar game-detail-skeleton-bar--text3" :style="rw(si * 10 + n + 80, 35, 85)"></span>' +
                '<template v-if="n === 4 && sec[1]"><span v-for="m in sec[1]" class="game-detail-skeleton game-detail-skeleton-bar game-detail-skeleton-bar--text3 is-continued" :style="rw(m + 120, 40, 90)"></span></template>' +
                '</template>' +
                '</div>' +
                '<div v-if="sec[2]" class="game-detail-rating">' +
                '<span v-for="m in sec[2]" class="game-detail-skeleton game-detail-skeleton-bar game-detail-skeleton-bar--text3" :style="{ width: m === 1 ? \'40%\' : \'70%\' }"></span>' +
                '<div v-if="sec[3]" class="game-detail-rating__icons"><span v-for="m in sec[3]" class="game-detail-skeleton game-detail-skeleton--rating"></span></div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</section>' +
              '</div>' +
            '</div>' +
            '<div class="game-detail__right">' +
              // 9 게임요약
                '<section class="game-detail-board game-detail-board--summary">' +
                '<div class="game-detail-board__head">' +
                '<span class="game-detail-skeleton game-detail-skeleton-bar game-detail-skeleton-bar--title8" style="width: 7.2rem"></span>' +
                '</div>' +
                '<div class="game-detail-summary">' +
                '<span class="game-detail-skeleton game-detail-skeleton-bar game-detail-skeleton-bar--text3" style="width: 50%"></span>' +
                '<dl class="game-detail-summary__rows"><div v-for="n in 5"><dt>' + // 11-25 실제 5줄과 같게(그 전 7)
                '<span class="game-detail-skeleton game-detail-skeleton-bar game-detail-skeleton-bar--text3" :style="rw(n + 100, 40, 90)"></span>' +
                '</dt><dd>' +
                '<span class="game-detail-skeleton game-detail-skeleton-bar game-detail-skeleton-bar--text3" :style="rw(n + 110, 30, 95)"></span>' +
                '</dd></div></dl>' +
                '</div>' +
                '</section>' +
              // 10 바로가기
                '<section class="game-detail-board">' +
                '<div class="game-detail-board__head">' +
                '<span class="game-detail-skeleton game-detail-skeleton-bar game-detail-skeleton-bar--title8" style="width: 6.8rem"></span>' +
                '</div>' +
                // 4줄 · 아이콘은 타이틀과 같은 왼쪽 선 · 이름 막대는 길게 (사용자 11-18)
                // 11-25 줄 상자 전체를 음영 블록 하나로 (마켓 다운로드와 같게, 사용자 "블록 하나로").
                // 그 전 = 줄 안에 아이콘(game-detail-skeleton--icon) + 이름 막대(skeleton-fill > bar--text3 rw(i + 140, 60, 95))
                '<ul class="game-detail-shortcut"><li v-for="i in 4"><div class="game-detail-skeleton game-detail-shortcut__row"></div></li></ul>' +
                '</section>' +
              '<span class="game-detail-skeleton game-detail-skeleton--sub-banner"></span>' + // 11 서브배너
              // 12 마켓다운로드링크 + QR
                '<section class="game-detail-board">' +
                '<div class="game-detail-board__head">' +
                '<span class="game-detail-skeleton game-detail-skeleton-bar game-detail-skeleton-bar--title8" style="width: 9.6rem"></span>' +
                '</div>' +
                // 줄 카드만 3개 — 아이콘 · 글자 · QR 없음 (사용자 11-18)
                '<ul class="game-detail-market-download"><li v-for="n in 3"><div class="game-detail-skeleton game-detail-market-download__row"></div></li></ul>' +
                '</section>' +
              '<span class="game-detail-skeleton game-detail-skeleton--pcbang-banner"></span>' + // 13 PC방 혜택 배너형
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div v-else-if="!d" class="game-detail-empty stds-title2">' +
        '<strong class="fw-bold">{{ name }}</strong>상세 페이지 준비 중입니다.' +
      '</div>' +
      '<div v-else class="game-detail" :style="d.backgroundGradient ? { \'--game-detail-bg-gradient\': d.backgroundGradient } : null">' + // 게임 색(backgroundGradient)은 최상위에 — 배경 그라데이션 · 카드 바탕이 같이 씀 (11-24)
        // 1 백그라운드 (bg 480) — 유틸리티 바 뒤까지 깔리고 아래로 페이지 색에 녹아든다
        '<div class="game-detail-background" :class="{ \'game-detail-background--fixed\': d.backgroundFixed }" aria-hidden="true"><img :src="img(d.background)" alt="" /></div>' + // 그림 = 게임 데이터 background (11-26 로드나인 추가하며 데이터로 — 그 전 로스트아크 파일명 고정). 그 전 v=4 = 벨가르딘 정복전 2560×1080 (git 이력)

        '<div class="game-detail__contents">' +
          // ---- 게임명 ----
          //   테스트 버전(사용자 11-23) --inline: 썸네일 ↔ 게임명 세로 가운데, 뱃지는 게임명 오른쪽 · 위 정렬, 뱃지 크기 = 사이드바 챌린지 뱃지.
          //   원복 = --inline 클래스만 빼면 원래(뱃지가 게임명 위 줄)로 돌아간다.
          '<div class="game-detail-title game-detail-title--inline">' +
            '<div class="game-detail-title__info">' +
              '<span class="game-detail-thumb"><img v-if="thumb" :src="thumb" alt="" /></span>' +
              '<div class="game-detail-title__text">' +
                '<div class="game-detail-title__badges">' +
                  '<span v-for="b in titleBadges" class="game-detail-badge stds-cap2 fw-bold" :class="\'game-detail-badge--\' + b.kind">' +
                    '<i v-if="b.icon" class="game-detail-badge__icon" :class="b.icon"></i>{{ b.label }}' +
                  '</span>' +
                '</div>' +
                '<h1 class="game-detail-title__name stds-title3 fw-bold">{{ name }}</h1>' +
              '</div>' +
            '</div>' +
            '<div class="game-detail-title__links">' +
              '<button v-for="l in linkBadges" class="game-detail-link-badge" :class="\'game-detail-link-badge--\' + l.kind" type="button">' +
                '<img class="game-detail-link-badge__icon" :src="l.src" alt="" />' +
                '<span class="game-detail-link-badge__label stds-cap2 fw-bold">{{ l.label }}<i class="ic-v2-control-arrow-right-line" aria-hidden="true"></i></span>' +
              '</button>' +
            '</div>' +
          '</div>' +

          // ---- 게임 공지 (component/banner/notice) — 가이드 번호와 별도. 점검중일 때만 ('점검' 뱃지와 한 묶음) ----
          //   띠형(사용자 11-20, Figma 68348:430890): 높이 28 · 글자 cap2 bold · 아이콘 · 배경 이미지 없음 — --strip.
          //   원래 모양으로 되돌리려면: --strip 클래스 빼고, 배경 :style="{ backgroundImage: 'url(' + img('notice-inspection.png') + ')' }" ·
          //   앞 아이콘 <i class="ic-v2-object-notice-fill" aria-hidden="true"></i> 다시 넣고, 글자 클래스를 stds-text2로.
          '<div v-if="inspection && d.noticeBanner" class="game-detail-notice-banner game-detail-notice-banner--strip">' +
            '<span class="stds-cap2 fw-bold">{{ d.noticeBanner }}</span>' +
          '</div>' +

          // ---- 2 1단 풀배너 (component/banner/full) ----
          '<div v-if="fullBannerOn" class="game-detail-full-banner">' + // 하단 설정 패널 '게임 상세 설정 · 1단 풀배너'로 켜고 끔 (11-24, proto-settings gameDetailFullBanner)
            '<div class="game-detail-full-banner__banner">' +
              '<div class="game-detail-full-banner__track" :class="{ \'is-moving\': fullBannerAnim }" :style="{ transform: \'translateX(\' + (-100 * fullBannerPos) + \'%)\' }" @transitionend="fullBannerEnd">' +
                '<img v-for="(src, i) in fullBannerTrack" :key="i" class="game-detail-full-banner__img" :src="img(src)" alt="" />' +
              '</div>' +
            '</div>' +
            // 화살표는 배너 양옆에 겹치지 않고 아래 컨트롤 줄로 — 4 배너형과 같은 모양 (사용자 11-18)
            '<div class="game-detail-full-banner__control">' +
              '<button class="game-detail-chevron" type="button" aria-label="이전" @click="fullBannerGo(fullBannerPos - 1)"><i class="ic-v2-control-arrow-left-line"></i></button>' +
              '<span class="game-detail-indicator"><span v-for="(b, i) in d.fullBanner" role="button" :aria-label="(i + 1) + \'번째 배너\'" :class="{ \'is-active\': i === fullBannerIndex }" @click="fullBannerGo(i + 1)"></span></span>' +
              '<button class="game-detail-chevron" type="button" aria-label="다음" @click="fullBannerGo(fullBannerPos + 1)"><i class="ic-v2-control-arrow-right-line"></i></button>' +
            '</div>' +
          '</div>' +

          '<div class="game-detail__columns">' +
            // ================= left =================
            '<div class="game-detail__left">' +
              // 3 1단배너-썸네일형 (pattern/banner/multi)
              '<div v-if="!d.thumbnailBannerHidden" class="game-detail-thumbnail-banner">' + // thumbnailBannerHidden = 데이터는 두고 화면에서만 숨김 (11-26 로드나인)
                '<div class="game-detail-thumbnail-banner__main">' +
                  // 큰 화면엔 재생 아이콘 없음 — 가이드 68345:428349 (사용자 11-20), 영상 표시는 썸네일에만
                  '<img :src="img(d.thumbnailBanner[thumbnailIndex].src)" alt="" />' +
                '</div>' +
                '<div class="game-detail-thumbnail-banner__list">' +
                  '<button class="game-detail-chevron" type="button" aria-label="이전" :disabled="thumbnailIndex === 0" @click="thumbnailIndex--"><i class="ic-v2-control-arrow-left-line"></i></button>' +
                  '<div ref="thumbs" class="game-detail-thumbnail-banner__thumbs">' + // 보이는 개수 = 줄 폭에 들어가는 만큼(4~6, 11-24), 한 쪽씩 통째로 넘김
                    '<button v-for="(m, i) in d.thumbnailBanner" class="game-detail-thumbnail-banner__thumb" :class="{ \'is-active\': i === thumbnailIndex }" type="button" @click="thumbnailIndex = i">' +
                      '<img :src="img(m.src)" alt="" />' +
                      '<span v-if="m.video" class="game-detail-thumbnail-banner__play"><img :src="ui(\'play-24.svg?v=2\')" alt="" /></span>' +
                    '</button>' +
                    '<span v-for="n in thumbFill" :key="\'fill\' + n" class="game-detail-thumbnail-banner__empty" aria-hidden="true"></span>' + // 마지막 쪽 빈칸 (11-24 "비워두지 말고 화이트 4로")
                  '</div>' +
                  '<button class="game-detail-chevron" type="button" aria-label="다음" :disabled="thumbnailIndex === d.thumbnailBanner.length - 1" @click="thumbnailIndex++"><i class="ic-v2-control-arrow-right-line"></i></button>' +
                '</div>' +
              '</div>' +

              '<div class="game-detail__components">' +
                // 4 1단배너-배너형 (component/banner/event)
                '<div class="game-detail-banner">' +
                  '<div class="game-detail-banner__img">' +
                    '<img :src="img(d.banner.src)" alt="" />' +
                    '<img v-if="d.banner.video" class="game-detail-play" :src="ui(\'play-56.svg\')" alt="재생" />' +
                  '</div>' +
                  '<div class="game-detail-banner__control">' +
                    '<button class="game-detail-chevron" type="button" aria-label="이전"><i class="ic-v2-control-arrow-left-line"></i></button>' +
                    '<span class="game-detail-indicator"><span v-for="n in d.banner.count" :class="{ \'is-active\': n === 1 }"></span></span>' +
                    '<button class="game-detail-chevron" type="button" aria-label="다음"><i class="ic-v2-control-arrow-right-line"></i></button>' +
                  '</div>' +
                '</div>' +

                // 15-1 로아상영관 추천 (포스터 5열) — 로스트아크 한정
                '<section v-if="d.loaTheaterRec" class="game-detail-board game-detail-board--rec">' +
                  '<div class="game-detail-board__title">' +
                    '<h2 class="stds-title8 fw-bold">로아 상영관</h2>' +
                    '<span class="game-detail-board-badge game-detail-board-badge--rec"><i class="ic-v2-community-thumbs-up-fill"></i>추천</span>' +
                    '<button class="game-detail-more stds-btn2 fw-regular" type="button">전체보기<i class="ic-v2-control-arrow-right-line"></i></button>' +
                  '</div>' +
                  '<div class="game-detail-loa-theater-rec">' +
                    '<a v-for="t in d.loaTheaterRec" class="game-detail-loa-theater-rec__item" href="#" @click.prevent>' +
                      '<span v-if="t.streamer" class="game-detail-loa-theater-rec__img game-detail-loa-theater-rec__img--streamer">' +
                        '<span class="game-detail-loa-theater-rec__streamer">' +
                          '<img class="game-detail-loa-theater-rec__avatar" :src="img(t.streamer.avatar)" alt="" />' +
                          '<span class="game-detail-loa-theater-rec__label">STREAMER</span>' +
                          '<span class="game-detail-loa-theater-rec__streamer-name">{{ t.streamer.name }}</span>' +
                        '</span>' +
                        '<img class="game-detail-loa-theater-rec__video" :src="img(t.streamer.thumb)" alt="" />' +
                      '</span>' +
                      '<span v-else class="game-detail-loa-theater-rec__img"><img :src="img(t.src)" alt="" /></span>' +
                      '<span class="game-detail-loa-theater-rec__name stds-text4 fw-medium">{{ t.title }}</span>' + // Figma Text4-M 13/22 (11-24, 전엔 title7 16)
                    '</a>' +
                  '</div>' +
                '</section>' +

                // 15-2 BEST · 15-3 NEW 로아상영관 (4열 2줄) — 로스트아크 한정
                '<template v-if="d.loaTheaterBest"><section v-for="kind in [\'best\', \'new\']" class="game-detail-board" :class="\'game-detail-board--\' + kind">' +
                  '<div class="game-detail-board__title">' +
                    '<h2 class="stds-title8 fw-bold">로아 상영관</h2>' +
                    '<span class="game-detail-board-badge" :class="\'game-detail-board-badge--\' + kind">' +
                      '<i :class="kind === \'best\' ? \'ic-v2-object-crown-fill\' : \'ic-v2-community-star-fill\'"></i>{{ kind === \'best\' ? \'BEST\' : \'NEW\' }}' +
                    '</span>' +
                    '<button class="game-detail-more stds-btn2 fw-regular" type="button">전체보기<i class="ic-v2-control-arrow-right-line"></i></button>' +
                  '</div>' +
                  '<div class="game-detail-loa-theater">' +
                    '<a v-for="t in (kind === \'best\' ? d.loaTheaterBest : d.loaTheaterNew)" class="game-detail-loa-theater__item" href="#" @click.prevent>' +
                      '<span class="game-detail-loa-theater__img"><img :src="img(t.src)" alt="" /></span>' +
                      '<span class="game-detail-loa-theater__name stds-text4 fw-medium">{{ t.title }}</span>' + // 추천과 같은 Text4-M 13/22 (11-25, 전엔 title7 16)
                      '<span class="game-detail-loa-theater__author stds-text4 fw-bold">{{ t.author }}</span>' +
                      '<span class="game-detail-loa-theater__date stds-cap1 fw-regular">{{ t.date }}</span>' +
                    '</a>' +
                  '</div>' +
                '</section></template>' +

                // 5 커뮤니티-api연동형 (component/board/notice) — 공지사항
                '<section class="game-detail-board">' +
                  '<div class="game-detail-board__title">' +
                    '<h2 class="stds-title8 fw-bold">공지사항</h2>' +
                    '<button class="game-detail-more stds-btn2 fw-regular" type="button">전체보기<i class="ic-v2-control-arrow-right-line"></i></button>' +
                  '</div>' +
                  '<ul class="game-detail-community-api">' +
                    '<li v-for="n in d.communityApi"><a class="game-detail-community-api__row" href="#" @click.prevent>' +
                      '<span class="game-detail-community-api__title stds-text4 fw-medium"><span class="game-detail-community-api__cat">{{ n.cat }}</span><span class="game-detail-community-api__text">{{ n.title }}</span></span>' +
                      '<span class="game-detail-community-api__date stds-cap1 fw-regular">{{ n.date }}</span>' + // 11-25 로아 상영관과 같게 — 제목 Text4-M 13/22 · 날짜 Cap1-R 12/18 (전엔 Title7 16/24 · Text4 13/22)
                    '</a></li>' +
                  '</ul>' +
                '</section>' +

                // 6 커뮤니티-앨범형 (component/board/album) — UCC 게시판
                '<section class="game-detail-board">' +
                  '<div class="game-detail-board__title">' +
                    '<h2 class="stds-title8 fw-bold">UCC 게시판</h2>' +
                    '<button class="game-detail-more stds-btn2 fw-regular" type="button">전체보기<i class="ic-v2-control-arrow-right-line"></i></button>' +
                  '</div>' +
                  '<div class="game-detail-community-album" :class="{ \'game-detail-community-album--wide\': d.communityAlbumWide }">' + // --wide = 썸네일 16:9 (로아 11-25)
                    '<a v-for="u in d.communityAlbum" class="game-detail-community-album__item" href="#" @click.prevent>' +
                      '<span class="game-detail-community-album__img"><img :src="img(u.src)" alt="" /><img v-if="u.video" class="game-detail-play" :src="ui(\'play-56.svg\')" alt="재생" /></span>' +
                      '<span class="game-detail-community-album__name stds-text4 fw-medium">{{ u.title }}</span>' + // 11-25 로아 상영관과 같게 Text4-M 13/22 (전엔 Title7 16/24)
                      '<span class="game-detail-community-album__user stds-text4 fw-regular">{{ u.user || \'%닉네임%\' }}</span>' +
                      '<span class="game-detail-community-album__meta stds-cap1 fw-medium">' +
                        '<span>{{ u.date || \'2023.07.19\' }}</span>' +
                        '<span v-if="u.play" class="game-detail-community-album__counts">' + // 로아: 재생수 · 좋아요수 (로아 상영관과 같은 숫자, 11-25)
                          '<span><i class="ic-v2-media-av-play-line"></i>{{ u.play }}</span>' +
                          '<span><i class="ic-v2-community-like-line"></i>{{ u.like }}</span>' +
                        '</span>' +
                        '<span v-else class="game-detail-community-album__counts">' + // 다른 게임: 댓글 · 조회수
                          '<span><i class="ic-v2-community-reply-line"></i>{{ u.reply || 999 }}</span>' +
                          '<span><i class="ic-v2-community-number-of-view-line"></i>{{ u.view || 999 }}</span>' +
                        '</span>' +
                      '</span>' +
                    '</a>' +
                  '</div>' +
                '</section>' +

                // 7 커뮤니티-게시판형 (component/board/list) — 자유 게시판
                '<section class="game-detail-board">' +
                  '<div class="game-detail-board__title">' +
                    '<h2 class="stds-title8 fw-bold">자유 게시판</h2>' +
                    '<button class="game-detail-more stds-btn2 fw-regular" type="button">전체보기<i class="ic-v2-control-arrow-right-line"></i></button>' +
                  '</div>' +
                  '<ul class="game-detail-community-board">' +
                    '<li v-for="p in d.communityBoard"><a class="game-detail-community-board__row" href="#" @click.prevent>' +
                      '<span class="game-detail-community-board__title stds-text4 fw-medium"><span class="game-detail-community-board__text">{{ p.title }}</span><span v-if="p.reply" class="game-detail-community-board__reply">[{{ p.reply }}]</span></span>' + // 11-25 로아 상영관과 같게 Text4-M 13/22 (전 Title7 16/24)
                      '<span class="game-detail-community-board__info">' +
                        '<span class="stds-text4"><template v-if="p.gm"><span class="game-detail-community-board__gm fw-medium">GM</span> </template><span class="fw-regular">{{ p.user }}</span></span>' +
                        '<span class="game-detail-community-board__date stds-cap1 fw-medium">{{ p.date }}</span>' +
                        '<span class="game-detail-community-board__date stds-cap1 fw-medium"><i class="ic-v2-community-number-of-view-line"></i>{{ p.view }}</span>' +
                      '</span>' +
                    '</a></li>' +
                  '</ul>' +
                '</section>' +

                // 8 시스템 요구사항 (component/additional info)
                '<section class="game-detail-board">' +
                  '<div class="game-detail-board__title"><h2 class="stds-title8 fw-bold">시스템 요구 사항</h2></div>' +
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
                          '<img v-for="r in d.rating.icons" :src="ui(\'sysreq-rating-\' + r + \'.svg\')" alt="" />' +
                          // 선정성 — Figma에서 레이어 6장으로만 나와 겹쳐 그린다
                          '<span class="game-detail-rating-sexual">' +
                            '<img v-for="l in [\'shape\', \'path\', \'shape-2\', \'clip-1\', \'clip-2\', \'clip-3\']" :class="\'is-\' + l" :src="ui(\'sysreq-rating-sexual-\' + l + \'.svg\')" alt="" />' +
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
                '<div class="game-detail-board__head"><h2 class="stds-title8 fw-bold">게임 정보</h2></div>' +
                '<div class="game-detail-summary stds-text3 fw-regular">' +
                  '<p class="game-detail-summary__tagline">{{ d.summary.tagline }}</p>' +
                  '<dl class="game-detail-summary__rows"><div v-for="r in d.summary.rows"><dt>{{ r[0] }}</dt><dd>{{ r[1] }}</dd></div></dl>' +
                '</div>' +
              '</section>' +

              // 16 쿠폰 (MD — 티켓 모양 + 로고 탭 + NEW 리본) — 로스트아크 한정
              '<a v-if="d.coupon" class="game-detail-coupon" href="#" @click.prevent>' +
                '<span class="game-detail-coupon__ticket" :style="couponMask"><img :src="img(\'right-md-img.png\')" alt="" /></span>' +
                '<span class="game-detail-coupon__border"><span class="game-detail-coupon__border-start" :style="{ backgroundImage: \'url(\' + img(\'right-md-border.svg\') + \')\' }"></span></span>' +
                '<span class="game-detail-coupon__title stds-title8 fw-bold">{{ d.coupon.title }}</span>' +
                '<span class="game-detail-coupon__desc stds-cap1 fw-medium">{{ d.coupon.desc }}</span>' +
                '<span class="game-detail-coupon__tab"><img :src="img(\'right-md-logo-bg.svg\')" alt="" /><img class="game-detail-coupon__logo" :src="img(\'right-md-logo.png\')" alt="" /></span>' +
                '<span class="game-detail-coupon__new"><img :src="img(\'right-md-badge-bg.svg\')" alt="" /><svg class="game-detail-coupon__shine" viewBox="0 0 44 30" aria-hidden="true"><defs><clipPath id="gd-coupon-new-clip"><path d="M0 1C0 0.447716 0.447715 0 1 0H43C43.5523 0 44 0.447715 44 1V19.6859C44 20.0827 43.7654 20.442 43.4021 20.6016L22.4021 29.8234C22.1458 29.936 21.8542 29.936 21.5979 29.8234L0.597924 20.6016C0.234612 20.442 0 20.0827 0 19.6859V1Z"/></clipPath><linearGradient id="gd-coupon-new-shine" x1="31.6722" y1="69.26" x2="0" y2="69.26" gradientUnits="userSpaceOnUse"><stop stop-color="#BB3580" stop-opacity="0"/><stop offset="0.5" stop-color="#EE92E3"/><stop offset="1" stop-color="#BB3580" stop-opacity="0"/></linearGradient></defs><g clip-path="url(#gd-coupon-new-clip)"><g class="game-detail-coupon__shine-move"><rect opacity="0.7" width="31.6722" height="69.26" transform="matrix(0.867359 0.497683 -0.50232 0.864682 -11.2539 -23.5885)" fill="url(#gd-coupon-new-shine)"/></g></g></svg><span>NEW</span></span>' +
              '</a>' +

              // 17 공지사항 축소형 — 로스트아크 한정
              '<section v-if="d.noticeCompact" class="game-detail-board">' +
                '<div class="game-detail-board__title">' +
                  '<h2 class="stds-title8 fw-bold">공지사항</h2>' +
                  '<button class="game-detail-more stds-btn2 fw-regular" type="button">전체보기<i class="ic-v2-control-arrow-right-line"></i></button>' +
                '</div>' +
                '<div class="game-detail-notice-compact stds-text3 fw-regular">' + // 11-25 Figma: 일반 줄 Text3-R 14/24, 강조 묶음 Text3-M (그 전 = 전부 stds-title7 fw-medium)
                  '<div class="game-detail-notice-compact__pinned fw-medium">' +
                    '<a v-for="t in d.noticeCompact.pinned" href="#" @click.prevent><i class="ic-v2-community-star-fill"></i><span>{{ t }}</span></a>' +
                  '</div>' +
                  '<a v-for="t in d.noticeCompact.rows" href="#" @click.prevent><span>{{ t }}</span></a>' +
                '</div>' +
              '</section>' +

              // 10 바로가기
              '<section class="game-detail-board">' +
                '<div class="game-detail-board__head"><h2 class="stds-title8 fw-bold">바로가기</h2></div>' +
                '<ul class="game-detail-shortcut">' +
                  '<li v-for="s in d.shortcuts.filter(x => !x.hidden)"><a href="#" @click.prevent>' +
                    // X 로고 SVG는 마스크로 — 아이콘 폰트처럼 글자색(currentColor = 흰 50)을 따라감 (11-25, 그 전 = <img> · SVG 안 #EBEBEB)
                    '<span v-if="s.svg" class="game-detail-shortcut__svg" :style="{ \'--icon-url\': \'url(\' + img(s.svg) + \')\' }" aria-hidden="true"></span><i v-else :class="s.icon"></i>' +
                    '<span class="game-detail-shortcut__label stds-text3 fw-regular">{{ s.label }}<img v-if="s.dot" class="game-detail-shortcut__dot" :src="ui(\'shortcut-badge-new.svg\')" alt="" /></span>' +
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
                '<div class="game-detail-board__head"><h2 class="stds-title8 fw-bold">마켓 다운로드</h2></div>' +
                '<ul class="game-detail-market-download">' +
                  '<li v-for="m in d.marketDownload"><a href="#" @click.prevent>' +
                    '<i :class="m.icon"></i><span class="stds-text3 fw-regular">{{ m.label }}</span>' +
                    '<button v-if="m.qr" class="game-detail-market-download__qr stds-btn3 fw-medium" type="button" @click.stop.prevent><i class="ic-v2-hardware-qr-code-fill"></i>QR</button>' +
                  '</a></li>' +
                '</ul>' +
              '</section>' +

              // 13 PC방 혜택 배너형 (component/banner/pcbang) — 아이콘형은 게임명 줄 link-badge--pcbang
              '<a v-if="d.pcbangBanner" class="game-detail-pcbang-banner" href="#" @click.prevent><img :src="img(d.pcbangBanner)" alt="" /></a>' + // 배너 그림이 있는 게임만 (11-26)
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>',
  });
  return app.mount(selector);
}
