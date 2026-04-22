const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['citizen', 'admin', 'officer'], default: 'citizen' },
  department: { type: String }, // For officers
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
