import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(path: string | null | undefined): string {
  if (!path) return "/placeholder.png"; // Fallback image
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  // Handle legacy local assets if they don't have the prefix yet, 
  // but if path is just a filename "saree.jpg", assume it's in assets for now 
  // until fully migrated. 
  if (path.startsWith("/src/assets/")) return path;
  return `/src/assets/${path}`;
}
