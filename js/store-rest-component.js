/**
 * 스토어 메인 — 메인 배너 아래 콘텐츠 (Vue 3 CDN 컴포넌트)
 * -------------------------------------------------------------
 * 실제 store.onstove.com/ko 를 실측해서 옮긴 것(2026-10-20). 예전엔 배너 아래가
 * 통째로 웹 캡처 이미지(다크·라이트 한 쌍)였는데, 직접 그리면서 다크/라이트가
 * 토큰으로 바로 바뀐다. 이미지·게임 정보는 실제 웹에서 받아 온 고정 데이터
 * (assets/store-rest/). 범위는 예전 이미지와 같다 — 바로가기 아이콘부터
 * "스토브 대표 게임"까지. 웹 GNB·푸터는 뺐다. 스타일은 css/store-rest.css.
 */
var STORE_REST = {
  shortcuts: [
    { label: '이클립스 더 어웨이크닝', img: 'assets/store-rest/shortcut-00.png' },
    { label: 'LOST ARK', img: 'assets/store-rest/shortcut-01.png' },
    { label: '카오스 제로 나이트메어', img: 'assets/store-rest/shortcut-02.png' },
    { label: '에픽세븐', img: 'assets/store-rest/shortcut-03.png' },
    { label: '전체 게임', img: 'assets/store-rest/shortcut-04.png' },
    { label: '게임 리뷰', img: 'assets/store-rest/shortcut-05.png' },
    { label: '이달의 신작', img: 'assets/store-rest/shortcut-06.png' },
    { label: '오늘의 1등', img: 'assets/store-rest/shortcut-07.png' },
    { label: '플레이크 미션', img: 'assets/store-rest/shortcut-08.png' },
    { label: '캡슐 뽑기', img: 'assets/store-rest/shortcut-09.png' },
  ],
  banner: 'assets/store-rest/banner-wide.jpg',
  gifts: [
    { title: '플레이크를 만나는 즐거운 방법🥳', desc: '매일 미션 참여하고 플레이크 받아가세요!', img: 'assets/store-rest/gift-00.jpg', icon: 'assets/store-rest/gift-icon-00.png' },
    { title: '럽플레이스 10월 출석 교환 상점', desc: '럽플레이스 스토브 데뷔! 쏟아지는 선물 🎁', img: 'assets/store-rest/gift-01.jpg', icon: 'assets/store-rest/gift-icon-01.png' },
    { title: '마작일번가 10월 출석 상점', desc: '출석만 해도 플레이크와 게임 아이템이 우르르!', img: 'assets/store-rest/gift-02.jpg', icon: 'assets/store-rest/gift-icon-02.png' },
    { title: '스토어 10월 출석 교환 상점', desc: '매일매일 다양한 혜택이 팡팡!', img: 'assets/store-rest/gift-03.jpg', icon: 'assets/store-rest/gift-icon-03.png' },
  ],
  today1: ['assets/store-rest/today1-0.jpg', 'assets/store-rest/today1-1.jpg'],
  newReleases: [
    { title: '비욘드 디스 스타즈 (Beyond These Stars)', genre: '시뮬레이션, 전략', strike: '₩29,900', discount: '-20%', price: '₩23,920', rating: '100% 추천해요', tone: 'blue', buttons: ['navigation-cart-fill', 'community-like-line', 'navigation-community-line'], img: 'assets/store-rest/new-00.jpg' },
    { title: 'Dynamite Blue', genre: 'RPG, 액션', rating: '92.3% 추천해요', plain: '무료', tone: 'blue', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/new-01.jpg' },
    { title: '미귀환 기록실', genre: '비주얼 노벨', price: '₩3,400', rating: '0 평가 없음', tone: 'gray', buttons: ['navigation-cart-fill', 'community-like-line', 'navigation-community-line'], img: 'assets/store-rest/new-02.jpg' },
    { title: '럽플레이스', genre: '리듬, 캐주얼', rating: '69.2% 추천해요', plain: '무료', tone: 'blue', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/new-03.jpg' },
    { title: '파멸의 오타쿠', genre: '어드벤처, 공포, 비주얼 노벨', strike: '₩18,000', discount: '-10%', price: '₩16,200', rating: '0 평가 없음', tone: 'gray', buttons: ['navigation-cart-fill', 'community-like-line', 'navigation-community-line'], img: 'assets/store-rest/new-04.jpg' },
    { title: '블로샤퍼: 꽃들의 전쟁', genre: '전략, RPG, 캐주얼', price: '₩8,900', rating: '0 평가 없음', tone: 'gray', buttons: ['navigation-cart-fill', 'community-like-line', 'navigation-community-line'], img: 'assets/store-rest/new-05.jpg' },
    { title: '안락온실 VR', genre: '시뮬레이션, 어드벤처, 공포', rating: '0 평가 없음', plain: '무료', tone: 'gray', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/new-06.jpg' },
    { title: '메테오는 예술이다', genre: '캐주얼, 슈팅, 전략', price: '₩10,500', rating: '100% 추천해요', tone: 'blue', buttons: ['navigation-cart-fill', 'community-like-line', 'navigation-community-line'], img: 'assets/store-rest/new-07.jpg' },
    { title: '용사단 키우기', genre: 'RPG, 전략', rating: '100% 추천해요', plain: '무료', tone: 'blue', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/new-08.jpg' },
    { title: '봇틀링 (Botlings) - 꼬마 로봇: 자동화 대작전', genre: '전략, 시뮬레이션', price: '₩16,500', rating: '0 평가 없음', tone: 'gray', buttons: ['navigation-cart-fill', 'community-like-line', 'navigation-community-line'], img: 'assets/store-rest/new-09.jpg' },
    { title: '네온 어비스 2 (Neon Abyss 2)', genre: '액션, RPG, 슈팅', strike: '₩21,500', discount: '-20%', price: '₩17,200', rating: '100% 추천해요', tone: 'blue', buttons: ['navigation-cart-fill', 'community-like-line', 'navigation-community-line'], img: 'assets/store-rest/new-10.jpg' },
    { title: '안락온실', genre: '시뮬레이션, 어드벤처, 공포', rating: '100% 추천해요', plain: '무료', tone: 'blue', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/new-11.jpg' },
    { title: 'That Which Comes', genre: '기타, 액션, 슈팅', strike: '₩4,500', discount: '-20%', price: '₩3,600', rating: '0 평가 없음', tone: 'gray', buttons: ['navigation-cart-fill', 'community-like-line', 'navigation-community-line'], img: 'assets/store-rest/new-12.jpg' },
    { title: '라스트 소녀 전사', genre: '전략, RPG, 시뮬레이션', rating: '75% 추천해요', plain: '무료', tone: 'blue', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/new-13.jpg' },
    { title: '어센딩 인페르노 (Ascending Inferno)', genre: '플랫포머', strike: '₩8,000', discount: '-20%', price: '₩6,400', rating: '0 평가 없음', tone: 'gray', buttons: ['navigation-cart-fill', 'community-like-line', 'navigation-community-line'], img: 'assets/store-rest/new-14.jpg' },
    { title: 'Yellow Terminal', genre: '캐주얼, 시뮬레이션', price: '₩2,300', rating: '0 평가 없음', tone: 'gray', buttons: ['navigation-cart-fill', 'community-like-line', 'navigation-community-line'], img: 'assets/store-rest/new-15.jpg' },
    { title: '777용사 ~시간을 거스르는 자~', genre: 'RPG, 시뮬레이션, 캐주얼', strike: '₩9,900', discount: '-22%', price: '₩7,720', rating: '0 평가 없음', tone: 'gray', buttons: ['navigation-cart-fill', 'community-like-line', 'navigation-community-line'], img: 'assets/store-rest/new-16.jpg' },
    { title: 'MO or DO', genre: '캐주얼, 액션, 전략', rating: '0 평가 없음', plain: '무료', tone: 'gray', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/new-17.jpg' },
    { title: '좀비 버스터즈 (ZombieBusters: Reborn)', genre: '액션, 전략', price: '₩12,900', rating: '0 평가 없음', tone: 'gray', buttons: ['navigation-cart-fill', 'community-like-line', 'navigation-community-line'], img: 'assets/store-rest/new-18.jpg' },
    { title: '참지말고 뽑자!', genre: '시뮬레이션, 캐주얼', price: '₩11,000', rating: '0 평가 없음', tone: 'gray', buttons: ['navigation-cart-fill', 'community-like-line', 'navigation-community-line'], img: 'assets/store-rest/new-19.jpg' },
    { title: '조선퇴마전', genre: '액션, RPG, 캐주얼', strike: '₩8,130', discount: '-20%', price: '₩6,500', rating: '0 평가 없음', tone: 'gray', buttons: ['navigation-cart-fill', 'community-like-line', 'navigation-community-line'], img: 'assets/store-rest/new-20.jpg' },
    { title: '바벨의 영주', genre: '시뮬레이션, 전략', strike: '₩5,000', discount: '-50%', price: '₩2,500', rating: '0 평가 없음', tone: 'gray', buttons: ['navigation-cart-fill', 'community-like-line', 'navigation-community-line'], img: 'assets/store-rest/new-21.jpg' },
    { title: '시큐리티 51', genre: '시뮬레이션, 공포, 캐주얼', price: '₩11,000', rating: '100% 추천해요', tone: 'blue', buttons: ['navigation-cart-fill', 'community-like-line', 'navigation-community-line'], img: 'assets/store-rest/new-22.jpg' },
    { title: '삼한쟁패', genre: '시뮬레이션, 전략', price: '₩14,000', rating: '0 평가 없음', tone: 'gray', buttons: ['navigation-cart-fill', 'community-like-line', 'navigation-community-line'], img: 'assets/store-rest/new-23.jpg' },
    { title: '전설의 술안주', genre: '액션', price: '₩11,000', rating: '0 평가 없음', tone: 'gray', buttons: ['navigation-cart-fill', 'community-like-line', 'navigation-community-line'], img: 'assets/store-rest/new-24.jpg' },
    { title: '귀신은 그림자가 없다', genre: '캐주얼', strike: '₩8,130', discount: '-20%', price: '₩6,500', rating: '0 평가 없음', tone: 'gray', buttons: ['navigation-cart-fill', 'community-like-line', 'navigation-community-line'], img: 'assets/store-rest/new-25.jpg' },
    { title: 'Wielder', genre: 'RPG, 액션', rating: '100% 추천해요', plain: '무료', tone: 'blue', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/new-26.jpg' },
    { title: 'Island For Sale', genre: '어드벤처, 캐주얼, 기타', strike: '₩6,550', discount: '-20%', price: '₩5,240', rating: '100% 추천해요', tone: 'blue', buttons: ['navigation-cart-fill', 'community-like-line', 'navigation-community-line'], img: 'assets/store-rest/new-27.jpg' },
    { title: 'Upload Aliens', genre: '액션', price: '₩11,000', rating: '0 평가 없음', tone: 'gray', buttons: ['navigation-cart-fill', 'community-like-line', 'navigation-community-line'], img: 'assets/store-rest/new-28.jpg' },
    { title: '수박 만들기 2048', genre: '퍼즐, 캐주얼', rating: '100% 추천해요', plain: '무료', tone: 'blue', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/new-29.jpg' },
    { title: '프로젝트 폴라리스', genre: '액션, RPG', strike: '₩5,600', discount: '-20%', price: '₩4,480', rating: '100% 추천해요', tone: 'blue', buttons: ['navigation-cart-fill', 'community-like-line', 'navigation-community-line'], img: 'assets/store-rest/new-30.jpg' },
    { title: '악귀를 베라!', genre: '액션, 공포, 캐주얼', strike: '₩8,500', discount: '-25%', price: '₩6,370', rating: '100% 추천해요', tone: 'blue', buttons: ['navigation-cart-fill', 'community-like-line', 'navigation-community-line'], img: 'assets/store-rest/new-31.jpg' },
    { title: '귀척사', genre: '전략, 캐주얼', rating: '0 평가 없음', plain: '무료', tone: 'gray', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/new-32.jpg' },
    { title: '비트디펜스', genre: '리듬, 디펜스, 캐주얼', strike: '₩11,000', discount: '-90%', price: '₩1,100', rating: '100% 추천해요', tone: 'blue', buttons: ['navigation-cart-fill', 'community-like-line', 'navigation-community-line'], img: 'assets/store-rest/new-33.jpg' },
    { title: '타이거스톤', genre: '시뮬레이션, 어드벤처', price: '₩4,500', rating: '0 평가 없음', tone: 'gray', buttons: ['navigation-cart-fill', 'community-like-line', 'navigation-community-line'], img: 'assets/store-rest/new-34.jpg' },
    { title: '등불 골짜기', genre: '캐주얼, 전략', strike: '₩5,000', discount: '-50%', price: '₩2,500', rating: '0 평가 없음', tone: 'gray', buttons: ['navigation-cart-fill', 'community-like-line', 'navigation-community-line'], img: 'assets/store-rest/new-35.jpg' },
    { title: '대국삼국지', genre: '전략, 시뮬레이션', price: '₩9,900', rating: '0 평가 없음', tone: 'gray', buttons: ['navigation-cart-fill', 'community-like-line', 'navigation-community-line'], img: 'assets/store-rest/new-36.jpg' },
    { title: '인형 공방: 기워진 기억', genre: '공포, 어드벤처', price: '₩3,400', rating: '0 평가 없음', tone: 'gray', buttons: ['navigation-cart-fill', 'community-like-line', 'navigation-community-line'], img: 'assets/store-rest/new-37.jpg' },
    { title: '어깨 너머', genre: '어드벤처, 퍼즐', price: '₩1,000', rating: '100% 추천해요', tone: 'blue', buttons: ['navigation-cart-fill', 'community-like-line', 'navigation-community-line'], img: 'assets/store-rest/new-38.jpg' },
    { title: 'Creator Chronicles', genre: '시뮬레이션, RPG, 전략', price: '₩12,900', rating: '100% 추천해요', tone: 'blue', buttons: ['navigation-cart-fill', 'community-like-line', 'navigation-community-line'], img: 'assets/store-rest/new-39.jpg' },
  ],
  upcoming: [
    { title: 'Mouthwashing', genre: '공포', rating: '0 평가 없음', plain: '출시예정', tone: 'gray', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/soon-00.jpg' },
    { title: '심해성찬 - Abyssal Starfeast', genre: '공포, 시뮬레이션, 기타', rating: '0 평가 없음', plain: '출시예정', tone: 'gray', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/soon-01.jpg' },
    { title: '왕관과 박수갈채', genre: '리듬, 어드벤처', rating: '0 평가 없음', plain: '출시예정', tone: 'gray', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/soon-02.jpg' },
    { title: 'GG Management', genre: '시뮬레이션, 스포츠, 전략', rating: '0 평가 없음', plain: '출시예정', tone: 'gray', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/soon-03.jpg' },
    { title: '심해월광 챕터1', genre: '비주얼 노벨', rating: '0 평가 없음', plain: '출시예정', tone: 'gray', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/soon-04.jpg' },
    { title: 'FLEET OPS', genre: '시뮬레이션, RPG, 전략', rating: '0 평가 없음', plain: '출시예정', tone: 'gray', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/soon-05.jpg' },
    { title: '라이브 어펙션', genre: '비주얼 노벨', strike: '₩5,600', discount: '-10%', price: '₩5,040', rating: '0 평가 없음', tone: 'gray', buttons: ['navigation-cart-fill', 'community-like-line', 'navigation-community-line'], img: 'assets/store-rest/soon-06.jpg' },
    { title: '새벽의 신부', genre: '비주얼 노벨, 시뮬레이션, 공포', rating: '0 평가 없음', plain: '2026.10.26 출시예정', tone: 'gray', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/soon-07.jpg' },
    { title: 'Iron & Asphalt', genre: '시뮬레이션, 전략, 기능성 게임', rating: '0 평가 없음', plain: '출시예정', tone: 'gray', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/soon-08.jpg' },
    { title: '헥스 파티', genre: '시뮬레이션, 비주얼 노벨', rating: '0 평가 없음', plain: '출시예정', tone: 'gray', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/soon-09.jpg' },
    { title: '미등록 환자 (Unlisted Patient)', genre: '어드벤처, 퍼즐, 공포', rating: '0 평가 없음', plain: '출시예정', tone: 'gray', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/soon-10.jpg' },
    { title: '샤르카라마', genre: '시뮬레이션, 캐주얼', rating: '0 평가 없음', plain: '출시예정', tone: 'gray', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/soon-11.jpg' },
    { title: 'Little Cast', genre: '캐주얼, 시뮬레이션', rating: '0 평가 없음', plain: '출시예정', tone: 'gray', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/soon-12.jpg' },
    { title: 'KAYFABE', genre: '시뮬레이션, 스포츠, 전략', rating: '0 평가 없음', plain: '출시예정', tone: 'gray', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/soon-13.jpg' },
    { title: '살구와 도토리 (Apricot And Acorn)', genre: 'RPG, 어드벤처, 시뮬레이션', rating: '0 평가 없음', plain: '출시예정', tone: 'gray', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/soon-14.jpg' },
    { title: '정치인생', genre: '전략, 시뮬레이션', rating: '0 평가 없음', plain: '출시예정', tone: 'gray', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/soon-15.jpg' },
    { title: '소드 앤 백팩 (Sword & Backpack)', genre: 'RPG, 액션, 어드벤처', rating: '0 평가 없음', plain: '출시예정', tone: 'gray', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/soon-16.jpg' },
    { title: 'SurvivalOfRunt', genre: '슈팅', rating: '0 평가 없음', plain: '2026.11.17 출시예정', tone: 'gray', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/soon-17.jpg' },
    { title: '나의 AI 제국 (My AI Empire)', genre: '시뮬레이션, RPG, 전략', rating: '0 평가 없음', plain: '출시예정', tone: 'gray', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/soon-18.jpg' },
    { title: '탈옥 프로토콜 (Breakout Protocol)', genre: '어드벤처, 퍼즐, 시뮬레이션', rating: '0 평가 없음', plain: '출시예정', tone: 'gray', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/soon-19.jpg' },
    { title: '무법자들의 섬 (Outlaw Isles: Rogue Tides)', genre: 'RPG, 액션, 어드벤처', rating: '0 평가 없음', plain: '출시예정', tone: 'gray', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/soon-20.jpg' },
    { title: '닭 키워서 인생역전', genre: '시뮬레이션, 캐주얼', rating: '0 평가 없음', plain: '출시예정', tone: 'gray', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/soon-21.jpg' },
    { title: '샵 크러쉬', genre: '비주얼 노벨, 시뮬레이션, 공포', rating: '0 평가 없음', plain: '출시예정', tone: 'gray', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/soon-22.jpg' },
    { title: 'Blind Katana: 세상을 밝히는 자', genre: '액션, RPG', rating: '0 평가 없음', plain: '출시예정', tone: 'gray', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/soon-23.jpg' },
    { title: 'Moon-Oriented Autonomous Biological Model', genre: '어드벤처, RPG, 비주얼 노벨', rating: '0 평가 없음', plain: '출시예정', tone: 'gray', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/soon-24.jpg' },
    { title: '히루가오', genre: '비주얼 노벨', rating: '0 평가 없음', plain: '출시예정', tone: 'gray', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/soon-25.jpg' },
    { title: '사이드워크 몬스터즈', genre: 'RPG, 캐주얼', rating: '0 평가 없음', plain: '출시예정', tone: 'gray', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/soon-26.jpg' },
    { title: 'CopsCatch', genre: '캐주얼', rating: '0 평가 없음', plain: '출시예정', tone: 'gray', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/soon-27.jpg' },
    { title: '나혼자 학교에 잠들었다', genre: '공포', rating: '0 평가 없음', plain: '출시예정', tone: 'gray', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/soon-28.jpg' },
    { title: '뱀파이어 업어치기', genre: '액션, 캐주얼', rating: '0 평가 없음', plain: '출시예정', tone: 'gray', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/soon-29.jpg' },
    { title: '모두의 딜레마', genre: '캐주얼, 전략', rating: '0 평가 없음', plain: '출시예정', tone: 'gray', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/soon-30.jpg' },
    { title: 'Want a Bomb?', genre: '어드벤처', rating: '0 평가 없음', plain: '출시예정', tone: 'gray', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/soon-31.jpg' },
    { title: 'ApocalypseHQ', genre: '전략, 시뮬레이션', rating: '0 평가 없음', plain: '출시예정', tone: 'gray', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/soon-32.jpg' },
    { title: '49DAYS', genre: '시뮬레이션, 어드벤처, 비주얼 노벨', rating: '0 평가 없음', plain: '출시예정', tone: 'gray', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/soon-33.jpg' },
    { title: '어이쿠! 왕자님', genre: '시뮬레이션', rating: '0 평가 없음', plain: '2026년 출시예정', tone: 'gray', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/soon-34.jpg' },
    { title: '디테인드 (Detained: Too Good for School)', genre: '액션, RPG, 어드벤처', rating: '0 평가 없음', plain: '출시예정', tone: 'gray', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/soon-35.jpg' },
    { title: '러브 딜리버리 주희 애프터 스토리', genre: '비주얼 노벨', rating: '0 평가 없음', plain: '출시예정', tone: 'gray', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/soon-36.jpg' },
    { title: 'Nowhere Dawn', genre: '액션, 어드벤처, 공포', rating: '0 평가 없음', plain: '출시예정', tone: 'gray', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/soon-37.jpg' },
    { title: '해체_주의', genre: '전략', rating: '0 평가 없음', plain: '출시예정', tone: 'gray', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/soon-38.jpg' },
    { title: '마지막 식사를 부탁한다', genre: '비주얼 노벨, 시뮬레이션', rating: '0 평가 없음', plain: '출시예정', tone: 'gray', buttons: ['community-like-line', 'navigation-community-line'], img: 'assets/store-rest/soon-39.jpg' },
  ],
  featured: [
    { title: '로드나인', genre: 'PC, MOBILE, MMORPG', tone: 'gray', buttons: ['navigation-home-fill', 'navigation-community-line', 'navigation-shop-line'], img: 'assets/store-rest/rep-00.jpg' },
    { title: 'LOST ARK', genre: 'PC, MMORPG', tone: 'gray', buttons: ['navigation-home-fill', 'navigation-community-line'], img: 'assets/store-rest/rep-01.jpg' },
    { title: '에픽세븐', genre: 'PC, MOBILE, 턴제RPG', tone: 'gray', buttons: ['navigation-home-fill', 'navigation-community-line'], img: 'assets/store-rest/rep-02.jpg' },
    { title: '카오스 제로 나이트메어', genre: 'PC, MOBILE, 로그라이트 RPG', badge: 'UP', tone: 'gray', buttons: ['navigation-home-fill', 'navigation-community-line'], img: 'assets/store-rest/rep-03.jpg' },
    { title: '이클립스: 더 어웨이크닝', genre: 'PC, MOBILE, MMORPG', tone: 'gray', buttons: ['navigation-home-fill', 'navigation-community-line'], img: 'assets/store-rest/rep-04.jpg' },
    { title: '데드 어카운트 : 두 개의 푸른 불꽃', genre: 'PC, MOBILE, 로그라이트 RPG', tone: 'gray', buttons: ['navigation-home-fill'], img: 'assets/store-rest/rep-05.jpg' },
    { title: '로스트아크 모바일', genre: 'PC, MOBILE, MMORPG', tone: 'gray', buttons: ['navigation-home-fill', 'navigation-community-line'], img: 'assets/store-rest/rep-06.jpg' },
    { title: '미래시: 보이지 않는 미래', genre: 'PC, MOBILE, RPG', tone: 'gray', buttons: ['navigation-home-fill'], img: 'assets/store-rest/rep-07.jpg' },
    { title: 'BTS 쿠킹온 STOVE : 타이니탄 레스토랑 요리게임', genre: 'PC, MOBILE, 캐주얼', tone: 'gray', buttons: ['navigation-community-fill'], img: 'assets/store-rest/rep-08.jpg' },
    { title: '테일즈런너', genre: 'PC, 레이싱', tone: 'gray', buttons: ['navigation-home-fill'], img: 'assets/store-rest/rep-09.jpg' },
  ],
};

// 로그인 후 개인화 영역 — 실제 로그인 화면에서 받아 온 값(2026-10-20)
var STORE_REST_ME = {
  nickname: '휴먼메이드',
  profile: 'assets/store-rest/profile.png',
  recent: [
    { name: '이클립스: 더 어웨이크닝', played: '2026-10-14', img: 'assets/store-rest/recent-0.jpg' },
    { name: 'Don’t Pop!: Splash Race', played: '2026-09-22', img: 'assets/store-rest/recent-1.jpg' },
    { name: 'Teleport Master', played: '2026-09-17', img: 'assets/store-rest/recent-2.jpg' },
    { name: '러블롯 경 (Sir Lovelot)', played: '2026-08-26', img: 'assets/store-rest/recent-3.jpg' },
    { name: '닌자 캐슬 이스케이프 (Ninja Castle Escape)', played: '2026-08-26', img: 'assets/store-rest/recent-4.jpg' },
  ],
  picks: [
    { title: '마이썸머 베케이션', price: '₩7,800' },
    { title: '더 시그널 스테이트 (The Signal State)', price: '₩20,500' },
    { title: '진스 비치 레스토랑', price: '₩11,000' },
    { title: '패링맨 - PARRYMAN', price: '₩10,010' },
    { title: "브레이브 레이지 (Brave's Rage)", price: '₩10,500' },
    { title: '레트로 어비스 : 게임의 마지막 소원', price: '₩5,000' },
    { title: 'Town of illustive', price: '₩11,000' },
    { title: '비가 오기 시작했지만, 낙엽은 이미 젖어있었다.', price: '₩2,750' },
  ].map(function (g, i) {
    g.img = 'assets/store-rest/mypick-' + i + '.jpg';
    g.badge = 'In Library';
    g.buttons = ['control-check-circle-fill', 'navigation-community-line'];
    return g;
  }),
};

// ---- 캐러셀 하나의 상태 — 페이지 단위로 넘기고, 끝에서는 마지막 카드가 오른쪽에 붙게 멈춘다
//      (웹 swiper loop:false · speed 300 그대로)
function storeRestPager(count, perView, perGroup, slideW, gap, viewW) {
  var maxShift = Math.max(0, count * slideW + (count - 1) * gap - viewW);
  var pages = Math.max(1, Math.ceil((count - perView) / perGroup) + 1);
  return {
    count: count, perGroup: perGroup, slideW: slideW, gap: gap, maxShift: maxShift, pages: pages, page: 0,
  };
}
function storeRestShift(p) {
  return Math.min(p.page * p.perGroup * (p.slideW + p.gap), p.maxShift);
}

// ---- 점 인디케이터 — 50 폭 창에 5개까지 보이고, 창 밖에 점이 더 있으면
//      그쪽 끝 두 칸이 0.84 · 0.67로 작아진다 (웹 그대로)
var StoreRestDots = {
  props: { pages: Number, page: Number },
  emits: ['go'],
  computed: {
    shift: function () { return Math.min(Math.max(this.page - 2, 0), Math.max(this.pages - 5, 0)); },
    windowStyle: function () {
      return this.pages > 5 ? { width: '5rem', justifyContent: 'flex-start' } : {};
    },
  },
  methods: {
    scale: function (i) {
      if (this.pages <= 5) return 1;
      var slot = i - this.shift;
      var before = this.shift > 0, after = this.shift + 5 < this.pages;
      if (after && slot === 4) return 0.67;
      if (after && slot === 3) return 0.84;
      if (before && slot === 0) return 0.67;
      if (before && slot === 1) return 0.84;
      return 1;
    },
  },
  template:
    '<div class="store-rest-indicator">' +
      '<button class="store-rest-indicator__arrow" type="button" aria-label="이전" @click="$emit(\'go\', page - 1)"><i class="ic-v2-control-arrow-left-line"></i></button>' +
      '<div class="store-rest-indicator__window" :style="windowStyle">' +
        '<div class="store-rest-indicator__dots" :style="{ transform: \'translateX(\' + (-shift * 1.1) + \'rem)\' }">' +
          '<button v-for="i in pages" :key="i" type="button" class="store-rest-indicator__dot"' +
            ' :class="{ \'is-active\': i - 1 === page }" :style="{ transform: \'scale(\' + scale(i - 1) + \')\' }"' +
            ' :aria-label="i + \'페이지\'" @click="$emit(\'go\', i - 1)"></button>' +
        '</div>' +
      '</div>' +
      '<button class="store-rest-indicator__arrow" type="button" aria-label="다음" @click="$emit(\'go\', page + 1)"><i class="ic-v2-control-arrow-right-line"></i></button>' +
    '</div>',
};

// ---- 게임 카드 — 호버하면 제목이 한 줄로 줄고, 정보가 위로 밀리며 평가·버튼이 올라온다
//      variant: mypick(로그인 후 추천 패널) · product(신작·출시 예정) · featured(대표 게임)
var StoreRestGameCard = {
  props: { game: Object, variant: String },
  computed: {
    // 웹 --transform-value: 정가 줄이 있으면 장르+정가(44), 아니면 장르(22)만큼 밀어 올린다
    lift: function () {
      if (this.variant === 'mypick') return '0rem'; // 로그인 후 추천 카드는 정보 줄을 밀지 않고 버튼 줄만 올라온다
      return this.game.strike ? '4.4rem' : '2.2rem';
    },
    primary: function () {
      var b = this.game.buttons[0] || '';
      return /home|cart/.test(b) || (this.variant === 'featured' && /community-fill/.test(b)) ? b : null;
    },
    secondary: function () {
      var self = this;
      return this.game.buttons.filter(function (b) { return b !== self.primary; });
    },
  },
  methods: {
    label: function (b) { return /home/.test(b) ? '공식홈' : /cart/.test(b) ? '장바구니' : '커뮤니티'; },
  },
  template:
    '<div class="store-game" :class="\'store-game--\' + variant">' +
      '<div class="store-game__thumb">' +
        '<img :src="game.img" alt="" loading="lazy" draggable="false" />' +
        '<span v-if="game.badge" class="store-game__badge">{{ game.badge }}</span>' +
      '</div>' +
      '<div class="store-game__info">' +
        '<h3 class="store-game__title">{{ game.title }}</h3>' +
        '<div class="store-game__clip">' +
          '<div class="store-game__slide" :style="{ \'--lift\': lift }">' +
            '<p v-if="game.genre" class="store-game__genre">{{ game.genre }}</p>' +
            '<p v-if="variant === \'mypick\'" class="store-game__price store-game__price--small">{{ game.price }}</p>' +
            '<template v-if="variant === \'product\'">' +
              '<div v-if="game.strike" class="store-game__price store-game__price--sale">' +
                '<span class="store-game__strike">{{ game.strike }}</span>' +
                '<span class="store-game__final"><b>{{ game.discount }}</b><span>{{ game.price }}</span></span>' +
              '</div>' +
              '<p v-else-if="game.price" class="store-game__price">{{ game.price }}</p>' +
              '<p v-else-if="game.plain === \'무료\'" class="store-game__price store-game__price--free">무료</p>' +
              '<p v-else-if="game.plain" class="store-game__price store-game__price--soon">{{ game.plain }}</p>' +
            '</template>' +
            '<div class="store-game__hover">' +
              '<div v-if="game.rating" class="store-game__rating" :class="\'is-\' + game.tone">' +
                '<i class="ic-v2-community-thumbs-up-fill"></i><span>{{ game.rating }}</span>' +
              '</div>' +
              '<div class="store-game__actions">' +
                '<button v-if="primary" type="button" class="store-game__btn store-game__btn--primary">' +
                  '<i v-if="variant !== \'featured\'" :class="\'ic-v2-\' + primary"></i>' +
                  '<span>{{ label(primary) }}</span>' +
                '</button>' +
                '<button v-for="b in secondary" :key="b" type="button" class="store-game__btn"' +
                  ' :class="{ \'store-game__btn--wide\': variant === \'featured\' && /community/.test(b) }">' +
                  '<span v-if="variant === \'featured\' && /community/.test(b)">커뮤니티</span>' +
                  '<i v-else :class="\'ic-v2-\' + b"></i>' +
                '</button>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>',
};

var StoreRest = {
  components: { 'store-rest-dots': StoreRestDots, 'store-game-card': StoreRestGameCard },
  data: function () {
    return {
      shortcuts: STORE_REST.shortcuts,
      me: STORE_REST_ME,
      recentPage: 0,
      banner: STORE_REST.banner,
      gifts: STORE_REST.gifts,
      today1: STORE_REST.today1,
      newReleases: STORE_REST.newReleases,
      upcoming: STORE_REST.upcoming,
      featured: STORE_REST.featured,
      // 슬라이드 폭은 콘텐츠 960 기준 실측값
      pickPager: storeRestPager(STORE_REST_ME.picks.length, 4, 4, 131.7, 12, 562.7),
      giftPager: storeRestPager(STORE_REST.gifts.length, 3, 3, 306.7, 20, 960),
      newPager: storeRestPager(STORE_REST.newReleases.length, 5, 5, 176, 20, 960),
      soonPager: storeRestPager(STORE_REST.upcoming.length, 5, 5, 176, 20, 960),
      repPager: storeRestPager(STORE_REST.featured.length, 4, 4, 225, 20, 960),
    };
  },
  methods: {
    trackStyle: function (p) { return { transform: 'translateX(' + (-storeRestShift(p)) + 'px)' }; },
    go: function (p, page) { p.page = Math.min(Math.max(page, 0), p.pages - 1); },
    rewind: function (p, delta) { p.page = (p.page + delta + p.pages) % p.pages; },
    goRecent: function (delta) {
      var n = this.me.recent.length;
      this.recentPage = (this.recentPage + delta + n) % n;
    },
  },
  template:
    '<div class="store-rest">' +

      // ---- 바로가기 아이콘 ----
      '<ul class="store-shortcuts">' +
        '<li v-for="s in shortcuts" :key="s.label" class="store-shortcuts__item">' +
          '<span class="store-shortcuts__icon"><img :src="s.img" alt="" /></span>' +
          '<p class="store-shortcuts__label">{{ s.label }}</p>' +
        '</li>' +
      '</ul>' +

      // ---- STOVE 이벤트 띠 배너 ----
      '<div class="store-rest-section">' +
        '<div class="store-event-strip">' +
          '<img src="assets/store-rest/event-banner.png" alt="" />' +
          '<p>혜택이 쏟아지는 STOVE 이벤트! 지금 만나보세요!</p>' +
        '</div>' +
      '</div>' +

      // ---- 로그인 후 개인화 (환영 제목 + 최근 플레이한 게임 + 추천 패널) ----
      '<section class="store-rest-section">' +
        '<h2 class="store-rest-title store-rest-title--welcome">' +
          '<img class="store-rest-title__avatar" :src="me.profile" alt="" />' +
          '<span><span class="store-rest-title__name">{{ me.nickname }}님,</span>기다렸어요!</span>' +
        '</h2>' +
        '<div class="store-pick">' +
          '<div class="store-recent">' +
            '<div class="store-recent__track" :style="{ transform: \'translateX(\' + (-recentPage * 100) + \'%)\' }">' +
              '<div v-for="g in me.recent" :key="g.name" class="store-recent__slide">' +
                '<img class="store-recent__blur" :src="g.img" alt="" />' +
                '<div class="store-recent__art"><img :src="g.img" alt="" /></div>' +
                '<div class="store-recent__bar">' +
                  '<div class="store-recent__info">' +
                    '<h6>{{ g.name }}</h6>' +
                    '<p><i class="ic-v2-media-av-play-round-fill"></i><span>{{ g.played }} 플레이</span></p>' +
                  '</div>' +
                  '<button class="store-recent__play" type="button"><i class="ic-v2-media-av-play-round-fill"></i><span>플레이</span></button>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<button class="store-recent__arrow store-recent__arrow--prev" type="button" aria-label="이전" @click="goRecent(-1)"><i class="ic-v2-control-arrow-left-line"></i></button>' +
            '<button class="store-recent__arrow store-recent__arrow--next" type="button" aria-label="다음" @click="goRecent(1)"><i class="ic-v2-control-arrow-right-line"></i></button>' +
            '<div class="store-recent__dots">' +
              '<button v-for="(g, i) in me.recent" :key="g.name" type="button" class="store-recent__dot"' +
                ' :class="{ \'is-active\': i === recentPage }" :aria-label="(i + 1) + \'번째 게임\'" @click="recentPage = i"></button>' +
            '</div>' +
          '</div>' +
          '<div class="store-pick__panel store-pick__panel--me">' +
            '<h3 class="store-pick__title">내 다음 플레이로 좋은 게임</h3>' +
            '<div class="store-pick__swiper">' +
              '<div class="store-rest-viewport store-rest-viewport--visible">' +
                '<div class="store-rest-track store-rest-track--pick" :style="trackStyle(pickPager)">' +
                  '<store-game-card v-for="g in me.picks" :key="g.title" :game="g" variant="mypick"></store-game-card>' +
                '</div>' +
              '</div>' +
              // 웹 swiper rewind — 끝에서 다음을 누르면 처음으로, 처음에서 이전은 끝으로
              '<button class="store-pick__arrow store-pick__arrow--prev" type="button" aria-label="이전" @click="rewind(pickPager, -1)"><i class="ic-v2-control-arrow-left-line"></i></button>' +
              '<button class="store-pick__arrow store-pick__arrow--next" type="button" aria-label="다음" @click="rewind(pickPager, 1)"><i class="ic-v2-control-arrow-right-line"></i></button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>' +

      // ---- 와이드 배너 ----
      '<div class="store-rest-section">' +
        '<div class="store-wide-banner"><img :src="banner" alt="" /></div>' +
      '</div>' +

      // ---- 이달의 스토브 선물 (3열) ----
      '<section class="store-rest-section">' +
        '<h2 class="store-rest-title">이달의 스토브 선물</h2>' +
        '<div class="store-rest-viewport">' +
          '<div class="store-rest-track store-rest-track--gift" :style="trackStyle(giftPager)">' +
            '<div v-for="g in gifts" :key="g.title" class="store-gift">' +
              '<img class="store-gift__img" :src="g.img" alt="" />' +
              '<div class="store-gift__text">' +
                '<h4>{{ g.title }}</h4>' +
                '<div class="store-gift__desc"><img :src="g.icon" alt="" /><span>{{ g.desc }}</span></div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<store-rest-dots :pages="giftPager.pages" :page="giftPager.page" @go="go(giftPager, $event)"></store-rest-dots>' +
      '</section>' +

      // ---- 오늘의 1등 (2열 배너) ----
      '<section class="store-rest-section">' +
        '<h2 class="store-rest-title">오늘의 1등, 매일매일 100만원이 터진다!</h2>' +
        '<div class="store-today1">' +
          '<div v-for="src in today1" :key="src" class="store-today1__item"><img :src="src" alt="" /></div>' +
        '</div>' +
      '</section>' +

      // ---- 신작 출시 ----
      '<section class="store-rest-section">' +
        '<div class="store-rest-head">' +
          '<h2 class="store-rest-title">신작 출시</h2>' +
          '<button class="store-rest-more" type="button"><span>신작 더보기 🔍</span><i class="ic-v2-control-arrow-right-line"></i></button>' +
        '</div>' +
        '<div class="store-rest-viewport">' +
          '<div class="store-rest-track store-rest-track--product" :style="trackStyle(newPager)">' +
            '<store-game-card v-for="g in newReleases" :key="g.img" :game="g" variant="product"></store-game-card>' +
          '</div>' +
        '</div>' +
        '<store-rest-dots :pages="newPager.pages" :page="newPager.page" @go="go(newPager, $event)"></store-rest-dots>' +
      '</section>' +

      // ---- 출시 예정 ----
      '<section class="store-rest-section">' +
        '<h2 class="store-rest-title">출시 예정</h2>' +
        '<div class="store-rest-viewport">' +
          '<div class="store-rest-track store-rest-track--product" :style="trackStyle(soonPager)">' +
            '<store-game-card v-for="g in upcoming" :key="g.img" :game="g" variant="product"></store-game-card>' +
          '</div>' +
        '</div>' +
        '<store-rest-dots :pages="soonPager.pages" :page="soonPager.page" @go="go(soonPager, $event)"></store-rest-dots>' +
      '</section>' +

      // ---- 스토브 대표 게임 ----
      '<section class="store-rest-section">' +
        '<h2 class="store-rest-title">스토브 대표 게임</h2>' +
        '<div class="store-rest-viewport">' +
          '<div class="store-rest-track store-rest-track--featured" :style="trackStyle(repPager)">' +
            '<store-game-card v-for="g in featured" :key="g.title" :game="g" variant="featured"></store-game-card>' +
          '</div>' +
        '</div>' +
        '<store-rest-dots :pages="repPager.pages" :page="repPager.page" @go="go(repPager, $event)"></store-rest-dots>' +
      '</section>' +
    '</div>',
};

function mountStoreRest(selector) {
  return Vue.createApp(StoreRest).mount(selector);
}
