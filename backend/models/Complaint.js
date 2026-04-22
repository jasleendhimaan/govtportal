const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  trackingId: { type: String, required: true, unique: true },
  citizen: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Water', 'Electricity', 'Roads', 'Sanitation', 'Healthcare', 'Police', 'Public Transport', 'Other'], 
    required: true 
  },
  location: { type: String, required: true },
  imagePath: { type: String }, // Path to uploaded file
  status: { 
    type: String, 
    enum: ['Pending', 'In Progress', 'Resolved', 'Rejected'], 
    default: 'Pending' 
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Officer
  remarks: [{ 
    text: String, 
    by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    at: { type: Date, default: Date.now } 
  }],
  feedback: {
    rating: { type: Number, min: 1, max: 5 },
    comment: String
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
