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

export function getTimestampDiffs(date1: string | Date, date2: string | Date) {
  const dateOne = new Date(date1);
  const dateTwo = new Date(date2);
  
  if (isNaN(dateOne.getTime()) || isNaN(dateTwo.getTime())) {
    throw new Error('Dates invalides');
  }
  
  const diffMs = Math.abs(dateOne.getTime() - dateTwo.getTime());
  
  return {
    days: Math.floor(diffMs / 86400000),
    hours: Math.floor((diffMs % 86400000) / 3600000), 
    minutes: Math.floor(((diffMs % 86400000) % 3600000) / 60000),
    seconds: Math.floor((((diffMs % 86400000) % 3600000) % 60000) / 1000),
    totalMinutes: Math.floor(diffMs / 60000),
    totalMs: diffMs
  };
}

export function getTimestampDiffsDuration(date1: string | Date, date2: string | Date) {
  const dateOne = new Date(date1);
  const dateTwo = new Date(date2);
  
  // Vérification de validité des dates
  if (isNaN(dateOne.getTime()) || isNaN(dateTwo.getTime())) {
    throw new Error('Dates invalides');
  }
  
  const diffMs = Math.abs(dateOne.getTime() - dateTwo.getTime());
  
  return {
    days: Math.floor(diffMs / 86400000),
    hours: Math.floor((diffMs % 86400000) / 3600000), 
    minutes: Math.floor(((diffMs % 86400000) % 3600000) / 60000),
    seconds: Math.floor((((diffMs % 86400000) % 3600000) % 60000) / 1000)
  };
}