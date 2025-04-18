import React, { useState } from 'react';
import { Bot, Copy, RefreshCw, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { toast } from 'sonner';

// Get API URL from environment variable
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const commitTypes = [
  { value: 'feat', label: 'Feature' },
  { value: 'fix', label: 'Bug Fix' },
  { value: 'docs', label: 'Documentation' },
  { value: 'style', label: 'Style' },
  { value: 'refactor', label: 'Refactor' },
  { value: 'perf', label: 'Performance' },
  { value: 'test', label: 'Test' },
  { value: 'build', label: 'Build' },
  { value: 'ci', label: 'CI' },
  { value: 'chore', label: 'Chore' }
];

const AiCommitGenerator = () => {
  const [codeDiff, setCodeDiff] = useState('');
  const [commitType, setCommitType] = useState('feat');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateCommitMessage = async () => {
    if (!codeDiff.trim()) {
      toast.error('Please enter a code diff');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch(`${API_URL}/api/generate-commit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          commitType,
          codeDiff
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 503 && data.retry) {
          // Model is loading, retry after 5 seconds
          toast.info('Model is loading, retrying in 5 seconds...');
          setTimeout(() => generateCommitMessage(), 5000);
          return;
        }
        throw new Error(data.details || 'Failed to generate commit message');
      }

      setGeneratedMessage(data.message);
      toast.success('Commit message generated!');
    } catch (error) {
      console.error('Error generating commit message:', error);
      toast.error(error.message || 'Failed to generate commit message. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedMessage);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Commit Generator</h1>
          <p className="text-muted-foreground mt-2">
            Generate meaningful commit messages from your code changes using Hugging Face's Starcoder model
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Code Diff</label>
              <Textarea
                placeholder="Paste your code diff here..."
                value={codeDiff}
                onChange={(e) => setCodeDiff(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Commit Type</label>
              <Select
                value={commitType}
                onValueChange={setCommitType}
                options={commitTypes}
              />
            </div>
            <Button
              onClick={generateCommitMessage}
              disabled={isGenerating}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Generating with GPT...
                </>
              ) : (
                <>
                  <Bot className="mr-2 h-4 w-4" />
                  Generate Commit Message
                </>
              )}
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Generated Message</label>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
                disabled={!generatedMessage}
              >
                {copied ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="bg-muted rounded-lg p-4 min-h-[300px]">
              <pre className="text-sm font-mono whitespace-pre-wrap">
                {generatedMessage || 'AI-generated commit message will appear here...'}
              </pre>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AiCommitGenerator;