# Multi-stage Dockerfile for Nuxt 3 Movie Tracker
# Stage 1: Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache libc6-compat

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production --ignore-scripts

# Copy source code
COPY . .

# Build arguments for environment variables
ARG TMDB_API_KEY
ARG NUXT_PUBLIC_TMDB_API_KEY
ARG NUXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
ARG NUXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p

# Set environment variables for build
ENV TMDB_API_KEY=${TMDB_API_KEY}
ENV NUXT_PUBLIC_TMDB_API_KEY=${NUXT_PUBLIC_TMDB_API_KEY}
ENV NUXT_PUBLIC_TMDB_BASE_URL=${NUXT_PUBLIC_TMDB_BASE_URL}
ENV NUXT_PUBLIC_TMDB_IMAGE_BASE_URL=${NUXT_PUBLIC_TMDB_IMAGE_BASE_URL}

# Build the application
RUN npm run build

# Stage 2: Production runtime
FROM node:18-alpine AS runtime

# Set working directory
WORKDIR /app

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nuxtjs

# Copy built application from builder stage
COPY --from=builder --chown=nuxtjs:nodejs /app/.output /app/.output

# Switch to non-root user
USER nuxtjs

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "fetch('http://localhost:3000/api/health').then(r=>r.ok?process.exit(0):process.exit(1)).catch(()=>process.exit(1))" || exit 1

# Start the application
CMD ["node", "/app/.output/server/index.mjs"]
