import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from 'react-hot-toast';
import { Search, Copy, Smile } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

// Lucide icon categories
const lucideCategories = {
  'Actions': ['Play', 'Pause', 'Stop', 'Download', 'Upload', 'Share', 'Edit', 'Trash', 'Save', 'Refresh'],
  'Navigation': ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'ChevronLeft', 'ChevronRight', 'Home'],
  'Communication': ['Mail', 'Phone', 'MessageCircle', 'Bell', 'Send', 'Share2', 'Link', 'Globe'],
  'Media': ['Image', 'Video', 'Music', 'Camera', 'Mic', 'Volume', 'Volume1', 'Volume2'],
  'Files': ['File', 'FileText', 'FilePlus', 'FileMinus', 'FileCheck', 'Folder', 'FolderPlus', 'Archive'],
  'UI Elements': ['Settings', 'Search', 'Filter', 'Layout', 'Sidebar', 'Menu', 'Grid', 'List'],
  'Weather': ['Sun', 'Moon', 'Cloud', 'CloudRain', 'CloudSnow', 'Wind', 'Umbrella', 'Thermometer'],
  'Devices': ['Smartphone', 'Tablet', 'Laptop', 'Desktop', 'Printer', 'Tv', 'Monitor', 'Watch'],
  'Development': ['Code', 'Terminal', 'GitBranch', 'Database', 'Server', 'Bug', 'Cpu'],
  'Social': ['Github', 'Twitter', 'Facebook', 'Instagram', 'Linkedin', 'Youtube', 'Twitch', 'Discord']
};

// Dev-relevant emojis
const emojiCategories = {
  'Development': [
    { emoji: '👨‍💻', name: 'technologist', description: 'Developer' },
    { emoji: '🐛', name: 'bug', description: 'Bug' },
    { emoji: '✨', name: 'sparkles', description: 'New Feature' },
    { emoji: '🚀', name: 'rocket', description: 'Deploy' },
    { emoji: '🔥', name: 'fire', description: 'Hot Fix' },
    { emoji: '⚡', name: 'zap', description: 'Performance' },
    { emoji: '🔧', name: 'wrench', description: 'Fix' },
    { emoji: '📦', name: 'package', description: 'Package' },
    { emoji: '🎨', name: 'art', description: 'UI/Design' },
    { emoji: '🏗️', name: 'building_construction', description: 'Infrastructure' }
  ],
  'Git': [
    { emoji: '🔀', name: 'twisted_rightwards_arrows', description: 'Merge' },
    { emoji: '⏪', name: 'rewind', description: 'Revert' },
    { emoji: '🔖', name: 'bookmark', description: 'Tag' },
    { emoji: '🌿', name: 'herb', description: 'Branch' },
    { emoji: '💾', name: 'floppy_disk', description: 'Save' }
  ],
  'Testing': [
    { emoji: '✅', name: 'white_check_mark', description: 'Pass' },
    { emoji: '❌', name: 'x', description: 'Fail' },
    { emoji: '⚠️', name: 'warning', description: 'Warning' },
    { emoji: '🧪', name: 'test_tube', description: 'Test' },
    { emoji: '🔍', name: 'mag', description: 'Review' }
  ],
  'Documentation': [
    { emoji: '📝', name: 'memo', description: 'Note' },
    { emoji: '📚', name: 'books', description: 'Docs' },
    { emoji: '💡', name: 'bulb', description: 'Idea' },
    { emoji: '📖', name: 'book', description: 'Guide' },
    { emoji: '🔗', name: 'link', description: 'Reference' }
  ]
};

const IconPicker = () => {
  const [activeTab, setActiveTab] = useState('lucide');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredIcons, setFilteredIcons] = useState([]);
  const [filteredEmojis, setFilteredEmojis] = useState([]);
  const [hoveredIcon, setHoveredIcon] = useState(null);

  useEffect(() => {
    if (activeTab === 'lucide') {
      filterIcons();
    } else {
      filterEmojis();
    }
  }, [searchTerm, selectedCategory, activeTab]);

  const filterIcons = () => {
    let icons = [];

    if (selectedCategory === 'All') {
      icons = Object.values(lucideCategories).flat();
    } else {
      icons = lucideCategories[selectedCategory] || [];
    }

    if (searchTerm) {
      icons = icons.filter(icon =>
        icon.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredIcons(icons);
  };

  const filterEmojis = () => {
    let emojis = [];

    if (selectedCategory === 'All') {
      emojis = Object.values(emojiCategories).flat();
    } else {
      emojis = emojiCategories[selectedCategory] || [];
    }

    if (searchTerm) {
      emojis = emojis.filter(emoji =>
        emoji.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emoji.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredEmojis(emojis);
  };

  const copyIconName = (iconName) => {
    navigator.clipboard.writeText(iconName);
    toast.success(`Copied ${iconName} to clipboard`);
  };

  const copyIconJSX = (iconName) => {
    const jsx = `import { ${iconName} } from 'lucide-react';`;
    navigator.clipboard.writeText(jsx);
    toast.success(`Copied import statement to clipboard`);
  };

  const copyEmoji = (emoji) => {
    navigator.clipboard.writeText(emoji.emoji);
    toast.success(`Copied ${emoji.description} emoji to clipboard`);
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Icon & Emoji Picker</h1>

      <Tabs defaultValue="lucide" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="lucide">Lucide Icons</TabsTrigger>
          <TabsTrigger value="emoji">Dev Emojis</TabsTrigger>
        </TabsList>

        <Card>
          <CardHeader>
            <CardTitle>Search {activeTab === 'lucide' ? 'Icons' : 'Emojis'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={`Search ${activeTab === 'lucide' ? 'icons' : 'emojis'}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  {Object.keys(activeTab === 'lucide' ? lucideCategories : emojiCategories).map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <TabsContent value="lucide" className="space-y-4">
          <Card>
            <CardContent className="py-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredIcons.map((iconName) => {
                  const IconComponent = LucideIcons[iconName];
                  if (!IconComponent) return null;

                  return (
                    <div
                      key={iconName}
                      className="relative group"
                      onMouseEnter={() => setHoveredIcon(iconName)}
                      onMouseLeave={() => setHoveredIcon(null)}
                    >
                      <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors cursor-pointer">
                        <IconComponent className="w-8 h-8 text-primary mb-2" />
                        <span className="text-xs text-center text-gray-400 truncate w-full">
                          {iconName}
                        </span>
                      </div>
                      {hoveredIcon === iconName && (
                        <div className="absolute -top-2 -right-2 flex space-x-1">
                          <Button
                            size="icon"
                            variant="secondary"
                            className="h-6 w-6"
                            onClick={() => copyIconName(iconName)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                          <Button
                            size="icon"
                            variant="secondary"
                            className="h-6 w-6"
                            onClick={() => copyIconJSX(iconName)}
                          >
                            {'</>'}
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {filteredIcons.length === 0 && (
                <div className="text-center text-gray-400 py-8">
                  No icons found matching your search
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Installation</h3>
                <pre className="bg-secondary/50 p-4 rounded-lg">
                  npm install lucide-react
                </pre>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Import</h3>
                <pre className="bg-secondary/50 p-4 rounded-lg">
                  {`import { IconName } from 'lucide-react';`}
                </pre>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Usage</h3>
                <pre className="bg-secondary/50 p-4 rounded-lg">
                  {`<IconName className="w-6 h-6" />`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emoji" className="space-y-4">
          <Card>
            <CardContent className="py-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredEmojis.map((emoji) => (
                  <div
                    key={emoji.name}
                    className="relative group"
                    onMouseEnter={() => setHoveredIcon(emoji.name)}
                    onMouseLeave={() => setHoveredIcon(null)}
                  >
                    <div
                      className="flex flex-col items-center justify-center p-4 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors cursor-pointer"
                      onClick={() => copyEmoji(emoji)}
                    >
                      <span className="text-4xl mb-2" role="img" aria-label={emoji.name}>
                        {emoji.emoji}
                      </span>
                      <span className="text-xs text-center text-gray-400">
                        {emoji.description}
                      </span>
                    </div>
                    {hoveredIcon === emoji.name && (
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute -top-2 -right-2 h-6 w-6"
                        onClick={() => copyEmoji(emoji)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {filteredEmojis.length === 0 && (
                <div className="text-center text-gray-400 py-8">
                  No emojis found matching your search
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About Dev Emojis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                This collection includes commonly used emojis in development workflows, commit messages,
                and documentation. Click any emoji to copy it to your clipboard.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IconPicker;