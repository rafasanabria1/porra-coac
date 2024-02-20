import {api} from "@/lib/api";

import AgrupacionesClient from "./page.client";

export default async function Agrupaciones() {
  const agrupaciones = await api.agrupaciones.list(true);

  return <AgrupacionesClient agrupaciones={agrupaciones} />;
}
