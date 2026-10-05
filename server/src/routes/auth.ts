import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { User } from '../models/User.js';
export const authRouter = Router();
const credentials = z.object({ name: z.string().min(2).optional(), email: z.string().email(), password: z.string().min(8), role: z.enum(['student','recruiter']).optional(), department: z.string().optional(), graduationYear: z.number().int().optional() });
const secret = () => process.env.JWT_SECRET ?? 'dev-only-change-me';
authRouter.post('/register', async (req, res, next) => {
  try {
    const data = credentials.parse(req.body);
    const existing = await User.findOne({ email: data.email.toLowerCase() });
    if (existing) return res.status(409).json({ message: 'Email already registered' });
    const user = await User.create({ name: data.name ?? data.email.split('@')[0], email: data.email, passwordHash: await bcrypt.hash(data.password, 12), role: data.role ?? 'student', department: data.department, graduationYear: data.graduationYear });
    res.status(201).json({ id: user.id, name: user.name, email: user.email, role: user.role });
  } catch (e) { next(e); }
});
authRouter.post('/login', async (req, res, next) => {
  try {
    const data = z.object({ email: z.string().email(), password: z.string() }).parse(req.body);
    const user = await User.findOne({ email: data.email.toLowerCase() });
    if (!user || !(await bcrypt.compare(data.password, user.passwordHash))) return res.status(401).json({ message: 'Invalid email or password' });
    const token = jwt.sign({ id: user.id }, secret(), { expiresIn: '8h' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (e) { next(e); }
});
