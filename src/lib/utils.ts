import type {Database} from "@database";

import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const hashtags: Record<Database["public"]["Enums"]["fase"], string> = {
  preliminar: "",
  cuartos: "#PORRACOAC2024Cuartos",
  semifinal: "#PORRACOAC2024Semifinales",
  final: "#PORRACOAC2024GranFinal",
};

export const indexToPremio = (index: number | undefined) => {
  switch (index) {
    case 0:
      return "Primer premio";
    case 1:
      return "Segundo premio";
    case 2:
      return "Tercer premio";
    case 3:
      return "Cuarto premio";
    default:
      return "";
  }
};
