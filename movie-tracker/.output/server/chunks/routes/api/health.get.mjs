import { c as defineEventHandler } from '../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const health_get = defineEventHandler(async (event) => {
  try {
    const status = {
      status: "healthy",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      uptime: process.uptime(),
      environment: "production",
      version: "1.0.0"
    };
    const tmdbApiKey = process.env.TMDB_API_KEY || process.env.NUXT_PUBLIC_TMDB_API_KEY;
    if (tmdbApiKey && tmdbApiKey !== "YOUR_TMDB_API_KEY_HERE") {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/configuration?api_key=${tmdbApiKey}`, {
          signal: AbortSignal.timeout(5e3)
        });
        if (response.ok) {
          status.tmdb_connection = "connected";
        } else {
          status.tmdb_connection = "error";
          status.tmdb_status = response.status;
        }
      } catch (error) {
        status.tmdb_connection = "disconnected";
        status.tmdb_error = error.message;
      }
    } else {
      status.tmdb_connection = "no_api_key";
    }
    return status;
  } catch (error) {
    event.node.res.statusCode = 500;
    return {
      status: "error",
      error: error.message,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
});

export { health_get as default };
//# sourceMappingURL=health.get.mjs.map
