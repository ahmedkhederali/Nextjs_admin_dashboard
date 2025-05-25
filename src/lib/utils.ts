import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getGenderLabel = (gender: string, t: (key: string) => string) => {
  if (gender === "male") return t("male");
  if (gender === "female") return t("female");
  return gender;
};

export function parseErrorMessage(error: unknown): string {
  try {
    if (typeof error === 'string') {
      const parsed = JSON.parse(error);
      if (parsed?.message) return parsed.message;
      return error;
    }

    if (typeof error === 'object' && error !== null) {
      const message = (error as { message?: string }).message;
      if (typeof message === 'string') return message;
    }

    return 'Unknown error';
  } catch {
    return typeof error === 'string' ? error : 'Unknown error';
  }
}
