"use client";

import React from "react";
import { Edge, useReactFlow } from "reactflow";

import { resetSelection } from "../nodes/helpers";

import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

interface IProps {
  selected: Edge[],
};

const EdgeSettings: React.FunctionComponent<IProps> = ({ selected }) => {
  const reactFlow = useReactFlow();
  let header = `${selected.length} Edge(s) Selected`;

  return (
    <aside className="h-full bg-slate-200 [grid-area:aside]">
      <header className="relative w-full px-4 py-2 flex items-center justify-center border-b border-b-gray-300">
        <Button aria-label="back" variant="ghost" onClick={() => resetSelection(reactFlow)} className="absolute left-4 p-2 h-min">
          <ArrowLeftIcon />
        </Button>

        <span className="flex-1 text-sm text-center font-medium block">
          {header}
        </span>
      </header>
    </aside>
  );
}

export default EdgeSettings;
