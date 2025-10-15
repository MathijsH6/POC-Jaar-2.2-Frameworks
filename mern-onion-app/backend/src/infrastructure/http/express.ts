import express from 'express';
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