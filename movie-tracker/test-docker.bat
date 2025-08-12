@echo off
REM Docker Test Script for Movie Tracker (Windows)
REM This script tests the Docker configuration and builds

echo 🐳 Movie Tracker Docker Test Script
echo ==================================

REM Check if Docker is running
echo Checking Docker status...
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Error: Docker is not running. Please start Docker Desktop.
    pause
    exit /b 1
)
echo ✅ Docker is running

REM Check if .env file exists
if not exist ".env" (
    echo ❌ Error: .env file not found. Please create one with your TMDB_API_KEY.
    pause
    exit /b 1
)
echo ✅ .env file found

REM Check if TMDB_API_KEY is set
findstr /C:"TMDB_API_KEY=" .env >nul
if %errorlevel% neq 0 (
    echo ❌ Error: TMDB_API_KEY not found in .env file.
    pause
    exit /b 1
)
echo ✅ TMDB_API_KEY found in .env

echo.
echo Testing Docker configurations...
echo.

REM Test 1: Build production image
echo 📦 Test 1: Building production Docker image...
docker build -t movie-tracker-test . >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Production build successful
    docker rmi movie-tracker-test >nul 2>&1
) else (
    echo ❌ Production build failed
    pause
    exit /b 1
)

REM Test 2: Build development image
echo 🔧 Test 2: Building development Docker image...
docker build -f Dockerfile.dev -t movie-tracker-dev-test . >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Development build successful
    docker rmi movie-tracker-dev-test >nul 2>&1
) else (
    echo ❌ Development build failed
    pause
    exit /b 1
)

REM Test 3: Validate docker-compose files
echo 📋 Test 3: Validating docker-compose configurations...
docker-compose -f docker-compose.yml config >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ docker-compose.yml is valid
) else (
    echo ❌ docker-compose.yml has errors
    pause
    exit /b 1
)

docker-compose -f docker-compose.dev.yml config >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ docker-compose.dev.yml is valid
) else (
    echo ❌ docker-compose.dev.yml has errors
    pause
    exit /b 1
)

docker-compose -f docker-compose.prod.yml config >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ docker-compose.prod.yml is valid
) else (
    echo ❌ docker-compose.prod.yml has errors
    pause
    exit /b 1
)

echo.
echo 🎉 All Docker tests passed!
echo.
echo Next steps:
echo 1. Run development: npm run docker:dev
echo 2. Run production: npm run docker:prod
echo 3. Access app at: http://localhost:3000
echo.
echo For more information, see DOCKER.md
echo.
pause
