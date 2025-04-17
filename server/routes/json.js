const express = require('express');
const router = express.Router();
const jsonController = require('../controllers/jsonController');
const auth = require('../middleware/auth');

// Public routes
router.post('/format', jsonController.formatJson);
router.post('/to-yaml', jsonController.jsonToYaml);
router.post('/to-typescript', jsonController.jsonToTypeScript);

// Protected routes
router.get('/', auth, jsonController.getUserJsonData);
router.get('/:id', auth, jsonController.getJsonDataById);
router.post('/', auth, jsonController.createJsonData);
router.put('/:id', auth, jsonController.updateJsonData);
router.delete('/:id', auth, jsonController.deleteJsonData);

module.exports = router;