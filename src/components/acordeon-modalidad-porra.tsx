import type {Agrupacion, FormSchema} from "@/lib/types";
import type {UseFormReturn} from "react-hook-form";
import type * as z from "zod";

import {Checkbox} from "@/components/ui/checkbox";
import {AccordionContent, AccordionTrigger} from "@/components/ui/accordion";

import {FormControl, FormField, FormItem, FormLabel} from "./ui/form";

export default function AcordeonModalidad({
  titulo,
  formIndex,
  agrupaciones,
  totalSeleccionados,
  totalPosibles,
  form,
}: {
  titulo: string;
  formIndex: "comparsas" | "chirigotas" | "coros" | "cuartetos";
  agrupaciones: Agrupacion[];
  totalSeleccionados: number;
  totalPosibles: number;
  form: UseFormReturn<z.infer<typeof FormSchema>>;
}) {
  return (
    <>
      <AccordionTrigger>
        <span className="flex-1 text-left">{titulo}</span>
        <span>
          Seleccionadas {totalSeleccionados} / {totalPosibles}
        </span>
      </AccordionTrigger>
      <AccordionContent className="grid gap-2">
        {agrupaciones.map((agrupacion) => (
          <FormField
            key={agrupacion.id}
            control={form.control}
            name={formIndex}
            render={({field}) => {
              return (
                <FormItem className="flex flex-row items-center justify-start space-x-4 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value.includes(agrupacion.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          if (field.value.length >= totalPosibles) {
                            return;
                          }

                          return field.onChange([...field.value, agrupacion.id]);
                        } else {
                          return field.onChange(field.value.filter((id) => id !== agrupacion.id));
                        }
                      }}
                    />
                  </FormControl>
                  <FormLabel>{agrupacion.nombre}</FormLabel>
                </FormItem>
              );
            }}
          />
        ))}
      </AccordionContent>
    </>
  );
}
