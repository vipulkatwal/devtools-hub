const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createJsonData,
  getAllJsonData,
  getJsonDataById,
  updateJsonData,
  deleteJsonData
} = require('../controllers/jsonDataController');

// All routes are protected and require authentication
router.use(protect);

// JSON data routes
router.route('/')
  .get(getAllJsonData)
  .post(createJsonData);

router.route('/:id')
  .get(getJsonDataById)
  .put(updateJsonData)
  .delete(deleteJsonData);

module.exports = router;