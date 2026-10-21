/**
 * 게임 카탈로그 — 클라이언트 전체 공통 게임 정보 (단일 출처)
 * -------------------------------------------------------------
 * 사이드바(스토브게임 · 즐겨찾기), 라이브러리(빠른 실행 · 보유게임),
 * PC방 혜택 팝업이 모두 여기서 게임 이름 · 장르 · 썸네일을 가져온다.
 * 같은 게임을 페이지마다 따로 적지 않는다 — 게임을 추가 · 수정할 때는 이 파일만.
 *
 * 썸네일은 assets/games/{id}.png 한 장 (원본 그대로, 화면마다 크기만 다르게 표시).
 * 이 파일은 gnb-component.js 등 게임을 쓰는 스크립트보다 먼저 불러야 한다.
 */
var GAME_CATALOG = {
  lostark: { name: 'LOST ARK', genre: 'MMORPG' },
  rodnine: { name: '로드나인', genre: 'MMORPG' },
  chaos: { name: '카오스 제로 나이트메어', genre: '로그라이트 RPG' },
  e7: { name: '에픽세븐', genre: '턴제RPG' },
  bts: { name: 'BTS 쿠킹온 스토브 : 타이니탄 레스토랑', genre: '캐주얼' },
  tales: { name: '테일즈런너', genre: 'Racing' },
  'atom-rpg': { name: '아톰 RPG 트루도그라드 디럭스 컬렉션', genre: 'RPG' },
  ghostrunner: { name: '고스트러너', genre: '액션' },
  'deluvian-winds': { name: '딜루비안 윈즈', genre: '시뮬레이션' },
  scarf: { name: '스카프', genre: '어드벤처' },
  'floppy-knight': { name: '플로피 나이트', genre: '캐주얼' },
  'novena-diabolos': { name: '노베나 디아볼로스', genre: '전략' },
  'bullet-delivery': { name: '총알배달 우주반점: 프리퀄 단편소설 (STOVE 한정)', genre: '인디' },
  illips: { name: '일립스', genre: '퍼즐' },
  undying: { name: '언다잉', genre: 'RPG' },
  'bus-world': { name: '버스 월드', genre: '액션' },
  'yoryeong-village': { name: '요령 마을: 요령사의 길', genre: '시뮬레이션' },
  hwayeonwol: { name: '화연월의', genre: '어드벤처' },
  'fog-detective': { name: '안개 탐정: 네온 바다의 이야기', genre: '캐주얼' },
  'under-blue-horizon': { name: 'Under the blue horizon - Aquarium', genre: '전략' },
  'suicide-countdown': { name: 'Suicide Countdown: 7 Days', genre: '인디' },
  'happy-quest': { name: '해피 퀘스트', genre: '퍼즐' },
  'four-lights': { name: '네개의 빛 : 제 1세계 [Iruka Route] 시크릿 플러스', genre: 'RPG' },
  cabbage: { name: '카베지', genre: '액션' },
  utawarerumono: { name: '칭송받는 자: 거짓의 가면 - DLC 합본팩', genre: '시뮬레이션' },
  'atom-rpg-supporter': { name: '아톰 RPG 트루도그라드 DLC 서포터팩 (Trudograd - Supporter Pack)', genre: '어드벤처' },
  'baek-wallpaper': { name: '백의 소각자 월페이퍼 DLC', genre: '캐주얼' },
  '52hz': { name: '52헤르츠 / DLC 통합 패키지', genre: '전략' },
  'storm-maid': { name: '폭풍의 메이드: 시크릿 커리큘럼 콜라보 DLC', genre: '인디' },
  'eyes-nose-mouth': { name: '눈,코,입', genre: '퍼즐' },
  'hamster-talk': { name: '햄스터 톡', genre: 'RPG' },
  gigabash: { name: '기가배시 (GigaBash) : 괴수 몬스터 대난투', genre: '액션' },
  sisters: { name: '시스터즈: 여름의 마지막 날 (Sisters: Last Day of Summer)', genre: '시뮬레이션' },
  'dice-eater': { name: '다이스 이터: 초능력 추리 카드게임', genre: '어드벤처' },
  'into-the-room': { name: '인투더라움', genre: '캐주얼' },
  'knight-overloaded': { name: '나이트 오버로디드 (Knight Overloaded)', genre: '전략' },
  dosul: { name: '도술회전', genre: '인디' },
  'infinite-incantation': { name: '무한의 주술 (Infinite Incantation)', genre: '퍼즐' },
  'flower-survivors': { name: '플라워 서바이버스 - DEMO', genre: 'RPG' },
  'whos-my-manito': { name: '후즈 마이 마니또 데모', genre: '액션' },
  'everything-is-crab': { name: '에브리씽 이즈 크랩: 동물 진화 로그라이트 | Everything is Crab', genre: '시뮬레이션' },
  postal2: { name: '포스탈 2 (POSTAL 2)', genre: '어드벤처' },
  reblade: { name: 'Re:Blade', genre: '캐주얼' },
  'zombie-shooting-star': { name: '좀비 슈팅스타: 아케이드', genre: '전략' },
  noexistencen: { name: '당신과 나의 존재불명 (The NOexistenceN of you AND me)', genre: '인디' },
  'primal-slidey': { name: '프라이멀 슬라이디 DX', genre: '퍼즐' },
  'critter-cove': { name: '크리터 코브 (Critter Cove)', genre: 'RPG' },
};

// 게임 정보 하나 — { id, name, genre, thumb }. 카탈로그에 없는 id면 null
function gameInfo(id) {
  var g = GAME_CATALOG[id];
  if (!g) return null;
  return { id: id, name: g.name, genre: g.genre, thumb: 'assets/games/' + id + '.png' };
}
