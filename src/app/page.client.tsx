"use client";
import type {Agrupacion} from "@/lib/types";
import type * as z from "zod";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";

import {FormSchema} from "@/lib/types";
import {Accordion, AccordionItem} from "@/components/ui/accordion";
import AcordeonModalidadPorra from "@/components/acordeon-modalidad-porra";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Form, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";

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

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log("submit");
    console.log(data);

    return data;
  };

  const comparsas = agrupaciones
    .filter((agrupacion) => agrupacion.modalidad === "comparsa")
    .toSorted((a, b) => a.nombre.localeCompare(b.nombre));
  const chirigotas = agrupaciones
    .filter((agrupacion) => agrupacion.modalidad === "chirigota")
    .toSorted((a, b) => a.nombre.localeCompare(b.nombre));
  const coros = agrupaciones
    .filter((agrupacion) => agrupacion.modalidad === "coro")
    .toSorted((a, b) => a.nombre.localeCompare(b.nombre));
  const cuartetos = agrupaciones
    .filter((agrupacion) => agrupacion.modalidad === "cuarteto")
    .toSorted((a, b) => a.nombre.localeCompare(b.nombre));

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
        <section className="mx-auto  w-full max-w-4xl ">
          <FormField
            control={form.control}
            name="username"
            render={({field}) => (
              <FormItem className="flex-1">
                <FormLabel>Nombre de usuario a mostrar al compartir la porra</FormLabel>
                <div className="flex flex-row items-center justify-center space-x-4">
                  <Input placeholder="carnaval_cadiz" type="text" {...field} />
                  <Button type="submit">Copiar imagen</Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
      </form>
    </Form>
  );
}
