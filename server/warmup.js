const API_URL = 'http://localhost:3001/api/analyze';

const UAP_EVENTS = [
    {
        id: 'roswell',
        title: '罗斯威尔事件',
        year: '1947',
        locationName: '美国, 新墨西哥州, 罗斯威尔',
        shortDesc: '涉及奇异材料和生物实体的坠毁回收事件。',
        type: 'CRASH'
    },
    {
        id: 'varginha',
        title: '瓦吉尼亚事件',
        year: '1996',
        locationName: '巴西, 米纳斯吉拉斯州, 瓦吉尼亚',
        shortDesc: '被称为“巴西的罗斯威尔”。多名目击者报告看到奇怪的生物；据称军方捕获了实体。',
        type: 'CRASH'
    },
    {
        id: 'betty-barney',
        title: '希尔夫妇绑架案',
        year: '1961',
        locationName: '美国, 新罕布什尔州',
        shortDesc: '第一起广为人知的外星人绑架报告。贝蒂·希尔绘制的星图指向网罟座泽塔星。',
        type: 'ABDUCTION'
    },
    {
        id: 'colares',
        title: '普拉托行动 (柯拉瑞斯岛)',
        year: '1977',
        locationName: '巴西, 柯拉瑞斯岛',
        shortDesc: '军方调查攻击当地人的侵略性发光物体。被称为“Chupa Chupa”。',
        type: 'SIGHTING'
    },
    {
        id: 'rendlesham',
        title: '蓝道申森林事件',
        year: '1980',
        locationName: '英国, 萨福克郡',
        shortDesc: '美国空军人员在伍德布里奇皇家空军基地附近多次目击。发现物理痕迹。下载了二进制代码。',
        type: 'CONTACT'
    },
    {
        id: 'belgian-wave',
        title: '比利时不明飞行物潮',
        year: '1989-1990',
        locationName: '比利时, 欧本',
        shortDesc: '大规模目击巨大的黑色三角形物体。F-16战机雷达锁定物体，物体进行了不可能的机动。',
        type: 'SIGHTING'
    },
    {
        id: 'tehran-1976',
        title: '德黑兰UFO事件',
        year: '1976',
        locationName: '伊朗, 德黑兰',
        shortDesc: '伊朗帝国空军战机试图拦截UFO。接近时武器系统和电子设备失灵。',
        type: 'SIGHTING'
    },
    {
        id: 'westall',
        title: '韦斯托尔学校目击案',
        year: '1966',
        locationName: '澳大利亚, 墨尔本',
        shortDesc: '超过200名学生和老师目睹一个碟形飞行器降落在围场并起飞。',
        type: 'SIGHTING'
    },
    {
        id: 'cattle-mute-co',
        title: '圣路易斯谷家畜肢解案',
        year: '1967-Present',
        locationName: '美国, 科罗拉多州',
        shortDesc: '大量无法解释的牲畜外科手术式肢解案件集中地（如Snippy马案）。',
        type: 'MUTILATION'
    },
    {
        id: 'phoenix-lights',
        title: '凤凰城光点',
        year: '1997',
        locationName: '美国, 亚利桑那州, 凤凰城',
        shortDesc: '大规模目击巨大的V形飞行器静默地滑过城市上空。',
        type: 'SIGHTING'
    },
    {
        id: 'ariel-school',
        title: '阿里尔学校事件',
        year: '1994',
        locationName: '津巴布韦, 鲁瓦',
        shortDesc: '62名学童目睹飞行器降落，并与其乘员进行了关于环境保护的心灵感应交流。',
        type: 'CONTACT'
    },
    {
        id: 'tic-tac',
        title: '尼米兹号 "Tic Tac" 事件',
        year: '2004',
        locationName: '美国, 圣地亚哥海岸',
        shortDesc: 'F-18飞行员的雷达目视遭遇。物体展示了瞬间加速能力。AATIP已确认。',
        type: 'SIGHTING'
    },
    {
        id: 'washington-flap',
        title: '华盛顿特区不明飞行物',
        year: '1952',
        locationName: '美国, 华盛顿特区',
        shortDesc: 'UFO连续几个周末在白宫和国会大厦上空盘旋。喷气式飞机紧急升空；雷达确认。',
        type: 'SIGHTING'
    },
    {
        id: 'kaikoura',
        title: '凯库拉光点',
        year: '1978',
        locationName: '新西兰, 凯库拉',
        shortDesc: '电视台工作人员从飞机上拍摄。空中交通管制雷达追踪到了物体。',
        type: 'SIGHTING'
    },
    {
        id: 'trans-en-provence',
        title: '普罗旺斯高地事件',
        year: '1981',
        locationName: '法国, 普罗旺斯',
        shortDesc: '最科学分析的物理痕迹案例之一 (GEPAN)。确认了地面加热和植物创伤。',
        type: 'CONTACT'
    }
];

const CELESTIAL_ORIGINS = [
    {
        id: 'zeta-reticuli',
        name: '网罟座泽塔星系 (Zeta Reticuli)',
        designation: '双星系统',
        distance: '39.3 光年',
        shortDesc: '由贝蒂·希尔的星图确认。通常被认为是小灰人外星人的家乡星系。',
        type: 'HOMEWORLD'
    },
    {
        id: 'wow-signal',
        name: 'Wow! 信号源 (Wow! Source)',
        designation: '人马座 Chi (大约)',
        distance: '1,800 光年',
        shortDesc: '1977年探测到的强窄带无线电信号，具有人造起源的特征。',
        type: 'SIGNAL'
    },
    {
        id: 'pleiades',
        name: '昂宿星团 (The Pleiades)',
        designation: 'M45 疏散星团',
        distance: '444 光年',
        shortDesc: '在接触者传说中经常提到，是仁慈的、人类外观实体的家园。',
        type: 'HOMEWORLD'
    },
    {
        id: 'sirius',
        name: '天狼星系 (Sirius System)',
        designation: '大犬座 Alpha',
        distance: '8.6 光年',
        shortDesc: '马里的多贡部落在几个世纪前就拥有关于这颗看不见的伴星（天狼星B）的先进知识。',
        type: 'HOMEWORLD'
    },
    {
        id: 'oumuamua',
        name: '奥陌陌 (\'Oumuamua)',
        designation: '1I/2017 U1',
        distance: '正在远离',
        shortDesc: '已知的第一个经过太阳系的星际物体。表现出非引力加速。',
        type: 'ANOMALY'
    },
    {
        id: 'tabbys-star',
        name: '塔比星 (Tabby\'s Star)',
        designation: 'KIC 8462852',
        distance: '1,470 光年',
        shortDesc: '恒星表现出不稳定的、巨大的亮度下降（高达22%），导致了外星巨型结构的假设。',
        type: 'ANOMALY'
    },
    {
        id: 'proxima-b',
        name: '比邻星系 (Proxima Centauri)',
        designation: '半人马座 Alpha C',
        distance: '4.2 光年',
        shortDesc: '已知最近的宜居带系外行星。2019年探测到 "BLC-1" 信号（可能是干扰，但意义重大）。',
        type: 'HOMEWORLD'
    }
];

async function warmUpCache() {
    console.log("Starting cache warmup...");

    const allItems = [...UAP_EVENTS, ...CELESTIAL_ORIGINS];

    for (const item of allItems) {
        const id = item.id;
        let retries = 3;
        let success = false;

        while (retries > 0 && !success) {
            console.log(`Processing: ${id} (Attempts left: ${retries})...`);

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(item)
                });

                if (response.ok) {
                    console.log(`✅ Cached: ${id}`);
                    success = true;
                } else {
                    console.error(`⚠️ Failed: ${id} - ${response.statusText}. Retrying...`);
                    retries--;
                    // Wait longer on failure
                    await new Promise(resolve => setTimeout(resolve, 5000));
                }
            } catch (error) {
                console.error(`❌ Error: ${id}`, error);
                retries--;
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
        }

        if (!success) {
            console.error(`❌ Permanently Failed: ${id}`);
        }

        // Standard delay between items to avoid overload
        await new Promise(resolve => setTimeout(resolve, 4000));
    }

    console.log("Cache warmup complete!");
}

warmUpCache();
