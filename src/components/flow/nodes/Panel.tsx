// sidepanel for showing all available nodes

"use client"

import React, { useCallback } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import NODE_TYPES from ".";

const nodeTypes: ({ type: string, name: string, image: string })[] = [];
Object.entries(NODE_TYPES).forEach(([ key, value ]) => {
  nodeTypes.push({ type: key, name: value.name, image: value.image });
});

const NodesPanel: React.FunctionComponent = () => {
  const onDragStart = useCallback((event: React.DragEvent<HTMLButtonElement>, nodeType: string) => {
    if (!event.dataTransfer) return;

    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  }, []);

  return (
    <aside className="h-full px-4 py-8 bg-slate-200 [grid-area:aside] grid grid-cols-2 grid-rows-8 gap-4">

      {nodeTypes.map(({ image, name, type }, i) => (
        <Button aria-label={type} key={i} variant="outline" className="dndnode input border-slate-400 py-4 h-max flex flex-col gap-2" onDragStart={(event) => onDragStart(event, type)} draggable>
          <Image alt={"bubble"} src={image} width={16} height={16} />
          <span>{name}</span>
        </Button>
      ))}

    </aside>
  );
}

export default NodesPanel;
