# -*- coding: utf-8 -*-
"""
从海外宏观数据库提取经济数据并转换为JSON格式
"""

import pandas as pd
import json
from datetime import datetime

def parse_date(date_val):
    """解析日期值"""
    if pd.isna(date_val):
        return None
    if isinstance(date_val, datetime):
        return date_val.strftime('%Y-%m-%d')
    if isinstance(date_val, str):
        try:
            return pd.to_datetime(date_val).strftime('%Y-%m-%d')
        except:
            return None
    return None

def extract_series_from_sheet(df, start_col, start_row=7):
    """从Excel工作表中提取一个数据序列"""
    series_data = []

    # Excel数据结构:
    # 第0行(索引0): 大类标题 - 如 "GDP不变价环比折年率季调（%）"
    # 第3行(索引3): 日期列标题 "Date" + 指标详细名称 - 如 "美国：GDP：不变价：环比折年率：季调（%）"
    # 第4行(索引4): "同花顺iFinD" 标识
    # 第5行(索引5): 最新日期 + 最新值
    # 第6行(索引6): 频率/单位信息
    # 第7行(索引7)开始: 历史数据

    date_col = start_col + 1
    value_col = start_col + 2

    # 获取指标名称 - 优先从第3行获取详细名称，其次从第0行获取大类名称
    indicator_name = None

    # 尝试从第3行获取指标详细名称
    if pd.notna(df.iloc[3, value_col]) and str(df.iloc[3, value_col]).strip() not in ['Date', '同花顺iFinD', '']:
        indicator_name = str(df.iloc[3, value_col]).strip()

    # 如果第3行没有有效名称，从第0行获取大类标题
    if not indicator_name or indicator_name == 'NaN':
        if pd.notna(df.iloc[0, start_col]):
            indicator_name = str(df.iloc[0, start_col]).strip()

    # 默认名称
    if not indicator_name or indicator_name == 'NaN':
        indicator_name = f"指标_{start_col}"

    # 清理指标名称
    indicator_name = indicator_name.replace('\n', ' ').replace('（', '(').replace('）', ')')

    # 如果名称太长，简化它
    if len(indicator_name) > 60:
        # 提取关键部分
        parts = indicator_name.split('：')
        if len(parts) > 1:
            indicator_name = parts[-1].strip()
        else:
            parts = indicator_name.split(':')
            if len(parts) > 1:
                indicator_name = parts[-1].strip()

    # 从第5行开始提取数据（第5行是最新数据）
    for i in range(5, len(df)):
        date_val = df.iloc[i, date_col]
        value_val = df.iloc[i, value_col]

        date_str = parse_date(date_val)
        if date_str and pd.notna(value_val):
            try:
                value = float(value_val)
                series_data.append({
                    'date': date_str,
                    'value': value
                })
            except (ValueError, TypeError):
                continue

    # 按日期排序（最新的在前）
    series_data.sort(key=lambda x: x['date'], reverse=True)

    return {
        'name': indicator_name,
        'data': series_data
    }

def extract_all_series_from_sheet(xlsx, sheet_name):
    """从一个工作表中提取所有数据序列"""
    try:
        df = pd.read_excel(xlsx, sheet_name=sheet_name, header=None)
    except Exception as e:
        print(f"Error reading sheet {sheet_name}: {e}")
        return []

    all_series = []

    # Excel数据结构：每个指标块占据多列
    # 块结构: [空列][标题列][日期列][数值列]...

    col = 2  # 从第C列开始
    max_col = min(df.shape[1], 60)  # 限制最大列数

    while col < max_col:
        # 检查第0行是否有标题（表示新的指标块开始）
        header_val = df.iloc[0, col] if col < df.shape[1] else None
        if pd.notna(header_val) and str(header_val).strip() and str(header_val).strip() not in ['NaN', '']:
            series = extract_series_from_sheet(df, col)
            if series['data']:
                all_series.append(series)
            col += 3  # 跳到下一个可能的指标块
        else:
            col += 1

    return all_series

def process_country_data(xlsx, sheets_config):
    """处理一个国家/地区的所有数据"""
    country_data = {}

    for category, sheet_name in sheets_config.items():
        print(f"  Processing: {sheet_name}")
        series_list = extract_all_series_from_sheet(xlsx, sheet_name)
        if series_list:
            country_data[category] = series_list

    return country_data

def main():
    print("Loading Excel file...")
    xlsx = pd.ExcelFile('【华泰固收】海外宏观数据库-20260223.xlsx')

    # 定义各国家/地区的工作表映射
    us_sheets = {
        'GDP与总量': '美国总量',
        '消费': '美国消费',
        '投资': '美国投资',
        '进出口': '美国进出口',
        '财政': '美国财政',
        '货币': '美国货币'
    }

    eurozone_sheets = {
        'GDP与总量': '欧元区总量',
        '消费': '欧元区消费',
        '投资': '欧元区投资',
        '进出口': '欧元区进出口',
        '货币与财政': '欧元区货币与财政政策'
    }

    uk_sheets = {
        '综合指标': '英国'
    }

    japan_sheets = {
        'GDP与总量': '日本总量',
        '消费': '日本消费',
        '投资': '日本投资',
        '进出口': '日本进出口',
        '货币与财政': '日本货币财政'
    }

    economic_data = {}

    print("\nExtracting US data...")
    economic_data['美国'] = process_country_data(xlsx, us_sheets)

    print("\nExtracting Eurozone data...")
    economic_data['欧元区'] = process_country_data(xlsx, eurozone_sheets)

    print("\nExtracting UK data...")
    economic_data['英国'] = process_country_data(xlsx, uk_sheets)

    print("\nExtracting Japan data...")
    economic_data['日本'] = process_country_data(xlsx, japan_sheets)

    # 统计数据
    print("\n=== Data Summary ===")
    for country, categories in economic_data.items():
        print(f"\n{country}:")
        for category, series_list in categories.items():
            print(f"  {category}: {len(series_list)} indicators")

    # 保存为JSON
    output_file = 'economic-data.js'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('// 海外宏观经济数据\n')
        f.write('// 数据来源：华泰固收海外宏观数据库\n')
        f.write(f'// 更新时间：{datetime.now().strftime("%Y-%m-%d %H:%M")}\n\n')
        f.write('const ECONOMIC_DATA = ')
        json.dump(economic_data, f, ensure_ascii=False, indent=2)
        f.write(';\n')

    print(f"\nData saved to {output_file}")

if __name__ == '__main__':
    main()
