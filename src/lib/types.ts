import * as z from "zod";

export interface Agrupacion {
  id: string;
  modalidad: string;
  anyo: number;
  nombre: string;
  letra: string;
  musica: string;
  direccion: string;
  localidad: string;
  enlace: string;
  cabezaDeSerie: boolean;
  videoPreliminares: string;
}

export interface Actuacion {
  id: string;
  agrupacionId: string;
  fecha: Date;
  fase: "preliminares" | "cuartos" | "semifinales" | "final";
  orden: number;
  cabezaDeSerie: boolean;
  video: string;
}

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
