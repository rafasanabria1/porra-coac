/* eslint-disable react/no-unknown-property */
import type {Database} from "@database";

import {ImageResponse} from "next/og";

import {api} from "@/lib/api";
import {hashtag} from "@/lib/utils";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const {searchParams} = new URL(request.url);
    const fase = (searchParams.get("fase") ??
      "preliminares") as Database["public"]["Enums"]["fase"];
    const username = searchParams.get("username") ?? "";
    const comparsasSelected = searchParams.has("comparsas")
      ? searchParams.get("comparsas")!.split(",")
      : [];
    const chirigotasSelected = searchParams.has("chirigotas")
      ? searchParams.get("chirigotas")!.split(",")
      : [];
    const corosSelected = searchParams.has("coros") ? searchParams.get("coros")!.split(",") : [];
    const cuartetosSelected = searchParams.has("cuartetos")
      ? searchParams.get("cuartetos")!.split(",")
      : [];

    const agrupacionesCuartos = await api.agrupaciones.cuartosByOrder();
    const comparsas = agrupacionesCuartos.filter(
      (agrupacion) => agrupacion.modalidad === "comparsa",
    );
    const chirigotas = agrupacionesCuartos.filter(
      (agrupacion) => agrupacion.modalidad === "chirigota",
    );
    const coros = agrupacionesCuartos.filter((agrupacion) => agrupacion.modalidad === "coro");
    const cuartetos = agrupacionesCuartos.filter(
      (agrupacion) => agrupacion.modalidad === "cuarteto",
    );

    return new ImageResponse(
      (
        <main
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "black",
            color: "white",
          }}
        >
          <div tw="flex flex-col">
            <h1 tw="flex justify-center text-lg items-center m-0 p-0">
              la
              <strong tw="px-2 font-bold text-2xl">{hashtag[fase]}</strong>
              de
              <strong tw="px-2 font-bold text-2xl">@{username}</strong>
            </h1>
            <div tw="flex text-sm relative">
              <section tw="w-1/4 flex flex-col px-8">
                <h2 tw="text-3xl font-extrabold underline text-center">Comparsas</h2>
                <ul tw="flex flex-col">
                  {comparsas.map((agrupacion) => {
                    return (
                      <li
                        key={agrupacion.id}
                        tw={`${
                          comparsasSelected.includes(agrupacion.id)
                            ? "text-xl font-bold"
                            : "line-through text-slate-700"
                        }`}
                      >
                        {agrupacion.nombre}
                      </li>
                    );
                  })}
                </ul>
              </section>
              <section tw="w-1/4 flex flex-col px-8">
                <h2 tw="text-3xl font-extrabold underline text-center">Chirigotas</h2>
                <ul tw="flex flex-col">
                  {chirigotas.map((agrupacion) => {
                    return (
                      <li
                        key={agrupacion.id}
                        tw={`${
                          chirigotasSelected.includes(agrupacion.id)
                            ? "text-xl font-bold"
                            : "line-through text-slate-700"
                        }`}
                      >
                        {agrupacion.nombre}
                      </li>
                    );
                  })}
                </ul>
              </section>
              <section tw="w-1/4 flex flex-col px-8">
                <h2 tw="text-3xl font-extrabold underline text-center">Coros</h2>
                <ul tw="flex flex-col">
                  {coros.map((agrupacion) => {
                    return (
                      <li
                        key={agrupacion.id}
                        tw={`${
                          corosSelected.includes(agrupacion.id)
                            ? "text-xl font-bold"
                            : "line-through text-slate-700"
                        }`}
                      >
                        {agrupacion.nombre}
                      </li>
                    );
                  })}
                </ul>
              </section>
              <section tw="w-1/4 flex flex-col px-8">
                <h2 tw="text-3xl font-extrabold underline text-center">Cuartetos</h2>
                <ul tw="flex flex-col">
                  {cuartetos.map((agrupacion) => {
                    return (
                      <li
                        key={agrupacion.id}
                        tw={`${
                          cuartetosSelected.includes(agrupacion.id)
                            ? "text-xl font-bold"
                            : "line-through text-slate-700"
                        }`}
                      >
                        {agrupacion.nombre}
                      </li>
                    );
                  })}
                </ul>
              </section>
              <div tw="absolute bottom-0 right-0 pb-8 pr-8 text-sm font-extrabold text-gray-300">
                Haz tu porra en https://porra-coac.vercel.app y comparte con el hashtag
              </div>
              <div tw="absolute bottom-0 right-0 pr-8 text-xl font-extrabold text-gray-300">
                {hashtag[fase]}
              </div>
            </div>
          </div>
          <div tw="absolute top-2 right-2 text-xs font-extrabold text-gray-700">
            #PORRACOAC desarrollado por @rafasanabria1
          </div>
        </main>
      ),
      {
        width: 1200,
        height: 800,
      },
    );
  } catch {
    return new Response("Error al generar la imagen.", {status: 500});
  }
}
