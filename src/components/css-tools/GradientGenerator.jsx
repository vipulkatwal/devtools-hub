import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

const GradientGenerator = ({ onCopy }) => {
  const [gradientSettings, setGradientSettings] = useState({
    type: 'linear',
    angle: 90,
    colors: [
      { color: '#3b82f6', position: 0 },
      { color: '#8b5cf6', position: 100 },
    ],
  });

  const generateCSS = () => {
    const { type, angle, colors } = gradientSettings;
    const sortedColors = [...colors].sort((a, b) => a.position - b.position);
    const colorStops = sortedColors
      .map((c) => `${c.color} ${c.position}%`)
      .join(', ');

    return `.element {
  background: ${type}-gradient(${
      type === 'linear' ? `${angle}deg` : 'circle'
    }, ${colorStops});
}`;
  };

  const addColor = () => {
    if (gradientSettings.colors.length >= 5) return;
    const newColor = {
      color: '#ffffff',
      position: 50,
    };
    setGradientSettings({
      ...gradientSettings,
      colors: [...gradientSettings.colors, newColor],
    });
  };

  const removeColor = (index) => {
    if (gradientSettings.colors.length <= 2) return;
    const newColors = gradientSettings.colors.filter((_, i) => i !== index);
    setGradientSettings({
      ...gradientSettings,
      colors: newColors,
    });
  };

  const updateColor = (index, field, value) => {
    const newColors = [...gradientSettings.colors];
    newColors[index] = {
      ...newColors[index],
      [field]: value,
    };
    setGradientSettings({
      ...gradientSettings,
      colors: newColors,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Gradient Type</Label>
              <Select
                value={gradientSettings.type}
                onValueChange={(value) =>
                  setGradientSettings({ ...gradientSettings, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="linear">Linear</SelectItem>
                  <SelectItem value="radial">Radial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {gradientSettings.type === 'linear' && (
              <div className="space-y-2">
                <Label>Angle ({gradientSettings.angle}°)</Label>
                <Slider
                  value={[gradientSettings.angle]}
                  onValueChange={(value) =>
                    setGradientSettings({ ...gradientSettings, angle: value[0] })
                  }
                  min={0}
                  max={360}
                  step={1}
                />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Color Stops</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={addColor}
                disabled={gradientSettings.colors.length >= 5}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Color
              </Button>
            </div>

            {gradientSettings.colors.map((color, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  type="color"
                  value={color.color}
                  onChange={(e) => updateColor(index, 'color', e.target.value)}
                  className="w-12 p-1 h-9"
                />
                <Input
                  type="text"
                  value={color.color}
                  onChange={(e) => updateColor(index, 'color', e.target.value)}
                  className="flex-1"
                  placeholder="#000000"
                />
                <Input
                  type="number"
                  value={color.position}
                  onChange={(e) =>
                    updateColor(index, 'position', parseInt(e.target.value) || 0)
                  }
                  min="0"
                  max="100"
                  className="w-20"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeColor(index)}
                  disabled={gradientSettings.colors.length <= 2}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
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

          <div className="flex items-center justify-center min-h-[200px] bg-gray-900/50 rounded-lg p-8">
            <div
              className="w-full h-32 rounded-lg"
              style={{
                background: `${gradientSettings.type}-gradient(${
                  gradientSettings.type === 'linear'
                    ? `${gradientSettings.angle}deg`
                    : 'circle'
                }, ${gradientSettings.colors
                  .sort((a, b) => a.position - b.position)
                  .map((c) => `${c.color} ${c.position}%`)
                  .join(', ')})`,
              }}
            />
          </div>

          <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
            <code className="text-sm text-gray-100">{generateCSS()}</code>
          </pre>
        </div>
      </Card>
    </div>
  );
};

export default GradientGenerator;