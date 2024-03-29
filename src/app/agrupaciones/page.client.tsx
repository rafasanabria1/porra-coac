import type {AgrupacionEntityExtended} from "@types";

import {Accordion, AccordionItem} from "@/components/ui/accordion";
import AcordeonModalidad from "@/components/acordeon-modalidad-detalle";
import {HeadingH2} from "@/components/ui/heading";

export default async function AgrupacionesClient({
  agrupaciones,
}: {
  agrupaciones: AgrupacionEntityExtended[];
}) {
  const comparsas = agrupaciones
    .filter((agrupacion) => agrupacion.modalidad === "comparsa")
    .sort((a, b) => a.nombre.localeCompare(b.nombre));
  const chirigotas = agrupaciones
    .filter((agrupacion) => agrupacion.modalidad === "chirigota")
    .sort((a, b) => a.nombre.localeCompare(b.nombre));
  const coros = agrupaciones
    .filter((agrupacion) => agrupacion.modalidad === "coro")
    .sort((a, b) => a.nombre.localeCompare(b.nombre));
  const cuartetos = agrupaciones
    .filter((agrupacion) => agrupacion.modalidad === "cuarteto")
    .sort((a, b) => a.nombre.localeCompare(b.nombre));

  return (
    <section>
      <HeadingH2>Agrupaciones participantes</HeadingH2>
      <Accordion collapsible type="single">
        <AccordionItem value="comparsas">
          <AcordeonModalidad agrupaciones={comparsas} titulo="Comparsas" />
        </AccordionItem>
        <AccordionItem value="chirigotas">
          <AcordeonModalidad agrupaciones={chirigotas} titulo="Chirigotas" />
        </AccordionItem>
        <AccordionItem value="coros">
          <AcordeonModalidad agrupaciones={coros} titulo="Coros" />
        </AccordionItem>
        <AccordionItem value="cuartetos">
          <AcordeonModalidad agrupaciones={cuartetos} titulo="Cuartetos" />
        </AccordionItem>
      </Accordion>
    </section>
  );
}
