import React, { useState } from "react";
import { Heart, Copy, Check } from "lucide-react";
import { toast } from "sonner";

export default function ColorPaletteCard({ colors, likes, age }) {
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const handleCopy = (color, idx) => {
    navigator.clipboard.writeText(color);
    setCopiedIdx(idx);
    toast.success(`Copied ${color}`);
    setTimeout(() => setCopiedIdx(null), 1200);
  };

  // Utility to determine best text color for contrast
  function getContrastText(bgColor) {
    if (!bgColor) return '#222';
    // Simple luminance check
    const hex = bgColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.6 ? '#222' : '#fff';
  }

  return (
    <div className="flex flex-col items-center w-full transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg group">
      <div className="w-full aspect-square rounded-2xl border border-gray-200 bg-white overflow-hidden flex flex-col transition-all duration-200 group-hover:border-blue-400">
        {colors.map((color, i) => (
          <button
            key={i}
            style={{ background: color, flex: 1, position: 'relative' }}
            className="w-full focus:outline-none group/color relative"
            title={`Copy ${color}`}
            onClick={() => handleCopy(color, i)}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {/* Copy icon */}
            {copiedIdx === i ? (
              <span className="absolute right-2 top-2 bg-white/80 rounded-full p-1 flex items-center gap-1 text-xs text-blue-600 shadow z-10">
                <Check className="w-3 h-3" /> Copied
              </span>
            ) : (
              <span className="absolute right-2 top-2 bg-white/80 rounded-full p-1 flex items-center gap-1 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <Copy className="w-3 h-3" />
              </span>
            )}
            {/* Hex value on hover */}
            {hoveredIdx === i && (
              <span
                className="absolute inset-0 flex items-center justify-center z-10"
                style={{ color: getContrastText(color) }}
              >
                <span className="text-lg font-bold tracking-wide bg-black/10 px-3 py-1 rounded-md shadow">
                  {color}
                </span>
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 mt-2">
        <div className="flex items-center gap-1 px-3 py-1 bg-white border border-gray-200 rounded-full text-gray-700 text-sm font-medium">
          <Heart className="w-4 h-4 mr-1" />
          {likes}
        </div>
        <div className="px-3 py-1 bg-white border border-gray-200 rounded-full text-gray-400 text-xs font-medium">
          {age}
        </div>
      </div>
    </div>
  );
}