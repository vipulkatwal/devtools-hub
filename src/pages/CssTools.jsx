import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FlexboxGenerator from '@/components/css-tools/FlexboxGenerator';
import GridGenerator from '@/components/css-tools/GridGenerator';
import BoxShadowGenerator from '@/components/css-tools/BoxShadowGenerator';
import GradientGenerator from '@/components/css-tools/GradientGenerator';
import { toast } from 'sonner';

const CssTools = () => {
  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      toast.success('CSS code copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy code');
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-100">CSS Tools</h1>
        <p className="text-gray-400">
          A collection of tools to help you generate and visualize CSS properties
        </p>
      </div>

      <Tabs defaultValue="flexbox" className="w-full">
        <TabsList className="grid grid-cols-4 gap-4 bg-transparent">
          <TabsTrigger
            value="flexbox"
            className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-500"
          >
            Flexbox
          </TabsTrigger>
          <TabsTrigger
            value="grid"
            className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500"
          >
            Grid
          </TabsTrigger>
          <TabsTrigger
            value="box-shadow"
            className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-500"
          >
            Box Shadow
          </TabsTrigger>
          <TabsTrigger
            value="gradient"
            className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-500"
          >
            Gradient
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="flexbox">
            <FlexboxGenerator onCopy={handleCopyCode} />
          </TabsContent>
          <TabsContent value="grid">
            <GridGenerator onCopy={handleCopyCode} />
          </TabsContent>
          <TabsContent value="box-shadow">
            <BoxShadowGenerator onCopy={handleCopyCode} />
          </TabsContent>
          <TabsContent value="gradient">
            <GradientGenerator onCopy={handleCopyCode} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default CssTools;