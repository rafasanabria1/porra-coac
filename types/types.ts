import type {Database} from "./database";

export type AgrupacionEntity = Database["public"]["Tables"]["agrupaciones"]["Row"];
type PreliminaresEntity = Database["public"]["Tables"]["preliminares"]["Row"];
type CuartosEntity = Database["public"]["Tables"]["cuartos"]["Row"];
type SemifinalesEntity = Database["public"]["Tables"]["semifinales"]["Row"];
type FinalEntity = Database["public"]["Tables"]["final"]["Row"];

export type AgrupacionPreliminaresEntity = PreliminaresEntity & AgrupacionEntity;

export type AgrupacionCuartosEntity = CuartosEntity & AgrupacionEntity;

export type AgrupacionSemifinalesEntity = SemifinalesEntity & AgrupacionEntity;

export type AgrupacionFinalEntity = FinalEntity & AgrupacionEntity;

export interface Actuaciones {
  preliminares: string | null;
  cuartos: string | null;
  semifinales: string | null;
  final: string | null;
}

export type AgrupacionEntityExtended = AgrupacionEntity & {
  actuaciones?: Actuaciones;
};
