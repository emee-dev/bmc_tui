import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type RoboHashSet = "set1" | "set2" | "set3" | "set4" | "any";

interface RoboHashOptions {
  /**
   * Choose a set for different styles: 'set1' (robots), 'set2' (monsters), etc.
   */
  set?: RoboHashSet;
  /**
   * Image size in the format 'widthxheight', e.g., '300x300'
   */
  size?: `${number}x${number}`;
  bgset?: "bg1" | "bg2";
}

export function fakeImage(input: string, options?: RoboHashOptions): string {
  const params = new URLSearchParams();

  if (options?.set && options.set !== "any") params.append("set", options.set);
  if (options?.size) params.append("size", options.size);
  if (options?.bgset) params.append("bgset", options.bgset);

  const query = params.toString();
  return `https://robohash.org/${input.trim()}.png${query ? `?${query}` : ""}`;
}

export const wait = async (sec: number) => {
  return new Promise((resolve) => setTimeout(resolve, sec));
};
