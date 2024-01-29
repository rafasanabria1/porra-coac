import type {Database} from "../../types/database";

import * as z from "zod";

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type TablesInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];

export type TablesUpdate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];

export type Enums<T extends keyof Database["public"]["Enums"]> = Database["public"]["Enums"][T];

export const FormSchema = z.object({
  username: z.string().min(3, {
    message: "El nombre de usuario debe tener al menos 3 caracteres.",
  }),
  comparsas: z.array(z.string()).refine((value) => value.length <= 20, {
    message: "No puedes seleccionar más de 20 comparsas.",
  }),
  chirigotas: z.array(z.string()).refine((value) => value.length <= 20, {
    message: "No puedes seleccionar más de 20 chirigotas.",
  }),
  coros: z.array(z.string()).refine((value) => value.length <= 10, {
    message: "No puedes seleccionar más de 10 coros.",
  }),
  cuartetos: z.array(z.string()).refine((value) => value.length <= 6, {
    message: "No puedes seleccionar más de 6 cuartetos.",
  }),
});
