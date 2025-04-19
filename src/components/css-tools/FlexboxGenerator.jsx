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

const FlexboxGenerator = ({ onCopy }) => {
  const [flexSettings, setFlexSettings] = useState({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexWrap: 'nowrap',
    gap: '1rem',
  });

  const flexItems = [
    { id: 1, color: 'bg-blue-500' },
    { id: 2, color: 'bg-green-500' },
    { id: 3, color: 'bg-purple-500' },
    { id: 4, color: 'bg-pink-500' },
  ];

  const generateCSS = () => {
    return `.container {
  display: ${flexSettings.display};
  flex-direction: ${flexSettings.flexDirection};
  justify-content: ${flexSettings.justifyContent};
  align-items: ${flexSettings.alignItems};
  flex-wrap: ${flexSettings.flexWrap};
  gap: ${flexSettings.gap};
}`;
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Direction</label>
            <Select
              value={flexSettings.flexDirection}
              onValueChange={(value) =>
                setFlexSettings({ ...flexSettings, flexDirection: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="row">Row</SelectItem>
                <SelectItem value="row-reverse">Row Reverse</SelectItem>
                <SelectItem value="column">Column</SelectItem>
                <SelectItem value="column-reverse">Column Reverse</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Justify Content</label>
            <Select
              value={flexSettings.justifyContent}
              onValueChange={(value) =>
                setFlexSettings({ ...flexSettings, justifyContent: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flex-start">Flex Start</SelectItem>
                <SelectItem value="flex-end">Flex End</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="space-between">Space Between</SelectItem>
                <SelectItem value="space-around">Space Around</SelectItem>
                <SelectItem value="space-evenly">Space Evenly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Align Items</label>
            <Select
              value={flexSettings.alignItems}
              onValueChange={(value) =>
                setFlexSettings({ ...flexSettings, alignItems: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stretch">Stretch</SelectItem>
                <SelectItem value="flex-start">Flex Start</SelectItem>
                <SelectItem value="flex-end">Flex End</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="baseline">Baseline</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Flex Wrap</label>
            <Select
              value={flexSettings.flexWrap}
              onValueChange={(value) =>
                setFlexSettings({ ...flexSettings, flexWrap: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nowrap">No Wrap</SelectItem>
                <SelectItem value="wrap">Wrap</SelectItem>
                <SelectItem value="wrap-reverse">Wrap Reverse</SelectItem>
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
            className="min-h-[200px] border border-gray-800 rounded-lg p-4"
            style={{
              display: flexSettings.display,
              flexDirection: flexSettings.flexDirection,
              justifyContent: flexSettings.justifyContent,
              alignItems: flexSettings.alignItems,
              flexWrap: flexSettings.flexWrap,
              gap: flexSettings.gap,
            }}
          >
            {flexItems.map((item) => (
              <div
                key={item.id}
                className={`w-16 h-16 rounded-lg ${item.color} flex items-center justify-center text-white font-medium`}
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

export default FlexboxGenerator;