/* eslint-disable react/no-unknown-property */
import {ImageResponse} from "next/og";

export const runtime = "edge";

export async function GET(/*request: Request*/) {
  /*
    const {searchParams} = new URL(request.url);
  const fase = searchParams.get("fase") ?? "";
  const username = searchParams.get("username") ?? "";
  const comparsas = searchParams.get("comparsas") ? searchParams.get("comparsas")?.split(",") : "";
  const chirigotas = searchParams.get("chirigotas")
    ? searchParams.get("chirigotas")?.split(",")
    : "";
  const coros = searchParams.get("coros") ? searchParams.get("coros")?.split(",") : "";
  const cuartetos = searchParams.get("cuartetos") ? searchParams.get("cuartetos")?.split(",") : "";
    */
  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "black",
          }}
        >
          <div tw="bg-gray-50 flex">
            <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
              <h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left">
                <span>Ready to dive in?</span>
                <span tw="text-indigo-600">Start your free trial today.</span>
              </h2>
              <div tw="mt-8 flex md:mt-0">
                <div tw="flex rounded-md shadow">
                  <span tw="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white">
                    Get started
                  </span>
                </div>
                <div tw="ml-3 flex rounded-md shadow">
                  <span tw="flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600">
                    Learn more
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 800,
      },
    );
  } catch {
    return new Response(`Fallo al generar la imagen`, {
      status: 500,
    });
  }
}
