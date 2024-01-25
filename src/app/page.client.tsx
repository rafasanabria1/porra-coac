"use client";
import type {Agrupacion} from "@/lib/types";
import type * as z from "zod";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";

import {FormSchema} from "@/lib/types";
import {Accordion, AccordionItem} from "@/components/ui/accordion";
import AcordeonModalidadPorra from "@/components/acordeon-modalidad-porra";
import {Form} from "@/components/ui/form";

export default function AgrupacionesClient({agrupaciones}: {agrupaciones: Agrupacion[]}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      comparsas: [],
      chirigotas: [],
      coros: [],
      cuartetos: [],
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const url = new URL("/api/copy-image", window.location.origin);

    url.searchParams.append("username", data.username);
    url.searchParams.append("comparsas", data.comparsas.toString());
    url.searchParams.append("chirigotas", data.chirigotas.toString());
    url.searchParams.append("coros", data.coros.toString());
    url.searchParams.append("cuartetos", data.cuartetos.toString());
    const image = await fetch(url.toString()).then((data) => data.blob());

    await navigator.clipboard.write([new ClipboardItem({[image.type]: image})]);
  };

  const comparsas = agrupaciones.filter((agrupacion) => agrupacion.modalidad === "comparsa");
  const chirigotas = agrupaciones.filter((agrupacion) => agrupacion.modalidad === "chirigota");
  const coros = agrupaciones.filter((agrupacion) => agrupacion.modalidad === "coro");
  const cuartetos = agrupaciones.filter((agrupacion) => agrupacion.modalidad === "cuarteto");

  return (
    <Form {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form className="mx-auto grid max-w-xl gap-16" onSubmit={form.handleSubmit(onSubmit)}>
        <section>
          <Accordion collapsible type="single">
            <AccordionItem value="comparsas">
              <AcordeonModalidadPorra
                agrupaciones={comparsas}
                form={form}
                formIndex="comparsas"
                titulo="Comparsas"
                totalPosibles={20}
                totalSeleccionados={form.watch("comparsas").length}
              />
            </AccordionItem>
            <AccordionItem value="chirigotas">
              <AcordeonModalidadPorra
                agrupaciones={chirigotas}
                form={form}
                formIndex="chirigotas"
                titulo="Chirigotas"
                totalPosibles={20}
                totalSeleccionados={form.watch("chirigotas").length}
              />
            </AccordionItem>
            <AccordionItem value="coros">
              <AcordeonModalidadPorra
                agrupaciones={coros}
                form={form}
                formIndex="coros"
                titulo="Coros"
                totalPosibles={10}
                totalSeleccionados={form.watch("coros").length}
              />
            </AccordionItem>
            <AccordionItem value="cuartetos">
              <AcordeonModalidadPorra
                agrupaciones={cuartetos}
                form={form}
                formIndex="cuartetos"
                titulo="Cuartetos"
                totalPosibles={6}
                totalSeleccionados={form.watch("cuartetos").length}
              />
            </AccordionItem>
          </Accordion>
        </section>
      </form>
    </Form>
  );
}
