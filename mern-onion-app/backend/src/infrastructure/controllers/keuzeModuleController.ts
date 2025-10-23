import { Request, Response } from 'express';
import { keuzeModuleService } from '../../application/services/keuzeModuleService';

export const keuzeModuleController = {
  async list(_req: Request, res: Response) {
    try {
      const list = await keuzeModuleService.list();
      res.json(list);
    } catch (err) {
      res.status(500).json({ message: 'Failed to list modules' });
    }
  },

  async get(req: Request, res: Response) {
    try {
      const mod = await keuzeModuleService.getById(req.params.id);
      if (!mod) return res.status(404).json({ message: 'Not found' });
      res.json(mod);
    } catch (err) {
      res.status(500).json({ message: 'Failed to get module' });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const doc = await keuzeModuleService.create(req.body);
      res.status(201).json(doc);
    } catch (err) {
      res.status(400).json({ message: 'Invalid data' });
    }
  },

  // toggle favorite — expects authentication middleware to set req.user.id; fallback to header/body
  async toggleFavorite(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id || req.headers['x-user-id'] || req.body.userId;
      if (!userId) return res.status(401).json({ message: 'User not authenticated' });

      const favs = await keuzeModuleService.toggleFavorite(String(userId), String(req.params.id));
      res.json({ favorites: favs });
    } catch (err: any) {
      res.status(400).json({ message: err.message || 'Failed toggling favorite' });
    }
  },

  async favoritesForUser(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id || req.headers['x-user-id'] || req.params.userId || req.query.userId;
      if (!userId) return res.status(401).json({ message: 'User not authenticated' });

      const favs = await keuzeModuleService.getFavoritesForUser(String(userId));
      res.json(favs);
    } catch (err) {
      res.status(500).json({ message: 'Failed to get favorites' });
    }
  },
};