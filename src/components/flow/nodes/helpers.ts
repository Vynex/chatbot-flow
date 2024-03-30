import { ReactFlowInstance } from "reactflow";

// deselects all nodes
export function resetSelection(rfInstance: ReactFlowInstance) {
  rfInstance.setNodes((old) => {
    return old.map(node => ({ ...node, selected: false }));
  });

  rfInstance.setEdges((old) => {
    return old.map(edge => ({ ...edge, selected: false }));
  });
}
