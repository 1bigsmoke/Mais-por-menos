import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * shadcn/ui canonical class-name helper (`@/lib/utils`).
 * Components copied from shadcn/ui import `cn` from here.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
