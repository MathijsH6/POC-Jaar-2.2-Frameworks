import express from 'express';
import path from 'path';
import fs from 'fs';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';

const app = express();

// Basic middleware
app.disable('x-powered-by');
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || '*', 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With']
}));

// Detect frontend build folder (tries several common locations including Azure wwwroot)
const candidates = [
  process.env.FRONTEND_DIST,                                  // explicit override
  path.join(process.cwd(), 'frontendd', 'dist'),              // typical local/vite output in your repo
  path.join(process.cwd(), 'frontend', 'dist'),               // alternative common name
  path.join(process.env.HOME || '', 'site', 'wwwroot'),       // Azure App Service wwwroot
  path.join(process.cwd(), 'wwwroot'),                        // sometimes used in deployments
  process.cwd(),                                              // last resort: current working dir
].filter(Boolean) as string[];

let frontendDist: string | undefined;
for (const c of candidates) {
  if (c && fs.existsSync(c) && fs.statSync(c).isDirectory()) {
    // ensure index.html exists
    const indexPath = path.join(c, 'index.html');
    if (fs.existsSync(indexPath)) {
      frontendDist = c;
      break;
    }
  }
}

if (frontendDist) {
  console.info('[express] serving static frontend from', frontendDist);
  // Serve static assets
  app.use(express.static(frontendDist, { index: false, extensions: ['html', 'js', 'css'] }));

  // Ensure client-side routing works: return index.html for non-API GET requests
  app.get('*', (req, res, next) => {
    if (req.method !== 'GET') return next();
    if (req.path.startsWith('/api')) return next();
    const indexFile = path.join(frontendDist!, 'index.html');
    if (fs.existsSync(indexFile)) {
      res.sendFile(indexFile);
    } else {
      next();
    }
  });
} else {
  console.warn('[express] frontend build not found in any candidate paths:', candidates);
  console.warn('[express] skip static serving - ensure FRONTEND_DIST or deployment layout is correct');
}

// central error handler (consistent JSON responses)
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[ERROR]', err?.stack || err);
  const status = err?.statusCode || err?.status || 500;
  const payload = {
    message: err?.message || 'Internal server error',
    details: process.env.NODE_ENV === 'production' ? undefined : (err?.details || err?.errors || undefined),
  };
  res.status(status).json(payload);
});

export default app;