import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Editor from "@monaco-editor/react";
import { toast } from 'react-hot-toast';
import { Copy, Upload, Download } from 'lucide-react';
import { diffLines, diffWords } from 'diff';

const DiffChecker = () => {
  const [originalText, setOriginalText] = useState('');
  const [modifiedText, setModifiedText] = useState('');
  const [diffResult, setDiffResult] = useState([]);
  const [diffType, setDiffType] = useState('lines');

  const generateDiff = () => {
    try {
      const diff = diffType === 'lines'
        ? diffLines(originalText, modifiedText)
        : diffWords(originalText, modifiedText);

      setDiffResult(diff);
      toast.success('Diff generated successfully');
    } catch (error) {
      toast.error('Error generating diff');
      console.error(error);
    }
  };

  const handleFileUpload = (side, event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (side === 'original') {
          setOriginalText(e.target?.result || '');
        } else {
          setModifiedText(e.target?.result || '');
        }
        toast.success(`File uploaded to ${side} side`);
      };
      reader.readAsText(file);
    }
  };

  const downloadDiff = () => {
    const diffText = diffResult.map(part => {
      const prefix = part.added ? '+' : part.removed ? '-' : ' ';
      return prefix + part.value;
    }).join('');

    const blob = new Blob([diffText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diff-result.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Diff downloaded');
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Diff Checker</h1>

      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Button
              variant={diffType === 'lines' ? 'default' : 'outline'}
              onClick={() => setDiffType('lines')}
            >
              Line by Line
            </Button>
            <Button
              variant={diffType === 'words' ? 'default' : 'outline'}
              onClick={() => setDiffType('words')}
            >
              Word by Word
            </Button>
            <Button onClick={generateDiff}>
              Generate Diff
            </Button>
            {diffResult.length > 0 && (
              <Button variant="outline" onClick={downloadDiff}>
                <Download className="w-4 h-4 mr-2" />
                Download Diff
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Original Text
              <div className="relative">
                <input
                  type="file"
                  id="original-upload"
                  className="hidden"
                  onChange={(e) => handleFileUpload('original', e)}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('original-upload').click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Editor
              height="400px"
              language="plaintext"
              value={originalText}
              onChange={setOriginalText}
              options={{
                minimap: { enabled: false },
                lineNumbers: "on",
                wordWrap: "on",
                theme: 'vs-dark'
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Modified Text
              <div className="relative">
                <input
                  type="file"
                  id="modified-upload"
                  className="hidden"
                  onChange={(e) => handleFileUpload('modified', e)}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('modified-upload').click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Editor
              height="400px"
              language="plaintext"
              value={modifiedText}
              onChange={setModifiedText}
              options={{
                minimap: { enabled: false },
                lineNumbers: "on",
                wordWrap: "on",
                theme: 'vs-dark'
              }}
            />
          </CardContent>
        </Card>
      </div>

      {diffResult.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Diff Result</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-secondary/50 p-4 rounded-lg font-mono whitespace-pre-wrap">
              {diffResult.map((part, index) => (
                <span
                  key={index}
                  className={
                    part.added
                      ? 'bg-green-500/20 text-green-400'
                      : part.removed
                      ? 'bg-red-500/20 text-red-400'
                      : 'text-gray-400'
                  }
                >
                  {part.value}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DiffChecker;