import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Copy, RefreshCcw } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { LoremIpsum } from 'lorem-ipsum';

const LoremIpsumGenerator = () => {
  const [type, setType] = useState('paragraphs');
  const [count, setCount] = useState(3);
  const [minWordsPerSentence, setMinWordsPerSentence] = useState(4);
  const [maxWordsPerSentence, setMaxWordsPerSentence] = useState(16);
  const [minSentencesPerParagraph, setMinSentencesPerParagraph] = useState(4);
  const [maxSentencesPerParagraph, setMaxSentencesPerParagraph] = useState(8);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [generated, setGenerated] = useState('');

  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: maxSentencesPerParagraph,
      min: minSentencesPerParagraph
    },
    wordsPerSentence: {
      max: maxWordsPerSentence,
      min: minWordsPerSentence
    }
  });

  const generate = () => {
    let result = '';
    switch (type) {
      case 'paragraphs':
        result = lorem.generateParagraphs(count);
        break;
      case 'sentences':
        result = lorem.generateSentences(count);
        break;
      case 'words':
        result = lorem.generateWords(count);
        break;
      default:
        result = lorem.generateParagraphs(count);
    }

    if (!startWithLorem && type === 'paragraphs' && result.toLowerCase().startsWith('lorem ipsum')) {
      result = result.substring(result.indexOf(' ', 11) + 1);
    }

    setGenerated(result);
    toast.success('Text generated successfully');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated);
    toast.success('Copied to clipboard');
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Lorem Ipsum Generator</h1>

      <Card>
        <CardHeader>
          <CardTitle>Generator Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paragraphs">Paragraphs</SelectItem>
                  <SelectItem value="sentences">Sentences</SelectItem>
                  <SelectItem value="words">Words</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="count">Count</Label>
              <Input
                id="count"
                type="number"
                min="1"
                max="100"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="startWithLorem">Start with "Lorem ipsum"</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="startWithLorem"
                  checked={startWithLorem}
                  onCheckedChange={setStartWithLorem}
                />
                <Label htmlFor="startWithLorem">{startWithLorem ? "Yes" : "No"}</Label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Sentence Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Words per Sentence</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="minWords">Min</Label>
                      <Input
                        id="minWords"
                        type="number"
                        min="1"
                        max="50"
                        value={minWordsPerSentence}
                        onChange={(e) => setMinWordsPerSentence(parseInt(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="maxWords">Max</Label>
                      <Input
                        id="maxWords"
                        type="number"
                        min="1"
                        max="50"
                        value={maxWordsPerSentence}
                        onChange={(e) => setMaxWordsPerSentence(parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Paragraph Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Sentences per Paragraph</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="minSentences">Min</Label>
                      <Input
                        id="minSentences"
                        type="number"
                        min="1"
                        max="20"
                        value={minSentencesPerParagraph}
                        onChange={(e) => setMinSentencesPerParagraph(parseInt(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="maxSentences">Max</Label>
                      <Input
                        id="maxSentences"
                        type="number"
                        min="1"
                        max="20"
                        value={maxSentencesPerParagraph}
                        onChange={(e) => setMaxSentencesPerParagraph(parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex space-x-2">
            <Button onClick={generate}>
              <RefreshCcw className="w-4 h-4 mr-2" />
              Generate
            </Button>
            <Button variant="outline" onClick={copyToClipboard} disabled={!generated}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>
        </CardContent>
      </Card>

      {generated && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Text</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-secondary/50 p-4 rounded-lg whitespace-pre-wrap">
              {generated}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LoremIpsumGenerator;