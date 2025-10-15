import { Router } from 'express';
import { userController } from '../../infrastructure/controllers/userController';

const router = Router();

// health
router.get('/health', (_req, res) => res.json({ status: 'ok' }));

// auth
router.post('/register', (req, res) => userController.register(req, res));
router.post('/login', (req, res) => userController.login(req, res));

// user management
router.get('/users', (req, res) => userController.list(req, res));
router.get('/users/:id', (req, res) => userController.get(req, res));
router.put('/users/:id', (req, res) => userController.update(req, res));
router.delete('/users/:id', (req, res) => userController.delete(req, res));

export default router;
