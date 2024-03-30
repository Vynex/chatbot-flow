"use client";

import React, { memo, useCallback, useState } from "react";
import { Edge, Node, useOnSelectionChange } from "reactflow";

import NodeSettings from "./NodeSettings";
import EdgeSettings from "./EdgeSettings";
import NodesPanel from "../nodes/Panel";

const Sidebar: React.FunctionComponent = () => {
  const [ selectedNodes, setSelectedNodes ] = useState<Node[]>([]);
  const [ selectedEdges, setSelectedEdges ] = useState<Edge[]>([]);

  const onChange = useCallback(({ nodes, edges }: { nodes: Node[], edges: Edge[] }) => {
    setSelectedNodes(nodes);
    setSelectedEdges(edges);
  }, []);

  useOnSelectionChange({ onChange });

  if (selectedNodes.length) return <NodeSettings selected={selectedNodes} />;
  if (selectedEdges.length) return <EdgeSettings selected={selectedEdges} />
  return <NodesPanel />;
};

export default memo(Sidebar);
