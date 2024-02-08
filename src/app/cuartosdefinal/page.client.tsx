"use client";
import type {AgrupacionCuartosEntity} from "@types";

import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useState} from "react";

import {Accordion, AccordionItem} from "@/components/ui/accordion";
import AcordeonModalidadPorra from "@/components/acordeon-modalidad-porra";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Form, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {HeadingH2, HeadingH3} from "@/components/ui/heading";
import {hashtag} from "@/lib/utils";

export default function AgrupacionesClient({
  agrupaciones,
}: {
  agrupaciones: AgrupacionCuartosEntity[] | null;
}) {
  const [imageURL, setImageURL] = useState("");

  const FormSchema = z.object({
    username: z.string().min(3, {
      message: "El nombre de usuario debe tener al menos 3 caracteres.",
    }),
    comparsas: z.array(z.string()).refine((value) => value.length <= 10, {
      message: "No puedes seleccionar más de 10 comparsas.",
    }),
    chirigotas: z.array(z.string()).refine((value) => value.length <= 10, {
      message: "No puedes seleccionar más de 10 chirigotas.",
    }),
    coros: z.array(z.string()).refine((value) => value.length <= 7, {
      message: "No puedes seleccionar más de 7 coros.",
    }),
    cuartetos: z.array(z.string()).refine((value) => value.length <= 3, {
      message: "No puedes seleccionar más de 3 cuartetos.",
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
  const {isSubmitting} = form.formState;

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const url = new URL("/api/og", window.location.origin);

    url.searchParams.append("fase", "semifinal");
    url.searchParams.append("username", data.username);
    url.searchParams.append("comparsas", data.comparsas.toString());
    url.searchParams.append("chirigotas", data.chirigotas.toString());
    url.searchParams.append("coros", data.coros.toString());
    url.searchParams.append("cuartetos", data.cuartetos.toString());

    setImageURL(url.toString());
  };

  if (!agrupaciones) {
    return null;
  }

  const comparsas = agrupaciones.filter((agrupacion) => agrupacion.modalidad === "comparsa");
  const chirigotas = agrupaciones.filter((agrupacion) => agrupacion.modalidad === "chirigota");
  const coros = agrupaciones.filter((agrupacion) => agrupacion.modalidad === "coro");
  const cuartetos = agrupaciones.filter((agrupacion) => agrupacion.modalidad === "cuarteto");

  return (
    <article className="mx-auto max-w-2xl">
      <Form {...form}>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <header className="my-8">
            <HeadingH2>Pase a semifinales</HeadingH2>
          </header>
          <main className="grid gap-16">
            <Accordion collapsible type="single">
              <AccordionItem value="comparsas">
                <AcordeonModalidadPorra
                  agrupaciones={comparsas}
                  form={form}
                  formIndex="comparsas"
                  titulo="Comparsas"
                  totalPosibles={10}
                  totalSeleccionados={form.watch("comparsas").length}
                />
              </AccordionItem>
              <AccordionItem value="chirigotas">
                <AcordeonModalidadPorra
                  agrupaciones={chirigotas}
                  form={form}
                  formIndex="chirigotas"
                  titulo="Chirigotas"
                  totalPosibles={10}
                  totalSeleccionados={form.watch("chirigotas").length}
                />
              </AccordionItem>
              <AccordionItem value="coros">
                <AcordeonModalidadPorra
                  agrupaciones={coros}
                  form={form}
                  formIndex="coros"
                  titulo="Coros"
                  totalPosibles={7}
                  totalSeleccionados={form.watch("coros").length}
                />
              </AccordionItem>
              <AccordionItem value="cuartetos">
                <AcordeonModalidadPorra
                  agrupaciones={cuartetos}
                  form={form}
                  formIndex="cuartetos"
                  titulo="Cuartetos"
                  totalPosibles={3}
                  totalSeleccionados={form.watch("cuartetos").length}
                />
              </AccordionItem>
            </Accordion>
          </main>
          <footer className="mt-8">
            <HeadingH3>
              Genera una imagen para poder compartir tu{" "}
              <span className="text-gray-500">{hashtag.semifinal}</span>
            </HeadingH3>
            <FormField
              control={form.control}
              name="username"
              render={({field}) => (
                <FormItem className="pt-4">
                  <FormLabel htmlFor="username">Nombre de usuario a mostrar al compartir</FormLabel>
                  <div className="flex flex-row items-center justify-between space-x-4">
                    <Input
                      placeholder="carnaval_cadiz"
                      type="text"
                      {...field}
                      autoComplete="username"
                      id="username"
                    />
                    <Button disabled={isSubmitting} type="submit">
                      {`${isSubmitting ? "Generando imagen..." : "Generar imagen"}`}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </footer>
        </form>
      </Form>
      {imageURL ? (
        <div className="my-2 flex flex-col gap-1 text-sm">
          <a href={imageURL} rel="noopener" target="_blank">
            <img alt={`La ${hashtag.semifinal}`} className="" src={imageURL} />
          </a>
          <span className="block text-center">
            Pincha en la imagen para abrirla en una nueva ventana.
          </span>
        </div>
      ) : null}
    </article>
  );
}
