import mongoose, { Schema } from 'mongoose';
export type UserRole = 'student' | 'recruiter' | 'admin';
const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['student', 'recruiter', 'admin'], default: 'student' },
  department: { type: String, default: '' },
  graduationYear: { type: Number }
}, { timestamps: true });
export const User = mongoose.model('User', userSchema);
