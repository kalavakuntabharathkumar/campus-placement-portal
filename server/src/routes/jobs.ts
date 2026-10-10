import { Router } from 'express';
import { z } from 'zod';
import { Job } from '../models/Job.js';
import { authenticate, allowRoles, type AuthRequest } from '../middleware/auth.js';
export const jobsRouter = Router();
jobsRouter.get('/', async (_req, res, next) => {
  try { res.json(await Job.find({ status: 'open' }).populate('createdBy', 'name').sort({ createdAt: -1 })); } catch (e) { next(e); }
});
jobsRouter.post('/', authenticate, allowRoles('recruiter','admin'), async (req: AuthRequest, res, next) => {
  try {
    const body = z.object({ title: z.string().min(2), company: z.string().min(2), description: z.string().min(10), eligibility: z.string().optional(), location: z.string().optional() }).parse(req.body);
    res.status(201).json(await Job.create({ ...body, createdBy: req.user!.id }));
  } catch (e) { next(e); }
});
