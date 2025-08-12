# Docker Troubleshooting Guide

## Common RollupError: Vue app aliases not allowed in server runtime

This error occurs when there's a mismatch between client-side and server-side code in Nuxt 4 with Nitro 2.12+.

### Fixed Issues:
✅ **nuxt.config.ts** - Added `compatibilityDate: '2025-08-11'` and `preset: 'node-server'`
✅ **health.get.ts** - Removed client-side imports, using pure Node.js server code
✅ **Health checks** - Updated to use proper Node.js fetch API

### If Error Persists:

1. **Clean Build Artifacts**
   ```bash
   # Local cleanup
   npm run clean
   npm install
   npm run dev

   # Docker cleanup
   npm run clean:docker
   npm run docker:dev
   ```

2. **Check Plugin Imports**
   Ensure no client-side code in server context:
   ```typescript
   // BAD - Don't use in plugins or server
   import { useRouter } from 'vue-router'
   
   // GOOD - Wrap in client check or use .client.ts suffix
   if (process.client) {
     const router = useRouter()
   }
   ```

3. **Verify Environment Variables**
   ```bash
   # Check .env file exists
   cat .env
   
   # Verify container environment
   docker exec -it <container> env | grep TMDB
   ```

4. **Update Dependencies**
   ```bash
   npm install nuxt@latest
   npm install @nuxtjs/tailwindcss@latest
   npm install @pinia/nuxt@latest
   ```

### Development vs Production Builds

**Development (docker-compose.dev.yml):**
- Uses `npm run dev`
- Hot reload enabled
- Volume mounting for code changes

**Production (docker-compose.prod.yml):**
- Uses built `node .output/server/index.mjs`
- Optimized build
- No volume mounting

### Health Check Verification

Test the health endpoint:
```bash
# Local test
curl http://localhost:3000/api/health

# Container test
docker exec -it movie-tracker-app curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2025-08-11T...",
  "uptime": 123.456,
  "environment": "production",
  "version": "1.0.0",
  "tmdb_connection": "connected"
}
```

### Debug Commands

```bash
# View container logs
docker-compose logs -f movie-tracker

# Shell into container
docker exec -it movie-tracker-app sh

# Check Nuxt build output
docker exec -it movie-tracker-app ls -la .output/

# Check environment
docker exec -it movie-tracker-app env
```
