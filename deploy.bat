@echo off
echo ========================================
echo PondCleanup.com Deployment Script
echo ========================================
echo.

echo 1. Building the project...
npm run build

if %errorlevel% neq 0 (
    echo Build failed! Please fix the errors before deploying.
    pause
    exit /b 1
)

echo.
echo 2. Build successful! Ready to deploy.
echo.
echo 3. Next steps:
echo    - Commit and push to GitHub: https://github.com/utahwatergardens/Truxor.git
echo    - Deploy to Vercel using: npm run deploy
echo    - Or connect your GitHub repo to Vercel for automatic deployments
echo.
echo 4. To push to GitHub, run these commands:
echo    git add .
echo    git commit -m "Deploy pond cleanup website"
echo    git push origin main
echo.
pause
