import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Copy, Image as ImageIcon, Check, AlertCircle, Info } from 'lucide-react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MetaTags = () => {
  const [metaData, setMetaData] = useState({
    // Basic SEO
    title: '',
    description: '',
    keywords: '',
    author: '',
    canonical: '',
    robots: 'index, follow',
    viewport: 'width=device-width, initial-scale=1.0',
    // Open Graph
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    ogUrl: '',
    ogType: 'website',
    // Twitter
    twitterCard: 'summary_large_image',
    twitterTitle: '',
    twitterDescription: '',
    twitterImage: '',
    twitterCreator: '',
    twitterSite: '',
  });

  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleChange = (field, value) => {
    setMetaData((prev) => ({
      ...prev,
      [field]: value,
      // Sync OG and Twitter fields with basic SEO if empty
      ...(field === 'title' && !prev.ogTitle && { ogTitle: value }),
      ...(field === 'title' && !prev.twitterTitle && { twitterTitle: value }),
      ...(field === 'description' && !prev.ogDescription && { ogDescription: value }),
      ...(field === 'description' && !prev.twitterDescription && { twitterDescription: value }),
    }));
  };

  const generateMetaTags = () => {
    const tags = [];

    // Basic SEO tags
    if (metaData.title) {
      tags.push(`<title>${metaData.title}</title>`);
      tags.push(`<meta name="title" content="${metaData.title}" />`);
    }
    if (metaData.description) {
      tags.push(`<meta name="description" content="${metaData.description}" />`);
    }
    if (metaData.keywords) {
      tags.push(`<meta name="keywords" content="${metaData.keywords}" />`);
    }
    if (metaData.author) {
      tags.push(`<meta name="author" content="${metaData.author}" />`);
    }
    if (metaData.canonical) {
      tags.push(`<link rel="canonical" href="${metaData.canonical}" />`);
    }
    tags.push(`<meta name="robots" content="${metaData.robots}" />`);
    tags.push(`<meta name="viewport" content="${metaData.viewport}" />`);

    // Open Graph tags
    if (metaData.ogTitle) {
      tags.push(`<meta property="og:title" content="${metaData.ogTitle}" />`);
    }
    if (metaData.ogDescription) {
      tags.push(`<meta property="og:description" content="${metaData.ogDescription}" />`);
    }
    if (metaData.ogImage) {
      tags.push(`<meta property="og:image" content="${metaData.ogImage}" />`);
    }
    if (metaData.ogUrl) {
      tags.push(`<meta property="og:url" content="${metaData.ogUrl}" />`);
    }
    tags.push(`<meta property="og:type" content="${metaData.ogType}" />`);

    // Twitter Card tags
    tags.push(`<meta name="twitter:card" content="${metaData.twitterCard}" />`);
    if (metaData.twitterTitle) {
      tags.push(`<meta name="twitter:title" content="${metaData.twitterTitle}" />`);
    }
    if (metaData.twitterDescription) {
      tags.push(`<meta name="twitter:description" content="${metaData.twitterDescription}" />`);
    }
    if (metaData.twitterImage) {
      tags.push(`<meta name="twitter:image" content="${metaData.twitterImage}" />`);
    }
    if (metaData.twitterCreator) {
      tags.push(`<meta name="twitter:creator" content="${metaData.twitterCreator}" />`);
    }
    if (metaData.twitterSite) {
      tags.push(`<meta name="twitter:site" content="${metaData.twitterSite}" />`);
    }

    return tags.join('\n');
  };

  const handleCopy = () => {
    const metaTags = generateMetaTags();
    navigator.clipboard.writeText(metaTags).then(() => {
      setCopied(true);
      toast.success('Meta tags copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      toast.error('Failed to copy meta tags');
    });
  };

  const getCharacterCount = (text) => {
    return text ? text.length : 0;
  };

  const getTitleStatus = () => {
    const count = getCharacterCount(metaData.title);
    if (count === 0) return { status: 'empty', message: 'Title is required' };
    if (count < 30) return { status: 'warning', message: 'Title is too short' };
    if (count > 60) return { status: 'error', message: 'Title is too long' };
    return { status: 'success', message: 'Title length is optimal' };
  };

  const getDescriptionStatus = () => {
    const count = getCharacterCount(metaData.description);
    if (count === 0) return { status: 'empty', message: 'Description is required' };
    if (count < 120) return { status: 'warning', message: 'Description is too short' };
    if (count > 160) return { status: 'error', message: 'Description is too long' };
    return { status: 'success', message: 'Description length is optimal' };
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-100">Meta Tags Generator</h1>
        <p className="text-gray-400">
          Generate meta tags for better SEO and social media sharing
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid grid-cols-3 gap-4 bg-transparent">
              <TabsTrigger
                value="basic"
                className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-500"
              >
                Basic SEO
              </TabsTrigger>
              <TabsTrigger
                value="og"
                className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500"
              >
                Open Graph
              </TabsTrigger>
              <TabsTrigger
                value="twitter"
                className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-500"
              >
                Twitter Card
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <TabsContent value="basic">
                <Card className="p-6 space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>Title</Label>
                      <span className={`text-sm ${
                        getTitleStatus().status === 'success' ? 'text-green-500' :
                        getTitleStatus().status === 'warning' ? 'text-yellow-500' :
                        getTitleStatus().status === 'error' ? 'text-red-500' :
                        'text-gray-500'
                      }`}>
                        {getCharacterCount(metaData.title)}/60
                      </span>
                    </div>
                    <Input
                      value={metaData.title}
                      onChange={(e) => handleChange('title', e.target.value)}
                      placeholder="Page Title"
                      className="bg-gray-800/50"
                    />
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Info className="w-4 h-4" />
                      {getTitleStatus().message}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>Description</Label>
                      <span className={`text-sm ${
                        getDescriptionStatus().status === 'success' ? 'text-green-500' :
                        getDescriptionStatus().status === 'warning' ? 'text-yellow-500' :
                        getDescriptionStatus().status === 'error' ? 'text-red-500' :
                        'text-gray-500'
                      }`}>
                        {getCharacterCount(metaData.description)}/160
                      </span>
                    </div>
                    <Textarea
                      value={metaData.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                      placeholder="Page description"
                      rows={3}
                      className="bg-gray-800/50"
                    />
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Info className="w-4 h-4" />
                      {getDescriptionStatus().message}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Keywords</Label>
                    <Input
                      value={metaData.keywords}
                      onChange={(e) => handleChange('keywords', e.target.value)}
                      placeholder="keyword1, keyword2, keyword3"
                      className="bg-gray-800/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Author</Label>
                    <Input
                      value={metaData.author}
                      onChange={(e) => handleChange('author', e.target.value)}
                      placeholder="Author name"
                      className="bg-gray-800/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Canonical URL</Label>
                    <Input
                      value={metaData.canonical}
                      onChange={(e) => handleChange('canonical', e.target.value)}
                      placeholder="https://example.com"
                      className="bg-gray-800/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Robots</Label>
                    <Select
                      value={metaData.robots}
                      onValueChange={(value) => handleChange('robots', value)}
                    >
                      <SelectTrigger className="bg-gray-800/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="index, follow">Index, Follow</SelectItem>
                        <SelectItem value="noindex, follow">NoIndex, Follow</SelectItem>
                        <SelectItem value="index, nofollow">Index, NoFollow</SelectItem>
                        <SelectItem value="noindex, nofollow">NoIndex, NoFollow</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="og">
                <Card className="p-6 space-y-6">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={metaData.ogTitle}
                      onChange={(e) => handleChange('ogTitle', e.target.value)}
                      placeholder="Open Graph title"
                      className="bg-gray-800/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={metaData.ogDescription}
                      onChange={(e) => handleChange('ogDescription', e.target.value)}
                      placeholder="Open Graph description"
                      rows={3}
                      className="bg-gray-800/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Image URL</Label>
                    <Input
                      value={metaData.ogImage}
                      onChange={(e) => handleChange('ogImage', e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      type="url"
                      className="bg-gray-800/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>URL</Label>
                    <Input
                      value={metaData.ogUrl}
                      onChange={(e) => handleChange('ogUrl', e.target.value)}
                      placeholder="https://example.com"
                      type="url"
                      className="bg-gray-800/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select
                      value={metaData.ogType}
                      onValueChange={(value) => handleChange('ogType', value)}
                    >
                      <SelectTrigger className="bg-gray-800/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="website">Website</SelectItem>
                        <SelectItem value="article">Article</SelectItem>
                        <SelectItem value="product">Product</SelectItem>
                        <SelectItem value="profile">Profile</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="twitter">
                <Card className="p-6 space-y-6">
                  <div className="space-y-2">
                    <Label>Card Type</Label>
                    <Select
                      value={metaData.twitterCard}
                      onValueChange={(value) => handleChange('twitterCard', value)}
                    >
                      <SelectTrigger className="bg-gray-800/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="summary">Summary</SelectItem>
                        <SelectItem value="summary_large_image">Summary Large Image</SelectItem>
                        <SelectItem value="app">App</SelectItem>
                        <SelectItem value="player">Player</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={metaData.twitterTitle}
                      onChange={(e) => handleChange('twitterTitle', e.target.value)}
                      placeholder="Twitter Card title"
                      className="bg-gray-800/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={metaData.twitterDescription}
                      onChange={(e) => handleChange('twitterDescription', e.target.value)}
                      placeholder="Twitter Card description"
                      rows={3}
                      className="bg-gray-800/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Image URL</Label>
                    <Input
                      value={metaData.twitterImage}
                      onChange={(e) => handleChange('twitterImage', e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      type="url"
                      className="bg-gray-800/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Creator (@username)</Label>
                    <Input
                      value={metaData.twitterCreator}
                      onChange={(e) => handleChange('twitterCreator', e.target.value)}
                      placeholder="@username"
                      className="bg-gray-800/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Site (@username)</Label>
                    <Input
                      value={metaData.twitterSite}
                      onChange={(e) => handleChange('twitterSite', e.target.value)}
                      placeholder="@site"
                      className="bg-gray-800/50"
                    />
                  </div>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-100">Preview</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Meta Tags
                    </>
                  )}
                </Button>
              </div>

              <div className="space-y-4">
                {metaData.ogImage && (
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900/50">
                    <img
                      src={metaData.ogImage}
                      alt="Open Graph preview"
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        setImageError(true);
                        e.target.src = 'https://placehold.co/1200x630/374151/9CA3AF/png?text=Preview+Image';
                      }}
                    />
                    {imageError && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80">
                        <div className="text-center space-y-2">
                          <AlertCircle className="w-8 h-8 text-yellow-500 mx-auto" />
                          <p className="text-sm text-gray-400">Failed to load image</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <h4 className="text-xl font-semibold text-blue-500 truncate">
                    {metaData.title || 'Page Title'}
                  </h4>
                  <p className="text-gray-400 line-clamp-2">
                    {metaData.description || 'Page description will appear here...'}
                  </p>
                  <p className="text-gray-500 text-sm truncate">
                    {metaData.ogUrl || metaData.canonical || 'https://example.com'}
                  </p>
                </div>
              </div>

              <div className="relative">
                <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm text-gray-100 whitespace-pre-wrap">
                    {generateMetaTags()}
                  </code>
                </pre>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-100">SEO Tips</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-gray-400">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Keep titles under 60 characters for optimal display in search results</span>
                </li>
                <li className="flex items-start gap-2 text-gray-400">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Meta descriptions should be between 150-160 characters</span>
                </li>
                <li className="flex items-start gap-2 text-gray-400">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Use high-quality images of at least 1200x630 pixels for social sharing</span>
                </li>
                <li className="flex items-start gap-2 text-gray-400">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Include relevant keywords naturally in titles and descriptions</span>
                </li>
                <li className="flex items-start gap-2 text-gray-400">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Use unique meta tags for each page on your website</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MetaTags;