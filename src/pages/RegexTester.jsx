import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Copy } from "lucide-react";
import Editor from "@monaco-editor/react";
import { toast } from "react-hot-toast";

const RegexTester = () => {
  const [regex, setRegex] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [wordWrap, setWordWrap] = useState(true);

  // Flags state
  const [globalFlag, setGlobalFlag] = useState(true);
  const [caseInsensitiveFlag, setCaseInsensitiveFlag] = useState(false);
  const [multilineFlag, setMultilineFlag] = useState(false);
  const [dotAllFlag, setDotAllFlag] = useState(false);
  const [unicodeFlag, setUnicodeFlag] = useState(false);
  const [stickyFlag, setStickyFlag] = useState(false);

  const updateFlags = () => {
    let newFlags = "";
    if (globalFlag) newFlags += "g";
    if (caseInsensitiveFlag) newFlags += "i";
    if (multilineFlag) newFlags += "m";
    if (dotAllFlag) newFlags += "s";
    if (unicodeFlag) newFlags += "u";
    if (stickyFlag) newFlags += "y";
    setFlags(newFlags);
  };

  const testRegex = () => {
    setError(null);
    setMatches([]);

    if (!regex) {
      setError("Please enter a regular expression");
      return;
    }

    try {
      const regexObj = new RegExp(regex, flags);
      const results = [];
      let match;

      if (globalFlag) {
        while ((match = regexObj.exec(testString)) !== null) {
          results.push({
            match: match[0],
            groups: match.slice(1),
            index: match.index,
          });
        }
      } else {
        match = regexObj.exec(testString);
        if (match) {
          results.push({
            match: match[0],
            groups: match.slice(1),
            index: match.index,
          });
        }
      }

      setMatches(results);
      if (results.length === 0) {
        toast.error("No matches found");
      } else {
        toast.success(`Found ${results.length} match${results.length > 1 ? "es" : ""}`);
      }
    } catch (err) {
      setError(err.message);
      toast.error("Invalid regular expression");
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Regex Tester</h1>

      <Card>
        <CardHeader>
          <CardTitle>Regular Expression</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter regex pattern"
              value={regex}
              onChange={(e) => setRegex(e.target.value)}
            />
            <Button onClick={testRegex}>Test</Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="global"
                checked={globalFlag}
                onCheckedChange={(checked) => {
                  setGlobalFlag(checked);
                  updateFlags();
                }}
              />
              <Label htmlFor="global">Global (g)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="case"
                checked={caseInsensitiveFlag}
                onCheckedChange={(checked) => {
                  setCaseInsensitiveFlag(checked);
                  updateFlags();
                }}
              />
              <Label htmlFor="case">Case Insensitive (i)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="multiline"
                checked={multilineFlag}
                onCheckedChange={(checked) => {
                  setMultilineFlag(checked);
                  updateFlags();
                }}
              />
              <Label htmlFor="multiline">Multiline (m)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="dotall"
                checked={dotAllFlag}
                onCheckedChange={(checked) => {
                  setDotAllFlag(checked);
                  updateFlags();
                }}
              />
              <Label htmlFor="dotall">Dot All (s)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="unicode"
                checked={unicodeFlag}
                onCheckedChange={(checked) => {
                  setUnicodeFlag(checked);
                  updateFlags();
                }}
              />
              <Label htmlFor="unicode">Unicode (u)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="sticky"
                checked={stickyFlag}
                onCheckedChange={(checked) => {
                  setStickyFlag(checked);
                  updateFlags();
                }}
              />
              <Label htmlFor="sticky">Sticky (y)</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Test String</CardTitle>
        </CardHeader>
        <CardContent>
          <Editor
            height="200px"
            language="plaintext"
            value={testString}
            onChange={setTestString}
            options={{
              minimap: { enabled: false },
              lineNumbers: showLineNumbers ? "on" : "off",
              wordWrap: wordWrap ? "on" : "off",
            }}
          />
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {matches.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Matches ({matches.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {matches.map((match, index) => (
                <div key={index} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Match {index + 1}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(match.match)}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                  <div>
                    <p>
                      <span className="font-semibold">Text:</span> {match.match}
                    </p>
                    <p>
                      <span className="font-semibold">Index:</span> {match.index}
                    </p>
                    {match.groups.length > 0 && (
                      <div>
                        <span className="font-semibold">Groups:</span>
                        <ul className="list-disc list-inside">
                          {match.groups.map((group, i) => (
                            <li key={i}>{group}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
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

export default RegexTester;
