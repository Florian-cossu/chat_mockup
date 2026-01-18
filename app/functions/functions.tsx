import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

const MS_PER_DAY = 86400000;
const MS_PER_HOUR = 3600000;
const MS_PER_MINUTE = 60000;
const MS_PER_SECOND = 1000;

export function getTimestampDiffs(date1: string | Date, date2: string | Date) {
  const dateOne = new Date(date1);
  const dateTwo = new Date(date2);
  
  if (isNaN(dateOne.getTime()) || isNaN(dateTwo.getTime())) {
    throw new Error('Invalid dates');
  }
  
  const diffMs = Math.abs(dateOne.getTime() - dateTwo.getTime());
  
  return {
    days: Math.floor(diffMs / MS_PER_DAY),
    hours: Math.floor((diffMs % MS_PER_DAY) / MS_PER_HOUR),
    minutes: Math.floor((diffMs % MS_PER_HOUR) / MS_PER_MINUTE),
    seconds: Math.floor((diffMs % MS_PER_MINUTE) / MS_PER_SECOND),
    totalMinutes: Math.floor(diffMs / MS_PER_MINUTE),
    totalMs: diffMs,
  };
}