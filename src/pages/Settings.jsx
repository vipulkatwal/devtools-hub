import React from "react";
import { Moon, Sun, Layout, Eye, Monitor, Palette } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Settings = () => {
  const [theme, setTheme] = React.useState("system");
  const [fontSize, setFontSize] = React.useState("14");
  const [autoSave, setAutoSave] = React.useState(true);
  const [lineNumbers, setLineNumbers] = React.useState(true);
  const [wordWrap, setWordWrap] = React.useState(true);
  const [minimap, setMinimap] = React.useState(false);

  const themes = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

  const fontSizes = [
    { value: "12", label: "12px" },
    { value: "14", label: "14px" },
    { value: "16", label: "16px" },
    { value: "18", label: "18px" },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            Settings
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Customize your development environment
          </p>
        </div>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Theme</Label>
              <div className="grid grid-cols-3 gap-4">
                {themes.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.value}
                      onClick={() => setTheme(item.value)}
                      className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-colors ${
                        theme === item.value
                          ? "border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-400"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Font Size</Label>
              <Select value={fontSize} onValueChange={setFontSize}>
                <SelectTrigger>
                  <SelectValue placeholder="Select font size" />
                </SelectTrigger>
                <SelectContent>
                  {fontSizes.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Editor Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layout className="w-5 h-5" />
              Editor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto Save</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Automatically save changes as you type
                </p>
              </div>
              <Switch
                checked={autoSave}
                onCheckedChange={setAutoSave}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Line Numbers</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Show line numbers in the editor
                </p>
              </div>
              <Switch
                checked={lineNumbers}
                onCheckedChange={setLineNumbers}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Word Wrap</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Wrap long lines to fit in the editor
                </p>
              </div>
              <Switch
                checked={wordWrap}
                onCheckedChange={setWordWrap}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Minimap</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Show code overview on the right side
                </p>
              </div>
              <Switch
                checked={minimap}
                onCheckedChange={setMinimap}
              />
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="text-gray-900 dark:text-gray-100" style={{ fontSize: `${fontSize}px` }}>
                This is how your text will look
              </p>
              <p className="mt-2 text-gray-600 dark:text-gray-300" style={{ fontSize: `${fontSize}px` }}>
                With different styles and colors
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;