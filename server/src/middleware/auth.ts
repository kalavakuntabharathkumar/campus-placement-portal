import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
const secret = () => process.env.JWT_SECRET ?? 'dev-only-change-me';
export interface AuthRequest extends Request { user?: { id: string; role: string; name: string; email: string } }
export async function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
    if (!token) return res.status(401).json({ message: 'Bearer token required' });
    const payload = jwt.verify(token, secret()) as { id: string };
    const user = await User.findById(payload.id).select('_id role name email');
    if (!user) return res.status(401).json({ message: 'Account not found' });
    req.user = { id: String(user._id), role: user.role, name: user.name, email: user.email };
    next();
  } catch { res.status(401).json({ message: 'Invalid or expired token' }); }
}
export function allowRoles(...roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) return res.status(403).json({ message: 'Insufficient role' });
    next();
  };
}
