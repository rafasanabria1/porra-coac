import type {Agrupacion} from "./types";

import agrupaciones from "@/data/agrupaciones.json";
import preliminares from "@/data/preliminares.json";
import cuartos from "@/data/cuartos.json";

export const api = {
  agrupaciones: {
    list: async (modalidad = ""): Promise<Agrupacion[]> => {
      if (modalidad !== "") {
        return Promise.resolve(
          agrupaciones.filter((agrupacion) => agrupacion.modalidad === modalidad),
        );
      }

      return Promise.resolve(agrupaciones);
    },
    listByName: async (modalidad = ""): Promise<Agrupacion[]> => {
      const agrupaciones = await api.agrupaciones.list(modalidad);

      return agrupaciones.sort((a, b) => a.nombre.localeCompare(b.nombre));
    },
    get: async (id: string): Promise<Agrupacion | undefined> => {
      const agrupaciones = await api.agrupaciones.list();

      return agrupaciones.find((agrupacion) => agrupacion.id === id);
    },
    getPreliminares: async (modalidad = ""): Promise<Agrupacion[]> => {
      const agrupacionesPromises = preliminares
        .sort((a, b) => {
          return a.fecha.localeCompare(b.fecha) || a.orden - b.orden;
        })
        .map((actuacion) => {
          return api.agrupaciones.get(actuacion.agrupacionID);
        });
      const agrupaciones: (Agrupacion | undefined)[] = await Promise.all(agrupacionesPromises);

      agrupaciones.filter((agrupacion) => agrupacion !== undefined);

      if (modalidad !== "") {
        return agrupaciones.filter((agrupacion) => agrupacion!.modalidad === modalidad);
      }

      return agrupaciones;
    },
    getCuartos: async (modalidad = ""): Promise<Agrupacion[]> => {
      const agrupacionesPromises = cuartos
        .sort((a, b) => {
          return a.fecha.localeCompare(b.fecha) || a.orden - b.orden;
        })
        .map((actuacion) => {
          return api.agrupaciones.get(actuacion.agrupacionID);
        });
      const agrupaciones: (Agrupacion | undefined)[] = await Promise.all(agrupacionesPromises);

      agrupaciones.filter((agrupacion) => agrupacion !== undefined);

      if (modalidad !== "") {
        return agrupaciones.filter((agrupacion) => agrupacion!.modalidad === modalidad);
      }

      return agrupaciones;
    },
  },
};
