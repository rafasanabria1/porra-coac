import {api} from "@/lib/api";

import AgrupacionesClient from "./page.client";

export default async function Agrupaciones() {
  const agrupaciones = await api.agrupaciones.finalByOrder();

  return <AgrupacionesClient agrupaciones={agrupaciones} />;
}
