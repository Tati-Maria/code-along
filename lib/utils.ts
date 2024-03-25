import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function splitTags(tags: string) {
  return tags.split(",").map((tag) => tag.trim());
}

export function shortenDescription(description: string) {
  return description.length > 100
    ? `${description.slice(0, 100)}...`
    : description;
}
