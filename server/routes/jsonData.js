const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getJsonData,
  createJsonData,
  getJsonDataById,
  updateJsonData,
  deleteJsonData
} = require('../controllers/jsonDataController');

// All routes require authentication
router.use(protect);

// Get all JSON data for the authenticated user
router.get('/', getJsonData);

// Create new JSON data
router.post('/', createJsonData);

// Get single JSON data by ID
router.get('/:id', getJsonDataById);

// Update JSON data
router.put('/:id', updateJsonData);

// Delete JSON data
router.delete('/:id', deleteJsonData);

module.exports = router;
