const express = require("express");
const router = express.Router();
const jsonController = require("../controllers/jsonController");
const { protect } = require("../middleware/auth");

// Public routes
router.post("/format", jsonController.formatJson);
router.post("/to-yaml", jsonController.jsonToYaml);
router.post("/to-typescript", jsonController.jsonToTypeScript);

// Protected routes
router.get("/", protect, jsonController.getUserJsonData);
router.get("/:id", protect, jsonController.getJsonDataById);
router.post("/", protect, jsonController.createJsonData);
router.put("/:id", protect, jsonController.updateJsonData);
router.delete("/:id", protect, jsonController.deleteJsonData);

module.exports = router;
