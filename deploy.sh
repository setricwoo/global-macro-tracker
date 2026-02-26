#!/bin/bash
# 全球宏观事件追踪系统 - 部署脚本

echo "================================"
echo "全球宏观事件追踪系统 - 部署工具"
echo "================================"
echo ""

# 方式1: GitHub Pages 部署
echo "📦 方式1: GitHub Pages 部署（推荐）"
echo "--------------------------------"
echo "步骤："
echo "1. 在 GitHub 创建新仓库（如: global-macro-tracker）"
echo "2. 运行以下命令："
echo ""
echo "   git remote add origin https://github.com/你的用户名/global-macro-tracker.git"
echo "   git push -u origin master"
echo "   # 然后在仓库 Settings > Pages > Source 选择 master branch"
echo ""
echo "3. 访问地址: https://你的用户名.github.io/global-macro-tracker/"
echo ""

# 方式2: Vercel 部署
echo "📦 方式2: Vercel 部署（最简单）"
echo "--------------------------------"
echo "步骤："
echo "1. 访问 https://vercel.com"
echo "2. 注册/登录"
echo "3. 直接拖拽项目文件夹到页面即可"
echo "4. 自动获得 https://xxx.vercel.app 地址"
echo ""

# 方式3: Netlify 部署
echo "📦 方式3: Netlify 部署"
echo "--------------------------------"
echo "步骤："
echo "1. 访问 https://netlify.com"
echo "2. 注册/登录"
echo "3. 拖拽项目文件夹到 'Drag and drop your site' 区域"
echo "4. 自动获得 https://xxx.netlify.app 地址"
echo ""

# 本地测试
echo "🔧 本地测试"
echo "--------------------------------"
echo "运行: python -m http.server 8080"
echo "访问: http://localhost:8080"
echo ""

echo "================================"
echo "当前项目文件:"
ls -la *.html *.css *.js *.md 2>/dev/null
echo "================================"
