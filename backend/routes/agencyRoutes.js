const express = require('express');
const router = express.Router();
const agencyController = require('../controllers/agencyController');

// Get all approved solar providers
router.get('/providers', agencyController.getProviders);

// Contact provider
router.post('/contact/:providerId', agencyController.contactProvider);

module.exports = router;
