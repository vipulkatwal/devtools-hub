import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Copy, Download, RefreshCw, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const licenses = [
  { value: 'MIT', label: 'MIT License', badge: 'https://img.shields.io/badge/license-MIT-blue.svg' },
  { value: 'Apache-2.0', label: 'Apache License 2.0', badge: 'https://img.shields.io/badge/license-Apache%202.0-blue.svg' },
  { value: 'GPL-3.0', label: 'GNU General Public License v3.0', badge: 'https://img.shields.io/badge/license-GPL%203.0-blue.svg' },
  { value: 'BSD-3-Clause', label: 'BSD 3-Clause License', badge: 'https://img.shields.io/badge/license-BSD%203--Clause-blue.svg' },
  { value: 'ISC', label: 'ISC License', badge: 'https://img.shields.io/badge/license-ISC-blue.svg' }
];

const ReadmeGenerator = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    features: '',
    techStack: '',
    installation: '',
    usage: '',
    screenshots: '',
    license: 'MIT',
    author: '',
    githubUrl: ''
  });

  const [copied, setCopied] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateBadges = () => {
    const { license, githubUrl } = formData;
    const repoPath = githubUrl.replace('https://github.com/', '');

    return `[![License](${licenses.find(l => l.value === license)?.badge})](${githubUrl}/blob/main/LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/${repoPath}?style=social)](https://github.com/${repoPath}/stargazers)
[![Last Commit](https://img.shields.io/github/last-commit/${repoPath})](${githubUrl}/commits/main)`;
  };

  const generateReadme = () => {
    const {
      projectName,
      description,
      features,
      techStack,
      installation,
      usage,
      screenshots,
      license,
      author,
      githubUrl
    } = formData;

    const featuresList = features
      .split('\n')
      .filter(f => f.trim())
      .map(f => `- ${f.trim()}`)
      .join('\n');

    const techStackList = techStack
      .split(',')
      .map(tech => tech.trim())
      .filter(tech => tech)
      .map(tech => `\`${tech}\``)
      .join(' ');

    const screenshotsSection = screenshots
      ? `\n\n## Screenshots\n\n${screenshots
          .split('\n')
          .filter(s => s.trim())
          .map(s => `![${projectName}](${s.trim()})`)
          .join('\n\n')}`
      : '';

    return `# ${projectName}

${generateBadges()}

## Description

${description}

## Features

${featuresList}

## Tech Stack

${techStackList}

## Installation

${installation}

## Usage

${usage}${screenshotsSection}

## License

This project is licensed under the ${licenses.find(l => l.value === license)?.label} - see the [LICENSE](LICENSE) file for details.

## Author

${author}

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Links

- [GitHub Repository](${githubUrl})
`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateReadme());
      setCopied(true);
      toast.success('README copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const downloadReadme = () => {
    const blob = new Blob([generateReadme()], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('README downloaded successfully!');
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          README Generator
        </h1>
        <p className="text-gray-400">Generate professional README files for your projects</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Project Name</label>
              <Input
                name="projectName"
                value={formData.projectName}
                onChange={handleInputChange}
                placeholder="e.g., DevTools Hub"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Brief description of your project"
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Features</label>
              <Textarea
                name="features"
                value={formData.features}
                onChange={handleInputChange}
                placeholder="List features (one per line)"
                rows={4}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Tech Stack</label>
              <Input
                name="techStack"
                value={formData.techStack}
                onChange={handleInputChange}
                placeholder="e.g., React, TailwindCSS, TypeScript"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Installation Steps</label>
              <Textarea
                name="installation"
                value={formData.installation}
                onChange={handleInputChange}
                placeholder="Step by step installation instructions"
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Usage Instructions</label>
              <Textarea
                name="usage"
                value={formData.usage}
                onChange={handleInputChange}
                placeholder="How to use your project"
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Screenshots (optional)</label>
              <Textarea
                name="screenshots"
                value={formData.screenshots}
                onChange={handleInputChange}
                placeholder="Screenshot URLs (one per line)"
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">License</label>
              <Select
                value={formData.license}
                onValueChange={(value) => setFormData(prev => ({ ...prev, license: value }))}
                options={licenses}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Author</label>
              <Input
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">GitHub Repository URL</label>
              <Input
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleInputChange}
                placeholder="https://github.com/username/repo"
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Preview</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                >
                  {copied ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadReadme}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="prose prose-invert max-w-none bg-muted rounded-lg p-4 min-h-[600px] overflow-auto">
              <ReactMarkdown>
                {generateReadme()}
              </ReactMarkdown>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ReadmeGenerator;