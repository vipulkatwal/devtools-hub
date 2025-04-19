import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

const BoxShadowGenerator = ({ onCopy }) => {
  const [shadowSettings, setShadowSettings] = useState({
    offsetX: 5,
    offsetY: 5,
    blur: 10,
    spread: 0,
    color: '#00000040',
    inset: false,
  });

  const generateCSS = () => {
    const { offsetX, offsetY, blur, spread, color, inset } = shadowSettings;
    return `.element {
  box-shadow: ${inset ? 'inset ' : ''}${offsetX}px ${offsetY}px ${blur}px ${spread}px ${color};
}`;
  };

  const handleSliderChange = (name, value) => {
    setShadowSettings((prev) => ({
      ...prev,
      [name]: value[0],
    }));
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Offset X ({shadowSettings.offsetX}px)</Label>
              <Slider
                value={[shadowSettings.offsetX]}
                onValueChange={(value) => handleSliderChange('offsetX', value)}
                min={-50}
                max={50}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <Label>Offset Y ({shadowSettings.offsetY}px)</Label>
              <Slider
                value={[shadowSettings.offsetY]}
                onValueChange={(value) => handleSliderChange('offsetY', value)}
                min={-50}
                max={50}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <Label>Blur ({shadowSettings.blur}px)</Label>
              <Slider
                value={[shadowSettings.blur]}
                onValueChange={(value) => handleSliderChange('blur', value)}
                min={0}
                max={100}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <Label>Spread ({shadowSettings.spread}px)</Label>
              <Slider
                value={[shadowSettings.spread]}
                onValueChange={(value) => handleSliderChange('spread', value)}
                min={-50}
                max={50}
                step={1}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Color</Label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={shadowSettings.color}
                  onChange={(e) =>
                    setShadowSettings({ ...shadowSettings, color: e.target.value })
                  }
                  placeholder="#000000"
                />
                <Input
                  type="color"
                  value={shadowSettings.color.slice(0, 7)}
                  onChange={(e) =>
                    setShadowSettings({ ...shadowSettings, color: e.target.value + '40' })
                  }
                  className="w-12 p-1 h-9"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="inset"
                checked={shadowSettings.inset}
                onCheckedChange={(checked) =>
                  setShadowSettings({ ...shadowSettings, inset: checked })
                }
              />
              <Label htmlFor="inset">Inset Shadow</Label>
            </div>
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
              className="w-32 h-32 bg-blue-500 rounded-lg"
              style={{
                boxShadow: `${shadowSettings.inset ? 'inset ' : ''}${
                  shadowSettings.offsetX
                }px ${shadowSettings.offsetY}px ${shadowSettings.blur}px ${
                  shadowSettings.spread
                }px ${shadowSettings.color}`,
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

export default BoxShadowGenerator;