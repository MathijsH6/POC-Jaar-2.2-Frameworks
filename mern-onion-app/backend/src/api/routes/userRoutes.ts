import { Router } from 'express';

const router = Router();

// Minimal routes: health check only. No controller/service wiring.
router.get('/health', (_req, res) => res.json({ status: 'ok' }));

export default router;