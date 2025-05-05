import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Copy, Download, Upload } from "lucide-react";
import Editor from "@monaco-editor/react";
import { toast } from "react-hot-toast";
import * as prettier from "prettier/standalone";
import * as parserBabel from "prettier/parser-babel";
import * as parserHtml from "prettier/parser-html";
import * as parserCss from "prettier/parser-postcss";
import * as parserMarkdown from "prettier/parser-markdown";
import * as parserYaml from "prettier/parser-yaml";
import beautify from "js-beautify";

const CodeFormatter = () => {
  const [code, setCode] = useState("");
  const [formattedCode, setFormattedCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [error, setError] = useState(null);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [wordWrap, setWordWrap] = useState(true);
  const [indentSize, setIndentSize] = useState(2);
  const [semicolons, setSemicolons] = useState(true);
  const [quotes, setQuotes] = useState("single");

  const handleEditorDidMount = () => {
    // Editor is ready
  };

  const formatCode = () => {
    setError(null);

    if (!code.trim()) {
      setError("Please enter some code to format");
      return;
    }

    try {
      let formatted = "";

      if (language === "python") {
        // Use js-beautify for Python
        formatted = beautify(code, {
          indent_size: indentSize,
          space_in_empty_paren: true,
          preserve_newlines: true,
          max_preserve_newlines: 2,
          wrap_line_length: 0,
          indent_scripts: "normal",
          eol: "\n",
          end_with_newline: true,
          indent_char: " ",
          indent_level: 0,
          selector_separator_newline: false,
          unformatted: [],
          content_unformatted: ["pre", "textarea"],
          indent_inner_html: false,
          comma_first: false,
          e4x: false,
          indent_empty_lines: false,
          terse: false,
          html: {
            wrap: 0
          },
          css: {
            indent_size: indentSize
          },
          js: {
            indent_size: indentSize
          },
          xml: {
            indent_size: indentSize
          }
        });
      } else {
        // Use Prettier for other languages
        const parser = getParserForLanguage(language);
        const options = {
          parser: getParserName(language),
          plugins: [parser],
          semi: semicolons,
          singleQuote: quotes === "single",
          tabWidth: indentSize,
          printWidth: 80,
          trailingComma: "es5",
          bracketSpacing: true,
          arrowParens: "avoid",
          endOfLine: "lf"
        };

        formatted = prettier.format(code, options);
      }

      setFormattedCode(formatted);
      toast.success("Code formatted successfully");
    } catch (err) {
      console.error("Formatting error:", err);
      setError(err.message || "Failed to format code");
      toast.error("Failed to format code");
    }
  };

  const getParserForLanguage = (lang) => {
    switch (lang) {
      case "javascript":
      case "jsx":
        return parserBabel;
      case "html":
        return parserHtml;
      case "css":
        return parserCss;
      case "markdown":
        return parserMarkdown;
      case "yaml":
        return parserYaml;
      default:
        return parserBabel;
    }
  };

  const getParserName = (lang) => {
    switch (lang) {
      case "javascript":
        return "babel";
      case "jsx":
        return "babel-jsx";
      case "html":
        return "html";
      case "css":
        return "css";
      case "markdown":
        return "markdown";
      case "yaml":
        return "yaml";
      default:
        return "babel";
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const downloadCode = (text, filename) => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Code downloaded");
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCode(e.target?.result || '');
        toast.success("File uploaded successfully");
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Code Formatter</h1>

      <Card>
        <CardHeader>
          <CardTitle>Format Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="jsx">JSX</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                  <SelectItem value="css">CSS</SelectItem>
                  <SelectItem value="markdown">Markdown</SelectItem>
                  <SelectItem value="yaml">YAML</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="indentSize">Indent Size</Label>
              <Select value={indentSize.toString()} onValueChange={(value) => setIndentSize(parseInt(value))}>
                <SelectTrigger id="indentSize">
                  <SelectValue placeholder="Select indent size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 spaces</SelectItem>
                  <SelectItem value="4">4 spaces</SelectItem>
                  <SelectItem value="8">8 spaces</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {language !== "python" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="quotes">Quotes</Label>
                  <Select value={quotes} onValueChange={setQuotes}>
                    <SelectTrigger id="quotes">
                      <SelectValue placeholder="Select quote style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="double">Double</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="semicolons">Semicolons</Label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="semicolons"
                      checked={semicolons}
                      onCheckedChange={setSemicolons}
                    />
                    <Label htmlFor="semicolons">{semicolons ? "Use" : "Omit"}</Label>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex justify-between">
            <Button onClick={formatCode}>Format Code</Button>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setCode("")}>
                Clear
              </Button>
              <div className="relative">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".js,.jsx,.ts,.tsx,.html,.css,.md,.yaml,.yml,.py"
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById("file-upload").click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Input Code</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 shadow-lg overflow-hidden p-2 transition-all">
              <Editor
                height="400px"
                language={language}
                value={code}
                onChange={setCode}
                onMount={handleEditorDidMount}
                options={{
                  minimap: { enabled: false },
                  lineNumbers: "on",
                  wordWrap: wordWrap ? "on" : "off",
                  tabSize: indentSize,
                  automaticLayout: true,
                  scrollBeyondLastLine: false,
                  renderWhitespace: "none",
                  fontSize: 14,
                  fontFamily: "Fira Mono, Menlo, Monaco, 'Liberation Mono', 'Courier New', monospace",
                  renderLineHighlight: "all",
                  scrollbar: {
                    vertical: "auto",
                    horizontal: "auto"
                  }
                }}
                className="rounded-md"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Formatted Code</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 shadow-lg overflow-hidden p-2 transition-all">
              <Editor
                height="400px"
                language={language}
                value={formattedCode}
                onMount={handleEditorDidMount}
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  lineNumbers: "on",
                  wordWrap: wordWrap ? "on" : "off",
                  tabSize: indentSize,
                  automaticLayout: true,
                  scrollBeyondLastLine: false,
                  renderWhitespace: "none",
                  fontSize: 14,
                  fontFamily: "Fira Mono, Menlo, Monaco, 'Liberation Mono', 'Courier New', monospace",
                  renderLineHighlight: "all",
                  scrollbar: {
                    vertical: "auto",
                    horizontal: "auto"
                  }
                }}
                className="rounded-md"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {formattedCode && (
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => copyToClipboard(formattedCode)}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Formatted Code
              </Button>
              <Button
                variant="outline"
                onClick={() => downloadCode(formattedCode, `formatted.${getFileExtension(language)}`)}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Editor Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="lineNumbers"
                checked={showLineNumbers}
                onCheckedChange={setShowLineNumbers}
              />
              <Label htmlFor="lineNumbers">Line Numbers</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="wordWrap"
                checked={wordWrap}
                onCheckedChange={setWordWrap}
              />
              <Label htmlFor="wordWrap">Word Wrap</Label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const getFileExtension = (language) => {
  switch (language) {
    case "javascript":
      return "js";
    case "jsx":
      return "jsx";
    case "html":
      return "html";
    case "css":
      return "css";
    case "markdown":
      return "md";
    case "yaml":
      return "yaml";
    case "python":
      return "py";
    default:
      return "txt";
  }
};

export default CodeFormatter;