import type {AgrupacionEntity} from "@types";

import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

import AgrupacionItem from "./agrupacion-item";

export default function AgrupacionSortableItem({
  agrupacion,
  index,
}: {
  agrupacion: AgrupacionEntity;
  index: number;
}) {
  const {attributes, isDragging, listeners, setNodeRef, transform, transition} = useSortable({
    id: agrupacion.id,
  });

  const styles = {
    transform: CSS.Transform.toString(transform) ?? undefined,
    transition: transition ?? undefined,
  };

  return (
    <AgrupacionItem
      ref={setNodeRef}
      agrupacion={agrupacion}
      index={index}
      isOpacityEnabled={isDragging}
      style={styles}
      {...attributes}
      {...listeners}
    />
  );
}
