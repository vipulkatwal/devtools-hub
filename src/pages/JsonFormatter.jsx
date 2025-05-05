import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInput, setOutput, setError, updateSettings, clearJson } from "../store/slices/jsonSlice";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Upload, Download, Copy, Trash2, Sun, Moon, Search, ChevronUp, ChevronDown, WrapText, List, FileType, FileJson, FileCode, FileSpreadsheet, GitCompare, Minimize2, CheckCircle, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Ajv2020 from 'ajv/dist/2020';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { diff } from 'deep-object-diff';
import { toast } from "react-hot-toast";

const STORAGE_KEY = 'json-formatter-settings';
const THEME_STORAGE_KEY = 'json-formatter-theme';
const FONT_SIZE_STORAGE_KEY = 'json-formatter-font-size';
const EDITOR_SETTINGS_KEY = 'json-formatter-editor-settings';

const JsonFormatter = () => {
  const dispatch = useDispatch();
  const { input, output, error, settings } = useSelector((state) => state.json);
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [editorTheme, setEditorTheme] = useState(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    return savedTheme || 'vs-dark';
  });
  const [fontSize, setFontSize] = useState(() => {
    const savedSize = localStorage.getItem(FONT_SIZE_STORAGE_KEY);
    return savedSize ? parseInt(savedSize) : 14;
  });
  const [editorSettings, setEditorSettings] = useState(() => {
    const saved = localStorage.getItem(EDITOR_SETTINGS_KEY);
    return saved ? JSON.parse(saved) : {
      wordWrap: true,
      lineNumbers: true,
      minimap: false
    };
  });
  const [searchPath, setSearchPath] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const [schema, setSchema] = useState('');
  const [schemaValid, setSchemaValid] = useState(null);
  const [schemaSyntaxError, setSchemaSyntaxError] = useState("");
  const [schemaValidationResult, setSchemaValidationResult] = useState(null);
  const [schemaValidationError, setSchemaValidationError] = useState("");
  const [diffInput, setDiffInput] = useState('');
  const [diffResult, setDiffResult] = useState(null);
  const [isCompressed, setIsCompressed] = useState(false);
  const [jsonValid, setJsonValid] = useState(null);
  const [jsonError, setJsonError] = useState("");

  // Helper to get Ajv instance based on $schema
  const getAjv = (schemaStr) => {
    try {
      const parsed = JSON.parse(schemaStr);
      if (parsed && typeof parsed === 'object' && parsed['$schema']) {
        if (parsed['$schema'].includes('2020-12')) {
          const ajv2020 = new Ajv2020({ strict: false });
          addFormats(ajv2020);
          return ajv2020;
        }
      }
    } catch { /* ignore, fallback to default Ajv */ }
    // Default to Ajv draft-07
    const ajv = new Ajv({ strict: false });
    addFormats(ajv);
    return ajv;
  };

  // Load saved settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem(STORAGE_KEY);
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        dispatch(updateSettings(parsedSettings));
      } catch (err) {
        console.error('Failed to load saved settings:', err.message);
      }
    }
  }, [dispatch]);

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  // Format JSON whenever input or settings change
  useEffect(() => {
    if (!input.trim()) {
      dispatch(setOutput(""));
      return;
    }

    try {
      // Parse the input JSON
      const parsedJson = JSON.parse(input);

      // Apply settings
      let formattedJson = parsedJson;

      // Sort keys if enabled
      if (settings.sortKeys) {
        formattedJson = sortObjectKeys(parsedJson);
      }

      // Format with specified indent size or minify
      const formatted = settings.minified
        ? JSON.stringify(formattedJson)
        : JSON.stringify(formattedJson, null, settings.indentSize);

      dispatch(setOutput(formatted));
      dispatch(setError(null));
    } catch (err) {
      dispatch(setError(err.message));
      dispatch(setOutput(""));
    }
  }, [input, settings, dispatch]);

  // Helper function to sort object keys recursively
  const sortObjectKeys = (obj) => {
    if (obj === null || typeof obj !== "object") return obj;

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

  const handleInputChange = (value) => {
    dispatch(setInput(value));
  };

  const handleSettingChange = (setting, value) => {
    dispatch(updateSettings({ [setting]: value }));
  };

  const handleClear = () => {
    dispatch(clearJson());
  };

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(output);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          JSON.parse(e.target.result);
          dispatch(setInput(e.target.result));
        } catch (err) {
          dispatch(setError(`Invalid JSON file: ${err.message}`));
        }
      };
      reader.readAsText(file);
    }
  };

  const handleDownload = () => {
    if (!output) return;

    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          JSON.parse(e.target.result);
          dispatch(setInput(e.target.result));
        } catch (err) {
          dispatch(setError(`Invalid JSON file: ${err.message}`));
        }
      };
      reader.readAsText(file);
    } else {
      dispatch(setError('Please drop a valid JSON file'));
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check if Ctrl/Cmd is pressed
      const isCtrlPressed = e.ctrlKey || e.metaKey;

      if (isCtrlPressed) {
        switch (e.key.toLowerCase()) {
          case 's':
            e.preventDefault();
            handleDownload();
            break;
          case 'm':
            e.preventDefault();
            handleSettingChange('minified', !settings.minified);
            break;
          case 'c':
            if (e.shiftKey) {
              e.preventDefault();
              handleCopyOutput();
            }
            break;
        }
      } else if (e.key === 'Escape') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [settings.minified, output]);

  const toggleTheme = () => {
    const newTheme = editorTheme === 'vs-dark' ? 'light' : 'vs-dark';
    setEditorTheme(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  };

  const handleFontSizeChange = (delta) => {
    const newSize = Math.max(8, Math.min(24, fontSize + delta));
    setFontSize(newSize);
    localStorage.setItem(FONT_SIZE_STORAGE_KEY, newSize.toString());
  };

  const findJsonPath = (path) => {
    if (!input.trim()) {
      setSearchError('No JSON input to search');
      return;
    }

    try {
      const json = JSON.parse(input);
      const pathParts = path.split('.');
      let current = json;

      for (const part of pathParts) {
        if (current === null || typeof current !== 'object') {
          setSearchError('Invalid path: reached a non-object value');
          return;
        }

        if (part.includes('[') && part.includes(']')) {
          // Handle array access
          const [key, index] = part.split('[');
          const arrayIndex = parseInt(index);
          if (key) current = current[key];
          if (current && Array.isArray(current) && !isNaN(arrayIndex)) {
            current = current[arrayIndex];
          } else {
            setSearchError(`Invalid array index at ${part}`);
            return;
          }
        } else {
          // Handle object access
          if (current[part] === undefined) {
            setSearchError(`Property "${part}" not found`);
            return;
          }
          current = current[part];
        }
      }

      setSearchResult(current);
      setSearchError(null);
    } catch (err) {
      setSearchError(err.message);
    }
  };

  const copyPath = () => {
    if (searchResult !== null) {
      navigator.clipboard.writeText(JSON.stringify(searchResult, null, 2));
    }
  };

  // Save editor settings to localStorage
  useEffect(() => {
    localStorage.setItem(EDITOR_SETTINGS_KEY, JSON.stringify(editorSettings));
  }, [editorSettings]);

  const toggleEditorSetting = (setting) => {
    setEditorSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const exportToYaml = () => {
    if (!output) return;
    try {
      // Simple YAML conversion (for basic JSON)
      const json = JSON.parse(output);
      const yaml = convertToYaml(json);
      downloadFile(yaml, 'formatted.yaml', 'text/yaml');
    } catch (err) {
      dispatch(setError(`Failed to export to YAML: ${err.message}`));
    }
  };

  const exportToTypeScript = () => {
    if (!output) return;
    try {
      const json = JSON.parse(output);
      const ts = generateTypeScript(json);
      downloadFile(ts, 'types.ts', 'text/typescript');
    } catch (err) {
      dispatch(setError(`Failed to export to TypeScript: ${err.message}`));
    }
  };

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

  const downloadFile = (content, filename, type) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportToCsv = () => {
    if (!output) return;
    try {
      const json = JSON.parse(output);
      const csv = convertToCsv(json);
      downloadFile(csv, 'data.csv', 'text/csv');
      toast.success('Exported to CSV successfully');
    } catch (err) {
      toast.error(`Failed to export to CSV: ${err.message}`);
    }
  };

  const convertToCsv = (data) => {
    if (Array.isArray(data)) {
      if (data.length === 0) return '';
      const headers = Object.keys(data[0]);
      const rows = data.map(item =>
        headers.map(header => JSON.stringify(item[header])).join(',')
      );
      return [headers.join(','), ...rows].join('\n');
    } else if (typeof data === 'object') {
      const headers = Object.keys(data);
      const values = headers.map(header => JSON.stringify(data[header]));
      return [headers.join(','), values.join(',')].join('\n');
    }
    throw new Error('Data must be an array or object');
  };

  const compareJson = () => {
    if (!input.trim() || !diffInput.trim()) {
      toast.error('Please provide both JSON inputs to compare');
      return;
    }

    try {
      const json1 = JSON.parse(input);
      const json2 = JSON.parse(diffInput);
      const differences = diff(json1, json2);
      setDiffResult(differences);
      toast.success('Comparison completed');
    } catch (err) {
      toast.error(`Failed to compare JSON: ${err.message}`);
    }
  };

  const toggleCompression = () => {
    if (!input.trim()) return;
    try {
      if (isCompressed) {
        // Decompress
        const decompressed = JSON.parse(input);
        setInput(JSON.stringify(decompressed, null, 2));
      } else {
        // Compress
        const compressed = JSON.stringify(JSON.parse(input));
        setInput(compressed);
      }
      setIsCompressed(!isCompressed);
      toast.success(isCompressed ? 'Decompressed JSON' : 'Compressed JSON');
    } catch (err) {
      toast.error(`Failed to ${isCompressed ? 'decompress' : 'compress'} JSON: ${err.message}`);
    }
  };

  // Real-time JSON input validation
  useEffect(() => {
    if (!input.trim()) {
      setJsonValid(null);
      setJsonError("");
      return;
    }
    try {
      JSON.parse(input);
      setJsonValid(true);
      setJsonError("");
    } catch (err) {
      setJsonValid(false);
      setJsonError(err.message);
    }
  }, [input]);

  // Real-time schema syntax validation
  useEffect(() => {
    if (!schema.trim()) {
      setSchemaValid(null);
      setSchemaSyntaxError("");
      return;
    }
    try {
      JSON.parse(schema);
      setSchemaValid(true);
      setSchemaSyntaxError("");
    } catch (err) {
      setSchemaValid(false);
      setSchemaSyntaxError(err.message);
    }
  }, [schema]);

  // Real-time JSON Schema validation (if both are valid)
  useEffect(() => {
    if (jsonValid && schemaValid) {
      try {
        const jsonData = JSON.parse(input);
        const schemaData = JSON.parse(schema);
        const ajvInstance = getAjv(schema);
        const validate = ajvInstance.compile(schemaData);
        const valid = validate(jsonData);
        setSchemaValidationResult(valid);
        if (valid) {
          setSchemaValidationError("");
        } else {
          setSchemaValidationError(ajvInstance.errorsText(validate.errors));
        }
      } catch (err) {
        setSchemaValidationResult(false);
        setSchemaValidationError(err.message);
      }
    } else {
      setSchemaValidationResult(null);
      setSchemaValidationError("");
    }
  }, [input, schema, jsonValid, schemaValid]);

  return (
    <div
      className="container mx-auto p-4 space-y-4"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isDragging && (
        <div className="fixed inset-0 bg-blue-500 bg-opacity-10 pointer-events-none flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-lg font-semibold">Drop JSON file here</p>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">JSON Formatter</h1>
        <div className="flex space-x-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".json"
            className="hidden"
          />
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            title="Upload JSON file (Ctrl/Cmd + S)"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" disabled={!output}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleDownload}>
                <FileJson className="w-4 h-4 mr-2" />
                JSON
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportToYaml}>
                <FileCode className="w-4 h-4 mr-2" />
                YAML
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportToTypeScript}>
                <FileType className="w-4 h-4 mr-2" />
                TypeScript
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportToCsv}>
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                CSV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            onClick={handleCopyOutput}
            disabled={!output}
            title="Copy to clipboard (Ctrl/Cmd + Shift + C)"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
          <Button
            variant="outline"
            onClick={handleClear}
            title="Clear (Esc)"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
          <Button
            variant="outline"
            onClick={toggleTheme}
            title="Toggle theme"
          >
            {editorTheme === 'vs-dark' ? (
              <Sun className="w-4 h-4 mr-2" />
            ) : (
              <Moon className="w-4 h-4 mr-2" />
            )}
            Theme
          </Button>
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              onClick={() => handleFontSizeChange(-1)}
              title="Decrease font size"
            >
              <ChevronDown className="w-4 h-4" />
            </Button>
            <span className="px-2 text-sm">{fontSize}px</span>
            <Button
              variant="outline"
              onClick={() => handleFontSizeChange(1)}
              title="Increase font size"
            >
              <ChevronUp className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              onClick={() => toggleEditorSetting('wordWrap')}
              title="Toggle word wrap"
              className={editorSettings.wordWrap ? 'bg-gray-200 dark:bg-gray-700' : ''}
            >
              <WrapText className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => toggleEditorSetting('lineNumbers')}
              title="Toggle line numbers"
              className={editorSettings.lineNumbers ? 'bg-gray-200 dark:bg-gray-700' : ''}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
          <Button
            variant="outline"
            onClick={toggleCompression}
            disabled={!input}
            title="Toggle JSON compression"
          >
            <Minimize2 className="w-4 h-4 mr-2" />
            {isCompressed ? 'Decompress' : 'Compress'}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>JSON Path Finder</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Input
              placeholder="Enter path (e.g., data.users[0].name)"
              value={searchPath}
              onChange={(e) => setSearchPath(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && findJsonPath(searchPath)}
            />
            <Button
              variant="outline"
              onClick={() => findJsonPath(searchPath)}
            >
              <Search className="w-4 h-4 mr-2" />
              Find
            </Button>
          </div>
          {searchError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{searchError}</AlertDescription>
            </Alert>
          )}
          {searchResult !== null && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Result:</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyPath}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Value
                </Button>
              </div>
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-auto">
                {JSON.stringify(searchResult, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Input JSON
            <span title="Paste your JSON data here. This is the data that will be formatted, validated, and used for all features." aria-label="Input JSON Info" className="ml-2 cursor-help text-blue-400">🛈</span>
          </CardTitle>
          <div className="flex items-center gap-2 mt-2">
            {jsonValid === true && (
              <span className="flex items-center text-green-500" aria-label="Valid JSON"><CheckCircle className="w-5 h-5 mr-1" />Valid JSON</span>
            )}
            {jsonValid === false && (
              <span className="flex items-center text-red-500" aria-label="Invalid JSON"><XCircle className="w-5 h-5 mr-1" />{jsonError}</span>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Editor
            height="400px"
            language="json"
            value={input}
            onChange={handleInputChange}
            theme={editorTheme}
            options={{
              minimap: { enabled: editorSettings.minimap },
              fontSize: fontSize,
              lineNumbers: editorSettings.lineNumbers ? "on" : "off",
              wordWrap: editorSettings.wordWrap ? "on" : "off",
              automaticLayout: true,
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            JSON Schema Validation
            <span title="Paste your JSON Schema here. This schema will be used to validate your input JSON." aria-label="Schema Info" className="ml-2 cursor-help text-blue-400">🛈</span>
          </CardTitle>
          <div className="flex items-center gap-2 mt-2">
            {schemaValid === true && (
              <span className="flex items-center text-green-500" aria-label="Valid Schema"><CheckCircle className="w-5 h-5 mr-1" />Valid Schema</span>
            )}
            {schemaValid === false && (
              <span className="flex items-center text-red-500" aria-label="Invalid Schema"><XCircle className="w-5 h-5 mr-1" />{schemaSyntaxError}</span>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 mb-2">
            <Label htmlFor="schema-editor" className="font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-2">
              JSON Schema
              <span title="Paste your JSON Schema here. Example: { 'type': 'object', ... }" aria-label="Schema Tooltip" className="cursor-help text-blue-400">🛈</span>
            </Label>
          </div>
          <div className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 shadow-lg p-2 transition-all">
            <Editor
              id="schema-editor"
              height="220px"
              language="json"
              value={schema}
              onChange={value => setSchema(value || '')}
              theme={editorTheme}
              options={{
                minimap: { enabled: false },
                fontSize: fontSize,
                lineNumbers: "on",
                wordWrap: editorSettings.wordWrap ? "on" : "off",
                fontFamily: "Fira Mono, Menlo, Monaco, 'Liberation Mono', 'Courier New', monospace",
                automaticLayout: true,
                scrollBeyondLastLine: false,
                renderLineHighlight: "all",
                scrollbar: {
                  vertical: "auto",
                  horizontal: "auto"
                }
              }}
              className="rounded-md"
              placeholder="Paste your JSON Schema here..."
            />
          </div>
          {/* Real-time schema validation result */}
          {schemaValidationResult === true && (
            <div className="flex items-center text-green-500 bg-green-100/70 dark:bg-green-900/40 rounded-md px-3 py-2 mt-2"><CheckCircle className="w-5 h-5 mr-1" />JSON is valid according to the schema</div>
          )}
          {schemaValidationResult === false && (
            <div className="flex items-center text-red-500 bg-red-100/70 dark:bg-red-900/40 rounded-md px-3 py-2 mt-2"><XCircle className="w-5 h-5 mr-1" />{schemaValidationError}</div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>JSON Diff Viewer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Editor
              height="200px"
              language="json"
              value={diffInput}
              onChange={setDiffInput}
              theme={editorTheme}
              options={{
                minimap: { enabled: false },
                fontSize: fontSize,
                lineNumbers: editorSettings.lineNumbers ? "on" : "off",
                wordWrap: editorSettings.wordWrap ? "on" : "off",
              }}
              placeholder="Enter JSON to compare with input..."
            />
            <Button onClick={compareJson}>
              Compare JSON
            </Button>
            {diffResult && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Differences:</h3>
                <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-auto">
                  {JSON.stringify(diffResult, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>
              Input JSON
              <span title="Paste your JSON data here. This is the data that will be formatted, validated, and used for all features." aria-label="Input JSON Info" className="ml-2 cursor-help text-blue-400">🛈</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Editor
              height="400px"
              language="json"
              value={input}
              onChange={handleInputChange}
              theme={editorTheme}
              options={{
                minimap: { enabled: editorSettings.minimap },
                fontSize: fontSize,
                lineNumbers: editorSettings.lineNumbers ? "on" : "off",
                wordWrap: editorSettings.wordWrap ? "on" : "off",
                automaticLayout: true,
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Formatted Output</CardTitle>
          </CardHeader>
          <CardContent>
            <Editor
              height="400px"
              language="json"
              value={output}
              theme={editorTheme}
              options={{
                readOnly: true,
                minimap: { enabled: editorSettings.minimap },
                fontSize: fontSize,
                lineNumbers: editorSettings.lineNumbers ? "on" : "off",
                wordWrap: editorSettings.wordWrap ? "on" : "off",
                automaticLayout: true,
              }}
            />
          </CardContent>
        </Card>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Formatting Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="sort-keys"
                checked={settings.sortKeys}
                onCheckedChange={(checked) => handleSettingChange("sortKeys", checked)}
              />
              <Label htmlFor="sort-keys">Sort Keys</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="minified"
                checked={settings.minified}
                onCheckedChange={(checked) => handleSettingChange("minified", checked)}
              />
              <Label htmlFor="minified">Minify Output</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="remove-comments"
                checked={settings.removeComments}
                onCheckedChange={(checked) => handleSettingChange("removeComments", checked)}
              />
              <Label htmlFor="remove-comments">Remove Comments</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Label htmlFor="indent-size">Indent Size:</Label>
              <Select
                value={settings.indentSize.toString()}
                onValueChange={(value) => handleSettingChange("indentSize", parseInt(value))}
                disabled={settings.minified}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="8">8</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-full text-sm text-gray-500 dark:text-gray-400">
              <p>Tip: You can drag and drop a JSON file anywhere on this page</p>
              <p>Keyboard shortcuts:</p>
              <ul className="list-disc list-inside">
                <li>Ctrl/Cmd + S: Download JSON</li>
                <li>Ctrl/Cmd + Shift + C: Copy to clipboard</li>
                <li>Ctrl/Cmd + M: Toggle minification</li>
                <li>Esc: Clear all</li>
              </ul>
              <p>Path Finder Tips:</p>
              <ul className="list-disc list-inside">
                <li>Use dot notation: data.users.name</li>
                <li>Use array indices: data.users[0].name</li>
                <li>Press Enter to search</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JsonFormatter;