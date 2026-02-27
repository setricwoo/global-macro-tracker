# 全球地缘信息追踪 - 数据更新指南

## 目录
1. [数据结构概述](#数据结构概述)
2. [数据获取来源](#数据获取来源)
3. [更新频率建议](#更新频率建议)
4. [手动更新步骤](#手动更新步骤)
5. [自动化脚本使用](#自动化脚本使用)

---

## 数据结构概述

### 1. 财经日历数据 (economicCalendarData)
**文件位置**: `app.js` 第14-600行

**数据结构**:
```javascript
{
    id: 'econ-us-1',           // 唯一ID (国家-序号)
    date: '2026-03-05',        // 日期 YYYY-MM-DD
    time: '21:30',             // 发布时间 (北京时间)
    title: '美国2月非农就业数据', // 事件名称
    country: '美国',            // 国家名称
    countryCode: 'US',         // 国家代码
    importance: 'high',        // 重要性: high/medium/low
    type: 'economic',          // 类型: economic/central-bank/summit
    previousValue: '151',      // 前值
    forecastValue: '170',      // 预测值
    actualValue: null,         // 实际值 (发布后填写)
    unit: '万人',              // 单位
    description: '...',        // 事件描述
    impact: '...',             // 市场影响分析
    publishAgency: '美国劳工部', // 发布机构
    frequency: '每月'          // 发布频率
}
```

### 2. 地缘冲突数据 (eventsData)
**文件位置**: `events-data.js`

**数据结构**:
```javascript
{
    id: 1,
    type: 'geopolitical',
    title: '台海对峙',
    titleEn: 'Confrontation Over Taiwan',
    location: '台湾海峡',
    region: 'Asia',  // Asia/Europe and Eurasia/Middle East and North Africa/Sub-Saharan Africa/Americas
    conflictType: 'Interstate',  // Interstate/Civil War/Territorial Dispute/Transnational Terrorism/Political Instability
    importance: 'high',
    coordinates: { x: 87, y: 40 },  // SVG坐标
    cfrImpact: 'Critical',  // Critical/Significant/Limited
    cfrStatus: 'Worsening', // Worsening/Unchanging/Improving
    countries: ['TW', 'CN'],
    summary: '事件概述...',
    analysis: '深度分析...',
    outlook: {
        expectation: '预期展望...',
        keyPoints: ['关注点1', '关注点2']
    },
    keyFactors: ['关键因素1', '关键因素2'],
    marketImpact: ['市场影响1', '市场影响2'],
    history: [{ date: '2026-02', content: '历史事件' }],
    futureKeyDates: [{ date: '2026-05', event: '未来关键日期' }],
    cfrUrl: 'https://www.cfr.org/...',
    newsLinks: [{ title: '新闻标题', url: 'https://...' }],
    relatedNews: [{ date: '2026-02-20', title: '相关新闻', source: 'Reuters' }]
}
```

### 3. 重大会议与事件数据 (majorEventsData)
**文件位置**: `events-data.js`

**数据结构**:
```javascript
{
    id: 'me-1',
    type: 'major-event',
    eventType: 'political',  // political/diplomatic/financial/economic
    title: '中国两会',
    titleEn: "China's Two Sessions",
    date: '2026-03-05',
    endDate: '2026-03-15',    // 可选，多日事件
    location: '北京',
    region: 'Asia',
    importance: 'high',
    countries: ['CN'],
    coordinates: { lat: 39.9, lng: 116.4 },  // 经纬度坐标
    summary: '事件概述...',
    analysis: '深度分析...',
    outlook: { expectation: '...', keyPoints: [...] },
    keyFactors: [...],
    marketImpact: [...],
    history: [...],
    futureKeyDates: [...],
    newsLinks: [...],
    relatedNews: [...]
}
```

---

## 数据获取来源

### 一、财经日历数据来源

| 数据类型 | 推荐来源 | 网址 | 说明 |
|---------|---------|------|------|
| 综合财经日历 | 金十数据 | https://www.jin10.com/calendar | 中文，更新及时，覆盖全面 |
| 综合财经日历 | Investing.com | https://www.investing.com/economic-calendar/ | 英文，数据全面，有预测值 |
| 综合财经日历 | Forex Factory | https://www.forexfactory.com/calendar | 英文，外汇交易者常用 |
| 央行会议 | 各央行官网 | 见下表 | 最权威的利率决议日期 |
| 中国数据 | 国家统计局 | http://www.stats.gov.cn/ | 中国官方经济数据 |
| 美国数据 | 美国劳工部/BLS | https://www.bls.gov/ | 非农、CPI等 |

**主要央行会议日程**:
- 美联储 FOMC: https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm
- 欧洲央行: https://www.ecb.europa.eu/ecb/html/index.en.html
- 日本央行: https://www.boj.or.jp/en/
- 中国央行: http://www.pbc.gov.cn/

### 二、地缘冲突数据来源

| 来源 | 网址 | 更新频率 | 内容 |
|-----|------|---------|------|
| **CFR Global Conflict Tracker** | https://www.cfr.org/global-conflict-tracker | 持续更新 | 主要数据源，有影响级别和状态 |
| Reuters 世界新闻 | https://www.reuters.com/world/ | 实时 | 相关新闻更新 |
| BBC 世界新闻 | https://www.bbc.com/news/world | 实时 | 相关新闻更新 |
| Al Jazeera | https://www.aljazeera.com/ | 实时 | 中东、非洲新闻 |
| 联合国新闻 | https://news.un.org/ | 每日 | 官方信息 |
| 中国外交部 | https://www.fmprc.gov.cn/ | 按需 | 中国官方立场 |

### 三、重大会议与事件来源

| 来源 | 网址 | 说明 |
|-----|------|------|
| 中国政府网 | http://www.gov.cn/ | 两会、政治局会议等 |
| G20官网 | https://g20.org/ | G20峰会和部长会议 |
| APEC官网 | https://www.apec.org/ | APEC相关会议 |
| IMF会议 | https://www.imf.org/ | 春秋季年会 |
| 世界银行 | https://www.worldbank.org/ | 发展会议 |
| 各国政府官网 | - | 选举、重要访问等 |

---

## 更新频率建议

| 数据类型 | 建议频率 | 更新内容 |
|---------|---------|---------|
| 财经日历 | 每周一 | 未来1-2周的重要经济数据发布 |
| 地缘冲突 | 每周或按需 | 状态变化、最新新闻、outlook更新 |
| 重大事件 | 每月或按需 | 新增重要会议、结果更新 |
| relatedNews | 每周 | 每个事件最近3-5条相关新闻 |

---

## 手动更新步骤

### 1. 更新财经日历

**步骤**:
1. 打开金十数据或Investing.com财经日历
2. 筛选未来1-2周的重要事件（重要性3星以上）
3. 收集以下信息：
   - 日期和时间（转换为北京时间）
   - 前值和预测值
   - 事件描述和市场影响
4. 编辑 `app.js` 文件中的 `economicCalendarData` 数组
5. 按日期排序，删除已过期的旧数据

**示例更新**:
```javascript
// 添加新事件
{
    id: 'econ-us-15',
    date: '2026-03-12',
    time: '20:30',
    title: '美国2月CPI同比',
    country: '美国',
    countryCode: 'US',
    importance: 'high',
    type: 'economic',
    previousValue: '3.0%',
    forecastValue: '2.8%',
    actualValue: null,
    unit: '%',
    description: '美国消费者价格指数同比变化，是美联储最关注的通胀指标之一。',
    impact: '高于预期可能强化美联储维持高利率的预期，利好美元；低于预期则相反。',
    publishAgency: '美国劳工统计局',
    frequency: '每月'
}
```

### 2. 更新地缘冲突

**步骤**:
1. 访问 CFR Global Conflict Tracker
2. 检查每个冲突的状态变化（Worsening/Unchanging/Improving）
3. 收集最新相关新闻（2-3条）
4. 更新 `events-data.js` 中的对应事件

**需要更新的字段**:
- `cfrStatus`: 状态是否变化
- `relatedNews`: 最近3条相关新闻
- `outlook.expectation`: 如有重大变化则更新
- `history`: 添加重要历史事件

**示例更新**:
```javascript
relatedNews: [
    { date: '2026-02-27', title: '最新相关新闻标题', source: 'Reuters' },
    { date: '2026-02-20', title: '上一周新闻标题', source: 'Al Jazeera' },
    { date: '2026-02-13', title: '更早新闻标题', source: 'BBC' }
]
```

### 3. 更新重大会议与事件

**步骤**:
1. 确认即将举行的重要会议
2. 如有新事件，添加到 `majorEventsData` 数组
3. 更新已结束事件的结果
4. 更新相关新闻

**添加新事件模板**:
```javascript
{
    id: 'me-9',  // 新ID
    type: 'major-event',
    eventType: 'diplomatic',
    title: 'XXX峰会',
    titleEn: 'XXX Summit',
    date: '2026-06-15',
    endDate: '2026-06-16',
    location: '举办城市',
    region: 'Asia',
    importance: 'high',
    countries: ['主办国代码'],
    coordinates: { lat: 纬度, lng: 经度 },
    summary: '事件概述...',
    analysis: '深度分析...',
    outlook: {
        expectation: '预期...',
        keyPoints: ['关注点1', '关注点2']
    },
    keyFactors: [...],
    marketImpact: [...],
    history: [...],
    futureKeyDates: [...],
    newsLinks: [...],
    relatedNews: []
}
```

---

## 自动化脚本使用

运行以下命令执行数据更新：

```bash
# 进入项目目录
cd d:\python_code\海外跟踪_GLM

# 运行更新脚本
python weekly_update.py

# 或者只更新特定类型
python weekly_update.py --calendar     # 仅更新财经日历
python weekly_update.py --geopolitical # 仅更新地缘冲突
python weekly_update.py --events       # 仅更新重大事件
```

---

## 注意事项

1. **时间格式统一使用北京时间**
2. **国家代码使用ISO 3166-1 alpha-2标准** (US, CN, JP, DE, GB, FR等)
3. **保持数据一致性**: 同一事件在不同地方的信息应该一致
4. **定期清理过期数据**: 财经日历保留未来2周，历史新闻保留最近1个月
5. **备份原始数据**: 更新前建议备份 `events-data.js` 和 `app.js`

---

*最后更新: 2026-02-27*
