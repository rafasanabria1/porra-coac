import {NextResponse, type NextRequest} from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get("username") ?? "";
  const comparsas = searchParams.get("comparsas") ? searchParams.get("comparsas")?.split(",") : "";
  const chirigotas = searchParams.get("chirigotas")
    ? searchParams.get("chirigotas")?.split(",")
    : "";
  const coros = searchParams.get("coros") ? searchParams.get("coros")?.split(",") : "";
  const cuartetos = searchParams.get("cuartetos") ? searchParams.get("cuartetos")?.split(",") : "";

  return NextResponse.json({username, comparsas, chirigotas, coros, cuartetos});
}
