const express = require('express');

const {
  submitComplaint,
  getMyComplaints,
  trackByTrackingId,
  updateStatus,
  getAllComplaints,
  assignComplaint
} = require('../controllers/complaintController');

const { auth, adminAuth, officerAuth } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/submit', auth, upload.single('image'), submitComplaint);

router.get('/my', auth, getMyComplaints);

router.get('/track/:trackingId', trackByTrackingId);

router.get('/all', auth, adminAuth, getAllComplaints);
router.put('/assign/:id', auth, adminAuth, assignComplaint);

router.put('/status/:complaintId', auth, officerAuth, updateStatus);

module.exports = router;