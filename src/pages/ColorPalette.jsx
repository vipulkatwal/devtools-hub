import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import chroma from 'chroma-js';
import ColorPaletteCard from './ColorPaletteCard';

function generateRandomPalette(numColors = 4) {
  return Array.from({ length: numColors }, () => chroma.random().hex());
}

function randomAge() {
  const ages = [
    '10 hours', 'Yesterday', '2 days', '3 days', '4 days', '5 days', '6 days', '1 week'
  ];
  return ages[Math.floor(Math.random() * ages.length)];
}

function randomLikes() {
  return Math.floor(Math.random() * 1000) + 20;
}

const PALETTES_COUNT = 4;

const ColorPalette = () => {
  const [palettes, setPalettes] = useState(() =>
    Array.from({ length: PALETTES_COUNT }, () => ({
      colors: generateRandomPalette(4),
      likes: randomLikes(),
      age: randomAge(),
    }))
  );

  function regeneratePalettes() {
    setPalettes(
      Array.from({ length: PALETTES_COUNT }, () => ({
        colors: generateRandomPalette(4),
        likes: randomLikes(),
        age: randomAge(),
      }))
    );
  }

  return (
    <div className="space-y-8">
      <div
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Color Palette Generator
        </h1>
        <p className="text-gray-400">Generate beautiful color palettes for your projects</p>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={regeneratePalettes}
          className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Generate Random
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
        {palettes.map((palette, idx) => (
          <ColorPaletteCard key={idx} {...palette} />
        ))}
      </div>
    </div>
  );
};

export default ColorPalette;