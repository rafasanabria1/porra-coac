import type {Database} from "@database";
import type {
  AgrupacionCuartosEntity,
  AgrupacionEntity,
  AgrupacionPreliminaresEntity,
  AgrupacionSemifinalesEntity,
} from "@types";

import {createClient} from "@supabase/supabase-js";

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const api = {
  agrupaciones: {
    preliminaresByOrder: async () => {
      const {data: agrupaciones, error} = await supabase
        .from("preliminares")
        .select("fecha, orden, ...agrupaciones(id, nombre, modalidad)")
        .order("fecha", {
          ascending: true,
        })
        .order("orden", {
          ascending: true,
        })
        .returns<AgrupacionPreliminaresEntity[]>();

      if (error) {
        throw new Error(error.message);
      }

      return agrupaciones;
    },
    cuartosByOrder: async () => {
      const {data: agrupaciones, error} = await supabase
        .from("cuartos")
        .select("fecha, orden, ...agrupaciones(id, nombre, modalidad)")
        .order("fecha", {
          ascending: true,
        })
        .order("orden", {
          ascending: true,
        })
        .returns<AgrupacionCuartosEntity[]>();

      if (error) {
        throw new Error(error.message);
      }

      return agrupaciones;
    },
    semifinalesByOrder: async () => {
      const {data: agrupaciones, error} = await supabase
        .from("semifinales")
        .select("fecha, orden, ...agrupaciones(id, nombre, modalidad)")
        .order("fecha", {
          ascending: true,
        })
        .order("orden", {
          ascending: true,
        })
        .returns<AgrupacionSemifinalesEntity[]>();

      if (error) {
        throw new Error(error.message);
      }

      return agrupaciones;
    },
    listFilterByModalidad: async (modalidad: string) => {
      const {data: agrupaciones, error} = await supabase
        .from("agrupaciones")
        .select("*")
        .eq("modalidad", modalidad)
        .returns<AgrupacionEntity[]>();

      if (error) {
        throw new Error(error.message);
      }

      return agrupaciones;
    },
    list: async () => {
      const {data: agrupaciones, error} = await supabase
        .from("agrupaciones")
        .select("*")
        .returns<AgrupacionEntity[]>();

      if (error) {
        throw new Error(error.message);
      }

      return agrupaciones;
    },
    get: async (id: string) => {
      const {data: agrupacion, error} = await supabase
        .from("agrupaciones")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return agrupacion;
    },
  },
};
