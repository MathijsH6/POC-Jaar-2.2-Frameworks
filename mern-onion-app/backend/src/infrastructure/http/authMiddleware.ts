import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../../config';

declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
    }
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const token = auth.slice(7);
  try {
    const payload = jwt.verify(token, config.jwtSecret) as any;
    req.user = { id: payload.id || payload.userId || payload.sub };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });  
  }
}