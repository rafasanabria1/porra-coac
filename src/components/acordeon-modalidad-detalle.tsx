import type {AgrupacionEntityExtended} from "@types";

import Image from "next/image";
import {YoutubeIcon} from "lucide-react";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {AccordionContent, AccordionTrigger} from "@/components/ui/accordion";

export default async function AcordeonModalidad({
  titulo,
  agrupaciones,
}: {
  titulo: string;
  agrupaciones: AgrupacionEntityExtended[];
}) {
  return (
    <>
      <AccordionTrigger>{titulo}</AccordionTrigger>
      <AccordionContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {agrupaciones.map((agrupacion) => {
          const hasActuacion =
            agrupacion.actuaciones?.preliminares ||
            agrupacion.actuaciones?.cuartos ||
            agrupacion.actuaciones?.semifinales ||
            agrupacion.actuaciones?.final;

          return (
            <Card key={agrupacion.id} className="flex flex-col">
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
                <CardTitle className="text-pretty">{agrupacion.nombre}</CardTitle>

                <CardDescription className="h-4">{agrupacion.localidad}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-1">
                <section className="flex flex-1 flex-col">
                  {agrupacion.letra ? <span>Autor de letra: {agrupacion.letra}</span> : null}
                  {agrupacion.musica ? <span>Autor de musica: {agrupacion.musica}</span> : null}
                  {agrupacion.direccion ? <span>Dirección: {agrupacion.direccion}</span> : null}
                </section>
                {hasActuacion ? (
                  <section className="mt-4">
                    <header className="flex items-center justify-center gap-2">
                      <YoutubeIcon />
                      <h3 className="text-sm font-semibold">Actuaciones en el concurso</h3>
                    </header>
                    <main className="flex flex-col gap-2 text-xs lg:flex-row">
                      {agrupacion.actuaciones?.preliminares ? (
                        <article>
                          <a
                            className="font-semibold underline"
                            href={`https://www.youtube.com/watch?v=${agrupacion.actuaciones.preliminares}`}
                            rel="noopener"
                            target="_blank"
                          >
                            Preliminares
                          </a>
                        </article>
                      ) : null}
                      {agrupacion.actuaciones?.cuartos ? (
                        <article>
                          <a
                            className="font-semibold underline"
                            href={`https://www.youtube.com/watch?v=${agrupacion.actuaciones.cuartos}`}
                            rel="noopener"
                            target="_blank"
                          >
                            Cuartos de final
                          </a>
                        </article>
                      ) : null}
                      {agrupacion.actuaciones?.semifinales ? (
                        <article>
                          <a
                            className="font-semibold underline"
                            href={`https://www.youtube.com/watch?v=${agrupacion.actuaciones.semifinales}`}
                            rel="noopener"
                            target="_blank"
                          >
                            Semifinales
                          </a>
                        </article>
                      ) : null}
                      {agrupacion.actuaciones?.final ? (
                        <article>
                          <a
                            className="font-semibold underline"
                            href={`https://www.youtube.com/watch?v=${agrupacion.actuaciones.final}`}
                            rel="noopener"
                            target="_blank"
                          >
                            Final
                          </a>
                        </article>
                      ) : null}
                    </main>
                  </section>
                ) : null}
              </CardContent>
            </Card>
          );
        })}
      </AccordionContent>
    </>
  );
}
