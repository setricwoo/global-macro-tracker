// ========================================
// 全局变量
// ========================================
let currentEvents = [];
let map = null;  // Leaflet 地图实例
let markers = []; // Leaflet 标记数组
let currentEventId = null;
let currentTab = 'overview';
let currentEconomicEvent = null; // 当前选中的经济事件

// ========================================
// 未来两周经济日历数据（金十数据风格）
// 包含中、美、欧、日核心经济数据
// ========================================
const economicCalendarData = [
    // 中国数据
    {
        id: 'econ-cn-1',
        date: '2026-03-01',
        time: '09:00',
        title: '中国2月官方制造业PMI',
        country: '中国',
        countryCode: 'CN',
        importance: 'high',
        type: 'economic',
        previousValue: '49.1',
        forecastValue: '49.8',
        actualValue: null,
        unit: '',
        description: '中国官方制造业PMI是衡量中国制造业活动的核心指标，50为荣枯线。数据反映中国经济增长动能。',
        impact: 'PMI高于预期利好人民币和中国股市，低于预期可能引发政策宽松预期。',
        publishAgency: '国家统计局',
        frequency: '每月'
    },
    {
        id: 'econ-cn-2',
        date: '2026-03-04',
        time: '09:45',
        title: '中国2月财新制造业PMI',
        country: '中国',
        countryCode: 'CN',
        importance: 'medium',
        type: 'economic',
        previousValue: '50.1',
        forecastValue: '50.3',
        actualValue: null,
        unit: '',
        description: '财新PMI更侧重中小型企业，是官方PMI的补充指标。',
        impact: '数据反映中小企业景气度，影响市场对中国经济预期。',
        publishAgency: '财新/Markit',
        frequency: '每月'
    },
    {
        id: 'econ-cn-3',
        date: '2026-03-05',
        time: '待定',
        title: '中国两会开幕',
        country: '中国',
        countryCode: 'CN',
        importance: 'high',
        type: 'summit',
        previousValue: null,
        forecastValue: null,
        actualValue: null,
        unit: '',
        description: '全国人大和政协会议将审议政府工作报告，设定年度经济增长目标，对市场有重大影响。',
        impact: '关注GDP目标、财政赤字率、货币政策取向等关键信息。',
        publishAgency: '全国人大',
        frequency: '每年'
    },
    {
        id: 'econ-cn-4',
        date: '2026-03-10',
        time: '09:30',
        title: '中国2月CPI/PPI',
        country: '中国',
        countryCode: 'CN',
        importance: 'high',
        type: 'economic',
        previousValue: '0.5%/-2.3%',
        forecastValue: '0.4%/-2.1%',
        actualValue: null,
        unit: '%',
        description: 'CPI反映居民消费价格变动，PPI反映工业品出厂价格变动，是观察中国通胀的重要指标。',
        impact: '通胀数据影响央行货币政策预期。',
        publishAgency: '国家统计局',
        frequency: '每月'
    },
    {
        id: 'econ-cn-5',
        date: '2026-03-15',
        time: '09:30',
        title: '中国2月MLF利率',
        country: '中国',
        countryCode: 'CN',
        importance: 'high',
        type: 'central-bank',
        previousValue: '2.00%',
        forecastValue: '2.00%',
        actualValue: null,
        unit: '%',
        description: 'MLF中期借贷便利利率是中国央行的重要政策利率，变化反映货币政策取向。',
        impact: 'MLF利率下调是降息信号，利好股市债市；上调则相反。',
        publishAgency: '中国人民银行',
        frequency: '每月'
    },
    {
        id: 'econ-cn-6',
        date: '2026-03-20',
        time: '09:15',
        title: '中国3月LPR报价',
        country: '中国',
        countryCode: 'CN',
        importance: 'high',
        type: 'central-bank',
        previousValue: '3.10%/3.60%',
        forecastValue: '3.10%/3.60%',
        actualValue: null,
        unit: '%',
        description: 'LPR贷款市场报价利率是银行贷款的定价基准，1年期和5年期分别影响短期和房贷利率。',
        impact: 'LPR下调利好房地产市场和实体经济。',
        publishAgency: '中国人民银行',
        frequency: '每月'
    },
    // 美国数据
    {
        id: 'econ-us-1',
        date: '2026-03-03',
        time: '23:00',
        title: '美国2月ISM制造业PMI',
        country: '美国',
        countryCode: 'US',
        importance: 'high',
        type: 'economic',
        previousValue: '50.9',
        forecastValue: '50.5',
        actualValue: null,
        unit: '',
        description: 'ISM制造业PMI是衡量美国制造业活动的重要指标，50为荣枯线。',
        impact: '美元指数通常与PMI数据正相关，数据好于预期利好美元。',
        publishAgency: '美国供应管理协会(ISM)',
        frequency: '每月'
    },
    {
        id: 'econ-us-2',
        date: '2026-03-05',
        time: '21:15',
        title: '美国2月ADP就业人数',
        country: '美国',
        countryCode: 'US',
        importance: 'high',
        type: 'economic',
        previousValue: '18.3万',
        forecastValue: '15.0万',
        actualValue: null,
        unit: '万人',
        description: 'ADP就业数据素有"小非农"之称，是重要前瞻指标。',
        impact: '数据好于预期通常利好美元，利空黄金。',
        publishAgency: 'ADP',
        frequency: '每月'
    },
    {
        id: 'econ-us-3',
        date: '2026-03-06',
        time: '21:30',
        title: '美国2月非农就业/失业率',
        country: '美国',
        countryCode: 'US',
        importance: 'high',
        type: 'economic',
        previousValue: '14.3万/4.0%',
        forecastValue: '16.0万/4.0%',
        actualValue: null,
        unit: '万人/%',
        description: '非农就业数据是衡量美国就业市场健康状况的最重要指标。',
        impact: '数据强劲可能推迟降息预期，利好美元。',
        publishAgency: '美国劳工部',
        frequency: '每月'
    },
    {
        id: 'econ-us-4',
        date: '2026-03-12',
        time: '20:30',
        title: '美国2月CPI通胀数据',
        country: '美国',
        countryCode: 'US',
        importance: 'high',
        type: 'economic',
        previousValue: '3.0%/3.3%',
        forecastValue: '2.9%/3.2%',
        actualValue: null,
        unit: '%',
        description: 'CPI和核心CPI是衡量通胀的核心指标，直接影响美联储利率决策。',
        impact: 'CPI高于预期可能推迟降息，利好美元。',
        publishAgency: '美国劳工统计局',
        frequency: '每月'
    },
    {
        id: 'econ-us-5',
        date: '2026-03-14',
        time: '20:30',
        title: '美国2月PPI/零售销售',
        country: '美国',
        countryCode: 'US',
        importance: 'high',
        type: 'economic',
        previousValue: '0.4%/-0.9%',
        forecastValue: '0.3%/0.3%',
        actualValue: null,
        unit: '%',
        description: 'PPI反映生产端通胀，零售销售反映消费支出状况。',
        impact: '数据影响美联储对经济和通胀的判断。',
        publishAgency: '美国劳工统计局/商务部',
        frequency: '每月'
    },
    {
        id: 'econ-us-6',
        date: '2026-03-19',
        time: '02:00',
        title: '美联储FOMC利率决议',
        country: '美国',
        countryCode: 'US',
        importance: 'high',
        type: 'central-bank',
        previousValue: '4.50%',
        forecastValue: '4.50%',
        actualValue: null,
        unit: '%',
        description: 'FOMC会议决定美国基准利率，点阵图展示未来利率预期。',
        impact: '降息预期利好风险资产和黄金；鹰派表态利好美元。',
        publishAgency: '美联储',
        frequency: '每季度'
    },
    // 欧元区数据
    {
        id: 'econ-eu-1',
        date: '2026-03-03',
        time: '17:00',
        title: '欧元区2月制造业PMI终值',
        country: '欧元区',
        countryCode: 'EU',
        importance: 'medium',
        type: 'economic',
        previousValue: '47.3',
        forecastValue: '47.3',
        actualValue: null,
        unit: '',
        description: '欧元区制造业PMI反映欧元区制造业景气度。',
        impact: '数据影响欧元汇率和欧洲股市。',
        publishAgency: 'S&P Global',
        frequency: '每月'
    },
    {
        id: 'econ-eu-2',
        date: '2026-03-07',
        time: '18:00',
        title: '欧元区四季度GDP终值',
        country: '欧元区',
        countryCode: 'EU',
        importance: 'high',
        type: 'economic',
        previousValue: '0.1%',
        forecastValue: '0.1%',
        actualValue: null,
        unit: '%',
        description: '欧元区GDP反映经济增长状况，是重要经济指标。',
        impact: '数据影响欧元汇率和欧央行政策预期。',
        publishAgency: '欧盟统计局',
        frequency: '每季度'
    },
    {
        id: 'econ-eu-3',
        date: '2026-03-10',
        time: '18:00',
        title: '欧元区2月CPI初值',
        country: '欧元区',
        countryCode: 'EU',
        importance: 'high',
        type: 'economic',
        previousValue: '2.5%',
        forecastValue: '2.4%',
        actualValue: null,
        unit: '%',
        description: '欧元区CPI是欧洲央行制定货币政策的关键指标。',
        impact: '通胀数据影响欧央行降息预期。',
        publishAgency: '欧盟统计局',
        frequency: '每月'
    },
    {
        id: 'econ-eu-4',
        date: '2026-03-13',
        time: '21:15',
        title: '欧洲央行利率决议',
        country: '欧元区',
        countryCode: 'EU',
        importance: 'high',
        type: 'central-bank',
        previousValue: '2.50%',
        forecastValue: '2.50%',
        actualValue: null,
        unit: '%',
        description: '欧洲央行利率决议决定欧元区基准利率。',
        impact: '降息预期利空欧元；鹰派表态利好欧元。',
        publishAgency: '欧洲央行',
        frequency: '每月'
    },
    // 日本数据
    {
        id: 'econ-jp-1',
        date: '2026-03-03',
        time: '07:50',
        title: '日本四季度GDP终值',
        country: '日本',
        countryCode: 'JP',
        importance: 'high',
        type: 'economic',
        previousValue: '0.7%',
        forecastValue: '0.7%',
        actualValue: null,
        unit: '%',
        description: '日本GDP反映经济增长状况，影响日本央行政策预期。',
        impact: '数据强劲可能支撑日元走强。',
        publishAgency: '日本内阁府',
        frequency: '每季度'
    },
    {
        id: 'econ-jp-2',
        date: '2026-03-07',
        time: '07:30',
        title: '日本1月劳工现金收入',
        country: '日本',
        countryCode: 'JP',
        importance: 'medium',
        type: 'economic',
        previousValue: '3.8%',
        forecastValue: '3.5%',
        actualValue: null,
        unit: '%',
        description: '工资增长数据反映日本收入状况，影响消费和通胀预期。',
        impact: '工资增长强劲可能支撑日本央行加息预期。',
        publishAgency: '日本厚生劳动省',
        frequency: '每月'
    },
    {
        id: 'econ-jp-3',
        date: '2026-03-10',
        time: '07:50',
        title: '日本四季度GDP修正值',
        country: '日本',
        countryCode: 'JP',
        importance: 'medium',
        type: 'economic',
        previousValue: '0.7%',
        forecastValue: '0.8%',
        actualValue: null,
        unit: '%',
        description: 'GDP修正值是对初值的更新，可能影响市场预期。',
        impact: '数据影响日元汇率。',
        publishAgency: '日本内阁府',
        frequency: '每季度'
    },
    {
        id: 'econ-jp-4',
        date: '2026-03-14',
        time: '07:30',
        title: '日本2月CPI/核心CPI',
        country: '日本',
        countryCode: 'JP',
        importance: 'high',
        type: 'economic',
        previousValue: '3.2%/3.2%',
        forecastValue: '3.1%/3.0%',
        actualValue: null,
        unit: '%',
        description: '日本CPI是日本央行关注的核心通胀指标。',
        impact: '通胀高于预期可能加速日本央行加息预期。',
        publishAgency: '日本总务省',
        frequency: '每月'
    },
    {
        id: 'econ-jp-5',
        date: '2026-03-19',
        time: '11:00',
        title: '日本央行利率决议',
        country: '日本',
        countryCode: 'JP',
        importance: 'high',
        type: 'central-bank',
        previousValue: '0.50%',
        forecastValue: '0.50%',
        actualValue: null,
        unit: '%',
        description: '日本央行利率决议决定日本基准利率，影响日元汇率。',
        impact: '加息预期利好日元；维持宽松则压低日元。',
        publishAgency: '日本央行',
        frequency: '每月'
    }
];

// ========================================
// DOM 元素（在DOMContentLoaded后初始化）
// ========================================
let timelineContainer;
let majorEventsList;
let modalOverlay;
let modalClose;
let economicCalendarList;
let geopoliticalAlertList;
let majorEventMarkers = []; // 重大事件标记

// 事件类型映射
const eventTypeMap = {
    'geopolitical': { name: '地缘冲突', icon: '⚠️', color: '#dc2626' },
    'political': { name: '政治选举', icon: '🏛️', color: '#8b5cf6' },
    'central-bank': { name: '央行会议', icon: '🏦', color: '#ef4444' },
    'summit': { name: '国际峰会', icon: '🤝', color: '#10b981' },
    'trade': { name: '贸易协定', icon: '📈', color: '#f59e0b' },
    'economic': { name: '经济数据', icon: '📊', color: '#3b82f6' }
};

// 重要性映射
const importanceMap = {
    'high': { name: '高', color: '#ef4444' },
    'medium': { name: '中', color: '#f59e0b' },
    'low': { name: '低', color: '#10b981' }
};

// 地缘状态映射
const geoStatusMap = {
    'escalated': { name: '紧张升级', class: 'escalated' },
    'stable': { name: '相对稳定', class: 'stable' },
    'de-escalated': { name: '缓和', class: 'de-escalated' }
};

// ========================================
// 初始化
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded 事件触发');

    // 初始化DOM元素
    timelineContainer = document.getElementById('timeline');
    majorEventsList = document.getElementById('majorEventsList');
    modalOverlay = document.getElementById('modalOverlay');
    modalClose = document.getElementById('modalClose');
    economicCalendarList = document.getElementById('economicCalendarList');
    geopoliticalAlertList = document.getElementById('geopoliticalAlertList');

    console.log('DOM元素:', {
        timelineContainer,
        majorEventsList,
        modalOverlay,
        economicCalendarList,
        geopoliticalAlertList
    });

    // 确保eventsData已加载
    if (typeof eventsData === 'undefined') {
        console.error('eventsData 未定义!');
        return;
    }
    currentEvents = [...eventsData];
    console.log('事件数据加载完成，共', currentEvents.length, '条');

    try {
        initMap();
        console.log('地图初始化完成');
    } catch (e) {
        console.error('地图初始化失败:', e);
    }

    try {
        initTimeline();
        console.log('时间轴初始化完成');
    } catch (e) {
        console.error('时间轴初始化失败:', e);
    }

    try {
        initMajorEvents();
        console.log('重大事件初始化完成');
    } catch (e) {
        console.error('重大事件初始化失败:', e);
    }

    try {
        initEventListeners();
        console.log('事件监听器初始化完成');
    } catch (e) {
        console.error('事件监听器初始化失败:', e);
    }

    try {
        initEconomicCalendar();
        console.log('经济日历初始化完成');
    } catch (e) {
        console.error('经济日历初始化失败:', e);
    }

    try {
        initEconDataRegions();
        console.log('经济数据区域初始化完成');
    } catch (e) {
        console.error('经济数据区域初始化失败:', e);
    }

    try {
        initMobileLegend();
        console.log('移动端图例初始化完成');
    } catch (e) {
        console.error('移动端图例初始化失败:', e);
    }

    console.log('所有初始化完成');
});

// ========================================
// 移动端图例初始化
// ========================================
function initMobileLegend() {
    const mobileLegendBtn = document.getElementById('mobileLegendBtn');
    const mobileLegendOverlay = document.getElementById('mobileLegendOverlay');
    const mobileLegendClose = document.getElementById('mobileLegendClose');

    if (!mobileLegendBtn || !mobileLegendOverlay || !mobileLegendClose) {
        console.log('移动端图例元素未找到，跳过初始化');
        return;
    }

    // 打开图例
    mobileLegendBtn.addEventListener('click', () => {
        mobileLegendOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    // 关闭图例
    mobileLegendClose.addEventListener('click', () => {
        mobileLegendOverlay.style.display = 'none';
        document.body.style.overflow = '';
    });

    // 点击遮罩关闭
    mobileLegendOverlay.addEventListener('click', (e) => {
        if (e.target === mobileLegendOverlay) {
            mobileLegendOverlay.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
}

// ========================================
// 移动端优化：处理屏幕方向变化
// ========================================
function handleOrientationChange() {
    // 延迟执行以确保浏览器完成方向变化
    setTimeout(() => {
        if (map) {
            map.invalidateSize();
        }

        // 更新视口高度CSS变量（解决移动端地址栏问题）
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }, 100);
}

// 初始化视口高度
function initViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// 监听方向变化
window.addEventListener('orientationchange', handleOrientationChange);
window.addEventListener('resize', () => {
    // 防抖处理
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(handleOrientationChange, 250);
});

// 页面加载时初始化视口高度
initViewportHeight();

// ========================================
// Leaflet 地图初始化 - 类似CFR风格
// ========================================
function initMap() {
    // 创建地图实例，使用类似CFR的地图样式
    map = L.map('worldMap', {
        center: [20, 0],
        zoom: 2,
        minZoom: 1,
        maxZoom: 8,
        zoomControl: true,
        attributionControl: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        touchZoom: true
    });

    // 添加地图图层 - 使用CartoDB Positron样式（类似CFR的简洁风格）
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);

    // 添加事件标记
    addEventMarkers();

    // 绑定地图控制按钮
    document.getElementById('zoomIn').addEventListener('click', () => map.zoomIn());
    document.getElementById('zoomOut').addEventListener('click', () => map.zoomOut());
    document.getElementById('resetView').addEventListener('click', () => map.setView([20, 0], 2));
}

// 将 x/y 百分比坐标转换为经纬度（优化后的映射）
function coordinatesToLatLng(x, y) {
    // 原始坐标系统说明：
    // x: 0-100 对应从美洲到亚洲（经度 -170 到 180）
    // y: 0-100 对应从北极到南极（纬度 75 到 -60）

    // 改进的坐标转换公式
    // x 转换：线性映射到经度
    const lng = (x / 100) * 350 - 175;  // -175 到 175

    // y 转换：线性映射到纬度
    const lat = 75 - (y / 100) * 135;  // 75 到 -60

    return [lat, lng];
}

// 根据国家/地区名称获取精确坐标
function getPreciseCoordinates(event) {
    // 多国冲突的特殊坐标（冲突发生地）
    const conflictLocationCoords = {
        29: { lat: 30.0, lng: 125.0 },   // 中日战略对抗 - 东海中部
        10: { lat: 28.0, lng: 75.0 },    // 印巴冲突 - 克什米尔
        6: { lat: 12.0, lng: 115.0 },    // 南海争端 - 南海中心
        19: { lat: 38.0, lng: 42.0 },    // 土耳其库尔德 - 土耳其东部
        28: { lat: 40.0, lng: 46.0 },    // 亚美尼亚阿塞拜疆 - 纳卡地区
    };

    // 如果是特定的多国冲突事件，使用冲突地点坐标
    if (conflictLocationCoords[event.id]) {
        return [conflictLocationCoords[event.id].lat, conflictLocationCoords[event.id].lng];
    }

    // 主要国家/地区的精确经纬度坐标
    const countryCoords = {
        // 亚洲
        'CN': { lat: 35.0, lng: 105.0 },      // 中国中心
        'TW': { lat: 23.5, lng: 121.0 },      // 台湾
        'JP': { lat: 36.0, lng: 138.0 },      // 日本
        'KP': { lat: 40.0, lng: 127.5 },      // 朝鲜
        'KR': { lat: 36.5, lng: 127.5 },      // 韩国
        'IN': { lat: 20.0, lng: 77.0 },       // 印度
        'PK': { lat: 30.0, lng: 70.0 },       // 巴基斯坦
        'AF': { lat: 34.0, lng: 66.0 },       // 阿富汗
        'PH': { lat: 12.0, lng: 122.0 },      // 菲律宾
        'VN': { lat: 16.0, lng: 108.0 },      // 越南
        'ID': { lat: -2.0, lng: 118.0 },      // 印尼
        'MY': { lat: 4.0, lng: 109.0 },       // 马来西亚
        'BN': { lat: 4.5, lng: 114.5 },       // 文莱

        // 中东
        'IR': { lat: 32.0, lng: 53.0 },       // 伊朗
        'IL': { lat: 31.5, lng: 35.0 },       // 以色列
        'PS': { lat: 31.9, lng: 35.2 },       // 巴勒斯坦
        'LB': { lat: 33.8, lng: 35.8 },       // 黎巴嫩
        'SY': { lat: 35.0, lng: 38.5 },       // 叙利亚
        'IQ': { lat: 33.0, lng: 44.0 },       // 伊拉克
        'SA': { lat: 24.0, lng: 45.0 },       // 沙特
        'YE': { lat: 15.5, lng: 48.0 },       // 也门
        'AE': { lat: 24.0, lng: 54.0 },       // 阿联酋

        // 欧洲
        'RU': { lat: 60.0, lng: 100.0 },      // 俄罗斯
        'UA': { lat: 48.5, lng: 37.5 },       // 乌克兰
        'GB': { lat: 55.0, lng: -3.0 },       // 英国
        'DE': { lat: 51.0, lng: 10.0 },       // 德国
        'FR': { lat: 46.0, lng: 2.0 },        // 法国

        // 美洲
        'US': { lat: 39.0, lng: -98.0 },      // 美国
        'CA': { lat: 56.0, lng: -106.0 },     // 加拿大
        'MX': { lat: 23.0, lng: -102.0 },     // 墨西哥
        'VE': { lat: 7.0, lng: -66.0 },       // 委内瑞拉
        'BR': { lat: -10.0, lng: -55.0 },     // 巴西
        'HT': { lat: 18.9, lng: -72.3 },      // 海地
        'GT': { lat: 15.5, lng: -90.3 },      // 危地马拉
        'HN': { lat: 15.0, lng: -86.5 },      // 洪都拉斯
        'SV': { lat: 13.8, lng: -88.9 },      // 萨尔瓦多

        // 非洲
        'SD': { lat: 16.0, lng: 30.0 },       // 苏丹
        'ET': { lat: 9.0, lng: 39.0 },        // 埃塞俄比亚
        'SO': { lat: 5.0, lng: 46.0 },        // 索马里
        'CF': { lat: 6.5, lng: 20.0 },        // 中非
        'CD': { lat: -2.5, lng: 23.5 },       // 刚果金
        'ZA': { lat: -29.0, lng: 24.0 },      // 南非
        'LY': { lat: 27.0, lng: 17.0 },       // 利比亚
        'ML': { lat: 17.0, lng: -4.0 },       // 马里
        'NE': { lat: 18.0, lng: 9.0 },        // 尼日尔
        'BF': { lat: 12.5, lng: -1.5 },       // 布基纳法索
        'NG': { lat: 9.0, lng: 8.0 },         // 尼日利亚
        'TD': { lat: 15.5, lng: 19.0 },       // 乍得
        'SS': { lat: 7.0, lng: 30.0 },        // 南苏丹
        'ER': { lat: 15.0, lng: 39.0 },       // 厄立特里亚
        'EG': { lat: 26.0, lng: 30.0 },       // 埃及

        // 大洋洲
        'AU': { lat: -25.0, lng: 135.0 },     // 澳大利亚
        'NZ': { lat: -41.0, lng: 174.0 },     // 新西兰

        // 其他
        'MM': { lat: 21.0, lng: 96.0 },       // 缅甸
        'TR': { lat: 39.0, lng: 35.0 },       // 土耳其
        'AM': { lat: 40.0, lng: 45.0 },       // 亚美尼亚
        'AZ': { lat: 40.5, lng: 47.5 },       // 阿塞拜疆
    };

    // 如果有国家代码，使用精确坐标
    if (event.countries && event.countries.length > 0) {
        const primaryCountry = event.countries[0];
        if (countryCoords[primaryCountry]) {
            return [countryCoords[primaryCountry].lat, countryCoords[primaryCountry].lng];
        }
    }

    // 否则使用x/y坐标转换
    return coordinatesToLatLng(event.coordinates.x, event.coordinates.y);
}

// 添加事件标记到地图
function addEventMarkers() {
    // 清除现有标记
    markers.forEach(m => map.removeLayer(m));
    markers = [];

    currentEvents.forEach(event => {
        const [lat, lng] = getPreciseCoordinates(event);
        const marker = createLeafletMarker(event, lat, lng);
        markers.push(marker);
    });
}

// 创建 Leaflet 标记
function createLeafletMarker(event, lat, lng) {
    const typeInfo = eventTypeMap[event.type] || { name: '其他', color: '#64748b', icon: '📍' };

    // 根据CFR影响级别确定颜色和样式
    let impactColor = '#64748b';
    let impactClass = 'limited';

    if (event.cfrImpact === 'Critical') {
        impactColor = '#dc2626';
        impactClass = 'critical';
    } else if (event.cfrImpact === 'Significant') {
        impactColor = '#f59e0b';
        impactClass = 'significant';
    } else if (event.cfrImpact === 'Limited') {
        impactColor = '#10b981';
        impactClass = 'limited';
    }

    // 根据状态确定指示器
    let statusIndicator = '●';
    if (event.cfrStatus === 'Worsening') {
        statusIndicator = '▼';
    } else if (event.cfrStatus === 'Improving') {
        statusIndicator = '▲';
    }

    // Critical级别显示完整标签，其他级别只显示圆点
    let iconHtml, iconSize, iconAnchor;

    if (event.cfrImpact === 'Critical') {
        // Critical: 显示完整标签（仅事件名称）
        iconHtml = `
            <div class="cfr-marker ${impactClass}">
                <div class="marker-dot"></div>
                <div class="marker-label">${event.title}</div>
            </div>
        `;
        iconSize = [150, 40];
        iconAnchor = [10, 20];
    } else {
        // Significant/Limited: 只显示圆点
        const dotSize = event.cfrImpact === 'Significant' ? 14 : 10;
        iconHtml = `
            <div class="cfr-dot-marker ${impactClass}" style="width:${dotSize}px;height:${dotSize}px;" title="${event.title}">
            </div>
        `;
        iconSize = [dotSize, dotSize];
        iconAnchor = [dotSize/2, dotSize/2];
    }

    const customIcon = L.divIcon({
        html: iconHtml,
        className: '',
        iconSize: iconSize,
        iconAnchor: iconAnchor
    });

    // 创建标记
    const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

    // 点击标记时打开详情弹窗
    marker.on('click', function() {
        currentEventId = event.id;
        openEventModal(event);
    });

    return marker;
}

// 过滤并更新地图标记
function updateMapMarkers() {
    addEventMarkers();
}

// ========================================
// 时间轴初始化
// ========================================
function initTimeline() {
    // 按日期排序
    const sortedEvents = [...currentEvents]
        .filter(event => event.date)
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    const today = new Date('2026-02-26');
    const futureEvents = sortedEvents.filter(event =>
        new Date(event.date) >= today
    ).slice(0, 10);

    timelineContainer.innerHTML = '';

    // 先添加地缘冲突（无日期）
    const geopoliticalEvents = currentEvents.filter(e => e.type === 'geopolitical');
    geopoliticalEvents.slice(0, 3).forEach(event => {
        const item = createTimelineItem(event, true);
        timelineContainer.appendChild(item);
    });

    // 再添加有日期的事件
    futureEvents.forEach(event => {
        const item = createTimelineItem(event, false);
        timelineContainer.appendChild(item);
    });
}

function createTimelineItem(event, isGeopolitical) {
    const item = document.createElement('div');
    item.className = `timeline-item ${event.type}`;
    item.dataset.eventId = event.id;

    let dateStr = '持续中';
    if (event.date) {
        const date = new Date(event.date);
        dateStr = formatEventDate(date);
    }

    item.innerHTML = `
        <div class="timeline-date">${dateStr}</div>
        <div class="timeline-content">
            <div class="timeline-title">${event.title}</div>
            <div class="timeline-location">📍 ${event.location}</div>
            <span class="timeline-importance ${event.importance}">
                ${importanceMap[event.importance].name}影响
            </span>
        </div>
    `;

    item.addEventListener('click', () => openEventModal(event));

    return item;
}

function formatEventDate(date) {
    const months = ['1月', '2月', '3月', '4月', '5月', '6月',
                   '7月', '8月', '9月', '10月', '11月', '12月'];
    return `${date.getFullYear()}年${months[date.getMonth()]}${date.getDate()}日`;
}

// ========================================
// 重大会议与事件模块
// ========================================

// 初始化重大事件列表和地图标记
function initMajorEvents() {
    console.log('initMajorEvents 开始');

    if (!majorEventsList) {
        console.error('majorEventsList 元素未找到');
        return;
    }

    // 确保majorEventsData已加载
    if (typeof majorEventsData === 'undefined') {
        console.error('majorEventsData 未定义!');
        return;
    }

    // 按日期排序
    const sortedEvents = [...majorEventsData].sort((a, b) =>
        new Date(a.date) - new Date(b.date)
    );

    console.log('重大事件数据:', sortedEvents.length, '条');

    // 渲染右侧列表
    majorEventsList.innerHTML = '';
    sortedEvents.forEach(event => {
        const item = createMajorEventItem(event);
        majorEventsList.appendChild(item);
    });

    // 添加地图标记
    addMajorEventMarkers(sortedEvents);
}

// 创建重大事件列表项
function createMajorEventItem(event) {
    const item = document.createElement('div');
    item.className = `major-event-item ${event.importance}`;
    item.dataset.eventId = event.id;

    const eventDate = new Date(event.date);
    const dateStr = `${eventDate.getFullYear()}.${String(eventDate.getMonth() + 1).padStart(2, '0')}.${String(eventDate.getDate()).padStart(2, '0')}`;

    // 事件类型图标
    const typeInfo = getMajorEventTypeIcon(event.eventType);

    // 重要性标记
    const importanceBadge = event.importance === 'high' ?
        '<span class="importance-badge high">★</span>' :
        '<span class="importance-badge medium">☆</span>';

    item.innerHTML = `
        <div class="major-event-date">${dateStr}</div>
        <div class="major-event-icon">${typeInfo.icon}</div>
        <div class="major-event-content">
            <div class="major-event-title">${event.title}</div>
            <div class="major-event-location">📍 ${event.location}</div>
        </div>
        ${importanceBadge}
    `;

    item.addEventListener('click', () => openMajorEventModal(event));

    return item;
}

// 获取重大事件类型图标
function getMajorEventTypeIcon(type) {
    const icons = {
        'political': { name: '政治会议', icon: '🏛️', color: '#8b5cf6' },
        'diplomatic': { name: '外交活动', icon: '🤝', color: '#10b981' },
        'financial': { name: '金融会议', icon: '🏦', color: '#ef4444' },
        'economic': { name: '经济合作', icon: '📈', color: '#f59e0b' }
    };
    return icons[type] || { name: '其他', icon: '📅', color: '#64748b' };
}

// 添加重大事件地图标记
function addMajorEventMarkers(events) {
    // 清除现有标记
    majorEventMarkers.forEach(m => map.removeLayer(m));
    majorEventMarkers = [];

    // 按位置分组，检测重叠
    const locationGroups = {};

    events.forEach((event, index) => {
        const coords = getMajorEventCoordinates(event);
        if (coords) {
            // 创建位置键（四舍五入到整数度数来分组相近位置）
            const locationKey = `${Math.round(coords.lat)}_${Math.round(coords.lng)}`;

            if (!locationGroups[locationKey]) {
                locationGroups[locationKey] = {
                    baseCoords: coords,
                    events: []
                };
            }
            locationGroups[locationKey].events.push({ event, index });
        }
    });

    // 为每个位置组内的标记应用偏移
    Object.values(locationGroups).forEach(group => {
        const count = group.events.length;

        group.events.forEach((item, idx) => {
            const { event, index } = item;
            const baseCoords = group.baseCoords;

            // 根据同位置标记数量计算偏移（在国家区域内分散）
            let lat = baseCoords.lat;
            let lng = baseCoords.lng;

            if (count > 1) {
                // 计算偏移量，保持在国家区域内（约2-5度范围内）
                const spacing = 3; // 度数间隔
                const row = Math.floor(idx / 2);
                const col = idx % 2;
                const totalRows = Math.ceil(count / 2);

                // 居中分布
                const latOffset = (row - (totalRows - 1) / 2) * spacing;
                const lngOffset = (col - 0.5) * spacing * 1.5;

                lat = baseCoords.lat + latOffset;
                lng = baseCoords.lng + lngOffset;
            }

            const marker = createMajorEventMarker(event, lat, lng, index);
            majorEventMarkers.push(marker);
        });
    });
}

// 获取重大事件坐标
function getMajorEventCoordinates(event) {
    // 如果有直接指定的坐标
    if (event.coordinates && event.coordinates.lat && event.coordinates.lng) {
        return event.coordinates;
    }

    // 主要国家/地区的精确经纬度坐标
    const countryCoords = {
        // 亚洲
        'CN': { lat: 35.0, lng: 105.0 },      // 中国中心
        'JP': { lat: 36.0, lng: 138.0 },      // 日本
        'KR': { lat: 36.5, lng: 127.5 },      // 韩国
        'IN': { lat: 20.0, lng: 77.0 },       // 印度
        'ID': { lat: -2.0, lng: 118.0 },      // 印尼
        'MY': { lat: 4.0, lng: 109.0 },       // 马来西亚
        'SG': { lat: 1.3, lng: 103.8 },       // 新加坡
        'TH': { lat: 15.0, lng: 101.0 },      // 泰国
        'VN': { lat: 16.0, lng: 108.0 },      // 越南
        'PH': { lat: 12.0, lng: 122.0 },      // 菲律宾

        // 欧洲
        'DE': { lat: 51.0, lng: 10.0 },       // 德国
        'FR': { lat: 46.0, lng: 2.0 },        // 法国
        'GB': { lat: 55.0, lng: -3.0 },       // 英国
        'IT': { lat: 42.0, lng: 12.0 },       // 意大利

        // 美洲
        'US': { lat: 39.0, lng: -98.0 },      // 美国
        'CA': { lat: 56.0, lng: -106.0 },     // 加拿大
        'BR': { lat: -10.0, lng: -55.0 },     // 巴西
        'MX': { lat: 23.0, lng: -102.0 },     // 墨西哥

        // 其他
        'AU': { lat: -25.0, lng: 135.0 },     // 澳大利亚
        'NZ': { lat: -41.0, lng: 174.0 },     // 新西兰
        'ZA': { lat: -29.0, lng: 24.0 },      // 南非
        'RU': { lat: 60.0, lng: 100.0 },      // 俄罗斯
        'SA': { lat: 24.0, lng: 45.0 },       // 沙特
        'TR': { lat: 39.0, lng: 35.0 },       // 土耳其
        'AR': { lat: -35.0, lng: -64.0 },     // 阿根廷
    };

    // 使用第一个国家的坐标
    if (event.countries && event.countries.length > 0) {
        const primaryCountry = event.countries[0];
        if (countryCoords[primaryCountry]) {
            return countryCoords[primaryCountry];
        }
    }

    return null;
}

// 创建重大事件地图标记
function createMajorEventMarker(event, lat, lng, index) {
    const typeInfo = getMajorEventTypeIcon(event.eventType);

    // 使用菱形图标+文字标签，与地缘冲突圆形图标区分
    const iconHtml = `
        <div class="major-event-marker-container">
            <div class="major-marker-diamond" style="background-color: ${typeInfo.color}">
                <span class="diamond-icon">${typeInfo.icon}</span>
            </div>
            <div class="major-marker-text">${event.title}</div>
        </div>
    `;

    const customIcon = L.divIcon({
        html: iconHtml,
        className: '',
        iconSize: [160, 28],
        iconAnchor: [0, 14]
    });

    const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

    marker.on('click', function() {
        openMajorEventModal(event);
    });

    return marker;
}

// 打开重大事件详情弹窗
function openMajorEventModal(event) {
    currentEventId = event.id;
    currentTab = 'overview';

    const typeInfo = getMajorEventTypeIcon(event.eventType);

    // 填充基本信息
    const eventTypeEl = document.getElementById('modalEventType');
    eventTypeEl.textContent = typeInfo.name;
    eventTypeEl.className = `modal-event-type ${event.eventType}`;

    document.getElementById('modalTitle').textContent = event.title;
    document.getElementById('modalLocation').textContent = event.location;

    // 日期
    const dateStr = formatEventDate(new Date(event.date));
    const endDateStr = event.endDate ? ` - ${formatEventDate(new Date(event.endDate))}` : '';
    document.getElementById('modalDate').textContent = dateStr + endDateStr;

    document.getElementById('modalImportance').textContent =
        event.importance === 'high' ? '高影响' : '中影响';

    // 概述标签页
    document.getElementById('modalSummary').textContent = event.summary;

    // 市场影响
    let impactHtml = '';
    if (event.marketImpact && Array.isArray(event.marketImpact)) {
        event.marketImpact.forEach(item => {
            impactHtml += `
                <div class="impact-item">
                    <span class="impact-direction neutral">• ${item}</span>
                </div>
            `;
        });
    }
    document.getElementById('modalImpact').innerHTML = impactHtml || '<p class="empty-hint">暂无影响分析</p>';

    // 时间线
    let historyHtml = '';
    if (event.history && event.history.length > 0) {
        event.history.forEach(item => {
            historyHtml += `
                <div class="history-item">
                    <span class="history-date">${item.date}</span>
                    <span class="history-content">${item.content}</span>
                </div>
            `;
        });
    } else {
        historyHtml = '<p class="empty-hint">暂无历史记录</p>';
    }
    document.getElementById('modalHistory').innerHTML = historyHtml;

    // 后续关注点
    let futureHtml = '';
    if (event.futureKeyDates && event.futureKeyDates.length > 0) {
        event.futureKeyDates.forEach(item => {
            const date = new Date(item.date);
            const dateStr = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
            futureHtml += `
                <div class="future-date-item">
                    <span class="date">${dateStr}</span>
                    <span class="event">${item.event}</span>
                </div>
            `;
        });
    } else {
        futureHtml = '<p class="empty-hint">暂无后续关注点</p>';
    }
    document.getElementById('modalFutureDates').innerHTML = futureHtml;

    // 前瞻标签页
    if (event.outlook) {
        document.getElementById('modalOutlookExpectation').textContent = event.outlook.expectation || '暂无市场预期信息';

        let keyPointsHtml = '';
        if (event.outlook.keyPoints) {
            event.outlook.keyPoints.forEach(point => {
                keyPointsHtml += `<li>${point}</li>`;
            });
        }
        document.getElementById('modalKeyPoints').innerHTML = keyPointsHtml || '<li class="empty-hint">暂无关注要点</li>';
    } else {
        document.getElementById('modalOutlookExpectation').textContent = '暂无市场预期信息';
        document.getElementById('modalKeyPoints').innerHTML = '<li class="empty-hint">暂无关注要点</li>';
    }

    // 隐藏地缘冲突专属模块
    const geoSection = document.getElementById('geopoliticalSection');
    geoSection.style.display = 'none';

    // 新闻标签页
    let newsHtml = '';
    if (event.newsLinks && event.newsLinks.length > 0) {
        event.newsLinks.forEach(link => {
            newsHtml += `<a href="${link.url}" target="_blank" class="news-link">${link.title}</a>`;
        });
    } else {
        newsHtml = '<p class="empty-hint">暂无新闻链接</p>';
    }
    document.getElementById('modalNewsLinks').innerHTML = newsHtml;

    // 相关报道
    let relatedNewsHtml = '';
    if (event.relatedNews && event.relatedNews.length > 0) {
        event.relatedNews.forEach(news => {
            relatedNewsHtml += `
                <div class="related-news-item">
                    <span class="news-date">${news.date}</span>
                    <span class="news-title">${news.title}</span>
                    <span class="news-source">${news.source}</span>
                </div>
            `;
        });
    } else {
        relatedNewsHtml = '<p class="empty-hint">暂无相关报道</p>';
    }
    const relatedNewsEl = document.getElementById('modalRelatedNews');
    if (relatedNewsEl) {
        relatedNewsEl.innerHTML = relatedNewsHtml;
    }

    // 其他信息标签页
    if (event.analysis) {
        document.getElementById('modalBackground').innerHTML = `<p>${event.analysis}</p>`;
    } else {
        document.getElementById('modalBackground').innerHTML = '<p class="empty-hint">暂无背景信息</p>';
    }

    // 重置到概述标签页
    switchTab('overview');

    // 显示弹窗
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ========================================
// 未来一周关注模块
// ========================================

// 初始化经济日历
function initEconomicCalendar() {
    console.log('initEconomicCalendar 开始');
    if (!economicCalendarList) {
        console.error('economicCalendarList 元素未找到');
        return;
    }

    const today = new Date('2026-02-26');
    const oneWeekLater = new Date(today);
    oneWeekLater.setDate(today.getDate() + 14); // 显示未来两周

    console.log('经济日历数据:', economicCalendarData);
    console.log('筛选日期范围:', today, '到', oneWeekLater);

    const filteredEvents = economicCalendarData.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= today && eventDate <= oneWeekLater;
    });

    console.log('筛选后事件数量:', filteredEvents.length);

    economicCalendarList.innerHTML = '';

    if (filteredEvents.length === 0) {
        economicCalendarList.innerHTML = '<div class="calendar-empty">暂无重要经济数据</div>';
        return;
    }

    filteredEvents.forEach(event => {
        const item = createCalendarItem(event);
        economicCalendarList.appendChild(item);
    });
    console.log('经济日历项已添加');
}

// 创建日历项 - 金十数据风格紧凑布局
function createCalendarItem(event) {
    const item = document.createElement('div');
    item.className = `calendar-item ${event.importance} ${event.type}`;
    item.dataset.eventId = event.id;

    const eventDate = new Date(event.date);
    const dateStr = `${eventDate.getMonth() + 1}/${eventDate.getDate()}`;
    const weekDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][eventDate.getDay()];

    // 国旗图标
    const countryFlag = getCountryFlag(event.countryCode || 'US');

    // 重要性星级
    const starCount = event.importance === 'high' ? 3 : event.importance === 'medium' ? 2 : 1;
    let starsHtml = '';
    for (let i = 0; i < 3; i++) {
        starsHtml += `<svg class="calendar-star ${i < starCount ? 'active' : ''}" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
    }

    // 数值显示
    let valuesHtml = '';
    if (event.previousValue || event.forecastValue) {
        valuesHtml = `
            <div class="calendar-values">
                <div class="calendar-value-row">
                    <span class="calendar-value-label">前值</span>
                    <span class="calendar-value-num">${event.previousValue || '--'}</span>
                </div>
                <div class="calendar-value-row">
                    <span class="calendar-value-label">预测</span>
                    <span class="calendar-value-num">${event.forecastValue || '--'}</span>
                </div>
            </div>
        `;
    }

    item.innerHTML = `
        <div class="calendar-time-col">
            <div class="calendar-date-num">${dateStr}</div>
            <div class="calendar-date-week">${weekDay}</div>
            <div class="calendar-time">${event.time}</div>
        </div>
        <div class="calendar-flag">${countryFlag}</div>
        <div class="calendar-content">
            <div class="calendar-title">${event.title}</div>
            <div class="calendar-country">${event.country}</div>
            <div class="calendar-importance ${event.importance}">
                ${starsHtml}
            </div>
        </div>
        ${valuesHtml}
    `;

    // 点击打开详情弹窗
    item.addEventListener('click', () => openEconomicModal(event));

    return item;
}

// 获取国旗图标
function getCountryFlag(code) {
    const flags = {
        'US': '🇺🇸',
        'CN': '🇨🇳',
        'JP': '🇯🇵',
        'EU': '🇪🇺',
        'GB': '🇬🇧',
        'DE': '🇩🇪',
        'FR': '🇫🇷',
        'ZA': '🇿🇦',
        'AU': '🇦🇺',
        'CA': '🇨🇦',
        'IN': '🇮🇳',
        'BR': '🇧🇷',
        'RU': '🇷🇺',
        'KR': '🇰🇷'
    };
    return flags[code] || '🌐';
}

// ========================================
// 经济数据详情弹窗 - 金十数据风格
// ========================================
function openEconomicModal(event) {
    const econModalOverlay = document.getElementById('economicModalOverlay');

    // 保存当前事件用于导出
    currentEconomicEvent = event;

    // 填充标题信息
    document.getElementById('econModalType').textContent = eventTypeMap[event.type]?.name || '经济数据';
    document.getElementById('econModalType').className = `modal-event-type ${event.type}`;
    document.getElementById('econModalTitle').textContent = event.title;

    // 日期时间
    const eventDate = new Date(event.date);
    const dateStr = `${eventDate.getFullYear()}年${eventDate.getMonth() + 1}月${eventDate.getDate()}日`;
    document.getElementById('econModalDate').textContent = `${dateStr} ${event.time}`;
    document.getElementById('econModalCountry').textContent = event.country;
    document.getElementById('econModalImportance').textContent =
        event.importance === 'high' ? '高重要性 ★★★' :
        event.importance === 'medium' ? '中重要性 ★★' : '低重要性 ★';

    // 数值展示
    document.getElementById('econPrevValue').textContent = event.previousValue || '--';
    document.getElementById('econForecastValue').textContent = event.forecastValue || '--';

    const actualValueEl = document.getElementById('econActualValue');
    if (event.actualValue) {
        actualValueEl.textContent = event.actualValue;
        // 比较实际值与预测值
        if (event.forecastValue && event.actualValue !== '--') {
            const actual = parseFloat(event.actualValue);
            const forecast = parseFloat(event.forecastValue);
            if (!isNaN(actual) && !isNaN(forecast)) {
                if (actual > forecast) {
                    actualValueEl.className = 'value better';
                } else if (actual < forecast) {
                    actualValueEl.className = 'value worse';
                }
            }
        }
    } else {
        actualValueEl.textContent = '待公布';
        actualValueEl.className = 'value';
    }

    // 数据释义
    document.getElementById('econDescription').textContent = event.description || '暂无数据释义';

    // 数据影响
    document.getElementById('econImpact').textContent = event.impact || '暂无数据影响分析';

    // 公布信息
    document.getElementById('econAgency').textContent = event.publishAgency || '--';
    document.getElementById('econFrequency').textContent = event.frequency || '--';

    // 下次公布日期（简单计算）
    if (event.frequency === '每月') {
        const nextDate = new Date(eventDate);
        nextDate.setMonth(nextDate.getMonth() + 1);
        document.getElementById('econNextDate').textContent =
            `${nextDate.getFullYear()}年${nextDate.getMonth() + 1}月`;
    } else {
        document.getElementById('econNextDate').textContent = '待定';
    }

    // 显示弹窗
    econModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeEconomicModal() {
    const econModalOverlay = document.getElementById('economicModalOverlay');
    econModalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// 获取类型图标
function getTypeIcon(type) {
    const icons = {
        'economic': '📊',
        'central-bank': '🏦',
        'summit': '🤝',
        'political': '🏛️',
        'trade': '📈',
        'geopolitical': '⚠️'
    };
    return icons[type] || '📅';
}

// 初始化地缘冲突预警
function initGeopoliticalAlerts() {
    console.log('initGeopoliticalAlerts 开始');
    if (!geopoliticalAlertList) {
        console.error('geopoliticalAlertList 元素未找到');
        return;
    }

    // 筛选CFR Critical级别的地缘冲突
    const criticalConflicts = eventsData.filter(event =>
        event.type === 'geopolitical' && (event.cfrImpact === 'Critical' || event.importance === 'high')
    );

    console.log('地缘冲突数据:', criticalConflicts.length, '条');

    geopoliticalAlertList.innerHTML = '';

    if (criticalConflicts.length === 0) {
        geopoliticalAlertList.innerHTML = '<div class="alert-empty">暂无地缘冲突预警</div>';
        return;
    }

    criticalConflicts.slice(0, 6).forEach(conflict => {
        const item = createAlertItem(conflict);
        geopoliticalAlertList.appendChild(item);
    });
    console.log('地缘预警项已添加');
}

// 创建预警项
function createAlertItem(conflict) {
    const item = document.createElement('div');
    item.className = `alert-item ${conflict.cfrImpact || conflict.importance}`;
    item.dataset.eventId = conflict.id;

    const statusClass = conflict.cfrStatus === 'Worsening' ? 'status-worsening' :
                        conflict.cfrStatus === 'Unchanging' ? 'status-stable' : 'status-improving';
    const statusText = conflict.cfrStatus === 'Worsening' ? '恶化' :
                       conflict.cfrStatus === 'Unchanging' ? '持续' : '改善';

    const impactBadge = conflict.cfrImpact === 'Critical' ?
        '<span class="impact-badge critical">Critical</span>' :
        '<span class="impact-badge significant">Significant</span>';

    item.innerHTML = `
        <div class="alert-header">
            <span class="alert-title">${conflict.title}</span>
            ${impactBadge}
        </div>
        <div class="alert-location">📍 ${conflict.location}</div>
        <div class="alert-status">
            <span class="status-indicator ${statusClass}"></span>
            <span class="status-text">${statusText}</span>
        </div>
    `;

    item.addEventListener('click', () => openEventModal(conflict));

    return item;
}

function createFocusItem(event, isGeopolitical) {
    const item = document.createElement('div');
    item.className = `focus-item ${event.importance} ${isGeopolitical ? 'geopolitical' : ''}`;

    let dateStr = '关注';
    if (event.date) {
        const date = new Date(event.date);
        dateStr = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
    }

    item.innerHTML = `
        <div class="focus-date">${dateStr}</div>
        <div class="focus-content">
            <span class="focus-tag ${event.type}">${eventTypeMap[event.type].name}</span>
            <span class="focus-text">${event.title}</span>
        </div>
    `;

    item.addEventListener('click', () => openEventModal(event));

    return item;
}

// ========================================
// 弹窗功能
// ========================================
function openEventModal(event) {
    currentEventId = event.id;
    currentTab = 'overview';

    // 填充基本信息
    const eventTypeEl = document.getElementById('modalEventType');
    eventTypeEl.textContent = eventTypeMap[event.type].name;
    eventTypeEl.className = `modal-event-type ${event.type}`;

    document.getElementById('modalTitle').textContent = event.title;
    document.getElementById('modalLocation').textContent = event.location;

    if (event.date) {
        const dateStr = formatEventDate(new Date(event.date));
        const endDateStr = event.endDate ? ` - ${formatEventDate(new Date(event.endDate))}` : '';
        document.getElementById('modalDate').textContent = dateStr + endDateStr;
    } else {
        document.getElementById('modalDate').textContent = '持续发展中';
    }

    document.getElementById('modalImportance').textContent =
        `${importanceMap[event.importance].name}影响`;

    // 概述标签页
    document.getElementById('modalSummary').textContent = event.summary;

    // 处理市场影响 - 支持两种数据格式
    let impactHtml = '';
    if (event.impact && typeof event.impact === 'object' && !Array.isArray(event.impact)) {
        // 旧格式: { market: { direction, note } }
        for (const [market, data] of Object.entries(event.impact)) {
            impactHtml += `
                <div class="impact-item">
                    <span class="impact-label">${market}</span>
                    <span class="impact-direction ${data.direction}">${data.note}</span>
                </div>
            `;
        }
    } else if (event.marketImpact && Array.isArray(event.marketImpact)) {
        // CFR格式: ['影响1', '影响2', ...]
        event.marketImpact.forEach(item => {
            impactHtml += `
                <div class="impact-item">
                    <span class="impact-direction neutral">• ${item}</span>
                </div>
            `;
        });
    }
    document.getElementById('modalImpact').innerHTML = impactHtml || '<p class="empty-hint">暂无影响分析</p>';

    // 时间线标签页
    let historyHtml = '';
    if (event.history && event.history.length > 0) {
        event.history.forEach(item => {
            historyHtml += `
                <div class="history-item">
                    <span class="history-date">${item.date}</span>
                    <span class="history-content">${item.content}</span>
                </div>
            `;
        });
    } else {
        historyHtml = '<p class="empty-hint">暂无历史记录</p>';
    }
    document.getElementById('modalHistory').innerHTML = historyHtml;

    // 后续关注点
    let futureHtml = '';
    if (event.futureKeyDates && event.futureKeyDates.length > 0) {
        event.futureKeyDates.forEach(item => {
            const date = new Date(item.date);
            const dateStr = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
            futureHtml += `
                <div class="future-date-item">
                    <span class="date">${dateStr}</span>
                    <span class="event">${item.event}</span>
                </div>
            `;
        });
    } else {
        futureHtml = '<p class="empty-hint">暂无后续关注点</p>';
    }
    document.getElementById('modalFutureDates').innerHTML = futureHtml;

    // 前瞻标签页
    if (event.outlook) {
        document.getElementById('modalOutlookExpectation').textContent = event.outlook.expectation || event.outlook.rateExpectation || '暂无市场预期信息';

        let keyPointsHtml = '';
        if (event.outlook.keyPoints) {
            event.outlook.keyPoints.forEach(point => {
                keyPointsHtml += `<li>${point}</li>`;
            });
        }
        document.getElementById('modalKeyPoints').innerHTML = keyPointsHtml || '<li class="empty-hint">暂无关注要点</li>';
    } else {
        document.getElementById('modalOutlookExpectation').textContent = '暂无市场预期信息';
        document.getElementById('modalKeyPoints').innerHTML = '<li class="empty-hint">暂无关注要点</li>';
    }

    // 地缘冲突专属模块
    const geoSection = document.getElementById('geopoliticalSection');
    if (event.type === 'geopolitical') {
        geoSection.style.display = 'block';

        // CFR影响级别
        if (event.cfrImpact) {
            const impactEl = document.getElementById('geoCfrImpact');
            if (impactEl) {
                impactEl.textContent = event.cfrImpact;
                impactEl.className = `cfr-impact-badge ${event.cfrImpact.toLowerCase()}`;
            }
        }

        // CFR状态
        const statusEl = document.getElementById('geoStatus');
        if (event.status && geoStatusMap[event.status]) {
            statusEl.textContent = geoStatusMap[event.status].name;
            statusEl.className = `status-value ${geoStatusMap[event.status].class}`;
        }

        // 关键因素
        if (event.keyFactors) {
            let factorsHtml = '';
            event.keyFactors.forEach(factor => {
                factorsHtml += `<li>${factor}</li>`;
            });
            document.getElementById('geoKeyFactors').innerHTML = factorsHtml;
        }

        // 市场影响
        if (event.marketImpact) {
            let marketHtml = '';
            event.marketImpact.forEach(impact => {
                marketHtml += `<li>${impact}</li>`;
            });
            document.getElementById('geoMarketImpact').innerHTML = marketHtml;
        }

        // 分析性文字
        const analysisSection = document.getElementById('geoAnalysis');
        if (analysisSection) {
            if (event.analysis) {
                analysisSection.style.display = 'block';
                const analysisContent = document.getElementById('geoAnalysisContent');
                if (analysisContent) {
                    analysisContent.innerHTML = `<p>${event.analysis}</p>`;
                }
            } else {
                analysisSection.style.display = 'none';
            }
        }
    } else {
        geoSection.style.display = 'none';
    }

    // 新闻标签页
    let newsHtml = '';
    if (event.newsLinks && event.newsLinks.length > 0) {
        event.newsLinks.forEach(link => {
            newsHtml += `<a href="${link.url}" target="_blank" class="news-link">${link.title}</a>`;
        });
    } else {
        newsHtml = '<p class="empty-hint">暂无新闻链接</p>';
    }
    document.getElementById('modalNewsLinks').innerHTML = newsHtml;

    // 相关报道
    let relatedNewsHtml = '';
    if (event.relatedNews && event.relatedNews.length > 0) {
        event.relatedNews.forEach(news => {
            relatedNewsHtml += `
                <div class="related-news-item">
                    <span class="news-date">${news.date}</span>
                    <span class="news-title">${news.title}</span>
                    <span class="news-source">${news.source}</span>
                </div>
            `;
        });
    } else {
        relatedNewsHtml = '<p class="empty-hint">暂无相关报道</p>';
    }
    const relatedNewsEl = document.getElementById('modalRelatedNews');
    if (relatedNewsEl) {
        relatedNewsEl.innerHTML = relatedNewsHtml;
    }

    // 其他信息标签页
    if (event.background) {
        document.getElementById('modalBackground').innerHTML = `<p>${event.background}</p>`;
    } else {
        document.getElementById('modalBackground').innerHTML = '<p class="empty-hint">暂无背景信息</p>';
    }

    // 重置到概述标签页
    switchTab('overview');

    // 显示弹窗
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeEventModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    currentEventId = null;
}

// ========================================
// 标签页切换
// ========================================
function switchTab(tabName) {
    currentTab = tabName;

    // 更新标签按钮状态
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === tabName) {
            btn.classList.add('active');
        }
    });

    // 更新内容显示
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`tab-${tabName}`).classList.add('active');
}

// ========================================
// 筛选功能
// ========================================
function filterEvents() {
    const selectedTypes = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedTypes.push(checkbox.dataset.type);
        }
    });

    currentEvents = eventsData.filter(event =>
        selectedTypes.includes(event.type)
    );

    updateMapMarkers();
    initTimeline();
    updateStats();
    initWeeklyFocus();
}

// ========================================
// 统计更新
// ========================================
function updateStats() {
    const today = new Date('2026-02-26');
    const oneWeekLater = new Date(today);
    oneWeekLater.setDate(today.getDate() + 7);

    const oneMonthLater = new Date(today);
    oneMonthLater.setMonth(today.getMonth() + 1);

    const thisMonthEvents = currentEvents.filter(event => {
        if (!event.date) return false;
        const eventDate = new Date(event.date);
        return eventDate >= today && eventDate <= oneMonthLater;
    });

    const highImpactEvents = currentEvents.filter(event =>
        event.importance === 'high'
    );

    const thisWeekEvents = currentEvents.filter(event => {
        if (!event.date) return false;
        const eventDate = new Date(event.date);
        return eventDate >= today && eventDate <= oneWeekLater;
    });

    document.getElementById('monthStat').textContent = thisMonthEvents.length;
    document.getElementById('highStat').textContent = highImpactEvents.length;
    document.getElementById('weekStat').textContent = thisWeekEvents.length;
}

// ========================================
// 地图控制（Leaflet已处理，此处为备用）
// ========================================
function initMapControls() {
    // Leaflet 地图的缩放控制已在 initMap 中绑定
    // 此函数保留用于未来扩展
}

// ========================================
// 事件监听器
// ========================================
function initEventListeners() {
    // 地缘事件弹窗关闭
    modalClose.addEventListener('click', closeEventModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeEventModal();
        }
    });

    // 经济数据弹窗关闭
    const econModalClose = document.getElementById('econModalClose');
    const econModalOverlay = document.getElementById('economicModalOverlay');
    if (econModalClose) {
        econModalClose.addEventListener('click', closeEconomicModal);
    }
    if (econModalOverlay) {
        econModalOverlay.addEventListener('click', (e) => {
            if (e.target === econModalOverlay) {
                closeEconomicModal();
            }
        });
    }

    // 财经日历导出按钮
    const econBtnExport = document.getElementById('econBtnExport');
    if (econBtnExport) {
        econBtnExport.addEventListener('click', () => {
            if (currentEconomicEvent) {
                exportEconomicReport(currentEconomicEvent);
            }
        });
    }

    // ESC键关闭弹窗
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (modalOverlay.classList.contains('active')) {
                closeEventModal();
            }
            if (econModalOverlay && econModalOverlay.classList.contains('active')) {
                closeEconomicModal();
            }
            const econDataModalOverlay = document.getElementById('econDataModalOverlay');
            if (econDataModalOverlay && econDataModalOverlay.classList.contains('active')) {
                econDataModalOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    // 地图控制
    initMapControls();

    // 导航链接
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // 标签页切换
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            switchTab(btn.dataset.tab);
        });
    });

    // 添加到关注按钮
    document.getElementById('btnAddWatch')?.addEventListener('click', () => {
        if (currentEventId) {
            addToWatchlist(currentEventId);
        }
    });

    // 重要程度筛选
    document.querySelectorAll('.importance-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            dot.classList.toggle('active');
            // 可以添加更复杂的筛选逻辑
        });
    });
}

// ========================================
// 工具函数
// ========================================
window.addEventListener('resize', debounce(() => {
    // Leaflet 地图会自动处理 resize
    if (map) {
        map.invalidateSize();
    }
}, 250));

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

document.querySelectorAll('.timeline-panel, .filter-panel').forEach(panel => {
    panel.style.scrollBehavior = 'smooth';
});

// ========================================
// 搜索功能（预留）
// ========================================
function searchEvents(query) {
    const searchTerm = query.toLowerCase();
    return eventsData.filter(event =>
        event.title.toLowerCase().includes(searchTerm) ||
        event.location.toLowerCase().includes(searchTerm) ||
        event.summary.toLowerCase().includes(searchTerm)
    );
}

function addToWatchlist(eventId) {
    const event = eventsData.find(e => e.id === eventId);
    if (event) {
        let watchlist = JSON.parse(localStorage.getItem('eventWatchlist') || '[]');
        if (!watchlist.includes(eventId)) {
            watchlist.push(eventId);
            localStorage.setItem('eventWatchlist', JSON.stringify(watchlist));
            alert(`已将"${event.title}"添加到关注列表`);
        } else {
            alert('该事件已在关注列表中');
        }
    }
}

// ========================================
// 经济数据浏览器模块
// ========================================
let econChart = null;  // Chart.js 实例
let econRegionMarkers = [];  // 经济区域标记
let currentEconCountry = null;  // 当前选中的国家
let selectedIndicators = [];  // 选中的指标
let chartType = 'line';  // 图表类型

// 经济区域配置 - 使用简化的国家轮廓坐标
const ECON_REGIONS = {
    '美国': {
        code: 'US',
        // 美国本土轮廓（简化版）
        coords: [
            [49, -125], [48, -124], [46, -124], [44, -124], [42, -124],
            [40, -125], [37, -123], [34, -121], [33, -118], [32, -117],
            [31, -113], [30, -111], [29, -106], [27, -100], [26, -98],
            [26, -97], [28, -97], [29, -95], [29, -94], [30, -89],
            [30, -88], [30, -87], [31, -87], [30, -85], [30, -84],
            [31, -82], [30, -82], [29, -82], [28, -81], [26, -80],
            [25, -80], [25, -81], [24, -82], [25, -80], [26, -80],
            [32, -80], [35, -76], [37, -76], [39, -75], [41, -70],
            [43, -70], [45, -67], [47, -68], [48, -68], [49, -95],
            [49, -125]
        ],
        center: [39, -105],  // 美国中部
        color: 'rgba(59, 130, 246, 0.30)',
        borderColor: 'rgba(59, 130, 246, 0.6)',
        labelClass: 'us'
    },
    '欧元区': {
        code: 'EU',
        // 欧元区主要国家轮廓（简化版）
        coords: [
            [55, -10], [54, -8], [53, -6], [52, -4], [51, 1],
            [48, 2], [46, 4], [44, 2], [43, 0], [44, 3],
            [46, 7], [48, 9], [48, 12], [47, 15], [46, 13],
            [45, 14], [44, 12], [42, 12], [43, 10], [44, 8],
            [42, 3], [39, 0], [38, -2], [37, -3], [39, -9],
            [43, -9], [48, -5], [52, -6], [55, -10]
        ],
        center: [47, 10],  // 欧元区东部，避开英国
        color: 'rgba(16, 185, 129, 0.30)',
        borderColor: 'rgba(16, 185, 129, 0.6)',
        labelClass: 'eurozone'
    },
    '英国': {
        code: 'GB',
        // 英国轮廓（简化版）
        coords: [
            [59, -8], [58, -7], [57, -6], [56, -6], [55, -5],
            [54, -4], [53, -4], [52, -4], [51, -3], [50, -5],
            [50, -6], [51, -5], [52, -4], [53, -4], [54, -3],
            [55, -3], [56, -4], [57, -5], [58, -6], [59, -8]
        ],
        center: [54, -8],  // 英国西侧
        color: 'rgba(139, 92, 246, 0.30)',
        borderColor: 'rgba(139, 92, 246, 0.6)',
        labelClass: 'uk'
    },
    '日本': {
        code: 'JP',
        // 日本轮廓（简化版）
        coords: [
            [46, 141], [45, 140], [44, 140], [43, 141], [42, 140],
            [41, 141], [40, 140], [39, 139], [38, 139], [37, 138],
            [36, 137], [35, 136], [34, 135], [33, 133], [32, 132],
            [31, 131], [30, 130], [30, 131], [31, 132], [32, 131],
            [33, 130], [34, 129], [34, 130], [35, 131], [36, 132],
            [37, 133], [38, 139], [39, 141], [40, 141], [41, 140],
            [42, 140], [43, 141], [44, 141], [45, 142], [46, 141]
        ],
        center: [44, 143],  // 日本北侧海域，避开与其他标记重叠
        color: 'rgba(239, 68, 68, 0.30)',
        borderColor: 'rgba(239, 68, 68, 0.6)',
        labelClass: 'japan'
    }
};

// 图表颜色配置
const CHART_COLORS = [
    { bg: 'rgba(59, 130, 246, 0.3)', border: 'rgba(59, 130, 246, 1)' },
    { bg: 'rgba(16, 185, 129, 0.3)', border: 'rgba(16, 185, 129, 1)' },
    { bg: 'rgba(239, 68, 68, 0.3)', border: 'rgba(239, 68, 68, 1)' },
    { bg: 'rgba(245, 158, 11, 0.3)', border: 'rgba(245, 158, 11, 1)' },
    { bg: 'rgba(139, 92, 246, 0.3)', border: 'rgba(139, 92, 246, 1)' },
    { bg: 'rgba(236, 72, 153, 0.3)', border: 'rgba(236, 72, 153, 1)' }
];

// 初始化经济数据区域
function initEconDataRegions() {
    console.log('Initializing economic data regions...');

    if (!map) {
        console.warn('Map not initialized');
        return;
    }

    // 清除现有标记
    econRegionMarkers.forEach(m => map.removeLayer(m));
    econRegionMarkers = [];

    // 为每个区域添加可点击的多边形
    Object.entries(ECON_REGIONS).forEach(([name, config]) => {
        // 创建多边形区域 - 使用实线边框和填充色
        const polygon = L.polygon(config.coords, {
            color: config.borderColor,
            fillColor: config.color,
            fillOpacity: 0.35,
            weight: 2,
            dashArray: null,
            className: 'econ-leaflet-region'
        }).addTo(map);

        // 添加标签 - 带有不同颜色，紧凑样式
        const labelIcon = L.divIcon({
            html: `
                <div class="econ-leaflet-label ${config.labelClass}">
                    <span class="region-name">${name}</span>
                    <span class="region-hint">📊 浏览数据</span>
                </div>
            `,
            className: '',
            iconSize: [90, 40],
            iconAnchor: [45, 20]
        });

        const label = L.marker(config.center, { icon: labelIcon }).addTo(map);

        // 点击事件
        const openBrowser = () => openEconDataBrowser(name);
        polygon.on('click', openBrowser);
        label.on('click', openBrowser);

        // 悬停效果
        polygon.on('mouseover', function() {
            this.setStyle({ fillOpacity: 0.55, weight: 3 });
        });
        polygon.on('mouseout', function() {
            this.setStyle({ fillOpacity: 0.5, weight: 2 });
        });

        econRegionMarkers.push(polygon, label);
    });

    console.log('Economic data regions initialized');
}

// 打开经济数据浏览器
function openEconDataBrowser(country) {
    currentEconCountry = country;
    selectedIndicators = [];
    chartType = 'line';

    const modalOverlay = document.getElementById('econDataModalOverlay');
    const modalTitle = document.getElementById('econDataModalTitle');

    modalTitle.textContent = `${country}宏观经济数据`;

    // 检查数据是否加载
    if (typeof ECONOMIC_DATA === 'undefined' || !ECONOMIC_DATA[country]) {
        console.error('Economic data not loaded for:', country);
        alert('经济数据未加载，请刷新页面重试');
        return;
    }

    // 初始化分类选择器
    initCategorySelect(country);

    // 初始化指标列表
    initIndicatorList(country);

    // 初始化时间选择器
    initTimeSelector();

    // 初始化图表类型切换
    initChartTypeToggle();

    // 显示弹窗
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // 绑定关闭事件
    initEconDataModalEvents();
}

// 初始化分类选择器
function initCategorySelect(country) {
    const select = document.getElementById('econCategorySelect');
    const categories = Object.keys(ECONOMIC_DATA[country]);

    select.innerHTML = '<option value="">全部分类</option>';
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        select.appendChild(option);
    });

    // 分类变化时更新指标列表
    select.onchange = () => {
        initIndicatorList(country, select.value);
    };
}

// 初始化指标列表
function initIndicatorList(country, category = '') {
    const container = document.getElementById('econIndicatorList');
    container.innerHTML = '';

    const countryData = ECONOMIC_DATA[country];
    let categories = category ? [category] : Object.keys(countryData);

    categories.forEach(cat => {
        if (!countryData[cat]) return;

        countryData[cat].forEach((series, idx) => {
            const item = document.createElement('div');
            item.className = 'econ-indicator-item';
            item.dataset.category = cat;
            item.dataset.index = idx;

            item.innerHTML = `
                <input type="checkbox" id="ind_${cat}_${idx}">
                <span class="econ-indicator-name" title="${series.name}">${series.name}</span>
                <span class="econ-indicator-category">${cat}</span>
            `;

            // 点击选择
            item.onclick = (e) => {
                if (e.target.type !== 'checkbox') {
                    const checkbox = item.querySelector('input');
                    checkbox.checked = !checkbox.checked;
                }
                item.classList.toggle('selected', item.querySelector('input').checked);
                updateSelectedIndicators();
            };

            container.appendChild(item);
        });
    });
}

// 更新选中的指标
function updateSelectedIndicators() {
    const checkboxes = document.querySelectorAll('#econIndicatorList input:checked');
    selectedIndicators = [];

    checkboxes.forEach(cb => {
        const item = cb.closest('.econ-indicator-item');
        const category = item.dataset.category;
        const index = parseInt(item.dataset.index);

        if (ECONOMIC_DATA[currentEconCountry][category] &&
            ECONOMIC_DATA[currentEconCountry][category][index]) {
            selectedIndicators.push({
                category,
                index,
                data: ECONOMIC_DATA[currentEconCountry][category][index]
            });
        }
    });

    // 更新图表和数据表
    updateEconChart();
    updateEconTable();
}

// 初始化时间选择器 - 双滑块范围选择
function initTimeSelector() {
    const startSlider = document.getElementById('econStartYear');
    const endSlider = document.getElementById('econEndYear');
    const timeDisplay = document.getElementById('econTimeDisplay');
    const sliderRange = document.getElementById('econSliderRange');
    const quickTimeBtns = document.querySelectorAll('.quick-time-btn');

    const currentYear = new Date().getFullYear();

    // 设置默认值 (最近5年)
    startSlider.value = currentYear - 5;
    endSlider.value = currentYear;

    // 更新滑块范围显示
    function updateSliderRange() {
        const minYear = 1980;
        const maxYear = currentYear;
        const startVal = parseInt(startSlider.value);
        const endVal = parseInt(endSlider.value);

        // 计算百分比位置
        const startPercent = ((startVal - minYear) / (maxYear - minYear)) * 100;
        const endPercent = ((endVal - minYear) / (maxYear - minYear)) * 100;

        sliderRange.style.left = startPercent + '%';
        sliderRange.style.width = (endPercent - startPercent) + '%';

        timeDisplay.textContent = `${startVal}年 - ${endVal}年`;
    }

    // 滑块变化处理
    function onSliderChange() {
        let startVal = parseInt(startSlider.value);
        let endVal = parseInt(endSlider.value);

        // 确保开始年份不大于结束年份
        if (startVal > endVal) {
            if (this === startSlider) {
                startSlider.value = endVal;
                startVal = endVal;
            } else {
                endSlider.value = startVal;
                endVal = startVal;
            }
        }

        updateSliderRange();
        updateQuickTimeButtons();
        updateEconChart();
        updateEconTable();
    }

    startSlider.oninput = onSliderChange;
    endSlider.oninput = onSliderChange;

    // 初始化显示
    updateSliderRange();

    // 快捷时间按钮
    quickTimeBtns.forEach(btn => {
        btn.onclick = () => {
            quickTimeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const years = parseInt(btn.dataset.years);

            if (years >= 100) {
                startSlider.value = 1980;
            } else {
                startSlider.value = currentYear - years;
            }
            endSlider.value = currentYear;

            updateSliderRange();
            updateEconChart();
            updateEconTable();
        };
    });
}

// 更新快捷时间按钮状态
function updateQuickTimeButtons() {
    const btns = document.querySelectorAll('.quick-time-btn');
    btns.forEach(b => b.classList.remove('active'));
}

// 初始化图表类型切换
function initChartTypeToggle() {
    const btns = document.querySelectorAll('.chart-type-btn');

    btns.forEach(btn => {
        btn.onclick = () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            chartType = btn.dataset.type;
            updateEconChart();
        };
    });
}

// 获取时间范围
function getTimeRange() {
    const startSlider = document.getElementById('econStartYear');
    const endSlider = document.getElementById('econEndYear');

    const startYear = parseInt(startSlider?.value || 2021);
    const endYear = parseInt(endSlider?.value || 2026);

    return {
        start: new Date(`${startYear}-01-01`),
        end: new Date(`${endYear}-12-31`)
    };
}

// 过滤数据按时间范围
function filterDataByTime(data) {
    const range = getTimeRange();
    return data.filter(d => {
        const date = new Date(d.date);
        return date >= range.start && date <= range.end;
    });
}

// 计算数据的数值范围
function getDataRange(values) {
    if (values.length === 0) return { min: 0, max: 100, range: 100 };
    const min = Math.min(...values);
    const max = Math.max(...values);
    return { min, max, range: max - min };
}

// 更新图表
function updateEconChart() {
    const canvas = document.getElementById('econChart');
    const ctx = canvas.getContext('2d');

    // 销毁旧图表
    if (econChart) {
        econChart.destroy();
        econChart = null;
    }

    if (selectedIndicators.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '14px Inter';
        ctx.fillStyle = '#94a3b8';
        ctx.textAlign = 'center';
        ctx.fillText('请选择指标以查看图表', canvas.width / 2, canvas.height / 2);
        return;
    }

    // 分析数据范围，决定Y轴分配
    const indicatorRanges = selectedIndicators.map((ind, i) => {
        const filteredData = filterDataByTime(ind.data.data);
        const values = filteredData.map(d => d.value);
        const range = getDataRange(values);
        return { index: i, ...range, count: filteredData.length };
    });

    // 为每个指标分配Y轴
    const yAxisAssignments = assignYAxes(indicatorRanges);

    // 准备数据
    const datasets = [];
    const allDates = new Set();

    selectedIndicators.forEach((ind, i) => {
        const filteredData = filterDataByTime(ind.data.data);
        const color = CHART_COLORS[i % CHART_COLORS.length];
        const yAxisID = yAxisAssignments[i];

        filteredData.forEach(d => allDates.add(d.date));

        const isBar = chartType === 'bar';

        datasets.push({
            label: ind.data.name,
            data: filteredData.map(d => ({ x: d.date, y: d.value })),
            borderColor: color.border,
            backgroundColor: isBar ? color.bg : color.border,
            borderWidth: isBar ? 0 : 2,
            fill: isBar,
            tension: 0.3,
            pointRadius: isBar ? 0 : 2,
            pointHoverRadius: isBar ? 0 : 5,
            yAxisID: yAxisID,
            type: chartType
        });
    });

    // 排序日期
    const sortedDates = Array.from(allDates).sort();

    // 构建Y轴配置
    const yAxesConfig = buildYAxesConfig(indicatorRanges, yAxisAssignments);

    // 创建图表
    econChart = new Chart(ctx, {
        type: chartType === 'bar' ? 'bar' : 'line',
        data: {
            labels: sortedDates,
            datasets: datasets.map(ds => ({
                ...ds,
                data: sortedDates.map(date => {
                    const point = ds.data.find(d => d.x === date);
                    return point ? point.y : null;
                })
            }))
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: { size: 11 },
                        boxWidth: 20,
                        padding: 10,
                        usePointStyle: chartType === 'line'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(30, 58, 95, 0.95)',
                    titleFont: { size: 12 },
                    bodyFont: { size: 11 },
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label.length > 30) label = label.substring(0, 30) + '...';
                            const value = context.parsed.y;
                            if (value !== null) {
                                return `${label}: ${value.toFixed(2)}`;
                            }
                            return label;
                        }
                    }
                }
            },
            scales: yAxesConfig
        }
    });
}

// 分配Y轴
function assignYAxes(ranges) {
    if (ranges.length <= 1) return ranges.map(() => 'y');

    // 找出数值范围最大的指标
    const sortedByRange = [...ranges].sort((a, b) => b.range - a.range);
    const maxRange = sortedByRange[0].range;

    // 分配策略：如果某指标的数值范围与最大范围差异超过5倍，放到不同轴
    const assignments = [];
    const threshold = maxRange / 5;

    ranges.forEach(r => {
        if (r.range < threshold && assignments.filter(a => a === 'y1').length < 2) {
            assignments.push('y1');
        } else {
            assignments.push('y');
        }
    });

    // 确保至少有一个指标在主轴上
    if (!assignments.includes('y')) {
        assignments[0] = 'y';
    }

    return assignments;
}

// 构建Y轴配置
function buildYAxesConfig(ranges, assignments) {
    const hasY1 = assignments.includes('y1');

    const config = {
        x: {
            ticks: {
                maxTicksLimit: 12,
                font: { size: 10 },
                maxRotation: 45
            },
            grid: {
                color: 'rgba(0,0,0,0.05)'
            }
        },
        y: {
            type: 'linear',
            display: true,
            position: 'left',
            ticks: {
                font: { size: 10 },
                callback: function(value) {
                    if (Math.abs(value) >= 1000000) return (value / 1000000).toFixed(1) + 'M';
                    if (Math.abs(value) >= 1000) return (value / 1000).toFixed(1) + 'K';
                    return value.toFixed(1);
                }
            },
            grid: {
                color: 'rgba(0,0,0,0.05)'
            },
            title: {
                display: true,
                text: assignments[0] === 'y' ? selectedIndicators[0]?.data.name?.substring(0, 15) || '' : '',
                font: { size: 10 }
            }
        }
    };

    if (hasY1) {
        config.y1 = {
            type: 'linear',
            display: true,
            position: 'right',
            ticks: {
                font: { size: 10 },
                callback: function(value) {
                    if (Math.abs(value) >= 1000000) return (value / 1000000).toFixed(1) + 'M';
                    if (Math.abs(value) >= 1000) return (value / 1000).toFixed(1) + 'K';
                    return value.toFixed(1);
                }
            },
            grid: {
                drawOnChartArea: false
            },
            title: {
                display: true,
                text: '次轴',
                font: { size: 10 }
            }
        };
    }

    return config;
}

// 更新数据表格
function updateEconTable() {
    const headerRow = document.getElementById('econTableHeader');
    const tbody = document.getElementById('econTableBody');

    if (selectedIndicators.length === 0) {
        headerRow.innerHTML = '<th>日期</th><th>数据</th>';
        tbody.innerHTML = '<tr><td colspan="2" style="text-align:center;color:#94a3b8;">请选择指标</td></tr>';
        return;
    }

    // 构建表头
    let headerHtml = '<th class="date-col">日期</th>';
    selectedIndicators.forEach(ind => {
        const name = ind.data.name.length > 15 ? ind.data.name.substring(0, 15) + '...' : ind.data.name;
        headerHtml += `<th class="value-col">${name}</th>`;
    });
    headerRow.innerHTML = headerHtml;

    // 合并所有日期
    const allDates = new Set();
    selectedIndicators.forEach(ind => {
        const filteredData = filterDataByTime(ind.data.data);
        filteredData.forEach(d => allDates.add(d.date));
    });

    const sortedDates = Array.from(allDates).sort().reverse().slice(0, 50);

    // 构建表格内容
    let bodyHtml = '';
    sortedDates.forEach(date => {
        bodyHtml += `<tr><td class="date-col">${date}</td>`;
        selectedIndicators.forEach(ind => {
            const filteredData = filterDataByTime(ind.data.data);
            const point = filteredData.find(d => d.date === date);
            const value = point ? point.value.toFixed(2) : '--';
            bodyHtml += `<td class="value-col">${value}</td>`;
        });
        bodyHtml += '</tr>';
    });

    tbody.innerHTML = bodyHtml;
}

// 初始化经济数据弹窗事件
function initEconDataModalEvents() {
    const modalOverlay = document.getElementById('econDataModalOverlay');
    const closeBtn = document.getElementById('econDataModalClose');
    const closeBtn2 = document.getElementById('econDataClose');
    const exportBtn = document.getElementById('econDataExport');

    const closeModal = () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeBtn.onclick = closeModal;
    closeBtn2.onclick = closeModal;
    modalOverlay.onclick = (e) => {
        if (e.target === modalOverlay) closeModal();
    };

    exportBtn.onclick = () => {
        if (selectedIndicators.length === 0) {
            alert('请先选择要导出的指标');
            return;
        }

        // 简单CSV导出
        let csv = 'Date';
        selectedIndicators.forEach(ind => {
            csv += `,"${ind.data.name}"`;
        });
        csv += '\n';

        const allDates = new Set();
        selectedIndicators.forEach(ind => {
            filterDataByTime(ind.data.data).forEach(d => allDates.add(d.date));
        });

        Array.from(allDates).sort().forEach(date => {
            csv += date;
            selectedIndicators.forEach(ind => {
                const filteredData = filterDataByTime(ind.data.data);
                const point = filteredData.find(d => d.date === date);
                csv += `,${point ? point.value : ''}`;
            });
            csv += '\n';
        });

        const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${currentEconCountry}_经济数据_${new Date().toISOString().slice(0,10)}.csv`;
        link.click();

        alert('数据已导出');
    };
}
