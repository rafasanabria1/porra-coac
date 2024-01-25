import type {Agrupacion} from "@/lib/types";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {AccordionContent, AccordionTrigger} from "@/components/ui/accordion";

export default async function AcordeonModalidad({
  titulo,
  agrupaciones,
}: {
  titulo: string;
  agrupaciones: Agrupacion[];
}) {
  return (
    <>
      <AccordionTrigger>{titulo}</AccordionTrigger>
      <AccordionContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {agrupaciones.map((agrupacion) => {
          return (
            <Card key={agrupacion.id}>
              <CardHeader>
                <img alt={agrupacion.nombre} src="https://placehold.co/600x400" />
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
