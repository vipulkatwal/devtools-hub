const express = require('express');
const router = express.Router();
const snippetsController = require('../controllers/snippetsController');
const auth = require('../middleware/auth');

// All routes are protected
router.get('/', auth, snippetsController.getUserSnippets);
router.get('/search', auth, snippetsController.searchSnippets);
router.get('/:id', auth, snippetsController.getSnippetById);
router.post('/', auth, snippetsController.createSnippet);
router.put('/:id', auth, snippetsController.updateSnippet);
router.delete('/:id', auth, snippetsController.deleteSnippet);

module.exports = router;