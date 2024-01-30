"use client";
import type {AgrupacionPreliminaresEntity} from "@types";

import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";

import {Accordion, AccordionItem} from "@/components/ui/accordion";
import AcordeonModalidadPorra from "@/components/acordeon-modalidad-porra";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Form, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import HeadingH2 from "@/components/ui/headingh2";
import HeadingH3 from "@/components/ui/headingh3";

export default function AgrupacionesClient({
  agrupaciones,
}: {
  agrupaciones: AgrupacionPreliminaresEntity[] | null;
}) {
  const FormSchema = z.object({
    username: z.string().min(3, {
      message: "El nombre de usuario debe tener al menos 3 caracteres.",
    }),
    comparsas: z.array(z.string()).refine((value) => value.length <= 20, {
      message: "No puedes seleccionar más de 20 comparsas.",
    }),
    chirigotas: z.array(z.string()).refine((value) => value.length <= 20, {
      message: "No puedes seleccionar más de 20 chirigotas.",
    }),
    coros: z.array(z.string()).refine((value) => value.length <= 10, {
      message: "No puedes seleccionar más de 10 coros.",
    }),
    cuartetos: z.array(z.string()).refine((value) => value.length <= 6, {
      message: "No puedes seleccionar más de 6 cuartetos.",
    }),
  });

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

  if (!agrupaciones) {
    return null;
  }

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const url = new URL("/api/cuartos-de-final/copy-image", window.location.origin);

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
    <article className="mx-auto max-w-2xl">
      <Form {...form}>
        <header>
          <HeadingH2>Pase a cuartos de final</HeadingH2>
        </header>
        <main>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form className="grid gap-16" onSubmit={form.handleSubmit(onSubmit)}>
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
          </form>
        </main>
        <footer className="mt-8">
          <HeadingH3>
            Comparte tu <span className="text-gray-500">#PORRACOAC2024Cuartos</span>
          </HeadingH3>
          <FormField
            control={form.control}
            name="username"
            render={({field}) => (
              <FormItem className="pt-4">
                <FormLabel>Nombre de usuario a mostrar al compartir</FormLabel>
                <div className="flex flex-row items-center justify-center space-x-4">
                  <Input placeholder="carnaval_cadiz" type="text" {...field} />
                  <Button type="submit">Copiar imagen</Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </footer>
      </Form>
    </article>
  );
}
