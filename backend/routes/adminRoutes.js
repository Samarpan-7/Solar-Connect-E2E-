const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// All admin routes require authentication and admin privileges
router.use(authMiddleware, adminMiddleware);

// Get pending approvals
router.get('/pending-users', adminController.getPendingUsers);

// Approve/reject user
router.post('/approve-user/:userId', adminController.approveUser);
router.post('/reject-user/:userId', adminController.rejectUser);

// Get all users
router.get('/users', adminController.getAllUsers);

// Get survey statistics
router.get('/survey-stats', adminController.getSurveyStats);

module.exports = router;
