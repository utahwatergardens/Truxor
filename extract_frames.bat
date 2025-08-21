@echo off
echo Extracting frames from MP4 file...
echo.

REM Check if FFmpeg is installed
ffmpeg -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: FFmpeg is not installed or not in PATH
    echo Please download FFmpeg from: https://ffmpeg.org/download.html
    echo.
    pause
    exit /b 1
)

REM Create temp_frames directory if it doesn't exist
if not exist "temp_frames" mkdir temp_frames

REM Extract frames every 2 seconds
echo Extracting frames every 2 seconds...
ffmpeg -i "public\videos\equipment-3d-render.mp4" -vf "fps=1/2" temp_frames\frame_%04d.png

REM Extract specific key frames
echo.
echo Extracting key frames at specific timestamps...
ffmpeg -i "public\videos\equipment-3d-render.mp4" -ss 00:00:00 -vframes 1 temp_frames\front_view.png
ffmpeg -i "public\videos\equipment-3d-render.mp4" -ss 00:00:05 -vframes 1 temp_frames\side_view.png
ffmpeg -i "public\videos\equipment-3d-render.mp4" -ss 00:00:10 -vframes 1 temp_frames\back_view.png
ffmpeg -i "public\videos\equipment-3d-render.mp4" -ss 00:00:15 -vframes 1 temp_frames\top_view.png

echo.
echo Frame extraction complete!
echo Check the temp_frames folder for extracted images.
echo.
echo Next steps:
echo 1. Go to https://luma.ai
echo 2. Upload the best frame (front_view.png recommended)
echo 3. Add description: "Professional pond cleanup equipment, amphibious vehicle with tracks, cutting arm, collection system, industrial machinery, detailed 3D model, realistic materials, high quality textures"
echo 4. Generate 3D model
echo 5. Download as GLB file
echo.
pause
