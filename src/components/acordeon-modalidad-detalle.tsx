import type {AgrupacionEntity} from "@types";

import Image from "next/image";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {AccordionContent, AccordionTrigger} from "@/components/ui/accordion";

export default async function AcordeonModalidad({
  titulo,
  agrupaciones,
}: {
  titulo: string;
  agrupaciones: AgrupacionEntity[];
}) {
  return (
    <>
      <AccordionTrigger>{titulo}</AccordionTrigger>
      <AccordionContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {agrupaciones.map((agrupacion) => {
          return (
            <Card key={agrupacion.id}>
              <CardHeader>
                <Image
                  alt={agrupacion.nombre}
                  height={300}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1024px) 33vw, (max-width: 1536px) 25vw, 20vw"
                  src={`/agrupaciones-images/${agrupacion.id}.jpg`}
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                  width={500}
                />
                <CardTitle>{agrupacion.nombre}</CardTitle>
                {agrupacion.localidad ? (
                  <CardDescription>{agrupacion.localidad}</CardDescription>
                ) : null}
              </CardHeader>
              <CardContent className="grid gap-1">
                {agrupacion.letra ? <span>Autor de letra: {agrupacion.letra}</span> : null}
                {agrupacion.musica ? <span>Autor de musica: {agrupacion.musica}</span> : null}
                {agrupacion.direccion ? <span>Dirección: {agrupacion.direccion}</span> : null}
              </CardContent>
            </Card>
          );
        })}
      </AccordionContent>
    </>
  );
}
