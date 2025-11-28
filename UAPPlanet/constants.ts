import { UAPEvent, CelestialOrigin } from './types';

// Reliable Earth Textures via JSDelivr (High availability CDN)
export const EARTH_DAY_MAP = "https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-day.jpg";
export const EARTH_NORMAL_MAP = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_normal_2048.jpg";

export const UAP_EVENTS: UAPEvent[] = [
  {
    id: 'roswell',
    title: '罗斯威尔事件',
    year: '1947',
    locationName: '美国, 新墨西哥州, 罗斯威尔',
    coords: { lat: 33.3943, lng: -104.5230 },
    shortDesc: '涉及奇异材料和生物实体的坠毁回收事件。',
    image: '/archives/roswell-real.jpg',
    type: 'CRASH'
  },
  {
    id: 'varginha',
    title: '瓦吉尼亚事件',
    year: '1996',
    locationName: '巴西, 米纳斯吉拉斯州, 瓦吉尼亚',
    coords: { lat: -21.5517, lng: -45.4308 },
    shortDesc: '被称为“巴西的罗斯威尔”。多名目击者报告看到奇怪的生物；据称军方捕获了实体。',
    image: '/archives/varginha-real.jpg',
    type: 'CRASH'
  },
  {
    id: 'betty-barney',
    title: '希尔夫妇绑架案',
    year: '1961',
    locationName: '美国, 新罕布什尔州',
    coords: { lat: 44.4877, lng: -71.5724 },
    shortDesc: '第一起广为人知的外星人绑架报告。贝蒂·希尔绘制的星图指向网罟座泽塔星。',
    image: '/archives/betty-barney.jpg',
    type: 'ABDUCTION'
  },
  {
    id: 'colares',
    title: '普拉托行动 (柯拉瑞斯岛)',
    year: '1977',
    locationName: '巴西, 柯拉瑞斯岛',
    coords: { lat: -0.9367, lng: -48.2831 },
    shortDesc: '军方调查攻击当地人的侵略性发光物体。被称为“Chupa Chupa”。',
    image: '/archives/colares-authentic.png',
    isAI: false,
    type: 'SIGHTING'
  },
  {
    id: 'rendlesham',
    title: '蓝道申森林事件',
    year: '1980',
    locationName: '英国, 萨福克郡',
    coords: { lat: 52.0837, lng: 1.4332 },
    shortDesc: '美国空军人员在伍德布里奇皇家空军基地附近多次目击。发现物理痕迹。下载了二进制代码。',
    image: '/archives/rendlesham-authentic.png',
    isAI: false,
    type: 'CONTACT'
  },
  {
    id: 'belgian-wave',
    title: '比利时不明飞行物潮',
    year: '1989-1990',
    locationName: '比利时, 欧本',
    coords: { lat: 50.6319, lng: 6.0344 },
    shortDesc: '大规模目击巨大的黑色三角形物体。F-16战机雷达锁定物体，物体进行了不可能的机动。',
    image: '/archives/belgian-wave.jpg',
    type: 'SIGHTING'
  },
  {
    id: 'tehran-1976',
    title: '德黑兰UFO事件',
    year: '1976',
    locationName: '伊朗, 德黑兰',
    coords: { lat: 35.6892, lng: 51.3890 },
    shortDesc: '伊朗帝国空军战机试图拦截UFO。接近时武器系统和电子设备失灵。',
    image: '/archives/tehran.png',
    isAI: true,
    type: 'SIGHTING'
  },
  {
    id: 'westall',
    title: '韦斯托尔学校目击案',
    year: '1966',
    locationName: '澳大利亚, 墨尔本',
    coords: { lat: -37.9333, lng: 145.1500 },
    shortDesc: '超过200名学生和老师目睹一个碟形飞行器降落在围场并起飞。',
    image: '/archives/westall.png',
    isAI: true,
    type: 'SIGHTING'
  },
  {
    id: 'cattle-mute-co',
    title: '圣路易斯谷家畜肢解案',
    year: '1967-Present',
    locationName: '美国, 科罗拉多州',
    coords: { lat: 37.7667, lng: -105.7833 },
    shortDesc: '大量无法解释的牲畜外科手术式肢解案件集中地（如Snippy马案）。',
    image: '/archives/snippy-authentic.png',
    isAI: false,
    type: 'MUTILATION'
  },
  {
    id: 'phoenix-lights',
    title: '凤凰城光点',
    year: '1997',
    locationName: '美国, 亚利桑那州, 凤凰城',
    coords: { lat: 33.4484, lng: -112.0740 },
    shortDesc: '大规模目击巨大的V形飞行器静默地滑过城市上空。',
    image: '/archives/phoenix-lights-authentic.png',
    isAI: false,
    type: 'SIGHTING'
  },
  {
    id: 'ariel-school',
    title: '阿里尔学校事件',
    year: '1994',
    locationName: '津巴布韦, 鲁瓦',
    coords: { lat: -17.8917, lng: 31.2427 },
    shortDesc: '62名学童目睹飞行器降落，并与其乘员进行了关于环境保护的心灵感应交流。',
    image: '/archives/ariel-school.png',
    isAI: true,
    type: 'CONTACT'
  },
  {
    id: 'tic-tac',
    title: '尼米兹号 "Tic Tac" 事件',
    year: '2004',
    locationName: '美国, 圣地亚哥海岸',
    coords: { lat: 31.5, lng: -117.5 },
    shortDesc: 'F-18飞行员的雷达目视遭遇。物体展示了瞬间加速能力。AATIP已确认。',
    image: '/archives/tic-tac-real-v2.png',
    type: 'SIGHTING'
  },
  {
    id: 'washington-flap',
    title: '华盛顿特区不明飞行物',
    year: '1952',
    locationName: '美国, 华盛顿特区',
    coords: { lat: 38.9072, lng: -77.0369 },
    shortDesc: 'UFO连续几个周末在白宫和国会大厦上空盘旋。喷气式飞机紧急升空；雷达确认。',
    image: '/archives/washington-1952-authentic.png',
    isAI: false,
    type: 'SIGHTING'
  },
  {
    id: 'kaikoura',
    title: '凯库拉光点',
    year: '1978',
    locationName: '新西兰, 凯库拉',
    coords: { lat: -42.4008, lng: 173.6815 },
    shortDesc: '电视台工作人员从飞机上拍摄。空中交通管制雷达追踪到了物体。',
    image: '/archives/kaikoura.png',
    isAI: true,
    type: 'SIGHTING'
  },
  {
    id: 'trans-en-provence',
    title: '普罗旺斯高地事件',
    year: '1981',
    locationName: '法国, 普罗旺斯',
    coords: { lat: 43.5042, lng: 6.4867 },
    shortDesc: '最科学分析的物理痕迹案例之一 (GEPAN)。确认了地面加热和植物创伤。',
    image: '/archives/trans-en-provence-generated.png',
    isAI: true,
    type: 'CONTACT'
  }
];

export const CELESTIAL_ORIGINS: CelestialOrigin[] = [
  {
    id: 'zeta-reticuli',
    name: '网罟座泽塔星系 (Zeta Reticuli)',
    designation: '双星系统',
    distance: '39.3 光年',
    associatedBeings: '小灰人 (Ebens)',
    position: [25, 10, -10],
    shortDesc: '由贝蒂·希尔的星图确认。通常被认为是小灰人外星人的家乡星系。',
    type: 'HOMEWORLD'
  },
  {
    id: 'wow-signal',
    name: 'Wow! 信号源 (Wow! Source)',
    designation: '人马座 Chi (大约)',
    distance: '1,800 光年',
    associatedBeings: '未知',
    position: [-30, 5, 20],
    shortDesc: '1977年探测到的强窄带无线电信号，具有人造起源的特征。',
    type: 'SIGNAL'
  },
  {
    id: 'pleiades',
    name: '昂宿星团 (The Pleiades)',
    designation: 'M45 疏散星团',
    distance: '444 光年',
    associatedBeings: '北欧型外星人 (Nordics) / 昂宿星人',
    position: [10, 35, 10],
    shortDesc: '在接触者传说中经常提到，是仁慈的、人类外观实体的家园。',
    type: 'HOMEWORLD'
  },
  {
    id: 'sirius',
    name: '天狼星系 (Sirius System)',
    designation: '大犬座 Alpha',
    distance: '8.6 光年',
    associatedBeings: 'Nommos (多贡神话)',
    position: [-10, -20, 15],
    shortDesc: '马里的多贡部落在几个世纪前就拥有关于这颗看不见的伴星（天狼星B）的先进知识。',
    type: 'HOMEWORLD'
  },
  {
    id: 'oumuamua',
    name: '奥陌陌 (\'Oumuamua)',
    designation: '1I/2017 U1',
    distance: '正在远离',
    associatedBeings: '自动化探测器?',
    position: [40, 0, 40],
    shortDesc: '已知的第一个经过太阳系的星际物体。表现出非引力加速。',
    type: 'ANOMALY'
  },
  {
    id: 'tabbys-star',
    name: '塔比星 (Tabby\'s Star)',
    designation: 'KIC 8462852',
    distance: '1,470 光年',
    associatedBeings: '戴森球建造者?',
    position: [-40, 30, -20],
    shortDesc: '恒星表现出不稳定的、巨大的亮度下降（高达22%），导致了外星巨型结构的假设。',
    type: 'ANOMALY'
  },
  {
    id: 'proxima-b',
    name: '比邻星系 (Proxima Centauri)',
    designation: '半人马座 Alpha C',
    distance: '4.2 光年',
    associatedBeings: '拟议的邻居',
    position: [5, -5, -5],
    shortDesc: '已知最近的宜居带系外行星。2019年探测到 "BLC-1" 信号（可能是干扰，但意义重大）。',
    type: 'HOMEWORLD'
  }
];

// --- Constellation Definitions for 3D Visualization ---

export interface ConstellationStar {
  pos: [number, number, number];
  size: number;
}

export interface ConstellationData {
  id: string;
  name: string;
  color: string;
  lines: [number, number][]; // Indices of stars to connect
  stars: ConstellationStar[];
  mainSystemIndex: number; // Index of the star that corresponds to our CELESTIAL_ORIGINS entry
  targetId: string; // Links back to CELESTIAL_ORIGINS id
}

export const CONSTELLATIONS: ConstellationData[] = [
  {
    id: 'reticulum-hill',
    name: '希尔星图 (The Hill Map)',
    targetId: 'zeta-reticuli',
    color: '#4ade80', // Green for Grey Aliens/Hill Map
    mainSystemIndex: 0, // Zeta 1/2 is the first star
    lines: [
      [0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 5], [5, 6], [0, 7]
    ],
    stars: [
      { pos: [25, 10, -10], size: 1.2 }, // 0: Zeta Reticuli (Target)
      { pos: [28, 12, -8], size: 0.8 },  // 1
      { pos: [22, 8, -12], size: 0.8 },  // 2
      { pos: [30, 15, -6], size: 0.7 },  // 3
      { pos: [18, 5, -14], size: 0.7 },  // 4
      { pos: [24, 20, -5], size: 0.6 },  // 5
      { pos: [26, 22, -3], size: 0.6 },  // 6
      { pos: [23, 6, -15], size: 0.5 },  // 7
    ]
  },
  {
    id: 'centaurus',
    name: '半人马座 (Centaurus)',
    targetId: 'proxima-b',
    color: '#f59e0b', // Gold/Orange for Alpha Centauri
    mainSystemIndex: 0,
    lines: [[0, 1], [1, 2], [1, 3], [3, 4], [0, 5]],
    stars: [
      { pos: [5, -5, -5], size: 1.0 },   // 0: Proxima (Target)
      { pos: [8, -2, -8], size: 1.5 },   // 1: Alpha Centauri A/B
      { pos: [10, 0, -10], size: 0.8 },  // 2
      { pos: [6, 2, -12], size: 0.7 },   // 3
      { pos: [4, 5, -15], size: 0.6 },   // 4
      { pos: [2, -8, -2], size: 0.7 },   // 5
    ]
  },
  {
    id: 'sagittarius',
    name: '人马座 (Sagittarius)',
    targetId: 'wow-signal',
    color: '#a855f7', // Purple for the Mystery Signal
    mainSystemIndex: 0,
    lines: [[0, 1], [1, 2], [2, 3], [3, 0], [1, 4], [2, 5]], // Teapot shape-ish
    stars: [
      { pos: [-30, 5, 20], size: 1.0 }, // 0: Chi Sagittarii (Target area)
      { pos: [-25, 8, 22], size: 0.9 }, // 1
      { pos: [-28, 10, 25], size: 0.8 },// 2
      { pos: [-32, 7, 23], size: 0.8 }, // 3
      { pos: [-22, 12, 20], size: 0.7 },// 4
      { pos: [-26, 14, 28], size: 0.7 },// 5
    ]
  },
  // Background Constellation (Canis Major - Sirius)
  {
    id: 'canis-major',
    name: '大犬座 (Canis Major)',
    targetId: 'sirius',
    color: '#38bdf8', // Cyan/Blue for Sirius
    mainSystemIndex: 0,
    lines: [[0, 1], [0, 2], [2, 3], [3, 4]],
    stars: [
      { pos: [-10, -20, 15], size: 1.6 }, // 0: Sirius
      { pos: [-12, -22, 12], size: 0.8 }, // 1
      { pos: [-8, -18, 18], size: 0.9 },  // 2
      { pos: [-6, -16, 20], size: 0.7 },  // 3
      { pos: [-4, -15, 22], size: 0.6 },  // 4
    ]
  }
];
