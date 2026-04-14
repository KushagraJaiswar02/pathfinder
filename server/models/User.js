const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['student', 'mentor'], default: 'student' },
  bio: { type: String, default: '' },
  skills: [String],
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  helpfulVotes: { type: Number, default: 0 },
  mentorBadge: { type: String, enum: ['none', 'bronze', 'silver', 'gold'], default: 'none' },
  applicationStatus: { type: String, enum: ['none', 'pending', 'approved'], default: 'none' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
