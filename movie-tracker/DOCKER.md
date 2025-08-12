# Docker Deployment Guide for Movie Tracker

This guide provides comprehensive instructions for deploying the Movie Tracker application using Docker.

## Prerequisites

1. **Docker Desktop** installed and running
2. **Docker Compose** (included with Docker Desktop)
3. **TMDB API Key** from [The Movie Database](https://www.themoviedb.org/settings/api)

## Quick Start

### 0. Verify Docker Setup
Run the verification script to test your Docker configuration:
```powershell
# For Windows PowerShell
.\scripts\docker-verify.ps1
```

### 1. Environment Setup
```bash
# Clone the repository
git clone <repository-url>
cd movie-tracker

# Create environment file
cp .env.example .env
# Edit .env and add your TMDB_API_KEY
```

### 2. Development Mode
```bash
# Start development environment with hot reload
npm run docker:dev

# Or using docker-compose directly
docker-compose -f docker-compose.dev.yml up --build
```

Access the application at: http://localhost:3000

### 3. Production Mode
```bash
# Start production environment
npm run docker:prod

# Or using docker-compose directly
docker-compose -f docker-compose.prod.yml up --build
```

## Docker Configuration Overview

### Files Structure
```
movie-tracker/
├── Dockerfile              # Multi-stage production build
├── Dockerfile.dev          # Development environment
├── docker-compose.yml      # Base configuration
├── docker-compose.dev.yml  # Development with hot reload
├── docker-compose.prod.yml # Production with Nginx
├── .dockerignore           # Docker ignore patterns
├── nginx.conf              # Nginx reverse proxy config
└── .env                    # Environment variables
```

## Detailed Configuration

### Production Dockerfile (Multi-stage)

**Stage 1: Builder**
- Uses `node:18-alpine` for small footprint
- Installs dependencies and builds the application
- Optimizes for production build

**Stage 2: Runtime**
- Lightweight runtime image
- Non-root user for security
- Health checks included
- Only copies built artifacts

### Development Environment

Features:
- Hot reload for instant code changes
- Volume mounting for development
- DevTools access on port 24678
- Full development dependencies

### Production Environment

Features:
- Optimized multi-stage build
- Nginx reverse proxy (optional)
- Health checks and monitoring
- Resource limits
- Security headers

## Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `TMDB_API_KEY` | TMDB API key for movie data | - | Yes |
| `NUXT_PUBLIC_TMDB_BASE_URL` | TMDB API base URL | `https://api.themoviedb.org/3` | No |
| `NUXT_PUBLIC_TMDB_IMAGE_BASE_URL` | TMDB image base URL | `https://image.tmdb.org/t/p` | No |
| `NODE_ENV` | Node environment | `production` | No |
| `PORT` | Application port | `3000` | No |

## Docker Commands Reference

### Basic Operations
```bash
# Build image
docker build -t movie-tracker .

# Run container
docker run -p 3000:3000 --env-file .env movie-tracker

# View running containers
docker ps

# Stop container
docker stop <container-id>

# Remove container
docker rm <container-id>

# Remove image
docker rmi movie-tracker
```

### Docker Compose Operations
```bash
# Start services
docker-compose up

# Start in background
docker-compose up -d

# Build and start
docker-compose up --build

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Scale services
docker-compose up --scale movie-tracker=3
```

### Development Workflow
```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up

# Rebuild on changes
docker-compose -f docker-compose.dev.yml up --build

# Shell into container
docker-compose -f docker-compose.dev.yml exec movie-tracker-dev sh

# View real-time logs
docker-compose -f docker-compose.dev.yml logs -f
```

### Production Deployment
```bash
# Build and start production
docker-compose -f docker-compose.prod.yml up -d

# Update application
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d

# Backup data (if volumes exist)
docker-compose -f docker-compose.prod.yml down
docker run --rm -v movie-tracker_data:/data -v $(pwd):/backup busybox tar czf /backup/backup.tar.gz /data
```

## Optimization Tips

### Image Size Optimization
- Multi-stage builds reduce final image size
- `.dockerignore` excludes unnecessary files
- Alpine Linux base images are lightweight
- Only production dependencies in final stage

### Performance Optimization
- Nginx reverse proxy for static file serving
- Gzip compression enabled
- Proper caching headers
- Health checks for container monitoring

### Security Best Practices
- Non-root user in containers
- Security headers in Nginx
- Environment variable isolation
- Minimal attack surface

## Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Find process using port 3000
netstat -tulpn | grep 3000

# Kill process or change port in docker-compose.yml
```

**Docker Build Fails**
```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
docker build --no-cache -t movie-tracker .
```

**Environment Variables Not Working**
```bash
# Check .env file exists
ls -la .env

# Verify container environment
docker exec -it <container-id> env
```

**Container Exits Immediately**
```bash
# Check container logs
docker logs <container-id>

# Run container interactively
docker run -it --entrypoint sh movie-tracker
```

### Health Checks

Monitor application health:
```bash
# Check health status
docker inspect --format='{{.State.Health.Status}}' <container-id>

# View health check logs
docker inspect --format='{{range .State.Health.Log}}{{.Output}}{{end}}' <container-id>
```

## CI/CD Integration

### GitHub Actions Example
```yaml
name: Docker Build and Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build and deploy
        run: |
          docker build -t movie-tracker .
          docker-compose -f docker-compose.prod.yml up -d
```

### Environment-specific Deployments
- Use different compose files for staging/production
- Environment-specific .env files
- Automated testing in containers
- Blue-green deployment strategies

## Monitoring and Logging

### Container Monitoring
```bash
# Resource usage
docker stats

# Container processes
docker top <container-id>

# Container filesystem
docker diff <container-id>
```

### Log Management
```bash
# Follow logs
docker-compose logs -f

# Log rotation
docker-compose logs --tail=100 -f

# Export logs
docker-compose logs > app.log
```

## Production Checklist

- [ ] TMDB API key configured
- [ ] Environment variables set
- [ ] Docker containers running healthy
- [ ] Nginx proxy configured (if used)
- [ ] SSL certificates installed (if HTTPS)
- [ ] Monitoring and logging setup
- [ ] Backup strategy implemented
- [ ] Security headers configured
- [ ] Resource limits set
- [ ] Health checks enabled

## Support

For issues or questions:
1. Check container logs: `docker-compose logs`
2. Verify environment variables: `docker exec <container> env`
3. Test connectivity: `curl http://localhost:3000`
4. Review Docker documentation: [docs.docker.com](https://docs.docker.com)
