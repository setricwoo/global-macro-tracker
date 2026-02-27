# 全球地缘信息追踪系统 - 项目记忆

## 项目概述

这是一个全球宏观事件追踪网页系统，参考CFR Global Conflict Tracker风格设计，包含：
- **左侧面板**：财经日历（未来1-2周重要经济数据）
- **中间区域**：Leaflet交互式世界地图，显示地缘冲突和重大事件标记
- **右侧面板**：重大会议与事件列表

## 文件结构

```
d:\python_code\海外跟踪_GLM\
├── index.html          # 主页面结构
├── app.js              # 主逻辑（含财经日历数据 economicCalendarData）
├── events-data.js      # 地缘冲突(eventsData) + 重大事件(majorEventsData)
├── styles.css          # 样式文件
├── update_data.py      # 原自动更新脚本
├── weekly_update.py    # 新每周更新脚本（交互式）
├── DATA_UPDATE_GUIDE.md # 数据更新指南
└── MEMORY.md           # 本文件
```

## 数据来源

### 一、财经日历数据

| 数据类型 | 来源 | 网址 | 说明 |
|---------|------|------|------|
| 综合日历 | 金十数据 | https://www.jin10.com/calendar | 中文，首选来源 |
| 综合日历 | Investing.com | https://www.investing.com/economic-calendar/ | 英文，有预测值 |
| 综合日历 | Forex Factory | https://www.forexfactory.com/calendar | 外汇交易者常用 |
| 美国数据 | 美国劳工部BLS | https://www.bls.gov/ | 非农、CPI官方来源 |
| 中国数据 | 国家统计局 | http://www.stats.gov.cn/ | PMI、CPI、GDP等 |
| 美联储 | Federal Reserve | https://www.federalreserve.gov/ | FOMC日程 |
| 欧洲央行 | ECB | https://www.ecb.europa.eu/ | 利率决议 |
| 日本央行 | BOJ | https://www.boj.or.jp/ | 利率决议 |

### 二、地缘冲突数据

| 来源 | 网址 | 更新频率 | 用途 |
|------|------|----------|------|
| **CFR Global Conflict Tracker** | https://www.cfr.org/global-conflict-tracker | 持续 | 主要数据源，影响级别和状态 |
| Reuters | https://www.reuters.com/world/ | 实时 | 相关新闻 |
| BBC World | https://www.bbc.com/news/world | 实时 | 相关新闻 |
| Al Jazeera | https://www.aljazeera.com/ | 实时 | 中东、非洲新闻 |
| 联合国新闻 | https://news.un.org/ | 每日 | 官方信息 |
| Nikkei Asia | https://asia.nikkei.com/ | 实时 | 亚洲新闻 |

### 三、重大会议与事件

| 来源 | 网址 | 用途 |
|------|------|------|
| 中国政府网 | http://www.gov.cn/ | 两会、政治局会议 |
| G20官网 | https://g20.org/ | G20峰会、部长会议 |
| APEC官网 | https://www.apec.org/ | APEC相关会议 |
| IMF | https://www.imf.org/ | 春秋季年会 |
| 世界银行 | https://www.worldbank.org/ | 发展会议 |

## 数据结构

### 财经日历 (economicCalendarData)
位置：`app.js` 第14行开始

```javascript
{
    id: 'econ-us-1',           // 唯一ID (国家-序号)
    date: '2026-03-05',        // 日期 YYYY-MM-DD
    time: '21:30',             // 发布时间 (北京时间)
    title: '美国2月非农就业数据',
    country: '美国',
    countryCode: 'US',         // ISO 3166-1 alpha-2
    importance: 'high',        // high/medium/low
    type: 'economic',          // economic/central-bank/summit
    previousValue: '151',      // 前值
    forecastValue: '170',      // 预测值
    actualValue: null,         // 实际值
    unit: '万人',
    description: '事件描述',
    impact: '市场影响分析',
    publishAgency: '发布机构',
    frequency: '每月'
}
```

### 地缘冲突 (eventsData)
位置：`events-data.js`

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
    summary: '概述',
    analysis: '深度分析',
    outlook: {
        expectation: '预期展望',
        keyPoints: ['关注点1', '关注点2']
    },
    keyFactors: ['关键因素'],
    marketImpact: ['市场影响'],
    history: [{ date: '2026-02', content: '历史事件' }],
    futureKeyDates: [{ date: '2026-05', event: '关键日期' }],
    cfrUrl: 'https://www.cfr.org/...',
    newsLinks: [{ title: '新闻', url: 'https://...' }],
    relatedNews: [{ date: '2026-02-20', title: '新闻', source: 'Reuters' }]
}
```

### 重大事件 (majorEventsData)
位置：`events-data.js` 末尾

```javascript
{
    id: 'me-1',
    type: 'major-event',
    eventType: 'political',  // political/diplomatic/financial/economic
    title: '中国两会',
    titleEn: "China's Two Sessions",
    date: '2026-03-05',
    endDate: '2026-03-15',
    location: '北京',
    region: 'Asia',
    importance: 'high',
    countries: ['CN'],
    coordinates: { lat: 39.9, lng: 116.4 },  // 经纬度
    summary: '概述',
    analysis: '分析',
    outlook: { expectation: '...', keyPoints: [...] },
    // ... 其他字段同地缘冲突
}
```

## 图标样式区分

| 类型 | 图标形状 | 颜色规则 |
|------|---------|---------|
| 地缘冲突 | 圆形 ● | Critical=红色, Significant=橙色, Limited=绿色 |
| 重大事件 | 菱形 ◆ | political=紫色, diplomatic=绿色, financial=红色, economic=橙色 |

## 更新操作流程

### 每周更新流程

1. **财经日历更新**（每周一）
   - 访问金十数据或Investing.com
   - 筛选未来2周、3星以上重要事件
   - 收集：日期、时间、前值、预测值、描述
   - 编辑 `app.js` 的 `economicCalendarData` 数组
   - 删除已过期的旧数据

2. **地缘冲突更新**（每周或按需）
   - 访问 CFR Global Conflict Tracker
   - 检查每个冲突的状态变化
   - 收集最新相关新闻（每事件2-3条）
   - 更新 `events-data.js` 中对应事件的：
     - `cfrStatus`（如有变化）
     - `relatedNews`（最新3条）
     - `outlook.expectation`（如有重大变化）

3. **重大事件更新**（每月或按需）
   - 确认即将举行的重要会议
   - 添加新事件到 `majorEventsData`
   - 更新已结束事件的结果

### 运行更新脚本

```bash
cd d:\python_code\海外跟踪_GLM
python weekly_update.py
```

## 坐标系统

### 地缘冲突 (SVG坐标)
使用 x/y 坐标系统，范围大约：
- x: 0-100 (西经180°到东经180°)
- y: 0-100 (北纬90°到南纬90°)

### 重大事件 (经纬度坐标)
使用 lat/lng 经纬度坐标，Leaflet自动转换

## 国家代码参考

常用国家代码 (ISO 3166-1 alpha-2):
- CN: 中国
- US: 美国
- JP: 日本
- DE: 德国
- GB: 英国
- FR: 法国
- IN: 印度
- RU: 俄罗斯
- BR: 巴西
- AU: 澳大利亚
- KR: 韩国
- TW: 台湾
- IR: 伊朗
- IL: 以色列
- UA: 乌克兰

## 注意事项

1. **时间格式**：统一使用北京时间
2. **数据一致性**：同一事件在不同位置的信息应一致
3. **定期清理**：财经日历保留未来2周，历史新闻保留最近1个月
4. **更新前备份**：修改前建议备份 `events-data.js` 和 `app.js`
5. **坐标偏移**：同位置多标记会在国家区域内自动分散（约3度范围）

## 技术要点

- 地图使用 Leaflet.js
- 标记使用 L.divIcon 自定义样式
- 同位置标记自动分组并应用偏移避免重叠
- 悬停时标记自动置顶（z-index: 9999）
- 弹窗使用模态框，支持多个标签页

---

*最后更新: 2026-02-27*
