import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sortByTimestamp<T extends { timestamp: string }>(
  arr: T[],
  order: "asc" | "desc" = "asc"
) {
  return [...arr].sort((a, b) =>
    order === "asc"
      ? new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      : new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}
