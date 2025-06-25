import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gradYear: { type: Number },
  company: { type: String },
  location: { type: String },
  skills: [String],
  certifications: [String],
  role: { type: String, enum: ['student', 'alumni', 'admin'], default: 'student' },
  mentorshipAvailable: { type: Boolean, default: false },
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

export default mongoose.model('User', UserSchema); 