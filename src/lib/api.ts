import type {Agrupacion} from "./types";

import comparsas from "@/data/detalles-comparsa.json";
import chirigotas from "@/data/detalles-chirigota.json";
import coros from "@/data/detalles-coro.json";
import cuartetos from "@/data/detalles-cuarteto.json";

export const api = {
  agrupaciones: {
    list: async (): Promise<Agrupacion[]> => {
      const agrupaciones = [...comparsas, ...chirigotas, ...coros, ...cuartetos].sort(
        (a, b) => a.orden - b.orden,
      );

      return Promise.resolve(agrupaciones);
    },
    get: async (id: string): Promise<Agrupacion | undefined> => {
      const agrupaciones = await api.agrupaciones.list();

      return agrupaciones.find((agrupacion) => agrupacion.id === id);
    },
  },
};
