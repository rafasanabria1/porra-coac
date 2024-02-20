import type {Database} from "@database";
import type {
  Actuaciones,
  AgrupacionCuartosEntity,
  AgrupacionEntity,
  AgrupacionEntityExtended,
  AgrupacionFinalEntity,
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
    finalByOrder: async () => {
      const {data: agrupaciones, error} = await supabase
        .from("final")
        .select("fecha, orden, ...agrupaciones(id, nombre, modalidad)")
        .order("fecha", {
          ascending: true,
        })
        .order("orden", {
          ascending: true,
        })
        .returns<AgrupacionFinalEntity[]>();

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
    list: async (extended = false): Promise<AgrupacionEntityExtended[]> => {
      const {data: agrupaciones, error} = await supabase
        .from("agrupaciones")
        .select("*")
        .returns<AgrupacionEntity[]>();

      if (error) {
        throw new Error(error.message);
      }

      if (!extended) return agrupaciones;

      const promises = agrupaciones.map(async (agrupacion) => {
        const actuaciones = await api.agrupaciones.getActuaciones(agrupacion.id);

        return {
          ...agrupacion,
          actuaciones,
        };
      });

      return Promise.all(promises);
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
    getActuaciones: async (id: string): Promise<Actuaciones> => {
      const {data: preliminares} = await supabase
        .from("preliminares")
        .select("youtube_id")
        .eq("agrupacion_id", id)
        .single();

      const {data: cuartos} = await supabase
        .from("cuartos")
        .select("youtube_id")
        .eq("agrupacion_id", id)
        .single();

      const {data: semifinales} = await supabase
        .from("semifinales")
        .select("youtube_id")
        .eq("agrupacion_id", id)
        .single();

      const {data: final} = await supabase
        .from("final")
        .select("youtube_id")
        .eq("agrupacion_id", id)
        .single();

      return {
        preliminares: preliminares?.youtube_id ?? null,
        cuartos: cuartos?.youtube_id ?? null,
        semifinales: semifinales?.youtube_id ?? null,
        final: final?.youtube_id ?? null,
      };
    },
  },
};
