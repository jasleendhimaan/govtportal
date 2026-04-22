const Complaint = require('../models/Complaint');
const { v4: uuidv4 } = require('uuid');

// ✅ SUBMIT COMPLAINT
const submitComplaint = async (req, res) => {
  try {
    const { title, description, category, location } = req.body;

    // 🔥 CHECK USER
    if (!req.userId) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    // 🔥 VALIDATION
    if (!title || !description || !category || !location) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const citizen = req.userId;

    let imagePath = '';
    if (req.file) {
      imagePath = req.file.path.replace(/\\/g, '/');
    }

    const trackingId = `COMP-${uuidv4().substring(0, 8).toUpperCase()}`;

    const newComplaint = new Complaint({
      trackingId,
      citizen,
      title,
      description,
      category,
      location,
      imagePath,
    });

    await newComplaint.save();

    res.status(201).json({
      message: 'Complaint submitted successfully',
      trackingId,
      complaint: newComplaint
    });

  } catch (error) {
    console.error("❌ SUBMIT ERROR:", error); // 🔥 DEBUG
    res.status(500).json({ message: 'Submission failed', error: error.message });
  }
};


// ✅ GET MY COMPLAINTS
const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ citizen: req.userId })
      .sort({ createdAt: -1 });

    res.json(complaints);

  } catch (error) {
    console.error("❌ GET MY ERROR:", error);
    res.status(500).json({ message: 'Error fetching complaints', error: error.message });
  }
};


// ✅ TRACK BY ID
const trackByTrackingId = async (req, res) => {
  try {
    const { trackingId } = req.params;

    const complaint = await Complaint.findOne({ trackingId })
      .populate('citizen', 'name email')
      .populate('assignedTo', 'name email');

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.json(complaint);

  } catch (error) {
    console.error("❌ TRACK ERROR:", error);
    res.status(500).json({ message: 'Error tracking complaint', error: error.message });
  }
};


// ✅ UPDATE STATUS (OFFICER)
const updateStatus = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { status, remarks } = req.body;

    const complaint = await Complaint.findById(complaintId);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    complaint.status = status || complaint.status;

    if (remarks) {
      complaint.remarks.push({
        text: remarks,
        by: req.userId
      });
    }

    complaint.updatedAt = Date.now();

    await complaint.save();

    res.json({ message: 'Status updated', complaint });

  } catch (error) {
    console.error("❌ STATUS ERROR:", error);
    res.status(500).json({ message: 'Status update failed', error: error.message });
  }
};


// ✅ GET ALL (ADMIN)
const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate('citizen', 'name email')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });

    res.json(complaints);

  } catch (error) {
    console.error("❌ GET ALL ERROR:", error);
    res.status(500).json({ message: 'Error fetching complaints', error: error.message });
  }
};


// ✅ ASSIGN COMPLAINT
const assignComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const { officerId } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      id,
      {
        assignedTo: officerId,
        status: 'In Progress'
      },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.json({ message: 'Complaint assigned successfully', complaint });

  } catch (error) {
    console.error("❌ ASSIGN ERROR:", error);
    res.status(500).json({ message: 'Assignment failed', error: error.message });
  }
};


module.exports = {
  submitComplaint,
  getMyComplaints,
  trackByTrackingId,
  updateStatus,
  getAllComplaints,
  assignComplaint
};