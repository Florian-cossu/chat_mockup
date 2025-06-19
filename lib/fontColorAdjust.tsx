/**
 * Pick black or white for best contrast with a given background color.
 * @param hexColor
 * @returns "#000000" or "#FFFFFF"
 */
export function getContrastColor(hexColor: string): string {
  // Remove "#" if present
  const hex = hexColor.replace("#", "");

  // Parse r, g, b
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Use YIQ formula to get perceived brightness
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  // Return black for bright backgrounds, white for dark backgrounds
  return yiq >= 128 ? "#000000" : "#FFFFFF";
}
