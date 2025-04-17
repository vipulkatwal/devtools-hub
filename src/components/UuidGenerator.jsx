import { useState } from 'react';
import { v4 as uuidv4, v1 as uuidv1 } from 'uuid';
import { Copy, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';

const UuidGenerator = () => {
  const [uuids, setUuids] = useState([uuidv4()]);
  const [version, setVersion] = useState('v4');
  const [count, setCount] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [noDashes, setNoDashes] = useState(false);

  const generateUuid = () => {
    return version === 'v4' ? uuidv4() : uuidv1();
  };

  const formatUuid = (uuid) => {
    let formatted = uuid;
    if (uppercase) {
      formatted = formatted.toUpperCase();
    }
    if (noDashes) {
      formatted = formatted.replace(/-/g, '');
    }
    return formatted;
  };

  const generateUuids = () => {
    const newUuids = Array.from({ length: count }, () => formatUuid(generateUuid()));
    setUuids(newUuids);
  };

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`UUID ${index + 1} copied to clipboard!`);
    } catch (err) {
      toast.error('Failed to copy UUID');
    }
  };

  const copyAll = async () => {
    try {
      const text = uuids.join('\n');
      await navigator.clipboard.writeText(text);
      toast.success('All UUIDs copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy UUIDs');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Select value={version} onValueChange={setVersion}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Version" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="v4">UUID v4</SelectItem>
              <SelectItem value="v1">UUID v1</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
            className="w-24"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              id="uppercase"
              checked={uppercase}
              onCheckedChange={setUppercase}
            />
            <Label htmlFor="uppercase">Uppercase</Label>
          </div>

          <div className="flex items-center gap-2">
            <Switch
              id="no-dashes"
              checked={noDashes}
              onCheckedChange={setNoDashes}
            />
            <Label htmlFor="no-dashes">No Dashes</Label>
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-4">
        <Button onClick={generateUuids} className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4" />
          Generate
        </Button>
        <Button onClick={copyAll} variant="outline" className="flex items-center gap-2">
          <Copy className="w-4 h-4" />
          Copy All
        </Button>
      </div>

      <div className="space-y-3">
        {uuids.map((uuid, index) => (
          <div
            key={index}
          >
            <Alert>
              <AlertDescription className="flex items-center justify-between font-mono">
                {uuid}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(uuid, index)}
                  className="ml-2"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UuidGenerator;