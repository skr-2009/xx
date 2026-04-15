import type { Spot, DummyUser, Event, TourRoute, Checkin } from '../types'

export const COLORS = {
  primary: '#2D6A4F',
  primaryLight: '#E8F5E9',
  accent: '#F4A261',
  accentLight: '#FFF3E8',
  bg: '#EDECEA',
  card: '#FFFFFF',
  text: '#1A1A1A',
  subtext: '#666666',
  border: '#E0DDD9',
  match: '#E63946',
  matchLight: '#FDECEA',
}

export const ALL_TAGS = [
  'ジャズ', '農業', 'デザイン', '料理', 'プログラミング',
  '写真', '音楽', '旅行', 'カフェ', '地域づくり',
  '映像', '手芸', 'アウトドア', 'スポーツ', '読書',
]

export const SPOTS: Spot[] = [
  { id: 'spot1', name: '道の駅 神山', description: '地元野菜・特産品が揃う憩いの場', emoji: '🏪' },
  { id: 'spot2', name: '神山図書館', description: '静かに作業・読書ができる', emoji: '📚' },
  { id: 'spot3', name: 'えんがわオフィス', description: 'ITサテライトオフィスが集まる', emoji: '💻' },
  { id: 'spot4', name: '神山温泉', description: '旅の疲れを癒やす温泉', emoji: '♨️' },
  { id: 'spot5', name: 'まるごと高専 カフェ', description: '学生・移住者が集まるカフェ', emoji: '☕' },
]

export const DUMMY_USERS: DummyUser[] = [
  { id: 'u1', nickname: 'たろう', tags: ['ジャズ', '農業', 'カフェ'], attribute: '移住者', emoji: '🌿' },
  { id: 'u2', nickname: 'はなこ', tags: ['デザイン', 'ジャズ', '写真'], attribute: '来訪者', emoji: '🌸' },
  { id: 'u3', nickname: 'けんじ', tags: ['農業', '料理', '地域づくり'], attribute: '地元民', emoji: '🏔️' },
  { id: 'u4', nickname: 'みき', tags: ['プログラミング', 'デザイン', 'カフェ'], attribute: '学生', emoji: '💡' },
  { id: 'u5', nickname: 'りょう', tags: ['写真', '旅行', '音楽'], attribute: '来訪者', emoji: '🎒' },
  { id: 'u6', nickname: 'さとし', tags: ['地域づくり', '農業', '料理'], attribute: '地元民', emoji: '🌾' },
  { id: 'u7', nickname: 'あい', tags: ['デザイン', '音楽', 'カフェ'], attribute: '移住者', emoji: '🎨' },
  { id: 'u8', nickname: 'ゆうき', tags: ['プログラミング', 'ジャズ', '旅行'], attribute: '学生', emoji: '🎷' },
  { id: 'u9', nickname: 'なつみ', tags: ['写真', 'デザイン', '料理'], attribute: '来訪者', emoji: '📷' },
  { id: 'u10', nickname: 'こうた', tags: ['農業', '音楽', '地域づくり'], attribute: '地元民', emoji: '🌱' },
]

const FAR_FUTURE = Date.now() + 1000 * 60 * 60 * 24 * 365

export const STATIC_CHECKINS: Checkin[] = [
  { id: 'sc1', userId: 'u1', spotId: 'spot1', status: '話せます', message: '野菜見に来ました！', expiresAt: FAR_FUTURE },
  { id: 'sc2', userId: 'u2', spotId: 'spot1', status: '話せます', message: 'ジャズの話がしたい', expiresAt: FAR_FUTURE },
  { id: 'sc3', userId: 'u3', spotId: 'spot1', status: 'ちょっとなら', message: '地元のもの探し中', expiresAt: FAR_FUTURE },
  { id: 'sc4', userId: 'u4', spotId: 'spot2', status: '話せます', message: '作業中です', expiresAt: FAR_FUTURE },
  { id: 'sc5', userId: 'u5', spotId: 'spot2', status: 'ちょっとなら', message: '写真集読んでます', expiresAt: FAR_FUTURE },
  { id: 'sc6', userId: 'u6', spotId: 'spot3', status: '話せます', message: 'ミーティング待ち', expiresAt: FAR_FUTURE },
  { id: 'sc7', userId: 'u7', spotId: 'spot3', status: '話せます', message: 'デザイン作業中', expiresAt: FAR_FUTURE },
  { id: 'sc8', userId: 'u8', spotId: 'spot5', status: '話せます', message: 'コード書いてます', expiresAt: FAR_FUTURE },
  { id: 'sc9', userId: 'u9', spotId: 'spot4', status: 'ちょっとなら', message: 'ゆっくりしてます', expiresAt: FAR_FUTURE },
  { id: 'sc10', userId: 'u10', spotId: 'spot5', status: '話せます', message: '地域の話ならいつでも', expiresAt: FAR_FUTURE },
]

export const CONVERSATION_CARDS = [
  '神山に来たきっかけは何ですか？',
  '最近ハマっていることは？',
  '神山で好きな場所はどこですか？',
  '移住を考えたことはありますか？',
  'おすすめのご飯屋さんはありますか？',
  '今、どんなプロジェクトに取り組んでいますか？',
  '神山が変わったと思うことはありますか？',
  '地域のつながりで感動したエピソードは？',
  '神山を一言で表すとしたら？',
  'いま一番気になっていることは？',
]

export const EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'ジャズセッションナイト',
    date: '4月19日（土）',
    time: '19:00〜22:00',
    location: 'えんがわオフィス',
    description: '地元ミュージシャンと移住者が集まるインプロセッション。初めての方も歓迎。楽器持参でどうぞ。',
    tags: ['ジャズ', '音楽'],
    emoji: '🎷',
  },
  {
    id: 'e2',
    title: '農家さんの朝市',
    date: '4月20日（日）',
    time: '8:00〜11:00',
    location: '道の駅 神山',
    description: '今朝採れた野菜を農家さんから直接買えます。今週は山田農園のトマトが出品予定。',
    tags: ['農業', '料理'],
    emoji: '🥦',
  },
  {
    id: 'e3',
    title: '神山フォトウォーク',
    date: '4月26日（土）',
    time: '10:00〜12:00',
    location: '神山町役場前 集合',
    description: '神山の風景をみんなで撮り歩くイベント。カメラ・スマホ何でもOK。',
    tags: ['写真', '旅行'],
    emoji: '📷',
  },
  {
    id: 'e4',
    title: 'デザイン勉強会',
    date: '5月3日（土）',
    time: '14:00〜17:00',
    location: 'まるごと高専 カフェ',
    description: 'UIデザインの基礎から実践まで。学生・社会人・移住者が混じって学びます。',
    tags: ['デザイン', 'プログラミング'],
    emoji: '🎨',
  },
  {
    id: 'e5',
    title: '給食の野菜を知ろう会',
    date: '5月10日（日）',
    time: '10:00〜12:00',
    location: '神山小学校',
    description: '200人分の給食を支える農家さんのこだわりを聞けます。産地直消の現場へ。',
    tags: ['農業', '地域づくり', '料理'],
    emoji: '🍱',
  },
]

export const TOUR_ROUTES: TourRoute[] = [
  {
    id: 'r1',
    name: '神山はじめての2時間',
    description: '学校説明会後の空き時間にぴったり。神山を凝縮したルートです。',
    totalDuration: '約2時間',
    stops: [
      { name: 'まるごと高専 カフェ', description: '学生が作るコーヒーで一息。校内の雰囲気も感じられます。', duration: '30分', emoji: '☕' },
      { name: 'えんがわオフィス', description: 'IT企業が古民家でサテライトオフィス。新しい働き方の現場。', duration: '20分', emoji: '💻' },
      { name: '道の駅 神山', description: '地元農家の野菜をお土産に。農家さんがいれば直接話せます。', duration: '30分', emoji: '🏪' },
      { name: '鮎喰川 川べり', description: '神山の象徴、きれいな川。天気が良ければ足をつけてみて。', duration: '20分', emoji: '🏞️' },
      { name: '神山温泉', description: '旅の締めに温泉。地元の方と話すきっかけになることも。', duration: '20分', emoji: '♨️' },
    ],
  },
  {
    id: 'r2',
    name: '農と食の神山 半日ルート',
    description: '神山の食文化と農業を深く知りたい方向けのルートです。',
    totalDuration: '約4時間',
    stops: [
      { name: '道の駅 神山（朝市）', description: '8〜11時限定。農家さんから直接朝採れ野菜が買えます。', duration: '45分', emoji: '🥦' },
      { name: '山田農園（見学）', description: 'トマト・なすを中心に栽培。神山の土と水のこだわりを聞けます。', duration: '60分', emoji: '🍅' },
      { name: '食堂 kamiyama', description: '地元食材100%のランチ。200人分の給食を作るシェフのこだわり。', duration: '60分', emoji: '🍽️' },
      { name: '神山図書館', description: '神山の農業の歴史がわかる資料が揃っています。', duration: '30分', emoji: '📚' },
    ],
  },
]
