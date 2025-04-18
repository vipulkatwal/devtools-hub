const express = require("express");
const router = express.Router();
const snippetsController = require("../controllers/snippetsController");
const { protect } = require("../middleware/auth");

// All routes are protected
router.get("/", protect, snippetsController.getUserSnippets);
router.get("/search", protect, snippetsController.searchSnippets);
router.get("/:id", protect, snippetsController.getSnippetById);
router.post("/", protect, snippetsController.createSnippet);
router.put("/:id", protect, snippetsController.updateSnippet);
router.delete("/:id", protect, snippetsController.deleteSnippet);

module.exports = router;
