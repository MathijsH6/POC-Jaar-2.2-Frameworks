import { Router } from 'express';
import { keuzeModuleController } from '../../infrastructure/controllers/keuzeModuleController';
import { authMiddleware } from '../../infrastructure/http/authMiddleware';

const router = Router();

// base: /api/keuzemodules
router.get('/', (_req, res) => keuzeModuleController.list(_req, res));
router.get('/:id', (req, res) => keuzeModuleController.get(req, res));
router.post('/', (req, res) => keuzeModuleController.create(req, res));

router.post('/:id/favorite', authMiddleware, (req, res) => keuzeModuleController.toggleFavorite(req, res));
router.get('/favorites/me', authMiddleware, (req, res) => {

  return keuzeModuleController.favoritesForUser(req, res);
});

export default router;