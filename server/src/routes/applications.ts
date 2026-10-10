import { Router } from 'express';
import { z } from 'zod';
import { Application } from '../models/Application.js';
import { Job } from '../models/Job.js';
import { authenticate, allowRoles, type AuthRequest } from '../middleware/auth.js';
export const applicationsRouter = Router();
applicationsRouter.get('/me', authenticate, allowRoles('student'), async (req: AuthRequest, res, next) => {
  try { res.json(await Application.find({ student: req.user!.id }).populate('job').sort({ createdAt: -1 })); } catch (e) { next(e); }
});
applicationsRouter.post('/', authenticate, allowRoles('student'), async (req: AuthRequest, res, next) => {
  try {
    const { jobId } = z.object({ jobId: z.string().min(1) }).parse(req.body);
    const job = await Job.findById(jobId);
    if (!job || job.status !== 'open') return res.status(404).json({ message: 'Open job not found' });
    const application = await Application.create({ student: req.user!.id, job: jobId });
    res.status(201).json(application);
  } catch (e: any) { if (e.code === 11000) return res.status(409).json({ message: 'Already applied to this job' }); next(e); }
});
applicationsRouter.patch('/:id/status', authenticate, allowRoles('recruiter','admin'), async (req, res, next) => {
  try {
    const { status } = z.object({ status: z.enum(['applied','shortlisted','rejected','offered']) }).parse(req.body);
    const application = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
    if (!application) return res.status(404).json({ message: 'Application not found' });
    res.json(application);
  } catch (e) { next(e); }
});
