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
import {hashtag} from "@/lib/utils";
import {useToast} from "@/components/ui/use-toast";

export default function AgrupacionesClient({
  agrupaciones,
}: {
  agrupaciones: AgrupacionPreliminaresEntity[] | null;
}) {
  const {toast} = useToast();

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
  const {isSubmitting} = form.formState;

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const url = new URL("/api/og", window.location.origin);

    url.searchParams.append("fase", "cuartos");
    url.searchParams.append("username", data.username);
    url.searchParams.append("comparsas", data.comparsas.toString());
    url.searchParams.append("chirigotas", data.chirigotas.toString());
    url.searchParams.append("coros", data.coros.toString());
    url.searchParams.append("cuartetos", data.cuartetos.toString());

    const image = await fetch(url.toString())
      .then((data) => data.blob())
      .catch(() => new Blob());

    if (image.size === 0) {
      toast({
        title: "Error al generar la imagen",
        description: "Inténtalo de nuevo más tarde.",
        variant: "destructive",
      });

      return;
    }

    const clipboardItem = new ClipboardItem({
      "image/png": new Promise((resolve) => {
        resolve(image);
      }),
    });

    navigator.clipboard
      .write([clipboardItem])
      .then(() => {
        toast({
          title: "Copiado al portapapeles!",
          description: "Ahora puedes pegar tu imagen para compartirla donde quieras ;)",
        });
      })
      .catch(() => {
        toast({
          title: "Error al copiar al portapapeles",
          description: "Inténtalo de nuevo más tarde.",
          variant: "destructive",
        });
      });
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
            Comparte tu <span className="text-gray-500">{hashtag.cuartos}</span>
          </HeadingH3>
          <FormField
            control={form.control}
            name="username"
            render={({field}) => (
              <FormItem className="pt-4">
                <FormLabel htmlFor="username">Nombre de usuario a mostrar al compartir</FormLabel>
                <div className="flex flex-row items-center justify-center space-x-4">
                  <Input
                    placeholder="carnaval_cadiz"
                    type="text"
                    {...field}
                    autoComplete="username"
                    id="username"
                  />
                  <Button disabled={isSubmitting} type="submit">
                    {`${isSubmitting ? "Copiando imagen..." : "Copiar imagen"}`}
                  </Button>
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
