const JsonData = require('../models/JsonData');
const asyncHandler = require('express-async-handler');

// @desc    Get all JSON data for authenticated user
// @route   GET /api/jsondata
// @access  Private
const getJsonData = asyncHandler(async (req, res) => {
  const jsonData = await JsonData.find({ user: req.user.id });
  res.json(jsonData);
});

// @desc    Create new JSON data
// @route   POST /api/jsondata
// @access  Private
const createJsonData = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400);
    throw new Error('Please provide both title and content');
  }

  // Validate JSON content
  try {
    JSON.parse(content);
  } catch (error) {
    res.status(400);
    throw new Error('Invalid JSON content');
  }

  const jsonData = await JsonData.create({
    title,
    content,
    user: req.user.id
  });

  res.status(201).json(jsonData);
});

// @desc    Get single JSON data by ID
// @route   GET /api/jsondata/:id
// @access  Private
const getJsonDataById = asyncHandler(async (req, res) => {
  const jsonData = await JsonData.findOne({
    _id: req.params.id,
    user: req.user.id
  });

  if (!jsonData) {
    res.status(404);
    throw new Error('JSON data not found');
  }

  res.json(jsonData);
});

// @desc    Update JSON data
// @route   PUT /api/jsondata/:id
// @access  Private
const updateJsonData = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400);
    throw new Error('Please provide both title and content');
  }

  // Validate JSON content
  try {
    JSON.parse(content);
  } catch (error) {
    res.status(400);
    throw new Error('Invalid JSON content');
  }

  const jsonData = await JsonData.findOne({
    _id: req.params.id,
    user: req.user.id
  });

  if (!jsonData) {
    res.status(404);
    throw new Error('JSON data not found');
  }

  jsonData.title = title;
  jsonData.content = content;
  await jsonData.save();

  res.json(jsonData);
});

// @desc    Delete JSON data
// @route   DELETE /api/jsondata/:id
// @access  Private
const deleteJsonData = asyncHandler(async (req, res) => {
  const jsonData = await JsonData.findOne({
    _id: req.params.id,
    user: req.user.id
  });

  if (!jsonData) {
    res.status(404);
    throw new Error('JSON data not found');
  }

  await jsonData.remove();
  res.json({ message: 'JSON data deleted successfully' });
});

module.exports = {
  getJsonData,
  createJsonData,
  getJsonDataById,
  updateJsonData,
  deleteJsonData
};