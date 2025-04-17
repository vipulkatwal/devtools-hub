const JsonData = require('../models/JsonData');

// Format JSON with options
const formatJson = (jsonString, options = {}) => {
  try {
    const { indentSize = 2, sortKeys = false, minified = false } = options;

    // Parse JSON
    let parsedJson = JSON.parse(jsonString);

    // Sort keys if requested
    if (sortKeys) {
      parsedJson = sortObjectKeys(parsedJson);
    }

    // Format or minify
    return minified
      ? JSON.stringify(parsedJson)
      : JSON.stringify(parsedJson, null, indentSize);
  } catch (error) {
    throw new Error(`Invalid JSON: ${error.message}`);
  }
};

// Helper function to sort object keys recursively
const sortObjectKeys = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj.map(sortObjectKeys);
  }

  return Object.keys(obj)
    .sort()
    .reduce((result, key) => {
      result[key] = sortObjectKeys(obj[key]);
      return result;
    }, {});
};

// Get all JSON data for a user
exports.getUserJsonData = async (req, res) => {
  try {
    const jsonData = await JsonData.find({ user: req.user._id })
      .sort({ updatedAt: -1 });

    res.json(jsonData);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a single JSON data by ID
exports.getJsonDataById = async (req, res) => {
  try {
    const jsonData = await JsonData.findById(req.params.id);

    if (!jsonData) {
      return res.status(404).json({ message: 'JSON data not found' });
    }

    // Check if user has access to this data
    if (jsonData.user.toString() !== req.user._id.toString() && !jsonData.isPublic) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(jsonData);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create new JSON data
exports.createJsonData = async (req, res) => {
  try {
    const { name, content, isPublic, tags } = req.body;

    // Validate JSON
    try {
      JSON.parse(content);
    } catch (error) {
      return res.status(400).json({ message: `Invalid JSON: ${error.message}` });
    }

    const jsonData = new JsonData({
      user: req.user._id,
      name,
      content,
      isPublic: isPublic || false,
      tags: tags || []
    });

    await jsonData.save();

    res.status(201).json(jsonData);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update JSON data
exports.updateJsonData = async (req, res) => {
  try {
    const { name, content, isPublic, tags } = req.body;

    // Find JSON data
    let jsonData = await JsonData.findById(req.params.id);

    if (!jsonData) {
      return res.status(404).json({ message: 'JSON data not found' });
    }

    // Check if user owns this data
    if (jsonData.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Validate JSON if content is provided
    if (content) {
      try {
        JSON.parse(content);
      } catch (error) {
        return res.status(400).json({ message: `Invalid JSON: ${error.message}` });
      }
    }

    // Update fields
    if (name) jsonData.name = name;
    if (content) jsonData.content = content;
    if (isPublic !== undefined) jsonData.isPublic = isPublic;
    if (tags) jsonData.tags = tags;

    await jsonData.save();

    res.json(jsonData);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete JSON data
exports.deleteJsonData = async (req, res) => {
  try {
    const jsonData = await JsonData.findById(req.params.id);

    if (!jsonData) {
      return res.status(404).json({ message: 'JSON data not found' });
    }

    // Check if user owns this data
    if (jsonData.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await jsonData.deleteOne();

    res.json({ message: 'JSON data deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Format JSON
exports.formatJson = async (req, res) => {
  try {
    const { json, options } = req.body;

    if (!json) {
      return res.status(400).json({ message: 'JSON is required' });
    }

    const formattedJson = formatJson(json, options);

    res.json({ formattedJson });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Convert JSON to YAML
exports.jsonToYaml = async (req, res) => {
  try {
    const { json } = req.body;

    if (!json) {
      return res.status(400).json({ message: 'JSON is required' });
    }

    // Parse JSON
    const parsedJson = JSON.parse(json);

    // Convert to YAML (simple implementation)
    const yaml = convertToYaml(parsedJson);

    res.json({ yaml });
  } catch (error) {
    res.status(400).json({ message: `Invalid JSON: ${error.message}` });
  }
};

// Convert JSON to TypeScript interface
exports.jsonToTypeScript = async (req, res) => {
  try {
    const { json, interfaceName = 'Root' } = req.body;

    if (!json) {
      return res.status(400).json({ message: 'JSON is required' });
    }

    // Parse JSON
    const parsedJson = JSON.parse(json);

    // Generate TypeScript interface
    const typescript = generateTypeScript(parsedJson, interfaceName);

    res.json({ typescript });
  } catch (error) {
    res.status(400).json({ message: `Invalid JSON: ${error.message}` });
  }
};

// Helper function to convert JSON to YAML
const convertToYaml = (obj, indent = 0) => {
  const spaces = '  '.repeat(indent);
  let yaml = '';

  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]';
    yaml += '\n';
    obj.forEach(item => {
      yaml += `${spaces}- ${typeof item === 'object' ? convertToYaml(item, indent + 1) : JSON.stringify(item)}\n`;
    });
    return yaml.slice(0, -1);
  }

  if (typeof obj === 'object' && obj !== null) {
    if (Object.keys(obj).length === 0) return '{}';
    yaml += '\n';
    Object.entries(obj).forEach(([key, value]) => {
      yaml += `${spaces}${key}: ${typeof value === 'object' ? convertToYaml(value, indent + 1) : JSON.stringify(value)}\n`;
    });
    return yaml.slice(0, -1);
  }

  return JSON.stringify(obj);
};

// Helper function to generate TypeScript interface
const generateTypeScript = (obj, interfaceName = 'Root') => {
  const getType = (value) => {
    if (value === null) return 'null';
    if (Array.isArray(value)) {
      if (value.length === 0) return 'any[]';
      const types = new Set(value.map(item => getType(item)));
      return `Array<${Array.from(types).join(' | ')}>`;
    }
    if (typeof value === 'object') {
      const props = Object.entries(value)
        .map(([k, v]) => `${k}: ${getType(v)}`)
        .join(';\n  ');
      return `{\n  ${props}\n}`;
    }
    return typeof value;
  };

  return `interface ${interfaceName} ${getType(obj)}`;
};