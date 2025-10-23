import { Request, Response } from 'express';
import { userService } from '../../application/services/userService';

export const userController = {
  async register(req: Request, res: Response) {
    try {
      const user = await userService.register(req.body);
      return res.status(201).json(user);
    } catch (err) {
      return res.status(400).json({ message: (err as Error).message });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const result = await userService.login(req.body); // result = { user, token }
      return res.json(result);
    } catch (err) {
      return res.status(401).json({ message: (err as Error).message });
    }
  },

  async list(_req: Request, res: Response) {
    try {
      const users = await userService.getAll();
      return res.json(users);
    } catch (err) {
      return res.status(500).json({ message: (err as Error).message });
    }
  },

  async get(req: Request, res: Response) {
    try {
      const user = await userService.getById(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      return res.json(user);
    } catch (err) {
      return res.status(500).json({ message: (err as Error).message });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const updated = await userService.update(req.params.id, req.body);
      if (!updated) return res.status(404).json({ message: 'User not found' });
      return res.json(updated);
    } catch (err) {
      return res.status(400).json({ message: (err as Error).message });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const deleted = await userService.delete(req.params.id);
      if (!deleted) return res.status(404).json({ message: 'User not found' });
      return res.json({ message: 'Deleted' });
    } catch (err) {
      return res.status(500).json({ message: (err as Error).message });
    }
  },
};
