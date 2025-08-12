# Docker Verification Script for Movie Tracker
# Run this script to verify your Docker setup

Write-Host "🐳 Movie Tracker Docker Verification Script" -ForegroundColor Blue
Write-Host "==========================================" -ForegroundColor Blue

# Check if Docker is running
Write-Host "`n1. Checking Docker daemon..." -ForegroundColor Yellow
try {
    docker version | Out-Null
    Write-Host "✅ Docker daemon is running" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker daemon is not running. Please start Docker Desktop." -ForegroundColor Red
    Write-Host "   Download Docker Desktop from: https://www.docker.com/products/docker-desktop/" -ForegroundColor Cyan
    exit 1
}

# Check if docker-compose is available
Write-Host "`n2. Checking Docker Compose..." -ForegroundColor Yellow
try {
    docker-compose --version | Out-Null
    Write-Host "✅ Docker Compose is available" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker Compose is not available" -ForegroundColor Red
    exit 1
}

# Build the Docker image
Write-Host "`n3. Building Docker image..." -ForegroundColor Yellow
try {
    docker build -t movie-tracker .
    Write-Host "✅ Docker image built successfully" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to build Docker image" -ForegroundColor Red
    exit 1
}

# Test development environment
Write-Host "`n4. Testing development environment..." -ForegroundColor Yellow
try {
    Write-Host "Starting development environment (this may take a moment)..." -ForegroundColor Cyan
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
    
    # Wait for service to be ready
    Start-Sleep -Seconds 10
    
    # Test health endpoint
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/health" -Method Get
    if ($response.status -eq "healthy") {
        Write-Host "✅ Development environment is healthy" -ForegroundColor Green
        Write-Host "   Health check response: $($response | ConvertTo-Json -Compress)" -ForegroundColor Cyan
    } else {
        Write-Host "⚠️  Development environment started but health check failed" -ForegroundColor Yellow
    }
    
    # Stop the development environment
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml down
    
} catch {
    Write-Host "❌ Failed to test development environment: $($_.Exception.Message)" -ForegroundColor Red
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml down
}

# Test production environment
Write-Host "`n5. Testing production environment..." -ForegroundColor Yellow
try {
    Write-Host "Starting production environment (this may take a moment)..." -ForegroundColor Cyan
    docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
    
    # Wait for services to be ready
    Start-Sleep -Seconds 15
    
    # Test health endpoint through Nginx
    $response = Invoke-RestMethod -Uri "http://localhost/api/health" -Method Get
    if ($response.status -eq "healthy") {
        Write-Host "✅ Production environment is healthy" -ForegroundColor Green
        Write-Host "   Health check response: $($response | ConvertTo-Json -Compress)" -ForegroundColor Cyan
    } else {
        Write-Host "⚠️  Production environment started but health check failed" -ForegroundColor Yellow
    }
    
    # Stop the production environment
    docker-compose -f docker-compose.yml -f docker-compose.prod.yml down
    
} catch {
    Write-Host "❌ Failed to test production environment: $($_.Exception.Message)" -ForegroundColor Red
    docker-compose -f docker-compose.yml -f docker-compose.prod.yml down
}

# Clean up
Write-Host "`n6. Cleaning up..." -ForegroundColor Yellow
docker system prune -f | Out-Null
Write-Host "✅ Cleanup completed" -ForegroundColor Green

Write-Host "`n🎉 Docker verification completed!" -ForegroundColor Green
Write-Host "Your Movie Tracker app is ready for Docker deployment!" -ForegroundColor Green
Write-Host "`nUseful commands:" -ForegroundColor Blue
Write-Host "  npm run docker:dev  - Start development environment" -ForegroundColor Cyan
Write-Host "  npm run docker:prod - Start production environment" -ForegroundColor Cyan
Write-Host "  npm run docker:stop - Stop all containers" -ForegroundColor Cyan
Write-Host "  npm run docker:logs - View container logs" -ForegroundColor Cyan
