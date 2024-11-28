import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidId(str: string) {
  const regex = /^[a-f0-9]{24}$/i;
  return regex.test(str);
}
