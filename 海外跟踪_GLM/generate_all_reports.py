#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
全球地缘信息追踪 - 批量报告生成器
功能：为所有地缘冲突和重大事件生成分析报告

使用方法：
    python generate_all_reports.py
    python generate_all_reports.py --type geopolitical  # 仅地缘冲突
    python generate_all_reports.py --type major         # 仅重大事件
"""

import re
import os
import sys
from datetime import datetime
from pathlib import Path

# 设置控制台编码
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# ========================================
# 配置
# ========================================
PROJECT_DIR = Path(__file__).parent
EVENTS_DATA_PATH = PROJECT_DIR / "events-data.js"
REPORTS_DIR = PROJECT_DIR / "reports"
REPORTS_DIR.mkdir(exist_ok=True)

# ========================================
# 解析 events-data.js
# ========================================
def parse_events_data():
    """解析 events-data.js 文件"""
    with open(EVENTS_DATA_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    geopolitical_events = []
    major_events = []

    # 解析 eventsData 数组
    # 找到 eventsData 的内容
    events_start = content.find('const eventsData = [')
    events_end = content.find('];', events_start + 20)
    major_start = content.find('const majorEventsData = [')

    if events_start != -1 and major_start != -1:
        events_content = content[events_start:major_start]
        geopolitical_events = parse_event_objects(events_content, 'geopolitical')

    # 解析 majorEventsData 数组
    if major_start != -1:
        major_content = content[major_start:]
        major_events = parse_event_objects(major_content, 'major')

    return {
        'geopolitical': geopolitical_events,
        'major': major_events
    }

def parse_event_objects(content, event_type):
    """解析事件对象列表"""
    events = []

    # 找到所有顶层事件对象 { id: ... }
    # 使用括号计数来找到完整的对象
    i = 0
    while i < len(content):
        # 找到下一个顶层对象开始
        obj_start = content.find('{\n        id:', i)
        if obj_start == -1:
            obj_start = content.find('{\n        type:', i)
        if obj_start == -1:
            break

        # 使用括号计数找到对象结束
        brace_count = 0
        j = obj_start
        while j < len(content):
            if content[j] == '{':
                brace_count += 1
            elif content[j] == '}':
                brace_count -= 1
                if brace_count == 0:
                    break
            j += 1

        # 提取单个事件对象
        event_content = content[obj_start:j+1]
        event = parse_single_event(event_content, event_type)

        if event and event.get('title') and '新华网' not in event.get('title', '') and 'Reuters' not in event.get('title', ''):
            # 过滤掉新闻链接（它们也有title但不是事件）
            if event.get('type') == 'geopolitical' or event.get('type') == 'major-event':
                events.append(event)

        i = j + 1

    return events

def parse_single_event(block, event_type):
    """解析单个事件"""
    event = {}

    # 提取基本字符串字段
    string_fields = ['id', 'title', 'titleEn', 'location', 'region', 'date', 'endDate',
                     'summary', 'analysis', 'importance', 'conflictType', 'cfrImpact',
                     'cfrStatus', 'eventType', 'cfrUrl', 'type']

    for field in string_fields:
        pattern = rf"{field}:\s*['\"]([^'\"]*?)['\"]"
        match = re.search(pattern, block)
        if match:
            event[field] = match.group(1)

    # 提取数组字段
    event['countries'] = extract_array(block, 'countries')
    event['keyFactors'] = extract_array(block, 'keyFactors')
    event['marketImpact'] = extract_array(block, 'marketImpact')
    event['history'] = extract_history_array(block)
    event['futureKeyDates'] = extract_future_dates(block)
    event['relatedNews'] = extract_related_news(block)
    event['newsLinks'] = extract_news_links(block)

    # 提取 outlook
    outlook_match = re.search(r"outlook:\s*\{([^}]+expectation[^}]+keyPoints[^}]+)\}", block, re.DOTALL)
    if outlook_match:
        outlook_content = outlook_match.group(1)
        expectation_match = re.search(r"expectation:\s*['\"]([^'\"]+)['\"]", outlook_content)
        event['outlook'] = {
            'expectation': expectation_match.group(1) if expectation_match else '',
            'keyPoints': extract_array(outlook_content, 'keyPoints')
        }

    return event

def extract_array(content, field_name):
    """提取数组字段"""
    pattern = rf"{field_name}:\s*\[([^\]]*)\]"
    match = re.search(pattern, content)
    if match:
        array_content = match.group(1)
        # 提取字符串元素
        items = re.findall(r"['\"]([^'\"]+)['\"]", array_content)
        return items
    return []

def extract_history_array(content):
    """提取历史事件数组"""
    pattern = r"history:\s*\[([\s\S]*?)\]"
    match = re.search(pattern, content)
    if match:
        history_content = match.group(1)
        items = []
        # 匹配 { date: '...', content: '...' } 格式
        for m in re.finditer(r"\{\s*date:\s*['\"]([^'\"]+)['\"].*?content:\s*['\"]([^'\"]+)['\"]", history_content, re.DOTALL):
            items.append({'date': m.group(1), 'content': m.group(2)})
        return items
    return []

def extract_future_dates(content):
    """提取未来关键日期"""
    pattern = r"futureKeyDates:\s*\[([\s\S]*?)\]"
    match = re.search(pattern, content)
    if match:
        dates_content = match.group(1)
        items = []
        for m in re.finditer(r"\{\s*date:\s*['\"]([^'\"]+)['\"].*?event:\s*['\"]([^'\"]+)['\"]", dates_content, re.DOTALL):
            items.append({'date': m.group(1), 'event': m.group(2)})
        return items
    return []

def extract_related_news(content):
    """提取相关新闻"""
    pattern = r"relatedNews:\s*\[([\s\S]*?)\]"
    match = re.search(pattern, content)
    if match:
        news_content = match.group(1)
        items = []
        for m in re.finditer(r"\{\s*date:\s*['\"]([^'\"]+)['\"].*?title:\s*['\"]([^'\"]+)['\"].*?source:\s*['\"]([^'\"]+)['\"]", news_content, re.DOTALL):
            items.append({'date': m.group(1), 'title': m.group(2), 'source': m.group(3)})
        return items
    return []

def extract_news_links(content):
    """提取新闻链接"""
    pattern = r"newsLinks:\s*\[([\s\S]*?)\]"
    match = re.search(pattern, content)
    if match:
        links_content = match.group(1)
        items = []
        for m in re.finditer(r"\{\s*title:\s*['\"]([^'\"]+)['\"].*?url:\s*['\"]([^'\"]+)['\"]", links_content, re.DOTALL):
            items.append({'title': m.group(1), 'url': m.group(2)})
        return items
    return []

# ========================================
# 报告生成
# ========================================
def generate_geopolitical_report(event):
    """生成地缘冲突报告"""
    report_date = datetime.now().strftime("%Y年%m月%d日")
    title = event.get('title', '未知事件')
    title_en = event.get('titleEn', '')

    report = f"""# {title} - 深度分析报告

**报告日期**: {report_date}
**事件类型**: 地缘冲突
**英文名称**: {title_en}

---

## 一、事件概述

### 1.1 基本信息

| 项目 | 内容 |
|------|------|
| **地点** | {event.get('location', '未知')} |
| **区域** | {event.get('region', '未知')} |
| **冲突类型** | {event.get('conflictType', '未知')} |
| **影响级别** | {event.get('cfrImpact', '未知')} |
| **当前状态** | {event.get('cfrStatus', '未知')} |
| **涉及国家** | {', '.join(event.get('countries', []))} |

### 1.2 事件摘要

{event.get('summary', '暂无摘要信息')}

---

## 二、深度分析

### 2.1 背景分析

{event.get('analysis', '暂无深度分析')}

### 2.2 核心驱动因素

"""

    key_factors = event.get('keyFactors', [])
    for i, factor in enumerate(key_factors, 1):
        report += f"{i}. {factor}\n"

    report += """
### 2.3 市场影响评估

"""

    market_impacts = event.get('marketImpact', [])
    for impact in market_impacts:
        report += f"- {impact}\n"

    # 前景展望
    outlook = event.get('outlook', {})
    if outlook:
        report += f"""
---

## 三、前景展望

### 3.1 预期发展

{outlook.get('expectation', '暂无展望信息')}

### 3.2 关键关注点

"""
        key_points = outlook.get('keyPoints', [])
        for i, point in enumerate(key_points, 1):
            report += f"{i}. {point}\n"

    # 未来关键日期
    future_dates = event.get('futureKeyDates', [])
    if future_dates:
        report += """
### 3.3 未来关键日期

| 日期 | 事件 |
|------|------|
"""
        for fd in future_dates:
            report += f"| {fd.get('date', '')} | {fd.get('event', '')} |\n"

    # 历史脉络
    history = event.get('history', [])
    if history:
        report += """
---

## 四、历史脉络

| 时间 | 事件 |
|------|------|
"""
        for h in history:
            report += f"| {h.get('date', '')} | {h.get('content', '')} |\n"

    # 最新动态
    related_news = event.get('relatedNews', [])
    if related_news:
        report += """
---

## 五、最新动态

| 日期 | 标题 | 来源 |
|------|------|------|
"""
        for news in related_news:
            report += f"| {news.get('date', '')} | {news.get('title', '')} | {news.get('source', '')} |\n"

    # 参考链接
    news_links = event.get('newsLinks', [])
    cfr_url = event.get('cfrUrl', '')
    if news_links or cfr_url:
        report += """
---

## 六、参考链接

"""
        for link in news_links:
            report += f"- [{link.get('title', '链接')}]({link.get('url', '')})\n"
        if cfr_url:
            report += f"- [CFR追踪页面]({cfr_url})\n"

    report += f"""
---

## 七、风险提示

本报告基于公开信息整理，仅供参考，不构成投资建议。地缘政治事件发展具有高度不确定性，请结合多方面信息进行判断。

---

**报告生成时间**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
**数据来源**: CFR Global Conflict Tracker, Reuters, BBC 等
**免责声明**: 本报告仅供参考，不构成任何投资或决策建议。
"""

    return report


def generate_major_event_report(event):
    """生成重大会议与事件报告"""
    report_date = datetime.now().strftime("%Y年%m月%d日")
    title = event.get('title', '未知事件')
    title_en = event.get('titleEn', '')

    event_type_map = {
        'political': '政治会议',
        'diplomatic': '外交活动',
        'financial': '金融会议',
        'economic': '经济合作'
    }
    event_type_cn = event_type_map.get(event.get('eventType', ''), '其他')

    report = f"""# {title} - 深度分析报告

**报告日期**: {report_date}
**事件类型**: 重大会议与事件 - {event_type_cn}
**英文名称**: {title_en}

---

## 一、事件基本信息

### 1.1 时间与地点

| 项目 | 内容 |
|------|------|
| **开始日期** | {event.get('date', '待定')} |
| **结束日期** | {event.get('endDate', '单日事件') if event.get('endDate') else '单日事件'} |
| **举办地点** | {event.get('location', '待定')} |
| **所属区域** | {event.get('region', '未知')} |
| **重要性级别** | {'⭐⭐⭐ 高' if event.get('importance') == 'high' else '⭐⭐ 中' if event.get('importance') == 'medium' else '⭐ 低'} |

### 1.2 涉及方

**参与国家/地区**: 共{len(event.get('countries', []))}个

{', '.join(event.get('countries', []))}

### 1.3 事件摘要

{event.get('summary', '暂无摘要信息')}

---

## 二、深度分析

### 2.1 背景与意义

{event.get('analysis', '暂无深度分析')}

### 2.2 核心议题

"""

    key_factors = event.get('keyFactors', [])
    for i, factor in enumerate(key_factors, 1):
        report += f"{i}. {factor}\n"

    report += """
### 2.3 市场影响评估

"""

    market_impacts = event.get('marketImpact', [])
    for impact in market_impacts:
        report += f"- {impact}\n"

    # 前景展望
    outlook = event.get('outlook', {})
    if outlook:
        report += f"""
---

## 三、前景展望

### 3.1 预期成果

{outlook.get('expectation', '暂无展望信息')}

### 3.2 关键关注点

"""
        key_points = outlook.get('keyPoints', [])
        for i, point in enumerate(key_points, 1):
            report += f"{i}. {point}\n"

    # 未来关键日期
    future_dates = event.get('futureKeyDates', [])
    if future_dates:
        report += """
### 3.3 重要时间节点

| 日期 | 事件 |
|------|------|
"""
        for fd in future_dates:
            report += f"| {fd.get('date', '')} | {fd.get('event', '')} |\n"

    # 历史回顾
    history = event.get('history', [])
    if history:
        report += """
---

## 四、历史回顾

| 时间 | 事件 |
|------|------|
"""
        for h in history:
            report += f"| {h.get('date', '')} | {h.get('content', '')} |\n"

    # 最新动态
    related_news = event.get('relatedNews', [])
    if related_news:
        report += """
---

## 五、最新动态

| 日期 | 新闻标题 | 来源 |
|------|----------|------|
"""
        for news in related_news:
            report += f"| {news.get('date', '')} | {news.get('title', '')} | {news.get('source', '')} |\n"

    # 投资启示
    report += f"""
---

## 六、投资启示

### 6.1 资产类别影响

基于该事件的性质和重要性，可能受影响的资产类别包括：

"""

    if event.get('importance') == 'high':
        report += """- **股票市场**: 关注相关国家/地区股市波动
- **债券市场**: 关注主权债券收益率变化
- **外汇市场**: 关注相关货币汇率波动
- **大宗商品**: 如涉及资源国，关注相关商品价格
- **避险资产**: 不确定性可能推高黄金、日元等避险资产
"""
    else:
        report += """- **股票市场**: 关注相关板块股票
- **外汇市场**: 关注相关货币短期波动
"""

    report += """
### 6.2 风险提示

- 事件结果存在不确定性
- 市场预期可能与实际结果存在差异
- 建议关注事件进展和相关声明
- 注意风险管理，避免过度杠杆

---

**报告生成时间**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
**数据来源**: 官方网站、Reuters、Bloomberg 等
**免责声明**: 本报告仅供参考，不构成任何投资或决策建议。
"""

    return report


def save_report(content, filename):
    """保存报告"""
    timestamp = datetime.now().strftime("%Y%m%d")
    clean_filename = re.sub(r'[\/\\:*?"<>|]', '_', filename)
    filepath = REPORTS_DIR / f"{clean_filename}_{timestamp}.md"

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    return filepath


def main():
    import argparse

    parser = argparse.ArgumentParser(description='批量生成事件分析报告')
    parser.add_argument('--type', choices=['geopolitical', 'major', 'all'], default='all',
                        help='报告类型: geopolitical(地缘冲突), major(重大事件), all(全部)')
    args = parser.parse_args()

    print("=" * 60)
    print("  全球地缘信息追踪 - 批量报告生成器")
    print(f"  生成时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 60)

    # 解析数据
    print("\n正在解析 events-data.js...")
    events = parse_events_data()

    geopolitical_events = events.get('geopolitical', [])
    major_events = events.get('major', [])

    print(f"  - 地缘冲突: {len(geopolitical_events)} 个")
    print(f"  - 重大事件: {len(major_events)} 个")

    generated_count = 0

    # 生成地缘冲突报告
    if args.type in ['geopolitical', 'all']:
        print(f"\n--- 生成地缘冲突报告 ---")
        for event in geopolitical_events:
            if event.get('title'):
                try:
                    report = generate_geopolitical_report(event)
                    filepath = save_report(report, event['title'])
                    print(f"  [OK] {event['title']}")
                    generated_count += 1
                except Exception as e:
                    print(f"  [ERROR] {event.get('title', 'Unknown')}: {e}")

    # 生成重大事件报告
    if args.type in ['major', 'all']:
        print(f"\n--- 生成重大会议与事件报告 ---")
        for event in major_events:
            if event.get('title'):
                try:
                    report = generate_major_event_report(event)
                    filepath = save_report(report, event['title'])
                    print(f"  [OK] {event['title']}")
                    generated_count += 1
                except Exception as e:
                    print(f"  [ERROR] {event.get('title', 'Unknown')}: {e}")

    print("\n" + "=" * 60)
    print(f"  报告生成完成!")
    print(f"  共生成 {generated_count} 份报告")
    print(f"  保存位置: {REPORTS_DIR}")
    print("=" * 60)


if __name__ == "__main__":
    main()
