# Movie Tracker 🎬

A modern, containerized movie and TV show tracking application built with Nuxt 3, Tailwind CSS, and TMDB API. Fully Dockerized for development and production deployment.

## ✨ Features

- 🎬 Browse popular movies and TV shows
- 🔍 Advanced search functionality with filters
- ❤️ Add/remove favorites with local storage persistence
- 📱 Responsive design for all devices
- 🎨 Modern UI with Tailwind CSS
- ⚡ Fast performance with Nuxt 3 + Nitro
- 🏪 State management with Pinia
- 📝 Detailed movie and TV show information pages
- 🐳 **Full Docker support** for development and production
- 🏥 **Health check endpoints** for monitoring
- 🔒 **Security hardened** containers
- 📊 **Multi-stage builds** for optimized images

## 🚀 Tech Stack

- **Framework**: Nuxt 3 (v4.0.3) with Nitro 2.12.4
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **API**: The Movie Database (TMDB)
- **Language**: Vue 3 with Composition API
- **Build Tool**: Vite
- **Containerization**: Docker & Docker Compose
- **Web Server**: Nginx (production)
- **Runtime**: Node.js 18 Alpine

## 🐳 Quick Start with Docker (Recommended)

### Prerequisites
- Docker Desktop installed and running
- TMDB API key from [TMDB](https://www.themoviedb.org/settings/api)

### 1. Setup Environment
```bash
# Clone the repository
git clone <your-repo-url>
cd movie-tracker

# Create environment file
cp .env.example .env
# Edit .env and add your TMDB_API_KEY
```

### 2. Verify Docker Setup (Optional)
```powershell
# Run verification script (Windows)
.\scripts\docker-verify.ps1
```

### 3. Choose Your Environment

**🔧 Development Mode** (with hot reload):
```bash
npm run docker:dev
# Access: http://localhost:3000
```

**🚀 Production Mode** (optimized build):
```bash
npm run docker:prod  
# Access: http://localhost (port 80)
```

### 4. Health Check
Visit http://localhost:3000/api/health to verify everything is working.

---

## 💻 Local Development (Alternative)

If you prefer running without Docker:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Get your TMDB API key from [TMDB](https://www.themoviedb.org/settings/api)

3. Create a `.env` file in the root directory:
   ```bash
   TMDB_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🐳 Docker Documentation

### Architecture
- **Multi-stage Dockerfile**: Optimized production builds
- **Development Environment**: Hot reload with volume mounting  
- **Production Environment**: Nginx reverse proxy + health checks
- **Security**: Non-root user execution, minimal Alpine images

### Available Commands

```bash
# 🔧 Development
npm run docker:dev      # Start development with hot reload
npm run docker:build    # Build production image
npm run docker:run      # Run single container

# 🚀 Production  
npm run docker:prod     # Start production environment
npm run docker:stop     # Stop all containers
npm run docker:clean    # Clean up containers and images
npm run docker:logs     # View container logs

# 🔍 Monitoring
curl http://localhost:3000/api/health  # Health check endpoint
```

### Docker Configuration Files

| File | Purpose |
|------|---------|
| `Dockerfile` | Multi-stage production build |
| `Dockerfile.dev` | Development environment |
| `docker-compose.yml` | Base configuration |
| `docker-compose.dev.yml` | Development overrides |
| `docker-compose.prod.yml` | Production with Nginx |
| `.dockerignore` | Build context optimization |
| `nginx.conf` | Production web server config |

### Health Monitoring

The application includes a health check endpoint at `/api/health` that reports:
- Application status
- Uptime information  
- Environment details
- TMDB API connectivity
- Version information

### Production Deployment

Ready for deployment on:
- ☁️ **Cloud Platforms**: AWS ECS, Google Cloud Run, Azure Container Instances
- 🔄 **CI/CD**: GitHub Actions, GitLab CI/CD, Jenkins
- 🎯 **Orchestration**: Kubernetes, Docker Swarm
- 🖥️ **VPS**: Any Docker-compatible server

For detailed Docker setup and troubleshooting, see:
- 📖 [DOCKER.md](./DOCKER.md) - Complete setup guide
- 🔧 [DOCKER-TROUBLESHOOTING.md](./DOCKER-TROUBLESHOOTING.md) - Common issues and solutions

---

## 📁 Project Structure

```
movie-tracker/
├── 🐳 Docker Configuration
│   ├── Dockerfile                  # Multi-stage production build
│   ├── Dockerfile.dev              # Development environment
│   ├── docker-compose.yml          # Base Docker Compose config
│   ├── docker-compose.dev.yml      # Development overrides
│   ├── docker-compose.prod.yml     # Production with Nginx
│   ├── .dockerignore               # Docker build context exclusions
│   └── nginx.conf                  # Nginx configuration
├── 📂 Application Structure
│   ├── components/                 # Vue components
│   │   ├── PosterCard.vue          # Movie/TV show card component
│   │   ├── Rating.vue              # Rating display component
│   │   └── SearchInput.vue         # Search input component
│   ├── composables/                # Vue composables
│   │   └── useSearch.js            # Search functionality
│   ├── layouts/                    # Nuxt layouts
│   │   └── default.vue             # Default layout with navigation
│   ├── pages/                      # Nuxt pages (auto-routing)
│   │   ├── index.vue               # Home page
│   │   ├── movies.vue              # Movies listing page
│   │   ├── tv.vue                  # TV shows listing page
│   │   ├── search.vue              # Search page
│   │   ├── favorites.vue           # Favorites page
│   │   ├── movie/[id].vue          # Movie detail page
│   │   └── tv/[id].vue             # TV show detail page
│   ├── server/                     # Server-side API
│   │   └── api/
│   │       └── health.get.ts       # Health check endpoint
│   ├── stores/                     # Pinia stores
│   │   └── favorites.js            # Favorites management store
│   ├── assets/css/main.css         # Global styles and Tailwind
│   └── plugins/                    # Nuxt plugins
├── 📚 Documentation
│   ├── README.md                   # This file
│   ├── DOCKER.md                   # Complete Docker guide
│   ├── DOCKER-TROUBLESHOOTING.md   # Docker troubleshooting
│   └── PHASE-6-COMPLETE.md         # Implementation summary
├── 🔧 Configuration
│   ├── nuxt.config.ts              # Nuxt configuration
│   ├── tailwind.config.js          # Tailwind configuration
│   ├── package.json                # Dependencies and scripts
│   └── .env.example                # Environment variables template
└── 📜 Scripts
    └── scripts/
        └── docker-verify.ps1       # Docker setup verification
```

## 🎯 API Endpoints

### TMDB API Integration
- `/movie/popular` - Popular movies
- `/movie/top_rated` - Top rated movies  
- `/movie/upcoming` - Upcoming movies
- `/movie/now_playing` - Now playing movies
- `/movie/{id}` - Movie details, credits, videos
- `/tv/popular` - Popular TV shows
- `/tv/top_rated` - Top rated TV shows
- `/tv/on_the_air` - Currently airing TV shows
- `/tv/airing_today` - TV shows airing today  
- `/tv/{id}` - TV show details, credits, videos
- `/search/multi` - Multi search (movies and TV shows)

### Internal API Endpoints  
- `/api/health` - Health check and monitoring endpoint

## Features Details

### Home Page
- Hero section with quick navigation
- Quick search functionality
- Popular movies and TV shows preview
- User favorites statistics

### Movies & TV Shows Pages
- Category tabs (Popular, Top Rated, Upcoming, etc.)
- Infinite scroll loading
- Responsive grid layout
- Filter and sort options

### Search Page
- Multi-search functionality
- Filter by type (Movies/TV Shows)
- Real-time search suggestions
- Search result management

### Detail Pages
- Full movie/TV show information
- Cast and crew details
- Videos and trailers
- Production information
- Favorite toggle functionality

### Favorites Management
- Local storage persistence
- Add/remove favorites
- Filter by type
- Clear all functionality
- Statistics display

## 🛠️ Development Commands

### Local Development
```bash
npm run dev          # Development server
npm run build        # Build for production  
npm run preview      # Preview production build
npm run generate     # Generate static site
```

### Docker Development
```bash
npm run docker:dev   # Start development environment with Docker
npm run docker:prod  # Start production environment with Docker
npm run docker:build # Build Docker image
npm run docker:run   # Run Docker container
npm run docker:stop  # Stop Docker containers
npm run docker:clean # Clean Docker system
npm run docker:logs  # View container logs
```

## 🌍 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `TMDB_API_KEY` | Your TMDB API key | ✅ Yes | - |
| `NODE_ENV` | Environment mode | ❌ No | `development` |
| `NUXT_PORT` | Server port | ❌ No | `3000` |

## 🚀 Deployment Options

### Cloud Platforms
- **AWS**: ECS, Fargate, EC2 with Docker
- **Google Cloud**: Cloud Run, GKE, Compute Engine  
- **Azure**: Container Instances, AKS, App Service
- **DigitalOcean**: App Platform, Droplets with Docker
- **Vercel**: Direct Nuxt 3 deployment (non-Docker)
- **Netlify**: Static generation support

### Container Orchestration
- **Kubernetes**: Use provided Docker images
- **Docker Swarm**: Multi-node deployment
- **Docker Compose**: Single/multi-server setup

### CI/CD Integration
- **GitHub Actions**: Automated builds and deployments
- **GitLab CI/CD**: Container registry integration
- **Jenkins**: Custom pipeline support

## 📊 Performance & Monitoring

- **Health Checks**: Built-in `/api/health` endpoint
- **Build Size**: ~2.45 MB (607 kB gzipped)
- **Runtime**: Node.js 18 Alpine (lightweight)
- **Security**: Non-root user execution
- **Caching**: Nginx-based static asset caching
- **Hot Reload**: Development environment support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Test with Docker: `npm run docker:dev`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Submit a pull request

### Development Guidelines
- Follow Vue 3 Composition API patterns
- Use TypeScript for type safety
- Test Docker builds before submitting
- Update documentation for new features
- Ensure responsive design compatibility

## 📄 License

This project is for educational purposes and uses the TMDB API. Please respect TMDB's terms of service.

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for the comprehensive movie API
- [Nuxt 3](https://nuxt.com/) for the powerful full-stack framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework  
- [Pinia](https://pinia.vuejs.org/) for intuitive state management
- [Docker](https://www.docker.com/) for containerization technology
- [Alpine Linux](https://alpinelinux.org/) for lightweight container images

---

**⭐ Star this repository if you found it helpful!**

For detailed setup instructions, troubleshooting, and deployment guides, check the documentation:
- 📖 [Docker Setup Guide](./DOCKER.md)
- 🔧 [Docker Troubleshooting](./DOCKER-TROUBLESHOOTING.md)  
- ✅ [Phase 6 Implementation](./PHASE-6-COMPLETE.md)
