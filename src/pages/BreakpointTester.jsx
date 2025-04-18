import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Smartphone, Tablet, Monitor, Laptop, RefreshCw, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

const devices = [
  {
    name: 'Mobile S',
    width: 320,
    height: 568,
    icon: Smartphone,
    scale: 0.7
  },
  {
    name: 'Mobile L',
    width: 425,
    height: 768,
    icon: Smartphone,
    scale: 0.7
  },
  {
    name: 'Tablet',
    width: 768,
    height: 1024,
    icon: Tablet,
    scale: 0.5
  },
  {
    name: 'Laptop',
    width: 1024,
    height: 768,
    icon: Laptop,
    scale: 0.4
  },
  {
    name: 'Desktop',
    width: 1440,
    height: 900,
    icon: Monitor,
    scale: 0.35
  }
];

// Function to convert regular URLs to embeddable URLs
const getEmbedUrl = (url) => {
  try {
    const urlObj = new URL(url);

    // YouTube handling
    if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
      let videoId = '';
      if (urlObj.hostname.includes('youtube.com')) {
        videoId = urlObj.searchParams.get('v');
      } else {
        videoId = urlObj.pathname.slice(1);
      }
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    return url;
  } catch (error) {
    return url;
  }
};

const BreakpointTester = () => {
  const [url, setUrl] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [showRuler, setShowRuler] = useState(true);
  const [orientation, setOrientation] = useState('portrait');
  const [selectedDevices, setSelectedDevices] = useState(devices.map(d => d.name));
  const [isLoading, setIsLoading] = useState(false);
  const [frameErrors, setFrameErrors] = useState({});

  const validateUrl = (input) => {
    try {
      new URL(input);
      setIsValidUrl(true);
      return true;
    } catch {
      setIsValidUrl(false);
      return false;
    }
  };

  const handleUrlChange = (e) => {
    const input = e.target.value;
    setUrl(input);
    validateUrl(input);
    // Clear previous errors when URL changes
    setFrameErrors({});
  };

  const loadUrl = () => {
    if (!validateUrl(url)) {
      toast.error('Please enter a valid URL');
      return;
    }
    setIsLoading(true);
    setFrameErrors({}); // Clear errors on reload
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const toggleDevice = (deviceName) => {
    setSelectedDevices(prev =>
      prev.includes(deviceName)
        ? prev.filter(d => d !== deviceName)
        : [...prev, deviceName]
    );
  };

  const handleFrameError = (deviceName) => {
    setFrameErrors(prev => ({
      ...prev,
      [deviceName]: true
    }));

    // Show different messages for different URLs
    const urlObj = new URL(url);
    if (urlObj.hostname.includes('youtube.com') && !url.includes('/embed/')) {
      toast.error('For YouTube, please use the "Share" > "Embed" URL or just paste the normal video URL');
    } else {
      toast.error(`Cannot embed ${url} in ${deviceName} view due to security restrictions`);
    }
  };

  const embedUrl = getEmbedUrl(url);

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Responsive Breakpoint Tester</h1>

      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Enter website URL (e.g., https://example.com or YouTube URL)"
                value={url}
                onChange={handleUrlChange}
                className={!isValidUrl && url ? 'border-red-500' : ''}
              />
              <div className="flex items-start gap-2 mt-2">
                <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Some websites may not allow embedding. For YouTube, you can paste the regular video URL.
                </p>
              </div>
            </div>
            <Button onClick={loadUrl} disabled={!isValidUrl || isLoading}>
              {isLoading ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                'Load URL'
              )}
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="ruler"
                checked={showRuler}
                onCheckedChange={setShowRuler}
              />
              <Label htmlFor="ruler">Show Rulers</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Label>Orientation:</Label>
              <Button
                variant={orientation === 'portrait' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setOrientation('portrait')}
              >
                Portrait
              </Button>
              <Button
                variant={orientation === 'landscape' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setOrientation('landscape')}
              >
                Landscape
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {devices.map((device) => (
              <Button
                key={device.name}
                variant={selectedDevices.includes(device.name) ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleDevice(device.name)}
              >
                <device.icon className="w-4 h-4 mr-2" />
                {device.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {url && isValidUrl && (
        <div className="space-y-4 overflow-x-auto pb-4">
          <div className="flex flex-wrap gap-8 justify-center min-w-max p-4">
            {devices
              .filter(device => selectedDevices.includes(device.name))
              .map((device) => {
                const width = orientation === 'portrait' ? device.width : device.height;
                const height = orientation === 'portrait' ? device.height : device.width;

                return (
                  <div
                    key={device.name}
                    className="flex flex-col items-center space-y-2"
                  >
                    <span className="text-sm font-medium text-gray-400">
                      {device.name} ({width}x{height})
                    </span>
                    <div
                      className="relative bg-secondary/50 rounded-lg overflow-hidden"
                      style={{
                        width: width * device.scale,
                        height: height * device.scale
                      }}
                    >
                      {showRuler && (
                        <>
                          <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10" />
                          <div className="absolute top-0 left-0 h-full w-4 bg-gradient-to-b from-primary/10 via-primary/5 to-primary/10" />
                        </>
                      )}
                      {frameErrors[device.name] ? (
                        <div className="w-full h-full flex items-center justify-center p-4 text-center text-sm text-muted-foreground">
                          This website cannot be embedded due to security restrictions
                        </div>
                      ) : (
                        <iframe
                          src={embedUrl}
                          title={`Preview - ${device.name}`}
                          className="w-full h-full border-0 transform"
                          style={{
                            transform: `scale(${device.scale})`,
                            transformOrigin: '0 0',
                          }}
                          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          onError={() => handleFrameError(device.name)}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default BreakpointTester;