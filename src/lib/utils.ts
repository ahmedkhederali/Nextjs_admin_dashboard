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
