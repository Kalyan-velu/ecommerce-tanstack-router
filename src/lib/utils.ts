import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// biome-ignore lint/suspicious/noExplicitAny: Generic function type requires 'any' for flexible parameter types in debounce utility
export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  delay: number,
) => {
  let timer: ReturnType<typeof setTimeout> | number | null = null;

  return (...args: Parameters<F>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, delay, ...args);
  };
};
