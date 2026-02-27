@echo off
chcp 65001 >nul
echo ========================================
echo 【华泰固收】全球宏观经济追踪 - 部署工具
echo ========================================
echo.
echo 请选择部署方式：
echo.
echo [1] GitHub Pages（免费，适合国际访问）
echo [2] Vercel（免费，自动部署，国内访问可能较慢）
echo [3] 仅本地预览
echo.
set /p choice="请输入数字 (1-3): "

if "%choice%"=="1" goto github
if "%choice%"=="2" goto vercel
if "%choice%"=="3" goto local
goto end

:github
echo.
echo ----------------------------------------
echo GitHub Pages 部署
echo ----------------------------------------
echo.
echo 前置要求：已安装 GitHub CLI (gh)
echo.

REM 检查是否已安装 gh
gh --version >nul 2>&1
if errorlevel 1 (
    echo [错误] 未检测到 GitHub CLI (gh)
    echo.
    echo 请按以下步骤安装：
    echo 1. 访问 https://cli.github.com/
    echo 2. 下载并安装 GitHub CLI
    echo 3. 重新运行此脚本
    echo.
    echo 或者手动部署：
    echo 1. 访问 https://github.com/new 创建仓库（如: htf-macro-tracker）
    echo 2. 运行: git remote add origin https://github.com/你的用户名/htf-macro-tracker.git
    echo 3. 运行: git push -u origin main
    echo 4. 在仓库 Settings ^> Pages ^> Source 选择 Deploy from a branch
    echo 5. 选择 main 分支，点击 Save
    echo.
    pause
    goto end
)

echo 正在检查登录状态...
gh auth status >nul 2>&1
if errorlevel 1 (
    echo 请先登录 GitHub...
    gh auth login
)

echo.
set /p repo_name="请输入仓库名称 (如: htf-macro-tracker): "
echo.

echo 正在创建 GitHub 仓库...
gh repo create %repo_name% --public --source=. --remote=origin --push

echo.
echo 正在启用 GitHub Pages...
gh api repos/{owner}/%repo_name%/pages -X POST -F source='{"branch":"main"}' 2>nul

echo.
echo ========================================
echo 部署完成！
echo ========================================
echo.
echo 访问地址将在几分钟后生效：
for /f "tokens=*" %%a in ('gh api user -q .login') do @set USERNAME=%%a
echo https://%USERNAME%.github.io/%repo_name%/
echo.
echo 注意：首次部署可能需要 1-5 分钟生效
echo.
pause
goto end

:vercel
echo.
echo ----------------------------------------
echo Vercel 部署
echo ----------------------------------------
echo.
echo 前置要求：已安装 Vercel CLI (npm i -g vercel)
echo.

vercel --version >nul 2>&1
if errorlevel 1 (
    echo [错误] 未检测到 Vercel CLI
    echo.
    echo 请按以下步骤安装：
    echo 1. 确保已安装 Node.js (https://nodejs.org)
    echo 2. 运行: npm install -g vercel
    echo 3. 重新运行此脚本
    echo.
    echo 或者手动部署：
    echo 1. 访问 https://vercel.com/new
    echo 2. 导入您的 GitHub 仓库
    echo 3. 点击 Deploy，自动完成部署
    echo.
    pause
    goto end
)

echo 正在部署到 Vercel...
vercel --prod

echo.
echo ========================================
echo 部署完成！
echo ========================================
echo.
pause
goto end

:local
echo.
echo ----------------------------------------
echo 本地预览
echo ----------------------------------------
echo.
echo 正在启动本地服务器...
echo 访问地址: http://localhost:8080
echo.
echo 按 Ctrl+C 停止服务器
echo.
python -m http.server 8080
pause
goto end

:end
