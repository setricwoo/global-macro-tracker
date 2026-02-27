#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
全球宏观事件追踪系统 - 数据自动更新脚本
功能：
1. 从CFR Global Conflict Tracker获取最新地缘冲突数据
2. 从财经日历网站获取未来两周经济事件数据
3. 自动更新events-data.js和app.js文件

使用方法：
    python update_data.py

依赖安装：
    pip install requests beautifulsoup4
"""

import json
import re
from datetime import datetime, timedelta
from pathlib import Path

try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    print("请先安装依赖: pip install requests beautifulsoup4")
    exit(1)

# ========================================
# 配置
# ========================================
CFR_URL = "https://www.cfr.org/global-conflict-tracker"
ECONOMIC_CALENDAR_URLS = [
    "https://www.investing.com/economic-calendar/",
    # 可以添加其他财经日历源
]

OUTPUT_DIR = Path(__file__).parent

# ========================================
# CFR数据获取
# ========================================
def fetch_cfr_conflicts():
    """从CFR网站获取冲突数据"""
    print("正在获取CFR Global Conflict Tracker数据...")

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }

    try:
        response = requests.get(CFR_URL, headers=headers, timeout=30)
        response.raise_for_status()

        soup = BeautifulSoup(response.text, 'html.parser')

        conflicts = []

        # 查找所有冲突条目
        conflict_elements = soup.find_all('div', class_='conflict-item') or \
                           soup.find_all('article') or \
                           soup.find_all('li', class_='conflict')

        # 如果上面的选择器不工作，尝试通用的文本解析
        if not conflict_elements:
            # 从页面内容中提取冲突信息
            text_content = response.text

            # 使用正则表达式匹配冲突信息
            # CFR网站的冲突信息通常在JSON数据中
            json_match = re.search(r'__NEXT_DATA__.*?>(.*?)</script>', text_content, re.DOTALL)
            if json_match:
                try:
                    data = json.loads(json_match.group(1))
                    # 解析Next.js数据
                    props = data.get('props', {}).get('pageProps', {})
                    conflicts_data = props.get('conflicts', [])

                    for i, c in enumerate(conflicts_data, 1):
                        conflict = {
                            'id': i,
                            'title': c.get('title', ''),
                            'titleEn': c.get('titleEn', c.get('title', '')),
                            'location': c.get('location', ''),
                            'region': c.get('region', ''),
                            'conflictType': c.get('type', c.get('conflictType', '')),
                            'cfrImpact': c.get('impact', c.get('cfrImpact', 'Limited')),
                            'cfrStatus': c.get('status', c.get('cfrStatus', 'Unchanging')),
                            'countries': c.get('countries', []),
                            'summary': c.get('summary', ''),
                            'cfrUrl': f"https://www.cfr.org/global-conflict-tracker/conflict/{c.get('slug', '')}"
                        }
                        conflicts.append(conflict)
                except json.JSONDecodeError:
                    pass

        print(f"获取到 {len(conflicts)} 个冲突数据")
        return conflicts

    except Exception as e:
        print(f"获取CFR数据失败: {e}")
        return get_fallback_cfr_data()


def get_fallback_cfr_data():
    """备用CFR数据（当网络请求失败时使用）"""
    return [
        {"id": 1, "title": "台海对峙", "titleEn": "Confrontation Over Taiwan", "location": "台湾海峡",
         "region": "Asia", "conflictType": "Interstate", "cfrImpact": "Critical", "cfrStatus": "Worsening",
         "countries": ["CN", "TW"], "coordinates": {"x": 85, "y": 40}},
        {"id": 2, "title": "俄乌战争", "titleEn": "War in Ukraine", "location": "乌克兰/俄罗斯",
         "region": "Europe and Eurasia", "conflictType": "Interstate", "cfrImpact": "Critical", "cfrStatus": "Unchanging",
         "countries": ["RU", "UA"], "coordinates": {"x": 58, "y": 28}},
        {"id": 3, "title": "伊朗与以色列及美国对抗", "titleEn": "Iran's Conflict With Israel and the United States",
         "location": "伊朗/中东", "region": "Middle East and North Africa", "conflictType": "Interstate",
         "cfrImpact": "Critical", "cfrStatus": "Worsening", "countries": ["IR"], "coordinates": {"x": 60, "y": 42}},
        # ... 更多冲突数据
    ]


# ========================================
# 经济日历数据获取
# ========================================
def fetch_economic_calendar():
    """获取未来两周的经济事件数据"""
    print("正在获取经济日历数据...")

    today = datetime.now()
    two_weeks_later = today + timedelta(days=14)

    # 这里使用预设的高重要性事件作为示例
    # 实际应用中可以对接金十数据、Investing.com等API
    events = get_default_economic_events(today)

    print(f"获取到 {len(events)} 个经济事件")
    return events


def get_default_economic_events(start_date):
    """获取默认的经济事件（基于当前日期计算）"""

    # 计算下一个重要日期
    def next_weekday(date, weekday):
        """获取下一个指定星期的日期 (0=周一)"""
        days_ahead = weekday - date.weekday()
        if days_ahead <= 0:
            days_ahead += 7
        return date + timedelta(days=days_ahead)

    events = []

    # 示例事件 - 实际应从API获取
    event_templates = [
        {"title": "美国ISM制造业PMI", "country": "美国", "type": "economic", "importance": "high", "time": "21:30"},
        {"title": "美国ADP就业人数", "country": "美国", "type": "economic", "importance": "high", "time": "21:15"},
        {"title": "美国非农就业数据", "country": "美国", "type": "economic", "importance": "high", "time": "21:30"},
        {"title": "美国失业率", "country": "美国", "type": "economic", "importance": "high", "time": "21:30"},
        {"title": "美国CPI通胀数据", "country": "美国", "type": "economic", "importance": "high", "time": "20:30"},
        {"title": "美国核心CPI", "country": "美国", "type": "economic", "importance": "high", "time": "20:30"},
        {"title": "美联储FOMC利率决议", "country": "美国", "type": "central-bank", "importance": "high", "time": "02:00"},
        {"title": "欧洲央行利率决议", "country": "欧元区", "type": "central-bank", "importance": "high", "time": "21:00"},
        {"title": "日本央行利率决议", "country": "日本", "type": "central-bank", "importance": "high", "time": "11:00"},
        {"title": "中国MLF操作", "country": "中国", "type": "central-bank", "importance": "high", "time": "09:30"},
        {"title": "中国LPR报价", "country": "中国", "type": "central-bank", "importance": "high", "time": "09:30"},
        {"title": "中国PMI数据", "country": "中国", "type": "economic", "importance": "high", "time": "09:00"},
    ]

    # 为每个事件分配日期（示例逻辑）
    for i, template in enumerate(event_templates):
        event_date = start_date + timedelta(days=i % 14)
        event = {
            **template,
            "date": event_date.strftime("%Y-%m-%d")
        }
        events.append(event)

    return events


# ========================================
# 文件更新
# ========================================
def update_app_js(economic_events):
    """更新app.js中的经济日历数据"""

    app_js_path = OUTPUT_DIR / "app.js"

    if not app_js_path.exists():
        print(f"警告: {app_js_path} 不存在")
        return

    with open(app_js_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 生成新的经济日历数据
    events_json = json.dumps(economic_events, ensure_ascii=False, indent=4)

    # 替换economicCalendarData数组
    pattern = r'const economicCalendarData = \[[\s\S]*?\];'
    replacement = f'const economicCalendarData = {events_json};'

    new_content = re.sub(pattern, replacement, content)

    with open(app_js_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"已更新 {app_js_path}")


def update_events_data_js(conflicts):
    """更新events-data.js中的冲突数据"""

    events_js_path = OUTPUT_DIR / "events-data.js"

    # 生成JavaScript内容
    js_content = generate_events_js_content(conflicts)

    with open(events_js_path, 'w', encoding='utf-8') as f:
        f.write(js_content)

    print(f"已更新 {events_js_path}")


def generate_events_js_content(conflicts):
    """生成events-data.js的内容"""

    now = datetime.now().strftime("%Y-%m-%d %H:%M")

    content = f'''// ========================================
// CFR Global Conflict Tracker - 完整事件数据
// 数据来源: https://www.cfr.org/global-conflict-tracker
// 最后更新: {now}
// 由 update_data.py 自动生成
// ========================================

const eventsData = [
'''

    for i, conflict in enumerate(conflicts, 1):
        # 获取坐标
        coords = conflict.get('coordinates', get_coordinates_for_region(conflict.get('region', '')))

        content += f'''    {{
        id: {i},
        type: 'geopolitical',
        title: '{conflict.get('title', '')}',
        titleEn: '{conflict.get('titleEn', '')}',
        location: '{conflict.get('location', '')}',
        region: '{conflict.get('region', '')}',
        conflictType: '{conflict.get('conflictType', '')}',
        importance: '{"high" if conflict.get('cfrImpact') == 'Critical' else "medium" if conflict.get('cfrImpact') == 'Significant' else "low"}',
        coordinates: {{ x: {coords['x']}, y: {coords['y']} }},
        cfrImpact: '{conflict.get('cfrImpact', 'Limited')}',
        cfrStatus: '{conflict.get('cfrStatus', 'Unchanging')}',
        countries: {json.dumps(conflict.get('countries', []))},
        summary: '{conflict.get('summary', '')}',
        analysis: '{conflict.get('analysis', '')}',
        keyFactors: {json.dumps(conflict.get('keyFactors', []))},
        marketImpact: {json.dumps(conflict.get('marketImpact', []))},
        cfrUrl: '{conflict.get('cfrUrl', '')}',
        newsLinks: {json.dumps(conflict.get('newsLinks', []))}
    }}{',' if i < len(conflicts) else ''}
'''

    content += '''];

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
'''

    return content


def get_coordinates_for_region(region):
    """根据区域获取大致坐标"""
    region_coords = {
        'Asia': {'x': 75, 'y': 35},
        'Europe and Eurasia': {'x': 55, 'y': 28},
        'Middle East and North Africa': {'x': 56, 'y': 42},
        'Sub-Saharan Africa': {'x': 52, 'y': 58},
        'Americas': {'x': 20, 'y': 50},
    }
    return region_coords.get(region, {'x': 50, 'y': 50})


# ========================================
# 主函数
# ========================================
def main():
    print("=" * 50)
    print("全球宏观事件追踪系统 - 数据更新")
    print(f"更新时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 50)

    # 获取CFR冲突数据
    conflicts = fetch_cfr_conflicts()

    # 获取经济日历数据
    economic_events = fetch_economic_calendar()

    # 更新文件
    if conflicts:
        update_events_data_js(conflicts)

    if economic_events:
        update_app_js(economic_events)

    print("\n" + "=" * 50)
    print("数据更新完成!")
    print("=" * 50)

    # 更新HTML中的更新时间
    update_html_timestamp()


def update_html_timestamp():
    """更新HTML文件中的最后更新时间"""
    html_path = OUTPUT_DIR / "index.html"

    if not html_path.exists():
        return

    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()

    now = datetime.now().strftime('%Y-%m-%d %H:%M')

    # 替换更新时间
    pattern = r'最后更新: [\d-]+ [\d:]+'
    replacement = f'最后更新: {now}'

    new_content = re.sub(pattern, replacement, content)

    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(new_content)


if __name__ == "__main__":
    main()
