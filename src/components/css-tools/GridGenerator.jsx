import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { Input } from '@/components/ui/input';

const GridGenerator = ({ onCopy }) => {
  const [gridSettings, setGridSettings] = useState({
    columns: '3',
    rows: '2',
    gap: '1rem',
    justifyItems: 'stretch',
    alignItems: 'stretch',
    justifyContent: 'start',
    alignContent: 'start',
  });

  const gridItems = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    color: [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-yellow-500',
      'bg-red-500',
    ][i],
  }));

  const generateCSS = () => {
    return `.container {
  display: grid;
  grid-template-columns: repeat(${gridSettings.columns}, 1fr);
  grid-template-rows: repeat(${gridSettings.rows}, 1fr);
  gap: ${gridSettings.gap};
  justify-items: ${gridSettings.justifyItems};
  align-items: ${gridSettings.alignItems};
  justify-content: ${gridSettings.justifyContent};
  align-content: ${gridSettings.alignContent};
}`;
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Columns</label>
            <Input
              type="number"
              min="1"
              max="12"
              value={gridSettings.columns}
              onChange={(e) =>
                setGridSettings({ ...gridSettings, columns: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Rows</label>
            <Input
              type="number"
              min="1"
              max="12"
              value={gridSettings.rows}
              onChange={(e) =>
                setGridSettings({ ...gridSettings, rows: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Gap</label>
            <Input
              type="text"
              value={gridSettings.gap}
              onChange={(e) =>
                setGridSettings({ ...gridSettings, gap: e.target.value })
              }
              placeholder="1rem"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Justify Items</label>
            <Select
              value={gridSettings.justifyItems}
              onValueChange={(value) =>
                setGridSettings({ ...gridSettings, justifyItems: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="start">Start</SelectItem>
                <SelectItem value="end">End</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="stretch">Stretch</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Align Items</label>
            <Select
              value={gridSettings.alignItems}
              onValueChange={(value) =>
                setGridSettings({ ...gridSettings, alignItems: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="start">Start</SelectItem>
                <SelectItem value="end">End</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="stretch">Stretch</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Justify Content</label>
            <Select
              value={gridSettings.justifyContent}
              onValueChange={(value) =>
                setGridSettings({ ...gridSettings, justifyContent: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="start">Start</SelectItem>
                <SelectItem value="end">End</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="space-between">Space Between</SelectItem>
                <SelectItem value="space-around">Space Around</SelectItem>
                <SelectItem value="space-evenly">Space Evenly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Align Content</label>
            <Select
              value={gridSettings.alignContent}
              onValueChange={(value) =>
                setGridSettings({ ...gridSettings, alignContent: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="start">Start</SelectItem>
                <SelectItem value="end">End</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="space-between">Space Between</SelectItem>
                <SelectItem value="space-around">Space Around</SelectItem>
                <SelectItem value="space-evenly">Space Evenly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-100">Preview</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCopy(generateCSS())}
              className="flex items-center gap-2"
            >
              <Copy className="w-4 h-4" />
              Copy CSS
            </Button>
          </div>

          <div
            className="min-h-[300px] border border-gray-800 rounded-lg p-4"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${gridSettings.columns}, 1fr)`,
              gridTemplateRows: `repeat(${gridSettings.rows}, 1fr)`,
              gap: gridSettings.gap,
              justifyItems: gridSettings.justifyItems,
              alignItems: gridSettings.alignItems,
              justifyContent: gridSettings.justifyContent,
              alignContent: gridSettings.alignContent,
            }}
          >
            {gridItems.map((item) => (
              <div
                key={item.id}
                className={`w-full h-16 rounded-lg ${item.color} flex items-center justify-center text-white font-medium`}
              >
                {item.id}
              </div>
            ))}
          </div>

          <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
            <code className="text-sm text-gray-100">{generateCSS()}</code>
          </pre>
        </div>
      </Card>
    </div>
  );
};

export default GridGenerator;