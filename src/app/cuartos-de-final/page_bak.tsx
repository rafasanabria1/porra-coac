import {api} from "@/lib/api";

import AgrupacionesClient from "./page.client";

export default async function Agrupaciones() {
  const agrupaciones = await api.agrupaciones.preliminaresByOrder();

  return <AgrupacionesClient agrupaciones={agrupaciones} />;
}
