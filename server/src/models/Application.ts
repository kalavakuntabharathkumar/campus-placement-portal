import mongoose, { Schema } from 'mongoose';
const applicationSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  job: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
  status: { type: String, enum: ['applied', 'shortlisted', 'rejected', 'offered'], default: 'applied' }
}, { timestamps: true });
applicationSchema.index({ student: 1, job: 1 }, { unique: true });
export const Application = mongoose.model('Application', applicationSchema);
