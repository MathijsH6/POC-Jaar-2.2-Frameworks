import express from 'express';
import path from 'path';
import fs from 'fs';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5174', // je frontend origin
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With']
}));
app.options('*', cors()); // respond to preflight
app.use(json());
app.use(urlencoded({ extended: true }));

// Serve frontend build (if present) so backend + frontend kunnen samen op één host draaien.
// Looks for: <repo-root>/frontendd/dist by default, or use env FRONTEND_DIST to override.
const frontendDist = process.env.FRONTEND_DIST || path.join(process.cwd(), 'frontendd', 'dist');
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  // return index.html for all non-API routes (client-side routing)
  app.get('*', (req, res, next) => {
    // only serve index.html for non-API requests
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
} else {
  console.warn('[express] frontend build not found at', frontendDist, '- skipping static serving');
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