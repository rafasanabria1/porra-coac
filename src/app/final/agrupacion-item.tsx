import type {CSSProperties, HTMLAttributes} from "react";
import type {AgrupacionEntity} from "@types";

import {forwardRef} from "react";
import Image from "next/image";

import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {indexToPremio} from "@/lib/utils";

type Props = {
  agrupacion: AgrupacionEntity;
  isOpacityEnabled?: boolean;
  isDragging?: boolean;
  index?: number;
} & HTMLAttributes<HTMLDivElement>;

const AgrupacionItem = forwardRef<HTMLDivElement, Props>(
  ({agrupacion, isOpacityEnabled, isDragging, style, index, ...props}, ref) => {
    const styles: CSSProperties = {
      opacity: isOpacityEnabled ? "0.4" : "1",
      cursor: isDragging ? "grabbing" : "grab",
      lineHeight: "0.5",
      transform: isDragging ? "scale(1.05)" : "scale(1)",
      ...style,
    };

    return (
      <Card ref={ref} className="relative select-none" style={styles} {...props}>
        <CardHeader className="relative p-2 md:p-4 lg:p-6">
          <Image
            alt={agrupacion.nombre}
            height={300}
            sizes="(max-width: 1024px) 50vw, 25vw"
            src={`/agrupaciones-images/${agrupacion.id}.jpg`}
            style={{
              width: "100%",
              height: "auto",
            }}
            width={500}
          />
          <CardTitle className="text-ellipsis text-balance text-center">
            {agrupacion.nombre}
          </CardTitle>
          <CardTitle className="text-center text-xs font-light">{indexToPremio(index)}</CardTitle>
        </CardHeader>
      </Card>
    );
  },
);

AgrupacionItem.displayName = "AgrupacionItem";

export default AgrupacionItem;
