export const THEMES = [
  {
    color1: "#0ea5e9", // sky-400
    color2: "#4338ca", // indigo-700
  },
  {
    color1: "#f97316", // orange-500
    color2: "#b91c1c", // red-700
  },
  {
    color1: "#22c55e", // green-500
    color2: "#16a34a", // green-600
  },
  {
    color1: "#ec4899", // pink-500
    color2: "#7e22ce", // purple-800
  },
  {
    color1: "#06b6d4", // cyan-500
    color2: "#0f766e", // teal-700
  },
  {
    color1: "#facc15", // yellow-400
    color2: "#b45309", // amber-700
  },
  {
    color1: "#8b5cf6", // violet-500
    color2: "#4c1d95", // violet-900
  },
  {
    color1: "#fb7185", // rose-400
    color2: "#be123c", // rose-700
  },
  {
    color1: "#38bdf8", // sky-400
    color2: "#0ea5e9", // sky-500 (softer transition)
  },
  {
    color1: "#14b8a6", // teal-500
    color2: "#0d9488", // teal-600
  },
  {
    color1: "#f43f5e", // rose-500
    color2: "#b91c1c", // red-700
  },
];

export function getRandomTheme() {
  const idx = Math.floor(Math.random() * THEMES.length);
  return THEMES[idx];
}