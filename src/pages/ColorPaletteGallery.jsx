import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import ColorPaletteCard from "./ColorPaletteCard";

const palettes = [
  {
    colors: ["#F7F6E7", "#2B5D8C", "#183642", "#E1B465"],
    likes: 48,
    age: "10 hours",
  },
  {
    colors: ["#FFE3A3", "#C96A5A", "#8B2C39", "#5B162B"],
    likes: 160,
    age: "Yesterday",
  },
  {
    colors: ["#3B0016", "#6B0F1A", "#B91372", "#F763A4"],
    likes: 315,
    age: "2 days",
  },
  {
    colors: ["#FFF6E6", "#F7C948", "#F78C1F", "#F76C1F"],
    likes: 357,
    age: "3 days",
  },
  {
    colors: ["#F9F9F6", "#F6F6E7", "#E6F6B6", "#A6D672"],
    likes: 448,
    age: "4 days",
  },
  {
    colors: ["#6B7A3A", "#A6B672", "#F6F6E7", "#E1B465"],
    likes: 662,
    age: "5 days",
  },
  {
    colors: ["#23282D", "#353B43", "#A69B89", "#E6DCC3"],
    likes: 792,
    age: "6 days",
  },
  {
    colors: ["#FF8FCF", "#FFB3E6", "#F7F6E7", "#A6D6E7"],
    likes: 861,
    age: "1 week",
  },
];

export default function ColorPaletteGallery() {
  const [search, setSearch] = useState("");

  const filtered = palettes.filter((p) =>
    p.colors.join(" ").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto pt-8">
      <div className="px-2 md:px-0 mb-8">
        <Input
          placeholder="Search palettes"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-full bg-white border border-gray-200 shadow-sm px-5 py-3 text-base focus:ring-2 focus:ring-blue-200"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
        {filtered.map((palette, idx) => (
          <ColorPaletteCard key={idx} {...palette} />
        ))}
      </div>
    </div>
  );
}