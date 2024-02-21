/* eslint-disable react/no-unknown-property */
import type {Database} from "@database";
import type {CSSProperties} from "react";
import type {AgrupacionEntity} from "@types";

import {ImageResponse} from "next/og";

import {api} from "@/lib/api";
import {hashtags, indexToPremio} from "@/lib/utils";

export const runtime = "edge";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const {searchParams} = new URL(request.url);
    const fase = (searchParams.get("fase") ?? "preliminar") as Database["public"]["Enums"]["fase"];
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

    if (fase === "preliminar")
      return buildImagePreliminares({
        username,
        comparsasSelected,
        chirigotasSelected,
        corosSelected,
        cuartetosSelected,
      });
    else if (fase === "cuartos")
      return buildImageCuartos({
        username,
        comparsasSelected,
        chirigotasSelected,
        corosSelected,
        cuartetosSelected,
      });
    else if (fase === "semifinal")
      return buildImageSemifinales({
        username,
        comparsasSelected,
        chirigotasSelected,
        corosSelected,
        cuartetosSelected,
      });
    else
      return buildImageFinal({
        username,
        comparsas: comparsasSelected,
        chirigotas: chirigotasSelected,
        coros: corosSelected,
        cuartetos: cuartetosSelected,
      });
  } catch {
    return new Response("Error al generar la imagen.", {status: 500});
  }
}

async function buildImagePreliminares({
  username,
  comparsasSelected,
  chirigotasSelected,
  corosSelected,
  cuartetosSelected,
}: {
  username: string;
  comparsasSelected: string[];
  chirigotasSelected: string[];
  corosSelected: string[];
  cuartetosSelected: string[];
}): Promise<ImageResponse> {
  const agrupaciones = await api.agrupaciones.preliminaresByOrder();

  return buildImage({
    fase: "preliminar",
    username,
    agrupacionesParticipants: {
      comparsas: agrupaciones.filter((agrupacion) => agrupacion.modalidad === "comparsa"),
      chirigotas: agrupaciones.filter((agrupacion) => agrupacion.modalidad === "chirigota"),
      coros: agrupaciones.filter((agrupacion) => agrupacion.modalidad === "coro"),
      cuartetos: agrupaciones.filter((agrupacion) => agrupacion.modalidad === "cuarteto"),
    },
    agrupacionesSelected: {
      comparsas: comparsasSelected,
      chirigotas: chirigotasSelected,
      coros: corosSelected,
      cuartetos: cuartetosSelected,
    },
    imageSize: {width: 1200, height: 1400},
  });
}

async function buildImageCuartos({
  username,
  comparsasSelected,
  chirigotasSelected,
  corosSelected,
  cuartetosSelected,
}: {
  username: string;
  comparsasSelected: string[];
  chirigotasSelected: string[];
  corosSelected: string[];
  cuartetosSelected: string[];
}): Promise<ImageResponse> {
  const agrupaciones = await api.agrupaciones.cuartosByOrder();

  return buildImage({
    fase: "cuartos",
    username,
    agrupacionesParticipants: {
      comparsas: agrupaciones.filter((agrupacion) => agrupacion.modalidad === "comparsa"),
      chirigotas: agrupaciones.filter((agrupacion) => agrupacion.modalidad === "chirigota"),
      coros: agrupaciones.filter((agrupacion) => agrupacion.modalidad === "coro"),
      cuartetos: agrupaciones.filter((agrupacion) => agrupacion.modalidad === "cuarteto"),
    },
    agrupacionesSelected: {
      comparsas: comparsasSelected,
      chirigotas: chirigotasSelected,
      coros: corosSelected,
      cuartetos: cuartetosSelected,
    },
    imageSize: {width: 1200, height: 650},
  });
}

async function buildImageSemifinales({
  username,
  comparsasSelected,
  chirigotasSelected,
  corosSelected,
  cuartetosSelected,
}: {
  username: string;
  comparsasSelected: string[];
  chirigotasSelected: string[];
  corosSelected: string[];
  cuartetosSelected: string[];
}): Promise<ImageResponse> {
  const agrupaciones = await api.agrupaciones.semifinalesByOrder();

  return buildImage({
    fase: "preliminar",
    username,
    agrupacionesParticipants: {
      comparsas: agrupaciones.filter((agrupacion) => agrupacion.modalidad === "comparsa"),
      chirigotas: agrupaciones.filter((agrupacion) => agrupacion.modalidad === "chirigota"),
      coros: agrupaciones.filter((agrupacion) => agrupacion.modalidad === "coro"),
      cuartetos: agrupaciones.filter((agrupacion) => agrupacion.modalidad === "cuarteto"),
    },
    agrupacionesSelected: {
      comparsas: comparsasSelected,
      chirigotas: chirigotasSelected,
      coros: corosSelected,
      cuartetos: cuartetosSelected,
    },
    imageSize: {width: 1200, height: 400},
  });
}

async function buildImageFinal({
  username,
  comparsas,
  chirigotas,
  coros,
  cuartetos,
}: {
  username: string;
  comparsas: string[];
  chirigotas: string[];
  coros: string[];
  cuartetos: string[];
}): Promise<ImageResponse> {
  const comparsasOrdered = await Promise.all(comparsas.map((id) => api.agrupaciones.get(id)));
  const chirigotasOrdered = await Promise.all(chirigotas.map((id) => api.agrupaciones.get(id)));
  const corosOrdered = await Promise.all(coros.map((id) => api.agrupaciones.get(id)));
  const cuartetosOrdered = await Promise.all(cuartetos.map((id) => api.agrupaciones.get(id)));

  // TODO: Encontrar solución para nombres largos
  const largeNameIds = [
    "100f2713-1577-48b9-9dba-473614525f97",
    "75010401-b5c2-4039-97ca-2a71fa7a3f2b",
    "e60f9596-cfd8-48d1-8235-489ca02d201d",
    "3e005ad9-7905-41c7-bb2b-36117ef1f821",
  ];

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
        <div tw="flex flex-col justify-between">
          <h1 tw="flex justify-center text-xl items-center m-0 p-0 mb-8">
            la
            <strong tw="px-2 font-bold text-4xl">{hashtags.final}</strong>
            de
            <strong tw="px-2 font-bold text-4xl">@{username}</strong>
          </h1>
          <div tw="flex text-sm">
            <section tw="w-1/4 flex flex-col px-8">
              <h2 tw="text-3xl font-extrabold underline justify-center">Comparsas</h2>
              <div
                style={{
                  gap: "2rem",
                }}
                tw="flex flex-col justify-center"
              >
                {comparsasOrdered.map((agrupacion, index) => {
                  return (
                    <div key={agrupacion.id} tw="flex flex-col">
                      <img
                        alt={agrupacion.nombre}
                        height={133}
                        src={`https://porra-coac.vercel.app/agrupaciones-images/${agrupacion.id}.jpg`}
                        tw="mx-auto rounded-lg"
                        width={200}
                      />
                      <span
                        style={{
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          margin: "0 auto",
                        }}
                        tw="text-2xl font-bold flex justify-start"
                      >
                        {agrupacion.nombre}
                      </span>
                      <span tw="text-sm font-light flex justify-center">
                        {indexToPremio(index)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>
            <section tw="w-1/4 flex flex-col px-8">
              <h2 tw="text-3xl font-extrabold underline justify-center">Chirigotas</h2>
              <div
                style={{
                  gap: "2rem",
                }}
                tw="flex flex-col justify-center"
              >
                {chirigotasOrdered.map((agrupacion, index) => {
                  const style: CSSProperties = {
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  };

                  if (!largeNameIds.includes(agrupacion.id)) style.margin = "0 auto";

                  return (
                    <div key={agrupacion.id} tw="flex flex-col">
                      <img
                        alt={agrupacion.nombre}
                        height={133}
                        src={`https://porra-coac.vercel.app/agrupaciones-images/${agrupacion.id}.jpg`}
                        tw="mx-auto rounded-lg"
                        width={200}
                      />
                      <span style={{...style}} tw="text-2xl font-bold flex justify-start">
                        {agrupacion.nombre}
                      </span>
                      <span tw="text-sm font-light flex justify-center">
                        {indexToPremio(index)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>
            <section tw="w-1/4 flex flex-col px-8">
              <h2 tw="text-3xl font-extrabold underline justify-center">Coros</h2>
              <div
                style={{
                  gap: "2rem",
                }}
                tw="flex flex-col justify-center"
              >
                {corosOrdered.map((agrupacion, index) => {
                  const style: CSSProperties = {
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  };

                  if (!largeNameIds.includes(agrupacion.id)) style.margin = "0 auto";

                  return (
                    <div key={agrupacion.id} tw="flex flex-col">
                      <img
                        alt={agrupacion.nombre}
                        height={133}
                        src={`https://porra-coac.vercel.app/agrupaciones-images/${agrupacion.id}.jpg`}
                        tw="mx-auto rounded-lg"
                        width={200}
                      />
                      <span style={{...style}} tw="text-2xl font-bold flex justify-start">
                        {agrupacion.nombre}
                      </span>
                      <span tw="text-sm font-light flex justify-center">
                        {indexToPremio(index)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>
            <section tw="w-1/4 flex flex-col px-8">
              <h2 tw="text-3xl font-extrabold underline justify-center">Cuartetos</h2>
              <div
                style={{
                  gap: "2rem",
                }}
                tw="flex flex-col justify-center"
              >
                {cuartetosOrdered.map((agrupacion, index) => {
                  const style: CSSProperties = {
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  };

                  if (!largeNameIds.includes(agrupacion.id)) style.margin = "0 auto";

                  return (
                    <div key={agrupacion.id} tw="flex flex-col">
                      <img
                        alt={agrupacion.nombre}
                        height={133}
                        src={`https://porra-coac.vercel.app/agrupaciones-images/${agrupacion.id}.jpg`}
                        tw="mx-auto rounded-lg"
                        width={200}
                      />
                      <span style={{...style}} tw="text-2xl font-bold flex justify-start">
                        {agrupacion.nombre}
                      </span>
                      <span tw="text-sm font-light flex justify-center">
                        {indexToPremio(index)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
        <div tw="absolute bottom-0 right-2 pb-8 text-sm font-extrabold text-gray-300">
          Haz tu porra en https://porra-coac.vercel.app y comparte con el hashtag
        </div>
        <div tw="absolute bottom-0 right-2 text-xl font-extrabold text-gray-300">
          {hashtags.final}
        </div>
        <div tw="absolute top-2 right-2 text-xs font-extrabold text-gray-700">
          #PORRACOAC desarrollado por @rafasanabria1
        </div>
      </main>
    ),
    {
      width: 1200,
      height: 1200,
    },
  );
}

function buildImage({
  fase,
  username,
  agrupacionesParticipants,
  agrupacionesSelected,
  imageSize,
}: {
  fase: Database["public"]["Enums"]["fase"];
  username: string;
  agrupacionesParticipants: {
    comparsas: AgrupacionEntity[];
    chirigotas: AgrupacionEntity[];
    coros: AgrupacionEntity[];
    cuartetos: AgrupacionEntity[];
  };
  agrupacionesSelected: {
    comparsas: string[];
    chirigotas: string[];
    coros: string[];
    cuartetos: string[];
  };
  imageSize: {width: number; height: number};
}): ImageResponse {
  const {comparsas, chirigotas, coros, cuartetos} = agrupacionesParticipants;
  const {
    comparsas: comparsasSelected,
    chirigotas: chirigotasSelected,
    coros: corosSelected,
    cuartetos: cuartetosSelected,
  } = agrupacionesSelected;

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
            <strong tw="px-2 font-bold text-2xl">{hashtags[fase]}</strong>
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
              {hashtags[fase]}
            </div>
          </div>
        </div>
        <div tw="absolute top-2 right-2 text-xs font-extrabold text-gray-700">
          #PORRACOAC desarrollado por @rafasanabria1
        </div>
      </main>
    ),
    imageSize,
  );
}
