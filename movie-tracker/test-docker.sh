#!/bin/bash

# Docker Test Script for Movie Tracker
# This script tests the Docker configuration and builds

echo "🐳 Movie Tracker Docker Test Script"
echo "=================================="

# Check if Docker is running
echo "Checking Docker status..."
if ! docker info > /dev/null 2>&1; then
    echo "❌ Error: Docker is not running. Please start Docker Desktop."
    exit 1
fi
echo "✅ Docker is running"

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ Error: .env file not found. Please create one with your TMDB_API_KEY."
    exit 1
fi
echo "✅ .env file found"

# Check if TMDB_API_KEY is set
if ! grep -q "TMDB_API_KEY=" .env; then
    echo "❌ Error: TMDB_API_KEY not found in .env file."
    exit 1
fi
echo "✅ TMDB_API_KEY found in .env"

echo ""
echo "Testing Docker configurations..."
echo ""

# Test 1: Build production image
echo "📦 Test 1: Building production Docker image..."
if docker build -t movie-tracker-test . > /dev/null 2>&1; then
    echo "✅ Production build successful"
    docker rmi movie-tracker-test > /dev/null 2>&1
else
    echo "❌ Production build failed"
    exit 1
fi

# Test 2: Build development image
echo "🔧 Test 2: Building development Docker image..."
if docker build -f Dockerfile.dev -t movie-tracker-dev-test . > /dev/null 2>&1; then
    echo "✅ Development build successful"
    docker rmi movie-tracker-dev-test > /dev/null 2>&1
else
    echo "❌ Development build failed"
    exit 1
fi

# Test 3: Validate docker-compose files
echo "📋 Test 3: Validating docker-compose configurations..."
if docker-compose -f docker-compose.yml config > /dev/null 2>&1; then
    echo "✅ docker-compose.yml is valid"
else
    echo "❌ docker-compose.yml has errors"
    exit 1
fi

if docker-compose -f docker-compose.dev.yml config > /dev/null 2>&1; then
    echo "✅ docker-compose.dev.yml is valid"
else
    echo "❌ docker-compose.dev.yml has errors"
    exit 1
fi

if docker-compose -f docker-compose.prod.yml config > /dev/null 2>&1; then
    echo "✅ docker-compose.prod.yml is valid"
else
    echo "❌ docker-compose.prod.yml has errors"
    exit 1
fi

echo ""
echo "🎉 All Docker tests passed!"
echo ""
echo "Next steps:"
echo "1. Run development: npm run docker:dev"
echo "2. Run production: npm run docker:prod"
echo "3. Access app at: http://localhost:3000"
echo ""
echo "For more information, see DOCKER.md"
