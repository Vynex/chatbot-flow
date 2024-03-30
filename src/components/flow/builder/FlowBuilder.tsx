"use client";

import React, { useCallback, useState } from "react";
import ReactFlow, { Background, Connection, Edge, EdgeChange, MarkerType, Node, NodeChange, NodeProps, ReactFlowInstance, ReactFlowJsonObject, ReactFlowProps, SelectionMode, addEdge, applyEdgeChanges, applyNodeChanges } from "reactflow";
import { toast } from "sonner";

import GetStarted from "./GetStarted";
import NODE_TYPES from "../nodes";
import "reactflow/dist/style.css";

interface IProps {
  nodes: Node[];
  edges: Edge[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
};

const FlowBuilder: React.FunctionComponent<IProps> = ({ nodes, edges, setNodes, setEdges }) => {
  const [ reactFlow, setReactFlow ] = useState<ReactFlowInstance | null>(null);

  const handleInit = useCallback((instance: ReactFlowInstance) => {
    // callback when ReactFlow is initialized
    setReactFlow(instance);

    // restore last saved Flow State from localStorage
    const flowState = localStorage.getItem("flowState");
    if (!flowState) return;
    try {
      const parsedState: ReactFlowJsonObject | null = JSON.parse(flowState);
      if (!parsedState) return;

      // adding default viewport parameters
      const { x = 0, y = 0, zoom = 1 } = parsedState.viewport;
      instance.setNodes(parsedState.nodes || []);
      instance.setEdges(parsedState.edges || []);
      instance.setViewport({ x, y, zoom });

      toast("Restored Saved Flow");

    } catch(error) {
      console.error("error while parsing flow state from localStorage", error);
    }
  }, []);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback((event: React.DragEvent) => {
    if (!reactFlow) return;
    event.preventDefault();

    // ensure dragged item is a flow node
    const type = event.dataTransfer.getData("application/reactflow");
    if (!type) return;

    // position of dragged element on window
    const screenPosition = { x: event.clientX, y: event.clientY };

    // position of dragged element in flow canvas
    const flowPosition = reactFlow.screenToFlowPosition(screenPosition);

    // get data for newly added node
    const newNode: Node<any> = {
      id: String(Date.now()),
      position: flowPosition,
      ...NODE_TYPES[type].generate(),
    };

    // add it to nodes state
    reactFlow.setNodes((old) => old.concat(newNode));
  }, [ reactFlow ]);

  const handleNodesChange = useCallback((changes: NodeChange[]) => {
    // callback for whenever a node changes, i.e added, selected, dragged, etc.
    // saving all changes to state
    setNodes((old) => applyNodeChanges(changes, old));
  }, [ setNodes ]);

  const handleEdgesChange = useCallback((changes: EdgeChange[]) => {
    // callback for whenever an edge changes, saving all changes to state
    setEdges((old) => applyEdgeChanges(changes, old));
  }, [ setEdges ]);

  const isValidConnection = useCallback((connection: Connection) => {
    if (!reactFlow) return false;

    // find all edges originating from this connection's source
    const allEdges = reactFlow.getEdges();
    const sourceEdges = allEdges.filter(edge => edge.source === connection.source);

    // if other connections exist, return false
    if (sourceEdges.length) return false;

    // otherwise, new connection is valid
    return true;

  }, [ reactFlow ]);

  const handleConnect = useCallback((connection: Connection) => {
    // save new edge to state
    setEdges((oldEdges) => addEdge(connection, oldEdges));
  }, [ setEdges ]);

  return (
    <ReactFlow
      {...DEFAULT_CONFIG}

      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={handleNodesChange}
      onEdgesChange={handleEdgesChange}

      onInit={(instance) => handleInit(instance)}
      onConnect={handleConnect}
      isValidConnection={isValidConnection}

      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      {!nodes.length && <GetStarted />}
      <Background className="bg-slate-900" />
    </ReactFlow>
  );
}

const DEFAULT_CONFIG: ReactFlowProps = {
  // pan config
  panOnDrag: false,
  panOnScroll: true,

  // drag to select config
  selectionOnDrag: true,
  selectionMode: SelectionMode.Partial,

  // hide library attribution
  proOptions: { hideAttribution: true },

  // props for each new edge added
  defaultEdgeOptions: {
    // setting edge end to an arrow
    markerEnd: { type: MarkerType.Arrow, height: 40, width: 40 }
  },
};

const nodeTypes: { [key: string]: React.ComponentType<NodeProps> } = {};
Object.entries(NODE_TYPES).forEach(([ key, value ]) => {
  nodeTypes[key] = value.Node;
});

export default FlowBuilder;
