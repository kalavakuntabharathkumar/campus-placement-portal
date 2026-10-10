import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from './models/User.js';
import { Job } from './models/Job.js';
import { Application } from './models/Application.js';
async function seed() {
  await mongoose.connect(process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/campus_placement');
  await Promise.all([User.deleteMany({}), Job.deleteMany({}), Application.deleteMany({})]);
  const passwordHash = await bcrypt.hash('PlacementDemo123!', 12);
  const [student, recruiter] = await User.create([
    { name: 'Aarav Student', email: 'student@campus.demo', passwordHash, role: 'student', department: 'Computer Science', graduationYear: 2026 },
    { name: 'Recruiter Demo', email: 'recruiter@company.demo', passwordHash, role: 'recruiter' }
  ]);
  const jobs = await Job.create([
    { title: 'Junior Software Engineer', company: 'Northstar Labs', description: 'Build and test web applications with a collaborative engineering team.', location: 'Bengaluru', createdBy: recruiter._id },
    { title: 'Data Analyst Intern', company: 'BluePeak Analytics', description: 'Use SQL and Python to explore data and communicate useful insights.', location: 'Hyderabad', createdBy: recruiter._id }
  ]);
  await Application.create({ student: student._id, job: jobs[0]._id, status: 'shortlisted' });
  console.log('Seed complete. Demo login for both accounts: PlacementDemo123!');
  console.log('Student: student@campus.demo | Recruiter: recruiter@company.demo');
  await mongoose.disconnect();
}
seed().catch((e) => { console.error(e); process.exit(1); });
