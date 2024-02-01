import type {Database} from "@database";

import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const hashtag: Record<Database["public"]["Enums"]["fase"], string> = {
  preliminar: "",
  cuartos: "#PORRACOAC2024Cuartos",
  semifinal: "#PORRACOAC2024Semifinales",
  final: "#PORRACOAC2024GranFinal",
};
