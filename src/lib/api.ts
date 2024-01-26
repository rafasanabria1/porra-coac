import type {Agrupacion} from "./types";

import agrupaciones from "@/data/agrupaciones.json";

export const api = {
  agrupaciones: {
    list: async (): Promise<Agrupacion[]> => {
      agrupaciones.sort((a, b) => a.orden - b.orden);

      return Promise.resolve(agrupaciones);
    },
    get: async (id: string): Promise<Agrupacion | undefined> => {
      const agrupaciones = await api.agrupaciones.list();

      return agrupaciones.find((agrupacion) => agrupacion.id === id);
    },
  },
};
