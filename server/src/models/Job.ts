import mongoose, { Schema } from 'mongoose';
const jobSchema = new Schema({
  title: { type: String, required: true, trim: true },
  company: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  eligibility: { type: String, default: 'Open to eligible students' },
  location: { type: String, default: 'Not specified' },
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });
export const Job = mongoose.model('Job', jobSchema);
