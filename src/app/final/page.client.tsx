"use client";
import type {AgrupacionEntity} from "@types";

import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useState} from "react";
import Image from "next/image";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Form, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {HeadingH2, HeadingH3, HeadingH4} from "@/components/ui/heading";
import {hashtags} from "@/lib/utils";
import {Skeleton} from "@/components/ui/skeleton";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

export default function AgrupacionesClient({
  agrupaciones,
}: {
  agrupaciones: AgrupacionEntity[] | null;
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

  const comparsas = agrupaciones.filter((agrupacion) => agrupacion.modalidad === "comparsa");
  const chirigotas = agrupaciones.filter((agrupacion) => agrupacion.modalidad === "chirigota");
  const coros = agrupaciones.filter((agrupacion) => agrupacion.modalidad === "coro");
  const cuartetos = agrupaciones.filter((agrupacion) => agrupacion.modalidad === "cuarteto");

  return (
    <article className="mx-auto max-w-6xl">
      <Form {...form}>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <header className="my-8 flex items-center justify-center gap-2">
            <Popover>
              <HeadingH2>Resultado de la Gran Final</HeadingH2>
              <PopoverTrigger>
                <svg
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none" stroke="none" />
                  <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                  <path d="M12 9h.01" />
                  <path d="M11 12h1v4h1" />
                </svg>
              </PopoverTrigger>
              <PopoverContent>Arrastra las agrupaciones para ordenarlas.</PopoverContent>
            </Popover>
          </header>
          <main className="grid">
            <section>
              <HeadingH4 className="border-b border-slate-400/25 text-left">Comparsas</HeadingH4>
              <div className="my-8 grid gap-2 md:grid-cols-2 lg:grid-cols-4">
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
                        <CardTitle className="text-balance text-center">
                          {agrupacion.nombre}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>
            </section>
            <section>
              <HeadingH4 className="border-b border-slate-400/25 text-left">Chirigotas</HeadingH4>
              <div className="my-8 grid gap-2 md:grid-cols-2 lg:grid-cols-4">
                {chirigotas.map((agrupacion, index) => {
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
                        <CardTitle className="text-balance text-center">
                          {agrupacion.nombre}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>
            </section>
            <section>
              <HeadingH4 className="border-b border-slate-400/25 text-left">Coros</HeadingH4>
              <div className="my-8 grid gap-2 md:grid-cols-2 lg:grid-cols-4">
                {coros.map((agrupacion, index) => {
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
                        <CardTitle className="text-balance text-center">
                          {agrupacion.nombre}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>
            </section>
            <section>
              <HeadingH4 className="border-b border-slate-400/25 text-left">Cuartetos</HeadingH4>
              <div className="my-8 grid gap-2 md:grid-cols-2 lg:grid-cols-4">
                {cuartetos.map((agrupacion, index) => {
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
                        <CardTitle className="text-balance text-center">
                          {agrupacion.nombre}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>
            </section>
          </main>
          <footer className="mt-8">
            <HeadingH3>
              Genera una imagen para poder compartir tu{" "}
              <span className="text-gray-500">{hashtags.final}</span>
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
              alt={`La ${hashtags.final}`}
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
