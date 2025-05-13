
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Safely serializes an object by removing non-serializable values
 */
export function safeSerialize(obj: any): any {
  if (obj === null || obj === undefined) {
    return null;
  }
  
  if (typeof obj !== 'object' && typeof obj !== 'function' && typeof obj !== 'symbol') {
    return obj;
  }
  
  if (typeof obj === 'function' || typeof obj === 'symbol') {
    return null;
  }
  
  if (Array.isArray(obj)) {
    return obj
      .map(item => safeSerialize(item))
      .filter(item => item !== null && item !== undefined);
  }
  
  const result: Record<string, any> = {};
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    if (value !== undefined && value !== null && 
        typeof value !== 'function' && typeof value !== 'symbol') {
      result[key] = safeSerialize(value);
    }
  }
  
  return result;
}
