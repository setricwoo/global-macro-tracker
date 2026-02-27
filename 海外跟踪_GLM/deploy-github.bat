@echo off
chcp 65001 >nul
echo ========================================
echo 全球宏观事件追踪系统 - GitHub Pages 部署
echo ========================================
echo.
echo 请按以下步骤操作：
echo.
echo 1. 打开 https://github.com/new
echo 2. 创建新仓库，名称如: global-macro-tracker
echo 3. 不要勾选 README、.gitignore 等
echo 4. 点击 Create repository
echo.
echo 5. 创建完成后，复制仓库地址，如:
echo    https://github.com/你的用户名/global-macro-tracker.git
echo.
echo 6. 在下方输入你的 GitHub 用户名:
set /p USERNAME="GitHub 用户名: "
echo.
echo 7. 正在配置远程仓库...
git remote remove origin 2>nul
git remote add origin https://github.com/%USERNAME%/global-macro-tracker.git
git branch -M gh-pages
echo.
echo 8. 正在推送到 GitHub...
git push -u origin gh-pages
echo.
echo ========================================
echo 部署完成！
echo.
echo 访问地址:
echo https://%USERNAME%.github.io/global-macro-tracker/
echo.
echo 注意: GitHub Pages 可能需要1-2分钟生效
echo 首次需要在仓库 Settings ^> Pages 中启用
echo ========================================
pause
