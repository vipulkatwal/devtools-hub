import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, RefreshCw, Check } from 'lucide-react';
import chroma from 'chroma-js';
import * as wcagContrast from 'wcag-contrast';
import { toast } from 'sonner';

const ColorPalette = () => {
  const [colors, setColors] = useState(() => generateRandomColors(5));
  const [copiedIndex, setCopiedIndex] = useState(null);

  function generateRandomColors(count) {
    return Array.from({ length: count }, () => chroma.random().hex());
  }

  function generateThemeColors(baseColor) {
    const base = chroma(baseColor);
    return [
      base.brighten(2).hex(),
      base.brighten(1).hex(),
      base.hex(),
      base.darken(1).hex(),
      base.darken(2).hex(),
    ];
  }

  function copyToClipboard(text, index) {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success('Color code copied to clipboard!');
    setTimeout(() => setCopiedIndex(null), 2000);
  }

  function getContrastRatio(color) {
    const whiteContrast = wcagContrast.hex(color, '#FFFFFF');
    const blackContrast = wcagContrast.hex(color, '#000000');
    return {
      withWhite: whiteContrast.toFixed(2),
      withBlack: blackContrast.toFixed(2),
      bestText: whiteContrast > blackContrast ? '#FFFFFF' : '#000000'
    };
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Color Palette Generator
        </h1>
        <p className="text-gray-400">Generate beautiful color palettes for your projects</p>
      </motion.div>

      <div className="flex justify-center gap-4 mb-8">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setColors(generateRandomColors(5))}
          className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Generate Random
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {colors.map((color, index) => {
          const contrastInfo = getContrastRatio(color);
          return (
            <motion.div
              key={color + index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div
                className="h-48 rounded-lg shadow-lg cursor-pointer transition-transform hover:scale-105"
                style={{ backgroundColor: color }}
                onClick={() => copyToClipboard(color, index)}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-lg">
                  {copiedIndex === index ? (
                    <Check className="w-6 h-6 text-green-400" />
                  ) : (
                    <Copy className="w-6 h-6 text-white" />
                  )}
                </div>
              </div>
              <div className="mt-4 space-y-2 text-center">
                <p className="font-mono text-white">{color}</p>
                <div className="text-sm text-gray-400">
                  <p>White text: {contrastInfo.withWhite}:1</p>
                  <p>Black text: {contrastInfo.withBlack}:1</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ColorPalette;