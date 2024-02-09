import type {AgrupacionEntity} from "@types";
import type {DragEndEvent, DragStartEvent, SensorDescriptor, SensorOptions} from "@dnd-kit/core";
import type {Dispatch, SetStateAction} from "react";

import {DndContext, DragOverlay, closestCenter} from "@dnd-kit/core";
import {arrayMove, SortableContext, rectSortingStrategy} from "@dnd-kit/sortable";
import {useState} from "react";

import {HeadingH3} from "@/components/ui/heading";

import AgrupacionSortableItem from "./agrupacion-sortable-item";
import AgrupacionItem from "./agrupacion-item";

export default function AgrupacionesfinalSortable({
  titulo,
  agrupaciones,
  setAgrupaciones,
  sensors,
}: {
  titulo: string;
  agrupaciones: AgrupacionEntity[];
  setAgrupaciones: Dispatch<SetStateAction<AgrupacionEntity[]>>;
  sensors: SensorDescriptor<SensorOptions>[];
}) {
  const [agrupacionActiva, setAgrupacionActiva] = useState<AgrupacionEntity>();

  const handleDragStart = (event: DragStartEvent) => {
    const {active} = event;

    setAgrupacionActiva(agrupaciones.find((agrupacion) => agrupacion.id === active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;

    if (!over) return;

    const agrupacionActiva = agrupaciones.find((agrupacion) => agrupacion.id === active.id);
    const agrupacionOver = agrupaciones.find((agrupacion) => agrupacion.id === over.id);

    if (!agrupacionActiva || !agrupacionOver) return;

    const activeIndex = agrupaciones.findIndex((agrupacion) => agrupacion.id === active.id);
    const overIndex = agrupaciones.findIndex((agrupacion) => agrupacion.id === over.id);

    if (activeIndex !== overIndex) {
      setAgrupaciones((agrupaciones: AgrupacionEntity[]) => {
        return arrayMove<AgrupacionEntity>(agrupaciones, activeIndex, overIndex);
      });
    }
    setAgrupacionActiva(undefined);
  };

  const handleDragCancel = () => {
    setAgrupacionActiva(undefined);
  };

  return (
    <section>
      <HeadingH3 className="border-b border-slate-400/25 !text-left">{titulo}</HeadingH3>
      <DndContext
        collisionDetection={closestCenter}
        sensors={sensors}
        onDragCancel={handleDragCancel}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        <SortableContext items={agrupaciones} strategy={rectSortingStrategy}>
          <div className="mb-8 mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {agrupaciones.map((agrupacion, index) => (
              <AgrupacionSortableItem key={agrupacion.id} agrupacion={agrupacion} index={index} />
            ))}
          </div>
        </SortableContext>
        <DragOverlay adjustScale style={{transformOrigin: "0 0 "}}>
          {agrupacionActiva ? <AgrupacionItem isDragging agrupacion={agrupacionActiva} /> : null}
        </DragOverlay>
      </DndContext>
    </section>
  );
}
