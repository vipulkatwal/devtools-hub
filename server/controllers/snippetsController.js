const Snippet = require('../models/Snippet');

// Get all snippets for a user
exports.getUserSnippets = async (req, res) => {
  try {
    const snippets = await Snippet.find({ user: req.user._id })
      .sort({ updatedAt: -1 });

    res.json(snippets);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a single snippet by ID
exports.getSnippetById = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }

    // Check if user has access to this snippet
    if (snippet.user.toString() !== req.user._id.toString() && !snippet.isPublic) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(snippet);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create new snippet
exports.createSnippet = async (req, res) => {
  try {
    const { title, description, code, language, tags, isPublic } = req.body;

    const snippet = new Snippet({
      user: req.user._id,
      title,
      description,
      code,
      language,
      tags: tags || [],
      isPublic: isPublic || false
    });

    await snippet.save();

    res.status(201).json(snippet);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update snippet
exports.updateSnippet = async (req, res) => {
  try {
    const { title, description, code, language, tags, isPublic } = req.body;

    // Find snippet
    let snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }

    // Check if user owns this snippet
    if (snippet.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Update fields
    if (title) snippet.title = title;
    if (description !== undefined) snippet.description = description;
    if (code) snippet.code = code;
    if (language) snippet.language = language;
    if (tags) snippet.tags = tags;
    if (isPublic !== undefined) snippet.isPublic = isPublic;

    await snippet.save();

    res.json(snippet);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete snippet
exports.deleteSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }

    // Check if user owns this snippet
    if (snippet.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await snippet.deleteOne();

    res.json({ message: 'Snippet deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Search snippets
exports.searchSnippets = async (req, res) => {
  try {
    const { query, language, tags } = req.query;

    // Build search query
    const searchQuery = { user: req.user._id };

    if (query) {
      searchQuery.$or = [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { code: { $regex: query, $options: 'i' } }
      ];
    }

    if (language) {
      searchQuery.language = language;
    }

    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      searchQuery.tags = { $in: tagArray };
    }

    const snippets = await Snippet.find(searchQuery).sort({ updatedAt: -1 });

    res.json(snippets);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};