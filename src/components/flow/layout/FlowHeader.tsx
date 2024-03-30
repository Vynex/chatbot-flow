"use client";

import React, { memo } from "react";
import { useReactFlow } from "reactflow";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ResetIcon } from "@radix-ui/react-icons";
import Image from "next/image";

const FlowHeader: React.FunctionComponent = () => {
  const reactFlow = useReactFlow();

  const handleSave = () => {
    const nodes = reactFlow.getNodes();

    if (nodes.length > 1) {
      // get all nodes without a source
      // - find all edges
      // - filter out nodes that are on any edge's target

      const nodeIDs = new Set();
      nodes.forEach(node => nodeIDs.add(node.id));

      const edges = reactFlow.getEdges();
      edges.forEach(edge => nodeIDs.delete(edge.target));

      // if multiple nodes without source exist, prevent saving
      if (nodeIDs.size > 1) {
        toast.error("Unable to Save Flow");
        return;
      }
    }

    // save to localStorage
    localStorage.setItem("flowState", JSON.stringify(reactFlow.toObject()));

    toast("Saved Changes Successfully");
  };

  const handleReset = () => {
    // clear out all nodes and edges in state
    reactFlow.setNodes([]);
    reactFlow.setEdges([]);

    toast("Cleared all Message Nodes");
  };

  return (
    <header className="w-full col-span-2 bg-primary [grid-area:header] flex items-center px-8 gap-6">
      <div className="h-full flex-1 flex items-center">
        <Image alt="brand" src="/brand.svg" width="0" height="0" className="w-auto h-2/5" />
      </div>

      <Button aria-label="save-flow" onClick={handleSave} variant="outline" className="hover:border-blue-500">
        <span>Save Changes</span>
      </Button>

      <Button aria-label="reset-flow" onClick={handleReset} variant="outline" className="hover:border-red-400">
        <ResetIcon />
      </Button>
    </header>
  );
};

export default memo(FlowHeader);
