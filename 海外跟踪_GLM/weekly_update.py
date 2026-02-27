#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
全球地缘信息追踪系统 - 每周数据更新脚本
功能：
1. 更新财经日历数据（未来2周）
2. 更新地缘冲突相关新闻
3. 更新重大会议与事件信息
4. 生成更新报告

使用方法：
    python weekly_update.py              # 交互式更新
    python weekly_update.py --calendar   # 仅更新财经日历
    python weekly_update.py --geo        # 仅更新地缘冲突
    python weekly_update.py --events     # 仅更新重大事件
    python weekly_update.py --all        # 更新全部

依赖安装：
    pip install requests beautifulsoup4
"""

import json
import re
import os
from datetime import datetime, timedelta
from pathlib import Path

# ========================================
# 配置
# ========================================
PROJECT_DIR = Path(__file__).parent
APP_JS_PATH = PROJECT_DIR / "app.js"
EVENTS_DATA_PATH = PROJECT_DIR / "events-data.js"

# 数据源配置
DATA_SOURCES = {
    "财经日历": {
        "金十数据": "https://www.jin10.com/calendar",
        "Investing.com": "https://www.investing.com/economic-calendar/",
        "Forex Factory": "https://www.forexfactory.com/calendar"
    },
    "地缘冲突": {
        "CFR": "https://www.cfr.org/global-conflict-tracker",
        "Reuters": "https://www.reuters.com/world/",
        "BBC": "https://www.bbc.com/news/world"
    },
    "重大事件": {
        "G20": "https://g20.org/",
        "APEC": "https://www.apec.org/",
        "中国政府网": "http://www.gov.cn/"
    }
}

# ========================================
# 工具函数
# ========================================
def print_header(title):
    """打印标题头"""
    print("\n" + "=" * 60)
    print(f"  {title}")
    print("=" * 60)

def print_section(title):
    """打印分节标题"""
    print(f"\n--- {title} ---")

def get_user_input(prompt, default=None):
    """获取用户输入"""
    if default:
        user_input = input(f"{prompt} (默认: {default}): ").strip()
        return user_input if user_input else default
    return input(f"{prompt}: ").strip()

def confirm_action(prompt):
    """确认操作"""
    response = input(f"{prompt} (y/n): ").strip().lower()
    return response == 'y' or response == 'yes'

# ========================================
# 财经日历更新
# ========================================
def update_economic_calendar():
    """更新财经日历数据"""
    print_header("财经日历数据更新")

    print("\n数据获取来源:")
    for name, url in DATA_SOURCES["财经日历"].items():
        print(f"  - {name}: {url}")

    print("\n请手动访问以上网站获取未来2周的重要经济数据，然后输入以下信息:")
    print("(输入 'done' 完成添加)\n")

    new_events = []
    event_count = 0

    while True:
        event_count += 1
        print(f"\n[事件 #{event_count}]")

        title = get_user_input("事件名称 (如: 美国2月非农就业数据)")
        if title.lower() == 'done' or not title:
            break

        event = {
            'id': f'econ-new-{event_count}',
            'date': get_user_input("日期 (YYYY-MM-DD)", (datetime.now() + timedelta(days=7)).strftime("%Y-%m-%d")),
            'time': get_user_input("时间 (北京时间)", "21:30"),
            'title': title,
            'country': get_user_input("国家", "美国"),
            'countryCode': get_user_input("国家代码", "US"),
            'importance': get_user_input("重要性 (high/medium/low)", "high"),
            'type': get_user_input("类型 (economic/central-bank/summit)", "economic"),
            'previousValue': get_user_input("前值", "--"),
            'forecastValue': get_user_input("预测值", "--"),
            'actualValue': None,
            'unit': get_user_input("单位", ""),
            'description': get_user_input("事件描述", ""),
            'impact': get_user_input("市场影响分析", ""),
            'publishAgency': get_user_input("发布机构", ""),
            'frequency': get_user_input("发布频率", "每月")
        }

        new_events.append(event)
        print(f"  ✓ 已添加: {event['title']}")

    if new_events:
        print(f"\n共添加 {len(new_events)} 个新事件")
        if confirm_action("是否保存到 app.js?"):
            save_economic_events(new_events)
    else:
        print("\n未添加任何事件")

    return new_events

def save_economic_events(new_events):
    """保存经济事件到 app.js"""
    print("\n正在更新 app.js...")

    # 生成新事件JSON
    events_json = ",\n    ".join([
        json.dumps(event, ensure_ascii=False, indent=4)
        for event in new_events
    ])

    print(f"\n请在 app.js 的 economicCalendarData 数组中添加以下内容:\n")
    print("    " + events_json + ",")

    print("\n提示: 也可以直接编辑 app.js 文件，将新事件添加到 economicCalendarData 数组开头")

# ========================================
# 地缘冲突更新
# ========================================
def update_geopolitical_events():
    """更新地缘冲突数据"""
    print_header("地缘冲突数据更新")

    print("\n数据获取来源:")
    for name, url in DATA_SOURCES["地缘冲突"].items():
        print(f"  - {name}: {url}")

    print_section("当前跟踪的冲突列表")

    # 读取现有事件
    events = read_events_data()
    geo_events = [e for e in events.get('geopolitical', []) if e.get('type') == 'geopolitical']

    for i, event in enumerate(geo_events[:10], 1):  # 显示前10个
        impact = event.get('cfrImpact', 'Unknown')
        status = event.get('cfrStatus', 'Unknown')
        print(f"  {i}. {event.get('title', 'Unknown')} [{impact}/{status}]")

    if len(geo_events) > 10:
        print(f"  ... 还有 {len(geo_events) - 10} 个冲突")

    print_section("更新选项")
    print("  1. 更新特定冲突的相关新闻")
    print("  2. 更新冲突状态")
    print("  3. 添加新冲突")
    print("  0. 返回")

    choice = get_user_input("\n选择操作", "0")

    if choice == "1":
        update_conflict_news(geo_events)
    elif choice == "2":
        update_conflict_status(geo_events)
    elif choice == "3":
        add_new_conflict()
    else:
        print("返回主菜单")

def update_conflict_news(events):
    """更新冲突相关新闻"""
    print("\n选择要更新的冲突:")
    for i, event in enumerate(events, 1):
        print(f"  {i}. {event.get('title', 'Unknown')}")

    try:
        idx = int(get_user_input("输入编号", "0")) - 1
        if 0 <= idx < len(events):
            event = events[idx]
            print(f"\n正在更新: {event.get('title')}")
            print("当前相关新闻:")
            for news in event.get('relatedNews', [])[:3]:
                print(f"  - [{news.get('date')}] {news.get('title')} ({news.get('source')})")

            print("\n请输入新的相关新闻 (输入 'done' 完成):")
            new_news = []
            while True:
                title = get_user_input("新闻标题")
                if title.lower() == 'done' or not title:
                    break
                news_item = {
                    'date': get_user_input("日期 (YYYY-MM-DD)", datetime.now().strftime("%Y-%m-%d")),
                    'title': title,
                    'source': get_user_input("来源", "Reuters")
                }
                new_news.append(news_item)

            if new_news:
                print(f"\n请在 events-data.js 中找到事件 id={event.get('id')}，")
                print("将以下内容添加到 relatedNews 数组开头:")
                for item in new_news:
                    print(f"    {{ date: '{item['date']}', title: '{item['title']}', source: '{item['source']}' }},")
    except ValueError:
        print("无效输入")

def update_conflict_status(events):
    """更新冲突状态"""
    print("\n选择要更新的冲突:")
    for i, event in enumerate(events, 1):
        print(f"  {i}. {event.get('title', 'Unknown')} [{event.get('cfrStatus', 'Unknown')}]")

    try:
        idx = int(get_user_input("输入编号", "0")) - 1
        if 0 <= idx < len(events):
            event = events[idx]
            print(f"\n当前状态: {event.get('cfrStatus')}")
            new_status = get_user_input("新状态 (Worsening/Unchanging/Improving)", event.get('cfrStatus'))

            print(f"\n请在 events-data.js 中找到事件 id={event.get('id')}，")
            print(f"将 cfrStatus 更改为: '{new_status}'")
    except ValueError:
        print("无效输入")

def add_new_conflict():
    """添加新冲突"""
    print("\n添加新地缘冲突...")
    print("请参考 DATA_UPDATE_GUIDE.md 中的数据结构填写")

    conflict = {
        'id': get_user_input("ID (数字)", "99"),
        'title': get_user_input("冲突名称"),
        'titleEn': get_user_input("英文名称"),
        'location': get_user_input("地点"),
        'region': get_user_input("区域 (Asia/Europe and Eurasia/Middle East and North Africa/Sub-Saharan Africa/Americas)"),
        'conflictType': get_user_input("冲突类型 (Interstate/Civil War/Territorial Dispute/Transnational Terrorism/Political Instability)"),
        'cfrImpact': get_user_input("影响级别 (Critical/Significant/Limited)"),
        'cfrStatus': get_user_input("状态 (Worsening/Unchanging/Improving)"),
        'countries': get_user_input("涉及国家代码 (逗号分隔，如: CN,US)").split(','),
        'summary': get_user_input("概述"),
    }

    print("\n请在 events-data.js 的 eventsData 数组中添加以下内容:")
    print(json.dumps(conflict, ensure_ascii=False, indent=4))

# ========================================
# 重大事件更新
# ========================================
def update_major_events():
    """更新重大会议与事件"""
    print_header("重大会议与事件更新")

    print("\n数据获取来源:")
    for name, url in DATA_SOURCES["重大事件"].items():
        print(f"  - {name}: {url}")

    print_section("当前跟踪的重大事件")

    events = read_events_data()
    major_events = events.get('majorEvents', [])

    for i, event in enumerate(major_events, 1):
        date = event.get('date', 'Unknown')
        print(f"  {i}. [{date}] {event.get('title', 'Unknown')}")

    print_section("更新选项")
    print("  1. 更新事件相关新闻")
    print("  2. 添加新事件")
    print("  3. 更新事件日期")
    print("  0. 返回")

    choice = get_user_input("\n选择操作", "0")

    if choice == "1":
        update_major_event_news(major_events)
    elif choice == "2":
        add_new_major_event()
    elif choice == "3":
        update_major_event_date(major_events)

def update_major_event_news(events):
    """更新重大事件新闻"""
    print("\n选择要更新的事件:")
    for i, event in enumerate(events, 1):
        print(f"  {i}. {event.get('title', 'Unknown')}")

    try:
        idx = int(get_user_input("输入编号", "0")) - 1
        if 0 <= idx < len(events):
            event = events[idx]
            print(f"\n正在更新: {event.get('title')}")

            print("\n请输入新的相关新闻 (输入 'done' 完成):")
            new_news = []
            while True:
                title = get_user_input("新闻标题")
                if title.lower() == 'done' or not title:
                    break
                news_item = {
                    'date': get_user_input("日期", datetime.now().strftime("%Y-%m-%d")),
                    'title': title,
                    'source': get_user_input("来源", "Reuters")
                }
                new_news.append(news_item)

            if new_news:
                print(f"\n请在 events-data.js 中找到事件 id={event.get('id')}，")
                print("将以下内容添加到 relatedNews 数组:")
                for item in new_news:
                    print(f"    {{ date: '{item['date']}', title: '{item['title']}', source: '{item['source']}' }},")
    except ValueError:
        print("无效输入")

def update_major_event_date(events):
    """更新事件日期"""
    print("\n选择要更新的事件:")
    for i, event in enumerate(events, 1):
        print(f"  {i}. {event.get('title', 'Unknown')} - {event.get('date')}")

    try:
        idx = int(get_user_input("输入编号", "0")) - 1
        if 0 <= idx < len(events):
            event = events[idx]
            new_date = get_user_input("新日期 (YYYY-MM-DD)", event.get('date'))

            print(f"\n请在 events-data.js 中找到事件 id={event.get('id')}，")
            print(f"将 date 更改为: '{new_date}'")
    except ValueError:
        print("无效输入")

def add_new_major_event():
    """添加新重大事件"""
    print("\n添加新的重大会议与事件...")

    event = {
        'id': get_user_input("ID (如: me-9)", f"me-{datetime.now().strftime('%Y%m%d')}"),
        'type': 'major-event',
        'eventType': get_user_input("事件类型 (political/diplomatic/financial/economic)", "diplomatic"),
        'title': get_user_input("事件名称"),
        'titleEn': get_user_input("英文名称"),
        'date': get_user_input("开始日期 (YYYY-MM-DD)"),
        'endDate': get_user_input("结束日期 (可选)"),
        'location': get_user_input("地点"),
        'region': get_user_input("区域"),
        'importance': get_user_input("重要性 (high/medium)", "high"),
        'countries': get_user_input("涉及国家代码").split(',') if get_user_input("涉及国家代码") else [],
        'coordinates': {
            'lat': float(get_user_input("纬度", "0")),
            'lng': float(get_user_input("经度", "0"))
        },
        'summary': get_user_input("概述"),
        'analysis': get_user_input("分析"),
    }

    # 清理空值
    event = {k: v for k, v in event.items() if v}

    print("\n请在 events-data.js 的 majorEventsData 数组中添加以下内容:")
    print(json.dumps(event, ensure_ascii=False, indent=4))

# ========================================
# 文件操作
# ========================================
def read_events_data():
    """读取 events-data.js 文件"""
    try:
        with open(EVENTS_DATA_PATH, 'r', encoding='utf-8') as f:
            content = f.read()

        # 简单解析（实际应用中可能需要更复杂的解析）
        events = {
            'geopolitical': [],
            'majorEvents': []
        }

        # 这里只做基本解析，实际更新时手动编辑更可靠
        return events

    except FileNotFoundError:
        print(f"警告: {EVENTS_DATA_PATH} 不存在")
        return {'geopolitical': [], 'majorEvents': []}

def backup_files():
    """备份原始文件"""
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_dir = PROJECT_DIR / "backups"
    backup_dir.mkdir(exist_ok=True)

    for file_path in [APP_JS_PATH, EVENTS_DATA_PATH]:
        if file_path.exists():
            backup_path = backup_dir / f"{file_path.stem}_{timestamp}{file_path.suffix}"
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            with open(backup_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"  ✓ 已备份: {backup_path.name}")

# ========================================
# 生成更新报告
# ========================================
def generate_report(calendar_events=None, geo_updates=None, major_updates=None):
    """生成更新报告"""
    report_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    print_header("更新报告")
    print(f"更新时间: {report_time}")

    if calendar_events:
        print(f"\n财经日历: 新增 {len(calendar_events)} 个事件")
        for event in calendar_events:
            print(f"  - [{event['date']}] {event['title']}")

    if geo_updates:
        print(f"\n地缘冲突: 更新 {len(geo_updates)} 项")

    if major_updates:
        print(f"\n重大事件: 更新 {len(major_updates)} 项")

    print("\n" + "=" * 60)
    print("更新完成! 请检查以下文件确认更改:")
    print(f"  - {APP_JS_PATH}")
    print(f"  - {EVENTS_DATA_PATH}")
    print("=" * 60)

# ========================================
# 主菜单
# ========================================
def show_main_menu():
    """显示主菜单"""
    print_header("全球地缘信息追踪 - 每周数据更新")
    print(f"当前时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

    print("\n请选择更新内容:")
    print("  1. 更新财经日历")
    print("  2. 更新地缘冲突")
    print("  3. 更新重大会议与事件")
    print("  4. 全部更新")
    print("  5. 备份当前数据")
    print("  6. 查看数据源列表")
    print("  0. 退出")

    return get_user_input("\n选择", "0")

def show_data_sources():
    """显示数据源"""
    print_header("数据获取来源")

    for category, sources in DATA_SOURCES.items():
        print(f"\n{category}:")
        for name, url in sources.items():
            print(f"  - {name}: {url}")

# ========================================
# 主函数
# ========================================
def main():
    import sys

    # 解析命令行参数
    args = sys.argv[1:]

    if '--calendar' in args:
        update_economic_calendar()
    elif '--geo' in args:
        update_geopolitical_events()
    elif '--events' in args:
        update_major_events()
    elif '--all' in args:
        update_economic_calendar()
        update_geopolitical_events()
        update_major_events()
    elif '--sources' in args:
        show_data_sources()
    else:
        # 交互式菜单
        while True:
            choice = show_main_menu()

            if choice == '1':
                update_economic_calendar()
            elif choice == '2':
                update_geopolitical_events()
            elif choice == '3':
                update_major_events()
            elif choice == '4':
                update_economic_calendar()
                update_geopolitical_events()
                update_major_events()
            elif choice == '5':
                print("\n正在备份...")
                backup_files()
            elif choice == '6':
                show_data_sources()
            elif choice == '0':
                print("\n再见!")
                break
            else:
                print("无效选择，请重试")

            input("\n按回车键继续...")

if __name__ == "__main__":
    main()
