import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'react-hot-toast';
import { Search, Copy } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const categories = {
  'Actions': ['Play', 'Pause', 'Stop', 'Download', 'Upload', 'Share', 'Edit', 'Trash', 'Save', 'Refresh'],
  'Navigation': ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'ChevronLeft', 'ChevronRight', 'Menu', 'Home'],
  'Communication': ['Mail', 'Phone', 'MessageCircle', 'Bell', 'Send', 'Share2', 'Link', 'Globe'],
  'Media': ['Image', 'Video', 'Music', 'Camera', 'Mic', 'Volume', 'Volume1', 'Volume2'],
  'Files': ['File', 'FileText', 'FilePlus', 'FileMinus', 'FileCheck', 'Folder', 'FolderPlus', 'Archive'],
  'UI Elements': ['Settings', 'Search', 'Filter', 'Layout', 'Sidebar', 'Menu', 'Grid', 'List'],
  'Weather': ['Sun', 'Moon', 'Cloud', 'CloudRain', 'CloudSnow', 'Wind', 'Umbrella', 'Thermometer'],
  'Devices': ['Smartphone', 'Tablet', 'Laptop', 'Desktop', 'Printer', 'Tv', 'Monitor', 'Watch'],
  'Development': ['Code', 'Terminal', 'GitBranch', 'Github', 'Database', 'Server', 'Bug', 'Cpu'],
  'Social': ['Github', 'Twitter', 'Facebook', 'Instagram', 'Linkedin', 'Youtube', 'Twitch', 'Discord']
};

const IconPicker = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredIcons, setFilteredIcons] = useState([]);
  const [hoveredIcon, setHoveredIcon] = useState(null);

  useEffect(() => {
    filterIcons();
  }, [searchTerm, selectedCategory]);

  const filterIcons = () => {
    let icons = [];

    if (selectedCategory === 'All') {
      icons = Object.values(categories).flat();
    } else {
      icons = categories[selectedCategory] || [];
    }

    if (searchTerm) {
      icons = icons.filter(icon =>
        icon.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredIcons(icons);
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

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Icon Picker</h1>

      <Card>
        <CardHeader>
          <CardTitle>Search Icons</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search icons..."
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
                {Object.keys(categories).map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

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
    </div>
  );
};

export default IconPicker;