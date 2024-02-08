"use client";
import type {AgrupacionEntity, AgrupacionFinalEntity} from "@types";

import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useState} from "react";
import Image from "next/image";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Form, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {HeadingH2, HeadingH3, HeadingH4} from "@/components/ui/heading";
import {hashtag} from "@/lib/utils";
import {Skeleton} from "@/components/ui/skeleton";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

export default function AgrupacionesClient({
  agrupaciones,
}: {
  agrupaciones: AgrupacionFinalEntity[] | null;
}) {
  const [imageURL, setImageURL] = useState("");

  const FormSchema = z.object({
    username: z.string().min(3, {
      message: "El nombre de usuario debe tener al menos 3 caracteres.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });
  const {isSubmitting} = form.formState;

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setImageURL("");

    const searchParams = new URLSearchParams();

    searchParams.append("fase", "final");
    searchParams.append("username", data.username);
    // searchParams.append("comparsas", data.comparsas.toString());
    // searchParams.append("chirigotas", data.chirigotas.toString());
    // searchParams.append("coros", data.coros.toString());
    // searchParams.append("cuartetos", data.cuartetos.toString());

    setImageURL(`/api/og?${searchParams.toString()}`);
  };

  if (!agrupaciones) {
    return null;
  }

  const comparsas = agrupaciones.filter(
    (agrupacion) => agrupacion.modalidad === "comparsa",
  ) as AgrupacionEntity[];
  const chirigotas = agrupaciones.filter((agrupacion) => agrupacion.modalidad === "chirigota");
  const coros = agrupaciones.filter((agrupacion) => agrupacion.modalidad === "coro");
  const cuartetos = agrupaciones.filter((agrupacion) => agrupacion.modalidad === "cuarteto");

  return (
    <article className="max-w-full">
      <Form {...form}>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <header className="my-8">
            <HeadingH2>Resultado de la Gran Final</HeadingH2>
          </header>
          <main className="grid gap-16">
            <section>
              <HeadingH4 className="border-b border-slate-400/25 text-left">Comparsas</HeadingH4>
              <div className="grid-cols- mt-8 grid gap-2 md:grid-cols-2 lg:grid-cols-4">
                {comparsas.map((agrupacion, index) => {
                  return (
                    <Card key={agrupacion.id}>
                      <CardHeader>
                        <Image
                          alt={agrupacion.nombre}
                          height={300}
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          src={`/agrupaciones-images/${agrupacion.id}.jpg`}
                          style={{
                            width: "100%",
                            height: "auto",
                          }}
                          width={500}
                        />
                        <CardTitle>{agrupacion.nombre}</CardTitle>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>
            </section>

            <HeadingH4 className="text-left">Chirigotas</HeadingH4>
            <HeadingH4 className="text-left">Coros</HeadingH4>
            <HeadingH4 className="text-left">Cuartetos</HeadingH4>
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
      {isSubmitting ? <Skeleton className="my-8 h-[350px] w-full rounded-xl" /> : null}
      {imageURL ? (
        <div className="my-8 flex flex-col gap-6 text-sm">
          <a href={imageURL} rel="noopener" target="_blank">
            <Image
              alt={`La ${hashtag.semifinal}`}
              blurDataURL="/blur.webp"
              className="rounded-xl shadow-lg shadow-black drop-shadow-sm "
              height={600}
              placeholder="blur"
              src={imageURL}
              width={1200}
            />
          </a>
          <span className="block text-center">
            Pincha en la imagen para abrirla en una nueva ventana.
          </span>
        </div>
      ) : null}
    </article>
  );
}
