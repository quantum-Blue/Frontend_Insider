import { defineEventHandler } from 'h3'

// Health check API endpoint
export default defineEventHandler(async (event) => {
  try {
    // Basic health check
    const status: any = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0'
    }

    // Check TMDB API connectivity (optional)
    const tmdbApiKey = process.env.TMDB_API_KEY || process.env.NUXT_PUBLIC_TMDB_API_KEY
    if (tmdbApiKey && tmdbApiKey !== 'YOUR_TMDB_API_KEY_HERE') {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/configuration?api_key=${tmdbApiKey}`, {
          signal: AbortSignal.timeout(5000)
        })
        if (response.ok) {
          status.tmdb_connection = 'connected'
        } else {
          status.tmdb_connection = 'error'
          status.tmdb_status = response.status
        }
      } catch (error: any) {
        status.tmdb_connection = 'disconnected'
        status.tmdb_error = error.message
      }
    } else {
      status.tmdb_connection = 'no_api_key'
    }

    return status
  } catch (error: any) {
    event.node.res.statusCode = 500
    return {
      status: 'error',
      error: error.message,
      timestamp: new Date().toISOString()
    }
  }
})

