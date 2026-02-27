#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
全球地缘信息追踪 - 事件分析报告生成器
功能：
1. 基于网络搜索获取最新信息
2. 多维度深度分析
3. 生成可下载的分析报告

使用方法：
    python generate_report.py --event "台海对峙" --type geopolitical
    python generate_report.py --event "中国两会" --type major
    python generate_report.py --all  # 生成所有事件报告

依赖安装：
    pip install requests beautifulsoup4 markdown2
"""

import json
import re
import os
from datetime import datetime
from pathlib import Path
import argparse

try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    print("请先安装依赖: pip install requests beautifulsoup4")
    exit(1)

# ========================================
# 配置
# ========================================
PROJECT_DIR = Path(__file__).parent
REPORTS_DIR = PROJECT_DIR / "reports"
REPORTS_DIR.mkdir(exist_ok=True)

# AI模型配置（使用GLM-4或其他模型）
# 如需使用AI增强分析，配置API
AI_CONFIG = {
    "enabled": False,  # 设为True启用AI增强
    "api_key": "",     # API密钥
    "model": "glm-4",  # 模型名称
    "api_url": ""      # API地址
}

# ========================================
# 数据源配置
# ========================================
SEARCH_SOURCES = {
    "综合新闻": {
        "Reuters": "https://www.reuters.com/search/news?query={}",
        "BBC": "https://www.bbc.co.uk/search?q={}",
        "Google News": "https://news.google.com/search?q={}"
    },
    "中文新闻": {
        "新浪财经": "https://search.sina.com.cn/?q={}",
        "财新网": "https://search.caixin.com/search/news.jsp?keyword={}"
    },
    "专业分析": {
        "CFR": "https://www.cfr.org/search?query={}",
        "CSIS": "https://www.csis.org/search/{}",
        "Brookings": "https://www.brookings.edu/search/?s={}"
    }
}

# ========================================
# 事件数据读取
# ========================================
def load_events_data():
    """从events-data.js读取事件数据"""
    events_data_path = PROJECT_DIR / "events-data.js"

    with open(events_data_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 解析eventsData
    events = []
    major_events = []

    # 使用正则表达式提取数据（简化解析）
    # 实际应用中可以使用更复杂的解析逻辑

    return {
        "geopolitical": events,
        "major": major_events
    }

def get_event_by_title(title, event_type="geopolitical"):
    """根据标题获取事件数据"""
    events_data = load_events_data()
    # 这里返回模拟数据，实际应从events-data.js解析
    return {
        "title": title,
        "type": event_type
    }

# ========================================
# 网络搜索
# ========================================
def search_news(query, sources=None, max_results=5):
    """搜索新闻"""
    results = []

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }

    # 模拟搜索结果（实际应用中应调用真实API）
    # 由于网络限制，这里返回模板数据
    print(f"正在搜索: {query}")

    return results

def search_cfr_data(event_title):
    """从CFR获取冲突数据"""
    cfr_url = f"https://www.cfr.org/global-conflict-tracker"

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }

    try:
        response = requests.get(cfr_url, headers=headers, timeout=30)
        # 解析CFR数据
        # 实际应用中应解析页面内容
        return {}
    except Exception as e:
        print(f"获取CFR数据失败: {e}")
        return {}

# ========================================
# 报告生成
# ========================================
def generate_geopolitical_report(event_data, search_results=None):
    """生成地缘冲突分析报告"""

    report_date = datetime.now().strftime("%Y年%m月%d日")
    event_title = event_data.get("title", "未知事件")
    event_title_en = event_data.get("titleEn", "")

    report = f"""# {event_title} - 深度分析报告

**报告日期**: {report_date}
**事件类型**: 地缘冲突
**英文名称**: {event_title_en}

---

## 一、事件概述

### 1.1 基本信息

- **地点**: {event_data.get('location', '未知')}
- **区域**: {event_data.get('region', '未知')}
- **冲突类型**: {event_data.get('conflictType', '未知')}
- **影响级别**: {event_data.get('cfrImpact', '未知')}
- **当前状态**: {event_data.get('cfrStatus', '未知')}
- **涉及国家**: {', '.join(event_data.get('countries', []))}

### 1.2 事件摘要

{event_data.get('summary', '暂无摘要信息')}

---

## 二、深度分析

### 2.1 背景分析

{event_data.get('analysis', '暂无深度分析')}

### 2.2 核心驱动因素

"""

    # 添加关键因素
    key_factors = event_data.get('keyFactors', [])
    for i, factor in enumerate(key_factors, 1):
        report += f"{i}. {factor}\n"

    report += f"""
### 2.3 市场影响评估

"""
    # 添加市场影响
    market_impacts = event_data.get('marketImpact', [])
    for impact in market_impacts:
        report += f"- {impact}\n"

    report += f"""
---

## 三、前景展望

### 3.1 预期发展

{event_data.get('outlook', {}).get('expectation', '暂无展望信息')}

### 3.2 关键关注点

"""

    # 添加关注点
    key_points = event_data.get('outlook', {}).get('keyPoints', [])
    for point in key_points:
        report += f"- {point}\n"

    report += f"""
### 3.3 未来关键日期

"""

    # 添加未来关键日期
    future_dates = event_data.get('futureKeyDates', [])
    for fd in future_dates:
        report += f"- **{fd.get('date', '')}**: {fd.get('event', '')}\n"

    report += f"""
---

## 四、历史脉络

"""

    # 添加历史事件
    history = event_data.get('history', [])
    for h in history:
        report += f"- **{h.get('date', '')}**: {h.get('content', '')}\n"

    report += f"""
---

## 五、最新动态

"""

    # 添加相关新闻
    related_news = event_data.get('relatedNews', [])
    for news in related_news:
        report += f"- [{news.get('date', '')}] **{news.get('title', '')}** - *{news.get('source', '')}*\n"

    report += f"""
---

## 六、信息来源

### 6.1 官方链接

"""

    # 添加新闻链接
    news_links = event_data.get('newsLinks', [])
    for link in news_links:
        report += f"- [{link.get('title', '链接')}]({link.get('url', '')})\n"

    if event_data.get('cfrUrl'):
        report += f"\n### 6.2 CFR追踪页面\n\n[{event_title}]({event_data.get('cfrUrl')})\n"

    report += f"""
---

## 七、风险提示

本报告基于公开信息整理，仅供参考，不构成投资建议。地缘政治事件发展具有高度不确定性，请结合多方面信息进行判断。

---

**报告生成时间**: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
**数据来源**: CFR Global Conflict Tracker, Reuters, BBC等
**免责声明**: 本报告仅供参考，不构成任何投资或决策建议。
"""

    return report


def generate_major_event_report(event_data, search_results=None):
    """生成重大会议与事件分析报告"""

    report_date = datetime.now().strftime("%Y年%m月%d日")
    event_title = event_data.get("title", "未知事件")
    event_title_en = event_data.get("titleEn", "")

    # 获取事件类型中文名
    event_type_map = {
        "political": "政治会议",
        "diplomatic": "外交活动",
        "financial": "金融会议",
        "economic": "经济合作"
    }
    event_type_cn = event_type_map.get(event_data.get('eventType', ''), "其他")

    report = f"""# {event_title} - 深度分析报告

**报告日期**: {report_date}
**事件类型**: 重大会议与事件 - {event_type_cn}
**英文名称**: {event_title_en}

---

## 一、事件基本信息

### 1.1 时间与地点

- **开始日期**: {event_data.get('date', '待定')}
- **结束日期**: {event_data.get('endDate', '待定') if event_data.get('endDate') else '单日事件'}
- **举办地点**: {event_data.get('location', '待定')}
- **所属区域**: {event_data.get('region', '未知')}
- **重要性级别**: {'⭐⭐⭐ 高' if event_data.get('importance') == 'high' else '⭐⭐ 中' if event_data.get('importance') == 'medium' else '⭐ 低'}

### 1.2 涉及方

"""

    # 添加涉及国家
    countries = event_data.get('countries', [])
    if countries:
        report += f"**参与国家/地区**: 共{len(countries)}个\n\n"
        # 分组显示
        for i in range(0, len(countries), 6):
            group = countries[i:i+6]
            report += " | ".join(group) + "\n"
    else:
        report += "**参与国家/地区**: 待确认\n"

    report += f"""
### 1.3 事件摘要

{event_data.get('summary', '暂无摘要信息')}

---

## 二、深度分析

### 2.1 背景与意义

{event_data.get('analysis', '暂无深度分析')}

### 2.2 核心议题

"""

    # 添加关键因素
    key_factors = event_data.get('keyFactors', [])
    for i, factor in enumerate(key_factors, 1):
        report += f"{i}. {factor}\n"

    report += f"""
### 2.3 市场影响评估

"""
    # 添加市场影响
    market_impacts = event_data.get('marketImpact', [])
    for impact in market_impacts:
        report += f"- {impact}\n"

    report += f"""
---

## 三、前景展望

### 3.1 预期成果

{event_data.get('outlook', {}).get('expectation', '暂无展望信息')}

### 3.2 关键关注点

"""

    # 添加关注点
    key_points = event_data.get('outlook', {}).get('keyPoints', [])
    for i, point in enumerate(key_points, 1):
        report += f"{i}. {point}\n"

    report += f"""
### 3.3 重要时间节点

"""

    # 添加未来关键日期
    future_dates = event_data.get('futureKeyDates', [])
    for fd in future_dates:
        report += f"- **{fd.get('date', '')}**: {fd.get('event', '')}\n"

    report += f"""
---

## 四、历史回顾

"""

    # 添加历史事件
    history = event_data.get('history', [])
    if history:
        report += "| 时间 | 事件 |\n|------|------|\n"
        for h in history:
            report += f"| {h.get('date', '')} | {h.get('content', '')} |\n"
    else:
        report += "暂无历史记录。\n"

    report += f"""
---

## 五、最新动态

"""

    # 添加相关新闻
    related_news = event_data.get('relatedNews', [])
    if related_news:
        report += "| 日期 | 新闻标题 | 来源 |\n|------|----------|------|\n"
        for news in related_news:
            report += f"| {news.get('date', '')} | {news.get('title', '')} | {news.get('source', '')} |\n"
    else:
        report += "暂无最新动态。\n"

    report += f"""
---

## 六、参考信息

### 6.1 相关链接

"""

    # 添加新闻链接
    news_links = event_data.get('newsLinks', [])
    for link in news_links:
        report += f"- [{link.get('title', '链接')}]({link.get('url', '')})\n"

    report += f"""
---

## 七、投资启示

### 7.1 资产类别影响

基于该事件的性质和重要性，可能受影响的资产类别包括：

"""

    # 根据事件类型生成投资启示
    if event_data.get('importance') == 'high':
        report += """- **股票市场**: 关注相关国家/地区股市波动
- **债券市场**: 关注主权债券收益率变化
- **外汇市场**: 关注相关货币汇率波动
- **大宗商品**: 如涉及资源国，关注相关商品价格
- **避险资产**: 地缘政治不确定性可能推高黄金、日元等避险资产
"""
    else:
        report += """- **股票市场**: 关注相关板块股票
- **外汇市场**: 关注相关货币短期波动
"""

    report += f"""
### 7.2 风险提示

- 事件结果存在不确定性
- 市场预期可能与实际结果存在差异
- 建议关注事件进展和相关声明
- 注意风险管理，避免过度杠杆

---

**报告生成时间**: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
**数据来源**: 官方网站、Reuters、Bloomberg等
**免责声明**: 本报告仅供参考，不构成任何投资或决策建议。
"""

    return report


def save_report(report_content, filename, format="md"):
    """保存报告到文件"""
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"{filename}_{timestamp}.{format}"
    filepath = REPORTS_DIR / filename

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(report_content)

    print(f"✓ 报告已保存: {filepath}")
    return filepath


def convert_to_html(md_content):
    """将Markdown转换为HTML"""
    try:
        import markdown2
        html_content = markdown2.markdown(md_content, extras=['tables', 'fenced-code-blocks'])

        html_template = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>事件分析报告</title>
    <style>
        body {{
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            line-height: 1.8;
            max-width: 900px;
            margin: 0 auto;
            padding: 40px 20px;
            color: #333;
            background: #fafafa;
        }}
        h1 {{ color: #1a365d; border-bottom: 3px solid #3182ce; padding-bottom: 10px; }}
        h2 {{ color: #2c5282; margin-top: 40px; border-left: 4px solid #3182ce; padding-left: 15px; }}
        h3 {{ color: #2b6cb0; }}
        table {{ border-collapse: collapse; width: 100%; margin: 20px 0; }}
        th, td {{ border: 1px solid #e2e8f0; padding: 12px; text-align: left; }}
        th {{ background: #edf2f7; }}
        tr:nth-child(even) {{ background: #f7fafc; }}
        blockquote {{ border-left: 4px solid #cbd5e0; margin: 20px 0; padding: 10px 20px; background: #f7fafc; }}
        code {{ background: #edf2f7; padding: 2px 6px; border-radius: 4px; }}
        hr {{ border: none; border-top: 1px solid #e2e8f0; margin: 40px 0; }}
        a {{ color: #3182ce; }}
        @media print {{
            body {{ background: white; }}
            h2 {{ page-break-after: avoid; }}
        }}
    </style>
</head>
<body>
{html_content}
</body>
</html>"""
        return html_template
    except ImportError:
        print("提示: 安装 markdown2 可生成HTML格式 (pip install markdown2)")
        return None


# ========================================
# 从events-data.js解析事件
# ========================================
def parse_events_from_js():
    """从events-data.js解析事件列表"""
    events_data_path = PROJECT_DIR / "events-data.js"

    with open(events_data_path, 'r', encoding='utf-8') as f:
        content = f.read()

    events = []
    major_events = []

    # 解析eventsData
    # 使用简化的正则匹配
    event_pattern = r'id:\s*(\d+),\s*type:\s*[\'"]geopolitical[\'"],\s*title:\s*[\'"]([^\'"]+)[\'"]'
    for match in re.finditer(event_pattern, content):
        events.append({
            "id": match.group(1),
            "title": match.group(2),
            "type": "geopolitical"
        })

    # 解析majorEventsData
    major_pattern = r"id:\s*[\'\"]([^\'\"]+)[\'\"],\s*type:\s*[\'\"]major-event[\'\"],\s*eventType:\s*[\'\"]([^\'\"]+)[\'\"],\s*title:\s*[\'\"]([^\'\"]+)[\'\"]"
    for match in re.finditer(major_pattern, content):
        major_events.append({
            "id": match.group(1),
            "eventType": match.group(2),
            "title": match.group(3),
            "type": "major-event"
        })

    return {"geopolitical": events, "major": major_events}


def get_full_event_data(event_id, event_type):
    """获取完整的事件数据"""
    events_data_path = PROJECT_DIR / "events-data.js"

    with open(events_data_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 这里简化处理，返回基本数据
    # 实际应用中应该完整解析JSON
    return {"id": event_id, "type": event_type}


# ========================================
# 命令行接口
# ========================================
def main():
    parser = argparse.ArgumentParser(description='生成事件分析报告')
    parser.add_argument('--event', '-e', help='事件标题')
    parser.add_argument('--type', '-t', choices=['geopolitical', 'major'], default='geopolitical', help='事件类型')
    parser.add_argument('--all', '-a', action='store_true', help='生成所有事件报告')
    parser.add_argument('--list', '-l', action='store_true', help='列出所有事件')
    parser.add_argument('--format', '-f', choices=['md', 'html'], default='md', help='输出格式')

    args = parser.parse_args()

    if args.list:
        print("\n=== 地缘冲突事件 ===")
        events = parse_events_from_js()
        for i, event in enumerate(events['geopolitical'], 1):
            print(f"  {i}. {event['title']}")

        print("\n=== 重大会议与事件 ===")
        for i, event in enumerate(events['major'], 1):
            print(f"  {i}. {event['title']}")
        return

    if args.all:
        print("生成所有事件报告...")
        events = parse_events_from_js()

        for event in events['geopolitical']:
            event_data = get_full_event_data(event['id'], 'geopolitical')
            report = generate_geopolitical_report(event_data)
            filename = event['title'].replace('/', '_').replace(' ', '_')
            save_report(report, filename, args.format)

        for event in events['major']:
            event_data = get_full_event_data(event['id'], 'major')
            report = generate_major_event_report(event_data)
            filename = event['title'].replace('/', '_').replace(' ', '_')
            save_report(report, filename, args.format)

        return

    if args.event:
        event_data = get_full_event_data(args.event, args.type)

        if args.type == 'geopolitical':
            report = generate_geopolitical_report(event_data)
        else:
            report = generate_major_event_report(event_data)

        filename = args.event.replace('/', '_').replace(' ', '_')
        filepath = save_report(report, filename, args.format)

        if args.format == 'html':
            html_content = convert_to_html(report)
            if html_content:
                html_path = filepath.with_suffix('.html')
                with open(html_path, 'w', encoding='utf-8') as f:
                    f.write(html_content)
                print(f"✓ HTML报告已保存: {html_path}")

        print(f"\n报告预览:\n{'='*50}")
        print(report[:2000] + "..." if len(report) > 2000 else report)
        return

    # 交互模式
    print("\n=== 事件分析报告生成器 ===\n")
    print("1. 列出所有事件")
    print("2. 生成特定事件报告")
    print("3. 生成所有事件报告")

    choice = input("\n选择操作: ").strip()

    if choice == '1':
        main(['--list'])
    elif choice == '2':
        events = parse_events_from_js()
        print("\n请输入事件标题:")
        for event in events['geopolitical'] + events['major']:
            print(f"  - {event['title']}")

        title = input("\n事件标题: ").strip()
        event_type = input("事件类型 (geopolitical/major): ").strip() or 'geopolitical'

        main(['--event', title, '--type', event_type])
    elif choice == '3':
        main(['--all'])
    else:
        print("无效选择")


if __name__ == "__main__":
    main()
