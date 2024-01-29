import type {Database} from "../../types/database";
import type {Tables} from "./types";
import type {QueryData} from "@supabase/supabase-js";

import {createClient} from "@supabase/supabase-js";
import {QueryResult, QueryError} from "@supabase/supabase-js";

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const api = {
  agrupaciones: {
    list: async (): Promise<Tables<"agrupaciones">[]> => {
      const {data, error} = await supabase
        .from("actuaciones")
        .select("agrupaciones(*)")
        .order("fecha", {ascending: true})
        .order("orden", {ascending: true});

      if (error) {
        throw new Error(error.message);
      }
      type CountriesWithCities = QueryData<typeof countriesWithCitiesQuery>;

      const agrupaciones: Tables<"agrupaciones">[] = data.agrupaciones;

      return agrupaciones;
    },
    listFilterByModalidad: async (modalidad = ""): Promise<Tables<"agrupaciones">[]> => {
      const {data: agrupaciones, error} = await supabase
        .from("agrupaciones")
        .select("*")
        .eq("modalidad", modalidad);

      if (error) {
        throw new Error(error.message);
      }

      return agrupaciones;
    },
    listSortedByName: async (): Promise<Tables<"agrupaciones">[]> => {
      const {data: agrupaciones, error} = await supabase
        .from("agrupaciones")
        .select("*")
        .order("nombre", {ascending: true});

      if (error) {
        throw new Error(error.message);
      }

      return agrupaciones;
    },
    get: async (id: string): Promise<Tables<"agrupaciones">> => {
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
