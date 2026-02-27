// ========================================
// CFR Global Conflict Tracker - 完整事件数据
// 数据来源: https://www.cfr.org/global-conflict-tracker
// 最后更新: 2026-02-27
// ========================================

const eventsData = [
    // ============ Critical 级别冲突 ============
    {
        id: 1,
        type: 'geopolitical',
        title: '台海对峙',
        titleEn: 'Confrontation Over Taiwan',
        location: '台湾海峡',
        region: 'Asia',
        conflictType: 'Interstate',
        importance: 'high',
        coordinates: { x: 87, y: 40 },
        cfrImpact: 'Critical',
        cfrStatus: 'Worsening',
        countries: ['TW', 'CN'],
        summary: '中国持续对台湾施加军事压力，包括频繁的军机绕台和海上演习。美国继续对台军售并加强区域军事存在。台海紧张局势被CFR列为对美国利益的Critical级别威胁。',
        analysis: '台海局势持续升温，解放军军机每日进入台湾防空识别区已成为常态。美国对台军售规模不断扩大，引发中方强烈抗议。2026年台湾地区领导人选举结果将进一步影响两岸关系走向。',
        outlook: {
            expectation: '2026年台海局势预计将持续紧张。解放军常态化军机绕台将继续，但全面军事行动的可能性仍然较低。美国对台军售将延续，中日美三方博弈加剧。',
            keyPoints: [
                '台湾地区领导人政策演说内容',
                '美国对台军售规模和频率',
                '解放军军演强度和频次',
                '日本对台海局势的立场',
                '半导体供应链安全'
            ]
        },
        keyFactors: [
            '中国军事现代化与对台威慑',
            '美国对台军售与安全承诺',
            '台湾内部政治变化',
            '区域盟友态度（日本、菲律宾）'
        ],
        marketImpact: [
            '全球半导体供应链风险',
            '避险资产需求上升',
            '亚太股市波动加剧',
            '航运路线中断风险'
        ],
        history: [
            { date: '2026-02', content: '解放军东部战区举行联合演训，逾50架军机进入台防空识别区' },
            { date: '2025-12', content: '解放军大规模环台军演，逾百架军机进入防空识别区' },
            { date: '2025-09', content: '美国宣布对台军售价值20亿美元' },
            { date: '2025-05', content: '赖清德就职演说引发大陆强烈反应' },
            { date: '2024-01', content: '民进党赢得台湾地区领导人选举' }
        ],
        futureKeyDates: [
            { date: '2026-05-20', event: '台湾地区领导人就职周年演说' },
            { date: '2026-10', event: '中国国庆期间可能军事展示' },
            { date: '2026-11', event: '美国中期选举影响对台政策' }
        ],
        cfrUrl: 'https://www.cfr.org/global-conflict-tracker/conflict/confrontation-over-taiwan',
        newsLinks: [
            { title: 'CFR - Taiwan Confrontation', url: 'https://www.cfr.org/global-conflict-tracker/conflict/confrontation-over-taiwan' },
            { title: 'Reuters - Taiwan News', url: 'https://www.reuters.com/world/asia-pacific/taiwan/' },
            { title: 'Nikkei Asia - Taiwan', url: 'https://asia.nikkei.com/topic/Taiwan' },
            { title: 'South China Morning Post', url: 'https://www.scmp.com/news/china/taiwan' }
        ],
        relatedNews: [
            { date: '2026-02-24', title: '美军舰穿越台海，中国东部战区全程跟踪监视', source: 'Reuters' },
            { date: '2026-02-20', title: '台积电宣布在美国扩建先进制程工厂', source: 'Bloomberg' },
            { date: '2026-02-15', title: '日本防卫白皮书首次将台海列为"生存利益"相关', source: 'Nikkei' }
        ]
    },
    {
        id: 29,
        type: 'geopolitical',
        title: '中日战略对抗',
        titleEn: 'China-Japan Strategic Confrontation',
        location: '东海/钓鱼岛/贸易领域',
        region: 'Asia',
        conflictType: 'Interstate',
        importance: 'high',
        coordinates: { x: 82, y: 33 },
        cfrImpact: 'Critical',
        cfrStatus: 'Worsening',
        countries: ['CN', 'JP'],
        summary: '中日关系持续恶化，涵盖领土争端、贸易壁垒、技术封锁、地缘博弈等多重领域。钓鱼岛主权争议、东海油气田开发、半导体出口管制、台湾问题立场分歧等议题叠加，两国战略竞争进入新阶段。',
        analysis: '中日关系正处于1972年邦交正常化以来的最低点。核心矛盾包括：(1)钓鱼岛及东海海洋权益争端持续升温；(2)日本追随美国对华芯片出口管制，引发中方反制；(3)日本防卫政策转向"反击能力"建设，针对性明显；(4)台海问题上日本"台湾有事即日本有事"论调升级；(5)核污水排放引发中方全面暂停日本水产品进口。双方经济相互依存度高，但政治互信严重缺失。',
        outlook: {
            expectation: '2026年中日关系难有实质性改善。贸易摩擦可能进一步扩大，半导体产业链脱钩加速。钓鱼岛海域对峙风险上升，但双方均有意避免直接军事冲突。经济层面的相互依存仍是稳定因素，但政治安全领域的竞争将更加激烈。',
            keyPoints: [
                '日本对华半导体设备出口管制升级',
                '中国对日水产品进口禁令持续',
                '钓鱼岛海域海警对峙频次',
                '日本西南诸岛军事部署进度',
                '台海局势对中日关系的外溢效应',
                'G7框架下日本对华政策协调'
            ]
        },
        keyFactors: [
            '钓鱼岛主权与海洋权益争端',
            '半导体等技术领域脱钩',
            '日本防卫正常化与军事扩张',
            '美日同盟强化与对华围堵',
            '台湾问题立场分歧',
            '核污水排放与经贸制裁'
        ],
        marketImpact: [
            '中日贸易额下滑（约3000亿美元）',
            '半导体供应链重组',
            '日本汽车在华市场份额萎缩',
            '区域投资环境恶化',
            '日元/人民币汇率波动'
        ],
        history: [
            { date: '2026-02', content: '日本宣布扩大对华芯片制造设备出口管制范围' },
            { date: '2026-02', content: '中国海警船连续45天巡航钓鱼岛，创最长纪录' },
            { date: '2026-01', content: '日本在石垣岛完成导弹部署，射程覆盖台湾海峡' },
            { date: '2025-12', content: '中方延长日本水产品进口禁令至2026年底' },
            { date: '2025-10', content: '日本防卫白皮书首次将中国列为"前所未有的最大挑战"' },
            { date: '2025-08', content: '日本加入美国主导的对华先进芯片出口管制联盟' },
            { date: '2025-06', content: '中日外长会谈未能就核心分歧达成共识' },
            { date: '2024-08', content: '福岛核污水排海，中方全面暂停日本水产品进口' }
        ],
        futureKeyDates: [
            { date: '2026-03', event: '日本修订《外汇法》进一步限制对华技术出口' },
            { date: '2026-04', event: '中日海洋事务高级别磋商新一轮会谈' },
            { date: '2026-07', event: '日本公布2026年度防卫白皮书' },
            { date: '2026-09', event: 'G7广岛峰会讨论对华政策协调' }
        ],
        cfrUrl: 'https://www.cfr.org/global-conflict-tracker/',
        newsLinks: [
            { title: 'Reuters - China Japan Relations', url: 'https://www.reuters.com/world/asia-pacific/china/' },
            { title: 'Nikkei Asia - China Japan', url: 'https://asia.nikkei.com/topic/china' },
            { title: 'Japan Times - China', url: 'https://www.japantimes.co.jp/news/china/' },
            { title: 'SCMP - China Japan', url: 'https://www.scmp.com/news/china/diplomacy' },
            { title: 'Foreign Affairs - Asia', url: 'https://www.foreignaffairs.com/region/asia' }
        ],
        relatedNews: [
            { date: '2026-02-27', title: '日本经济团体访华寻求改善经贸关系，成果有限', source: 'Nikkei' },
            { date: '2026-02-25', title: '中国海警在钓鱼岛驱离日本巡视船，双方互相抗议', source: 'Reuters' },
            { date: '2026-02-22', title: '日本完成与那国岛电子战部队部署，监控东海方向', source: 'NHK' },
            { date: '2026-02-18', title: '中国商务部：日本芯片管制违反WTO规则', source: 'Xinhua' }
        ]
    },
    {
        id: 2,
        type: 'geopolitical',
        title: '俄乌战争',
        titleEn: 'War in Ukraine',
        location: '乌克兰',
        region: 'Europe and Eurasia',
        conflictType: 'Interstate',
        importance: 'high',
        coordinates: { x: 56, y: 30 },
        cfrImpact: 'Critical',
        cfrStatus: 'Unchanging',
        countries: ['UA', 'RU'],
        summary: '俄乌冲突进入第四年，呈现高消耗拉锯战态势。俄罗斯控制约18-20%乌克兰领土。双方伤亡合计可能达200万，是二战以来欧洲最大规模地面冲突。',
        analysis: '俄乌冲突已演变为消耗战。俄罗斯目前控制约18-20%乌克兰领土。特朗普政府推动和谈，在多轮会谈中触及核心问题。2026年春季被视为关键转折点。',
        outlook: {
            expectation: '2026年春季可能成为冲突转折点。特朗普政府积极推动和谈，但双方在领土和安全保障问题上分歧巨大。最可能情景是达成有限停火协议，但全面和平解决仍遥不可及。',
            keyPoints: [
                '特朗普政府与俄方的秘密会谈进展',
                '乌克兰春季动员令执行情况',
                '欧盟对乌援助计划的持续性',
                '俄罗斯战时经济的承受能力',
                '北约对乌克兰安全承诺的具体化'
            ]
        },
        keyFactors: [
            '前线军事动态',
            '美欧对乌军事援助持续性',
            '特朗普政府推动和谈',
            '俄罗斯战时经济可持续性'
        ],
        marketImpact: [
            '能源价格波动（天然气、石油）',
            '避险资产需求（黄金、美元）',
            '粮食价格与供应链风险',
            '欧洲经济增长前景'
        ],
        history: [
            { date: '2026-02-20', content: '特朗普与普京进行电话会谈，讨论停火框架' },
            { date: '2026-02-15', content: '美俄代表团在沙特利雅得举行秘密会谈' },
            { date: '2026-01', content: '俄军在顿涅茨克方向取得局部进展' },
            { date: '2025-12', content: '乌克兰能源基础设施遭大规模无人机袭击' },
            { date: '2025-11', content: '俄军占领阿夫杰耶夫卡后继续向西推进' },
            { date: '2025-06', content: '乌克兰反攻进展缓慢，西方援助疲劳显现' }
        ],
        futureKeyDates: [
            { date: '2026-03-15', event: '欧盟峰会讨论对乌援助' },
            { date: '2026-04', event: '春季攻势关键窗口期' },
            { date: '2026-06', event: '北约峰会讨论乌克兰入约问题' }
        ],
        cfrUrl: 'https://www.cfr.org/global-conflict-tracker/conflict/war-ukraine',
        newsLinks: [
            { title: 'CFR - War in Ukraine', url: 'https://www.cfr.org/global-conflict-tracker/conflict/war-ukraine' },
            { title: 'Institute for the Study of War', url: 'https://www.understandingwar.org/' },
            { title: 'Reuters - Russia Ukraine', url: 'https://www.reuters.com/world/russia-ukraine/' },
            { title: 'BBC News - Ukraine', url: 'https://www.bbc.com/news/world/europe' },
            { title: 'Kyiv Independent', url: 'https://kyivindependent.com/' }
        ],
        relatedNews: [
            { date: '2026-02-25', title: '美俄和谈进入关键阶段，停火方案浮出水面', source: 'Reuters' },
            { date: '2026-02-22', title: '乌克兰春季动员面临人力短缺挑战', source: 'BBC' },
            { date: '2026-02-18', title: '欧盟批准新一轮5亿欧元对乌军事援助', source: 'Financial Times' }
        ]
    },
    {
        id: 3,
        type: 'geopolitical',
        title: '伊朗与以色列及美国对抗',
        titleEn: 'Iran\'s Conflict With Israel and the United States',
        location: '伊朗/中东',
        region: 'Middle East and North Africa',
        conflictType: 'Interstate',
        importance: 'high',
        coordinates: { x: 58, y: 43 },
        cfrImpact: 'Critical',
        cfrStatus: 'Worsening',
        countries: ['IR'],
        summary: '伊朗核计划持续引发国际社会担忧。伊朗与以色列之间的间接冲突不断升级，包括代理战争和网络攻击。美国对伊朗实施严厉制裁。',
        analysis: '伊朗核谈判陷入僵局，伊朗铀浓缩活动已接近武器级水平。以色列多次威胁对伊朗核设施进行军事打击。胡塞武装在红海的袭击得到伊朗支持，进一步加剧地区紧张。',
        keyFactors: [
            '伊朗核计划进展',
            '美伊关系与制裁效果',
            '伊朗代理力量活动',
            '以色列安全红线'
        ],
        marketImpact: [
            '原油价格波动',
            '中东地缘风险溢价',
            '霍尔木兹海峡航运风险',
            '避险资产需求'
        ],
        history: [
            { date: '2026-01', content: 'IAEA报告伊朗浓缩铀储量接近武器级' },
            { date: '2025-10', content: '以色列对伊朗核设施进行网络攻击' },
            { date: '2025-04', content: '胡塞武装袭击红海商船，美军进行报复性打击' },
            { date: '2024-04', content: '伊朗首次直接对以色列发射导弹' }
        ],
        futureKeyDates: [
            { date: '2026-03', event: 'IAEA季度报告发布' },
            { date: '2026-06', event: '伊朗总统选举' },
            { date: '2026-09', event: '联合国大会伊朗核问题讨论' }
        ],
        cfrUrl: 'https://www.cfr.org/global-conflict-tracker/conflict/irans-conflict-israel-and-united-states',
        newsLinks: [
            { title: 'CFR - Iran Conflict', url: 'https://www.cfr.org/global-conflict-tracker/conflict/irans-conflict-israel-and-united-states' },
            { title: 'Al Jazeera - Iran', url: 'https://www.aljazeera.com/tag/iran/' },
            { title: 'Times of Israel', url: 'https://www.timesofisrael.com/' }
        ],
        outlook: {
            expectation: '伊朗核计划将持续推进，IAEA监测显示铀浓缩已接近武器级水平。以色列可能在未来数月内对伊朗核设施进行有限打击。美国将继续"极限施压"政策，但效果有限。霍尔木兹海峡航运风险将持续存在。',
            keyPoints: [
                'IAEA季度报告关注铀浓缩进展',
                '以色列军事打击可能性',
                '美国制裁政策调整',
                '伊朗代理力量活动（胡塞、真主党）',
                '海湾国家安全合作'
            ]
        },
        relatedNews: [
            { date: '2026-02-24', title: 'IAEA：伊朗浓缩铀储量已达武器级水平的90%', source: 'Reuters' },
            { date: '2026-02-20', title: '以色列国防部长暗示可能对伊朗采取军事行动', source: 'Times of Israel' },
            { date: '2026-02-15', title: '美国对伊朗石油出口实施新制裁', source: 'Bloomberg' }
        ]
    },
    {
        id: 4,
        type: 'geopolitical',
        title: '美国与委内瑞拉对抗',
        titleEn: 'U.S. Confrontation With Venezuela',
        location: '委内瑞拉',
        region: 'Americas',
        conflictType: 'Interstate',
        importance: 'high',
        coordinates: { x: 25, y: 58 },
        cfrImpact: 'Critical',
        cfrStatus: 'Unchanging',
        countries: ['VE'],
        summary: '委内瑞拉政治危机持续，美国不承认马杜罗政府合法性。美国对委内瑞拉实施严厉制裁，包括石油禁运。委内瑞拉经济崩溃导致大规模难民外流。',
        analysis: '委内瑞拉拥有世界最大已探明石油储量，但经济持续崩溃。超过700万委内瑞拉人逃离该国，造成拉美地区人道主义危机。美国制裁政策效果有限，马杜罗政权依然稳固。',
        keyFactors: [
            '美国制裁政策效果',
            '委内瑞拉石油产量',
            '难民危机影响',
            '中俄对委支持'
        ],
        marketImpact: [
            '国际油价影响有限',
            '拉美区域稳定性',
            '美国能源安全'
        ],
        cfrUrl: 'https://www.cfr.org/global-conflict-tracker/conflict/us-confrontation-venezuela',
        newsLinks: [
            { title: 'CFR - Venezuela', url: 'https://www.cfr.org/global-conflict-tracker/conflict/us-confrontation-venezuela' }
        ],
        outlook: {
            expectation: '委内瑞拉政治僵局将持续，马杜罗政权依靠军方支持和石油收入维持稳定。美国可能放松部分制裁以鼓励反对派参与选举，但根本性突破可能性较低。难民危机将继续影响周边国家。',
            keyPoints: [
                '马杜罗政府稳定性',
                '美国制裁政策调整',
                '反对派政治空间',
                '石油产量恢复情况',
                '难民问题区域影响'
            ]
        },
        relatedNews: [
            { date: '2026-02-22', title: '委内瑞拉石油产量恢复至每日80万桶', source: 'Reuters' },
            { date: '2026-02-18', title: '美国考虑放松部分对委制裁以促进对话', source: 'Bloomberg' }
        ]
    },
    {
        id: 5,
        type: 'geopolitical',
        title: '朝鲜危机',
        titleEn: 'North Korea Crisis',
        location: '朝鲜半岛',
        region: 'Asia',
        conflictType: 'Interstate',
        importance: 'high',
        coordinates: { x: 86, y: 26 },
        cfrImpact: 'Significant',
        cfrStatus: 'Unchanging',
        countries: ['KP'],
        summary: '朝鲜持续发展核武器和弹道导弹项目，多次进行导弹试射。朝美无核化谈判陷入僵局。朝鲜半岛仍是全球最危险的军事对峙区域之一。',
        analysis: '朝鲜已发展成为核武器国家，拥有数十枚核弹头和多种射程的弹道导弹。金正恩政权继续推进军事现代化，同时加强与中国和俄罗斯的关系。美国对朝政策陷入困境。',
        keyFactors: [
            '朝鲜核武器与导弹进展',
            '美朝对话前景',
            '韩朝关系',
            '中俄对朝态度'
        ],
        marketImpact: [
            '东北亚地缘风险',
            '韩元波动',
            '避险情绪上升'
        ],
        cfrUrl: 'https://www.cfr.org/global-conflict-tracker/conflict/north-korea-crisis',
        newsLinks: [
            { title: 'CFR - North Korea', url: 'https://www.cfr.org/global-conflict-tracker/conflict/north-korea-crisis' },
            { title: 'NK News', url: 'https://www.nknews.org/' },
            { title: '38 North', url: 'https://www.38north.org/' }
        ],
        outlook: {
            expectation: '朝鲜将继续推进核武器和导弹项目，预计2026年将进行多次导弹试射。朝美对话前景黯淡，特朗普政府可能尝试有限接触但难以取得突破。韩朝关系将持续紧张。',
            keyPoints: [
                '朝鲜导弹试射频率与类型',
                '朝美接触可能性',
                '韩国对朝政策调整',
                '中朝俄三角关系',
                '朝鲜经济状况'
            ]
        },
        relatedNews: [
            { date: '2026-02-25', title: '朝鲜向东海岸发射两枚短程弹道导弹', source: 'Yonhap' },
            { date: '2026-02-20', title: '韩美联合军演规模扩大，朝鲜强烈抗议', source: 'Reuters' },
            { date: '2026-02-15', title: '朝鲜外相访问俄罗斯，讨论军事合作', source: 'TASS' }
        ]
    },
    {
        id: 6,
        type: 'geopolitical',
        title: '南海领土争端',
        titleEn: 'Territorial Disputes in the South China Sea',
        location: '南海',
        region: 'Asia',
        conflictType: 'Territorial Dispute',
        importance: 'high',
        coordinates: { x: 78, y: 45 },
        cfrImpact: 'Critical',
        cfrStatus: 'Unchanging',
        countries: ['BN', 'CN', 'ID', 'MY', 'PH', 'TW', 'VN'],
        summary: '中国、越南、菲律宾、马来西亚、文莱和台湾对南海部分岛礁和海域声称拥有主权。中国持续在南海进行岛礁建设和军事化活动，引发地区紧张。',
        analysis: '南海是全球最繁忙的航运通道之一，每年约3.4万亿美元贸易通过此地。中国在南海的人工岛礁上部署了军事设施，2016年国际仲裁庭裁决中国"九段线"主张无法律依据，但中国拒绝接受。',
        keyFactors: [
            '中国岛礁军事化',
            '美国航行自由行动',
            '菲律宾国际诉讼后续',
            '东盟统一立场'
        ],
        marketImpact: [
            '全球贸易路线安全',
            '能源运输通道',
            '区域投资环境'
        ],
        cfrUrl: 'https://www.cfr.org/global-conflict-tracker/conflict/territorial-disputes-south-china-sea',
        newsLinks: [
            { title: 'CFR - South China Sea', url: 'https://www.cfr.org/global-conflict-tracker/conflict/territorial-disputes-south-china-sea' },
            { title: 'CSIS AMTI', url: 'https://amti.csis.org/' },
            { title: 'Reuters - South China Sea', url: 'https://www.reuters.com/south-china-sea/' }
        ],
        outlook: {
            expectation: '南海紧张局势将持续，中国将继续加强在南海的军事存在。菲律宾与中国的海上对峙可能进一步升级。美国将继续航行自由行动，但直接军事冲突风险仍然较低。',
            keyPoints: [
                '中菲海上对峙频次',
                '美国航行自由行动',
                '东盟共同立场形成',
                '南海行为准则谈判',
                '越南马来西亚态度'
            ]
        },
        relatedNews: [
            { date: '2026-02-26', title: '中国海警在仁爱礁使用水炮驱离菲律宾船只', source: 'Reuters' },
            { date: '2026-02-22', title: '美国海军驱逐舰穿越南海，中国军方跟踪监视', source: 'USNI' },
            { date: '2026-02-18', title: '东盟外长会议讨论南海问题', source: 'ASEAN' }
        ]
    },

    // ============ Significant 级别冲突 ============
    {
        id: 7,
        type: 'geopolitical',
        title: '北部三角不稳定',
        titleEn: 'Instability in the Northern Triangle',
        location: '危地马拉/洪都拉斯/萨尔瓦多',
        region: 'Americas',
        conflictType: 'Political Instability',
        importance: 'high',
        coordinates: { x: 18, y: 48 },
        cfrImpact: 'Significant',
        cfrStatus: 'Unchanging',
        countries: ['SV', 'GT', 'HN'],
        summary: '中美洲北部三角国家（萨尔瓦多、危地马拉、洪都拉斯）长期受帮派暴力、腐败和贫困困扰，导致大量移民涌向美国边境。',
        analysis: '北部三角国家是向美国移民的主要来源地之一。帮派暴力和有组织犯罪导致这些国家成为世界上凶杀率最高的地区之一。美国援助计划"中美洲北部三角繁荣伙伴关系"效果有限。',
        keyFactors: [
            '帮派暴力与犯罪率',
            '腐败与治理失败',
            '经济发展滞后',
            '美国移民政策影响'
        ],
        marketImpact: [
            '美国移民压力',
            '区域投资环境',
            '对外援助效率'
        ],
        cfrUrl: 'https://www.cfr.org/global-conflict-tracker/conflict/instability-northern-triangle',
        newsLinks: [
            { title: 'CFR - Northern Triangle', url: 'https://www.cfr.org/global-conflict-tracker/conflict/instability-northern-triangle' }
        ],
        outlook: {
            expectation: '北部三角国家的不稳定将持续，帮派暴力和腐败问题难以在短期内解决。美国移民政策将继续影响该地区，但援助效果有限。萨尔瓦多的安全状况有所改善，但民主制度受到侵蚀。',
            keyPoints: [
                '帮派暴力趋势',
                '美国移民政策变化',
                '萨尔瓦多民主倒退',
                '区域经济合作',
                '美国援助资金分配'
            ]
        },
        relatedNews: [
            { date: '2026-02-20', title: '美国宣布对北部三角国家提供新援助', source: 'State Dept' },
            { date: '2026-02-15', title: '萨尔瓦多总统宣布打击帮派行动取得成功', source: 'Reuters' }
        ]
    },
    {
        id: 8,
        type: 'geopolitical',
        title: '海地暴力犯罪',
        titleEn: 'Criminal Violence in Haiti',
        location: '海地',
        region: 'Americas',
        conflictType: 'Criminal Violence',
        importance: 'high',
        coordinates: { x: 22, y: 52 },
        cfrImpact: 'Significant',
        cfrStatus: 'Worsening',
        countries: ['HT'],
        summary: '海地帮派暴力急剧升级，武装团伙控制首都太子港大部分地区。人道主义危机加剧，数十万人流离失所。政府功能近乎瘫痪。',
        analysis: '海地陷入前所未有的危机，武装帮派控制了首都约80%的区域。2024年以来的政治动荡使政府无法有效运作。饥饿和疾病蔓延，国际社会援助难以送达。',
        keyFactors: [
            '帮派势力扩张',
            '政府功能瘫痪',
            '人道主义危机',
            '国际干预效果'
        ],
        marketImpact: [
            '加勒比地区稳定',
            '美国边境压力',
            '人道主义援助成本'
        ],
        cfrUrl: 'https://www.cfr.org/global-conflict-tracker/conflict/criminal-violence-haiti',
        newsLinks: [
            { title: 'CFR - Haiti', url: 'https://www.cfr.org/global-conflict-tracker/conflict/criminal-violence-haiti' }
        ],
        outlook: {
            expectation: '海地局势短期内难以改善，帮派势力将继续扩张。肯尼亚领导的多国安全部队部署进展缓慢，效果存疑。人道主义危机将进一步恶化，更多海地人将尝试前往美国。',
            keyPoints: [
                '多国安全部队部署进展',
                '帮派控制区域变化',
                '人道主义援助通道',
                '美国海地移民政策',
                '过渡政府组建可能性'
            ]
        },
        relatedNews: [
            { date: '2026-02-25', title: '海地帮派控制太子港主要港口，食品供应中断', source: 'Reuters' },
            { date: '2026-02-20', title: '肯尼亚安全部队首批人员抵达海地', source: 'BBC' },
            { date: '2026-02-15', title: '美国对海地实施新的旅行限制', source: 'State Dept' }
        ]
    },
    {
        id: 9,
        type: 'geopolitical',
        title: '也门与红海冲突',
        titleEn: 'Conflict in Yemen and the Red Sea',
        location: '也门/红海',
        region: 'Middle East and North Africa',
        conflictType: 'Transnational Terrorism',
        importance: 'high',
        coordinates: { x: 60, y: 52 },
        cfrImpact: 'Significant',
        cfrStatus: 'Unchanging',
        countries: ['YE'],
        summary: '也门内战持续多年，胡塞武装控制北部大部分地区。2024年以来，胡塞武装在红海袭击商船，引发国际军事反应。全球贸易路线受到严重影响。',
        analysis: '胡塞武装对红海商船的袭击迫使许多航运公司绕行非洲好望角，大幅增加运输成本和时间。美国主导的多国联军对胡塞目标进行打击，但效果有限。也门和平进程仍然脆弱。',
        keyFactors: [
            '胡塞武装红海袭击',
            '国际航运安全',
            '也门内部和平进程',
            '伊朗对胡塞支持'
        ],
        marketImpact: [
            '全球航运成本上升',
            '供应链延迟',
            '能源运输风险',
            '保险费率上涨'
        ],
        cfrUrl: 'https://www.cfr.org/global-conflict-tracker/conflict/conflict-yemen-and-red-sea',
        newsLinks: [
            { title: 'CFR - Yemen', url: 'https://www.cfr.org/global-conflict-tracker/conflict/conflict-yemen-and-red-sea' }
        ],
        outlook: {
            expectation: '红海航运危机将持续，胡塞武装将继续袭击与以色列相关船只。美军对胡塞目标的打击效果有限，难以根本消除威胁。也门和平进程前景黯淡，人道主义危机加剧。',
            keyPoints: [
                '胡塞武装袭击频率与范围',
                '美军及盟友军事反应',
                '航运成本与保险费率',
                '也门和平谈判进展',
                '伊朗对胡塞支持程度'
            ]
        },
        relatedNews: [
            { date: '2026-02-26', title: '胡塞武装袭击红海商船，美国军舰拦截', source: 'Reuters' },
            { date: '2026-02-22', title: '马士基宣布继续绕行好望角', source: 'Bloomberg' },
            { date: '2026-02-18', title: '美军对也门胡塞目标进行新一轮空袭', source: 'CENTCOM' }
        ]
    },
    {
        id: 10,
        type: 'geopolitical',
        title: '印巴冲突',
        titleEn: 'Conflict Between India and Pakistan',
        location: '克什米尔地区',
        region: 'Asia',
        conflictType: 'Interstate',
        importance: 'high',
        coordinates: { x: 70, y: 38 },
        cfrImpact: 'Significant',
        cfrStatus: 'Unchanging',
        countries: ['IN', 'PK'],
        summary: '印度和巴基斯坦因克什米尔领土争端长期对峙。两国都是核武器国家，边境冲突时有发生。2019年印度取消克什米尔特殊地位后紧张加剧。',
        analysis: '印巴关系持续紧张，双方在克什米尔实际控制线附近频繁发生交火。跨境恐怖主义是关系改善的主要障碍。两国都是核武器国家，冲突升级风险极高。',
        keyFactors: [
            '克什米尔主权争端',
            '跨境恐怖主义',
            '核武器风险',
            '水资源争端'
        ],
        marketImpact: [
            '南亚区域稳定',
            '印度投资环境',
            '中巴经济走廊'
        ],
        cfrUrl: 'https://www.cfr.org/global-conflict-tracker/conflict/conflict-between-india-and-pakistan',
        newsLinks: [
            { title: 'CFR - India Pakistan', url: 'https://www.cfr.org/global-conflict-tracker/conflict/conflict-between-india-and-pakistan' }
        ],
        outlook: {
            expectation: '印巴关系将保持紧张但可控状态。克什米尔实际控制线附近交火将持续，但全面冲突风险较低。巴基斯坦政局不稳将限制其对印政策空间。',
            keyPoints: [
                '克什米尔实际控制线局势',
                '跨境恐怖袭击事件',
                '巴基斯坦政治稳定',
                '印度大选后政策走向',
                '中印巴三角关系'
            ]
        },
        relatedNews: [
            { date: '2026-02-24', title: '印巴在克什米尔实际控制线交火，双方互指挑衅', source: 'Reuters' },
            { date: '2026-02-18', title: '印度加强克什米尔地区安全部署', source: 'Hindustan Times' }
        ]
    },
    {
        id: 11,
        type: 'geopolitical',
        title: '巴以冲突',
        titleEn: 'Israeli-Palestinian Conflict',
        location: '加沙地带/以色列',
        region: 'Middle East and North Africa',
        conflictType: 'Territorial Dispute',
        importance: 'high',
        coordinates: { x: 54, y: 45 },
        cfrImpact: 'Significant',
        cfrStatus: 'Unchanging',
        countries: ['IL', 'PS'],
        summary: '巴以冲突持续数十年，2023年10月哈马斯袭击后爆发大规模军事冲突。加沙地带遭受严重人道主义危机，平民伤亡惨重。',
        analysis: '本轮巴以冲突是数十年来最激烈的一次。以色列对加沙进行全面军事行动，造成大量平民伤亡和基础设施破坏。国际社会呼吁停火，但持久和平方案仍遥不可及。',
        keyFactors: [
            '加沙军事行动',
            '人质释放谈判',
            '人道主义危机',
            '两国方案前景'
        ],
        marketImpact: [
            '中东地缘风险',
            '原油价格波动',
            '区域投资信心'
        ],
        cfrUrl: 'https://www.cfr.org/global-conflict-tracker/conflict/israeli-palestinian-conflict',
        newsLinks: [
            { title: 'CFR - Israel Palestine', url: 'https://www.cfr.org/global-conflict-tracker/conflict/israeli-palestinian-conflict' }
        ]
    },
    {
        id: 12,
        type: 'geopolitical',
        title: '墨西哥暴力犯罪',
        titleEn: 'Criminal Violence in Mexico',
        location: '墨西哥',
        region: 'Americas',
        conflictType: 'Criminal Violence',
        importance: 'high',
        coordinates: { x: 15, y: 48 },
        cfrImpact: 'Significant',
        cfrStatus: 'Worsening',
        countries: ['MX'],
        summary: '墨西哥贩毒集团暴力活动持续升级，凶杀率居高不下。毒品贸易和有组织犯罪严重威胁国家安全和法治。',
        analysis: '墨西哥贩毒集团控制着大量通往美国的毒品贸易路线。尽管政府持续打击，但暴力事件频发。美墨边境安全和毒品问题成为两国关系的重要议题。',
        keyFactors: [
            '贩毒集团势力',
            '政府反毒政策',
            '美国毒品需求',
            '司法改革进展'
        ],
        marketImpact: [
            '墨西哥投资环境',
            '美墨边境贸易',
            '旅游业影响'
        ],
        cfrUrl: 'https://www.cfr.org/global-conflict-tracker/conflict/criminal-violence-mexico',
        newsLinks: [
            { title: 'CFR - Mexico', url: 'https://www.cfr.org/global-conflict-tracker/conflict/criminal-violence-mexico' }
        ]
    },
    {
        id: 13,
        type: 'geopolitical',
        title: '黎巴嫩真主党冲突',
        titleEn: 'Conflict With Hezbollah in Lebanon',
        location: '黎巴嫩',
        region: 'Middle East and North Africa',
        conflictType: 'Interstate',
        importance: 'high',
        coordinates: { x: 55, y: 44 },
        cfrImpact: 'Significant',
        cfrStatus: 'Unchanging',
        countries: ['LB'],
        summary: '真主党是黎巴嫩最强大的武装组织，拥有大量导弹和战斗人员。与以色列的边境冲突持续，地区紧张局势加剧。',
        analysis: '真主党被视为伊朗在中东最重要的代理力量。该组织拥有数万枚导弹，对以色列构成重大威胁。黎巴嫩政治和经济危机使局势更加复杂。',
        keyFactors: [
            '真主党军事能力',
            '伊朗支持',
            '黎巴嫩政治危机',
            '以黎边境紧张'
        ],
        marketImpact: [
            '中东局势稳定',
            '黎巴嫩经济崩溃',
            '以色列安全环境'
        ],
        cfrUrl: 'https://www.cfr.org/global-conflict-tracker/conflict/conflict-hezbollah-lebanon',
        newsLinks: [
            { title: 'CFR - Hezbollah', url: 'https://www.cfr.org/global-conflict-tracker/conflict/conflict-hezbollah-lebanon' }
        ]
    },

    // ============ Limited 级别冲突 ============
    {
        id: 14,
        type: 'geopolitical',
        title: '苏丹内战',
        titleEn: 'Civil War in Sudan',
        location: '苏丹',
        region: 'Middle East and North Africa',
        conflictType: 'Civil War',
        importance: 'high',
        coordinates: { x: 52, y: 53 },
        cfrImpact: 'Limited',
        cfrStatus: 'Worsening',
        countries: ['SD'],
        summary: '苏丹武装部队与快速支援部队之间的内战自2023年4月爆发，造成数万人死亡，超过1000万人流离失所。人道主义危机严重。',
        analysis: '苏丹内战是当前世界上最严重的人道主义危机之一。两大军事派系的权力斗争导致国家陷入混乱。国际调停努力收效甚微，冲突可能持续。',
        keyFactors: [
            '军事派系权力斗争',
            '人道主义危机',
            '国际调停效果',
            '邻国干预'
        ],
        marketImpact: [
            '非洲区域稳定',
            '人道主义援助成本',
            '红海安全间接影响'
        ],
        cfrUrl: 'https://www.cfr.org/global-conflict-tracker/conflict/civil-war-sudan',
        newsLinks: [
            { title: 'CFR - Sudan', url: 'https://www.cfr.org/global-conflict-tracker/conflict/civil-war-sudan' }
        ],
        outlook: {
            expectation: '冲突短期内难以结束，双方均无妥协意愿。人道主义危机将持续恶化，可能成为全球最严重的人道灾难。',
            keyPoints: [
                '停火谈判进展缓慢',
                '大规模饥荒风险加剧',
                '邻国面临难民压力',
                '国际援助通道受阻'
            ],
            timeline: '预计2026年冲突仍将持续，实质性和平谈判可能要到2027年'
        },
        relatedNews: [
            { date: '2026-02-20', title: '联合国警告苏丹面临大规模饥荒', source: 'UN News' },
            { date: '2026-02-15', title: '苏丹冲突双方在吉达重启停火谈判', source: 'Reuters' },
            { date: '2026-02-10', title: '快速支援部队控制达尔富尔大部分地区', source: 'Al Jazeera' }
        ]
    },
    {
        id: 15,
        type: 'geopolitical',
        title: '萨赫勒极端主义',
        titleEn: 'Violent Extremism in the Sahel',
        location: '萨赫勒地区',
        region: 'Sub-Saharan Africa',
        conflictType: 'Transnational Terrorism',
        importance: 'medium',
        coordinates: { x: 40, y: 55 },
        cfrImpact: 'Limited',
        cfrStatus: 'Worsening',
        countries: ['BF', 'TD', 'ML', 'NE', 'NG'],
        summary: '萨赫勒地区（布基纳法索、乍得、马里、尼日尔、尼日利亚）面临伊斯兰极端主义势力扩张。恐怖袭击频发，地区安全形势恶化。',
        analysis: '萨赫勒地区是全球恐怖主义增长最快的地区之一。伊斯兰极端组织利用地区贫困、治理薄弱扩张势力。法国撤军后，地区安全真空加剧。',
        keyFactors: [
            '伊斯兰极端组织扩张',
            '地区治理薄弱',
            '法国撤军影响',
            '俄罗斯瓦格纳介入'
        ],
        marketImpact: [
            '非洲区域稳定',
            '铀矿供应（尼日尔）',
            '国际反恐成本'
        ],
        cfrUrl: 'https://www.cfr.org/global-conflict-tracker/conflict/violent-extremism-sahel',
        newsLinks: [
            { title: 'CFR - Sahel', url: 'https://www.cfr.org/global-conflict-tracker/conflict/violent-extremism-sahel' }
        ],
        outlook: {
            expectation: '极端主义势力将继续扩张，地区军政府难以有效应对。恐怖袭击频率可能进一步增加。',
            keyPoints: [
                'JNIM和ISIS-GS势力扩张',
                '军政府治理能力薄弱',
                '俄罗斯瓦格纳集团影响力下降',
                '西方国家重新评估援助策略'
            ],
            timeline: '2026年地区安全形势预计持续恶化，反恐行动效果有限'
        },
        relatedNews: [
            { date: '2026-02-18', title: '布基纳法索袭击造成数十名平民死亡', source: 'BBC' },
            { date: '2026-02-12', title: '马里军政府与瓦格纳关系出现裂痕', source: 'Financial Times' },
            { date: '2026-02-05', title: '尼日尔要求美国撤出军事基地', source: 'AP News' }
        ]
    },
    {
        id: 16,
        type: 'geopolitical',
        title: '埃塞俄比亚冲突',
        titleEn: 'Conflict in Ethiopia',
        location: '埃塞俄比亚',
        region: 'Sub-Saharan Africa',
        conflictType: 'Political Instability',
        importance: 'medium',
        coordinates: { x: 56, y: 55 },
        cfrImpact: 'Limited',
        cfrStatus: 'Worsening',
        countries: ['ET'],
        summary: '埃塞俄比亚提格雷冲突虽已缓和，但阿姆哈拉州和奥罗米亚州的暴力冲突持续。民族矛盾和政治危机威胁国家统一。',
        analysis: '埃塞俄比亚是非洲人口第二大国，其稳定对整个非洲之角地区至关重要。提格雷战争虽已结束，但民族矛盾和权力分配问题仍未解决。',
        keyFactors: [
            '民族矛盾激化',
            '政治权力分配',
            '人道主义状况',
            '区域影响'
        ],
        marketImpact: [
            '非洲之角稳定',
            '咖啡出口影响',
            '区域投资环境'
        ],
        cfrUrl: 'https://www.cfr.org/global-conflict-tracker/conflict/conflict-ethiopia',
        newsLinks: [
            { title: 'CFR - Ethiopia', url: 'https://www.cfr.org/global-conflict-tracker/conflict/conflict-ethiopia' }
        ],
        outlook: {
            expectation: '阿姆哈拉州冲突持续升级，奥罗米亚州分离主义活动加剧。联邦政府面临多重挑战，国家统一受到威胁。',
            keyPoints: [
                '阿姆哈拉州民兵与联邦军对抗',
                '奥罗米亚解放阵线活动增加',
                '提格雷地区重建缓慢',
                '人道主义援助需求巨大'
            ],
            timeline: '2026年政治不稳定将持续，可能在2027年迎来关键选举'
        },
        relatedNews: [
            { date: '2026-02-22', title: '埃塞俄比亚宣布阿姆哈拉州进入紧急状态', source: 'Al Jazeera' },
            { date: '2026-02-14', title: '联合国呼吁增加埃塞俄比亚人道主义援助', source: 'UN News' },
            { date: '2026-02-08', title: '埃塞俄比亚与索马里兰港口协议引发争议', source: 'Reuters' }
        ]
    },
    {
        id: 17,
        type: 'geopolitical',
        title: '利比亚内战',
        titleEn: 'Civil Conflict in Libya',
        location: '利比亚',
        region: 'Middle East and North Africa',
        conflictType: 'Civil War',
        importance: 'medium',
        coordinates: { x: 52, y: 42 },
        cfrImpact: 'Limited',
        cfrStatus: 'Unchanging',
        countries: ['LY'],
        summary: '利比亚自2011年卡扎菲政权倒台后持续动荡，东西部政权对峙。石油生产和出口受政治分裂影响。',
        analysis: '利比亚拥有非洲最大已探明石油储量，但政治分裂严重影响石油产量。东西部政权各有外国支持者，统一政府前景渺茫。',
        keyFactors: [
            '东西部政权对峙',
            '石油设施控制',
            '外国势力干预',
            '移民偷渡问题'
        ],
        marketImpact: [
            '国际原油供应',
            '地中海移民危机',
            '北非区域稳定'
        ],
        cfrUrl: 'https://www.cfr.org/global-conflict-tracker/conflict/civil-conflict-libya',
        newsLinks: [
            { title: 'CFR - Libya', url: 'https://www.cfr.org/global-conflict-tracker/conflict/civil-conflict-libya' }
        ],
        outlook: {
            expectation: '政治分裂持续，石油收入争夺加剧。选举一再推迟，统一政府短期内难以实现。',
            keyPoints: [
                '东西部政府石油收入分配争端',
                '总统选举日期未定',
                '土耳其与俄罗斯在利影响力竞争',
                '地中海天然气开发争议'
            ],
            timeline: '2026年选举前景不明，分裂状态可能持续至2027年'
        },
        relatedNews: [
            { date: '2026-02-19', title: '利比亚东部政府宣布关闭油田', source: 'Bloomberg' },
            { date: '2026-02-11', title: '联合国特使敦促利比亚尽快举行选举', source: 'UN News' },
            { date: '2026-02-03', title: '利比亚国家石油公司产量恢复至120万桶/日', source: 'Reuters' }
        ]
    },
    {
        id: 18,
        type: 'geopolitical',
        title: '索马里青年党冲突',
        titleEn: 'Conflict With Al-Shabaab in Somalia',
        location: '索马里',
        region: 'Sub-Saharan Africa',
        conflictType: 'Transnational Terrorism',
        importance: 'medium',
        coordinates: { x: 58, y: 58 },
        cfrImpact: 'Limited',
        cfrStatus: 'Unchanging',
        countries: ['SO'],
        summary: '索马里青年党是东非最致命的恐怖组织之一，控制索马里南部和中部大部分地区。经常在索马里和肯尼亚发动袭击。',
        analysis: '索马里青年党宣誓效忠基地组织，拥有数千名武装人员。非洲联盟部队和索马里政府军难以彻底消灭该组织。',
        keyFactors: [
            '青年党军事能力',
            '索马里政府治理',
            '非盟部队作用',
            '地区反恐合作'
        ],
        marketImpact: [
            '东非区域稳定',
            '索马里海域安全',
            '肯尼亚旅游业'
        ],
        cfrUrl: 'https://www.cfr.org/global-conflict-tracker/conflict/conflict-al-shabaab-somalia',
        newsLinks: [
            { title: 'CFR - Somalia', url: 'https://www.cfr.org/global-conflict-tracker/conflict/conflict-al-shabaab-somalia' }
        ],
        outlook: {
            expectation: '青年党继续控制索马里南部大片地区，政府军反攻进展有限。恐怖袭击频率可能维持高位。',
            keyPoints: [
                '青年党控制区仍占国土约三分之一',
                '非盟过渡特派团计划2024年底撤出',
                '索马里政府军能力建设缓慢',
                '部落政治影响反恐效率'
            ],
            timeline: '青年党威胁预计将持续多年，2026年难以取得决定性突破'
        },
        relatedNews: [
            { date: '2026-02-21', title: '青年党袭击摩加迪沙酒店造成多人伤亡', source: 'Al Jazeera' },
            { date: '2026-02-13', title: '美国对索马里青年党目标发动空袭', source: 'AP News' },
            { date: '2026-02-06', title: '索马里总统承诺加强反恐行动', source: 'BBC' }
        ]
    },
    {
        id: 19,
        type: 'geopolitical',
        title: '土耳其与库尔德武装冲突',
        titleEn: 'Conflict Between Turkey and Armed Kurdish Groups',
        location: '土耳其/伊拉克/叙利亚',
        region: 'Middle East and North Africa',
        conflictType: 'Territorial Dispute',
        importance: 'medium',
        coordinates: { x: 56, y: 36 },
        cfrImpact: 'Limited',
        cfrStatus: 'Improving',
        countries: ['IQ', 'SY', 'TR'],
        summary: '土耳其与库尔德工人党（PKK）冲突持续数十年。土耳其多次越境打击伊拉克和叙利亚北部的库尔德武装。',
        analysis: '库尔德问题是土耳其面临的核心安全挑战之一。PKK与土耳其政府的冲突已造成数万人死亡。近年来土耳其加大了对叙利亚北部库尔德武装的打击力度。',
        keyFactors: [
            'PKK武装活动',
            '土耳其越境打击',
            '叙利亚库尔德势力',
            '美国对叙政策'
        ],
        marketImpact: [
            '土耳其安全环境',
            '区域反恐合作',
            '叙利亚局势'
        ],
        cfrUrl: 'https://www.cfr.org/global-conflict-tracker/conflict/conflict-between-turkey-and-armed-kurdish-groups',
        newsLinks: [
            { title: 'CFR - Turkey Kurds', url: 'https://www.cfr.org/global-conflict-tracker/conflict/conflict-between-turkey-and-armed-kurdish-groups' }
        ],
        outlook: {
            expectation: '冲突将持续但强度可能有所降低。土耳其将继续越境打击行动，但PKK武装活动可能减弱。',
            keyPoints: [
                'PKK领导层更迭影响',
                '土耳其总统选举后政策延续',
                '叙利亚北部安全区扩大',
                '美土在叙利亚问题分歧'
            ],
            timeline: '低强度冲突预计持续，2026年难有重大突破'
        },
        relatedNews: [
            { date: '2026-02-17', title: '土耳其对伊拉克北部库尔德武装发动新攻势', source: 'Al Jazeera' },
            { date: '2026-02-09', title: 'PKK宣布暂停部分军事活动', source: 'Reuters' },
            { date: '2026-02-01', title: '土耳其与美国讨论叙利亚库尔德问题', source: 'AP News' }
        ]
    },
    {
        id: 20,
        type: 'geopolitical',
        title: '伊拉克不稳定',
        titleEn: 'Instability in Iraq',
        location: '伊拉克',
        region: 'Middle East and North Africa',
        conflictType: 'Political Instability',
        importance: 'medium',
        coordinates: { x: 56, y: 38 },
        cfrImpact: 'Limited',
        cfrStatus: 'Worsening',
        countries: ['IQ'],
        summary: '伊拉克政治不稳定持续，教派矛盾和腐败问题严重。伊朗和美国在伊拉克的竞争影响国家主权。',
        analysis: '伊拉克是伊朗和美国在中东竞争的重要战场。亲伊朗民兵组织在伊拉克拥有相当影响力，经常袭击美军目标。伊拉克政府难以平衡各方势力。',
        keyFactors: [
            '教派政治矛盾',
            '伊朗影响力',
            '美军存在争议',
            '石油收入分配'
        ],
        marketImpact: [
            '国际原油供应',
            '中东区域稳定',
            '美国伊朗关系'
        ],
        cfrUrl: 'https://www.cfr.org/global-conflict-tracker/conflict/instability-iraq',
        newsLinks: [
            { title: 'CFR - Iraq', url: 'https://www.cfr.org/global-conflict-tracker/conflict/instability-iraq' }
        ],
        outlook: {
            expectation: '政治不稳定持续，亲伊朗民兵与美国支持的政府之间紧张关系加剧。石油产量波动可能影响全球供应。',
            keyPoints: [
                '议会选举后政府组建困难',
                '亲伊朗民兵袭击美军设施',
                '石油基础设施安全威胁',
                '腐败问题阻碍经济改革'
            ],
            timeline: '2026年政治动荡将持续，短期内难以实现稳定'
        },
        relatedNews: [
            { date: '2026-02-20', title: '伊拉克美军基地遭火箭弹袭击', source: 'Reuters' },
            { date: '2026-02-12', title: '伊拉克政府与亲伊朗民兵举行谈判', source: 'Al Jazeera' },
            { date: '2026-02-05', title: '伊拉克石油产量恢复至450万桶/日', source: 'Bloomberg' }
        ]
    },
    {
        id: 21,
        type: 'geopolitical',
        title: '南苏丹不稳定',
        titleEn: 'Instability in South Sudan',
        location: '南苏丹',
        region: 'Sub-Saharan Africa',
        conflictType: 'Political Instability',
        importance: 'medium',
        coordinates: { x: 56, y: 54 },
        cfrImpact: 'Limited',
        cfrStatus: 'Worsening',
        countries: ['SS'],
        summary: '南苏丹自2011年独立以来持续动荡，内战和族际冲突导致严重人道主义危机。和平协议脆弱。',
        analysis: '南苏丹是世界上最年轻的国家，但独立后陷入内战。尽管签署了和平协议，但族群矛盾和权力斗争持续。石油收入分配是核心争议之一。',
        keyFactors: [
            '族际冲突',
            '权力分享争议',
            '石油收入分配',
            '人道主义危机'
        ],
        marketImpact: [
            '非洲区域稳定',
            '石油供应',
            '人道援助成本'
        ],
        cfrUrl: 'https://www.cfr.org/global-conflict-tracker/conflict/instability-south-sudan',
        newsLinks: [
            { title: 'CFR - South Sudan', url: 'https://www.cfr.org/global-conflict-tracker/conflict/instability-south-sudan' }
        ],
        outlook: {
            expectation: '和平协议执行缓慢，族群冲突和权力争夺持续。2024年选举可能推迟，政治过渡前景不明。',
            keyPoints: [
                '2024年12月选举可能推迟',
                '总统基尔与马查尔关系紧张',
                '石油产量下降影响财政收入',
                '洪水和干旱加剧人道危机'
            ],
            timeline: '2026年选举能否举行是关键，政治稳定可能要等到2027年后'
        },
        relatedNews: [
            { date: '2026-02-18', title: '南苏丹推迟原定大选引发担忧', source: 'Al Jazeera' },
            { date: '2026-02-10', title: '联合国警告南苏丹人道主义状况恶化', source: 'UN News' },
            { date: '2026-02-02', title: '南苏丹石油产量因管道问题下降', source: 'Reuters' }
        ]
    },
    {
        id: 22,
        type: 'geopolitical',
        title: '缅甸内战',
        titleEn: 'Civil War in Myanmar',
        location: '缅甸',
        region: 'Asia',
        conflictType: 'Civil War',
        importance: 'medium',
        coordinates: { x: 82, y: 42 },
        cfrImpact: 'Limited',
        cfrStatus: 'Unchanging',
        countries: ['MM'],
        summary: '缅甸自2021年军事政变以来陷入内战，军政府与少数民族武装和人民国防军激烈交战。平民遭受严重苦难。',
        analysis: '缅甸军政府面临前所未有的抵抗，全国范围内的武装反抗持续。经济崩溃和人道主义危机加剧。东盟调停效果有限。',
        keyFactors: [
            '军事政变后续',
            '武装反抗运动',
            '少数民族武装',
            '东盟调停作用'
        ],
        marketImpact: [
            '东南亚稳定',
            '能源投资',
            '区域合作'
        ],
        cfrUrl: 'https://www.cfr.org/global-conflict-tracker/conflict/civil-war-myanmar',
        newsLinks: [
            { title: 'CFR - Myanmar', url: 'https://www.cfr.org/global-conflict-tracker/conflict/civil-war-myanmar' }
        ],
        outlook: {
            expectation: '内战持续僵持，军政府控制力减弱但反抗军难以取得决定性胜利。人道主义危机进一步恶化。',
            keyPoints: [
                '反抗军控制边境大部分地区',
                '军政府空中打击频繁',
                '中国斡旋边境民族武装谈判',
                '西方制裁持续加码'
            ],
            timeline: '2026年内战将持续，政治解决方案遥遥无期'
        },
        relatedNews: [
            { date: '2026-02-22', title: '缅甸反抗军控制泰缅边境重要口岸', source: 'Reuters' },
            { date: '2026-02-15', title: '联合国报告称缅甸面临严重粮食危机', source: 'UN News' },
            { date: '2026-02-08', title: '军政府对反抗军控制区发动大规模空袭', source: 'Al Jazeera' }
        ]
    },
    {
        id: 23,
        type: 'geopolitical',
        title: '刚果民主共和国冲突',
        titleEn: 'Conflict in the Democratic Republic of Congo',
        location: '刚果民主共和国',
        region: 'Sub-Saharan Africa',
        conflictType: 'Political Instability',
        importance: 'medium',
        coordinates: { x: 52, y: 58 },
        cfrImpact: 'Limited',
        cfrStatus: 'Worsening',
        countries: ['CD'],
        summary: '刚果民主共和国东部地区长期不稳定，M23叛军和其他武装组织活动频繁。矿产资源争夺是冲突核心之一。',
        analysis: '刚果民主共和国拥有丰富的矿产资源，包括钴、铜等对全球科技产业至关重要的金属。东部地区的武装冲突严重影响矿产开采和人道主义状况。',
        keyFactors: [
            'M23叛军活动',
            '矿产资源争夺',
            '邻国干预',
            '人道主义危机'
        ],
        marketImpact: [
            '钴等关键矿产供应',
            '非洲区域稳定',
            '全球科技供应链'
        ],
        cfrUrl: 'https://www.cfr.org/global-conflict-tracker/conflict/conflict-democratic-republic-congo',
        newsLinks: [
            { title: 'CFR - DRC', url: 'https://www.cfr.org/global-conflict-tracker/conflict/conflict-democratic-republic-congo' }
        ],
        outlook: {
            expectation: 'M23叛军持续扩张，刚果(金)东部安全形势恶化。矿产供应链可能受到影响，全球钴供应面临风险。',
            keyPoints: [
                'M23叛军控制北基伍省大片地区',
                '卢旺达被指控支持叛军',
                '钴矿开采和运输受阻',
                '东非共同体军事部署效果有限'
            ],
            timeline: '2026年冲突可能进一步升级，短期内难以解决'
        },
        relatedNews: [
            { date: '2026-02-21', title: 'M23叛军逼近戈马市引发恐慌', source: 'Al Jazeera' },
            { date: '2026-02-14', title: '刚果(金)要求卢旺达撤出边境军队', source: 'Reuters' },
            { date: '2026-02-06', title: '全球钴价因刚果局势上涨15%', source: 'Bloomberg' }
        ]
    },
    {
        id: 24,
        type: 'geopolitical',
        title: '中非共和国冲突',
        titleEn: 'Conflict in the Central African Republic',
        location: '中非共和国',
        region: 'Sub-Saharan Africa',
        conflictType: 'Civil War',
        importance: 'low',
        coordinates: { x: 50, y: 56 },
        cfrImpact: 'Limited',
        cfrStatus: 'Unchanging',
        countries: ['CF'],
        summary: '中非共和国自2013年以来陷入教派冲突，穆斯林塞雷卡和基督教反巴拉卡武装对峙。政府控制力有限。',
        analysis: '中非共和国是世界上最贫穷的国家之一，长期受教派冲突困扰。联合国维和部队存在但效果有限。矿产资源被各方武装控制。',
        keyFactors: [
            '教派冲突',
            '政府治理薄弱',
            '武装组织林立',
            '外国雇佣军'
        ],
        marketImpact: [
            '中非区域稳定',
            '钻石贸易',
            '人道援助成本'
        ],
        cfrUrl: 'https://www.cfr.org/global-conflict-tracker/conflict/conflict-central-african-republic',
        newsLinks: [
            { title: 'CFR - CAR', url: 'https://www.cfr.org/global-conflict-tracker/conflict/conflict-central-african-republic' }
        ],
        outlook: {
            expectation: '低强度冲突持续，政府控制力有限。俄罗斯瓦格纳集团影响力下降可能改变力量平衡。',
            keyPoints: [
                '图阿德拉政权依靠外国支持',
                '瓦格纳集团撤出影响',
                '武装组织控制钻石矿区',
                '联合国维和部队面临预算压力'
            ],
            timeline: '2026年冲突将维持低强度状态，难有重大变化'
        },
        relatedNews: [
            { date: '2026-02-16', title: '中非共和国武装组织袭击造成数十人死亡', source: 'BBC' },
            { date: '2026-02-09', title: '瓦格纳集团减少在中非的存在', source: 'Reuters' },
            { date: '2026-02-01', title: '联合国延长中非维和任务期限', source: 'UN News' }
        ]
    },
    {
        id: 25,
        type: 'geopolitical',
        title: '叙利亚冲突',
        titleEn: 'Conflict in Syria',
        location: '叙利亚',
        region: 'Middle East and North Africa',
        conflictType: 'Political Instability',
        importance: 'medium',
        coordinates: { x: 56, y: 38 },
        cfrImpact: 'Limited',
        cfrStatus: 'Unchanging',
        countries: ['SY'],
        summary: '叙利亚内战自2011年以来持续，阿萨德政权在俄罗斯和伊朗支持下控制大部分领土。北部地区仍有土耳其和库尔德势力。',
        analysis: '叙利亚内战已造成数十万人死亡，数百万人流离失所。阿萨德政权虽然控制了大部分领土，但经济崩溃和制裁使重建困难。政治解决方案遥遥无期。',
        keyFactors: [
            '阿萨德政权稳固',
            '俄罗斯伊朗支持',
            '美国制裁效果',
            '难民回归问题'
        ],
        marketImpact: [
            '中东区域稳定',
            '难民危机',
            '能源运输'
        ],
        cfrUrl: 'https://www.cfr.org/global-conflict-tracker/conflict/conflict-syria',
        newsLinks: [
            { title: 'CFR - Syria', url: 'https://www.cfr.org/global-conflict-tracker/conflict/conflict-syria' }
        ],
        outlook: {
            expectation: '阿萨德政权持续执政，但经济困难和制裁压力加剧。阿拉伯国家逐步恢复与叙利亚关系，但全面正常化仍需时日。',
            keyPoints: [
                '阿拉伯联盟恢复叙利亚成员国资格',
                '美国《凯撒法案》制裁持续',
                '土耳其控制北部部分地区',
                '难民回归进展缓慢'
            ],
            timeline: '2026年政治格局基本稳定，经济重建将是主要挑战'
        },
        relatedNews: [
            { date: '2026-02-19', title: '叙利亚与沙特讨论重开大使馆', source: 'Al Jazeera' },
            { date: '2026-02-11', title: '美国延长对叙利亚制裁一年', source: 'Reuters' },
            { date: '2026-02-04', title: '土耳其与叙利亚关系出现缓和迹象', source: 'AP News' }
        ]
    },
    {
        id: 26,
        type: 'geopolitical',
        title: '阿富汗不稳定',
        titleEn: 'Instability in Afghanistan',
        location: '阿富汗',
        region: 'Asia',
        conflictType: 'Political Instability',
        importance: 'medium',
        coordinates: { x: 72, y: 34 },
        cfrImpact: 'Limited',
        cfrStatus: 'Unchanging',
        countries: ['AF'],
        summary: '塔利班2021年重新掌权后，阿富汗面临严重人道主义危机和经济崩溃。恐怖主义活动仍在继续。',
        analysis: '塔利班政权未获国际承认，阿富汗经济濒临崩溃。伊斯兰国呼罗珊分支（ISIS-K）在阿富汗活跃，对地区安全构成威胁。女性权利被严重剥夺。',
        keyFactors: [
            '塔利班统治',
            '人道主义危机',
            'ISIS-K威胁',
            '国际援助冻结'
        ],
        marketImpact: [
            '中亚南亚稳定',
            '恐怖主义风险',
            '难民问题'
        ],
        cfrUrl: 'https://www.cfr.org/global-conflict-tracker/conflict/instability-afghanistan',
        newsLinks: [
            { title: 'CFR - Afghanistan', url: 'https://www.cfr.org/global-conflict-tracker/conflict/instability-afghanistan' }
        ],
        outlook: {
            expectation: '塔利班政权持续执政但国际承认前景渺茫。人道主义危机深化，ISIS-K威胁区域安全。',
            keyPoints: [
                '塔利班内部权力斗争',
                '女性教育和就业权利被剥夺',
                'ISIS-K在阿富汗扩张',
                '邻国担心恐怖主义外溢'
            ],
            timeline: '2026年塔利班统治将延续，国际社会人道援助将持续'
        },
        relatedNews: [
            { date: '2026-02-20', title: '联合国呼吁增加阿富汗人道主义援助', source: 'UN News' },
            { date: '2026-02-13', title: 'ISIS-K声称对喀布尔袭击负责', source: 'Al Jazeera' },
            { date: '2026-02-05', title: '塔利班进一步限制女性权利', source: 'BBC' }
        ]
    },
    {
        id: 27,
        type: 'geopolitical',
        title: '巴基斯坦不稳定',
        titleEn: 'Instability in Pakistan',
        location: '巴基斯坦',
        region: 'Asia',
        conflictType: 'Transnational Terrorism',
        importance: 'medium',
        coordinates: { x: 70, y: 36 },
        cfrImpact: 'Limited',
        cfrStatus: 'Worsening',
        countries: ['PK'],
        summary: '巴基斯坦面临政治不稳定、经济危机和恐怖主义三重挑战。巴基斯坦塔利班和俾路支分离主义活动频繁。',
        analysis: '巴基斯坦政治危机持续，前总理伊姆兰·汗被捕引发大规模抗议。经济濒临崩溃边缘，通胀高企。恐怖袭击事件增加，安全形势恶化。',
        keyFactors: [
            '政治危机',
            '经济崩溃风险',
            '恐怖主义活动',
            '阿富汗边境安全'
        ],
        marketImpact: [
            '南亚区域稳定',
            '中巴经济走廊',
            '核安全风险'
        ],
        cfrUrl: 'https://www.cfr.org/global-conflict-tracker/conflict/instability-pakistan',
        newsLinks: [
            { title: 'CFR - Pakistan', url: 'https://www.cfr.org/global-conflict-tracker/conflict/instability-pakistan' }
        ],
        outlook: {
            expectation: '政治不稳定持续，经济危机可能进一步恶化。恐怖主义威胁加剧，中巴经济走廊项目面临安全挑战。',
            keyPoints: [
                '2026年大选前景不明',
                'IMF援助谈判关键',
                '俾路支分离主义袭击增加',
                '巴基斯坦塔利班活动频繁'
            ],
            timeline: '2026年将是关键一年，经济和政治可能迎来转折点'
        },
        relatedNews: [
            { date: '2026-02-21', title: '巴基斯坦发生严重恐怖袭击造成50人死亡', source: 'Al Jazeera' },
            { date: '2026-02-14', title: 'IMF与巴基斯坦就新援助计划进行谈判', source: 'Reuters' },
            { date: '2026-02-07', title: '中巴经济走廊项目因安全担忧暂停', source: 'South China Morning Post' }
        ]
    },
    {
        id: 28,
        type: 'geopolitical',
        title: '亚美尼亚与阿塞拜疆紧张关系',
        titleEn: 'Tensions Between Armenia and Azerbaijan',
        location: '纳戈尔诺-卡拉巴赫地区',
        region: 'Europe and Eurasia',
        conflictType: 'Territorial Dispute',
        importance: 'medium',
        coordinates: { x: 60, y: 32 },
        cfrImpact: 'Limited',
        cfrStatus: 'Improving',
        countries: ['AM', 'AZ'],
        summary: '阿塞拜疆2023年9月收复纳戈尔诺-卡拉巴赫地区，结束了数十年的分离主义冲突。亚美尼亚与阿塞拜疆关系紧张但有所缓和。',
        analysis: '阿塞拜疆军事行动迅速结束了纳卡地区的分离主义政权。大量亚美尼亚族人逃离该地区。两国正在俄罗斯斡旋下进行和平谈判。',
        keyFactors: [
            '纳卡问题解决',
            '和平谈判进展',
            '俄罗斯影响力下降',
            '土耳其阿塞拜疆关系'
        ],
        marketImpact: [
            '南高加索稳定',
            '能源运输走廊',
            '俄罗斯地区影响力'
        ],
        cfrUrl: 'https://www.cfr.org/global-conflict-tracker/conflict/tensions-between-armenia-and-azerbaijan',
        newsLinks: [
            { title: 'CFR - Armenia Azerbaijan', url: 'https://www.cfr.org/global-conflict-tracker/conflict/tensions-between-armenia-and-azerbaijan' }
        ],
        outlook: {
            expectation: '和平谈判持续推进，两国关系有望正常化。但边境争端和难民问题仍是障碍。',
            keyPoints: [
                '和平协议谈判取得进展',
                '亚美尼亚寻求与西方接近',
                '俄罗斯在地区影响力下降',
                '中间走廊运输通道重要性上升'
            ],
            timeline: '2026年可能签署正式和平协议，关系正常化进程加速'
        },
        relatedNews: [
            { date: '2026-02-18', title: '亚美尼亚与阿塞拜疆达成边境划分初步协议', source: 'Reuters' },
            { date: '2026-02-10', title: '亚美尼亚议会批准加入国际刑事法院', source: 'Al Jazeera' },
            { date: '2026-02-03', title: '土耳其与亚美尼亚关系出现解冻迹象', source: 'AP News' }
        ]
    }
];

// ========================================
// 重大会议与事件数据
// 按时间排序，用户可自定义排列重点事件
// ========================================
const majorEventsData = [
    {
        id: 'me-1',
        type: 'major-event',
        eventType: 'political',
        title: '中国两会',
        titleEn: 'China\'s Two Sessions',
        date: '2026-03-05',
        endDate: '2026-03-15',
        location: '北京',
        region: 'Asia',
        importance: 'high',
        countries: ['CN'],
        coordinates: { lat: 41.0, lng: 105.0 },
        summary: '全国人民代表大会和中国人民政治协商会议，是中国最重要的年度政治事件。将审议政府工作报告、财政预算、十四五规划执行情况等核心议题。',
        analysis: '2026年两会将是观察中国政策走向的关键窗口。预计将聚焦经济复苏、科技创新、房地产风险化解、地方债务等议题。GDP目标设定、财政赤字率、货币政策取向将是市场关注焦点。',
        outlook: {
            expectation: '2026年两会预计将设定5%左右的GDP增长目标，延续稳健货币政策与积极财政政策组合。房地产"保交楼"政策可能进一步强化，科技创新自主可控将继续被强调。市场关注财政刺激规模与结构、消费刺激政策、民企支持措施等具体政策信号。',
            keyPoints: [
                'GDP增长目标设定（预计5%左右）',
                '财政赤字率与专项债规模',
                '房地产政策定调与"保交楼"资金安排',
                '科技创新与产业升级重点方向',
                '民营经济支持政策',
                '地方债务化解方案',
                '人口政策与老龄化应对',
                '国防预算增速'
            ]
        },
        keyFactors: [
            '经济增长目标与政策力度',
            '财政货币政策协调',
            '房地产风险化解进展',
            '中美关系影响',
            '人口结构变化'
        ],
        marketImpact: [
            'A股市场政策预期',
            '人民币汇率波动',
            '债券市场反应',
            '港股市场联动',
            '大宗商品需求预期'
        ],
        history: [
            { date: '2025-03', content: '2025年两会设定5%增长目标，强调"稳中求进"总基调' },
            { date: '2024-03', content: '2024年两会提出"新质生产力"概念，科技创新成为核心议题' },
            { date: '2023-03', content: '2023年两会完成政府换届，新一届领导班子亮相' }
        ],
        futureKeyDates: [
            { date: '2026-03-05', event: '人大会议开幕，政府工作报告发布' },
            { date: '2026-03-07', event: '发改委、财政部记者会' },
            { date: '2026-03-08', event: '外交部长记者会' },
            { date: '2026-03-15', event: '人大闭幕，总理记者会' }
        ],
        newsLinks: [
            { title: '新华社 - 两会专题', url: 'http://www.xinhuanet.com/politics/2026lh/' },
            { title: '人民日报 - 两会报道', url: 'http://politics.people.com.cn/GB/1024/' },
            { title: 'Reuters - China Politics', url: 'https://www.reuters.com/world/china/' },
            { title: 'Bloomberg - China', url: 'https://www.bloomberg.com/china' }
        ],
        relatedNews: [
            { date: '2026-02-25', title: '两会前瞻：经济目标设定成焦点，市场期待政策信号', source: '新华社' },
            { date: '2026-02-20', title: '多地两会释放稳增长信号，消费复苏成重点', source: '财新' }
        ]
    },
    {
        id: 'me-2',
        type: 'major-event',
        eventType: 'financial',
        title: 'G20财长和央行行长会议',
        titleEn: 'G20 Finance Ministers and Central Bank Governors Meeting',
        date: '2026-04-23',
        endDate: '2026-04-24',
        location: '华盛顿',
        region: 'Americas',
        importance: 'high',
        countries: ['US', 'CN', 'JP', 'DE', 'GB', 'FR', 'IN', 'BR', 'RU'],
        coordinates: { lat: 38.9, lng: -77.0 },
        summary: 'G20财长和央行行长会议是全球金融治理最重要的平台之一，将讨论全球经济形势、国际金融架构、可持续金融、跨境支付等核心议题。',
        analysis: '2026年G20财长会议将在美国华盛顿举行，正值全球经济复苏关键期。主要议题预计包括：全球通胀走势、美元霸权与去美元化、新兴市场债务危机、气候金融、数字货币监管等。中美经济对话将是重要看点。',
        outlook: {
            expectation: '会议预计将发表联合声明，强调全球经济韧性，但可能在债务重组、气候融资等议题上存在分歧。中美双边会谈将是市场关注焦点，可能就关税、汇率、金融监管等议题交换意见。',
            keyPoints: [
                '全球通胀走势与货币政策协调',
                '新兴市场债务重组框架',
                '气候金融与绿色转型',
                '跨境支付系统多元化',
                '数字货币监管协调',
                '中美经济对话进展',
                'IMF份额改革',
                '全球最低税率执行'
            ]
        },
        keyFactors: [
            '全球经济复苏态势',
            '主要央行政策分歧',
            '地缘政治影响',
            '中美经济关系',
            '新兴市场压力'
        ],
        marketImpact: [
            '全球汇率市场',
            '主权债券利差',
            '新兴市场资产',
            '美元指数走势',
            '跨境资本流动'
        ],
        history: [
            { date: '2025-10', content: 'G20财长会议在摩洛哥举行，讨论全球债务危机应对' },
            { date: '2025-04', content: 'G20财长会议讨论银行危机应对机制' },
            { date: '2024-10', content: 'G20财长会议聚焦发展中国家债务重组' }
        ],
        futureKeyDates: [
            { date: '2026-04-20', event: 'IMF/世行春季会议开幕' },
            { date: '2026-04-23', event: 'G20财长会议正式召开' },
            { date: '2026-04-24', event: '联合记者会与声明发布' },
            { date: '2026-10', event: 'G20财长秋季会议' }
        ],
        newsLinks: [
            { title: 'G20 Official', url: 'https://g20.org/' },
            { title: 'IMF - G20', url: 'https://www.imf.org/en/Topics/g20' },
            { title: 'Reuters - G20', url: 'https://www.reuters.com/world/g20/' },
            { title: 'Financial Times - G20', url: 'https://www.ft.com/g20' }
        ],
        relatedNews: [
            { date: '2026-02-22', title: 'G20财长会议前瞻：全球经济治理面临新挑战', source: 'Reuters' },
            { date: '2026-02-18', title: '中国央行行长将出席G20财长会议', source: '新华社' }
        ]
    },
    {
        id: 'me-3',
        type: 'major-event',
        eventType: 'diplomatic',
        title: '特朗普访华',
        titleEn: 'Trump\'s Visit to China',
        date: '2026-05-15',
        endDate: '2026-05-17',
        location: '北京',
        region: 'Asia',
        importance: 'high',
        countries: ['US', 'CN'],
        coordinates: { lat: 39.9, lng: 116.4 },
        summary: '美国总统特朗普2026年访华，将是其第二任期首次访华。此次访问对中美关系走向具有重要指标意义，预计将讨论贸易、科技、台湾、地缘政治等核心议题。',
        analysis: '特朗普第二任期对华政策趋于务实，在关税、科技封锁等方面有所调整。此次访华可能成为中美关系"止跌企稳"的重要契机，但在核心利益分歧上仍难有根本突破。',
        outlook: {
            expectation: '此次访问预计将达成有限经贸协议，可能涉及农产品采购、能源合作等。在台湾问题上双方将重申各自立场，但可能建立更多危机管控机制。科技领域竞争态势难以改变，但可能就人工智能安全、气候变化等议题开展有限合作。',
            keyPoints: [
                '中美贸易协议谈判进展',
                '关税调整与豁免',
                '台湾问题红线',
                '科技竞争与管制',
                '人工智能安全合作',
                '气候变化议题',
                '朝鲜问题协调',
                '军事危机管控机制'
            ]
        },
        keyFactors: [
            '美国国内政治',
            '中国经济转型',
            '全球供应链重构',
            '地缘战略竞争',
            '科技革命影响'
        ],
        marketImpact: [
            '中美股市联动',
            '人民币/美元汇率',
            '大宗商品价格',
            '科技股估值',
            '全球供应链预期'
        ],
        history: [
            { date: '2025-11', content: '中美元首在APEC期间举行双边会谈' },
            { date: '2025-06', content: '美国国务卿访华，为元首访问铺路' },
            { date: '2024-11', content: '特朗普赢得美国大选' },
            { date: '2017-11', content: '特朗普首次访华（第一任期）' }
        ],
        futureKeyDates: [
            { date: '2026-04', event: '美国国务卿先遣访问' },
            { date: '2026-05-15', event: '特朗普抵达北京' },
            { date: '2026-05-16', event: '中美元首会谈' },
            { date: '2026-05-17', event: '联合声明发布' }
        ],
        newsLinks: [
            { title: '新华社 - 中美关系', url: 'http://www.xinhuanet.com/world/zhongmeiguanxi/' },
            { title: 'Reuters - US China', url: 'https://www.reuters.com/world/us-china/' },
            { title: 'Bloomberg - US China', url: 'https://www.bloomberg.com/us-china' },
            { title: 'Foreign Affairs - China', url: 'https://www.foreignaffairs.com/region/china' }
        ],
        relatedNews: [
            { date: '2026-02-26', title: '白宫证实特朗普将于5月访华', source: 'Reuters' },
            { date: '2026-02-20', title: '中国外交部：欢迎美国总统访华', source: '新华社' }
        ]
    },
    {
        id: 'me-4',
        type: 'major-event',
        eventType: 'political',
        title: '中国4月政治局会议',
        titleEn: 'China April Politburo Meeting',
        date: '2026-04',
        location: '北京',
        region: 'Asia',
        importance: 'high',
        countries: ['CN'],
        coordinates: { lat: 37.0, lng: 103.0 },
        summary: '中共中央政治局每年4月底召开会议，分析研究经济形势，部署下半年经济工作。是观察中国经济政策走向的重要窗口。',
        analysis: '4月政治局会议将对一季度经济运行进行评估，并据此调整政策方向。2026年会议预计将重点关注：消费复苏、房地产风险、地方债务、就业形势等议题。',
        outlook: {
            expectation: '会议预计将维持"稳中求进"总基调，强调政策协调配合。可能出台更多消费刺激措施，房地产政策可能进一步优化调整。财政政策力度可能加大，货币政策保持稳健。',
            keyPoints: [
                '一季度经济数据评估',
                '房地产政策调整',
                '地方债务化解进展',
                '消费刺激措施',
                '就业形势分析',
                '民营企业支持',
                '科技创新部署',
                '外贸外资政策'
            ]
        },
        keyFactors: [
            '一季度GDP增速',
            '房地产市场走势',
            '就业数据',
            '通胀水平',
            '外部环境变化'
        ],
        marketImpact: [
            'A股市场情绪',
            '债券收益率',
            '房地产股表现',
            '人民币汇率',
            '商品期货价格'
        ],
        history: [
            { date: '2025-04', content: '2025年4月会议强调"扩大内需"，房地产政策边际放松' },
            { date: '2024-04', content: '2024年4月会议聚焦"新质生产力"，科技创新成为重点' },
            { date: '2023-04', content: '2023年4月会议强调经济恢复"波浪式发展"特征' }
        ],
        futureKeyDates: [
            { date: '2026-04-15', event: '一季度GDP数据发布' },
            { date: '2026-04-25', event: '政治局会议召开' },
            { date: '2026-04-26', event: '会议通稿发布' },
            { date: '2026-07', event: '7月政治局会议（下半年定调）' }
        ],
        newsLinks: [
            { title: '新华社 - 政治局会议', url: 'http://www.xinhuanet.com/politics/' },
            { title: '人民日报 - 要闻', url: 'http://politics.people.com.cn/' },
            { title: '财新 - 宏观经济', url: 'https://macro.caixin.com/' },
            { title: 'Bloomberg China', url: 'https://www.bloomberg.com/china' }
        ],
        relatedNews: [
            { date: '2026-02-25', title: '4月政治局会议前瞻：经济复苏成关键议题', source: '财新' }
        ]
    },
    {
        id: 'me-5',
        type: 'major-event',
        eventType: 'economic',
        title: 'RCEP部长级会议',
        titleEn: 'RCEP Ministerial Meeting',
        date: '2026-06-15',
        endDate: '2026-06-16',
        location: '雅加达',
        region: 'Asia',
        importance: 'medium',
        countries: ['CN', 'JP', 'KR', 'AU', 'NZ', 'ID', 'MY', 'PH', 'SG', 'TH', 'VN', 'BN', 'LA', 'MM', 'KH'],
        coordinates: { lat: -6.2, lng: 106.8 },
        summary: 'RCEP（区域全面经济伙伴关系协定）是全球最大自贸区，涵盖约30%全球人口和GDP。部长级会议将讨论贸易便利化、投资合作、供应链联通等议题。',
        analysis: 'RCEP自2022年生效以来，区域贸易投资自由化便利化水平持续提升。2026年会议将聚焦：关税减让承诺落实、原产地规则优化、服务贸易开放、电子商务合作等。',
        outlook: {
            expectation: '会议预计将进一步推动区域贸易便利化，可能就新成员加入（如香港）进行讨论。数字贸易、绿色供应链、中小企业融入将是重点议题。',
            keyPoints: [
                '关税减让承诺执行',
                '原产地规则优化',
                '服务贸易开放',
                '投资便利化',
                '电子商务合作',
                '知识产权保护',
                '中小企业融入',
                '新成员加入讨论'
            ]
        },
        keyFactors: [
            '区域贸易增长',
            '供应链重构',
            '中美竞争影响',
            '数字经济发展',
            '绿色发展转型'
        ],
        marketImpact: [
            '区域贸易量',
            '跨境电商',
            '供应链股票',
            '大宗商品贸易',
            '东盟市场投资'
        ],
        history: [
            { date: '2025-09', content: 'RCEP部长会议讨论新成员加入程序' },
            { date: '2025-03', content: 'RCEP实施三周年，贸易额持续增长' },
            { date: '2022-01', content: 'RCEP正式生效' }
        ],
        futureKeyDates: [
            { date: '2026-06-15', event: 'RCEP部长会议开幕' },
            { date: '2026-06-16', event: '联合声明发布' },
            { date: '2026-11', event: 'RCEP领导人会议（APEC期间）' }
        ],
        newsLinks: [
            { title: 'RCEP Official', url: 'https://rcepsec.org/' },
            { title: 'ASEAN - RCEP', url: 'https://asean.org/' },
            { title: 'Reuters - Trade', url: 'https://www.reuters.com/business/trade/' },
            { title: 'Nikkei Asia - Trade', url: 'https://asia.nikkei.com/Business/Trade' }
        ],
        relatedNews: [
            { date: '2026-02-20', title: 'RCEP区域贸易额突破万亿美元', source: '新华社' }
        ]
    },
    {
        id: 'me-6',
        type: 'major-event',
        eventType: 'political',
        title: '美国中期选举',
        titleEn: 'US Midterm Elections',
        date: '2026-11-03',
        location: '美国',
        region: 'Americas',
        importance: 'high',
        countries: ['US'],
        coordinates: { lat: 38.9, lng: -77.0 },
        summary: '美国中期选举将改选全部435名众议员和约三分之一参议员。选举结果将影响特朗普政府后半任期的立法能力和政策走向。',
        analysis: '2026年中期选举是对特朗普第二任期的首次全民公投。选举结果将决定共和党能否保持国会两院控制权，影响减税、移民、贸易等政策议程。',
        outlook: {
            expectation: '执政党通常在中期选举中失去席位，但特朗普可能受益于经济表现。关键战场州包括：宾夕法尼亚、威斯康星、密歇根、亚利桑那、乔治亚等。选举结果将显著影响2027-2028年政策走向。',
            keyPoints: [
                '参议院控制权归属',
                '众议院控制权归属',
                '关键战场州结果',
                '投票率与民调偏差',
                '对特朗普政策的影响',
                '对华政策走向',
                '财政政策空间',
                '2028大选前哨战'
            ]
        },
        keyFactors: [
            '经济表现',
            '通胀水平',
            '移民问题',
            '外交政策评价',
            '选民动员能力'
        ],
        marketImpact: [
            '美股波动性',
            '美元指数',
            '美债收益率',
            '政策预期变化',
            '全球市场情绪'
        ],
        history: [
            { date: '2022-11', content: '2022中期选举共和党夺回众议院' },
            { date: '2018-11', content: '2018中期选举民主党夺回众议院' },
            { date: '2014-11', content: '2014中期选举共和党控制参众两院' }
        ],
        futureKeyDates: [
            { date: '2026-09', event: '选举季正式开始' },
            { date: '2026-10', event: '总统辩论与助选' },
            { date: '2026-11-03', event: '选举日' },
            { date: '2027-01', event: '新国会就职' }
        ],
        newsLinks: [
            { title: 'Reuters - US Politics', url: 'https://www.reuters.com/world/us/' },
            { title: 'Politico - Elections', url: 'https://www.politico.com/elections' },
            { title: 'FiveThirtyEight', url: 'https://fivethirtyeight.com/politics/' },
            { title: 'Bloomberg Politics', url: 'https://www.bloomberg.com/politics' }
        ],
        relatedNews: [
            { date: '2026-02-25', title: '中期选举前瞻：共和党力争保持国会控制权', source: 'Reuters' }
        ]
    },
    {
        id: 'me-7',
        type: 'major-event',
        eventType: 'diplomatic',
        title: '2026年APEC峰会',
        titleEn: 'APEC Summit 2026',
        date: '2026-11-15',
        endDate: '2026-11-16',
        location: '太平洋地区',
        region: 'Pacific',
        importance: 'high',
        countries: ['KR', 'CN', 'US', 'JP', 'AU', 'CA', 'ID', 'MY', 'MX', 'NZ', 'PH', 'SG', 'TH', 'VN', 'PE', 'CL', 'RU', 'TW', 'HK'],
        coordinates: { lat: 10.0, lng: -160.0 },
        summary: 'APEC（亚太经合组织）峰会是亚太地区最高级别经济合作论坛。2026年峰会由韩国主办，将讨论区域经济一体化、可持续发展、数字经济等议题。',
        analysis: '2026年APEC峰会将由韩国主办，是展示韩国国际影响力的重要平台。中美元首可能在峰会期间举行双边会晤，市场将高度关注。',
        outlook: {
            expectation: '峰会预计将发表领导人宣言，强调贸易投资自由化、数字经济合作、绿色转型等。中美元首双边会晤将是最大看点，可能就经贸、台湾等议题交换意见。',
            keyPoints: [
                '领导人宣言内容',
                '中美元首会晤',
                '区域经济一体化',
                '数字贸易规则',
                '绿色转型合作',
                '供应链韧性',
                '中小企业发展',
                '妇女经济赋权'
            ]
        },
        keyFactors: [
            '中美关系氛围',
            '韩国外交策略',
            '日本态度',
            '东盟立场',
            '全球经济形势'
        ],
        marketImpact: [
            '亚太股市',
            '区域贸易预期',
            '供应链股票',
            '跨境电商',
            '绿色能源投资'
        ],
        history: [
            { date: '2025-11', content: '2025年APEC峰会在秘鲁举行' },
            { date: '2024-11', content: '2024年APEC峰会在秘鲁举行' },
            { date: '2023-11', content: '2023年APEC峰会在旧金山举行，中美元首会晤' }
        ],
        futureKeyDates: [
            { date: '2026-08', event: 'APEC部长级会议' },
            { date: '2026-11-15', event: 'APEC领导人峰会开幕' },
            { date: '2026-11-16', event: '领导人宣言发布' }
        ],
        newsLinks: [
            { title: 'APEC Official', url: 'https://www.apec.org/' },
            { title: 'Reuters - APEC', url: 'https://www.reuters.com/business/apec/' },
            { title: 'Nikkei Asia - APEC', url: 'https://asia.nikkei.com/Spotlight/apec' },
            { title: 'Korea.net', url: 'https://www.korea.net/' }
        ],
        relatedNews: [
            { date: '2026-02-22', title: '韩国公布2026年APEC峰会筹备计划', source: 'Yonhap' }
        ]
    },
    {
        id: 'me-8',
        type: 'major-event',
        eventType: 'diplomatic',
        title: '2026年G20峰会',
        titleEn: 'G20 Summit 2026',
        date: '2026-11-21',
        endDate: '2026-11-22',
        location: '美国',
        region: 'Americas',
        importance: 'high',
        countries: ['US', 'CN', 'JP', 'DE', 'GB', 'FR', 'IN', 'BR', 'RU', 'AU', 'CA', 'ID', 'IT', 'KR', 'MX', 'SA', 'TR', 'AR', 'ZA'],
        coordinates: { lat: 38.9, lng: -77.0 },
        summary: 'G20峰会是全球经济治理最重要的平台，汇集世界主要经济体领导人。2026年峰会由美国主办，将在华盛顿举行。',
        analysis: '2026年G20峰会由美国主办，具有重要的地缘政治意义。全球贸易、科技竞争、能源安全、气候变化等议题将成为焦点。中美元首会晤将是市场关注焦点。',
        outlook: {
            expectation: '峰会预计将发表领导人宣言，聚焦全球贸易、科技竞争、能源安全等议题。中美元首双边会晤将是市场关注焦点，可能就贸易、台湾、科技等议题交换意见。俄罗斯代表出席问题可能引发争议。',
            keyPoints: [
                '全球贸易体系',
                '科技竞争规则',
                '能源安全合作',
                '气候行动承诺',
                '中美元首会晤',
                '债务重组框架',
                '供应链韧性',
                '数字治理合作'
            ]
        },
        keyFactors: [
            '美国主办影响力',
            '中美关系',
            '俄乌立场分歧',
            '气候政治',
            '全球南方诉求'
        ],
        marketImpact: [
            '全球市场情绪',
            '新兴市场资产',
            '大宗商品',
            '汇率波动',
            'ESG投资'
        ],
        history: [
            { date: '2025-11', content: '2025年G20峰会在巴西举行' },
            { date: '2024-11', content: '2024年G20峰会在巴西举行' },
            { date: '2023-09', content: '2023年G20峰会在新德里举行' }
        ],
        futureKeyDates: [
            { date: '2026-09', event: 'G20财长秋季会议' },
            { date: '2026-11-21', event: 'G20峰会开幕' },
            { date: '2026-11-22', event: '领导人宣言发布' }
        ],
        newsLinks: [
            { title: 'G20 Official', url: 'https://g20.org/' },
            { title: 'Reuters - G20', url: 'https://www.reuters.com/world/g20/' },
            { title: 'Financial Times - G20', url: 'https://www.ft.com/g20' },
            { title: 'South Africa Gov', url: 'https://www.gov.za/' }
        ],
        relatedNews: [
            { date: '2026-02-20', title: '南非公布2026年G20峰会主题：非洲与全球南方', source: 'Reuters' }
        ]
    }
];

// 国家坐标映射
const countryCoordinates = {
    '美国': { x: 18, y: 38 },
    '中国': { x: 80, y: 32 },
    '欧元区': { x: 51, y: 26 },
    '日本': { x: 88, y: 30 },
    '俄罗斯': { x: 68, y: 22 },
    '乌克兰': { x: 62, y: 26 },
    '以色列': { x: 56, y: 45 },
    '朝鲜': { x: 86, y: 26 },
    '南非': { x: 54, y: 75 },
    '印度': { x: 72, y: 42 },
    '伊朗': { x: 60, y: 42 },
    '台湾': { x: 85, y: 40 },
    '巴基斯坦': { x: 70, y: 36 },
    '阿富汗': { x: 72, y: 34 },
    '苏丹': { x: 54, y: 52 },
    '墨西哥': { x: 15, y: 48 },
    '委内瑞拉': { x: 25, y: 58 }
};
